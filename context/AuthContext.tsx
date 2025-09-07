import { auth } from "@/services/firebase";
import { onAuthStateChanged, User } from "firebase/auth"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

const AuthContext = createContext<{user: User | null, loading: boolean }>({
  user: null,
  loading: true
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [isUser, setIsUser] = useState(false)
  // const login = () => setIsUser(true)
  // const logout = () => setIsUser(false)

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setUser(user ?? null)     // user kenek innwnm user wa dnw nattam null ekak assign wnw
      setLoading(false)
    })
    return () => unsubscribe()   // stop listening for auth changes
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
// export { AuthProvider, useAuth }
