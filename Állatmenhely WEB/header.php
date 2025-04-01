<header class="normalHeader">
        <div>
            <div class="sitePagesDiv" id="sitePagesDiv">
                <img src="IMG/Header/logo.png" alt="MenhelyMágus logo" onmouseover="homeMouseIn(this,false)" onmouseout="homeMouseOut(this,false)" class="headerHomeButton" >
                <p <?php $currentFile = basename($_SERVER['PHP_SELF']); if ($currentFile == "main.php") { echo "class='headerTextUnderline'"; } ?>>
                    <a href="main.php" id="mainPageTextNormal">Főoldal</a>
                </p>
                <p <?php $currentFile = basename($_SERVER['PHP_SELF']); if ($currentFile == "animals.php") { echo "class='headerTextUnderline'"; } ?>>
                    <a href="animals.php" id="animalsTextNormal">Állatok</a>
                </p>
            </div>
            <div class="loginLanguageDiv">
                <span class="languageSelector">
                    <span class="dropdown">
                        <img src="IMG/Header/hu_HU.png" alt="Selected language icon" id="SelectedLanguageIcon">
                        <span id="selectedLanguageText">Magyar</span>
                        <span class="languageSelectorArrowIcon"><svg width="8" height="8" viewBox="0 0 15 15"><path d="M2.1,3.2l5.4,5.4l5.4-5.4L15,4.3l-7.5,7.5L0,4.3L2.1,3.2z"></path></svg></span>
                        <span class="dropdownContent">
                            <a onclick="unsetLanguage()"><img src="IMG/Header/hu_HU.png" alt="Hungarian flag">Magyar</a>
                            <a onclick="setToEnglish()"><img src="IMG/Header/en_EN.png" alt="English flag">English</a>
                            <a onclick="setToDeutsch()"><img src="IMG/Header/de_DE.png" alt="German flag">Deutsch</a>
                        </span>
                    </span>
                </span>
                <div id="darkModeDiv" onclick="darkModeToggle()">
                    <div class="moon" id="MoonSun">
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="loginPopup" id="loginPopup" onclick="loginPopupClose()"></div>

    <div class="loginWindow" id="loginWindow">
        <img src="IMG/Header/logo.png" alt="MenhelyMágus logo">
        <div id="loginX" onclick="loginPopupClose()">
            <span  class="hamburgerSpan"></span>
            <span  class="hamburgerSpan"></span>
            <span  class="hamburgerSpan"></span>
            <span  class="hamburgerSpan"></span>
        </div>
        <div id="loginContent">
            <p class="loginText" id="loginWindowLoginText">Bejelentkezés</p>
            <form>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="loginInput1" required oninput="loginInputCheck()">
                    <p>E-mail</p>
                </div>
                <div class="loginTextParent">
                    <input type="password" autocomplete="on" class="loginUserInput" id="loginInput2" required oninput="loginInputCheck()">
                    <p id="loginWindowPasswordText">Jelszó</p>
                    <img src="IMG/eyeClosed.png" alt="Closed eye icon" class="passwordIcon hidePass" onclick="showPassword(this, 'loginInput2');">
                </div>
                <button disabled="disabled" id="loginButton" class="fancyButtonV2" onclick="login(event)">Bejelentkezés</button>
                <p class="loginNoAccount" id="loginWindowNoAccountText">Nincs még fiókja? <a class="loginCreateOne" onclick="switchToRegister()">Regisztráljon!</a></p>
            </form>
        </div>
        <div id="registerContent">
            <p class="loginText" id="registerWindowRegisterText">Regisztráció</p>
            <form>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="registerInput1" required oninput="registerInputCheck()">
                    <p>E-mail</p>
                </div>
                <div class="loginTextParent">
                    <input type="password" autocomplete="on" class="loginUserInput" id="registerInput2" required oninput="registerInputCheck()">
                    <p id="registerWindowPasswordText">Jelszó</p>
                    <img src="IMG/eyeClosed.png" alt="Closed eye icon" class="passwordIcon hidePass" onclick="showPassword(this, 'registerInput2');">
                </div>
                <div class="loginTextParent loginTextParentName">
                    <input type="text" class="loginUserInput" id="registerInput3" required oninput="registerInputCheck()">
                    <p id="registerWindowNameText">Név</p>
                </div>
                <div class="loginTextParent loginTextParentTelephone">
                    <input type="number" class="loginUserInput" id="registerInput4" required oninput="registerInputCheck(); limitTelephoneLength(this)">
                    <p id="registerWindowPhoneNumberText">Telefonszám</p>
                </div>
                <br><br><br><br>
                <div class="loginTextParent loginTextParentCity">
                    <input type="text" class="loginUserInput" id="registerInput5" required oninput="registerInputCheck()">
                    <p id="registerWindowCityText">Város</p>
                </div>
                <div class="loginTextParent loginTextParentStreet">
                    <input type="text" class="loginUserInput" id="registerInput6" required oninput="registerInputCheck()">
                    <p id="registerWindowStreetText">Utca</p>
                </div>
                <div class="loginTextParent loginTextParentHouseNumber">
                    <input type="text" class="loginUserInput" id="registerInput7" required oninput="registerInputCheck()">
                    <p id="registerWindowHouseNumberText">Házszám</p>
                </div>
                <div class="registerCheckboxDiv">
                    <p class="checkboxText">
                    <input id="RegisterCBid" type="checkbox">
                    <label class="registerCheckbox" for="RegisterCBid"></label>
                    <span id="registerWindowNotificationText">Szeretne E-mailt kapni, ha az ön preferenciáinak megfelelő állat kerül a menhelyre?</span>
                    </p>
                </div>
                <div class="select registerSelect">
                    <span id="registerWindowHabitatText">Mely élőhelyeket tudná biztosítani örökbefogadott állata számára?</span>
                    <div class="selectTitle placeholder" id="habitatRegister" data-enabled="true" data-type="habitat" data-show-type="shownumber" onclick="selectDropdown(this);">Élőhely</div>
                    <div class="selectContent">

                    </div>
                </div>
                <button disabled="disabled" id="registerButton" class="fancyButtonV2" onclick="register(event)">Regisztráció</button>
                <p class="registerAlreadyHasAnAccount" id="registerAlreadyHasAnAccount">Van már fiókja? <a class="loginCreateOne" onclick="switchToLogin()">Jelentkezzen be!</a></p>
            </form>
        </div>
    </div>

    <div class="gapFiller"></div>

    <header class="hamburgerHeader">
        <img src="IMG/Header/logo.png" alt="MenhelyMágus logo" onmouseover="homeMouseIn(this,false)" onmouseout="homeMouseOut(this,false)"  class="headerHomeButton" >
        
        
    </header>
    <div id="hamburgerIcon" onclick="hamburgerOpen()">
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
    </div>

    <div id="hamburgerPopup">
        <h1 id="hamburgerPopupFirst" <?php $currentFile = basename($_SERVER['PHP_SELF']); if ($currentFile == "main.php") { echo "class='headerTextUnderline'"; } ?>><a href="main.php" id="mainPageTextHamburger">Főoldal</a></h1><br>
        <h1 <?php $currentFile = basename($_SERVER['PHP_SELF']); if ($currentFile == "animals.php") { echo "class='headerTextUnderline'"; } ?>><a href="animals.php" id="animalsTextHamburger">Állatok</a></h1><br>
        <span id="PlaceForTools">
        </span>
        <div class="zaszlok">
            <img src="IMG/Header/hu_HU.png" alt="Hungarian flag" onclick="unsetLanguage()">
            <img src="IMG/Header/en_EN.png" alt="English flag" onclick="setToEnglish()">
            <img src="IMG/Header/de_DE.png" alt="German flag" onclick="setToDeutsch()">
        </div>
        <div id="darkModeDivHamburger" onclick="darkModeToggle()">
            <div class="moon" id="MoonSunHamburger">
            </div>
        </div>
        <div id="hamburgerHeaderUserIconDiv">

        </div>
        <div class="loginButtonDiv">
            <div class="loginButton fancyButton" onclick="loginPopupHamburgerVersion()" id="hamburgerLoginButton">
                Bejelentkezés
            </div>
            <div class="loginButton fancyButton" id="logoutButtonHamburger">
                Kijelentkezés
            </div>
        </div>
    </div>