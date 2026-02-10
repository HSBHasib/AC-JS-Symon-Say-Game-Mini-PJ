let gameSeq = [];
let userSeq = [];

let btns = ["btn1", "btn2", "btn3", "btn4"];

let started = false;
let level = 0;

let highestScore = 0;

let h2 = document.querySelector("h2");
let allBtn = document.querySelectorAll(".btn")

document.addEventListener("keypress", function() {
    if(!started) {
        started = true;
        levelUp();
    } 
});


// Button Flash
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

// User Flash
function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 200);
}

// Level Up
function levelUp() {
    userSeq = [];

    // Incresing Level by 1
    level++;
    h2.textContent = `Level ${level}`

    // Random Button
    let randomIdx = Math.floor(Math.random() * 4); 
    let randomBtn = btns[randomIdx];
    let finalRandomBtn = document.querySelector(`.${randomBtn}`);

    gameSeq.push(randomBtn);
    console.log("GameSeq = ", gameSeq);
    gameFlash(finalRandomBtn);
}

function checkBtns(idx) {    
    if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length === userSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 380)
        }
    } else {
        // ---------------------------------------------------------------------- 
        // ------------- Fix the code -------------------------------------------
        if(highestScore === 0) {
            h2.innerHTML = `<big>Game Over!</big> Your score was ${level} <br> 
            <small>Press any key to start the game.</small>`
        }

        
        if(highestScore === 0 || highestScore < level) {
            highestScore = level;
            h2.innerHTML = `<big>Game Over!</big> Your score was ${level} - (Highest Score was ${highestScore}) <br> 
            <small>Press any key to start the game.</small>`
        }


        document.body.classList.add("wrongBtn");
        setTimeout(() => {
            document.body.classList.remove("wrongBtn");
        }, 100);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userBtn= btn.getAttribute("id");
    userSeq.push(userBtn);
    
    checkBtns(userSeq.length-1);
}


// Click on the Button
for(let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}
