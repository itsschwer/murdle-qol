// Clicking off card returns to main
document.addEventListener("click", blur);
function blur(e) {
    const back = document.querySelector("input.opening-button");
    if (back?.attributes?.getNamedItem("onclick")?.value == "research('return')"
        && !e.target.classList.contains("grid_emoji")
        && !e.target.closest(".card-skeu")
        && !e.target.closest(".file")) {
        // console.log(e.target);
        back.click();
    }
}

// Mouse-optimised grid controls
// Original function found by recording network activity:
// https://murdle.com/update-virgo/main.js?_=1676526474286
function clickBox(e) {
    if (e.target.attributes?.getNamedItem("onclick")?.value != "clickBox(this)") return;

    let icon = "&nbsp;";
    switch (e.button) {
        case 0: // lmb
            icon = "✅";
            break;
        case 1: // mw
            icon = "❓";
            break;
        case 2: // rmb
            icon = "❌";
            break;
        default:
            return;
    }

    e.preventDefault();
    e.stopPropagation();

    // console.log(icon);
    // console.log(e);

    if (e.target.innerHTML == icon) {
        e.target.innerHTML = "&nbsp;";
    }
    else {
        e.target.innerHTML = icon;
    }

    let grid_backup = document.getElementById("grid_backup").innerHTML;
    localStorage.setItem("savedGrid", grid_backup);
}

document.addEventListener("click", clickBox, true);
document.addEventListener("contextmenu", clickBox, true);
// https://stackoverflow.com/questions/1930875/disabling-middle-click-scrolling-with-javascript/30423534#30423534
document.addEventListener("mousedown", mw, true);
function mw(e) { if (e.button == 1) clickBox(e); }


// Hacky -----------------------------------------------------------------------
// Game seems to only read from local storage once an accusation has been made,
// so need to somehow set the page variable `grid_backup` somehow.
// This is necessary because opening the notebook or a fingerprint clue repopulates the grid.
// Can't click on lightbulb because it is an <a> with a href attribute (csp)
//     (lightSwitch() → updateGrid() → grid_backup)

// Add a hacky element so that we can call updateGrid() 
const hacky = document.createElement("div");
hacky.id = "hacky-qol";
hacky.style.display = "none";
document.body.append(hacky);
hacky.outerHTML = hacky.outerHTML.replace('>', ' onclick="updateGrid()">');

// Need to use mousedown ∵ otherwise newPage() is called first and grid data is lost
document.addEventListener("mousedown", newPage);
function newPage(e) {
    if (e.target.attributes?.getNamedItem("onclick")?.value.includes("newPage(")) {
        const c = document.getElementById("hacky-qol");
        c.click();
        // console.log(c);
    }
}
