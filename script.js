document.querySelector("form").addEventListener("submit", (event)=>{
    event.preventDefault();
    let firstName = event.target.children[0].value;
    let lastName = event.target.children[1].value;
    let country = event.target.children[2].value;
    let score = event.target.children[3].value;
    let error = document.querySelector(".error");
    error.style.display = "none";
    if(firstName==="" || lastName === "" || country==="" || score===""){
        let errorSound=document.querySelector(".errorsound");
        error.style.display = "block";
        errorSound.play();
    }
    else{
        let allScoreBoardContainer = document.querySelector(".all-scoreBoard-container");
        let addPlayer=document.querySelector(".addOrDeleteSound");
        let allScoreBoardElement = document.createElement("div");
        allScoreBoardElement.classList.add("scoreboard");
        let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        let d = new Date();
        function Zero(i) {
            if (i < 10) {
                i = "0" + i
            }
            return i;
          }
        let h = Zero(d.getHours());
        let m = Zero(d.getMinutes());
        let s = Zero(d.getSeconds());
        let time = h + ":" + m + ":" + s;

        let mon = month[d.getMonth()];
        let year = d.getFullYear();
        let date = mon + " " +year;

        allScoreBoardElement.innerHTML = `
        <div>
        <p class = "playerName"> ${firstName} ${lastName}</p>
        <p class="main-time">${date}, ${time}</p>
        </div>
        <p class="player-country">${country}</p>
        <p class="playerScore">${score}</p>
        <div class="scoreboard-btn-container">
            <button>🗑️</button>
            <button>+5</button>
            <button>-5</button>
        </div>
        `;
        allScoreBoardContainer.appendChild(allScoreBoardElement);
        activateButton();
        sortAndAppend();
        addPlayer.play();
    }
})
function Activate(activateButton) {
    let btnTarget = activateButton.target.innerText;
    let addOrDeleteSound=document.querySelector(".addOrDeleteSound");
    let scores = activateButton.target.parentElement.parentElement.children[2];
    if (btnTarget === "🗑️") {
        activateButton.target.parentElement.parentElement.remove();
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
    [...document.querySelectorAll(".scoreboard-btn-container")].map(e => {
        e.addEventListener("click", Activate);
    });
}
function sortAndAppend() {
    let allScoreBoardContainer = document.querySelector(".all-scoreBoard-container");
    let data = [...document.querySelectorAll(".scoreboard")];
    data.sort((a, b) => {
        return parseInt(b.querySelector(".playerScore").textContent) - parseInt(a.querySelector(".playerScore").textContent);
    });
    while (allScoreBoardContainer.firstChild) {
        allScoreBoardContainer.removeChild(allScoreBoardContainer.firstChild);
    }
    data.forEach((element) => {
        allScoreBoardContainer.appendChild(element);
    });
}
sortAndAppend();
activateButton();