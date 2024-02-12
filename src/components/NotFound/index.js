import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
          className="not-found-img"
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
      </div>
    )
  }
}
export default NotFound
