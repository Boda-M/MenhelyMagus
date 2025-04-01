<div class="userProfilePopup" id="userProfilePopup" onclick="userProfilePopupClose()"></div>

<div class="userProfileWindow" id="userProfileWindow">
    <img src="IMG/Header/logo.png" alt="MenhelyMágus logo">
    <div id="userProfileX" onclick="userProfilePopupClose()">
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
    </div>
    <div id="userProfileContent">
        <p class="userProfileText" id="profileTitle">Profiladatok</p>
            <div class="userDataAdmin" id = "userDataAdmin">
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="adminDataEmail" required>
                    <p>E-mail</p>
                </div>
                <div class="loginTextParent">
                    <input type="password" autocomplete="on" class="loginUserInput" id="adminDataPassword" required>
                    <p id="profileAdminPassword">Jelszó</p>
                    <img src="IMG/eyeClosed.png" alt="Closed eye icon" class="passwordIcon hidePass" onclick="showPassword(this, 'adminDataPassword');">
                </div>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="adminDataName" required>
                    <p id="profileAdminName">Név</p>
                </div>
            </div>
            <div class="userDataEmployee" id = "userDataEmployee">
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="employeeDataEmail" required>
                    <p>E-mail</p>
                </div>
                <div class="loginTextParent">
                    <input type="password" autocomplete="on" class="loginUserInput" id="employeeDataPassword" required>
                    <p id="profileEmployeePassword">Jelszó</p>
                    <img src="IMG/eyeClosed.png" alt="Closed eye icon" class="passwordIcon hidePass" onclick="showPassword(this, 'employeeDataPassword');">
                </div>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="employeeDataName" required>
                    <p id="profileEmployeeName">Név</p>
                </div>
            </div>
            <div class="userDataUser" id = "userDataUser">
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="userDataEmail" required>
                    <p>E-mail</p>
                </div>
                <div class="loginTextParent">
                    <input type="password" autocomplete="on" class="loginUserInput" id="userDataPassword" required>
                    <p id="profileUserPassword">Jelszó</p>
                    <img src="IMG/eyeClosed.png" alt="Closed eye icon" class="passwordIcon hidePass" onclick="showPassword(this, 'userDataPassword');">
                </div>
                <div class="loginTextParent loginTextParentName">
                    <input type="text" class="loginUserInput" id="userDataName" required>
                    <p id="profileUserName">Név</p>
                </div>
                <div class="loginTextParent loginTextParentTelephone">
                    <input type="number" class="loginUserInput" id="userDataTelephone" required oninput="limitTelephoneLength(this);">
                    <p id="profileUserTelephoneNumber">Telefonszám</p>
                </div>
                <br><br><br><br>
                <div class="loginTextParent loginTextParentCity">
                    <input type="text" class="loginUserInput" id="userDataCity" required>
                    <p id="profileUserCity">Város</p>
                </div>
                <div class="loginTextParent loginTextParentStreet">
                    <input type="text" class="loginUserInput" id="userDataStreet" required>
                    <p id="profileUserStreet">Utca</p>
                </div>
                <div class="loginTextParent loginTextParentHouseNumber">
                    <input type="text" class="loginUserInput" id="userDataHouse" required>
                    <p id="profileUserHouseNumber">Házszám</p>
                </div>
                <div class="registerCheckboxDiv">
                    <p class="checkboxText">
                    <input id="userDataPrefEmail" type="checkbox">
                    <label class="registerCheckbox" for="userDataPrefEmail"></label>
                    <span id="profileUserNotification">Szeretne E-mailt kapni, ha az ön preferenciáinak megfelelő állat kerül a menhelyre?</span>
                    </p>
                </div>
                <div class="select registerSelect">
                    <span id="profileUserHabitat">Mely élőhelyeket tudná biztosítani örökbefogadott állata számára?</span>
                    <div class="selectTitle placeholder" id="habitatUserData" data-enabled="true" data-type="habitat" data-show-type="shownumber" onclick="selectDropdown(this);">Élőhely</div>
                    <div class="selectContent">

                    </div>
                </div>
            </div>
            <div class="userProfileButtonsDiv">
                <button id="userProfileDeleteButton" class="fancyButtonV2">Fiók<br>törlése</button>
                <button id="userProfileModifyButton" class="fancyButtonV2">Módosítások mentése</button>
            </div>
    </div>
</div>