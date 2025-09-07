import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router/build/exports'
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

const Index = () => {
    const router = useRouter()
    const { user, loading } = useAuth()
    console.log("User data:", user)

    useEffect(() => {
        if (!loading) {
            if (user) router.replace('/home')
                else router.replace('/login')
        }
    }, [user, loading])

    if(loading){
        return (
        <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size="large" />
        </View>
        )
    }

    return null;
}

export default Index