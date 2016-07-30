import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchThemePage } from '../actions'

class themePage extends React.Component {
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
            <img src={story.images ? story.images[0] : this.props.background} />
          </GridTile>
        ))}
        </GridList>
      </div>
    )
  }
  componentDidMount() {
    this.props.dispatch(fetchThemePage(Date.now(), this.props.lastUpdated, this.props.curSelected))
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.curSelected !== this.props.curSelected) {
      this.props.dispatch(fetchThemePage(Date.now(), nextProps.lastUpdated, nextProps.curSelected))
    }
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

function select(state) {
  const { curState, themePageData } = state
  const { curSelected } = curState
  const {
    isFetching,
    didInvalidate,
    stories,
    background,
    lastUpdated
  } = themePageData[curSelected] || {
    isFetching: true,
    stories: [],
    background: '',
    lastUpdated: 0
  }
  return {
    curSelected,
    isFetching,
    didInvalidate,
    stories,
    background,
    lastUpdated
  }
}

export default connect(select)(themePage)