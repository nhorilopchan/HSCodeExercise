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

        //Search By Genre/Year Toggle on click
        var toggleControls = document.querySelectorAll('.toggle');
        [].forEach.call(toggleControls,toggleControl => {
            toggleControl.addEventListener('click',evt=>{
                const el = evt.target;
                //Toggle CssClass on controls
                toggleClass(el,'expanded');
                var next = el.nextElementSibling;
                //Toggle CssClass on Dropdowns
                toggleClass(next,'show');
            });
        });
        //Search By Title - Autocomplete
        var searchinput = document.querySelector('#search-input');
        var items = document.querySelector('.search-list').getElementsByTagName('li');
        searchinput.addEventListener('keyup', function(evt) {
            const { value } = evt.target;
            var pat = new RegExp(value, 'i');
            var searchList = document.querySelector('.search-list');
            if(!searchList.classList.contains('active')) {
                searchList.classList.add('active');
            }
            //If input field is empty, hide the list
            if(value.length < 1){
                if(document.querySelector('.search-list').className.contains('active')){
                    document.querySelector('.search-list').className.replace(/\s+?active/, '');
                }
            }
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (pat.test(item.innerText)) {
                    item.className = item.className.replace(/\s+?hidden/, '');
                }
                else if(!item.classList.contains('hidden')) {
                    item.className = item.className + ' hidden';
                }
            }
        });
        //Toggle CssClasses
        function toggleClass(control,className){
            if (control.classList) {
                control.classList.toggle(className);
            } else {
                var classes = control.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);
                else
                    classes.push(className);

                control.className = classes.join(' ');
            }
        }
        //Dropdowns
        function showHideMedia(mediaItems,controlClass){
            [].forEach.call(mediaItems, mediaItem => {
                mediaItem.addEventListener('change', evt => {
                    const { value } = evt.target;
                    console.log(mediaItem);
                    const filtercontrols = document.querySelectorAll(`${controlClass}:checked`);
                    if (filtercontrols.length > 0) {
                        var mediaListItems = document.querySelectorAll('.contents-list li');
                        [].forEach.call(mediaListItems, mediaListItem => {
                            mediaListItem.classList.add('content-item-hidden');
                        });
                        [].forEach.call(filtercontrols, filtercontrol => {
                            const matchingItems = document.querySelectorAll(`.contents-list li[data-filter*="${value}"]`);
                            [].forEach.call(matchingItems, matchingItem => {
                                matchingItem.classList.remove('content-item-hidden');
                            });
                        });
                    } else {
                        const matchingItems = document.querySelectorAll(`.contents-list li`);
                        [].forEach.call(matchingItems, matchingItem => {
                            matchingItem.classList.remove('content-item-hidden');
                        });
                    }
                    createResultsMessage(mediaItem.value);
                    createFilterBadges(mediaItem.value);
                });
            });
        }
        function createResultsMessage(selectedFilter){
            var resultsLabel = document.querySelector('.results-message');
            var totalSearchItems = document.querySelectorAll('.contents-list li:not(.content-item-hidden)').length;
            resultsLabel.innerHTML = `Displaying ${totalSearchItems} of ${totalSearchItems}`;

        }

        //Filter Badges
        function createFilterBadges(selectedFilter) {
            if (selectedFilter != undefined) {
                var filterBadge = document.createElement('span');
                filterBadge.classList.add('badge');
                filterBadge.setAttribute('data-filter', selectedFilter);
                filterBadge.setAttribute('vaue', selectedFilter);
                filterBadge.innerHTML = selectedFilter;
                var selectedFiltersBadges = document.querySelector('.selected-filters');
                selectedFiltersBadges.insertBefore(filterBadge, selectedFiltersBadges.firstChild);

                //Click event to each selected Filter Badge\
                filterBadge.addEventListener('click', event => {
                    const {value} = event.target;
                    removeFilter(selectedFiltersBadges, event.target);
                });
            }
        }
        //Remove Filters
        function removeFilter(filtersBadges,selectedFilter){
            // console.log("REMOVING");
            // console.log(selectedFilter);
            // console.log(filtersBadges);

            //Remove selected Filter
            var mediaListItems = document.querySelectorAll(`.contents-list li:not([data-filter*="${selectedFilter.innerHTML}"])`);
            [].forEach.call(mediaListItems, mediaListItem => {
                if(mediaListItem.classList.contains('content-item-hidden')){
                    mediaListItem.classList.remove('content-item-hidden');
                }
            });
            filtersBadges.removeChild(selectedFilter);
            createResultsMessage(selectedFilter.innerHTML);
        }
        //By Genre and Year - Dropdowns
        const checkboxClass = '.filter-list';
        const checkboxes = document.querySelectorAll(checkboxClass);
        showHideMedia(checkboxes,checkboxClass);

        //By Type - Radiobuttons
        const radiobtnClass = '.filter-radio';
        const radiobtns = document.querySelectorAll(radiobtnClass);
        showHideMedia(radiobtns,radiobtnClass);

        //Search Results Info
        createResultsMessage();
        //Clear All Filters
        var clearFilterButton = document.getElementById('clearfilters');
        clearFilterButton.addEventListener('click', evt => {
            evt.preventDefault();
            //Clear selected Filters Badges
            var selectedFilterBadges = document.querySelector('.selected-filters');
            selectedFilterBadges.innerHTML = " ";

            //Show all media items
            var mediaListItems = document.querySelectorAll('.contents-list li');
            [].forEach.call(mediaListItems, mediaListItem => {
                if(mediaListItem.classList.contains('content-item-hidden')){
                    mediaListItem.classList.remove('content-item-hidden');
                }
            });

            //Clear all Filter Controls
            //Checkboxes
            var checkBoxes = document.querySelectorAll('.filter-list:checked');
            [].forEach.call(checkBoxes,(checkBox)=>{
                checkBox.checked = false;
            });
            //Radiobuttons
            var radioButtons = document.querySelectorAll('.filter-radio:checked');
            [].forEach.call(radioButtons,(radioButton)=>{
                radioButton.checked = false;
            });
            //Reset Total Items Message
            createResultsMessage();
        });
    }
})
