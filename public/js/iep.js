let params = new URLSearchParams(document.location.search.substring(1));
let payment_id = params.get("payment_id");


if (!payment_id) {
    location.href = '/iep';
}

else {

    let academic_iep1 = localStorage.getItem('academic_iep1');

    if (typeof academic_iep1 === "undefined") {
        localStorage.setItem('academic_iep1', "true");
        localStorage.setItem('academic_iep2', "true");
        localStorage.setItem('academic_iep3', "true");
        localStorage.setItem('academic_iep4', "true");
        localStorage.setItem('academic_iep5', "true");
        localStorage.setItem('academic_iep6', "true");
        localStorage.setItem('academic_iep7', "true");
    }
    
    let previous_id = localStorage.getItem('payment_id');

    if (previous_id !== payment_id) {
        localStorage.setItem('academic_iep1', "true");
        localStorage.setItem('academic_iep2', "true");
        localStorage.setItem('academic_iep3', "true");
        localStorage.setItem('academic_iep4', "true");
        localStorage.setItem('academic_iep5', "true");
        localStorage.setItem('academic_iep6', "true");
        localStorage.setItem('academic_iep7', "true");
    }

    localStorage.setItem('payment_id', payment_id);

    
    let academic1 = localStorage.getItem('academic_iep1');
    let academic2 = localStorage.getItem('academic_iep2');
    let academic3 = localStorage.getItem('academic_iep3');
    let academic4 = localStorage.getItem('academic_iep4');
    let academic5 = localStorage.getItem('academic_iep5');
    let academic6 = localStorage.getItem('academic_iep6');
    let academic7 = localStorage.getItem('academic_iep7');

    

    if(academic1 === "false"){
        $(".academic1green").addClass("visually-hidden");
        $(".academic1red").removeClass("visually-hidden");
        $("#academic1link").attr("href","#");
    }


    if(academic2 === "false"){
        $(".academic2green").addClass("visually-hidden");
        $(".academic2red").removeClass("visually-hidden");
        $("#academic2link").attr("href","#");
    }


    if(academic3 === "false"){
        $(".academic3green").addClass("visually-hidden");
        $(".academic3red").removeClass("visually-hidden");
        $("#academic3link").attr("href","#");
    }


    if(academic4 === "false"){
        $(".academic4green").addClass("visually-hidden");
        $(".academic4red").removeClass("visually-hidden");
        $("#academic4link").attr("href","#");
    }


    if(academic5 === "false"){
        $(".academic5green").addClass("visually-hidden");
        $(".academic5red").removeClass("visually-hidden");
        $("#academic5link").attr("href","#");
    }


    if(academic6 === "false"){
        $(".academic6green").addClass("visually-hidden");
        $(".academic6red").removeClass("visually-hidden");
        $("#academic6link").attr("href","#")
    }


    if(academic7 === "false"){
        $(".academic7green").addClass("visually-hidden");
        $(".academic7red").removeClass("visually-hidden");
        $("#academic7link").attr("href","#");
    }

}
