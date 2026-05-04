import { Users, Sparkles, Plane } from 'lucide-react'

const STEP_CARDS = [
  {
    number: '1',
    numGradient: 'from-blue-600 to-purple-600',
    iconBg: 'bg-blue-50',
    icon: Users,
    iconColor: 'text-blue-600',
    title: '여행 정보 입력',
    description: '인원, 목적지, 기간, 예산만\n간단하게 입력하세요',
  },
  {
    number: '2',
    numGradient: 'from-purple-600 to-pink-500',
    iconBg: 'bg-purple-50',
    icon: Sparkles,
    iconColor: 'text-purple-600',
    title: 'AI 일정 생성',
    description: 'AI가 최적의 동선과 장소를\n자동으로 계획해드립니다',
  },
  {
    number: '3',
    numGradient: 'from-pink-500 to-red-500',
    iconBg: 'bg-pink-50',
    icon: Plane,
    iconColor: 'text-pink-500',
    title: '여행 출발',
    description: '현지에서 실시간 가이드와\n함께 완벽한 여행을 즐기세요',
  },
]

function StepCard({ step }) {
  const Icon = step.icon
  return (
    <div className="relative group pt-6">
      <div className="bg-white rounded-2xl px-8 pb-10 pt-12 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center gap-6 h-full">
        <div className={`absolute top-0 left-8 w-12 h-12 bg-gradient-to-br ${step.numGradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
          {step.number}
        </div>
        <div className={`w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center`}>
          <Icon className={`w-10 h-10 ${step.iconColor}`} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
          <p className="text-base text-gray-500 leading-relaxed whitespace-pre-line">{step.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function StepsSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">3단계로 시작하는 완벽한 여행</h2>
          <p className="text-base text-gray-500">복잡한 계획은 이제 그만, AI에게 맡기세요</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {STEP_CARDS.map((step, i) => <StepCard key={i} step={step} />)}
        </div>
      </div>
    </section>
  )
}
