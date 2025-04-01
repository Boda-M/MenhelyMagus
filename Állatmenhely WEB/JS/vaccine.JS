// Function to open the vaccine popup
function oltasPopup()
{
    // Reset margin of hamburger icon
    document.getElementById('hamburgerIcon').style.marginRight = "0%";

    // Make the popup and window visible
    document.getElementById("vaccinePopup").style.display = "block";
    document.getElementById("vaccineWindow").style.display = "block";

    // Scroll the window to the top
    document.getElementById("vaccineWindow").scrollTop = 0;

    // Disable page scrolling when the popup is visible
    document.body.style.overflow = 'hidden';

    // Get popup and window elements
    var popup = document.getElementById("vaccinePopup");
    var popupwindow = document.getElementById("vaccineWindow");

    // Start opacity animation for the popup and window
    popup.style.transform = "opacity(1);";
    for (let index = 0; index < 11; index++) {
        setTimeout(function() {
            popup.style.opacity = index*0.07; // Gradually increase opacity of the popup
            popupwindow.style.opacity = index*0.1; // Gradually increase opacity of the window
        }, 40);
    }
}

// Function to close the vaccine popup
function oltasPopupClose()
{
    // Reset margin of hamburger icon
    document.getElementById('hamburgerIcon').style.marginRight = "0%";

    // Get popup and window elements
    var popup = document.getElementById("vaccinePopup");
    var popupwindow = document.getElementById("vaccineWindow");

    // Enable page scrolling again
    document.body.style.overflow = 'initial';

    // Start opacity animation for closing the popup and window
    popup.style.transform = "opacity(0);";
    for (let index = 10; index >= 0; index--) {
        setTimeout(function() {
            popup.style.opacity = index*0.07; // Gradually decrease opacity of the popup
            popupwindow.style.opacity = index*0.1; // Gradually decrease opacity of the window
        }, 40);
    }

    // After the opacity reaches 0, hide the popup and window
    setTimeout(function() { //Csak akkor fut le, ha már az opacity lement nullára.
        document.getElementById("vaccinePopup").style.display = "none";
        document.getElementById("vaccineWindow").style.display = "none";
        document.getElementById('hamburgerIcon').style.marginRight = "0%";
    }, 400); // Delay to allow opacity transition to finish
}