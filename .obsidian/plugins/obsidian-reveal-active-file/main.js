'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var MyPlugin = /** @class */ (function (_super) {
    __extends(MyPlugin, _super);
    function MyPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_file_explorer_open_previously = false;
        // for waiting active-leaf-change event 
        _this.active_leaf_change_queue = [];
        return _this;
    }
    MyPlugin.prototype.is_file_explorer_open = function () {
        var workspace = this.app.workspace;
        var is_open = false;
        workspace.iterateAllLeaves(function (leaf) {
            if (leaf.getViewState().type === "file-explorer" && window.getComputedStyle(leaf.containerEl, null).display !== "none") {
                is_open = true;
            }
        });
        return is_open;
    };
    MyPlugin.prototype.reveal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.commands.executeCommandById('file-explorer:reveal-active-file');
                        return [4 /*yield*/, this.wait_active_leaf_change()];
                    case 1:
                        _a.sent();
                        this.app.workspace.setActiveLeaf(this.current_open_file_leaf, { focus: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyPlugin.prototype.is_file = function (leaf) {
        // This code does not verify whether it represents all files.
        return leaf.view.allowNoFile === false;
    };
    MyPlugin.prototype.is_file_explorer = function (leaf) {
        return leaf.getViewState().type === "file-explorer";
    };
    MyPlugin.prototype.onload = function () {
        var _this = this;
        this.is_file_explorer_open_previously = this.is_file_explorer_open();
        this.app.workspace.on('file-open', function (file) { return __awaiter(_this, void 0, void 0, function () {
            var is_file_explorer_open_now;
            return __generator(this, function (_a) {
                if (!file) {
                    return [2 /*return*/];
                }
                is_file_explorer_open_now = this.is_file_explorer_open();
                if (is_file_explorer_open_now) {
                    this.reveal();
                }
                return [2 /*return*/];
            });
        }); });
        this.app.workspace.on('active-leaf-change', function (leaf) { return __awaiter(_this, void 0, void 0, function () {
            var is_file_explorer_open_now;
            return __generator(this, function (_a) {
                if (!leaf) {
                    return [2 /*return*/];
                }
                this.resolve_wait_active_leaf_change();
                is_file_explorer_open_now = this.is_file_explorer_open();
                console.log("is_file_explorer_open_previously: ".concat(this.is_file_explorer_open_previously, ", is_file_explorer_open_now: ").concat(is_file_explorer_open_now));
                if (this.is_file_explorer(leaf)) {
                    if (is_file_explorer_open_now && !this.is_file_explorer_open_previously) {
                        this.reveal();
                    }
                }
                this.is_file_explorer_open_previously = is_file_explorer_open_now;
                if (this.is_file(leaf)) {
                    this.current_open_file_leaf = leaf;
                }
                return [2 /*return*/];
            });
        }); });
    };
    MyPlugin.prototype.wait_active_leaf_change = function () {
        var resolver = null;
        var promise = new Promise(function (resolve) {
            resolver = resolve;
        });
        this.active_leaf_change_queue.push(resolver);
        return promise;
    };
    MyPlugin.prototype.resolve_wait_active_leaf_change = function () {
        var _a;
        (_a = this.active_leaf_change_queue.shift()) === null || _a === void 0 ? void 0 : _a();
    };
    return MyPlugin;
}(obsidian.Plugin));

module.exports = MyPlugin;


/* nosourcemap */