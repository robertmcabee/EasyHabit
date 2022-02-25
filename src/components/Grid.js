import React, { Component } from 'react';
import DateColumn from './DateColumn';


class Grid extends Component {

  getUniqueDates = (array) => {
    console.log(array)
    //collect all dates from array of objects
    const dates = [];
    array.forEach(item => {
      dates.push(item.date)
    });
    //filter out duplicates
    dates.sort();
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] === dates[i + 1]) {
        dates.splice(i + 1, 1)
        i--
      }
    }
    return dates;
  };

  

  state = {
    uniqueDates: this.getUniqueDates(this.props.habitData)
  }

  render() { 

    return (
      <div>
        <DateColumn dates={this.state.uniqueDates} />
      </div>
      ) 
  }
}
 
export default Grid;

