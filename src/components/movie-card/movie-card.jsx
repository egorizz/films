import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import './movie-card.scss'
import { format } from 'date-fns'

import ImageLoader from '../imageLoader'
import { GenresContext } from '../genresProvider/genresProvider'

const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description
  }

  let truncated = description.substr(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  if (lastSpaceIndex > -1) {
    truncated = truncated.substr(0, lastSpaceIndex)
  }

  return `${truncated}...`
}

const MovieCard = ({ imageSrc, title, subtitle, categories, description }) => {
  const genres = useContext(GenresContext)
  console.log(genres)
  console.log(categories)
  return (
    <div className="movie-card">
      {imageSrc ? (
        <ImageLoader src={'https://image.tmdb.org/t/p/w500' + imageSrc} alt={title} />
      ) : (
        <img src="/img/movie.webp" alt={title} className="movie-card__image" />
      )}
      <div className="movie-card__info movie-card__info_size">
        <h1 className="movie-card__title">{truncateDescription(title, 30)}</h1>
        <h3 className="movie-card__subtitle">{subtitle && format(new Date(subtitle), 'MMMM d, yyyy')}</h3>
        <p className="movie-card__categories">
          {genres &&
            categories.map((category) => {
              const genre = genres[category]
              return <span key={category}>{genre}</span>
            })}
        </p>
        <p className="movie-card__description">{truncateDescription(description, 100)}</p>
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
}

MovieCard.defaultProps = {
  subtitle: '',
  categories: [],
  description: '',
}

export default MovieCard
