import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux/users'

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsersThunkCreator()
  }

  render() {
    const users = this.props.users

    return (
      <div>
        <h1>ALL USERS:</h1>
        {users.map(user => {
          return (
            <div key={user.id}>
              {user.firstName} {user.lastName}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = dispatch => ({
  fetchUsersThunkCreator: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
