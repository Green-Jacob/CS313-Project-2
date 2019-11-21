$(document).ready(function(){
  $("#button").click(function(){
    $("#response").html("<table class='table table-bordered'>");
    $.getJSON("/dbConnect", function(result){
      $.each(result, function(i, field){
        var resp = "<tr><td>Name: " + field.name + "</td>" + "<td>Gender:" + field.gender + "</td>";
        resp = resp + "<td>Level: " + field.level + "</td>" + "<td>Equipment:" + field.equipment + "</td>";
        resp = resp + "</tr>";
        $("#response").append(resp);
      });
      $("#response").append("</table>");
    });
  });
});
