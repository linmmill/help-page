$(document).ready(function(){
    hoursOfOperation();
  });

const phoneHours = ["7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-6pm ET","Closed","2pm-7pm ET"];
const chatHours = ["8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","Closed","Closed"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var DateTime = luxon.DateTime;
var DateTimeEST = DateTime.fromObject({zone: 'America/New_York'});
// Test Closed Text
// var DateTimeEST =  DateTime.local(2018, 4, 22, 15, 00);
var dayET = DateTimeEST.weekday;
var hourEST = DateTimeEST.hour;
console.log("The ET day is " + dayET + " and the ET hour is " + hourEST);


function hoursOfOperation(){

    if (dayET>0 && dayET<6 && hourEST>7 && hourEST<17){
        chatOpen();
        todayChatHours();
    }
    else if (dayET>0 && dayET<6 && hourEST<=7){
        chatClosed();
        todayChatHours();
    }
    else if (dayET>0 && dayET<6 && hourEST>=17){
        chatClosed();
        tomorrowChatHours();
    }
    else{
        chatClosed();
        tomorrowChatHours();
    }

    if (dayET>0 && dayET<6 && hourEST>6 && hourEST<19){
        phoneOpen();
        todayPhoneHours();
    }
    else if (dayET>0 && dayET<6 && hourEST<=6){
        phoneClosed();
        todayPhoneHours();
    }
    else if (dayET>0 && dayET<6 && hourEST>=19){
        phoneClosed();
        tomorrowPhoneHours();
    }
    else if (dayET===6 && hourEST>6 && hourEST<18){
        phoneOpen();
        todayPhoneHours();
    }
    else if (dayET===6 && hourEST<=6){
        phoneClosed();
        todayPhoneHours();
    }
    else if (dayET===6 && hourEST>=18){
        phoneClosed();
        tomorrowPhoneHours();
    }
    else if (dayET===7 && hourEST>1 && hourEST<19){
        phoneOpen();
        todayPhoneHours();
    }
    else if (dayET===7 && hourEST<=1){
        phoneClosed();
        todayPhoneHours();
    }
    else{
        phoneClosed();
        tomorrowPhoneHours();
    }
}


function tomorrowPhoneHours(){
    var nextDay = (dayET === 7) ? 1 : dayET;
    var hoursOnDay = phoneHours[nextDay-1];
    nextHours = "Tomorrow's Hours: " + days[nextDay-1] + " " + hoursOnDay;
    console.log("Next day is " + nextDay);
    console.log(nextHours);
    document.getElementById("phone-hours").innerHTML=nextHours;

}

function todayPhoneHours(){
    var hoursOnDay = phoneHours[dayET-1];
    todayHours = "Today's Hours: " + days[dayET-1] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("phone-hours").innerHTML=todayHours;
}

function todayChatHours(){
    var hoursOnDay = chatHours[dayET-1];
    todayHours = "Today's Hours: " + days[dayET-1] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("chat-hours").innerHTML=todayHours;
}

function tomorrowChatHours(){
    var nextDay = (dayET ===7) ? 1 : dayET;
    var hoursOnDay = chatHours[nextDay-1];
    nextHours = "Tomorrow's Hours: " + days[nextDay-1] + " " + hoursOnDay;
    console.log("Next day is " + nextDay);
    console.log(nextHours);
    document.getElementById("chat-hours").innerHTML=nextHours;
}

function phoneClosed(){
    phoneStatus="CLOSED";
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    $( "#phone-btn" ).addClass( "btn-closed" );
    $( "#phoneStatus" ).addClass( "btn-status-closed" );
};

function phoneOpen(){
    phoneStatus="OPEN";
    document.getElementById("phoneStatus").innerHTML=phoneStatus;
    $( "#phone-btn" ).addClass( "btn-open" );
    $( "#phoneStatus" ).addClass( "btn-status-open" );
};

function chatOpen(){
    chatStatus="OPEN";
    document.getElementById("chatStatus").innerHTML=chatStatus;
    $( "#chat-btn" ).addClass( "btn-open" );
    $( "#chatStatus" ).addClass( "btn-status-open" );
};

function chatClosed(){
    chatStatus="CLOSED";
    document.getElementById("chatStatus").innerHTML=chatStatus;
    $( "#chat-btn" ).addClass( "btn-closed" );
    $( "#chatStatus" ).addClass( "btn-status-closed" );

};





