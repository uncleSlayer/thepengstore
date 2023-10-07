import React, { useEffect } from 'react'
import { getAuth } from 'firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { profile } from 'store'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = getAuth()
    const [userProfile, setUserProfile] = useRecoilState(profile)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
        })

        return () => unsub()
    }, [])

    return (
        <>{children}</>
    )
}
