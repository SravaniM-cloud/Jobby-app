import {useHistory, withRouter} from 'react-router-dom'
import './index.css'

const Home = () => {
  const history = useHistory()

  const logOut = () => {
    history.push('/login')
  }

  const onClickFindJobs = () => {
    history.push('/jobs')
  }

  return (
    <div className="home-container">
      <div className="nav-bar">
        <img src="" alt="website logo" />
        <div className="center-items">
          <button type="button" className="nav-button ">
            Home
          </button>
          <button type="button" className="nav-button ">
            Jobs
          </button>
        </div>
        <div>
          <button type="button" className="nav-button " onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
      <div>
        <h3>Find the job that fits your life</h3>
        <p>
          Millions of people are searching for jobs, salary information ,company
          reviews. Find the jobs that fits your ability and potential.
        </p>
        <div>
          <button
            type="button"
            onClick={onClickFindJobs}
            className="nav-button"
          >
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home)
