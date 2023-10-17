import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { SERVER_IP } from 'configs'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [hasLoaded, setHasLoaded] = useState(false)

    const auth = getAuth()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(user)
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
                    .then((resp) => {
                        console.log(resp);
                        setHasLoaded(true)
                        return
                        // console.log(resp)
                    })
                    .catch((err: Error) => {
                        console.log(err.message);
                    })
            }
        })

        return () => refreshUnsub()
    }, [])

    return (
        hasLoaded ?
            <>{children}</> : <div>Loading...</div>
    )
}
