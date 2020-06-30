const addBtn = document.getElementById('new');
const delBtn = document.getElementById('del');
const form = document.getElementById('form');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const cardWrapper = document.querySelector('.card-wrapper');
const allCards = document.querySelector('.All-cards');
const prevs = document.getElementById('prev');
const nxt = document.getElementById('next');

prevs.addEventListener('click', () => prev());
nxt.addEventListener('click', () => next());
delBtn.addEventListener('click', deleteCard);

(function() {
    display();
})()


function display() {

    let savedCards = JSON.parse(localStorage.getItem('cards'));

    if (savedCards != null) {
        savedCards.forEach((item, i) => {
            allCards.innerHTML += `
        <div class="card">
            <div class="card-side card-front">
              <h4 class="card_question">${item.question}</h4>
            </div>

          <div class="card-side card-back">
            <h4 class="card_answer">${item.answer}</h4>
          </div>
       </div>`;
     });
    }
}
// DELETE
function deleteCard(e) {
  e.preventDefault();
  let width = cardWrapper.clientWidth;
  const card = document.querySelectorAll('.card');
  let savedCards = JSON.parse(localStorage.getItem('cards'));

  card.forEach((item, i) => {
       let targetedCard = i * (-width);
       if(targetedCard == translate){
          savedCards.splice(i , 1);
          localStorage.setItem('cards', JSON.stringify(savedCards));
          allCards.removeChild(card[i]);

          if(i == card.length-1){prev();}
        }
      });
    }


const width = cardWrapper.clientWidth;
var translate = 0;
const cards = []
////////////////////////////////////
//////// FORM ON SUBMIT
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (Validation()) {
        setLocalStorage(question.value, answer.value);
        question.value = '';
        answer.value = '';
    } else
        alert('FILL IN THE FORM')
})

const setLocalStorage = (questions, answers) => {
    let savedCards = JSON.parse(localStorage.getItem('cards'));
    if (savedCards == null) {
        const card = {
            question: [questions],
            answer: [answers]
        }
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards));
    } else {
        let savedCards = JSON.parse(localStorage.getItem('cards'));

        const card = {
            question: [questions],
            answer: [answers]
        }
        savedCards.push(card)
        localStorage.setItem('cards', JSON.stringify(savedCards));
    }
    addCards(questions, answers);
  }

const addCards = (q, a) => {
    allCards.innerHTML +=`
    <div class="card">
        <div class="card-side card-front">
          <h4 class="card_question">${q}</h4>
        </div>

        <div class="card-side card-back">
          <h4 class="card_answer">${a}</h4>
        </div>
    </div>`;

}
const next = () => {
    const card = document.getElementsByClassName('card');
    const cardsArr = Array.from(card)
    let lastCard = cardsArr.length * (-width);

    if (lastCard != translate - width) {
        translate = translate - width;
        allCards.style.transform = `translateX(${translate}px)`
    }
}
const prev = () => {
    const card = document.getElementsByClassName('card');
    const cardsArr = Array.from(card)
    if (translate + width != width) {
        translate = translate + width
        allCards.style.transform = `translateX(${translate}px)`;
    }
}
////////////////////////////////////////////////////////////////////////////
// VAlidation
Validation = () => {
    if (answer.value == ''||question.value == '')
        return false;
    else
      return true;
}
