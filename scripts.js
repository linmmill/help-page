window.onload = function() {

// Assign current time to a variable
const now = new Date();
// const now = new Date("2018-02-25T15:00:00");
contactStatus = "unknown";

console.log(now);


if (
    (now.getDay()>0 && now.getDay()<6) &&
    (now.getUTCHours()>=12 && now.getUTCHours()<21)
    ){
    chatStatus="OPEN";
} else {
    chatStatus="CLOSED";
}

console.log(chatStatus);

if (
    (now.getDay()>0 && now.getDay()<5) &&
    (now.getUTCHours()>=11 && now.getUTCHours()<23)
    ){
    phoneStatus="OPEN";

} else if(now.getDay()===0 && now.getUTCHours()>=18 && now.getUTCHours()<23){
    phoneStatus="OPEN";
} else if(
    (now.getDay()===5) &&
    (now.getUTCHours()>=11 && now.getUTCHours()<22)
    ){
    phoneStatus="OPEN";

} else {
    phoneStatus="CLOSED";
}

console.log(phoneStatus);

document.getElementById("chatStatus").innerHTML=chatStatus;
document.getElementById("phoneStatus").innerHTML=phoneStatus;

}

