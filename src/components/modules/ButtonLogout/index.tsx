'use client'
import React from 'react'
import Button from '@/components/atoms/Button'
import {useRouter} from "next/navigation"
import {ethers} from 'ethers'
function ButtonLogout() {
  const router = useRouter()
    const handleClick = () => {
        router.push('/login')
       
    }
   
  return (
    <Button onClick={handleClick} nameButton='logout' />
  )
}

export default ButtonLogout