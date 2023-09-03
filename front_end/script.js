// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', async function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  if (input !== "") {
    // Clear input field
    inputField.value = '';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    // Add user input to conversation
    let message = document.createElement('div');
    message.classList.add('chatbot-message', 'user-message');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
    conversation.appendChild(message);

    // Generate chatbot response
    const response = await generateResponse(input);
    console.log(response)

    // Add chatbot response to conversation
    message = document.createElement('div');
    message.classList.add('chatbot-message','chatbot');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
    conversation.appendChild(message);
    message.scrollIntoView({behavior: "smooth"});
  }
});

// Generate chatbot response function
async function generateResponse(input){
    // Add chatbot logic here
    const url = `http://127.0.0.1:8000/ask?user_input=${encodeURIComponent(input)}`
    data = ""
    try {
        const response = await fetch(url)
        data = await response.json()
        return data['response'];
    } catch (error) {
        console.error('Error:', error);
        return "Error occured"
    }
    // Return a random response
}

  
// Dropdown menu
const dropdownContent = document.getElementById("dropdown-content");
const menuIcon = document.getElementById("menu");

// Function to toggle the dropdown menu
function toggleDropdown() {
    dropdownContent.classList.toggle("show");
}

// Event listener to toggle the dropdown menu when the menu icon is clicked
menuIcon.addEventListener("click", toggleDropdown);

// Event listener to hide the dropdown menu when clicking outside of it
document.addEventListener("click", function (event) {
    if (!menuIcon.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove("show");
    }
});

function clearChat() {
    document.getElementById("conversation").innerHTML = "";
}

function saveChat() {
    const chatContent = document.getElementById("conversation").innerHTML;
    const chatTitle = prompt("Enter a title for this chat:");
    if (chatTitle) {
        const savedChats = document.querySelector(".saved-chats");
        const chatEntry = document.createElement("div");
        chatEntry.classList.add("chat-entry");
        chatEntry.innerHTML = `<h5>${chatTitle}</h5>${chatContent}`;
        savedChats.appendChild(chatEntry);
    }
}

// Event listeners for "Clear Chat" and "Save Chat"
document.getElementById("clear-chat").addEventListener("click", clearChat);
dropdownContent.classList.remove("show");

document.getElementById("save-chat").addEventListener("click", saveChat);
dropdownContent.classList.remove("show");

// Function to create and animate random icons
function createRandomIcon() {
    const icon = document.createElement("i");
    const iconsContainer = document.getElementById("background-icons");
    
    const iconClasses = ["fa-book-open", "fa-square-root-variable", "fa-microscope", "fa-wave-square", "fa-robot"];
    const randomIconClass = iconClasses[Math.floor(Math.random() * iconClasses.length)];

    icon.className = "fas " + randomIconClass;
    iconsContainer.appendChild(icon);

    // Randomize icon position, size, rotation, and animation
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const size = 16 + Math.random() * 24 + "px"; // Random icon size
    const rotation = Math.random() * 360 + "deg"; // Random rotation
    const animationDuration = 5 + Math.random() * 10 + "s"; // Random animation duration

    icon.style.position = "absolute";
    icon.style.left = posX + "px";
    icon.style.top = posY + "px";
    icon.style.fontSize = size;
    icon.style.color = "#333";
    icon.style.transform = "rotate(" + rotation + ")";
    icon.style.animation = "moveIcon " + animationDuration + " linear infinite";

}

// Create initial random icons
for (let i = 0; i < 20; i++) {
    createRandomIcon();
}

const sidePanel = document.getElementById('side-panel');
const toggleIcon = document.getElementById('toggle-icon');

function toggleSidePanel() {
    sidePanel.classList.toggle('show');

    // Toggle the tooltip text based on the side panel's visibility
    if (sidePanel.classList.contains('show')) {
        toggleIcon.classList.remove('fa-bars');
        toggleIcon.classList.add('fa-times');
        toggleIcon.setAttribute('title', 'Close Side Panel');
    } else {
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
        toggleIcon.setAttribute('title', 'Open Side Panel');
    }
}

toggleIcon.addEventListener('click', toggleSidePanel);


// function generateResponse(input) {
//     document.addEventListener('DOMContentLoaded', () => {
//         const questionForm = document.getElementById('question-form');
//         const userInput = document.getElementById('user-input');
//         const responseDisplay = document.getElementById('response-display');

//         questionForm.addEventListener('submit', async (e) => {
//             e.preventDefault();

//             const userQuestion = userInput.value;

//             try {
//                 const response = await fetch('/ask', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ user_input: userQuestion }),
//                 });

//                 if (response.status === 200) {
//                     const data = await response.json();
//                     responseDisplay.innerHTML = data.response;
//                 } else {
//                     responseDisplay.innerHTML = 'Error: Inappropriate Question';
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         });
//     });
// }

