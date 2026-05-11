const { WebSocketServer } = require('ws');

const rooms = new Map();

function safeJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      clients: new Set(),
      assignments: new Map(),
      memberCount: 2,
      preferences: null,
      draft: null,
    });
  }
  return rooms.get(roomId);
}

function hasDraftInfo(draft) {
  return Boolean(
    draft &&
    typeof draft === 'object' &&
    (draft.destination || draft.startDate || draft.endDate)
  );
}

function assignedIndexes(room) {
  return new Set([...room.assignments.values()].filter(index => index >= 0));
}

function assignMemberIndex(room) {
  const used = assignedIndexes(room);
  for (let index = 0; index < room.memberCount; index += 1) {
    if (!used.has(index)) return index;
  }
  return -1;
}

function send(ws, payload) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

function broadcast(room, payload, except) {
  room.clients.forEach(client => {
    if (client !== except) send(client, payload);
  });
}

function attachCollaborationSocket(server) {
  const wss = new WebSocketServer({ server, path: '/ws/collaboration' });

  wss.on('connection', (ws, request) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const roomId = url.searchParams.get('roomId');
    const memberCount = Math.min(20, Math.max(2, parseInt(url.searchParams.get('members') || '2', 10) || 2));
    if (!roomId) {
      ws.close(1008, 'roomId is required');
      return;
    }

    const room = getRoom(roomId);
    room.memberCount = Math.max(room.memberCount, memberCount);
    room.clients.add(ws);
    const memberIndex = assignMemberIndex(room);
    room.assignments.set(ws, memberIndex);

    send(ws, {
      type: 'room_state',
      preferences: room.preferences,
      draft: room.draft,
      connectedCount: room.clients.size,
      memberIndex,
    });
    broadcast(room, { type: 'presence', connectedCount: room.clients.size }, ws);

    ws.on('message', raw => {
      const message = safeJson(raw);
      if (!message) return;

      if (message.type === 'room_init') {
        let changed = false;
        if (!room.preferences && Array.isArray(message.preferences)) {
          room.preferences = message.preferences.slice(0, room.memberCount);
          changed = true;
        }
        if (!room.draft && hasDraftInfo(message.draft)) {
          room.draft = message.draft;
          changed = true;
        }

        if (!changed) return;

        broadcast(room, {
          type: 'room_state',
          preferences: room.preferences,
          draft: room.draft,
          connectedCount: room.clients.size,
        });
        return;
      }

      if (message.type !== 'preference_update' || typeof message.index !== 'number' || !message.preference) return;

      const assignedIndex = room.assignments.get(ws);
      if (assignedIndex < 0 || message.index !== assignedIndex) {
        send(ws, { type: 'update_rejected', reason: 'assigned member only' });
        return;
      }

      if (!Array.isArray(room.preferences)) return;
      room.preferences[assignedIndex] = message.preference;
      broadcast(room, {
        type: 'preference_update',
        index: assignedIndex,
        preference: message.preference,
        preferences: room.preferences,
      }, ws);
    });

    ws.on('close', () => {
      room.clients.delete(ws);
      room.assignments.delete(ws);
      if (room.clients.size === 0 && !room.preferences) {
        rooms.delete(roomId);
        return;
      }
      broadcast(room, { type: 'presence', connectedCount: room.clients.size });
    });
  });
}

module.exports = { attachCollaborationSocket };
