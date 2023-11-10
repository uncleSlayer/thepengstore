import React, { useEffect } from 'react'
import { getAuth } from 'firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { SERVER_IP } from 'configs'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const auth = getAuth()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, () => {
        })
        return () => unsub()
    }, [])

    useEffect(() => {
        const refreshUnsub = auth.onIdTokenChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken()
                await fetch(`${SERVER_IP}/login`, {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token
                    }),
                    credentials: 'include',
                    method: 'post'
                })
                    .then((resp) => {
                        return resp.json()
                    })
                    .then(() => {
                        return
                    })
                    .catch((err: Error) => {
                        console.log(err.message);
                    })
            }
        })

        return () => refreshUnsub()
    }, [])

    return (
        <>{children}</>
    )
}
