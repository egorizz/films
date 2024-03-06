// utils.js
import { API_KEY } from '../config'

export const getRatedMovies = async (guestSessionToken, pageNumber = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/guest_session/${guestSessionToken}/rated/movies?api_key=${API_KEY}&page=${pageNumber}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch rated movies.')
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error fetching rated movies:', error)
    return []
  }
}
