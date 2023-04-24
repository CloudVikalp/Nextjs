import Image from 'next/image'

import Header from '@/components/Header'
import TopCard from '@/components/TopCard'
import BarChart from '@/components/BarChart'
import RecentOrders from '@/components/RecentOrders'




export default function Home() {
  return (
    <>
    <Header/>
    <TopCard/>
    <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
         <BarChart/>
         <RecentOrders/>
        </div>
    </>
  )
}
