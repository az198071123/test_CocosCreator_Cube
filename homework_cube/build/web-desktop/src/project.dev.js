window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  CubeGameFSM: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b7c05iT/VOV5B0/wdA7HLu", "CubeGameFSM");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StateMachine_1 = require("./StateMachine");
    var FsmImplClass = function(_super) {
      __extends(FsmImplClass, _super);
      function FsmImplClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stateName = {
          SelectGame: "SelectGame",
          GameReady: "GameReady",
          GamePlay: "GamePlay",
          GameOver: "GameOver",
          GameWin: "GameWin",
          GameInit: "GameInit"
        };
        _this.eventName = {
          select: "select",
          game_play: "game_play",
          play_again: "play_again",
          time_out: "time_out",
          game_win: "game_win",
          goto_next: "goto_next",
          click_cube: "click_cube",
          back_select_game: "back_select_game"
        };
        return _this;
      }
      FsmImplClass.prototype.fsmTrigger = function(eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        var _a;
        (_a = this.fsm)[eventName].apply(_a, args);
      };
      FsmImplClass.prototype.fsmIs = function(stateName) {
        return this.fsm.is(stateName);
      };
      FsmImplClass.prototype.fsmCan = function(eventName) {
        return this.fsm.can(eventName);
      };
      FsmImplClass.prototype.fsmCannot = function(eventName) {
        return this.fsm.cannot(eventName);
      };
      FsmImplClass.prototype.fsmCurrent = function() {
        return this.fsm.current;
      };
      FsmImplClass.prototype.fsmStartUp = function() {
        this.fsm = StateMachine_1.default.create({
          initial: "SelectGame",
          events: [ {
            name: "select",
            from: "SelectGame",
            to: "GameInit"
          }, {
            name: "game_play",
            from: "GameReady",
            to: "GamePlay"
          }, {
            name: "play_again",
            from: "GameOver",
            to: "GameInit"
          }, {
            name: "time_out",
            from: "GamePlay",
            to: "GameOver"
          }, {
            name: "game_win",
            from: "GamePlay",
            to: "GameWin"
          }, {
            name: "goto_next",
            from: "GameWin",
            to: "GameOver"
          }, {
            name: "click_cube",
            from: "GamePlay",
            to: "GamePlay"
          }, {
            name: "back_select_game",
            from: "GameOver",
            to: "SelectGame"
          }, {
            name: "goto_next",
            from: "GameInit",
            to: "GameReady"
          } ],
          callbacks: {
            onenterSelectGame: [ this.enter_select_game ],
            onleaveSelectGame: [ this.leave_select_game ],
            onenterGameReady: [ this.enter_game_ready ],
            onleaveGameReady: [ this.leave_game_ready ],
            onenterGamePlay: [ this.enter_game_play ],
            onleaveGamePlay: [ this.leave_game_play ],
            onenterGameOver: [ this.enter_game_over ],
            onleaveGameOver: [ this.leave_game_over ],
            onenterGameWin: [ this.enter_game_win ],
            onleaveGameWin: [ this.leave_game_win ],
            onenterGameInit: [ this.enter_game_init ],
            onleaveGameInit: [ this.leave_game_init ],
            onbeforeselect: {
              SelectGame: [ this.action_select ]
            },
            onbeforegame_play: {
              GameReady: [ this.action_game_play ]
            },
            onbeforeclick_cube: {
              GamePlay: [ this.action_click_cube ]
            },
            onenterstate: [ this.global_enter ],
            onleavestate: [ this.global_leave ],
            onbeforeevent: [ this.global_before ],
            onafterevent: [ this.global_after ]
          }
        }, this);
      };
      FsmImplClass.prototype.select = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["select"].apply(_a, args);
      };
      FsmImplClass.prototype.game_play = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["game_play"].apply(_a, args);
      };
      FsmImplClass.prototype.play_again = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["play_again"].apply(_a, args);
      };
      FsmImplClass.prototype.time_out = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["time_out"].apply(_a, args);
      };
      FsmImplClass.prototype.game_win = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["game_win"].apply(_a, args);
      };
      FsmImplClass.prototype.goto_next = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["goto_next"].apply(_a, args);
      };
      FsmImplClass.prototype.click_cube = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["click_cube"].apply(_a, args);
      };
      FsmImplClass.prototype.back_select_game = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var _a;
        (_a = this.fsm)["back_select_game"].apply(_a, args);
      };
      return FsmImplClass;
    }(cc.Component);
    exports.default = FsmImplClass;
    cc._RF.pop();
  }, {
    "./StateMachine": "StateMachine"
  } ],
  GameMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e14bari4MxKG4zaICPz1sYz", "GameMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, help = _a.help;
    var CubeGameFSM_1 = require("./fsm/CubeGameFSM");
    var Timer_1 = require("./Timer");
    var GameMgr = function(_super) {
      __extends(GameMgr, _super);
      function GameMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.scene_ng = "ng";
        _this._game_level = 0;
        _this.level_timer = [];
        _this.level_cube_count = [];
        _this.prefab_select_game = null;
        _this.prefab_ui = null;
        _this.prefab_ready_anime = null;
        _this.prefab_cube = null;
        _this.prefab_game_over_anime = null;
        _this.prefab_game_win_anime = null;
        _this.canvas = null;
        _this._cube_array = [];
        _this._cube_target = 0;
        return _this;
      }
      GameMgr.prototype.start = function() {
        try {
          this.fsmStartUp();
        } catch (err) {
          cc.error(err);
        }
      };
      GameMgr.prototype.fireEvent = function(event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) data[_i - 1] = arguments[_i];
        cc.log(this.name + ".fireEvent : event:" + event + ", data:" + data);
        try {
          this.fsmTrigger(event, data);
        } catch (err) {
          cc.error(err);
        }
      };
      GameMgr.prototype.enter_select_game = function(eventName, from, to) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".enter_select_game : args:" + args);
        var select_game = cc.instantiate(this.prefab_select_game);
        var btn_level1 = select_game.getChildByName("btn_level1").getComponent(cc.Button);
        btn_level1.node.on("click", function(btn) {
          _this._game_level = 1;
          _this.fireEvent("select");
        }, this);
        var btn_level2 = select_game.getChildByName("btn_level2").getComponent(cc.Button);
        btn_level2.node.on("click", function(btn) {
          _this._game_level = 2;
          _this.fireEvent("select");
        }, this);
        var btn_level3 = select_game.getChildByName("btn_level3").getComponent(cc.Button);
        btn_level3.node.on("click", function(btn) {
          _this._game_level = 3;
          _this.fireEvent("select");
        }, this);
        this.canvas.addChild(select_game, 0, "select_game");
      };
      GameMgr.prototype.leave_select_game = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        this.canvas.removeChild(this.canvas.getChildByName("select_game"));
      };
      GameMgr.prototype.enter_game_init = function(eventName, from, to) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".enter_game_init : args:" + args);
        this._cube_target = 1;
        this.canvas.removeChild(this.canvas.getChildByName("ui"));
        var timer = this.level_timer[this._game_level - 1];
        var ui = cc.instantiate(this.prefab_ui);
        ui.getChildByName("label_time").getComponent(cc.Label).string = "Time: " + timer;
        ui.getChildByName("label_level").getComponent(cc.Label).string = "Level: " + this._game_level;
        ui.getChildByName("label_next").getComponent(cc.Label).string = "Next: " + this._cube_target;
        this.canvas.addChild(ui, 1, "ui");
        for (var _a = 0, _b = this._cube_array; _a < _b.length; _a++) {
          var cube = _b[_a];
          cube && cube.destroy();
        }
        this._cube_array = [];
        var cube_count = this.level_cube_count[this._game_level - 1];
        var _loop_1 = function(i) {
          var cube = cc.instantiate(this_1.prefab_cube);
          cube.on("click", function(btn) {
            if (cube.name == _this._cube_target.toString()) {
              cube.removeComponent(cc.Button);
              var boom = cube.getComponent(cc.Animation);
              boom.on("finished", function(event) {
                cube.destroy();
              }, _this);
              boom.play();
              _this._cube_array[_this._cube_target - 1] = null;
              _this._cube_target += 1;
              _this._cube_target > cube_count && _this.fireEvent("game_win");
            }
          }, this_1);
          cube.getChildByName("label_id").getComponent(cc.Label).string = i.toString();
          this_1.canvas.addChild(cube, 0, "" + i);
          this_1._cube_array.push(cube);
        };
        var this_1 = this;
        for (var i = 1; i <= cube_count; i++) _loop_1(i);
        this.fireEvent("goto_next");
      };
      GameMgr.prototype.leave_game_init = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".leave_game_init : args:" + args);
      };
      GameMgr.prototype.enter_game_ready = function(eventName, from, to) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".enter_game_ready : args:" + args);
        var ready_anime = cc.instantiate(this.prefab_ready_anime);
        ready_anime.getComponent(cc.Animation).on("finished", function(event) {
          _this.fireEvent("game_play");
        }, this);
        this.canvas.addChild(ready_anime, 0, "ready_anime");
      };
      GameMgr.prototype.leave_game_ready = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".leave_game_ready : args:" + args);
        this.canvas.removeChild(this.canvas.getChildByName("ready_anime"));
      };
      GameMgr.prototype.enter_game_play = function(eventName, from, to) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".enter_game_play : args:" + args);
        var timer = this.level_timer[this._game_level - 1];
        this.canvas.getChildByName("ui").getChildByName("label_time").getComponent(Timer_1.default).startTimer(timer, function() {
          _this.fireEvent("time_out");
        });
        for (var _a = 0, _b = this._cube_array; _a < _b.length; _a++) {
          var cube = _b[_a];
          cube && cube.runAction(cc.repeatForever(cc.sequence(cc.moveTo(1, Math.floor(Math.random() * Math.floor(cc.winSize.width)) - cc.winSize.width / 2, Math.floor(Math.random() * Math.floor(cc.winSize.height)) - cc.winSize.height / 2), cc.delayTime(1))));
        }
      };
      GameMgr.prototype.leave_game_play = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".leave_game_play : args:" + args);
      };
      GameMgr.prototype.enter_game_over = function(eventName, from, to) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".enter_game_over : args:" + args);
        var game_over_anime = cc.instantiate(this.prefab_game_over_anime);
        game_over_anime.on("click", function(btn) {
          _this.fireEvent("play_again");
        }, this);
        this.canvas.addChild(game_over_anime, 0, "game_over_anime");
        for (var _a = 0, _b = this._cube_array; _a < _b.length; _a++) {
          var cube = _b[_a];
          if (cube) {
            cube.removeComponent(cc.Button);
            cube.stopAllActions();
          }
        }
      };
      GameMgr.prototype.leave_game_over = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".leave_game_over : args:" + args);
        this.canvas.removeChild(this.canvas.getChildByName("game_over_anime"));
      };
      GameMgr.prototype.enter_game_win = function(eventName, from, to) {
        var _this = this;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".enter_game_win : args:" + args);
        var game_win_anime = cc.instantiate(this.prefab_game_win_anime);
        game_win_anime.on("click", function(btn) {
          _this.fireEvent("play_again");
        }, this);
        this.canvas.addChild(game_win_anime, 0, "game_win_anime");
      };
      GameMgr.prototype.leave_game_win = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".leave_game_win : args:" + args);
        this.canvas.removeChild(this.canvas.getChildByName("game_win_anime"));
      };
      GameMgr.prototype.action_select = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".action_select : args:" + args);
      };
      GameMgr.prototype.action_game_play = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".action_game_play : args:" + args);
      };
      GameMgr.prototype.action_click_cube = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log(this.name + ".action_click_cube : args:" + args);
      };
      GameMgr.prototype.global_enter = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
      };
      GameMgr.prototype.global_leave = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
      };
      GameMgr.prototype.global_before = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
      };
      GameMgr.prototype.global_after = function(eventName, from, to) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
        cc.log("global_after(" + eventName + "," + from + "," + to + "," + args + ")");
        this.getComponent(cc.Label).string = "State: " + to;
      };
      __decorate([ property ], GameMgr.prototype, "scene_ng", void 0);
      __decorate([ property ], GameMgr.prototype, "_game_level", void 0);
      __decorate([ property([ cc.Integer ]) ], GameMgr.prototype, "level_timer", void 0);
      __decorate([ property([ cc.Integer ]) ], GameMgr.prototype, "level_cube_count", void 0);
      __decorate([ property(cc.Prefab) ], GameMgr.prototype, "prefab_select_game", void 0);
      __decorate([ property(cc.Prefab) ], GameMgr.prototype, "prefab_ui", void 0);
      __decorate([ property(cc.Prefab) ], GameMgr.prototype, "prefab_ready_anime", void 0);
      __decorate([ property(cc.Prefab) ], GameMgr.prototype, "prefab_cube", void 0);
      __decorate([ property(cc.Prefab) ], GameMgr.prototype, "prefab_game_over_anime", void 0);
      __decorate([ property(cc.Prefab) ], GameMgr.prototype, "prefab_game_win_anime", void 0);
      __decorate([ property(cc.Node) ], GameMgr.prototype, "canvas", void 0);
      __decorate([ property([ cc.Node ]) ], GameMgr.prototype, "_cube_array", void 0);
      __decorate([ property(cc.Integer) ], GameMgr.prototype, "_cube_target", void 0);
      GameMgr = __decorate([ ccclass, help("https://forum.cocos.com/t/cocos-creator-typescript/46515") ], GameMgr);
      return GameMgr;
    }(CubeGameFSM_1.default);
    exports.default = GameMgr;
    cc._RF.pop();
  }, {
    "./Timer": "Timer",
    "./fsm/CubeGameFSM": "CubeGameFSM"
  } ],
  LanguageData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
    "use strict";
    var Polyglot = require("polyglot.min");
    var polyInst = null;
    window.i18n || (window.i18n = {
      languages: {},
      curLang: ""
    });
    false;
    function loadLanguageData(language) {
      return window.i18n.languages[language];
    }
    function initPolyglot(data) {
      data && (polyInst ? polyInst.replace(data) : polyInst = new Polyglot({
        phrases: data,
        allowMissing: true
      }));
    }
    module.exports = {
      init: function init(language) {
        if (language === window.i18n.curLang) return;
        var data = loadLanguageData(language) || {};
        window.i18n.curLang = language;
        initPolyglot(data);
        this.inst = polyInst;
      },
      t: function t(key, opt) {
        if (polyInst) return polyInst.t(key, opt);
      },
      inst: polyInst,
      updateSceneRenderers: function updateSceneRenderers() {
        var rootNodes = cc.director.getScene().children;
        var allLocalizedLabels = [];
        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren("LocalizedLabel");
          Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
          var label = allLocalizedLabels[_i];
          label.updateLabel();
        }
        var allLocalizedSprites = [];
        for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
          var sprites = rootNodes[_i2].getComponentsInChildren("LocalizedSprite");
          Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
          var sprite = allLocalizedSprites[_i3];
          sprite.updateSprite(window.i18n.curLang);
        }
      }
    };
    cc._RF.pop();
  }, {
    "polyglot.min": "polyglot.min"
  } ],
  LocalizedLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
    "use strict";
    var i18n = require("LanguageData");
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function later() {
          timeout = null;
          immediate || func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
      };
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedLabel"
      },
      properties: {
        dataID: {
          get: function get() {
            return this._dataID;
          },
          set: function set(val) {
            if (this._dataID !== val) {
              this._dataID = val;
              false;
              this.updateLabel();
            }
          }
        },
        _dataID: ""
      },
      onLoad: function onLoad() {
        false;
        i18n.inst || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var label = this.getComponent(cc.Label);
        if (label) {
          this.label = label;
          this.updateLabel();
          return;
        }
      },
      updateLabel: function updateLabel() {
        if (!this.label) {
          cc.error("Failed to update localized label, label component is invalid!");
          return;
        }
        var localizedString = i18n.t(this.dataID);
        localizedString && (this.label.string = i18n.t(this.dataID));
      }
    });
    cc._RF.pop();
  }, {
    LanguageData: "LanguageData"
  } ],
  LocalizedSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
    "use strict";
    var SpriteFrameSet = require("SpriteFrameSet");
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        inspector: "packages://i18n/inspector/localized-sprite.js",
        menu: "i18n/LocalizedSprite"
      },
      properties: {
        spriteFrameSet: {
          default: [],
          type: SpriteFrameSet
        }
      },
      onLoad: function onLoad() {
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
          this.sprite = sprite;
          this.updateSprite(window.i18n.curLang);
          return;
        }
      },
      getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
        for (var i = 0; i < this.spriteFrameSet.length; ++i) if (this.spriteFrameSet[i].language === lang) return this.spriteFrameSet[i].spriteFrame;
      },
      updateSprite: function updateSprite(language) {
        if (!this.sprite) {
          cc.error("Failed to update localized sprite, sprite component is invalid!");
          return;
        }
        var spriteFrame = this.getSpriteFrameByLang(language);
        !spriteFrame && this.spriteFrameSet[0] && (spriteFrame = this.spriteFrameSet[0].spriteFrame);
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {
    SpriteFrameSet: "SpriteFrameSet"
  } ],
  PlayChangeColor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eccbcfxN75Iuo0bdDX3/S6e", "PlayChangeColor");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlayChangeColor = function(_super) {
      __extends(PlayChangeColor, _super);
      function PlayChangeColor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._color_bg = cc.Color.WHITE;
        return _this;
      }
      PlayChangeColor.prototype.start = function() {
        this.startRandom();
      };
      PlayChangeColor.prototype.randomRGB = function() {
        this._color_bg = cc.color(256 * Math.random(), 256 * Math.random(), 256 * Math.random());
      };
      PlayChangeColor.prototype.startRandom = function() {
        cc.log(this.name + ": startRandom");
        this.node.runAction(cc.sequence(cc.callFunc(this.randomRGB, this), cc.tintTo(2, this._color_bg.getR(), this._color_bg.getG(), this._color_bg.getB()), cc.callFunc(this.startRandom, this)));
      };
      __decorate([ property ], PlayChangeColor.prototype, "_color_bg", void 0);
      PlayChangeColor = __decorate([ ccclass ], PlayChangeColor);
      return PlayChangeColor;
    }(cc.Component);
    exports.default = PlayChangeColor;
    cc._RF.pop();
  }, {} ],
  SpriteFrameSet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
    "use strict";
    var SpriteFrameSet = cc.Class({
      name: "SpriteFrameSet",
      properties: {
        language: "",
        spriteFrame: cc.SpriteFrame
      }
    });
    module.exports = SpriteFrameSet;
    cc._RF.pop();
  }, {} ],
  StateMachine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d223f1Ea1OkaVt9j2bTGRJ", "StateMachine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StateMachine = function() {
      function StateMachine() {}
      StateMachine.create = function(cfg, target) {
        var initial = "string" == typeof cfg.initial ? {
          state: cfg.initial
        } : cfg.initial;
        var terminal = cfg.terminal || cfg["final"];
        var fsm = target;
        var events = cfg.events || [];
        var callbacks = cfg.callbacks || {};
        var map = {};
        var transitions = {};
        var add = function(e) {
          var from = Array.isArray(e.from) ? e.from : e.from ? [ e.from ] : [ StateMachine.WILDCARD ];
          map[e.name] = map[e.name] || {};
          for (var n = 0; n < from.length; n++) {
            transitions[from[n]] = transitions[from[n]] || [];
            transitions[from[n]].push(e.name);
            map[e.name][from[n]] = e.to || from[n];
          }
          e.to && (transitions[e.to] = transitions[e.to] || []);
        };
        if (initial) {
          initial.event = initial.event || "startup";
          add({
            name: initial.event,
            from: "none",
            to: initial.state
          });
        }
        for (var n = 0; n < events.length; n++) add(events[n]);
        for (var name in map) map.hasOwnProperty(name) && (fsm[name] = StateMachine.buildEvent(name, map[name]));
        for (var name in callbacks) callbacks.hasOwnProperty(name) && (fsm[name] = callbacks[name]);
        fsm.current = "none";
        fsm.is = function(state) {
          return Array.isArray(state) ? state.indexOf(this.current) >= 0 : this.current === state;
        };
        fsm.can = function(event) {
          return !this.transition && void 0 !== map[event] && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(StateMachine.WILDCARD));
        };
        fsm.cannot = function(event) {
          return !this.can(event);
        };
        fsm.transitions = function() {
          return (transitions[this.current] || []).concat(transitions[StateMachine.WILDCARD] || []);
        };
        fsm.isFinished = function() {
          return this.is(terminal);
        };
        fsm.error = cfg.error || function(name, from, to, args, error, msg, e) {
          throw e || msg;
        };
        fsm.states = function() {
          return Object.keys(transitions).sort();
        };
        initial && !initial.defer && fsm[initial.event]();
        return fsm;
      };
      StateMachine.doCallback = function(fsm, func, name, from, to, args) {
        if (func) try {
          if (Array.isArray(func)) {
            for (var i = 0, l = func.length; i < l; i++) func[i].apply(fsm, [ name, from, to ].concat(args));
            return true;
          }
          for (var i = 0, l = func[from].length; i < l; i++) func[from][i].apply(fsm, [ name, from, to ].concat(args));
          return true;
        } catch (e) {
          fsm.error(name, from, to, args, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
          return true;
        }
        return true;
      };
      StateMachine.beforeAnyEvent = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onbeforeevent"], name, from, to, args);
      };
      StateMachine.afterAnyEvent = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onafterevent"] || fsm["onevent"], name, from, to, args);
      };
      StateMachine.leaveAnyState = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onleavestate"], name, from, to, args);
      };
      StateMachine.enterAnyState = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onenterstate"] || fsm["onstate"], name, from, to, args);
      };
      StateMachine.changeState = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onchangestate"], name, from, to, args);
      };
      StateMachine.beforeThisEvent = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onbefore" + name], name, from, to, args);
      };
      StateMachine.afterThisEvent = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onafter" + name] || fsm["on" + name], name, from, to, args);
      };
      StateMachine.leaveThisState = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onleave" + from], name, from, to, args);
      };
      StateMachine.enterThisState = function(fsm, name, from, to, args) {
        return StateMachine.doCallback(fsm, fsm["onenter" + to] || fsm["on" + to], name, from, to, args);
      };
      StateMachine.beforeEvent = function(fsm, name, from, to, args) {
        if (false === StateMachine.beforeThisEvent(fsm, name, from, to, args) || false === StateMachine.beforeAnyEvent(fsm, name, from, to, args)) return false;
        return true;
      };
      StateMachine.afterEvent = function(fsm, name, from, to, args) {
        StateMachine.afterThisEvent(fsm, name, from, to, args);
        StateMachine.afterAnyEvent(fsm, name, from, to, args);
      };
      StateMachine.leaveState = function(fsm, name, from, to, args) {
        var specific = StateMachine.leaveThisState(fsm, name, from, to, args), general = StateMachine.leaveAnyState(fsm, name, from, to, args);
        if (false === specific || false === general) return false;
        if (typeof StateMachine.ASYNC === typeof specific || typeof StateMachine.ASYNC === typeof general) return StateMachine.ASYNC;
        return true;
      };
      StateMachine.enterState = function(fsm, name, from, to, args) {
        StateMachine.enterThisState(fsm, name, from, to, args);
        StateMachine.enterAnyState(fsm, name, from, to, args);
      };
      StateMachine.buildEvent = function(name, map) {
        return function() {
          var from = this.current;
          var to = map[from] || (map[StateMachine.WILDCARD] != StateMachine.WILDCARD ? map[StateMachine.WILDCARD] : from) || from;
          var args = Array.prototype.slice.call(arguments);
          if (this.transition) return this.error(name, from, to, args, StateMachine.Error.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");
          if (this.cannot(name)) return this.error(name, from, to, args, StateMachine.Error.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);
          if (false === StateMachine.beforeEvent(this, name, from, to, args)) return StateMachine.Result.CANCELLED;
          if (from === to) {
            StateMachine.afterEvent(this, name, from, to, args);
            return StateMachine.Result.NOTRANSITION;
          }
          var fsm = this;
          this.transition = function() {
            fsm.transition = null;
            fsm.current = to;
            StateMachine.enterState(fsm, name, from, to, args);
            StateMachine.changeState(fsm, name, from, to, args);
            StateMachine.afterEvent(fsm, name, from, to, args);
            return StateMachine.Result.SUCCEEDED;
          };
          this.transition.cancel = function() {
            fsm.transition = null;
            StateMachine.afterEvent(fsm, name, from, to, args);
          };
          var leave = StateMachine.leaveState(this, name, from, to, args);
          if (false === leave) {
            this.transition = null;
            return StateMachine.Result.CANCELLED;
          }
          if (StateMachine.ASYNC === leave) return StateMachine.Result.PENDING;
          if (this.transition) return this.transition();
        };
      };
      StateMachine.VERSION = "2.4.0";
      StateMachine.Result = {
        SUCCEEDED: 1,
        NOTRANSITION: 2,
        CANCELLED: 3,
        PENDING: 4
      };
      StateMachine.Error = {
        INVALID_TRANSITION: 100,
        PENDING_TRANSITION: 200,
        INVALID_CALLBACK: 300
      };
      StateMachine.WILDCARD = "*";
      StateMachine.ASYNC = "async";
      return StateMachine;
    }();
    exports.default = StateMachine;
    cc._RF.pop();
  }, {} ],
  Timer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f326ixHvBPxr5QMxvWsUjp", "Timer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Timer = function(_super) {
      __extends(Timer, _super);
      function Timer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._end_time = 0;
        _this.onTimeOut = null;
        return _this;
      }
      Timer.prototype.startTimer = function(end_time, time_out) {
        this._end_time = end_time;
        this.onTimeOut = time_out;
      };
      Timer.prototype.update = function(dt) {
        if (this._end_time > 0) {
          this._end_time -= dt;
          if (this._end_time < 0) {
            this._end_time = 0;
            null != this.onTimeOut && this.onTimeOut();
          }
          this.getComponent(cc.Label).string = "Time: " + Math.floor(this._end_time).toString();
        }
      };
      __decorate([ property ], Timer.prototype, "_end_time", void 0);
      __decorate([ property ], Timer.prototype, "onTimeOut", void 0);
      Timer = __decorate([ ccclass ], Timer);
      return Timer;
    }(cc.Component);
    exports.default = Timer;
    cc._RF.pop();
  }, {} ],
  "polyglot.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.Polyglot = t(e);
    })(void 0, function(e) {
      function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
        this.allowMissing = !!e.allowMissing, this.warn = e.warn || c;
      }
      function s(e) {
        var t, n, r, i = {};
        for (t in e) if (e.hasOwnProperty(t)) {
          n = e[t];
          for (r in n) i[n[r]] = t;
        }
        return i;
      }
      function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "");
      }
      function u(e, t, r) {
        var i, s, u;
        return null != r && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, 
        i;
      }
      function a(e) {
        var t = s(i);
        return t[e] || t.en;
      }
      function f(e, t) {
        return r[a(e)](t);
      }
      function l(e, t) {
        for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e;
      }
      function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t);
      }
      function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }
      t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), "object" == ("undefined" === typeof n ? "undefined" : _typeof(n)) ? this.extend(n, r) : this.phrases[r] = n);
      }, t.prototype.clear = function() {
        this.phrases = {};
      }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e);
      }, t.prototype.t = function(e, t) {
        var n, r;
        return t = null == t ? {} : t, "number" == typeof t && (t = {
          smart_count: t
        }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
        r = e), "string" == typeof n && (t = h(t), r = u(n, this.currentLocale, t.smart_count), 
        r = l(r, t)), r;
      }, t.prototype.has = function(e) {
        return e in this.phrases;
      };
      var n = "||||", r = {
        chinese: function chinese(e) {
          return 0;
        },
        german: function german(e) {
          return 1 !== e ? 1 : 0;
        },
        french: function french(e) {
          return e > 1 ? 1 : 0;
        },
        russian: function russian(e) {
          return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        czech: function czech(e) {
          return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
        },
        polish: function polish(e) {
          return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        icelandic: function icelandic(e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0;
        }
      }, i = {
        chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
        german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
        french: [ "fr", "tl", "pt-br" ],
        russian: [ "hr", "ru" ],
        czech: [ "cs" ],
        polish: [ "pl" ],
        icelandic: [ "is" ]
      };
      return t;
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "GameMgr", "PlayChangeColor", "Timer", "CubeGameFSM", "StateMachine" ]);