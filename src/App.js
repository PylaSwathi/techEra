import {Route, Redirect, Switch} from 'react-router-dom'
import Header from './components/Header'
import NotFound from './components/NotFound'
import DetailedItem from './components/DetailedItem'
import Home from './components/Home'
import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={DetailedItem} />
      <Route path="not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
