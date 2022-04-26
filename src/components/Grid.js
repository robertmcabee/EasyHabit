import React, { Component } from "react";
import DateColumn from "./DateColumn";
import HabitColumn from "./HabitColumn";
import CreateColumn from "./CreateColumn";
import CreateButton from "./CreateButton";
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
      <div className="flex h-full w-full min-w-min select-none overflow-scroll pb-10 sm:pt-4">
        <div className="flex h-full w-full grow-0 justify-center space-x-1 md:space-x-4">
          <div className="w-full min-w-[5rem] max-w-[10rem] pt-24">
            <div className="md:hidden">
              <CreateButton handleOpenForm={this.props.handleOpenForm} />
            </div>
            <DateColumn dates={this.props.dates} />
          </div>
          {habitColumns}
          <div className="hidden w-full min-w-[5rem] max-w-[10rem] md:block">
            <CreateColumn handleOpenForm={this.props.handleOpenForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
