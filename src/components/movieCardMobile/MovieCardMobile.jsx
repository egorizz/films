import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import './movieCardMobile.scss'
import { format } from 'date-fns'
import { Rate } from 'antd'

import ImageLoader from '../imageLoader'
import { GenresContext } from '../genresProvider/genresProvider'
import { SessionContext } from '../sessionProvider/sessionProvider'
import { API_KEY } from '../../config'
import { addRate, getRate } from '../../store'

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

const movieCardMobile = ({ imageSrc, title, subtitle, categories, description, voteAverage, movieId }) => {
  const genres = useContext(GenresContext)
  const session = useContext(SessionContext)
  const [raitingCount, setRaitingCount] = useState(getRate(movieId))
  console.log(title, raitingCount)
  const onGetChange = (rate) => {
    setRaitingCount(rate)
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ value: rate }),
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${session}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
    addRate(movieId, rate)
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
      <div className="flex-movie">
        <div className="movie-card__image-title">
          {imageSrc ? (
            <ImageLoader src={'https://image.tmdb.org/t/p/w500' + imageSrc} alt={title} />
          ) : (
            <img src="/img/movie.webp" alt={title} className="movie-card__image" />
          )}
          <div className="movie-card__title-subtitle">
            <h1 className="movie-card__title">{truncateDescription(title, 10)}</h1>
            <div className="movie-card__subtitle-categories">
              <h3 className="movie-card__subtitle">{subtitle && format(new Date(subtitle), 'MMMM d, yyyy')}</h3>
              <div className="movie-card__categories">{renderGenres()}</div>
            </div>
          </div>
        </div>
        <div className="movie-card__item-rating">
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
      </div>
      <div className="movie-card__info movie-card__info_size"></div>
      <p className="movie-card__description">{truncateDescription(description, 100)}</p>
      <Rate allowHalf onChange={onGetChange} value={raitingCount} count={10} className="rate" />
    </div>
  )
}

movieCardMobile.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.number),
  description: PropTypes.string,
  voteAverage: PropTypes.number,
  onRateChange: PropTypes.func,
  movie: PropTypes.object,
}

movieCardMobile.defaultProps = {
  subtitle: '',
  categories: [],
  description: '',
  voteAverage: 0,
}

export default movieCardMobile
