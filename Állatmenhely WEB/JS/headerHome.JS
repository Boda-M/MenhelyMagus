// Variable to track if an animation is in progress
let isAnimating = false;

// Flags to ensure each animation is called only once at a time
let isMouseInCalled = false;
let isMouseOutCalled = false;

// Animates the "MM logo" when the mouse hovers over it. The animation transitions through 8 frames.
function homeMouseIn(imgElement, timeoutCall) {
    // Prevent multiple simultaneous calls to this animation
    if ((!isMouseInCalled && !isMouseOutCalled) || timeoutCall === true) {
        isMouseInCalled = true;

        // If an animation is already in progress, retry later
        if (isAnimating) {
            setTimeout(() => homeMouseIn(imgElement, true), 100);
            return;
        }

        isAnimating = true; // Mark the animation as in progress

        // Animate the logo by changing the source image through 8 frames
        for (let frameIndex = 1; frameIndex <= 8; frameIndex++) {
            (function(frame) {
                setTimeout(() => {
                    imgElement.src = `IMG/Header/logoAnimated/logo${frame}.png`; // Set the frame image

                    // If it's the last frame, mark the animation as complete
                    if (frame === 8) {
                        isAnimating = false;
                    }
                }, (frame - 1) * 100); // Delay each frame by 100ms
            })(frameIndex);
        }

        isMouseInCalled = false; // Reset the flag after setting up the animation
    }
}

// Animates the "MM logo" when the mouse leaves it. The animation transitions backward through 8 frames.
function homeMouseOut(imgElement, timeoutCall) {
    // Prevent multiple simultaneous calls to this animation
    if (!isMouseOutCalled || timeoutCall === true) {
        isMouseOutCalled = true;

        // If an animation is already in progress, retry later
        if (isAnimating) {
            setTimeout(() => homeMouseOut(imgElement, true), 100);
            return;
        }

        isAnimating = true; // Mark the animation as in progress

        // Animate the logo by changing the source image backward through 8 frames
        for (let frameIndex = 8; frameIndex >= 1; frameIndex--) {
            (function(frame) {
                setTimeout(() => {
                    imgElement.src = `IMG/Header/logoAnimated/logo${frame}.png`; // Set the frame image

                    // If it's the last frame, mark the animation as complete
                    if (frame === 1) {
                        isAnimating = false;
                    }
                }, (8 - frame) * 100); // Delay each frame by 100ms
            })(frameIndex);
        }

        isMouseOutCalled = false; // Reset the flag after setting up the animation
    }
}

// Sets up the header based on the user's login state. If logged out, it shows a login button. If logged in, it displays logout options and profile tools.
function setHeader() {
    // Check if the user is logged in by looking for a token in localStorage
    if (localStorage.getItem("token") === null) { // User is not logged in: Display a login button
        const loginLanguageDiv = document.getElementsByClassName('loginLanguageDiv')[0];
        const loginDiv = document.createElement('div');
        loginDiv.className = 'loginButtonDiv';
        loginDiv.innerHTML = `
            <div class="loginButtonDiv">
                <div class="loginButton fancyButton" onclick="loginPopup()" id="normalLoginButton">
                    Bejelentkezés
                </div>
            </div>`;
        loginLanguageDiv.appendChild(loginDiv);
    } else { // User is logged in: Display logout options and tools
        document.getElementById('hamburgerHeaderUserIconDiv').innerHTML += `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40.000000pt" height="40.000000pt" viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet" class="userProfileButton" onclick="userProfilePopup(); hamburgerCloseAtLoginPress()">
            <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path d="M2336 4989 c-254 -25 -503 -141 -695 -324 -111 -105 -191 -214 -257 -349 -217 -446 -133 -985 211 -1345 168 -177 354 -285 590 -343 115 -28 360 -35 481 -14 373 65 681 288 863 626 143 266 172 625 75 932 -116 366 -449 683 -824 782 -84 22 -280 48 -335 45 -11 -1 -60 -6 -109 -10z"/>
                <path d="M1317 2564 c-295 -53 -541 -258 -692 -576 -113 -240 -182 -543 -206 -913 -11 -181 -6 -318 17 -428 57 -275 243 -489 510 -586 159 -58 114 -56 1559 -56 1473 0 1385 -4 1564 65 240 93 420 299 481 550 63 262 14 811 -107 1179 -37 113 -144 327 -204 406 -177 234 -407 357 -694 372 -108 5 -111 5 -168 -26 -32 -16 -119 -70 -195 -119 -164 -107 -178 -114 -298 -158 -198 -71 -371 -90 -554 -59 -191 31 -325 88 -535 226 -195 128 -222 139 -320 138 -44 0 -115 -7 -158 -15z"/>
            </g>
        </svg>`;


        document.getElementById('hamburgerLoginButton').style.display = "none";
        document.getElementById('logoutButtonHamburger').style.display = "block";
        document.getElementById('logoutButtonHamburger').setAttribute('onclick', `logout(event, ${localStorage.getItem('tokenId')})`);

        document.getElementById('loginWindow').remove();
        document.getElementById('loginPopup').remove();

        const loginLanguageDiv = document.getElementsByClassName('loginLanguageDiv')[0];
        const loginDiv = document.createElement('div');
        loginDiv.className = 'loginButtonDiv';
        loginDiv.innerHTML = `<div class="loginButtonDiv">
                    <div class="loginButton fancyButton" id="logoutButton">
                        Kijelentkezés
                    </div>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40.000000pt" height="40.000000pt" viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet" class="userProfileButton">
                        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                            <path d="M2336 4989 c-254 -25 -503 -141 -695 -324 -111 -105 -191 -214 -257 -349 -217 -446 -133 -985 211 -1345 168 -177 354 -285 590 -343 115 -28 360 -35 481 -14 373 65 681 288 863 626 143 266 172 625 75 932 -116 366 -449 683 -824 782 -84 22 -280 48 -335 45 -11 -1 -60 -6 -109 -10z"/>
                            <path d="M1317 2564 c-295 -53 -541 -258 -692 -576 -113 -240 -182 -543 -206 -913 -11 -181 -6 -318 17 -428 57 -275 243 -489 510 -586 159 -58 114 -56 1559 -56 1473 0 1385 -4 1564 65 240 93 420 299 481 550 63 262 14 811 -107 1179 -37 113 -144 327 -204 406 -177 234 -407 357 -694 372 -108 5 -111 5 -168 -26 -32 -16 -119 -70 -195 -119 -164 -107 -178 -114 -298 -158 -198 -71 -371 -90 -554 -59 -191 31 -325 88 -535 226 -195 128 -222 139 -320 138 -44 0 -115 -7 -158 -15z"/>
                        </g>
                    </svg>
                </div>`;
        loginLanguageDiv.appendChild(loginDiv);

        // Set logout button functionality
        document.getElementById('logoutButton').setAttribute("onclick", `logout(event, ${localStorage.getItem('tokenId')})`);

        const currentFile = window.location.pathname.split('/').pop(); // Get the current file name

        setUserProfile(); // Call function to set up user profile data

        // Show admin or employee tools based on user type
        if (localStorage.getItem('userType') === "admin") {
            document.getElementById('sitePagesDiv').innerHTML += `
                <p ${currentFile === "adminTools.php" ? "class='headerTextUnderline'" : ""}>
                    <a href="adminTools.php" id="adminToolsTextNormal">Admin eszközök</a>
                </p>`;
            document.getElementById('PlaceForTools').innerHTML += `
                <h1 ${currentFile === "adminTools.php" ? "class='headerTextUnderline'" : ""}>
                    <a href="adminTools.php" id="adminToolsTextHamburger">Admin eszközök</a>
                </h1><br>`;
        } else if (localStorage.getItem('userType') === "employee") {
            document.getElementById('sitePagesDiv').innerHTML += `
                <p ${currentFile === "employeeTools.php" ? "class='headerTextUnderline'" : ""}>
                    <a href="employeeTools.php" id="employeeToolsTextNormal">Alkalmazott eszközök</a>
                </p>`;
            document.getElementById('PlaceForTools').innerHTML += `
                <h1 ${currentFile === "employeeTools.php" ? "class='headerTextUnderline'" : ""}>
                    <a href="employeeTools.php" id="employeeToolsTextHamburger">Alkalmazott eszközök</a>
                </h1><br>`;
        }
    }
}