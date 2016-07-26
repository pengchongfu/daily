function reducer(state = {
  isFetching: false,
  didInvalidate: false,
  others: [
    {name: 'init'}
  ]
}, action) {
  switch (action.type) {
    case 'requestThemes':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case 'succed':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        others: action.others,
        lastUpdated: Date.now()
      })
    case 'failed':
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
} 

export default reducer