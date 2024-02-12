import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class DetailedItem extends Component {
  state = {apiStatus: apiStatusConstants.initial, data: []}

  componentDidMount = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = ` https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const courseDetails = data.course_details
      const updatedData = {
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
      }
      this.setState({apiStatus: apiStatusConstants.success, data: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="cont">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" type="button" onClick={this.getData()}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div className="view-cont">
        <img src={data.imageUrl} alt={data.name} className="image" />
        <div className="content">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
        </div>
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return this.renderViews()
  }
}

export default DetailedItem
