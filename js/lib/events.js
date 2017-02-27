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

/**
* The event manager for <insert framework name here>
*/
class EventSystem {
	/**
	 * Create an event system.
	 *
	 * @param {JQuery}   container    The container to bind the event listeners
	 *                                to.
	 * @param {string}   defaultEvent The name of the default event to use.
	 * @param {string[]} extraEvents  A list of events to preactivate.
	 * @param {bool}     autoregister Whether or not to automatically register
	 *                                event types when creating a listener.
	 */
	constructor(container = $("body"), defaultEvent = "click", extraEvents = [],
			autoregister = true) {
		this.container = container
		this.handlers = {}
		this.autoregister = autoregister
		this.registeredEvents = [defaultEvent]

		const evsys = this
		this.container.on(defaultEvent,
				`*[data-event][data-listen~='${defaultEvent}'],` +
				"*[data-event]:not([data-listen])",
				function(event) {
					evsys.execRaw(defaultEvent, this, event)
				})

		for (let evt of extraEvents) {
			if (typeof evt === "string") {
				evt = { native: evt, system: evt }
			} else if (Array.isArray(evt)) {
				evt = {
					native: evt[0],
					system: evt.length > 1 ? evt[1] : evt[0],
				}
			}
			this.registerListener(evt.native, evt.system)
		}
	}

	/**
	 * Register a click event listener.
	 *
	 * @param {string} evt  The name of the event.
	 * @param {func}   func The function to execute when the event is triggered.
	 */
	click(evt, func) {
		this.on("click", evt, func)
	}

	/**
	 * Register a change event listener.
	 *
	 * @param {string} evt  The name of the event.
	 * @param {func}   func The function to execute when the event is triggered.
	 */
	change(evt, func) {
		this.on("change", evt, func)
	}

	/**
	 * Register a submit event listener.
	 *
	 * @param {string} evt  The name of the event.
	 * @param {func}   func The function to execute when the event is triggered.
	 */
	submit(evt, func) {
		this.on("submit", evt, func)
	}

	/**
	 * Register a keyup event listener.
	 *
	 * @param {string} evt  The name of the event.
	 * @param {func}   func The function to execute when the event is triggered.
	 */
	keyup(evt, func) {
		this.on("keyup", evt, func)
	}

	/**
	 * Register an event listener.
	 *
	 * @param {string} type The type of the event.
	 * @param {string} evt  The name of the event.
	 * @param {func}   func The function to execute when the event is triggered.
	 */
	on(type, evt, func) {
		if (!this.registeredEvents.includes(type)) {
			if (this.autoregister) {
				this.registerListener(type)
			} else {
				console.warn(
						"Register an event handler for unregistered event type!"
					)
			}
		}
		evt = `${evt}:${type}`
		if (!this.handlers.hasOwnProperty(evt)) {
			this.handlers[evt] = []
		}
		this.handlers[evt].push(func)
	}

	/**
	 * Trigger an event.
	 *
	 * @param {string} evt    The name and type of the event (name:type).
	 * @param {Event}  source The source DOM event that caused this event.
	 * @param {DOM}    obj    The DOM object that this event happened on.
	 */
	exec(evt, source, obj) {
		if (!this.handlers.hasOwnProperty(evt)) {
			return
		}

		source.stopPropagation()

		for (const func of this.handlers[evt]) {
			func(obj, source)
		}
	}

	/**
	 * Fetch the name of the event from the DOM object and trigger the event.
	 *
	 * @param {string} evtType The type of the event.
	 * @param {DOM}    obj     The DOM object that this event happened on.
	 * @param {Event}  source  The source DOM event that caused this event.
	 */
	execRaw(evtType, obj, source) {
		this.exec(`${obj.getAttribute("data-event")}:${evtType}`, source, obj)
	}

	/**
	 * Register a jQuery event handler.
	 *
	 * @param {string} nativeEvent The name of the native event.
	 * @param {string} systemEvent The name of the internal event, or undefined
	 *                             to use the same as nativeEvent.
	 */
	registerListener(nativeEvent, systemEvent) {
		systemEvent = systemEvent || nativeEvent
		const evsys = this
		this.container.on(nativeEvent,
				`*[data-event][data-listen~='${systemEvent}']`,
				function(event) { evsys.execRaw(systemEvent, this, event) })
		this.registeredEvents.push(systemEvent)
	}
}

module.exports = EventSystem
