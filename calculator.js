// Chatbox logic
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const messages = document.getElementById('messages');
const voiceBtn = document.getElementById('voiceBtn');

// Evaluate and display result
function handleChatInput(input) {
    let expr = input.replace(/%/g, '/100');
    let result;
    try {
        result = eval(expr);
        messages.innerHTML += `<div><b>You:</b> ${input}</div><div><b>Calculator:</b> ${result}</div>`;
    } catch {
        messages.innerHTML += `<div><b>You:</b> ${input}</div><div><b>Calculator:</b> Error</div>`;
    }
    messages.scrollTop = messages.scrollHeight;
}

sendBtn.onclick = () => {
    if (chatInput.value.trim() !== "") {
        handleChatInput(chatInput.value.trim());
        chatInput.value = "";
    }
};
chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendBtn.onclick();
});

// Voice input (if supported)
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        chatInput.value = event.results[0][0].transcript;
        sendBtn.onclick();
    };
    voiceBtn.onclick = () => recognition.start();
} else {
    voiceBtn.disabled = true;
    voiceBtn.title = "Voice not supported";
}