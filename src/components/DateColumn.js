import { format, parse } from 'date-fns';
import React, { Component } from 'react';

class DateColumn extends Component {

  formatDate = (dateString) => {
    const dateObj = parse(dateString, 'yyyy-MM-dd', new Date())
    const dayOfMonth = format(dateObj, 'd'); //i.e. 'Monday'
    const monthName = format(dateObj, 'MMM'); //i.e. 'Jan'
    const dayOfWeek = format(dateObj, 'iiii'); //i.e. '18'
    return <div><p>{ dayOfWeek }</p><p>{monthName} {dayOfMonth}</p></div>
  }

  render() { 
    return this.props.dates.map((date) => (
      <div> {this.formatDate(date)} </div>
    ))
  }
}
 
export default DateColumn;

