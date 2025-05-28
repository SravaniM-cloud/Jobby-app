/* eslint-disable no-useless-constructor */
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {CONSTANTS} from '../constants'

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
      salaryRange: [],
      jobItemsList: [],
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
        })
      }
    } catch (error) {
      console.error('Something went wrong:', error)
    }
  }

  getJobs = async () => {
    const {typeOfEmp, salaryRange, searchText} = this.state
    try {
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
      )}&minimum_package=${salaryRange.join(',')}&search=${searchText}`
      const apiResponse = await fetch(apiUrl, otherOptions)
      if (apiResponse.ok) {
        const jobsResponse = await apiResponse.json()
        this.setState({
          jobItemsList: jobsResponse.jobs,
        })
      }
    } catch (error) {
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
    const {checked} = event.target
    if (checked) {
      this.setState(
        prevState => ({
          salaryRange: [...prevState.salaryRange, item.salaryRangeId],
        }),
        this.getJobs,
      )
    } else {
      this.setState(prevState => {
        const newItems = prevState.salaryRange.filter(
          eachItem => eachItem !== item.salaryRangeId,
        )
        return {salaryRange: newItems}
      }, this.getJobs)
    }
  }

  render() {
    const {profileDetails, jobItemsList, searchText} = this.state

    const jobsLength = jobItemsList.length > 0

    return (
      <>
        <div className="jobs-page-container">
          <div className="left-container">
            <div>
              {Object.keys(profileDetails).length && (
                <>
                  <img
                    src={profileDetails.profile_image_url}
                    alt="profile-image"
                  />
                  <h4>{profileDetails.name}</h4>
                  <p>{profileDetails.short_bio}</p>
                </>
              )}
              {Object.keys(profileDetails).length === 0 && (
                <div>
                  <button type="button" onClick={this.getProfile}>
                    Retry
                  </button>
                </div>
              )}
            </div>
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
                      id={item.salaryRangeId}
                      type="checkbox"
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
            {jobsLength && (
              <ul>
                {jobItemsList.map(jobItem => (
                  <JobItem key={jobItem.id} jobDetails={jobItem} />
                ))}
              </ul>
            )}
            {!jobsLength && <div>No jobs present</div>}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Jobs)
