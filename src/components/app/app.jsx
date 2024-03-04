import React, { useEffect, useState, useCallback } from 'react'
import './app.scss'
import debounce from 'lodash/debounce'

import { API_KEY } from '../../config'
import Container from '../container'
import SearchInput from '../searchInput'
import MoviePagination from '../moviePagination'
import GenresProvider from '../genresProvider'
import SessionProvider from '../sessionProvider/sessionProvider'
import MovieCard from '../movie-card'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [rating, setRating] = useState({})

  // В компоненте App:

  const fetchMovies = useCallback(async (query, page) => {
    if (!query) return

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json',
        },
      })
      const { results, total_results } = await response.json()
      console.log(results) // Проверим полученные результаты, чтобы убедиться, что vote_average присутствует

      if (total_results === 0) {
        throw new Error('No movies found.')
      }

      const moviesWithRating = results.map((movie) => ({
        ...movie,
        voteAverage: movie.vote_average, // Предполагаем, что рейтинг находится в свойстве vote_average
      }))

      setTotalResults(total_results)
      setMovies(moviesWithRating)
    } catch (err) {
      setError(err.message || 'Failed to load movies.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchMovies(searchQuery, page)
    } else {
      setMovies([])
    }
  }, [searchQuery, fetchMovies, page])

  const handleSearchInputChange = debounce((e) => {
    setPage(1)
    setSearchQuery(e.target.value)
  }, 500)

  const handleRateChange = (movieId, value) => {
    setRating((prevRating) => ({
      ...prevRating,
      [movieId]: value,
    }))
  }

  return (
    <SessionProvider>
      <GenresProvider>
        <div className="top-container">
          <SearchInput onChange={handleSearchInputChange} />
          <Container
            movies={movies}
            isLoading={isLoading}
            error={error}
            renderMovie={(movie) => (
              <MovieCard
                key={movie.id}
                imageSrc={movie.poster_path}
                title={movie.title}
                subtitle={movie.release_date}
                description={movie.overview}
                categories={movie.genre_ids}
                rating={rating[movie.id] || 0}
                onRate={(value) => handleRateChange(movie.id, value)}
              />
            )}
          />
          {Boolean(totalResults) && <MoviePagination totalResults={totalResults} setPage={setPage} />}
        </div>
      </GenresProvider>
    </SessionProvider>
  )
}

export default App
