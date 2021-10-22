// Constante para todo el script
const cards = document.querySelectorAll('.memory-card');

// Inicializo variables que uso a lo largo del script
let hasVolteada = false;
let lock = false;
let primeraCarta, segundaCarta;
let cont = 0; // --> contador para el número de aciertos que se mostrará en el input

// funcion que invierte las cartas y comprueba si coinciden
function invertirCarta() {
  if (lock) return;
  if (this === primeraCarta) return;

  // añade la clase flip para darle efecto a la carta al voltear
  this.classList.add('flip');
  
  if (!hasVolteada) {
    hasVolteada = true;
    primeraCarta = this;
    return;
  }

  segundaCarta = this;
  checkForMatch();
}

// comprueba si las dos cartas son iguales, el resultado se almacena en isMatch, si es true desactiva las cartas(descativarCartas) sino les da la vuelta(unflipCards)
function checkForMatch() {
  let isMatch = primeraCarta.dataset.valor === segundaCarta.dataset.valor;

  isMatch ? desactivarCartas() : unflipCards();
}

// funcion que elimina a las cartas el listener para que no se les pueda dar la vuelta, suma el contador de aciertos del input
function desactivarCartas() {
  primeraCarta.removeEventListener('click', invertirCarta);
  segundaCarta.removeEventListener('click', invertirCarta);
  cont++; // Contador
  // Actualiza el contador de aciertos
  document.getElementById("input").value = cont;
  // la añade la clase acertado para que se ponga el borde en verde
  primeraCarta.classList.add('acertado');
  segundaCarta.classList.add('acertado');
  resetBoard();
}

function unflipCards() {
  lock = true;

  setTimeout(() => {
    primeraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');
    
    resetBoard();
  }, 1500);
}
// asigna valores para resetearlos si han cambiado a true
function resetBoard() {
  [hasVolteada, lock] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

// funcion que reinicia el contador a 0 y ordena aleatoriamente las cartas
(function shuffle() {
  cont = 0; // --> contador se reinica a 0
  document.getElementById("input").value = cont; // en el input se pone el valor de cont en el inicio
  // genera aleatoriamente el orden donde estará cada carta
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// a cada carta le añade el listener invertirCarta, para que se voltee al hacer click
cards.forEach(card => card.addEventListener('click', invertirCarta));

