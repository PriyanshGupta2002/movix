import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./detailBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import RatingCircle from '../../../components/ratingCircle/RatingCircle'
import Img from "../../../components/lazyloadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {

  const {id,mediaType} = useParams()
    const{data,error,loading}=useFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state)=>state.home)
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const date = dayjs(data?.release_date);
    const releasedYear = date.format('YYYY');
    const releaseDate = date.format('MMM D, YYYY')
    const genresDataId = data?.genres?.map((genre)=>genre?.id)
    const director = crew?.filter((f)=>f?.job==="Director")
    const writer = crew?.filter((f)=>f?.job==="Screenplay" || f.job === "Story" || f.job === "Writer")
   

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const handleTrailer=()=>{
        setShow(true)
        setVideoId(video?.key)
    }
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data &&( <React.Fragment>
                    <div className="backdrop-img">
                        <Img src={`${url?.backdrop}${data.backdrop_path}`}/>
                    </div>
                    <div className="opacity-layer"/>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                <Img className="posterImg" src={`${data.poster_path ? url.poster + data.poster_path : PosterFallback }`}/>
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data.title || data.name}(${releasedYear})`}
                                </div>
                                <div className="subtitle">
                                    {data.tagline}
                                </div>

                                <div className="genres">
                                <Genres data={genresDataId.slice(0,2)}/>
                                </div>

                                <div className="row">
                                    <RatingCircle rating={data.vote_average.toFixed(1)}/>
                                    <div className="playbtn" onClick={handleTrailer}>
                                    <PlayIcon/>
                                    <span className="text">Watch Trailer</span>
                                    </div>
                                </div>

                                <div className="overview">
                                    <div className="heading">
                                        Overview
                                    </div>
                                    <div className="description">
                                        {data.overview}
                                    </div>
                                </div>
                                <div className="info">
                                    {data.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Status:{" "}
                                            </span>
                                            <span className="text">
                                                {data.status}
                                            </span>
                                        </div>
                                    )}

                                     {data.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Release Date:{" "}
                                            </span>
                                            <span className="text">
                                                {releaseDate}
                                            </span>
                                        </div>
                                    )}

                                     {data.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Runtime:{" "}
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(data.runtime)}
                                            </span>
                                        </div>
                                    )}

                                </div>

                                  {director?.length >0 && <div className="directors">
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((dirName,i)=>(
                                                        <span key={i}>
                                                            {dirName?.name}
                                                            {director.length-1!==i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                    </div>}

                                  {writer?.length >0 && <div className="writers">
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((writerName,i)=>(
                                                        <span key={i}>
                                                            {writerName?.name}
                                                            {writer.length-1!==i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                    </div>}


                                  {data?.created_by?.length >0 && <div className="writers">
                                            <div className="info">
                                                <span className="text bold">
                                                    Created By:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.created_by?.map((writerName,i)=>(
                                                        <span key={i}>
                                                            {writerName?.name}
                                                            {data.created_by?.length-1!==i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                    </div>}


                            </div>
                        </div>
                        <VideoPopup setShow={setShow} show={show} setVideoId={setVideoId} videoId={videoId}/>
                    </ContentWrapper>
                </React.Fragment>)}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;