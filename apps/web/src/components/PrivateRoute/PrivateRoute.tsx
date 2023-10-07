import { Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase-config'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth)
    console.log(user);

    if (loading) {
        return <div className='mt-24'>Loading</div>
    }

    return (
        user ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute