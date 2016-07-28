import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import GridPage from './gridPage'
import { connect } from 'react-redux'
import { fetchThemes } from '../actions'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUrl: 'http://news-at.zhihu.com/api/4/news/latest',
      currentTitle: '最新消息',
      drawerOpen: false,
      subscribed: []
    }
  }
  render() {
    const menu = this.props.others.map((item, index)=>{
      return <MenuItem
        key={index}
        onTouchTap={()=>{
          this.setState({drawerOpen: false, currentUrl: `http://news-at.zhihu.com/api/4/theme/${item.id}`, currentTitle: item.name})
        }}
        >{item.name}</MenuItem>
    })
    return (
      <div>
        <AppBar title={this.state.currentTitle} onLeftIconButtonTouchTap={this.openDrawer.bind(this)} style={{position: 'fixed', top: 0}}/>
        <Drawer open={this.state.drawerOpen} docked={false} onRequestChange={(drawerOpen)=>{this.setState({drawerOpen})}}>
        <Menu>
          <MenuItem onTouchTap={()=>this.setState({drawerOpen: false, currentUrl: 'http://news-at.zhihu.com/api/4/news/latest', currentTitle: '最新消息'})}>最新消息</MenuItem>
          <MenuItem onTouchTap={()=>this.setState({drawerOpen: false})}>过往消息</MenuItem>
          {menu}
        </Menu>
        </Drawer>
        {this.props.children && React.cloneElement(this.props.children, {currentUrl: this.state.currentUrl})}
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
    isFetching: state.themesData.isFetching,
    others: state.themesData.others,
    lastUpdated: state.themesData.lastUpdated
  }
}

export default connect(select)(HomePage)