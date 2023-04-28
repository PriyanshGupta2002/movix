import React,{useEffect, useState} from 'react'
import './heroBanner.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch'
import {Img,ContentWrapper} from '../../../components/index'
const HeroBanner = () => {
    const [searchQuery,setSearchQuery]=useState("")
    const [background, setBackground] = useState("")
    const {data,error,loading} = useFetch('/movie/upcoming')
    const navigate = useNavigate()
    const {url} = useSelector(state=>state.home)
    const {genres} = useSelector(state=>state.home)
    useEffect(() => {
            const randomIndex = Math.floor((Math.random() * data?.results?.length))
            const filePath=data?.results[randomIndex]?.backdrop_path
            const Imgurl = `${url.backdrop}${filePath}`
            setBackground(Imgurl)
    }, [data])

    const searchQueryHandler=(e)=>{
        if (e.key==="Enter" && searchQuery.trim().length>0) {
            navigate(`/search/${searchQuery}`)
        }
    }

 
  return (
    <div className='heroBanner'>
        <div className="backdrop-img">
            <Img src={background}/>
        </div>
        <div className="opacity-layer"/>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className='title'>Welcome</span>
                <span className='subTitle'>
                    Millions of movies, TV shows and people to discover.Explore now.
                </span>
                <div className="searchInput">
                    <input type="text" placeholder='Search for movie or tv show...' onKeyUp={searchQueryHandler} onChange={(e)=>setSearchQuery(e.target.value)} />
                    <button disabled={searchQuery.trim().length===0}>
                        Search
                    </button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner