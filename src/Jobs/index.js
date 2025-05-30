/* eslint-disable no-useless-constructor */
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {CONSTANTS} from '../constants'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import JobItem from '../jobItem'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeOfEmp: [],
      salaryRange: '',
      jobItemsList: [],
      jobsStatus: CONSTANTS.API_STATUS.IN_PROGRESS,
      profileStatus: CONSTANTS.API_STATUS.IN_PROGRESS,
      profileDetails: {},
      searchText: '',
    }
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  componentWillUnmount() {}

  getProfile = async () => {
    try {
      this.setState({
        profileStatus: CONSTANTS.API_STATUS.IN_PROGRESS,
      })
      const token = Cookie.get('jwt-token')

      const otherOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const apiResponse = await fetch(
        CONSTANTS.API_MAPPING.GET_PROFILE,
        otherOptions,
      )
      if (apiResponse.ok) {
        const profileDetails = await apiResponse.json()
        this.setState({
          profileDetails: profileDetails.profile_details,
          profileStatus: CONSTANTS.API_STATUS.SUCCESS,
        })
      }
    } catch (error) {
      this.setState({
        profileStatus: CONSTANTS.API_STATUS.FAILURE,
      })

      console.error('Something went wrong:', error)
    }
  }

  getJobs = async () => {
    const {typeOfEmp, salaryRange, searchText} = this.state
    try {
      this.setState({
        jobsStatus: CONSTANTS.API_STATUS.IN_PROGRESS,
      })
      const token = Cookie.get('jwt-token')

      const otherOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const apiUrl = `${
        CONSTANTS.API_MAPPING.GET_JOBS
      }?employment_type=${typeOfEmp.join(
        ',',
      )}&minimum_package=${salaryRange}&search=${searchText}`
      const apiResponse = await fetch(apiUrl, otherOptions)
      if (apiResponse.ok) {
        const jobsResponse = await apiResponse.json()
        this.setState({
          jobsStatus: CONSTANTS.API_STATUS.SUCCESS,

          jobItemsList: jobsResponse.jobs,
        })
      } else {
        this.setState({
          jobsStatus: CONSTANTS.API_STATUS.FAILURE,
        })
      }
    } catch (error) {
      this.setState({
        jobsStatus: CONSTANTS.API_STATUS.FAILURE,
      })
      console.error('Something went wrong:', error)
    }
  }

  onSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onChangeEmpType = (event, item) => {
    const {checked} = event.target
    if (checked) {
      this.setState(
        prevState => ({
          typeOfEmp: [...prevState.typeOfEmp, item.employmentTypeId],
        }),
        this.getJobs,
      )
    } else {
      this.setState(prevState => {
        const newItems = prevState.typeOfEmp.filter(
          eachItem => eachItem !== item.employmentTypeId,
        )
        return {typeOfEmp: newItems}
      }, this.getJobs)
    }
  }

  onChangeSalaryRange = (event, item) => {
    const {value} = event.target
    console.log('value', value)
    this.setState(
      {
        salaryRange: item.salaryRangeId,
      },
      this.getJobs,
    )
  }

  profileView = () => {
    const {profileDetails} = this.state

    return (
      <>
        <img src={profileDetails.profile_image_url} alt="profile-image" />
        <h4>{profileDetails.name}</h4>
        <p>{profileDetails.short_bio}</p>
      </>
    )
  }

  getJobsView = () => {
    const {jobsStatus, jobItemsList} = this.state
    let view
    const {length} = jobItemsList
    switch (jobsStatus) {
      case CONSTANTS.API_STATUS.SUCCESS:
        if (length) {
          view = (
            <ul>
              {jobItemsList.map(jobItem => (
                <JobItem key={jobItem.id} jobDetails={jobItem} />
              ))}
            </ul>
          )
        } else {
          view = (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="No jobs present"
              />
              <h4>No Jobs Fount</h4>
              <p>We could not find any other jobs.Try other filters</p>
            </div>
          )
        }
        break

      case CONSTANTS.API_STATUS.IN_PROGRESS:
        view = (
          <div className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )
        break

      case CONSTANTS.API_STATUS.FAILURE:
        view = (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h4>Oops! Something Went Wrong</h4>
            <p>We cannot seem to find the page your are looking for</p>
            <button type="button" className="button" onClick={this.getJobs}>
              Retry
            </button>
          </div>
        )

        break

      default:
        break
    }
    return view
  }

  getProfileView = () => {
    const {profileStatus, profileDetails} = this.state
    let view
    const {length} = Object.keys(profileDetails)
    switch (profileStatus) {
      case CONSTANTS.API_STATUS.SUCCESS:
        if (length) {
          view = this.profileView()
        } else {
          view = (
            <div>
              <button
                type="button"
                className="button"
                onClick={this.getProfile}
              >
                Retry
              </button>
            </div>
          )
        }
        break

      case CONSTANTS.API_STATUS.FAILURE:
        view = (
          <div>
            <button type="button" className="button" onClick={this.getProfile}>
              Retry
            </button>
          </div>
        )
        break
      case CONSTANTS.API_STATUS.IN_PROGRESS:
        view = (
          <div className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )
        break
      default:
        break
    }
    return view
  }

  render() {
    const {searchText, salaryRange} = this.state

    return (
      <>
        <div className="jobs-page-container">
          <div className="left-container">
            <div>{this.getProfileView()}</div>
            <hr />
            <div>
              <h4>Types of Employment</h4>
              <ul>
                {employmentTypesList.map(item => (
                  <li key={item.employmentTypeId}>
                    <input
                      id={item.employmentTypeId}
                      type="checkbox"
                      onChange={event => this.onChangeEmpType(event, item)}
                    />
                    <label htmlFor={item.employmentTypeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h4>Salary Range</h4>
              <ul>
                {salaryRangesList.map(item => (
                  <li key={item.salaryRangeId}>
                    <input
                      name="SalaryRange"
                      id={item.salaryRangeId}
                      type="radio"
                      value={salaryRange}
                      onChange={event => this.onChangeSalaryRange(event, item)}
                    />
                    <label htmlFor={item.salaryRangeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <input
              type="search"
              value={searchText}
              onChange={this.onSearchInput}
            />
            <button type="button" onClick={this.onClickSearch}>
              Search
            </button>
            {this.getJobsView()}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Jobs)
