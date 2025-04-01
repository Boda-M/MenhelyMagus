// Function to display the information popup with the given animal id
function informationPopup(text, oneButtonOnly, buttonOneFunction, hasPopupUnder) {
    document.getElementById('hamburgerIcon').style.marginRight = "0%"; // Reset the hamburger icon margin
    document.getElementById("informationPopup").style.display = "block"; // Show the delete popup
    document.getElementById("informationWindow").style.display = "block"; // Show the information window
    document.body.style.overflow = 'hidden'; // Disable page scrolling while the popup is visible

    // Setting up the information window
    document.getElementById('informationButtonYes').setAttribute("onclick",buttonOneFunction);

    document.getElementById('informationText').innerHTML = text;


    if (!oneButtonOnly) {
        var popupTitle = "Művelet megerősítése";
        var translateAlert = ['Confirm operation', 'Vorgang bestätigen'];
        if (localStorage.getItem('language')) popupTitle = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('informationTitle').innerHTML = popupTitle;

        document.getElementById('informationButtonNo').style.display = "block";
        document.getElementById('informationButtonYes').style.marginRight = "0px";

        var buttonText = "Nem";
        var translateAlert = ['No', 'Nein'];
        if (localStorage.getItem('language')) buttonText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('informationButtonNo').innerHTML = buttonText;
        document.getElementById('informationButtonNo').setAttribute("onclick","informationPopupClose(" + hasPopupUnder + ")");

        var buttonText = "Igen";
        var translateAlert = ['Yes', 'Ja'];
        if (localStorage.getItem('language')) buttonText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('informationButtonYes').innerHTML = buttonText;
    }
    else {
        document.getElementById('informationButtonYes').innerHTML = "OK";
        if (buttonOneFunction == '') document.getElementById('informationButtonYes').setAttribute("onclick","informationPopupClose(" + hasPopupUnder + ")");
        else document.getElementById('informationButtonYes').setAttribute("onclick", buttonOneFunction);

        var popupTitle = "Információ";
        var translateAlert = ['Information', 'Information'];
        if (localStorage.getItem('language')) popupTitle = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('informationTitle').innerHTML = popupTitle;

        document.getElementById('informationButtonNo').style.display = "none";
        document.getElementById('informationButtonYes').style.marginRight = "70px";
    }
    
    var popup = document.getElementById("informationPopup");
    var popupwindow = document.getElementById("informationWindow");
    popup.style.transform = "opacity(1);"; // Start the animation to fade in the popup window

    // Loop to gradually increase opacity for the popup window (fade-in animation)
    for (let i = 0; i < 11; i++) {
        setTimeout(function() { // Fade-in animation
            popup.style.opacity = i * 0.07;
            popupwindow.style.opacity = i * 0.1;
        }, 40);
    }
}

// Function to close the information popup
function informationPopupClose(hasPopupUnder) {
    document.getElementById('hamburgerIcon').style.marginRight = "0%"; // Reset the hamburger icon margin
    
    var popup = document.getElementById("informationPopup");
    var popupwindow = document.getElementById("informationWindow");
    if (!hasPopupUnder) document.body.style.overflow = 'initial'; // Enable page scrolling again after closing the popup

    // Loop to gradually decrease opacity for the popup window (fade-out animation)
    for (let i = 10; i >= 0; i--) {
        setTimeout(function() { // Fade-out animation
            popup.style.opacity = i * 0.07;
            popupwindow.style.opacity = i * 0.1;
        }, 40);
    }

    // After the fade-out animation completes, hide the popup window, and reset the hamburger icon margin
    setTimeout(function() { 
        document.getElementById("informationPopup").style.display = "none"; // Hide the popup
        document.getElementById("informationWindow").style.display = "none"; // Hide the window
        document.getElementById('hamburgerIcon').style.marginRight = "0%"; // Reset the hamburger icon margin
    }, 400);
}