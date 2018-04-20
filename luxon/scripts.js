$(document).ready(function(){
    hoursOfOperation();
  });

//Arrays for days and phone/chat hours

const phoneHours = ["7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-6pm ET","Closed","2pm-7pm ET"];
const chatHours = ["8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","Closed","Closed"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


//Sets alias for DateTime to use luxon
var DateTime = luxon.DateTime;

//Sets DateTimeET for Eastern time & gets day & hour
var DateTimeHere = DateTime.local();
var DateTimeET = DateTime.fromObject({zone: 'America/New_York'});


    //Test a different date/time
    // var DateTimeET =  DateTime.local(2018, 4, 21, 15, 00);

var dayET = DateTimeET.weekday;
var hourET = DateTimeET.hour;

var dayHere = DateTimeHere.weekday;
var hourHere = DateTimeHere.hour;


console.log("The browser day is " + dayHere + " and the browser hour is " + hourHere);
console.log("The ET day is " + dayET + " and the ET hour is " + hourET);


// $('#form-datetime').submit(function () {
//     DateTimeET = document.getElementById("form-datetime").value;
//     dayET = DateTimeET.weekday;
//     hourET = DateTimeET.hour;
//     hoursOfOperation();
//     return false;
//    });

//This function determines what styling to give and what hours to display based on the current time in ET.
    //If open, displays Today's Hours
    //If closed and PRIOR TO opening hour, display Today's Hours
    //If closed and AFTER closing hour, display Tomorrow's Hours

function hoursOfOperation(){

    if (dayET>0 && dayET<6 && hourET>7 && hourET<17){
        chatOpen();
        todayChatHours();
    }
    else if (dayET>0 && dayET<6 && hourET<=7){
        chatClosed();
        todayChatHours();
    }
    else if (dayET>0 && dayET<6 && hourET>=17){
        chatClosed();
        tomorrowChatHours();
    }
    else{
        chatClosed();
        tomorrowChatHours();
    }

    if (dayET>0 && dayET<6 && hourET>6 && hourET<19){
        phoneOpen();
        todayPhoneHours();
    }
    else if (dayET>0 && dayET<6 && hourET<=6){
        phoneClosed();
        todayPhoneHours();
    }
    else if (dayET>0 && dayET<6 && hourET>=19){
        phoneClosed();
        tomorrowPhoneHours();
    }
    else if (dayET===6){
        phoneClosed();
        tomorrowPhoneHours();
    }
    else if (dayET===7 && hourET>1 && hourET<19){
        phoneOpen();
        todayPhoneHours();
    }
    else if (dayET===7 && hourET<=1){
        phoneClosed();
        todayPhoneHours();
    }
    else{
        phoneClosed();
        tomorrowPhoneHours();
    }
}


//Generates today's hours or tomorrow's hours based on logic above

function tomorrowPhoneHours(){
    var nextDay = (dayET === 7) ? 1 : dayET+1;
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
    var nextDay = (dayET ===7) ? 1 : dayET+1;
    var hoursOnDay = chatHours[nextDay-1];
    nextHours = "Tomorrow's Hours: " + days[nextDay-1] + " " + hoursOnDay;
    console.log("Next day is " + nextDay);
    console.log(nextHours);
    document.getElementById("chat-hours").innerHTML=nextHours;
}

//Updates css based on open/closed status from logic above

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





