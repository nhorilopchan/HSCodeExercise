/* index.js */

function dropdownClick() {

    var dropdownButtons = document.getElementsByClassName('dropdown');
    for (var z = 0; z < dropdownButtons.length; z++) {
        var elem = dropdownButtons[z];
        elem.onclick = function () {
            alert("hello");
            return false;
        };
    }
}
function init(){
    alert('hi');
    dropdownClick();
}


