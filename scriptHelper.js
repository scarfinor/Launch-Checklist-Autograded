// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  image
) {
  const missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${image}">
                 `;
}

function validateInput(testInput) {
  if (testInput === "" || testInput === null || testInput === undefined) {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let launchStatus = document.getElementById("launchStatus");

  pilotStatus.innerHTML = "";
  copilotStatus.innerHTML = "";
  fuelStatus.innerHTML = "";
  cargoStatus.innerHTML = "";
  launchStatus.innerHTML = "";
  list.style.visibility = "hidden";
const delay = 7000;

  const pilotValidation = validateInput(pilot);
  const copilotValidation = validateInput(copilot);
  const fuelValidation = validateInput(fuelLevel);
  const cargoValidation = validateInput(cargoLevel);

  if (
    pilotValidation === "Empty" ||
    copilotValidation === "Empty" ||
    fuelValidation === "Empty" ||
    cargoValidation === "Empty"
  ) {
    window.alert("All fields required for launch");
    launchStatus.innerHTML = "Shuttle is not ready for launch";
    launchStatus.style.color = "red";
    return setTimeout(function() {window.location.reload();}, delay)
  }

  if (
    fuelValidation === "Not a Number" ||
    cargoValidation === "Not a Number"
  ) {
    window.alert("Fuel level and cargo mass must be numbers!");
    fuelStatus.innerHTML = "Fuel status required for launch";
    cargoStatus.innerHTML = "Cargo status required for launch";
    launchStatus.innerHTML = "Shuttle is not ready for launch";
    launchStatus.style.color = "red";
    return setTimeout(function() {window.location.reload();}, delay)
  }

  if (
    pilotValidation === "Is a Number" ||
    copilotValidation === "Is a Number"
  ) {
    window.alert("Pilot and Co-pilot names must be strings!");
    pilotStatus.innerHTML = "Pilot required for launch";
    copilotStatus.innerHTML = "Co-pilot required for launch";
    launchStatus.innerHTML = "Shuttle is not ready for launch";
    launchStatus.style.color = "red";
   setTimeout(function() {window.location.reload();}, delay)
  }

  fuelLevel = Number(fuelLevel);
  cargoLevel = Number(cargoLevel);

  let fuelReady = fuelLevel >= 10000;
  let cargoReady = cargoLevel <= 10000;

  if (!fuelReady) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
   setTimeout(function() {window.location.reload();}, delay)
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  if (!cargoReady) {
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    setTimeout(function() {window.location.reload();}, delay)
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }

  if (fuelReady && cargoReady) {
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "green";
    list.style.visibility = "visible";
  } else {
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
    list.style.visibility = "visible";
  }

  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
}

async function myFetch() {
  let planetsReturned = fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });
  return planetsReturned;
}

function pickPlanet(planets) {
  let index = Math.floor(Math.random() * planets.length);
  return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
