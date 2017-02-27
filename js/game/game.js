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
const InputHandler = require("./input")
const OutputHandler = require("./output")
const UIHandler = require("./ui")

class GameHandler {
	constructor(shitler) {
		this.shitler = shitler
		this.send = new OutputHandler(this)
		this.recv = new InputHandler(this)
		this.ui = new UIHandler(this)
		this.playerMap = new Map()
		this.playerPickReason = ""
		this.currentNick = ""
		this.currentGame = ""
		this.started = false
		this.playerCount = 0

		this.table = {
			deck: 0,
			discarded: 0,
			liberal: 0,
			fascist: 0,
		}

		shitler.events.keyup("nick", obj => this.nick = obj.value)
		shitler.events.keyup("gameid", obj => this.gameID = obj.value)
		shitler.events.click("create", () =>
				$.get("create", newGameID => {
					console.log("Created game", newGameID)
					this.gameID = newGameID
					this.send.join()
				}))
		shitler.events.click("join", () => this.send.join())
		shitler.events.click("start", () => this.send.start())
		shitler.events.click("vote", obj =>
				this.send.vote($(obj).attr("data-vote")))
		shitler.events.submit("chat", form => {
			const input = $(form).find("input")
			this.send.chat(input.val())
			input.val("")
		})
		shitler.events.click("player", obj =>
				this.playerClicked($(obj).attr("data-player")))
		shitler.events.click("policy", obj =>
				this.policyClicked(+$(obj).attr("data-index")))
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

	enterLobby(data) {
		this.currentNick = data.name
		this.currentGame = data.game
		this.playerCount = Object.keys(data.players).length
		this.ui.openLobby(data.players)
	}

	rejoin(data) {
		this.currentNick = data.name
		this.currentGame = data.game
		this.playerCount = Object.keys(data.players).length

		this.playerMap = new Map(Object.entries(data.players))
		this.playerMap.set(this.currentNick, data.role)
		this.table.deck = data.table.deck
		this.table.discarded = data.table.discarded
		this.table.liberal = data.table.tableLiberal
		this.table.fascist = data.table.tableFascist
		this.shitler.template.apply("game", {
			players: this.playerMap,
			table: this.table,
		})
		this.ui.systemMessage(`You've rejoined the game. You're ${
				data.role === "hitler" ? "" : "a "} ${data.role}`)
	}

	enterGame(data) {
		this.playerMap = new Map(Object.entries(data.players))
		this.playerMap.set(this.currentNick, data.role)
		this.shitler.template.apply("game", {
			players: this.playerMap,
		})
		this.ui.systemMessage(`The game is starting. You're ${
				data.role === "hitler" ? "" : "a "} ${data.role}`)
	}

	playerClicked(pickedPlayer) {
		if (this.playerPickReason.length === 0) {
			return
		}
		this.send.pick(this.playerPickReason, pickedPlayer)

		this.ui.stopPicking()
	}

	policyClicked(index) {
		this.send.discard(index)
		this.ui.stopDiscarding()
	}
}

module.exports = GameHandler
