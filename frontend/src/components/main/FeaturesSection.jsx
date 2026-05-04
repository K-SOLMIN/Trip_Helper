import { Calendar, Navigation } from 'lucide-react'

const FEATURE_CARDS = [
  {
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100',
    iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-500',
    checkBg: 'bg-blue-100',
    icon: Calendar,
    title: '여행 전',
    description: '몇 가지 질문에만 답하면 AI가 당신의 스타일에 맞는 완벽한 여행 일정을 자동으로 생성합니다.',
    items: [
      '인원, 예산, 기간에 맞춘 맞춤형 일정',
      '여행 스타일 해시태그로 취향 반영',
      '최적 동선 자동 계산 및 맛집 추천',
      '항공권, 숙소, eSIM 한번에 준비',
    ],
  },
  {
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100',
    iconBg: 'bg-gradient-to-br from-purple-600 to-pink-500',
    checkBg: 'bg-purple-100',
    icon: Navigation,
    title: '여행 중',
    description: '현지에서 실시간으로 가이드가 필요한 순간, AI가 당신의 완벽한 여행 파트너가 됩니다.',
    items: [
      '실시간 위치 기반 가이드 및 이동 경로',
      '관광지 역사 설명 & 오디오 가이드',
      '예산 실시간 추적 및 일정 자동 재조정',
      '실시간 번역 및 현지 정보 제공',
    ],
  },
]

function FeatureCard({ card }) {
  const Icon = card.icon
  return (
    <div className={`rounded-2xl p-10 shadow-md border ${card.gradient} flex flex-col gap-7`}>
      <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
        <p className="text-base text-gray-600 leading-relaxed">{card.description}</p>
      </div>
      <ul className="flex flex-col gap-3">
        {card.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-700">
            <div className={`w-6 h-6 ${card.checkBg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className="text-xs text-gray-500 font-bold">✓</span>
            </div>
            <span className="text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">폰가이즈가 특별한 이유</h2>
          <p className="text-base text-gray-500">AI와 함께하는 완벽한 여행 경험</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURE_CARDS.map((card, i) => <FeatureCard key={i} card={card} />)}
        </div>
      </div>
    </section>
  )
}
