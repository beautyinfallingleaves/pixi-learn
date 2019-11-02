import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../redux/user'


class AuthForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const formName = event.target.name
    const email = event.target.email.value
    const password = event.target.password.value
    const history = this.props.history
    this.props.authThunkCreator(email, password, formName, history)
  }

  render() {
    const { name, displayName, error } = this.props

    return (
      <div>
        <h1>{displayName}</h1>
        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

const mapLoginToProps = (state) => {
  return {
    name: 'login',
    displayName: 'Log In',
    error: state.user.error,
  }
}

const mapSignupToProps = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authThunkCreator: (email, password, formName, history) => dispatch(auth(email, password, formName, history))
  }
}

export const Login = withRouter(connect(mapLoginToProps, mapDispatchToProps)(AuthForm))
export const Signup = withRouter(connect(mapSignupToProps, mapDispatchToProps)(AuthForm))
