import { combineReducers } from 'redux'
function themesData (state = {
  isFetching: false,
  didInvalidate: false,
  others: [],
  lastUpdated: 0
}, action) {
  switch (action.type) {
    case 'requestThemes':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case 'succedThemes':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        others: action.others,
        lastUpdated: action.now
      })
    case 'failedThemes':
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
}

function latestData (state = {
  isFetching: false,
  didInvalidate: false,
  stories: [],
  lastUpdated: 0
}, action) {
  switch (action.type) {
    case 'requestLatest':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case 'succedLatest':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        stories: action.stories,
        lastUpdated: action.now
      })
    case 'failedLatest':
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
}

function articleData (state = {}, action) {
  switch (action.type) {
    case 'succedArticle':
      let newState =  Object.assign({}, state)
      newState[action.id] = action.res
      return newState
    default:
      return state
  }
}

const reducer = combineReducers({
  themesData,
  latestData,
  articleData
})

export default reducer