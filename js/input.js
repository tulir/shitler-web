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
	constructor(shitler) {
		this.shitler = shitler
	}

	onMessage(data) {
		if (this.shitler.game.hasJoined()) {
			if (this.constructor.hasOwnProperty(data.type)) {
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
			this.shitler.game.currentNick = data.name
			this.shitler.game.currentGame = data.game
			this.shitler.game.playerCount = Object.keys(data.players).length

			this.shitler.template.apply("lobby", {
				game: data.game,
				enoughPlayers: this.shitler.game.playerCount >= 5,
			})
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
		console.log("Unhandled join:", data)
	}

	quit(data) {
		console.log("Unhandled quit:", data)
	}

	chat(data) {
		console.log("Unhandled chat:", data)
	}

	connected(data) {
		console.log("Unhandled connected:", data)
	}

	disconnected(data) {
		console.log("Unhandled disconnected:", data)
	}

	start(data) {
		console.log("Unhandled start:", data)
	}

	president(data) {
		console.log("Unhandled president:", data)
	}

	startvote(data) {
		console.log("Unhandled startvote:", data)
	}

	vote(data) {
		console.log("Unhandled vote:", data)
	}

	cards(data) {
		console.log("Unhandled cards:", data)
	}

	presidentdiscard(data) {
		console.log("Unhandled presidentdiscard:", data)
	}

	chancellordiscard(data) {
		console.log("Unhandled chancellordiscard:", data)
	}

	table(data) {
		console.log("Unhandled table:", data)
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
