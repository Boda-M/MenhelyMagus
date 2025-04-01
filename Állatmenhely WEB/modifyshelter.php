<div class="modifyShelterPopup" id="modifyShelterPopup" onclick="modifyShelterPopupClose()"></div>

<div class="modifyShelterWindow" id="modifyShelterWindow">
    <img src="IMG/Header/logo.png" alt="MenhelyMágus logo">
    <div id="modifyShelterX" onclick="modifyShelterPopupClose()">
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
        <span  class="hamburgerSpan"></span>
    </div>
    <div id="modifyShelterContent">
        <p class="modifyShelterText" id="modifyShelterTitle">Menhelyadatok</p>
            <div class="modifyShelter" id = "modifyShelter">
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="modifyShelterName" required>
                    <p id="modifyShelterNameP">Név</p>
                </div>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="modifyShelterEmail" required>
                    <p>E-mail</p>
                </div>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="modifyShelterCity" required>
                    <p id="modifyShelterCityP">Város</p>
                </div>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="modifyShelterStreet" required>
                    <p id="modifyShelterStreetP">Utca</p>
                </div>
                <div class="loginTextParent">
                    <input type="text" class="loginUserInput" id="modifyShelterHouseNumber" required>
                    <p id="modifyShelterHouseNumberP">Házszám</p>
                </div>
                <div class="loginTextParent">
                    <input type="number" class="loginUserInput" id="modifyShelterTelephone" required oninput="limitTelephoneLength(this)">
                    <p id="modifyShelterTelephoneP">Telefonszám</p>
                </div>
            </div>
            <div class="modifyShelterButtonsDiv" id="modifyShelterButtonsDiv">
                <button id="discardShelterModificationsButton" class="fancyButtonV2" onclick="modifyShelterPopupClose()">Módosítások elvetése</button>
                <button id="modifyShelterButton" class="fancyButtonV2">Módosítások mentése</button>
            </div>
            <div class="modifyShelterButtonsDiv" id="modifyShelterButtonsDiv2">
                <button class="fancyButtonV2" id="discardNewShelterButton" onclick="modifyShelterPopupClose();">Hozzáadás elvetése</button>
                <button class="fancyButtonV2" id="addShelterButton" onclick="addNewShelter();">Új menhely hozzáadása</button>
            </div>
    </div>
</div>