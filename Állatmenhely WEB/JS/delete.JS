// Function to display the delete popup with the given animal id
function deletePopup(id) {
    document.getElementById("deleteIdText").innerHTML = id; // Set the animal id in the popup
    document.getElementById('hamburgerIcon').style.marginRight = "0%"; // Reset the hamburger icon margin
    document.getElementById("deletePopup").style.display = "block"; // Show the delete popup
    document.getElementById("deleteWindow").style.display = "block"; // Show the delete window
    document.getElementById("deleteWindow").classList.add("delete"); // Add "delete" class to window
    document.getElementById("deleteWindow").classList.remove("register"); // Remove "register" class from window
    document.body.style.overflow = 'hidden'; // Disable page scrolling while the popup is visible
    
    var popup = document.getElementById("deletePopup");
    var popupwindow = document.getElementById("deleteWindow");
    popup.style.transform = "opacity(1);"; // Start the animation to fade in the popup window

    // Loop to gradually increase opacity for the popup window (fade-in animation)
    for (let i = 0; i < 11; i++) {
        setTimeout(function() { // Fade-in animation
            popup.style.opacity = i * 0.07;
            popupwindow.style.opacity = i * 0.1;
        }, 40);
    }

    // Set the actions for the "Yes" and "No" buttons in the popup
    document.getElementById("deleteButtonYes").setAttribute("onclick", "deleteAnimal(" + id + ")");
    document.getElementById("deleteButtonNo").setAttribute("onclick", "deletePopupClose()");
}

// Function to close the delete popup
function deletePopupClose() {
    document.getElementById('hamburgerIcon').style.marginRight = "0%"; // Reset the hamburger icon margin
    
    var popup = document.getElementById("deletePopup");
    var popupwindow = document.getElementById("deleteWindow");
    document.body.style.overflow = 'initial'; // Enable page scrolling again after closing the popup

    popup.style.transform = "opacity(0);"; // Start the animation to fade out the popup window

    // Loop to gradually decrease opacity for the popup window (fade-out animation)
    for (let i = 10; i >= 0; i--) {
        setTimeout(function() { // Fade-out animation
            popup.style.opacity = i * 0.07;
            popupwindow.style.opacity = i * 0.1;
        }, 40);
    }

    // After the fade-out animation completes, hide the popup window, and reset the hamburger icon margin
    setTimeout(function() { 
        document.getElementById("deletePopup").style.display = "none"; // Hide the popup
        document.getElementById("deleteWindow").style.display = "none"; // Hide the window
        document.getElementById('hamburgerIcon').style.marginRight = "0%"; // Reset the hamburger icon margin
    }, 400);
}

// Function to delete the animal by sending a DELETE request to the server
function deleteAnimal(id) {
    // Sends a DELETE request to the API to delete a specific animal
    fetch(APISERVER + "/animals/" + id, {
        method: "DELETE", // Specifies that the request is a DELETE request.
        headers: 
        {
            'Content-Type': 'application/json' // Indicates the request body format is JSON.
        },
        body: JSON.stringify(
        { 
            "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
        })
    }).then(() => {// Redirects the employee to the animals page after the deletion is processed.
        var translateText = `Törlés sikeres!`;
        var translateAlert = [`Deletion successful!`, `Erfolgreich gelöscht!`];
        if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        informationPopup(translateText, true, 'window.location.href = "animals.php"', false);
    });
}