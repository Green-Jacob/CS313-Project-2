$(document).ready(function(){
  $("#button").click(function(){
    $('#response').text(" ");
    $.getJSON("/dbConnect", function(result){
      $("#response").append("<table>");
      $.each(result, function(i, field){
        $("#response").append("<tr>");
        $("#response").append("<th>Name: " + field.name + "</th>");
        $("#response").append("<th>Gender:" + field.gender + "</th>");
        $("#response").append("<th>Level: " + field.level + "</th>");
        $("#response").append("<th>Equipment:" + field.equipment + "</th>");
      });
      $("#response").append("</table>");
    });
  });
});
