// Function to create an animal by sending a POST request to the server
function create() {
    // Loop through location options to find the selected shelter
    var shelterId = document.getElementById('location').nextElementSibling.querySelectorAll('.optionDiv')[0].querySelector(".checkboxAnimalText").querySelector("input").id.split('shelter')[1];
    
    // Loop through species options to find the selected species
    var speciesId = 0;
    for (let i = 0; i < document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) speciesId = document.getElementById('species').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('p').querySelector('input').id.split("species")[1];
    }

    // Loop through breed options and collect selected breed IDs
    var breeds = [];
    for (let i = 0; i < document.getElementById('breed').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('breed').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) {
            var id = document.getElementById('breed').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelectorAll('input')[0].id;
            breeds.push(id.split("Breed")[1]);
        }
    }

    // Loop through habitat options and collect selected habitat IDs
    var habitats = [];
    for (let i = 0; i < document.getElementById('habitat').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('habitat').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) habitats.push(document.getElementById('habitat').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('p').querySelector('input').id.split("Habitat")[1]);
    }

    // Loop through vaccine options and collect selected vaccine IDs
    var vaccines = [];
    for (let i = 0; i < document.getElementById('vaccine').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('vaccine').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) vaccines.push(document.getElementById('vaccine').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('p').querySelector('input').id.split("Vaccine")[1]);
    }

    // Determine gender based on the selected option
    var gender = "M";
    if (document.getElementById('genderF').classList.contains('selectedGender')) { gender = "F"; }
    if (document.getElementById('genderU').classList.contains('selectedGender')) { gender = "U"; }

    imgToBase64(document.getElementById('animalContainerIMG')).then(imgData => {
        // Send a POST request to create the animal with the form data

        let requestData = JSON.stringify( // Prepares the body of the request with animal details.
        {
            "shelterId":`${shelterId}`,
            "birthDate":`${document.getElementById('inputBirthday').value}`,
            "entryDate":`${document.getElementById('inputShelterDate').value}`,
            "speciesId":`${speciesId}`,
            "breedId":breeds,
            "name":`${document.getElementById('inputAnimalName').value}`,
            "gender":`${gender}`,
            "neutered":`${document.getElementById('checkboxNeutered').checked ? 1 : 0}`,
            "healthy":`${document.getElementById('checkboxHealthy').checked ? 1 : 0}`,
            "weight":`${document.getElementById("inputWeight").value.replace(',', '.')}`,
            "cuteness":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderCuteness')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
            "childFriendlyness":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderchildFriendlyness')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
            "sociability":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderSociability')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
            "exerciseNeed":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderexerciseNeed')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
            "furLength":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderfurLength')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
            "docility":`${Math.round( parseInt(getComputedStyle(document.getElementById('sliderDocility')).getPropertyValue('--slider-fill').trim()) / 10 )}`,
            "housebroken":`${document.getElementById('checkboxHousebroken').checked ? 1 : 0}`,
            "description":`${document.getElementById('inputDescription').value}`,
            "habitatId":habitats,
            "vaccineId":vaccines,
            "image":imgData,
            "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
        });

        fetch(APISERVER + "/animals", {
        method: "POST", // Specifies that the request is a POST request.
        headers: 
        {
            "Content-Type": "application/json" // Indicates the request body format is JSON.
        },
        body: requestData
        })
        .then(response => {
            if (response.ok) return response.json(); // Parse the response as JSON
        }).then(data => {
            var translateText = `Hozzáadás sikeres!`;
            var translateAlert = [`Successfully added!`, `Erfolreich hinzugefügt!`];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
            informationPopup(translateText, true, `window.location.href = "animal.php?id=${data.data.new['id']}"`, false);
        })
        .catch(error => console.error("Error:", error)); // Catch and log errors
    });
}

function imgToBase64(img) {
    return new Promise((resolve, reject) => {
        // First, convert the image to a blob (this assumes you already have the `convertImageToBlob` function)
        convertImageToBlob(img).then(imgBlob => {
            let reader = new FileReader();

            // When the FileReader has finished reading the image blob
            reader.onloadend = function () {
                let base64Image = reader.result;
                resolve(base64Image);  // Return the base64 string
            };

            // In case of error during the reading process
            reader.onerror = function (error) {
                reject(error);
            };

            // Start reading the image blob as base64
            reader.readAsDataURL(imgBlob);
        }).catch(error => {
            reject(error);  // If the blob conversion fails, reject the promise
        });
    });
}


function convertImageToBlob(img) {
    // Ensure img and img.src exist
    if (!(img && img.src)) {
        return null; // No image provided to convert
    }

    // Check if the image source is a data URI (base64-encoded string)
    if (img.src.startsWith('data:')) {
        // Convert base64 data to a Blob
        const base64Data = img.src.split(',')[1]; // Remove the metadata part ("data:image/jpeg;base64,")

        // Decode the base64 string into binary data
        const byteCharacters = atob(base64Data);
        const byteArrays = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Blob from the binary data
        const blob = new Blob([byteArrays], { type: 'image/jpeg' });  // Adjust type depending on your image format
        return Promise.resolve(blob); // Return the Blob wrapped in a resolved promise
    }

    // For regular image URLs, fetch as usual
    return fetch(img.src)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch image: ' + response.status);
            }
            return response.blob();  // Convert the response to a Blob
        })
        .then(blob => {
            return blob;
        })
        .catch(error => {
            console.error('Error fetching image:', error);  // Logs any errors that occur
            return null;
        });
}

function setCreateButtons()
{
    var discardAnimalText = "Biztosan elvetné ezt az állatot?";
    var translateAlert = ['Are you sure you would discard this animal?', 'Sind Sie sich sicher dass Sie dieses Tier verwerfen möchten?'];
    if (localStorage.getItem('language')) discardAnimalText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
    document.getElementById('createDiscardAnimal').setAttribute('onclick', `informationPopup("${discardAnimalText}", false, 'window.location.href = "animals.php"', false)`);
    
    document.getElementById('createAddAnimal').setAttribute('onclick', `checkInputsCreate()`);
}

function checkInputsCreate()
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
        var addAnimalText = "Biztosan hozzáadja ezt az állatot?";
        var translateAlert = ['Are you sure you would add this animal?', 'Sind Sie sich sicher dass Sie dieses Tier hinzufügen möchten?'];
        if (localStorage.getItem('language')) addAnimalText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        informationPopup(addAnimalText, false, 'create()', false);
    }
}