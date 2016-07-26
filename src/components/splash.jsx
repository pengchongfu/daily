import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import styles from '../css/animation.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { hashHistory } from 'react-router'

export default class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      imgUrl: '',
    }
  }
  render() {
    return (
        <div style={containerStyle}>
          { this.state.loaded ?
              <ReactCSSTransitionGroup style={divStyle} transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionAppear={true} transitionAppearTimeout={500}>
                <img key={1} style={imgStyle} src={this.state.imgUrl} />
              </ReactCSSTransitionGroup> :
              <RefreshIndicator
                size={100}
                left={10}
                top={0}
                status="loading"
                style={indicatorStyle}
              /> }
        </div>
    )
  }
  componentDidMount() {
    fetch('http://news-at.zhihu.com/api/4/start-image/1080*1776').then((res)=>res.text()).then((res)=>{
      fetch(JSON.parse(res).img).then((res)=>res.blob())
      .then((blob)=>{
        const url = URL.createObjectURL(blob)
        this.setState({imgUrl: url, loaded: true})
        setTimeout(()=>{
          hashHistory.push('/homePage')
        }, 1000)
      })
    }).catch(()=>{})
  }
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
}
const imgStyle = {
  minWidth: "100%",
  minHeight: "100%",
}
const divStyle = {
  width: '100%',
  height: '100%',
}
const indicatorStyle = {
  position: 'relative',
}
