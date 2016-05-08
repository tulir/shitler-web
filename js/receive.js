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
var recHandlers = {}

var lobbyPlayer = "<div class='lobby-player %2$s' id='player-%1$s'>%1$s</div>"

function onMessage(evt) {
  "use strict"
  var data = JSON.parse(evt.data)
  console.log("<--", data)
  if (inGame.length === 0) onPrejoinMessage(data)
  else                     recHandlers[data.type](data)
}

function onPrejoinMessage(data) {
  "use strict"
  if (data.success) {
    setAuthToken(data.game, data.authtoken)
    console.log("Successfully joined game", data.game, "as", data.name)
    myname = data.name
    $("#container").loadTemplate($("#template-lobby"), {game: data.game}, {append: false, isFile: false, async: false})
    for (var name in data.players){
      if (data.players.hasOwnProperty(name)) {
        $("#players").append(sprintf(lobbyPlayer, name, data.players[name] ? "" : "disconnected"))
        players++
      }
    }
    if (players >= 5) {
      $("#start").addClass("canstart")
    }
    inGame = data.game
  } else {
    console.log("Failed to join game", data.game, "as", data.name + ":", data.message)
    $("#join-fail").removeClass("hidden")
    switch (data.message) {
    case "gamenotfound":
      $("#join-fail").html(sprintf("Could not find the game <b>%s</b>!", data.game))
      break
		case "gamestarted":
      $("#join-fail").html(sprintf("The game <b>%s</b> has already started.", data.game))
      break
		case "full":
      $("#join-fail").html(sprintf("The game <b>%s</b> is full.", data.game))
      break
		case "nameused":
      $("#join-fail").html(sprintf("The name <b>%s</b> is already in use.", data.name))
      break
		case "invalidname":
      $("#join-fail").html(sprintf("The name <b>%s</b> contains invalid characters.", data.name))
      break
		default:
      $("#join-fail").html(sprintf("Unknown error while joining game: <b>%s</b>", data.message))
    }
  }
}

recHandlers.join = function(data) {
  "use strict"
  $("#chat").append(sprintf("%s joined the game<br>", data.name))
  $("#players").append(sprintf(lobbyPlayer, data.name, ""))
  players++
  if (players >= 5) {
    $("#start").addClass("canstart")
  }
}

recHandlers.quit = function(data) {
  "use strict"
  $("#chat").append(sprintf("%s left the game<br>", data.name))
  $(sprintf("#player-%s", data.name)).remove()
  players--
  if (players < 5) {
    $("#start").removeClass("canstart")
  }
}

recHandlers.chat = function(data) {
  "use strict"
  chat(sprintf("<b>&lt;%s&gt;</b> %s<br>", data.sender, escapeHtml(data.message)))
}

recHandlers.connected = function(data) {
  "use strict"
  $(sprintf("#player-%s", data.name)).removeClass("disconnected")
}

recHandlers.disconnected = function(data) {
  "use strict"
  $(sprintf("#player-%s", data.name)).addClass("disconnected")
}

recHandlers.start = function(data) {
  "use strict"
  $("#container").loadTemplate($("#template-game"), {append: false, isFile: false, async: false})
  chat(sprintf("The game is starting. You're a %s", data.role))
  playerMap = data.players
  playerMap[myname] = data.role
  updatePlayers()
}

recHandlers.president = function(data) {
  "use strict"
  statuschat(sprintf("%s is picking a chancellor", data.name))
  if (data.name === myname) {
    playerPickReason = "pickchancellor"

  	for (var name in playerMap) {
  		if (!playerMap.hasOwnProperty(name)) continue
      $(sprintf("#player-%s", name)).addClass("pickable")
    }

    data.unpickable.forEach(function(val, i, arr) {
      $(sprintf("#player-%s", val)).removeClass("pickable")
      $(sprintf("#player-%s", val)).addClass("not-pickable")
    })
  }
}

recHandlers.startvote = function(data) {
  "use strict"
  $("#status").text(sprintf("Vote for president %s and chancellor %s"), data.president, data.chancellor)
  // TODO chat message ^
}

recHandlers.vote = function(data) {
  "use strict"
  statuschat(sprintf("You voted %s. Waiting for others to vote...", data.vote))
}

recHandlers.cards = function(data) {
  "use strict"

}

recHandlers.presidentdiscard = function(data) {
  "use strict"
  status(sprintf("The president is now discarding a card"))
}

recHandlers.chancellordiscard = function(data) {
  "use strict"
  status(sprintf("The chancellor is now discarding a card"))
}

recHandlers.table = function(data) {
  "use strict"

}

recHandlers.enact = function(data) {
  "use strict"
  statuschat(sprintf("President %s and chancellor %s have enacted %s policy", data.president, data.chancellor, data.policy))
}

recHandlers.forceenact = function(data) {
  "use strict"
  statuschat(sprintf("The frustrated populace has forcefully enacted a %s policy.", data.president, data.chancellor, data.policy))
}

recHandlers.peek = function(data) {
  "use strict"

}

recHandlers.peekcards = function(data) {
  "use strict"

}

recHandlers.investigateresult = function(data) {
  "use strict"

}

recHandlers.investigate = function(data) {
  "use strict"
  if (data.name === myname) {
    playerPickReason = "investigate"
  }
}

recHandlers.presidentselect = function(data) {
  "use strict"
  if (data.name === myname) {
    playerPickReason = "presidentselect"
  }
}

recHandlers.execute = function(data) {
  "use strict"

}

recHandlers.investigated = function(data) {
  "use strict"
  if (data.name === myname) {
    playerPickReason = "execute"
  }
}

recHandlers.presidentselected = function(data) {
  "use strict"

}

recHandlers.executed = function(data) {
  "use strict"

}

recHandlers.end = function(data) {
  "use strict"

}

recHandlers.error = function(data) {
  "use strict"

}
