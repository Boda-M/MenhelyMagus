<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MenhelyMágus</title>
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/select.css">
    <link rel="stylesheet" href="CSS/headerStyle.css">
    <link rel="stylesheet" href="CSS/footerStyle.css">
    <link rel="stylesheet" href="CSS/loginRegisterStyle.css">
    <link rel="stylesheet" href="CSS/delete.css">
    <link rel="stylesheet" href="CSS/userProfile.css">
    <link rel="stylesheet" href="CSS/adminTools.css">
    <link rel="stylesheet" href="CSS/popupMessage.css">
    <link rel="icon" type="image/x-icon" href="IMG/Header/logo.png">
    <script src="JS/hamburgerMenu.JS"></script>
    <script src="JS/headerHome.JS"></script>
    <script src="JS/topButton.JS"></script>
    <script src="JS/backgroundPlacer.JS"></script>
    <script src="JS/loginRegister.JS"></script>
    <script src="JS/animalAttributeSizer.JS"></script>
    <script src="JS/paginator.JS"></script>
    <script src="JS/delete.JS"></script>
    <script src="JS/select.JS"></script>
    <script src="JS/getData.JS"></script>
    <script src="JS/setData.JS"></script>
    <script src="JS/userProfile.JS"></script>
    <script src="JS/translate.JS"></script>
    <script src="JS/popupMessage.JS"></script>
    <script src="JS/darkModeToggle.JS"></script>
</head>
<body onresize="sizeCheck(); resizePaws(); resizeOnWidthChange();closeSelectOnResize()" onscroll="scrollCheckTopButton()" onload="placePaws(); setHeader(); setRegisterHabitat(); privilegeChecker(); setUserDataHabitat(); translate()">
    
<?php
    include('header.php');
    include('misc.php');
    include('delete.php');
    include('userProfile.php');
    include('popupMessage.php');
?>

<div class="toolCardWrapper">
    <div class="toolCard toolCard1" onclick="window.location.href='manageEmployees.php'">
        <h2 id="cardManageEmployee">Alkalmazottak kezelése</h2>
    </div>
    <div class="toolCard toolCard2" onclick="window.location.href='manageUsers.php'">
        <h2 id="cardManageUsers">Felhasználók kezelése</h2>
    </div>
    <div class="toolCard toolCard3" onclick="window.location.href='manageShelters.php'">
        <h2 id="cardManageShelters">Menhelyek kezelése</h2>
    </div>
</div>

<script>
    const toolCards = document.querySelectorAll('.toolCard');
    toolCards.forEach(toolCard => {
        toolCard.addEventListener('mouseover', () => {
            toolCard.style.animation = 'scaleRotate 1s ease-out forwards, pulse 1.5s infinite ease-in-out';
        });
        toolCard.addEventListener('mouseout', () => {
            toolCard.style.animation = 'reverseScaleRotate 0.5s ease-out forwards, reversePulse 0.5s ease-out forwards';
        });
    });
</script>

<?php
    include('footer.php');
?>

</body>
</html>