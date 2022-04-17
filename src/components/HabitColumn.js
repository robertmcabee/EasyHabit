import React, { Component } from 'react';
import HabitSquare from './HabitSquare';
class HabitColumn extends Component {

  render() { 

    let squares = this.props.column.gridItems.map(square => {
      return <HabitSquare data={square} key={square.gridId} toggleCompletion={this.props.toggleCompletion} parentColor={this.props.column.color}/>
    })

    return (
      <div className='w-20'>
        <h3 className='h-10 font-bold text-center'>
          {this.props.column.displayName}
        </h3>
        {squares}
      </div>
      ) 
  }

}
 
export default HabitColumn;