// Create an array of strings and save it to var topics
var topics = ["Mariah Carey", "Celine Dion", "TLC", "Shania Twain", "Destiny's Child"];

// displayInfo function re-renders the HTML to display the content
function displayInfo() {
    
    var diva = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + diva + "&apikey=TiuypDCuycKCSwwqsmsxXuDBF8c0WISy&limit=10&rating=pg";


    // Creating an AJAX call for the specific diva button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response) {

        console.log(response);

        // storing the data from the AJAX request in the results variable
        var results = response.data; 
        
        console.log(results);
        
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var divasDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var divasImage = $("<img>");

            // Setting the src attribute of the image to a property pulled off the result item
            divasImage.attr("src", results[i].images.fixed_height_still.url);

            //Setting more attributes for animation function later ...
            
            //Animate
            divasImage.attr("data-animate", results[i].images.fixed_height.url);
            divasImage.attr("data-state", "animate");
            //Still
            divasImage.attr("data-state", "still");
            divasImage.attr("data-still", results[i].images.fixed_height_still.url);
            
            // Appending the paragraph and image tag to divasDiv
            divasDiv.append(p);
            divasDiv.append(divasImage);

            // Prependng the divasDiv to the html in the "#divas-view" div
            $("#divas-view").prepend(divasDiv);
        }
        
        
        //Animating the Gif
        $("img").on("click", function() {
            
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate"); } 
            
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

    })

}


// Function for displaying diva data
function renderButtons() {

    // Deleting the divas prior to adding new divas
    $("#buttons-view").empty();

    // Looping through the topics array
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each diva in the array
      var a = $("<button>");
      // Adding a class of diva-btn to our button
      a.addClass("diva-btn");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }





  // Function for when a diva button is clicked
  $("#add-divas").on("click", function(event) {
    
    event.preventDefault();

    // This line grabs the input from the textbox
    var diva = $("#divas-input").val().trim();

    // Adding a diva from the textbox to the topics array
    topics.push(diva);

    // Calling renderButtons which handles the processing of the topics array
    renderButtons();
  });


  // Adding a click event listener to all elements with a class of "diva-btn"
  $(document).on("click", ".diva-btn", displayInfo);

  // Calling the renderButtons function to display the buttons
  renderButtons();

