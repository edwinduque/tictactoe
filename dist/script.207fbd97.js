// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/script.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Juego =
/** @class */
function () {
  function Juego() {}

  Juego.prototype.dibujarTablero = function () {
    var tablero = document.querySelector("#tablero");
    tablero.innerHTML = "";

    for (var index = 0; index < 9; index++) {
      var casilla = document.createElement('div');
      casilla.setAttribute("class", "casilla");
      casilla.setAttribute("data-position", index.toString()); //    casilla.innerHTML="-";

      tablero.appendChild(casilla);
    }
  };

  Juego.prototype.mostrarMensajes = function () {
    var lblplayer1 = document.querySelector("#lblPlayer1");
    var lblplayer2 = document.querySelector("#lblPlayer2");
    var lblTurno = document.querySelector("#lblTurno");
    var divMensajes = document.querySelector("#mensajes");
    divMensajes.hidden = false;
    lblplayer1.innerText = this.partida.PlayerA + " juega con: X";
    lblplayer2.innerText = this.partida.PlayerB + " juega con: O";

    if (this.partida.HuboGanador == false && this.partida.Jugadas < 9) {
      lblTurno.innerText = "Turno de " + this.partida.Turn; // if(this.partida.Turn === this.partida.PlayerA){
      //     lblplayer1.classList.add("turnoActual");
      //     lblplayer2.classList.remove("turnoActual")
      // }else{
      //     lblplayer2.classList.add("turnoActual");
      //     lblplayer1.classList.remove("turnoActual")
      // }
    } else {
      if (this.partida.HuboGanador) {
        lblTurno.innerText = "Ganador: " + this.partida.Turn;
      } else if (this.partida.Jugadas) {
        lblTurno.innerText = "Partida finalizada, no hubo ganador";
      }
    }
  };

  Juego.prototype.setTurno = function (inicial, casilla) {
    if (inicial === void 0) {
      inicial = false;
    }

    if (casilla === void 0) {
      casilla = null;
    }

    if (inicial === true) {
      if (Math.floor(Math.random() * 2) === 1) {
        this.partida.Turn = this.partida.PlayerB;
      } else {
        this.partida.Turn = this.partida.PlayerA;
      }
    } else {
      if (this.partida.HuboGanador == false && casilla.classList.contains("casilla") && this.partida.Jugadas < 9) {
        casilla.classList.remove('casilla');
        this.partida.Jugadas++;
        this.partida.Movements[Number(casilla.dataset.position)] = this.partida.Turn;
        this.validarGanador();

        if (this.partida.Turn === this.partida.PlayerA) {
          casilla.classList.add('blue');
          casilla.innerText = "X";
        } else {
          casilla.classList.add('green');
          casilla.innerText = "0";
        }

        if (this.partida.HuboGanador == false) {
          if (this.partida.Jugadas < 9) {
            if (this.partida.Turn === this.partida.PlayerA) {
              this.partida.Turn = this.partida.PlayerB;
            } else {
              this.partida.Turn = this.partida.PlayerA;
            }
          } else {// alert(`Tablero finalizado no hubo ganador`);
          }
        } else {//  alert(`Ganador jugador: ${this.partida.Turn}`);
          }
      } else {}
    }

    this.mostrarMensajes();
  };

  Juego.prototype.validarGanador = function () {
    if (this.partida.HuboGanador === false && (this.partida.Movements[0] === this.partida.Turn && this.partida.Movements[0] === this.partida.Movements[1] && this.partida.Movements[1] === this.partida.Movements[2] || this.partida.Movements[3] === this.partida.Turn && this.partida.Movements[3] === this.partida.Movements[4] && this.partida.Movements[4] === this.partida.Movements[5] || this.partida.Movements[6] === this.partida.Turn && this.partida.Movements[6] === this.partida.Movements[7] && this.partida.Movements[6] === this.partida.Movements[8] || this.partida.Movements[0] === this.partida.Turn && this.partida.Movements[0] === this.partida.Movements[4] && this.partida.Movements[0] === this.partida.Movements[8] || this.partida.Movements[0] === this.partida.Turn && this.partida.Movements[0] === this.partida.Movements[3] && this.partida.Movements[0] === this.partida.Movements[6] || this.partida.Movements[1] === this.partida.Turn && this.partida.Movements[1] === this.partida.Movements[4] && this.partida.Movements[1] === this.partida.Movements[7] || this.partida.Movements[2] === this.partida.Turn && this.partida.Movements[2] === this.partida.Movements[5] && this.partida.Movements[2] === this.partida.Movements[8] || this.partida.Movements[2] === this.partida.Turn && this.partida.Movements[2] === this.partida.Movements[4] && this.partida.Movements[2] === this.partida.Movements[6])) {
      this.partida.HuboGanador = true;
      this.partida.Ganador = this.partida.Turn;
    }
  };

  Juego.prototype.reiniciarPartida = function (playerA, playerB) {
    this.partida = {};
    this.partida.HuboGanador = false;
    this.partida.Jugadas = 0;
    this.partida.Movements = new Array(9);
    this.partida.Ganador = "";
    this.partida.PlayerA = playerA;
    this.partida.PlayerB = playerB;
    this.dibujarTablero();
    var casillas = document.querySelectorAll(".casilla");

    var _loop_1 = function _loop_1(index) {
      var that = this_1;
      casillas[index].addEventListener("click", function () {
        that.setTurno(false, this);
      });
    };

    var this_1 = this;

    for (var index = 0; index < casillas.length; index++) {
      _loop_1(index);
    }

    this.setTurno(true);
  };

  return Juego;
}();

(function () {
  var game = new Juego();
  var btnIniciar = document.querySelector("#btnIniciar");

  btnIniciar.onclick = function () {
    var player1 = document.querySelector("#jugadorUno");
    player1.value = player1.value.trim();
    var player2 = document.querySelector("#jugadorDos");
    player2.value = player2.value.trim();

    if (player1.value !== "" && player2.value !== "") {
      game.reiniciarPartida(player1.value, player2.value);
      player1.hidden = true;
      player2.hidden = true;
      btnIniciar.hidden = true;
    }
  };
})();
},{}],"C:/Users/edwin/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1699" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/edwin/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","assets/script.ts"], null)
//# sourceMappingURL=/script.207fbd97.js.map