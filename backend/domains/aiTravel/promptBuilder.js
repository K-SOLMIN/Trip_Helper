'use strict';

const MAX_AGENT_ITERATIONS = 6;

const AGENT_SYSTEM = `당신은 전문 여행 플래너 AI 에이전트입니다.
사용자의 여행 조건에 맞는 최적의 일정을 생성합니다.

도구 사용 원칙:
1. searchKnowledgeBase: 목적지의 장소, 음식, 활동, 교통 등 기본 여행 지식을 찾을 때 사용합니다.
2. searchRecentInfo: 최신 가격, 운영 여부, 이벤트처럼 변동 가능한 정보를 확인할 때 사용합니다.
3. calculateRoute: 장소 사이의 이동 시간과 거리를 확인해 동선을 최적화할 때 사용합니다.

최종 응답은 반드시 아래 JSON 형식만 반환하세요. 마크다운 코드블록이나 설명 문장은 넣지 마세요.
{
  "days": [
    {
      "label": "1일차",
      "theme": "하루 테마",
      "items": [
        { "time": "09:00", "name": "장소명", "note": "상세 설명, 가격, 예약 팁", "isMeal": false }
      ]
    }
  ]
}`;

const BUDGET_LABELS = {
  low: '절약형',
  mid: '일반형',
  high: '프리미엄',
};

const DIFFICULTY_LABELS = {
  relaxed: '여유롭게',
  normal: '보통',
  active: '활동적으로',
  intense: '빡빡하게',
};

function normalizePlanParams(params = {}) {
  const nights = Number(params.nights || 0);
  return {
    ...params,
    dest: params.country || params.continent || '목적지',
    nights,
    days: nights + 1,
    styles: Array.isArray(params.styles) ? params.styles : [],
    children: Number(params.children || 0),
    adults: Number(params.adults || 1),
  };
}

function buildRagQuery({ dest, styles }) {
  return `${dest} 여행 ${styles.join(' ')}`.trim();
}

function buildInitialPrompt(params, ragContext = '') {
  const normalized = normalizePlanParams(params);
  const {
    dest,
    nights,
    days,
    budget,
    styles,
    difficulty,
    adults,
    children,
    mustVisit,
  } = normalized;

  const travelers = `성인 ${adults}명${children > 0 ? `, 어린이 ${children}명` : ''}`;

  return `${ragContext ? `[여행 지식 베이스]\n${ragContext}\n\n` : ''}[여행 요청]
- 목적지: ${dest}
- 기간: ${nights}박 ${days}일
- 예산: ${BUDGET_LABELS[budget] || budget || '미정'}
- 여행 스타일: ${styles.join(', ') || '자유'}
- 여행 강도: ${DIFFICULTY_LABELS[difficulty] || difficulty || '보통'}
- 인원: ${travelers}
${mustVisit ? `- 꼭 방문할 곳: ${mustVisit}` : ''}

도구를 사용해 ${days}일 여행 일정을 만들어 주세요.
각 일차마다 5~7개 항목을 포함하고, 이동 동선이 자연스럽도록 구성하세요.`;
}

module.exports = {
  MAX_AGENT_ITERATIONS,
  AGENT_SYSTEM,
  normalizePlanParams,
  buildRagQuery,
  buildInitialPrompt,
};
