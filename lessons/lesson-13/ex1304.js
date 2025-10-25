/*function userSelectedUpdateMethod() {
  const smsRadio = document.getElementById('contact_sms');
  const emailRadio = document.getElementById('contact_email');

  if (smsRadio.checked) {
    console.log("User selected to receive updates via SMS");
  } else if (emailRadio.checked) {
    console.log("User selected to receive updates via Email");
  }
}
  */
function onReceiveUpdateClick(event) {
  let selectedValue = event.target.value;  
  if (selectedValue === 'sms') {
    console.log("User selected to receive updates via SMS");
  } else {
    console.log("User selected to receive updates via Email");
  }
}