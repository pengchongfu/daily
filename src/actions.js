export function fetchThemes(now, lastUpdated) {
  return function (dispatch) {
    if(now - lastUpdated < 1000 * 60 * 10 ) {
      return
    }
    dispatch({
      type: 'requestThemes'
    })

    return fetch('http://news-at.zhihu.com/api/4/themes')
      .then((res)=>res.json())
      .then((res)=>{
        dispatch({
          type: 'succedThemes',
          others: res.others,
          now: now
        })
      })
  }
}

export function fetchLatest(now, lastUpdated) {
  return function (dispatch) {
    if(now - lastUpdated < 1000 * 60 * 10 ) {
      return
    }
    dispatch({
      type: 'requestLatest'
    })

    return fetch('http://news-at.zhihu.com/api/4/news/latest')
      .then((res)=>res.json())
      .then((res)=>{
        dispatch({
          type: 'succedLatest',
          stories: res.stories,
          now: now
        })
      })
  }
}

export function fetchArticle(state, id) {
  return function (dispatch) {
    if(state[id]) {
      return
    }
    return fetch(`http://news-at.zhihu.com/api/4/news/${id}`)
      .then((res)=>res.json())
      .then((res)=>{
        dispatch({
          type: 'succedArticle',
          id: id,
          res: res
        })
      })
  }
}