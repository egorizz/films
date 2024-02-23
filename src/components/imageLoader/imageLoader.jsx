import { Spin } from 'antd'
import React, { useState } from 'react'

const ImageLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true)

  const handleImageLoaded = () => {
    setLoading(false)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        style={{ display: loading ? 'none' : 'block' }}
        className="movie-card__image"
      />
    </div>
  )
}

export default ImageLoader