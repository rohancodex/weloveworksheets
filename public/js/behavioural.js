let params = new URLSearchParams(document.location.search.substring(1));
let behaviouralpayment_id = params.get("payment_id");

let behaviour1 = localStorage.getItem('behaviour_iep1');
let behaviour2 = localStorage.getItem('behaviour_iep2');
if(behaviour1==="false" && behaviour2==="false"){
    location.href = '/iep';
}

if (!behaviouralpayment_id) {
    location.href = '/iep';
}

else {

    let behaviour_iep1 = localStorage.getItem('behaviour_iep1');

    if (typeof behaviour_iep1 === "undefined") {
        localStorage.setItem('behaviour_iep1', "true");
        localStorage.setItem('behaviour_iep2', "true");

    }

    let previous_id = localStorage.getItem('behaviouralpayment_id');

    if (previous_id !== behaviouralpayment_id) {
        localStorage.setItem('behaviour_iep1', "true");
        localStorage.setItem('behaviour_iep2', "true");
        
    }

    localStorage.setItem('behaviouralpayment_id', behaviouralpayment_id);


    let behaviour1 = localStorage.getItem('behaviour_iep1');
    let behaviour2 = localStorage.getItem('behaviour_iep2');

    if (behaviour1 === "false") {
        $(".behaviour1green").addClass("visually-hidden");
        $(".behaviour1red").removeClass("visually-hidden");
        $("#behaviour1link").attr("href", "#");
    }
    if (behaviour2 === "false") {
        $(".behaviour2green").addClass("visually-hidden");
        $(".behaviour2red").removeClass("visually-hidden");
        $("#behaviour2link").attr("href", "#");
    }
}