import {Component} from 'react'
import Cookies from 'js-cookie'
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
    this.check()
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

    // if (username.trim() === '') {
    //   this.setState({
    //     errorMessage: 'username should not be empty',
    //   })
    //   return
    // }

    // if (password.trim() === '') {
    //   this.setState({
    //     errorMessage: 'password should not be empty',
    //   })
    //   return
    // }

    this.setState({
      errorMessage: '',
    })

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
        this.setState({
          errorMessage: '',
        })
        Cookies.set('jwt_token', data.jwt_token, 30)
        const {history} = this.props
        history.replace('/')
      } else {
        this.setState({errorMessage: data.error_msg})
      }
    } catch (error) {
      console.log('Something went wrong:', error)
    }
  }

  check() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      const {history} = this.props
      history.replace('/')
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
            <label htmlFor="password">PASSWORD</label>
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
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
