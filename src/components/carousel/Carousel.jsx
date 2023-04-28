import React,{useRef} from 'react'
import './carousel.scss'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Genres from '../genres/Genres';
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import PosterFallback from "../../assets/no-poster.png";
import RatingCircle from '../ratingCircle/RatingCircle';
import Img from '../lazyLoadImage/Img';
const Carousel = ({data,loading,mediaTypeAlt,title}) => {
   
    const {url} = useSelector((state)=>state.home)
 
    const carouselContainer = useRef()
    const navigate = useNavigate()

    const navigation=(dir)=>{
        const container = carouselContainer.current
        const scrollAmount = dir === "left"?container.scrollLeft - (container.offsetWidth + 20):container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left:scrollAmount,
            behavior:"smooth"
        })
    }

    const SkItem =()=>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

  return (
   

   <div className='carousel'>
            <ContentWrapper className>
                {title && <div className='carouselTitle'>{title}</div>}
                <BsFillArrowLeftCircleFill
                className='carouselLeftNav arrow'
                onClick={()=>navigation("left")}
                />

                <BsFillArrowRightCircleFill
                className='carouselRighttNav arrow'
                onClick={()=>navigation("right")}
                />
                {!loading ? (
                    <div className='carouselItems' ref={carouselContainer}>
                        {data && data?.map((item)=>{
                            
                            const imgSrc = `${url.poster}${item?.poster_path}`
                            const date = dayjs(item?.release_date);
                            const formattedDate = date.format('MMM D, YYYY');
                            
                            
                            
                            return (
                                <div className='carouselItem' key={item.id} onClick={()=>navigate(`/${item?.media_type || mediaTypeAlt}/${item?.id}`)}>
                                    <div className="posterBlock">
                                        <Img src={imgSrc || PosterFallback}/>
                                    <RatingCircle rating={item?.vote_average?.toFixed(1)}/>
                                    <Genres data={item?.genre_ids?.slice(0,2)}/>
                                    </div>
                                    <div className="textBlock">
                                        <span className='title'>{item?.title || item?.name}</span>
                                        <span className='date'>{formattedDate}</span>
                                    </div>
                                    
                                </div>
                            )
                        })}
                    </div>
                ):(
                    <div className="loadingSkeleton">
                        <SkItem />
                        <SkItem />
                        <SkItem />
                        <SkItem />
                        <SkItem />
                   </div>
                )}
            </ContentWrapper>
    </div>
                
  )
}

export default Carousel