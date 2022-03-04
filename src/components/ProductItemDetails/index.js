// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'

import './index.css'

const apiResponseConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    status: apiResponseConstants.initial,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getServerResponse(id)
  }

  getServerResponse = async id => {
    this.setState({
      status: apiResponseConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/products/:${id}`
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const dataResponse = await response.json()
      this.setState({
        status: apiResponseConstants.success,
      })
      console.log(dataResponse)
    } else {
      this.setState({
        status: apiResponseConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
      />
      <p>Error</p>
    </div>
  )

  renderBodyView = () => {
    const {status} = this.state
    switch (status) {
      case apiResponseConstants.success:
        return this.renderSuccessView()
      case apiResponseConstants.inProgress:
        return this.renderLoadingView()
      case apiResponseConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderBodyView()}
      </>
    )
  }
}

export default ProductItemDetails
