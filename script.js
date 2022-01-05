import * as ele from './utils/elements.js';
import * as fun from './utils/functions.js';

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
  const recognition = new speechRecognition();

  ele.mic.addEventListener('click', enableMic);

  function enableMic(e) {
    e.preventDefault();
    if (ele.mic.classList.contains('fa-microphone')) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }

  recognition.addEventListener('start', () => {
    ele.mic.classList.remove('fa-microphone');
    ele.mic.classList.add('fa-microphone-slash');
    ele.instruction.textContent = 'Listening....';
    ele.searchInput.focus();
    console.log('Speech is activated !!!');
  });

  recognition.addEventListener('end', () => {
    ele.mic.classList.remove('fa-microphone-slash');
    ele.mic.classList.add('fa-microphone');
    ele.instruction.textContent = 'Click the Mic icon to start';
    ele.searchInput.focus();
    console.log('Speech is Deactivated!!!');
  });

  recognition.continuous = true;

  let content = '';

  recognition.addEventListener('result', (e) => {
    console.log(e);
    const speech = e.resultIndex;
    const transcript = e.results[speech][0].transcript;
    content += transcript;
    ele.searchInput.value = content;
    searchInput.focus();
  });
} else {
  alert('Speech Web api is not supported');
  ele.speechContainer.style.visibility = 'hidden';
}
