$(document).ready(function(){
    hoursOfOperation();
  });

const phoneHours = ["2pm-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-6pm ET","Closed"];
const chatHours = ["Closed","8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","Closed"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var DateTime = luxon.DateTime;
var DateTimeEST = DateTime.fromObject({zone: 'America/New_York'});
// Test Closed Text
// var DateTimeEST =  DateTime.local(2018, 4, 20, 19, 00);
var dayEST = DateTimeEST.weekday;
var hourEST = DateTimeEST.hour;
console.log("The ET day is " + dayEST + " and the ET hour is " + hourEST);


function hoursOfOperation(){

    if (dayEST>0 && dayEST<6 && hourEST>7 && hourEST<17){
        chatOpen();
    }
    else{
        chatClosed();
    }

    if (dayEST>0 && dayEST<5 && hourEST>6 && hourEST<19){
        phoneOpen();
    }
    else if (dayEST===5 && hourEST>6 && hourEST<18){
        phoneOpen();
    }
    else if (dayEST===0 && hourEST>1 && hourEST<19){
        phoneOpen();
    }
    else{
        phoneClosed();
    }
}

function phoneClosed(){
    phoneStatus="CLOSED";
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    $( "#phone-btn" ).addClass( "btn-closed" );
    $( "#phoneStatus" ).addClass( "btn-status-closed" );
    var nextDay = dayEST+1;
    var hoursOnDay = phoneHours[nextDay];
    nextHours = "Tomorrow's Hours: " + days[nextDay] + " " + hoursOnDay;
    console.log("Next day is " + nextDay);
    console.log(nextHours);
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    document.getElementById("phone-hours").innerHTML=nextHours;
};

function phoneOpen(){
    phoneStatus="OPEN";
    $( "#phone-btn" ).addClass( "btn-open" );
    $( "#phoneStatus" ).addClass( "btn-status-open" );
    var hoursOnDay = phoneHours[dayEST];
    todayHours = "Today's Hours: " + days[dayEST] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    document.getElementById("phone-hours").innerHTML=todayHours;

};

function chatOpen(){
    chatStatus="OPEN";
    document.getElementById("chatStatus").innerHTML=chatStatus;
    $( "#chat-btn" ).addClass( "btn-open" );
    $( "#chatStatus" ).addClass( "btn-status-open" );
    var hoursOnDay = chatHours[dayEST];
    todayHours = "Today's Hours: " + days[dayEST] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("chatStatus").innerHTML=chatStatus;
    document.getElementById("chat-hours").innerHTML=todayHours;
};

function chatClosed(){
    chatStatus="CLOSED";
    document.getElementById("chatStatus").innerHTML=chatStatus;
    $( "#chat-btn" ).addClass( "btn-closed" );
    $( "#chatStatus" ).addClass( "btn-status-closed" );
    var nextDay = dayEST+1;
    var hoursOnDay = chatHours[nextDay];
    nextHours = "Tomorrow's Hours: " + days[nextDay] + " " + hoursOnDay;
    console.log("Next day is " + nextDay);
    console.log(nextHours);
    document.getElementById("chatStatus").innerHTML=chatStatus;
    document.getElementById("chat-hours").innerHTML=nextHours;
};





