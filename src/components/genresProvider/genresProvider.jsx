import React from 'react'

import { useGenres } from '../../hooks'

export const GenresContext = React.createContext({})

const GenresProvider = ({ children }) => {
  const genres = useGenres()
  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
}

export default GenresProvider
