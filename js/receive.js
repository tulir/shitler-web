// shitler-web - A HTML5 client for shitlerd
// Copyright (C) 2016 Tulir Asokan

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var recHandlers = {}

function onMessage(evt) {
  var data = JSON.parse(evt.data)
  console.log("<--", data)
  if (inGame.length === 0) onPrejoinMessage(data)
  else                     recHandlers[data.type](data)
}

function onPrejoinMessage(data) {
  if (data.success) {
    store.authtoken = data.authtoken
    console.log("Successfully joined game", data.game, "as", data.name)
    $("#container").loadTemplate($("#template-lobby"), {game: data.game}, {append: false, isFile: false, async: false})
    for (var name in players){
      if (players.hasOwnProperty(name)) {
        $("#players").append(sprintf("<div class='player %1$s' id='player-%2$s'>%2$s</div>", players[name] ? "disconnected" : "", name))
      }
    }
    inGame = data.game
  } else {
    console.log("Failed to join game", data.game, "as", data.name + ":", data.message)
    $("#join-fail").removeClass("hidden")
    switch (data.message) {
    case "gamenotfound":
      $("#join-fail").html(sprintf("Could not find the game <b>%s<b>!", data.game))
      break
		case "gamestarted":
      $("#join-fail").html(sprintf("The game <b>%s<b> has already started.", data.game))
      break
		case "full":
      $("#join-fail").html(sprintf("The game <b>%s<b> is full.", data.game))
      break
		case "nameused":
      $("#join-fail").html(sprintf("The name <b>%s<b> is already in use.", data.game))
      break
		case "invalidname":
      $("#join-fail").html(sprintf("The name <b>%s<b> contains invalid characters.", data.name))
      break
		default:
      $("#join-fail").html(sprintf("Unknown error while joining game: <b>%s<b>", data.message))
    }
  }
}

recHandlers.join = function(data) {
  $("#chat").append(sprintf("%s joined the game<br>", data.name))
  $("#players").append(sprintf("<div class='player %1$s' id='player-%2$s'>%2$s</div>", players[name] ? "disconnected" : "", data.name))
}

recHandlers.quit = function(data) {
  $("#chat").append(sprintf("%s left the game<br>", data.name))
  $(sprintf("#player-%s", data.name)).remove()
}

recHandlers.chat = function(data) {
  $("#chat").append(sprintf("&lt;%s&gt; %s<br>", data.sender, data.message))
}

recHandlers.connected = function(data) {
  $(sprintf("#player-%s", data.name)).removeClass("disconnected")
}

recHandlers.disconnected = function(data) {
  $(sprintf("#player-%s", data.name)).addClass("disconnected")
}

recHandlers.start = function(data) {

}

recHandlers.president = function(data) {

}

recHandlers.startvote = function(data) {

}

recHandlers.vote = function(data) {

}

recHandlers.cards = function(data) {

}

recHandlers.presidentdiscard = function(data) {

}

recHandlers.chancellordiscard = function(data) {

}

recHandlers.table = function(data) {

}

recHandlers.enact = function(data) {

}

recHandlers.forceenact = function(data) {

}

recHandlers.peek = function(data) {

}

recHandlers.peekcards = function(data) {

}

recHandlers.investigateresult = function(data) {

}

recHandlers.investigate = function(data) {

}

recHandlers.presidentselect = function(data) {

}

recHandlers.execute = function(data) {

}

recHandlers.investigated = function(data) {

}

recHandlers.presidentselected = function(data) {

}

recHandlers.executed = function(data) {

}

recHandlers.end = function(data) {

}

recHandlers.error = function(data) {

}
