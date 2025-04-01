// Scrolls the window to the top with a smooth animation when the top button is clicked
function topButton() {
    window.scrollTo({top: 0, behavior: 'smooth'}); // Smoothly scroll to the top of the page
}

var isVisible = false; // Flag to track if the button is visible or not

// Checks the scroll position and shows/hides the "back to top" button
function scrollCheckTopButton() {
    var button = document.getElementById("topButton"); // Get the top button element
    
    if (window.scrollY > 250 && isVisible == false) { // When the page has been scrolled down enough and the button is not visible
        button.style.display = "block"; // Show the button
        button.style.transform = "opacity(1);"; // Set initial opacity for the animation
        
        for (let index = 0; index < 11; index++) { // Create a fade-in animation for the button
            setTimeout(function() {
                button.style.opacity = index * 0.1; // Gradually increase the opacity
            }, 40); // Delay between opacity changes
        }
        isVisible = true; // Update the visibility flag to true
    }
    else if (window.scrollY <= 250 && isVisible == true) { // When the page is scrolled back to the top and the button is visible
        button.style.transform = "opacity(0);"; // Set opacity to 0 for fade-out animation
        
        for (let index = 10; index >= 0; index--) { // Create a fade-out animation for the button
            setTimeout(function() {
                button.style.opacity = index * 0.1; // Gradually decrease the opacity
            }, 40); // Delay between opacity changes
        }
        
        setTimeout(function() { // Only hide the button after it has completely faded out
            button.style.display = "none"; // Hide the button
            isVisible = false; // Update the visibility flag to false
        }, 400); // Delay to match the duration of the fade-out animation
    }
}