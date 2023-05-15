import './index.css'

const FilterCategory = props => {
  const {item, selectedCategory, handleCategoryChange} = props
  const {categoryId, name} = item
  const isCategorySelected =
    categoryId === selectedCategory ? 'selected-category' : ''

  const changeCategory = () => {
    handleCategoryChange(categoryId)
  }
  return (
    <p
      className={`ct-list-item ${isCategorySelected}`}
      onClick={changeCategory}
    >
      {name}
    </p>
  )
}

export default FilterCategory
