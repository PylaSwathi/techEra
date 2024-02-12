import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, data: []}

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const {courses} = data
      const updatedData = courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({apiStatus: apiStatusConstants.success, data: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  componentDidMount = async () => {
    this.getData()
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div className="cont">
        <h1>Courses</h1>
        <ul className="items-cont">
          {data.map(each => (
            <Link to={`/courses/${each.id}`} className="link">
              <li key={each.id} className="each-item">
                <img src={each.logoUrl} alt={each.name} />
                <p>{each.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
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
    return <div className="home-container">{this.renderViews()}</div>
  }
}

export default Home
