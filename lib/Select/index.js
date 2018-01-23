"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _Menu = require("../Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _View = require("../core/View");

var _View2 = _interopRequireDefault(_View);

var _ThemedComponent2 = require("../utils/theming/ThemedComponent");

var _ThemedComponent3 = _interopRequireDefault(_ThemedComponent2);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_ThemedComponent) {
  (0, _inherits3.default)(Select, _ThemedComponent);

  function Select(props, context) {
    (0, _classCallCheck3.default)(this, Select);

    var _this = (0, _possibleConstructorReturn3.default)(this, _ThemedComponent.call(this, props, context, {
      namespace: "Select",
      styles: _styles2.default
    }));

    _this.getId = function () {
      return _this.props.id || _this.generatedId;
    };

    _this.renderLabel = function () {
      var label = _this.props.label;
      var theme = _this.theme;


      if (!label) {
        return null;
      }

      return _react2.default.createElement(
        "label",
        { className: theme.label, htmlFor: _this.getId() },
        label
      );
    };

    _this.onClick = function (e) {
      var disabled = _this.props.disabled;


      if (disabled) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    _this.onOpen = function () {
      var onOpen = _this.props.onOpen;

      _this.setState({ open: true });
      onOpen && onOpen();
    };

    _this.onClose = function () {
      var onClose = _this.props.onClose;

      _this.setState({ open: false });
      onClose && onClose();
    };

    _this.generatedId = _uuid2.default.v4();
    _this.state = {
      open: false
    };
    return _this;
  }

  Select.prototype.render = function render() {
    var _classNames,
        _classNames2,
        _this2 = this;

    var _props = this.props,
        children = _props.children,
        className = _props.className,
        inputClassName = _props.inputClassName,
        dir = _props.dir,
        disabled = _props.disabled,
        hint = _props.hint,
        maxHeight = _props.maxHeight,
        onBlur = _props.onBlur,
        onFocus = _props.onFocus,
        onChange = _props.onChange,
        positioning = _props.positioning,
        selected = _props.selected,
        size = _props.size,
        stretched = _props.stretched,
        tabIndex = _props.tabIndex,
        testId = _props.testId,
        title = _props.title,
        tooltipPositioning = _props.tooltipPositioning,
        validation = _props.validation,
        validationText = _props.validationText,
        shouldClose = _props.shouldClose,
        menuClassName = _props.menuClassName;
    var open = this.state.open;
    var theme = this.theme;


    return _react2.default.createElement(
      _View2.default,
      {
        className: (0, _classnames2.default)(theme.txt, theme[validation], theme["size_" + size], (_classNames = {}, _classNames[theme.rtl] = dir === "rtl", _classNames[theme.stretched] = stretched, _classNames[theme.disabled] = disabled, _classNames[theme.is_focused] = open, _classNames), className),
        testId: testId
      },
      this.renderLabel(),
      hint && _react2.default.createElement(
        "small",
        { className: theme.hint },
        hint
      ),
      _react2.default.createElement(
        _Menu2.default,
        {
          dir: dir,
          maxHeight: maxHeight,
          onChange: onChange,
          positioning: positioning,
          enableArrowKeyExpansion: true,
          onOpen: this.onOpen,
          onClose: this.onClose,
          trigger: _react2.default.createElement(
            _View2.default,
            {
              className: (0, _classnames2.default)(theme.input, (_classNames2 = {}, _classNames2[theme.open] = open, _classNames2), inputClassName),
              dir: dir,
              disabled: disabled,
              onBlur: onBlur,
              onClick: this.onClick,
              onFocus: onFocus,
              role: "button",
              tabIndex: disabled ? null : tabIndex,
              title: title,
              tooltipPositioning: tooltipPositioning,
              ref: function ref(_ref) {
                _this2.triggerNode = _this2.triggerNode || (0, _reactDom.findDOMNode)(_ref);
              }
            },
            selected || _react2.default.createElement(
              "span",
              null,
              "\xA0"
            )
          ),
          size: size,
          stretched: stretched,
          shouldClose: shouldClose,
          className: menuClassName
        },
        children
      ),
      validation && validationText && _react2.default.createElement(
        "small",
        { className: theme.message },
        validationText
      )
    );
  };

  return Select;
}(_ThemedComponent3.default);

Select.Item = _Menu2.default.Item;
Select.Separator = _Menu2.default.Separator;
Select.LinkItem = _Menu2.default.LinkItem;
Select.PreviousItem = _Menu2.default.PreviousItem;
Select.NextItem = _Menu2.default.NextItem;
Select.HeaderItem = _Menu2.default.HeaderItem;
Select.AddItem = _Menu2.default.AddItem;
Select.MediaItem = _Menu2.default.MediaItem;
Select.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * This is for use in self-service-components only
   */
  className: _propTypes2.default.string,
  dir: _propTypes2.default.oneOf(["ltr", "rtl"]),
  disabled: _propTypes2.default.bool,
  hint: _propTypes2.default.node,
  inputClassName: _propTypes2.default.string,
  label: _propTypes2.default.node,
  maxHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  onBlur: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onOpen: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  positioning: _Menu2.default.propTypes.positioning,
  selected: _propTypes2.default.node,
  stretched: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(["small", "medium"]),
  tabIndex: _propTypes2.default.number,
  testId: _propTypes2.default.string,
  /** Must be wrapped by a <a href="#tooltipprovider">TooltipProvider</a> */
  title: _propTypes2.default.string,
  /** <a href="#view">See View</a> for positioning options */
  tooltipPositioning: function tooltipPositioning() {},
  validation: _propTypes2.default.oneOf(["error", "warning", "success"]),
  validationText: _propTypes2.default.string,
  shouldClose: _propTypes2.default.func,
  menuClassName: _propTypes2.default.func
};
Select.defaultProps = {
  dir: "ltr",
  disabled: false,
  positioning: ["bottom_stretch", "top_stretch"],
  stretched: true,
  size: "medium",
  tabIndex: 0
};
exports.default = Select;