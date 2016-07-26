import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import GridPage from './gridPage'
import { connect } from 'react-redux'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUrl: 'http://news-at.zhihu.com/api/4/news/latest',
      currentTitle: '最新消息',
      drawerOpen: false,
      others: [],
      subscribed: []
    }
  }
  render() {
    const menu = this.state.others.map((item, index)=>{
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
    console.log('redux:'+this.props.data)
    fetch('http://news-at.zhihu.com/api/4/themes')
    .then((res)=>res.text())
    .then((res)=>{
      const response = JSON.parse(res)
      this.setState({others: response.others})
      this.setState({subscribed: response.subscribed})


    })
  }
}

function select(state) {
  return {
    data: state.data
  }
}

export default connect(select)(HomePage)