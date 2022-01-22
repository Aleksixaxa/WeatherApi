// Note to future self
//
//  REMEMBER TO ADD https:// BEFORE THE API REQUEST IF THERE ALREADY ISNT ONE. IDIOT
//
//

let main = document.querySelector('main');
const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('.submit');
const api = '7efc1a51e5f9431c047f92463552892e';

// default location
let currentLocation = 'helsinki, fin';

// get data using asyc await
async function getWeather(location) {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`
    );
    let data = await res.json();

    return data.main.temp;
  } catch (err) {
    console.log(err);
  }
}

// Getting input from user to update the location
buttonEl.addEventListener('click', (e) => {
  e.preventDefault();
  currentLocation = inputEl.value;
  renderElements();
});

// using async to get temperature and location to be updated on the DOM
async function renderElements() {
  let temp = await getWeather(currentLocation);
  if (temp !== undefined) {
    let calcedTemp = calcTemp(temp);

    main.innerHTML = `
      <div class="info">
          <h1 class="temperature">${calcedTemp.toFixed(1)}°C</h1>
          <h2 class="location">${currentLocation}</h2>
      </div>
          `;
  } else {
    alert('add a valid country or city, country !');
  }
}

// ! updates elements and gets new data every 10seconds does not work yet
// setInterval(() => renderElements(), 10000);
renderElements();

// all other things
const calcTemp = (kelvin) => {
  return kelvin - 273.15;
};
