// $(document).ready(function(){
//     Date.toTZString();
//   });

//Variables and arrays for hoursOfOperation() function

const phoneHours = ["7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-7pm ET","7am-6pm ET","Closed","2pm-7pm ET"];
const chatHours = ["8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","8am-5pm ET","Closed","Closed"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


//DETERMINE OPEN/CLOSED STATUS BASED ON UTC > SERVER TIME (COMPATIBLE WITH IE)

Date.toTZString= function(d, tzp) {
	var short_months= ['January', 'February', 'March', 'April', 'May','June', 'July','August', 'September', 'October', 'November', 'December'];
	var h, m, pm= 'pm', off, label, str,
	d= d? new Date(d):new Date();

	var tz={
	AK:['Alaska', -540],
	A:['Atlantic', -240],
	C:['Central', -360],
	E:['Eastern', -300],
	HA:['Hawaii-Aleutian', -600],
	M:['Mountain', -420],
	N:['Newfoundland', -210],
	P:['Pacific', -480]
	}[tzp.toUpperCase()];

	//get the selected offset from the object:
	if(!tz) return d.toUTCString();
	off= tz[1];

	//get the start and end dates for dst:(these rules are US only)
	var     y= d.getUTCFullYear(), countstart= 8, countend= 1,
	dstart= new Date(Date.UTC(y, 2, 8, 2, 0, 0, 0)),
	dend= new Date(Date.UTC(y, 10, 1, 2, 0, 0, 0));
	while(dstart.getUTCDay()!== 0) dstart.setUTCDate(++countstart);
	while(dend.getUTCDay()!== 0) dend.setUTCDate(++countend);

	//get the GMT time for the localized dst start and end times:
	dstart.setUTCMinutes(off);
	dend.setUTCMinutes(off);

	// if the date passed in is between dst start and dst end, adjust the offset and label:
	if(dstart<= d && dend>= d){
	off+= 60;
	label= tzp+'dt';
	}
	else label= tzp+'st';

	//add the adjusted offset to the date and get the hours and minutes:
	d.setUTCMinutes(d.getUTCMinutes()+off);
	h= d.getUTCHours();
	m= d.getUTCMinutes();
	if(m<10) m= '0'+m;

	//return a string:
	var str= short_months[d.getUTCMonth()]+' '+d.getUTCDate()+', '+d.getUTCFullYear()+' ';
	return str+ h+':'+m;
}

var st = new Date().toUTCString();
var date = Date.toTZString(st, 'E');
var servertime = new Date(date).getHours();
var serverday = new Date(date).getDay();

//Test
// servertime = 12;
// serverday = 7;

console.log("The ET day is " + serverday + " and the ET hour is " + servertime);


if (serverday>0 && serverday<6 && servertime>7 && servertime<17){
        chatOpen();
        todayChatHours();
    }
    else if (serverday>0 && serverday<6 && servertime<=7){
        chatClosed();
        todayChatHours();
    }
    else if (serverday>0 && serverday<6 && servertime>=17){
        chatClosed();
        tomorrowChatHours();
    }
    else{
        chatClosed();
        tomorrowChatHours();
    }

if (serverday>0 && serverday<6 && servertime>6 && servertime<19){
        phoneOpen();
        todayPhoneHours();
        console.log("Option 1");
    }
    else if (serverday>0 && serverday<6 && servertime<=6){
        phoneClosed();
        todayPhoneHours();
        console.log("Option 2");
    }
    else if (serverday>0 && serverday<6 && servertime>=19){
        phoneClosed();
        tomorrowPhoneHours();
        console.log("Option 3");
    }
    else if (serverday===6){
        phoneClosed();
        tomorrowPhoneHours();
        console.log("Option 4");
    }
    else if (serverday===7 && servertime>13 && servertime<19){
        phoneOpen();
        todayPhoneHours();
        console.log("Option 5");
    }
    else if (serverday===7 && servertime<=13){
        phoneClosed();
        todayPhoneHours();
        console.log("Option 6");
    }
    else{
        phoneClosed();
        tomorrowPhoneHours();
        console.log("Option 7");
    }

// //DISPLAY TODAY OR TOMORROW HOURS USING LUXON TIMEZONE (NOT COMPATIBLE WITH IE)

// //This function determines what styling to give and what hours to display based on the current time in ET.
//     //If open, displays Today's Hours
//     //If closed and PRIOR TO opening hour, display Today's Hours
//     //If closed and AFTER closing hour, display Tomorrow's Hours

// function hoursOfOperation(){

//     if (serverday>0 && serverday<6 && servertime>7 && servertime<17){
//         // chatOpen();
//         todayChatHours();
//     }
//     else if (serverday>0 && serverday<6 && servertime<=7){
//         // chatClosed();
//         todayChatHours();
//     }
//     else if (serverday>0 && serverday<6 && servertime>=17){
//         // chatClosed();
//         tomorrowChatHours();
//     }
//     else{
//         // chatClosed();
//         tomorrowChatHours();
//     }

//     if (serverday>0 && serverday<6 && servertime>6 && servertime<19){
//         // phoneOpen();
//         todayPhoneHours();
//     }
//     else if (serverday>0 && serverday<6 && servertime<=6){
//         // phoneClosed();
//         todayPhoneHours();
//     }
//     else if (serverday>0 && serverday<6 && servertime>=19){
//         // phoneClosed();
//         tomorrowPhoneHours();
//     }
//     else if (serverday===6){
//         // phoneClosed();
//         tomorrowPhoneHours();
//     }
//     else if (serverday===7 && servertime>1 && servertime<19){
//         // phoneOpen();
//         todayPhoneHours();
//     }
//     else if (serverday===7 && servertime<=1){
//         // phoneClosed();
//         todayPhoneHours();
//     }
//     else{
//         // phoneClosed();
//         tomorrowPhoneHours();
//     }
// }


//Generates today's hours or tomorrow's hours based on logic above

function tomorrowPhoneHours(){
    var nextDay = (serverday === 7) ? 1 : serverday+1;
    var hoursOnDay = phoneHours[nextDay-1];
    nextHours = "Tomorrow's Hours: " + days[nextDay-1] + " " + hoursOnDay;
    console.log("Next day is " + nextDay);
    console.log(nextHours);
    document.getElementById("phone-hours").innerHTML=nextHours;

}

function todayPhoneHours(){
    var hoursOnDay = phoneHours[serverday-1];
    todayHours = "Today's Hours: " + days[serverday-1] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("phone-hours").innerHTML=todayHours;
}

function todayChatHours(){
    var hoursOnDay = chatHours[serverday-1];
    todayHours = "Today's Hours: " + days[serverday-1] + " " + hoursOnDay;
    console.log(todayHours);
    document.getElementById("chat-hours").innerHTML=todayHours;
}

function tomorrowChatHours(){
    var nextDay = (serverday ===7) ? 1 : serverday+1;
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

///////////////////////////////////////////////////////////////////////////////////

// $('#form-datetime').submit(function () {
//     DateTimeET = document.getElementById("form-datetime").value;
//     serverday = DateTimeET.weekday;
//     servertime = DateTimeET.hour;
//     hoursOfOperation();
//     return false;
//    });



