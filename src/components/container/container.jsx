import React, { useState, useEffect } from 'react'
import './container.scss'
import { Spin, Alert, Space } from 'antd'

import MovieCard from '../movie-card'
import MovieCardMobile from '../movieCardMobile'

const Container = ({ movies, isLoading, error }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 550)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="container">
      {isLoading ? (
        <Spin />
      ) : error ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message="Error" description={error} type="error" showIcon />
        </Space>
      ) : (
        movies &&
        Array.isArray(movies) &&
        movies.map((movie) => {
          return isMobile ? (
            <MovieCardMobile
              key={movie.id}
              imageSrc={movie.poster_path}
              title={movie.title}
              subtitle={movie.release_date}
              description={movie.overview}
              categories={movie.genre_ids}
              voteAverage={movie.vote_average}
              movieId={movie.id}
            />
          ) : (
            <MovieCard
              key={movie.id}
              imageSrc={movie.poster_path}
              title={movie.title}
              subtitle={movie.release_date}
              description={movie.overview}
              categories={movie.genre_ids}
              voteAverage={movie.vote_average}
              movieId={movie.id}
            />
          )
        })
      )}
    </div>
  )
}

export default Container
