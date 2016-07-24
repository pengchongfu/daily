import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { hashHistory } from 'react-router'

export default class GridPage extends React.Component {
  constructor(props) {
    super(props)
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
          {this.props.stories.map((story, index) => (
            <GridTile
              key={index}
              title={story.title}
              style={{fontFamily: 'sans-serif'}}
              onClick={()=>{hashHistory.push(`/viewPage/${story.id}`)}}
            >
              <img src={story.images[0]} />
            </GridTile>
          ))}
          </GridList>
        </div>
    )
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