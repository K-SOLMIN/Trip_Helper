import { useNavigate } from 'react-router-dom'
import { Sparkles, ChevronRight, Smartphone, Navigation } from 'lucide-react'

function CTAPhoneMockup() {
  const schedules = [
    { emoji: '🏯', time: '09:00', name: '센소지' },
    { emoji: '🗼', time: '13:00', name: '도쿄 스카이트리' },
    { emoji: '🎮', time: '16:00', name: '아키하바라' },
  ]
  return (
    <div className="bg-gray-900 rounded-[2rem] p-3 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
      <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-[1.5rem] overflow-hidden">
        <div className="p-5 flex flex-col gap-2.5" style={{ minHeight: 340 }}>
          <div className="text-center pt-4 pb-1">
            <p className="text-sm font-bold text-gray-900">도쿄 여행 2일차</p>
            <p className="text-xs text-gray-500 mt-0.5">AI 실시간 가이드</p>
          </div>
          {schedules.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-2.5">
              <span className="text-xl flex-shrink-0">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400">{s.time}</p>
                <p className="text-xs font-semibold text-gray-800 truncate">{s.name}</p>
              </div>
            </div>
          ))}
          <div className="mt-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl py-3 text-white flex items-center justify-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">실시간 가이드 중...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CTASection() {
  const navigate = useNavigate()
  return (
    <section className="py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-7">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full w-fit">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm font-medium">AI 여행 가이드</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                핸드폰 하나로<br />완벽한 여행
              </h2>
              <p className="text-base text-white/80 leading-relaxed">
                지금 바로 폰가이즈와 함께<br />
                당신만의 특별한 여행을 시작하세요
              </p>
              <button
                onClick={() => navigate('/ai-travel')}
                className="inline-flex items-center gap-2 bg-white text-blue-600 text-sm font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-200 w-fit group"
              >
                <Sparkles className="w-4 h-4" />
                무료로 여행 계획 시작하기
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-full max-w-[260px]">
                <CTAPhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
