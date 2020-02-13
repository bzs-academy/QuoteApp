
// function to load data of quotes
async function loadQuotes (param = '') {
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.json();
    //console.log(data);
    if (param) { 
        var quote = data.filter( item => item.text.includes(param));
    } else {
        var quote = data;
    }
    var randomIndex = Math.floor(Math.random() * quote.length);
    //console.log(randomIndex);
    //console.log(quote[randomIndex]);
    return quote[randomIndex];
}


// function to load images
async function loadImage (topic = "quote") {

    const response = await fetch(`https://pixabay.com/api/?key=12812971-b31ea9555a74a40ec0876045c&q=${topic}&image_type=photo&pretty=true`);
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    var randomIndex = Math.floor(Math.random() * data['hits'].length);
    var image = data['hits'][randomIndex].webformatURL;
    //console.log(image);
    return image;

}



$(document).ready( () => {

    // body background
    $('body').css({ "background-image": "url('bg.jpg')",
                    "background-position": "center top",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"})


    // random button 
    $('#random').click( async () => {

        var soz = await loadQuotes();
        var image = await loadImage();

        $('#text').text(soz.text);
        $('#author').text(soz.author);
        $('#imgQuote').attr('src', image);
    })

    // button with topic
    $('#topic').click( async () => {

        var topic = $('#inputTopic').val();
        console.log('topic ', topic);

        var soz = await loadQuotes(topic);
        var image = await loadImage(topic);
    
        $('#text').text(soz.text);
        $('#author').text(soz.author);
        $('#imgQuote').attr('src', image);

        $('#inputTopic').val('');
    })


    
})