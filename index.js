$(document).ready(function() {
    $.ajax({
        url: "https://one-month-jquery.s3.us-west-2.amazonaws.com/apartments.json",
        datatype:  "Json",
        success: function(response){

            // .each will iterate throug all the array and call each time a array with it corresponding apartments properties
            //Function params i is set as index and apartment is set as actual all of the properties of apartments of array in JSON format.
            $.each(response.apartments, function(i, apartment){
            var apartmentClass = apartment.city.toLowerCase().replace(" ", "-");
            var listing =  "<a href='#' id="+ apartment.id +" class='list-group-item " + apartmentClass + " listing'><h4 class='list-group-item-heading'>" + apartment.description + "/"+ apartment.bedrooms + "BR /"+ apartment.price + "</h4><p class='list-group-item-text'>" + apartment.neighborhood + "</p></a>";
            $(".apartments").append(listing);

            });
        },
        error: function(error){
            console.log(error);
        }
    });
    $(".filter").click(function(){

        $(".filter").removeClass("active");
        $(this).addClass("active");

        $(".listing").show();

        var city = $(this).attr("id");
 
        if (city !== "all"){
            $(".listing").not("." + city).css("display", "none");
        }
    });

    $(document).on("click", ".listing", function(){
        var id = $(this).attr("id");
    $.ajax({
        url: "https://one-month-jquery.s3.us-west-2.amazonaws.com/apartments.json",
        datatype:  "Json",
        success: function(response){
            var selectedApartment = $.grep(response.apartments, function(apartment){
                return apartment.id == id;
            });

            //Go under object of where apartment.id = id which contains only one array,can see clearly using console
            var address = selectedApartment[0].address;

            window.open("http://maps.google.com/?q=" + address);
        },
        error: function(error){
            console.log(error);
        }
    });        
    });

});


