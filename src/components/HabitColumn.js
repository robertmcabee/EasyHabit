import React, { Component } from 'react';
import HabitSquare from './HabitSquare';
class HabitColumn extends Component {

  // render() { 
  //   return this.props.sqaures.map((sqaure) => (
  //     <HabitSquare key={sqaure.id} sqaure={sqaure} />
  //   ));
  // }

  render() { 

    let squares = this.props.squares.map(square => {
      return <HabitSquare data={square}/>
      // return <p>aa</p>
    })

    return (
      <div>
        <h3 className='h-10 font-bold'>
          {this.props.squares[0].propertyId}
        </h3>
        {squares}
      </div>
      ) 
  }

}
 
export default HabitColumn;