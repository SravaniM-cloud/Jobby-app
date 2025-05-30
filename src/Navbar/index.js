import {useHistory, withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Navbar = () => {
  const history = useHistory()

  const logOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div>
      <div className="nav-bar">
        <Link className="nav-link" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="center-items">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>

          <li>
            <button type="button" className="nav-button " onClick={logOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
