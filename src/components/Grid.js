import React, { Component } from "react";
import DateColumn from "./DateColumn";
import HabitColumn from "./HabitColumn";
import CreateColumn from "./CreateColumn";
class Grid extends Component {
  state = {
    // habits: this.props.habits,
  };

  render() {
    let habitColumns = this.props.habits.map((column) => {
      return (
        <HabitColumn
          key={column.habitId}
          column={column}
          toggleCompletion={this.props.toggleCompletion}
          handleOpenEdit={this.props.handleOpenEdit}
        />
      );
    });

    return (
      <div className="flex h-full w-full">
        <div className="flex h-full w-full justify-center space-x-4 p-20">
          <div className="w-full min-w-[5rem] max-w-[10rem] pt-24">
            <DateColumn dates={this.props.dates} />
          </div>
          {habitColumns}
          <div className="w-full min-w-[5rem] max-w-[10rem] pt-16">
            <CreateColumn handleOpenForm={this.props.handleOpenForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
