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
var store = window.localStorage
if (store.authtokens === undefined || store.authtokens.length === 0) {
  store.authtokens = "{}"
}
var socket = null
var websocketPath = 'wss://' + window.location.host + '/socket'
if (window.location.protocol !== "https:") {
  websocketPath = 'ws://' + window.location.host + '/socket'
}
var connected = false
var myname = ""
var inGame = ""
var players = 0
var playerMap = {}
var playerPickReason = ""

function sendMessage(payload) {
  "use strict"
  if(payload === undefined || payload === null || payload.length === 0) {
    return false
  }

  var content = JSON.stringify(payload)

  if (content.length > 1024) {
    return false
  }

  console.log("-->", payload)
  socket.send(content)
  return true
}

function setAuthToken(game, authtoken) {
  var ats = JSON.parse(store.authtokens)
  ats[game] = authtoken
  store.authtokens = JSON.stringify(ats)
}

function getAuthToken(game) {
  var ats = JSON.parse(store.authtokens)
  return ats[game]
}

var tagsToEscape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}

function escapeTag(tag) {
  return tagsToEscape[tag] || tag
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, escapeTag)
}

function statuschat(msg) {
  status(msg)
  chat(msg)
}

function status(msg) {
  $("#status").text(msg)
}

function chat(msg) {
  $("#chat").append(msg + "<br>")
  $("#chat").scrollTop($("#chat")[0].scrollHeight)
}
