import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Splash from './components/splash.jsx'
import HomePage from './components/homePage.jsx'
import ViewPage from './components/viewPage.jsx'
import GridPage from './components/gridPage.jsx'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { fetchThemes } from './actions'

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
)

export class App extends React.Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <MuiThemeProvider>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    )
  }
}

injectTapEventPlugin();
ReactDOM.render((
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Splash}/>
      <Route path="splash" component={Splash}/>
      <Route path="homePage" component={HomePage}>
        <IndexRoute component={GridPage}/>
        <Route path="gridPage" component={GridPage}/>
      </Route>
      <Route path="viewPage/:id" component={ViewPage}/>
    </Route>
  </Router>
  </Provider>
), document.getElementById('App'))