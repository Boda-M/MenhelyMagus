<br><br>

<div class="filterRow">
    <div class="filterAnimalsPerPageDropdown">
        <span id="filterAnimalsPerPageDropdownText1">Listázás:</span>
        <select name="animalsPerPageDropdown" id="animalsPerPageDropdown" onchange="resetPaginator()">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12" selected>12</option>
            <option value="20">20</option>
        </select>
        <span id="filterAnimalsPerPageDropdownText2">állat:</span>
    </div>
    
    <div class="filterDiv" id="filter">
        <div class="filterHeader" onclick="toggleFilter()">
            <span id="filterFilterText">Szűrő</span>
        <svg stroke="#FFFFFF" stroke-width="30" viewBox="0 0 511.787 511.787" class="filterToggleIcon">
            <g><path d="M508.667,125.707c-4.16-4.16-10.88-4.16-15.04,0L255.76,363.573L18,125.707c-4.267-4.053-10.987-3.947-15.04,0.213
            c-3.947,4.16-3.947,10.667,0,14.827L248.293,386.08c4.16,4.16,10.88,4.16,15.04,0l245.333-245.333
            C512.827,136.693,512.827,129.867,508.667,125.707z"/></g>
        </svg>
        </div>

        <div class="filterContent" id="filterOverflow">
            <div class="filter">
                <div class="filterName" id="filterGender">Nem</div>
                <div class="filterRight">
                    <img src="IMG/bothgender.png" alt="Both gender icon" class="filterGenderBoth selectedGender" id="filterGenderBoth" onclick="filterSelect('Gender', 'Both', 'Male', 'Female'); filterChanged()">
                    <img src="IMG/male.png" alt="Male icon" class="filterGenderMale" id="filterGenderMale" onclick="filterSelect('Gender', 'Male', 'Both', 'Female'); filterChanged()">
                    <img src="IMG/female.png" alt="Female icon" class="filterGenderFemale" id="filterGenderFemale" onclick="filterSelect('Gender', 'Female', 'Male', 'Both'); filterChanged()">
                </div>
            </div>

            <div class="filter">
                <div class="filterName" id="filterNeutered">Ivartalanított</div>
                <div class="filterRight">
                    <img src="IMG/xAndCheck.png" alt="x and check icon" class="filterNeuterBoth selectedNeuter" id="filterNeuterBoth" onclick="filterSelect('Neuter', 'Both', 'Yes', 'No'); filterChanged()">
                    <img src="IMG/check.png" alt="check icon" class="filterNeuterYes" id="filterNeuterYes" onclick="filterSelect('Neuter', 'Yes', 'Both', 'No'); filterChanged()">
                    <img src="IMG/x.png" alt="x icon" class="filterNeuterNo" id="filterNeuterNo" onclick="filterSelect('Neuter', 'No', 'Yes', 'Both'); filterChanged()">
                </div>
            </div>

            <div class="filter">
                <div class="filterName" id="filterHouseBroken">Szobatiszta</div>
                <div class="filterRight">
                    <img src="IMG/xAndCheck.png" alt="x and check icon" class="filterHouseBrokenBoth selectedHouseBroken" id="filterHouseBrokenBoth" onclick="filterSelect('HouseBroken', 'Both', 'Yes', 'No'); filterChanged()">
                    <img src="IMG/check.png" alt="check icon" class="filterHouseBrokenYes" id="filterHouseBrokenYes" onclick="filterSelect('HouseBroken', 'Yes', 'Both', 'No'); filterChanged()">
                    <img src="IMG/x.png" alt="x icon" class="filterHouseBrokenNo" id="filterHouseBrokenNo" onclick="filterSelect('HouseBroken', 'No', 'Yes', 'Both'); filterChanged()">
                </div>
            </div>

            <div class="filter">
                <div class="filterName" id="filterFavourite">Kedvenc-e</div>
                <div class="filterRight animate">
                    <p class="checkboxAnimalText">
                        <input id="filterCheckboxFavourite" type="checkbox" oninput="filterChanged()">
                        <label class="checkboxAnimal" for="filterCheckboxFavourite"></label>
                    </p>
                </div>
            </div>

            <div class="filter">
                <div class="filterName" id="filterSpecies">Faj</div>
                <div class="filterRight select" id="speciesSelect">
                    <div class="selectTitle placeholder" id="species" data-enabled="true" data-type="species" data-select-type="single" data-show-type="showselected" onclick="selectDropdown(this);">
                        Faj
                    </div>
                    <div class="selectContent">

                    </div>
                </div>
            </div>

            <div class="filter">
                <div class="filterName filterNameOverflow" id="filterBreed">Fajta</div>
                <div class="filterRight select" id="breedSelect">
                    <div class="selectTitle placeholder" id="breed" data-enabled="false" data-type="breed" data-show-type="shownumber" onclick="selectDropdown(this);">
                        Fajta
                    </div>
                    <div class="selectContent">
                        
                    </div>
                </div>
            </div>

            <div class="filter">
                <div class="filterName filterNameOverflow" id="filterShelterLocation">Menhely</div>
                <div class="filterRight select" id="locationSelect">
                    <div class="selectTitle placeholder" id="location" data-enabled="true" data-type="location" data-show-type="shownumber" onclick="selectDropdown(this);">
                        Helyszín
                    </div>
                    <div class="selectContent">

                    </div>
                </div>
            </div>

            <div class="filter">
                <div class="filterName filterNameOverflow" id="filterAnimalHabitat">Állat élőhelye</div>
                <div class="filterRight select" id="habitatSelect">
                    <div class="selectTitle placeholder" id="habitatFilter" data-enabled="true" data-type="habitat" data-show-type="shownumber" onclick="selectDropdown(this);">
                        Élőhely
                    </div>
                    <div class="selectContent">

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="filterDiv" id="preferences">
        <div class="filterHeader" onclick="togglePreferences()">
            <span id="preferencesText">Preferenciák</span>
        <svg stroke="#FFFFFF" stroke-width="30" viewBox="0 0 511.787 511.787" class="filterToggleIcon">
            <g><path d="M508.667,125.707c-4.16-4.16-10.88-4.16-15.04,0L255.76,363.573L18,125.707c-4.267-4.053-10.987-3.947-15.04,0.213
            c-3.947,4.16-3.947,10.667,0,14.827L248.293,386.08c4.16,4.16,10.88,4.16,15.04,0l245.333-245.333
            C512.827,136.693,512.827,129.867,508.667,125.707z"/></g>
        </svg>
        </div>

        <div class="filterContent scroll">
            <div class="sliders sliderTexts">
                <div class="sliderTextValue" id="preferencesValueText">Érték</div>
                <div class="sliderTextWeight" id="preferencesWeightText">Súly</div>
            </div>
        <div class="sliders">
            <div class="sliderDiv sliderdivmargin">
                <p id="preferencesAge">Életkor</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="15" min="0" max="30" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="age">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="ageWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="sliderDiv">
                <p id="preferenceWeight">Tömeg</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="250" min="0" max="500" step="2" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="weight">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span class="smallerFont"></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="weightWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="sliderDiv">
                <p id="preferenceCuteness">Cukiság</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="5" min="0" max="10" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="cuteness">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="cutenessWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="sliderDiv">
                <p id="preferencechildFriendlyness">Gyerekbarát</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="5" min="0" max="10" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="childFriendlyness">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="childFriendlynessWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="sliderDiv">
                <p id="preferenceSociability">Társaslény</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="5" min="0" max="10" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="sociability">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="sociabilityWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="sliderDiv">
                <p id="preferenceexerciseNeed">Mozgásigény</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="5" min="0" max="10" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="exerciseNeed">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="exerciseNeedWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="sliderDiv">
                <p id="preferencefurLength">Szőrhossz</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="5" min="0" max="10" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="furLength">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="furLengthWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="sliderDiv">
                <p id="preferenceDocility">Tanulékonyság</p>
                <div class="sliderContainerDiv">
                    <input type="range" value="5" min="0" max="10" oninput="filterChanged(); preferenceChanged()" class="preferenceslider" id="docility">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderContainerDiv sliderContainerDiv2">
                    <input type="range" value="0" min="0" max="10" class="rangeWeight weightslider preferenceslider" id="docilityWeight" oninput="filterChanged(); preferenceChanged()">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="filterSearchByName">
        <input type="text" placeholder="Keresés név alapján..." id="searchByName" oninput="filterChanged();">
    </div>
    
</div>

<div class="filterButtonRow" id="filterButtonRow">
    <div class="fancyButton filterButton" id="filterButton" onclick="refreshResults()">
        Szűrés!
    </div>
</div>