import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import { me } from '../redux/user'

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
