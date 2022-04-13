import React, { Component } from 'react';
import DateColumn from './DateColumn';
import HabitColumn from './HabitColumn';
class Grid extends Component {

  state = {
    // habits: this.props.habits,
  }

  render() { 

    let columns = this.props.habits.map(column => {
      return <HabitColumn key={column.habitId} column={column}/>
    })

    return (
      <div className='flex h-full bg-neutral-200 space-x-3'>
        <div className='pt-10'>
          <DateColumn dates={this.props.dates} />
        </div>
        {columns}
        {/* <button onClick={()=>{console.log(this.state.habits)}}>...</button> */}
        {/* <button onClick={()=>{this.getHabitColumns()}}>...</button> */}
      </div>
      ) 
  }
}
 
export default Grid;

