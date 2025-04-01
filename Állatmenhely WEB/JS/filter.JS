// Function to toggle the filter section (expand/collapse)
function toggleFilter() {
    const filterDiv = document.getElementById('filter');
    filterDiv.classList.toggle('expanded'); // Toggle the 'expanded' class to change appearance
    
    if (filterDiv.classList.contains('overflow')) {
        // If the 'overflow' class is already present, toggle it off
        filterDiv.classList.toggle('overflow');
        document.getElementById('filterOverflow').classList.toggle('overflow');
    } else {
        // Otherwise, delay toggling the 'overflow' class for animation
        setTimeout(() => {
            filterDiv.classList.toggle('overflow');
            document.getElementById('filterOverflow').classList.toggle('overflow');
        }, 300); // Delay of 300ms
    }
}

// Function to toggle the preferences section (expand/collapse)
function togglePreferences() {
    const filterDiv = document.getElementById('preferences');
    filterDiv.classList.toggle('expanded'); // Toggle the 'expanded' class
    filterDiv.querySelector(".scroll").scrollTop = 0; // Reset scroll position to the top
}

// Function to select a filter option and deselect others
function filterSelect(type, selected, firstNotSelected, SecondNotSelected) {
    document.getElementById("filter" + type + selected).classList.add("selected" + type); // Select the chosen filter
    document.getElementById("filter" + type + firstNotSelected).classList.remove("selected" + type); // Deselect the first alternative
    document.getElementById("filter" + type + SecondNotSelected).classList.remove("selected" + type); // Deselect the second alternative
}

// Event listener to adjust layout when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    adjustLayout(); // Adjust the layout on load
    window.addEventListener('resize', adjustLayout); // Re-adjust layout on window resize
});

// Function to adjust layout dynamically based on screen width
function adjustLayout() {
    const filter = document.querySelector('#filter');
    const preferences = document.querySelector('#preferences');
    const searchBar = document.querySelector('.filterSearchByName');

    if (window.innerWidth > 1600 && !preferences.contains(searchBar)) preferences.parentNode.insertBefore(document.getElementsByClassName('filterAnimalsPerPageDropdown')[0],filter);
    else if (!filter.contains(searchBar))  preferences.parentNode.insertBefore(document.getElementsByClassName('filterAnimalsPerPageDropdown')[0],searchBar);    
}

// Function to apply visual effects on the filter button
function filterChanged() {
    const filterButton = document.getElementById("filterButton");
    filterButton.classList.add("filterButtonOpacity"); // Add opacity effect class
}

// Function to apply visual effects on the preference button
function preferenceChanged() {
    if (document.getElementById('preferenceButton')) {
        const filterButton = document.getElementById("preferenceButton");
        filterButton.classList.add("filterButtonOpacity"); // Add opacity effect class
    }
}

// Function to hide the preference button's opacity effect
function preferenceButtonHide() {
    if (document.getElementById('preferenceButton')) {
        const filterButton = document.getElementById("preferenceButton");
        filterButton.classList.remove("filterButtonOpacity"); // Remove opacity effect class
    }
}

// Function to refresh and save user preferences
function savePreference() {
    fetch(APISERVER + "/preferences/"+localStorage.getItem('userId'), {
        method: "PUT", // Specifies that the request is a PUT request.
        headers: 
        {
            "Content-Type": "application/json" // Indicates the request body format is JSON.
        },
        body: JSON.stringify( // Prepares the body of the request with filter and preference details.
        {
            "userId": `${localStorage.getItem('userId')}`,
            "age": `${document.getElementById("age").value}`,
            "ageWeight": `${document.getElementById("ageWeight").value}`,
            "weight": `${document.getElementById("weight").value}`,
            "weightWeight": `${document.getElementById("weightWeight").value}`,
            "cuteness": `${document.getElementById("cuteness").value}`,
            "cutenessWeight": `${document.getElementById("cutenessWeight").value}`,
            "childFriendlyness": `${document.getElementById("childFriendlyness").value}`,
            "childFriendlynessWeight": `${document.getElementById("childFriendlynessWeight").value}`,
            "sociability": `${document.getElementById("sociability").value}`,
            "sociabilityWeight": `${document.getElementById("sociabilityWeight").value}`,
            "exerciseNeed": `${document.getElementById("exerciseNeed").value}`,
            "exerciseNeedWeight": `${document.getElementById("exerciseNeedWeight").value}`,
            "furLength": `${document.getElementById("furLength").value}`,
            "furLengthWeight": `${document.getElementById("furLengthWeight").value}`,
            "docility": `${document.getElementById("docility").value}`,
            "docilityWeight": `${document.getElementById("docilityWeight").value}`,
            "token": `${localStorage.getItem('token')}`
        })
    })
    preferenceButtonHide(); // Hide the preference button

    // Display success message based on the user's language setting
    var translateText = `Felhasználói preferencia frissítve!`;
    var translateAlert = ['User preference updated!', 'Nutzerpräferenzen aktualisiert'];
    if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

    informationPopup(translateText, true, '', false);
}

// Function to add a preference button dynamically
function setPrefButton() {
    if (localStorage.getItem('userType') == "user") {
        var prefText = "Preferencia frissítése!";
        if (localStorage.getItem('language')) prefText = ((localStorage.getItem('language') == "deutsch" ? "Präferenzen setzen!" : "Update preferences!"))
        document.getElementById('filterButtonRow').innerHTML += `<div class="fancyButton preferenceButton" id="preferenceButton" onclick="savePreference()">
            ${prefText}
        </div>`;
    }
}
var doneLoadingUserPreferences = false;
// Function to initialize preferences from saved data
function setPrefs() {
    if (localStorage.getItem('userType') == "user") {
        getData('preferences/' + localStorage.getItem('userId'))
        .then(data => {
            ids = ['age','ageWeight','weight','weightWeight','cuteness','cutenessWeight','childFriendlyness','childFriendlynessWeight','sociability','sociabilityWeight','exerciseNeed','exerciseNeedWeight','furLength','furLengthWeight','docility','docilityWeight'];
            for (let i = 0; i < ids.length; i++) {
                document.getElementById(ids[i]).value = data[ids[i]]; // Set slider values
                document.getElementById(ids[i]).style.setProperty('--slider-fill', `${ (((data[ids[i]] / (document.getElementById(ids[i]).max))*100)) }%`); // Update slider fill style
            }
            doneLoadingUserPreferences = true;
        })
    }else{
        doneLoadingUserPreferences = true;
    }
}

// Function to refresh and update the displayed animals
function refreshResults(){
    isFiltering = true; // Indicates filtering is active
    let preferences = {};
    let sliders = Array.from(document.getElementsByClassName("preferenceslider")); // Collect preference sliders

    sliders.forEach(slider => {
        if(slider.id === "weight")preferences[slider.id] = getWeight(slider);
        else preferences[slider.id] = slider.value;
    });

    let filters = {};
    // Collect various filter inputs
    if(document.getElementById('searchByName').value != "")filters.name = document.getElementById('searchByName').value;
    if(getFilterGender() != 'Both')filters.gender = getFilterGender();
    if(getFilterNeuter() != 'Both')filters.neutered = getFilterNeuter();
    if(getFilterHouseBroken() != 'Both')filters.housebroken = getFilterHouseBroken();
    if(document.getElementById("filterCheckboxFavourite").checked)filters.favourite = true;
    if(document.getElementById("species").innerText != "Faj" && document.getElementById('species').innerText != "Species" && document.getElementById('species').innerText != "Art")filters.species = document.getElementById("species").innerText;

    // Loop through species options to find the selected species
    var speciesId = 0;
    for (let i = 0; i < document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) speciesId = document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('p').querySelector('input').id.split("species")[1];
    }
    if(speciesId != 0)filters.species = speciesId;

    // Collect breeds filter
    let breeds = getFilterBreeds();
    if(breeds.length != 0)filters.breeds = breeds;

    // Collect shelters filter
    let shelters = getFilterShelters();
    if(shelters.length != 0)filters.shelters = shelters;

    let habitats = getFilterHabitats();
    if(habitats.length != 0)filters.habitats = habitats;

    filters_paginator = filters;
    preferences_paginator = preferences;

    setAnimals(1, filters, preferences);
}

// Function to determine the selected gender filter
function getFilterGender() {
    let button = document.getElementsByClassName("selectedGender")[0]; // Retrieve the button with the "selectedGender" class
    if (button.id.includes('Male')) return "M"; // If the button's ID includes "Male", return "M" for male
    else if (button.id.includes('Female')) return "F"; // If the button's ID includes "Female", return "F" for female
    else return "Both"; // If neither is selected, return "Both" as the default value
}

// Function to determine the selected neuter status filter
function getFilterNeuter() {
    let button = document.getElementsByClassName("selectedNeuter")[0]; // Retrieve the button with the "selectedNeuter" class
    return button.id.replace("filterNeuter", ""); // Remove the "filterNeuter" prefix from the button's ID and return the remaining text
}

// Function to determine the selected housebroken filter
function getFilterHouseBroken() {
    let button = document.getElementsByClassName("selectedHouseBroken")[0]; // Retrieve the button with the "selectedHouseBroken" class
    return button.id.replace("filterHouseBroken", ""); // Remove the "filterHouseBroken" prefix from the button's ID and return the remaining text
}

// Function to retrieve the list of selected breeds from the breed checkboxes
function getFilterBreeds() {
    let breeds = []; // Initialize an empty array to store selected breed IDs
    let checkboxes = Array.from(document.getElementsByClassName("filterBreedCheckbox")); // Get all checkboxes with the "filterBreedCheckbox" class
    checkboxes.forEach(checkbox => { // Iterate over each checkbox
        if (checkbox.checked) { // If the checkbox is checked
            breeds.push(checkbox.id.replace("checkboxBreed", "")); // Remove the "checkboxBreed" prefix from the ID and add it to the breeds array
        }
    });
    return breeds; // Return the array of selected breeds
}

// Function to retrieve the list of selected shelters from the shelter checkboxes
function getFilterShelters() {
    let shelters = []; // Initialize an empty array to store selected shelter IDs
    let checkboxes = Array.from(document.getElementsByClassName("filterMenhelyCheckbox")); // Get all checkboxes with the "filterMenhelyCheckbox" class
    checkboxes.forEach(checkbox => { // Iterate over each checkbox
        if (checkbox.checked) { // If the checkbox is checked
            shelters.push(checkbox.id.replace("checkboxShelter", "")); // Remove the "checkboxShelter" prefix from the ID and add it to the shelters array
        }
    });
    return shelters; // Return the array of selected shelters
}

// Function to retrieve the list of selected habitats from the habitat checkboxes
function getFilterHabitats() {
    let habitats = []; // Initialize an empty array to store selected shelter IDs
    let checkboxes = Array.from(document.getElementsByClassName("filterHabitatCheckbox")); // Get all checkboxes with the "filterShelterCheckbox" class
    checkboxes.forEach(checkbox => { // Iterate over each checkbox
        if (checkbox.checked) { // If the checkbox is checked
            habitats.push(checkbox.id.replace("checkboxHabitat", "")); // Remove the "checkboxShelter" prefix from the ID and add it to the shelters array
        }
    });
    return habitats; // Return the array of selected shelters
}

function setFilterHabitat() {
    // Fetch habitat data from the server
    getData('habitats')
      .then(habitatArray => {
          // Select the element to display habitat options in the filter
          const selectElement = document.getElementById('habitatFilter').parentElement.querySelector('.selectContent');
          selectElement.innerHTML = ""; // Clear any existing options
          var inner = ""; // String to store new habitat options
  
          // Iterate through each habitat and create a corresponding checkbox option
          for (let i = 0; i < habitatArray.length; i++) {
            inner += `<div class="optionDiv" onclick="filterChanged()"><p class="checkboxAnimalText"><input id="checkboxHabitat${habitatArray[i]['id']}" class="filterHabitatCheckbox" type="checkbox" oninput="filterChanged()"><label class="checkboxAnimal" for="checkboxHabitat${habitatArray[i]['id']}"></label><span class="optionText">${habitatArray[i]['name']}</span></p></div>`;
          }
  
          selectElement.innerHTML = inner; // Populate the dropdown with habitat options.
          setOptionDivs(); // Apply additional behaviors or styling to the dropdown.
      })
  }