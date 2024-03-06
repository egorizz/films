import { useContext, useEffect, useState } from 'react'

import { SessionContext } from '../sessionProvider/sessionProvider'
import { API_KEY } from '../../config'
import Container from '../container'
import MoviePagination from '../moviePagination'

const RatedContainer = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const session = useContext(SessionContext)
  useEffect(() => {
    const loader = async () => {
      const url = `https://api.themoviedb.org/3/guest_session/${session}/rated/movies?page=${page}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json',
        },
      })
      const { results } = await response.json()
      setMovies(results)
    }
    loader()
  }, [page])
  return (
    <>
      <Container movies={movies} isLoading={false} />
      {Boolean(movies) && <MoviePagination totalResults={movies.length} setPage={setPage} />}
    </>
  )
}

export default RatedContainer
