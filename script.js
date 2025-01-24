const clocksContainer = document.getElementById('clocks-container');
const settingsToggle = document.querySelector('.settings-toggle');
const settingsPanel = document.querySelector('.settings-panel');
const cityInput = document.getElementById('city-select');
const addCityBtn = document.getElementById('add-city');
const clearCitiesBtn = document.getElementById('clear-cities');

let cities = ['Turkey', 'Syria', 'Japan', 'UAE', 'Germany', 'Canada', 'USA'];

function createClock(city) {
    const clockElement = document.createElement('div');
    clockElement.classList.add('clock');

    const cityName = document.createElement('div');
    cityName.classList.add('city-name');
    cityName.textContent = city;

    const analogueClock = document.createElement('div');
    analogueClock.classList.add('analogue-clock');

    const hourHand = document.createElement('div');
    hourHand.classList.add('hour');
    analogueClock.appendChild(hourHand);

    const minuteHand = document.createElement('div');
    minuteHand.classList.add('minute');
    analogueClock.appendChild(minuteHand);

    const secondHand = document.createElement('div');
    secondHand.classList.add('second');
    analogueClock.appendChild(secondHand);

    const digitalClock = document.createElement('div');
    digitalClock.classList.add('digital-clock');

    clockElement.appendChild(cityName);
    clockElement.appendChild(analogueClock);
    clockElement.appendChild(digitalClock);

    clocksContainer.appendChild(clockElement);

    function updateClock() {
        const time = new Date();

        // Simulate different timezones based on city (example logic)
        let offset = 0;
        switch (city.toLowerCase()) {
            case 'turkey': offset = 3; break;
            case 'syria': offset = 2; break;
            case 'japan': offset = 9; break;
            case 'uae': offset = 4; break;
            case 'germany': offset = 1; break;
            case 'canada': offset = -5; break;
            case 'usa': offset = -5; break;
        }
        const utc = time.getTime() + time.getTimezoneOffset() * 60000;
        const cityTime = new Date(utc + (3600000 * offset));

        const hours = cityTime.getHours();
        const minutes = cityTime.getMinutes();
        const seconds = cityTime.getSeconds();

        // Update digital clock
        digitalClock.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update analogue clock hands
        hourHand.style.transform = `rotate(${(hours % 12) * 30 + minutes / 2}deg)`;
        minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
        secondHand.style.transform = `rotate(${seconds * 6}deg)`;
    }

    setInterval(updateClock, 1000);
    updateClock();
}

function renderClocks() {
    clocksContainer.innerHTML = '';
    cities.forEach(createClock);
}

addCityBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city && !cities.includes(city)) {
        cities.push(city);
        renderClocks();
    }
    cityInput.value = '';
});

clearCitiesBtn.addEventListener('click', () => {
    cities = [];
    renderClocks();
});

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
});

renderClocks();
