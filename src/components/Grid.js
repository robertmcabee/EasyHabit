import React, { Component } from 'react';
import DateColumn from './DateColumn';


class Grid extends Component {

  getUniqueHabits = (array) => {
    //collect all habits from array of objects
    const habits = [];
    array.forEach(item => {
      habits.push(item.habit)
    });
    //filter out duplicates
    habits.sort();
    for (let i = 0; i < habits.length; i++) {
      if (habits[i] === habits[i + 1]) {
        habits.splice(i + 1, 1)
        i--
      }
    }
    return habits;
  };

  state = {
    uniqueHabits: this.getUniqueHabits(this.props.habits)
  }


  render() { 

    return (
      <div>
        <DateColumn dates={this.props.dates} />
        <button onClick={()=>{console.log(this.state.uniqueHabits)}}>...</button>
      </div>
      ) 
  }
}
 
export default Grid;

