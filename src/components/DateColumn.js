import { format, parse } from "date-fns";
import React, { Component } from "react";

class DateColumn extends Component {
  formatDate = (dateString) => {
    const dateObj = parse(dateString, "yyyy-MM-dd", new Date());
    const dayOfWeek = format(dateObj, "iiii"); //i.e. 'Monday'
    const shortDayOfWeek = format(dateObj, "iii"); //i.e. 'Mon' (for mobile screen sizes)
    const monthName = format(dateObj, "MMM"); //i.e. 'Jan'
    const dayOfMonth = format(dateObj, "d"); //i.e. '18'
    return (
      <div className="mt-6 flex h-20 w-full max-w-[10rem] flex-col justify-center text-center align-middle sm:w-full sm:min-w-[5rem]">
        <p className="hidden sm:block">{dayOfWeek}</p>
        <p className="block sm:hidden">{shortDayOfWeek}</p>
        <p className="font-bold sm:text-base">
          {monthName} <br className="block sm:hidden" /> {dayOfMonth}
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
