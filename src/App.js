import React, { Component } from 'react'
import { format, parse, add, differenceInCalendarDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Grid from './components/Grid';
import Form from './components/Form';

class App extends Component {

  state = {

    // habitProperties: [
    //   //habitID
    //   //color
    //   //name
    //   { id: 'fz680z', name: 'Anki', color: 'green' }
    // ],

    habits: [
      //uniqueID
      //habitID
      //completion
      { id: '3sk279pp', date: '2022-02-01', habit: 'fz680z', completion: 0 },
      { id: '052279dc', date: '2022-02-02', habit: 'fz680z', completion: 0 },
      { id: '152224pf', date: '2022-02-03', habit: 'fz680z', completion: 0 },
      { id: '4724pfxb', date: '2022-02-04', habit: 'fz680z', completion: 0 },
      { id: 'pi4sd282', date: '2022-02-01', habit: 'po3532', completion: 0 },
      { id: 'pi41s182', date: '2022-02-02', habit: 'po3532', completion: 0 },
      { id: '004sd282', date: '2022-02-03', habit: 'po3532', completion: 0 },
      { id: '334sd23p', date: '2022-02-04', habit: 'po3532', completion: 0 },
    ],

    dates: [
      '2022-02-01',
      '2022-02-02',
      '2022-02-03',
      '2022-02-04',
    ],

  };
  
  tests = () => {
    let test = parse('2022-02-01', 'yyyy-MM-dd', new Date())
    let changed = format(test, 'yyyy-MM-dd')
    let formatted = parse(changed, 'yyyy-MM-dd', new Date())
    const now = new Date(); 
    const testTimeA = new Date(2022, 0, 27); // 1-27-22 for debugging purposes
    const testTimeB = new Date(2022, 0, 29); // 1-29-22 for debugging purposes
    const testTimeC = new Date(2022, 0, 30); // 1-30-22 for debugging purposes
    const testTimeD = new Date(2022, 1, 5); //for debugging purposes
    const testTimeE = new Date(2022, 1, 7); //for debugging purposes
}
  
  daysElapsed = (currentTime, mostRecentDay) => { //returns series of formatted days that have elapsed
    const numOfDays = differenceInCalendarDays(currentTime, mostRecentDay);
    if (numOfDays < 0) return null;
    const result = [];
    for (let i = 0; i < numOfDays + 1; i++) {
      result.push(format(add(mostRecentDay, {days: i}), 'yyyy-MM-dd')) //creates an ascending series of formatted days
    };
    console.log(result)
    return result;
  };

  // createHabitData = (date, habit) => {
  //   let resultObj = {};
  //   resultObj['date'] = date;
  //   resultObj['id'] = uuidv4();
  //   resultObj['habit'] = habit;
  //   resultObj['completion'] = 0;
  //   // habitData.unshift(resultObj);
  //   this.setState({})
  //   this.consoleLists();
  // };

  consoleLists = () => {
    console.log("the current habitData is:");
    console.log(this.state.habitData);
    console.log("the current habitProperties is");
    console.log(this.state.habitProperties);
  };

  addDay = () => {
    const lastDate = this.state.dates[this.state.dates.length - 1]
    const parsedLastDate = parse(lastDate, 'yyyy-MM-dd', new Date())
    const newDate = add(parsedLastDate, { days: 1 })
    const formattedNewDate = format(newDate, 'yyyy-MM-dd')
    this.setState({
      dates: [...this.state.dates, formattedNewDate]
    })
  }

  render() { 
  return (
    <div>
      <button onClick={this.addDay}>New Day</button>
      <Form />
      <Grid habits={this.state.habits} dates={this.state.dates} />
    </div>
    );
  }
}
 
export default App;
