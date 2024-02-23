import { Spin } from 'antd'
import './imageLoader.scss'
import React, { useState } from 'react'

const ImageLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true)

  const handleImageLoaded = () => {
    setLoading(false)
  }

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader-container__loader">
            <Spin />
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        style={{ display: loading ? 'none' : 'block' }}
        className="movie-card__image"
      />
    </>
  )
}

export default ImageLoader
