import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

function loadStoredAuth() {
  try {
    const token = localStorage.getItem('tripHelperToken')
    const user = JSON.parse(localStorage.getItem('tripHelperUser') || 'null')
    if (token && user) return { token, user }
  } catch {
    // ignore parse errors
  }
  return { token: null, user: null }
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuth] = useState(loadStoredAuth)

  const login = useCallback((userData, authToken) => {
    localStorage.setItem('tripHelperToken', authToken)
    localStorage.setItem('tripHelperUser', JSON.stringify(userData))
    localStorage.setItem('tripHelperUserName', userData.name)
    setAuth({ token: authToken, user: userData })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('tripHelperToken')
    localStorage.removeItem('tripHelperUser')
    localStorage.removeItem('tripHelperUserName')
    setAuth({ token: null, user: null })
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
