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

function metaData (state = {
  isFetching: false,
  didInvalidate: false,
  stories: [],
  lastUpdated: 0
}, action) {
  switch (action.type) {
    case 'requestThemePage':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case 'succedThemePage':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        stories: action.stories,
        background: action.background,
        lastUpdated: action.now
      })
    case 'failedThemePage':
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
}

function themePageData (state = {}, action) {
  switch (action.type) {
    case 'requestThemePage':
    case 'succedThemePage':
    case 'failedThemePage':
      return Object.assign({}, state, {
        [action.id]: metaData(state[action.id], action)
      })
    default:
      return state
  }
}

function beforeData (state = {
  stories: []
}, action) {
  switch (action.type) {
    case 'succedbeforeData':
      return Object.assign({}, state, {
        stories: action.stories
      })
    default:
      return state
  }
}

function beforePageData (state = {}, action) {
  switch (action.type) {
    case 'succedbeforeData':
      return Object.assign({}, state, {
        [action.date]: beforeData(state[action.date], action)
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

function getDate () {
  let date = new Date()
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

function curState (state = {
  curSelected: 'latest',
  curTitle: '最新消息',
  curDate: getDate()
}, action) {
  switch (action.type) {
    case 'setState':
      return Object.assign({}, state, {
        curSelected: action.curSelected,
        curTitle: action.curTitle
      })
    case 'setDate':
      return Object.assign({}, state, {
        curDate: action.curDate
      })
      
    default:
      return state
  }
}

const reducer = combineReducers({
  themesData,
  latestData,
  themePageData,
  beforePageData,
  articleData,
  curState
})

export default reducer