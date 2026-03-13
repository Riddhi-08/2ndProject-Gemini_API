const API_KEY = "YOUR_API_KEY_HERE";
async function askAI(){
let input = document.getElementById("question").value;
let chatBox = document.getElementById("chatBox");
if(!input) return;
// user message
chatBox.innerHTML += `
<div class="message user">
<div class="bubble">${input}</div>
</div>
`;
const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method: "POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
contents:[
{
parts:[{ text: input }]
}
]
})
}
);
let data = await response.json();
console.log(data);
let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
// AI response
chatBox.innerHTML += `
<div class="message ai">
<div class="bubble">${reply}</div>
</div>
`;
document.getElementById("question").value="";
chatBox.scrollTop = chatBox.scrollHeight;
}
document.getElementById("question").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        askAI();
    }
});