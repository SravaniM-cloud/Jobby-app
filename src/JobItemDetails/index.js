import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {FaStar, FaMapMarkerAlt, FaSuitcase, FaLink} from 'react-icons/fa'

import {withRouter} from 'react-router-dom'
import {CONSTANTS} from '../constants'

import './index.css'

class JobItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {jobData: {}, status: CONSTANTS.API_STATUS.IN_PROGRESS}
  }

  componentDidMount() {
    this.getJobDetails()
  }

  componentWillUnmount() {}

  getJobDetails = async () => {
    this.setState({
      status: CONSTANTS.API_STATUS.IN_PROGRESS,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const otherOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      `${CONSTANTS.API_MAPPING.GET_JOB_INFO}${id}`,
      otherOptions,
    )
    if (response.ok) {
      const data = await response.json()
      this.setState({
        jobData: {
          jobDetails: data.job_details,
          lifeAtCompany: data.job_details.life_at_company,
          similarJobs: data.similar_jobs,
        },
        status: CONSTANTS.API_STATUS.SUCCESS,
      })
    } else {
      this.setState({
        jobData: {},
        status: CONSTANTS.API_STATUS.FAILURE,
      })
    }
  }

  successView = () => {
    const {jobData} = this.state
    const {jobDetails, similarJobs, lifeAtCompany} = jobData
    return (
      <>
        <div className="img-title-container">
          <div className="image-container">
            <img
              src={jobDetails.company_logo_url}
              alt="job details company logo"
            />
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
          <div className="desContainer">
            <h4>Description</h4>
            <a
              href={jobDetails.company_website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLink />
              Visit
            </a>
          </div>
          <p>{jobDetails.job_description}</p>
        </div>
        <div>
          <h4>Skills</h4>
          <ul className="skills-container">
            {jobDetails.skills.map(item => (
              <li className="skill-obj-container" key={item.name}>
                <img src={item.image_url} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Life at Company</h4>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(item => (
              <li key={item.id}>
                <div className="img-title-container">
                  <div className="image-container">
                    <img
                      src={item.company_logo_url}
                      alt="similar job company logo"
                    />
                  </div>
                  <div className="titles-container">
                    <h4>{item.title}</h4>
                    <div className="icon-container">
                      <FaStar /> <p>{item.rating}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4>Description</h4>
                  <p>{item.job_description}</p>
                </div>
                <div className="icon-container">
                  <div className="icon-container">
                    <FaMapMarkerAlt /> <p>{item.location}</p>
                  </div>
                  <div className="icon-container">
                    <FaSuitcase /> <p>{item.employment_type}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  failureView = () => (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h4>Oops! Something Went Wrong</h4>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" className="button" onClick={this.getJobDetails}>
          Retry
        </button>
      </div>
    </>
  )

  returnView = () => {
    const {status} = this.state
    console.log('status', status)
    if (status === CONSTANTS.API_STATUS.SUCCESS) {
      return this.successView()
    }
    if (status === CONSTANTS.API_STATUS.FAILURE) {
      return this.failureView()
    }
    return (
      <div data-testid="loader" className="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  render() {
    return <div className="jobItemDetailsContainer">{this.returnView()}</div>
  }
}

export default withRouter(JobItemDetails)
