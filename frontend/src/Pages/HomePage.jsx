import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sitesDataAtom } from '../Store/atoms'
import Navbar from '../Components/Navbar'
import SearchBar from '../Components/SearchBar'
import SiteData from '../Components/SiteData'

const HomePage = () => {
  return (
    <div className='bg-gray-600 w-full h-screen p-2 xl:flex xl:flex-col xl:items-center'>
      <section className='lg:w-[60%]'>
        <Navbar />
      </section>
      <section className='mt-4 lg:w-[60%]'>
        <SearchBar />
        <SiteData />
      </section>
    </div>
  )
}



export default HomePage
