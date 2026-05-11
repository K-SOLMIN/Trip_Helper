// 공동작업 일정 생성 전용 로딩 페이지
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/AiGenerationLoading.css'
import AiGenerationLoadingView from '../components/aitravel/AiGenerationLoadingView'
import { apiPost } from '../api/apiClient'
import { LOADING_MESSAGES } from '../data/AiGenerationLoading'

const DEFAULT_COLLAB_TRIP = {
  destination: '목적지',
  nights: 3,
  budget: 'mid',
  styles: [],
  adults: 2,
  children: 0,
  startDate: '',
  endDate: '',
}

function readCollabParams() {
  try {
    const stored = sessionStorage.getItem('aiCollabParams')
    if (stored) {
      sessionStorage.removeItem('aiCollabParams')
      return { ...DEFAULT_COLLAB_TRIP, ...JSON.parse(stored) }
    }
    return DEFAULT_COLLAB_TRIP
  } catch {
    return DEFAULT_COLLAB_TRIP
  }
}

export default function AiCollabLoading() {
  const navigate = useNavigate()
  const calledRef = useRef(false)
  const [progress, setProgress] = useState(6)
  const [messageIndex, setMessageIndex] = useState(0)
  const [isFinishing, setIsFinishing] = useState(false)
  const params = useMemo(() => readCollabParams(), [])

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 4000)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return 98
        const step = prev < 72 ? 7 : prev < 90 ? 3.5 : 1
        return Math.min(98, prev + step + Math.random() * 3)
      })
    }, 950)

    return () => {
      clearInterval(messageTimer)
      clearInterval(progressTimer)
    }
  }, [])

  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true

    let cancelled = false

    apiPost('/ai-travel/generate-collab', params)
      .then(json => {
        if (cancelled) return
        if (json?.data) {
          sessionStorage.setItem('aiPlanResult', JSON.stringify({ planData: json.data, tripInfo: params }))
        }
        setIsFinishing(true)
        setProgress(100)
        setTimeout(() => navigate('/ai-generation-schedule'), 650)
      })
      .catch(() => {
        if (cancelled) return
        setIsFinishing(true)
        setProgress(100)
        setTimeout(() => navigate('/ai-generation-schedule'), 650)
      })

    return () => { cancelled = true }
  }, [navigate, params])

  return (
    <AiGenerationLoadingView
      trip={params}
      progress={progress}
      messageIndex={messageIndex}
      isFinishing={isFinishing}
    />
  )
}
