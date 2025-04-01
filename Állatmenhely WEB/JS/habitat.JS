// Function to open the habitat popup
function habitatPopup() {
    // Adjust the margin of the hamburger icon to accommodate the popup
    document.getElementById('hamburgerIcon').style.marginRight = "0%";

    // Display the popup and its window elements
    document.getElementById("habitatPopup").style.display = "block";
    document.getElementById("habitatWindow").style.display = "block";

    // Scroll the habitat window to the top (ensures consistent view on open)
    document.getElementById("habitatWindow").scrollTop = 0;

    // Disable page scrolling while the popup is open
    document.body.style.overflow = 'hidden';

    // Get references to the popup and its window for further styling
    var popup = document.getElementById("habitatPopup");
    var popupWindow = document.getElementById("habitatWindow");

    // Start setting the transform style (opacity-related transformation)
    popup.style.transform = "opacity(1);";

    // Gradually increase the opacity of the popup and its window for a fade-in effect
    for (let i = 0; i < 11; i++) {
        setTimeout(function() {
            popup.style.opacity = i * 0.07; // Gradual increase in popup opacity
            popupWindow.style.opacity = i * 0.1; // Gradual increase in window opacity
        }, 40); // Delay for each step to create a smooth transition
    }
}

// Function to close the habitat popup
function habitatPopupClose() {
    // Reset the margin of the hamburger icon
    document.getElementById('hamburgerIcon').style.marginRight = "0%";

    // Get references to the popup and its window for further styling
    var popup = document.getElementById("habitatPopup");
    var popupWindow = document.getElementById("habitatWindow");

    // Re-enable page scrolling since the popup is being closed
    document.body.style.overflow = 'initial';

    // Start setting the transform style (opacity-related transformation)
    popup.style.transform = "opacity(0);";

    // Gradually decrease the opacity of the popup and its window for a fade-out effect
    for (let i = 10; i >= 0; i--) {
        setTimeout(function() {
            popup.style.opacity = i * 0.07; // Gradual decrease in popup opacity
            popupWindow.style.opacity = i * 0.1; // Gradual decrease in window opacity
        }, 40); // Delay for each step to create a smooth transition
    }

    // After the fade-out effect is complete, hide the popup elements
    setTimeout(function() {
        // Set the display of the popup and its window to "none"
        document.getElementById("habitatPopup").style.display = "none";
        document.getElementById("habitatWindow").style.display = "none";

        // Reset the margin of the hamburger icon
        document.getElementById('hamburgerIcon').style.marginRight = "0%";
    }, 400); // Timeout matches the fade-out duration for a seamless effect
}