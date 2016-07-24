import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import GridPage from './gridPage'

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false,
      date: '11',
      stories: [],
      top_stories: []
    }
  }
  render() {
    return (
      <div>
        <AppBar title='知乎日报' onLeftIconButtonTouchTap={this.openDrawer.bind(this)} style={{position: 'fixed', top: 0}}/>
        <Drawer open={this.state.drawerOpen} docked={false} onRequestChange={(drawerOpen)=>{this.setState({drawerOpen})}}>
          <MenuItem onTouchTap={()=>this.setState({drawerOpen: false})}>菜单</MenuItem>
          <MenuItem onTouchTap={()=>this.setState({drawerOpen: false})}>菜单</MenuItem>
        </Drawer>
        {this.props.children && React.cloneElement(this.props.children, {stories: this.state.stories})}
      </div>
    )
  }
  openDrawer() {
    this.setState({drawerOpen: true})
  }
  componentDidMount() {
    fetch('http://news-at.zhihu.com/api/4/news/latest').then((res)=>res.text())
    .then(res=>{
      const response = JSON.parse(res)
      this.setState({date: response.date, stories: response.stories, top_stories: response.top_stories})
    }).catch(()=>{})
  }
}
