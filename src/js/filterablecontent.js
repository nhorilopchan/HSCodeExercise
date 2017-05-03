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
                    const dataFilter = mediaItem.getAttribute('data-filter');
                    const filterType = mediaItem.getAttribute('class');
                    console.log(filterType);
                    console.log({ value });
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
                    createFilterBadges(mediaItem.value, dataFilter, filterType);
                });
            });
        }

        //Create Result Message
        function createResultsMessage(selectedFilter){
            var resultsLabel = document.querySelector('.results-message');
            var totalSearchItems = document.querySelectorAll('.contents-list li:not(.content-item-hidden)').length;
            resultsLabel.innerHTML = `Displaying ${totalSearchItems} of ${totalSearchItems}`;
        }

        //Filter Badges
        function createFilterBadges(selectedFilter, selectedFilterAtt,selectedFilterType) {
            if (selectedFilter != undefined) {
                var filterBadge = document.createElement('span');
                filterBadge.classList.add('badge');
                filterBadge.setAttribute('data-filter', selectedFilterAtt);
                filterBadge.setAttribute('data-control', selectedFilterType);
                filterBadge.setAttribute('value', selectedFilter);
                filterBadge.innerHTML = selectedFilter;
                var selectedFiltersBadges = document.querySelector('.selected-filters');
                selectedFiltersBadges.insertBefore(filterBadge, selectedFiltersBadges.firstChild);

                //Click event to each selected Filter Badge\
                filterBadge.addEventListener('click', event => {
                    const badge = event.target;
                    console.log('this');
                    console.log(event.target);

                    removeFilterContent(selectedFiltersBadges, event.target);
                    var dataFilterAttribute = badge.getAttribute('data-filter');
                    var filterControlType = badge.getAttribute('data-control');
                    clearSelectedFilters(dataFilterAttribute,event.target,filterControlType);
                });
            }
        }

        //By Genre and Year - Dropdowns
        const checkboxClass = '.filter-list';
        const checkboxes = document.querySelectorAll(checkboxClass);
        showHideMedia(checkboxes,checkboxClass);

        //By Type - Radiobuttons
        const radiobtnClass = '.filter-radio';
        const radiobtns = document.querySelectorAll(radiobtnClass);
        showHideMedia(radiobtns,radiobtnClass);

        //Remove Filters from Content
        function removeFilterContent(filtersBadges,selectedFilter){
            //Remove selected Filter from Content Lists
            var mediaListItems = document.querySelectorAll(`.contents-list li:not([data-filter*="${selectedFilter.innerHTML}"])`);
            [].forEach.call(mediaListItems, mediaListItem => {
                if(mediaListItem.classList.contains('content-item-hidden')){
                    mediaListItem.classList.remove('content-item-hidden');
                }
            });
            filtersBadges.removeChild(selectedFilter);
            createResultsMessage(selectedFilter.innerHTML);
        }

        //Clear all Filter Controls
        //Checkboxes
        function clearSelectedFilters(dataFilterAtt,currControl,filterType) {
            var controls =  document.querySelectorAll(`.${filterType}[data-filter*="${dataFilterAtt}"][value="${currControl.innerHTML}"]`);
            console.log(controls);
                [].forEach.call(controls, (control) => {
                    control.checked = false;
                });

        }
        //Clear ALL Filters
        function clearAllFilters(controls){
            console.log(controls);
            [].forEach.call(controls, currcontrol=>{
                console.log(controls);
                [].forEach.call(currcontrol,control=>{
                    control.checked = false;
                });
            });
        }
        //Search Results Info
        createResultsMessage();
        //Clear All Filters Button Click
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
            //Clear All Filters
            //CheckBoxes
            var checkBoxes = document.querySelectorAll('.filter-list:checked');
            //Radiobuttons
            var radioButtons = document.querySelectorAll('.filter-radio:checked');
            clearAllFilters([checkBoxes,radioButtons]);

            //Reset Total Items Message
            createResultsMessage();
        });
    }
})
