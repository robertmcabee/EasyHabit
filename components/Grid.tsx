import React, { Component } from "react";
import DateColumn from "./DateColumn";
import HabitColumn from "./HabitColumn";
import CreateColumn from "./CreateColumn";
import UpperButtons from "./UpperButtons";
import { HabitType } from "../types/types";
import { format } from "date-fns";

type Props = {
  habits: HabitType[];
  toggleCompletion: (id: string) => void;
  handleOpenEdit: (id: string) => void;
  handleOpenForm: () => void;
  handleOpenOptions: () => void;
};

class Grid extends Component<Props> {
  dates = () => {
    let dateArray: string[] = [];
    if (this.props.habits.length === 0) {
      dateArray.push(format(new Date(), "yyyy-MM-dd"));
    } else {
      for (const dates of this.props.habits[0].gridItems) {
        dateArray = [...dateArray, dates.date];
      }
    }
    return dateArray;
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
      <div className="flex h-full w-full min-w-max select-none pb-10 sm:pt-4">
        <div className="flex h-full w-full grow-0 justify-center space-x-1 md:space-x-4">
          <div className="w-12 max-w-[10rem] sm:w-full sm:min-w-[5rem] ">
            <div className="flex justify-center">
              <UpperButtons
                handleOpenForm={this.props.handleOpenForm}
                handleOpenOptions={this.props.handleOpenOptions}
              />
            </div>
            <DateColumn dates={this.dates()} />
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
