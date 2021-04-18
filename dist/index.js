'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
var React = __importStar(require('react'));
var auto_id_1 = require('@reach/auto-id');
// tslint:disable-next-line
require('glider-js');
var GliderComponent = React.forwardRef(function (props, ref) {
  var innerRef = React.useRef(null);
  var gliderRef = React.useRef();
  var isMountedRef = React.useRef(false);
  var autoId = auto_id_1.useId();
  var nextBtnId = 'glider-next-' + autoId;
  var prevBtnId = 'glider-prev-' + autoId;
  var dotsId = 'dots-' + autoId;
  var makeGliderOptions = function () {
    return __assign(__assign({}, props), {
      arrows:
        (props.hasArrows && {
          next:
            (props.arrows && props.arrows.next && props.arrows.next) ||
            '#' + nextBtnId,
          prev:
            (props.arrows && props.arrows.prev && props.arrows.prev) ||
            '#' + prevBtnId,
        }) ||
        undefined,
      dots: (props.hasDots && props.dots) || '#' + dotsId || undefined,
    });
  };
  // On mount initialize the glider and hook up events
  React.useLayoutEffect(function () {
    if (!innerRef.current) {
      return;
    }
    // @ts-ignore
    var glider = new Glider(innerRef.current, makeGliderOptions());
    gliderRef.current = glider;
    var addEventListener = function (event, fn) {
      if (typeof fn === 'function' && innerRef.current) {
        innerRef.current.addEventListener(event, fn);
      }
    };
    addEventListener('glider-slide-visible', props.onSlideVisible);
    addEventListener('glider-loaded', props.onLoad);
    addEventListener('glider-animated', props.onAnimated);
    addEventListener('glider-remove', props.onRemove);
    addEventListener('glider-refresh', props.onRefresh);
    addEventListener('glider-add', props.onAdd);
    addEventListener('glider-destroy', props.onDestroy);
    addEventListener('glider-slide-hidden', props.onSlideHidden);
    if (props.scrollToSlide) {
      glider.scrollItem(props.scrollToSlide - 1);
    } else if (props.scrollToPage) {
      glider.scrollItem(props.scrollToPage - 1, true);
    }
  }, []);
  React.useEffect(function () {
    isMountedRef.current = true;
    return function () {
      var removeEventListener = function (event, fn) {
        if (typeof fn === 'function' && innerRef.current) {
          innerRef.current.removeEventListener(event, fn);
        }
      };
      removeEventListener('glider-slide-visible', props.onSlideVisible);
      removeEventListener('glider-loaded', props.onLoad);
      removeEventListener('glider-animated', props.onAnimated);
      removeEventListener('glider-remove', props.onRemove);
      removeEventListener('glider-refresh', props.onRefresh);
      removeEventListener('glider-add', props.onAdd);
      removeEventListener('glider-destroy', props.onDestroy);
      removeEventListener('glider-slide-hidden', props.onSlideHidden);
      if (gliderRef.current) {
        gliderRef.current.destroy();
      }
    };
  }, []);
  // When the props update, update the glider
  React.useEffect(
    function () {
      if (!(gliderRef.current && isMountedRef.current)) {
        return;
      }
      gliderRef.current.setOption(makeGliderOptions(), true);
      gliderRef.current.refresh(true);
    },
    [props]
  );
  // Expose the glider instance to the user so they can call the methods too
  React.useImperativeHandle(ref, function () {
    return gliderRef.current;
  });
  var Element = props.containerElement || 'div';
  return React.createElement(
    Element,
    { className: 'glider-contain' },
    props.hasArrows &&
      !props.arrows &&
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'glider-prev',
          'aria-label': 'Previous',
          id: prevBtnId,
        },
        props.iconLeft || '«'
      ),
    React.createElement(
      'div',
      { className: props.className, ref: innerRef },
      props.children
    ),
    props.hasDots && !props.dots && React.createElement('div', { id: dotsId }),
    props.hasArrows &&
      !props.arrows &&
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'glider-next',
          'aria-label': 'Next',
          id: nextBtnId,
        },
        props.iconRight || '»'
      )
  );
});
exports.default = GliderComponent;
//# sourceMappingURL=index.js.map
