let timeHeader = document.querySelector(".time-header");
let time = document.querySelector(".time");
let place = document.querySelector(".place");
let quotes = document.querySelector(".quotes");
let container = document.querySelector(".container");

// get time API
async function getTime() {
  let res = await fetch("https://worldtimeapi.org/api/ip");
  let data = await res.json();

  return data;
}
getTime();

// get location API
async function getIpInfo() {
  let getApi = await getTime();

  let resip = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=8cca7be4c4734568896e66e000791f57&ip=${getApi.client_ip}`
  );
  let dataip = await resip.json();
  time.innerHTML = `${getApi.datetime.slice(11, 16)}`;
  place.innerHTML = `IN ${dataip.city.toUpperCase()},  ${dataip.country_code3.toUpperCase()}`;
}
getIpInfo();

// get quotes API
async function getQuotes() {
  let res = await fetch("https://api.quotable.io/random");
  let data = await res.json();
  quotes.innerHTML = `<div>
                        <p>"${data.content}"</p>
                        <span>${data.author}</span>
                    </div>
                    <div>
                        <span class="rotate"><i class="fa-solid fa-rotate"></i></span>
                    </div>`;
}
getQuotes();

// random quotes
quotes.addEventListener("click", (e) => {
  if (e.target.className === "fa-solid fa-rotate") {
    getQuotes();
  }
});

// current time description
let background = document.querySelector(".background");
function writeTime() {
  let date = new Date();
  let hour = date.getHours();

  if (hour >= 5 && hour < 11) {
    timeHeader.innerHTML = `<i class="fa-regular fa-sun"></i> GOOD MORNING`;
    background.classList.add("day");
  } else if (hour >= 11 && hour < 17) {
    timeHeader.innerHTML = `<i class="fa-regular fa-sun"></i> GOOD AFTERNOON`;
    background.classList.add("day");
  } else {
    timeHeader.innerHTML = `<i class="fa-regular fa-moon"></i> GOOD EVENING`;
    background.classList.add("night");
  }
}
writeTime();

// more details
let clock2 = document.querySelector(".clock-2");
let details = document.querySelector(".details");
let currentTimezone = document.querySelector(".current-timezone");
let year = document.querySelector(".year");
let week = document.querySelector(".week");
let weekNumber = document.querySelector(".week-number");

clock2.addEventListener("click", async (e) => {
  if (
    clock2.firstElementChild.innerHTML ===
    `LESS <i class="fa fa-arrow-up" aria-hidden="true"></i>`
  ) {
    clock2.firstElementChild.innerHTML = `MORE <i class="fa fa-arrow-down" aria-hidden="true"></i>`;
  } else {
    clock2.firstElementChild.innerHTML = `LESS <i class="fa fa-arrow-up" aria-hidden="true"></i>`;
  }

  details.classList.toggle("hidden");
  let timedata = await getTime();

  currentTimezone.innerHTML = timedata.timezone;
  year.innerHTML = timedata.day_of_year;
  week.innerHTML = timedata.day_of_week;
  weekNumber.innerHTML = timedata.week_number;
});
