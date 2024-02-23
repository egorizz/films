import React, { useEffect, useState, useCallback } from 'react'
import './app.scss'
import debounce from 'lodash/debounce'

import Container from '../container'
import SearchInput from '../searchInput'
import MoviePagination from '../moviePagination'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  const fetchMovies = useCallback(async (query, page) => {
    if (!query) return

    const apiKey = 'Q813DBJ-SS5M9X5-QF0Z0SQ-KFS5A59'
    const url = `https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=6&query=${query}`

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          accept: 'application/json',
        },
      })
      const { docs, total } = await response.json()

      if (total === 0) {
        throw new Error('No movies found.')
      }
      setTotalResults(total)

      setMovies(docs)
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

  return (
    <div className="top-container">
      <SearchInput onChange={handleSearchInputChange} />
      <Container movies={movies} isLoading={isLoading} error={error} />
      {Boolean(totalResults) && <MoviePagination totalResults={totalResults} setPage={setPage} />}
    </div>
  )
}

export default App
