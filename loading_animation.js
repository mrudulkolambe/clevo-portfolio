var loader_word = document.getElementsByClassName('loader-word');
var loading_word_array = [];
var currentLoaderWord = 0;
let loadingStart = true;

loader_word[currentLoaderWord].style.opacity = 1;
for (var i = 0; i < loader_word.length; i++) {
  splitLoaderLetters(loader_word[i]);
}

function changeLoaderWord() {
  var cw = loading_word_array[currentLoaderWord];
  var nw = currentLoaderWord == loader_word.length - 1 ? loading_word_array[0] : loading_word_array[currentLoaderWord + 1];
  for (var i = 0; i < cw.length; i++) {
    animateLoaderLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLoaderLetterIn(nw, i);
  }

  currentLoaderWord = (currentLoaderWord == loading_word_array.length - 1) ? 0 : currentLoaderWord + 1;
}

function animateLoaderLetterOut(cw, i) {
  setTimeout(function () {
    cw[i].className = 'letter out';
  }, i * 80);
}

function animateLoaderLetterIn(nw, i) {
  setTimeout(function () {
    nw[i].className = 'letter in';
  }, 340 + (i * 80));
}

function splitLoaderLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  loading_word_array.push(letters);
}

changeLoaderWord();
const changeWordInterval = setInterval(changeLoaderWord, 3000);


const loader = document.querySelector(".loader")

const loaderTimeOut = setTimeout(() =>{
	loadingStart = false;
	loader.style.opacity = "0"
}, 5000)
loader.addEventListener("transitionend", () => {
	if(!loadingStart){
		clearTimeout(loaderTimeOut);
		clearInterval(changeWordInterval);
		loader.style.display = "none";
    home.scrollIntoView()
	}
})