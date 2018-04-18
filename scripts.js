$(document).ready(function(){
    // we call the function
    hoursOfOperation();
  });

var phoneHours = ["2pm-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","10am-6pm ET"];
var chatHours = ["Closed","8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","Closed"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function phoneClosed(){
    phoneStatus="CLOSED";
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    $( "#phone-btn" ).addClass( "btn-closed" );
    $( "#phoneStatus" ).addClass( "btn-status-closed" );
    var d = new Date();
    var nextDay = d.getDay()+1;
    var hoursOnDay = phoneHours[nextDay];
    nextHours = "Tomorrow's Hours: " + days[nextDay] + " " + hoursOnDay;
    console.log(nextHours);
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    document.getElementById("phone-hours").innerHTML=nextHours;
};

function phoneOpen(){
    phoneStatus="OPEN";
    $( "#phone-btn" ).addClass( "btn-open" );
    $( "#phoneStatus" ).addClass( "btn-status-open" );
    var d = new Date();
    var hoursOnDay = phoneHours[d.getDay()];
    todayHours = "Today's Hours: " + days[d.getDay()] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    document.getElementById("phone-hours").innerHTML=todayHours;

};

function chatOpen(){
    chatStatus="OPEN";
    document.getElementById("chatStatus").innerHTML=chatStatus;
    $( "#chat-btn" ).addClass( "btn-open" );
    $( "#chatStatus" ).addClass( "btn-status-open" );
    var d = new Date();
    var hoursOnDay = chatHours[d.getDay()];
    todayHours = "Today's Hours: " + days[d.getDay()] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("chatStatus").innerHTML=chatStatus;
    document.getElementById("chat-hours").innerHTML=todayHours;
};

function chatClosed(){
    chatStatus="CLOSED";
    document.getElementById("chatStatus").innerHTML=chatStatus;
    $( "#chat-btn" ).addClass( "btn-closed" );
    $( "#chatStatus" ).addClass( "btn-status-closed" );
    var d = new Date();
    var nextDay = d.getDay()+1;
    var hoursOnDay = chatHours[nextDay];
    nextHours = "Tomorrow's Hours: " + days[nextDay] + " " + hoursOnDay;
    console.log(nextHours);
    document.getElementById("chatStatus").innerHTML=chatStatus;
    document.getElementById("chat-hours").innerHTML=nextHours;
};

function hoursOfOperation() {

// // Assign current time to a variable
const now = new Date();
// const now = new Date("2018-04-17T17:00:00");
contactStatus = "unknown";

console.log(now);

if (
    (now.getDay()>0 && now.getDay()<6) &&
    (now.getUTCHours()>=12 && now.getUTCHours()<21)
    ){
    chatOpen();
} else {
    chatClosed();
}

console.log(chatStatus);

if (
    (now.getDay()>0 && now.getDay()<5) &&
    (now.getUTCHours()>=11 && now.getUTCHours()<23)){
    phoneOpen();
} else if(now.getDay()===0 && now.getUTCHours()>=18 && now.getUTCHours()<23){
    phoneOpen();
} else if(
    (now.getDay()===5) &&
    (now.getUTCHours()>=11 && now.getUTCHours()<22)){
        phoneOpen();
} else {
        phoneClosed();
}

console.log(phoneStatus);

}


