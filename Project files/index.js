// theme switch button
let darkmode = localStorage.getItem('darkmode');
const switchTheme = document.getElementById('switch-theme');

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if (darkmode === "active") enableDarkmode()

switchTheme.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

// to top button
const toTop = document.getElementById('top-btn');

toTop.addEventListener("click", () => {
    if (window.scrollY != 0) {
        setTimeout(function () {
            window.scrollTo(0, window.scrollY - 2500);
        }, 10);
    }
})

// contact.html feedback form button
const contactBtn = document.getElementById('contactBtn');

contactBtn.addEventListener("click", () => {
    alert("You have submitted your feedback.\nThank you !")
})
