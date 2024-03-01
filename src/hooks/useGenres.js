import { useEffect, useState } from 'react'

import { API_KEY } from '../config'

const useGenres = () => {
  const [genres, setGenres] = useState({})

  useEffect(() => {
    const loader = async () => {
      const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json',
        },
      })
      const { genres } = await response.json()
      setGenres(
        genres.reduce((acc, obj) => {
          acc[obj.id] = obj.name
          return acc
        }, {})
      )
    }
    loader()
  }, [])

  return genres
}

export default useGenres
