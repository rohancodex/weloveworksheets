let student = document.getElementById('student');

var inputCorrect
var inputIncorrect



function url(val) {

    var url = window.location.search;
    var urlParams = new URLSearchParams(url);
    var typeid = urlParams.get('type');
    if (typeid !== null) {
        var post = url + '&sid=' + val;
        document.getElementById('response').action = post;
    }
}