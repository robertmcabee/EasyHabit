import React, { Component } from 'react';
import DateColumn from './DateColumn';
import HabitColumn from './HabitColumn';
class Grid extends Component {

  //creates array of objects
  getHabitColumns = () => {
    //get parent columns
    let resultArray = []
    let parents = []
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
      //push child objects to array
      resultArray.push(children)
    });
    return resultArray
  }

  state = {
    columns: this.getHabitColumns(),
  }


  render() { 

    let columns = this.state.columns.map(column => {
      return <HabitColumn squares={column}/>
      // return <p>aa</p>
    })

    return (
      <div>
        {columns}
        <DateColumn dates={this.props.dates} />
        {/* <button onClick={()=>{console.log(this.state.columns)}}>...</button> */}
        {/* <button onClick={()=>{this.getHabitColumns()}}>...</button> */}
      </div>
      ) 
  }
}
 
export default Grid;

