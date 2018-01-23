import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import styles from "./styles.css";

const hasAnyHandlers = handlers =>
  Object.keys(handlers).some(key => handlers[key]);

export default class View extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    dir: PropTypes.oneOf(["ltr", "rtl"]),
    hidden: PropTypes.bool,
    onClick: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onArrowDown: PropTypes.func,
    onArrowLeft: PropTypes.func,
    onArrowRight: PropTypes.func,
    onArrowUp: PropTypes.func,
    onBackspace: PropTypes.func,
    onDelete: PropTypes.func,
    onEnter: PropTypes.func,
    onEscape: PropTypes.func,
    onMouseOver: PropTypes.func,
    onKeyDown: PropTypes.func,
    onScroll: PropTypes.func,
    onSpace: PropTypes.func,
    onTab: PropTypes.func,
    testId: PropTypes.string,
    /** Hiding advanced content within tooltips may have accessibility impacts */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** One of: 'top', 'right', 'bottom', 'left' or as array (prioritization) */
    tooltipPositioning: () => {}
  };

  static contextTypes = {
    tooltips: PropTypes.object
  };

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.element.focus();
    }
  }

  componentWillUnmount() {
    const { tooltips } = this.context;

    if (tooltips && this.tooltipId != null) {
      tooltips.hide(this.tooltipId);
    }
  }

  render() {
    const {
      children,
      className,
      hidden,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
      onArrowUp,
      onDelete,
      onEnter,
      onEscape,
      onKeyDown,
      onSpace,
      onTab,
      title,
      tooltipPositioning,
      testId,
      ...other
    } = this.props;

    const keyDownHandlers = {
      "8": onDelete,
      "9": onTab,
      "13": onEnter,
      "27": onEscape,
      "32": onSpace,
      "37": onArrowLeft,
      "38": onArrowUp,
      "39": onArrowRight,
      "40": onArrowDown
    };

    const eventHandlers = {};

    if (onKeyDown || hasAnyHandlers(keyDownHandlers)) {
      eventHandlers.onKeyDown = e => {
        const handler = keyDownHandlers[e.keyCode];
        handler && handler(e);
        onKeyDown && onKeyDown(e);
      };
    }

    const props = {
      ...other,
      ...eventHandlers
    };

    const { tooltips } = this.context;

    if (tooltips && title) {
      props.onMouseEnter = e => {
        this.tooltipId = tooltips.show(this.element, title, tooltipPositioning);
        this.props.onMouseOver && this.props.onMouseOver(e);
      };
      ["onMouseLeave", "onBlur", "onWheel", "onClick"].forEach(handler => {
        props[handler] = e => {
          tooltips.hide(this.tooltipId);
          this.props[handler] && this.props[handler](e);
        };
      });

      props["aria-label"] = title;
    } else if (title) {
      props.title = title;
    }

    if (testId) {
      props["data-test-id"] = testId;
    }

    if (hidden) {
      props["aria-hidden"] = true;
    }

    return (
      <div
        {...props}
        className={classNames(styles.view, className)}
        ref={ref => {
          this.element = ref;
        }}
      >
        {children}
      </div>
    );
  }
}