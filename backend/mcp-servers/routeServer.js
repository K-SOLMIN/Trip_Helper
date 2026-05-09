'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const server = new McpServer({
  name: 'route-server',
  version: '1.0.0',
});

server.tool(
  'calculateRoute',
  'Calculate travel distance and duration between two places with Google Distance Matrix. Falls back to estimates without an API key.',
  {
    origin: z.string().describe('Starting point, for example "Sydney Opera House".'),
    destination: z.string().describe('Destination point, for example "Bondi Beach".'),
    mode: z.enum(['driving', 'walking', 'transit']).optional().describe('Travel mode. Defaults to transit.'),
  },
  async ({ origin, destination, mode = 'transit' }) => {
    if (!GOOGLE_MAPS_API_KEY) {
      return { content: [{ type: 'text', text: JSON.stringify(simulateFallback(origin, destination, mode)) }] };
    }

    try {
      const params = new URLSearchParams({
        origins: origin,
        destinations: destination,
        mode,
        key: GOOGLE_MAPS_API_KEY,
        language: 'ko',
        region: 'AU',
      });

      const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${params}`);
      if (!response.ok) throw new Error(`Maps API ${response.status}`);

      const data = await response.json();
      const element = data.rows?.[0]?.elements?.[0];

      if (!element || element.status !== 'OK') {
        return { content: [{ type: 'text', text: JSON.stringify(simulateFallback(origin, destination, mode)) }] };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            found: true,
            origin: data.origin_addresses?.[0],
            destination: data.destination_addresses?.[0],
            distance: element.distance?.text,
            duration: element.duration?.text,
            mode,
          }),
        }],
      };
    } catch {
      return { content: [{ type: 'text', text: JSON.stringify(simulateFallback(origin, destination, mode)) }] };
    }
  }
);

function simulateFallback(origin, destination, mode) {
  const key = `${origin}_${destination}`.toLowerCase().replace(/\s+/g, '');
  const routes = {
    operahouse_bondi: { distance: '8.5 km', duration: '35 min' },
    bondi_fishmarket: { distance: '6.2 km', duration: '28 min' },
    cbd_taronga: { distance: '5.8 km', duration: '25 min by ferry' },
    flinders_queenvictoria: { distance: '1.2 km', duration: '15 min' },
  };

  const found = Object.entries(routes).find(
    ([routeKey]) => key.includes(routeKey.split('_')[0]) && key.includes(routeKey.split('_')[1])
  );

  return {
    found: true,
    origin,
    destination,
    distance: found ? found[1].distance : 'about 5-10 km',
    duration: found ? found[1].duration : 'about 20-40 min',
    mode,
    simulated: true,
  };
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(err => {
  process.stderr.write(`[routeServer] failed to start: ${err.message}\n`);
  process.exit(1);
});
