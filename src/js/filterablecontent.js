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
        function fadeIn(el) {
            el.style.opacity = 0;

            var last = +new Date();
            var tick = function() {
                el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
                last = +new Date();

                if (+el.style.opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            };

            tick();
        }

        function showHideMedia(mediaItems,controlClass){

            [].forEach.call(mediaItems, mediaItem => {
                mediaItem.addEventListener('change', evt => {
                    const { value } = evt.target;
                    console.log("FILTER VALUE");
                    console.log({ value });
                    const filtercontrols = document.querySelectorAll(`${controlClass}:checked`);
                    if (filtercontrols.length > 0) {
                        var mediaListItems = document.querySelectorAll('.contents-list li');
                        [].forEach.call(mediaListItems, mediaListItem => {
                            //product.style.opacity = '0';
                            mediaListItem.classList.add('content-item-hidden');
                        });
                        [].forEach.call(filtercontrols, filtercontrol => {
                            const matchingItems = document.querySelectorAll(`.contents-list li[data-filter*="${value}"]`);
                            [].forEach.call(matchingItems, matchingItem => {
                                //fadeIn(matchingProduct);
                                matchingItem.classList.remove('content-item-hidden');
                            });
                        });
                    } else {
                        const matchingItems = document.querySelectorAll(`.contents-list li`);
                        [].forEach.call(matchingItems, matchingItem => {
                            //fadeIn(productItem);
                            matchingItem.classList.remove('content-item-hidden');
                        });
                    }
                });
            });
        }
        //By Genre and Year - Dropdowns
        const checkboxClass = '.filter-list';
        const checkboxes = document.querySelectorAll(checkboxClass);
        showHideMedia(checkboxes,checkboxClass);

        //By Type - Radiobuttons
        const radiobtnClass = '.filter-radio';
        const radiobtns = document.querySelectorAll(radiobtnClass);
        showHideMedia(radiobtns,radiobtnClass);
    }
})
