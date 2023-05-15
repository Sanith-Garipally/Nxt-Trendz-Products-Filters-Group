import './index.css'

const FilterRating = props => {
  const {item, selectedRating, handleRatingChange} = props
  const {ratingId, imageUrl} = item
  const isRatingSelected = ratingId === selectedRating ? 'selected-rating' : ''

  const changeRating = () => {
    handleRatingChange(ratingId)
  }
  return (
    <li className="rt-list-item">
      <button
        onClick={changeRating}
        className={`rt-btn ${isRatingSelected}`}
        type="button"
      >
        <img className="rt-img" alt={`rating ${ratingId}`} src={imageUrl} />
        &up
      </button>
    </li>
  )
}

export default FilterRating
