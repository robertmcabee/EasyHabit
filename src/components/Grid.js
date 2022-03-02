import React, { Component } from 'react';
import DateColumn from './DateColumn';
import HabitColumn from './HabitColumn';
class Grid extends Component {

  getUniqueHabits = () => {
    let result = []
    this.props.habitProperties.forEach(element => { 
      result.push(element.propertyId)
    })
    return result;
  };

  getHabitColumns = () => {
    //get parent columns
    let parents = []
    let parentsObj = {}
    this.props.habitProperties.forEach(habitProperty => { 
      parents.push(habitProperty.propertyId)
    })
    //sort
    parents.forEach(thisParent => {
      let children = []
      this.props.habits.forEach(habit => {
        if (habit.propertyId === thisParent) {
          children.push(habit)
        }
      });
      parentsObj[thisParent] = children
    });
    return parentsObj
  }

  generateColumnJSX = () => {
    this.state.columns.forEach(column => {
      
    });
  }

  state = {
    uniqueHabits: this.getUniqueHabits(),
    columns: this.getHabitColumns(),
  }


  render() { 

    return (
      <div>
        <DateColumn dates={this.props.dates} />
        <button onClick={()=>{console.log(this.state.columns)}}>...</button>
        {/* <button onClick={()=>{this.getHabitColumns()}}>...</button> */}
        <p>{ String(this.state.columns) }</p>
      </div>
      ) 
  }
}
 
export default Grid;

