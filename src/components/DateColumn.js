import { format, parse } from 'date-fns';
import React, { Component } from 'react';

class DateColumn extends Component {

  formatDate = (dateString) => {
    const dateObj = parse(dateString, 'yyyy-MM-dd', new Date());
    const dayOfMonth = format(dateObj, 'd'); //i.e. 'Monday'
    const monthName = format(dateObj, 'MMM'); //i.e. 'Jan'
    const dayOfWeek = format(dateObj, 'iiii'); //i.e. '18'
    return <div className='flex flex-col align-middle justify-center w-28 h-20 mt-6 text-center font-bold'>
      <p>{dayOfWeek}</p>
      <p>{monthName} {dayOfMonth}</p>
    </div>
  }

  render() { 
    return this.props.dates.map((date) => (
      <div key={date}>
        {this.formatDate(date)}
      </div>
    ))

  }
}
 
export default DateColumn;

