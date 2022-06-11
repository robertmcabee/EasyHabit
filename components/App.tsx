import React, { Component } from "react";
import { format, parse, add, differenceInCalendarDays } from "date-fns";
import Grid from "./Grid";
import Form from "./Form";
import Edit from "./Edit";
import Options from "./Options";
import DevelopmentButtons from "./DevelopmentButtons";
import { HabitType } from "../types/types";

type State = {
  displayForm: boolean;
  displayOptions: boolean;
  displayEdit: boolean;
  habits: HabitType[];
  habitToEdit: HabitType;
  dates: string[];
};
class App extends Component {
  state: State = {
    displayForm: false,
    displayOptions: false,
    displayEdit: false,
    habitToEdit: {
      habitId: "",
      name: "",
      color: "",
      gridItems: [],
    },
    dates: [
      // '2022-02-01',
      // '2022-02-02',
      // '2022-02-03',
      // '2022-02-04',
    ],
    habits: [
      // {
      //   habitId: '00680z',
      //   name: 'Anki',
      //   color: '#ffffff',
      //   gridItems: [
      //     {
      //       gridId: '00680z-2022-02-01',
      //       date: '2022-02-01',
      //       completed: false,
      //     },
      //     ...
      //     ...
      //     ...
      //   ],
      // },
    ],
  };

  toggleCompletion = (id: string) => {
    const date = id.slice(-10);
    this.setState({
      habits: this.state.habits.map((habit) => {
        habit.gridItems.map((item) => {
          if (item.gridId === id) {
            item.completed = !item.completed;
          }
          return item;
        });
        return habit;
      }),
    });
  };

  addElapsedDays = () => {
    //creates new dates between most recent date and today & coresponding habit grid items
    const today = new Date();
    const mostRecentDay = parse(this.state.dates[0], "yyyy-MM-dd", new Date());
    const numOfDays = differenceInCalendarDays(today, mostRecentDay);
    //if most recent date is in the future, do nothing
    if (numOfDays < 0) return null;
    //creates array of formatted dates
    const daysToAdd = [];
    for (let i = 1; i < numOfDays + 1; i++) {
      const date = add(mostRecentDay, { days: i });
      daysToAdd.unshift(format(date, "yyyy-MM-dd"));
    }
    //sets state with new dates
    this.setState({
      dates: [...daysToAdd, ...this.state.dates],
    });
    //for each day, add a new grid item to each habit
    daysToAdd.forEach((day) => {
      this.state.habits.forEach((habit) => {
        habit.gridItems.unshift({
          gridId: habit.habitId + "-" + day,
          date: day,
          completed: false,
        });
      });
    });
  };

  addDay = () => {
    const lastDate = this.state.dates[0];
    const parsedLastDate = parse(lastDate, "yyyy-MM-dd", new Date()); //convert string into js date object
    const newDate = add(parsedLastDate, { days: 1 });
    const formattedNewDate = format(newDate, "yyyy-MM-dd"); //convert new date into string
    this.setState({
      dates: [formattedNewDate, ...this.state.dates],
    });
    this.state.habits.forEach((habit) => {
      //add new grid items to each habit for the new day
      habit.gridItems.unshift({
        gridId: habit.habitId + "-" + formattedNewDate,
        date: formattedNewDate,
        completed: false,
      });
    });
  };

  addHabit = (name: string, color: string) => {
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    let newHabit = {
      habitId: Math.random().toString(36).substring(2, 12),
      name: name,
      color: color,
      gridItems: {},
    };
    newHabit["gridItems"] = this.state.dates.map((date) => {
      return {
        gridId: newHabit.habitId + "-" + date,
        date: date,
        completed: false,
      };
    });
    this.setState({
      habits: [...this.state.habits, newHabit],
      displayForm: false,
    });
  };

  deleteHabit = () => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    this.setState({
      habits: [...this.state.habits.filter((habit) => habit.habitId !== id)],
      displayEdit: false,
    });
  };

  editHabitName = (name: string) => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    this.setState({
      habits: this.state.habits.map((habit) => {
        if (habit.habitId === id) {
          habit.name = name;
        }
        return habit;
      }),
    });
  };

  editHabitColor = (color: string) => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    this.setState({
      habits: this.state.habits.map((habit) => {
        if (habit.habitId === id) {
          habit.color = color;
        }
        return habit;
      }),
    });
  };

  handleCloseForm = () => {
    this.setState({
      displayForm: false,
    });
  };

  handleOpenForm = () => {
    this.setState({
      displayForm: true,
    });
  };

  handleCloseOptions = () => {
    this.setState({
      displayOptions: false,
    });
  };

  handleOpenOptions = () => {
    this.setState({
      displayOptions: true,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      displayEdit: false,
    });
  };

  handleOpenEdit = (id: string) => {
    let habitToEdit = this.state.habits.find((habit) => habit.habitId === id);
    this.setState({
      displayEdit: true,
      habitToEdit: habitToEdit,
    });
  };

  addStartDate = () => {
    this.setState({
      dates: [...this.state.dates, format(new Date(), "yyyy-MM-dd")],
    });
  };

  setLocalStorage = () => {
    localStorage.setItem("habits", JSON.stringify(this.state.habits));
    localStorage.setItem("dates", JSON.stringify(this.state.dates));
  };

  loadLocalStorage = () => {
    if (localStorage.getItem("habits") && localStorage.getItem("dates")) {
      console.log("-----------loading state-----------");
      //@ts-ignore
      const storedHabits = JSON.parse(localStorage.getItem("habits"));
      //@ts-ignore
      const storedDates = JSON.parse(localStorage.getItem("dates"));
      console.log(storedHabits);
      console.log(storedDates);
      this.setState(
        {
          dates: storedDates,
          habits: storedHabits,
        },
        () => {
          this.addElapsedDays();
        }
      );
    } else {
      console.log("-----------no state found-----------");
      this.addStartDate();
    }
  };

  clearLocalStorage = () => {
    console.log("clearing state");
    localStorage.setItem("habits", "");
    localStorage.setItem("dates", "");
  };

  componentDidMount() {
    this.loadLocalStorage();
  }

  componentDidUpdate() {
    this.setLocalStorage();
  }

  render() {
    return (
      <div className="h-screen bg-neutral-50 font-sans text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 md:text-base">
        <DevelopmentButtons
          addDay={this.addDay}
          addElapsedDays={this.addElapsedDays}
        />
        <Edit
          deleteHabit={this.deleteHabit}
          editHabitColor={this.editHabitColor}
          editHabitName={this.editHabitName}
          displayEdit={this.state.displayEdit}
          handleCloseEdit={this.handleCloseEdit}
          habitToEdit={this.state.habitToEdit}
        />
        <Form
          addHabit={this.addHabit}
          displayForm={this.state.displayForm}
          handleCloseForm={this.handleCloseForm}
        />
        <Options
          displayOptions={this.state.displayOptions}
          handleCloseOptions={this.handleCloseOptions}
          clearLocalStorage={this.clearLocalStorage}
        />
        <Grid
          habits={this.state.habits}
          dates={this.state.dates}
          toggleCompletion={this.toggleCompletion}
          handleOpenForm={this.handleOpenForm}
          handleOpenEdit={this.handleOpenEdit}
          handleOpenOptions={this.handleOpenOptions}
        />
      </div>
    );
  }
}

export default App;
