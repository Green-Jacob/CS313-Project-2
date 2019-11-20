$(document).ready(function(){
  $("#button").click(function(){
    $.get("/dbConnect", function(data, status){
      $("#response").text(data);
    });
  });
});
