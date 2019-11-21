$(document).ready(function(){
  $("#button").click(function(){
    $('#response').text(" ");
    $.getJSON("/dbConnect", function(result){
      $("#response").append("<table>");
      $.each(result, function(i, field){
        $("#response").append("<tr>");
        $("#response").append("<td>Name: " + field.name + "</td>");
        $("#response").append("<td>Gender:" + field.gender + "</td>");
        $("#response").append("<td>Level: " + field.level + "</td>");
        $("#response").append("<td>Equipment:" + field.equipment + "</td>");
        $("#response").append("</tr>");
      });
      $("#response").append("</table>");
    });
  });
});
