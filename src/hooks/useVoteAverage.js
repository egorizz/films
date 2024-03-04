import { useEffect, useState } from 'react'

import { API_KEY } from '../config'

const useVoteAverage = () => {
  const [voteAverageList, setVoteAverageList] = useState([])

  useEffect(() => {
    const loader = async () => {
      const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY
      const response = await fetch(url)
      const data = await response.json()
      const voteAverages = data.results.map((movie) => movie.vote_average)
      setVoteAverageList(voteAverages)
    }
    loader()
  }, [])

  return voteAverageList
}

export default useVoteAverage
