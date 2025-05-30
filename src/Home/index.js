import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home-container">
    <h3>Find the job that fits your life</h3>
    <p>
      Millions of people are searching for jobs, salary information ,company
      reviews. Find the jobs that fits your ability and potential.
    </p>
    <div>
      <Link className="nav-link" to="/jobs">
        <button type="button" className="nav-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default withRouter(Home)
