import React, { useState } from 'react'
import { ContentWrapper } from '../../../components'
import useFetch from '../../../hooks/useFetch'
import {SwitchTab,Carousel} from '../../../components/index'
const Popular = () => {
  
  const [endPoint, setEndPoint] = useState("movie")
  const {data,error,loading} = useFetch(`/${endPoint}/popular`)


    const onTabChange=(tab)=>{
        setEndPoint(tab==="Movies"?"movie":"tv")
      
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>
                What's Popular
            </span>
            <SwitchTab data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} mediaTypeAlt={endPoint}/>
    </div>
  )
}

export default Popular