import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './login'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import Jobs from './Jobs'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/home" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      {/* <ProtectedRoute exact path="/cart" component={Cart} />
      <Route path="/not-found" component={NotFound} /> */}
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
