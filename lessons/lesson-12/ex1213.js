document.getElementById("add-event").addEventListener("click", function(event) {
    
    let meetingName = document.getElementById("meeting-name").value;
    let meetingDescription = document.getElementById("meeting-description").value;
    let eventType = document.getElementById("event-type").value;
    let startTime = document.getElementById("start-time").value;
    let endTime = document.getElementById("end-time").value;

    let consoleMessage = "A New " + eventType + " meeting was created: " + meetingName + 
    " | Description: " + meetingDescription + 
    " | The meeting will start at " + startTime + " and end at " + endTime;

    console.log(consoleMessage);
});
