import React,{useState,useEffect} from 'react'
import './searchResult.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import {ContentWrapper,MovieCard,Spinner} from '../../../src/components/index'
import noResults from '../../../src/assets/no-results.png'
import { useParams } from 'react-router-dom'
const SearchResult = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const {query} = useParams()

  const fetchInitialData = async()=>{
    setLoading(true)
    const res= await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    setData(res)
    setPageNum((prevState)=>prevState+1)
    setLoading(false)
  }

  const fetchNextPageData=async()=>{
    const res= await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    if (data?.results) {
      setData({...data,results:[...data?.results,...res?.results]})
    }else{
      setData(res)
    }
    setPageNum((prev)=>prev+1)
  }
  useEffect(() => {
    fetchInitialData()
  }, [query])
  
  return (
    <div className='searchResultsPage'>
            {loading ? (<Spinner/>):(
              <ContentWrapper>
                {data && data.results.length>0 ?(
                  <>
                  <div className="pageTitle">
                    {`Search ${data.total_results > 1?"results":"result"} of '${query}'`} 
                  </div>
                  <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data.total_pages}
                  loader={<Spinner/>}
                  >
                    {data.results.map((item,idx)=>{
                      if (item.media_type==="person") {
                        return
                      }
                      return (
                        <MovieCard key={idx} data={item} fromSearch={true}/>
                      )
                    })}
                  </InfiniteScroll>
                  </>
                ):(
                  <span className="resultNotFound"> {`Sorry no results found for ${query}`} </span>
                )}
              </ContentWrapper>
            )}
    </div>
  )
}

export default SearchResult