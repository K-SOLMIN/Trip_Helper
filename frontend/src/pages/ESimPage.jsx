import { useState } from 'react'
import ESimStepLanding from '../components/esim/ESimStepLanding'
import ESimStepCountry from '../components/esim/ESimStepCountry'
import ESimStepConfig  from '../components/esim/ESimStepConfig'
import ESimStepConfirm from '../components/esim/ESimStepConfirm'
import '../styles/esim.css'

export default function ESimPage() {
  const [step,         setStep]         = useState(0)
  const [selected,     setSelected]     = useState([])
  const [configs,      setConfigs]      = useState({})
  const [confirmation, setConfirmation] = useState(null)

  const toggleCountry = (c) => {
    setSelected(prev => {
      if (prev.find(x => x.code === c.code)) {
        setConfigs(cfg => { const n = { ...cfg }; delete n[c.code]; return n })
        return prev.filter(x => x.code !== c.code)
      }
      return [...prev, c]
    })
  }

  const handleConfigSet = (code, config) => {
    setConfigs(prev => ({ ...prev, [code]: config }))
  }

  const handlePurchased = (conf) => {
    setConfirmation(conf)
    setStep(3)
  }

  if (step === 0) return <ESimStepLanding onNext={() => setStep(1)} />
  if (step === 1) return (
    <ESimStepCountry
      selected={selected}
      onToggle={toggleCountry}
      onNext={() => setStep(2)}
      onBack={() => setStep(0)}
    />
  )
  if (step === 2) return (
    <ESimStepConfig
      selected={selected}
      configs={configs}
      onConfigSet={handleConfigSet}
      onBack={() => setStep(1)}
      onPurchased={handlePurchased}
    />
  )
  return <ESimStepConfirm confirmation={confirmation} />
}
