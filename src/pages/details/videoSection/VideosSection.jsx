import React, { useState } from "react";

import "./videosSection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../detailBanner/PlayIcon";
import Img from "../../../components/lazyLoadImage/Img";
import VideoPopup from "../../../components/videoPopup/VideoPopup";




const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data && data.map((video,idx)=>(
                            <div className="videoItem" key={idx} onClick={()=>{
                                setShow(true)
                                setVideoId(video.key)
                            }}>
                                <div className="videoThumbnail">
                                    <Img
                                     src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                     />
                                     <PlayIcon/>
                                   
                                </div>
                                <div className="videoTitle">
                                    {video.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;