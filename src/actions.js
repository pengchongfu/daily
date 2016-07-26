export function fetchThemes(lastUpdated) {
  return function (dispatch) {
    dispatch({
      type: 'requestThemes'
    })
    if(lastUpdated && Date.now() - lastUpdated < 1000 * 60 * 10 ) {
      return
    }

    return fetch('http://news-at.zhihu.com/api/4/themes')
      .then((res)=>res.json())
      .then((res)=>{
        dispatch({
          type: 'succed',
          others: res.others
        })
      })
  }
}