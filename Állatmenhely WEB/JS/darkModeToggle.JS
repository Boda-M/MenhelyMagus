function darkModeToggle() {
    document.getElementById('MoonSun').classList.toggle('sun');
    document.getElementById('MoonSunHamburger').classList.toggle('sun');
    document.getElementById('darkModeDiv').classList.toggle('day');
    document.getElementById('darkModeDivHamburger').classList.toggle('day');

    let darkModeStylesheet = document.getElementById('darkModeStylesheet');

    if (document.getElementById('darkModeDiv').classList.contains('day')) {
        localStorage.setItem('darkMode', 'off');
        if (darkModeStylesheet) darkModeStylesheet.remove(); // Remove the CSS if it exists
        document.getElementsByClassName('topGradient')[0].classList.remove("dark");
    } else {
        localStorage.setItem('darkMode', 'on');
        if (!darkModeStylesheet) {
            let link = document.createElement('link');
            link.id = 'darkModeStylesheet'; // Assign an ID to easily find it later
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'CSS/darkMode.css';
            document.head.appendChild(link);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem('darkMode')) {
        localStorage.setItem('darkMode', 'off');
        document.getElementsByClassName('topGradient')[0].classList.remove("dark");
        document.getElementById('MoonSun').classList.add('sun');
        document.getElementById('MoonSunHamburger').classList.add('sun');
        document.getElementById('darkModeDiv').classList.add('day');
        document.getElementById('darkModeDivHamburger').classList.add('day');
    } else if (localStorage.getItem('darkMode') == "off") {
        document.getElementById('MoonSun').classList.toggle('sun');
        document.getElementById('MoonSunHamburger').classList.toggle('sun');
        document.getElementById('darkModeDiv').classList.toggle('day');
        document.getElementById('darkModeDivHamburger').classList.toggle('day');
    } else {
        let link = document.createElement('link');
        link.id = 'darkModeStylesheet'; // Assign an ID for later reference
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'CSS/darkMode.css';
        document.head.appendChild(link);
    }
});
