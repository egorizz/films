import React from 'react'

import { useGuestSession } from '../../hooks'

export const SessionContext = React.createContext('')

const SessionProvider = ({ children }) => {
  const session = useGuestSession()
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}

export default SessionProvider
