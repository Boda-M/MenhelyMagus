// Function to adopt an animal by sending a POST request to the server
function adopt(animalId) {
    // Sends a POST request to the API to initiate an adoption process for a specific animal.
    fetch(APISERVER + "/adoptions/", {
        method: "POST", // Specifies that the request is a POST request.
        headers: 
                {
                    "Content-Type": "application/json" // Indicates the request body format is JSON.
                },
                body: JSON.stringify( // Prepares the body of the request with adoption details.
                {
                    "animalId":`${animalId}`, // The ID of the animal to be adopted.
                    "userId":`${localStorage.getItem('userId')}`, // Retrieves the user ID from local storage.
                    "token":`${localStorage.getItem('token')}` // Retrieves the user's authentication token from localStorage.
                })
        })
        .then(response => {
            return response.json(); // Parses the JSON response from the server.
        })
        .then(data => {
            if (data.data && Array.isArray(data.data.new) && data.data.new.includes('UserHabitatError')) {
                // Displays an alert message based on the user's preferred language setting if the server response indicated a habitat error.
                var translateText = `Felhasználó nem tudja biztosítani az elvárt élőhelyek egyikét sem!`;
                var translateAlert = ['User cannot provide any of the required habitats!', 'Der Nutzer kann die erforderlichen Lebensräume nicht bieten!'];
                if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

                informationPopup(translateText, true, '', false);
            } else {
                // Displays a success message if the adoption request is successful.
                var translateText = `Örökbefogadási kérés sikeres, hamarosan kezelés alá kerül.`;
                var translateAlert = ['Your adoption request is successful, it will be processed shortly.', 'Ihre Adoptionsanfrage wurde gesendet, und wird bald bearbeitet.'];
                if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

                // Redirects the user to the animals page.
                informationPopup(translateText, true, 'window.location.href = "animals.php"', false);
            }
    })
}

// Function to reject an adoption by sending a DELETE request to the server
function rejectAdoption(animalId, userId) {
    // Sends a DELETE request to the API to reject an adoption request for a specific animal and user.
    fetch(APISERVER + "/adoptions/" + animalId + "/" + userId, {
        method: "DELETE", // Specifies that the request is a DELETE request.
        headers: 
        {
            'Content-Type': 'application/json' // Indicates the request body format is JSON.
        },
        body: JSON.stringify(
        { 
            "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
        })
    });
    // Redirects the employee to the employee tools page after the rejection is processed.
    var translateText = `Elutasítás sikeres!`;
    var translateAlert = [`Rejection successful!`, `Ablehnung erfolgreich!`];
    if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
    informationPopup(translateText, true, `location.reload()`, false);
}

// Function to accept an adoption by sending a PUT request to the server
function acceptAdoption(animalId, userId) {
    // Sends a PUT request to the API to accept an adoption request for a specific animal and user.
    fetch(APISERVER + "/adoptions/" + animalId + "/" + userId, {
        method: "PUT", // Specifies that the request is a PUT request.
        headers: 
        {
            'Content-Type': 'application/json' // Indicates the request body format is JSON.
        },
        body: JSON.stringify(
        { 
            "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
        })
    });
    // Redirects the employee to the employee tools page after the approval is processed.
    var translateText = `Jóváhagyás sikeres!`;
    var translateAlert = [`Approval successful!`, `Zulassung erfolgreich!`];
    if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
    informationPopup(translateText, true, `location.reload()`, false);
}

// Function to display pending adoptions
function setOrokbefogadasok() {
// Get the div element where adoptions will be displayed
const div = document.getElementById('adoptionsDiv');
  getAdoptions()
  .then(adoptionsArray => {
    // Iterate over the adoptions array to create and display adoption cards
    var showedAdoptions = 0;
    for (let i = 0; i < adoptionsArray.length; i++) {
      if (adoptionsArray[i]['pending'] == 1)
      {
        showedAdoptions++;
        // Create a new div for each adoption card
        const createdDIV = document.createElement('div')
        {
          // Set the gender image based on the gender value
          var gender = adoptionsArray[i]['animalName'] === 'F' ? 'female' : adoptionsArray[i]['animalName'] === 'M' ? 'male' : 'questionmark';

          // Add a class for styling the adoption card
          createdDIV.classList.add('adoption');

          var popupRejectText = "Biztosan elutasítaná az örökbefogadást?";
          var translateAlert = ['Are you sure you would reject the adoption?', 'Sind Sie sicher dass Sie die Adoption ablehnen möchten?'];
          if (localStorage.getItem('language')) popupRejectText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
          
          var popupApproveText = "Biztosan jóváhagyná az örökbefogadást?";
          var translateAlert = ['Are you sure you would approve the adoption?', 'Sind Sie sicher dass Sie die Adoption genehmigen möchten?'];
          if (localStorage.getItem('language')) popupApproveText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

          // Fill the adoption card with relevant information using innerHTML
          createdDIV.innerHTML = `<div class="adoptionTop" style="background-image: url(${adoptionsArray[i]["img"]}) !important;"></div><div class="adoptionBottom"><div class="animalName" id="AnimalName_${adoptionsArray[i]['animalId']}"><span class="animalNameBold">${adoptionsArray[i]["animalName"]}</span><span class="animalAge"> ${adoptionsArray[i]['animalAge']} </span><img src="IMG/${gender}.png" alt="Gender icon" class="animalGenderImage"></div><hr><p class="adopterName">${adoptionsArray[i]['userName']}<img src="IMG/userIcon.png" alt="User icon"></p><div class="adopterInformation"><img src="../IMG/email.png" alt="Email icon">${adoptionsArray[i]['userEmail']}</div><div class="adopterInformation"><img src="../IMG/phone.png" alt="Phone icon">${adoptionsArray[i]['userTelephoneNumber']}</div><div class="adopterInformation"><img src="../IMG/location.png" alt="Location icon">${adoptionsArray[i]['userCity']} ${adoptionsArray[i]['userStreet']} ${adoptionsArray[i]['userHouseNumber']}</div><div class="adopterInformation"><img src="../IMG/habitatIcon.png" alt="Habitat icon"><span id="Adopt_HabitatInformation_${i}">Élőhelyet biztosítani tud</span></div>
          <div class="adoptManageButton fancyButton" id="Adopt_RejectButton_${i}" onclick="informationPopup('${popupRejectText}', false, 'rejectAdoption(${adoptionsArray[i]['animalId']},${adoptionsArray[i]['userId']})', false);">Elutasít</div>
          <div class="adoptManageButton fancyButton" id="Adopt_AcceptButton_${i}" onclick="informationPopup('${popupApproveText}', false, 'acceptAdoption(${adoptionsArray[i]['animalId']},${adoptionsArray[i]['userId']})', false);">Jóváhagy</div>
          </div>`;
        }

        // Append the created adoption card to the parent div
        div.appendChild(createdDIV);
        
        // Translation mapping for dynamic content based on the user's language
        var translateInTimeout = [
          ['Adopt_HabitatInformation_' + i, 'Can provide habitat', 'Kann Lebensraum bieten'],
          ['Adopt_RejectButton_' + i, 'Reject', 'Ablehnen'],
          ['Adopt_AcceptButton_' + i, 'Approve', 'Genehmigen'],
        ]

        // Check the user's selected language and update the text accordingly
        if (localStorage.getItem('language')) {
          for (let i = 0; i < translateInTimeout.length; i++)  {
              document.getElementById(translateInTimeout[i][0]).innerHTML = translateInTimeout[i][localStorage.getItem('language') == "deutsch" ? 2 : 1];
          }
        }
      }
    }
    if (showedAdoptions == 0) {
      const createdDIV = document.createElement('div')
      {
        createdDIV.innerHTML = "<div class='noAdoptions' id='noAdoptions'>Jelenleg nincs függőben egy örökbefogadás sem!</div>";
      }
      div.appendChild(createdDIV);
        
      // Set the translated message for no pending adoptions based on the language
      var translateInTimeout = ['There are currently no pending adoptions!', 'Es gibt momentan keine ausstehenden Adoptionen!'];
      if(localStorage.getItem('language')) document.getElementById('noAdoptions').innerHTML = translateInTimeout[localStorage.getItem('language') == "deutsch" ? 1 : 0];
      
      div.style.display = "unset !important";
    }
  })
}