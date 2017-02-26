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

class Connection {
	constructor(shitler) {
		this.shitler = shitler
		this.connected = false
		this.websocketPath = `wss://${window.location.host}/socket`
		this.shitler.events.click("reconnect", () => this.connect())

		if (window.location.protocol !== "https:") {
			this.websocketPath = `ws://${window.location.host}/socket`
		}
	}

	connect() {
		this.shitler.template.apply("connecting")

		this.socket = new WebSocket(this.websocketPath)
		this.socket.onopen = () => this.onOpen()
		this.socket.onmessage = event => this.onMessage(event)
		this.socket.onclose = () => this.onClose()
	}

	onOpen() {
		this.connected = true
		this.shitler.template.apply("join", {
			nick: this.shitler.game.nick,
			gameID: this.shitler.game.gameID,
		})
	}

	onMessage(event) {
		const data = JSON.parse(event.data)
		console.log("<--", data)
		this.shitler.input.onMessage(data)
	}

	sendMessage(payload) {
		if (payload === undefined || payload === null || payload.length === 0) {
			return false
		}

		const data = JSON.stringify(payload)
		if (data.length > 1024) {
			return false
		}

		console.log("-->", payload)
		this.socket.send(data)
		return true
	}

	onClose() {
		if (this.connected) {
			// TODO show disconnected overlay if in-game
		} else {
			this.shitler.template.apply("cant-connect")
		}
	}
}

module.exports = Connection
