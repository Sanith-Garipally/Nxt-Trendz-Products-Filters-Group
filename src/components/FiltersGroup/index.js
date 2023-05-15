import {BsSearch} from 'react-icons/bs'
import FilterCategory from '../FilterCategory'
import FilterRating from '../FilterRating'
import './index.css'

const FiltersGroup = props => {
  const {
    handleInputSearch,
    inputValue,
    categoryOptions,
    selectedCategory,
    handleCategoryChange,
    ratingsList,
    selectedRating,
    handleRatingChange,
    handleClearFilters,
    handleStartSearch,
  } = props

  const inputChange = e => {
    handleInputSearch(e.target.value)
  }

  const startSearch = event => {
    if (event.key === 'Enter') {
      handleStartSearch()
    }
  }

  const clearFilters = () => {
    handleClearFilters()
  }

  return (
    <div className="filters-group-container">
      <div className="input-container">
        <input
          value={inputValue}
          onChange={inputChange}
          onKeyDown={startSearch}
          className="searchInput"
          type="search"
          placeholder="Search"
        />
        <BsSearch className="search-icon" />
      </div>
      <h1 className="ct-title">Category</h1>
      <div className="ct-list-container">
        {categoryOptions.map(object => (
          <FilterCategory
            key={object.categoryId}
            item={object}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        ))}
      </div>
      <h1 className="rt-title">Rating</h1>
      <ul className="rt-list-container">
        {ratingsList.map(object => (
          <FilterRating
            key={object.ratingId}
            item={object}
            selectedRating={selectedRating}
            handleRatingChange={handleRatingChange}
          />
        ))}
      </ul>
      <button className="clear-filter-btn" type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
