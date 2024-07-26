'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/actions'

const Logout = () => {

    const router = useRouter();

    const handleLogout = async() => {
        await logoutAction();
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default Logout