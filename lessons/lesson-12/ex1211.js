function onSubmitButtonClick() {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    
    let alertMessage = "Your first name is: " + firstName + "\nYour last name is: " + lastName;
    
    alert(alertMessage);
}
