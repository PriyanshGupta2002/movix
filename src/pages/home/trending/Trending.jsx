import React, { useState } from 'react'
import { ContentWrapper } from '../../../components'
import useFetch from '../../../hooks/useFetch'
import {SwitchTab,Carousel} from '../../../components/index'
const Trending = () => {
  
  const [endPoint, setEndPoint] = useState("day")
  const {data,error,loading} = useFetch(`/trending/all/${endPoint}`)


    const onTabChange=(tab,idx)=>{
      setEndPoint(tab.toLowerCase())
      
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>
                Trending
            </span>
            <SwitchTab data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending