'use strict';
let dateFNS = require('date-fns');

import { format, differenceInCalendarDays } from 'date-fns';

const form = document.querySelector('form');
const formName = document.getElementById('form-name');
const submitButton = document.getElementById('submit-button');
const addFutureDayButton = document.getElementById('add-future-day-button');
const habitContainer = document.getElementById('habit-container');
const formErrorMsg = document.getElementById('form-error-msg');
const showOverlayBtn = document.getElementById('show-overlay');
const overlay = document.getElementById('overlay');

overlay.addEventListener('mousedown', (e) => {
  // @ts-ignore
  if (e.target.tagName === "DIV") {
    overlay.style.display = "none";
  }
});

showOverlayBtn.addEventListener('click', (e) => {
  overlay.style.display = "block";
});

addFutureDayButton.addEventListener('click', (e) => {
  const newestDay = dayArray[0].date
  createDayObj(dateFNS.add(newestDay, {days: 1}), habitArray)
});

const habitArray = [];
//stores habit objects in array i.e. [{name: "anki", id: "0d7611i"}, {name: "stretch", id: "l7pky86"}]

const dayArray = [ //stores day objects in array
  // {
  //   date: Thu Jan 18 2022 00:00:00 GMT-0700 (MST),
  //   'fz680z': 0,
  //   '98sh8a': 0
  // },
  // {
  //   date: Thu Jan 17 2022 00:00:00 GMT-0700 (MST),
  //   'fz680z': 100,
  //   '98sh8a': 0
  // },
];

submitButton.addEventListener("click", (event) => {
  event.preventDefault(); //prevent reload
  createHabit(form);
  form.reset(); //reset fields
});

const idGen = () => {
  return 'id=' + Math.random().toString(36).substr(2, 7); //creates a string like "fz680z"
};

function createHabit(HTMLFormData) {
  // @ts-ignore
  if (formName.value.trim() === '') { //do nothing if name field is empty
    formErrorMsg.innerText = 'Please enter a name'
    return
  }
  formErrorMsg.innerText = '' // clear error msg
  let formData = new FormData(HTMLFormData); //using formdata to support any number of form inputs without re-writng code
  formData.append('id', idGen()); //create id
  const habit = {};
  for (let key of formData.keys()) { //assign formdata key values to habit object
    habit[key] = formData.get(key);
  };
  habit.name = habit.name.replace(/([[{};:<>$])/g, '') //sanitize user input
  habitArray.push(habit)
  addID(habit.id)
  displayGrid(dayArray, habitArray)
  consoleLists()
};

function deleteHabit(id) {
  const targetIndex = habitArray.findIndex((habit) => habit.id === id)
  habitArray.splice(targetIndex, 1) //deletes one habit at the specified index
  deleteID(id)
  displayGrid(dayArray, habitArray)
  consoleLists()
}


let now = new Date();

let testTimeA = new Date(2022, 0, 27); // 1-27-22 for debugging purposes
let testTimeB = new Date(2022, 0, 29); // 1-29-22 for debugging purposes
let testTimeC = new Date(2022, 0, 30); // 1-30-22 for debugging purposes
let testTimeD = new Date(2022, 1, 5); //for debugging purposes
let testTimeE = new Date(2022, 1, 7); //for debugging purposes


function createDayObj(date, habitArray) {
  let resultObj = {};
  resultObj['date'] = date;
  habitArray.forEach(habit => {  // puts all habits in with a value of 0
    resultObj[habit.id] = 0;
  });
  dayArray.unshift(resultObj);
  consoleLists()
  displayGrid(dayArray, habitArray); 
};

function addID(id) {
  for (let i = 0; i < dayArray.length; i++) {
    dayArray[i][id] = 0;
  };
};

function deleteID(id) {
  for (let i = 0; i < dayArray.length; i++) {
    delete dayArray[i][id]
  };
};

habitArray.push({name: "Name0", id: "id=bty4afn"}, {name: "Name1", id: "id=ohp8eeu"}) 
refresh(now, now);

function daysElapsed(currentTime, mostRecentDay) { //returns series of day objects that have elapsed
  const numOfDays = dateFNS.differenceInCalendarDays(currentTime, mostRecentDay);
  if (numOfDays < 0) return null;
  const result = [];
  for (let i = 0; i < numOfDays + 1; i++) {
    result.push(dateFNS.add(mostRecentDay, {days: i})) //adds a ascending series of day objects to the result array
  };
  return result;
};

function refresh(currentTime, mostRecentDay) {
  const dateArr = daysElapsed(currentTime, mostRecentDay); //get series of js Date Objects
  if (dateArr === null) return; //guard
  for (let i = 0; i < dateArr.length; i++) { //create days
    createDayObj(dateArr[i], habitArray);
  };
}

function displayGrid(dayArray, habitArray) {
  let result = '';
  const numOfDays = dayArray.length; //rows
  const numOfHabits = habitArray.length; //columns
  //create top row
  result += `<section class="row row-top">`;
  result += `<div class="column column-top"></div>`;
  for (let i = 0; i < numOfHabits; i++) {
    result += `<div class="column column-top large"><span class="close-btn ${habitArray[i].id}">X</span><span>${habitArray[i].name}</span></div>`;
  };
  result += `</section>`; //close top section
  //create main body
  for (let i = 0; i < numOfDays; i++) {
    result += `<section class="row row-body ${i}">`;
    result += createDateHTMLTemplate(dayArray[i]['date']); //creates column div to hold date
    for (let j = 0; j < numOfHabits; j++) {
      //don't change order of classes below or click listner will break!
      result += `<div class="${habitArray[j].id} ${i} habit column"></div>`;
    };
    result += `</section>`; //close main grid section
  }
  habitContainer.innerHTML = result;
  updateGridStyle()
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

habitContainer.addEventListener('click', (e) => { //add listener to grid items
  // @ts-ignore
  let classList = e.target.classList;
  const id = classList[0];
  if (id.substring(0, 3) !== 'id=') return;
  toggleCompletion(id, classList[1]);
});

habitContainer.addEventListener('click', (e) => { //add listener to top row
  // @ts-ignore
  let classList = e.target.classList;
  if (classList[0] !== 'close-btn') return;
  const id = classList[1]
  deleteHabit(id)
});

function toggleCompletion(id, dayIndex) {
  if (dayArray[dayIndex][id] === 1) {
    dayArray[dayIndex][id] = 0;
    removeCompletedStyle(id, dayIndex)
  } else {
    dayArray[dayIndex][id] = 1;
    addCompletedStyle(id, dayIndex)
  }
};

function updateGridStyle() {
  for (let dayIndex = 0; dayIndex < dayArray.length; dayIndex++) { 
    for (let habitIndex = 0; habitIndex < habitArray.length; habitIndex++) {
      let id = habitArray[habitIndex]['id']
      if (dayArray[dayIndex][id] === 1) {
        addCompletedStyle(id, dayIndex)
      } 
    }
  }
}

function removeCompletedStyle(id, dayIndex) {
  const targetDiv = document.querySelectorAll('div.' + CSS.escape(id))[dayIndex];
  targetDiv.classList.remove('completed');
}

function addCompletedStyle(id, dayIndex) {
  const targetDiv = document.querySelectorAll('div.' + CSS.escape(id))[dayIndex];
  targetDiv.classList.add('completed');
}

function consoleLists() {
  console.log("the current habitArray is:")
  console.log(habitArray)
  console.log("the current dayArray is");
  console.log(dayArray);
}