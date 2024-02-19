import { useEffect, useState } from 'react'
import MovieCard from '../movie-card'
import './container.scss'

const Container = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchMovies() {
      const query = 'return'
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=true&language=en-US&page=1`

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Q2ZDYwY2M0OTE5MWRhNzM4NDJhZThkYmMxMDJiZiIsInN1YiI6IjY1ZDFkYmZmZGI3MmMwMDE4NjM5YmE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CVO6-g2WCZESmxe8qxjm12DdBwccmxZWQchgXMaotCM`,
            accept: 'application/json',
          },
        })
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error('Ошибка при загрузке данных фильмов:', error)
      }
    }

    fetchMovies()
  }, [])
  return (
    <div className="container">
      {movies.map((movie) => (
        <MovieCard
          imageSrc={movie.poster_path}
          title={movie.title}
          subtitle={movie.release_date}
          description={movie.overview}
        />
      ))}
    </div>
  )
}

export default Container
