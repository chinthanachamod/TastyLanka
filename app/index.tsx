import { SplashLoader } from '@/components/SplashLoader'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router/build/exports'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

const Index = () => {
    const router = useRouter()
    const { user, loading } = useAuth()
    const [showSplash, setShowSplash] = useState(true)
    console.log("User data:", user)

    useEffect(() => {
        if (!loading) {
            // Add a small delay to ensure splash screen shows the logo
            setTimeout(() => {
                setShowSplash(false)
                if (user) router.replace('/home')
                else router.replace('/login')
            }, 1500) // Show splash for at least 1.5 seconds
        }
    }, [user, loading])

    if(loading || showSplash){
        return (
            <View style={{ flex: 1 }}>
                <SplashLoader isVisible={true} />
            </View>
        )
    }

    return null;
}

export default Index