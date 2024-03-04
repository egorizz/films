import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import './movie-card.scss'
import { format } from 'date-fns'
import { Rate } from 'antd'

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

const MovieCard = ({ imageSrc, title, subtitle, categories, description, voteAverage, onRateChange, movie }) => {
  const genres = useContext(GenresContext)
  const [raitingCount, setRaitingCount] = useState(0)

  const onGetChange = (rate) => {
    setRaitingCount(rate)
    if (typeof onRateChange === 'function') {
      onRateChange(rate, movie.id)
    }
  }

  const renderGenres = () => {
    if (!genres || !categories || categories.length === 0) return null

    const renderedGenres = categories.slice(0, 2).map((categoryId, index) => {
      const genreName = genres[categoryId]
      return (
        <span key={index} className="movie-card__category">
          {genreName}
        </span>
      )
    })

    return renderedGenres
  }

  return (
    <div className="movie-card">
      {imageSrc ? (
        <ImageLoader src={'https://image.tmdb.org/t/p/w500' + imageSrc} alt={title} />
      ) : (
        <img src="/img/movie.webp" alt={title} className="movie-card__image" />
      )}
      <div className="movie-card__info movie-card__info_size">
        <div className="movie-card__item-rating">
          <h1 className="movie-card__title">{truncateDescription(title, 10)}</h1>
          <div
            className="movie-card__vote-average"
            style={{
              borderColor:
                voteAverage >= 7 ? '#66E900' : voteAverage >= 5 ? '#E9D100' : voteAverage >= 3 ? '#E97E00' : '#E90000',
            }}
          >
            {Math.round(voteAverage)}
          </div>
        </div>
        <h3 className="movie-card__subtitle">{subtitle && format(new Date(subtitle), 'MMMM d, yyyy')}</h3>
        <div className="movie-card__categories">{renderGenres()}</div>
        <p className="movie-card__description">{truncateDescription(description, 100)}</p>
        <Rate allowHalf onChange={onGetChange} value={raitingCount} count={10} className="rate" />
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.number),
  description: PropTypes.string,
  voteAverage: PropTypes.number,
  onRateChange: PropTypes.func,
  movie: PropTypes.object,
}

MovieCard.defaultProps = {
  subtitle: '',
  categories: [],
  description: '',
  voteAverage: 0,
}

export default MovieCard
