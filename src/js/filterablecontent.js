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
                    const dataFilter = mediaItem.dataset.filter;
                    const filterType = mediaItem.getAttribute('class');
                    const filtercontrols = document.querySelectorAll(`${controlClass}:checked`);
                    const filterParentControl = document.getElementById('contentsParent');

                    if(!filterParentControl.classList.contains('filteringOn')){
                        filterParentControl.classList.add('filteringOn');
                    }

                    var contents1 = document.querySelectorAll(`.contents-list li[data-filter*="${mediaItem.value}"]`);
                    [].forEach.call(contents1,content1=>{
                        console.log("CONTENT1");
                        console.log(content1);

                        toggleClass(content1,'checked');
                        createResultsMessage({ value });
                    });
                    if(mediaItem.checked) {
                        // console.log("CHECKING");
                        // console.log(mediaItem);
                        createFilterBadges(mediaItem.value, mediaItem.dataset.filter, mediaItem.getAttribute('class'));
                    }
                    else{
                        var badgesParent = document.querySelector('.selected-filters');
                        var selectedBadgeToRemove = document.querySelector(`.selected-filters span[value="${mediaItem.value}"]`);
                        console.log("YOOOO");
                        console.log("UNCHECKING");
                        console.log(mediaItem.value);
                        console.log(selectedBadgeToRemove);
                        //console.log(selectedBadgeToRemove.innerHTML);
                        if(selectedBadgeToRemove != null) {
                            removeFilterContent(badgesParent, selectedBadgeToRemove);
                        }
                    }

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
                var selectedBadgesParent = document.querySelector('.selected-filters');

                //Create new Badge
                var filterBadge = document.createElement('span');
                //Add attributes
                filterBadge.classList.add('badge','checked');
                filterBadge.setAttribute('data-filter', selectedFilterAtt);
                filterBadge.setAttribute('data-control', selectedFilterType);
                filterBadge.setAttribute('value', selectedFilter);
                filterBadge.innerHTML = selectedFilter;

                if(selectedBadgesParent.children.length){
                    var childBadges = document.querySelector(`.selected-filters span[value="${selectedFilter}"]`);

                    if(childBadges != null) {
                        //console.log('BADGE EXISTS');
                        return false;
                    }
                }
                //Insert new Badge
                selectedBadgesParent.insertBefore(filterBadge, selectedBadgesParent.firstChild);

                //Click event to each selected Filter Badge\
                filterBadge.addEventListener('click', event => {
                    const badge = event.target;
                    console.log('this');
                    console.log(event.target);

                    removeFilterContent(selectedBadgesParent, event.target);
                    var dataFilterAttribute = badge.dataset.filter;
                    var filterControlType = badge.dataset.control;
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
            console.log("REMOVING");
            console.log(selectedFilter);
            var mediaListItems = document.querySelectorAll(`.contents-list li[data-filter*="${selectedFilter.innerHTML}"]`);
            [].forEach.call(mediaListItems, mediaListItem => {
                //console.log(mediaListItem);
                if(mediaListItem.classList.contains('checked')){
                    mediaListItem.classList.remove('checked');
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
