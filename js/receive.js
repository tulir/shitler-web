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

function recHandlers() {}

function onMessage(evt) {
  var data = JSON.parse(evt.data)
  if (inGame.length === 0) onPrejoinMessage(data)
  else                     recHandlers[data.type](data)
}

function onPrejoinMessage(data) {
  if (data.success) {
    store.authtoken = data.authtoken
    console.log("Successfully joined game", data.game, "as", data.name)
    $("#container").loadTemplate($("#template-lobby"), {game: data.game}, {append: false, isFile: false, async: false})
    data.players.forEach(function(val, key, map) {
      $("#players").loadTemplate(sprintf("<div class='player %s'>%s</div>", val ? "disconnected" : "", key))
    })
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

recHandlers.prototype.join = function(data) {

}

recHandlers.prototype.quit = function(data) {

}

recHandlers.prototype.quit = function(data) {

}

recHandlers.prototype.connected = function(data) {

}

recHandlers.prototype.disconnected = function(data) {

}

recHandlers.prototype.start = function(data) {

}

recHandlers.prototype.president = function(data) {

}

recHandlers.prototype.startvote = function(data) {

}

recHandlers.prototype.vote = function(data) {

}

recHandlers.prototype.cards = function(data) {

}

recHandlers.prototype.presidentdiscard = function(data) {

}

recHandlers.prototype.chancellordiscard = function(data) {

}

recHandlers.prototype.table = function(data) {

}

recHandlers.prototype.enact = function(data) {

}

recHandlers.prototype.forceenact = function(data) {

}

recHandlers.prototype.peek = function(data) {

}

recHandlers.prototype.peekcards = function(data) {

}

recHandlers.prototype.investigateresult = function(data) {

}

recHandlers.prototype.investigate = function(data) {

}

recHandlers.prototype.presidentselect = function(data) {

}

recHandlers.prototype.execute = function(data) {

}

recHandlers.prototype.investigated = function(data) {

}

recHandlers.prototype.presidentselected = function(data) {

}

recHandlers.prototype.executed = function(data) {

}

recHandlers.prototype.end = function(data) {

}

recHandlers.prototype.error = function(data) {

}
