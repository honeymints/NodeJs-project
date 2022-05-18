fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": '02092b81e5mshc30a15bbdc1c1ebp152885jsnf05f3e5e6881'
    }
})
    .then(response => response.json())
    .then(response => {
        console.log(response);

        document.getElementById('quote').innerHTML = response.content;
        document.getElementById('author').innerHTML = '- ' + response.originator.name + ' -';
    })
    .catch(err => {
        console.log(err);
    });

