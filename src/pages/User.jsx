import React from 'react'
import Header from '@/components/modules/Header'
import TableFeedBack from '@/components/modules/TableFeedBack'
import Sidebar from '@/components/modules/SideBar'

import "@/styles/Home.scss"
function UserPage() {
  
  return (
    <div className='wrap-home'>
     <Sidebar/>
     <div className='container-content'>
     <Header/>
    
    <TableFeedBack/>

     </div>
    </div>
  )
}

export default UserPage