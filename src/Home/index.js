import {useHistory, withRouter} from 'react-router-dom'
import './index.css'

const Home = () => {
  const history = useHistory()

  const onClickFindJobs = () => {
    history.push('/jobs')
  }

  return (
    <div className="home-container">
      <h3>Find the job that fits your life</h3>
      <p>
        Millions of people are searching for jobs, salary information ,company
        reviews. Find the jobs that fits your ability and potential.
      </p>
      <div>
        <button type="button" onClick={onClickFindJobs} className="nav-button">
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default withRouter(Home)
