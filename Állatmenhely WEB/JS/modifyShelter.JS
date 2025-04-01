function modifyShelter(id) {
    // Retrieve input values from the form for shelter details
    nameShelter = document.getElementById('modifyShelterName').value; // VS Code said I shouldn't use the "name" variable, thats why I named it nameShelter
    email = document.getElementById('modifyShelterEmail').value;
    city = document.getElementById('modifyShelterCity').value;
    street = document.getElementById('modifyShelterStreet').value;
    houseNumber = document.getElementById('modifyShelterHouseNumber').value;
    telephoneNumber = document.getElementById('modifyShelterTelephone').value;


    var emailNotModified = email == document.getElementById('modifyShelterEmail').getAttribute('data-original');

    fetch(APISERVER + '/email', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": `${email}`
        })
    })
    .then(canUseEmail => {
        // If email is available, update the shelter
        if (canUseEmail['status'] == 200 || emailNotModified) {
            // Fetch original shelter data
            getData('shelters/' + id)
            .then(shelterOriginal => {
                // If fields are left empty, fill them with existing values from the shelterOriginal
                if (nameShelter == "") nameShelter = shelterOriginal['name'];
                if (email == "") email = shelterOriginal['email'];
                if (city == "") city = shelterOriginal['city'];
                if (street == "") street = shelterOriginal['street'];
                if (houseNumber == "") houseNumber = shelterOriginal['houseNumber'];
                if (telephoneNumber == "") telephoneNumber = shelterOriginal['telephoneNumber'];

                // Create the updated shelter body for the PUT request
                let body = {
                    "name": nameShelter,
                    "email": email,
                    "city": city,
                    "street": street,
                    "houseNumber": houseNumber,
                    "telephoneNumber": telephoneNumber,
                    "token": localStorage.getItem('token')
                };

                // Send the PUT request to the API to update shelter details
                fetch(APISERVER + "/shelters/" + id, 
                    {
                        method: "PUT", // Specifies that the request is a PUT request.
                        headers: 
                        {
                            "Content-Type": "application/json" // Indicates the request body format is JSON.
                        },
                        body: JSON.stringify(body) // Send data as JSON
                    })

                // Translate the success message depending on the selected language and reload the page
                var translateText = `Módosítás sikeres!`;
                var translateAlert = [`Modification successful!`, `Veränderung erfolgreich!`];
                if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
                informationPopup(translateText, true, `location.reload()`, false);
            })
        } else {
            // If email is already in use, show an alert
            var translateText = `Az email cím már használatban van!`;
            var translateAlert = ['The email address is already in use!', 'Diese E-Mail-Adresse wird bereits verwendet!'];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            informationPopup(translateText, true, '', true);
        }
    })
}

function deleteShelter(shelterId) {
    // Send a DELETE request to the server to remove the shelter
    fetch(APISERVER + "/shelters/"+shelterId, 
    {
        method: "DELETE", // Specifies that the request is a DELETE request
        headers: 
        {
            "Content-Type": "application/json" // Indicates the request body format is JSON.
        },
        body: JSON.stringify(
        {
            "token":`${localStorage.getItem('token')}` // Send the token as part of the request body
        })
    })
    .then(response => {
        // If the response is successful (status 200 OK)
        if (response.ok) {
            // Display success message in the appropriate language
            var translateText = `Törlés sikeres!`;
            var translateAlert = [`Deletion successful!`, `Löschen erfolgreich!`];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
            informationPopup(translateText, true, 'location.reload()', false);
        }
    })
}

function modifyShelterPopup(id) {
    // Change the layout for the popup window to ensure it is centered and visible
    document.getElementById('hamburgerIcon').style.marginRight = "0%";  // Adjusting hamburger icon layout
    document.getElementById("modifyShelterPopup").style.display = "block";  // Show popup
    document.getElementById("modifyShelterWindow").style.display = "block";  // Show popup window
    document.body.style.overflow = 'hidden'; // Disable scrolling while the popup is open

    var popup = document.getElementById("modifyShelterPopup");
    var popupwindow = document.getElementById("modifyShelterWindow");

    // Apply animation to gradually show the popup
    popup.style.transform = "opacity(1);";  // Transition to make the popup visible
    for (let index = 0; index < 11; index++) {
        setTimeout(function()  {
            popup.style.opacity = index*0.07;
            popupwindow.style.opacity = index*0.1;
        }, 40); // Gradually increase opacity
    }

    // If an ID is provided (id != -1), we are editing an existing shelter
    if (id != -1) {
        document.getElementById('modifyShelterButtonsDiv').style.display = "block";  // Show modification buttons
        document.getElementById('modifyShelterButtonsDiv2').style.display = "none";  // Hide the new shelter buttons

        // Set up the modify button with the shelter ID
        document.getElementById('modifyShelterButton').setAttribute("onclick", "modifyShelter(" + id + ")");
        
        // Get the shelter data from the server and populate the form fields
        getData('shelters/' + id)
        .then(menhely => {
            document.getElementById('modifyShelterName').value = menhely['name'];
            document.getElementById('modifyShelterEmail').value = menhely['email'];
            document.getElementById('modifyShelterEmail').setAttribute("data-original", menhely['email']);
            document.getElementById('modifyShelterCity').value = menhely['city'];
            document.getElementById('modifyShelterStreet').value = menhely['street'];
            document.getElementById('modifyShelterHouseNumber').value = menhely['houseNumber'];
            document.getElementById('modifyShelterTelephone').value = menhely['telephoneNumber'];
        })

        var addShelterText = "Biztosan módosítaná ezt a menhelyet?";
        var translateAlert = ['Are you sure you would modify this shelter?', 'Sind Sie sicher, dass Sie dieses Tierheim ändern möchten?'];
        if (localStorage.getItem('language')) addShelterText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('modifyShelterButton').setAttribute('onclick', `informationPopup("${addShelterText}", false, 'modifyShelter(${id});', false)`);

        var discardShelterText = "Biztosan elveti a módosításokat?";
        var translateAlert = ['Are you sure you would discard the modifications?', 'Sind Sie sicher, dass Sie diese Änderungen verwerfen möchten?'];
        if (localStorage.getItem('language')) discardShelterText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('discardShelterModificationsButton').setAttribute('onclick', `informationPopup("${discardShelterText}", false, 'modifyShelterPopupClose(); informationPopupClose();', false)`);
    } else {
        // If no ID is provided (id == -1), we're adding a new shelter
        document.getElementById('modifyShelterButtonsDiv').style.display = "none";
        document.getElementById('modifyShelterButtonsDiv2').style.display = "block";

        var addShelterText = "Biztosan hozzáadná ezt a menhelyet?";
        var translateAlert = ['Are you sure you would add this shelter?', 'Sind Sie sicher, dass Sie dieses Tierheim hinzufügen möchten?'];
        if (localStorage.getItem('language')) addShelterText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('addShelterButton').setAttribute('onclick', `informationPopup("${addShelterText}", false, 'addNewShelter();', false)`);

        var discardShelterText = "Biztosan elveti ezt az új menhelyet?";
        var translateAlert = ['Are you sure you would discard this new shelter?', 'Sind Sie sicher, dass Sie dieses neue Tierheim verwerfen möchten?'];
        if (localStorage.getItem('language')) discardShelterText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('discardNewShelterButton').setAttribute('onclick', `informationPopup("${discardShelterText}", false, 'modifyShelterPopupClose(); informationPopupClose();', false)`);

        // Clear form fields for adding a new shelter
        document.getElementById('modifyShelterName').value = "";;
        document.getElementById('modifyShelterEmail').value = "";
        document.getElementById('modifyShelterCity').value = "";
        document.getElementById('modifyShelterStreet').value = "";
        document.getElementById('modifyShelterHouseNumber').value = "";
        document.getElementById('modifyShelterTelephone').value = "";
    }
}

function modifyShelterPopupClose() {
    // Adjust the layout for closing the popup
    document.getElementById('hamburgerIcon').style.marginRight = "0%";  // Reset the hamburger icon layout
    var popup = document.getElementById("modifyShelterPopup");
    var popupwindow = document.getElementById("modifyShelterWindow");
    document.body.style.overflow = 'initial'; // Enable scrolling on the page again

    // Animate the opacity of the popup and window to make them disappear
    popup.style.transform = "opacity(0);"; // Apply transformation to make the popup fade out
    for (let index = 10; index >= 0; index--) {
        setTimeout(function() {
            popup.style.opacity = index * 0.07;  // Decrease the opacity gradually
            popupwindow.style.opacity = index * 0.1;  // Decrease the window opacity gradually
        }, 40); // Set a delay for the animation steps
    }

    // After the opacity transition is complete (400ms), hide the popup and window completely
    setTimeout(function() {
        document.getElementById("modifyShelterPopup").style.display = "none";  // Hide the popup
        document.getElementById("modifyShelterWindow").style.display = "none";  // Hide the window
        document.getElementById('hamburgerIcon').style.marginRight = "0%";  // Reset the hamburger icon margin
    }, 400);  // Delay the hiding of the elements to match the opacity transition
}

function addNewShelter() {
    // Get input values from the form
    nameShelter = document.getElementById('modifyShelterName').value; // VS Code said I shouldn't use the "name" variable, thats why I named it nameShelter
    email = document.getElementById('modifyShelterEmail').value;
    city = document.getElementById('modifyShelterCity').value;
    street = document.getElementById('modifyShelterStreet').value;
    houseNumber = document.getElementById('modifyShelterHouseNumber').value;
    telephoneNumber = document.getElementById('modifyShelterTelephone').value;

    // Validate inputs
    if (nameShelter != "" && email.includes('@') && email.includes('.') && city != "" && street != "" && houseNumber != "" && telephoneNumber != "" &&!isNaN(telephoneNumber)) {
        // If validation passes, send a POST request to add the new shelter

        fetch(APISERVER + '/email', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": `${email}`
            })
        })
        .then(canUseEmail => {
            // If email is available, register the shelter
            if (canUseEmail['status'] == 200) {
                fetch(APISERVER + "/shelters", 
                {
                    method: "POST", // Specifies that the request is a POST request.
                    headers: 
                    {
                        "Content-Type": "application/json" // Indicates the request body format is JSON.
                    },
                    body: JSON.stringify(
                    {
                        "name":`${nameShelter}`,
                        "email":`${email}`,
                        "city":`${city}`,
                        "street":`${street}`,
                        "houseNumber":`${houseNumber}`,
                        "telephoneNumber":`${telephoneNumber}`,
                        "token":`${localStorage.getItem('token')}`
                    })
                })
                // Show success message and reload the page
                var translateText = `Hozzáadás sikeres!`;
                var translateAlert = [`Successfully added!`, `Erfolgreich hinzugefügt!`];
                if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
                informationPopup(translateText, true, `location.reload()`, false);
            } else {
                // If email is already in use, show an alert
                var translateText = `Az email cím már használatban van!`;
                var translateAlert = ['The email address is already in use!', 'Diese E-Mail-Adresse wird bereits verwendet!'];
                if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
    
                informationPopup(translateText, true, '', true);
            }
        })
    } else {
        // If validation fails, show an error message
        var allDataMustBeFilledInText = "Minden adat kitöltése kötelező!";
        var translateAlert = ['All data must be filled in!', 'Alle Daten müssen ausgefüllt werden!'];
        if (localStorage.getItem('language')) allDataMustBeFilledInText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        informationPopup(allDataMustBeFilledInText, true, '', true);
    }
}

function setShelters() {
    // Fetch shelter data from the API
    getData('shelters')
    .then(shelterArray => {
        // Select the table body where the shelter rows will be inserted
        let tableBody = document.querySelector('#sheltersTable');

        // Loop through each shelter in the returned shelterArray
        for (let i = 0; i < shelterArray.length; i++) {
            // Create a new row for each shelter
            let newRow = document.createElement('tr');

            // Add the shelter data to the row, including ID, Name, Edit icon, and Delete icon
            var modifyShelterText = `Biztosan törölni szeretné a menhelyet? [ID: ${shelterArray[i].id}]`;
            var translateAlert = [`Are you sure you would like to delete this shelter? [ID: ${shelterArray[i].id}]`, `Sind Sie sicher, dass Sie dieses Tierheim löschen möchten? [ID: ${shelterArray[i].id}]`];
            if (localStorage.getItem('language')) modifyShelterText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            newRow.innerHTML = `
            <td>${shelterArray[i].id}</td>
            <td>${shelterArray[i].name}</td>
            <td><img src="IMG/edit.png" alt="Edit icon" onclick="modifyShelterPopup(${shelterArray[i].id})"></td>
            <td><img src="IMG/delete.png" alt="Delete icon" onclick="informationPopup('${modifyShelterText}', false, 'deleteShelter(${shelterArray[i].id})', false)"></td>`;
            
            // Append the new row to the table body
            tableBody.appendChild(newRow);
        }
    })
}