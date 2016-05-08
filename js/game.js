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

function updatePlayers() {
	"use strict"
	$("#players").empty()
	for (var name in playerMap) {
		if (!playerMap.hasOwnProperty(name)) continue
	  $("#players").loadTemplate($("#template-player"), {
			name: name,
			click: sprintf("playerClicked('%s')", name),
			id: sprintf("player-%s", name),
			role: playerMap[name],
			image: sprintf("/images/%s.png", playerMap[name]),
			imagealt: playerMap[name]
		}, {append: true, isFile: false, async: false})
	}
}

function playerClicked(name) {
	"use strict"
	if (playerPickReason.length === 0) {
		return
	}
	sendMessage({
		type: playerPickReason,
		name: name
	})

	for (var name in playerMap) {
		if (!playerMap.hasOwnProperty(name)) continue
		$(sprintf("#player-%s", name)).removeClass("clickable")
		$(sprintf("#player-%s", name)).removeClass("not-clickable")
	}
}

function setVote(vote) {
	"use strict"
  if (vote === "ja") {
    $("#vote-ja").addClass("vote-selected")
    $("#vote-nein").removeClass("vote-selected")
  } else if (vote === "nein") {
    $("#vote-ja").removeClass("vote-selected")
    $("#vote-nein").addClass("vote-selected")
  } else {
    $("#vote-ja").removeClass("vote-selected")
    $("#vote-nein").removeClass("vote-selected")
	}
}

function endVote() {
	"use strict"
  $("#vote-ja").removeClass("vote-selected")
  $("#vote-nein").removeClass("vote-selected")
  $("#votes").addClass("hidden")
}
