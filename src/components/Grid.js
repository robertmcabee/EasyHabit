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


  // generateDateColumn = (array) => {
  //   let uniqueDates = this.getUniqueDates(array)

  //   return uniqueDates.forEach(date => {
  //     this.formatDate(date)
  //   })
  // }


  render() { 

    // return this.props.habitData.map((habitItem) => (
    //   <p>{habitItem.id}{ this.formatDate(habitItem.date) }</p>
    // ))

    return (
      <div>
        {/* <div>{ this.getUniqueDates(this.props.habitData) }</div> */}
        <p>hmmm</p>
        <p>{ 1+1 }</p>
        <DateColumn dates={this.state.uniqueDates} />
        {/* <DateColumn dates={['2022-02-01','2022-02-02','2022-02-03','2022-02-01','2022-02-02','2022-02-03','2022-02-04',]} /> */}
      </div>
      ) 
  }
}
 
export default Grid;

