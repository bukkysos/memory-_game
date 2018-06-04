var cardDeck = document.getElementById('card-deck');
var cards = document.getElementsByClassName('card');
// console.log(cards);
var arrayOfCards = [...cards];
// console.log(arrayOfCards);

var clicks = 0;
var openCards = [];
var matchedCardsList = [];
var modal = document.getElementById("popup1");

var sec = 0;
var min = 0;
var hour = 0;

function cardOpen() {

  openCards.push(this);
  if (openCards.length == 2) {
    clicks++;
    document.getElementsByClassName('moves')[0].innerHTML = clicks;
    if (openCards[0].type == openCards[1].type) {
      matchedCards(...openCards);
      // or
      // matchedCards(openCards[0],openCards[0]);
    } else {
      unmatchedCards(...openCards);
    }
  }
}



function matchedCards(firstCard, secondCard) {
  firstCard.classList.add("match", "disabled");
  secondCard.classList.add("match", "disabled");
  firstCard.classList.remove("open", "show");
  secondCard.classList.remove("open", "show");
  matchedCardsList.push(firstCard, secondCard);
  openCards = [];
}

function unmatchedCards(firstCard, secondCard) {

  firstCard.classList.add("unmatched");
  secondCard.classList.add("unmatched");
  disabled();
  setTimeout(function () {
    firstCard.classList.remove("unmatched", "open", "disabled", "show");
    secondCard.classList.remove("unmatched", "open", "disabled", "show");
    enabled();
    openCards = [];
  }, 1000);


}

function Shuffle(inputArray) {
  for (var currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
    var temporaryValue = inputArray[currentIndex];
    //
    var randomIndex = Math.floor(Math.random() * currentIndex);
    inputArray[currentIndex] = inputArray[randomIndex];
    inputArray[randomIndex] = temporaryValue;
  }
  return inputArray;
}

function startGame() {
  cardDeck.innerHTML = "";
  arrayOfCards = Shuffle(arrayOfCards);
  for (var i = 0; i < arrayOfCards.length; i++) {
    cardDeck.appendChild(arrayOfCards[i]);
    arrayOfCards[i].addEventListener("click", displayCard);
    arrayOfCards[i].classList.remove('open', 'show', 'match', 'disabled');
    arrayOfCards[i].addEventListener("click", cardOpen);
    clicks = 0;
    document.getElementById('checkMoves').innerHTML = clicks;
    arrayOfCards[i].addEventListener("click",congrats);
  }
}

document.body.onload = startGame;


function displayCard() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
}

function disabled() {
  arrayOfCards.forEach(function (card) {
    card.classList.add('disabled');
  });
}

function enabled() {
  arrayOfCards.forEach(function (card) {
    card.classList.remove('disabled');
  });
  matchedCardsList.forEach(function(card) {
    card.classList.add('disabled');
  });
}


function congrats(){
  if(matchedCardsList.length==arrayOfCards.length){
    modal.classList.add("show");
    document.getElementById('finalMove').innerHTML = clicks;
    clearTime();
    document.getElementById('totalTime').innerHTML = hour + " : " + min + " : " + sec;
    rating();
  }
  closeIcon.addEventListener("click", closeCongrats);
}
  var closeIcon = document.getElementById("close-icon");

  function closeCongrats(){
    modal.classList.remove("show");
    startGame();
    location.reload();
  }

  function playAgain(){
    modal.classList.remove("show");
    startGame();
    location.reload();
  };


// Timer

function showSeconds() {
    if (sec < 59) {
        sec++;
        document.getElementById('second').innerHTML=sec;
    }else if(sec = 60){
        sec=0;
        document.getElementById('second').innerHTML="0" + sec;
    }
}

var mySeconds = setInterval(showSeconds, 1000);
var myMinutes = setInterval(showMinutes, 60000);
var myHours = setInterval(showHours, 3600000);


function showMinutes() {
    if (min < 59) {
        min++;
        document.getElementById('minutes').innerHTML=min;
    }else if(min = 60){
        min=0;
        document.getElementById('minutes').innerHTML=min;
    }
}
  
function showHours() {
    if (hour < 23) {
        hour++;
        document.getElementById('hours').innerHTML=hour;
    }else if(hour = 24){
        hour=0;
        document.getElementById('hours').innerHTML=hour;
    }
}

function clearTime() {
    clearInterval(mySeconds);
    clearInterval(myMinutes);
    clearInterval(myHours);
}

function rating() {
  if (clicks <=10) {
    document.getElementById('starRating').innerHTML = "5 Stars!";
  } else if (clicks <=15) {
    document.getElementById('starRating').innerHTML = "3 Stars!";
  }else{
    document.getElementById('starRating').innerHTML = "1 Star!";
  }
}

// Close of Timer

// Star rating



// End of Star rating