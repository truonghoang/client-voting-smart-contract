import React from 'react'
import Header from '@/components/modules/Header'
import TableHome from '@/components/modules/TableHome'
import Sidebar from '../components/modules/SideBar'
import "@/styles/Home.scss"
function Home() {
  return (
    <div className='wrap-home'>
     <Sidebar/>
     <div className='container-content'>
     <Header/>
     <TableHome/>

     </div>
    </div>
  )
}

export default Home