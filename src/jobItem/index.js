import {FaStar, FaMapMarkerAlt, FaSuitcase} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props

  const onClickJobItem = () => {
    const {history} = props
    history.push(`/jobs/${jobDetails.id}`)
  }

  return (
    <li className="card" onClick={onClickJobItem}>
      <div className="img-title-container">
        <div className="image-container">
          <img src={jobDetails.company_logo_url} alt="" />
        </div>
        <div className="titles-container">
          <h4>{jobDetails.title}</h4>
          <div className="icon-container">
            <FaStar /> <p>{jobDetails.rating}</p>
          </div>
          <div className="job-details-container">
            <div className="icon-container">
              <div className="icon-container">
                <FaMapMarkerAlt /> <p>{jobDetails.location}</p>
              </div>
              <div className="icon-container">
                <FaSuitcase /> <p>{jobDetails.employment_type}</p>
              </div>
            </div>
            <div>
              <p>{jobDetails.package_per_annum}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h4>Description</h4>
        <p>{jobDetails.job_description}</p>
      </div>
    </li>
  )
}

export default withRouter(JobItem)
