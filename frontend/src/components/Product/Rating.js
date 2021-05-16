import React from 'react'

const Rating = ({ color, rating, review }) => {
  return (
    <div className="rating">
      <span>
        {[1, 2, 3, 4, 5].map((index) => (
          <i
            key={index}
            style={{ color }}
            className={
              rating >= index
                ? 'fas fa-star'
                : rating >= index - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        ))}
      </span>{' '}
      <span>{review && review + ' Reviews'}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#ffdf00 ',
  rating: 0,
}

export default Rating
