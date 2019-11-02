import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
// import { logout } from ../redux/loggedInUser

const NavBar = ({ handleClick, isLoggedIn }) => {
  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            <NavLink to="/home">Home</NavLink>
            <a href="#" onClick={handleClick}>Logout</a>
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick() {
      console.log('Will Log Out!')
      // dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
