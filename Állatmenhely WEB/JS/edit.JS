function editPageOnload(animalId){
    placePaws();//OK
    checkBoxFixer();//OK
    setHeader();//If user is logged in, will fetch userdata with 'setUserProfile()'
    setSpecies();//fetches species -> setOptionDivs(), : [!setBreed() -> setOptionDivs() and setVaccine() -> setOptionDivs()]
    setLocation(); //fetches shelters -> (optionally fetches employee data ->) setOptionDivs
    setHabitat(); //fetches habitats -> setOptionDivs()
    setAnimalEdit(animalId); 
    displayWithBreaks();//OK
    setRegisterHabitat(); 
    setUserDataHabitat(); 
    translate();//OK
    setEditButtons();//OK*/
}
  

// Switches the selected gender option by toggling the "selectedGender" class based on the provided gender
function switchGender(gender) {
    // Iterate through gender options and toggle the "selectedGender" class for the corresponding gender
    ["genderM", "genderF", "genderU"].forEach(id => {
        const element = document.getElementById(id);
        element.classList.toggle("selectedGender", id === `gender${gender.toUpperCase()}`);
    });
}

// Fills in the current date as the shelter date in the date input field
function fillInDate() {
  const currentDate = new Date();
  // Set the value of inputShelterDate to the current date in the format YYYY-MM-DD
  document.getElementById("inputShelterDate").value = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
}

// Limits the input to a number with up to 3 digits before the decimal and up to 3 decimal places
function limitInputLength(element) {
    const value = element.value;
    const regex = /^\d{0,3}(\.\d{0,3})?$/;
    // If the input value doesn't match the regex, slice the last character
    if (!regex.test(value)) element.value = value.slice(0, -1);
}

// Displays the content of the description field with line breaks preserved
function displayWithBreaks() {
    const textarea = document.getElementById('inputDescription');
    // Replace <br> tags with newlines for display in the textarea
    const formattedContent = textarea.value.replace(/<br\s*\/?>/gi, '\n');
    textarea.value = formattedContent;
}

// Opens a file input dialog for selecting an image, then displays the selected image in the container
function imageEdit() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                // Set the source of the image to the selected file
                document.getElementById('animalContainerIMG').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    };

    input.click();
}

// Shows or hides the "kg" label based on whether the weight input field is filled
function weightInputChanged() {
    var text = document.getElementById("inputWeight").value;
    // Show the "kg" label if the weight input has a value, otherwise hide it
    if (text != "") document.getElementById("input_kg").style.visibility = "visible";
    else document.getElementById("input_kg").style.visibility = "hidden";
}

// Validates the form and sends a PUT request to update the animal's data
function edit() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id'); // Retrieve the animal's ID from the URL

    // Get the selected shelter ID
    var shelterId = document.getElementById('location').nextElementSibling.querySelectorAll('.optionDiv')[0].querySelector(".checkboxAnimalText").querySelector("input").id.split('shelter')[1];
    
    // Loop through species options to find the selected species
    var speciesId = 0;
    for (let i = 0; i < document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) speciesId = document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('p').querySelector('input').id.split("species")[1];
    }

    // Get the selected breed IDs
    var breeds = [];
    for (let i = 0; i < document.getElementById('breed').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('breed').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) {
            var id_ = document.getElementById('breed').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelectorAll('input')[0].id;
            breeds.push(id_.split("Breed")[1]);
        }
    }

    // Loop through habitat options and collect selected habitat IDs
    var habitats = [];
    for (let i = 0; i < document.getElementById('habitat').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('habitat').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) habitats.push(document.getElementById('habitat').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('p').querySelector('input').id.split("Habitat")[1]);
    }


    // Get the selected vaccine IDs
    var vaccines = [];
    for (let i = 0; i < document.getElementById('vaccine').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('vaccine').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) vaccines.push(document.getElementById('vaccine').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('p').querySelector('input').id.split("Vaccine")[1]);
    }

    // Get the selected gender
    var gender = "M";
    if (document.getElementById('genderF').classList.contains('selectedGender')) { gender = "F"; }
    if (document.getElementById('genderU').classList.contains('selectedGender')) { gender = "U"; }

    // Get checkbox values for neutered, healthy, and housebroken status
    var neutered = 0;
    if (document.getElementById('checkboxNeutered').checked) { neutered = 1; }

    var healthy = 0;
    if (document.getElementById('checkboxHealthy').checked) { healthy = 1; }

    var housebroken = 0;
    if (document.getElementById('checkboxHousebroken').checked) { housebroken = 1; }

    imgToBase64(document.getElementById('animalContainerIMG')).then(imgData => {

        // Send a PUT request to update the animal's data
        fetch(APISERVER + "/animals/"+id, {
            method: "PUT", // Specifies that the request is a PUT request.
            headers: 
            {
                "Content-Type": "application/json" // Indicates the request body format is JSON.
            },
            body: JSON.stringify(
            {
                "shelterId":`${shelterId}`,
                "birthDate":`${document.getElementById('inputBirthday').value}`,
                "entryDate":`${document.getElementById('inputShelterDate').value}`,
                "speciesId":`${speciesId}`,
                "breedId":breeds,
                "name":`${document.getElementById('inputAnimalName').value}`,
                "gender":`${gender}`,
                "neutered":`${neutered}`,
                "healthy":`${healthy}`,
                "weight":`${document.getElementById("inputWeight").value.replace(',', '.')}`,
                "cuteness":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderCuteness')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
                "childFriendlyness":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderchildFriendlyness')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
                "sociability":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderSociability')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
                "exerciseNeed":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderexerciseNeed')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
                "furLength":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderfurLength')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
                "docility":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderDocility')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
                "housebroken":`${housebroken}`,
                "description":`${document.getElementById('inputDescription').value}`,
                "habitatId":habitats,
                "vaccineId":vaccines,
                "image":imgData,
                "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
            })
        })
        .then(response => {
            // Redirect to animals page if update is successful
            if (response.ok) {
                var translateText = `Módosítás sikeres!`;
                var translateAlert = [`Modification successful!`, `Veränderung erfolgreich!`];
                if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
                informationPopup(translateText, true, `window.location.href = "animal.php?id=${id}"`, false);
            }
        })
        .catch(error => console.error("Error:", error)); // Catch and log errors
    });
}

// Function to set the data of an animal for editing
function setAnimalEdit(id) {
  // Fetch data for the specific animal using its ID
  getData('animals/' + id)
  .then(animal => {
    awaitCondition(() => {
        // Set the animal's image
        document.getElementById('animalContainerIMG').src = animal['img'];

                // Populate the form fields with the animal's information
                document.getElementById('inputAnimalName').value = animal['name'];
                document.getElementById('gender'+animal['gender']).classList.add('selectedGender');
                document.getElementById('inputBirthday').value = animal['birthDate'];
                document.getElementById('inputShelterDate').value = animal['entryDate'];
                document.getElementById('inputWeight').value = animal['weight'];
                weightInputChanged(); // Function to handle weight input changes
                // Update the location selector
                for (let i = 0; i < document.getElementById("location").nextElementSibling.querySelectorAll(".optionDiv").length; i++) {
                    if (document.getElementById("location").nextElementSibling.querySelectorAll(".optionDiv")[i].querySelector('p').querySelector('input').id == ('shelter' + animal['shelterId'])) {
                        document.getElementById("location").nextElementSibling.querySelectorAll(".optionDiv")[i].click();
                    } else {
                        document.getElementById("location").nextElementSibling.querySelectorAll(".optionDiv")[i].remove();
                        i--;
                    }
                    document.getElementById("location").nextElementSibling.style.overflowY = "hidden";
                }

                // Update the sliders with the animal's traits
                var sliders = ["sliderCuteness", "sliderchildFriendlyness", "sliderSociability", "sliderexerciseNeed", "sliderfurLength", "sliderDocility"];
                var values = ["cuteness", "childFriendlyness", "sociability", "exerciseNeed", "furLength", "docility"]
                for (let i = 0; i < sliders.length; i++) {
                    var slider = document.getElementById(sliders[i]);
                    slider.value = animal[values[i]];
                    slider.style.setProperty('--slider-fill', `${ (((animal[values[i]] / (slider.max))*100)) }%`);
                }

                // Update checkboxes for the animal's characteristics (healthy, neutered, housebroken)
                var checkbox = document.getElementById("checkboxHealthy");
                checkbox.checked = animal["healthy"] == "1";

                checkbox = document.getElementById("checkboxNeutered");
                checkbox.checked = animal["neutered"] == "1";

                checkbox = document.getElementById("checkboxHousebroken");
                checkbox.checked = animal["housebroken"] == "1";

                // Set the animal's description
                var description = document.getElementById("inputDescription");
                description.value = animal["description"];

                // Set species dropdown based on the animal's species ID
                awaitCondition(() => 
                {
                    const optionDivs = document.getElementById("species").parentElement.getElementsByClassName("selectContent")[0].querySelectorAll(".optionDiv");
                    for(let i = 0; i < optionDivs.length; i++){
                        if(optionDivs[i].firstChild.querySelector("input").id.split("species")[1] == animal['speciesId'])optionDivs[i].click();
                    }
                    

                    // Fetch species data and select the animal's breeds
                    awaitCondition(() => //Await all required breed checkbox elements to be loaded
                    {
                        for (let i = 0; i < animal['breed'].length; i++) {
                            if (document.getElementById("checkboxBreed" + animal['breed'][i])) document.getElementById("checkboxBreed" + animal['breed'][i]).parentElement.parentElement.click();
                        }
                    }, () => animal['breed'].every(id => document.getElementById("checkboxBreed" + id)));

                }, () => isLoaded('species'));


                // Select the animal's habitat(s) based on the habitat ID
                for (let i = 0; i < animal['habitat'].length; i++) {
                    const optionDivId = 'Habitat' + animal['habitat'][i]; // Construct the ID
                    const parentElement = document.querySelector('.habitatedit'); // Find the parent with the class 'habitatedit'
                    const checkbox = parentElement.querySelector(`#${optionDivId}`);
                    checkbox.parentElement.parentElement.click();
                }

                awaitCondition(() => {//Await all required vaccine checkbox elements to be loaded
                    // Select the animal's vaccinations based on the vaccine IDs
                    for (let i = 0; i < animal['vaccine'].length; i++) {
                        document.getElementById('Vaccine' + animal['vaccine'][i]).parentElement.parentElement.click();
                    }
        }, () => animal['vaccine'].every(vaccineId => document.getElementById('Vaccine' + vaccineId)));
    }, () => isLoaded('location'))
  })
}

function setEditButtons()
{
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id'); // Retrieve the animal's ID from the URL
    var discardModificationsText = "Biztosan elvetné a módosításokat?";
    var translateAlert = ['Are you sure you would reject the modifications?', 'Sind Sie sicher, dass Sie diese Änderungen verwerfen möchten?'];
    if (localStorage.getItem('language')) discardModificationsText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
    document.getElementById('editDiscardModifications').setAttribute('onclick', `informationPopup("${discardModificationsText}", false, 'window.location.href = "animal.php?id=${id}"', false)`);
    
    document.getElementById('editSaveModifications').setAttribute('onclick', `checkInputsEdit()`);
}

function checkInputsEdit()
{
    //inputs are empty:
    if(!(document.getElementById('animalContainerIMG').src.includes('imageIcon.png') == false && document.getElementById('inputAnimalName').value != "" && document.getElementById('species').style.color == "black" && document.getElementById('breed').style.color == "black" && document.getElementById('location').style.color == "black" && document.getElementById('inputWeight').value != "" && document.getElementById('habitat').style.color == "black" && document.getElementById('inputBirthday').value && document.getElementById('inputShelterDate').value)){
        var allDataMustBeFilledInText = "Minden adat kitöltése kötelező!";
        var translateAlert = ['All data must be filled in!', 'Alle Daten müssen ausgefüllt werden!'];
        if (localStorage.getItem('language')) allDataMustBeFilledInText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        informationPopup(allDataMustBeFilledInText, true, '', false);
    }
    //inputs are invalid:
    else if(document.getElementById('inputBirthday').value > document.getElementById('inputShelterDate').value){
        var allDataMustBeFilledInText = "Születési dátumnak nem adhat meg menhelybekerülés utáni dátumot";
        var translateAlert = ['The animal\'s birthdate cannot be later than the shelter entry date!', 'Der Geburtstag kann nicht nach dem Eintritt ins Tierheim liegen!'];
        if (localStorage.getItem('language')) allDataMustBeFilledInText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        informationPopup(allDataMustBeFilledInText, true, '', false);
    }
    else //all inputs are valid:
    {
        var modifyAnimalText = "Biztosan módosítja ezt az állatot?";
        var translateAlert = ['Are you sure you would modify this animal?', 'Sind Sie sicher, dass Sie dieses Tier ändern möchten?'];
        if (localStorage.getItem('language')) modifyAnimalText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        informationPopup(modifyAnimalText, false, 'edit()', false);
    }


    // Check if all required fields are filled and the animal image is set
    if (document.getElementById('animalContainerIMG').src.includes('imageIcon.png') == false && document.getElementById('inputAnimalName').value != "" && document.getElementById('species').style.color == "black" && document.getElementById('breed').style.color == "black" && document.getElementById('location').style.color == "black" && document.getElementById('inputWeight').value != "" && document.getElementById('habitat').style.color == "black" && document.getElementById('inputBirthday').value && document.getElementById('inputShelterDate').value) {
        
    } else 
    {
        var allDataMustBeFilledInText = "Minden adat kitöltése kötelező!";
        var translateAlert = ['All data must be filled in!', 'Alle Daten müssen ausgefüllt werden!'];
        if (localStorage.getItem('language')) allDataMustBeFilledInText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        informationPopup(allDataMustBeFilledInText, true, '', false);
    }
}