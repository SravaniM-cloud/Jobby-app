import {useHistory, withRouter, Link} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

const Navbar = () => {
  const history = useHistory()

  const logOut = () => {
    Cookie.remove('jwt-token')
    history.push('/login')
  }

  return (
    <div>
      <div className="nav-bar">
        <img src="" alt="website logo" />
        <div className="center-items">
          <Link className="nav-link" to="/home">
            <li>Home</li>
          </Link>
          <Link className="nav-link" to="/jobs">
            <li>Jobs</li>
          </Link>
        </div>
        <div>
          <button type="button" className="nav-button " onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
