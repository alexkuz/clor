/*ಠ_ಠ*/"use strict"
var ansi = require("ansi-styles")
var commands = require("./commands")
ansi.line = { open: "\n", close: "" }
ansi.tab = { open: "\t", close: "" }

module.exports = (function clor (s) {
  function $ (str) {
    return (str === undefined) ?
      $.toString() : clor(s + str + ansi.reset.close)
  }

  $.toString = function () { return s + ansi.reset.close }

  $.log = function (logger) {
    var args = [].slice.call(arguments, 0)
    if (typeof logger === "function") {
      logger.apply(s, args.slice(1))
    } else {
      console.log.apply(console, [s].concat(args))
    }
  }

  Object.defineProperty($, "string", {
    get: function () { return $.toString() }
  })

  Object.keys(ansi).forEach(function (style) {
    Object.defineProperty($, style, {
      get: function () {
        return clor(s + ansi[style].open)
      }
    })
  })

  Object.keys(commands).forEach(function (command) {
    Object.defineProperty($, command, {
      get: function () {
        return typeof commands[command] === 'function' ?
          function() { return clor(s + commands[command].apply(null, arguments)) } :
          clor(s + commands[command])
      }
    })
  })

  return $
}(""))
