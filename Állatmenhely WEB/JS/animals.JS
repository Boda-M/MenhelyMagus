//var animalsPerPage = 12;
var currentPage = 1;
var pageCount = 1; 

// Function to list the data of the animals
function setAnimals(page, filters = null, preferences = null, onload = false) {
  awaitCondition(() => {
    if (onload && localStorage.getItem('userType') == "user")
    {
      preferences = {};
      let sliders = Array.from(document.getElementsByClassName("preferenceslider")); // Collect preference sliders
  
      sliders.forEach(slider => {
          if(slider.id === "weight")preferences[slider.id] = getWeight(slider);
          else preferences[slider.id] = slider.value;
      });
      preferences_paginator = preferences;
    }
    const animalsDiv = document.getElementById('animalsDiv');
    animalsDiv.style.opacity = 0; // Fade out the animalsDiv for a smooth transition.
    // Fetch paginated animal data with optional filters and preferences.
    getAnimalsPaginator(getAnimalsPerPage(), page, filters, preferences)
    .then(animalsArray => 
    {
      // Check if there are no animals that match the filters.
      if (animalsArray.length == 0) {
        animalsDiv.style.opacity = 1;
        document.getElementsByClassName("paginator")[0].style.display = "none"; // Hide paginator if no results.
        animalsDiv.innerHTML = "<div class='noAnimals'>Szűrésre nincs találat!</div>"; // Display "no results" message.
      } else {
        animalsDiv.style.opacity = 1; // Fade in the animalsDiv.
        animalsDiv.innerHTML = ""; // Clear current animalsDiv content

        // Iterate through the fetched animal array and create individual animal cards.
        for (let i = 0; i < animalsArray.length; i++) {
          const createdDIV = document.createElement('div')
          {
            // Determine the gender icon to display.
            var gender = animalsArray[i]['gender'] === 'F' ? 'female' : animalsArray[i]['gender'] === 'M' ? 'male' : 'questionmark';

            // Create animal attributes.
            var attributes = "";
            var animalAttributes = getAttributes(animalsArray[i]).split(';');
            for (let i = 0; i < animalAttributes.length; i++) {
              attributes += `<div class="animalAttribute">${animalAttributes[i]}</div>`;
            }

            // Add classes and HTML content to the created animal card.
            createdDIV.classList.add('animal');
            var checkAnimal = "Állat megtekintése!"; // Default language for "View Animal".
            if (localStorage.getItem('language')) checkAnimal = ((localStorage.getItem('language') == "deutsch" ? "Tier ansehen!" : "View animal!"))
            imgBase64 = animalsArray[i]['img'];
            let starHTML = "";
            if(localStorage.getItem('userType') === "user"){
              const activeClass = animalsArray[i]["favourite"] == "1" ? " active" : "";
              starHTML = `<div class="star${activeClass}" onclick="toggleStar(this, ${animalsArray[i]['id']})"></div>`;
            }
            createdDIV.innerHTML = `<div class="animalTop" style="background-image: url(${imgBase64}) !important;"><div class="animalHoverDiv" onclick="window.open('animal.php?id=${animalsArray[i]['id']}', '_blank');"><img src="IMG/magnifyingGlass.png" alt="Magnifying glass icon"><p>${checkAnimal}</p></div></div><div class="animalBottom"><div class="animalName" id="AnimalName_${animalsArray[i]['id']}"><span class="animalNameBold">${animalsArray[i]["name"]}</span><span class="animalAge"> ${animalsArray[i]['age']} </span><img src="IMG/${gender}.png" class="animalGenderImage" alt="Gender icon">${starHTML}</div><div class="animalLocation"><img src="IMG/location.png" alt="Location icon"><span>${animalsArray[i]['shelter']}</span></div>${attributes}</div>`;
          }
          // Append the created animal card to the animalsDiv.
          animalsDiv.appendChild(createdDIV);
        }

        // If the user type is "employee", display admin tools for editable animals.
        if (localStorage.getItem('userType') == "employee") {
          getData('employees/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
          .then(employee =>
          {
              var animalBottoms = document.getElementsByClassName('animalBottom');
              for (var i = 0; i < animalBottoms.length; i++) {
                if (employee['shelterId'] == animalsArray[i]['shelterId']) {
                  var adminToolsDiv = document.createElement('div');
                  adminToolsDiv.className = 'animalsEmployeeTools';
                  adminToolsDiv.innerHTML = `<img src="IMG/edit.png" alt="Edit icon" onclick="window.open('edit.php?id=${animalsArray[i]['id']}', '_blank')"><img src="IMG/delete.png" alt="Delete icon" onclick="deletePopup(${animalsArray[i]['id']})">`;
                  animalBottoms[i].appendChild(adminToolsDiv);
                }
              }
          })
        }

        updatePaginatorButtons(page); // Update the paginator.
        resizeOnWidthChange();
        resizePaws(); // Resize paws

        // Update the filter animalsPerPageDropdown ID based on the number of animals.
        document.getElementsByClassName('filterAnimalsPerPageDropdown')[0].id = animalsArray.length;
      }
    })
  }, () => {return doneLoadingUserPreferences});
}