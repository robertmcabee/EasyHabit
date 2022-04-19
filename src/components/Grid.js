import React, { Component } from 'react';
import DateColumn from './DateColumn';
import HabitColumn from './HabitColumn';
import CreateColumn from './CreateColumn';
class Grid extends Component {

  state = {
    // habits: this.props.habits,
  }

  render() { 

    let habitColumns = this.props.habits.map(column => {
      return <HabitColumn key={column.habitId} column={column} toggleCompletion={this.props.toggleCompletion} />
    });

    return (
      <div className='flex w-full h-full'>
        <div className='flex justify-center h-full w-full space-x-4 p-20'>
          <div className='pt-10 w-full max-w-[10rem] min-w-[5rem]'>
            <DateColumn dates={this.props.dates} />
          </div>
          {habitColumns}
          <CreateColumn handleOpen={this.props.handleOpen}/>
        </div>
      </div>
    );
  };
};
 
export default Grid;

