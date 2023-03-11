import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import SignIn from './components/SignIn'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  const LoginDetails = JSON.parse(localStorage.getItem('users_list'))
  if (LoginDetails === null) {
    const users = []
    localStorage.setItem('users_list', JSON.stringify(users))
  }

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
