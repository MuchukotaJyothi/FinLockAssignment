import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isErrorEmail: false,
    errorMsgEmail: '',
    passwordHide: true,
    isErrorPass: false,
    errorMsgPass: '',
    isError: false,
    errMsg: '',
  }

  onClickImg = () => {
    this.setState(prevState => ({passwordHide: !prevState.passwordHide}))
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginProcess = () => {
    const {username, password} = this.state
    const details = JSON.parse(localStorage.getItem('users_list'))
    let exists = false
    details.forEach(eachItem => {
      if (eachItem.username === username) {
        exists = true
      }
    })
    if (exists) {
      const particularUser = details.filter(
        eachItem => eachItem.username === username,
      )
      if (particularUser[0].password === password) {
        const currentUser = details.filter(
          eachElement => eachElement.username === username,
        )
        const jwtToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y'
        Cookies.set('jwt_token', jwtToken, {expires: 1})
        localStorage.setItem('current_user', JSON.stringify(currentUser[0]))
        const {history} = this.props

        history.replace('/')
      } else {
        this.setState({
          isError: true,
          errMsg: "Email and Password didn't match",
        })
      }
    } else {
      this.setState({
        isError: true,
        errMsg: 'The user seems to be new! Please sign up',
      })
    }
  }

  checkFields = () => {
    const {username, password} = this.state
    if (username === '') {
      this.setState({
        isErrorEmail: true,
        errorMsgEmail: 'Please enter a valid email.',
      })
    } else if (password === '') {
      this.setState({
        isErrorPass: true,
        errorMsgPass: 'Please enter a valid password',
      })
    } else if (password.length < 8) {
      this.setState({
        isErrorPass: true,
        errorMsgPass: 'Password must be 8 characters long.',
      })
    } else {
      this.setState({isErrorEmail: false, isErrorPass: false})
      this.loginProcess()
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.checkFields()
  }

  render() {
    const {
      username,
      password,
      isErrorEmail,
      errorMsgEmail,
      passwordHide,
      isErrorPass,
      errorMsgPass,
      isError,
      errMsg,
    } = this.state
    const imgUrl = passwordHide
      ? 'https://res.cloudinary.com/dwkye4hwh/image/upload/v1678514130/ic_hide_password_lxvngq.svg'
      : 'https://res.cloudinary.com/dwkye4hwh/image/upload/v1678514174/ic_unhide_password_vqtalq.svg'

    const passwordType = passwordHide ? 'password' : 'text'

    return (
      <div className="container">
        <div className="bg-container">
          <img
            src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1678509378/ic_user_p6zapv.svg"
            alt="login img"
            className="login-img"
          />
          <h1 className="main-heading">Welcome!</h1>
          <p className="main-para">
            Lets connect to your workspace. <br />
            Please enter your email to continue.
          </p>
          <form onSubmit={this.onSubmitForm} className="form-container">
            <div className="email-container">
              <label htmlFor="email" className="main-para">
                Email
              </label>
              <br />
              <input
                value={username}
                placeholder="Email Address"
                onChange={this.onChangeUserName}
                className="user-input"
                id="email"
                type="text"
              />
              {isErrorEmail ? <p className="error-msg">{errorMsgEmail}</p> : ''}
            </div>
            <div className="password-container">
              <label htmlFor="pass" className="main-para">
                Password
              </label>
              <br />
              <div className="pass-img-container">
                <input
                  value={password}
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  className="password-input"
                  id="pass"
                  type={passwordType}
                />
                <button
                  type="button"
                  onClick={this.onClickImg}
                  className="eye-img-btn"
                >
                  <img src={imgUrl} alt="password" className="eye-img" />
                </button>
              </div>
              {isErrorPass ? <p className="error-msg">{errorMsgPass}</p> : ''}
            </div>
            <p className="para-forgot">Forgot Password?</p>
            <p className="main-para">
              Create account <Link to="/sign-in">Sign In</Link>
            </p>
            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
            {isError ? <p className="error-msg">{errMsg}</p> : ''}
          </form>
        </div>
        <div className="bottom-container">
          <p className="para-span">
            Powered By <span className="para-forgot">Zaperon</span>
          </p>
          <div className="need-help">
            <p className="para-forgot para">Need Help?</p>
            <p className="para-forgot">
              Privacy Policy <span className="para-span">&</span> Terms
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
