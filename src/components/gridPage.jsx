import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { hashHistory } from 'react-router'

export default class GridPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      themeBackGround: '',
      stories: []
    }
  }
  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={300}
          cols={3}
          padding={10}
          style={styles.gridList}
        >
        {this.state.stories.map((story, index) => (
          <GridTile
            key={index}
            title={story.title}
            style={{fontFamily: 'sans-serif'}}
            onClick={()=>{hashHistory.push(`/viewPage/${story.id}`)}}
          >
            <img src={story.images ? story.images[0] : this.state.themeBackGround} />
          </GridTile>
        ))}
        </GridList>
      </div>
    )
  }
  componentDidMount() {
    this.update(this.props.currentUrl)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.currentUrl !== this.props.currentUrl){
      this.update(nextProps.currentUrl)
    }
  }
  update(url) {
    fetch(url).then((res)=>res.text())
    .then(res=>{
      const response = JSON.parse(res)
      this.setState({themeBackGround: response.background, stories: response.stories})
    }).catch(()=>{})
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '64px'
  },
  gridList: {
    width: 930,
    overflowY: 'auto',
  },
};