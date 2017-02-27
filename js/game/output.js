// shitler-web - A web client for shitlerd
// Copyright (C) 2017 Tulir Asokan

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

class OutputHandler {
	constructor(game) {
		this.game = game
		this.shitler = game.shitler
	}

	pick(reason, player) {
		this.shitler.connection.sendMessage({
			type: reason,
			name: player,
		})
	}

	join() {
		this.shitler.connection.sendMessage({
			type: "join",
			game: this.game.gameID,
			name: this.game.nick,
			authtoken: this.shitler.getAuthToken(this.game.gameID),
		})
	}

	vote(choice) {
		this.shitler.connection.sendMessage({
			type: "vote",
			vote: choice,
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

	discard(index) {
		this.shitler.connection.sendMessage({
			type: "discard",
			index,
		})
	}
}

module.exports = OutputHandler
