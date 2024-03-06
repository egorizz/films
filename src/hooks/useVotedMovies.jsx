import { useState, useEffect } from 'react'

const useVotedMovies = () => {
  const [votedMovies, setVotedMovies] = useState([])

  useEffect(() => {
    const storedMovies = localStorage.getItem('votedMovies')
    if (storedMovies) {
      setVotedMovies(JSON.parse(storedMovies))
    }
  }, [])

  const voteForMovie = (movieId, rating) => {
    const votedMovie = { id: movieId, rating }
    const updatedMovies = [...votedMovies, votedMovie]
    setVotedMovies(updatedMovies)
    localStorage.setItem('votedMovies', JSON.stringify(updatedMovies))
  }

  return { votedMovies, voteForMovie }
}

export default useVotedMovies
