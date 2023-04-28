import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import {Details,Explore,Home,NotFound,SearchResult} from './pages/index'
import {Footer,Header} from './components/index'
import {useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { Route,Routes } from "react-router-dom"
import useFetch from "./hooks/useFetch"
function App() {
  const dispatch = useDispatch()
  const {data,loading,error}=useFetch('/configuration')

      useEffect(() => {
      const url = {
        backdrop:data?.images?.secure_base_url + "original",
              poster:data?.images?.secure_base_url+"original",
              profile:data?.images?.secure_base_url+"original"
            }
            dispatch(getApiConfiguration(url))
            genresCall()
          }, [data])
  
          
          const genresCall = async()=>{
            let promises = []
            let endPoints = ['tv','movie']
            let allGenres = {}
            endPoints.forEach(ep=>promises.push(fetchDataFromApi(`/genre/${ep}/list`)))
            const data = await Promise.all(promises)
           data?.map(({genres})=>{
            return genres?.map((item)=>(allGenres[item.id]=item))
           })
           dispatch(getGenres(allGenres))

          }
  return (
    <div>
      <Header/>
   <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/:mediaType/:id" element={<Details/>} />
    <Route exact path="/search/:query" element={<SearchResult/>} />
    <Route exact path="/explore/:mediaType" element={<Explore/>} />
    <Route exact path="*" element={<NotFound/>} />
   </Routes>
   <Footer/>
    </div>
  )
}

export default App
