// Load clocks configuration
fetch("config.json")
  .then((response) => response.json())
  .then((data) => {
    const clocksContainer = document.getElementById("clocks-container");
    const clocks = data.clocks;

    clocks.forEach((clock) => {
      // Create clock container
      const clockDiv = document.createElement("div");
      clockDiv.className = "clock";
      clockDiv.style.backgroundColor = clock.backgroundColor;
      clockDiv.style.color = clock.textColor;

      // Add city title
      const cityTitle = document.createElement("h2");
      cityTitle.innerText = clock.city;
      clockDiv.appendChild(cityTitle);

      // Add time display
      const timeDisplay = document.createElement("p");
      clockDiv.appendChild(timeDisplay);

      // Add clock to container
      clocksContainer.appendChild(clockDiv);

      // Update clock every second
      const updateClock = () => {
        const time = new Date().toLocaleTimeString("en-US", {
          timeZone: clock.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        });
        timeDisplay.innerText = time;
      };

      updateClock(); // Initial update
      setInterval(updateClock, 1000); // Update every second
    });
  })
  .catch((error) => console.error("Error loading config:", error));
