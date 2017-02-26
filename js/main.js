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
const $ = require("jquery")
const EventSystem = require("./lib/events")
const TemplateSystem = require("./lib/templates")
const Connection = require("./connection")
const GameHandler = require("./game")
const InputHandler = require("./input")

global.VERSION = "0.1"
global.$ = $

class SecretHitler {
	constructor() {
		this.container = $("#container")
		this.template = new TemplateSystem(this.container)
		this.events = new EventSystem(this.container)
		this.connection = new Connection(this)
		this.game = new GameHandler(this)
		this.input = new InputHandler(this)
		this.template.apply("join")
	}

	getAuthToken(game) {
		const fieldKey = `authToken_${game}`
		if (window.localStorage.hasOwnProperty(fieldKey)) {
			return window.localStorage[fieldKey]
		}
		return ""
	}

	setAuthToken(game, authToken) {
		window.localStorage[`authToken_${game}`] = authToken
	}
}

const shitler = new SecretHitler()
shitler.connection.connect()
global.$shitler = shitler
