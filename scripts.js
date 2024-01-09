// Show 24 hour schedule
// TODO Onclick button "Want weather" -> place weather data at corresponding hours
// TODO Onclick button "Upcoming exams to study?" -> let user enter exam name in text field and when to study exam, place
//      exams in upcoming exams area and put exam study times in schedule -- update: add due date & drag and drop to add to schedule
// TODO Save infos with cookies?

//Copied -- next up: save info for appropriate hours and re-load it each time page is loaded
/* const firstText = document.querySelector("#firstText");
        const lastText = document.querySelector("#lastText");
        const submitBtn = document.querySelector("#submitBtn");
        const cookieBtn = document.querySelector("#cookieBtn");

        submitBtn.addEventListener("click", () => {
            setCookie("firstName", firstText.value, 365);
            setCookie("lastName", lastText.value, 365);
        })
        cookieBtn.addEventListener("click", () => {
            firstText.value = getCookie("firstName");
            lastText.value = getCookie("lastName");
        })
        
        console.log(document.cookie); */

function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}
function deleteCookie(name) {
  setCookie(name, null, null);
}
function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result = null;

  cArray.forEach((element) => {
    if (element.indexOf(name + "=") == 0) {
      console.log("get cookie: " + name);
      result = element.substring(name.length + 1);
    }
  });
  return result;
}
//Copied

function addActivity() {
  var activity = document.getElementById("activity").value;
  var hour = document.getElementById("hour").value;
  writeInSchedule(hour, activity);
  setCookie(hour, activity, 365);
}

async function currentWeather() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Montreal&appid=2472012665372acd3eedd2df65031356&units=metric"
  );
  var data = await response.json();
  document.getElementById("weather").innerHTML =
    new Date().toLocaleString() +
    " // " +
    data.main.temp +
    "°C // " +
    data.weather[0].description;
}
currentWeather();

function writeInSchedule(hour, activity) {
  document.getElementById(hour).innerHTML = activity;
}

//Old thing not using anymore
/*         //TODO - treat schedule as an array
        function addUpcomingEventToSchedule() {
            var event = document.getElementById("event").value;
            var chosenHour = document.getElementById("chosenHour").value;
            writeInSchedule(chosenHour, event)
            setCookie(chosenHour, event, 365);
        } */

function addUpcomingEventToUpcomingEventsList() {
  var event = document.getElementById("event").value;
  upcomingEventsGenerateListElement(event, "upcomingEvents"); //TODO enter deadline value & register in cookies so that it shows back when refreshing page
  addToCookiesList("upcomingEventsListCookie", event);
}

function generateListElement(value, list) {
  var element = document.createElement("li");
  var textInElement = document.createTextNode(value);
  element.appendChild(textInElement);
  document.getElementById(list).appendChild(element);
}

//Show deadline next to list element 
function upcomingEventsGenerateListElement(value, list, deadline) {
  //Deadline text
  var deadlineSpan = document.createElement("span");
  var deadlineValue = document.createTextNode(" " + deadline);
  deadlineSpan.appendChild(deadlineValue);
  
  var element = document.createElement("li");
  var textInElement = document.createTextNode(value);
  element.appendChild(textInElement);
  element.appendChild(deadlineSpan); //Append dead
  document.getElementById(list).appendChild(element);
}

/* //element will be clicked list element (this)
        function moveElement(element) {
            var data = element.innerHTML;
            while (true) {
                if 
            }
        } */

function addTodoToTodoList() {
  var todo = document.getElementById("todo").value;
  generateListElement(todo, "dailyToDos");
  addToCookiesList("toDosListCookie", todo);
}

/* function writeListCookies() {
            var numberOfElements = document.getElementById("upcomingEvents").getElementsByTagName("li").length;

            for ()
        } */

function addToCookiesList(cookiesList, value) {
  //cookiesList not yet implemented
  if (getCookie(cookiesList) == null) {
    var commaSeparated = value;
  } else {
    var commaSeparated = getCookie(cookiesList);
    commaSeparated += "," + value;
  }
  setCookie(cookiesList, commaSeparated, 365);
  console.log(document.cookie);
}

console.log(document.cookie);

function showTheCookies() {
  showTheCookiesInHours();
  showListCookies("upcomingEventsListCookie", "upcomingEvents");
  showListCookies("toDosListCookie", "dailyToDos");
}

function showTheCookiesInHours() {
  for (let hour = 1; hour <= 24; hour++) {
    let activity = getCookie(hour);
    if (activity != null) {
      console.log(hour);
      writeInSchedule(hour, activity.substring(hour.toString().length + 1));
    }
  }
}

function showListCookies(cookiesList, list) {
  var listArray = getCookie(cookiesList).split(",");
  for (let i = 0; i < listArray.length; i++) {
    generateListElement(listArray[i], list);
  }
}

$(document).ready(function () {
  let heldData = null;

  $("li").dblclick(function () {
    if ($(this).attr("background-color") != "#DBCB91") {
      $(this).css("background-color", "#DBCB91");
      heldData = $(this).text();
    }
    //TODO Remove background-color and reset heldData to reset the selection
    if ($(this).attr("background-color") == "#DBCB91") {
      $(this).css("background-color", "");
      heldData = null;
    }
  });

  $("td").dblclick(function () {
    if (this.className == "scheduleTextField" && heldData != null) {
      $(this).text(heldData);
      setCookie($(this).attr("id"), heldData, 365);
    }
    console.log(document.cookie);
  });
});

//Taken from W3School website
function randomCountdownTimer() {
  // Set the date we're counting down to
  var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML =
      days + "d ";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

randomCountdownTimer();
document.addEventListener("load", showTheCookies());
/*  console.log(document.getElementById("upcomingEvents").getElementsByTagName("li").length)

        console.log(document.getElementById("upcomingEvents").getElementsByTagName("li")[0].innerHTML) */
