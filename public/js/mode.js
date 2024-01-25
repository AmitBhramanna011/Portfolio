let count = 0;
let b = document.querySelector(".dark-mode-button");

b.addEventListener("click", () => {
    let css_link = document.createElement("link");
    css_link.rel = 'stylesheet';
    css_link.type = 'text/css';
    css_link.href = 'styles/light.css';

    let ele = document.body;
    let mode = document.querySelector('.dark-mode-button i');

        let existingLink = document.head.querySelector('link[href="styles/light.css"]');
        if (existingLink) {
            document.head.removeChild(existingLink);
        }
    else {
        document.head.appendChild(css_link);
    }

    ele.classList.toggle('light-mode');

    mode.classList.toggle('bi-moon-stars-fill');
    mode.classList.toggle('bi-brightness-low-fill');

    console.log(mode);
});
