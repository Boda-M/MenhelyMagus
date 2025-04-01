filters_paginator = null;
preferences_paginator = null;


// Gets the selected animals per page option from the dropdown
function getAnimalsPerPage() {
    return document.getElementById('animalsPerPageDropdown').value
}

// Paginates the animal list based on the page selected. Has an optional scroll behavior that scrolls to the top if true
function paginatorClicked(whichPage, scroll = true) {
    if (scroll) window.scrollTo({top: 0}); // Scroll to the top if needed
    setAnimals(whichPage, filters_paginator, preferences_paginator); // Update the displayed animals
    resizePaws(); // Resize paws
}

// Refreshes the paginator and resets the page to the first one
function resetPaginator() {
    const div = document.getElementById('paginatorContent');
    div.innerHTML = "";
    setAnimals(1, filters_paginator, preferences_paginator); // Reset to the first page
}

function updatePaginatorButtons(currentPage){
    let paginatorContent = document.getElementById('paginatorContent');
    paginatorContent.innerHTML = "";

    appendPaginatorArrow(paginatorContent, false);
    let skippedButtonLastTime = false;
    for(let i = 1; i <= pageCount; i++){
        if(distFromPointOfInterest(i, currentPage, pageCount) <= 1){
            let createdElement = appendPaginatorButton(paginatorContent, i);
            if(i == currentPage)createdElement.classList.add("paginatorButtonActive");
            skippedButtonLastTime = false;
        }
        else {
            if(!skippedButtonLastTime)appendPaginatorDots(paginatorContent);
            skippedButtonLastTime = true;
        } 
    }
    appendPaginatorArrow(paginatorContent, true);
}

function distFromPointOfInterest(page, currentPage, pageCount){
    return Math.min(Math.abs(page - 1), Math.abs(page - currentPage), Math.abs(page - pageCount));
}

function appendPaginatorArrow(paginatorContent, right = false){
    let createdArrow = document.createElement('div');
    createdArrow.classList.add(right?'paginatorRightArrow':'paginatorLeftArrow');
    createdArrow.setAttribute('onclick', right?"arrowClickPlus()":"arrowClickMinus()");
    createdArrow.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="10pt" height="15pt" viewBox="0 0 121.000000 180.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,180.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">` +
    (right?`<path d="M197 1786 c-92 -33 -164 -113 -188 -209 -28 -113 -4 -152 252 -412 119 -121 222 -230 228 -242 16 -31 13 -74 -7 -103 -9 -14 -100 -109 -202 -211 -120 -121 -195 -204 -214 -238 -72 -133 -27 -279 106 -345 72 -36 134 -35 215 4 55 25 109 75 413 376 193 191 364 368 380 392 33 51 37 88 15 136 -9 18 -183 199 -388 403 -337 335 -380 374 -456 416 -91 51 -98 53 -154 33z"/>`:`<path d="M855 1753 c-70 -40 -129 -94 -452 -416 -205 -204 -379 -385 -388 -403 -22 -48 -18 -85 15 -136 16 -24 187 -201 380 -392 304 -301 358 -351 413 -376 81 -39 143 -40 215 -4 133 66 178 212 106 345 -19 34 -94 117 -214 238 -102 102 -193 197 -202 211 -20 29 -23 72 -7 103 6 12 109 121 228 242 126 128 225 237 237 260 70 144 -48 349 -213 369 -32 4 -51 -2 -118 -41z"/>`) +
    `</g>
    </svg>`;
    paginatorContent.appendChild(createWrapper(createdArrow));
    return createdArrow;
}

function appendPaginatorDots(paginatorContent){
    let createdDots = document.createElement('div');
    createdDots.classList.add('paginatorButtonDots');
    createdDots.innerText = "...";
    paginatorContent.appendChild(createWrapper(createdDots));
    return createdDots;
}

function appendPaginatorButton(paginatorContent, page){
    let createdButton = document.createElement('div');
    createdButton.setAttribute('id', 'paginatorButton' + page);
    createdButton.classList.add('paginatorButton');
    createdButton.setAttribute('onclick', 'paginatorClicked(' + page + ', true)');
    createdButton.innerText = page;
    paginatorContent.appendChild(createWrapper(createdButton));
    return createdButton;
}

function createWrapper(element){
    let createdWrapper = document.createElement('div');
    createdWrapper.style = "display: inline-block;";
    createdWrapper.appendChild(element);
    return createdWrapper;
}
// Handles click on the next page arrow
function arrowClickPlus() {
    if(currentPage < pageCount)paginatorClicked(+currentPage + +1, true);
}

// Handles click on the previous page arrow
function arrowClickMinus() {
    if(currentPage > 1)paginatorClicked(currentPage - 1, true);
}