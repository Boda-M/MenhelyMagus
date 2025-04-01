// Function that places paws in the background
function placePaws() {
    let widthDivider = 1;

    // Adjust the widthDivider based on window size
    if (window.innerWidth > 1400) widthDivider = 1.75;
    else if (window.innerWidth > 800) widthDivider = 1.25;

    let pageHeight = document.documentElement.scrollHeight; // Full page height
    let numberOfPaws = Math.floor(pageHeight / (window.innerWidth / widthDivider)); // Calculate the number of paws

    for (let i = 0; i < numberOfPaws; i++) {
        const paw = document.createElement("img"); // Create a new paw element
        paw.style.position = "absolute";
        paw.src = i % 2 === 0 ? "IMG/pawsRight.png" : "IMG/pawsLeft.png"; // Alternate left and right paw images
        paw.style[i % 2 === 0 ? "right" : "left"] = "0";
        paw.classList.add(i % 2 === 0 ? "rightPaw" : "leftPaw")
        paw.alt = "Paw background";

        // Calculate vertical placement
        paw.style.top = (i * (window.innerWidth / widthDivider) + (window.innerWidth / 4)) + "px";

        // Adjust width based on screen size
        let widthCalc = window.innerWidth * (500 / 1920);
        if (window.innerWidth < 1300 && window.innerWidth > 800) widthCalc *= 1.5;
        else if (window.innerWidth < 800) widthCalc *= 2;

        paw.style.width = widthCalc + "px";
        paw.style.zIndex = -1; // Ensure it's behind other content
        paw.classList.add("paw"); // Add a class for easy identification
        document.body.appendChild(paw); // Append to body
    }
}

// Function to resize the paws on resize
function resizePaws() {
    const paws = document.getElementsByClassName("paw");
    while (paws.length > 0) {
        paws[0].parentNode.removeChild(paws[0]); // Remove all existing paws
    }
    placePaws(); // Recalculate and place new paws
}