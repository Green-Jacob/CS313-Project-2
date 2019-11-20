$(document).ready(function(){
  $("#button").click(function(){
    $.getJSON("/dbConnect", function(result){
      $.each(result, function(i, field){
        $("#response").append(field.name + " ");
      });
    });
  });
});
