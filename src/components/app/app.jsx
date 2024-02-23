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

    const apiKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Q2ZDYwY2M0OTE5MWRhNzM4NDJhZThkYmMxMDJiZiIsInN1YiI6IjY1ZDFkYmZmZGI3MmMwMDE4NjM5YmE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CVO6-g2WCZESmxe8qxjm12DdBwccmxZWQchgXMaotCM'
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
    <div className="top-container">
      <SearchInput onChange={handleSearchInputChange} />
      <Container movies={movies} isLoading={isLoading} error={error} />
      {Boolean(totalResults) && <MoviePagination totalResults={totalResults} setPage={setPage} />}
    </div>
  )
}

export default App
