/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var Calculator_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(Calculator_1.Calculator, null), document.getElementById("calculator"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Calculator = (function (_super) {
    __extends(Calculator, _super);
    function Calculator(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            result: "--:--",
        };
        _this.handleTimeInputChange = _this.handleTimeInputChange.bind(_this);
        return _this;
    }
    Calculator.prototype.render = function () {
        return React.createElement("div", { className: "columns is-multiline" },
            this.createInputColumn("start", "Start", this.state.start),
            this.createInputColumn("break", "Break", this.state.break),
            this.createInputColumn("end", "End", this.state.end),
            React.createElement("div", { className: "column is-size-1 has-text-centered is-half is-offset-one-quarter" }, this.state.result));
    };
    Calculator.prototype.createInputColumn = function (name, label, value) {
        return React.createElement("div", { className: "column is-one-third" },
            React.createElement("div", { className: "field" },
                React.createElement("label", { className: "label has-text-centered" }, label),
                React.createElement("div", { className: "control" },
                    React.createElement("input", { className: "input", type: "text", placeholder: "00:00", name: name, value: value, maxLength: 5, onChange: this.handleTimeInputChange }))));
    };
    Calculator.prototype.handleTimeInputChange = function (event) {
        console.log(event.currentTarget.value);
        if (this.isTimeInputValid(event.currentTarget.value)) {
            this.updateStateWithNewValue(event);
        }
        this.updateStateWithResult();
    };
    Calculator.prototype.updateStateWithResult = function () {
        var _this = this;
        this.setState(function (prevState) {
            var resultParts = _this.calculate(prevState);
            console.log(resultParts);
            var hourAndMinute = resultParts.filter(function (n) { return n >= 0; }).map(_this.zeroPad);
            if (hourAndMinute.length != 2)
                return { result: '--:--' };
            return {
                result: hourAndMinute[0] + ":" + hourAndMinute[1]
            };
        });
    };
    Calculator.prototype.calculate = function (prevState) {
        console.log("Calculating...");
        console.log(prevState);
        var startDate = new Date("2017-06-06 " + prevState.start);
        var endDate = new Date("2017-06-06 " + prevState.end);
        console.log(startDate);
        console.log(endDate);
        var deltaMs = endDate.getTime() - startDate.getTime();
        var deltaSeconds = deltaMs / 1000 / 60;
        var deltaMinutes = deltaSeconds % 60;
        var deltaHours = (deltaSeconds - deltaMinutes) / 60;
        return [deltaHours, deltaMinutes];
    };
    Calculator.prototype.zeroPad = function (n) {
        return n > 10 ? n.toString() : ("0" + n);
    };
    Calculator.prototype.isTimeInputValid = function (value) {
        var hoursValid = Number(this.getHours(value)) < 24;
        var minutesValid = value.length < 3 || Number(this.getMinutes(value)) <= 60;
        console.log("Hours:" + hoursValid);
        console.log("Minutes:" + minutesValid);
        return hoursValid && minutesValid;
    };
    Calculator.prototype.getHours = function (value) {
        return value.replace(":", "").substring(0, 2);
    };
    Calculator.prototype.getMinutes = function (value) {
        return value.replace(":", "").substring(2);
    };
    Calculator.prototype.updateStateWithNewValue = function (event) {
        var newState = {};
        var val = event.currentTarget.value;
        if (val.length == 3 && val.indexOf(":") < 0) {
            val = val.substring(0, 2) + ":" + val.substring(2);
        }
        newState[event.currentTarget.name] = val;
        console.log(newState);
        this.setState(newState);
    };
    return Calculator;
}(React.Component));
exports.Calculator = Calculator;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map