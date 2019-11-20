$(document).ready(function(){
  $("#button").click(function(){
    $('#response').text(" ");
    $.getJSON("/dbConnect", function(result){
      $.each(result, function(i, field){
        // field is a single object in the JSON response
        $("#response").append(field.name + "<br>");
      });
    });
  });
});
