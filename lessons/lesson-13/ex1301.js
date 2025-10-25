function userTypedInField(event) {
  console.log("User typed in field: " + event.target.name);
}

function userFocusedOnField(event) {
  console.log("User focused on field: " + event.target.name);
}

function userUnfocusedField(event) {
  console.log("User un-focused field: " + event.target.name);
}

function userChangedSelection(event) {
  console.log("User changed selection in field: " + event.target.name);
}

function userChangedAccountSelection(event) {
  console.log("User changed selection in field: " + event.target.name);
}

function mouseOverTitle() {
  console.log("User's mouse was over the title.");
}

function onReceiveUpdateClick(event) {
  let receiveUpdateVia = event.target.value;
  console.log("User selected to receive updates via " + receiveUpdateVia);
}
