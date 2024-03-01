import React, { useEffect, useState, useCallback } from 'react'
import './app.scss'
import debounce from 'lodash/debounce'

import { API_KEY } from '../../config'
import Container from '../container'
import SearchInput from '../searchInput'
import MoviePagination from '../moviePagination'
import GenresProvider from '../genresProvider'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

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

      if (total_results === 0) {
        throw new Error('No movies found.')
      }
      console.log(total_results)
      setTotalResults(total_results)

      setMovies(results)
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
    <GenresProvider>
      <div className="top-container">
        <SearchInput onChange={handleSearchInputChange} />
        <Container movies={movies} isLoading={isLoading} error={error} />
        {Boolean(totalResults) && <MoviePagination totalResults={totalResults} setPage={setPage} />}
      </div>
    </GenresProvider>
  )
}

export default App
