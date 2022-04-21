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
      return <HabitColumn key={column.habitId} column={column} toggleCompletion={this.props.toggleCompletion} handleOpenEdit={this.props.handleOpenEdit}/>
    });

    return (
      <div className='flex w-full h-full'>
        <div className='flex justify-center h-full w-full space-x-4 p-20'>
          <div className='pt-24 w-full max-w-[10rem] min-w-[5rem]'>
            <DateColumn dates={this.props.dates} />
          </div>
          {habitColumns}
          <div className='pt-16 w-full max-w-[10rem] min-w-[5rem]'>
            <CreateColumn handleOpenForm={this.props.handleOpenForm}/>
          </div>
        </div>
      </div>
    );
  };
};
 
export default Grid;

