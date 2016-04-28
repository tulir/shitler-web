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
    authtoken = data["authtoken"]
    // TODO joined game data["game"]
  } else {
    switch (data.message) {
    case "gamenotfound":
			// TODO Inform user: "Could not find the given game!"
		case "gamestarted":
			// TODO Inform user: "That game has already started (try giving your authtoken?)"
		case "full":
			// TODO Inform user: "That game is full (try giving your authtoken?)"
		case "nameused":
      // TODO Inform user: "The name <NAME> is already in use (try giving your authtoken?)"
		case "invalidname":
			// TODO Inform user: "Your name contains invalid characters or is too short or long"
		default:
      // TODO Inform user: unknown error
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
