import React, { Component } from 'react';
import DateColumn from './DateColumn';
import HabitColumn from './HabitColumn';
import CreateColumn from './CreateColumn';
class Grid extends Component {

  state = {
    // habits: this.props.habits,
  }

  render() { 

    let columns = this.props.habits.map(column => {
      return <HabitColumn key={column.habitId} column={column} toggleCompletion={this.props.toggleCompletion} />
    });

    return (
      <div className='flex h-full bg-neutral-50 space-x-6 pb-20'>
        <div className='pt-10'>
          <DateColumn dates={this.props.dates} />
        </div>
        {columns}
        {/* <button onClick={()=>{console.log(this.state.habits)}}>...</button> */}
        {/* <button onClick={()=>{this.getHabitColumns()}}>...</button> */}
        <CreateColumn handleOpen={this.props.handleOpen}/>
      </div>
    );
  };
};
 
export default Grid;

