import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane, Wifi, Hotel, Globe, ChevronRight, ChevronLeft } from 'lucide-react'

const SERVICE_CARDS = [
  {
    gradient: 'bg-gradient-to-br from-sky-50 to-blue-50',
    border: 'border border-sky-100',
    iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600',
    icon: Plane,
    title: '항공권 검색',
    subtitle: '최저가 항공권 비교',
    description: '여러 항공사의 가격을 한눈에 비교하고 최저가 항공권을 찾아드립니다.',
    linkText: '항공권 검색하기',
    linkColor: 'text-blue-600',
    to: '/flights',
    comingSoon: false,
  },
  {
    gradient: 'bg-gradient-to-br from-emerald-50 to-green-50',
    border: 'border border-emerald-100',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
    icon: Wifi,
    title: 'eSIM 구매',
    subtitle: '해외 데이터 걱정 끝',
    description: '여행지에 맞는 eSIM을 미리 구매하고 도착하자마자 바로 사용하세요.',
    linkText: 'eSIM 구매하기',
    linkColor: 'text-emerald-600',
    to: '/esim',
    comingSoon: false,
  },
  {
    gradient: 'bg-gradient-to-br from-orange-50 to-amber-50',
    border: 'border border-orange-100',
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    icon: Hotel,
    title: '숙소 예약',
    subtitle: '최적의 숙소 추천',
    description: '여행 일정에 맞는 최적의 숙소를 AI가 추천하고 간편하게 예약해드립니다.',
    linkText: '숙소 예약하기',
    linkColor: 'text-orange-600',
    to: '/accommodation',
    comingSoon: false,
  },
  {
    gradient: 'bg-gradient-to-br from-violet-50 to-purple-50',
    border: 'border border-violet-100',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    icon: Globe,
    title: '투어 & 액티비티',
    subtitle: '현지 체험 예약',
    description: '현지 투어, 액티비티, 입장권을 한 번에 예약하고 특별한 추억을 만드세요.',
    linkText: '투어 및 액티비티 예약하기',
    linkColor: 'text-violet-600',
    to: '/tour-ticket',
    comingSoon: false,
  },
]

function ServiceCard({ card }) {
  const Icon = card.icon
  const navigate = useNavigate()
  const handleClick = () => { if (!card.comingSoon && card.to) navigate(card.to) }

  return (
    <div
      onClick={handleClick}
      className={`group ${card.gradient} ${card.border} rounded-2xl p-10 transition-all duration-300 flex flex-col gap-7 h-full ${
        card.comingSoon ? 'cursor-default' : 'hover:shadow-xl cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-5">
        <div className={`w-16 h-16 ${card.iconBg} rounded-xl flex items-center justify-center shadow-sm ${!card.comingSoon ? 'group-hover:scale-105' : ''} transition-transform flex-shrink-0`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
            {card.comingSoon && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">준비중</span>
            )}
          </div>
          <p className="text-base text-gray-500 mt-1">{card.subtitle}</p>
        </div>
      </div>
      <p className="text-base text-gray-600 leading-relaxed flex-1">{card.description}</p>
      <div className={`inline-flex items-center gap-2 text-base font-semibold transition-all ${
        card.comingSoon ? 'text-gray-400' : `${card.linkColor} group-hover:gap-3`
      }`}>
        {card.linkText}
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  )
}

function ServicesCarousel() {
  const [current, setCurrent] = useState(0)
  const [offset, setOffset] = useState(0)
  const [visible, setVisible] = useState(2)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const total = SERVICE_CARDS.length
  const maxIdx = Math.max(0, total - visible)

  useEffect(() => {
    const update = () => setVisible(window.innerWidth >= 768 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => { setCurrent(0); setOffset(0) }, [visible])

  const goTo = (index) => {
    const wrapped = ((index % (maxIdx + 1)) + (maxIdx + 1)) % (maxIdx + 1)
    const firstCard = trackRef.current?.children[0]
    if (!firstCard) return
    const step = firstCard.offsetWidth + 24
    setCurrent(wrapped)
    setOffset(-(wrapped * step))
  }

  useEffect(() => {
    if (paused || maxIdx === 0) return
    const id = setInterval(() => goTo(current >= maxIdx ? 0 : current + 1), 3500)
    return () => clearInterval(id)
  }, [current, maxIdx, paused])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {SERVICE_CARDS.map((card, i) => (
            <div key={i} className="min-w-full md:min-w-[calc(50%-12px)] flex-shrink-0 h-full">
              <ServiceCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {maxIdx > 0 && (
        <>
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-5 md:-translate-x-6 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-105 active:scale-95 transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-5 md:translate-x-6 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-105 active:scale-95 transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">여행 준비도 폰가이즈와 함께</h2>
          <p className="text-base text-gray-500">항공권, eSIM, 숙소, 보험까지 한번에</p>
        </div>
        <ServicesCarousel />
      </div>
    </section>
  )
}
