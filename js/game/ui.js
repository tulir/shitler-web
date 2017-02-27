// shitler-web - A web client for shitlerd
// Copyright (C) 2017 Tulir Asokan
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
const $ = require("jquery")

class UIHandler {
	constructor(game) {
		this.game = game
		this.shitler = game.shitler
	}

	updatePlayers() {
		$("#players").empty()
		for (const [name, role] of this.game.playerMap) {
			this.shitler.template.append("player", { name, role },
					$("#players"))
		}
	}

	updateTable() {
		this.shitler.template.apply("table", this.game.table, $("#table"))
	}

	openLobby(currentPlayers) {
		this.shitler.template.apply("lobby", {
			game: this.game.currentGame,
			enoughPlayers: this.game.playerCount >= 5,
			players: currentPlayers,
		})
	}

	systemMessage(msg, sender = "Game") {
		if (sender === "Game") {
			$("#status").text(msg)
		}
		this.shitler.template.append("chat-message", {
			system: true,
			sender,
			message: msg,
		}, $("#chat"))
	}

	actionMessage(user, msg) {
		this.shitler.template.append("chat-message", {
			action: true,
			sender: user,
			message: msg,
		}, $("#chat"))
	}

	chatMessage(user, msg) {
		this.shitler.template.append("chat-message", {
			sender: user,
			message: msg,
		}, $("#chat"))
	}

	startPicking(unpickable) {
		for (const [name] of this.game.playerMap) {
			$(`#player-${name}`).addClass("pickable")
		}

		for (const name of unpickable) {
			$(`#player-${name}`).removeClass("pickable")
			$(`#player-${name}`).addClass("not-pickable")
		}
	}

	stopPicking() {
		for (const [name] of this.game.playerMap) {
			$(`#player-${name}`).removeClass("pickable")
			$(`#player-${name}`).removeClass("not-pickable")
		}
	}

	setVote(vote) {
		switch (vote) {
		case "ja":
			$("#vote-ja").addClass("vote-selected")
			$("#vote-nein").removeClass("vote-selected")
			break
		case "nein":
			$("#vote-ja").removeClass("vote-selected")
			$("#vote-nein").addClass("vote-selected")
			break
		default:
			$("#vote-ja").removeClass("vote-selected")
			$("#vote-nein").removeClass("vote-selected")
		}
	}

	stopVoting() {
		$("#vote-ja").removeClass("vote-selected")
		$("#vote-nein").removeClass("vote-selected")
		$("#votes").addClass("hidden")
	}

	startDiscarding(policies) {
		for (const [index, type] of Object.entries(policies)) {
			this.shitler.template.append("policy", { index, type }, $("#table > .table"))
		}
	}

	stopDiscarding() {
		$(".policy").remove()
	}
}

module.exports = UIHandler
