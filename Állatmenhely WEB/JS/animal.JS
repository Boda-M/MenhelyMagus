function animalPageOnload(id){
  placePaws(); 
  checkBoxFixer(); 
  setHeader(); 
  setAnimal(id);
  setRegisterHabitat();
  setUserDataHabitat();
  translate()
}

// Function to set the data of an animal
function setAnimal(id)
{
  // Fetch the data for the selected animal based on its ID
  getData('animals/' + id)
  .then(animal => {
    var city = ""; // To store the city of the shelter
    var name = ""; // To store the name of the shelter

    // Handle habitat data
    const habitatIds = animal['habitat'].map(str => Number(str)); // Convert habitat IDs to numbers
    for (let i = 0; i < habitatIds.length; i++) {
      getData('habitats/' + habitatIds[i])
      .then(habitat => {
        // Populate the habitat content
        const habitatContent = document.getElementById('habitatContent');
        habitatContent.innerHTML += `<div><p class="habitatName">` + habitat['name'] + `</p><p class="habitatInfo">` + habitat['description'] + `</p></div>`;
        
        // Add a separator if not the last habitat
        if (i + 1 != habitatIds.length) habitatContent.innerHTML += `<hr>`;
      })
    }

    // Handle vaccine data
    const vaccineIds = animal['vaccine'].map(str => Number(str));
    for (let i = 0; i < vaccineIds.length; i++) {
      getData('vaccines/' + vaccineIds[i])
      .then(vaccine => {
        // Populate the vaccine content
        const vaccineContent = document.getElementById('vaccineContent_');
        vaccineContent.innerHTML += `<div><p class="vaccineName">` + vaccine['name'] + `</p><p class="vaccineDescription">` + vaccine['description'] + `</p></div>`;
        
        // Add a separator if not the last vaccine
        if (i + 1 != vaccineIds.length) vaccineContent.innerHTML += `<hr>`;
      })
    }

    // Fetch shelter data to determine the animal's shelter information
    getData('shelters')
    .then(shelters => {
      for (let j = 0; j < shelters.length; j++) {
        if (shelters[j]['id'] == animal['shelterId']) {
          city = shelters[j]['city']; // Set shelter city
          name = shelters[j]['name'];  // Set shelter name

          // Determine the animal's gender and corresponding icon
          var gender = animal['gender'] === 'F' ? "female" : animal['gender'] === 'M' ? "male" : "questionmark";

          // Display the animal's image
          var element = document.getElementById("animalImgContainer");
          var createdElement = document.createElement('img');
          createdElement.src = `${animal['img']}`;
          createdElement.classList.add("animalContainerIMG");
          createdElement.alt = "Picture of the animal";
          element.appendChild(createdElement);

          // Display the animal's name, age, and gender
          element = document.getElementById("animalInfosSecondContainer");
          createdElement = document.createElement('div');
          createdElement.classList.add("animalName");
          createdElement.id="animalName";
          createdElement.innerHTML = `<span class="animalNameBold">` + animal["name"] + `</span> <span class="animalAge">` + animal['age'] + `</span> <img src="IMG/` + gender + `.png" class="animalGenderImage" alt="Gender icon">`;
          element.appendChild(createdElement);

          if (gender == "questionmark") document.getElementsByClassName('animalGenderImage')[0].classList.add('darkGenderImage');
          //Maybe remove this random line??? [TODO] [MERGE]
          // Employee tools for editing/deleting the animal (if the user is an employee)
          if (localStorage.getItem('userType') == "employee") {
            getData('employees/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
            .then(employee =>
            {
              if (employee['shelterId'] == animal['shelterId']) {
                var adminToolsDiv = document.createElement('div');
                adminToolsDiv.classList.add("animalsEmployeeTools");
                adminToolsDiv.innerHTML = `<a href='edit.php?id=${animal['id']}'><img src="IMG/edit.png" alt="Edit icon"></a><img src="IMG/delete.png" alt="Delete icon" onclick="deletePopup(` + animal["id"] + `)">`;
                element.appendChild(adminToolsDiv);
              }
            })
          } else if (localStorage.getItem('userType') == "user") { // Adoption button for regular users
              var animalName = document.getElementById('animalName');
              var animalAdoptButton = document.createElement('div');
              animalAdoptButton.classList.add("animalAdoptButton");
              animalAdoptButton.innerHTML = `<button id="AdoptAnimalButton" class="fancyButtonV2" onclick="adopt(` + animal['id'] + `)">Örökbefogadás!</button>`;
              animalName.appendChild(animalAdoptButton);
              
              // Translation support for the adoption button
              var translateInTimeout = ['Adopt animal!', 'Adoptieren!'];
              if(localStorage.getItem('language')) document.getElementById('AdoptAnimalButton').innerHTML = translateInTimeout[localStorage.getItem('language') == "deutsch" ? 1 : 0];
          }

          // Additional animal details (species, breed, birthday, etc.)
          createdElement = document.createElement('div');
          createdElement.innerHTML = `<div class="speciesDiv"><img src="IMG/breedIcon.png" alt="Breed icon"><div class="select"><div class="selectTitle placeholder" id="species" data-enabled="true" data-type="species" data-select-type="single" data-show-type="showselected">Faj</div><div class="selectContent"></div></div></div><div class="breedsDiv"><img src="IMG/breedIcon.png" alt="Breed icon"><div class="select"><div class="selectTitle placeholder" id="breed" data-enabled="false" data-type="breed" data-show-type="shownumber" onclick="selectDropdown(this);">Fajta</div><div class="selectContent"></div></div></div><br><br><br><div class="birthdayDiv"><img src="IMG/birthdaycake.png" alt="Birthday cake icon"><span>${animal["birthDate"]}</span></div><div class="mmDiv"><img src="IMG/Header/logo.png" alt="MenhelyMágus logo"><span>${animal["entryDate"]}</span></div><br><br><div class="locationDiv"><img src="IMG/location.png" alt="Location icon"><span>${name} (${city})</span></div><div class="weightDiv"><img src="IMG/weightIcon.png" alt="Location icon"><span>${animal["weight"]} kg</span></div><br><br><div class="habitatDiv"><img src="IMG/habitatIcon.png" alt="Habitat icon"><span onclick="habitatPopup(${animal['id']})"><span id="animalHabitats">Élőhelyek</span> (${animal['habitat'].length})</span></div><div class="vaccineDiv"><img src="IMG/vaccineIcon.png" alt="Vaccine icon"><span onclick="oltasPopup(${animal['id']})"><span id="animalVaccines">Oltások</span> (${animal['vaccine'].length})</span></div>`;
          element.appendChild(createdElement);

          var translateHabitats = ['Habitats', 'Deutsch'];
          var translateVaccines = ['Vaccines', 'Deutsch'];
          if(localStorage.getItem('language')) document.getElementById('animalHabitats').innerHTML = translateHabitats[localStorage.getItem('language') == "deutsch" ? 1 : 0];
          if(localStorage.getItem('language')) document.getElementById('animalVaccines').innerHTML = translateVaccines[localStorage.getItem('language') == "deutsch" ? 1 : 0];
          
          // Slider values (e.g., friendliness, energy levels)
          var sliders = ["sliderCuteness", "sliderChildFriendlyness", "sliderSociability", "sliderExerciseNeed", "sliderFurLength", "sliderDocility"];
          var values = ["cuteness", "childFriendlyness", "sociability", "exerciseNeed", "furLength", "docility"]
          for (let i = 0; i < sliders.length; i++) {
              var slider = document.getElementById(sliders[i]);
              slider.value = animal[values[i]];
              sliderMove(slider);
              slider.style.setProperty('--slider-fill', `${ (((animal[values[i]] / (slider.max))*100)) }%`);
          }

          // Checkbox settings (e.g., health, neutered status)
          var checkbox = document.getElementById("checkboxHealthy");
          checkbox.checked = animal["healthy"] == "1";

          checkbox = document.getElementById("checkboxNeutered");
          checkbox.checked = animal["neutered"] == "1";

          checkbox = document.getElementById("checkboxHousebroken");
          checkbox.checked = animal["housebroken"] == "1";

          // Set the animal's description
          var description = document.getElementById("animalDescription");
          description.innerText = animal["description"];

          // Populate species and breed dropdowns
          setSpecies();
          awaitCondition(() => 
          {
              const speciesOptionDivs = document.getElementById("species").parentElement.getElementsByClassName("selectContent")[0].querySelectorAll(".optionDiv");
              document.getElementById('species' + animal['speciesId']).parentElement.parentElement.click();
              awaitCondition(() => 
              {
                  const breedOptionDivs = document.getElementById("breed").parentElement.getElementsByClassName("selectContent")[0].querySelectorAll(".optionDiv");
                  const goodIds = animal['breed'];
                  for (let i = 0; i < goodIds.length; i++) {
                      if (document.getElementById("checkboxBreed" + goodIds[i])) document.getElementById("checkboxBreed" + goodIds[i]).parentElement.parentElement.click();
                  }

                  for (let i = 0; i < speciesOptionDivs.length; i++) { // Delete those species that don't match the animal's species ID
                      if (speciesOptionDivs[i].innerHTML.includes('data-checked="true"') == false) speciesOptionDivs[i].remove();
                  }
                for (let i = 0; i < breedOptionDivs.length; i++) { // Delete those breeds that don't match the animal's breed ID
                    if (breedOptionDivs[i].innerHTML.includes('data-checked="true"') == false) breedOptionDivs[i].remove();
                }

                var path = window.location.pathname;
                var page = path.split("/").pop();
                if (page == "animal.php") {
                    const elements = document.getElementsByClassName("optionDiv");
                    for (let i = 0; i < elements.length; i++) {
                      if (!elements[i].parentElement.parentElement.classList.contains('registerSelect')) elements[i].addEventListener('click', (e) => {
                          e.stopImmediatePropagation();
                          e.stopPropagation();
                      }, true);
                      if (!elements[i].parentElement.parentElement.classList.contains('registerSelect')) elements[i].querySelector("input[type=checkbox]").disabled = "true";
                    }
                }
            }, () => isLoaded("breed"));
          }, () => isLoaded("species"));
        }
      }
    })
  })
}