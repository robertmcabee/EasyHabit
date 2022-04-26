import React, { Component } from "react";
import HabitSquare from "./HabitSquare";
class HabitColumn extends Component {
  render() {
    let squares = this.props.column.gridItems.map((square) => {
      return (
        <HabitSquare
          data={square}
          key={square.gridId}
          toggleCompletion={this.props.toggleCompletion}
          parentColor={this.props.column.color}
        />
      );
    });

    return (
      <div className="w-14 max-w-[10rem] text-center font-bold sm:w-full md:min-w-[5rem]">
        <div className="flex flex-col-reverse sm:flex-col">
          {/* ********** Heading ********** */}
          <div className="sm:sw-24 flex h-[6.5rem] min-h-[4rem] items-center justify-center sm:h-16 sm:items-end">
            <h3 className="min-w-[7rem] rotate-90 overflow-hidden text-ellipsis leading-tight sm:min-w-[5rem] sm:rotate-0 ">
              {this.props.column.displayName}
            </h3>
          </div>
          {/* ********** Edit Button ********** */}
          <div className="flex justify-center py-2 sm:py-0">
            <div
              className="group flex h-9 w-14 max-w-[5rem] cursor-pointer justify-center rounded-full p-2 align-middle opacity-80 shadow-lg duration-500 hover:bg-black hover:text-white hover:opacity-100 sm:hover:w-full md:h-10"
              onClick={() => {
                this.props.handleOpenEdit(
                  this.props.column.habitId,
                  this.props.column.displayName
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:text-left"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <p className="px-2">Edit</p>
            </div>
          </div>
        </div>
        {/* ********** Squares ********** */}
        {squares}
      </div>
    );
  }
}

export default HabitColumn;
