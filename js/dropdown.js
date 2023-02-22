const data = {
  India: {
    Haryana: ["Birmingham", "Montgomery", "Mobile"],
    Delhi: ["Anchorage", "Fairbanks", "Juneau"],
    Hyderabad: ["Phoenix", "Tucson", "Mesa"],
    Bangalore: [],
    // add more states and cities here
  },
  Canada: {
    Alberta: ["Calgary", "Edmonton", "Red Deer"],
    "British Columbia": ["Vancouver", "Victoria", "Kelowna"],
    Manitoba: ["Winnipeg", "Brandon", "Portage la Prairie"],
    // add more states and cities here
  },
  Mexico: {
    Aguascalientes: ["Aguascalientes", "Jesús María", "Pabellón de Arteaga"],
    "Baja California": ["Tijuana", "Mexicali", "Ensenada"],
    Chihuahua: ["Ciudad Juárez", "Chihuahua", "Delicias"],
    // add more states and cities here
  },
  // add more countries here
};

function populateStates() {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");
  stateSelect.innerHTML = '<option value="">Select a state</option>';

  if (countrySelect.value !== "") {
    const states = Object.keys(data[countrySelect.value]);
    states.forEach((state) => {
      const option = document.createElement("option");
      option.setAttribute("value", state);
      option.innerText = state;
      stateSelect.appendChild(option);
    });
  }
}

function populateCities() {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");
  citySelect.innerHTML = '<option value="">Select a city</option>';

  if (stateSelect.value !== "") {
    const cities = data[countrySelect.value][stateSelect.value];

    cities.forEach((city) => {
      const option = document.createElement("option");
      option.setAttribute("value", city);
      option.innerText = city;
      citySelect.appendChild(option);
    });
  }
}
