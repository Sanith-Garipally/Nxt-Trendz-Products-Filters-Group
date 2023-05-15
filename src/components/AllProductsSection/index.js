import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    searchText: '',
    categoryId: '',
    ratingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, searchText, categoryId, ratingId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchText}&category=${categoryId}&rating=${ratingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  handleInputSearch = value => {
    if (!value) {
      this.setState(
        {
          searchText: '',
        },
        this.getProducts,
      )
    } else {
      this.setState({
        searchText: value,
      })
    }
  }

  handleStartSearch = () => {
    this.getProducts()
  }

  handleCategoryChange = id => {
    this.setState(
      {
        categoryId: id,
      },
      this.getProducts,
    )
  }

  handleRatingChange = id => {
    this.setState(
      {
        ratingId: id,
      },
      this.getProducts,
    )
  }

  handleClearFilters = () => {
    this.setState(
      {
        searchText: '',
        categoryId: '',
        ratingId: '',
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View

    return (
      <>
        {productsList.length === 0 ? (
          <div className="np-container">
            <img
              className="np-img"
              alt="no products"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            />
            <h1 className="np-head">No Products Found</h1>
            <p className="np-para">
              We could not find any products. Try other filters.
            </p>
          </div>
        ) : (
          <div className="all-products-container">
            <ProductsHeader
              activeOptionId={activeOptionId}
              sortbyOptions={sortbyOptions}
              changeSortby={this.changeSortby}
            />
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderDataFailure = () => (
    <div className="np-container">
      <img
        className="np-img"
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1 className="np-head">Oops! Something Went Wrong</h1>
      <p className="np-para">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  render() {
    const {apiStatus, searchText, categoryId, ratingId} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          inputValue={searchText}
          handleInputSearch={this.handleInputSearch}
          categoryOptions={categoryOptions}
          selectedCategory={categoryId}
          handleCategoryChange={this.handleCategoryChange}
          ratingsList={ratingsList}
          selectedRating={ratingId}
          handleRatingChange={this.handleRatingChange}
          handleClearFilters={this.handleClearFilters}
          handleStartSearch={this.handleStartSearch}
        />

        {(() => {
          switch (apiStatus) {
            case apiStatusConstants.inProgress:
              return this.renderLoader()

            case apiStatusConstants.success:
              return this.renderProductsList()

            case apiStatusConstants.failure:
              return this.renderDataFailure()
            default:
              return null
          }
        })()}
      </div>
    )
  }
}

export default AllProductsSection
