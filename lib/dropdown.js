"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var WRAPPER_CLASS = 'dropdown';
var OPENED_CLASS = 'open';
var HIGHLIGHT_CLASS = 'highlight';
var UIDropdown = (function (_super) {
    __extends(UIDropdown, _super);
    function UIDropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            opened: false,
            highlight: false
        };
        _this.handlerElement = null;
        _this.itemElements = null;
        _this.clickOutside = function (e) {
            var domNode = ReactDOM.findDOMNode(_this);
            if ((!domNode || !domNode.contains(e.target))) {
                _this.dropdownCloseHandler();
            }
        };
        _this.pressEscape = function (e) {
            if (e.keyCode === 27) {
                _this.dropdownCloseHandler();
            }
        };
        _this.clickHandler = function (e) {
            _this.dropdownToggleHandler();
        };
        _this.clickItemElement = function (e) {
            _this.dropdownToggleHandler();
        };
        return _this;
    }
    UIDropdown.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextState.opened !== this.state.opened ||
            this.props.children !== nextProps.children ||
            this.state.highlight !== nextState.highlight;
    };
    UIDropdown.prototype.removeClickOutsideListeners = function () {
        window.removeEventListener('mousedown', this.clickOutside, false);
    };
    UIDropdown.prototype.addClickOutsideListeners = function () {
        this.removeClickOutsideListeners();
        window.addEventListener('mousedown', this.clickOutside, false);
    };
    UIDropdown.prototype.removeEscListener = function () {
        window.removeEventListener('keyup', this.pressEscape, false);
    };
    UIDropdown.prototype.addEscListener = function () {
        this.removeEscListener();
        window.addEventListener('keyup', this.pressEscape, false);
    };
    UIDropdown.prototype.removeClickHandlerListeners = function () {
        window.removeEventListener('mousedown', this.clickOutside, false);
    };
    UIDropdown.prototype.addClickHandlerListeners = function () {
        this.removeClickHandlerListeners();
        this.handlerElement.addEventListener('mousedown', this.clickHandler, false);
    };
    UIDropdown.prototype.removeClickOnElementListeners = function () {
        if (this.itemElements) {
            for (var i = 0, l = this.itemElements.length; i < l; i++) {
                this.itemElements[i].removeEventListener('click', this.clickItemElement, true);
            }
        }
    };
    UIDropdown.prototype.addClickOnElementListeners = function () {
        this.itemElements = ReactDOM.findDOMNode(this).querySelectorAll("." + this.props.itemElementsClassName);
        this.removeClickOnElementListeners();
        for (var i = 0, l = this.itemElements.length; i < l; i++) {
            this.itemElements[i].addEventListener('click', this.clickItemElement, true);
        }
    };
    UIDropdown.prototype.componentWillUnmount = function () {
        this.removeClickOutsideListeners();
        this.removeClickHandlerListeners();
        this.removeClickOnElementListeners();
        this.removeEscListener();
    };
    UIDropdown.prototype.componentDidMount = function () {
        this.handlerElement = ReactDOM.findDOMNode(this).querySelector("." + this.props.handlerClassName);
        this.addClickHandlerListeners();
    };
    UIDropdown.prototype.componentDidUpdate = function () {
        this.addClickOnElementListeners();
    };
    UIDropdown.prototype.dropdownToggleHandler = function () {
        var state = !this.state.opened;
        if (this.props.globalPositioned === true) {
            this.setState({
                highlight: state,
                opened: false
            });
        }
        else {
            this.setState({
                highlight: state,
                opened: state
            });
            if (state) {
                this.addClickOutsideListeners();
                this.addEscListener();
                this.addClickOnElementListeners();
            }
            else {
                this.removeClickOutsideListeners();
                this.removeEscListener();
                this.removeClickOnElementListeners();
            }
        }
    };
    UIDropdown.prototype.dropdownCloseHandler = function () {
        if (this.props.globalPositioned === true) {
            this.setState({
                highlight: false,
                opened: false
            });
        }
        else {
            this.setState({
                highlight: false,
                opened: false
            });
        }
        this.removeClickOutsideListeners();
    };
    UIDropdown.prototype.getDropdownClassName = function () {
        var className = WRAPPER_CLASS;
        if (this.state.highlight) {
            className += " " + HIGHLIGHT_CLASS;
        }
        if (this.state.opened) {
            className += " " + OPENED_CLASS;
        }
        return className;
    };
    UIDropdown.prototype.render = function () {
        return (React.createElement("div", { className: this.getDropdownClassName() }, this.props.children));
    };
    return UIDropdown;
}(React.Component));
exports.UIDropdown = UIDropdown;
