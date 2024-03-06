import { useState, useEffect } from 'react'

import { API_KEY } from '../config'

const useGuestSession = () => {
  const [session, setSession] = useState('')

  useEffect(() => {
    const loader = async () => {
      const url = 'https://api.themoviedb.org/3/authentication/guest_session/new'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json',
        },
      })
      const { guest_session_id } = await response.json()
      setSession(guest_session_id)
      localStorage.setItem('session', guest_session_id)
    }
    const localSession = localStorage.getItem('session')
    if (!localSession) {
      loader()
    } else {
      setSession(localSession)
    }
  }, [])

  return session
}

export default useGuestSession
