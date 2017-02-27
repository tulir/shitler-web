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

class InputHandler {
	constructor(game) {
		this.game = game
		this.shitler = game.shitler
	}

	onMessage(data) {
		if (this.game.hasJoined()) {
			if (typeof this[data.type] === "function") {
				this[data.type](data)
			} else {
				console.log(`Unidentified message (type ${data.type})`, data)
			}
		} else {
			this.onPrejoinMessage(data)
		}
	}

	onPrejoinMessage(data) {
		if (data.success) {
			this.shitler.setAuthToken(data.game, data.authtoken)
			console.log("Successfully joined game", data.game, "as", data.name)
			if (data.started) {
				this.game.rejoin(data)
			} else {
				this.game.enterLobby(data)
			}
		} else {
			console.log("Failed to join game", data.game, "as", data.name)
			let error

			switch (data.message) {
			case "gamenotfound":
				error = `Could not find the game <b>${data.game}</b>.`
				break
			case "gamestarted":
				error = `The game <b>${data.game}</b> has already started.`
				break
			case "full":
				error = `The game <b>${data.game}</b> is full.`
				break
			case "nameused":
				error = `The name <b>${data.name}</b> is already in use.`
				break
			case "invalidname":
				error = `The name <b>${data.name
						}</b> contains illegal characters.`
				break
			default:
				error = `Unknown error while trying to join game: <b>${
						data.message}</b>`
			}

			$("#join-fail").html(error)
			$("#join-fail").removeClass("hidden")
		}
	}

	join(data) {
		if (!this.game.started) {
			this.shitler.template.append("lobby-player", {
				name: data.name,
				connected: true,
			}, $("#players"))
			this.game.ui.systemMessage(`${data.name} joined the game.`,
					"Server")
		} else {
			console.log(`Uh oh! ${data.name} joined after the game started!`)
		}
	}

	part(data) {
		if (!this.game.started) {
			$("#players").find(`#player-${data.name}`).remove()
			this.game.ui.systemMessage(`${data.name} left the game.`, "Server")
		} else {
			console.log(`Uh oh! ${data.name} left after the game started!`)
		}
	}

	chat(data) {
		this.game.ui.chatMessage(data.sender, data.message)
	}

	connected(data) {
		$("#players").find(`#player-${data.name}`).removeClass("disconnected")
		this.game.ui.systemMessage(`${data.name} reconnected.`, "Server")
	}

	disconnected(data) {
		$("#players").find(`#player-${data.name}`).addClass("disconnected")
		this.game.ui.systemMessage(`${data.name} disconnected.`, "Server")
	}

	start(data) {
		this.game.enterGame(data)
	}

	president(data) {
		this.game.ui.systemMessage(`${data.name} is picking a chancellor`)
		if (data.name === this.game.currentNick) {
			this.game.playerPickReason = "pickchancellor"
			this.game.ui.startPicking(data.unpickable)
		}
	}

	startvote(data) {
		this.game.ui.stopPicking()
		this.game.ui.systemMessage(`Vote for president ${data.president
				} and chancellor ${data.chancellor}`)
		$("#votes").removeClass("hidden")
	}

	vote(data) {
		this.game.ui.setVote(data.vote)
	}

	cards(data) {
		this.game.ui.startDiscarding(data.cards)
	}

	presidentdiscard(data) {
		this.game.ui.stopVoting()
		this.game.ui.systemMessage(`President ${data.name
				} is discarding a policy...`)
	}

	chancellordiscard(data) {
		this.game.ui.systemMessage(`Chancellor ${data.name
				} is discarding a policy...`)
	}

	table(data) {
		this.game.table.deck = data.deck
		this.game.table.discarded = data.discarded
		this.game.table.liberal = data.tableLiberal
		this.game.table.fascist = data.tableFascist
		this.game.ui.updateTable()
	}

	enact(data) {
		console.log("Unhandled enact:", data)
	}

	forceenact(data) {
		console.log("Unhandled forceenact:", data)
	}

	peek(data) {
		console.log("Unhandled peek:", data)
	}

	peekcards(data) {
		console.log("Unhandled peekcards:", data)
	}

	investigateresult(data) {
		console.log("Unhandled investigateresult:", data)
	}

	investigate(data) {
		console.log("Unhandled investigate:", data)
	}

	presidentselect(data) {
		console.log("Unhandled presidentselect:", data)
	}

	execute(data) {
		console.log("Unhandled execute:", data)
	}

	investigated(data) {
		console.log("Unhandled investigated:", data)
	}

	presidentselected(data) {
		console.log("Unhandled presidentselected:", data)
	}

	executed(data) {
		console.log("Unhandled executed:", data)
	}

	end(data) {
		console.log("Unhandled end:", data)
	}

	error(data) {
		console.log("Unhandled error:", data)
	}
}

module.exports = InputHandler
