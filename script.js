document.querySelector("form").addEventListener("submit", (event)=>{
    event.preventDefault();
    let firstName = event.target.children[0].value;
    let lastName = event.target.children[1].value;
    let country = event.target.children[2].value;
    let score = event.target.children[3].value;
    let errorMessage = document.querySelector(".errorMessage")
    errorMessage.style.display = "none"
    if(firstName==="" || lastName === "" || country==="" || score===""){
        let errorSound=document.querySelector(".errorsound");
        errorMessage.style.display = "block";
        errorSound.play();
    }
    else{
        let scoreBoardContainer = document.querySelector(".scoreBoard-container");
        let addPlayer=document.querySelector(".addOrDeleteSound");
        let scoreBoardElement = document.createElement("div");
        scoreBoardElement.classList.add("scoreboard");
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        let d = new Date();
        function addZero(i) {
            if (i < 10) {
                i = "0" + i
            }
            return i;
          }
        let h = addZero(d.getHours());
        let m = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());
        let time = h + ":" + m + ":" + s;

        let mon = month[d.getMonth()];
        let year = d.getFullYear();
        let da = addZero(d.getDate())
        let date = mon + " "+  da + ", " + year;

        scoreBoardElement.innerHTML = `
        <div>
        <p class = "playerName"> ${firstName} ${lastName}</p>
        <p class="main-time">${date}, ${time}</p>
        </div>
        <p class="player-country">${country}</p>
        <p class="player-score">${score}</p>
        <div class="scoreboard-btn-container">
            <button>🗑️</button>
            <button>+5</button>
            <button>-5</button>
        </div>
        `;
        scoreBoardContainer.appendChild(scoreBoardElement);
        activateButton();
        sortAndAppend();
        addPlayer.play();
    }
})
function activate(e) {
    let btnTarget = e.target.innerText;
    let addOrDeleteSound=document.querySelector(".addOrDeleteSound");
    let scores = e.target.parentElement.parentElement.children[2];
    if (btnTarget === "🗑️") {
        e.target.parentElement.parentElement.remove();
        addOrDeleteSound.play(); 
    }
    else if(btnTarget==="+5"){
        scores.innerText = parseInt(scores.innerText)+5  
        addOrDeleteSound.play();  
    }
    else if(btnTarget==="-5"){
        scores.innerText = parseInt(scores.innerText)-5 
        addOrDeleteSound.play(); 
    }
    sortAndAppend();
}

function activateButton() {
    [...document.querySelectorAll(".scoreboard-btn-container")].map(el => {
        el.addEventListener("click", activate);
    });
}
function sortAndAppend() {
    let scoreBoardContainer = document.querySelector(".scoreBoard-container");
    let data = [...document.querySelectorAll(".scoreboard")];
    data.sort((a, b) => {
        return parseInt(b.querySelector(".player-score").textContent) - parseInt(a.querySelector(".player-score").textContent);
    });
    while (scoreBoardContainer.firstChild) {
        scoreBoardContainer.removeChild(scoreBoardContainer.firstChild);
    }
    data.forEach((element) => {
        scoreBoardContainer.appendChild(element);
    });
}
sortAndAppend();
activateButton();