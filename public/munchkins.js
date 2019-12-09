/**
Binds event handlers to the Buttons
**/
$(document).ready(function(){
  $("#add-player-alert").hide();
  $.getPlayers();
  $("#get-players").click(function(){
    $.getPlayers();
  });
  $("#add-player").click(function(){
    $.addPlayer();
  });
  $("table").on("dblclick", "[name='remove']",function(event){
    let id = $(this).attr('id');
    remove(id);
  });
  $("table").on("click", "[name='level-up']",function(event){
    let action = $(this).attr('name');
    let id = $(this).attr('id');
    let level = $(this).val();
    updateLevel(action, id, level);
  });
  $("table").on("click", "[name='level-down']",function(event){
    let action = $(this).attr('name');
    let id = $(this).attr('id');
    let level = $(this).val();
    updateLevel(action, id, level);
  });
  $("table").on("click", "[name='equip-up']",function(event){
    let action = $(this).attr('name');
    let id = $(this).attr('id');
    let equip = $(this).val();
    console.log("Equip-up " + action + " " + id + " " + equip);
    updateEquipment(action, id, equip);
  });
  $("table").on("click", "[name='equip-down']",function(event){
    let action = $(this).attr('name');
    let id = $(this).attr('id');
    let equip = $(this).val();
    console.log("Equip-down " + action + " " + id + " " + equip);
    updateEquipment(action, id, equip);
  });
  $("table").on("click", "[name='gender-swap']",function(event){
    let id = $(this).attr('id');
    let gender = $(this).val();
    console.log("Gender-swap " + id + " " + gender);
    updateGender(id, gender);
  });
});
/**
retrieves rows from the database and displays it in a table
**/
$.getPlayers = function(){
  //$("#response").empty();
  $("#alert").show(5);
  $.getJSON("/dbConnect", function(result){
    $("#response").html("<table class='table table-bordered'>");
    $.each(result, function(i, field){
      let lvlU = levelUpButton(field.level, field.id);
      let lvlD = levelDownButton(field.level, field.id);
      let equipU = equipUpButton(field.equipment, field.id);
      let equipD = equipDownButton(field.equipment, field.id);
      let genS = genderButton(field.gender, field.id);
      let removeP = removePlayerButton(field.id);
      let total = (Number(field.level) + Number(field.equipment));
      //let str = lvlU + "/n" + lvlD + "/n" + equipU + "/n" + equipD + "/n" + genS;
      //console.log("Generated Buttons: " + str);
      var resp = "<tr><td>Name:<br>" + field.name + "</td>";
      resp = resp + "<td>Combat Level:<br>" + total + "</td>";
      resp = resp + "<td>Level:<br>" + field.level + "<br>" + lvlU + " " +  lvlD +"</td>";
      resp = resp + "<td>Equipment:<br>" + field.equipment + "<br>" + equipU + " " + equipD + "</td>";
      resp = resp + "<td>Gender:<br>" + field.gender + "<br>" + genS + "</td>";
      resp = resp + "<td>" + removeP + "</td>";
      resp = resp + "</tr>";
      $("#response").append(resp);
    });
  });
  $("#response").append("</table>");
  $("#alert").hide(650);
};
/**
adds player to the database
**/
$.addPlayer = function(){
  var letters = new RegExp(/^[A-Za-z]+$/);
  var i = false;
  var name = $("#name").val();
  if (name == ""|| !(letters.test(name))) {
    $("#add-player-alert").show();
    return false;
  }
  if ($("#add-player-alert").is(":visible")) {
    $("#add-player-alert").hide();
  }
  console.log(name);
  var gender = $("input[type='radio'][name = 'gender']:checked").val();
  console.log(gender);
  var url = "/addPlayer?name=" + name + "&" + "gender=" + gender;
  $.get(url, function(result){
    $("#name").val("");
    console.log(result);
    i = Boolean(result);
    $.getPlayers();
    return i;
  });
};
/**
Removes the player from the database using the players id
**/
function remove(id) {
  if (id == undefined) {
    console.log("Undefined ID sent to remove()");
    return;
  }
  console.log("Remove player function ID: " + id);
  var url = "/removePlayer?id=" + id;
  console.log(url);
  $.get(url, function(result){
    console.log(result);
    $.getPlayers();
  })
};
/**
Updates the players level based on which button is pressed
**/
function updateLevel(action, id, level){
  if (action == undefined || id == undefined || level == undefined) {
    console.log("Update Level attempted with undefined value");
    return;
  }
  switch (action) {
    case 'level-up':
      level++;
      break;
    case 'level-down':
      if (level <= 1) {
        level = 1;//game rules say players level can't go lower than 1
      }
      else {
        level--
      }
      break;
    default:

  }
  console.log("New Level: " + level);
  var url = "/updateLevel?id=" + id + "&newLevel=" + level;
  $.get(url, function(result){
    console.log(result);
    $.getPlayers();
  })
};
/**
Updates the players equipment based on which button is pressed
**/
function updateEquipment(action, id, equip){
  if (action == undefined || id == undefined || equip == undefined) {
    console.log("Update Equipment attempted with undefined value");
    return;
  }
  switch (action) {
    case 'equip-up':
      equip++;
      break;
    case 'equip-down':
      if (equip <= 0) {
        equip = 0;//game rules say players equipment can't go lower than 0
      }
      else {
        equip--
      }
      break;
    default:

  }
  console.log("New Equipment: " + equip);
  var url = "/updateEquipment?id=" + id + "&newEquipment=" + equip;
  $.get(url, function(result){
    console.log(result);
    $.getPlayers();
  })
};
/**
Updates the players gender
**/
function updateGender(id, gender){
  if (id == undefined || gender == undefined) {
    console.log("Attempted gender swap with undefined value");
    return;
  }
  switch (gender) {
    case "Male":
      gender = "Female";
      break;
    case "Female":
      gender = "Male";
      break;
  }
  var url = "/updateGender?id=" + id + "&newGender=" + gender;
  $.get(url, function(result){
    console.log(result);
    $.getPlayers();
  })
};
/**
These functions generate strings with the HTML for the various buttons
**/
function levelUpButton(level, id){
  var button = "<button type='button' name='level-up' id='" + id + "' value='" + level + "'></button>";
  return button;
};
function levelDownButton(level, id) {
  var button = "<button type='button' name='level-down' id='" + id + "' value='" + level + "'></button>";
  return button;
};
function equipUpButton(equipment, id){
  var button = "<button type='button' name='equip-up' id='" + id + "' value='" + equipment + "'></button>";
  return button;
};
function equipDownButton(equipment, id){
  var button = "<button type='button' name='equip-down' id='" + id + "' value='" + equipment + "'></button>";
  return button;
};
function genderButton(gender, id){
  var button = "<button type='button' name='gender-swap' id='" + id + "' value='" + gender + "'></button>";
  return button;
};
function removePlayerButton(id){
  var button = "<button type='button' name='remove' id='" + id + "'>Remove Player<span></span></button>";
  return button;
};
