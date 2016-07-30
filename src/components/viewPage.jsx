import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { hashHistory } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import { fetchArticle } from '../actions'

class ViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
            if (typeof this.props.curSelected === 'number') {
              hashHistory.push(`/homePage/themePage`)
            } else if (this.props.curSelected === 'before') {
              hashHistory.push(`/homePage/beforePage`)
            } 
            else {
              hashHistory.push(`/homePage/latestPage`)
            }
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

    this.loadData(this.props.articleData[this.props.params.id])
    this.props.dispatch(fetchArticle(this.props.articleData, this.props.params.id))
  }
  componentWillReceiveProps (nextProps) {
    this.loadData(nextProps.articleData[this.props.params.id])
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
  loadData(res) {
    if(!res) {
      return
    }
    document.getElementById('web').innerHTML = res.body
    this.state.css.href = res.css[0]

    const div = document.getElementsByClassName('img-place-holder')[0]
    if(div){
      div.style.background = `url(${res.image}) no-repeat center center`
      div.style.backgroundSize = 'cover'
    }

    this.disableLinks()
  }

}

function select(state) {
  return {
    curSelected: state.curState.curSelected,
    articleData: state.articleData
  }
}

export default connect(select)(ViewPage)
