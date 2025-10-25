function onButtonClicked(event) {
  
    let buttons = document.getElementsByClassName('milk-choice-button');
  
    Array.from(buttons).forEach(function(button) {
     
      if (button === event.target) {
  
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }
  