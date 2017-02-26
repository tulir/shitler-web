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

class GameHandler {
	constructor(shitler) {
		this.shitler = shitler
		this.playerMap = new Map()
		this.playerPickReason = ""
		this.currentNick = ""
		this.currentGame = ""
		this.playerCount = 0

		shitler.events.keyup("nick", obj => this.nick = obj.value)
		shitler.events.keyup("gameid", obj => this.gameID = obj.value)
		shitler.events.click("create", () =>
				$.get("create", newGameID => {
					console.log("Created game", newGameID)
					this.gameID = newGameID
					this.join()
				}))
		shitler.events.click("join", () => this.join())
		shitler.events.click("start", () => this.start())
		shitler.events.click("vote", obj => this.vote($(obj).attr("data-vote")))
		shitler.events.submit("chat", form =>
				this.chat(form.find("input").val()))
	}

	hasJoined() {
		return this.currentGame.length !== 0
	}

	get nick() {
		return window.localStorage.nick
	}

	set nick(nick) {
		window.localStorage.nick = nick
	}

	get gameID() {
		return window.location.hash.length > 1 ?
				window.location.hash.substr(1) : ""
	}

	set gameID(gameID) {
		window.location.hash = gameID
	}

	updatePlayers() {
		$("#players").empty()
		for (const [name, role] of this.playerMap) {
			this.shitler.appendTemplate("player", { name, role },
					this.shitler.container.find("#players"))
		}
	}

	playerClicked(pickedPlayer) {
		if (this.playerPickReason.length === 0) {
			return
		}
		this.shitler.connection.sendMessage({
			type: this.playerPickReason,
			name: pickedPlayer,
		})

		for (const [name] of this.playerMap) {
			$(`#player-${name}`).removeClass("clickable")
			$(`#player-${name}`).removeClass("not-clickable")
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

	endVote() {
		$("#vote-ja").removeClass("vote-selected")
		$("#vote-nein").removeClass("vote-selected")
		$("#votes").addClass("hidden")
	}

	join() {
		this.shitler.connection.sendMessage({
			type: "join",
			game: this.gameID,
			name: this.nick,
			authtoken: this.shitler.getAuthToken(this.gameID),
		})
	}

	vote(choice) {
		this.shitler.connection.sendMessage({
			type: "vote",
			choice,
		})
	}

	start() {
		this.shitler.connection.sendMessage({
			type: "start",
		})
	}

	chat(msg) {
		this.shitler.connection.sendMessage({
			type: "chat",
			message: msg,
		})
	}
}

module.exports = GameHandler
