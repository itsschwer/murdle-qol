// Original function found by recording network activity:
// https://murdle.com/update-virgo/main.js?_=1676526474286
function clickBox(e) {
    if (e.target.attributes?.getNamedItem("onclick")?.value != "clickBox(this)") return;

    let icon = "&nbsp;";
    switch (e.button) {
        case 0: // lmb
            icon = "❌";
            break;
        case 1: // mw
            icon = "❓";
            break;
        case 2: // rmb
            icon = "✅";
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
// document.addEventListener("auxclick", clickBox, true);   // also triggers on rmb, not working for mw

// todo: Clicking off card returns to main
