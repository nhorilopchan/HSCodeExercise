/* Filterable Content */

document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelectorAll('.filterable-content-block').length){

        //Adds search icon to the search input field
        document.addEventListener('click', (evt) => {
            console.log('click');
            if(document.querySelector('.search-list').classList.contains('active')){
                document.querySelector('.search-list').classList.remove("active");
            }
        });
        var searchinputel = document.getElementById('search-input');
        var eldiv = document.createElement('div');
        searchinputel.insertBefore(eldiv,searchinputel.firstChild);
        eldiv.className += " search icon";

        //Search By Title
        var searchinput = document.querySelector('#search-input');
        var items = document.querySelector('.search-list').getElementsByTagName('li');

        searchinput.addEventListener('keyup', function(ev) {
            var text = ev.target.value;
            var pat = new RegExp(text, 'i');
            document.querySelector('.search-list').className+=" active";
            if(text.length<1){
                if(document.querySelector('.search-list').classList.contains('active')){
                    document.querySelector('.search-list').classList.remove("active");
                }
            }
            for (var i=0; i < items.length; i++) {
                var item = items[i];
                if (pat.test(item.innerText)) {
                    item.className = item.className.replace(/\s+?hidden/,'');
                }
                else {
                    item.className = item.className + ' hidden';
                }
            }
        });
    }
})
