/* CTA Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelectorAll('.cta-block').length){

        //On button click - fetch and display a Joke
        var fetchButton = document.getElementById('fetchBtn');
        fetchButton.addEventListener('click', function(e) {
           e.preventDefault();
            fetchmeajoke();
        })

        function fetchmeajoke(){
            var httpRequest = new XMLHttpRequest()
            httpRequest.onreadystatechange = function (data) {
                // code
                console.log(data.srcElement.response);
                var outputjoke = JSON.parse(data.srcElement.response);
                document.getElementById('joke').innerHTML = JSON.stringify(outputjoke.value.joke);
            }
            httpRequest.open('GET', '//api.icndb.com/jokes/random');
            httpRequest.send();

        }
}
});
