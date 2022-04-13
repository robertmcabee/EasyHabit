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
      this.props.habitGrid.forEach(habit => {
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
    })

    return (
      <div className='flex h-full bg-neutral-200 space-x-3'>
        <div className='pt-10'>
          <DateColumn dates={this.props.dates} />
        </div>
        {columns}
        {/* <button onClick={()=>{console.log(this.state.columns)}}>...</button> */}
        {/* <button onClick={()=>{this.getHabitColumns()}}>...</button> */}
      </div>
      ) 
  }
}
 
export default Grid;

