import { format, parse } from "date-fns";
import React, { Component } from "react";

class DateColumn extends Component {
  formatDate = (dateString) => {
    const dateObj = parse(dateString, "yyyy-MM-dd", new Date());
    const dayOfMonth = format(dateObj, "d"); //i.e. 'Monday'
    const monthName = format(dateObj, "MMM"); //i.e. 'Jan'
    const dayOfWeek = format(dateObj, "iiii"); //i.e. '18'
    return (
      <div className="mt-6 flex h-20 w-full min-w-[5rem] max-w-[10rem] flex-col justify-center text-center align-middle font-bold">
        <p>{dayOfWeek}</p>
        <p>
          {monthName} {dayOfMonth}
        </p>
      </div>
    );
  };

  render() {
    return this.props.dates.map((date) => (
      <div key={date}>{this.formatDate(date)}</div>
    ));
  }
}

export default DateColumn;
