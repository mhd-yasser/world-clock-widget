// Default city configurations
const defaultCities = [
  { name: "Turkey", timezone: "Europe/Istanbul", color: "#000000", backgroundColor: "#FFC0CB", size: 100 },
  { name: "Syria", timezone: "Asia/Damascus", color: "#0000FF", backgroundColor: "#FFB6C1", size: 100 },
  { name: "Japan", timezone: "Asia/Tokyo", color: "#FF0000", backgroundColor: "#FFFACD", size: 100 },
];

// Load cities from LocalStorage or use default
let cities = JSON.parse(localStorage.getItem("cities")) || defaultCities;

// DOM Elements
const container = document.getElementById("clocks-container");
const settingsContainer = document.getElementById("settings-container");
const settingsForm = document.getElementById("settings-form");
const toggleSettings = document.getElementById("toggle-settings");

// Toggle settings form
toggleSettings.addEventListener("click", () => {
  settingsContainer.classList.toggle("hidden");
});

// Render clocks
function renderClocks() {
  container.innerHTML = ""; // Clear existing clocks

  cities.forEach((city, index) => {
    const clockWrapper = document.createElement("div");
    clockWrapper.className = "clock-wrapper";
    clockWrapper.style.backgroundColor = city.backgroundColor;
    clockWrapper.style.width = `${city.size}px`;
    clockWrapper.style.height = `${city.size + 50}px`;

    // Title
    const title = document.createElement("h2");
    title.innerText = city.name;
    title.style.color = city.color;

    // Numerical Clock
    const digitalClock = document.createElement("div");
    digitalClock.className = "digital-clock";
    digitalClock.style.color = city.color;

    // Analogue Clock
    const analogueClock = document.createElement("div");
    analogueClock.className = "analogue-clock";
    analogueClock.style.borderColor = city.color;
    analogueClock.style.width = `${city.size}px`;
    analogueClock.style.height = `${city.size}px`;

    // Append to wrapper
    clockWrapper.appendChild(title);
    clockWrapper.appendChild(analogueClock);
    clockWrapper.appendChild(digitalClock);
    container.appendChild(clockWrapper);

    // Update the clocks every second
    setInterval(() => {
      const now = new Date();
      const localTime = new Date(
        now.toLocaleString("en-US", { timeZone: city.timezone })
      );

      // Update digital clock
      const hours = localTime.getHours().toString().padStart(2, "0");
      const minutes = localTime.getMinutes().toString().padStart(2, "0");
      const seconds = localTime.getSeconds().toString().padStart(2, "0");
      digitalClock.innerText = `${hours}:${minutes}:${seconds}`;

      // Update analogue clock
      const hoursRotation = (localTime.getHours() % 12) * 30 + localTime.getMinutes() * 0.5;
      const minutesRotation = localTime.getMinutes() * 6;
      const secondsRotation = localTime.getSeconds() * 6;

      analogueClock.style.setProperty("--hour-rotation", `${hoursRotation}deg`);
      analogueClock.style.setProperty("--minute-rotation", `${minutesRotation}deg`);
      analogueClock.style.setProperty("--second-rotation", `${secondsRotation}deg`);
    }, 1000);
  });
}

// Handle form submission
settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cityName = document.getElementById("city-name").value;
  const timezone = document.getElementById("city-timezone").value;
  const textColor = document.getElementById("text-color").value || "#000000";
  const backgroundColor =
    document.getElementById("background-color").value || "#FFFFFF";
  const clockSize = parseInt(document.getElementById("clock-dimensions").value);

  // Add or update city
  const cityIndex = cities.findIndex((city) => city.name === cityName);
  if (cityIndex > -1) {
    // Update existing city
    cities[cityIndex] = {
      name: cityName,
      timezone,
      color: textColor,
      backgroundColor,
      size: clockSize,
    };
  } else {
    // Add new city
    cities.push({
      name: cityName,
      timezone,
      color: textColor,
      backgroundColor,
      size: clockSize,
    });
  }

  // Save to LocalStorage
  localStorage.setItem("cities", JSON.stringify(cities));

  // Re-render clocks
  renderClocks();

  // Clear form
  settingsForm.reset();
});

// Initial render
renderClocks();
