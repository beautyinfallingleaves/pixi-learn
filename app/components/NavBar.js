import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/user'

class NavBar extends React.Component {
  constructor() {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.logoutActionCreator(this.props.history)
  }

  render() {
    const { user, isLoggedIn } = this.props
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              <NavLink to="/home">Home</NavLink>
              <a href="#" onClick={this.handleLogout}>Logout</a>
              <p>Logged in as {user}</p>
            </div>
          ) : (
            <div>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.email,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutActionCreator: (history) => dispatch(logout(history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
