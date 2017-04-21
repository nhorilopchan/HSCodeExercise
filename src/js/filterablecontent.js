/* Filterable Content */

document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelectorAll('.filterable-content-block').length){
        //Adds search icon to the search input field
        document.addEventListener('click', function() {
            //Hide the dropdownlist on click outside the input box
            if(document.querySelector('.search-list').classList.contains('active')){
                document.querySelector('.search-list').classList.remove("active");
            }
        });
        var searchinputel = document.getElementById('search-input');
        var eldiv = document.createElement('div');
        searchinputel.insertBefore(eldiv,searchinputel.firstChild);
        eldiv.className += " search icon";

        //Search By Title - Autocomplete
        var searchinput = document.querySelector('#search-input');
        var items = document.querySelector('.search-list').getElementsByTagName('li');

        searchinput.addEventListener('keyup', function(evt) {
            var text = evt.target.value;
            var pat = new RegExp(text, 'i');
            document.querySelector('.search-list').className+=" active";
            //If input field is empty, hide the list
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

        //Dropdowns
        const filters = document.querySelectorAll('.filter-list');
        const media = document.querySelectorAll('.contents-list li');

        [].forEach.call(filters, filter =>{
            filter.addEventListener('change',evt => {
                var filterType = evt.target.getAttribute('data-filter');
                const { value } = evt.target;
                console.log(value);
                console.log(filterType,value);
                // TODO - check for checked/unchecked push in an array
                // filter.checked


                if(filterType==="year") {
                    var hiddenMedia = document.querySelectorAll(`.contents-list li:not([data-year='${value}'])`);
                    console.log(hiddenMedia);
                    [].forEach.call(hiddenMedia,(item)=>{
                        item.classList.add('content-item-hidden');
                    });
                }
                else{
                    var hiddenMedia = document.querySelectorAll(`.contents-list li:not([data-genres*='${value}'])`);
                    console.log(hiddenMedia);
                    [].forEach.call(hiddenMedia,(item)=>{
                        item.classList.add('content-item-hidden');
                    });
                }
            });
        });

    }
})
