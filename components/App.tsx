import React, { Component } from "react";
import { format, parse, add, differenceInCalendarDays } from "date-fns";
import Grid from "./Grid";
import Form from "./Form";
import Edit from "./Edit";
import Options from "./Options";
import Login from "./Login";
import { HabitType } from "../types/types";
import { supabase } from "../utils/supabase";

type State = {
  user: null | object;
  displayForm: boolean;
  formErrorMessage: null | string;
  displayOptions: boolean;
  displayEdit: boolean;
  displayLogin: boolean;
  saveOnceEditClosed: boolean;
  habits: HabitType[];
  habitToEdit: HabitType;
};
class App extends Component {
  state: State = {
    user: null,
    displayForm: false,
    formErrorMessage: null,
    displayOptions: false,
    displayLogin: false,
    displayEdit: false,
    saveOnceEditClosed: false, //used to prevent excessive saving
    habitToEdit: {
      habitId: "",
      name: "",
      color: "",
      gridItems: [],
    },

    habits: [
      // {
      //   habitId: "00680z",
      //   name: "Stretch",
      //   color: "#ffffff",
      //   gridItems: [
      //     {
      //       gridId: "00680z-2022-06-01",
      //       date: "2022-06-01",
      //       completed: false,
      //     },
      //   ],
      // },
    ],
  };

  toggleCompletion = (id: string) => {
    this.setState(
      {
        habits: this.state.habits.map((habit) => {
          habit.gridItems.map((item) => {
            if (item.gridId === id) {
              item.completed = !item.completed;
            }
            return item;
          });
          return habit;
        }),
      },
      () => {
        this.saveState();
      }
    );
  };

  async getUser() {}

  checkForNewDays = () => {
    if (this.state.habits.length === 0) return;
    //creates new dates between most recent date and today & coresponding habit grid items
    const today = new Date();
    const lastDate = this.state.habits[0].gridItems[0].date;
    const parsedLastDate = parse(lastDate, "yyyy-MM-dd", new Date()); //convert string into js date object
    const numOfDays = differenceInCalendarDays(today, parsedLastDate);
    //if most recent date is in the future, do nothing
    if (numOfDays < 1) return null;
    //if most recent date is in the past, create new dates
    for (let i = 0; i < numOfDays; i++) {
      this.addDay();
    }
  };

  addDay = () => {
    const lastDate = this.state.habits[0].gridItems[0].date;
    const parsedLastDate = parse(lastDate, "yyyy-MM-dd", new Date()); //convert string into js date object
    const newDate = add(parsedLastDate, { days: 1 });
    const formattedNewDate = format(newDate, "yyyy-MM-dd"); //convert new date into string
    console.log("adding ", formattedNewDate);

    //add new grid items to each habit for the new day
    this.setState(
      {
        habits: this.state.habits.map((habit) => {
          let newGridItem = {
            gridId: habit.habitId + "-" + formattedNewDate,
            date: formattedNewDate,
            completed: false,
          };
          habit.gridItems = [newGridItem, ...habit.gridItems];
          return habit;
        }),
      },
      () => {
        //save once new grid items are added
        this.saveState();
      }
    );
  };

  addHabit = (name: string, color: string) => {
    if (!name) {
      this.setState({
        formErrorMessage: "Please enter a name",
      });
      return;
    }
    if (this.state.habits.length >= 20) {
      this.setState({
        formErrorMessage: "You cannot have more than 20 habits",
      });
      return;
    }
    this.setState({
      formErrorMessage: null,
    });
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    let newHabit = {
      habitId: Math.random().toString(36).substring(2, 12),
      name: name,
      color: color,
      gridItems: {},
    };
    let dateArray: string[] = [];
    if (this.state.habits.length === 0) {
      // if no habits created yet, create habit with one day
      dateArray.push(format(new Date(), "yyyy-MM-dd"));
    } else {
      // else create habit with all days from from first habit
      for (const dates of this.state.habits[0].gridItems) {
        dateArray = [...dateArray, dates.date];
      }
    }
    newHabit["gridItems"] = dateArray.map((date) => {
      return {
        gridId: newHabit.habitId + "-" + date,
        date: date,
        completed: false,
      };
    });
    this.setState(
      {
        habits: [...this.state.habits, newHabit],
        displayForm: false,
      },
      () => {
        this.saveState();
      }
    );
  };

  deleteHabit = () => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    this.setState(
      {
        habits: [...this.state.habits.filter((habit) => habit.habitId !== id)],
        displayEdit: false,
      },
      () => {
        this.saveState();
      }
    );
  };

  editHabitName = (name: string) => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    this.setState({
      saveOnceEditClosed: true, //prevents excessive saving on every keystroke - will save on close
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
      saveOnceEditClosed: true, //prevents excessive saving on every click - will save on close
      habits: this.state.habits.map((habit) => {
        if (habit.habitId === id) {
          habit.color = color;
        }
        return habit;
      }),
    });
  };

  setUserState = () => {
    //check for token
    if (supabase.auth.user()) {
      console.log("user is signed in");

      this.setState({
        user: supabase.auth.user(),
      });
    }
    //listen for user changes
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("signing in");
        this.setState(
          {
            user: supabase.auth.user(),
          },
          () => {
            this.fetchStateFromCloud();
          }
        );
      } else if (event === "SIGNED_OUT") {
        console.log("signing out");
        this.setState({
          user: null,
        });
      }
    });
  };

  handleCloseLogin = () => {
    this.setState({
      displayLogin: false,
    });
  };

  handleOpenLogin = () => {
    this.setState({
      displayLogin: true,
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
    if (this.state.saveOnceEditClosed) this.saveState(); //only save if changes were made.
    this.setState({
      displayEdit: false,
      saveOnceEditClosed: false,
    });
  };

  handleOpenEdit = (id: string) => {
    let habitToEdit = this.state.habits.find((habit) => habit.habitId === id);
    this.setState({
      displayEdit: true,
      habitToEdit: habitToEdit,
    });
  };

  setLocalStorage = () => {
    console.log("saving state");
    localStorage.setItem("habits", JSON.stringify(this.state.habits));
  };

  loadLocalStorage = () => {
    if (localStorage.getItem("habits")) {
      console.log("-----------loading state-----------");
      console.log(localStorage.getItem("habits"));

      //@ts-ignore
      const storedHabits = JSON.parse(localStorage.getItem("habits"));
      this.setState(
        {
          habits: storedHabits,
        },
        () => {
          this.checkForNewDays();
        }
      );
    } else {
      console.log("-----------no state found-----------");
    }
  };

  deleteAllData = () => {
    console.log("clearing state");
    if (this.state.user) {
      this.setState(
        {
          habits: [],
        },
        () => {
          this.storeStateToCloud();
        }
      );
    } else {
      localStorage.setItem("habits", "");
      this.setState({
        habits: [],
      });
    }
  };

  storeStateToCloud = async () => {
    console.log("storing data to cloud");
    const { data, error } = await supabase
      .from("habits")
      .update({ habit_json: JSON.stringify(this.state.habits) })
      .limit(1)
      .order("id", { ascending: false });
    if (error) {
      console.log("error", error);
    }
  };

  fetchStateFromCloud = async () => {
    console.log("fetching data from cloud");
    let { data: habits, error } = await supabase
      .from("habits")
      .select("habit_json");
    if (error) {
      console.log("error", error);
      return;
    }
    if (habits && habits.length === 0) {
      console.log("no data found, attempting to create new row");
      const { data, error } = await supabase.from("habits").insert([
        // @ts-ignore
        { habit_json: this.state.habits, user_id: supabase.auth.user().id },
      ]);
    } else if (habits) {
      console.log("data found");
      console.log("data", habits[0].habit_json);
      const storedHabits = JSON.parse(habits[0].habit_json);
      this.setState(
        {
          habits: storedHabits,
        },
        () => {
          this.checkForNewDays();
        }
      );
    }
  };

  componentDidMount() {
    this.setUserState();
    if (!this.state.user && !supabase.auth.user()) {
      this.loadLocalStorage();
    } else {
      this.fetchStateFromCloud();
    }
  }

  saveState() {
    if (this.state.user) {
      this.storeStateToCloud();
    } else {
      this.setLocalStorage();
    }
  }

  render() {
    return (
      <div className="h-screen bg-neutral-50 font-sans text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 md:text-base">
        {this.state.user ? (
          <button
            className="fixed text-black bottom-0 right-0 m-2 px-4 py-2 z-50 opacity-75 transition-opacity hover:opacity-100 cursor-pointer bg-neutral-100 border-2 border-neutral-200 rounded-full shadow-md"
            onClick={() => this.handleOpenLogin()}
          >
            Signed in.
          </button>
        ) : (
          <button
            className="fixed text-black bottom-0 right-0 m-2 px-4 py-2 z-50 opacity-75 transition-opacity hover:opacity-100 cursor-pointer bg-neutral-100 border-2 border-neutral-200 rounded-full shadow-md"
            onClick={() => this.handleOpenLogin()}
          >
            Not Logged in
          </button>
        )}
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
          formErrorMessage={this.state.formErrorMessage}
          handleCloseForm={this.handleCloseForm}
        />
        <Options
          displayOptions={this.state.displayOptions}
          handleCloseOptions={this.handleCloseOptions}
          deleteAllData={this.deleteAllData}
        />
        <Login
          displayLogin={this.state.displayLogin}
          closeLogin={this.handleCloseLogin}
          user={this.state.user}
        />
        <Grid
          habits={this.state.habits}
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
