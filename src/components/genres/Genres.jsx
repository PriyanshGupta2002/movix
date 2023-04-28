import React from 'react'
import './genres.scss'
import { useSelector } from 'react-redux'
const Genres = ({data}) => {
    const {genres} = useSelector((state)=>state.home)
    const movieGenres = data?.map((id)=>genres[id])
  return (
    <div className='genres'>
       {movieGenres?.map((g)=>{
          if (!g?.name) {
            return
          }
        return (
            <div className="genre" key={g?.id}>
            {g?.name}
        </div>
        )
       })}
    </div>
  )
}

export default Genres