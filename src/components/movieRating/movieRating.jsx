import axios from 'axios'

import { API_KEY } from '../../config'

export const getMovieById = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error)
      return null
    })
}
