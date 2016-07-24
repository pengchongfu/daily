import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { hashHistory } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

export default class ViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      res: {},
      css: document.createElement('link'),
      dialog: false
    }
  }
  handleClose() {
    this.setState({dialog: false})
  }
  handleOpen() {
    this.setState({dialog: true})
  }
  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={()=>{this.handleClose()}}
      />
    ]
    return (
      <div>
        <AppBar
        title='返回'
        iconElementLeft={
          <IconButton onClick={()=>{
            hashHistory.push(`/homePage/gridPage`)
          }} >
          <ArrowBack />
          </IconButton>}
          style={{position: 'fixed', top: 0}}
        />
        <div id="web" style={{marginTop: '64px'}}></div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={()=>{this.handleClose()}}
        >
        抱歉，本应用暂不支持打开外链
        </Dialog>
      </div>
    )
  }
  componentDidMount() {
    this.state.css.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(this.state.css)
    fetch(`http://news-at.zhihu.com/api/4/news/${this.props.params.id}`)
    .then((res)=>res.text())
    .then((res)=>{
      let response = JSON.parse(res)
      this.setState({res: response})
    document.getElementById('web').innerHTML = this.state.res.body
    this.state.css.href = this.state.res.css[0]

    const div = document.getElementsByClassName('img-place-holder')[0]
    div.style.background = `url(${this.state.res.image}) no-repeat center center`
    div.style.backgroundSize = 'cover'

    this.disableLinks()

    })
  }
  componentWillUnmount() {
    this.state.css.parentNode.removeChild(this.state.css)
  }
  disableLinks() {
    const aAll = document.getElementsByTagName('a')
    for(let a = 0; a < aAll.length; a++){
      aAll[a].href = "javascript:void(0);"
      aAll[a].setAttribute('disabled', 'disabled')
      aAll[a].onclick = ()=>{this.handleOpen()}
    }
  }

}