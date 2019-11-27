$(document).ready(function(){
  $("#get-players").click(function(){
    $.getPlayers();
  });
  $("#add-player").click(function(){
    if ($.addPlayer()) {
      $.getPlayers();
    }
  });
});
//retrieves rows from the database and displays it in a table
$.getPlayers = function(){
  $("#response").empty();
  $("#response").html("<table class='table table-bordered'>");
  $.getJSON("/dbConnect", function(result){
    $.each(result, function(i, field){
      var resp = "<tr><td>Name: " + field.name + "</td>";
      resp = resp + "<td>Gender:" + field.gender + "</td>";
      resp = resp + "<td>Level: " + field.level + "</td>" + "<td>Equipment:" + field.equipment + "</td>";
      resp = resp + '<td><button type="button" name="remove" value="' + field.id + '" onclick="remove()">Remove Player</button></td>';
      resp = resp + "</tr>";
      $("#response").append(resp);
    });
  });
  $("#response").append("</table>");
};
//adds player to the database
$.addPlayer = function(){
  var i = false;
  var name = $("#name").val();
  console.log(name);
  var gender = $("input[type='radio'][name = 'gender']:checked").val();
  console.log(gender);
  var url = "/addPlayer?name=" + name + "&" + "gender=" + gender;
  $.get(url, function(result){
    console.log(result);
    i = Boolean(result);
    $.getPlayers();
    $(document).ready(function(){
      remove();
    });
    return i;
  });
  //alert("Player " + name + "added. Please load players.");
};

function remove() {
  $("[name='remove']").click(function(){
    var id = this.value;
    console.log(this.value);
    url = "/removePlayer?id=" + id;
    console.log(url);
    $.get(url, function(result){
      console.log(result);
      $.getPlayers();
    })
  });
};
