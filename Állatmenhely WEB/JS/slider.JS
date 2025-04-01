// Updates the position of the slider's rangeInfo based on its value and updates slider-fill
function sliderMove(slider) {
    var rangeInfoSpan = slider.parentNode.querySelector('.rangeInfo span'); // Get the rangeInfo span
    const rangePercent = (slider.value / slider.max) * 100; // Calculate percentage of the slider's value
    var parent = slider.offsetParent;
    var sliderRect = slider.getBoundingClientRect(); // Get slider's bounding box
    var parentRect = parent.getBoundingClientRect(); // Get parent element's bounding box
    var left = sliderRect.left - parentRect.left; // Calculate the left position of the slider within its parent
    var value = (0.3 * rangePercent); // Adjust the rangeInfo's position based on slider value
    left = left - value + ( (slider.offsetWidth / 100) * ((rangePercent / (100))*100)); // Set final position
    slider.parentNode.querySelector('.rangeInfo').style.left = `${left}px`; // Apply the position to the rangeInfo

    // Update rangeInfo content based on slider ID
    if(slider.id === "weight"){
        rangeInfoSpan.textContent = getWeight(slider); // Custom calculation for weight slider
    } else  rangeInfoSpan.textContent = (slider.value / slider.max) * (slider.max); // Default slider value

    slider.style.setProperty('--slider-fill', `${rangePercent}%`); // Update slider fill color
}

// Custom function to calculate weight value for the 'weight' slider
function getWeight(slider){
    var sliderProgress = (slider.value / (1.0 * slider.max)); // Get percentage of the slider value
    sliderProgress = sliderProgress * sliderProgress * sliderProgress; // Cube the progress value
    let weight = sliderProgress * slider.max + 0.1; // Calculate weight
    if(weight < 10) weight = (Math.round(weight * 10))/10; // Round to 1 decimal if weight is less than 10
    else weight = (Math.round(weight)); // Round to integer if weight is 10 or more
    return weight;
}

// Hides the rangeInfo when interaction with the slider ends
function rangeInfoClose(slider) {
    const rangeInfo = slider.parentNode.querySelector('.rangeInfo'); // Get the rangeInfo element
    rangeInfo.style.display = 'none'; // Hide the rangeInfo
}

// Initialize slider event listeners after the document content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('input[type="range"]'); // Get all range sliders
    sliders.forEach(slider => {
        sliderMove(slider); // Initialize position and value of the rangeInfo and set slider fill
        if (slider.disabled == false) { // If the slider is not disabled
            slider.addEventListener('input', () => sliderMove(slider)); // Update on input (slider drag)
            slider.addEventListener('mousedown', () => // Show rangeInfo on mouse down
                { 
                const rangeInfo = slider.parentNode.querySelector('.rangeInfo');
                rangeInfo.style.display = 'flex';
                sliderMove(slider);
            });
            slider.addEventListener('mouseup', () => // Hide rangeInfo on mouse up
                { 
                const rangeInfo = slider.parentNode.querySelector('.rangeInfo');
                rangeInfo.style.display = 'none';
            });
            
            slider.addEventListener('touchstart', () => // Show rangeInfo on touch start
                {
                const rangeInfo = slider.parentNode.querySelector('.rangeInfo');
                rangeInfo.style.display = 'flex';
                sliderMove(slider);
            });

            slider.addEventListener('touchend', () => // Hide rangeInfo on touch end
                {
                rangeInfoClose(slider);
            });
        } else { // If the slider is disabled, only initialize and show rangeInfo without interaction
            sliderMove(slider);
            slider.addEventListener('mousedown', () => // Show rangeInfo on mouse down
                { 
                const rangeInfo = slider.parentNode.querySelector('.rangeInfo');
                rangeInfo.style.display = 'flex';
            });
            slider.addEventListener('mouseup', () => // Hide rangeInfo on mouse up
                { 
                const rangeInfo = slider.parentNode.querySelector('.rangeInfo');
                rangeInfo.style.display = 'none';
            });
            
            slider.addEventListener('touchstart', () => // Show rangeInfo on touch start
                {
                const rangeInfo = slider.parentNode.querySelector('.rangeInfo');
                rangeInfo.style.display = 'flex';
            });

            slider.addEventListener('touchend', () => // Hide rangeInfo on touch end
                {
                rangeInfoClose(slider);
            });
        }
    });
});