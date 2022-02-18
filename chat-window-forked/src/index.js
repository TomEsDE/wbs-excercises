function addMessage(message, me = true) {
  const template = `<div class="message">
    <div class="${
      me ? "myMessage" : "fromThem"
    }" data-date="${new Date().toLocaleTimeString()}">
      <p>${message}</p>
      <date> ${new Date().toLocaleTimeString()} </date>
    </div>
  </div>`;

  document.querySelector(".chat .messages").innerHTML += template;
}

function typing() {
  document.querySelector(".typing").classList.toggle("active");
  setTimeout(() => {
    document.querySelector(".typing").classList.toggle("active");
  }, 1000);
}

typing();
addMessage("Hi!", false);
addMessage("In this exercise you will work with events in JS", false);
addMessage("Let's go!");

/**
 * Listen to the submit of the form and add a new message
 * with addMessage()
 */

// Code here
document.getElementById('textform').onsubmit = event => {
  console.log('onsubmit');
  event.preventDefault()

  const msg = document.getElementById('inputMsg').value
  if(msg) addMessage(msg)

  document.getElementById('inputMsg').value = ''
  addMsgsEvent()
}

/**
 * Listen to the click on each message and create an alert
 * with the date from 'data-date'
 * https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
 */

// Code here
const addMsgsEvent = () => document.querySelectorAll('.message').forEach(msgEl => {
  // console.log(msgEl.children[0]);
  addMsgAlert(msgEl)
})

function addMsgAlert(msgEl) {  
  msgEl.onclick = event => {
    console.log('msg clicked');
    // console.log('target', event.target)
    alert(`date: ${msgEl.children[0].dataset.date}`)
  }
}

addMsgsEvent()

/**
 * Listen to every keypress (from the keyboard) in the input and call
 * the function typing()
 */

// Code here
document.getElementById('inputMsg').onkeypress = event => {
  console.log('keypress');
  typing()
}
