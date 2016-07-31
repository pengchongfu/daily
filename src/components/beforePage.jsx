import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import FlatButton from 'material-ui/FlatButton'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchbeforePage, curDate } from '../actions'
import DatePicker from 'material-ui/DatePicker'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

class BeforePage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={styles.root}>
        <div style={styles.bar}>
          <FlatButton
            icon={<ChevronLeft />}
            primary={true}
            onTouchTap={()=>{
              this.getBeforeDate()
            }}
          />
          <DatePicker
            hintText="选择日期"
            value={this.parseDate(this.props.curDate)}
            onChange={(event, date) => {
              this.props.dispatch(curDate((date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate())))
            }}
            autoOk={true}
            container="inline"
            cancelLabel="取消"
            maxDate={new Date()}
          />
          <FlatButton
            icon={<ChevronRight/>}
            primary={true}
            onTouchTap={()=>{
              this.getNextDate()
            }}
            disabled={this.props.curDate === this.stringDate(new Date())}
          />
        </div>
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
    this.props.dispatch(curDate(this.editDate(this.props.curDate, -1)))
  }
  getNextDate () {
    this.props.dispatch(curDate(this.editDate(this.props.curDate, 1)))
  }
  editDate (date, offset = 0) {
    let inputDate = this.parseDate(date)
    let outputDate =new Date(inputDate.valueOf() + offset * 24 * 60 * 60 * 1000)
    return this.stringDate(outputDate)
  }
  parseDate (date) {
    let y = Math.floor(date / 10000)
    let m = Math.floor((date - y * 10000) / 100)
    let d = date - y * 10000 - m * 100
    m--
    let inputDate = new Date(y, m, d)
    return inputDate
  }
  stringDate (date) {
    return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginTop: '64px'
  },
  gridList: {
    width: 930,
    overflowY: 'auto'
  },
  bar: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
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