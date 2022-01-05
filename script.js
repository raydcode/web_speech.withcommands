import * as ele from './utils/elements.js';

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
    // stop use hotkey
    ele.instruction.textContent = 'Listening.... Press Ctrl + m to stop';
    ele.searchInput.focus();
    console.log('Speech is activated !!!');
  });

  recognition.addEventListener('end', () => {
    ele.mic.classList.remove('fa-microphone-slash');
    ele.mic.classList.add('fa-microphone');
    // start use hotkey
    ele.instruction.textContent =
      'Press Ctrl + x or Click the Mic icon to start';
    ele.searchInput.focus();
    console.log('Speech is Deactivated!!!');
  });

  recognition.continuous = true;

  recognition.addEventListener('result', (e) => {
    console.log(e);
    const speech = e.resultIndex;
    const transcript = e.results[speech][0].transcript;

    if (transcript.toLowerCase().trim() == 'stop recording') {
      recognition.stop();
    } else if (!ele.searchInput.value) {
      ele.searchInput.value = transcript;
    } else {
      if (transcript.toLowerCase().trim() == 'search') {
        ele.searchForm.submit();
      } else if (transcript.toLowerCase().trim() == 'reset') {
        ele.searchInput.value = '';
      } else {
        ele.searchInput.value = transcript;
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'x') {
      recognition.start();
    }
    if (e.ctrlKey && e.key === 'm') {
      recognition.stop();
    }
  });
} else {
  alert('Speech Web api is not supported');
  ele.speechContainer.style.visibility = 'hidden';
}
