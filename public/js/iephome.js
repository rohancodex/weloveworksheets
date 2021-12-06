let academic1 = localStorage.getItem('academic_iep1');
let academic2 = localStorage.getItem('academic_iep2');
let academic3 = localStorage.getItem('academic_iep3');
let academic4 = localStorage.getItem('academic_iep4');
let academic5 = localStorage.getItem('academic_iep5');
let academic6 = localStorage.getItem('academic_iep6');
let academic7 = localStorage.getItem('academic_iep7');

let payment_id = localStorage.getItem('payment_id');
const url = "/iep/iep-dashboard?payment_id="+payment_id;
function academic(){
    location.href = url;
}
if(academic1==="true"||academic2==="true"||academic3==="true"||academic4==="true"||academic5==="true"||academic6==="true"||academic7==="true"){
    $("#academicbuy").addClass('visually-hidden');
    $("#academiclink").removeClass('visually-hidden');
}

//behavioural logic
let behaviouralpayment_id = localStorage.getItem('behaviouralpayment_id');
let behaviour1 = localStorage.getItem('behaviour_iep1');
let behaviour2 = localStorage.getItem('behaviour_iep2');

const url2 = "/iep/behavioural-dashboard?payment_id="+behaviouralpayment_id;
function behaviour(){
    location.href = url2;
}


if(behaviour1==="true"||behaviour2==="true"){
    $("#behaviourbuy").addClass('visually-hidden');
    $("#behaviourlink").removeClass('visually-hidden');
}