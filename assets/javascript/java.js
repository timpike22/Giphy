   var topics = ["dog", "cat", "horse", "cow", "eagle", 
      "owl", "fox"];

      function displayInfo() {

        var animal = $(this).attr("data-name");

     
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          event.preventDefault();

  
          var gifDiv = $("<div class='gif'>");

         
          for(i = 0; i < 10; i++){

            var imageObj = response.data[i];
            var rating = imageObj.rating;
            var imageStill = imageObj.images.fixed_height_still.url;
            var imageAnimate = imageObj.images.fixed_height.url;
            var gifRating = $("<p class='ratingText'>").text("Rating: " + rating);
            var gifIMG = $("<img class='gifButton'>");

            gifIMG.attr("src", imageStill);
            gifIMG.attr("data-state", "still");
            gifIMG.attr("data-animate", imageAnimate);
            gifIMG.attr("data-still", imageStill);

            var gifContainer = $("<div class='img_text'>");
            gifContainer.append(gifRating);
            gifContainer.append(gifIMG);
            gifDiv.append(gifContainer);
        }
          $("#animal-view").prepend(gifDiv);
        });

     }

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("gif");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        var newGif = $("#animal-input").val().trim();
        console.log(newGif);
        topics.push(newGif);
        renderButtons();
      });

      $("#buttons-view").on("click", ".gif", displayInfo);
      $("#animal-view").on("click", ".gifButton", changeState);

      renderButtons();

      function changeState() {

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "data-animate");

        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "data-still");
        }
      }