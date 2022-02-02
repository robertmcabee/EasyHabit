'use strict';
let dateFNS = require('date-fns');

import { format, differenceInCalendarDays } from 'date-fns';

const form = document.querySelector('form');
const formName = document.getElementById('form-name');
const submitButton = document.getElementById('submit-button');
const habitContainer = document.getElementById('habit-container');

const overlay = document.getElementById('overlay');
overlay.addEventListener('mousedown', (e) => {
  // @ts-ignore
  if (e.target.tagName === "DIV") {
    overlay.style.display = "none";
  }
});

const showOverlayBtn = document.getElementById('show-overlay');
showOverlayBtn.addEventListener('click', (e) => {
  overlay.style.display = "block";
});


const habitArray = [];
//stores habit objects in array i.e. [{name: "anki", id: "0d7611i"}, {name: "stretch", id: "l7pky86"}]

const dayList = { //stores day objects in object
  // '011822': {
  //   'fz680z': 0,
  //   '98sh8a': 0
  // }
  // '011722': {
  //   'fz680z': 100,
  //   '98sh8a': 0
  // },
};

submitButton.addEventListener("click", (event) => {
  event.preventDefault(); //prevent reload
  createHabit(form);
  form.reset(); //reset fields
});

const idGen = () => {
  return Math.random().toString(36).substr(2, 7); //creates a string like "fz680z"
};

function createHabit(HTMLFormData) {
  let formData = new FormData(HTMLFormData); //using formdata to support any number of form inputs without re-writng code
  formData.append('id', idGen()); //create id
  const habit = {};
  for (let key of formData.keys()) { //assign formdata key values to habit object
    habit[key] = formData.get(key);
  };
  habitArray.push(habit)
  console.log("the current habitArray is:")
  console.log(habitArray)
  displayGrid(dayList, habitArray)
};


let now = new Date();

let testTimeA = new Date(2022, 0, 17); // 1-17-22 for debugging purposes
let testTimeB = new Date(2022, 0, 29); // 1-29-22 for debugging purposes
let testTimeC = new Date(2022, 0, 30); // 1-29-22 for debugging purposes
let testTimeD = new Date(2022, 1, 1); //for debugging purposes


function createDayObj(date) {
  let name = dateFNS.format(date, 'MMddyy');
  dayList[name] = { date: date };
  habitArray.forEach(habit => { // puts all habits in with a value of 0
    dayList[name][habit.id] = 0 
  });
};   
  
function daysElapsed(currentTime, mostRecentDay) { //returns true if 1+ days have elapsed
  const numOfDays = dateFNS.differenceInCalendarDays(currentTime, mostRecentDay);
  if (numOfDays < 0) return null;
  const result = [];
  for (let i = 0; i < numOfDays + 1; i++) {
    console.log('a')
    result.unshift(dateFNS.add(mostRecentDay, {days: i})) //adds 1 plus the current index
  };
  return result;
};

function refresh(currentTime, mostRecentDay) {
  const dayArr = daysElapsed(currentTime, mostRecentDay);
  if (dayArr === null) return; //guard
  for (let i = 0; i < dayArr.length; i++) { //create days
    createDayObj(dayArr[i]);
  };
  console.log("the current daylist is");
  console.log(dayList);
}

refresh(now, testTimeA);
displayGrid(dayList, habitArray);

function displayGrid(dayList, habitArray) {
  let result = '';
  const rows = (Object.keys(dayList)).length;
  const columns = habitArray.length;
  const openingTemplate = `<section class="row">`;
  const closingTemplate = `</section>`;
  const columnTemplate = `<div class="column"></div>`;
  for (let i = 0; i < rows; i++) {
    result += openingTemplate;
    result += createDateHTMLTemplate(Object.values(dayList)[i]['date']);
    for (let j = 0; j < columns; j++) {
      result += columnTemplate;
    };
    result += closingTemplate;
  }
  habitContainer.innerHTML = result;
};
    
function createDateHTMLTemplate(day) {
  let month = dateFNS.format(day, 'MMM'); //i.e. 'Jan'
  let dayOfMonth = dateFNS.format(day, 'd'); //i.e. 'Monday'
  let dayOfWeek = dateFNS.format(day, 'iiii'); //i.e. '18'
  let templateString =
  `<div class="column date-container">
  <span class="day-of-week medium-plus">${dayOfWeek},</span>
  <span class="date large">${month} ${dayOfMonth}</span>
  </div>`;
  return templateString;
};

// const tasks = {
//   011822: {
//     habit_123aax: true,
//     habit_653zdz: false,
//   }
//   011922: {
//     habit_123aax: 0,
//     habit_653zdz: 100,
//   }
// };