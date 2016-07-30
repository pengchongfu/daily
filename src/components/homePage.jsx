import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { fetchThemes, curState } from '../actions'
import { hashHistory } from 'react-router'
// todo save currentUrl in redux
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }
  render() {
    const menu = this.props.others.map((item, index)=>{
      return <MenuItem
        key={index}
        onTouchTap={()=>{
          this.setState({drawerOpen: false})
          this.props.dispatch(curState(item.id, item.name))
          hashHistory.push(`/homePage/themePage`)
        }}
        >{item.name}</MenuItem>
    })
    return (
      <div>
        <AppBar title={this.props.curState.curTitle} onLeftIconButtonTouchTap={this.openDrawer.bind(this)} style={{position: 'fixed', top: 0}}/>
        <Drawer open={this.state.drawerOpen} docked={false} onRequestChange={(drawerOpen)=>{this.setState({drawerOpen})}}>
        <Menu>
          <MenuItem
            onTouchTap={()=>{
              this.setState({drawerOpen: false})
              this.props.dispatch(curState('latest', '最新消息'))
              hashHistory.push(`/homePage/latestPage`)
            }}
          >最新消息</MenuItem>
          <MenuItem
            onTouchTap={()=>{
              this.setState({drawerOpen: false})
              this.props.dispatch(curState('before', '过往消息'))
              hashHistory.push(`/homePage/beforePage`)
            }}
          >过往消息</MenuItem>
          {menu}
        </Menu>
        </Drawer>
        {this.props.children}
      </div>
    )
  }
  openDrawer() {
    this.setState({drawerOpen: true})
  }
  componentDidMount() {
    this.props.dispatch(fetchThemes(Date.now(), this.props.lastUpdated))
  }
}

function select(state) {
  return {
    curState: state.curState,
    isFetching: state.themesData.isFetching,
    others: state.themesData.others,
    lastUpdated: state.themesData.lastUpdated
  }
}

export default connect(select)(HomePage)