// Function to handle opening and closing of the hamburger menu
function hamburgerOpen() {
    if (document.getElementById('hamburgerPopup').style.display == "block") { // Close the hamburger menu
        document.getElementById('hamburgerIcon').classList.toggle('open'); // Toggle the hamburger icon state
        document.getElementById('hamburgerPopup').style.display = "none"; // Hide the popup menu
        document.body.style.overflow = 'initial'; // Enable scrolling on the main page
        var spans = document.getElementsByClassName("hamburgerSpan"); // Get all hamburger menu spans
        for (let i = 0; i < spans.length; i++) { spans[i].style.backgroundColor = 'black'; } // Reset span colors to black
    } else { // Open the hamburger menu
        document.getElementById('hamburgerIcon').classList.toggle('open'); // Toggle the hamburger icon state
        document.getElementById('hamburgerPopup').style.display = "block"; // Show the popup menu
        document.getElementById('hamburgerPopup').style.marginTop = scrollY + "px"; // Adjust popup position based on scroll
        document.body.style.overflow = 'hidden'; // Disable scrolling on the main page
        var spans = document.getElementsByClassName("hamburgerSpan"); // Get all hamburger menu spans
        for (let i = 0; i < spans.length; i++) { 
            var style = getComputedStyle(document.body); // Get computed styles for the page
            spans[i].style.backgroundColor = style.getPropertyValue('--highlight'); // Set span colors to highlight color
        }
    }
}

// Function to automatically close the hamburger menu if the screen size exceeds 1000px
function sizeCheck() {
    if (document.getElementById('hamburgerPopup').style.display == "block" && window.innerWidth > 1000) { // Check if menu is open and screen size > 1000px
        document.getElementById('hamburgerIcon').classList.toggle('open'); // Toggle the hamburger icon state
        document.getElementById('hamburgerPopup').style.display = "none"; // Hide the popup menu
        document.body.style.overflow = 'initial'; // Enable scrolling on the main page
        var spans = document.getElementsByClassName("hamburgerSpan"); // Get all hamburger menu spans
        for (let i = 0; i < spans.length; i++) { spans[i].style.backgroundColor = ''; } // Reset span colors
    }
}

// Function to close the hamburger menu when a button in the menu is pressed
function hamburgerCloseAtLoginPress() {
    document.getElementById('hamburgerIcon').classList.toggle('open'); // Toggle the hamburger icon state
    document.getElementById('hamburgerPopup').style.display = "none"; // Hide the popup menu
    document.body.style.overflow = 'initial'; // Enable scrolling on the main page
    var spans = document.getElementsByClassName("hamburgerSpan"); // Get all hamburger menu spans
    for (let i = 0; i < spans.length; i++) { spans[i].style.backgroundColor = 'black'; } // Reset span colors to black
}

// Function to open the login popup and close the hamburger menu
function loginPopupHamburgerVersion() {
    hamburgerCloseAtLoginPress(); // Close the hamburger menu
    loginPopup(); // Open the login popup
}