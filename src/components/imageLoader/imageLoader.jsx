import { Spin } from 'antd'
import React, { useState } from 'react'

const ImageLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true)

  const handleImageLoaded = () => {
    setLoading(false)
  }

  return (
    <>
      {!loading && (
        <div style={{ position: 'relative' }}>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <Spin />
            </div>
          )}
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
