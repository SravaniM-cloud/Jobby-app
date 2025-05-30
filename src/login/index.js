import {Component} from 'react'
import Cookie from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {CONSTANTS} from '../constants'
import './index.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePwd = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const otherOptions = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      //   mode: 'no-cors',
    }
    try {
      const apiResponse = await fetch(
        CONSTANTS.API_MAPPING.LOGIN_API,
        otherOptions,
      )
      const data = await apiResponse.json()
      if (apiResponse.ok) {
        Cookie.set('jwt-token', data.jwt_token)
        this.setState({
          errorMessage: '',
        })
        const {history} = this.props

        history.push('/home')
      } else {
        this.setState({errorMessage: data.error_msg})
      }
    } catch (error) {
      console.log('Something went wrong:', error)
    }
  }

  render() {
    const {username, password, errorMessage} = this.state
    return (
      <div className="login-page-container">
        <div className="login-card-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <form onSubmit={this.onClickLogin}>
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="username"
              className="input"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={this.onChangePwd}
            />
            <br />
            <p className="error">{errorMessage}</p>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
