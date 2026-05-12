import { useState, useRef } from 'react'
import { X, User } from 'lucide-react'

export default function NicknameModal({ isOpen, onClose, onSubmit, initialNickname = '' }) {
  const [nickname, setNickname] = useState(initialNickname)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.')
      return
    }
    
    if (nickname.trim().length < 2) {
      setError('닉네임은 최소 2자 이상이어야 합니다.')
      return
    }
    
    if (nickname.trim().length > 10) {
      setError('닉네임은 최대 10자까지 가능합니다.')
      return
    }
    
    onSubmit(nickname.trim())
    onClose()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">닉네임 설정</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 설명 */}
        <p className="text-gray-600 mb-6">
          서비스에서 사용할 닉네임을 입력해주세요.
        </p>

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              닉네임
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value)
                  setError('')
                }}
                placeholder="2-10자 닉네임"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
                maxLength={10}
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {nickname.length}/10자
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
