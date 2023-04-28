import React from 'react'
import './details.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'
const Details = () => {
  const {id,mediaType} = useParams()
  const{data,error,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const{data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data?.results} loading={loading}/>
      <Similar id={id} mediaType={mediaType}/>
      <Recommendation id={id} mediaType={mediaType}/>
    </div>
  )
}

export default Details