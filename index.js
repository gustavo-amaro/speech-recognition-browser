button = document.querySelector("button");
const text = document.querySelector(".text");

const recognition = createRecognition();
let listening = false;

button.addEventListener("click", (e) => {
  if (!recognition)
    return (text.innerHTML = "Seu browser não suporta reconhecimento de voz.");

  console.log(listening);
  listening ? recognition.stop() : recognition.start();
});
function createRecognition(language = "pt_BR") {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    text.innerHTML = "Seu browser não suporta reconhecimento de voz.";
    return null;
  }

  recognition.lang = language;
  recognition.continous = true;

  recognition.onstart = () => {
    listening = true;
    button.innerHTML = '<i class="fas fa-pause"></i>';
  };
  recognition.onend = () => {
    listening = false;
    button.innerHTML = '<i class="fas fa-microphone"></i>';
  };
  recognition.onerror = (e) => console.log("error", e);
  recognition.onresult = (event) => {
    text.innerHTML = event.results[0][0].transcript;
    listening = false;
  };

  return recognition;
}
