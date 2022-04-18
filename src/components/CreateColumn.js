import React, { Component } from 'react';

class CreateColumn extends Component {
  state = {  } 
  render() { 
    return (
      <div onClick={()=>{this.props.handleOpen()}} className='w-20 h-min group text-neutral-400 hover:text-neutral-500'>
        <h3 className='h-10 font-bold text-center cursor-pointer'>
          Add New Habit
        </h3>
        <div className='mt-6 h-20 w-20 rounded-full group-hover:shadow-inner group-hover:bg-neutral-100 transition-all cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }
}
 
export default CreateColumn;