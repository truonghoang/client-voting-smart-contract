import React from 'react'
import {Paper,Avatar, Button,Link} from "@mui/material"
import {Home} from "@mui/icons-material"
import {useAuth} from "@/hooks/useAuth"
import api from "../../../apis"
import '@/styles/Header.scss'
function Header() {
  let address = useAuth().user.slice(0,4)
  React.useEffect(()=>{
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("user",null)
    })
    return ()=>{
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("user",null)
      })
    }
  },[])
  return (
    <Paper className='wrap-header'>
    <Link href={"/"} sx={{margin:5}} ><Home sx={{fontSize:40}}/></Link>
        <Avatar sx={{ width:50,height:50, marginRight:5}} onClick={()=>{
          window.location.href="/user"
        }} >{address}</Avatar>
        <Button className='change-account' variant='contained'onClick={()=>{
          api.getAddress()
        }}>Change Account</Button>
    </Paper>
  )
}

export default Header