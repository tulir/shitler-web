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
function connect() {
  "use strict"
  console.log("Connecting to socket...")
  $("#container").loadTemplate($("#template-connecting"), {append: false, isFile: false, async: false})

  socket = new WebSocket(websocketPath)
  socket.onopen = onOpen
  socket.onmessage = onMessage
  socket.onclose = onClose
}

function onOpen() {
  "use strict"
  console.log("Successfully connected!")
  connected = true
  if (window.location.hash.length > 1) {
    join(window.location.hash.substring(1))
  } else {
    $("#container").loadTemplate($("#template-join"), {name: store.name}, {append: false, isFile: false, async: false})
  }
}

function onClose() {
  "use strict"
  console.log("Disconnected from server!")
  if (connected) {
    // TODO: show disconnected overlay if in-game
  } else {
    $("#container").loadTemplate($("#template-cantconnect"), {append: false, isFile: false, async: false})
  }
}
