import './container.scss'
import { Spin, Alert, Space } from 'antd'

import MovieCard from '../movie-card'

const Container = ({ movies, isLoading, error }) => {
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
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            imageSrc={movie.poster.previewUrl}
            title={movie.name}
            subtitle={movie.year}
            description={movie.description}
          />
        ))
      )}
    </div>
  )
}

export default Container
