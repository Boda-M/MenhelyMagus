// Function to select a dropdown element
function selectDropdown(element) {
    // Check if the dropdown is enabled
    if (element.getAttribute('data-enabled') == "true") {
        // Get the next sibling element (the dropdown options)
        var selectContent = element.nextElementSibling;
        var computedStyle = window.getComputedStyle(selectContent);

        // If the dropdown content is hidden, show it
        if (selectContent && selectContent.classList.contains('selectContent') && computedStyle.display == "none") {
            // Hide all dropdowns
            const elements = document.getElementsByClassName('selectContent');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            }
            // Show the selected dropdown content
            selectContent.style.display = 'block';
        } else {
            // If it's already visible, hide it
            selectContent.style.display = 'none';
        }

        // Get the bounding box of the dropdown
        let rect = selectContent.getBoundingClientRect();
        let viewportWidth = document.documentElement.clientWidth;

        // Check if dropdown is overflowing
        if (rect.right > viewportWidth) selectContent.style.marginLeft = -(selectContent.offsetWidth - 90) + "px";
        else  selectContent.style.marginLeft = "0px";
    }
}

// Event listener to close dropdowns when clicking outside
window.addEventListener('click', function(e) {
    var clickedOutside = true;

    // Check if the click was inside any dropdown content or its title
    for (let i = 0; i < this.document.getElementsByClassName('selectContent').length; i++) {
        if (document.getElementsByClassName('selectContent')[i].contains(e.target) || document.getElementsByClassName('selectTitle')[i].contains(e.target)) clickedOutside = false;
    }
    
    // If the click was outside, close all dropdowns
    if (clickedOutside) {
        const elements = document.getElementsByClassName('selectContent');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
            elements[i].style.marginLeft = "0px";
        }
    }

    // If the clicked element is disabled, hide all dropdowns
    if (e.target.getAttribute('data-enabled') == "false") {
        const elements = document.getElementsByClassName('selectContent');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }
});

// Function to set up event listeners on each option div
function setOptionDivs() {
    var optionDivs = document.querySelectorAll('.optionDiv');
    optionDivs.forEach(function(optionDiv) {
        // If a click event hasn't been added yet, add it
        if (optionDiv.hasAttribute('data-click-added') == false) {
            optionDiv.setAttribute('data-click-added', true);
            optionDiv.addEventListener('click', () => optionDivOnclick(optionDiv));
        }
    });
}


function optionDivOnclick(optionDiv) 
{
    let selectContent = optionDiv.parentElement;//The list containing all the optionDivs
    let selectRoot = selectContent.parentElement;//The always visible rect, the root of it all
    let checkbox = optionDiv.querySelector('input[type="checkbox"]');//The checkbox associated with the optionDiv
    let title = selectRoot.querySelector('.selectTitle');

    let isSingleSelect = title.hasAttribute(`data-select-type`) && title.getAttribute("data-select-type") == "single";
    let dataShowType = title.getAttribute('data-show-type');
    let dataType = title.getAttribute('data-type');

    // Toggle checkbox state
    checkbox.checked = !checkbox.checked;
    if(checkbox.checked){
        checkbox.setAttribute("data-checked", true);
    }else{
        checkbox.removeAttribute('data-checked');
    }

    // If it's a single selection dropdown, uncheck other checkboxes
    if (isSingleSelect) {
        var checkboxes = selectContent.querySelectorAll('.select input[type="checkbox"]');
        checkboxes.forEach(function(cb) 
        {
            if (cb !== checkbox){
                cb.checked = false;
                cb.removeAttribute('data-checked');
            }
        });
    }


    //Special handling of species and its dependent fields
    if (dataType == "species") {
        if(document.getElementById('breed')){
            document.getElementById('breed').innerText = pickTranslation("Fajta", "Breed", "Rasse");
            document.getElementById('breed').style.color = "#65727e";
        }
        
        if (document.getElementById('vaccine')) {
            document.getElementById('vaccine').innerText = pickTranslation("Oltás", "Vaccine", "Impfung");
            document.getElementById('vaccine').style.color = "#65727e";
            document.getElementById('vaccine').nextElementSibling.innerHTML = "";
        }

        if (checkbox.checked == false) {
            document.getElementById("breed").setAttribute('data-enabled', 'false');
        }
    }

    if (checkbox.checked == true) {
        // Update the title of the select element based on the selection
        title.style.color = "black";
        if (dataShowType == "showselected") {
            title.innerHTML = checkbox.parentElement.querySelector('span').innerHTML;
        }else if (dataShowType == "showcity"){
            title.innerHTML = extractTextBetweenLastBrackets(checkbox.parentElement.querySelector('span').innerHTML);
        }else {
            //shownumber
            checkbox.setAttribute("data-checked", true);
        }
    }

    if(isSingleSelect && !checkbox.checked) {
        title.style.color = "#65727e";//Gray
        if (dataType == "species") {
            countHowManySelected(optionDiv, title, pickTranslation("Faj", "Species", "Art"));
        } else if (dataType == "location") {
            countHowManySelected(optionDiv, title, pickTranslation("Helyszín", "Location", "Ort"));
        }
    }

    if (dataShowType == "shownumber") {
        title.style.color = "black";
        if (dataType == "breed") {
            countHowManySelected(optionDiv, title, pickTranslation("Fajta", "Breed", "Rasse"), pickTranslation("Fajta", "Breeds", "Rassen"));
        } else if (dataType == "location") {
            countHowManySelected(optionDiv, title, pickTranslation("Helyszín", "Location", "Ort"), pickTranslation("Helyszín", "Locations", "Orte"));
        } else if (dataType == "habitat") {
            countHowManySelected(optionDiv, title, pickTranslation("Élőhely", "Habitat", "Lebensraum"), pickTranslation("Élőhely", "Habitats", "Lebensräume"));
        } else if (dataType == "vaccine") {
            countHowManySelected(optionDiv, title, pickTranslation("Oltás", "Vaccine", "Impfung"), pickTranslation("Oltás", "Vaccines", "Impfungen"));
        }
    }

    if (dataType == "species" && checkbox.checked == true) {
        document.getElementById("breed").setAttribute('data-enabled', 'true');
        setBreed();
        setVaccine();
    }
}

function innerHTMLIncludesText(element, hungarian, english, deutsch){
    return element.innerHTML.includes(hungarian) || element.innerHTML.includes(english) || element.innerHTML.includes(deutsch)
}

// Function to count the number of selected options and update the select title
function countHowManySelected(div, title, type, pluralType = null) {
    if(pluralType == null)pluralType = type;
    var count = countOccurrences(div.parentElement.innerHTML, 'data-checked');
    title.innerText = count + " " + (count <= 1 ? type : pluralType);
    if (count == 0) {
        title.style.color = "#65727e";
        title.innerHTML = String(type).charAt(0).toUpperCase() + String(type).slice(1);//Default title
    }
}

// Function to extract text between the last set of parentheses in a string
function extractTextBetweenLastBrackets(input) {
    const parts = input.split('('); // Split the input string by the opening parenthesis '('
    if (parts.length < 2) return ""; // If there are no parentheses, return an empty string
    
    const lastPart = parts[parts.length - 1]; // Get the last part after the last '('
    return lastPart.split(')')[0]; // Return the substring between the last '(' and ')'
}

// Function to count occurrences of a substring (searchString) in the main string (mainString)
function countOccurrences(mainString, searchString) {
    if (!searchString) return 0; // If no search string is provided, return 0

    let count = 0;  // Initialize count of occurrences
    let position = mainString.indexOf(searchString);  // Find the first occurrence of the search string

    // Loop through the string to find all occurrences
    while (position !== -1) {
        count++;  // Increment count for each found occurrence
        position = mainString.indexOf(searchString, position + searchString.length);  // Find the next occurrence after the current one
    }

    // Return the total count of occurrences
    return count;
}

// Function to hide all the selectContent elements on resize
function closeSelectOnResize() {
    // Get all elements with the class 'selectContent'
    const elements = document.getElementsByClassName('selectContent');
    
    // Loop through each element and hide it
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}