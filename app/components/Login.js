import React from 'react'

const defaultState = {
  email: '',
  password: '',
}

class Login extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label
              htmlFor="email"
            />
            <input
              name="email"
              type="text"
              required={true}
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
            />
            <input
              name="password"
              type="text"
              required={true}
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
