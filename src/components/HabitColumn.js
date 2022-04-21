import React, { Component } from 'react';
import HabitSquare from './HabitSquare';
class HabitColumn extends Component {

  render() { 

    let squares = this.props.column.gridItems.map(square => {
      return <HabitSquare data={square} key={square.gridId} toggleCompletion={this.props.toggleCompletion} parentColor={this.props.column.color}/>
    })

    return (
      <div className='max-w-[10rem] min-w-[5rem] w-full text-center'>
        <div className='h-16 min-h-[4rem] hover:h-fit flex justify-center items-end'>
          <h3 className='font-bold text-ellipsis overflow-hidden hover:overflow-visible '>
            {this.props.column.displayName}
          </h3>
        </div>
        <div className="flex justify-center">
          <div className='flex justify-center shadow-lg align-middle p-2 h-10 w-14 opacity-80 hover:opacity-100 hover:w-full hover:text-white hover:bg-black rounded-full cursor-pointer group max-w-[5rem] --slow-transition' onClick={()=>{this.props.handleOpenEdit(this.props.column.habitId, this.props.column.displayName)}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-left" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <p className='px-2'>Edit</p>
          </div>
        </div>
        {squares}
      </div>
      ) 
  }

}
 
export default HabitColumn;