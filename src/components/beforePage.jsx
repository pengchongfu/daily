import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import FlatButton from 'material-ui/FlatButton'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchbeforePage, curDate } from '../actions'

class BeforePage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={styles.root}>
        <FlatButton
          label="前一天"
          primary={true}
          onTouchTap={()=>{
            this.getBeforeDate()
          }}
        />
        <FlatButton
          label="后一天"
          primary={true}
          onTouchTap={()=>{
            this.getNextDate()
          }}
        />
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
  componentDidMount() {
    if(this.props.stories.length === 0) {
      this.props.dispatch(fetchbeforePage(this.props.curDate))
    }
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.curDate !== this.props.curDate) {
      if(nextProps.stories.length === 0) {
        this.props.dispatch(fetchbeforePage(nextProps.curDate))
      }
    }
  }
  getBeforeDate () {
    this.props.dispatch(curDate(this.parseDate(this.props.curDate, -1)))
  }
  getNextDate () {
    this.props.dispatch(curDate(this.parseDate(this.props.curDate, 1)))
  }
  parseDate (date, offset = 0) {
    let y = Math.floor(date / 10000)
    let m = Math.floor((date - y * 10000) / 100)
    let d = date - y * 10000 - m * 100
    m--
    let inputDate = new Date(y, m, d)
    let outputDate =new Date(inputDate.valueOf() + offset * 24 * 60 * 60 * 1000)
    return outputDate.getFullYear() * 10000 + (outputDate.getMonth() + 1) * 100 + outputDate.getDate()
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
  const { beforePageData, curState } = state
  const { curDate } = curState
  const { stories } = beforePageData[curDate] || {
    stories: []
  }
  return {
    stories,
    curDate
  }
}

export default connect(select)(BeforePage)