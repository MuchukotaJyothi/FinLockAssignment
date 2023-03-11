import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Home = props => {
  const details = JSON.parse(localStorage.getItem('current_user'))
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const onClickBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="home-container">
      <h1 className="main-para">Welcome {details.username}</h1>
      <button type="button" onClick={onClickBtn} className="sign-in-btn btn">
        Logout
      </button>
    </div>
  )
}

export default Home
