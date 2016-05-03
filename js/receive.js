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
    console.log("Successfully joined game!")
  } else {
    $("#join-fail").removeClass("hidden")
    switch (data.message) {
    case "gamenotfound":
      $("#join-fail").text("Could not find the given game!")
		case "gamestarted":
      $("#join-fail").text(sprintf("The game %s has already started.", $("#game-id").val()))
		case "full":
      $("#join-fail").text(sprintf("The game %s is full.", $("#game-id").val()))
		case "nameused":
      $("#join-fail").text(sprintf("The name <i>%s</i> is already in use.", $("#join-name").val()))
		case "invalidname":
      $("#join-fail").text(sprintf("The name <i>%s</i> contains invalid characters.", $("#join-name").val()))
		default:
      $("#join-fail").text(sprintf("Unknown error while joining game: %s", data.message))
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
