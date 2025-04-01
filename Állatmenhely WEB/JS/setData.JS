function setLocation() {
  document.getElementById('location').setAttribute('hasLoaded', false);
  // Fetch shelter data from the API.
  getData('shelters')
    .then(shelterArray => {
      // If the user is an employee, additional filtering is applied.
      if (localStorage.getItem('userType') == "employee")
      {
        getData("employees/" + localStorage.getItem('userId') + "/" + localStorage.getItem('token'))
        .then(employeeData => {
          // Select the dropdown element where the shelters will be displayed.
          const selectElement = document.getElementById('location').parentElement.querySelector('.selectContent');
          selectElement.innerHTML = ""; // Clear previous content.
          var inner = ""; // String to hold the HTML content.
          var path = window.location.pathname;
          var page = path.split("/").pop(); // Get the current page name.
          var onlyOne = false; // Flag to handle single shelter selection.
  
          if (page == "animals.php") {
            // Populate the dropdown with shelter checkboxes for animals.php.
            shelterArray.forEach(shelterObj => {
              inner += `<div class="optionDiv" onclick="filterChanged()"><p class="checkboxAnimalText"><input class="filterMenhelyCheckbox" id="checkboxShelter${shelterObj.id}" type="checkbox" oninput="filterChanged()"><label class="checkboxAnimal" for="checkboxShelter${shelterObj.id}"></label><span class="optionText">${shelterObj.name} (${shelterObj.city})</span></p></div>`;
            });
          } else {
            // For other pages
            shelterArray.forEach(shelterObj => {
              if (page == "create.php") {
                // Restrict to the employee's specific shelter.
                if (shelterObj.id == employeeData['shelterId']) {
                  inner += `<div class="optionDiv radio"><p class="checkboxAnimalText"><input id="shelter${shelterObj.id}" type="checkbox"><label class="checkboxAnimal" for="shelter${shelterObj.id}"></label><span class="optionText">${shelterObj.name} (${shelterObj.city})</span></p></div>`;
                  onlyOne = true; // Set flag if only one shelter is allowed.
                }
              }
              else inner += `<div class="optionDiv radio"><p class="checkboxAnimalText"><input id="shelter${shelterObj.id}" type="checkbox"><label class="checkboxAnimal" for="shelter${shelterObj.id}"></label><span class="optionText">${shelterObj.name} (${shelterObj.city})</span></p></div>`;
            });
          }
          selectElement.innerHTML = inner; // Populate the dropdown with the generated HTML.
          setOptionDivs(); // Apply additional behaviors or styling to the options.
          document.getElementById('location').setAttribute('hasLoaded', true);
          if (onlyOne) selectElement.querySelector(".optionDiv").click(); // Automatically select the only option if applicable.
        })
      } else {
        // For non-employee users, populate the dropdown with all shelters.
        const selectElement = document.getElementById('location').parentElement.querySelector('.selectContent');
        selectElement.innerHTML = ""; // Clear previous content.
        var inner = ""; // String to hold the HTML content.
        var path = window.location.pathname;
        var page = path.split("/").pop(); // Get the current page name.

        if (page == "animals.php") {
          // Populate the dropdown with shelter checkboxes for animals.php.
          shelterArray.forEach(shelterObj => {
            inner += `<div class="optionDiv" onclick="filterChanged()"><p class="checkboxAnimalText"><input class="filterMenhelyCheckbox" id="checkboxShelter${shelterObj.id}" type="checkbox" oninput="filterChanged()"><label class="checkboxAnimal" for="checkboxShelter${shelterObj.id}"></label><span class="optionText">${shelterObj.name} (${shelterObj.city})</span></p></div>`;
          });
        }
        selectElement.innerHTML = inner; // Populate the dropdown with the generated HTML.
        setOptionDivs(); // Apply additional behaviors or styling to the options.
        document.getElementById('location').setAttribute('hasLoaded', true);
      }
      
    })
}

function setSpecies() {
  // Fetch species data from the API.
  document.getElementById('species').setAttribute('hasLoaded', false);
  getData('species')
    .then(fajArray => {
      // Select the dropdown element where species options will be displayed.
      const selectElement = document.getElementById('species').parentElement.querySelector('.selectContent');
      selectElement.innerHTML = ""; // Clear previous content.
      var inner = ""; // String to hold the HTML content.
      let i = 0;
      var path = window.location.pathname;
      var page = path.split("/").pop(); // Get the current page name.

      if (page == "animals.php") {
        // If on animals.php, add an onclick event : filterChanged()
        fajArray.forEach(speciesObj => 
        {
          inner += `<div class="optionDiv radio" onclick="filterChanged()"><p class="checkboxAnimalText"><input id="species${speciesObj.id}" type="checkbox" oninput="filterChanged()"><label class="checkboxAnimal" for="species${speciesObj.id}"></label><span class="optionTextSpecies">${speciesObj.name}</span></p></div>`;
          i++;
        });
      } else {
        // For other pages, populate the dropdown without the onclick event
        fajArray.forEach(speciesObj => 
        {
          inner += `<div class="optionDiv radio"><p class="checkboxAnimalText"><input id="species${speciesObj.id}" type="checkbox"><label class="checkboxAnimal" for="species${speciesObj.id}"></label><span class="optionTextSpecies">${speciesObj.name}</span></p></div>`;
          i++;
        });
      }
      selectElement.innerHTML = inner; // Populate the dropdown with the generated HTML.
      setOptionDivs(); // Apply additional behaviors or styling to the options.ű
      document.getElementById('species').setAttribute('hasLoaded', true);
    })
}

function setBreed() {
  document.getElementById('breed').setAttribute('hasLoaded', false);
  awaitCondition(() => {
    // Get the selected species title and trim it for accurate comparison.
    const selectedTitle = document.getElementById('species').innerHTML.trim();
    // Retrieve all species options from the dropdown menu.
    const options = document.querySelectorAll('.selectContent .optionDiv .optionTextSpecies');
    var whichOne = -1; // Initialize a variable to track the selected species.
  
    // Find the index of the selected species.
    for (let i = 0; i < options.length; i++) {
      if (options[i].innerHTML.trim() === selectedTitle) whichOne = options[i].parentElement.querySelector("input").id.split("species")[1];
    }
    // Fetch breeds for the selected species using its index.
    getData('breeds/species/' + whichOne)
    .then(breedArray => {
      // Get the element where breed options will be displayed.
      const selectElement = document.getElementById('breed').parentElement.querySelector('.selectContent');
      selectElement.innerHTML = ""; // Clear any existing options.
      var inner = ""; // String to build breed options.
      let i = 0;
      var path = window.location.pathname;
      var page = path.split("/").pop(); // Extract the current page name.
  
      if (page == "animals.php") {
        // If on the "animals.php" page, add an onclick event : filterChanged()
        breedArray.forEach(breed => {
          inner += `<div class="optionDiv" onclick="filterChanged()"><p class="checkboxAnimalText"><input class="filterBreedCheckbox" id="checkboxBreed${breed.id}" type="checkbox" oninput="filterChanged()"><label class="checkboxAnimal" for="checkboxBreed${breed.id}"></label><span class="optionText">${breed.name}</span></p></div>`;
          i++;
        });
      } else {
        // For other pages, populate the dropdown without the onclick event
        breedArray.forEach(breed => {
          inner += `<div class="optionDiv"><p class="checkboxAnimalText"><input id="checkboxBreed${breed.id}" type="checkbox"><label class="checkboxAnimal" for="checkboxBreed${breed.id}"></label><span class="optionText">${breed.name}</span></p></div>`;
          i++;
        });
      }
  
      selectElement.innerHTML = inner; // Populate the dropdown with breed options.
      setOptionDivs(); // Apply additional behaviors or styling to the dropdown.
      document.getElementById('breed').setAttribute('hasLoaded', true);
    })
  }, () => isLoaded('species'));
}

function setHabitat() {
  // Fetch habitat data from the server
  document.getElementById('habitat').setAttribute('hasLoaded', false);
  getData('habitats')
    .then(habitatArray => {
        // Select the element to display habitat options
        const selectElement = document.getElementById('habitat').parentElement.querySelector('.selectContent');
        selectElement.innerHTML = ""; // Clear any existing options
        var inner = ""; // String to store new habitat options

        // Iterate through each habitat and create a corresponding checkbox option
        for (let i = 0; i < habitatArray.length; i++) {
          inner += `<div class="optionDiv"><p class="checkboxAnimalText"><input id="Habitat${habitatArray[i]['id']}" type="checkbox"><label class="checkboxAnimal" for="Habitat${habitatArray[i]['id']}"></label><span class="optionText">${habitatArray[i]['name']}</span></p></div>`;
        }

        selectElement.innerHTML = inner; // Populate the dropdown with habitat options.
        setOptionDivs(); // Apply additional behaviors or styling to the dropdown.
        document.getElementById('habitat').setAttribute('hasLoaded', true);
    })
}

function setVaccine() {
  if(document.getElementById("vaccine"))document.getElementById('vaccine').setAttribute('hasLoaded', false);
  if (document.getElementById('vaccine')) {
    // Get the selected species title and trim it for accurate comparison.
    const selectedTitle = document.getElementById('species').innerHTML.trim();
    // Retrieve all species options from the dropdown menu.
    const options = document.querySelectorAll('.selectContent .optionDiv .optionTextSpecies');
    var speciesId = -1; // Initialize a variable to track the selected species.

    // Find the index of the selected species.
    for (let i = 0; i < options.length; i++) {
      if (options[i].innerHTML.trim() === selectedTitle) speciesId = options[i].parentElement.querySelector("input").id.split("species")[1];
    }

    // Fetch vaccination data from the server
    getData('vaccines/species/' + speciesId)
      .then(vaccineArray => {
          // Select the element where vaccination options will be displayed
          const selectElement = document.getElementById('vaccine').parentElement.querySelector('.selectContent');
          selectElement.innerHTML = ""; // Clear existing options
          var inner = ""; // String to store new vaccination options
          // Iterate through each vaccine and create a corresponding checkbox option
          for (let i = 0; i < vaccineArray.length; i++) {
            inner += `<div class="optionDiv"><p class="checkboxAnimalText"><input id="Vaccine${vaccineArray[i]['id']}" type="checkbox"><label class="checkboxAnimal" for="Vaccine${vaccineArray[i]['id']}"></label><span class="optionText">${vaccineArray[i]['name']}</span></p></div>`;
          }

          selectElement.innerHTML = inner; // Populate the dropdown with habitat options.
          setOptionDivs(); // Apply additional behaviors or styling to the dropdown.
          document.getElementById('vaccine').setAttribute('hasLoaded', true);
      })
  }
}

function isLoaded(id){
  let element = document.getElementById(id);
  return element != null && element.getAttribute("hasLoaded") == "true";
}