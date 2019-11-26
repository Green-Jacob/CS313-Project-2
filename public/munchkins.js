$(document).ready(function(){
  $("#get-players").click(function(){
    $.getPlayers();
  });
  $("#add-player").click(function(){
    $.addPlayer();
});
//retrieves rows from the database and displays it in a table
$.getPlayers = function(){
  $("#response").html("<table class='table table-bordered'>");
  $.getJSON("/dbConnect", function(result){
    $.each(result, function(i, field){
      var resp = "<tr><td>Name: " + field.name + "</td>";
      resp = resp + "<td>Gender:" + field.gender + "</td>";
      resp = resp + "<td>Level: " + field.level + "</td>" + "<td>Equipment:" + field.equipment + "</td>";
      resp = resp + '<td><button type="button" name="button" class="remove-player" id="' + field.id + '">Remove Player</button></td>';
      resp = resp + "</tr>";
      $("#response").append(resp);
    });
  });
  $("#response").append("</table>");
};
//adds player to the database
$.addPlayer = function(){
  var name = $("#name").val();
  console.log(name);
  var gender = $("input[type='radio'][name = 'gender']:checked").val();
  console.log(gender);
  var url = "/addPlayer?name=" + name + "&" + "gender=" + gender;
  $.get(url, function(result){
    console.log(result);
    return Boolean(result);
  });
}
