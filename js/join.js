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

"use strict"
function nameChange() {
  "use strict"
	store.name = $("#join-name").val()
}

function joinBtn() {
  "use strict"
	join($("#join-id").val(), $("#join-name").val())
}

function createBtn() {
  "use strict"
	$.get("/create", function(data) {
		console.log("Created game", data)
		join(data, $("#join-name").val())
	});
}

function join(game, name) {
  "use strict"
	console.log("Joining game", game)
	sendMessage({type: "join", game: game, name: name, authtoken: getAuthToken(game)})
  document.location.hash = game
}
