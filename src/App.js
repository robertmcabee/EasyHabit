import React, { Component } from 'react'
import { format, parse, add, differenceInCalendarDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid'; //example: 273a442e-9882-4662-8a99-16be011bd3b6
import Grid from './components/Grid';
import Form from './components/Form';
import './style.css'

class App extends Component {

  state = {

    displayForm: false,

    dates: [
      // '2022-02-01',
      // '2022-02-02',
      // '2022-02-03',
      // '2022-02-04',
    ],

    habits: [

      // {
      //   habitId: '00680z',
      //   displayName: 'Anki',
      //   color: 'green',
      //   gridItems: [
      //     {
      //       gridId: '00680z-1',
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
  
  daysElapsed = (currentTime, mostRecentDay) => { //returns series of formatted days that have elapsed
    const numOfDays = differenceInCalendarDays(currentTime, mostRecentDay);
    if (numOfDays < 0) return null;
    const result = [];
    for (let i = 0; i < numOfDays + 1; i++) {
      result.push(format(add(mostRecentDay, {days: i}), 'yyyy-MM-dd')) //creates an ascending series of formatted days
    };
    return result;
  };

  toggleCompletion = (id) => {
    this.setState({
      habits: this.state.habits.map(habit => {
        habit.gridItems.map(item => {
          if (item.gridId === id) {
            item.completed = !item.completed;
          };
          return item;
        });
        return habit;
      })
    });
  };

  loadTestState = () => {
    this.setState({
      dates: [
        '2022-02-04',
        '2022-02-03',
        '2022-02-02',
        '2022-02-01',
      ],
      habits: [

        {
          habitId: "000",
          color: "rgb(34 211 238)",
          displayName: "Code",
          gridItems: [
            {
              gridId: '000-1',
              date: '2022-02-04',
              completed: false,
            },
            {
              gridId: '000-2',
              date: '2022-02-03',
              completed: false,
            },
            {
              gridId: '000-3',
              date: '2022-02-02',
              completed: true,
            },
            {
              gridId: '000-4',
              date: '2022-02-01',
              completed: true,
            },
          ],
        },

        {
          habitId: "001",
          color: "rgb(52 211 153)",
          displayName: "Stretch",
          gridItems: [
            {
              gridId: '001-1',
              date: '2022-02-04',
              completed: false,
            },
            {
              gridId: '001-2',
              date: '2022-02-03',
              completed: true,
            },
            {
              gridId: '001-3',
              date: '2022-02-02',
              completed: true,
            },
            {
              gridId: '001-4',
              date: '2022-02-01',
              completed: true,
            },
          ],
        },
  
        {
          habitId: "002",
          color: "rgb(163 230 53)",
          displayName: "Anki",
          gridItems: [
            {
              gridId: '002-1',
              date: '2022-02-04',
              completed: true,
            },
            {
              gridId: '002-2',
              date: '2022-02-03',
              completed: true,
            },
            {
              gridId: '002-3',
              date: '2022-02-02',
              completed: true,
            },
            {
              gridId: '002-4',
              date: '2022-02-01',
              completed: true,
            },
          ],
        },

      ]
    })
  };

  addDay = () => {
    const lastDate = this.state.dates[0];
    const parsedLastDate = parse(lastDate, 'yyyy-MM-dd', new Date()); //convert string into js date object
    const newDate = add(parsedLastDate, { days: 1 });
    const formattedNewDate = format(newDate, 'yyyy-MM-dd'); //convert new date into string
    this.setState({
      dates: [formattedNewDate, ...this.state.dates],
    });
    this.state.habits.forEach(habit => { //add new grid items to each habit for the new day
      habit.gridItems.unshift({
        gridId: habit.habitId + '-' + formattedNewDate,
        date: formattedNewDate,
        completed: false,
      });
    });
  };

  addHabit = (name, color) => {
    name = name.replace(/([[{};:<>$])/g, ''); //sanitize user input
    let newHabit = {};
    newHabit['habitId'] = uuidv4().slice(0, 8);
    newHabit['displayName'] = name;
    newHabit['color'] = color;
    newHabit['gridItems'] = this.state.dates.map(date => {
      return {
        gridId: newHabit.habitId + '-' + date,
        date: date,
        completed: false,
      };
    });
    this.setState({
      habits: [...this.state.habits, newHabit],
      displayForm: false,
    });
  };

  handleClose = () => {
    this.setState({
      displayForm: false
    });
  };

  handleOpen = () => {
    this.setState({
      displayForm: true
    });
  };

  addStartDate = () => {
    this.setState({
      dates: [...this.state.dates, format(new Date(), 'yyyy-MM-dd')],
    });
  };

  setLocalStorage = () => {
    console.log('-----------storing state-----------');
    console.log('--------------habits:');
    console.log(this.state.habits);
    console.log('--------------dates:');
    console.log(this.state.dates);

    localStorage.setItem('habits', JSON.stringify(this.state.habits));
    localStorage.setItem('dates', JSON.stringify(this.state.dates));
  };

  clearLocalStorage = () => {
    console.log('clearing state');
    localStorage.setItem('habits', '');
    localStorage.setItem('dates', '');
  };

  componentDidMount() {
    //check local storage for previous state
    if (localStorage.getItem('habits') && localStorage.getItem('dates')) {
      console.log('-----------loading state-----------');
      const storedHabits = JSON.parse(localStorage.getItem('habits'));
      const storedDates = JSON.parse(localStorage.getItem('dates'));
      console.log(storedHabits);
      console.log(storedDates);
      this.setState({
        dates: storedDates,
        habits: storedHabits,
      });
    } else {
      console.log('-----------no state found-----------');
      this.addStartDate();
    }
  };

  componentDidUpdate() {
    this.setLocalStorage();
  }

  render() { 

    return (
      <div className='text-neutral-700'>
        <div className='flex space-x-2 my-4'>
          <button onClick={this.addDay} className="bg-neutral-300 text-white rounded-md p-2">New Day</button>
          <button onClick={()=>{this.loadTestState()}} className="bg-neutral-300 text-white rounded-md p-2">Load Test</button>
          <button onClick={()=>{this.clearLocalStorage()}} className="bg-neutral-300 text-white rounded-md p-2">Clear Local Storage</button>
        </div>
        <Form addHabit={this.addHabit} displayForm={this.state.displayForm} handleClose={this.handleClose}/>
        <Grid habits={this.state.habits} dates={this.state.dates} toggleCompletion={this.toggleCompletion} handleOpen={this.handleOpen}/>
      </div>
    );
  }
}
 
export default App;