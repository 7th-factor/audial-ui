var qS = Object.defineProperty;
var GS = (t, n, r) => n in t ? qS(t, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[n] = r;
var Xf = (t, n, r) => GS(t, typeof n != "symbol" ? n + "" : n, r);
function YS(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var If = { exports: {} }, Ds = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _1;
function XS() {
  if (_1) return Ds;
  _1 = 1;
  var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
  function r(i, o, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), o.key !== void 0 && (c = "" + o.key), "key" in o) {
      u = {};
      for (var h in o)
        h !== "key" && (u[h] = o[h]);
    } else u = o;
    return o = u.ref, {
      $$typeof: t,
      type: i,
      key: c,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return Ds.Fragment = n, Ds.jsx = r, Ds.jsxs = r, Ds;
}
var R1;
function IS() {
  return R1 || (R1 = 1, If.exports = XS()), If.exports;
}
var Z = IS(), Zf = { exports: {} }, Os = {}, Wf = { exports: {} }, Kf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var k1;
function ZS() {
  return k1 || (k1 = 1, function(t) {
    function n(k, O) {
      var z = k.length;
      k.push(O);
      e: for (; 0 < z; ) {
        var q = z - 1 >>> 1, M = k[q];
        if (0 < o(M, O))
          k[q] = O, k[z] = M, z = q;
        else break e;
      }
    }
    function r(k) {
      return k.length === 0 ? null : k[0];
    }
    function i(k) {
      if (k.length === 0) return null;
      var O = k[0], z = k.pop();
      if (z !== O) {
        k[0] = z;
        e: for (var q = 0, M = k.length, B = M >>> 1; q < B; ) {
          var G = 2 * (q + 1) - 1, J = k[G], te = G + 1, pe = k[te];
          if (0 > o(J, z))
            te < M && 0 > o(pe, J) ? (k[q] = pe, k[te] = z, q = te) : (k[q] = J, k[G] = z, q = G);
          else if (te < M && 0 > o(pe, z))
            k[q] = pe, k[te] = z, q = te;
          else break e;
        }
      }
      return O;
    }
    function o(k, O) {
      var z = k.sortIndex - O.sortIndex;
      return z !== 0 ? z : k.id - O.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, h = c.now();
      t.unstable_now = function() {
        return c.now() - h;
      };
    }
    var d = [], p = [], g = 1, y = null, v = 3, w = !1, x = !1, S = !1, T = !1, E = typeof setTimeout == "function" ? setTimeout : null, N = typeof clearTimeout == "function" ? clearTimeout : null, C = typeof setImmediate < "u" ? setImmediate : null;
    function X(k) {
      for (var O = r(p); O !== null; ) {
        if (O.callback === null) i(p);
        else if (O.startTime <= k)
          i(p), O.sortIndex = O.expirationTime, n(d, O);
        else break;
        O = r(p);
      }
    }
    function D(k) {
      if (S = !1, X(k), !x)
        if (r(d) !== null)
          x = !0, U || (U = !0, ne());
        else {
          var O = r(p);
          O !== null && se(D, O.startTime - k);
        }
    }
    var U = !1, P = -1, _ = 5, F = -1;
    function ae() {
      return T ? !0 : !(t.unstable_now() - F < _);
    }
    function ee() {
      if (T = !1, U) {
        var k = t.unstable_now();
        F = k;
        var O = !0;
        try {
          e: {
            x = !1, S && (S = !1, N(P), P = -1), w = !0;
            var z = v;
            try {
              t: {
                for (X(k), y = r(d); y !== null && !(y.expirationTime > k && ae()); ) {
                  var q = y.callback;
                  if (typeof q == "function") {
                    y.callback = null, v = y.priorityLevel;
                    var M = q(
                      y.expirationTime <= k
                    );
                    if (k = t.unstable_now(), typeof M == "function") {
                      y.callback = M, X(k), O = !0;
                      break t;
                    }
                    y === r(d) && i(d), X(k);
                  } else i(d);
                  y = r(d);
                }
                if (y !== null) O = !0;
                else {
                  var B = r(p);
                  B !== null && se(
                    D,
                    B.startTime - k
                  ), O = !1;
                }
              }
              break e;
            } finally {
              y = null, v = z, w = !1;
            }
            O = void 0;
          }
        } finally {
          O ? ne() : U = !1;
        }
      }
    }
    var ne;
    if (typeof C == "function")
      ne = function() {
        C(ee);
      };
    else if (typeof MessageChannel < "u") {
      var he = new MessageChannel(), ce = he.port2;
      he.port1.onmessage = ee, ne = function() {
        ce.postMessage(null);
      };
    } else
      ne = function() {
        E(ee, 0);
      };
    function se(k, O) {
      P = E(function() {
        k(t.unstable_now());
      }, O);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(k) {
      k.callback = null;
    }, t.unstable_forceFrameRate = function(k) {
      0 > k || 125 < k ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : _ = 0 < k ? Math.floor(1e3 / k) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, t.unstable_next = function(k) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = v;
      }
      var z = v;
      v = O;
      try {
        return k();
      } finally {
        v = z;
      }
    }, t.unstable_requestPaint = function() {
      T = !0;
    }, t.unstable_runWithPriority = function(k, O) {
      switch (k) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          k = 3;
      }
      var z = v;
      v = k;
      try {
        return O();
      } finally {
        v = z;
      }
    }, t.unstable_scheduleCallback = function(k, O, z) {
      var q = t.unstable_now();
      switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? q + z : q) : z = q, k) {
        case 1:
          var M = -1;
          break;
        case 2:
          M = 250;
          break;
        case 5:
          M = 1073741823;
          break;
        case 4:
          M = 1e4;
          break;
        default:
          M = 5e3;
      }
      return M = z + M, k = {
        id: g++,
        callback: O,
        priorityLevel: k,
        startTime: z,
        expirationTime: M,
        sortIndex: -1
      }, z > q ? (k.sortIndex = z, n(p, k), r(d) === null && k === r(p) && (S ? (N(P), P = -1) : S = !0, se(D, z - q))) : (k.sortIndex = M, n(d, k), x || w || (x = !0, U || (U = !0, ne()))), k;
    }, t.unstable_shouldYield = ae, t.unstable_wrapCallback = function(k) {
      var O = v;
      return function() {
        var z = v;
        v = O;
        try {
          return k.apply(this, arguments);
        } finally {
          v = z;
        }
      };
    };
  }(Kf)), Kf;
}
var N1;
function WS() {
  return N1 || (N1 = 1, Wf.exports = ZS()), Wf.exports;
}
var Qf = { exports: {} }, xe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D1;
function KS() {
  if (D1) return xe;
  D1 = 1;
  var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), y = Symbol.iterator;
  function v(M) {
    return M === null || typeof M != "object" ? null : (M = y && M[y] || M["@@iterator"], typeof M == "function" ? M : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, x = Object.assign, S = {};
  function T(M, B, G) {
    this.props = M, this.context = B, this.refs = S, this.updater = G || w;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(M, B) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, B, "setState");
  }, T.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function E() {
  }
  E.prototype = T.prototype;
  function N(M, B, G) {
    this.props = M, this.context = B, this.refs = S, this.updater = G || w;
  }
  var C = N.prototype = new E();
  C.constructor = N, x(C, T.prototype), C.isPureReactComponent = !0;
  var X = Array.isArray, D = { H: null, A: null, T: null, S: null, V: null }, U = Object.prototype.hasOwnProperty;
  function P(M, B, G, J, te, pe) {
    return G = pe.ref, {
      $$typeof: t,
      type: M,
      key: B,
      ref: G !== void 0 ? G : null,
      props: pe
    };
  }
  function _(M, B) {
    return P(
      M.type,
      B,
      void 0,
      void 0,
      void 0,
      M.props
    );
  }
  function F(M) {
    return typeof M == "object" && M !== null && M.$$typeof === t;
  }
  function ae(M) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(G) {
      return B[G];
    });
  }
  var ee = /\/+/g;
  function ne(M, B) {
    return typeof M == "object" && M !== null && M.key != null ? ae("" + M.key) : B.toString(36);
  }
  function he() {
  }
  function ce(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(he, he) : (M.status = "pending", M.then(
          function(B) {
            M.status === "pending" && (M.status = "fulfilled", M.value = B);
          },
          function(B) {
            M.status === "pending" && (M.status = "rejected", M.reason = B);
          }
        )), M.status) {
          case "fulfilled":
            return M.value;
          case "rejected":
            throw M.reason;
        }
    }
    throw M;
  }
  function se(M, B, G, J, te) {
    var pe = typeof M;
    (pe === "undefined" || pe === "boolean") && (M = null);
    var ie = !1;
    if (M === null) ie = !0;
    else
      switch (pe) {
        case "bigint":
        case "string":
        case "number":
          ie = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case t:
            case n:
              ie = !0;
              break;
            case g:
              return ie = M._init, se(
                ie(M._payload),
                B,
                G,
                J,
                te
              );
          }
      }
    if (ie)
      return te = te(M), ie = J === "" ? "." + ne(M, 0) : J, X(te) ? (G = "", ie != null && (G = ie.replace(ee, "$&/") + "/"), se(te, B, G, "", function(We) {
        return We;
      })) : te != null && (F(te) && (te = _(
        te,
        G + (te.key == null || M && M.key === te.key ? "" : ("" + te.key).replace(
          ee,
          "$&/"
        ) + "/") + ie
      )), B.push(te)), 1;
    ie = 0;
    var me = J === "" ? "." : J + ":";
    if (X(M))
      for (var Me = 0; Me < M.length; Me++)
        J = M[Me], pe = me + ne(J, Me), ie += se(
          J,
          B,
          G,
          pe,
          te
        );
    else if (Me = v(M), typeof Me == "function")
      for (M = Me.call(M), Me = 0; !(J = M.next()).done; )
        J = J.value, pe = me + ne(J, Me++), ie += se(
          J,
          B,
          G,
          pe,
          te
        );
    else if (pe === "object") {
      if (typeof M.then == "function")
        return se(
          ce(M),
          B,
          G,
          J,
          te
        );
      throw B = String(M), Error(
        "Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ie;
  }
  function k(M, B, G) {
    if (M == null) return M;
    var J = [], te = 0;
    return se(M, J, "", "", function(pe) {
      return B.call(G, pe, te++);
    }), J;
  }
  function O(M) {
    if (M._status === -1) {
      var B = M._result;
      B = B(), B.then(
        function(G) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = G);
        },
        function(G) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = G);
        }
      ), M._status === -1 && (M._status = 0, M._result = B);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var z = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var B = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(B)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  };
  function q() {
  }
  return xe.Children = {
    map: k,
    forEach: function(M, B, G) {
      k(
        M,
        function() {
          B.apply(this, arguments);
        },
        G
      );
    },
    count: function(M) {
      var B = 0;
      return k(M, function() {
        B++;
      }), B;
    },
    toArray: function(M) {
      return k(M, function(B) {
        return B;
      }) || [];
    },
    only: function(M) {
      if (!F(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  }, xe.Component = T, xe.Fragment = r, xe.Profiler = o, xe.PureComponent = N, xe.StrictMode = i, xe.Suspense = d, xe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = D, xe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(M) {
      return D.H.useMemoCache(M);
    }
  }, xe.cache = function(M) {
    return function() {
      return M.apply(null, arguments);
    };
  }, xe.cloneElement = function(M, B, G) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var J = x({}, M.props), te = M.key, pe = void 0;
    if (B != null)
      for (ie in B.ref !== void 0 && (pe = void 0), B.key !== void 0 && (te = "" + B.key), B)
        !U.call(B, ie) || ie === "key" || ie === "__self" || ie === "__source" || ie === "ref" && B.ref === void 0 || (J[ie] = B[ie]);
    var ie = arguments.length - 2;
    if (ie === 1) J.children = G;
    else if (1 < ie) {
      for (var me = Array(ie), Me = 0; Me < ie; Me++)
        me[Me] = arguments[Me + 2];
      J.children = me;
    }
    return P(M.type, te, void 0, void 0, pe, J);
  }, xe.createContext = function(M) {
    return M = {
      $$typeof: c,
      _currentValue: M,
      _currentValue2: M,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, M.Provider = M, M.Consumer = {
      $$typeof: u,
      _context: M
    }, M;
  }, xe.createElement = function(M, B, G) {
    var J, te = {}, pe = null;
    if (B != null)
      for (J in B.key !== void 0 && (pe = "" + B.key), B)
        U.call(B, J) && J !== "key" && J !== "__self" && J !== "__source" && (te[J] = B[J]);
    var ie = arguments.length - 2;
    if (ie === 1) te.children = G;
    else if (1 < ie) {
      for (var me = Array(ie), Me = 0; Me < ie; Me++)
        me[Me] = arguments[Me + 2];
      te.children = me;
    }
    if (M && M.defaultProps)
      for (J in ie = M.defaultProps, ie)
        te[J] === void 0 && (te[J] = ie[J]);
    return P(M, pe, void 0, void 0, null, te);
  }, xe.createRef = function() {
    return { current: null };
  }, xe.forwardRef = function(M) {
    return { $$typeof: h, render: M };
  }, xe.isValidElement = F, xe.lazy = function(M) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: M },
      _init: O
    };
  }, xe.memo = function(M, B) {
    return {
      $$typeof: p,
      type: M,
      compare: B === void 0 ? null : B
    };
  }, xe.startTransition = function(M) {
    var B = D.T, G = {};
    D.T = G;
    try {
      var J = M(), te = D.S;
      te !== null && te(G, J), typeof J == "object" && J !== null && typeof J.then == "function" && J.then(q, z);
    } catch (pe) {
      z(pe);
    } finally {
      D.T = B;
    }
  }, xe.unstable_useCacheRefresh = function() {
    return D.H.useCacheRefresh();
  }, xe.use = function(M) {
    return D.H.use(M);
  }, xe.useActionState = function(M, B, G) {
    return D.H.useActionState(M, B, G);
  }, xe.useCallback = function(M, B) {
    return D.H.useCallback(M, B);
  }, xe.useContext = function(M) {
    return D.H.useContext(M);
  }, xe.useDebugValue = function() {
  }, xe.useDeferredValue = function(M, B) {
    return D.H.useDeferredValue(M, B);
  }, xe.useEffect = function(M, B, G) {
    var J = D.H;
    if (typeof G == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return J.useEffect(M, B);
  }, xe.useId = function() {
    return D.H.useId();
  }, xe.useImperativeHandle = function(M, B, G) {
    return D.H.useImperativeHandle(M, B, G);
  }, xe.useInsertionEffect = function(M, B) {
    return D.H.useInsertionEffect(M, B);
  }, xe.useLayoutEffect = function(M, B) {
    return D.H.useLayoutEffect(M, B);
  }, xe.useMemo = function(M, B) {
    return D.H.useMemo(M, B);
  }, xe.useOptimistic = function(M, B) {
    return D.H.useOptimistic(M, B);
  }, xe.useReducer = function(M, B, G) {
    return D.H.useReducer(M, B, G);
  }, xe.useRef = function(M) {
    return D.H.useRef(M);
  }, xe.useState = function(M) {
    return D.H.useState(M);
  }, xe.useSyncExternalStore = function(M, B, G) {
    return D.H.useSyncExternalStore(
      M,
      B,
      G
    );
  }, xe.useTransition = function() {
    return D.H.useTransition();
  }, xe.version = "19.1.0", xe;
}
var O1;
function mu() {
  return O1 || (O1 = 1, Qf.exports = KS()), Qf.exports;
}
var Ff = { exports: {} }, Ct = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var L1;
function QS() {
  if (L1) return Ct;
  L1 = 1;
  var t = mu();
  function n(d) {
    var p = "https://react.dev/errors/" + d;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        p += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + d + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var i = {
    d: {
      f: r,
      r: function() {
        throw Error(n(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function u(d, p, g) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: y == null ? null : "" + y,
      children: d,
      containerInfo: p,
      implementation: g
    };
  }
  var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(d, p) {
    if (d === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, Ct.createPortal = function(d, p) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(n(299));
    return u(d, p, null, g);
  }, Ct.flushSync = function(d) {
    var p = c.T, g = i.p;
    try {
      if (c.T = null, i.p = 2, d) return d();
    } finally {
      c.T = p, i.p = g, i.d.f();
    }
  }, Ct.preconnect = function(d, p) {
    typeof d == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, i.d.C(d, p));
  }, Ct.prefetchDNS = function(d) {
    typeof d == "string" && i.d.D(d);
  }, Ct.preinit = function(d, p) {
    if (typeof d == "string" && p && typeof p.as == "string") {
      var g = p.as, y = h(g, p.crossOrigin), v = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      g === "style" ? i.d.S(
        d,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: y,
          integrity: v,
          fetchPriority: w
        }
      ) : g === "script" && i.d.X(d, {
        crossOrigin: y,
        integrity: v,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Ct.preinitModule = function(d, p) {
    if (typeof d == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var g = h(
            p.as,
            p.crossOrigin
          );
          i.d.M(d, {
            crossOrigin: g,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && i.d.M(d);
  }, Ct.preload = function(d, p) {
    if (typeof d == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var g = p.as, y = h(g, p.crossOrigin);
      i.d.L(d, g, {
        crossOrigin: y,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, Ct.preloadModule = function(d, p) {
    if (typeof d == "string")
      if (p) {
        var g = h(p.as, p.crossOrigin);
        i.d.m(d, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: g,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else i.d.m(d);
  }, Ct.requestFormReset = function(d) {
    i.d.r(d);
  }, Ct.unstable_batchedUpdates = function(d, p) {
    return d(p);
  }, Ct.useFormState = function(d, p, g) {
    return c.H.useFormState(d, p, g);
  }, Ct.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, Ct.version = "19.1.0", Ct;
}
var z1;
function Gb() {
  if (z1) return Ff.exports;
  z1 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (n) {
        console.error(n);
      }
  }
  return t(), Ff.exports = QS(), Ff.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var B1;
function FS() {
  if (B1) return Os;
  B1 = 1;
  var t = WS(), n = mu(), r = Gb();
  function i(e) {
    var a = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var s = 2; s < arguments.length; s++)
        a += "&args[]=" + encodeURIComponent(arguments[s]);
    }
    return "Minified React error #" + e + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var a = e, s = e;
    if (e.alternate) for (; a.return; ) a = a.return;
    else {
      e = a;
      do
        a = e, (a.flags & 4098) !== 0 && (s = a.return), e = a.return;
      while (e);
    }
    return a.tag === 3 ? s : null;
  }
  function c(e) {
    if (e.tag === 13) {
      var a = e.memoizedState;
      if (a === null && (e = e.alternate, e !== null && (a = e.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (u(e) !== e)
      throw Error(i(188));
  }
  function d(e) {
    var a = e.alternate;
    if (!a) {
      if (a = u(e), a === null) throw Error(i(188));
      return a !== e ? null : e;
    }
    for (var s = e, l = a; ; ) {
      var f = s.return;
      if (f === null) break;
      var m = f.alternate;
      if (m === null) {
        if (l = f.return, l !== null) {
          s = l;
          continue;
        }
        break;
      }
      if (f.child === m.child) {
        for (m = f.child; m; ) {
          if (m === s) return h(f), e;
          if (m === l) return h(f), a;
          m = m.sibling;
        }
        throw Error(i(188));
      }
      if (s.return !== l.return) s = f, l = m;
      else {
        for (var b = !1, A = f.child; A; ) {
          if (A === s) {
            b = !0, s = f, l = m;
            break;
          }
          if (A === l) {
            b = !0, l = f, s = m;
            break;
          }
          A = A.sibling;
        }
        if (!b) {
          for (A = m.child; A; ) {
            if (A === s) {
              b = !0, s = m, l = f;
              break;
            }
            if (A === l) {
              b = !0, l = m, s = f;
              break;
            }
            A = A.sibling;
          }
          if (!b) throw Error(i(189));
        }
      }
      if (s.alternate !== l) throw Error(i(190));
    }
    if (s.tag !== 3) throw Error(i(188));
    return s.stateNode.current === s ? e : a;
  }
  function p(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e;
    for (e = e.child; e !== null; ) {
      if (a = p(e), a !== null) return a;
      e = e.sibling;
    }
    return null;
  }
  var g = Object.assign, y = Symbol.for("react.element"), v = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), x = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), N = Symbol.for("react.consumer"), C = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), P = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), F = Symbol.for("react.activity"), ae = Symbol.for("react.memo_cache_sentinel"), ee = Symbol.iterator;
  function ne(e) {
    return e === null || typeof e != "object" ? null : (e = ee && e[ee] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var he = Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === he ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case x:
        return "Fragment";
      case T:
        return "Profiler";
      case S:
        return "StrictMode";
      case D:
        return "Suspense";
      case U:
        return "SuspenseList";
      case F:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case C:
          return (e.displayName || "Context") + ".Provider";
        case N:
          return (e._context.displayName || "Context") + ".Consumer";
        case X:
          var a = e.render;
          return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case P:
          return a = e.displayName || null, a !== null ? a : ce(e.type) || "Memo";
        case _:
          a = e._payload, e = e._init;
          try {
            return ce(e(a));
          } catch {
          }
      }
    return null;
  }
  var se = Array.isArray, k = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, q = [], M = -1;
  function B(e) {
    return { current: e };
  }
  function G(e) {
    0 > M || (e.current = q[M], q[M] = null, M--);
  }
  function J(e, a) {
    M++, q[M] = e.current, e.current = a;
  }
  var te = B(null), pe = B(null), ie = B(null), me = B(null);
  function Me(e, a) {
    switch (J(ie, a), J(pe, e), J(te, null), a.nodeType) {
      case 9:
      case 11:
        e = (e = a.documentElement) && (e = e.namespaceURI) ? n1(e) : 0;
        break;
      default:
        if (e = a.tagName, a = a.namespaceURI)
          a = n1(a), e = a1(a, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    G(te), J(te, e);
  }
  function We() {
    G(te), G(pe), G(ie);
  }
  function yt(e) {
    e.memoizedState !== null && J(me, e);
    var a = te.current, s = a1(a, e.type);
    a !== s && (J(pe, e), J(te, s));
  }
  function Tt(e) {
    pe.current === e && (G(te), G(pe)), me.current === e && (G(me), Cs._currentValue = z);
  }
  var dt = Object.prototype.hasOwnProperty, ra = t.unstable_scheduleCallback, mn = t.unstable_cancelCallback, re = t.unstable_shouldYield, ge = t.unstable_requestPaint, Ce = t.unstable_now, qe = t.unstable_getCurrentPriorityLevel, ke = t.unstable_ImmediatePriority, Ge = t.unstable_UserBlockingPriority, vt = t.unstable_NormalPriority, Mn = t.unstable_LowPriority, ia = t.unstable_IdlePriority, zi = t.log, Du = t.unstable_setDisableYieldValue, qa = null, Ht = null;
  function sa(e) {
    if (typeof zi == "function" && Du(e), Ht && typeof Ht.setStrictMode == "function")
      try {
        Ht.setStrictMode(qa, e);
      } catch {
      }
  }
  var qt = Math.clz32 ? Math.clz32 : _x, Ex = Math.log, Cx = Math.LN2;
  function _x(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ex(e) / Cx | 0) | 0;
  }
  var go = 256, yo = 4194304;
  function Ga(e) {
    var a = e & 42;
    if (a !== 0) return a;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function vo(e, a, s) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var f = 0, m = e.suspendedLanes, b = e.pingedLanes;
    e = e.warmLanes;
    var A = l & 134217727;
    return A !== 0 ? (l = A & ~m, l !== 0 ? f = Ga(l) : (b &= A, b !== 0 ? f = Ga(b) : s || (s = A & ~e, s !== 0 && (f = Ga(s))))) : (A = l & ~m, A !== 0 ? f = Ga(A) : b !== 0 ? f = Ga(b) : s || (s = l & ~e, s !== 0 && (f = Ga(s)))), f === 0 ? 0 : a !== 0 && a !== f && (a & m) === 0 && (m = f & -f, s = a & -a, m >= s || m === 32 && (s & 4194048) !== 0) ? a : f;
  }
  function Bi(e, a) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & a) === 0;
  }
  function Rx(e, a) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return a + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function j0() {
    var e = go;
    return go <<= 1, (go & 4194048) === 0 && (go = 256), e;
  }
  function P0() {
    var e = yo;
    return yo <<= 1, (yo & 62914560) === 0 && (yo = 4194304), e;
  }
  function Ou(e) {
    for (var a = [], s = 0; 31 > s; s++) a.push(e);
    return a;
  }
  function Vi(e, a) {
    e.pendingLanes |= a, a !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function kx(e, a, s, l, f, m) {
    var b = e.pendingLanes;
    e.pendingLanes = s, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= s, e.entangledLanes &= s, e.errorRecoveryDisabledLanes &= s, e.shellSuspendCounter = 0;
    var A = e.entanglements, R = e.expirationTimes, H = e.hiddenUpdates;
    for (s = b & ~s; 0 < s; ) {
      var K = 31 - qt(s), $ = 1 << K;
      A[K] = 0, R[K] = -1;
      var Y = H[K];
      if (Y !== null)
        for (H[K] = null, K = 0; K < Y.length; K++) {
          var I = Y[K];
          I !== null && (I.lane &= -536870913);
        }
      s &= ~$;
    }
    l !== 0 && H0(e, l, 0), m !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= m & ~(b & ~a));
  }
  function H0(e, a, s) {
    e.pendingLanes |= a, e.suspendedLanes &= ~a;
    var l = 31 - qt(a);
    e.entangledLanes |= a, e.entanglements[l] = e.entanglements[l] | 1073741824 | s & 4194090;
  }
  function q0(e, a) {
    var s = e.entangledLanes |= a;
    for (e = e.entanglements; s; ) {
      var l = 31 - qt(s), f = 1 << l;
      f & a | e[l] & a && (e[l] |= a), s &= ~f;
    }
  }
  function Lu(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function zu(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function G0() {
    var e = O.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : S1(e.type));
  }
  function Nx(e, a) {
    var s = O.p;
    try {
      return O.p = e, a();
    } finally {
      O.p = s;
    }
  }
  var oa = Math.random().toString(36).slice(2), Mt = "__reactFiber$" + oa, Ot = "__reactProps$" + oa, Tr = "__reactContainer$" + oa, Bu = "__reactEvents$" + oa, Dx = "__reactListeners$" + oa, Ox = "__reactHandles$" + oa, Y0 = "__reactResources$" + oa, Ui = "__reactMarker$" + oa;
  function Vu(e) {
    delete e[Mt], delete e[Ot], delete e[Bu], delete e[Dx], delete e[Ox];
  }
  function Mr(e) {
    var a = e[Mt];
    if (a) return a;
    for (var s = e.parentNode; s; ) {
      if (a = s[Tr] || s[Mt]) {
        if (s = a.alternate, a.child !== null || s !== null && s.child !== null)
          for (e = o1(e); e !== null; ) {
            if (s = e[Mt]) return s;
            e = o1(e);
          }
        return a;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Er(e) {
    if (e = e[Mt] || e[Tr]) {
      var a = e.tag;
      if (a === 5 || a === 6 || a === 13 || a === 26 || a === 27 || a === 3)
        return e;
    }
    return null;
  }
  function ji(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Cr(e) {
    var a = e[Y0];
    return a || (a = e[Y0] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function ht(e) {
    e[Ui] = !0;
  }
  var X0 = /* @__PURE__ */ new Set(), I0 = {};
  function Ya(e, a) {
    _r(e, a), _r(e + "Capture", a);
  }
  function _r(e, a) {
    for (I0[e] = a, e = 0; e < a.length; e++)
      X0.add(a[e]);
  }
  var Lx = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Z0 = {}, W0 = {};
  function zx(e) {
    return dt.call(W0, e) ? !0 : dt.call(Z0, e) ? !1 : Lx.test(e) ? W0[e] = !0 : (Z0[e] = !0, !1);
  }
  function bo(e, a, s) {
    if (zx(a))
      if (s === null) e.removeAttribute(a);
      else {
        switch (typeof s) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(a);
            return;
          case "boolean":
            var l = a.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(a);
              return;
            }
        }
        e.setAttribute(a, "" + s);
      }
  }
  function wo(e, a, s) {
    if (s === null) e.removeAttribute(a);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttribute(a, "" + s);
    }
  }
  function Un(e, a, s, l) {
    if (l === null) e.removeAttribute(s);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(s);
          return;
      }
      e.setAttributeNS(a, s, "" + l);
    }
  }
  var Uu, K0;
  function Rr(e) {
    if (Uu === void 0)
      try {
        throw Error();
      } catch (s) {
        var a = s.stack.trim().match(/\n( *(at )?)/);
        Uu = a && a[1] || "", K0 = -1 < s.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < s.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Uu + e + K0;
  }
  var ju = !1;
  function Pu(e, a) {
    if (!e || ju) return "";
    ju = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (a) {
              var $ = function() {
                throw Error();
              };
              if (Object.defineProperty($.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct($, []);
                } catch (I) {
                  var Y = I;
                }
                Reflect.construct(e, [], $);
              } else {
                try {
                  $.call();
                } catch (I) {
                  Y = I;
                }
                e.call($.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (I) {
                Y = I;
              }
              ($ = e()) && typeof $.catch == "function" && $.catch(function() {
              });
            }
          } catch (I) {
            if (I && Y && typeof I.stack == "string")
              return [I.stack, Y.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var m = l.DetermineComponentFrameRoot(), b = m[0], A = m[1];
      if (b && A) {
        var R = b.split(`
`), H = A.split(`
`);
        for (f = l = 0; l < R.length && !R[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; f < H.length && !H[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (l === R.length || f === H.length)
          for (l = R.length - 1, f = H.length - 1; 1 <= l && 0 <= f && R[l] !== H[f]; )
            f--;
        for (; 1 <= l && 0 <= f; l--, f--)
          if (R[l] !== H[f]) {
            if (l !== 1 || f !== 1)
              do
                if (l--, f--, 0 > f || R[l] !== H[f]) {
                  var K = `
` + R[l].replace(" at new ", " at ");
                  return e.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", e.displayName)), K;
                }
              while (1 <= l && 0 <= f);
            break;
          }
      }
    } finally {
      ju = !1, Error.prepareStackTrace = s;
    }
    return (s = e ? e.displayName || e.name : "") ? Rr(s) : "";
  }
  function Bx(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Rr(e.type);
      case 16:
        return Rr("Lazy");
      case 13:
        return Rr("Suspense");
      case 19:
        return Rr("SuspenseList");
      case 0:
      case 15:
        return Pu(e.type, !1);
      case 11:
        return Pu(e.type.render, !1);
      case 1:
        return Pu(e.type, !0);
      case 31:
        return Rr("Activity");
      default:
        return "";
    }
  }
  function Q0(e) {
    try {
      var a = "";
      do
        a += Bx(e), e = e.return;
      while (e);
      return a;
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack;
    }
  }
  function en(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function F0(e) {
    var a = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function Vx(e) {
    var a = F0(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      a
    ), l = "" + e[a];
    if (!e.hasOwnProperty(a) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var f = s.get, m = s.set;
      return Object.defineProperty(e, a, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(b) {
          l = "" + b, m.call(this, b);
        }
      }), Object.defineProperty(e, a, {
        enumerable: s.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(b) {
          l = "" + b;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[a];
        }
      };
    }
  }
  function xo(e) {
    e._valueTracker || (e._valueTracker = Vx(e));
  }
  function $0(e) {
    if (!e) return !1;
    var a = e._valueTracker;
    if (!a) return !0;
    var s = a.getValue(), l = "";
    return e && (l = F0(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== s ? (a.setValue(e), !0) : !1;
  }
  function So(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ux = /[\n"\\]/g;
  function tn(e) {
    return e.replace(
      Ux,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hu(e, a, s, l, f, m, b, A) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), a != null ? b === "number" ? (a === 0 && e.value === "" || e.value != a) && (e.value = "" + en(a)) : e.value !== "" + en(a) && (e.value = "" + en(a)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), a != null ? qu(e, b, en(a)) : s != null ? qu(e, b, en(s)) : l != null && e.removeAttribute("value"), f == null && m != null && (e.defaultChecked = !!m), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), A != null && typeof A != "function" && typeof A != "symbol" && typeof A != "boolean" ? e.name = "" + en(A) : e.removeAttribute("name");
  }
  function J0(e, a, s, l, f, m, b, A) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.type = m), a != null || s != null) {
      if (!(m !== "submit" && m !== "reset" || a != null))
        return;
      s = s != null ? "" + en(s) : "", a = a != null ? "" + en(a) : s, A || a === e.value || (e.value = a), e.defaultValue = a;
    }
    l = l ?? f, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = A ? e.checked : !!l, e.defaultChecked = !!l, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b);
  }
  function qu(e, a, s) {
    a === "number" && So(e.ownerDocument) === e || e.defaultValue === "" + s || (e.defaultValue = "" + s);
  }
  function kr(e, a, s, l) {
    if (e = e.options, a) {
      a = {};
      for (var f = 0; f < s.length; f++)
        a["$" + s[f]] = !0;
      for (s = 0; s < e.length; s++)
        f = a.hasOwnProperty("$" + e[s].value), e[s].selected !== f && (e[s].selected = f), f && l && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + en(s), a = null, f = 0; f < e.length; f++) {
        if (e[f].value === s) {
          e[f].selected = !0, l && (e[f].defaultSelected = !0);
          return;
        }
        a !== null || e[f].disabled || (a = e[f]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function ep(e, a, s) {
    if (a != null && (a = "" + en(a), a !== e.value && (e.value = a), s == null)) {
      e.defaultValue !== a && (e.defaultValue = a);
      return;
    }
    e.defaultValue = s != null ? "" + en(s) : "";
  }
  function tp(e, a, s, l) {
    if (a == null) {
      if (l != null) {
        if (s != null) throw Error(i(92));
        if (se(l)) {
          if (1 < l.length) throw Error(i(93));
          l = l[0];
        }
        s = l;
      }
      s == null && (s = ""), a = s;
    }
    s = en(a), e.defaultValue = s, l = e.textContent, l === s && l !== "" && l !== null && (e.value = l);
  }
  function Nr(e, a) {
    if (a) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = a;
        return;
      }
    }
    e.textContent = a;
  }
  var jx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function np(e, a, s) {
    var l = a.indexOf("--") === 0;
    s == null || typeof s == "boolean" || s === "" ? l ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "" : l ? e.setProperty(a, s) : typeof s != "number" || s === 0 || jx.has(a) ? a === "float" ? e.cssFloat = s : e[a] = ("" + s).trim() : e[a] = s + "px";
  }
  function ap(e, a, s) {
    if (a != null && typeof a != "object")
      throw Error(i(62));
    if (e = e.style, s != null) {
      for (var l in s)
        !s.hasOwnProperty(l) || a != null && a.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var f in a)
        l = a[f], a.hasOwnProperty(f) && s[f] !== l && np(e, f, l);
    } else
      for (var m in a)
        a.hasOwnProperty(m) && np(e, m, a[m]);
  }
  function Gu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Px = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Hx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ao(e) {
    return Hx.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  var Yu = null;
  function Xu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Dr = null, Or = null;
  function rp(e) {
    var a = Er(e);
    if (a && (e = a.stateNode)) {
      var s = e[Ot] || null;
      e: switch (e = a.stateNode, a.type) {
        case "input":
          if (Hu(
            e,
            s.value,
            s.defaultValue,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name
          ), a = s.name, s.type === "radio" && a != null) {
            for (s = e; s.parentNode; ) s = s.parentNode;
            for (s = s.querySelectorAll(
              'input[name="' + tn(
                "" + a
              ) + '"][type="radio"]'
            ), a = 0; a < s.length; a++) {
              var l = s[a];
              if (l !== e && l.form === e.form) {
                var f = l[Ot] || null;
                if (!f) throw Error(i(90));
                Hu(
                  l,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name
                );
              }
            }
            for (a = 0; a < s.length; a++)
              l = s[a], l.form === e.form && $0(l);
          }
          break e;
        case "textarea":
          ep(e, s.value, s.defaultValue);
          break e;
        case "select":
          a = s.value, a != null && kr(e, !!s.multiple, a, !1);
      }
    }
  }
  var Iu = !1;
  function ip(e, a, s) {
    if (Iu) return e(a, s);
    Iu = !0;
    try {
      var l = e(a);
      return l;
    } finally {
      if (Iu = !1, (Dr !== null || Or !== null) && (ll(), Dr && (a = Dr, e = Or, Or = Dr = null, rp(a), e)))
        for (a = 0; a < e.length; a++) rp(e[a]);
    }
  }
  function Pi(e, a) {
    var s = e.stateNode;
    if (s === null) return null;
    var l = s[Ot] || null;
    if (l === null) return null;
    s = l[a];
    e: switch (a) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (s && typeof s != "function")
      throw Error(
        i(231, a, typeof s)
      );
    return s;
  }
  var jn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Zu = !1;
  if (jn)
    try {
      var Hi = {};
      Object.defineProperty(Hi, "passive", {
        get: function() {
          Zu = !0;
        }
      }), window.addEventListener("test", Hi, Hi), window.removeEventListener("test", Hi, Hi);
    } catch {
      Zu = !1;
    }
  var la = null, Wu = null, To = null;
  function sp() {
    if (To) return To;
    var e, a = Wu, s = a.length, l, f = "value" in la ? la.value : la.textContent, m = f.length;
    for (e = 0; e < s && a[e] === f[e]; e++) ;
    var b = s - e;
    for (l = 1; l <= b && a[s - l] === f[m - l]; l++) ;
    return To = f.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Mo(e) {
    var a = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && a === 13 && (e = 13)) : e = a, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Eo() {
    return !0;
  }
  function op() {
    return !1;
  }
  function Lt(e) {
    function a(s, l, f, m, b) {
      this._reactName = s, this._targetInst = f, this.type = l, this.nativeEvent = m, this.target = b, this.currentTarget = null;
      for (var A in e)
        e.hasOwnProperty(A) && (s = e[A], this[A] = s ? s(m) : m[A]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Eo : op, this.isPropagationStopped = op, this;
    }
    return g(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var s = this.nativeEvent;
        s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Eo);
      },
      stopPropagation: function() {
        var s = this.nativeEvent;
        s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Eo);
      },
      persist: function() {
      },
      isPersistent: Eo
    }), a;
  }
  var Xa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Co = Lt(Xa), qi = g({}, Xa, { view: 0, detail: 0 }), qx = Lt(qi), Ku, Qu, Gi, _o = g({}, qi, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: $u,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Gi && (Gi && e.type === "mousemove" ? (Ku = e.screenX - Gi.screenX, Qu = e.screenY - Gi.screenY) : Qu = Ku = 0, Gi = e), Ku);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Qu;
    }
  }), lp = Lt(_o), Gx = g({}, _o, { dataTransfer: 0 }), Yx = Lt(Gx), Xx = g({}, qi, { relatedTarget: 0 }), Fu = Lt(Xx), Ix = g({}, Xa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Zx = Lt(Ix), Wx = g({}, Xa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Kx = Lt(Wx), Qx = g({}, Xa, { data: 0 }), up = Lt(Qx), Fx = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, $x = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Jx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function e3(e) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(e) : (e = Jx[e]) ? !!a[e] : !1;
  }
  function $u() {
    return e3;
  }
  var t3 = g({}, qi, {
    key: function(e) {
      if (e.key) {
        var a = Fx[e.key] || e.key;
        if (a !== "Unidentified") return a;
      }
      return e.type === "keypress" ? (e = Mo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $x[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: $u,
    charCode: function(e) {
      return e.type === "keypress" ? Mo(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Mo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), n3 = Lt(t3), a3 = g({}, _o, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), cp = Lt(a3), r3 = g({}, qi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: $u
  }), i3 = Lt(r3), s3 = g({}, Xa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), o3 = Lt(s3), l3 = g({}, _o, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), u3 = Lt(l3), c3 = g({}, Xa, {
    newState: 0,
    oldState: 0
  }), f3 = Lt(c3), d3 = [9, 13, 27, 32], Ju = jn && "CompositionEvent" in window, Yi = null;
  jn && "documentMode" in document && (Yi = document.documentMode);
  var h3 = jn && "TextEvent" in window && !Yi, fp = jn && (!Ju || Yi && 8 < Yi && 11 >= Yi), dp = " ", hp = !1;
  function pp(e, a) {
    switch (e) {
      case "keyup":
        return d3.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function mp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Lr = !1;
  function p3(e, a) {
    switch (e) {
      case "compositionend":
        return mp(a);
      case "keypress":
        return a.which !== 32 ? null : (hp = !0, dp);
      case "textInput":
        return e = a.data, e === dp && hp ? null : e;
      default:
        return null;
    }
  }
  function m3(e, a) {
    if (Lr)
      return e === "compositionend" || !Ju && pp(e, a) ? (e = sp(), To = Wu = la = null, Lr = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
          if (a.char && 1 < a.char.length)
            return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return fp && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var g3 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function gp(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a === "input" ? !!g3[e.type] : a === "textarea";
  }
  function yp(e, a, s, l) {
    Dr ? Or ? Or.push(l) : Or = [l] : Dr = l, a = pl(a, "onChange"), 0 < a.length && (s = new Co(
      "onChange",
      "change",
      null,
      s,
      l
    ), e.push({ event: s, listeners: a }));
  }
  var Xi = null, Ii = null;
  function y3(e) {
    Fg(e, 0);
  }
  function Ro(e) {
    var a = ji(e);
    if ($0(a)) return e;
  }
  function vp(e, a) {
    if (e === "change") return a;
  }
  var bp = !1;
  if (jn) {
    var ec;
    if (jn) {
      var tc = "oninput" in document;
      if (!tc) {
        var wp = document.createElement("div");
        wp.setAttribute("oninput", "return;"), tc = typeof wp.oninput == "function";
      }
      ec = tc;
    } else ec = !1;
    bp = ec && (!document.documentMode || 9 < document.documentMode);
  }
  function xp() {
    Xi && (Xi.detachEvent("onpropertychange", Sp), Ii = Xi = null);
  }
  function Sp(e) {
    if (e.propertyName === "value" && Ro(Ii)) {
      var a = [];
      yp(
        a,
        Ii,
        e,
        Xu(e)
      ), ip(y3, a);
    }
  }
  function v3(e, a, s) {
    e === "focusin" ? (xp(), Xi = a, Ii = s, Xi.attachEvent("onpropertychange", Sp)) : e === "focusout" && xp();
  }
  function b3(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ro(Ii);
  }
  function w3(e, a) {
    if (e === "click") return Ro(a);
  }
  function x3(e, a) {
    if (e === "input" || e === "change")
      return Ro(a);
  }
  function S3(e, a) {
    return e === a && (e !== 0 || 1 / e === 1 / a) || e !== e && a !== a;
  }
  var Gt = typeof Object.is == "function" ? Object.is : S3;
  function Zi(e, a) {
    if (Gt(e, a)) return !0;
    if (typeof e != "object" || e === null || typeof a != "object" || a === null)
      return !1;
    var s = Object.keys(e), l = Object.keys(a);
    if (s.length !== l.length) return !1;
    for (l = 0; l < s.length; l++) {
      var f = s[l];
      if (!dt.call(a, f) || !Gt(e[f], a[f]))
        return !1;
    }
    return !0;
  }
  function Ap(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Tp(e, a) {
    var s = Ap(e);
    e = 0;
    for (var l; s; ) {
      if (s.nodeType === 3) {
        if (l = e + s.textContent.length, e <= a && l >= a)
          return { node: s, offset: a - e };
        e = l;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = Ap(s);
    }
  }
  function Mp(e, a) {
    return e && a ? e === a ? !0 : e && e.nodeType === 3 ? !1 : a && a.nodeType === 3 ? Mp(e, a.parentNode) : "contains" in e ? e.contains(a) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Ep(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var a = So(e.document); a instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof a.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = a.contentWindow;
      else break;
      a = So(e.document);
    }
    return a;
  }
  function nc(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a && (a === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || a === "textarea" || e.contentEditable === "true");
  }
  var A3 = jn && "documentMode" in document && 11 >= document.documentMode, zr = null, ac = null, Wi = null, rc = !1;
  function Cp(e, a, s) {
    var l = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    rc || zr == null || zr !== So(l) || (l = zr, "selectionStart" in l && nc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Wi && Zi(Wi, l) || (Wi = l, l = pl(ac, "onSelect"), 0 < l.length && (a = new Co(
      "onSelect",
      "select",
      null,
      a,
      s
    ), e.push({ event: a, listeners: l }), a.target = zr)));
  }
  function Ia(e, a) {
    var s = {};
    return s[e.toLowerCase()] = a.toLowerCase(), s["Webkit" + e] = "webkit" + a, s["Moz" + e] = "moz" + a, s;
  }
  var Br = {
    animationend: Ia("Animation", "AnimationEnd"),
    animationiteration: Ia("Animation", "AnimationIteration"),
    animationstart: Ia("Animation", "AnimationStart"),
    transitionrun: Ia("Transition", "TransitionRun"),
    transitionstart: Ia("Transition", "TransitionStart"),
    transitioncancel: Ia("Transition", "TransitionCancel"),
    transitionend: Ia("Transition", "TransitionEnd")
  }, ic = {}, _p = {};
  jn && (_p = document.createElement("div").style, "AnimationEvent" in window || (delete Br.animationend.animation, delete Br.animationiteration.animation, delete Br.animationstart.animation), "TransitionEvent" in window || delete Br.transitionend.transition);
  function Za(e) {
    if (ic[e]) return ic[e];
    if (!Br[e]) return e;
    var a = Br[e], s;
    for (s in a)
      if (a.hasOwnProperty(s) && s in _p)
        return ic[e] = a[s];
    return e;
  }
  var Rp = Za("animationend"), kp = Za("animationiteration"), Np = Za("animationstart"), T3 = Za("transitionrun"), M3 = Za("transitionstart"), E3 = Za("transitioncancel"), Dp = Za("transitionend"), Op = /* @__PURE__ */ new Map(), sc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  sc.push("scrollEnd");
  function gn(e, a) {
    Op.set(e, a), Ya(a, [e]);
  }
  var Lp = /* @__PURE__ */ new WeakMap();
  function nn(e, a) {
    if (typeof e == "object" && e !== null) {
      var s = Lp.get(e);
      return s !== void 0 ? s : (a = {
        value: e,
        source: a,
        stack: Q0(a)
      }, Lp.set(e, a), a);
    }
    return {
      value: e,
      source: a,
      stack: Q0(a)
    };
  }
  var an = [], Vr = 0, oc = 0;
  function ko() {
    for (var e = Vr, a = oc = Vr = 0; a < e; ) {
      var s = an[a];
      an[a++] = null;
      var l = an[a];
      an[a++] = null;
      var f = an[a];
      an[a++] = null;
      var m = an[a];
      if (an[a++] = null, l !== null && f !== null) {
        var b = l.pending;
        b === null ? f.next = f : (f.next = b.next, b.next = f), l.pending = f;
      }
      m !== 0 && zp(s, f, m);
    }
  }
  function No(e, a, s, l) {
    an[Vr++] = e, an[Vr++] = a, an[Vr++] = s, an[Vr++] = l, oc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function lc(e, a, s, l) {
    return No(e, a, s, l), Do(e);
  }
  function Ur(e, a) {
    return No(e, null, null, a), Do(e);
  }
  function zp(e, a, s) {
    e.lanes |= s;
    var l = e.alternate;
    l !== null && (l.lanes |= s);
    for (var f = !1, m = e.return; m !== null; )
      m.childLanes |= s, l = m.alternate, l !== null && (l.childLanes |= s), m.tag === 22 && (e = m.stateNode, e === null || e._visibility & 1 || (f = !0)), e = m, m = m.return;
    return e.tag === 3 ? (m = e.stateNode, f && a !== null && (f = 31 - qt(s), e = m.hiddenUpdates, l = e[f], l === null ? e[f] = [a] : l.push(a), a.lane = s | 536870912), m) : null;
  }
  function Do(e) {
    if (50 < bs)
      throw bs = 0, mf = null, Error(i(185));
    for (var a = e.return; a !== null; )
      e = a, a = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var jr = {};
  function C3(e, a, s, l) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Yt(e, a, s, l) {
    return new C3(e, a, s, l);
  }
  function uc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Pn(e, a) {
    var s = e.alternate;
    return s === null ? (s = Yt(
      e.tag,
      a,
      e.key,
      e.mode
    ), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = a, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 65011712, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, a = e.dependencies, s.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s.refCleanup = e.refCleanup, s;
  }
  function Bp(e, a) {
    e.flags &= 65011714;
    var s = e.alternate;
    return s === null ? (e.childLanes = 0, e.lanes = a, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = s.childLanes, e.lanes = s.lanes, e.child = s.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = s.memoizedProps, e.memoizedState = s.memoizedState, e.updateQueue = s.updateQueue, e.type = s.type, a = s.dependencies, e.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), e;
  }
  function Oo(e, a, s, l, f, m) {
    var b = 0;
    if (l = e, typeof e == "function") uc(e) && (b = 1);
    else if (typeof e == "string")
      b = RS(
        e,
        s,
        te.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case F:
          return e = Yt(31, s, a, f), e.elementType = F, e.lanes = m, e;
        case x:
          return Wa(s.children, f, m, a);
        case S:
          b = 8, f |= 24;
          break;
        case T:
          return e = Yt(12, s, a, f | 2), e.elementType = T, e.lanes = m, e;
        case D:
          return e = Yt(13, s, a, f), e.elementType = D, e.lanes = m, e;
        case U:
          return e = Yt(19, s, a, f), e.elementType = U, e.lanes = m, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case E:
              case C:
                b = 10;
                break e;
              case N:
                b = 9;
                break e;
              case X:
                b = 11;
                break e;
              case P:
                b = 14;
                break e;
              case _:
                b = 16, l = null;
                break e;
            }
          b = 29, s = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return a = Yt(b, s, a, f), a.elementType = e, a.type = l, a.lanes = m, a;
  }
  function Wa(e, a, s, l) {
    return e = Yt(7, e, l, a), e.lanes = s, e;
  }
  function cc(e, a, s) {
    return e = Yt(6, e, null, a), e.lanes = s, e;
  }
  function fc(e, a, s) {
    return a = Yt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      a
    ), a.lanes = s, a.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, a;
  }
  var Pr = [], Hr = 0, Lo = null, zo = 0, rn = [], sn = 0, Ka = null, Hn = 1, qn = "";
  function Qa(e, a) {
    Pr[Hr++] = zo, Pr[Hr++] = Lo, Lo = e, zo = a;
  }
  function Vp(e, a, s) {
    rn[sn++] = Hn, rn[sn++] = qn, rn[sn++] = Ka, Ka = e;
    var l = Hn;
    e = qn;
    var f = 32 - qt(l) - 1;
    l &= ~(1 << f), s += 1;
    var m = 32 - qt(a) + f;
    if (30 < m) {
      var b = f - f % 5;
      m = (l & (1 << b) - 1).toString(32), l >>= b, f -= b, Hn = 1 << 32 - qt(a) + f | s << f | l, qn = m + e;
    } else
      Hn = 1 << m | s << f | l, qn = e;
  }
  function dc(e) {
    e.return !== null && (Qa(e, 1), Vp(e, 1, 0));
  }
  function hc(e) {
    for (; e === Lo; )
      Lo = Pr[--Hr], Pr[Hr] = null, zo = Pr[--Hr], Pr[Hr] = null;
    for (; e === Ka; )
      Ka = rn[--sn], rn[sn] = null, qn = rn[--sn], rn[sn] = null, Hn = rn[--sn], rn[sn] = null;
  }
  var Rt = null, Fe = null, Le = !1, Fa = null, En = !1, pc = Error(i(519));
  function $a(e) {
    var a = Error(i(418, ""));
    throw Fi(nn(a, e)), pc;
  }
  function Up(e) {
    var a = e.stateNode, s = e.type, l = e.memoizedProps;
    switch (a[Mt] = e, a[Ot] = l, s) {
      case "dialog":
        Re("cancel", a), Re("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        Re("load", a);
        break;
      case "video":
      case "audio":
        for (s = 0; s < xs.length; s++)
          Re(xs[s], a);
        break;
      case "source":
        Re("error", a);
        break;
      case "img":
      case "image":
      case "link":
        Re("error", a), Re("load", a);
        break;
      case "details":
        Re("toggle", a);
        break;
      case "input":
        Re("invalid", a), J0(
          a,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), xo(a);
        break;
      case "select":
        Re("invalid", a);
        break;
      case "textarea":
        Re("invalid", a), tp(a, l.value, l.defaultValue, l.children), xo(a);
    }
    s = l.children, typeof s != "string" && typeof s != "number" && typeof s != "bigint" || a.textContent === "" + s || l.suppressHydrationWarning === !0 || t1(a.textContent, s) ? (l.popover != null && (Re("beforetoggle", a), Re("toggle", a)), l.onScroll != null && Re("scroll", a), l.onScrollEnd != null && Re("scrollend", a), l.onClick != null && (a.onclick = ml), a = !0) : a = !1, a || $a(e);
  }
  function jp(e) {
    for (Rt = e.return; Rt; )
      switch (Rt.tag) {
        case 5:
        case 13:
          En = !1;
          return;
        case 27:
        case 3:
          En = !0;
          return;
        default:
          Rt = Rt.return;
      }
  }
  function Ki(e) {
    if (e !== Rt) return !1;
    if (!Le) return jp(e), Le = !0, !1;
    var a = e.tag, s;
    if ((s = a !== 3 && a !== 27) && ((s = a === 5) && (s = e.type, s = !(s !== "form" && s !== "button") || Nf(e.type, e.memoizedProps)), s = !s), s && Fe && $a(e), jp(e), a === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, a = 0; e; ) {
          if (e.nodeType === 8)
            if (s = e.data, s === "/$") {
              if (a === 0) {
                Fe = vn(e.nextSibling);
                break e;
              }
              a--;
            } else
              s !== "$" && s !== "$!" && s !== "$?" || a++;
          e = e.nextSibling;
        }
        Fe = null;
      }
    } else
      a === 27 ? (a = Fe, Ta(e.type) ? (e = zf, zf = null, Fe = e) : Fe = a) : Fe = Rt ? vn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Qi() {
    Fe = Rt = null, Le = !1;
  }
  function Pp() {
    var e = Fa;
    return e !== null && (Vt === null ? Vt = e : Vt.push.apply(
      Vt,
      e
    ), Fa = null), e;
  }
  function Fi(e) {
    Fa === null ? Fa = [e] : Fa.push(e);
  }
  var mc = B(null), Ja = null, Gn = null;
  function ua(e, a, s) {
    J(mc, a._currentValue), a._currentValue = s;
  }
  function Yn(e) {
    e._currentValue = mc.current, G(mc);
  }
  function gc(e, a, s) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & a) !== a ? (e.childLanes |= a, l !== null && (l.childLanes |= a)) : l !== null && (l.childLanes & a) !== a && (l.childLanes |= a), e === s) break;
      e = e.return;
    }
  }
  function yc(e, a, s, l) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var m = f.dependencies;
      if (m !== null) {
        var b = f.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var A = m;
          m = f;
          for (var R = 0; R < a.length; R++)
            if (A.context === a[R]) {
              m.lanes |= s, A = m.alternate, A !== null && (A.lanes |= s), gc(
                m.return,
                s,
                e
              ), l || (b = null);
              break e;
            }
          m = A.next;
        }
      } else if (f.tag === 18) {
        if (b = f.return, b === null) throw Error(i(341));
        b.lanes |= s, m = b.alternate, m !== null && (m.lanes |= s), gc(b, s, e), b = null;
      } else b = f.child;
      if (b !== null) b.return = f;
      else
        for (b = f; b !== null; ) {
          if (b === e) {
            b = null;
            break;
          }
          if (f = b.sibling, f !== null) {
            f.return = b.return, b = f;
            break;
          }
          b = b.return;
        }
      f = b;
    }
  }
  function $i(e, a, s, l) {
    e = null;
    for (var f = a, m = !1; f !== null; ) {
      if (!m) {
        if ((f.flags & 524288) !== 0) m = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var b = f.alternate;
        if (b === null) throw Error(i(387));
        if (b = b.memoizedProps, b !== null) {
          var A = f.type;
          Gt(f.pendingProps.value, b.value) || (e !== null ? e.push(A) : e = [A]);
        }
      } else if (f === me.current) {
        if (b = f.alternate, b === null) throw Error(i(387));
        b.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(Cs) : e = [Cs]);
      }
      f = f.return;
    }
    e !== null && yc(
      a,
      e,
      s,
      l
    ), a.flags |= 262144;
  }
  function Bo(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Gt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function er(e) {
    Ja = e, Gn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Et(e) {
    return Hp(Ja, e);
  }
  function Vo(e, a) {
    return Ja === null && er(e), Hp(e, a);
  }
  function Hp(e, a) {
    var s = a._currentValue;
    if (a = { context: a, memoizedValue: s, next: null }, Gn === null) {
      if (e === null) throw Error(i(308));
      Gn = a, e.dependencies = { lanes: 0, firstContext: a }, e.flags |= 524288;
    } else Gn = Gn.next = a;
    return s;
  }
  var _3 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], a = this.signal = {
      aborted: !1,
      addEventListener: function(s, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      a.aborted = !0, e.forEach(function(s) {
        return s();
      });
    };
  }, R3 = t.unstable_scheduleCallback, k3 = t.unstable_NormalPriority, lt = {
    $$typeof: C,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function vc() {
    return {
      controller: new _3(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ji(e) {
    e.refCount--, e.refCount === 0 && R3(k3, function() {
      e.controller.abort();
    });
  }
  var es = null, bc = 0, qr = 0, Gr = null;
  function N3(e, a) {
    if (es === null) {
      var s = es = [];
      bc = 0, qr = Sf(), Gr = {
        status: "pending",
        value: void 0,
        then: function(l) {
          s.push(l);
        }
      };
    }
    return bc++, a.then(qp, qp), a;
  }
  function qp() {
    if (--bc === 0 && es !== null) {
      Gr !== null && (Gr.status = "fulfilled");
      var e = es;
      es = null, qr = 0, Gr = null;
      for (var a = 0; a < e.length; a++) (0, e[a])();
    }
  }
  function D3(e, a) {
    var s = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        s.push(f);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = a;
        for (var f = 0; f < s.length; f++) (0, s[f])(a);
      },
      function(f) {
        for (l.status = "rejected", l.reason = f, f = 0; f < s.length; f++)
          (0, s[f])(void 0);
      }
    ), l;
  }
  var Gp = k.S;
  k.S = function(e, a) {
    typeof a == "object" && a !== null && typeof a.then == "function" && N3(e, a), Gp !== null && Gp(e, a);
  };
  var tr = B(null);
  function wc() {
    var e = tr.current;
    return e !== null ? e : He.pooledCache;
  }
  function Uo(e, a) {
    a === null ? J(tr, tr.current) : J(tr, a.pool);
  }
  function Yp() {
    var e = wc();
    return e === null ? null : { parent: lt._currentValue, pool: e };
  }
  var ts = Error(i(460)), Xp = Error(i(474)), jo = Error(i(542)), xc = { then: function() {
  } };
  function Ip(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Po() {
  }
  function Zp(e, a, s) {
    switch (s = e[s], s === void 0 ? e.push(a) : s !== a && (a.then(Po, Po), a = s), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw e = a.reason, Kp(e), e;
      default:
        if (typeof a.status == "string") a.then(Po, Po);
        else {
          if (e = He, e !== null && 100 < e.shellSuspendCounter)
            throw Error(i(482));
          e = a, e.status = "pending", e.then(
            function(l) {
              if (a.status === "pending") {
                var f = a;
                f.status = "fulfilled", f.value = l;
              }
            },
            function(l) {
              if (a.status === "pending") {
                var f = a;
                f.status = "rejected", f.reason = l;
              }
            }
          );
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw e = a.reason, Kp(e), e;
        }
        throw ns = a, ts;
    }
  }
  var ns = null;
  function Wp() {
    if (ns === null) throw Error(i(459));
    var e = ns;
    return ns = null, e;
  }
  function Kp(e) {
    if (e === ts || e === jo)
      throw Error(i(483));
  }
  var ca = !1;
  function Sc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ac(e, a) {
    e = e.updateQueue, a.updateQueue === e && (a.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function fa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function da(e, a, s) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ze & 2) !== 0) {
      var f = l.pending;
      return f === null ? a.next = a : (a.next = f.next, f.next = a), l.pending = a, a = Do(e), zp(e, null, s), a;
    }
    return No(e, l, a, s), Do(e);
  }
  function as(e, a, s) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (s & 4194048) !== 0)) {
      var l = a.lanes;
      l &= e.pendingLanes, s |= l, a.lanes = s, q0(e, s);
    }
  }
  function Tc(e, a) {
    var s = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, s === l)) {
      var f = null, m = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var b = {
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          };
          m === null ? f = m = b : m = m.next = b, s = s.next;
        } while (s !== null);
        m === null ? f = m = a : m = m.next = a;
      } else f = m = a;
      s = {
        baseState: l.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: m,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = s;
      return;
    }
    e = s.lastBaseUpdate, e === null ? s.firstBaseUpdate = a : e.next = a, s.lastBaseUpdate = a;
  }
  var Mc = !1;
  function rs() {
    if (Mc) {
      var e = Gr;
      if (e !== null) throw e;
    }
  }
  function is(e, a, s, l) {
    Mc = !1;
    var f = e.updateQueue;
    ca = !1;
    var m = f.firstBaseUpdate, b = f.lastBaseUpdate, A = f.shared.pending;
    if (A !== null) {
      f.shared.pending = null;
      var R = A, H = R.next;
      R.next = null, b === null ? m = H : b.next = H, b = R;
      var K = e.alternate;
      K !== null && (K = K.updateQueue, A = K.lastBaseUpdate, A !== b && (A === null ? K.firstBaseUpdate = H : A.next = H, K.lastBaseUpdate = R));
    }
    if (m !== null) {
      var $ = f.baseState;
      b = 0, K = H = R = null, A = m;
      do {
        var Y = A.lane & -536870913, I = Y !== A.lane;
        if (I ? (Ne & Y) === Y : (l & Y) === Y) {
          Y !== 0 && Y === qr && (Mc = !0), K !== null && (K = K.next = {
            lane: 0,
            tag: A.tag,
            payload: A.payload,
            callback: null,
            next: null
          });
          e: {
            var be = e, ye = A;
            Y = a;
            var je = s;
            switch (ye.tag) {
              case 1:
                if (be = ye.payload, typeof be == "function") {
                  $ = be.call(je, $, Y);
                  break e;
                }
                $ = be;
                break e;
              case 3:
                be.flags = be.flags & -65537 | 128;
              case 0:
                if (be = ye.payload, Y = typeof be == "function" ? be.call(je, $, Y) : be, Y == null) break e;
                $ = g({}, $, Y);
                break e;
              case 2:
                ca = !0;
            }
          }
          Y = A.callback, Y !== null && (e.flags |= 64, I && (e.flags |= 8192), I = f.callbacks, I === null ? f.callbacks = [Y] : I.push(Y));
        } else
          I = {
            lane: Y,
            tag: A.tag,
            payload: A.payload,
            callback: A.callback,
            next: null
          }, K === null ? (H = K = I, R = $) : K = K.next = I, b |= Y;
        if (A = A.next, A === null) {
          if (A = f.shared.pending, A === null)
            break;
          I = A, A = I.next, I.next = null, f.lastBaseUpdate = I, f.shared.pending = null;
        }
      } while (!0);
      K === null && (R = $), f.baseState = R, f.firstBaseUpdate = H, f.lastBaseUpdate = K, m === null && (f.shared.lanes = 0), wa |= b, e.lanes = b, e.memoizedState = $;
    }
  }
  function Qp(e, a) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(a);
  }
  function Fp(e, a) {
    var s = e.callbacks;
    if (s !== null)
      for (e.callbacks = null, e = 0; e < s.length; e++)
        Qp(s[e], a);
  }
  var Yr = B(null), Ho = B(0);
  function $p(e, a) {
    e = Fn, J(Ho, e), J(Yr, a), Fn = e | a.baseLanes;
  }
  function Ec() {
    J(Ho, Fn), J(Yr, Yr.current);
  }
  function Cc() {
    Fn = Ho.current, G(Yr), G(Ho);
  }
  var ha = 0, Ae = null, Ve = null, at = null, qo = !1, Xr = !1, nr = !1, Go = 0, ss = 0, Ir = null, O3 = 0;
  function et() {
    throw Error(i(321));
  }
  function _c(e, a) {
    if (a === null) return !1;
    for (var s = 0; s < a.length && s < e.length; s++)
      if (!Gt(e[s], a[s])) return !1;
    return !0;
  }
  function Rc(e, a, s, l, f, m) {
    return ha = m, Ae = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, k.H = e === null || e.memoizedState === null ? zm : Bm, nr = !1, m = s(l, f), nr = !1, Xr && (m = em(
      a,
      s,
      l,
      f
    )), Jp(e), m;
  }
  function Jp(e) {
    k.H = Ko;
    var a = Ve !== null && Ve.next !== null;
    if (ha = 0, at = Ve = Ae = null, qo = !1, ss = 0, Ir = null, a) throw Error(i(300));
    e === null || pt || (e = e.dependencies, e !== null && Bo(e) && (pt = !0));
  }
  function em(e, a, s, l) {
    Ae = e;
    var f = 0;
    do {
      if (Xr && (Ir = null), ss = 0, Xr = !1, 25 <= f) throw Error(i(301));
      if (f += 1, at = Ve = null, e.updateQueue != null) {
        var m = e.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      k.H = P3, m = a(s, l);
    } while (Xr);
    return m;
  }
  function L3() {
    var e = k.H, a = e.useState()[0];
    return a = typeof a.then == "function" ? os(a) : a, e = e.useState()[0], (Ve !== null ? Ve.memoizedState : null) !== e && (Ae.flags |= 1024), a;
  }
  function kc() {
    var e = Go !== 0;
    return Go = 0, e;
  }
  function Nc(e, a, s) {
    a.updateQueue = e.updateQueue, a.flags &= -2053, e.lanes &= ~s;
  }
  function Dc(e) {
    if (qo) {
      for (e = e.memoizedState; e !== null; ) {
        var a = e.queue;
        a !== null && (a.pending = null), e = e.next;
      }
      qo = !1;
    }
    ha = 0, at = Ve = Ae = null, Xr = !1, ss = Go = 0, Ir = null;
  }
  function zt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return at === null ? Ae.memoizedState = at = e : at = at.next = e, at;
  }
  function rt() {
    if (Ve === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ve.next;
    var a = at === null ? Ae.memoizedState : at.next;
    if (a !== null)
      at = a, Ve = e;
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(i(467)) : Error(i(310));
      Ve = e, e = {
        memoizedState: Ve.memoizedState,
        baseState: Ve.baseState,
        baseQueue: Ve.baseQueue,
        queue: Ve.queue,
        next: null
      }, at === null ? Ae.memoizedState = at = e : at = at.next = e;
    }
    return at;
  }
  function Oc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function os(e) {
    var a = ss;
    return ss += 1, Ir === null && (Ir = []), e = Zp(Ir, e, a), a = Ae, (at === null ? a.memoizedState : at.next) === null && (a = a.alternate, k.H = a === null || a.memoizedState === null ? zm : Bm), e;
  }
  function Yo(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return os(e);
      if (e.$$typeof === C) return Et(e);
    }
    throw Error(i(438, String(e)));
  }
  function Lc(e) {
    var a = null, s = Ae.updateQueue;
    if (s !== null && (a = s.memoCache), a == null) {
      var l = Ae.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (a = {
        data: l.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), s === null && (s = Oc(), Ae.updateQueue = s), s.memoCache = a, s = a.data[a.index], s === void 0)
      for (s = a.data[a.index] = Array(e), l = 0; l < e; l++)
        s[l] = ae;
    return a.index++, s;
  }
  function Xn(e, a) {
    return typeof a == "function" ? a(e) : a;
  }
  function Xo(e) {
    var a = rt();
    return zc(a, Ve, e);
  }
  function zc(e, a, s) {
    var l = e.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = s;
    var f = e.baseQueue, m = l.pending;
    if (m !== null) {
      if (f !== null) {
        var b = f.next;
        f.next = m.next, m.next = b;
      }
      a.baseQueue = f = m, l.pending = null;
    }
    if (m = e.baseState, f === null) e.memoizedState = m;
    else {
      a = f.next;
      var A = b = null, R = null, H = a, K = !1;
      do {
        var $ = H.lane & -536870913;
        if ($ !== H.lane ? (Ne & $) === $ : (ha & $) === $) {
          var Y = H.revertLane;
          if (Y === 0)
            R !== null && (R = R.next = {
              lane: 0,
              revertLane: 0,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }), $ === qr && (K = !0);
          else if ((ha & Y) === Y) {
            H = H.next, Y === qr && (K = !0);
            continue;
          } else
            $ = {
              lane: 0,
              revertLane: H.revertLane,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }, R === null ? (A = R = $, b = m) : R = R.next = $, Ae.lanes |= Y, wa |= Y;
          $ = H.action, nr && s(m, $), m = H.hasEagerState ? H.eagerState : s(m, $);
        } else
          Y = {
            lane: $,
            revertLane: H.revertLane,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          }, R === null ? (A = R = Y, b = m) : R = R.next = Y, Ae.lanes |= $, wa |= $;
        H = H.next;
      } while (H !== null && H !== a);
      if (R === null ? b = m : R.next = A, !Gt(m, e.memoizedState) && (pt = !0, K && (s = Gr, s !== null)))
        throw s;
      e.memoizedState = m, e.baseState = b, e.baseQueue = R, l.lastRenderedState = m;
    }
    return f === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Bc(e) {
    var a = rt(), s = a.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var l = s.dispatch, f = s.pending, m = a.memoizedState;
    if (f !== null) {
      s.pending = null;
      var b = f = f.next;
      do
        m = e(m, b.action), b = b.next;
      while (b !== f);
      Gt(m, a.memoizedState) || (pt = !0), a.memoizedState = m, a.baseQueue === null && (a.baseState = m), s.lastRenderedState = m;
    }
    return [m, l];
  }
  function tm(e, a, s) {
    var l = Ae, f = rt(), m = Le;
    if (m) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else s = a();
    var b = !Gt(
      (Ve || f).memoizedState,
      s
    );
    b && (f.memoizedState = s, pt = !0), f = f.queue;
    var A = rm.bind(null, l, f, e);
    if (ls(2048, 8, A, [e]), f.getSnapshot !== a || b || at !== null && at.memoizedState.tag & 1) {
      if (l.flags |= 2048, Zr(
        9,
        Io(),
        am.bind(
          null,
          l,
          f,
          s,
          a
        ),
        null
      ), He === null) throw Error(i(349));
      m || (ha & 124) !== 0 || nm(l, a, s);
    }
    return s;
  }
  function nm(e, a, s) {
    e.flags |= 16384, e = { getSnapshot: a, value: s }, a = Ae.updateQueue, a === null ? (a = Oc(), Ae.updateQueue = a, a.stores = [e]) : (s = a.stores, s === null ? a.stores = [e] : s.push(e));
  }
  function am(e, a, s, l) {
    a.value = s, a.getSnapshot = l, im(a) && sm(e);
  }
  function rm(e, a, s) {
    return s(function() {
      im(a) && sm(e);
    });
  }
  function im(e) {
    var a = e.getSnapshot;
    e = e.value;
    try {
      var s = a();
      return !Gt(e, s);
    } catch {
      return !0;
    }
  }
  function sm(e) {
    var a = Ur(e, 2);
    a !== null && Kt(a, e, 2);
  }
  function Vc(e) {
    var a = zt();
    if (typeof e == "function") {
      var s = e;
      if (e = s(), nr) {
        sa(!0);
        try {
          s();
        } finally {
          sa(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = e, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xn,
      lastRenderedState: e
    }, a;
  }
  function om(e, a, s, l) {
    return e.baseState = s, zc(
      e,
      Ve,
      typeof l == "function" ? l : Xn
    );
  }
  function z3(e, a, s, l, f) {
    if (Wo(e)) throw Error(i(485));
    if (e = a.action, e !== null) {
      var m = {
        payload: f,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(b) {
          m.listeners.push(b);
        }
      };
      k.T !== null ? s(!0) : m.isTransition = !1, l(m), s = a.pending, s === null ? (m.next = a.pending = m, lm(a, m)) : (m.next = s.next, a.pending = s.next = m);
    }
  }
  function lm(e, a) {
    var s = a.action, l = a.payload, f = e.state;
    if (a.isTransition) {
      var m = k.T, b = {};
      k.T = b;
      try {
        var A = s(f, l), R = k.S;
        R !== null && R(b, A), um(e, a, A);
      } catch (H) {
        Uc(e, a, H);
      } finally {
        k.T = m;
      }
    } else
      try {
        m = s(f, l), um(e, a, m);
      } catch (H) {
        Uc(e, a, H);
      }
  }
  function um(e, a, s) {
    s !== null && typeof s == "object" && typeof s.then == "function" ? s.then(
      function(l) {
        cm(e, a, l);
      },
      function(l) {
        return Uc(e, a, l);
      }
    ) : cm(e, a, s);
  }
  function cm(e, a, s) {
    a.status = "fulfilled", a.value = s, fm(a), e.state = s, a = e.pending, a !== null && (s = a.next, s === a ? e.pending = null : (s = s.next, a.next = s, lm(e, s)));
  }
  function Uc(e, a, s) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        a.status = "rejected", a.reason = s, fm(a), a = a.next;
      while (a !== l);
    }
    e.action = null;
  }
  function fm(e) {
    e = e.listeners;
    for (var a = 0; a < e.length; a++) (0, e[a])();
  }
  function dm(e, a) {
    return a;
  }
  function hm(e, a) {
    if (Le) {
      var s = He.formState;
      if (s !== null) {
        e: {
          var l = Ae;
          if (Le) {
            if (Fe) {
              t: {
                for (var f = Fe, m = En; f.nodeType !== 8; ) {
                  if (!m) {
                    f = null;
                    break t;
                  }
                  if (f = vn(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                m = f.data, f = m === "F!" || m === "F" ? f : null;
              }
              if (f) {
                Fe = vn(
                  f.nextSibling
                ), l = f.data === "F!";
                break e;
              }
            }
            $a(l);
          }
          l = !1;
        }
        l && (a = s[0]);
      }
    }
    return s = zt(), s.memoizedState = s.baseState = a, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: dm,
      lastRenderedState: a
    }, s.queue = l, s = Dm.bind(
      null,
      Ae,
      l
    ), l.dispatch = s, l = Vc(!1), m = Gc.bind(
      null,
      Ae,
      !1,
      l.queue
    ), l = zt(), f = {
      state: a,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = f, s = z3.bind(
      null,
      Ae,
      f,
      m,
      s
    ), f.dispatch = s, l.memoizedState = e, [a, s, !1];
  }
  function pm(e) {
    var a = rt();
    return mm(a, Ve, e);
  }
  function mm(e, a, s) {
    if (a = zc(
      e,
      a,
      dm
    )[0], e = Xo(Xn)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var l = os(a);
      } catch (b) {
        throw b === ts ? jo : b;
      }
    else l = a;
    a = rt();
    var f = a.queue, m = f.dispatch;
    return s !== a.memoizedState && (Ae.flags |= 2048, Zr(
      9,
      Io(),
      B3.bind(null, f, s),
      null
    )), [l, m, e];
  }
  function B3(e, a) {
    e.action = a;
  }
  function gm(e) {
    var a = rt(), s = Ve;
    if (s !== null)
      return mm(a, s, e);
    rt(), a = a.memoizedState, s = rt();
    var l = s.queue.dispatch;
    return s.memoizedState = e, [a, l, !1];
  }
  function Zr(e, a, s, l) {
    return e = { tag: e, create: s, deps: l, inst: a, next: null }, a = Ae.updateQueue, a === null && (a = Oc(), Ae.updateQueue = a), s = a.lastEffect, s === null ? a.lastEffect = e.next = e : (l = s.next, s.next = e, e.next = l, a.lastEffect = e), e;
  }
  function Io() {
    return { destroy: void 0, resource: void 0 };
  }
  function ym() {
    return rt().memoizedState;
  }
  function Zo(e, a, s, l) {
    var f = zt();
    l = l === void 0 ? null : l, Ae.flags |= e, f.memoizedState = Zr(
      1 | a,
      Io(),
      s,
      l
    );
  }
  function ls(e, a, s, l) {
    var f = rt();
    l = l === void 0 ? null : l;
    var m = f.memoizedState.inst;
    Ve !== null && l !== null && _c(l, Ve.memoizedState.deps) ? f.memoizedState = Zr(a, m, s, l) : (Ae.flags |= e, f.memoizedState = Zr(
      1 | a,
      m,
      s,
      l
    ));
  }
  function vm(e, a) {
    Zo(8390656, 8, e, a);
  }
  function bm(e, a) {
    ls(2048, 8, e, a);
  }
  function wm(e, a) {
    return ls(4, 2, e, a);
  }
  function xm(e, a) {
    return ls(4, 4, e, a);
  }
  function Sm(e, a) {
    if (typeof a == "function") {
      e = e();
      var s = a(e);
      return function() {
        typeof s == "function" ? s() : a(null);
      };
    }
    if (a != null)
      return e = e(), a.current = e, function() {
        a.current = null;
      };
  }
  function Am(e, a, s) {
    s = s != null ? s.concat([e]) : null, ls(4, 4, Sm.bind(null, a, e), s);
  }
  function jc() {
  }
  function Tm(e, a) {
    var s = rt();
    a = a === void 0 ? null : a;
    var l = s.memoizedState;
    return a !== null && _c(a, l[1]) ? l[0] : (s.memoizedState = [e, a], e);
  }
  function Mm(e, a) {
    var s = rt();
    a = a === void 0 ? null : a;
    var l = s.memoizedState;
    if (a !== null && _c(a, l[1]))
      return l[0];
    if (l = e(), nr) {
      sa(!0);
      try {
        e();
      } finally {
        sa(!1);
      }
    }
    return s.memoizedState = [l, a], l;
  }
  function Pc(e, a, s) {
    return s === void 0 || (ha & 1073741824) !== 0 ? e.memoizedState = a : (e.memoizedState = s, e = _g(), Ae.lanes |= e, wa |= e, s);
  }
  function Em(e, a, s, l) {
    return Gt(s, a) ? s : Yr.current !== null ? (e = Pc(e, s, l), Gt(e, a) || (pt = !0), e) : (ha & 42) === 0 ? (pt = !0, e.memoizedState = s) : (e = _g(), Ae.lanes |= e, wa |= e, a);
  }
  function Cm(e, a, s, l, f) {
    var m = O.p;
    O.p = m !== 0 && 8 > m ? m : 8;
    var b = k.T, A = {};
    k.T = A, Gc(e, !1, a, s);
    try {
      var R = f(), H = k.S;
      if (H !== null && H(A, R), R !== null && typeof R == "object" && typeof R.then == "function") {
        var K = D3(
          R,
          l
        );
        us(
          e,
          a,
          K,
          Wt(e)
        );
      } else
        us(
          e,
          a,
          l,
          Wt(e)
        );
    } catch ($) {
      us(
        e,
        a,
        { then: function() {
        }, status: "rejected", reason: $ },
        Wt()
      );
    } finally {
      O.p = m, k.T = b;
    }
  }
  function V3() {
  }
  function Hc(e, a, s, l) {
    if (e.tag !== 5) throw Error(i(476));
    var f = _m(e).queue;
    Cm(
      e,
      f,
      a,
      z,
      s === null ? V3 : function() {
        return Rm(e), s(l);
      }
    );
  }
  function _m(e) {
    var a = e.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: z,
      baseState: z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xn,
        lastRenderedState: z
      },
      next: null
    };
    var s = {};
    return a.next = {
      memoizedState: s,
      baseState: s,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xn,
        lastRenderedState: s
      },
      next: null
    }, e.memoizedState = a, e = e.alternate, e !== null && (e.memoizedState = a), a;
  }
  function Rm(e) {
    var a = _m(e).next.queue;
    us(e, a, {}, Wt());
  }
  function qc() {
    return Et(Cs);
  }
  function km() {
    return rt().memoizedState;
  }
  function Nm() {
    return rt().memoizedState;
  }
  function U3(e) {
    for (var a = e.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var s = Wt();
          e = fa(s);
          var l = da(a, e, s);
          l !== null && (Kt(l, a, s), as(l, a, s)), a = { cache: vc() }, e.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function j3(e, a, s) {
    var l = Wt();
    s = {
      lane: l,
      revertLane: 0,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Wo(e) ? Om(a, s) : (s = lc(e, a, s, l), s !== null && (Kt(s, e, l), Lm(s, a, l)));
  }
  function Dm(e, a, s) {
    var l = Wt();
    us(e, a, s, l);
  }
  function us(e, a, s, l) {
    var f = {
      lane: l,
      revertLane: 0,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Wo(e)) Om(a, f);
    else {
      var m = e.alternate;
      if (e.lanes === 0 && (m === null || m.lanes === 0) && (m = a.lastRenderedReducer, m !== null))
        try {
          var b = a.lastRenderedState, A = m(b, s);
          if (f.hasEagerState = !0, f.eagerState = A, Gt(A, b))
            return No(e, a, f, 0), He === null && ko(), !1;
        } catch {
        } finally {
        }
      if (s = lc(e, a, f, l), s !== null)
        return Kt(s, e, l), Lm(s, a, l), !0;
    }
    return !1;
  }
  function Gc(e, a, s, l) {
    if (l = {
      lane: 2,
      revertLane: Sf(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Wo(e)) {
      if (a) throw Error(i(479));
    } else
      a = lc(
        e,
        s,
        l,
        2
      ), a !== null && Kt(a, e, 2);
  }
  function Wo(e) {
    var a = e.alternate;
    return e === Ae || a !== null && a === Ae;
  }
  function Om(e, a) {
    Xr = qo = !0;
    var s = e.pending;
    s === null ? a.next = a : (a.next = s.next, s.next = a), e.pending = a;
  }
  function Lm(e, a, s) {
    if ((s & 4194048) !== 0) {
      var l = a.lanes;
      l &= e.pendingLanes, s |= l, a.lanes = s, q0(e, s);
    }
  }
  var Ko = {
    readContext: Et,
    use: Yo,
    useCallback: et,
    useContext: et,
    useEffect: et,
    useImperativeHandle: et,
    useLayoutEffect: et,
    useInsertionEffect: et,
    useMemo: et,
    useReducer: et,
    useRef: et,
    useState: et,
    useDebugValue: et,
    useDeferredValue: et,
    useTransition: et,
    useSyncExternalStore: et,
    useId: et,
    useHostTransitionStatus: et,
    useFormState: et,
    useActionState: et,
    useOptimistic: et,
    useMemoCache: et,
    useCacheRefresh: et
  }, zm = {
    readContext: Et,
    use: Yo,
    useCallback: function(e, a) {
      return zt().memoizedState = [
        e,
        a === void 0 ? null : a
      ], e;
    },
    useContext: Et,
    useEffect: vm,
    useImperativeHandle: function(e, a, s) {
      s = s != null ? s.concat([e]) : null, Zo(
        4194308,
        4,
        Sm.bind(null, a, e),
        s
      );
    },
    useLayoutEffect: function(e, a) {
      return Zo(4194308, 4, e, a);
    },
    useInsertionEffect: function(e, a) {
      Zo(4, 2, e, a);
    },
    useMemo: function(e, a) {
      var s = zt();
      a = a === void 0 ? null : a;
      var l = e();
      if (nr) {
        sa(!0);
        try {
          e();
        } finally {
          sa(!1);
        }
      }
      return s.memoizedState = [l, a], l;
    },
    useReducer: function(e, a, s) {
      var l = zt();
      if (s !== void 0) {
        var f = s(a);
        if (nr) {
          sa(!0);
          try {
            s(a);
          } finally {
            sa(!1);
          }
        }
      } else f = a;
      return l.memoizedState = l.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, l.queue = e, e = e.dispatch = j3.bind(
        null,
        Ae,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var a = zt();
      return e = { current: e }, a.memoizedState = e;
    },
    useState: function(e) {
      e = Vc(e);
      var a = e.queue, s = Dm.bind(null, Ae, a);
      return a.dispatch = s, [e.memoizedState, s];
    },
    useDebugValue: jc,
    useDeferredValue: function(e, a) {
      var s = zt();
      return Pc(s, e, a);
    },
    useTransition: function() {
      var e = Vc(!1);
      return e = Cm.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), zt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, a, s) {
      var l = Ae, f = zt();
      if (Le) {
        if (s === void 0)
          throw Error(i(407));
        s = s();
      } else {
        if (s = a(), He === null)
          throw Error(i(349));
        (Ne & 124) !== 0 || nm(l, a, s);
      }
      f.memoizedState = s;
      var m = { value: s, getSnapshot: a };
      return f.queue = m, vm(rm.bind(null, l, m, e), [
        e
      ]), l.flags |= 2048, Zr(
        9,
        Io(),
        am.bind(
          null,
          l,
          m,
          s,
          a
        ),
        null
      ), s;
    },
    useId: function() {
      var e = zt(), a = He.identifierPrefix;
      if (Le) {
        var s = qn, l = Hn;
        s = (l & ~(1 << 32 - qt(l) - 1)).toString(32) + s, a = "«" + a + "R" + s, s = Go++, 0 < s && (a += "H" + s.toString(32)), a += "»";
      } else
        s = O3++, a = "«" + a + "r" + s.toString(32) + "»";
      return e.memoizedState = a;
    },
    useHostTransitionStatus: qc,
    useFormState: hm,
    useActionState: hm,
    useOptimistic: function(e) {
      var a = zt();
      a.memoizedState = a.baseState = e;
      var s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = s, a = Gc.bind(
        null,
        Ae,
        !0,
        s
      ), s.dispatch = a, [e, a];
    },
    useMemoCache: Lc,
    useCacheRefresh: function() {
      return zt().memoizedState = U3.bind(
        null,
        Ae
      );
    }
  }, Bm = {
    readContext: Et,
    use: Yo,
    useCallback: Tm,
    useContext: Et,
    useEffect: bm,
    useImperativeHandle: Am,
    useInsertionEffect: wm,
    useLayoutEffect: xm,
    useMemo: Mm,
    useReducer: Xo,
    useRef: ym,
    useState: function() {
      return Xo(Xn);
    },
    useDebugValue: jc,
    useDeferredValue: function(e, a) {
      var s = rt();
      return Em(
        s,
        Ve.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = Xo(Xn)[0], a = rt().memoizedState;
      return [
        typeof e == "boolean" ? e : os(e),
        a
      ];
    },
    useSyncExternalStore: tm,
    useId: km,
    useHostTransitionStatus: qc,
    useFormState: pm,
    useActionState: pm,
    useOptimistic: function(e, a) {
      var s = rt();
      return om(s, Ve, e, a);
    },
    useMemoCache: Lc,
    useCacheRefresh: Nm
  }, P3 = {
    readContext: Et,
    use: Yo,
    useCallback: Tm,
    useContext: Et,
    useEffect: bm,
    useImperativeHandle: Am,
    useInsertionEffect: wm,
    useLayoutEffect: xm,
    useMemo: Mm,
    useReducer: Bc,
    useRef: ym,
    useState: function() {
      return Bc(Xn);
    },
    useDebugValue: jc,
    useDeferredValue: function(e, a) {
      var s = rt();
      return Ve === null ? Pc(s, e, a) : Em(
        s,
        Ve.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = Bc(Xn)[0], a = rt().memoizedState;
      return [
        typeof e == "boolean" ? e : os(e),
        a
      ];
    },
    useSyncExternalStore: tm,
    useId: km,
    useHostTransitionStatus: qc,
    useFormState: gm,
    useActionState: gm,
    useOptimistic: function(e, a) {
      var s = rt();
      return Ve !== null ? om(s, Ve, e, a) : (s.baseState = e, [e, s.queue.dispatch]);
    },
    useMemoCache: Lc,
    useCacheRefresh: Nm
  }, Wr = null, cs = 0;
  function Qo(e) {
    var a = cs;
    return cs += 1, Wr === null && (Wr = []), Zp(Wr, e, a);
  }
  function fs(e, a) {
    a = a.props.ref, e.ref = a !== void 0 ? a : null;
  }
  function Fo(e, a) {
    throw a.$$typeof === y ? Error(i(525)) : (e = Object.prototype.toString.call(a), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : e
      )
    ));
  }
  function Vm(e) {
    var a = e._init;
    return a(e._payload);
  }
  function Um(e) {
    function a(V, L) {
      if (e) {
        var j = V.deletions;
        j === null ? (V.deletions = [L], V.flags |= 16) : j.push(L);
      }
    }
    function s(V, L) {
      if (!e) return null;
      for (; L !== null; )
        a(V, L), L = L.sibling;
      return null;
    }
    function l(V) {
      for (var L = /* @__PURE__ */ new Map(); V !== null; )
        V.key !== null ? L.set(V.key, V) : L.set(V.index, V), V = V.sibling;
      return L;
    }
    function f(V, L) {
      return V = Pn(V, L), V.index = 0, V.sibling = null, V;
    }
    function m(V, L, j) {
      return V.index = j, e ? (j = V.alternate, j !== null ? (j = j.index, j < L ? (V.flags |= 67108866, L) : j) : (V.flags |= 67108866, L)) : (V.flags |= 1048576, L);
    }
    function b(V) {
      return e && V.alternate === null && (V.flags |= 67108866), V;
    }
    function A(V, L, j, Q) {
      return L === null || L.tag !== 6 ? (L = cc(j, V.mode, Q), L.return = V, L) : (L = f(L, j), L.return = V, L);
    }
    function R(V, L, j, Q) {
      var oe = j.type;
      return oe === x ? K(
        V,
        L,
        j.props.children,
        Q,
        j.key
      ) : L !== null && (L.elementType === oe || typeof oe == "object" && oe !== null && oe.$$typeof === _ && Vm(oe) === L.type) ? (L = f(L, j.props), fs(L, j), L.return = V, L) : (L = Oo(
        j.type,
        j.key,
        j.props,
        null,
        V.mode,
        Q
      ), fs(L, j), L.return = V, L);
    }
    function H(V, L, j, Q) {
      return L === null || L.tag !== 4 || L.stateNode.containerInfo !== j.containerInfo || L.stateNode.implementation !== j.implementation ? (L = fc(j, V.mode, Q), L.return = V, L) : (L = f(L, j.children || []), L.return = V, L);
    }
    function K(V, L, j, Q, oe) {
      return L === null || L.tag !== 7 ? (L = Wa(
        j,
        V.mode,
        Q,
        oe
      ), L.return = V, L) : (L = f(L, j), L.return = V, L);
    }
    function $(V, L, j) {
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return L = cc(
          "" + L,
          V.mode,
          j
        ), L.return = V, L;
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case v:
            return j = Oo(
              L.type,
              L.key,
              L.props,
              null,
              V.mode,
              j
            ), fs(j, L), j.return = V, j;
          case w:
            return L = fc(
              L,
              V.mode,
              j
            ), L.return = V, L;
          case _:
            var Q = L._init;
            return L = Q(L._payload), $(V, L, j);
        }
        if (se(L) || ne(L))
          return L = Wa(
            L,
            V.mode,
            j,
            null
          ), L.return = V, L;
        if (typeof L.then == "function")
          return $(V, Qo(L), j);
        if (L.$$typeof === C)
          return $(
            V,
            Vo(V, L),
            j
          );
        Fo(V, L);
      }
      return null;
    }
    function Y(V, L, j, Q) {
      var oe = L !== null ? L.key : null;
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return oe !== null ? null : A(V, L, "" + j, Q);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case v:
            return j.key === oe ? R(V, L, j, Q) : null;
          case w:
            return j.key === oe ? H(V, L, j, Q) : null;
          case _:
            return oe = j._init, j = oe(j._payload), Y(V, L, j, Q);
        }
        if (se(j) || ne(j))
          return oe !== null ? null : K(V, L, j, Q, null);
        if (typeof j.then == "function")
          return Y(
            V,
            L,
            Qo(j),
            Q
          );
        if (j.$$typeof === C)
          return Y(
            V,
            L,
            Vo(V, j),
            Q
          );
        Fo(V, j);
      }
      return null;
    }
    function I(V, L, j, Q, oe) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number" || typeof Q == "bigint")
        return V = V.get(j) || null, A(L, V, "" + Q, oe);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case v:
            return V = V.get(
              Q.key === null ? j : Q.key
            ) || null, R(L, V, Q, oe);
          case w:
            return V = V.get(
              Q.key === null ? j : Q.key
            ) || null, H(L, V, Q, oe);
          case _:
            var Ee = Q._init;
            return Q = Ee(Q._payload), I(
              V,
              L,
              j,
              Q,
              oe
            );
        }
        if (se(Q) || ne(Q))
          return V = V.get(j) || null, K(L, V, Q, oe, null);
        if (typeof Q.then == "function")
          return I(
            V,
            L,
            j,
            Qo(Q),
            oe
          );
        if (Q.$$typeof === C)
          return I(
            V,
            L,
            j,
            Vo(L, Q),
            oe
          );
        Fo(L, Q);
      }
      return null;
    }
    function be(V, L, j, Q) {
      for (var oe = null, Ee = null, de = L, ve = L = 0, gt = null; de !== null && ve < j.length; ve++) {
        de.index > ve ? (gt = de, de = null) : gt = de.sibling;
        var De = Y(
          V,
          de,
          j[ve],
          Q
        );
        if (De === null) {
          de === null && (de = gt);
          break;
        }
        e && de && De.alternate === null && a(V, de), L = m(De, L, ve), Ee === null ? oe = De : Ee.sibling = De, Ee = De, de = gt;
      }
      if (ve === j.length)
        return s(V, de), Le && Qa(V, ve), oe;
      if (de === null) {
        for (; ve < j.length; ve++)
          de = $(V, j[ve], Q), de !== null && (L = m(
            de,
            L,
            ve
          ), Ee === null ? oe = de : Ee.sibling = de, Ee = de);
        return Le && Qa(V, ve), oe;
      }
      for (de = l(de); ve < j.length; ve++)
        gt = I(
          de,
          V,
          ve,
          j[ve],
          Q
        ), gt !== null && (e && gt.alternate !== null && de.delete(
          gt.key === null ? ve : gt.key
        ), L = m(
          gt,
          L,
          ve
        ), Ee === null ? oe = gt : Ee.sibling = gt, Ee = gt);
      return e && de.forEach(function(Ra) {
        return a(V, Ra);
      }), Le && Qa(V, ve), oe;
    }
    function ye(V, L, j, Q) {
      if (j == null) throw Error(i(151));
      for (var oe = null, Ee = null, de = L, ve = L = 0, gt = null, De = j.next(); de !== null && !De.done; ve++, De = j.next()) {
        de.index > ve ? (gt = de, de = null) : gt = de.sibling;
        var Ra = Y(V, de, De.value, Q);
        if (Ra === null) {
          de === null && (de = gt);
          break;
        }
        e && de && Ra.alternate === null && a(V, de), L = m(Ra, L, ve), Ee === null ? oe = Ra : Ee.sibling = Ra, Ee = Ra, de = gt;
      }
      if (De.done)
        return s(V, de), Le && Qa(V, ve), oe;
      if (de === null) {
        for (; !De.done; ve++, De = j.next())
          De = $(V, De.value, Q), De !== null && (L = m(De, L, ve), Ee === null ? oe = De : Ee.sibling = De, Ee = De);
        return Le && Qa(V, ve), oe;
      }
      for (de = l(de); !De.done; ve++, De = j.next())
        De = I(de, V, ve, De.value, Q), De !== null && (e && De.alternate !== null && de.delete(De.key === null ? ve : De.key), L = m(De, L, ve), Ee === null ? oe = De : Ee.sibling = De, Ee = De);
      return e && de.forEach(function(HS) {
        return a(V, HS);
      }), Le && Qa(V, ve), oe;
    }
    function je(V, L, j, Q) {
      if (typeof j == "object" && j !== null && j.type === x && j.key === null && (j = j.props.children), typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case v:
            e: {
              for (var oe = j.key; L !== null; ) {
                if (L.key === oe) {
                  if (oe = j.type, oe === x) {
                    if (L.tag === 7) {
                      s(
                        V,
                        L.sibling
                      ), Q = f(
                        L,
                        j.props.children
                      ), Q.return = V, V = Q;
                      break e;
                    }
                  } else if (L.elementType === oe || typeof oe == "object" && oe !== null && oe.$$typeof === _ && Vm(oe) === L.type) {
                    s(
                      V,
                      L.sibling
                    ), Q = f(L, j.props), fs(Q, j), Q.return = V, V = Q;
                    break e;
                  }
                  s(V, L);
                  break;
                } else a(V, L);
                L = L.sibling;
              }
              j.type === x ? (Q = Wa(
                j.props.children,
                V.mode,
                Q,
                j.key
              ), Q.return = V, V = Q) : (Q = Oo(
                j.type,
                j.key,
                j.props,
                null,
                V.mode,
                Q
              ), fs(Q, j), Q.return = V, V = Q);
            }
            return b(V);
          case w:
            e: {
              for (oe = j.key; L !== null; ) {
                if (L.key === oe)
                  if (L.tag === 4 && L.stateNode.containerInfo === j.containerInfo && L.stateNode.implementation === j.implementation) {
                    s(
                      V,
                      L.sibling
                    ), Q = f(L, j.children || []), Q.return = V, V = Q;
                    break e;
                  } else {
                    s(V, L);
                    break;
                  }
                else a(V, L);
                L = L.sibling;
              }
              Q = fc(j, V.mode, Q), Q.return = V, V = Q;
            }
            return b(V);
          case _:
            return oe = j._init, j = oe(j._payload), je(
              V,
              L,
              j,
              Q
            );
        }
        if (se(j))
          return be(
            V,
            L,
            j,
            Q
          );
        if (ne(j)) {
          if (oe = ne(j), typeof oe != "function") throw Error(i(150));
          return j = oe.call(j), ye(
            V,
            L,
            j,
            Q
          );
        }
        if (typeof j.then == "function")
          return je(
            V,
            L,
            Qo(j),
            Q
          );
        if (j.$$typeof === C)
          return je(
            V,
            L,
            Vo(V, j),
            Q
          );
        Fo(V, j);
      }
      return typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint" ? (j = "" + j, L !== null && L.tag === 6 ? (s(V, L.sibling), Q = f(L, j), Q.return = V, V = Q) : (s(V, L), Q = cc(j, V.mode, Q), Q.return = V, V = Q), b(V)) : s(V, L);
    }
    return function(V, L, j, Q) {
      try {
        cs = 0;
        var oe = je(
          V,
          L,
          j,
          Q
        );
        return Wr = null, oe;
      } catch (de) {
        if (de === ts || de === jo) throw de;
        var Ee = Yt(29, de, null, V.mode);
        return Ee.lanes = Q, Ee.return = V, Ee;
      } finally {
      }
    };
  }
  var Kr = Um(!0), jm = Um(!1), on = B(null), Cn = null;
  function pa(e) {
    var a = e.alternate;
    J(ut, ut.current & 1), J(on, e), Cn === null && (a === null || Yr.current !== null || a.memoizedState !== null) && (Cn = e);
  }
  function Pm(e) {
    if (e.tag === 22) {
      if (J(ut, ut.current), J(on, e), Cn === null) {
        var a = e.alternate;
        a !== null && a.memoizedState !== null && (Cn = e);
      }
    } else ma();
  }
  function ma() {
    J(ut, ut.current), J(on, on.current);
  }
  function In(e) {
    G(on), Cn === e && (Cn = null), G(ut);
  }
  var ut = B(0);
  function $o(e) {
    for (var a = e; a !== null; ) {
      if (a.tag === 13) {
        var s = a.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || s.data === "$?" || Lf(s)))
          return a;
      } else if (a.tag === 19 && a.memoizedProps.revealOrder !== void 0) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === e) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e) return null;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
    return null;
  }
  function Yc(e, a, s, l) {
    a = e.memoizedState, s = s(l, a), s = s == null ? a : g({}, a, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var Xc = {
    enqueueSetState: function(e, a, s) {
      e = e._reactInternals;
      var l = Wt(), f = fa(l);
      f.payload = a, s != null && (f.callback = s), a = da(e, f, l), a !== null && (Kt(a, e, l), as(a, e, l));
    },
    enqueueReplaceState: function(e, a, s) {
      e = e._reactInternals;
      var l = Wt(), f = fa(l);
      f.tag = 1, f.payload = a, s != null && (f.callback = s), a = da(e, f, l), a !== null && (Kt(a, e, l), as(a, e, l));
    },
    enqueueForceUpdate: function(e, a) {
      e = e._reactInternals;
      var s = Wt(), l = fa(s);
      l.tag = 2, a != null && (l.callback = a), a = da(e, l, s), a !== null && (Kt(a, e, s), as(a, e, s));
    }
  };
  function Hm(e, a, s, l, f, m, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, m, b) : a.prototype && a.prototype.isPureReactComponent ? !Zi(s, l) || !Zi(f, m) : !0;
  }
  function qm(e, a, s, l) {
    e = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(s, l), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(s, l), a.state !== e && Xc.enqueueReplaceState(a, a.state, null);
  }
  function ar(e, a) {
    var s = a;
    if ("ref" in a) {
      s = {};
      for (var l in a)
        l !== "ref" && (s[l] = a[l]);
    }
    if (e = e.defaultProps) {
      s === a && (s = g({}, s));
      for (var f in e)
        s[f] === void 0 && (s[f] = e[f]);
    }
    return s;
  }
  var Jo = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var a = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(a)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  };
  function Gm(e) {
    Jo(e);
  }
  function Ym(e) {
    console.error(e);
  }
  function Xm(e) {
    Jo(e);
  }
  function el(e, a) {
    try {
      var s = e.onUncaughtError;
      s(a.value, { componentStack: a.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Im(e, a, s) {
    try {
      var l = e.onCaughtError;
      l(s.value, {
        componentStack: s.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function Ic(e, a, s) {
    return s = fa(s), s.tag = 3, s.payload = { element: null }, s.callback = function() {
      el(e, a);
    }, s;
  }
  function Zm(e) {
    return e = fa(e), e.tag = 3, e;
  }
  function Wm(e, a, s, l) {
    var f = s.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var m = l.value;
      e.payload = function() {
        return f(m);
      }, e.callback = function() {
        Im(a, s, l);
      };
    }
    var b = s.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      Im(a, s, l), typeof f != "function" && (xa === null ? xa = /* @__PURE__ */ new Set([this]) : xa.add(this));
      var A = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: A !== null ? A : ""
      });
    });
  }
  function H3(e, a, s, l, f) {
    if (s.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (a = s.alternate, a !== null && $i(
        a,
        s,
        f,
        !0
      ), s = on.current, s !== null) {
        switch (s.tag) {
          case 13:
            return Cn === null ? yf() : s.alternate === null && $e === 0 && ($e = 3), s.flags &= -257, s.flags |= 65536, s.lanes = f, l === xc ? s.flags |= 16384 : (a = s.updateQueue, a === null ? s.updateQueue = /* @__PURE__ */ new Set([l]) : a.add(l), bf(e, l, f)), !1;
          case 22:
            return s.flags |= 65536, l === xc ? s.flags |= 16384 : (a = s.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, s.updateQueue = a) : (s = a.retryQueue, s === null ? a.retryQueue = /* @__PURE__ */ new Set([l]) : s.add(l)), bf(e, l, f)), !1;
        }
        throw Error(i(435, s.tag));
      }
      return bf(e, l, f), yf(), !1;
    }
    if (Le)
      return a = on.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = f, l !== pc && (e = Error(i(422), { cause: l }), Fi(nn(e, s)))) : (l !== pc && (a = Error(i(423), {
        cause: l
      }), Fi(
        nn(a, s)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, l = nn(l, s), f = Ic(
        e.stateNode,
        l,
        f
      ), Tc(e, f), $e !== 4 && ($e = 2)), !1;
    var m = Error(i(520), { cause: l });
    if (m = nn(m, s), vs === null ? vs = [m] : vs.push(m), $e !== 4 && ($e = 2), a === null) return !0;
    l = nn(l, s), s = a;
    do {
      switch (s.tag) {
        case 3:
          return s.flags |= 65536, e = f & -f, s.lanes |= e, e = Ic(s.stateNode, l, e), Tc(s, e), !1;
        case 1:
          if (a = s.type, m = s.stateNode, (s.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (xa === null || !xa.has(m))))
            return s.flags |= 65536, f &= -f, s.lanes |= f, f = Zm(f), Wm(
              f,
              e,
              s,
              l
            ), Tc(s, f), !1;
      }
      s = s.return;
    } while (s !== null);
    return !1;
  }
  var Km = Error(i(461)), pt = !1;
  function bt(e, a, s, l) {
    a.child = e === null ? jm(a, null, s, l) : Kr(
      a,
      e.child,
      s,
      l
    );
  }
  function Qm(e, a, s, l, f) {
    s = s.render;
    var m = a.ref;
    if ("ref" in l) {
      var b = {};
      for (var A in l)
        A !== "ref" && (b[A] = l[A]);
    } else b = l;
    return er(a), l = Rc(
      e,
      a,
      s,
      b,
      m,
      f
    ), A = kc(), e !== null && !pt ? (Nc(e, a, f), Zn(e, a, f)) : (Le && A && dc(a), a.flags |= 1, bt(e, a, l, f), a.child);
  }
  function Fm(e, a, s, l, f) {
    if (e === null) {
      var m = s.type;
      return typeof m == "function" && !uc(m) && m.defaultProps === void 0 && s.compare === null ? (a.tag = 15, a.type = m, $m(
        e,
        a,
        m,
        l,
        f
      )) : (e = Oo(
        s.type,
        null,
        l,
        a,
        a.mode,
        f
      ), e.ref = a.ref, e.return = a, a.child = e);
    }
    if (m = e.child, !ef(e, f)) {
      var b = m.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Zi, s(b, l) && e.ref === a.ref)
        return Zn(e, a, f);
    }
    return a.flags |= 1, e = Pn(m, l), e.ref = a.ref, e.return = a, a.child = e;
  }
  function $m(e, a, s, l, f) {
    if (e !== null) {
      var m = e.memoizedProps;
      if (Zi(m, l) && e.ref === a.ref)
        if (pt = !1, a.pendingProps = l = m, ef(e, f))
          (e.flags & 131072) !== 0 && (pt = !0);
        else
          return a.lanes = e.lanes, Zn(e, a, f);
    }
    return Zc(
      e,
      a,
      s,
      l,
      f
    );
  }
  function Jm(e, a, s) {
    var l = a.pendingProps, f = l.children, m = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (l = m !== null ? m.baseLanes | s : s, e !== null) {
          for (f = a.child = e.child, m = 0; f !== null; )
            m = m | f.lanes | f.childLanes, f = f.sibling;
          a.childLanes = m & ~l;
        } else a.childLanes = 0, a.child = null;
        return eg(
          e,
          a,
          l,
          s
        );
      }
      if ((s & 536870912) !== 0)
        a.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Uo(
          a,
          m !== null ? m.cachePool : null
        ), m !== null ? $p(a, m) : Ec(), Pm(a);
      else
        return a.lanes = a.childLanes = 536870912, eg(
          e,
          a,
          m !== null ? m.baseLanes | s : s,
          s
        );
    } else
      m !== null ? (Uo(a, m.cachePool), $p(a, m), ma(), a.memoizedState = null) : (e !== null && Uo(a, null), Ec(), ma());
    return bt(e, a, f, s), a.child;
  }
  function eg(e, a, s, l) {
    var f = wc();
    return f = f === null ? null : { parent: lt._currentValue, pool: f }, a.memoizedState = {
      baseLanes: s,
      cachePool: f
    }, e !== null && Uo(a, null), Ec(), Pm(a), e !== null && $i(e, a, l, !0), null;
  }
  function tl(e, a) {
    var s = a.ref;
    if (s === null)
      e !== null && e.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof s != "function" && typeof s != "object")
        throw Error(i(284));
      (e === null || e.ref !== s) && (a.flags |= 4194816);
    }
  }
  function Zc(e, a, s, l, f) {
    return er(a), s = Rc(
      e,
      a,
      s,
      l,
      void 0,
      f
    ), l = kc(), e !== null && !pt ? (Nc(e, a, f), Zn(e, a, f)) : (Le && l && dc(a), a.flags |= 1, bt(e, a, s, f), a.child);
  }
  function tg(e, a, s, l, f, m) {
    return er(a), a.updateQueue = null, s = em(
      a,
      l,
      s,
      f
    ), Jp(e), l = kc(), e !== null && !pt ? (Nc(e, a, m), Zn(e, a, m)) : (Le && l && dc(a), a.flags |= 1, bt(e, a, s, m), a.child);
  }
  function ng(e, a, s, l, f) {
    if (er(a), a.stateNode === null) {
      var m = jr, b = s.contextType;
      typeof b == "object" && b !== null && (m = Et(b)), m = new s(l, m), a.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = Xc, a.stateNode = m, m._reactInternals = a, m = a.stateNode, m.props = l, m.state = a.memoizedState, m.refs = {}, Sc(a), b = s.contextType, m.context = typeof b == "object" && b !== null ? Et(b) : jr, m.state = a.memoizedState, b = s.getDerivedStateFromProps, typeof b == "function" && (Yc(
        a,
        s,
        b,
        l
      ), m.state = a.memoizedState), typeof s.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (b = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), b !== m.state && Xc.enqueueReplaceState(m, m.state, null), is(a, l, m, f), rs(), m.state = a.memoizedState), typeof m.componentDidMount == "function" && (a.flags |= 4194308), l = !0;
    } else if (e === null) {
      m = a.stateNode;
      var A = a.memoizedProps, R = ar(s, A);
      m.props = R;
      var H = m.context, K = s.contextType;
      b = jr, typeof K == "object" && K !== null && (b = Et(K));
      var $ = s.getDerivedStateFromProps;
      K = typeof $ == "function" || typeof m.getSnapshotBeforeUpdate == "function", A = a.pendingProps !== A, K || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (A || H !== b) && qm(
        a,
        m,
        l,
        b
      ), ca = !1;
      var Y = a.memoizedState;
      m.state = Y, is(a, l, m, f), rs(), H = a.memoizedState, A || Y !== H || ca ? (typeof $ == "function" && (Yc(
        a,
        s,
        $,
        l
      ), H = a.memoizedState), (R = ca || Hm(
        a,
        s,
        R,
        l,
        Y,
        H,
        b
      )) ? (K || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = l, a.memoizedState = H), m.props = l, m.state = H, m.context = b, l = R) : (typeof m.componentDidMount == "function" && (a.flags |= 4194308), l = !1);
    } else {
      m = a.stateNode, Ac(e, a), b = a.memoizedProps, K = ar(s, b), m.props = K, $ = a.pendingProps, Y = m.context, H = s.contextType, R = jr, typeof H == "object" && H !== null && (R = Et(H)), A = s.getDerivedStateFromProps, (H = typeof A == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (b !== $ || Y !== R) && qm(
        a,
        m,
        l,
        R
      ), ca = !1, Y = a.memoizedState, m.state = Y, is(a, l, m, f), rs();
      var I = a.memoizedState;
      b !== $ || Y !== I || ca || e !== null && e.dependencies !== null && Bo(e.dependencies) ? (typeof A == "function" && (Yc(
        a,
        s,
        A,
        l
      ), I = a.memoizedState), (K = ca || Hm(
        a,
        s,
        K,
        l,
        Y,
        I,
        R
      ) || e !== null && e.dependencies !== null && Bo(e.dependencies)) ? (H || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(l, I, R), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        l,
        I,
        R
      )), typeof m.componentDidUpdate == "function" && (a.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || b === e.memoizedProps && Y === e.memoizedState || (a.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && Y === e.memoizedState || (a.flags |= 1024), a.memoizedProps = l, a.memoizedState = I), m.props = l, m.state = I, m.context = R, l = K) : (typeof m.componentDidUpdate != "function" || b === e.memoizedProps && Y === e.memoizedState || (a.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && Y === e.memoizedState || (a.flags |= 1024), l = !1);
    }
    return m = l, tl(e, a), l = (a.flags & 128) !== 0, m || l ? (m = a.stateNode, s = l && typeof s.getDerivedStateFromError != "function" ? null : m.render(), a.flags |= 1, e !== null && l ? (a.child = Kr(
      a,
      e.child,
      null,
      f
    ), a.child = Kr(
      a,
      null,
      s,
      f
    )) : bt(e, a, s, f), a.memoizedState = m.state, e = a.child) : e = Zn(
      e,
      a,
      f
    ), e;
  }
  function ag(e, a, s, l) {
    return Qi(), a.flags |= 256, bt(e, a, s, l), a.child;
  }
  var Wc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Kc(e) {
    return { baseLanes: e, cachePool: Yp() };
  }
  function Qc(e, a, s) {
    return e = e !== null ? e.childLanes & ~s : 0, a && (e |= ln), e;
  }
  function rg(e, a, s) {
    var l = a.pendingProps, f = !1, m = (a.flags & 128) !== 0, b;
    if ((b = m) || (b = e !== null && e.memoizedState === null ? !1 : (ut.current & 2) !== 0), b && (f = !0, a.flags &= -129), b = (a.flags & 32) !== 0, a.flags &= -33, e === null) {
      if (Le) {
        if (f ? pa(a) : ma(), Le) {
          var A = Fe, R;
          if (R = A) {
            e: {
              for (R = A, A = En; R.nodeType !== 8; ) {
                if (!A) {
                  A = null;
                  break e;
                }
                if (R = vn(
                  R.nextSibling
                ), R === null) {
                  A = null;
                  break e;
                }
              }
              A = R;
            }
            A !== null ? (a.memoizedState = {
              dehydrated: A,
              treeContext: Ka !== null ? { id: Hn, overflow: qn } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, R = Yt(
              18,
              null,
              null,
              0
            ), R.stateNode = A, R.return = a, a.child = R, Rt = a, Fe = null, R = !0) : R = !1;
          }
          R || $a(a);
        }
        if (A = a.memoizedState, A !== null && (A = A.dehydrated, A !== null))
          return Lf(A) ? a.lanes = 32 : a.lanes = 536870912, null;
        In(a);
      }
      return A = l.children, l = l.fallback, f ? (ma(), f = a.mode, A = nl(
        { mode: "hidden", children: A },
        f
      ), l = Wa(
        l,
        f,
        s,
        null
      ), A.return = a, l.return = a, A.sibling = l, a.child = A, f = a.child, f.memoizedState = Kc(s), f.childLanes = Qc(
        e,
        b,
        s
      ), a.memoizedState = Wc, l) : (pa(a), Fc(a, A));
    }
    if (R = e.memoizedState, R !== null && (A = R.dehydrated, A !== null)) {
      if (m)
        a.flags & 256 ? (pa(a), a.flags &= -257, a = $c(
          e,
          a,
          s
        )) : a.memoizedState !== null ? (ma(), a.child = e.child, a.flags |= 128, a = null) : (ma(), f = l.fallback, A = a.mode, l = nl(
          { mode: "visible", children: l.children },
          A
        ), f = Wa(
          f,
          A,
          s,
          null
        ), f.flags |= 2, l.return = a, f.return = a, l.sibling = f, a.child = l, Kr(
          a,
          e.child,
          null,
          s
        ), l = a.child, l.memoizedState = Kc(s), l.childLanes = Qc(
          e,
          b,
          s
        ), a.memoizedState = Wc, a = f);
      else if (pa(a), Lf(A)) {
        if (b = A.nextSibling && A.nextSibling.dataset, b) var H = b.dgst;
        b = H, l = Error(i(419)), l.stack = "", l.digest = b, Fi({ value: l, source: null, stack: null }), a = $c(
          e,
          a,
          s
        );
      } else if (pt || $i(e, a, s, !1), b = (s & e.childLanes) !== 0, pt || b) {
        if (b = He, b !== null && (l = s & -s, l = (l & 42) !== 0 ? 1 : Lu(l), l = (l & (b.suspendedLanes | s)) !== 0 ? 0 : l, l !== 0 && l !== R.retryLane))
          throw R.retryLane = l, Ur(e, l), Kt(b, e, l), Km;
        A.data === "$?" || yf(), a = $c(
          e,
          a,
          s
        );
      } else
        A.data === "$?" ? (a.flags |= 192, a.child = e.child, a = null) : (e = R.treeContext, Fe = vn(
          A.nextSibling
        ), Rt = a, Le = !0, Fa = null, En = !1, e !== null && (rn[sn++] = Hn, rn[sn++] = qn, rn[sn++] = Ka, Hn = e.id, qn = e.overflow, Ka = a), a = Fc(
          a,
          l.children
        ), a.flags |= 4096);
      return a;
    }
    return f ? (ma(), f = l.fallback, A = a.mode, R = e.child, H = R.sibling, l = Pn(R, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = R.subtreeFlags & 65011712, H !== null ? f = Pn(H, f) : (f = Wa(
      f,
      A,
      s,
      null
    ), f.flags |= 2), f.return = a, l.return = a, l.sibling = f, a.child = l, l = f, f = a.child, A = e.child.memoizedState, A === null ? A = Kc(s) : (R = A.cachePool, R !== null ? (H = lt._currentValue, R = R.parent !== H ? { parent: H, pool: H } : R) : R = Yp(), A = {
      baseLanes: A.baseLanes | s,
      cachePool: R
    }), f.memoizedState = A, f.childLanes = Qc(
      e,
      b,
      s
    ), a.memoizedState = Wc, l) : (pa(a), s = e.child, e = s.sibling, s = Pn(s, {
      mode: "visible",
      children: l.children
    }), s.return = a, s.sibling = null, e !== null && (b = a.deletions, b === null ? (a.deletions = [e], a.flags |= 16) : b.push(e)), a.child = s, a.memoizedState = null, s);
  }
  function Fc(e, a) {
    return a = nl(
      { mode: "visible", children: a },
      e.mode
    ), a.return = e, e.child = a;
  }
  function nl(e, a) {
    return e = Yt(22, e, null, a), e.lanes = 0, e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, e;
  }
  function $c(e, a, s) {
    return Kr(a, e.child, null, s), e = Fc(
      a,
      a.pendingProps.children
    ), e.flags |= 2, a.memoizedState = null, e;
  }
  function ig(e, a, s) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a), gc(e.return, a, s);
  }
  function Jc(e, a, s, l, f) {
    var m = e.memoizedState;
    m === null ? e.memoizedState = {
      isBackwards: a,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: s,
      tailMode: f
    } : (m.isBackwards = a, m.rendering = null, m.renderingStartTime = 0, m.last = l, m.tail = s, m.tailMode = f);
  }
  function sg(e, a, s) {
    var l = a.pendingProps, f = l.revealOrder, m = l.tail;
    if (bt(e, a, l.children, s), l = ut.current, (l & 2) !== 0)
      l = l & 1 | 2, a.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = a.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && ig(e, s, a);
          else if (e.tag === 19)
            ig(e, s, a);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === a) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === a)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      l &= 1;
    }
    switch (J(ut, l), f) {
      case "forwards":
        for (s = a.child, f = null; s !== null; )
          e = s.alternate, e !== null && $o(e) === null && (f = s), s = s.sibling;
        s = f, s === null ? (f = a.child, a.child = null) : (f = s.sibling, s.sibling = null), Jc(
          a,
          !1,
          f,
          s,
          m
        );
        break;
      case "backwards":
        for (s = null, f = a.child, a.child = null; f !== null; ) {
          if (e = f.alternate, e !== null && $o(e) === null) {
            a.child = f;
            break;
          }
          e = f.sibling, f.sibling = s, s = f, f = e;
        }
        Jc(
          a,
          !0,
          s,
          null,
          m
        );
        break;
      case "together":
        Jc(a, !1, null, null, void 0);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function Zn(e, a, s) {
    if (e !== null && (a.dependencies = e.dependencies), wa |= a.lanes, (s & a.childLanes) === 0)
      if (e !== null) {
        if ($i(
          e,
          a,
          s,
          !1
        ), (s & a.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && a.child !== e.child)
      throw Error(i(153));
    if (a.child !== null) {
      for (e = a.child, s = Pn(e, e.pendingProps), a.child = s, s.return = a; e.sibling !== null; )
        e = e.sibling, s = s.sibling = Pn(e, e.pendingProps), s.return = a;
      s.sibling = null;
    }
    return a.child;
  }
  function ef(e, a) {
    return (e.lanes & a) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Bo(e)));
  }
  function q3(e, a, s) {
    switch (a.tag) {
      case 3:
        Me(a, a.stateNode.containerInfo), ua(a, lt, e.memoizedState.cache), Qi();
        break;
      case 27:
      case 5:
        yt(a);
        break;
      case 4:
        Me(a, a.stateNode.containerInfo);
        break;
      case 10:
        ua(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 13:
        var l = a.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (pa(a), a.flags |= 128, null) : (s & a.child.childLanes) !== 0 ? rg(e, a, s) : (pa(a), e = Zn(
            e,
            a,
            s
          ), e !== null ? e.sibling : null);
        pa(a);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (l = (s & a.childLanes) !== 0, l || ($i(
          e,
          a,
          s,
          !1
        ), l = (s & a.childLanes) !== 0), f) {
          if (l)
            return sg(
              e,
              a,
              s
            );
          a.flags |= 128;
        }
        if (f = a.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), J(ut, ut.current), l) break;
        return null;
      case 22:
      case 23:
        return a.lanes = 0, Jm(e, a, s);
      case 24:
        ua(a, lt, e.memoizedState.cache);
    }
    return Zn(e, a, s);
  }
  function og(e, a, s) {
    if (e !== null)
      if (e.memoizedProps !== a.pendingProps)
        pt = !0;
      else {
        if (!ef(e, s) && (a.flags & 128) === 0)
          return pt = !1, q3(
            e,
            a,
            s
          );
        pt = (e.flags & 131072) !== 0;
      }
    else
      pt = !1, Le && (a.flags & 1048576) !== 0 && Vp(a, zo, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        e: {
          e = a.pendingProps;
          var l = a.elementType, f = l._init;
          if (l = f(l._payload), a.type = l, typeof l == "function")
            uc(l) ? (e = ar(l, e), a.tag = 1, a = ng(
              null,
              a,
              l,
              e,
              s
            )) : (a.tag = 0, a = Zc(
              null,
              a,
              l,
              e,
              s
            ));
          else {
            if (l != null) {
              if (f = l.$$typeof, f === X) {
                a.tag = 11, a = Qm(
                  null,
                  a,
                  l,
                  e,
                  s
                );
                break e;
              } else if (f === P) {
                a.tag = 14, a = Fm(
                  null,
                  a,
                  l,
                  e,
                  s
                );
                break e;
              }
            }
            throw a = ce(l) || l, Error(i(306, a, ""));
          }
        }
        return a;
      case 0:
        return Zc(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 1:
        return l = a.type, f = ar(
          l,
          a.pendingProps
        ), ng(
          e,
          a,
          l,
          f,
          s
        );
      case 3:
        e: {
          if (Me(
            a,
            a.stateNode.containerInfo
          ), e === null) throw Error(i(387));
          l = a.pendingProps;
          var m = a.memoizedState;
          f = m.element, Ac(e, a), is(a, l, null, s);
          var b = a.memoizedState;
          if (l = b.cache, ua(a, lt, l), l !== m.cache && yc(
            a,
            [lt],
            s,
            !0
          ), rs(), l = b.element, m.isDehydrated)
            if (m = {
              element: l,
              isDehydrated: !1,
              cache: b.cache
            }, a.updateQueue.baseState = m, a.memoizedState = m, a.flags & 256) {
              a = ag(
                e,
                a,
                l,
                s
              );
              break e;
            } else if (l !== f) {
              f = nn(
                Error(i(424)),
                a
              ), Fi(f), a = ag(
                e,
                a,
                l,
                s
              );
              break e;
            } else {
              switch (e = a.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Fe = vn(e.firstChild), Rt = a, Le = !0, Fa = null, En = !0, s = jm(
                a,
                null,
                l,
                s
              ), a.child = s; s; )
                s.flags = s.flags & -3 | 4096, s = s.sibling;
            }
          else {
            if (Qi(), l === f) {
              a = Zn(
                e,
                a,
                s
              );
              break e;
            }
            bt(
              e,
              a,
              l,
              s
            );
          }
          a = a.child;
        }
        return a;
      case 26:
        return tl(e, a), e === null ? (s = f1(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = s : Le || (s = a.type, e = a.pendingProps, l = gl(
          ie.current
        ).createElement(s), l[Mt] = a, l[Ot] = e, xt(l, s, e), ht(l), a.stateNode = l) : a.memoizedState = f1(
          a.type,
          e.memoizedProps,
          a.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return yt(a), e === null && Le && (l = a.stateNode = l1(
          a.type,
          a.pendingProps,
          ie.current
        ), Rt = a, En = !0, f = Fe, Ta(a.type) ? (zf = f, Fe = vn(
          l.firstChild
        )) : Fe = f), bt(
          e,
          a,
          a.pendingProps.children,
          s
        ), tl(e, a), e === null && (a.flags |= 4194304), a.child;
      case 5:
        return e === null && Le && ((f = l = Fe) && (l = gS(
          l,
          a.type,
          a.pendingProps,
          En
        ), l !== null ? (a.stateNode = l, Rt = a, Fe = vn(
          l.firstChild
        ), En = !1, f = !0) : f = !1), f || $a(a)), yt(a), f = a.type, m = a.pendingProps, b = e !== null ? e.memoizedProps : null, l = m.children, Nf(f, m) ? l = null : b !== null && Nf(f, b) && (a.flags |= 32), a.memoizedState !== null && (f = Rc(
          e,
          a,
          L3,
          null,
          null,
          s
        ), Cs._currentValue = f), tl(e, a), bt(e, a, l, s), a.child;
      case 6:
        return e === null && Le && ((e = s = Fe) && (s = yS(
          s,
          a.pendingProps,
          En
        ), s !== null ? (a.stateNode = s, Rt = a, Fe = null, e = !0) : e = !1), e || $a(a)), null;
      case 13:
        return rg(e, a, s);
      case 4:
        return Me(
          a,
          a.stateNode.containerInfo
        ), l = a.pendingProps, e === null ? a.child = Kr(
          a,
          null,
          l,
          s
        ) : bt(
          e,
          a,
          l,
          s
        ), a.child;
      case 11:
        return Qm(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 7:
        return bt(
          e,
          a,
          a.pendingProps,
          s
        ), a.child;
      case 8:
        return bt(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 12:
        return bt(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 10:
        return l = a.pendingProps, ua(a, a.type, l.value), bt(
          e,
          a,
          l.children,
          s
        ), a.child;
      case 9:
        return f = a.type._context, l = a.pendingProps.children, er(a), f = Et(f), l = l(f), a.flags |= 1, bt(e, a, l, s), a.child;
      case 14:
        return Fm(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 15:
        return $m(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 19:
        return sg(e, a, s);
      case 31:
        return l = a.pendingProps, s = a.mode, l = {
          mode: l.mode,
          children: l.children
        }, e === null ? (s = nl(
          l,
          s
        ), s.ref = a.ref, a.child = s, s.return = a, a = s) : (s = Pn(e.child, l), s.ref = a.ref, a.child = s, s.return = a, a = s), a;
      case 22:
        return Jm(e, a, s);
      case 24:
        return er(a), l = Et(lt), e === null ? (f = wc(), f === null && (f = He, m = vc(), f.pooledCache = m, m.refCount++, m !== null && (f.pooledCacheLanes |= s), f = m), a.memoizedState = {
          parent: l,
          cache: f
        }, Sc(a), ua(a, lt, f)) : ((e.lanes & s) !== 0 && (Ac(e, a), is(a, null, null, s), rs()), f = e.memoizedState, m = a.memoizedState, f.parent !== l ? (f = { parent: l, cache: l }, a.memoizedState = f, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = f), ua(a, lt, l)) : (l = m.cache, ua(a, lt, l), l !== f.cache && yc(
          a,
          [lt],
          s,
          !0
        ))), bt(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 29:
        throw a.pendingProps;
    }
    throw Error(i(156, a.tag));
  }
  function Wn(e) {
    e.flags |= 4;
  }
  function lg(e, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !g1(a)) {
      if (a = on.current, a !== null && ((Ne & 4194048) === Ne ? Cn !== null : (Ne & 62914560) !== Ne && (Ne & 536870912) === 0 || a !== Cn))
        throw ns = xc, Xp;
      e.flags |= 8192;
    }
  }
  function al(e, a) {
    a !== null && (e.flags |= 4), e.flags & 16384 && (a = e.tag !== 22 ? P0() : 536870912, e.lanes |= a, Jr |= a);
  }
  function ds(e, a) {
    if (!Le)
      switch (e.tailMode) {
        case "hidden":
          a = e.tail;
          for (var s = null; a !== null; )
            a.alternate !== null && (s = a), a = a.sibling;
          s === null ? e.tail = null : s.sibling = null;
          break;
        case "collapsed":
          s = e.tail;
          for (var l = null; s !== null; )
            s.alternate !== null && (l = s), s = s.sibling;
          l === null ? a || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function Ke(e) {
    var a = e.alternate !== null && e.alternate.child === e.child, s = 0, l = 0;
    if (a)
      for (var f = e.child; f !== null; )
        s |= f.lanes | f.childLanes, l |= f.subtreeFlags & 65011712, l |= f.flags & 65011712, f.return = e, f = f.sibling;
    else
      for (f = e.child; f !== null; )
        s |= f.lanes | f.childLanes, l |= f.subtreeFlags, l |= f.flags, f.return = e, f = f.sibling;
    return e.subtreeFlags |= l, e.childLanes = s, a;
  }
  function G3(e, a, s) {
    var l = a.pendingProps;
    switch (hc(a), a.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ke(a), null;
      case 1:
        return Ke(a), null;
      case 3:
        return s = a.stateNode, l = null, e !== null && (l = e.memoizedState.cache), a.memoizedState.cache !== l && (a.flags |= 2048), Yn(lt), We(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (Ki(a) ? Wn(a) : e === null || e.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Pp())), Ke(a), null;
      case 26:
        return s = a.memoizedState, e === null ? (Wn(a), s !== null ? (Ke(a), lg(a, s)) : (Ke(a), a.flags &= -16777217)) : s ? s !== e.memoizedState ? (Wn(a), Ke(a), lg(a, s)) : (Ke(a), a.flags &= -16777217) : (e.memoizedProps !== l && Wn(a), Ke(a), a.flags &= -16777217), null;
      case 27:
        Tt(a), s = ie.current;
        var f = a.type;
        if (e !== null && a.stateNode != null)
          e.memoizedProps !== l && Wn(a);
        else {
          if (!l) {
            if (a.stateNode === null)
              throw Error(i(166));
            return Ke(a), null;
          }
          e = te.current, Ki(a) ? Up(a) : (e = l1(f, l, s), a.stateNode = e, Wn(a));
        }
        return Ke(a), null;
      case 5:
        if (Tt(a), s = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== l && Wn(a);
        else {
          if (!l) {
            if (a.stateNode === null)
              throw Error(i(166));
            return Ke(a), null;
          }
          if (e = te.current, Ki(a))
            Up(a);
          else {
            switch (f = gl(
              ie.current
            ), e) {
              case 1:
                e = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                e = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    e = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    e = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                    break;
                  case "select":
                    e = typeof l.is == "string" ? f.createElement("select", { is: l.is }) : f.createElement("select"), l.multiple ? e.multiple = !0 : l.size && (e.size = l.size);
                    break;
                  default:
                    e = typeof l.is == "string" ? f.createElement(s, { is: l.is }) : f.createElement(s);
                }
            }
            e[Mt] = a, e[Ot] = l;
            e: for (f = a.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                e.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === a) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === a)
                  break e;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            a.stateNode = e;
            e: switch (xt(e, s, l), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!l.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Wn(a);
          }
        }
        return Ke(a), a.flags &= -16777217, null;
      case 6:
        if (e && a.stateNode != null)
          e.memoizedProps !== l && Wn(a);
        else {
          if (typeof l != "string" && a.stateNode === null)
            throw Error(i(166));
          if (e = ie.current, Ki(a)) {
            if (e = a.stateNode, s = a.memoizedProps, l = null, f = Rt, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  l = f.memoizedProps;
              }
            e[Mt] = a, e = !!(e.nodeValue === s || l !== null && l.suppressHydrationWarning === !0 || t1(e.nodeValue, s)), e || $a(a);
          } else
            e = gl(e).createTextNode(
              l
            ), e[Mt] = a, a.stateNode = e;
        }
        return Ke(a), null;
      case 13:
        if (l = a.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = Ki(a), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(i(318));
              if (f = a.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(i(317));
              f[Mt] = a;
            } else
              Qi(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            Ke(a), f = !1;
          } else
            f = Pp(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return a.flags & 256 ? (In(a), a) : (In(a), null);
        }
        if (In(a), (a.flags & 128) !== 0)
          return a.lanes = s, a;
        if (s = l !== null, e = e !== null && e.memoizedState !== null, s) {
          l = a.child, f = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (f = l.alternate.memoizedState.cachePool.pool);
          var m = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (m = l.memoizedState.cachePool.pool), m !== f && (l.flags |= 2048);
        }
        return s !== e && s && (a.child.flags |= 8192), al(a, a.updateQueue), Ke(a), null;
      case 4:
        return We(), e === null && Ef(a.stateNode.containerInfo), Ke(a), null;
      case 10:
        return Yn(a.type), Ke(a), null;
      case 19:
        if (G(ut), f = a.memoizedState, f === null) return Ke(a), null;
        if (l = (a.flags & 128) !== 0, m = f.rendering, m === null)
          if (l) ds(f, !1);
          else {
            if ($e !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = a.child; e !== null; ) {
                if (m = $o(e), m !== null) {
                  for (a.flags |= 128, ds(f, !1), e = m.updateQueue, a.updateQueue = e, al(a, e), a.subtreeFlags = 0, e = s, s = a.child; s !== null; )
                    Bp(s, e), s = s.sibling;
                  return J(
                    ut,
                    ut.current & 1 | 2
                  ), a.child;
                }
                e = e.sibling;
              }
            f.tail !== null && Ce() > sl && (a.flags |= 128, l = !0, ds(f, !1), a.lanes = 4194304);
          }
        else {
          if (!l)
            if (e = $o(m), e !== null) {
              if (a.flags |= 128, l = !0, e = e.updateQueue, a.updateQueue = e, al(a, e), ds(f, !0), f.tail === null && f.tailMode === "hidden" && !m.alternate && !Le)
                return Ke(a), null;
            } else
              2 * Ce() - f.renderingStartTime > sl && s !== 536870912 && (a.flags |= 128, l = !0, ds(f, !1), a.lanes = 4194304);
          f.isBackwards ? (m.sibling = a.child, a.child = m) : (e = f.last, e !== null ? e.sibling = m : a.child = m, f.last = m);
        }
        return f.tail !== null ? (a = f.tail, f.rendering = a, f.tail = a.sibling, f.renderingStartTime = Ce(), a.sibling = null, e = ut.current, J(ut, l ? e & 1 | 2 : e & 1), a) : (Ke(a), null);
      case 22:
      case 23:
        return In(a), Cc(), l = a.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (a.flags |= 8192) : l && (a.flags |= 8192), l ? (s & 536870912) !== 0 && (a.flags & 128) === 0 && (Ke(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : Ke(a), s = a.updateQueue, s !== null && al(a, s.retryQueue), s = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (s = e.memoizedState.cachePool.pool), l = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), l !== s && (a.flags |= 2048), e !== null && G(tr), null;
      case 24:
        return s = null, e !== null && (s = e.memoizedState.cache), a.memoizedState.cache !== s && (a.flags |= 2048), Yn(lt), Ke(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, a.tag));
  }
  function Y3(e, a) {
    switch (hc(a), a.tag) {
      case 1:
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 3:
        return Yn(lt), We(), e = a.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (a.flags = e & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return Tt(a), null;
      case 13:
        if (In(a), e = a.memoizedState, e !== null && e.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(i(340));
          Qi();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 19:
        return G(ut), null;
      case 4:
        return We(), null;
      case 10:
        return Yn(a.type), null;
      case 22:
      case 23:
        return In(a), Cc(), e !== null && G(tr), e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 24:
        return Yn(lt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ug(e, a) {
    switch (hc(a), a.tag) {
      case 3:
        Yn(lt), We();
        break;
      case 26:
      case 27:
      case 5:
        Tt(a);
        break;
      case 4:
        We();
        break;
      case 13:
        In(a);
        break;
      case 19:
        G(ut);
        break;
      case 10:
        Yn(a.type);
        break;
      case 22:
      case 23:
        In(a), Cc(), e !== null && G(tr);
        break;
      case 24:
        Yn(lt);
    }
  }
  function hs(e, a) {
    try {
      var s = a.updateQueue, l = s !== null ? s.lastEffect : null;
      if (l !== null) {
        var f = l.next;
        s = f;
        do {
          if ((s.tag & e) === e) {
            l = void 0;
            var m = s.create, b = s.inst;
            l = m(), b.destroy = l;
          }
          s = s.next;
        } while (s !== f);
      }
    } catch (A) {
      Pe(a, a.return, A);
    }
  }
  function ga(e, a, s) {
    try {
      var l = a.updateQueue, f = l !== null ? l.lastEffect : null;
      if (f !== null) {
        var m = f.next;
        l = m;
        do {
          if ((l.tag & e) === e) {
            var b = l.inst, A = b.destroy;
            if (A !== void 0) {
              b.destroy = void 0, f = a;
              var R = s, H = A;
              try {
                H();
              } catch (K) {
                Pe(
                  f,
                  R,
                  K
                );
              }
            }
          }
          l = l.next;
        } while (l !== m);
      }
    } catch (K) {
      Pe(a, a.return, K);
    }
  }
  function cg(e) {
    var a = e.updateQueue;
    if (a !== null) {
      var s = e.stateNode;
      try {
        Fp(a, s);
      } catch (l) {
        Pe(e, e.return, l);
      }
    }
  }
  function fg(e, a, s) {
    s.props = ar(
      e.type,
      e.memoizedProps
    ), s.state = e.memoizedState;
    try {
      s.componentWillUnmount();
    } catch (l) {
      Pe(e, a, l);
    }
  }
  function ps(e, a) {
    try {
      var s = e.ref;
      if (s !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof s == "function" ? e.refCleanup = s(l) : s.current = l;
      }
    } catch (f) {
      Pe(e, a, f);
    }
  }
  function _n(e, a) {
    var s = e.ref, l = e.refCleanup;
    if (s !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (f) {
          Pe(e, a, f);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof s == "function")
        try {
          s(null);
        } catch (f) {
          Pe(e, a, f);
        }
      else s.current = null;
  }
  function dg(e) {
    var a = e.type, s = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          s.autoFocus && l.focus();
          break e;
        case "img":
          s.src ? l.src = s.src : s.srcSet && (l.srcset = s.srcSet);
      }
    } catch (f) {
      Pe(e, e.return, f);
    }
  }
  function tf(e, a, s) {
    try {
      var l = e.stateNode;
      fS(l, e.type, s, a), l[Ot] = a;
    } catch (f) {
      Pe(e, e.return, f);
    }
  }
  function hg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ta(e.type) || e.tag === 4;
  }
  function nf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || hg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ta(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function af(e, a, s) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, a ? (s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s).insertBefore(e, a) : (a = s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s, a.appendChild(e), s = s._reactRootContainer, s != null || a.onclick !== null || (a.onclick = ml));
    else if (l !== 4 && (l === 27 && Ta(e.type) && (s = e.stateNode, a = null), e = e.child, e !== null))
      for (af(e, a, s), e = e.sibling; e !== null; )
        af(e, a, s), e = e.sibling;
  }
  function rl(e, a, s) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, a ? s.insertBefore(e, a) : s.appendChild(e);
    else if (l !== 4 && (l === 27 && Ta(e.type) && (s = e.stateNode), e = e.child, e !== null))
      for (rl(e, a, s), e = e.sibling; e !== null; )
        rl(e, a, s), e = e.sibling;
  }
  function pg(e) {
    var a = e.stateNode, s = e.memoizedProps;
    try {
      for (var l = e.type, f = a.attributes; f.length; )
        a.removeAttributeNode(f[0]);
      xt(a, l, s), a[Mt] = e, a[Ot] = s;
    } catch (m) {
      Pe(e, e.return, m);
    }
  }
  var Kn = !1, tt = !1, rf = !1, mg = typeof WeakSet == "function" ? WeakSet : Set, mt = null;
  function X3(e, a) {
    if (e = e.containerInfo, Rf = Sl, e = Ep(e), nc(e)) {
      if ("selectionStart" in e)
        var s = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          s = (s = e.ownerDocument) && s.defaultView || window;
          var l = s.getSelection && s.getSelection();
          if (l && l.rangeCount !== 0) {
            s = l.anchorNode;
            var f = l.anchorOffset, m = l.focusNode;
            l = l.focusOffset;
            try {
              s.nodeType, m.nodeType;
            } catch {
              s = null;
              break e;
            }
            var b = 0, A = -1, R = -1, H = 0, K = 0, $ = e, Y = null;
            t: for (; ; ) {
              for (var I; $ !== s || f !== 0 && $.nodeType !== 3 || (A = b + f), $ !== m || l !== 0 && $.nodeType !== 3 || (R = b + l), $.nodeType === 3 && (b += $.nodeValue.length), (I = $.firstChild) !== null; )
                Y = $, $ = I;
              for (; ; ) {
                if ($ === e) break t;
                if (Y === s && ++H === f && (A = b), Y === m && ++K === l && (R = b), (I = $.nextSibling) !== null) break;
                $ = Y, Y = $.parentNode;
              }
              $ = I;
            }
            s = A === -1 || R === -1 ? null : { start: A, end: R };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (kf = { focusedElem: e, selectionRange: s }, Sl = !1, mt = a; mt !== null; )
      if (a = mt, e = a.child, (a.subtreeFlags & 1024) !== 0 && e !== null)
        e.return = a, mt = e;
      else
        for (; mt !== null; ) {
          switch (a = mt, m = a.alternate, e = a.flags, a.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && m !== null) {
                e = void 0, s = a, f = m.memoizedProps, m = m.memoizedState, l = s.stateNode;
                try {
                  var be = ar(
                    s.type,
                    f,
                    s.elementType === s.type
                  );
                  e = l.getSnapshotBeforeUpdate(
                    be,
                    m
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ye) {
                  Pe(
                    s,
                    s.return,
                    ye
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = a.stateNode.containerInfo, s = e.nodeType, s === 9)
                  Of(e);
                else if (s === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Of(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(i(163));
          }
          if (e = a.sibling, e !== null) {
            e.return = a.return, mt = e;
            break;
          }
          mt = a.return;
        }
  }
  function gg(e, a, s) {
    var l = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        ya(e, s), l & 4 && hs(5, s);
        break;
      case 1:
        if (ya(e, s), l & 4)
          if (e = s.stateNode, a === null)
            try {
              e.componentDidMount();
            } catch (b) {
              Pe(s, s.return, b);
            }
          else {
            var f = ar(
              s.type,
              a.memoizedProps
            );
            a = a.memoizedState;
            try {
              e.componentDidUpdate(
                f,
                a,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (b) {
              Pe(
                s,
                s.return,
                b
              );
            }
          }
        l & 64 && cg(s), l & 512 && ps(s, s.return);
        break;
      case 3:
        if (ya(e, s), l & 64 && (e = s.updateQueue, e !== null)) {
          if (a = null, s.child !== null)
            switch (s.child.tag) {
              case 27:
              case 5:
                a = s.child.stateNode;
                break;
              case 1:
                a = s.child.stateNode;
            }
          try {
            Fp(e, a);
          } catch (b) {
            Pe(s, s.return, b);
          }
        }
        break;
      case 27:
        a === null && l & 4 && pg(s);
      case 26:
      case 5:
        ya(e, s), a === null && l & 4 && dg(s), l & 512 && ps(s, s.return);
        break;
      case 12:
        ya(e, s);
        break;
      case 13:
        ya(e, s), l & 4 && bg(e, s), l & 64 && (e = s.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = eS.bind(
          null,
          s
        ), vS(e, s))));
        break;
      case 22:
        if (l = s.memoizedState !== null || Kn, !l) {
          a = a !== null && a.memoizedState !== null || tt, f = Kn;
          var m = tt;
          Kn = l, (tt = a) && !m ? va(
            e,
            s,
            (s.subtreeFlags & 8772) !== 0
          ) : ya(e, s), Kn = f, tt = m;
        }
        break;
      case 30:
        break;
      default:
        ya(e, s);
    }
  }
  function yg(e) {
    var a = e.alternate;
    a !== null && (e.alternate = null, yg(a)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (a = e.stateNode, a !== null && Vu(a)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ye = null, Bt = !1;
  function Qn(e, a, s) {
    for (s = s.child; s !== null; )
      vg(e, a, s), s = s.sibling;
  }
  function vg(e, a, s) {
    if (Ht && typeof Ht.onCommitFiberUnmount == "function")
      try {
        Ht.onCommitFiberUnmount(qa, s);
      } catch {
      }
    switch (s.tag) {
      case 26:
        tt || _n(s, a), Qn(
          e,
          a,
          s
        ), s.memoizedState ? s.memoizedState.count-- : s.stateNode && (s = s.stateNode, s.parentNode.removeChild(s));
        break;
      case 27:
        tt || _n(s, a);
        var l = Ye, f = Bt;
        Ta(s.type) && (Ye = s.stateNode, Bt = !1), Qn(
          e,
          a,
          s
        ), As(s.stateNode), Ye = l, Bt = f;
        break;
      case 5:
        tt || _n(s, a);
      case 6:
        if (l = Ye, f = Bt, Ye = null, Qn(
          e,
          a,
          s
        ), Ye = l, Bt = f, Ye !== null)
          if (Bt)
            try {
              (Ye.nodeType === 9 ? Ye.body : Ye.nodeName === "HTML" ? Ye.ownerDocument.body : Ye).removeChild(s.stateNode);
            } catch (m) {
              Pe(
                s,
                a,
                m
              );
            }
          else
            try {
              Ye.removeChild(s.stateNode);
            } catch (m) {
              Pe(
                s,
                a,
                m
              );
            }
        break;
      case 18:
        Ye !== null && (Bt ? (e = Ye, s1(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          s.stateNode
        ), Ns(e)) : s1(Ye, s.stateNode));
        break;
      case 4:
        l = Ye, f = Bt, Ye = s.stateNode.containerInfo, Bt = !0, Qn(
          e,
          a,
          s
        ), Ye = l, Bt = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tt || ga(2, s, a), tt || ga(4, s, a), Qn(
          e,
          a,
          s
        );
        break;
      case 1:
        tt || (_n(s, a), l = s.stateNode, typeof l.componentWillUnmount == "function" && fg(
          s,
          a,
          l
        )), Qn(
          e,
          a,
          s
        );
        break;
      case 21:
        Qn(
          e,
          a,
          s
        );
        break;
      case 22:
        tt = (l = tt) || s.memoizedState !== null, Qn(
          e,
          a,
          s
        ), tt = l;
        break;
      default:
        Qn(
          e,
          a,
          s
        );
    }
  }
  function bg(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ns(e);
      } catch (s) {
        Pe(a, a.return, s);
      }
  }
  function I3(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var a = e.stateNode;
        return a === null && (a = e.stateNode = new mg()), a;
      case 22:
        return e = e.stateNode, a = e._retryCache, a === null && (a = e._retryCache = new mg()), a;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function sf(e, a) {
    var s = I3(e);
    a.forEach(function(l) {
      var f = tS.bind(null, e, l);
      s.has(l) || (s.add(l), l.then(f, f));
    });
  }
  function Xt(e, a) {
    var s = a.deletions;
    if (s !== null)
      for (var l = 0; l < s.length; l++) {
        var f = s[l], m = e, b = a, A = b;
        e: for (; A !== null; ) {
          switch (A.tag) {
            case 27:
              if (Ta(A.type)) {
                Ye = A.stateNode, Bt = !1;
                break e;
              }
              break;
            case 5:
              Ye = A.stateNode, Bt = !1;
              break e;
            case 3:
            case 4:
              Ye = A.stateNode.containerInfo, Bt = !0;
              break e;
          }
          A = A.return;
        }
        if (Ye === null) throw Error(i(160));
        vg(m, b, f), Ye = null, Bt = !1, m = f.alternate, m !== null && (m.return = null), f.return = null;
      }
    if (a.subtreeFlags & 13878)
      for (a = a.child; a !== null; )
        wg(a, e), a = a.sibling;
  }
  var yn = null;
  function wg(e, a) {
    var s = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Xt(a, e), It(e), l & 4 && (ga(3, e, e.return), hs(3, e), ga(5, e, e.return));
        break;
      case 1:
        Xt(a, e), It(e), l & 512 && (tt || s === null || _n(s, s.return)), l & 64 && Kn && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (s = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = s === null ? l : s.concat(l))));
        break;
      case 26:
        var f = yn;
        if (Xt(a, e), It(e), l & 512 && (tt || s === null || _n(s, s.return)), l & 4) {
          var m = s !== null ? s.memoizedState : null;
          if (l = e.memoizedState, s === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, s = e.memoizedProps, f = f.ownerDocument || f;
                  t: switch (l) {
                    case "title":
                      m = f.getElementsByTagName("title")[0], (!m || m[Ui] || m[Mt] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = f.createElement(l), f.head.insertBefore(
                        m,
                        f.querySelector("head > title")
                      )), xt(m, l, s), m[Mt] = e, ht(m), l = m;
                      break e;
                    case "link":
                      var b = p1(
                        "link",
                        "href",
                        f
                      ).get(l + (s.href || ""));
                      if (b) {
                        for (var A = 0; A < b.length; A++)
                          if (m = b[A], m.getAttribute("href") === (s.href == null || s.href === "" ? null : s.href) && m.getAttribute("rel") === (s.rel == null ? null : s.rel) && m.getAttribute("title") === (s.title == null ? null : s.title) && m.getAttribute("crossorigin") === (s.crossOrigin == null ? null : s.crossOrigin)) {
                            b.splice(A, 1);
                            break t;
                          }
                      }
                      m = f.createElement(l), xt(m, l, s), f.head.appendChild(m);
                      break;
                    case "meta":
                      if (b = p1(
                        "meta",
                        "content",
                        f
                      ).get(l + (s.content || ""))) {
                        for (A = 0; A < b.length; A++)
                          if (m = b[A], m.getAttribute("content") === (s.content == null ? null : "" + s.content) && m.getAttribute("name") === (s.name == null ? null : s.name) && m.getAttribute("property") === (s.property == null ? null : s.property) && m.getAttribute("http-equiv") === (s.httpEquiv == null ? null : s.httpEquiv) && m.getAttribute("charset") === (s.charSet == null ? null : s.charSet)) {
                            b.splice(A, 1);
                            break t;
                          }
                      }
                      m = f.createElement(l), xt(m, l, s), f.head.appendChild(m);
                      break;
                    default:
                      throw Error(i(468, l));
                  }
                  m[Mt] = e, ht(m), l = m;
                }
                e.stateNode = l;
              } else
                m1(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = h1(
                f,
                l,
                e.memoizedProps
              );
          else
            m !== l ? (m === null ? s.stateNode !== null && (s = s.stateNode, s.parentNode.removeChild(s)) : m.count--, l === null ? m1(
              f,
              e.type,
              e.stateNode
            ) : h1(
              f,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && tf(
              e,
              e.memoizedProps,
              s.memoizedProps
            );
        }
        break;
      case 27:
        Xt(a, e), It(e), l & 512 && (tt || s === null || _n(s, s.return)), s !== null && l & 4 && tf(
          e,
          e.memoizedProps,
          s.memoizedProps
        );
        break;
      case 5:
        if (Xt(a, e), It(e), l & 512 && (tt || s === null || _n(s, s.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Nr(f, "");
          } catch (I) {
            Pe(e, e.return, I);
          }
        }
        l & 4 && e.stateNode != null && (f = e.memoizedProps, tf(
          e,
          f,
          s !== null ? s.memoizedProps : f
        )), l & 1024 && (rf = !0);
        break;
      case 6:
        if (Xt(a, e), It(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, s = e.stateNode;
          try {
            s.nodeValue = l;
          } catch (I) {
            Pe(e, e.return, I);
          }
        }
        break;
      case 3:
        if (bl = null, f = yn, yn = yl(a.containerInfo), Xt(a, e), yn = f, It(e), l & 4 && s !== null && s.memoizedState.isDehydrated)
          try {
            Ns(a.containerInfo);
          } catch (I) {
            Pe(e, e.return, I);
          }
        rf && (rf = !1, xg(e));
        break;
      case 4:
        l = yn, yn = yl(
          e.stateNode.containerInfo
        ), Xt(a, e), It(e), yn = l;
        break;
      case 12:
        Xt(a, e), It(e);
        break;
      case 13:
        Xt(a, e), It(e), e.child.flags & 8192 && e.memoizedState !== null != (s !== null && s.memoizedState !== null) && (df = Ce()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, sf(e, l)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var R = s !== null && s.memoizedState !== null, H = Kn, K = tt;
        if (Kn = H || f, tt = K || R, Xt(a, e), tt = K, Kn = H, It(e), l & 8192)
          e: for (a = e.stateNode, a._visibility = f ? a._visibility & -2 : a._visibility | 1, f && (s === null || R || Kn || tt || rr(e)), s = null, a = e; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (s === null) {
                R = s = a;
                try {
                  if (m = R.stateNode, f)
                    b = m.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    A = R.stateNode;
                    var $ = R.memoizedProps.style, Y = $ != null && $.hasOwnProperty("display") ? $.display : null;
                    A.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (I) {
                  Pe(R, R.return, I);
                }
              }
            } else if (a.tag === 6) {
              if (s === null) {
                R = a;
                try {
                  R.stateNode.nodeValue = f ? "" : R.memoizedProps;
                } catch (I) {
                  Pe(R, R.return, I);
                }
              }
            } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === e) && a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === e) break e;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === e) break e;
              s === a && (s = null), a = a.return;
            }
            s === a && (s = null), a.sibling.return = a.return, a = a.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (s = l.retryQueue, s !== null && (l.retryQueue = null, sf(e, s))));
        break;
      case 19:
        Xt(a, e), It(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, sf(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Xt(a, e), It(e);
    }
  }
  function It(e) {
    var a = e.flags;
    if (a & 2) {
      try {
        for (var s, l = e.return; l !== null; ) {
          if (hg(l)) {
            s = l;
            break;
          }
          l = l.return;
        }
        if (s == null) throw Error(i(160));
        switch (s.tag) {
          case 27:
            var f = s.stateNode, m = nf(e);
            rl(e, m, f);
            break;
          case 5:
            var b = s.stateNode;
            s.flags & 32 && (Nr(b, ""), s.flags &= -33);
            var A = nf(e);
            rl(e, A, b);
            break;
          case 3:
          case 4:
            var R = s.stateNode.containerInfo, H = nf(e);
            af(
              e,
              H,
              R
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (K) {
        Pe(e, e.return, K);
      }
      e.flags &= -3;
    }
    a & 4096 && (e.flags &= -4097);
  }
  function xg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var a = e;
        xg(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), e = e.sibling;
      }
  }
  function ya(e, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        gg(e, a.alternate, a), a = a.sibling;
  }
  function rr(e) {
    for (e = e.child; e !== null; ) {
      var a = e;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ga(4, a, a.return), rr(a);
          break;
        case 1:
          _n(a, a.return);
          var s = a.stateNode;
          typeof s.componentWillUnmount == "function" && fg(
            a,
            a.return,
            s
          ), rr(a);
          break;
        case 27:
          As(a.stateNode);
        case 26:
        case 5:
          _n(a, a.return), rr(a);
          break;
        case 22:
          a.memoizedState === null && rr(a);
          break;
        case 30:
          rr(a);
          break;
        default:
          rr(a);
      }
      e = e.sibling;
    }
  }
  function va(e, a, s) {
    for (s = s && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var l = a.alternate, f = e, m = a, b = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          va(
            f,
            m,
            s
          ), hs(4, m);
          break;
        case 1:
          if (va(
            f,
            m,
            s
          ), l = m, f = l.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (H) {
              Pe(l, l.return, H);
            }
          if (l = m, f = l.updateQueue, f !== null) {
            var A = l.stateNode;
            try {
              var R = f.shared.hiddenCallbacks;
              if (R !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < R.length; f++)
                  Qp(R[f], A);
            } catch (H) {
              Pe(l, l.return, H);
            }
          }
          s && b & 64 && cg(m), ps(m, m.return);
          break;
        case 27:
          pg(m);
        case 26:
        case 5:
          va(
            f,
            m,
            s
          ), s && l === null && b & 4 && dg(m), ps(m, m.return);
          break;
        case 12:
          va(
            f,
            m,
            s
          );
          break;
        case 13:
          va(
            f,
            m,
            s
          ), s && b & 4 && bg(f, m);
          break;
        case 22:
          m.memoizedState === null && va(
            f,
            m,
            s
          ), ps(m, m.return);
          break;
        case 30:
          break;
        default:
          va(
            f,
            m,
            s
          );
      }
      a = a.sibling;
    }
  }
  function of(e, a) {
    var s = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (s = e.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== s && (e != null && e.refCount++, s != null && Ji(s));
  }
  function lf(e, a) {
    e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && Ji(e));
  }
  function Rn(e, a, s, l) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        Sg(
          e,
          a,
          s,
          l
        ), a = a.sibling;
  }
  function Sg(e, a, s, l) {
    var f = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Rn(
          e,
          a,
          s,
          l
        ), f & 2048 && hs(9, a);
        break;
      case 1:
        Rn(
          e,
          a,
          s,
          l
        );
        break;
      case 3:
        Rn(
          e,
          a,
          s,
          l
        ), f & 2048 && (e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && Ji(e)));
        break;
      case 12:
        if (f & 2048) {
          Rn(
            e,
            a,
            s,
            l
          ), e = a.stateNode;
          try {
            var m = a.memoizedProps, b = m.id, A = m.onPostCommit;
            typeof A == "function" && A(
              b,
              a.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (R) {
            Pe(a, a.return, R);
          }
        } else
          Rn(
            e,
            a,
            s,
            l
          );
        break;
      case 13:
        Rn(
          e,
          a,
          s,
          l
        );
        break;
      case 23:
        break;
      case 22:
        m = a.stateNode, b = a.alternate, a.memoizedState !== null ? m._visibility & 2 ? Rn(
          e,
          a,
          s,
          l
        ) : ms(e, a) : m._visibility & 2 ? Rn(
          e,
          a,
          s,
          l
        ) : (m._visibility |= 2, Qr(
          e,
          a,
          s,
          l,
          (a.subtreeFlags & 10256) !== 0
        )), f & 2048 && of(b, a);
        break;
      case 24:
        Rn(
          e,
          a,
          s,
          l
        ), f & 2048 && lf(a.alternate, a);
        break;
      default:
        Rn(
          e,
          a,
          s,
          l
        );
    }
  }
  function Qr(e, a, s, l, f) {
    for (f = f && (a.subtreeFlags & 10256) !== 0, a = a.child; a !== null; ) {
      var m = e, b = a, A = s, R = l, H = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Qr(
            m,
            b,
            A,
            R,
            f
          ), hs(8, b);
          break;
        case 23:
          break;
        case 22:
          var K = b.stateNode;
          b.memoizedState !== null ? K._visibility & 2 ? Qr(
            m,
            b,
            A,
            R,
            f
          ) : ms(
            m,
            b
          ) : (K._visibility |= 2, Qr(
            m,
            b,
            A,
            R,
            f
          )), f && H & 2048 && of(
            b.alternate,
            b
          );
          break;
        case 24:
          Qr(
            m,
            b,
            A,
            R,
            f
          ), f && H & 2048 && lf(b.alternate, b);
          break;
        default:
          Qr(
            m,
            b,
            A,
            R,
            f
          );
      }
      a = a.sibling;
    }
  }
  function ms(e, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var s = e, l = a, f = l.flags;
        switch (l.tag) {
          case 22:
            ms(s, l), f & 2048 && of(
              l.alternate,
              l
            );
            break;
          case 24:
            ms(s, l), f & 2048 && lf(l.alternate, l);
            break;
          default:
            ms(s, l);
        }
        a = a.sibling;
      }
  }
  var gs = 8192;
  function Fr(e) {
    if (e.subtreeFlags & gs)
      for (e = e.child; e !== null; )
        Ag(e), e = e.sibling;
  }
  function Ag(e) {
    switch (e.tag) {
      case 26:
        Fr(e), e.flags & gs && e.memoizedState !== null && NS(
          yn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Fr(e);
        break;
      case 3:
      case 4:
        var a = yn;
        yn = yl(e.stateNode.containerInfo), Fr(e), yn = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = gs, gs = 16777216, Fr(e), gs = a) : Fr(e));
        break;
      default:
        Fr(e);
    }
  }
  function Tg(e) {
    var a = e.alternate;
    if (a !== null && (e = a.child, e !== null)) {
      a.child = null;
      do
        a = e.sibling, e.sibling = null, e = a;
      while (e !== null);
    }
  }
  function ys(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var s = 0; s < a.length; s++) {
          var l = a[s];
          mt = l, Eg(
            l,
            e
          );
        }
      Tg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Mg(e), e = e.sibling;
  }
  function Mg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ys(e), e.flags & 2048 && ga(9, e, e.return);
        break;
      case 3:
        ys(e);
        break;
      case 12:
        ys(e);
        break;
      case 22:
        var a = e.stateNode;
        e.memoizedState !== null && a._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (a._visibility &= -3, il(e)) : ys(e);
        break;
      default:
        ys(e);
    }
  }
  function il(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var s = 0; s < a.length; s++) {
          var l = a[s];
          mt = l, Eg(
            l,
            e
          );
        }
      Tg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (a = e, a.tag) {
        case 0:
        case 11:
        case 15:
          ga(8, a, a.return), il(a);
          break;
        case 22:
          s = a.stateNode, s._visibility & 2 && (s._visibility &= -3, il(a));
          break;
        default:
          il(a);
      }
      e = e.sibling;
    }
  }
  function Eg(e, a) {
    for (; mt !== null; ) {
      var s = mt;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          ga(8, s, a);
          break;
        case 23:
        case 22:
          if (s.memoizedState !== null && s.memoizedState.cachePool !== null) {
            var l = s.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Ji(s.memoizedState.cache);
      }
      if (l = s.child, l !== null) l.return = s, mt = l;
      else
        e: for (s = e; mt !== null; ) {
          l = mt;
          var f = l.sibling, m = l.return;
          if (yg(l), l === s) {
            mt = null;
            break e;
          }
          if (f !== null) {
            f.return = m, mt = f;
            break e;
          }
          mt = m;
        }
    }
  }
  var Z3 = {
    getCacheForType: function(e) {
      var a = Et(lt), s = a.data.get(e);
      return s === void 0 && (s = e(), a.data.set(e, s)), s;
    }
  }, W3 = typeof WeakMap == "function" ? WeakMap : Map, ze = 0, He = null, _e = null, Ne = 0, Be = 0, Zt = null, ba = !1, $r = !1, uf = !1, Fn = 0, $e = 0, wa = 0, ir = 0, cf = 0, ln = 0, Jr = 0, vs = null, Vt = null, ff = !1, df = 0, sl = 1 / 0, ol = null, xa = null, wt = 0, Sa = null, ei = null, ti = 0, hf = 0, pf = null, Cg = null, bs = 0, mf = null;
  function Wt() {
    if ((ze & 2) !== 0 && Ne !== 0)
      return Ne & -Ne;
    if (k.T !== null) {
      var e = qr;
      return e !== 0 ? e : Sf();
    }
    return G0();
  }
  function _g() {
    ln === 0 && (ln = (Ne & 536870912) === 0 || Le ? j0() : 536870912);
    var e = on.current;
    return e !== null && (e.flags |= 32), ln;
  }
  function Kt(e, a, s) {
    (e === He && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null) && (ni(e, 0), Aa(
      e,
      Ne,
      ln,
      !1
    )), Vi(e, s), ((ze & 2) === 0 || e !== He) && (e === He && ((ze & 2) === 0 && (ir |= s), $e === 4 && Aa(
      e,
      Ne,
      ln,
      !1
    )), kn(e));
  }
  function Rg(e, a, s) {
    if ((ze & 6) !== 0) throw Error(i(327));
    var l = !s && (a & 124) === 0 && (a & e.expiredLanes) === 0 || Bi(e, a), f = l ? F3(e, a) : vf(e, a, !0), m = l;
    do {
      if (f === 0) {
        $r && !l && Aa(e, a, 0, !1);
        break;
      } else {
        if (s = e.current.alternate, m && !K3(s)) {
          f = vf(e, a, !1), m = !1;
          continue;
        }
        if (f === 2) {
          if (m = a, e.errorRecoveryDisabledLanes & m)
            var b = 0;
          else
            b = e.pendingLanes & -536870913, b = b !== 0 ? b : b & 536870912 ? 536870912 : 0;
          if (b !== 0) {
            a = b;
            e: {
              var A = e;
              f = vs;
              var R = A.current.memoizedState.isDehydrated;
              if (R && (ni(A, b).flags |= 256), b = vf(
                A,
                b,
                !1
              ), b !== 2) {
                if (uf && !R) {
                  A.errorRecoveryDisabledLanes |= m, ir |= m, f = 4;
                  break e;
                }
                m = Vt, Vt = f, m !== null && (Vt === null ? Vt = m : Vt.push.apply(
                  Vt,
                  m
                ));
              }
              f = b;
            }
            if (m = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          ni(e, 0), Aa(e, a, 0, !0);
          break;
        }
        e: {
          switch (l = e, m = f, m) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              Aa(
                l,
                a,
                ln,
                !ba
              );
              break e;
            case 2:
              Vt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((a & 62914560) === a && (f = df + 300 - Ce(), 10 < f)) {
            if (Aa(
              l,
              a,
              ln,
              !ba
            ), vo(l, 0, !0) !== 0) break e;
            l.timeoutHandle = r1(
              kg.bind(
                null,
                l,
                s,
                Vt,
                ol,
                ff,
                a,
                ln,
                ir,
                Jr,
                ba,
                m,
                2,
                -0,
                0
              ),
              f
            );
            break e;
          }
          kg(
            l,
            s,
            Vt,
            ol,
            ff,
            a,
            ln,
            ir,
            Jr,
            ba,
            m,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    kn(e);
  }
  function kg(e, a, s, l, f, m, b, A, R, H, K, $, Y, I) {
    if (e.timeoutHandle = -1, $ = a.subtreeFlags, ($ & 8192 || ($ & 16785408) === 16785408) && (Es = { stylesheets: null, count: 0, unsuspend: kS }, Ag(a), $ = DS(), $ !== null)) {
      e.cancelPendingCommit = $(
        Vg.bind(
          null,
          e,
          a,
          m,
          s,
          l,
          f,
          b,
          A,
          R,
          K,
          1,
          Y,
          I
        )
      ), Aa(e, m, b, !H);
      return;
    }
    Vg(
      e,
      a,
      m,
      s,
      l,
      f,
      b,
      A,
      R
    );
  }
  function K3(e) {
    for (var a = e; ; ) {
      var s = a.tag;
      if ((s === 0 || s === 11 || s === 15) && a.flags & 16384 && (s = a.updateQueue, s !== null && (s = s.stores, s !== null)))
        for (var l = 0; l < s.length; l++) {
          var f = s[l], m = f.getSnapshot;
          f = f.value;
          try {
            if (!Gt(m(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (s = a.child, a.subtreeFlags & 16384 && s !== null)
        s.return = a, a = s;
      else {
        if (a === e) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e) return !0;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    }
    return !0;
  }
  function Aa(e, a, s, l) {
    a &= ~cf, a &= ~ir, e.suspendedLanes |= a, e.pingedLanes &= ~a, l && (e.warmLanes |= a), l = e.expirationTimes;
    for (var f = a; 0 < f; ) {
      var m = 31 - qt(f), b = 1 << m;
      l[m] = -1, f &= ~b;
    }
    s !== 0 && H0(e, s, a);
  }
  function ll() {
    return (ze & 6) === 0 ? (ws(0), !1) : !0;
  }
  function gf() {
    if (_e !== null) {
      if (Be === 0)
        var e = _e.return;
      else
        e = _e, Gn = Ja = null, Dc(e), Wr = null, cs = 0, e = _e;
      for (; e !== null; )
        ug(e.alternate, e), e = e.return;
      _e = null;
    }
  }
  function ni(e, a) {
    var s = e.timeoutHandle;
    s !== -1 && (e.timeoutHandle = -1, hS(s)), s = e.cancelPendingCommit, s !== null && (e.cancelPendingCommit = null, s()), gf(), He = e, _e = s = Pn(e.current, null), Ne = a, Be = 0, Zt = null, ba = !1, $r = Bi(e, a), uf = !1, Jr = ln = cf = ir = wa = $e = 0, Vt = vs = null, ff = !1, (a & 8) !== 0 && (a |= a & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= a; 0 < l; ) {
        var f = 31 - qt(l), m = 1 << f;
        a |= e[f], l &= ~m;
      }
    return Fn = a, ko(), s;
  }
  function Ng(e, a) {
    Ae = null, k.H = Ko, a === ts || a === jo ? (a = Wp(), Be = 3) : a === Xp ? (a = Wp(), Be = 4) : Be = a === Km ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, Zt = a, _e === null && ($e = 1, el(
      e,
      nn(a, e.current)
    ));
  }
  function Dg() {
    var e = k.H;
    return k.H = Ko, e === null ? Ko : e;
  }
  function Og() {
    var e = k.A;
    return k.A = Z3, e;
  }
  function yf() {
    $e = 4, ba || (Ne & 4194048) !== Ne && on.current !== null || ($r = !0), (wa & 134217727) === 0 && (ir & 134217727) === 0 || He === null || Aa(
      He,
      Ne,
      ln,
      !1
    );
  }
  function vf(e, a, s) {
    var l = ze;
    ze |= 2;
    var f = Dg(), m = Og();
    (He !== e || Ne !== a) && (ol = null, ni(e, a)), a = !1;
    var b = $e;
    e: do
      try {
        if (Be !== 0 && _e !== null) {
          var A = _e, R = Zt;
          switch (Be) {
            case 8:
              gf(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              on.current === null && (a = !0);
              var H = Be;
              if (Be = 0, Zt = null, ai(e, A, R, H), s && $r) {
                b = 0;
                break e;
              }
              break;
            default:
              H = Be, Be = 0, Zt = null, ai(e, A, R, H);
          }
        }
        Q3(), b = $e;
        break;
      } catch (K) {
        Ng(e, K);
      }
    while (!0);
    return a && e.shellSuspendCounter++, Gn = Ja = null, ze = l, k.H = f, k.A = m, _e === null && (He = null, Ne = 0, ko()), b;
  }
  function Q3() {
    for (; _e !== null; ) Lg(_e);
  }
  function F3(e, a) {
    var s = ze;
    ze |= 2;
    var l = Dg(), f = Og();
    He !== e || Ne !== a ? (ol = null, sl = Ce() + 500, ni(e, a)) : $r = Bi(
      e,
      a
    );
    e: do
      try {
        if (Be !== 0 && _e !== null) {
          a = _e;
          var m = Zt;
          t: switch (Be) {
            case 1:
              Be = 0, Zt = null, ai(e, a, m, 1);
              break;
            case 2:
            case 9:
              if (Ip(m)) {
                Be = 0, Zt = null, zg(a);
                break;
              }
              a = function() {
                Be !== 2 && Be !== 9 || He !== e || (Be = 7), kn(e);
              }, m.then(a, a);
              break e;
            case 3:
              Be = 7;
              break e;
            case 4:
              Be = 5;
              break e;
            case 7:
              Ip(m) ? (Be = 0, Zt = null, zg(a)) : (Be = 0, Zt = null, ai(e, a, m, 7));
              break;
            case 5:
              var b = null;
              switch (_e.tag) {
                case 26:
                  b = _e.memoizedState;
                case 5:
                case 27:
                  var A = _e;
                  if (!b || g1(b)) {
                    Be = 0, Zt = null;
                    var R = A.sibling;
                    if (R !== null) _e = R;
                    else {
                      var H = A.return;
                      H !== null ? (_e = H, ul(H)) : _e = null;
                    }
                    break t;
                  }
              }
              Be = 0, Zt = null, ai(e, a, m, 5);
              break;
            case 6:
              Be = 0, Zt = null, ai(e, a, m, 6);
              break;
            case 8:
              gf(), $e = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        $3();
        break;
      } catch (K) {
        Ng(e, K);
      }
    while (!0);
    return Gn = Ja = null, k.H = l, k.A = f, ze = s, _e !== null ? 0 : (He = null, Ne = 0, ko(), $e);
  }
  function $3() {
    for (; _e !== null && !re(); )
      Lg(_e);
  }
  function Lg(e) {
    var a = og(e.alternate, e, Fn);
    e.memoizedProps = e.pendingProps, a === null ? ul(e) : _e = a;
  }
  function zg(e) {
    var a = e, s = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = tg(
          s,
          a,
          a.pendingProps,
          a.type,
          void 0,
          Ne
        );
        break;
      case 11:
        a = tg(
          s,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          Ne
        );
        break;
      case 5:
        Dc(a);
      default:
        ug(s, a), a = _e = Bp(a, Fn), a = og(s, a, Fn);
    }
    e.memoizedProps = e.pendingProps, a === null ? ul(e) : _e = a;
  }
  function ai(e, a, s, l) {
    Gn = Ja = null, Dc(a), Wr = null, cs = 0;
    var f = a.return;
    try {
      if (H3(
        e,
        f,
        a,
        s,
        Ne
      )) {
        $e = 1, el(
          e,
          nn(s, e.current)
        ), _e = null;
        return;
      }
    } catch (m) {
      if (f !== null) throw _e = f, m;
      $e = 1, el(
        e,
        nn(s, e.current)
      ), _e = null;
      return;
    }
    a.flags & 32768 ? (Le || l === 1 ? e = !0 : $r || (Ne & 536870912) !== 0 ? e = !1 : (ba = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = on.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Bg(a, e)) : ul(a);
  }
  function ul(e) {
    var a = e;
    do {
      if ((a.flags & 32768) !== 0) {
        Bg(
          a,
          ba
        );
        return;
      }
      e = a.return;
      var s = G3(
        a.alternate,
        a,
        Fn
      );
      if (s !== null) {
        _e = s;
        return;
      }
      if (a = a.sibling, a !== null) {
        _e = a;
        return;
      }
      _e = a = e;
    } while (a !== null);
    $e === 0 && ($e = 5);
  }
  function Bg(e, a) {
    do {
      var s = Y3(e.alternate, e);
      if (s !== null) {
        s.flags &= 32767, _e = s;
        return;
      }
      if (s = e.return, s !== null && (s.flags |= 32768, s.subtreeFlags = 0, s.deletions = null), !a && (e = e.sibling, e !== null)) {
        _e = e;
        return;
      }
      _e = e = s;
    } while (e !== null);
    $e = 6, _e = null;
  }
  function Vg(e, a, s, l, f, m, b, A, R) {
    e.cancelPendingCommit = null;
    do
      cl();
    while (wt !== 0);
    if ((ze & 6) !== 0) throw Error(i(327));
    if (a !== null) {
      if (a === e.current) throw Error(i(177));
      if (m = a.lanes | a.childLanes, m |= oc, kx(
        e,
        s,
        m,
        b,
        A,
        R
      ), e === He && (_e = He = null, Ne = 0), ei = a, Sa = e, ti = s, hf = m, pf = f, Cg = l, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, nS(vt, function() {
        return qg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null, f = O.p, O.p = 2, b = ze, ze |= 4;
        try {
          X3(e, a, s);
        } finally {
          ze = b, O.p = f, k.T = l;
        }
      }
      wt = 1, Ug(), jg(), Pg();
    }
  }
  function Ug() {
    if (wt === 1) {
      wt = 0;
      var e = Sa, a = ei, s = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || s) {
        s = k.T, k.T = null;
        var l = O.p;
        O.p = 2;
        var f = ze;
        ze |= 4;
        try {
          wg(a, e);
          var m = kf, b = Ep(e.containerInfo), A = m.focusedElem, R = m.selectionRange;
          if (b !== A && A && A.ownerDocument && Mp(
            A.ownerDocument.documentElement,
            A
          )) {
            if (R !== null && nc(A)) {
              var H = R.start, K = R.end;
              if (K === void 0 && (K = H), "selectionStart" in A)
                A.selectionStart = H, A.selectionEnd = Math.min(
                  K,
                  A.value.length
                );
              else {
                var $ = A.ownerDocument || document, Y = $ && $.defaultView || window;
                if (Y.getSelection) {
                  var I = Y.getSelection(), be = A.textContent.length, ye = Math.min(R.start, be), je = R.end === void 0 ? ye : Math.min(R.end, be);
                  !I.extend && ye > je && (b = je, je = ye, ye = b);
                  var V = Tp(
                    A,
                    ye
                  ), L = Tp(
                    A,
                    je
                  );
                  if (V && L && (I.rangeCount !== 1 || I.anchorNode !== V.node || I.anchorOffset !== V.offset || I.focusNode !== L.node || I.focusOffset !== L.offset)) {
                    var j = $.createRange();
                    j.setStart(V.node, V.offset), I.removeAllRanges(), ye > je ? (I.addRange(j), I.extend(L.node, L.offset)) : (j.setEnd(L.node, L.offset), I.addRange(j));
                  }
                }
              }
            }
            for ($ = [], I = A; I = I.parentNode; )
              I.nodeType === 1 && $.push({
                element: I,
                left: I.scrollLeft,
                top: I.scrollTop
              });
            for (typeof A.focus == "function" && A.focus(), A = 0; A < $.length; A++) {
              var Q = $[A];
              Q.element.scrollLeft = Q.left, Q.element.scrollTop = Q.top;
            }
          }
          Sl = !!Rf, kf = Rf = null;
        } finally {
          ze = f, O.p = l, k.T = s;
        }
      }
      e.current = a, wt = 2;
    }
  }
  function jg() {
    if (wt === 2) {
      wt = 0;
      var e = Sa, a = ei, s = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || s) {
        s = k.T, k.T = null;
        var l = O.p;
        O.p = 2;
        var f = ze;
        ze |= 4;
        try {
          gg(e, a.alternate, a);
        } finally {
          ze = f, O.p = l, k.T = s;
        }
      }
      wt = 3;
    }
  }
  function Pg() {
    if (wt === 4 || wt === 3) {
      wt = 0, ge();
      var e = Sa, a = ei, s = ti, l = Cg;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? wt = 5 : (wt = 0, ei = Sa = null, Hg(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (xa = null), zu(s), a = a.stateNode, Ht && typeof Ht.onCommitFiberRoot == "function")
        try {
          Ht.onCommitFiberRoot(
            qa,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        a = k.T, f = O.p, O.p = 2, k.T = null;
        try {
          for (var m = e.onRecoverableError, b = 0; b < l.length; b++) {
            var A = l[b];
            m(A.value, {
              componentStack: A.stack
            });
          }
        } finally {
          k.T = a, O.p = f;
        }
      }
      (ti & 3) !== 0 && cl(), kn(e), f = e.pendingLanes, (s & 4194090) !== 0 && (f & 42) !== 0 ? e === mf ? bs++ : (bs = 0, mf = e) : bs = 0, ws(0);
    }
  }
  function Hg(e, a) {
    (e.pooledCacheLanes &= a) === 0 && (a = e.pooledCache, a != null && (e.pooledCache = null, Ji(a)));
  }
  function cl(e) {
    return Ug(), jg(), Pg(), qg();
  }
  function qg() {
    if (wt !== 5) return !1;
    var e = Sa, a = hf;
    hf = 0;
    var s = zu(ti), l = k.T, f = O.p;
    try {
      O.p = 32 > s ? 32 : s, k.T = null, s = pf, pf = null;
      var m = Sa, b = ti;
      if (wt = 0, ei = Sa = null, ti = 0, (ze & 6) !== 0) throw Error(i(331));
      var A = ze;
      if (ze |= 4, Mg(m.current), Sg(
        m,
        m.current,
        b,
        s
      ), ze = A, ws(0, !1), Ht && typeof Ht.onPostCommitFiberRoot == "function")
        try {
          Ht.onPostCommitFiberRoot(qa, m);
        } catch {
        }
      return !0;
    } finally {
      O.p = f, k.T = l, Hg(e, a);
    }
  }
  function Gg(e, a, s) {
    a = nn(s, a), a = Ic(e.stateNode, a, 2), e = da(e, a, 2), e !== null && (Vi(e, 2), kn(e));
  }
  function Pe(e, a, s) {
    if (e.tag === 3)
      Gg(e, e, s);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          Gg(
            a,
            e,
            s
          );
          break;
        } else if (a.tag === 1) {
          var l = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (xa === null || !xa.has(l))) {
            e = nn(s, e), s = Zm(2), l = da(a, s, 2), l !== null && (Wm(
              s,
              l,
              a,
              e
            ), Vi(l, 2), kn(l));
            break;
          }
        }
        a = a.return;
      }
  }
  function bf(e, a, s) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new W3();
      var f = /* @__PURE__ */ new Set();
      l.set(a, f);
    } else
      f = l.get(a), f === void 0 && (f = /* @__PURE__ */ new Set(), l.set(a, f));
    f.has(s) || (uf = !0, f.add(s), e = J3.bind(null, e, a, s), a.then(e, e));
  }
  function J3(e, a, s) {
    var l = e.pingCache;
    l !== null && l.delete(a), e.pingedLanes |= e.suspendedLanes & s, e.warmLanes &= ~s, He === e && (Ne & s) === s && ($e === 4 || $e === 3 && (Ne & 62914560) === Ne && 300 > Ce() - df ? (ze & 2) === 0 && ni(e, 0) : cf |= s, Jr === Ne && (Jr = 0)), kn(e);
  }
  function Yg(e, a) {
    a === 0 && (a = P0()), e = Ur(e, a), e !== null && (Vi(e, a), kn(e));
  }
  function eS(e) {
    var a = e.memoizedState, s = 0;
    a !== null && (s = a.retryLane), Yg(e, s);
  }
  function tS(e, a) {
    var s = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode, f = e.memoizedState;
        f !== null && (s = f.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    l !== null && l.delete(a), Yg(e, s);
  }
  function nS(e, a) {
    return ra(e, a);
  }
  var fl = null, ri = null, wf = !1, dl = !1, xf = !1, sr = 0;
  function kn(e) {
    e !== ri && e.next === null && (ri === null ? fl = ri = e : ri = ri.next = e), dl = !0, wf || (wf = !0, rS());
  }
  function ws(e, a) {
    if (!xf && dl) {
      xf = !0;
      do
        for (var s = !1, l = fl; l !== null; ) {
          if (e !== 0) {
            var f = l.pendingLanes;
            if (f === 0) var m = 0;
            else {
              var b = l.suspendedLanes, A = l.pingedLanes;
              m = (1 << 31 - qt(42 | e) + 1) - 1, m &= f & ~(b & ~A), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (s = !0, Wg(l, m));
          } else
            m = Ne, m = vo(
              l,
              l === He ? m : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (m & 3) === 0 || Bi(l, m) || (s = !0, Wg(l, m));
          l = l.next;
        }
      while (s);
      xf = !1;
    }
  }
  function aS() {
    Xg();
  }
  function Xg() {
    dl = wf = !1;
    var e = 0;
    sr !== 0 && (dS() && (e = sr), sr = 0);
    for (var a = Ce(), s = null, l = fl; l !== null; ) {
      var f = l.next, m = Ig(l, a);
      m === 0 ? (l.next = null, s === null ? fl = f : s.next = f, f === null && (ri = s)) : (s = l, (e !== 0 || (m & 3) !== 0) && (dl = !0)), l = f;
    }
    ws(e);
  }
  function Ig(e, a) {
    for (var s = e.suspendedLanes, l = e.pingedLanes, f = e.expirationTimes, m = e.pendingLanes & -62914561; 0 < m; ) {
      var b = 31 - qt(m), A = 1 << b, R = f[b];
      R === -1 ? ((A & s) === 0 || (A & l) !== 0) && (f[b] = Rx(A, a)) : R <= a && (e.expiredLanes |= A), m &= ~A;
    }
    if (a = He, s = Ne, s = vo(
      e,
      e === a ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, s === 0 || e === a && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && mn(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((s & 3) === 0 || Bi(e, s)) {
      if (a = s & -s, a === e.callbackPriority) return a;
      switch (l !== null && mn(l), zu(s)) {
        case 2:
        case 8:
          s = Ge;
          break;
        case 32:
          s = vt;
          break;
        case 268435456:
          s = ia;
          break;
        default:
          s = vt;
      }
      return l = Zg.bind(null, e), s = ra(s, l), e.callbackPriority = a, e.callbackNode = s, a;
    }
    return l !== null && l !== null && mn(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Zg(e, a) {
    if (wt !== 0 && wt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var s = e.callbackNode;
    if (cl() && e.callbackNode !== s)
      return null;
    var l = Ne;
    return l = vo(
      e,
      e === He ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Rg(e, l, a), Ig(e, Ce()), e.callbackNode != null && e.callbackNode === s ? Zg.bind(null, e) : null);
  }
  function Wg(e, a) {
    if (cl()) return null;
    Rg(e, a, !0);
  }
  function rS() {
    pS(function() {
      (ze & 6) !== 0 ? ra(
        ke,
        aS
      ) : Xg();
    });
  }
  function Sf() {
    return sr === 0 && (sr = j0()), sr;
  }
  function Kg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ao("" + e);
  }
  function Qg(e, a) {
    var s = a.ownerDocument.createElement("input");
    return s.name = a.name, s.value = a.value, e.id && s.setAttribute("form", e.id), a.parentNode.insertBefore(s, a), e = new FormData(e), s.parentNode.removeChild(s), e;
  }
  function iS(e, a, s, l, f) {
    if (a === "submit" && s && s.stateNode === f) {
      var m = Kg(
        (f[Ot] || null).action
      ), b = l.submitter;
      b && (a = (a = b[Ot] || null) ? Kg(a.formAction) : b.getAttribute("formAction"), a !== null && (m = a, b = null));
      var A = new Co(
        "action",
        "action",
        null,
        l,
        f
      );
      e.push({
        event: A,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (sr !== 0) {
                  var R = b ? Qg(f, b) : new FormData(f);
                  Hc(
                    s,
                    {
                      pending: !0,
                      data: R,
                      method: f.method,
                      action: m
                    },
                    null,
                    R
                  );
                }
              } else
                typeof m == "function" && (A.preventDefault(), R = b ? Qg(f, b) : new FormData(f), Hc(
                  s,
                  {
                    pending: !0,
                    data: R,
                    method: f.method,
                    action: m
                  },
                  m,
                  R
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var Af = 0; Af < sc.length; Af++) {
    var Tf = sc[Af], sS = Tf.toLowerCase(), oS = Tf[0].toUpperCase() + Tf.slice(1);
    gn(
      sS,
      "on" + oS
    );
  }
  gn(Rp, "onAnimationEnd"), gn(kp, "onAnimationIteration"), gn(Np, "onAnimationStart"), gn("dblclick", "onDoubleClick"), gn("focusin", "onFocus"), gn("focusout", "onBlur"), gn(T3, "onTransitionRun"), gn(M3, "onTransitionStart"), gn(E3, "onTransitionCancel"), gn(Dp, "onTransitionEnd"), _r("onMouseEnter", ["mouseout", "mouseover"]), _r("onMouseLeave", ["mouseout", "mouseover"]), _r("onPointerEnter", ["pointerout", "pointerover"]), _r("onPointerLeave", ["pointerout", "pointerover"]), Ya(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ya(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ya("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ya(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ya(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ya(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var xs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), lS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xs)
  );
  function Fg(e, a) {
    a = (a & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var l = e[s], f = l.event;
      l = l.listeners;
      e: {
        var m = void 0;
        if (a)
          for (var b = l.length - 1; 0 <= b; b--) {
            var A = l[b], R = A.instance, H = A.currentTarget;
            if (A = A.listener, R !== m && f.isPropagationStopped())
              break e;
            m = A, f.currentTarget = H;
            try {
              m(f);
            } catch (K) {
              Jo(K);
            }
            f.currentTarget = null, m = R;
          }
        else
          for (b = 0; b < l.length; b++) {
            if (A = l[b], R = A.instance, H = A.currentTarget, A = A.listener, R !== m && f.isPropagationStopped())
              break e;
            m = A, f.currentTarget = H;
            try {
              m(f);
            } catch (K) {
              Jo(K);
            }
            f.currentTarget = null, m = R;
          }
      }
    }
  }
  function Re(e, a) {
    var s = a[Bu];
    s === void 0 && (s = a[Bu] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    s.has(l) || ($g(a, e, 2, !1), s.add(l));
  }
  function Mf(e, a, s) {
    var l = 0;
    a && (l |= 4), $g(
      s,
      e,
      l,
      a
    );
  }
  var hl = "_reactListening" + Math.random().toString(36).slice(2);
  function Ef(e) {
    if (!e[hl]) {
      e[hl] = !0, X0.forEach(function(s) {
        s !== "selectionchange" && (lS.has(s) || Mf(s, !1, e), Mf(s, !0, e));
      });
      var a = e.nodeType === 9 ? e : e.ownerDocument;
      a === null || a[hl] || (a[hl] = !0, Mf("selectionchange", !1, a));
    }
  }
  function $g(e, a, s, l) {
    switch (S1(a)) {
      case 2:
        var f = zS;
        break;
      case 8:
        f = BS;
        break;
      default:
        f = Pf;
    }
    s = f.bind(
      null,
      a,
      s,
      e
    ), f = void 0, !Zu || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (f = !0), l ? f !== void 0 ? e.addEventListener(a, s, {
      capture: !0,
      passive: f
    }) : e.addEventListener(a, s, !0) : f !== void 0 ? e.addEventListener(a, s, {
      passive: f
    }) : e.addEventListener(a, s, !1);
  }
  function Cf(e, a, s, l, f) {
    var m = l;
    if ((a & 1) === 0 && (a & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var b = l.tag;
        if (b === 3 || b === 4) {
          var A = l.stateNode.containerInfo;
          if (A === f) break;
          if (b === 4)
            for (b = l.return; b !== null; ) {
              var R = b.tag;
              if ((R === 3 || R === 4) && b.stateNode.containerInfo === f)
                return;
              b = b.return;
            }
          for (; A !== null; ) {
            if (b = Mr(A), b === null) return;
            if (R = b.tag, R === 5 || R === 6 || R === 26 || R === 27) {
              l = m = b;
              continue e;
            }
            A = A.parentNode;
          }
        }
        l = l.return;
      }
    ip(function() {
      var H = m, K = Xu(s), $ = [];
      e: {
        var Y = Op.get(e);
        if (Y !== void 0) {
          var I = Co, be = e;
          switch (e) {
            case "keypress":
              if (Mo(s) === 0) break e;
            case "keydown":
            case "keyup":
              I = n3;
              break;
            case "focusin":
              be = "focus", I = Fu;
              break;
            case "focusout":
              be = "blur", I = Fu;
              break;
            case "beforeblur":
            case "afterblur":
              I = Fu;
              break;
            case "click":
              if (s.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              I = lp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              I = Yx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              I = i3;
              break;
            case Rp:
            case kp:
            case Np:
              I = Zx;
              break;
            case Dp:
              I = o3;
              break;
            case "scroll":
            case "scrollend":
              I = qx;
              break;
            case "wheel":
              I = u3;
              break;
            case "copy":
            case "cut":
            case "paste":
              I = Kx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              I = cp;
              break;
            case "toggle":
            case "beforetoggle":
              I = f3;
          }
          var ye = (a & 4) !== 0, je = !ye && (e === "scroll" || e === "scrollend"), V = ye ? Y !== null ? Y + "Capture" : null : Y;
          ye = [];
          for (var L = H, j; L !== null; ) {
            var Q = L;
            if (j = Q.stateNode, Q = Q.tag, Q !== 5 && Q !== 26 && Q !== 27 || j === null || V === null || (Q = Pi(L, V), Q != null && ye.push(
              Ss(L, Q, j)
            )), je) break;
            L = L.return;
          }
          0 < ye.length && (Y = new I(
            Y,
            be,
            null,
            s,
            K
          ), $.push({ event: Y, listeners: ye }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (Y = e === "mouseover" || e === "pointerover", I = e === "mouseout" || e === "pointerout", Y && s !== Yu && (be = s.relatedTarget || s.fromElement) && (Mr(be) || be[Tr]))
            break e;
          if ((I || Y) && (Y = K.window === K ? K : (Y = K.ownerDocument) ? Y.defaultView || Y.parentWindow : window, I ? (be = s.relatedTarget || s.toElement, I = H, be = be ? Mr(be) : null, be !== null && (je = u(be), ye = be.tag, be !== je || ye !== 5 && ye !== 27 && ye !== 6) && (be = null)) : (I = null, be = H), I !== be)) {
            if (ye = lp, Q = "onMouseLeave", V = "onMouseEnter", L = "mouse", (e === "pointerout" || e === "pointerover") && (ye = cp, Q = "onPointerLeave", V = "onPointerEnter", L = "pointer"), je = I == null ? Y : ji(I), j = be == null ? Y : ji(be), Y = new ye(
              Q,
              L + "leave",
              I,
              s,
              K
            ), Y.target = je, Y.relatedTarget = j, Q = null, Mr(K) === H && (ye = new ye(
              V,
              L + "enter",
              be,
              s,
              K
            ), ye.target = j, ye.relatedTarget = je, Q = ye), je = Q, I && be)
              t: {
                for (ye = I, V = be, L = 0, j = ye; j; j = ii(j))
                  L++;
                for (j = 0, Q = V; Q; Q = ii(Q))
                  j++;
                for (; 0 < L - j; )
                  ye = ii(ye), L--;
                for (; 0 < j - L; )
                  V = ii(V), j--;
                for (; L--; ) {
                  if (ye === V || V !== null && ye === V.alternate)
                    break t;
                  ye = ii(ye), V = ii(V);
                }
                ye = null;
              }
            else ye = null;
            I !== null && Jg(
              $,
              Y,
              I,
              ye,
              !1
            ), be !== null && je !== null && Jg(
              $,
              je,
              be,
              ye,
              !0
            );
          }
        }
        e: {
          if (Y = H ? ji(H) : window, I = Y.nodeName && Y.nodeName.toLowerCase(), I === "select" || I === "input" && Y.type === "file")
            var oe = vp;
          else if (gp(Y))
            if (bp)
              oe = x3;
            else {
              oe = b3;
              var Ee = v3;
            }
          else
            I = Y.nodeName, !I || I.toLowerCase() !== "input" || Y.type !== "checkbox" && Y.type !== "radio" ? H && Gu(H.elementType) && (oe = vp) : oe = w3;
          if (oe && (oe = oe(e, H))) {
            yp(
              $,
              oe,
              s,
              K
            );
            break e;
          }
          Ee && Ee(e, Y, H), e === "focusout" && H && Y.type === "number" && H.memoizedProps.value != null && qu(Y, "number", Y.value);
        }
        switch (Ee = H ? ji(H) : window, e) {
          case "focusin":
            (gp(Ee) || Ee.contentEditable === "true") && (zr = Ee, ac = H, Wi = null);
            break;
          case "focusout":
            Wi = ac = zr = null;
            break;
          case "mousedown":
            rc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            rc = !1, Cp($, s, K);
            break;
          case "selectionchange":
            if (A3) break;
          case "keydown":
          case "keyup":
            Cp($, s, K);
        }
        var de;
        if (Ju)
          e: {
            switch (e) {
              case "compositionstart":
                var ve = "onCompositionStart";
                break e;
              case "compositionend":
                ve = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ve = "onCompositionUpdate";
                break e;
            }
            ve = void 0;
          }
        else
          Lr ? pp(e, s) && (ve = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (ve = "onCompositionStart");
        ve && (fp && s.locale !== "ko" && (Lr || ve !== "onCompositionStart" ? ve === "onCompositionEnd" && Lr && (de = sp()) : (la = K, Wu = "value" in la ? la.value : la.textContent, Lr = !0)), Ee = pl(H, ve), 0 < Ee.length && (ve = new up(
          ve,
          e,
          null,
          s,
          K
        ), $.push({ event: ve, listeners: Ee }), de ? ve.data = de : (de = mp(s), de !== null && (ve.data = de)))), (de = h3 ? p3(e, s) : m3(e, s)) && (ve = pl(H, "onBeforeInput"), 0 < ve.length && (Ee = new up(
          "onBeforeInput",
          "beforeinput",
          null,
          s,
          K
        ), $.push({
          event: Ee,
          listeners: ve
        }), Ee.data = de)), iS(
          $,
          e,
          H,
          s,
          K
        );
      }
      Fg($, a);
    });
  }
  function Ss(e, a, s) {
    return {
      instance: e,
      listener: a,
      currentTarget: s
    };
  }
  function pl(e, a) {
    for (var s = a + "Capture", l = []; e !== null; ) {
      var f = e, m = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || m === null || (f = Pi(e, s), f != null && l.unshift(
        Ss(e, f, m)
      ), f = Pi(e, a), f != null && l.push(
        Ss(e, f, m)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function ii(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Jg(e, a, s, l, f) {
    for (var m = a._reactName, b = []; s !== null && s !== l; ) {
      var A = s, R = A.alternate, H = A.stateNode;
      if (A = A.tag, R !== null && R === l) break;
      A !== 5 && A !== 26 && A !== 27 || H === null || (R = H, f ? (H = Pi(s, m), H != null && b.unshift(
        Ss(s, H, R)
      )) : f || (H = Pi(s, m), H != null && b.push(
        Ss(s, H, R)
      ))), s = s.return;
    }
    b.length !== 0 && e.push({ event: a, listeners: b });
  }
  var uS = /\r\n?/g, cS = /\u0000|\uFFFD/g;
  function e1(e) {
    return (typeof e == "string" ? e : "" + e).replace(uS, `
`).replace(cS, "");
  }
  function t1(e, a) {
    return a = e1(a), e1(e) === a;
  }
  function ml() {
  }
  function Ue(e, a, s, l, f, m) {
    switch (s) {
      case "children":
        typeof l == "string" ? a === "body" || a === "textarea" && l === "" || Nr(e, l) : (typeof l == "number" || typeof l == "bigint") && a !== "body" && Nr(e, "" + l);
        break;
      case "className":
        wo(e, "class", l);
        break;
      case "tabIndex":
        wo(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        wo(e, s, l);
        break;
      case "style":
        ap(e, l, m);
        break;
      case "data":
        if (a !== "object") {
          wo(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (a !== "a" || s !== "href")) {
          e.removeAttribute(s);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(s);
          break;
        }
        l = Ao("" + l), e.setAttribute(s, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            s,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof m == "function" && (s === "formAction" ? (a !== "input" && Ue(e, a, "name", f.name, f, null), Ue(
            e,
            a,
            "formEncType",
            f.formEncType,
            f,
            null
          ), Ue(
            e,
            a,
            "formMethod",
            f.formMethod,
            f,
            null
          ), Ue(
            e,
            a,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (Ue(e, a, "encType", f.encType, f, null), Ue(e, a, "method", f.method, f, null), Ue(e, a, "target", f.target, f, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(s);
          break;
        }
        l = Ao("" + l), e.setAttribute(s, l);
        break;
      case "onClick":
        l != null && (e.onclick = ml);
        break;
      case "onScroll":
        l != null && Re("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Re("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(i(61));
          if (s = l.__html, s != null) {
            if (f.children != null) throw Error(i(60));
            e.innerHTML = s;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        s = Ao("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          s
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(s, "" + l) : e.removeAttribute(s);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(s, "") : e.removeAttribute(s);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(s, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(s, l) : e.removeAttribute(s);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(s, l) : e.removeAttribute(s);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(s) : e.setAttribute(s, l);
        break;
      case "popover":
        Re("beforetoggle", e), Re("toggle", e), bo(e, "popover", l);
        break;
      case "xlinkActuate":
        Un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        bo(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < s.length) || s[0] !== "o" && s[0] !== "O" || s[1] !== "n" && s[1] !== "N") && (s = Px.get(s) || s, bo(e, s, l));
    }
  }
  function _f(e, a, s, l, f, m) {
    switch (s) {
      case "style":
        ap(e, l, m);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(i(61));
          if (s = l.__html, s != null) {
            if (f.children != null) throw Error(i(60));
            e.innerHTML = s;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Nr(e, l) : (typeof l == "number" || typeof l == "bigint") && Nr(e, "" + l);
        break;
      case "onScroll":
        l != null && Re("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Re("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = ml);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!I0.hasOwnProperty(s))
          e: {
            if (s[0] === "o" && s[1] === "n" && (f = s.endsWith("Capture"), a = s.slice(2, f ? s.length - 7 : void 0), m = e[Ot] || null, m = m != null ? m[s] : null, typeof m == "function" && e.removeEventListener(a, m, f), typeof l == "function")) {
              typeof m != "function" && m !== null && (s in e ? e[s] = null : e.hasAttribute(s) && e.removeAttribute(s)), e.addEventListener(a, l, f);
              break e;
            }
            s in e ? e[s] = l : l === !0 ? e.setAttribute(s, "") : bo(e, s, l);
          }
    }
  }
  function xt(e, a, s) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Re("error", e), Re("load", e);
        var l = !1, f = !1, m;
        for (m in s)
          if (s.hasOwnProperty(m)) {
            var b = s[m];
            if (b != null)
              switch (m) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, a));
                default:
                  Ue(e, a, m, b, s, null);
              }
          }
        f && Ue(e, a, "srcSet", s.srcSet, s, null), l && Ue(e, a, "src", s.src, s, null);
        return;
      case "input":
        Re("invalid", e);
        var A = m = b = f = null, R = null, H = null;
        for (l in s)
          if (s.hasOwnProperty(l)) {
            var K = s[l];
            if (K != null)
              switch (l) {
                case "name":
                  f = K;
                  break;
                case "type":
                  b = K;
                  break;
                case "checked":
                  R = K;
                  break;
                case "defaultChecked":
                  H = K;
                  break;
                case "value":
                  m = K;
                  break;
                case "defaultValue":
                  A = K;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (K != null)
                    throw Error(i(137, a));
                  break;
                default:
                  Ue(e, a, l, K, s, null);
              }
          }
        J0(
          e,
          m,
          A,
          R,
          H,
          b,
          f,
          !1
        ), xo(e);
        return;
      case "select":
        Re("invalid", e), l = b = m = null;
        for (f in s)
          if (s.hasOwnProperty(f) && (A = s[f], A != null))
            switch (f) {
              case "value":
                m = A;
                break;
              case "defaultValue":
                b = A;
                break;
              case "multiple":
                l = A;
              default:
                Ue(e, a, f, A, s, null);
            }
        a = m, s = b, e.multiple = !!l, a != null ? kr(e, !!l, a, !1) : s != null && kr(e, !!l, s, !0);
        return;
      case "textarea":
        Re("invalid", e), m = f = l = null;
        for (b in s)
          if (s.hasOwnProperty(b) && (A = s[b], A != null))
            switch (b) {
              case "value":
                l = A;
                break;
              case "defaultValue":
                f = A;
                break;
              case "children":
                m = A;
                break;
              case "dangerouslySetInnerHTML":
                if (A != null) throw Error(i(91));
                break;
              default:
                Ue(e, a, b, A, s, null);
            }
        tp(e, l, f, m), xo(e);
        return;
      case "option":
        for (R in s)
          if (s.hasOwnProperty(R) && (l = s[R], l != null))
            switch (R) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ue(e, a, R, l, s, null);
            }
        return;
      case "dialog":
        Re("beforetoggle", e), Re("toggle", e), Re("cancel", e), Re("close", e);
        break;
      case "iframe":
      case "object":
        Re("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < xs.length; l++)
          Re(xs[l], e);
        break;
      case "image":
        Re("error", e), Re("load", e);
        break;
      case "details":
        Re("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Re("error", e), Re("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in s)
          if (s.hasOwnProperty(H) && (l = s[H], l != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, a));
              default:
                Ue(e, a, H, l, s, null);
            }
        return;
      default:
        if (Gu(a)) {
          for (K in s)
            s.hasOwnProperty(K) && (l = s[K], l !== void 0 && _f(
              e,
              a,
              K,
              l,
              s,
              void 0
            ));
          return;
        }
    }
    for (A in s)
      s.hasOwnProperty(A) && (l = s[A], l != null && Ue(e, a, A, l, s, null));
  }
  function fS(e, a, s, l) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var f = null, m = null, b = null, A = null, R = null, H = null, K = null;
        for (I in s) {
          var $ = s[I];
          if (s.hasOwnProperty(I) && $ != null)
            switch (I) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                R = $;
              default:
                l.hasOwnProperty(I) || Ue(e, a, I, null, l, $);
            }
        }
        for (var Y in l) {
          var I = l[Y];
          if ($ = s[Y], l.hasOwnProperty(Y) && (I != null || $ != null))
            switch (Y) {
              case "type":
                m = I;
                break;
              case "name":
                f = I;
                break;
              case "checked":
                H = I;
                break;
              case "defaultChecked":
                K = I;
                break;
              case "value":
                b = I;
                break;
              case "defaultValue":
                A = I;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (I != null)
                  throw Error(i(137, a));
                break;
              default:
                I !== $ && Ue(
                  e,
                  a,
                  Y,
                  I,
                  l,
                  $
                );
            }
        }
        Hu(
          e,
          b,
          A,
          R,
          H,
          K,
          m,
          f
        );
        return;
      case "select":
        I = b = A = Y = null;
        for (m in s)
          if (R = s[m], s.hasOwnProperty(m) && R != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                I = R;
              default:
                l.hasOwnProperty(m) || Ue(
                  e,
                  a,
                  m,
                  null,
                  l,
                  R
                );
            }
        for (f in l)
          if (m = l[f], R = s[f], l.hasOwnProperty(f) && (m != null || R != null))
            switch (f) {
              case "value":
                Y = m;
                break;
              case "defaultValue":
                A = m;
                break;
              case "multiple":
                b = m;
              default:
                m !== R && Ue(
                  e,
                  a,
                  f,
                  m,
                  l,
                  R
                );
            }
        a = A, s = b, l = I, Y != null ? kr(e, !!s, Y, !1) : !!l != !!s && (a != null ? kr(e, !!s, a, !0) : kr(e, !!s, s ? [] : "", !1));
        return;
      case "textarea":
        I = Y = null;
        for (A in s)
          if (f = s[A], s.hasOwnProperty(A) && f != null && !l.hasOwnProperty(A))
            switch (A) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ue(e, a, A, null, l, f);
            }
        for (b in l)
          if (f = l[b], m = s[b], l.hasOwnProperty(b) && (f != null || m != null))
            switch (b) {
              case "value":
                Y = f;
                break;
              case "defaultValue":
                I = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(i(91));
                break;
              default:
                f !== m && Ue(e, a, b, f, l, m);
            }
        ep(e, Y, I);
        return;
      case "option":
        for (var be in s)
          if (Y = s[be], s.hasOwnProperty(be) && Y != null && !l.hasOwnProperty(be))
            switch (be) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ue(
                  e,
                  a,
                  be,
                  null,
                  l,
                  Y
                );
            }
        for (R in l)
          if (Y = l[R], I = s[R], l.hasOwnProperty(R) && Y !== I && (Y != null || I != null))
            switch (R) {
              case "selected":
                e.selected = Y && typeof Y != "function" && typeof Y != "symbol";
                break;
              default:
                Ue(
                  e,
                  a,
                  R,
                  Y,
                  l,
                  I
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ye in s)
          Y = s[ye], s.hasOwnProperty(ye) && Y != null && !l.hasOwnProperty(ye) && Ue(e, a, ye, null, l, Y);
        for (H in l)
          if (Y = l[H], I = s[H], l.hasOwnProperty(H) && Y !== I && (Y != null || I != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(i(137, a));
                break;
              default:
                Ue(
                  e,
                  a,
                  H,
                  Y,
                  l,
                  I
                );
            }
        return;
      default:
        if (Gu(a)) {
          for (var je in s)
            Y = s[je], s.hasOwnProperty(je) && Y !== void 0 && !l.hasOwnProperty(je) && _f(
              e,
              a,
              je,
              void 0,
              l,
              Y
            );
          for (K in l)
            Y = l[K], I = s[K], !l.hasOwnProperty(K) || Y === I || Y === void 0 && I === void 0 || _f(
              e,
              a,
              K,
              Y,
              l,
              I
            );
          return;
        }
    }
    for (var V in s)
      Y = s[V], s.hasOwnProperty(V) && Y != null && !l.hasOwnProperty(V) && Ue(e, a, V, null, l, Y);
    for ($ in l)
      Y = l[$], I = s[$], !l.hasOwnProperty($) || Y === I || Y == null && I == null || Ue(e, a, $, Y, l, I);
  }
  var Rf = null, kf = null;
  function gl(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function n1(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function a1(e, a) {
    if (e === 0)
      switch (a) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && a === "foreignObject" ? 0 : e;
  }
  function Nf(e, a) {
    return e === "textarea" || e === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var Df = null;
  function dS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Df ? !1 : (Df = e, !0) : (Df = null, !1);
  }
  var r1 = typeof setTimeout == "function" ? setTimeout : void 0, hS = typeof clearTimeout == "function" ? clearTimeout : void 0, i1 = typeof Promise == "function" ? Promise : void 0, pS = typeof queueMicrotask == "function" ? queueMicrotask : typeof i1 < "u" ? function(e) {
    return i1.resolve(null).then(e).catch(mS);
  } : r1;
  function mS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ta(e) {
    return e === "head";
  }
  function s1(e, a) {
    var s = a, l = 0, f = 0;
    do {
      var m = s.nextSibling;
      if (e.removeChild(s), m && m.nodeType === 8)
        if (s = m.data, s === "/$") {
          if (0 < l && 8 > l) {
            s = l;
            var b = e.ownerDocument;
            if (s & 1 && As(b.documentElement), s & 2 && As(b.body), s & 4)
              for (s = b.head, As(s), b = s.firstChild; b; ) {
                var A = b.nextSibling, R = b.nodeName;
                b[Ui] || R === "SCRIPT" || R === "STYLE" || R === "LINK" && b.rel.toLowerCase() === "stylesheet" || s.removeChild(b), b = A;
              }
          }
          if (f === 0) {
            e.removeChild(m), Ns(a);
            return;
          }
          f--;
        } else
          s === "$" || s === "$?" || s === "$!" ? f++ : l = s.charCodeAt(0) - 48;
      else l = 0;
      s = m;
    } while (s);
    Ns(a);
  }
  function Of(e) {
    var a = e.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var s = a;
      switch (a = a.nextSibling, s.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Of(s), Vu(s);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (s.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(s);
    }
  }
  function gS(e, a, s, l) {
    for (; e.nodeType === 1; ) {
      var f = s;
      if (e.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ui])
          switch (a) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (m = e.getAttribute("rel"), m === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (m !== f.rel || e.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || e.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (m = e.getAttribute("src"), (m !== (f.src == null ? null : f.src) || e.getAttribute("type") !== (f.type == null ? null : f.type) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && m && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (a === "input" && e.type === "hidden") {
        var m = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && e.getAttribute("name") === m)
          return e;
      } else return e;
      if (e = vn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function yS(e, a, s) {
    if (a === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !s || (e = vn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Lf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState === "complete";
  }
  function vS(e, a) {
    var s = e.ownerDocument;
    if (e.data !== "$?" || s.readyState === "complete")
      a();
    else {
      var l = function() {
        a(), s.removeEventListener("DOMContentLoaded", l);
      };
      s.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function vn(e) {
    for (; e != null; e = e.nextSibling) {
      var a = e.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (a = e.data, a === "$" || a === "$!" || a === "$?" || a === "F!" || a === "F")
          break;
        if (a === "/$") return null;
      }
    }
    return e;
  }
  var zf = null;
  function o1(e) {
    e = e.previousSibling;
    for (var a = 0; e; ) {
      if (e.nodeType === 8) {
        var s = e.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (a === 0) return e;
          a--;
        } else s === "/$" && a++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function l1(e, a, s) {
    switch (a = gl(s), e) {
      case "html":
        if (e = a.documentElement, !e) throw Error(i(452));
        return e;
      case "head":
        if (e = a.head, !e) throw Error(i(453));
        return e;
      case "body":
        if (e = a.body, !e) throw Error(i(454));
        return e;
      default:
        throw Error(i(451));
    }
  }
  function As(e) {
    for (var a = e.attributes; a.length; )
      e.removeAttributeNode(a[0]);
    Vu(e);
  }
  var un = /* @__PURE__ */ new Map(), u1 = /* @__PURE__ */ new Set();
  function yl(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var $n = O.d;
  O.d = {
    f: bS,
    r: wS,
    D: xS,
    C: SS,
    L: AS,
    m: TS,
    X: ES,
    S: MS,
    M: CS
  };
  function bS() {
    var e = $n.f(), a = ll();
    return e || a;
  }
  function wS(e) {
    var a = Er(e);
    a !== null && a.tag === 5 && a.type === "form" ? Rm(a) : $n.r(e);
  }
  var si = typeof document > "u" ? null : document;
  function c1(e, a, s) {
    var l = si;
    if (l && typeof a == "string" && a) {
      var f = tn(a);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof s == "string" && (f += '[crossorigin="' + s + '"]'), u1.has(f) || (u1.add(f), e = { rel: e, crossOrigin: s, href: a }, l.querySelector(f) === null && (a = l.createElement("link"), xt(a, "link", e), ht(a), l.head.appendChild(a)));
    }
  }
  function xS(e) {
    $n.D(e), c1("dns-prefetch", e, null);
  }
  function SS(e, a) {
    $n.C(e, a), c1("preconnect", e, a);
  }
  function AS(e, a, s) {
    $n.L(e, a, s);
    var l = si;
    if (l && e && a) {
      var f = 'link[rel="preload"][as="' + tn(a) + '"]';
      a === "image" && s && s.imageSrcSet ? (f += '[imagesrcset="' + tn(
        s.imageSrcSet
      ) + '"]', typeof s.imageSizes == "string" && (f += '[imagesizes="' + tn(
        s.imageSizes
      ) + '"]')) : f += '[href="' + tn(e) + '"]';
      var m = f;
      switch (a) {
        case "style":
          m = oi(e);
          break;
        case "script":
          m = li(e);
      }
      un.has(m) || (e = g(
        {
          rel: "preload",
          href: a === "image" && s && s.imageSrcSet ? void 0 : e,
          as: a
        },
        s
      ), un.set(m, e), l.querySelector(f) !== null || a === "style" && l.querySelector(Ts(m)) || a === "script" && l.querySelector(Ms(m)) || (a = l.createElement("link"), xt(a, "link", e), ht(a), l.head.appendChild(a)));
    }
  }
  function TS(e, a) {
    $n.m(e, a);
    var s = si;
    if (s && e) {
      var l = a && typeof a.as == "string" ? a.as : "script", f = 'link[rel="modulepreload"][as="' + tn(l) + '"][href="' + tn(e) + '"]', m = f;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = li(e);
      }
      if (!un.has(m) && (e = g({ rel: "modulepreload", href: e }, a), un.set(m, e), s.querySelector(f) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (s.querySelector(Ms(m)))
              return;
        }
        l = s.createElement("link"), xt(l, "link", e), ht(l), s.head.appendChild(l);
      }
    }
  }
  function MS(e, a, s) {
    $n.S(e, a, s);
    var l = si;
    if (l && e) {
      var f = Cr(l).hoistableStyles, m = oi(e);
      a = a || "default";
      var b = f.get(m);
      if (!b) {
        var A = { loading: 0, preload: null };
        if (b = l.querySelector(
          Ts(m)
        ))
          A.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": a },
            s
          ), (s = un.get(m)) && Bf(e, s);
          var R = b = l.createElement("link");
          ht(R), xt(R, "link", e), R._p = new Promise(function(H, K) {
            R.onload = H, R.onerror = K;
          }), R.addEventListener("load", function() {
            A.loading |= 1;
          }), R.addEventListener("error", function() {
            A.loading |= 2;
          }), A.loading |= 4, vl(b, a, l);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: A
        }, f.set(m, b);
      }
    }
  }
  function ES(e, a) {
    $n.X(e, a);
    var s = si;
    if (s && e) {
      var l = Cr(s).hoistableScripts, f = li(e), m = l.get(f);
      m || (m = s.querySelector(Ms(f)), m || (e = g({ src: e, async: !0 }, a), (a = un.get(f)) && Vf(e, a), m = s.createElement("script"), ht(m), xt(m, "link", e), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, l.set(f, m));
    }
  }
  function CS(e, a) {
    $n.M(e, a);
    var s = si;
    if (s && e) {
      var l = Cr(s).hoistableScripts, f = li(e), m = l.get(f);
      m || (m = s.querySelector(Ms(f)), m || (e = g({ src: e, async: !0, type: "module" }, a), (a = un.get(f)) && Vf(e, a), m = s.createElement("script"), ht(m), xt(m, "link", e), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, l.set(f, m));
    }
  }
  function f1(e, a, s, l) {
    var f = (f = ie.current) ? yl(f) : null;
    if (!f) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof s.precedence == "string" && typeof s.href == "string" ? (a = oi(s.href), s = Cr(
          f
        ).hoistableStyles, l = s.get(a), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, s.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (s.rel === "stylesheet" && typeof s.href == "string" && typeof s.precedence == "string") {
          e = oi(s.href);
          var m = Cr(
            f
          ).hoistableStyles, b = m.get(e);
          if (b || (f = f.ownerDocument || f, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, m.set(e, b), (m = f.querySelector(
            Ts(e)
          )) && !m._p && (b.instance = m, b.state.loading = 5), un.has(e) || (s = {
            rel: "preload",
            as: "style",
            href: s.href,
            crossOrigin: s.crossOrigin,
            integrity: s.integrity,
            media: s.media,
            hrefLang: s.hrefLang,
            referrerPolicy: s.referrerPolicy
          }, un.set(e, s), m || _S(
            f,
            e,
            s,
            b.state
          ))), a && l === null)
            throw Error(i(528, ""));
          return b;
        }
        if (a && l !== null)
          throw Error(i(529, ""));
        return null;
      case "script":
        return a = s.async, s = s.src, typeof s == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = li(s), s = Cr(
          f
        ).hoistableScripts, l = s.get(a), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, s.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(i(444, e));
    }
  }
  function oi(e) {
    return 'href="' + tn(e) + '"';
  }
  function Ts(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function d1(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function _S(e, a, s, l) {
    e.querySelector('link[rel="preload"][as="style"][' + a + "]") ? l.loading = 1 : (a = e.createElement("link"), l.preload = a, a.addEventListener("load", function() {
      return l.loading |= 1;
    }), a.addEventListener("error", function() {
      return l.loading |= 2;
    }), xt(a, "link", s), ht(a), e.head.appendChild(a));
  }
  function li(e) {
    return '[src="' + tn(e) + '"]';
  }
  function Ms(e) {
    return "script[async]" + e;
  }
  function h1(e, a, s) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + tn(s.href) + '"]'
          );
          if (l)
            return a.instance = l, ht(l), l;
          var f = g({}, s, {
            "data-href": s.href,
            "data-precedence": s.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), ht(l), xt(l, "style", f), vl(l, s.precedence, e), a.instance = l;
        case "stylesheet":
          f = oi(s.href);
          var m = e.querySelector(
            Ts(f)
          );
          if (m)
            return a.state.loading |= 4, a.instance = m, ht(m), m;
          l = d1(s), (f = un.get(f)) && Bf(l, f), m = (e.ownerDocument || e).createElement("link"), ht(m);
          var b = m;
          return b._p = new Promise(function(A, R) {
            b.onload = A, b.onerror = R;
          }), xt(m, "link", l), a.state.loading |= 4, vl(m, s.precedence, e), a.instance = m;
        case "script":
          return m = li(s.src), (f = e.querySelector(
            Ms(m)
          )) ? (a.instance = f, ht(f), f) : (l = s, (f = un.get(m)) && (l = g({}, s), Vf(l, f)), e = e.ownerDocument || e, f = e.createElement("script"), ht(f), xt(f, "link", l), e.head.appendChild(f), a.instance = f);
        case "void":
          return null;
        default:
          throw Error(i(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (l = a.instance, a.state.loading |= 4, vl(l, s.precedence, e));
    return a.instance;
  }
  function vl(e, a, s) {
    for (var l = s.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = l.length ? l[l.length - 1] : null, m = f, b = 0; b < l.length; b++) {
      var A = l[b];
      if (A.dataset.precedence === a) m = A;
      else if (m !== f) break;
    }
    m ? m.parentNode.insertBefore(e, m.nextSibling) : (a = s.nodeType === 9 ? s.head : s, a.insertBefore(e, a.firstChild));
  }
  function Bf(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.title == null && (e.title = a.title);
  }
  function Vf(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.integrity == null && (e.integrity = a.integrity);
  }
  var bl = null;
  function p1(e, a, s) {
    if (bl === null) {
      var l = /* @__PURE__ */ new Map(), f = bl = /* @__PURE__ */ new Map();
      f.set(s, l);
    } else
      f = bl, l = f.get(s), l || (l = /* @__PURE__ */ new Map(), f.set(s, l));
    if (l.has(e)) return l;
    for (l.set(e, null), s = s.getElementsByTagName(e), f = 0; f < s.length; f++) {
      var m = s[f];
      if (!(m[Ui] || m[Mt] || e === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = m.getAttribute(a) || "";
        b = e + b;
        var A = l.get(b);
        A ? A.push(m) : l.set(b, [m]);
      }
    }
    return l;
  }
  function m1(e, a, s) {
    e = e.ownerDocument || e, e.head.insertBefore(
      s,
      a === "title" ? e.querySelector("head > title") : null
    );
  }
  function RS(e, a, s) {
    if (s === 1 || a.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
          break;
        return !0;
      case "link":
        if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
          break;
        switch (a.rel) {
          case "stylesheet":
            return e = a.disabled, typeof a.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
          return !0;
    }
    return !1;
  }
  function g1(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Es = null;
  function kS() {
  }
  function NS(e, a, s) {
    if (Es === null) throw Error(i(475));
    var l = Es;
    if (a.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var f = oi(s.href), m = e.querySelector(
          Ts(f)
        );
        if (m) {
          e = m._p, e !== null && typeof e == "object" && typeof e.then == "function" && (l.count++, l = wl.bind(l), e.then(l, l)), a.state.loading |= 4, a.instance = m, ht(m);
          return;
        }
        m = e.ownerDocument || e, s = d1(s), (f = un.get(f)) && Bf(s, f), m = m.createElement("link"), ht(m);
        var b = m;
        b._p = new Promise(function(A, R) {
          b.onload = A, b.onerror = R;
        }), xt(m, "link", s), a.instance = m;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(a, e), (e = a.state.preload) && (a.state.loading & 3) === 0 && (l.count++, a = wl.bind(l), e.addEventListener("load", a), e.addEventListener("error", a));
    }
  }
  function DS() {
    if (Es === null) throw Error(i(475));
    var e = Es;
    return e.stylesheets && e.count === 0 && Uf(e, e.stylesheets), 0 < e.count ? function(a) {
      var s = setTimeout(function() {
        if (e.stylesheets && Uf(e, e.stylesheets), e.unsuspend) {
          var l = e.unsuspend;
          e.unsuspend = null, l();
        }
      }, 6e4);
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(s);
      };
    } : null;
  }
  function wl() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Uf(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var xl = null;
  function Uf(e, a) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, xl = /* @__PURE__ */ new Map(), a.forEach(OS, e), xl = null, wl.call(e));
  }
  function OS(e, a) {
    if (!(a.state.loading & 4)) {
      var s = xl.get(e);
      if (s) var l = s.get(null);
      else {
        s = /* @__PURE__ */ new Map(), xl.set(e, s);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < f.length; m++) {
          var b = f[m];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (s.set(b.dataset.precedence, b), l = b);
        }
        l && s.set(null, l);
      }
      f = a.instance, b = f.getAttribute("data-precedence"), m = s.get(b) || l, m === l && s.set(null, f), s.set(b, f), this.count++, l = wl.bind(this), f.addEventListener("load", l), f.addEventListener("error", l), m ? m.parentNode.insertBefore(f, m.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), a.state.loading |= 4;
    }
  }
  var Cs = {
    $$typeof: C,
    Provider: null,
    Consumer: null,
    _currentValue: z,
    _currentValue2: z,
    _threadCount: 0
  };
  function LS(e, a, s, l, f, m, b, A) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ou(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ou(0), this.hiddenUpdates = Ou(null), this.identifierPrefix = l, this.onUncaughtError = f, this.onCaughtError = m, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = A, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function y1(e, a, s, l, f, m, b, A, R, H, K, $) {
    return e = new LS(
      e,
      a,
      s,
      b,
      A,
      R,
      H,
      $
    ), a = 1, m === !0 && (a |= 24), m = Yt(3, null, null, a), e.current = m, m.stateNode = e, a = vc(), a.refCount++, e.pooledCache = a, a.refCount++, m.memoizedState = {
      element: l,
      isDehydrated: s,
      cache: a
    }, Sc(m), e;
  }
  function v1(e) {
    return e ? (e = jr, e) : jr;
  }
  function b1(e, a, s, l, f, m) {
    f = v1(f), l.context === null ? l.context = f : l.pendingContext = f, l = fa(a), l.payload = { element: s }, m = m === void 0 ? null : m, m !== null && (l.callback = m), s = da(e, l, a), s !== null && (Kt(s, e, a), as(s, e, a));
  }
  function w1(e, a) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < a ? s : a;
    }
  }
  function jf(e, a) {
    w1(e, a), (e = e.alternate) && w1(e, a);
  }
  function x1(e) {
    if (e.tag === 13) {
      var a = Ur(e, 67108864);
      a !== null && Kt(a, e, 67108864), jf(e, 67108864);
    }
  }
  var Sl = !0;
  function zS(e, a, s, l) {
    var f = k.T;
    k.T = null;
    var m = O.p;
    try {
      O.p = 2, Pf(e, a, s, l);
    } finally {
      O.p = m, k.T = f;
    }
  }
  function BS(e, a, s, l) {
    var f = k.T;
    k.T = null;
    var m = O.p;
    try {
      O.p = 8, Pf(e, a, s, l);
    } finally {
      O.p = m, k.T = f;
    }
  }
  function Pf(e, a, s, l) {
    if (Sl) {
      var f = Hf(l);
      if (f === null)
        Cf(
          e,
          a,
          l,
          Al,
          s
        ), A1(e, l);
      else if (US(
        f,
        e,
        a,
        s,
        l
      ))
        l.stopPropagation();
      else if (A1(e, l), a & 4 && -1 < VS.indexOf(e)) {
        for (; f !== null; ) {
          var m = Er(f);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var b = Ga(m.pendingLanes);
                  if (b !== 0) {
                    var A = m;
                    for (A.pendingLanes |= 2, A.entangledLanes |= 2; b; ) {
                      var R = 1 << 31 - qt(b);
                      A.entanglements[1] |= R, b &= ~R;
                    }
                    kn(m), (ze & 6) === 0 && (sl = Ce() + 500, ws(0));
                  }
                }
                break;
              case 13:
                A = Ur(m, 2), A !== null && Kt(A, m, 2), ll(), jf(m, 2);
            }
          if (m = Hf(l), m === null && Cf(
            e,
            a,
            l,
            Al,
            s
          ), m === f) break;
          f = m;
        }
        f !== null && l.stopPropagation();
      } else
        Cf(
          e,
          a,
          l,
          null,
          s
        );
    }
  }
  function Hf(e) {
    return e = Xu(e), qf(e);
  }
  var Al = null;
  function qf(e) {
    if (Al = null, e = Mr(e), e !== null) {
      var a = u(e);
      if (a === null) e = null;
      else {
        var s = a.tag;
        if (s === 13) {
          if (e = c(a), e !== null) return e;
          e = null;
        } else if (s === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          e = null;
        } else a !== e && (e = null);
      }
    }
    return Al = e, null;
  }
  function S1(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (qe()) {
          case ke:
            return 2;
          case Ge:
            return 8;
          case vt:
          case Mn:
            return 32;
          case ia:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Gf = !1, Ma = null, Ea = null, Ca = null, _s = /* @__PURE__ */ new Map(), Rs = /* @__PURE__ */ new Map(), _a = [], VS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function A1(e, a) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ma = null;
        break;
      case "dragenter":
      case "dragleave":
        Ea = null;
        break;
      case "mouseover":
      case "mouseout":
        Ca = null;
        break;
      case "pointerover":
      case "pointerout":
        _s.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Rs.delete(a.pointerId);
    }
  }
  function ks(e, a, s, l, f, m) {
    return e === null || e.nativeEvent !== m ? (e = {
      blockedOn: a,
      domEventName: s,
      eventSystemFlags: l,
      nativeEvent: m,
      targetContainers: [f]
    }, a !== null && (a = Er(a), a !== null && x1(a)), e) : (e.eventSystemFlags |= l, a = e.targetContainers, f !== null && a.indexOf(f) === -1 && a.push(f), e);
  }
  function US(e, a, s, l, f) {
    switch (a) {
      case "focusin":
        return Ma = ks(
          Ma,
          e,
          a,
          s,
          l,
          f
        ), !0;
      case "dragenter":
        return Ea = ks(
          Ea,
          e,
          a,
          s,
          l,
          f
        ), !0;
      case "mouseover":
        return Ca = ks(
          Ca,
          e,
          a,
          s,
          l,
          f
        ), !0;
      case "pointerover":
        var m = f.pointerId;
        return _s.set(
          m,
          ks(
            _s.get(m) || null,
            e,
            a,
            s,
            l,
            f
          )
        ), !0;
      case "gotpointercapture":
        return m = f.pointerId, Rs.set(
          m,
          ks(
            Rs.get(m) || null,
            e,
            a,
            s,
            l,
            f
          )
        ), !0;
    }
    return !1;
  }
  function T1(e) {
    var a = Mr(e.target);
    if (a !== null) {
      var s = u(a);
      if (s !== null) {
        if (a = s.tag, a === 13) {
          if (a = c(s), a !== null) {
            e.blockedOn = a, Nx(e.priority, function() {
              if (s.tag === 13) {
                var l = Wt();
                l = Lu(l);
                var f = Ur(s, l);
                f !== null && Kt(f, s, l), jf(s, l);
              }
            });
            return;
          }
        } else if (a === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Tl(e) {
    if (e.blockedOn !== null) return !1;
    for (var a = e.targetContainers; 0 < a.length; ) {
      var s = Hf(e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var l = new s.constructor(
          s.type,
          s
        );
        Yu = l, s.target.dispatchEvent(l), Yu = null;
      } else
        return a = Er(s), a !== null && x1(a), e.blockedOn = s, !1;
      a.shift();
    }
    return !0;
  }
  function M1(e, a, s) {
    Tl(e) && s.delete(a);
  }
  function jS() {
    Gf = !1, Ma !== null && Tl(Ma) && (Ma = null), Ea !== null && Tl(Ea) && (Ea = null), Ca !== null && Tl(Ca) && (Ca = null), _s.forEach(M1), Rs.forEach(M1);
  }
  function Ml(e, a) {
    e.blockedOn === a && (e.blockedOn = null, Gf || (Gf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      jS
    )));
  }
  var El = null;
  function E1(e) {
    El !== e && (El = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        El === e && (El = null);
        for (var a = 0; a < e.length; a += 3) {
          var s = e[a], l = e[a + 1], f = e[a + 2];
          if (typeof l != "function") {
            if (qf(l || s) === null)
              continue;
            break;
          }
          var m = Er(s);
          m !== null && (e.splice(a, 3), a -= 3, Hc(
            m,
            {
              pending: !0,
              data: f,
              method: s.method,
              action: l
            },
            l,
            f
          ));
        }
      }
    ));
  }
  function Ns(e) {
    function a(R) {
      return Ml(R, e);
    }
    Ma !== null && Ml(Ma, e), Ea !== null && Ml(Ea, e), Ca !== null && Ml(Ca, e), _s.forEach(a), Rs.forEach(a);
    for (var s = 0; s < _a.length; s++) {
      var l = _a[s];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < _a.length && (s = _a[0], s.blockedOn === null); )
      T1(s), s.blockedOn === null && _a.shift();
    if (s = (e.ownerDocument || e).$$reactFormReplay, s != null)
      for (l = 0; l < s.length; l += 3) {
        var f = s[l], m = s[l + 1], b = f[Ot] || null;
        if (typeof m == "function")
          b || E1(s);
        else if (b) {
          var A = null;
          if (m && m.hasAttribute("formAction")) {
            if (f = m, b = m[Ot] || null)
              A = b.formAction;
            else if (qf(f) !== null) continue;
          } else A = b.action;
          typeof A == "function" ? s[l + 1] = A : (s.splice(l, 3), l -= 3), E1(s);
        }
      }
  }
  function Yf(e) {
    this._internalRoot = e;
  }
  Cl.prototype.render = Yf.prototype.render = function(e) {
    var a = this._internalRoot;
    if (a === null) throw Error(i(409));
    var s = a.current, l = Wt();
    b1(s, l, e, a, null, null);
  }, Cl.prototype.unmount = Yf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var a = e.containerInfo;
      b1(e.current, 2, null, e, null, null), ll(), a[Tr] = null;
    }
  };
  function Cl(e) {
    this._internalRoot = e;
  }
  Cl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var a = G0();
      e = { blockedOn: null, target: e, priority: a };
      for (var s = 0; s < _a.length && a !== 0 && a < _a[s].priority; s++) ;
      _a.splice(s, 0, e), s === 0 && T1(e);
    }
  };
  var C1 = n.version;
  if (C1 !== "19.1.0")
    throw Error(
      i(
        527,
        C1,
        "19.1.0"
      )
    );
  O.findDOMNode = function(e) {
    var a = e._reactInternals;
    if (a === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = d(a), e = e !== null ? p(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var PS = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: k,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _l = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_l.isDisabled && _l.supportsFiber)
      try {
        qa = _l.inject(
          PS
        ), Ht = _l;
      } catch {
      }
  }
  return Os.createRoot = function(e, a) {
    if (!o(e)) throw Error(i(299));
    var s = !1, l = "", f = Gm, m = Ym, b = Xm, A = null;
    return a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (l = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (m = a.onCaughtError), a.onRecoverableError !== void 0 && (b = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (A = a.unstable_transitionCallbacks)), a = y1(
      e,
      1,
      !1,
      null,
      null,
      s,
      l,
      f,
      m,
      b,
      A,
      null
    ), e[Tr] = a.current, Ef(e), new Yf(a);
  }, Os.hydrateRoot = function(e, a, s) {
    if (!o(e)) throw Error(i(299));
    var l = !1, f = "", m = Gm, b = Ym, A = Xm, R = null, H = null;
    return s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (f = s.identifierPrefix), s.onUncaughtError !== void 0 && (m = s.onUncaughtError), s.onCaughtError !== void 0 && (b = s.onCaughtError), s.onRecoverableError !== void 0 && (A = s.onRecoverableError), s.unstable_transitionCallbacks !== void 0 && (R = s.unstable_transitionCallbacks), s.formState !== void 0 && (H = s.formState)), a = y1(
      e,
      1,
      !0,
      a,
      s ?? null,
      l,
      f,
      m,
      b,
      A,
      R,
      H
    ), a.context = v1(null), s = a.current, l = Wt(), l = Lu(l), f = fa(l), f.callback = null, da(s, f, l), s = l, a.current.lanes = s, Vi(a, s), kn(a), e[Tr] = a.current, Ef(e), new Cl(a);
  }, Os.version = "19.1.0", Os;
}
var V1;
function $S() {
  if (V1) return Zf.exports;
  V1 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (n) {
        console.error(n);
      }
  }
  return t(), Zf.exports = FS(), Zf.exports;
}
var JS = $S(), W = mu();
const Nh = W.createContext({});
function Dh(t) {
  const n = W.useRef(null);
  return n.current === null && (n.current = t()), n.current;
}
const Oh = typeof window < "u", Yb = Oh ? W.useLayoutEffect : W.useEffect, gu = /* @__PURE__ */ W.createContext(null);
function Lh(t, n) {
  t.indexOf(n) === -1 && t.push(n);
}
function zh(t, n) {
  const r = t.indexOf(n);
  r > -1 && t.splice(r, 1);
}
const ea = (t, n, r) => r > n ? n : r < t ? t : r;
let Bh = () => {
};
const ta = {}, Xb = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function Ib(t) {
  return typeof t == "object" && t !== null;
}
const Zb = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function Vh(t) {
  let n;
  return () => (n === void 0 && (n = t()), n);
}
const pn = /* @__NO_SIDE_EFFECTS__ */ (t) => t, eA = (t, n) => (r) => n(t(r)), ro = (...t) => t.reduce(eA), Is = /* @__NO_SIDE_EFFECTS__ */ (t, n, r) => {
  const i = n - t;
  return i === 0 ? 1 : (r - t) / i;
};
class Uh {
  constructor() {
    this.subscriptions = [];
  }
  add(n) {
    return Lh(this.subscriptions, n), () => zh(this.subscriptions, n);
  }
  notify(n, r, i) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](n, r, i);
      else
        for (let u = 0; u < o; u++) {
          const c = this.subscriptions[u];
          c && c(n, r, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const On = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, Ln = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function Wb(t, n) {
  return n ? t * (1e3 / n) : 0;
}
const Kb = (t, n, r) => (((1 - 3 * r + 3 * n) * t + (3 * r - 6 * n)) * t + 3 * n) * t, tA = 1e-7, nA = 12;
function aA(t, n, r, i, o) {
  let u, c, h = 0;
  do
    c = n + (r - n) / 2, u = Kb(c, i, o) - t, u > 0 ? r = c : n = c;
  while (Math.abs(u) > tA && ++h < nA);
  return c;
}
function io(t, n, r, i) {
  if (t === n && r === i)
    return pn;
  const o = (u) => aA(u, 0, 1, t, r);
  return (u) => u === 0 || u === 1 ? u : Kb(o(u), n, i);
}
const Qb = (t) => (n) => n <= 0.5 ? t(2 * n) / 2 : (2 - t(2 * (1 - n))) / 2, Fb = (t) => (n) => 1 - t(1 - n), $b = /* @__PURE__ */ io(0.33, 1.53, 0.69, 0.99), jh = /* @__PURE__ */ Fb($b), Jb = /* @__PURE__ */ Qb(jh), ew = (t) => (t *= 2) < 1 ? 0.5 * jh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Ph = (t) => 1 - Math.sin(Math.acos(t)), tw = Fb(Ph), nw = Qb(Ph), rA = /* @__PURE__ */ io(0.42, 0, 1, 1), iA = /* @__PURE__ */ io(0, 0, 0.58, 1), aw = /* @__PURE__ */ io(0.42, 0, 0.58, 1), sA = (t) => Array.isArray(t) && typeof t[0] != "number", rw = (t) => Array.isArray(t) && typeof t[0] == "number", oA = {
  linear: pn,
  easeIn: rA,
  easeInOut: aw,
  easeOut: iA,
  circIn: Ph,
  circInOut: nw,
  circOut: tw,
  backIn: jh,
  backInOut: Jb,
  backOut: $b,
  anticipate: ew
}, lA = (t) => typeof t == "string", U1 = (t) => {
  if (rw(t)) {
    Bh(t.length === 4);
    const [n, r, i, o] = t;
    return io(n, r, i, o);
  } else if (lA(t))
    return oA[t];
  return t;
}, Rl = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
], j1 = {
  value: null
};
function uA(t, n) {
  let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const c = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = 0;
  function p(y) {
    c.has(y) && (g.schedule(y), t()), d++, y(h);
  }
  const g = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (y, v = !1, w = !1) => {
      const S = w && o ? r : i;
      return v && c.add(y), S.has(y) || S.add(y), y;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (y) => {
      i.delete(y), c.delete(y);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (y) => {
      if (h = y, o) {
        u = !0;
        return;
      }
      o = !0, [r, i] = [i, r], r.forEach(p), n && j1.value && j1.value.frameloop[n].push(d), d = 0, r.clear(), o = !1, u && (u = !1, g.process(y));
    }
  };
  return g;
}
const cA = 40;
function iw(t, n) {
  let r = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => r = !0, c = Rl.reduce((C, X) => (C[X] = uA(u, n ? X : void 0), C), {}), { setup: h, read: d, resolveKeyframes: p, preUpdate: g, update: y, preRender: v, render: w, postRender: x } = c, S = () => {
    const C = ta.useManualTiming ? o.timestamp : performance.now();
    r = !1, ta.useManualTiming || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(C - o.timestamp, cA), 1)), o.timestamp = C, o.isProcessing = !0, h.process(o), d.process(o), p.process(o), g.process(o), y.process(o), v.process(o), w.process(o), x.process(o), o.isProcessing = !1, r && n && (i = !1, t(S));
  }, T = () => {
    r = !0, i = !0, o.isProcessing || t(S);
  };
  return { schedule: Rl.reduce((C, X) => {
    const D = c[X];
    return C[X] = (U, P = !1, _ = !1) => (r || T(), D.schedule(U, P, _)), C;
  }, {}), cancel: (C) => {
    for (let X = 0; X < Rl.length; X++)
      c[Rl[X]].cancel(C);
  }, state: o, steps: c };
}
const { schedule: Ie, cancel: La, state: St, steps: $f } = /* @__PURE__ */ iw(typeof requestAnimationFrame < "u" ? requestAnimationFrame : pn, !0);
let Il;
function fA() {
  Il = void 0;
}
const jt = {
  now: () => (Il === void 0 && jt.set(St.isProcessing || ta.useManualTiming ? St.timestamp : performance.now()), Il),
  set: (t) => {
    Il = t, queueMicrotask(fA);
  }
}, sw = (t) => (n) => typeof n == "string" && n.startsWith(t), Hh = /* @__PURE__ */ sw("--"), dA = /* @__PURE__ */ sw("var(--"), qh = (t) => dA(t) ? hA.test(t.split("/*")[0].trim()) : !1, hA = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, _i = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Zs = {
  ..._i,
  transform: (t) => ea(0, 1, t)
}, kl = {
  ..._i,
  default: 1
}, Ps = (t) => Math.round(t * 1e5) / 1e5, Gh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function pA(t) {
  return t == null;
}
const mA = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Yh = (t, n) => (r) => !!(typeof r == "string" && mA.test(r) && r.startsWith(t) || n && !pA(r) && Object.prototype.hasOwnProperty.call(r, n)), ow = (t, n, r) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, c, h] = i.match(Gh);
  return {
    [t]: parseFloat(o),
    [n]: parseFloat(u),
    [r]: parseFloat(c),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, gA = (t) => ea(0, 255, t), Jf = {
  ..._i,
  transform: (t) => Math.round(gA(t))
}, fr = {
  test: /* @__PURE__ */ Yh("rgb", "red"),
  parse: /* @__PURE__ */ ow("red", "green", "blue"),
  transform: ({ red: t, green: n, blue: r, alpha: i = 1 }) => "rgba(" + Jf.transform(t) + ", " + Jf.transform(n) + ", " + Jf.transform(r) + ", " + Ps(Zs.transform(i)) + ")"
};
function yA(t) {
  let n = "", r = "", i = "", o = "";
  return t.length > 5 ? (n = t.substring(1, 3), r = t.substring(3, 5), i = t.substring(5, 7), o = t.substring(7, 9)) : (n = t.substring(1, 2), r = t.substring(2, 3), i = t.substring(3, 4), o = t.substring(4, 5), n += n, r += r, i += i, o += o), {
    red: parseInt(n, 16),
    green: parseInt(r, 16),
    blue: parseInt(i, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const qd = {
  test: /* @__PURE__ */ Yh("#"),
  parse: yA,
  transform: fr.transform
}, so = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (n) => typeof n == "string" && n.endsWith(t) && n.split(" ").length === 1,
  parse: parseFloat,
  transform: (n) => `${n}${t}`
}), Na = /* @__PURE__ */ so("deg"), zn = /* @__PURE__ */ so("%"), we = /* @__PURE__ */ so("px"), vA = /* @__PURE__ */ so("vh"), bA = /* @__PURE__ */ so("vw"), P1 = {
  ...zn,
  parse: (t) => zn.parse(t) / 100,
  transform: (t) => zn.transform(t * 100)
}, pi = {
  test: /* @__PURE__ */ Yh("hsl", "hue"),
  parse: /* @__PURE__ */ ow("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: n, lightness: r, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + zn.transform(Ps(n)) + ", " + zn.transform(Ps(r)) + ", " + Ps(Zs.transform(i)) + ")"
}, st = {
  test: (t) => fr.test(t) || qd.test(t) || pi.test(t),
  parse: (t) => fr.test(t) ? fr.parse(t) : pi.test(t) ? pi.parse(t) : qd.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? fr.transform(t) : pi.transform(t),
  getAnimatableNone: (t) => {
    const n = st.parse(t);
    return n.alpha = 0, st.transform(n);
  }
}, wA = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function xA(t) {
  var n, r;
  return isNaN(t) && typeof t == "string" && (((n = t.match(Gh)) == null ? void 0 : n.length) || 0) + (((r = t.match(wA)) == null ? void 0 : r.length) || 0) > 0;
}
const lw = "number", uw = "color", SA = "var", AA = "var(", H1 = "${}", TA = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ws(t) {
  const n = t.toString(), r = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const h = n.replace(TA, (d) => (st.test(d) ? (i.color.push(u), o.push(uw), r.push(st.parse(d))) : d.startsWith(AA) ? (i.var.push(u), o.push(SA), r.push(d)) : (i.number.push(u), o.push(lw), r.push(parseFloat(d))), ++u, H1)).split(H1);
  return { values: r, split: h, indexes: i, types: o };
}
function cw(t) {
  return Ws(t).values;
}
function fw(t) {
  const { split: n, types: r } = Ws(t), i = n.length;
  return (o) => {
    let u = "";
    for (let c = 0; c < i; c++)
      if (u += n[c], o[c] !== void 0) {
        const h = r[c];
        h === lw ? u += Ps(o[c]) : h === uw ? u += st.transform(o[c]) : u += o[c];
      }
    return u;
  };
}
const MA = (t) => typeof t == "number" ? 0 : st.test(t) ? st.getAnimatableNone(t) : t;
function EA(t) {
  const n = cw(t);
  return fw(t)(n.map(MA));
}
const za = {
  test: xA,
  parse: cw,
  createTransformer: fw,
  getAnimatableNone: EA
};
function ed(t, n, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
}
function CA({ hue: t, saturation: n, lightness: r, alpha: i }) {
  t /= 360, n /= 100, r /= 100;
  let o = 0, u = 0, c = 0;
  if (!n)
    o = u = c = r;
  else {
    const h = r < 0.5 ? r * (1 + n) : r + n - r * n, d = 2 * r - h;
    o = ed(d, h, t + 1 / 3), u = ed(d, h, t), c = ed(d, h, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(c * 255),
    alpha: i
  };
}
function $l(t, n) {
  return (r) => r > 0 ? n : t;
}
const Qe = (t, n, r) => t + (n - t) * r, td = (t, n, r) => {
  const i = t * t, o = r * (n * n - i) + i;
  return o < 0 ? 0 : Math.sqrt(o);
}, _A = [qd, fr, pi], RA = (t) => _A.find((n) => n.test(t));
function q1(t) {
  const n = RA(t);
  if (!n)
    return !1;
  let r = n.parse(t);
  return n === pi && (r = CA(r)), r;
}
const G1 = (t, n) => {
  const r = q1(t), i = q1(n);
  if (!r || !i)
    return $l(t, n);
  const o = { ...r };
  return (u) => (o.red = td(r.red, i.red, u), o.green = td(r.green, i.green, u), o.blue = td(r.blue, i.blue, u), o.alpha = Qe(r.alpha, i.alpha, u), fr.transform(o));
}, Gd = /* @__PURE__ */ new Set(["none", "hidden"]);
function kA(t, n) {
  return Gd.has(t) ? (r) => r <= 0 ? t : n : (r) => r >= 1 ? n : t;
}
function NA(t, n) {
  return (r) => Qe(t, n, r);
}
function Xh(t) {
  return typeof t == "number" ? NA : typeof t == "string" ? qh(t) ? $l : st.test(t) ? G1 : LA : Array.isArray(t) ? dw : typeof t == "object" ? st.test(t) ? G1 : DA : $l;
}
function dw(t, n) {
  const r = [...t], i = r.length, o = t.map((u, c) => Xh(u)(u, n[c]));
  return (u) => {
    for (let c = 0; c < i; c++)
      r[c] = o[c](u);
    return r;
  };
}
function DA(t, n) {
  const r = { ...t, ...n }, i = {};
  for (const o in r)
    t[o] !== void 0 && n[o] !== void 0 && (i[o] = Xh(t[o])(t[o], n[o]));
  return (o) => {
    for (const u in i)
      r[u] = i[u](o);
    return r;
  };
}
function OA(t, n) {
  const r = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < n.values.length; o++) {
    const u = n.types[o], c = t.indexes[u][i[u]], h = t.values[c] ?? 0;
    r[o] = h, i[u]++;
  }
  return r;
}
const LA = (t, n) => {
  const r = za.createTransformer(n), i = Ws(t), o = Ws(n);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? Gd.has(t) && !o.values.length || Gd.has(n) && !i.values.length ? kA(t, n) : ro(dw(OA(i, o), o.values), r) : $l(t, n);
};
function hw(t, n, r) {
  return typeof t == "number" && typeof n == "number" && typeof r == "number" ? Qe(t, n, r) : Xh(t)(t, n);
}
const zA = (t) => {
  const n = ({ timestamp: r }) => t(r);
  return {
    start: (r = !0) => Ie.update(n, r),
    stop: () => La(n),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => St.isProcessing ? St.timestamp : jt.now()
  };
}, pw = (t, n, r = 10) => {
  let i = "";
  const o = Math.max(Math.round(n / r), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Jl = 2e4;
function Ih(t) {
  let n = 0;
  const r = 50;
  let i = t.next(n);
  for (; !i.done && n < Jl; )
    n += r, i = t.next(n);
  return n >= Jl ? 1 / 0 : n;
}
function BA(t, n = 100, r) {
  const i = r({ ...t, keyframes: [0, n] }), o = Math.min(Ih(i), Jl);
  return {
    type: "keyframes",
    ease: (u) => i.next(o * u).value / n,
    duration: /* @__PURE__ */ Ln(o)
  };
}
const VA = 5;
function mw(t, n, r) {
  const i = Math.max(n - VA, 0);
  return Wb(r - t(i), n - i);
}
const Je = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, nd = 1e-3;
function UA({ duration: t = Je.duration, bounce: n = Je.bounce, velocity: r = Je.velocity, mass: i = Je.mass }) {
  let o, u, c = 1 - n;
  c = ea(Je.minDamping, Je.maxDamping, c), t = ea(Je.minDuration, Je.maxDuration, /* @__PURE__ */ Ln(t)), c < 1 ? (o = (p) => {
    const g = p * c, y = g * t, v = g - r, w = Yd(p, c), x = Math.exp(-y);
    return nd - v / w * x;
  }, u = (p) => {
    const y = p * c * t, v = y * r + r, w = Math.pow(c, 2) * Math.pow(p, 2) * t, x = Math.exp(-y), S = Yd(Math.pow(p, 2), c);
    return (-o(p) + nd > 0 ? -1 : 1) * ((v - w) * x) / S;
  }) : (o = (p) => {
    const g = Math.exp(-p * t), y = (p - r) * t + 1;
    return -nd + g * y;
  }, u = (p) => {
    const g = Math.exp(-p * t), y = (r - p) * (t * t);
    return g * y;
  });
  const h = 5 / t, d = PA(o, u, h);
  if (t = /* @__PURE__ */ On(t), isNaN(d))
    return {
      stiffness: Je.stiffness,
      damping: Je.damping,
      duration: t
    };
  {
    const p = Math.pow(d, 2) * i;
    return {
      stiffness: p,
      damping: c * 2 * Math.sqrt(i * p),
      duration: t
    };
  }
}
const jA = 12;
function PA(t, n, r) {
  let i = r;
  for (let o = 1; o < jA; o++)
    i = i - t(i) / n(i);
  return i;
}
function Yd(t, n) {
  return t * Math.sqrt(1 - n * n);
}
const HA = ["duration", "bounce"], qA = ["stiffness", "damping", "mass"];
function Y1(t, n) {
  return n.some((r) => t[r] !== void 0);
}
function GA(t) {
  let n = {
    velocity: Je.velocity,
    stiffness: Je.stiffness,
    damping: Je.damping,
    mass: Je.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Y1(t, qA) && Y1(t, HA))
    if (t.visualDuration) {
      const r = t.visualDuration, i = 2 * Math.PI / (r * 1.2), o = i * i, u = 2 * ea(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      n = {
        ...n,
        mass: Je.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const r = UA(t);
      n = {
        ...n,
        ...r,
        mass: Je.mass
      }, n.isResolvedFromDuration = !0;
    }
  return n;
}
function eu(t = Je.visualDuration, n = Je.bounce) {
  const r = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: n
  } : t;
  let { restSpeed: i, restDelta: o } = r;
  const u = r.keyframes[0], c = r.keyframes[r.keyframes.length - 1], h = { done: !1, value: u }, { stiffness: d, damping: p, mass: g, duration: y, velocity: v, isResolvedFromDuration: w } = GA({
    ...r,
    velocity: -/* @__PURE__ */ Ln(r.velocity || 0)
  }), x = v || 0, S = p / (2 * Math.sqrt(d * g)), T = c - u, E = /* @__PURE__ */ Ln(Math.sqrt(d / g)), N = Math.abs(T) < 5;
  i || (i = N ? Je.restSpeed.granular : Je.restSpeed.default), o || (o = N ? Je.restDelta.granular : Je.restDelta.default);
  let C;
  if (S < 1) {
    const D = Yd(E, S);
    C = (U) => {
      const P = Math.exp(-S * E * U);
      return c - P * ((x + S * E * T) / D * Math.sin(D * U) + T * Math.cos(D * U));
    };
  } else if (S === 1)
    C = (D) => c - Math.exp(-E * D) * (T + (x + E * T) * D);
  else {
    const D = E * Math.sqrt(S * S - 1);
    C = (U) => {
      const P = Math.exp(-S * E * U), _ = Math.min(D * U, 300);
      return c - P * ((x + S * E * T) * Math.sinh(_) + D * T * Math.cosh(_)) / D;
    };
  }
  const X = {
    calculatedDuration: w && y || null,
    next: (D) => {
      const U = C(D);
      if (w)
        h.done = D >= y;
      else {
        let P = D === 0 ? x : 0;
        S < 1 && (P = D === 0 ? /* @__PURE__ */ On(x) : mw(C, D, U));
        const _ = Math.abs(P) <= i, F = Math.abs(c - U) <= o;
        h.done = _ && F;
      }
      return h.value = h.done ? c : U, h;
    },
    toString: () => {
      const D = Math.min(Ih(X), Jl), U = pw((P) => X.next(D * P).value, D, 30);
      return D + "ms " + U;
    },
    toTransition: () => {
    }
  };
  return X;
}
eu.applyToOptions = (t) => {
  const n = BA(t, 100, eu);
  return t.ease = n.ease, t.duration = /* @__PURE__ */ On(n.duration), t.type = "keyframes", t;
};
function Xd({ keyframes: t, velocity: n = 0, power: r = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: c, min: h, max: d, restDelta: p = 0.5, restSpeed: g }) {
  const y = t[0], v = {
    done: !1,
    value: y
  }, w = (_) => h !== void 0 && _ < h || d !== void 0 && _ > d, x = (_) => h === void 0 ? d : d === void 0 || Math.abs(h - _) < Math.abs(d - _) ? h : d;
  let S = r * n;
  const T = y + S, E = c === void 0 ? T : c(T);
  E !== T && (S = E - y);
  const N = (_) => -S * Math.exp(-_ / i), C = (_) => E + N(_), X = (_) => {
    const F = N(_), ae = C(_);
    v.done = Math.abs(F) <= p, v.value = v.done ? E : ae;
  };
  let D, U;
  const P = (_) => {
    w(v.value) && (D = _, U = eu({
      keyframes: [v.value, x(v.value)],
      velocity: mw(C, _, v.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: g
    }));
  };
  return P(0), {
    calculatedDuration: null,
    next: (_) => {
      let F = !1;
      return !U && D === void 0 && (F = !0, X(_), P(_)), D !== void 0 && _ >= D ? U.next(_ - D) : (!F && X(_), v);
    }
  };
}
function YA(t, n, r) {
  const i = [], o = r || ta.mix || hw, u = t.length - 1;
  for (let c = 0; c < u; c++) {
    let h = o(t[c], t[c + 1]);
    if (n) {
      const d = Array.isArray(n) ? n[c] || pn : n;
      h = ro(d, h);
    }
    i.push(h);
  }
  return i;
}
function XA(t, n, { clamp: r = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Bh(u === n.length), u === 1)
    return () => n[0];
  if (u === 2 && n[0] === n[1])
    return () => n[1];
  const c = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), n = [...n].reverse());
  const h = YA(n, i, o), d = h.length, p = (g) => {
    if (c && g < t[0])
      return n[0];
    let y = 0;
    if (d > 1)
      for (; y < t.length - 2 && !(g < t[y + 1]); y++)
        ;
    const v = /* @__PURE__ */ Is(t[y], t[y + 1], g);
    return h[y](v);
  };
  return r ? (g) => p(ea(t[0], t[u - 1], g)) : p;
}
function IA(t, n) {
  const r = t[t.length - 1];
  for (let i = 1; i <= n; i++) {
    const o = /* @__PURE__ */ Is(0, n, i);
    t.push(Qe(r, 1, o));
  }
}
function ZA(t) {
  const n = [0];
  return IA(n, t.length - 1), n;
}
function WA(t, n) {
  return t.map((r) => r * n);
}
function KA(t, n) {
  return t.map(() => n || aw).splice(0, t.length - 1);
}
function Hs({ duration: t = 300, keyframes: n, times: r, ease: i = "easeInOut" }) {
  const o = sA(i) ? i.map(U1) : U1(i), u = {
    done: !1,
    value: n[0]
  }, c = WA(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === n.length ? r : ZA(n),
    t
  ), h = XA(c, n, {
    ease: Array.isArray(o) ? o : KA(n, o)
  });
  return {
    calculatedDuration: t,
    next: (d) => (u.value = h(d), u.done = d >= t, u)
  };
}
const QA = (t) => t !== null;
function Zh(t, { repeat: n, repeatType: r = "loop" }, i, o = 1) {
  const u = t.filter(QA), h = o < 0 || n && r !== "loop" && n % 2 === 1 ? 0 : u.length - 1;
  return !h || i === void 0 ? u[h] : i;
}
const FA = {
  decay: Xd,
  inertia: Xd,
  tween: Hs,
  keyframes: Hs,
  spring: eu
};
function gw(t) {
  typeof t.type == "string" && (t.type = FA[t.type]);
}
class Wh {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((n) => {
      this.resolve = n;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(n, r) {
    return this.finished.then(n, r);
  }
}
const $A = (t) => t / 100;
class Kh extends Wh {
  constructor(n) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var i, o;
      const { motionValue: r } = this.options;
      r && r.updatedAt !== jt.now() && this.tick(jt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (o = (i = this.options).onStop) == null || o.call(i));
    }, this.options = n, this.initAnimation(), this.play(), n.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: n } = this;
    gw(n);
    const { type: r = Hs, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: c = 0 } = n;
    let { keyframes: h } = n;
    const d = r || Hs;
    d !== Hs && typeof h[0] != "number" && (this.mixKeyframes = ro($A, hw(h[0], h[1])), h = [0, 100]);
    const p = d({ ...n, keyframes: h });
    u === "mirror" && (this.mirroredGenerator = d({
      ...n,
      keyframes: [...h].reverse(),
      velocity: -c
    })), p.calculatedDuration === null && (p.calculatedDuration = Ih(p));
    const { calculatedDuration: g } = p;
    this.calculatedDuration = g, this.resolvedDuration = g + o, this.totalDuration = this.resolvedDuration * (i + 1) - o, this.generator = p;
  }
  updateTime(n) {
    const r = Math.round(n - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(n, r = !1) {
    const { generator: i, totalDuration: o, mixKeyframes: u, mirroredGenerator: c, resolvedDuration: h, calculatedDuration: d } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: p = 0, keyframes: g, repeat: y, repeatType: v, repeatDelay: w, type: x, onUpdate: S, finalKeyframe: T } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, n) : this.speed < 0 && (this.startTime = Math.min(n - o / this.speed, this.startTime)), r ? this.currentTime = n : this.updateTime(n);
    const E = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), N = this.playbackSpeed >= 0 ? E < 0 : E > o;
    this.currentTime = Math.max(E, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let C = this.currentTime, X = i;
    if (y) {
      const _ = Math.min(this.currentTime, o) / h;
      let F = Math.floor(_), ae = _ % 1;
      !ae && _ >= 1 && (ae = 1), ae === 1 && F--, F = Math.min(F, y + 1), !!(F % 2) && (v === "reverse" ? (ae = 1 - ae, w && (ae -= w / h)) : v === "mirror" && (X = c)), C = ea(0, 1, ae) * h;
    }
    const D = N ? { done: !1, value: g[0] } : X.next(C);
    u && (D.value = u(D.value));
    let { done: U } = D;
    !N && d !== null && (U = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const P = this.holdTime === null && (this.state === "finished" || this.state === "running" && U);
    return P && x !== Xd && (D.value = Zh(g, this.options, T, this.speed)), S && S(D.value), P && this.finish(), D;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(n, r) {
    return this.finished.then(n, r);
  }
  get duration() {
    return /* @__PURE__ */ Ln(this.calculatedDuration);
  }
  get time() {
    return /* @__PURE__ */ Ln(this.currentTime);
  }
  set time(n) {
    var r;
    n = /* @__PURE__ */ On(n), this.currentTime = n, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = n : this.driver && (this.startTime = this.driver.now() - n / this.playbackSpeed), (r = this.driver) == null || r.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(n) {
    this.updateTime(jt.now());
    const r = this.playbackSpeed !== n;
    this.playbackSpeed = n, r && (this.time = /* @__PURE__ */ Ln(this.currentTime));
  }
  play() {
    var o, u;
    if (this.isStopped)
      return;
    const { driver: n = zA, startTime: r } = this.options;
    this.driver || (this.driver = n((c) => this.tick(c))), (u = (o = this.options).onPlay) == null || u.call(o);
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = r ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(jt.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var n, r;
    this.notifyFinished(), this.teardown(), this.state = "finished", (r = (n = this.options).onComplete) == null || r.call(n);
  }
  cancel() {
    var n, r;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (r = (n = this.options).onCancel) == null || r.call(n);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(n) {
    return this.startTime = 0, this.tick(n, !0);
  }
  attachTimeline(n) {
    var r;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (r = this.driver) == null || r.stop(), n.observe(this);
  }
}
function JA(t) {
  for (let n = 1; n < t.length; n++)
    t[n] ?? (t[n] = t[n - 1]);
}
const dr = (t) => t * 180 / Math.PI, Id = (t) => {
  const n = dr(Math.atan2(t[1], t[0]));
  return Zd(n);
}, eT = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Id,
  rotateZ: Id,
  skewX: (t) => dr(Math.atan(t[1])),
  skewY: (t) => dr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Zd = (t) => (t = t % 360, t < 0 && (t += 360), t), X1 = Id, I1 = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Z1 = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), tT = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: I1,
  scaleY: Z1,
  scale: (t) => (I1(t) + Z1(t)) / 2,
  rotateX: (t) => Zd(dr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Zd(dr(Math.atan2(-t[2], t[0]))),
  rotateZ: X1,
  rotate: X1,
  skewX: (t) => dr(Math.atan(t[4])),
  skewY: (t) => dr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Wd(t) {
  return t.includes("scale") ? 1 : 0;
}
function Kd(t, n) {
  if (!t || t === "none")
    return Wd(n);
  const r = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, o;
  if (r)
    i = tT, o = r;
  else {
    const h = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = eT, o = h;
  }
  if (!o)
    return Wd(n);
  const u = i[n], c = o[1].split(",").map(aT);
  return typeof u == "function" ? u(c) : c[u];
}
const nT = (t, n) => {
  const { transform: r = "none" } = getComputedStyle(t);
  return Kd(r, n);
};
function aT(t) {
  return parseFloat(t.trim());
}
const Ri = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], ki = new Set(Ri), W1 = (t) => t === _i || t === we, rT = /* @__PURE__ */ new Set(["x", "y", "z"]), iT = Ri.filter((t) => !rT.has(t));
function sT(t) {
  const n = [];
  return iT.forEach((r) => {
    const i = t.getValue(r);
    i !== void 0 && (n.push([r, i.get()]), i.set(r.startsWith("scale") ? 1 : 0));
  }), n;
}
const mr = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: n = "0", paddingRight: r = "0" }) => t.max - t.min - parseFloat(n) - parseFloat(r),
  height: ({ y: t }, { paddingTop: n = "0", paddingBottom: r = "0" }) => t.max - t.min - parseFloat(n) - parseFloat(r),
  top: (t, { top: n }) => parseFloat(n),
  left: (t, { left: n }) => parseFloat(n),
  bottom: ({ y: t }, { top: n }) => parseFloat(n) + (t.max - t.min),
  right: ({ x: t }, { left: n }) => parseFloat(n) + (t.max - t.min),
  // Transform
  x: (t, { transform: n }) => Kd(n, "x"),
  y: (t, { transform: n }) => Kd(n, "y")
};
mr.translateX = mr.x;
mr.translateY = mr.y;
const gr = /* @__PURE__ */ new Set();
let Qd = !1, Fd = !1, $d = !1;
function yw() {
  if (Fd) {
    const t = Array.from(gr).filter((i) => i.needsMeasurement), n = new Set(t.map((i) => i.element)), r = /* @__PURE__ */ new Map();
    n.forEach((i) => {
      const o = sT(i);
      o.length && (r.set(i, o), i.render());
    }), t.forEach((i) => i.measureInitialState()), n.forEach((i) => {
      i.render();
      const o = r.get(i);
      o && o.forEach(([u, c]) => {
        var h;
        (h = i.getValue(u)) == null || h.set(c);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  Fd = !1, Qd = !1, gr.forEach((t) => t.complete($d)), gr.clear();
}
function vw() {
  gr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Fd = !0);
  });
}
function oT() {
  $d = !0, vw(), yw(), $d = !1;
}
class Qh {
  constructor(n, r, i, o, u, c = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...n], this.onComplete = r, this.name = i, this.motionValue = o, this.element = u, this.isAsync = c;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (gr.add(this), Qd || (Qd = !0, Ie.read(vw), Ie.resolveKeyframes(yw))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: n, name: r, element: i, motionValue: o } = this;
    if (n[0] === null) {
      const u = o == null ? void 0 : o.get(), c = n[n.length - 1];
      if (u !== void 0)
        n[0] = u;
      else if (i && r) {
        const h = i.readValue(r, c);
        h != null && (n[0] = h);
      }
      n[0] === void 0 && (n[0] = c), o && u === void 0 && o.set(n[0]);
    }
    JA(n);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(n = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, n), gr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (gr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const lT = (t) => t.startsWith("--");
function uT(t, n, r) {
  lT(n) ? t.style.setProperty(n, r) : t.style[n] = r;
}
const cT = /* @__PURE__ */ Vh(() => window.ScrollTimeline !== void 0), fT = {};
function dT(t, n) {
  const r = /* @__PURE__ */ Vh(t);
  return () => fT[n] ?? r();
}
const bw = /* @__PURE__ */ dT(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Us = ([t, n, r, i]) => `cubic-bezier(${t}, ${n}, ${r}, ${i})`, K1 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Us([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Us([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Us([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Us([0.33, 1.53, 0.69, 0.99])
};
function ww(t, n) {
  if (t)
    return typeof t == "function" ? bw() ? pw(t, n) : "ease-out" : rw(t) ? Us(t) : Array.isArray(t) ? t.map((r) => ww(r, n) || K1.easeOut) : K1[t];
}
function hT(t, n, r, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: c = "loop", ease: h = "easeOut", times: d } = {}, p = void 0) {
  const g = {
    [n]: r
  };
  d && (g.offset = d);
  const y = ww(h, o);
  Array.isArray(y) && (g.easing = y);
  const v = {
    delay: i,
    duration: o,
    easing: Array.isArray(y) ? "linear" : y,
    fill: "both",
    iterations: u + 1,
    direction: c === "reverse" ? "alternate" : "normal"
  };
  return p && (v.pseudoElement = p), t.animate(g, v);
}
function xw(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function pT({ type: t, ...n }) {
  return xw(t) && bw() ? t.applyToOptions(n) : (n.duration ?? (n.duration = 300), n.ease ?? (n.ease = "easeOut"), n);
}
class mT extends Wh {
  constructor(n) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !n)
      return;
    const { element: r, name: i, keyframes: o, pseudoElement: u, allowFlatten: c = !1, finalKeyframe: h, onComplete: d } = n;
    this.isPseudoElement = !!u, this.allowFlatten = c, this.options = n, Bh(typeof n.type != "string");
    const p = pT(n);
    this.animation = hT(r, i, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const g = Zh(o, this.options, h, this.speed);
        this.updateMotionValue ? this.updateMotionValue(g) : uT(r, i, g), this.animation.cancel();
      }
      d == null || d(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var n, r;
    (r = (n = this.animation).finish) == null || r.call(n);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: n } = this;
    n === "idle" || n === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var n, r;
    this.isPseudoElement || (r = (n = this.animation).commitStyles) == null || r.call(n);
  }
  get duration() {
    var r, i;
    const n = ((i = (r = this.animation.effect) == null ? void 0 : r.getComputedTiming) == null ? void 0 : i.call(r).duration) || 0;
    return /* @__PURE__ */ Ln(Number(n));
  }
  get time() {
    return /* @__PURE__ */ Ln(Number(this.animation.currentTime) || 0);
  }
  set time(n) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ On(n);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(n) {
    n < 0 && (this.finishedTime = null), this.animation.playbackRate = n;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(n) {
    this.animation.startTime = n;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: n, observe: r }) {
    var i;
    return this.allowFlatten && ((i = this.animation.effect) == null || i.updateTiming({ easing: "linear" })), this.animation.onfinish = null, n && cT() ? (this.animation.timeline = n, pn) : r(this);
  }
}
const Sw = {
  anticipate: ew,
  backInOut: Jb,
  circInOut: nw
};
function gT(t) {
  return t in Sw;
}
function yT(t) {
  typeof t.ease == "string" && gT(t.ease) && (t.ease = Sw[t.ease]);
}
const Q1 = 10;
class vT extends mT {
  constructor(n) {
    yT(n), gw(n), super(n), n.startTime && (this.startTime = n.startTime), this.options = n;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(n) {
    const { motionValue: r, onUpdate: i, onComplete: o, element: u, ...c } = this.options;
    if (!r)
      return;
    if (n !== void 0) {
      r.set(n);
      return;
    }
    const h = new Kh({
      ...c,
      autoplay: !1
    }), d = /* @__PURE__ */ On(this.finishedTime ?? this.time);
    r.setWithVelocity(h.sample(d - Q1).value, h.sample(d).value, Q1), h.stop();
  }
}
const F1 = (t, n) => n === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(za.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function bT(t) {
  const n = t[0];
  if (t.length === 1)
    return !0;
  for (let r = 0; r < t.length; r++)
    if (t[r] !== n)
      return !0;
}
function wT(t, n, r, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (n === "display" || n === "visibility")
    return !0;
  const u = t[t.length - 1], c = F1(o, n), h = F1(u, n);
  return !c || !h ? !1 : bT(t) || (r === "spring" || xw(r)) && i;
}
function Fh(t) {
  return Ib(t) && "offsetHeight" in t;
}
const xT = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), ST = /* @__PURE__ */ Vh(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function AT(t) {
  var p;
  const { motionValue: n, name: r, repeatDelay: i, repeatType: o, damping: u, type: c } = t;
  if (!Fh((p = n == null ? void 0 : n.owner) == null ? void 0 : p.current))
    return !1;
  const { onUpdate: h, transformTemplate: d } = n.owner.getProps();
  return ST() && r && xT.has(r) && (r !== "transform" || !d) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !h && !i && o !== "mirror" && u !== 0 && c !== "inertia";
}
const TT = 40;
class MT extends Wh {
  constructor({ autoplay: n = !0, delay: r = 0, type: i = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: c = "loop", keyframes: h, name: d, motionValue: p, element: g, ...y }) {
    var x;
    super(), this.stop = () => {
      var S, T;
      this._animation && (this._animation.stop(), (S = this.stopTimeline) == null || S.call(this)), (T = this.keyframeResolver) == null || T.cancel();
    }, this.createdAt = jt.now();
    const v = {
      autoplay: n,
      delay: r,
      type: i,
      repeat: o,
      repeatDelay: u,
      repeatType: c,
      name: d,
      motionValue: p,
      element: g,
      ...y
    }, w = (g == null ? void 0 : g.KeyframeResolver) || Qh;
    this.keyframeResolver = new w(h, (S, T, E) => this.onKeyframesResolved(S, T, v, !E), d, p, g), (x = this.keyframeResolver) == null || x.scheduleResolve();
  }
  onKeyframesResolved(n, r, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: c, velocity: h, delay: d, isHandoff: p, onUpdate: g } = i;
    this.resolvedAt = jt.now(), wT(n, u, c, h) || ((ta.instantAnimations || !d) && (g == null || g(Zh(n, i, r))), n[0] = n[n.length - 1], i.duration = 0, i.repeat = 0);
    const v = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > TT ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...i,
      keyframes: n
    }, w = !p && AT(v) ? new vT({
      ...v,
      element: v.motionValue.owner.current
    }) : new Kh(v);
    w.finished.then(() => this.notifyFinished()).catch(pn), this.pendingTimeline && (this.stopTimeline = w.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = w;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(n, r) {
    return this.finished.finally(n).then(() => {
    });
  }
  get animation() {
    var n;
    return this._animation || ((n = this.keyframeResolver) == null || n.resume(), oT()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(n) {
    this.animation.time = n;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(n) {
    this.animation.speed = n;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(n) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(n) : this.pendingTimeline = n, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var n;
    this._animation && this.animation.cancel(), (n = this.keyframeResolver) == null || n.cancel();
  }
}
const ET = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function CT(t) {
  const n = ET.exec(t);
  if (!n)
    return [,];
  const [, r, i, o] = n;
  return [`--${r ?? i}`, o];
}
function Aw(t, n, r = 1) {
  const [i, o] = CT(t);
  if (!i)
    return;
  const u = window.getComputedStyle(n).getPropertyValue(i);
  if (u) {
    const c = u.trim();
    return Xb(c) ? parseFloat(c) : c;
  }
  return qh(o) ? Aw(o, n, r + 1) : o;
}
function $h(t, n) {
  return (t == null ? void 0 : t[n]) ?? (t == null ? void 0 : t.default) ?? t;
}
const Tw = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Ri
]), _T = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Mw = (t) => (n) => n.test(t), Ew = [_i, we, zn, Na, bA, vA, _T], $1 = (t) => Ew.find(Mw(t));
function RT(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Zb(t) : !0;
}
const kT = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function NT(t) {
  const [n, r] = t.slice(0, -1).split("(");
  if (n === "drop-shadow")
    return t;
  const [i] = r.match(Gh) || [];
  if (!i)
    return t;
  const o = r.replace(i, "");
  let u = kT.has(n) ? 1 : 0;
  return i !== r && (u *= 100), n + "(" + u + o + ")";
}
const DT = /\b([a-z-]*)\(.*?\)/gu, Jd = {
  ...za,
  getAnimatableNone: (t) => {
    const n = t.match(DT);
    return n ? n.map(NT).join(" ") : t;
  }
}, J1 = {
  ..._i,
  transform: Math.round
}, OT = {
  rotate: Na,
  rotateX: Na,
  rotateY: Na,
  rotateZ: Na,
  scale: kl,
  scaleX: kl,
  scaleY: kl,
  scaleZ: kl,
  skew: Na,
  skewX: Na,
  skewY: Na,
  distance: we,
  translateX: we,
  translateY: we,
  translateZ: we,
  x: we,
  y: we,
  z: we,
  perspective: we,
  transformPerspective: we,
  opacity: Zs,
  originX: P1,
  originY: P1,
  originZ: we
}, Jh = {
  // Border props
  borderWidth: we,
  borderTopWidth: we,
  borderRightWidth: we,
  borderBottomWidth: we,
  borderLeftWidth: we,
  borderRadius: we,
  radius: we,
  borderTopLeftRadius: we,
  borderTopRightRadius: we,
  borderBottomRightRadius: we,
  borderBottomLeftRadius: we,
  // Positioning props
  width: we,
  maxWidth: we,
  height: we,
  maxHeight: we,
  top: we,
  right: we,
  bottom: we,
  left: we,
  // Spacing props
  padding: we,
  paddingTop: we,
  paddingRight: we,
  paddingBottom: we,
  paddingLeft: we,
  margin: we,
  marginTop: we,
  marginRight: we,
  marginBottom: we,
  marginLeft: we,
  // Misc
  backgroundPositionX: we,
  backgroundPositionY: we,
  ...OT,
  zIndex: J1,
  // SVG
  fillOpacity: Zs,
  strokeOpacity: Zs,
  numOctaves: J1
}, LT = {
  ...Jh,
  // Color props
  color: st,
  backgroundColor: st,
  outlineColor: st,
  fill: st,
  stroke: st,
  // Border props
  borderColor: st,
  borderTopColor: st,
  borderRightColor: st,
  borderBottomColor: st,
  borderLeftColor: st,
  filter: Jd,
  WebkitFilter: Jd
}, Cw = (t) => LT[t];
function _w(t, n) {
  let r = Cw(t);
  return r !== Jd && (r = za), r.getAnimatableNone ? r.getAnimatableNone(n) : void 0;
}
const zT = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function BT(t, n, r) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !zT.has(u) && Ws(u).values.length && (o = t[i]), i++;
  }
  if (o && r)
    for (const u of n)
      t[u] = _w(r, o);
}
class VT extends Qh {
  constructor(n, r, i, o, u) {
    super(n, r, i, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: n, element: r, name: i } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let d = 0; d < n.length; d++) {
      let p = n[d];
      if (typeof p == "string" && (p = p.trim(), qh(p))) {
        const g = Aw(p, r.current);
        g !== void 0 && (n[d] = g), d === n.length - 1 && (this.finalKeyframe = p);
      }
    }
    if (this.resolveNoneKeyframes(), !Tw.has(i) || n.length !== 2)
      return;
    const [o, u] = n, c = $1(o), h = $1(u);
    if (c !== h)
      if (W1(c) && W1(h))
        for (let d = 0; d < n.length; d++) {
          const p = n[d];
          typeof p == "string" && (n[d] = parseFloat(p));
        }
      else mr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: n, name: r } = this, i = [];
    for (let o = 0; o < n.length; o++)
      (n[o] === null || RT(n[o])) && i.push(o);
    i.length && BT(n, i, r);
  }
  measureInitialState() {
    const { element: n, unresolvedKeyframes: r, name: i } = this;
    if (!n || !n.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = mr[i](n.measureViewportBox(), window.getComputedStyle(n.current)), r[0] = this.measuredOrigin;
    const o = r[r.length - 1];
    o !== void 0 && n.getValue(i, o).jump(o, !1);
  }
  measureEndState() {
    var h;
    const { element: n, name: r, unresolvedKeyframes: i } = this;
    if (!n || !n.current)
      return;
    const o = n.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const u = i.length - 1, c = i[u];
    i[u] = mr[r](n.measureViewportBox(), window.getComputedStyle(n.current)), c !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = c), (h = this.removedTransforms) != null && h.length && this.removedTransforms.forEach(([d, p]) => {
      n.getValue(d).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function UT(t, n, r) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const o = (r == null ? void 0 : r[t]) ?? i.querySelectorAll(t);
    return o ? Array.from(o) : [];
  }
  return Array.from(t);
}
const Rw = (t, n) => n && typeof t == "number" ? n.transform(t) : t, ey = 30, jT = (t) => !isNaN(parseFloat(t));
class PT {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(n, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i, o = !0) => {
      var c, h;
      const u = jt.now();
      if (this.updatedAt !== u && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && ((c = this.events.change) == null || c.notify(this.current), this.dependents))
        for (const d of this.dependents)
          d.dirty();
      o && ((h = this.events.renderRequest) == null || h.notify(this.current));
    }, this.hasAnimated = !1, this.setCurrent(n), this.owner = r.owner;
  }
  setCurrent(n) {
    this.current = n, this.updatedAt = jt.now(), this.canTrackVelocity === null && n !== void 0 && (this.canTrackVelocity = jT(this.current));
  }
  setPrevFrameValue(n = this.current) {
    this.prevFrameValue = n, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(n) {
    return this.on("change", n);
  }
  on(n, r) {
    this.events[n] || (this.events[n] = new Uh());
    const i = this.events[n].add(r);
    return n === "change" ? () => {
      i(), Ie.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const n in this.events)
      this.events[n].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(n, r) {
    this.passiveEffect = n, this.stopPassiveEffect = r;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(n, r = !0) {
    !r || !this.passiveEffect ? this.updateAndNotify(n, r) : this.passiveEffect(n, this.updateAndNotify);
  }
  setWithVelocity(n, r, i) {
    this.set(r), this.prev = void 0, this.prevFrameValue = n, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(n, r = !0) {
    this.updateAndNotify(n), this.prev = n, this.prevUpdatedAt = this.prevFrameValue = void 0, r && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var n;
    (n = this.events.change) == null || n.notify(this.current);
  }
  addDependent(n) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(n);
  }
  removeDependent(n) {
    this.dependents && this.dependents.delete(n);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const n = jt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || n - this.updatedAt > ey)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, ey);
    return Wb(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(n) {
    return this.stop(), new Promise((r) => {
      this.hasAnimated = !0, this.animation = n(r), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var n, r;
    (n = this.dependents) == null || n.clear(), (r = this.events.destroy) == null || r.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function wi(t, n) {
  return new PT(t, n);
}
const { schedule: e0 } = /* @__PURE__ */ iw(queueMicrotask, !1), bn = {
  x: !1,
  y: !1
};
function kw() {
  return bn.x || bn.y;
}
function HT(t) {
  return t === "x" || t === "y" ? bn[t] ? null : (bn[t] = !0, () => {
    bn[t] = !1;
  }) : bn.x || bn.y ? null : (bn.x = bn.y = !0, () => {
    bn.x = bn.y = !1;
  });
}
function Nw(t, n) {
  const r = UT(t), i = new AbortController(), o = {
    passive: !0,
    ...n,
    signal: i.signal
  };
  return [r, o, () => i.abort()];
}
function ty(t) {
  return !(t.pointerType === "touch" || kw());
}
function qT(t, n, r = {}) {
  const [i, o, u] = Nw(t, r), c = (h) => {
    if (!ty(h))
      return;
    const { target: d } = h, p = n(d, h);
    if (typeof p != "function" || !d)
      return;
    const g = (y) => {
      ty(y) && (p(y), d.removeEventListener("pointerleave", g));
    };
    d.addEventListener("pointerleave", g, o);
  };
  return i.forEach((h) => {
    h.addEventListener("pointerenter", c, o);
  }), u;
}
const Dw = (t, n) => n ? t === n ? !0 : Dw(t, n.parentElement) : !1, t0 = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, GT = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function YT(t) {
  return GT.has(t.tagName) || t.tabIndex !== -1;
}
const Zl = /* @__PURE__ */ new WeakSet();
function ny(t) {
  return (n) => {
    n.key === "Enter" && t(n);
  };
}
function ad(t, n) {
  t.dispatchEvent(new PointerEvent("pointer" + n, { isPrimary: !0, bubbles: !0 }));
}
const XT = (t, n) => {
  const r = t.currentTarget;
  if (!r)
    return;
  const i = ny(() => {
    if (Zl.has(r))
      return;
    ad(r, "down");
    const o = ny(() => {
      ad(r, "up");
    }), u = () => ad(r, "cancel");
    r.addEventListener("keyup", o, n), r.addEventListener("blur", u, n);
  });
  r.addEventListener("keydown", i, n), r.addEventListener("blur", () => r.removeEventListener("keydown", i), n);
};
function ay(t) {
  return t0(t) && !kw();
}
function IT(t, n, r = {}) {
  const [i, o, u] = Nw(t, r), c = (h) => {
    const d = h.currentTarget;
    if (!ay(h))
      return;
    Zl.add(d);
    const p = n(d, h), g = (w, x) => {
      window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", v), Zl.has(d) && Zl.delete(d), ay(w) && typeof p == "function" && p(w, { success: x });
    }, y = (w) => {
      g(w, d === window || d === document || r.useGlobalTarget || Dw(d, w.target));
    }, v = (w) => {
      g(w, !1);
    };
    window.addEventListener("pointerup", y, o), window.addEventListener("pointercancel", v, o);
  };
  return i.forEach((h) => {
    (r.useGlobalTarget ? window : h).addEventListener("pointerdown", c, o), Fh(h) && (h.addEventListener("focus", (p) => XT(p, o)), !YT(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), u;
}
function Ow(t) {
  return Ib(t) && "ownerSVGElement" in t;
}
function ZT(t) {
  return Ow(t) && t.tagName === "svg";
}
const _t = (t) => !!(t && t.getVelocity), WT = [...Ew, st, za], KT = (t) => WT.find(Mw(t)), n0 = W.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
class QT extends W.Component {
  getSnapshotBeforeUpdate(n) {
    const r = this.props.childRef.current;
    if (r && n.isPresent && !this.props.isPresent) {
      const i = r.offsetParent, o = Fh(i) && i.offsetWidth || 0, u = this.props.sizeRef.current;
      u.height = r.offsetHeight || 0, u.width = r.offsetWidth || 0, u.top = r.offsetTop, u.left = r.offsetLeft, u.right = o - u.width - u.left;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function FT({ children: t, isPresent: n, anchorX: r, root: i }) {
  const o = W.useId(), u = W.useRef(null), c = W.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: h } = W.useContext(n0);
  return W.useInsertionEffect(() => {
    const { width: d, height: p, top: g, left: y, right: v } = c.current;
    if (n || !u.current || !d || !p)
      return;
    const w = r === "left" ? `left: ${y}` : `right: ${v}`;
    u.current.dataset.motionPopId = o;
    const x = document.createElement("style");
    h && (x.nonce = h);
    const S = i ?? document.head;
    return S.appendChild(x), x.sheet && x.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${p}px !important;
            ${w}px !important;
            top: ${g}px !important;
          }
        `), () => {
      S.removeChild(x), S.contains(x) && S.removeChild(x);
    };
  }, [n]), Z.jsx(QT, { isPresent: n, childRef: u, sizeRef: c, children: W.cloneElement(t, { ref: u }) });
}
const $T = ({ children: t, initial: n, isPresent: r, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: c, anchorX: h, root: d }) => {
  const p = Dh(JT), g = W.useId();
  let y = !0, v = W.useMemo(() => (y = !1, {
    id: g,
    initial: n,
    isPresent: r,
    custom: o,
    onExitComplete: (w) => {
      p.set(w, !0);
      for (const x of p.values())
        if (!x)
          return;
      i && i();
    },
    register: (w) => (p.set(w, !1), () => p.delete(w))
  }), [r, p, i]);
  return u && y && (v = { ...v }), W.useMemo(() => {
    p.forEach((w, x) => p.set(x, !1));
  }, [r]), W.useEffect(() => {
    !r && !p.size && i && i();
  }, [r]), c === "popLayout" && (t = Z.jsx(FT, { isPresent: r, anchorX: h, root: d, children: t })), Z.jsx(gu.Provider, { value: v, children: t });
};
function JT() {
  return /* @__PURE__ */ new Map();
}
function Lw(t = !0) {
  const n = W.useContext(gu);
  if (n === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: i, register: o } = n, u = W.useId();
  W.useEffect(() => {
    if (t)
      return o(u);
  }, [t]);
  const c = W.useCallback(() => t && i && i(u), [u, i, t]);
  return !r && i ? [!1, c] : [!0];
}
const Nl = (t) => t.key || "";
function ry(t) {
  const n = [];
  return W.Children.forEach(t, (r) => {
    W.isValidElement(r) && n.push(r);
  }), n;
}
const zw = ({ children: t, custom: n, initial: r = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: c = !1, anchorX: h = "left", root: d }) => {
  const [p, g] = Lw(c), y = W.useMemo(() => ry(t), [t]), v = c && !p ? [] : y.map(Nl), w = W.useRef(!0), x = W.useRef(y), S = Dh(() => /* @__PURE__ */ new Map()), [T, E] = W.useState(y), [N, C] = W.useState(y);
  Yb(() => {
    w.current = !1, x.current = y;
    for (let U = 0; U < N.length; U++) {
      const P = Nl(N[U]);
      v.includes(P) ? S.delete(P) : S.get(P) !== !0 && S.set(P, !1);
    }
  }, [N, v.length, v.join("-")]);
  const X = [];
  if (y !== T) {
    let U = [...y];
    for (let P = 0; P < N.length; P++) {
      const _ = N[P], F = Nl(_);
      v.includes(F) || (U.splice(P, 0, _), X.push(_));
    }
    return u === "wait" && X.length && (U = X), C(ry(U)), E(y), null;
  }
  const { forceRender: D } = W.useContext(Nh);
  return Z.jsx(Z.Fragment, { children: N.map((U) => {
    const P = Nl(U), _ = c && !p ? !1 : y === N || v.includes(P), F = () => {
      if (S.has(P))
        S.set(P, !0);
      else
        return;
      let ae = !0;
      S.forEach((ee) => {
        ee || (ae = !1);
      }), ae && (D == null || D(), C(x.current), c && (g == null || g()), i && i());
    };
    return Z.jsx($T, { isPresent: _, initial: !w.current || r ? void 0 : !1, custom: n, presenceAffectsLayout: o, mode: u, root: d, onExitComplete: _ ? void 0 : F, anchorX: h, children: U }, P);
  }) });
}, Bw = W.createContext({ strict: !1 }), iy = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, xi = {};
for (const t in iy)
  xi[t] = {
    isEnabled: (n) => iy[t].some((r) => !!n[r])
  };
function eM(t) {
  for (const n in t)
    xi[n] = {
      ...xi[n],
      ...t[n]
    };
}
const tM = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function tu(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || tM.has(t);
}
let Vw = (t) => !tu(t);
function nM(t) {
  typeof t == "function" && (Vw = (n) => n.startsWith("on") ? !tu(n) : t(n));
}
try {
  nM(require("@emotion/is-prop-valid").default);
} catch {
}
function aM(t, n, r) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || (Vw(o) || r === !0 && tu(o) || !n && !tu(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
function rM(t) {
  if (typeof Proxy > "u")
    return t;
  const n = /* @__PURE__ */ new Map(), r = (...i) => t(...i);
  return new Proxy(r, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (i, o) => o === "create" ? t : (n.has(o) || n.set(o, t(o)), n.get(o))
  });
}
const yu = /* @__PURE__ */ W.createContext({});
function vu(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Ks(t) {
  return typeof t == "string" || Array.isArray(t);
}
const a0 = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], r0 = ["initial", ...a0];
function bu(t) {
  return vu(t.animate) || r0.some((n) => Ks(t[n]));
}
function Uw(t) {
  return !!(bu(t) || t.variants);
}
function iM(t, n) {
  if (bu(t)) {
    const { initial: r, animate: i } = t;
    return {
      initial: r === !1 || Ks(r) ? r : void 0,
      animate: Ks(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? n : {};
}
function sM(t) {
  const { initial: n, animate: r } = iM(t, W.useContext(yu));
  return W.useMemo(() => ({ initial: n, animate: r }), [sy(n), sy(r)]);
}
function sy(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const oM = Symbol.for("motionComponentSymbol");
function mi(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function lM(t, n, r) {
  return W.useCallback(
    (i) => {
      i && t.onMount && t.onMount(i), n && (i ? n.mount(i) : n.unmount()), r && (typeof r == "function" ? r(i) : mi(r) && (r.current = i));
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [n]
  );
}
const i0 = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), uM = "framerAppearId", jw = "data-" + i0(uM), Pw = W.createContext({});
function cM(t, n, r, i, o) {
  var S, T;
  const { visualElement: u } = W.useContext(yu), c = W.useContext(Bw), h = W.useContext(gu), d = W.useContext(n0).reducedMotion, p = W.useRef(null);
  i = i || c.renderer, !p.current && i && (p.current = i(t, {
    visualState: n,
    parent: u,
    props: r,
    presenceContext: h,
    blockInitialAnimation: h ? h.initial === !1 : !1,
    reducedMotionConfig: d
  }));
  const g = p.current, y = W.useContext(Pw);
  g && !g.projection && o && (g.type === "html" || g.type === "svg") && fM(p.current, r, o, y);
  const v = W.useRef(!1);
  W.useInsertionEffect(() => {
    g && v.current && g.update(r, h);
  });
  const w = r[jw], x = W.useRef(!!w && !((S = window.MotionHandoffIsComplete) != null && S.call(window, w)) && ((T = window.MotionHasOptimisedAnimation) == null ? void 0 : T.call(window, w)));
  return Yb(() => {
    g && (v.current = !0, window.MotionIsMounted = !0, g.updateFeatures(), e0.render(g.render), x.current && g.animationState && g.animationState.animateChanges());
  }), W.useEffect(() => {
    g && (!x.current && g.animationState && g.animationState.animateChanges(), x.current && (queueMicrotask(() => {
      var E;
      (E = window.MotionHandoffMarkAsComplete) == null || E.call(window, w);
    }), x.current = !1));
  }), g;
}
function fM(t, n, r, i) {
  const { layoutId: o, layout: u, drag: c, dragConstraints: h, layoutScroll: d, layoutRoot: p, layoutCrossfade: g } = n;
  t.projection = new r(t.latestValues, n["data-framer-portal-id"] ? void 0 : Hw(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!c || h && mi(h),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: i,
    crossfade: g,
    layoutScroll: d,
    layoutRoot: p
  });
}
function Hw(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : Hw(t.parent);
}
function dM({ preloadedFeatures: t, createVisualElement: n, useRender: r, useVisualState: i, Component: o }) {
  t && eM(t);
  function u(h, d) {
    let p;
    const g = {
      ...W.useContext(n0),
      ...h,
      layoutId: hM(h)
    }, { isStatic: y } = g, v = sM(h), w = i(h, y);
    if (!y && Oh) {
      pM();
      const x = mM(g);
      p = x.MeasureLayout, v.visualElement = cM(o, w, g, n, x.ProjectionNode);
    }
    return Z.jsxs(yu.Provider, { value: v, children: [p && v.visualElement ? Z.jsx(p, { visualElement: v.visualElement, ...g }) : null, r(o, h, lM(w, v.visualElement, d), w, y, v.visualElement)] });
  }
  u.displayName = `motion.${typeof o == "string" ? o : `create(${o.displayName ?? o.name ?? ""})`}`;
  const c = W.forwardRef(u);
  return c[oM] = o, c;
}
function hM({ layoutId: t }) {
  const n = W.useContext(Nh).id;
  return n && t !== void 0 ? n + "-" + t : t;
}
function pM(t, n) {
  W.useContext(Bw).strict;
}
function mM(t) {
  const { drag: n, layout: r } = xi;
  if (!n && !r)
    return {};
  const i = { ...n, ...r };
  return {
    MeasureLayout: n != null && n.isEnabled(t) || r != null && r.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
const Qs = {};
function gM(t) {
  for (const n in t)
    Qs[n] = t[n], Hh(n) && (Qs[n].isCSSVariable = !0);
}
function qw(t, { layout: n, layoutId: r }) {
  return ki.has(t) || t.startsWith("origin") || (n || r !== void 0) && (!!Qs[t] || t === "opacity");
}
const yM = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, vM = Ri.length;
function bM(t, n, r) {
  let i = "", o = !0;
  for (let u = 0; u < vM; u++) {
    const c = Ri[u], h = t[c];
    if (h === void 0)
      continue;
    let d = !0;
    if (typeof h == "number" ? d = h === (c.startsWith("scale") ? 1 : 0) : d = parseFloat(h) === 0, !d || r) {
      const p = Rw(h, Jh[c]);
      if (!d) {
        o = !1;
        const g = yM[c] || c;
        i += `${g}(${p}) `;
      }
      r && (n[c] = p);
    }
  }
  return i = i.trim(), r ? i = r(n, o ? "" : i) : o && (i = "none"), i;
}
function s0(t, n, r) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let c = !1, h = !1;
  for (const d in n) {
    const p = n[d];
    if (ki.has(d)) {
      c = !0;
      continue;
    } else if (Hh(d)) {
      o[d] = p;
      continue;
    } else {
      const g = Rw(p, Jh[d]);
      d.startsWith("origin") ? (h = !0, u[d] = g) : i[d] = g;
    }
  }
  if (n.transform || (c || r ? i.transform = bM(n, t.transform, r) : i.transform && (i.transform = "none")), h) {
    const { originX: d = "50%", originY: p = "50%", originZ: g = 0 } = u;
    i.transformOrigin = `${d} ${p} ${g}`;
  }
}
const o0 = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Gw(t, n, r) {
  for (const i in n)
    !_t(n[i]) && !qw(i, r) && (t[i] = n[i]);
}
function wM({ transformTemplate: t }, n) {
  return W.useMemo(() => {
    const r = o0();
    return s0(r, n, t), Object.assign({}, r.vars, r.style);
  }, [n]);
}
function xM(t, n) {
  const r = t.style || {}, i = {};
  return Gw(i, r, t), Object.assign(i, wM(t, n)), i;
}
function SM(t, n) {
  const r = {}, i = xM(t, n);
  return t.drag && t.dragListener !== !1 && (r.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (r.tabIndex = 0), r.style = i, r;
}
const AM = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, TM = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function MM(t, n, r = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? AM : TM;
  t[u.offset] = we.transform(-i);
  const c = we.transform(n), h = we.transform(r);
  t[u.array] = `${c} ${h}`;
}
function Yw(t, {
  attrX: n,
  attrY: r,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: c = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, d, p, g) {
  if (s0(t, h, p), d) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: y, style: v } = t;
  y.transform && (v.transform = y.transform, delete y.transform), (v.transform || y.transformOrigin) && (v.transformOrigin = y.transformOrigin ?? "50% 50%", delete y.transformOrigin), v.transform && (v.transformBox = (g == null ? void 0 : g.transformBox) ?? "fill-box", delete y.transformBox), n !== void 0 && (y.x = n), r !== void 0 && (y.y = r), i !== void 0 && (y.scale = i), o !== void 0 && MM(y, o, u, c, !1);
}
const Xw = () => ({
  ...o0(),
  attrs: {}
}), Iw = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function EM(t, n, r, i) {
  const o = W.useMemo(() => {
    const u = Xw();
    return Yw(u, n, Iw(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [n]);
  if (t.style) {
    const u = {};
    Gw(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const CM = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function l0(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(CM.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function _M(t = !1) {
  return (r, i, o, { latestValues: u }, c) => {
    const d = (l0(r) ? EM : SM)(i, u, c, r), p = aM(i, typeof r == "string", t), g = r !== W.Fragment ? { ...p, ...d, ref: o } : {}, { children: y } = i, v = W.useMemo(() => _t(y) ? y.get() : y, [y]);
    return W.createElement(r, {
      ...g,
      children: v
    });
  };
}
function oy(t) {
  const n = [{}, {}];
  return t == null || t.values.forEach((r, i) => {
    n[0][i] = r.get(), n[1][i] = r.getVelocity();
  }), n;
}
function u0(t, n, r, i) {
  if (typeof n == "function") {
    const [o, u] = oy(i);
    n = n(r !== void 0 ? r : t.custom, o, u);
  }
  if (typeof n == "string" && (n = t.variants && t.variants[n]), typeof n == "function") {
    const [o, u] = oy(i);
    n = n(r !== void 0 ? r : t.custom, o, u);
  }
  return n;
}
function Wl(t) {
  return _t(t) ? t.get() : t;
}
function RM({ scrapeMotionValuesFromProps: t, createRenderState: n }, r, i, o) {
  return {
    latestValues: kM(r, i, o, t),
    renderState: n()
  };
}
const Zw = (t) => (n, r) => {
  const i = W.useContext(yu), o = W.useContext(gu), u = () => RM(t, n, i, o);
  return r ? u() : Dh(u);
};
function kM(t, n, r, i) {
  const o = {}, u = i(t, {});
  for (const v in u)
    o[v] = Wl(u[v]);
  let { initial: c, animate: h } = t;
  const d = bu(t), p = Uw(t);
  n && p && !d && t.inherit !== !1 && (c === void 0 && (c = n.initial), h === void 0 && (h = n.animate));
  let g = r ? r.initial === !1 : !1;
  g = g || c === !1;
  const y = g ? h : c;
  if (y && typeof y != "boolean" && !vu(y)) {
    const v = Array.isArray(y) ? y : [y];
    for (let w = 0; w < v.length; w++) {
      const x = u0(t, v[w]);
      if (x) {
        const { transitionEnd: S, transition: T, ...E } = x;
        for (const N in E) {
          let C = E[N];
          if (Array.isArray(C)) {
            const X = g ? C.length - 1 : 0;
            C = C[X];
          }
          C !== null && (o[N] = C);
        }
        for (const N in S)
          o[N] = S[N];
      }
    }
  }
  return o;
}
function c0(t, n, r) {
  var u;
  const { style: i } = t, o = {};
  for (const c in i)
    (_t(i[c]) || n.style && _t(n.style[c]) || qw(c, t) || ((u = r == null ? void 0 : r.getValue(c)) == null ? void 0 : u.liveStyle) !== void 0) && (o[c] = i[c]);
  return o;
}
const NM = {
  useVisualState: Zw({
    scrapeMotionValuesFromProps: c0,
    createRenderState: o0
  })
};
function Ww(t, n, r) {
  const i = c0(t, n, r);
  for (const o in t)
    if (_t(t[o]) || _t(n[o])) {
      const u = Ri.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
const DM = {
  useVisualState: Zw({
    scrapeMotionValuesFromProps: Ww,
    createRenderState: Xw
  })
};
function OM(t, n) {
  return function(i, { forwardMotionProps: o } = { forwardMotionProps: !1 }) {
    const c = {
      ...l0(i) ? DM : NM,
      preloadedFeatures: t,
      useRender: _M(o),
      createVisualElement: n,
      Component: i
    };
    return dM(c);
  };
}
function Fs(t, n, r) {
  const i = t.getProps();
  return u0(i, n, r !== void 0 ? r : i.custom, t);
}
const eh = (t) => Array.isArray(t);
function LM(t, n, r) {
  t.hasValue(n) ? t.getValue(n).set(r) : t.addValue(n, wi(r));
}
function zM(t) {
  return eh(t) ? t[t.length - 1] || 0 : t;
}
function BM(t, n) {
  const r = Fs(t, n);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = r || {};
  u = { ...u, ...i };
  for (const c in u) {
    const h = zM(u[c]);
    LM(t, c, h);
  }
}
function VM(t) {
  return !!(_t(t) && t.add);
}
function th(t, n) {
  const r = t.getValue("willChange");
  if (VM(r))
    return r.add(n);
  if (!r && ta.WillChange) {
    const i = new ta.WillChange("auto");
    t.addValue("willChange", i), i.add(n);
  }
}
function Kw(t) {
  return t.props[jw];
}
const UM = (t) => t !== null;
function jM(t, { repeat: n, repeatType: r = "loop" }, i) {
  const o = t.filter(UM), u = n && r !== "loop" && n % 2 === 1 ? 0 : o.length - 1;
  return o[u];
}
const PM = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, HM = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), qM = {
  type: "keyframes",
  duration: 0.8
}, GM = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, YM = (t, { keyframes: n }) => n.length > 2 ? qM : ki.has(t) ? t.startsWith("scale") ? HM(n[1]) : PM : GM;
function XM({ when: t, delay: n, delayChildren: r, staggerChildren: i, staggerDirection: o, repeat: u, repeatType: c, repeatDelay: h, from: d, elapsed: p, ...g }) {
  return !!Object.keys(g).length;
}
const f0 = (t, n, r, i = {}, o, u) => (c) => {
  const h = $h(i, t) || {}, d = h.delay || i.delay || 0;
  let { elapsed: p = 0 } = i;
  p = p - /* @__PURE__ */ On(d);
  const g = {
    keyframes: Array.isArray(r) ? r : [null, r],
    ease: "easeOut",
    velocity: n.getVelocity(),
    ...h,
    delay: -p,
    onUpdate: (v) => {
      n.set(v), h.onUpdate && h.onUpdate(v);
    },
    onComplete: () => {
      c(), h.onComplete && h.onComplete();
    },
    name: t,
    motionValue: n,
    element: u ? void 0 : o
  };
  XM(h) || Object.assign(g, YM(t, g)), g.duration && (g.duration = /* @__PURE__ */ On(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ On(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let y = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (g.duration = 0, g.delay === 0 && (y = !0)), (ta.instantAnimations || ta.skipAnimations) && (y = !0, g.duration = 0, g.delay = 0), g.allowFlatten = !h.type && !h.ease, y && !u && n.get() !== void 0) {
    const v = jM(g.keyframes, h);
    if (v !== void 0) {
      Ie.update(() => {
        g.onUpdate(v), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new Kh(g) : new MT(g);
};
function IM({ protectedKeys: t, needsAnimating: n }, r) {
  const i = t.hasOwnProperty(r) && n[r] !== !0;
  return n[r] = !1, i;
}
function Qw(t, n, { delay: r = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u = t.getDefaultTransition(), transitionEnd: c, ...h } = n;
  i && (u = i);
  const d = [], p = o && t.animationState && t.animationState.getState()[o];
  for (const g in h) {
    const y = t.getValue(g, t.latestValues[g] ?? null), v = h[g];
    if (v === void 0 || p && IM(p, g))
      continue;
    const w = {
      delay: r,
      ...$h(u || {}, g)
    }, x = y.get();
    if (x !== void 0 && !y.isAnimating && !Array.isArray(v) && v === x && !w.velocity)
      continue;
    let S = !1;
    if (window.MotionHandoffAnimation) {
      const E = Kw(t);
      if (E) {
        const N = window.MotionHandoffAnimation(E, g, Ie);
        N !== null && (w.startTime = N, S = !0);
      }
    }
    th(t, g), y.start(f0(g, y, v, t.shouldReduceMotion && Tw.has(g) ? { type: !1 } : w, t, S));
    const T = y.animation;
    T && d.push(T);
  }
  return c && Promise.all(d).then(() => {
    Ie.update(() => {
      c && BM(t, c);
    });
  }), d;
}
function nh(t, n, r = {}) {
  var d;
  const i = Fs(t, n, r.type === "exit" ? (d = t.presenceContext) == null ? void 0 : d.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  r.transitionOverride && (o = r.transitionOverride);
  const u = i ? () => Promise.all(Qw(t, i, r)) : () => Promise.resolve(), c = t.variantChildren && t.variantChildren.size ? (p = 0) => {
    const { delayChildren: g = 0, staggerChildren: y, staggerDirection: v } = o;
    return ZM(t, n, p, g, y, v, r);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, g] = h === "beforeChildren" ? [u, c] : [c, u];
    return p().then(() => g());
  } else
    return Promise.all([u(), c(r.delay)]);
}
function ZM(t, n, r = 0, i = 0, o = 0, u = 1, c) {
  const h = [], d = t.variantChildren.size, p = (d - 1) * o, g = typeof i == "function", y = g ? (v) => i(v, d) : (
    // Support deprecated staggerChildren
    u === 1 ? (v = 0) => v * o : (v = 0) => p - v * o
  );
  return Array.from(t.variantChildren).sort(WM).forEach((v, w) => {
    v.notify("AnimationStart", n), h.push(nh(v, n, {
      ...c,
      delay: r + (g ? 0 : i) + y(w)
    }).then(() => v.notify("AnimationComplete", n)));
  }), Promise.all(h);
}
function WM(t, n) {
  return t.sortNodePosition(n);
}
function KM(t, n, r = {}) {
  t.notify("AnimationStart", n);
  let i;
  if (Array.isArray(n)) {
    const o = n.map((u) => nh(t, u, r));
    i = Promise.all(o);
  } else if (typeof n == "string")
    i = nh(t, n, r);
  else {
    const o = typeof n == "function" ? Fs(t, n, r.custom) : n;
    i = Promise.all(Qw(t, o, r));
  }
  return i.then(() => {
    t.notify("AnimationComplete", n);
  });
}
function Fw(t, n) {
  if (!Array.isArray(n))
    return !1;
  const r = n.length;
  if (r !== t.length)
    return !1;
  for (let i = 0; i < r; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
const QM = r0.length;
function $w(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const r = t.parent ? $w(t.parent) || {} : {};
    return t.props.initial !== void 0 && (r.initial = t.props.initial), r;
  }
  const n = {};
  for (let r = 0; r < QM; r++) {
    const i = r0[r], o = t.props[i];
    (Ks(o) || o === !1) && (n[i] = o);
  }
  return n;
}
const FM = [...a0].reverse(), $M = a0.length;
function JM(t) {
  return (n) => Promise.all(n.map(({ animation: r, options: i }) => KM(t, r, i)));
}
function e4(t) {
  let n = JM(t), r = ly(), i = !0;
  const o = (d) => (p, g) => {
    var v;
    const y = Fs(t, g, d === "exit" ? (v = t.presenceContext) == null ? void 0 : v.custom : void 0);
    if (y) {
      const { transition: w, transitionEnd: x, ...S } = y;
      p = { ...p, ...S, ...x };
    }
    return p;
  };
  function u(d) {
    n = d(t);
  }
  function c(d) {
    const { props: p } = t, g = $w(t.parent) || {}, y = [], v = /* @__PURE__ */ new Set();
    let w = {}, x = 1 / 0;
    for (let T = 0; T < $M; T++) {
      const E = FM[T], N = r[E], C = p[E] !== void 0 ? p[E] : g[E], X = Ks(C), D = E === d ? N.isActive : null;
      D === !1 && (x = T);
      let U = C === g[E] && C !== p[E] && X;
      if (U && i && t.manuallyAnimateOnMount && (U = !1), N.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !N.isActive && D === null || // If we didn't and don't have any defined prop for this animation type
      !C && !N.prevProp || // Or if the prop doesn't define an animation
      vu(C) || typeof C == "boolean")
        continue;
      const P = t4(N.prevProp, C);
      let _ = P || // If we're making this variant active, we want to always make it active
      E === d && N.isActive && !U && X || // If we removed a higher-priority variant (i is in reverse order)
      T > x && X, F = !1;
      const ae = Array.isArray(C) ? C : [C];
      let ee = ae.reduce(o(E), {});
      D === !1 && (ee = {});
      const { prevResolvedValues: ne = {} } = N, he = {
        ...ne,
        ...ee
      }, ce = (O) => {
        _ = !0, v.has(O) && (F = !0, v.delete(O)), N.needsAnimating[O] = !0;
        const z = t.getValue(O);
        z && (z.liveStyle = !1);
      };
      for (const O in he) {
        const z = ee[O], q = ne[O];
        if (w.hasOwnProperty(O))
          continue;
        let M = !1;
        eh(z) && eh(q) ? M = !Fw(z, q) : M = z !== q, M ? z != null ? ce(O) : v.add(O) : z !== void 0 && v.has(O) ? ce(O) : N.protectedKeys[O] = !0;
      }
      N.prevProp = C, N.prevResolvedValues = ee, N.isActive && (w = { ...w, ...ee }), i && t.blockInitialAnimation && (_ = !1), _ && (!(U && P) || F) && y.push(...ae.map((O) => ({
        animation: O,
        options: { type: E }
      })));
    }
    if (v.size) {
      const T = {};
      if (typeof p.initial != "boolean") {
        const E = Fs(t, Array.isArray(p.initial) ? p.initial[0] : p.initial);
        E && E.transition && (T.transition = E.transition);
      }
      v.forEach((E) => {
        const N = t.getBaseTarget(E), C = t.getValue(E);
        C && (C.liveStyle = !0), T[E] = N ?? null;
      }), y.push({ animation: T });
    }
    let S = !!y.length;
    return i && (p.initial === !1 || p.initial === p.animate) && !t.manuallyAnimateOnMount && (S = !1), i = !1, S ? n(y) : Promise.resolve();
  }
  function h(d, p) {
    var y;
    if (r[d].isActive === p)
      return Promise.resolve();
    (y = t.variantChildren) == null || y.forEach((v) => {
      var w;
      return (w = v.animationState) == null ? void 0 : w.setActive(d, p);
    }), r[d].isActive = p;
    const g = c(d);
    for (const v in r)
      r[v].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: c,
    setActive: h,
    setAnimateFunction: u,
    getState: () => r,
    reset: () => {
      r = ly(), i = !0;
    }
  };
}
function t4(t, n) {
  return typeof n == "string" ? n !== t : Array.isArray(n) ? !Fw(n, t) : !1;
}
function or(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function ly() {
  return {
    animate: or(!0),
    whileInView: or(),
    whileHover: or(),
    whileTap: or(),
    whileDrag: or(),
    whileFocus: or(),
    exit: or()
  };
}
class Ha {
  constructor(n) {
    this.isMounted = !1, this.node = n;
  }
  update() {
  }
}
class n4 extends Ha {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(n) {
    super(n), n.animationState || (n.animationState = e4(n));
  }
  updateAnimationControlsSubscription() {
    const { animate: n } = this.node.getProps();
    vu(n) && (this.unmountControls = n.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: n } = this.node.getProps(), { animate: r } = this.node.prevProps || {};
    n !== r && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var n;
    this.node.animationState.reset(), (n = this.unmountControls) == null || n.call(this);
  }
}
let a4 = 0;
class r4 extends Ha {
  constructor() {
    super(...arguments), this.id = a4++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: n, onExitComplete: r } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || n === i)
      return;
    const o = this.node.animationState.setActive("exit", !n);
    r && !n && o.then(() => {
      r(this.id);
    });
  }
  mount() {
    const { register: n, onExitComplete: r } = this.node.presenceContext || {};
    r && r(this.id), n && (this.unmount = n(this.id));
  }
  unmount() {
  }
}
const i4 = {
  animation: {
    Feature: n4
  },
  exit: {
    Feature: r4
  }
};
function $s(t, n, r, i = { passive: !0 }) {
  return t.addEventListener(n, r, i), () => t.removeEventListener(n, r);
}
function oo(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const s4 = (t) => (n) => t0(n) && t(n, oo(n));
function qs(t, n, r, i) {
  return $s(t, n, s4(r), i);
}
function Jw({ top: t, left: n, right: r, bottom: i }) {
  return {
    x: { min: n, max: r },
    y: { min: t, max: i }
  };
}
function o4({ x: t, y: n }) {
  return { top: n.min, right: t.max, bottom: n.max, left: t.min };
}
function l4(t, n) {
  if (!n)
    return t;
  const r = n({ x: t.left, y: t.top }), i = n({ x: t.right, y: t.bottom });
  return {
    top: r.y,
    left: r.x,
    bottom: i.y,
    right: i.x
  };
}
const e2 = 1e-4, u4 = 1 - e2, c4 = 1 + e2, t2 = 0.01, f4 = 0 - t2, d4 = 0 + t2;
function kt(t) {
  return t.max - t.min;
}
function h4(t, n, r) {
  return Math.abs(t - n) <= r;
}
function uy(t, n, r, i = 0.5) {
  t.origin = i, t.originPoint = Qe(n.min, n.max, t.origin), t.scale = kt(r) / kt(n), t.translate = Qe(r.min, r.max, t.origin) - t.originPoint, (t.scale >= u4 && t.scale <= c4 || isNaN(t.scale)) && (t.scale = 1), (t.translate >= f4 && t.translate <= d4 || isNaN(t.translate)) && (t.translate = 0);
}
function Gs(t, n, r, i) {
  uy(t.x, n.x, r.x, i ? i.originX : void 0), uy(t.y, n.y, r.y, i ? i.originY : void 0);
}
function cy(t, n, r) {
  t.min = r.min + n.min, t.max = t.min + kt(n);
}
function p4(t, n, r) {
  cy(t.x, n.x, r.x), cy(t.y, n.y, r.y);
}
function fy(t, n, r) {
  t.min = n.min - r.min, t.max = t.min + kt(n);
}
function Ys(t, n, r) {
  fy(t.x, n.x, r.x), fy(t.y, n.y, r.y);
}
const dy = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), gi = () => ({
  x: dy(),
  y: dy()
}), hy = () => ({ min: 0, max: 0 }), nt = () => ({
  x: hy(),
  y: hy()
});
function fn(t) {
  return [t("x"), t("y")];
}
function rd(t) {
  return t === void 0 || t === 1;
}
function ah({ scale: t, scaleX: n, scaleY: r }) {
  return !rd(t) || !rd(n) || !rd(r);
}
function ur(t) {
  return ah(t) || n2(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function n2(t) {
  return py(t.x) || py(t.y);
}
function py(t) {
  return t && t !== "0%";
}
function nu(t, n, r) {
  const i = t - r, o = n * i;
  return r + o;
}
function my(t, n, r, i, o) {
  return o !== void 0 && (t = nu(t, o, i)), nu(t, r, i) + n;
}
function rh(t, n = 0, r = 1, i, o) {
  t.min = my(t.min, n, r, i, o), t.max = my(t.max, n, r, i, o);
}
function a2(t, { x: n, y: r }) {
  rh(t.x, n.translate, n.scale, n.originPoint), rh(t.y, r.translate, r.scale, r.originPoint);
}
const gy = 0.999999999999, yy = 1.0000000000001;
function m4(t, n, r, i = !1) {
  const o = r.length;
  if (!o)
    return;
  n.x = n.y = 1;
  let u, c;
  for (let h = 0; h < o; h++) {
    u = r[h], c = u.projectionDelta;
    const { visualElement: d } = u.options;
    d && d.props.style && d.props.style.display === "contents" || (i && u.options.layoutScroll && u.scroll && u !== u.root && vi(t, {
      x: -u.scroll.offset.x,
      y: -u.scroll.offset.y
    }), c && (n.x *= c.x.scale, n.y *= c.y.scale, a2(t, c)), i && ur(u.latestValues) && vi(t, u.latestValues));
  }
  n.x < yy && n.x > gy && (n.x = 1), n.y < yy && n.y > gy && (n.y = 1);
}
function yi(t, n) {
  t.min = t.min + n, t.max = t.max + n;
}
function vy(t, n, r, i, o = 0.5) {
  const u = Qe(t.min, t.max, o);
  rh(t, n, r, u, i);
}
function vi(t, n) {
  vy(t.x, n.x, n.scaleX, n.scale, n.originX), vy(t.y, n.y, n.scaleY, n.scale, n.originY);
}
function r2(t, n) {
  return Jw(l4(t.getBoundingClientRect(), n));
}
function g4(t, n, r) {
  const i = r2(t, r), { scroll: o } = n;
  return o && (yi(i.x, o.offset.x), yi(i.y, o.offset.y)), i;
}
const i2 = ({ current: t }) => t ? t.ownerDocument.defaultView : null, by = (t, n) => Math.abs(t - n);
function y4(t, n) {
  const r = by(t.x, n.x), i = by(t.y, n.y);
  return Math.sqrt(r ** 2 + i ** 2);
}
class s2 {
  constructor(n, r, { transformPagePoint: i, contextWindow: o = window, dragSnapToOrigin: u = !1, distanceThreshold: c = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const v = sd(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, x = y4(v.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !x)
        return;
      const { point: S } = v, { timestamp: T } = St;
      this.history.push({ ...S, timestamp: T });
      const { onStart: E, onMove: N } = this.handlers;
      w || (E && E(this.lastMoveEvent, v), this.startEvent = this.lastMoveEvent), N && N(this.lastMoveEvent, v);
    }, this.handlePointerMove = (v, w) => {
      this.lastMoveEvent = v, this.lastMoveEventInfo = id(w, this.transformPagePoint), Ie.update(this.updatePoint, !0);
    }, this.handlePointerUp = (v, w) => {
      this.end();
      const { onEnd: x, onSessionEnd: S, resumeAnimation: T } = this.handlers;
      if (this.dragSnapToOrigin && T && T(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const E = sd(v.type === "pointercancel" ? this.lastMoveEventInfo : id(w, this.transformPagePoint), this.history);
      this.startEvent && x && x(v, E), S && S(v, E);
    }, !t0(n))
      return;
    this.dragSnapToOrigin = u, this.handlers = r, this.transformPagePoint = i, this.distanceThreshold = c, this.contextWindow = o || window;
    const h = oo(n), d = id(h, this.transformPagePoint), { point: p } = d, { timestamp: g } = St;
    this.history = [{ ...p, timestamp: g }];
    const { onSessionStart: y } = r;
    y && y(n, sd(d, this.history)), this.removeListeners = ro(qs(this.contextWindow, "pointermove", this.handlePointerMove), qs(this.contextWindow, "pointerup", this.handlePointerUp), qs(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(n) {
    this.handlers = n;
  }
  end() {
    this.removeListeners && this.removeListeners(), La(this.updatePoint);
  }
}
function id(t, n) {
  return n ? { point: n(t.point) } : t;
}
function wy(t, n) {
  return { x: t.x - n.x, y: t.y - n.y };
}
function sd({ point: t }, n) {
  return {
    point: t,
    delta: wy(t, o2(n)),
    offset: wy(t, v4(n)),
    velocity: b4(n, 0.1)
  };
}
function v4(t) {
  return t[0];
}
function o2(t) {
  return t[t.length - 1];
}
function b4(t, n) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let r = t.length - 1, i = null;
  const o = o2(t);
  for (; r >= 0 && (i = t[r], !(o.timestamp - i.timestamp > /* @__PURE__ */ On(n))); )
    r--;
  if (!i)
    return { x: 0, y: 0 };
  const u = /* @__PURE__ */ Ln(o.timestamp - i.timestamp);
  if (u === 0)
    return { x: 0, y: 0 };
  const c = {
    x: (o.x - i.x) / u,
    y: (o.y - i.y) / u
  };
  return c.x === 1 / 0 && (c.x = 0), c.y === 1 / 0 && (c.y = 0), c;
}
function w4(t, { min: n, max: r }, i) {
  return n !== void 0 && t < n ? t = i ? Qe(n, t, i.min) : Math.max(t, n) : r !== void 0 && t > r && (t = i ? Qe(r, t, i.max) : Math.min(t, r)), t;
}
function xy(t, n, r) {
  return {
    min: n !== void 0 ? t.min + n : void 0,
    max: r !== void 0 ? t.max + r - (t.max - t.min) : void 0
  };
}
function x4(t, { top: n, left: r, bottom: i, right: o }) {
  return {
    x: xy(t.x, r, o),
    y: xy(t.y, n, i)
  };
}
function Sy(t, n) {
  let r = n.min - t.min, i = n.max - t.max;
  return n.max - n.min < t.max - t.min && ([r, i] = [i, r]), { min: r, max: i };
}
function S4(t, n) {
  return {
    x: Sy(t.x, n.x),
    y: Sy(t.y, n.y)
  };
}
function A4(t, n) {
  let r = 0.5;
  const i = kt(t), o = kt(n);
  return o > i ? r = /* @__PURE__ */ Is(n.min, n.max - i, t.min) : i > o && (r = /* @__PURE__ */ Is(t.min, t.max - o, n.min)), ea(0, 1, r);
}
function T4(t, n) {
  const r = {};
  return n.min !== void 0 && (r.min = n.min - t.min), n.max !== void 0 && (r.max = n.max - t.min), r;
}
const ih = 0.35;
function M4(t = ih) {
  return t === !1 ? t = 0 : t === !0 && (t = ih), {
    x: Ay(t, "left", "right"),
    y: Ay(t, "top", "bottom")
  };
}
function Ay(t, n, r) {
  return {
    min: Ty(t, n),
    max: Ty(t, r)
  };
}
function Ty(t, n) {
  return typeof t == "number" ? t : t[n] || 0;
}
const E4 = /* @__PURE__ */ new WeakMap();
class C4 {
  constructor(n) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = nt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = n;
  }
  start(n, { snapToCursor: r = !1, distanceThreshold: i } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const u = (y) => {
      const { dragSnapToOrigin: v } = this.getProps();
      v ? this.pauseAnimation() : this.stopAnimation(), r && this.snapToCursor(oo(y).point);
    }, c = (y, v) => {
      const { drag: w, dragPropagation: x, onDragStart: S } = this.getProps();
      if (w && !x && (this.openDragLock && this.openDragLock(), this.openDragLock = HT(w), !this.openDragLock))
        return;
      this.latestPointerEvent = y, this.latestPanInfo = v, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), fn((E) => {
        let N = this.getAxisMotionValue(E).get() || 0;
        if (zn.test(N)) {
          const { projection: C } = this.visualElement;
          if (C && C.layout) {
            const X = C.layout.layoutBox[E];
            X && (N = kt(X) * (parseFloat(N) / 100));
          }
        }
        this.originPoint[E] = N;
      }), S && Ie.postRender(() => S(y, v)), th(this.visualElement, "transform");
      const { animationState: T } = this.visualElement;
      T && T.setActive("whileDrag", !0);
    }, h = (y, v) => {
      this.latestPointerEvent = y, this.latestPanInfo = v;
      const { dragPropagation: w, dragDirectionLock: x, onDirectionLock: S, onDrag: T } = this.getProps();
      if (!w && !this.openDragLock)
        return;
      const { offset: E } = v;
      if (x && this.currentDirection === null) {
        this.currentDirection = _4(E), this.currentDirection !== null && S && S(this.currentDirection);
        return;
      }
      this.updateAxis("x", v.point, E), this.updateAxis("y", v.point, E), this.visualElement.render(), T && T(y, v);
    }, d = (y, v) => {
      this.latestPointerEvent = y, this.latestPanInfo = v, this.stop(y, v), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, p = () => fn((y) => {
      var v;
      return this.getAnimationState(y) === "paused" && ((v = this.getAxisMotionValue(y).animation) == null ? void 0 : v.play());
    }), { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new s2(n, {
      onSessionStart: u,
      onStart: c,
      onMove: h,
      onSessionEnd: d,
      resumeAnimation: p
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: i,
      contextWindow: i2(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(n, r) {
    const i = n || this.latestPointerEvent, o = r || this.latestPanInfo, u = this.isDragging;
    if (this.cancel(), !u || !o || !i)
      return;
    const { velocity: c } = o;
    this.startAnimation(c);
    const { onDragEnd: h } = this.getProps();
    h && Ie.postRender(() => h(i, o));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: n, animationState: r } = this.visualElement;
    n && (n.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), r && r.setActive("whileDrag", !1);
  }
  updateAxis(n, r, i) {
    const { drag: o } = this.getProps();
    if (!i || !Dl(n, o, this.currentDirection))
      return;
    const u = this.getAxisMotionValue(n);
    let c = this.originPoint[n] + i[n];
    this.constraints && this.constraints[n] && (c = w4(c, this.constraints[n], this.elastic[n])), u.set(c);
  }
  resolveConstraints() {
    var u;
    const { dragConstraints: n, dragElastic: r } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (u = this.visualElement.projection) == null ? void 0 : u.layout, o = this.constraints;
    n && mi(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && i ? this.constraints = x4(i.layoutBox, n) : this.constraints = !1, this.elastic = M4(r), o !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && fn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = T4(i.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: n, onMeasureDragConstraints: r } = this.getProps();
    if (!n || !mi(n))
      return !1;
    const i = n.current, { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const u = g4(i, o.root, this.visualElement.getTransformPagePoint());
    let c = S4(o.layout.layoutBox, u);
    if (r) {
      const h = r(o4(c));
      this.hasMutatedConstraints = !!h, h && (c = Jw(h));
    }
    return c;
  }
  startAnimation(n) {
    const { drag: r, dragMomentum: i, dragElastic: o, dragTransition: u, dragSnapToOrigin: c, onDragTransitionEnd: h } = this.getProps(), d = this.constraints || {}, p = fn((g) => {
      if (!Dl(g, r, this.currentDirection))
        return;
      let y = d && d[g] || {};
      c && (y = { min: 0, max: 0 });
      const v = o ? 200 : 1e6, w = o ? 40 : 1e7, x = {
        type: "inertia",
        velocity: i ? n[g] : 0,
        bounceStiffness: v,
        bounceDamping: w,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...u,
        ...y
      };
      return this.startAxisValueAnimation(g, x);
    });
    return Promise.all(p).then(h);
  }
  startAxisValueAnimation(n, r) {
    const i = this.getAxisMotionValue(n);
    return th(this.visualElement, n), i.start(f0(n, i, 0, r, this.visualElement, !1));
  }
  stopAnimation() {
    fn((n) => this.getAxisMotionValue(n).stop());
  }
  pauseAnimation() {
    fn((n) => {
      var r;
      return (r = this.getAxisMotionValue(n).animation) == null ? void 0 : r.pause();
    });
  }
  getAnimationState(n) {
    var r;
    return (r = this.getAxisMotionValue(n).animation) == null ? void 0 : r.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(n) {
    const r = `_drag${n.toUpperCase()}`, i = this.visualElement.getProps(), o = i[r];
    return o || this.visualElement.getValue(n, (i.initial ? i.initial[n] : void 0) || 0);
  }
  snapToCursor(n) {
    fn((r) => {
      const { drag: i } = this.getProps();
      if (!Dl(r, i, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, u = this.getAxisMotionValue(r);
      if (o && o.layout) {
        const { min: c, max: h } = o.layout.layoutBox[r];
        u.set(n[r] - Qe(c, h, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: n, dragConstraints: r } = this.getProps(), { projection: i } = this.visualElement;
    if (!mi(r) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    fn((c) => {
      const h = this.getAxisMotionValue(c);
      if (h && this.constraints !== !1) {
        const d = h.get();
        o[c] = A4({ min: d, max: d }, this.constraints[c]);
      }
    });
    const { transformTemplate: u } = this.visualElement.getProps();
    this.visualElement.current.style.transform = u ? u({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), fn((c) => {
      if (!Dl(c, n, null))
        return;
      const h = this.getAxisMotionValue(c), { min: d, max: p } = this.constraints[c];
      h.set(Qe(d, p, o[c]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    E4.set(this.visualElement, this);
    const n = this.visualElement.current, r = qs(n, "pointerdown", (d) => {
      const { drag: p, dragListener: g = !0 } = this.getProps();
      p && g && this.start(d);
    }), i = () => {
      const { dragConstraints: d } = this.getProps();
      mi(d) && d.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: o } = this.visualElement, u = o.addEventListener("measure", i);
    o && !o.layout && (o.root && o.root.updateScroll(), o.updateLayout()), Ie.read(i);
    const c = $s(window, "resize", () => this.scalePositionWithinConstraints()), h = o.addEventListener("didUpdate", ({ delta: d, hasLayoutChanged: p }) => {
      this.isDragging && p && (fn((g) => {
        const y = this.getAxisMotionValue(g);
        y && (this.originPoint[g] += d[g].translate, y.set(y.get() + d[g].translate));
      }), this.visualElement.render());
    });
    return () => {
      c(), r(), u(), h && h();
    };
  }
  getProps() {
    const n = this.visualElement.getProps(), { drag: r = !1, dragDirectionLock: i = !1, dragPropagation: o = !1, dragConstraints: u = !1, dragElastic: c = ih, dragMomentum: h = !0 } = n;
    return {
      ...n,
      drag: r,
      dragDirectionLock: i,
      dragPropagation: o,
      dragConstraints: u,
      dragElastic: c,
      dragMomentum: h
    };
  }
}
function Dl(t, n, r) {
  return (n === !0 || n === t) && (r === null || r === t);
}
function _4(t, n = 10) {
  let r = null;
  return Math.abs(t.y) > n ? r = "y" : Math.abs(t.x) > n && (r = "x"), r;
}
class R4 extends Ha {
  constructor(n) {
    super(n), this.removeGroupControls = pn, this.removeListeners = pn, this.controls = new C4(n);
  }
  mount() {
    const { dragControls: n } = this.node.getProps();
    n && (this.removeGroupControls = n.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || pn;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const My = (t) => (n, r) => {
  t && Ie.postRender(() => t(n, r));
};
class k4 extends Ha {
  constructor() {
    super(...arguments), this.removePointerDownListener = pn;
  }
  onPointerDown(n) {
    this.session = new s2(n, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: i2(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: n, onPanStart: r, onPan: i, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: My(n),
      onStart: My(r),
      onMove: i,
      onEnd: (u, c) => {
        delete this.session, o && Ie.postRender(() => o(u, c));
      }
    };
  }
  mount() {
    this.removePointerDownListener = qs(this.node.current, "pointerdown", (n) => this.onPointerDown(n));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const Kl = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function Ey(t, n) {
  return n.max === n.min ? 0 : t / (n.max - n.min) * 100;
}
const Ls = {
  correct: (t, n) => {
    if (!n.target)
      return t;
    if (typeof t == "string")
      if (we.test(t))
        t = parseFloat(t);
      else
        return t;
    const r = Ey(t, n.target.x), i = Ey(t, n.target.y);
    return `${r}% ${i}%`;
  }
}, N4 = {
  correct: (t, { treeScale: n, projectionDelta: r }) => {
    const i = t, o = za.parse(t);
    if (o.length > 5)
      return i;
    const u = za.createTransformer(t), c = typeof o[0] != "number" ? 1 : 0, h = r.x.scale * n.x, d = r.y.scale * n.y;
    o[0 + c] /= h, o[1 + c] /= d;
    const p = Qe(h, d, 0.5);
    return typeof o[2 + c] == "number" && (o[2 + c] /= p), typeof o[3 + c] == "number" && (o[3 + c] /= p), u(o);
  }
};
let Cy = !1;
class D4 extends W.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: n, layoutGroup: r, switchLayoutGroup: i, layoutId: o } = this.props, { projection: u } = n;
    gM(O4), u && (r.group && r.group.add(u), i && i.register && o && i.register(u), Cy && u.root.didUpdate(), u.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), u.setOptions({
      ...u.options,
      onExitComplete: () => this.safeToRemove()
    })), Kl.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(n) {
    const { layoutDependency: r, visualElement: i, drag: o, isPresent: u } = this.props, { projection: c } = i;
    return c && (c.isPresent = u, Cy = !0, o || n.layoutDependency !== r || r === void 0 || n.isPresent !== u ? c.willUpdate() : this.safeToRemove(), n.isPresent !== u && (u ? c.promote() : c.relegate() || Ie.postRender(() => {
      const h = c.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: n } = this.props.visualElement;
    n && (n.root.didUpdate(), e0.postRender(() => {
      !n.currentAnimation && n.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: n, layoutGroup: r, switchLayoutGroup: i } = this.props, { projection: o } = n;
    o && (o.scheduleCheckAfterUnmount(), r && r.group && r.group.remove(o), i && i.deregister && i.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: n } = this.props;
    n && n();
  }
  render() {
    return null;
  }
}
function l2(t) {
  const [n, r] = Lw(), i = W.useContext(Nh);
  return Z.jsx(D4, { ...t, layoutGroup: i, switchLayoutGroup: W.useContext(Pw), isPresent: n, safeToRemove: r });
}
const O4 = {
  borderRadius: {
    ...Ls,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Ls,
  borderTopRightRadius: Ls,
  borderBottomLeftRadius: Ls,
  borderBottomRightRadius: Ls,
  boxShadow: N4
};
function L4(t, n, r) {
  const i = _t(t) ? t : wi(t);
  return i.start(f0("", i, n, r)), i.animation;
}
const z4 = (t, n) => t.depth - n.depth;
class B4 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(n) {
    Lh(this.children, n), this.isDirty = !0;
  }
  remove(n) {
    zh(this.children, n), this.isDirty = !0;
  }
  forEach(n) {
    this.isDirty && this.children.sort(z4), this.isDirty = !1, this.children.forEach(n);
  }
}
function V4(t, n) {
  const r = jt.now(), i = ({ timestamp: o }) => {
    const u = o - r;
    u >= n && (La(i), t(u - n));
  };
  return Ie.setup(i, !0), () => La(i);
}
const u2 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], U4 = u2.length, _y = (t) => typeof t == "string" ? parseFloat(t) : t, Ry = (t) => typeof t == "number" || we.test(t);
function j4(t, n, r, i, o, u) {
  o ? (t.opacity = Qe(0, r.opacity ?? 1, P4(i)), t.opacityExit = Qe(n.opacity ?? 1, 0, H4(i))) : u && (t.opacity = Qe(n.opacity ?? 1, r.opacity ?? 1, i));
  for (let c = 0; c < U4; c++) {
    const h = `border${u2[c]}Radius`;
    let d = ky(n, h), p = ky(r, h);
    if (d === void 0 && p === void 0)
      continue;
    d || (d = 0), p || (p = 0), d === 0 || p === 0 || Ry(d) === Ry(p) ? (t[h] = Math.max(Qe(_y(d), _y(p), i), 0), (zn.test(p) || zn.test(d)) && (t[h] += "%")) : t[h] = p;
  }
  (n.rotate || r.rotate) && (t.rotate = Qe(n.rotate || 0, r.rotate || 0, i));
}
function ky(t, n) {
  return t[n] !== void 0 ? t[n] : t.borderRadius;
}
const P4 = /* @__PURE__ */ c2(0, 0.5, tw), H4 = /* @__PURE__ */ c2(0.5, 0.95, pn);
function c2(t, n, r) {
  return (i) => i < t ? 0 : i > n ? 1 : r(/* @__PURE__ */ Is(t, n, i));
}
function Ny(t, n) {
  t.min = n.min, t.max = n.max;
}
function cn(t, n) {
  Ny(t.x, n.x), Ny(t.y, n.y);
}
function Dy(t, n) {
  t.translate = n.translate, t.scale = n.scale, t.originPoint = n.originPoint, t.origin = n.origin;
}
function Oy(t, n, r, i, o) {
  return t -= n, t = nu(t, 1 / r, i), o !== void 0 && (t = nu(t, 1 / o, i)), t;
}
function q4(t, n = 0, r = 1, i = 0.5, o, u = t, c = t) {
  if (zn.test(n) && (n = parseFloat(n), n = Qe(c.min, c.max, n / 100) - c.min), typeof n != "number")
    return;
  let h = Qe(u.min, u.max, i);
  t === u && (h -= n), t.min = Oy(t.min, n, r, h, o), t.max = Oy(t.max, n, r, h, o);
}
function Ly(t, n, [r, i, o], u, c) {
  q4(t, n[r], n[i], n[o], n.scale, u, c);
}
const G4 = ["x", "scaleX", "originX"], Y4 = ["y", "scaleY", "originY"];
function zy(t, n, r, i) {
  Ly(t.x, n, G4, r ? r.x : void 0, i ? i.x : void 0), Ly(t.y, n, Y4, r ? r.y : void 0, i ? i.y : void 0);
}
function By(t) {
  return t.translate === 0 && t.scale === 1;
}
function f2(t) {
  return By(t.x) && By(t.y);
}
function Vy(t, n) {
  return t.min === n.min && t.max === n.max;
}
function X4(t, n) {
  return Vy(t.x, n.x) && Vy(t.y, n.y);
}
function Uy(t, n) {
  return Math.round(t.min) === Math.round(n.min) && Math.round(t.max) === Math.round(n.max);
}
function d2(t, n) {
  return Uy(t.x, n.x) && Uy(t.y, n.y);
}
function jy(t) {
  return kt(t.x) / kt(t.y);
}
function Py(t, n) {
  return t.translate === n.translate && t.scale === n.scale && t.originPoint === n.originPoint;
}
class I4 {
  constructor() {
    this.members = [];
  }
  add(n) {
    Lh(this.members, n), n.scheduleRender();
  }
  remove(n) {
    if (zh(this.members, n), n === this.prevLead && (this.prevLead = void 0), n === this.lead) {
      const r = this.members[this.members.length - 1];
      r && this.promote(r);
    }
  }
  relegate(n) {
    const r = this.members.findIndex((o) => n === o);
    if (r === 0)
      return !1;
    let i;
    for (let o = r; o >= 0; o--) {
      const u = this.members[o];
      if (u.isPresent !== !1) {
        i = u;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(n, r) {
    const i = this.lead;
    if (n !== i && (this.prevLead = i, this.lead = n, n.show(), i)) {
      i.instance && i.scheduleRender(), n.scheduleRender(), n.resumeFrom = i, r && (n.resumeFrom.preserveOpacity = !0), i.snapshot && (n.snapshot = i.snapshot, n.snapshot.latestValues = i.animationValues || i.latestValues), n.root && n.root.isUpdating && (n.isLayoutDirty = !0);
      const { crossfade: o } = n.options;
      o === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((n) => {
      const { options: r, resumingFrom: i } = n;
      r.onExitComplete && r.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((n) => {
      n.instance && n.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Z4(t, n, r) {
  let i = "";
  const o = t.x.translate / n.x, u = t.y.translate / n.y, c = (r == null ? void 0 : r.z) || 0;
  if ((o || u || c) && (i = `translate3d(${o}px, ${u}px, ${c}px) `), (n.x !== 1 || n.y !== 1) && (i += `scale(${1 / n.x}, ${1 / n.y}) `), r) {
    const { transformPerspective: p, rotate: g, rotateX: y, rotateY: v, skewX: w, skewY: x } = r;
    p && (i = `perspective(${p}px) ${i}`), g && (i += `rotate(${g}deg) `), y && (i += `rotateX(${y}deg) `), v && (i += `rotateY(${v}deg) `), w && (i += `skewX(${w}deg) `), x && (i += `skewY(${x}deg) `);
  }
  const h = t.x.scale * n.x, d = t.y.scale * n.y;
  return (h !== 1 || d !== 1) && (i += `scale(${h}, ${d})`), i || "none";
}
const od = ["", "X", "Y", "Z"], W4 = 1e3;
let K4 = 0;
function ld(t, n, r, i) {
  const { latestValues: o } = n;
  o[t] && (r[t] = o[t], n.setStaticValue(t, 0), i && (i[t] = 0));
}
function h2(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: n } = t.options;
  if (!n)
    return;
  const r = Kw(n);
  if (window.MotionHasOptimisedAnimation(r, "transform")) {
    const { layout: o, layoutId: u } = t.options;
    window.MotionCancelOptimisedAnimation(r, "transform", Ie, !(o || u));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && h2(i);
}
function p2({ attachResizeListener: t, defaultParent: n, measureScroll: r, checkIsScrollRoot: i, resetTransform: o }) {
  return class {
    constructor(c = {}, h = n == null ? void 0 : n()) {
      this.id = K4++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach($4), this.nodes.forEach(n6), this.nodes.forEach(a6), this.nodes.forEach(J4);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = c, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let d = 0; d < this.path.length; d++)
        this.path[d].shouldResetTransform = !0;
      this.root === this && (this.nodes = new B4());
    }
    addEventListener(c, h) {
      return this.eventHandlers.has(c) || this.eventHandlers.set(c, new Uh()), this.eventHandlers.get(c).add(h);
    }
    notifyListeners(c, ...h) {
      const d = this.eventHandlers.get(c);
      d && d.notify(...h);
    }
    hasListeners(c) {
      return this.eventHandlers.has(c);
    }
    /**
     * Lifecycles
     */
    mount(c) {
      if (this.instance)
        return;
      this.isSVG = Ow(c) && !ZT(c), this.instance = c;
      const { layoutId: h, layout: d, visualElement: p } = this.options;
      if (p && !p.current && p.mount(c), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (d || h) && (this.isLayoutDirty = !0), t) {
        let g, y = 0;
        const v = () => this.root.updateBlockedByResize = !1;
        Ie.read(() => {
          y = window.innerWidth;
        }), t(c, () => {
          const w = window.innerWidth;
          w !== y && (y = w, this.root.updateBlockedByResize = !0, g && g(), g = V4(v, 250), Kl.hasAnimatedSinceResize && (Kl.hasAnimatedSinceResize = !1, this.nodes.forEach(Gy)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && p && (h || d) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: y, hasRelativeLayoutChanged: v, layout: w }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const x = this.options.transition || p.getDefaultTransition() || l6, { onLayoutAnimationStart: S, onLayoutAnimationComplete: T } = p.getProps(), E = !this.targetLayout || !d2(this.targetLayout, w), N = !y && v;
        if (this.options.layoutRoot || this.resumeFrom || N || y && (E || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const C = {
            ...$h(x, "layout"),
            onPlay: S,
            onComplete: T
          };
          (p.shouldReduceMotion || this.options.layoutRoot) && (C.delay = 0, C.type = !1), this.startAnimation(C), this.setAnimationOrigin(g, N);
        } else
          y || Gy(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = w;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const c = this.getStack();
      c && c.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), La(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(r6), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: c } = this.options;
      return c && c.getProps().transformTemplate;
    }
    willUpdate(c = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && h2(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const y = this.path[g];
        y.shouldResetTransform = !0, y.updateScroll("snapshot"), y.options.layoutRoot && y.willUpdate(!1);
      }
      const { layoutId: h, layout: d } = this.options;
      if (h === void 0 && !d)
        return;
      const p = this.getTransformTemplate();
      this.prevTransformTemplateValue = p ? p(this.latestValues, "") : void 0, this.updateSnapshot(), c && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Hy);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(qy);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(t6), this.nodes.forEach(Q4), this.nodes.forEach(F4)) : this.nodes.forEach(qy), this.clearAllSnapshots();
      const h = jt.now();
      St.delta = ea(0, 1e3 / 60, h - St.timestamp), St.timestamp = h, St.isProcessing = !0, $f.update.process(St), $f.preRender.process(St), $f.render.process(St), St.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, e0.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(e6), this.sharedNodes.forEach(i6);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Ie.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ie.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !kt(this.snapshot.measuredBox.x) && !kt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let d = 0; d < this.path.length; d++)
          this.path[d].updateScroll();
      const c = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = nt(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, c ? c.layoutBox : void 0);
    }
    updateScroll(c = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === c && (h = !1), h && this.instance) {
        const d = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: c,
          isRoot: d,
          offset: r(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : d
        };
      }
    }
    resetTransform() {
      if (!o)
        return;
      const c = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !f2(this.projectionDelta), d = this.getTransformTemplate(), p = d ? d(this.latestValues, "") : void 0, g = p !== this.prevTransformTemplateValue;
      c && this.instance && (h || ur(this.latestValues) || g) && (o(this.instance, p), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(c = !0) {
      const h = this.measurePageBox();
      let d = this.removeElementScroll(h);
      return c && (d = this.removeTransform(d)), u6(d), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: d,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var p;
      const { visualElement: c } = this.options;
      if (!c)
        return nt();
      const h = c.measureViewportBox();
      if (!(((p = this.scroll) == null ? void 0 : p.wasRoot) || this.path.some(c6))) {
        const { scroll: g } = this.root;
        g && (yi(h.x, g.offset.x), yi(h.y, g.offset.y));
      }
      return h;
    }
    removeElementScroll(c) {
      var d;
      const h = nt();
      if (cn(h, c), (d = this.scroll) != null && d.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p], { scroll: y, options: v } = g;
        g !== this.root && y && v.layoutScroll && (y.wasRoot && cn(h, c), yi(h.x, y.offset.x), yi(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(c, h = !1) {
      const d = nt();
      cn(d, c);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        !h && g.options.layoutScroll && g.scroll && g !== g.root && vi(d, {
          x: -g.scroll.offset.x,
          y: -g.scroll.offset.y
        }), ur(g.latestValues) && vi(d, g.latestValues);
      }
      return ur(this.latestValues) && vi(d, this.latestValues), d;
    }
    removeTransform(c) {
      const h = nt();
      cn(h, c);
      for (let d = 0; d < this.path.length; d++) {
        const p = this.path[d];
        if (!p.instance || !ur(p.latestValues))
          continue;
        ah(p.latestValues) && p.updateSnapshot();
        const g = nt(), y = p.measurePageBox();
        cn(g, y), zy(h, p.latestValues, p.snapshot ? p.snapshot.layoutBox : void 0, g);
      }
      return ur(this.latestValues) && zy(h, this.latestValues), h;
    }
    setTargetDelta(c) {
      this.targetDelta = c, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(c) {
      this.options = {
        ...this.options,
        ...c,
        crossfade: c.crossfade !== void 0 ? c.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== St.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(c = !1) {
      var v;
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const d = !!this.resumingFrom || this !== h;
      if (!(c || d && this.isSharedProjectionDirty || this.isProjectionDirty || (v = this.parent) != null && v.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: y } = this.options;
      if (!(!this.layout || !(g || y))) {
        if (this.resolvedRelativeTargetAt = St.timestamp, !this.targetDelta && !this.relativeTarget) {
          const w = this.getClosestProjectingParent();
          w && w.layout && this.animationProgress !== 1 ? (this.relativeParent = w, this.forceRelativeParentToResolveTarget(), this.relativeTarget = nt(), this.relativeTargetOrigin = nt(), Ys(this.relativeTargetOrigin, this.layout.layoutBox, w.layout.layoutBox), cn(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = nt(), this.targetWithTransforms = nt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), p4(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : cn(this.target, this.layout.layoutBox), a2(this.target, this.targetDelta)) : cn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const w = this.getClosestProjectingParent();
          w && !!w.resumingFrom == !!this.resumingFrom && !w.options.layoutScroll && w.target && this.animationProgress !== 1 ? (this.relativeParent = w, this.forceRelativeParentToResolveTarget(), this.relativeTarget = nt(), this.relativeTargetOrigin = nt(), Ys(this.relativeTargetOrigin, this.target, w.target), cn(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || ah(this.parent.latestValues) || n2(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var x;
      const c = this.getLead(), h = !!this.resumingFrom || this !== c;
      let d = !0;
      if ((this.isProjectionDirty || (x = this.parent) != null && x.isProjectionDirty) && (d = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (d = !1), this.resolvedRelativeTargetAt === St.timestamp && (d = !1), d)
        return;
      const { layout: p, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(p || g))
        return;
      cn(this.layoutCorrected, this.layout.layoutBox);
      const y = this.treeScale.x, v = this.treeScale.y;
      m4(this.layoutCorrected, this.treeScale, this.path, h), c.layout && !c.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (c.target = c.layout.layoutBox, c.targetWithTransforms = nt());
      const { target: w } = c;
      if (!w) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Dy(this.prevProjectionDelta.x, this.projectionDelta.x), Dy(this.prevProjectionDelta.y, this.projectionDelta.y)), Gs(this.projectionDelta, this.layoutCorrected, w, this.latestValues), (this.treeScale.x !== y || this.treeScale.y !== v || !Py(this.projectionDelta.x, this.prevProjectionDelta.x) || !Py(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", w));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(c = !0) {
      var h;
      if ((h = this.options.visualElement) == null || h.scheduleRender(), c) {
        const d = this.getStack();
        d && d.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = gi(), this.projectionDelta = gi(), this.projectionDeltaWithTransform = gi();
    }
    setAnimationOrigin(c, h = !1) {
      const d = this.snapshot, p = d ? d.latestValues : {}, g = { ...this.latestValues }, y = gi();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const v = nt(), w = d ? d.source : void 0, x = this.layout ? this.layout.source : void 0, S = w !== x, T = this.getStack(), E = !T || T.members.length <= 1, N = !!(S && !E && this.options.crossfade === !0 && !this.path.some(o6));
      this.animationProgress = 0;
      let C;
      this.mixTargetDelta = (X) => {
        const D = X / 1e3;
        Yy(y.x, c.x, D), Yy(y.y, c.y, D), this.setTargetDelta(y), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Ys(v, this.layout.layoutBox, this.relativeParent.layout.layoutBox), s6(this.relativeTarget, this.relativeTargetOrigin, v, D), C && X4(this.relativeTarget, C) && (this.isProjectionDirty = !1), C || (C = nt()), cn(C, this.relativeTarget)), S && (this.animationValues = g, j4(g, p, this.latestValues, D, N, E)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = D;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(c) {
      var h, d, p;
      this.notifyListeners("animationStart"), (h = this.currentAnimation) == null || h.stop(), (p = (d = this.resumingFrom) == null ? void 0 : d.currentAnimation) == null || p.stop(), this.pendingAnimation && (La(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Ie.update(() => {
        Kl.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = wi(0)), this.currentAnimation = L4(this.motionValue, [0, 1e3], {
          ...c,
          velocity: 0,
          isSync: !0,
          onUpdate: (g) => {
            this.mixTargetDelta(g), c.onUpdate && c.onUpdate(g);
          },
          onStop: () => {
          },
          onComplete: () => {
            c.onComplete && c.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const c = this.getStack();
      c && c.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(W4), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const c = this.getLead();
      let { targetWithTransforms: h, target: d, layout: p, latestValues: g } = c;
      if (!(!h || !d || !p)) {
        if (this !== c && this.layout && p && m2(this.options.animationType, this.layout.layoutBox, p.layoutBox)) {
          d = this.target || nt();
          const y = kt(this.layout.layoutBox.x);
          d.x.min = c.target.x.min, d.x.max = d.x.min + y;
          const v = kt(this.layout.layoutBox.y);
          d.y.min = c.target.y.min, d.y.max = d.y.min + v;
        }
        cn(h, d), vi(h, g), Gs(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(c, h) {
      this.sharedNodes.has(c) || this.sharedNodes.set(c, new I4()), this.sharedNodes.get(c).add(h);
      const p = h.options.initialPromotionConfig;
      h.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity: p && p.shouldPreserveFollowOpacity ? p.shouldPreserveFollowOpacity(h) : void 0
      });
    }
    isLead() {
      const c = this.getStack();
      return c ? c.lead === this : !0;
    }
    getLead() {
      var h;
      const { layoutId: c } = this.options;
      return c ? ((h = this.getStack()) == null ? void 0 : h.lead) || this : this;
    }
    getPrevLead() {
      var h;
      const { layoutId: c } = this.options;
      return c ? (h = this.getStack()) == null ? void 0 : h.prevLead : void 0;
    }
    getStack() {
      const { layoutId: c } = this.options;
      if (c)
        return this.root.sharedNodes.get(c);
    }
    promote({ needsReset: c, transition: h, preserveFollowOpacity: d } = {}) {
      const p = this.getStack();
      p && p.promote(this, d), c && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
    }
    relegate() {
      const c = this.getStack();
      return c ? c.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: c } = this.options;
      if (!c)
        return;
      let h = !1;
      const { latestValues: d } = c;
      if ((d.z || d.rotate || d.rotateX || d.rotateY || d.rotateZ || d.skewX || d.skewY) && (h = !0), !h)
        return;
      const p = {};
      d.z && ld("z", c, p, this.animationValues);
      for (let g = 0; g < od.length; g++)
        ld(`rotate${od[g]}`, c, p, this.animationValues), ld(`skew${od[g]}`, c, p, this.animationValues);
      c.render();
      for (const g in p)
        c.setStaticValue(g, p[g]), this.animationValues && (this.animationValues[g] = p[g]);
      c.scheduleRender();
    }
    applyProjectionStyles(c, h) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        c.visibility = "hidden";
        return;
      }
      const d = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, c.visibility = "", c.opacity = "", c.pointerEvents = Wl(h == null ? void 0 : h.pointerEvents) || "", c.transform = d ? d(this.latestValues, "") : "none";
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId && (c.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, c.pointerEvents = Wl(h == null ? void 0 : h.pointerEvents) || ""), this.hasProjected && !ur(this.latestValues) && (c.transform = d ? d({}, "") : "none", this.hasProjected = !1);
        return;
      }
      c.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let y = Z4(this.projectionDeltaWithTransform, this.treeScale, g);
      d && (y = d(g, y)), c.transform = y;
      const { x: v, y: w } = this.projectionDelta;
      c.transformOrigin = `${v.origin * 100}% ${w.origin * 100}% 0`, p.animationValues ? c.opacity = p === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : c.opacity = p === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const x in Qs) {
        if (g[x] === void 0)
          continue;
        const { correct: S, applyTo: T, isCSSVariable: E } = Qs[x], N = y === "none" ? g[x] : S(g[x], p);
        if (T) {
          const C = T.length;
          for (let X = 0; X < C; X++)
            c[T[X]] = N;
        } else
          E ? this.options.visualElement.renderState.vars[x] = N : c[x] = N;
      }
      this.options.layoutId && (c.pointerEvents = p === this ? Wl(h == null ? void 0 : h.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((c) => {
        var h;
        return (h = c.currentAnimation) == null ? void 0 : h.stop();
      }), this.root.nodes.forEach(Hy), this.root.sharedNodes.clear();
    }
  };
}
function Q4(t) {
  t.updateLayout();
}
function F4(t) {
  var r;
  const n = ((r = t.resumeFrom) == null ? void 0 : r.snapshot) || t.snapshot;
  if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
    const { layoutBox: i, measuredBox: o } = t.layout, { animationType: u } = t.options, c = n.source !== t.layout.source;
    u === "size" ? fn((y) => {
      const v = c ? n.measuredBox[y] : n.layoutBox[y], w = kt(v);
      v.min = i[y].min, v.max = v.min + w;
    }) : m2(u, n.layoutBox, i) && fn((y) => {
      const v = c ? n.measuredBox[y] : n.layoutBox[y], w = kt(i[y]);
      v.max = v.min + w, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[y].max = t.relativeTarget[y].min + w);
    });
    const h = gi();
    Gs(h, i, n.layoutBox);
    const d = gi();
    c ? Gs(d, t.applyTransform(o, !0), n.measuredBox) : Gs(d, i, n.layoutBox);
    const p = !f2(h);
    let g = !1;
    if (!t.resumeFrom) {
      const y = t.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: v, layout: w } = y;
        if (v && w) {
          const x = nt();
          Ys(x, n.layoutBox, v.layoutBox);
          const S = nt();
          Ys(S, i, w.layoutBox), d2(x, S) || (g = !0), y.options.layoutRoot && (t.relativeTarget = S, t.relativeTargetOrigin = x, t.relativeParent = y);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: i,
      snapshot: n,
      delta: d,
      layoutDelta: h,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: g
    });
  } else if (t.isLead()) {
    const { onExitComplete: i } = t.options;
    i && i();
  }
  t.options.transition = void 0;
}
function $4(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function J4(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function e6(t) {
  t.clearSnapshot();
}
function Hy(t) {
  t.clearMeasurements();
}
function qy(t) {
  t.isLayoutDirty = !1;
}
function t6(t) {
  const { visualElement: n } = t.options;
  n && n.getProps().onBeforeLayoutMeasure && n.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Gy(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function n6(t) {
  t.resolveTargetDelta();
}
function a6(t) {
  t.calcProjection();
}
function r6(t) {
  t.resetSkewAndRotation();
}
function i6(t) {
  t.removeLeadSnapshot();
}
function Yy(t, n, r) {
  t.translate = Qe(n.translate, 0, r), t.scale = Qe(n.scale, 1, r), t.origin = n.origin, t.originPoint = n.originPoint;
}
function Xy(t, n, r, i) {
  t.min = Qe(n.min, r.min, i), t.max = Qe(n.max, r.max, i);
}
function s6(t, n, r, i) {
  Xy(t.x, n.x, r.x, i), Xy(t.y, n.y, r.y, i);
}
function o6(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const l6 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Iy = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), Zy = Iy("applewebkit/") && !Iy("chrome/") ? Math.round : pn;
function Wy(t) {
  t.min = Zy(t.min), t.max = Zy(t.max);
}
function u6(t) {
  Wy(t.x), Wy(t.y);
}
function m2(t, n, r) {
  return t === "position" || t === "preserve-aspect" && !h4(jy(n), jy(r), 0.2);
}
function c6(t) {
  var n;
  return t !== t.root && ((n = t.scroll) == null ? void 0 : n.wasRoot);
}
const f6 = p2({
  attachResizeListener: (t, n) => $s(t, "resize", n),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), ud = {
  current: void 0
}, g2 = p2({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!ud.current) {
      const t = new f6({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), ud.current = t;
    }
    return ud.current;
  },
  resetTransform: (t, n) => {
    t.style.transform = n !== void 0 ? n : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), d6 = {
  pan: {
    Feature: k4
  },
  drag: {
    Feature: R4,
    ProjectionNode: g2,
    MeasureLayout: l2
  }
};
function Ky(t, n, r) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, u = i[o];
  u && Ie.postRender(() => u(n, oo(n)));
}
class h6 extends Ha {
  mount() {
    const { current: n } = this.node;
    n && (this.unmount = qT(n, (r, i) => (Ky(this.node, i, "Start"), (o) => Ky(this.node, o, "End"))));
  }
  unmount() {
  }
}
class p6 extends Ha {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let n = !1;
    try {
      n = this.node.current.matches(":focus-visible");
    } catch {
      n = !0;
    }
    !n || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = ro($s(this.node.current, "focus", () => this.onFocus()), $s(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Qy(t, n, r) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), u = i[o];
  u && Ie.postRender(() => u(n, oo(n)));
}
class m6 extends Ha {
  mount() {
    const { current: n } = this.node;
    n && (this.unmount = IT(n, (r, i) => (Qy(this.node, i, "Start"), (o, { success: u }) => Qy(this.node, o, u ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const sh = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap(), g6 = (t) => {
  const n = sh.get(t.target);
  n && n(t);
}, y6 = (t) => {
  t.forEach(g6);
};
function v6({ root: t, ...n }) {
  const r = t || document;
  cd.has(r) || cd.set(r, {});
  const i = cd.get(r), o = JSON.stringify(n);
  return i[o] || (i[o] = new IntersectionObserver(y6, { root: t, ...n })), i[o];
}
function b6(t, n, r) {
  const i = v6(n);
  return sh.set(t, r), i.observe(t), () => {
    sh.delete(t), i.unobserve(t);
  };
}
const w6 = {
  some: 0,
  all: 1
};
class x6 extends Ha {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: n = {} } = this.node.getProps(), { root: r, margin: i, amount: o = "some", once: u } = n, c = {
      root: r ? r.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : w6[o]
    }, h = (d) => {
      const { isIntersecting: p } = d;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: g, onViewportLeave: y } = this.node.getProps(), v = p ? g : y;
      v && v(d);
    };
    return b6(this.node.current, c, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: n, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(S6(n, r)) && this.startObserver();
  }
  unmount() {
  }
}
function S6({ viewport: t = {} }, { viewport: n = {} } = {}) {
  return (r) => t[r] !== n[r];
}
const A6 = {
  inView: {
    Feature: x6
  },
  tap: {
    Feature: m6
  },
  focus: {
    Feature: p6
  },
  hover: {
    Feature: h6
  }
}, T6 = {
  layout: {
    ProjectionNode: g2,
    MeasureLayout: l2
  }
}, oh = { current: null }, y2 = { current: !1 };
function M6() {
  if (y2.current = !0, !!Oh)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), n = () => oh.current = t.matches;
      t.addEventListener("change", n), n();
    } else
      oh.current = !1;
}
const E6 = /* @__PURE__ */ new WeakMap();
function C6(t, n, r) {
  for (const i in n) {
    const o = n[i], u = r[i];
    if (_t(o))
      t.addValue(i, o);
    else if (_t(u))
      t.addValue(i, wi(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const c = t.getValue(i);
        c.liveStyle === !0 ? c.jump(o) : c.hasAnimated || c.set(o);
      } else {
        const c = t.getStaticValue(i);
        t.addValue(i, wi(c !== void 0 ? c : o, { owner: t }));
      }
  }
  for (const i in r)
    n[i] === void 0 && t.removeValue(i);
  return n;
}
const Fy = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class _6 {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(n, r, i) {
    return {};
  }
  constructor({ parent: n, props: r, presenceContext: i, reducedMotionConfig: o, blockInitialAnimation: u, visualState: c }, h = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Qh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const v = jt.now();
      this.renderScheduledAt < v && (this.renderScheduledAt = v, Ie.render(this.render, !1, !0));
    };
    const { latestValues: d, renderState: p } = c;
    this.latestValues = d, this.baseTarget = { ...d }, this.initialValues = r.initial ? { ...d } : {}, this.renderState = p, this.parent = n, this.props = r, this.presenceContext = i, this.depth = n ? n.depth + 1 : 0, this.reducedMotionConfig = o, this.options = h, this.blockInitialAnimation = !!u, this.isControllingVariants = bu(r), this.isVariantNode = Uw(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(n && n.current);
    const { willChange: g, ...y } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const v in y) {
      const w = y[v];
      d[v] !== void 0 && _t(w) && w.set(d[v], !1);
    }
  }
  mount(n) {
    this.current = n, E6.set(n, this), this.projection && !this.projection.instance && this.projection.mount(n), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, i) => this.bindToMotionValue(i, r)), y2.current || M6(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : oh.current, this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), La(this.notifyUpdate), La(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const r = this.features[n];
      r && (r.unmount(), r.isMounted = !1);
    }
    this.current = null;
  }
  bindToMotionValue(n, r) {
    this.valueSubscriptions.has(n) && this.valueSubscriptions.get(n)();
    const i = ki.has(n);
    i && this.onBindTransform && this.onBindTransform();
    const o = r.on("change", (h) => {
      this.latestValues[n] = h, this.props.onUpdate && Ie.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0);
    }), u = r.on("renderRequest", this.scheduleRender);
    let c;
    window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, n, r)), this.valueSubscriptions.set(n, () => {
      o(), u(), c && c(), r.owner && r.stop();
    });
  }
  sortNodePosition(n) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== n.type ? 0 : this.sortInstanceNodePosition(this.current, n.current);
  }
  updateFeatures() {
    let n = "animation";
    for (n in xi) {
      const r = xi[n];
      if (!r)
        continue;
      const { isEnabled: i, Feature: o } = r;
      if (!this.features[n] && o && i(this.props) && (this.features[n] = new o(this)), this.features[n]) {
        const u = this.features[n];
        u.isMounted ? u.update() : (u.mount(), u.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : nt();
  }
  getStaticValue(n) {
    return this.latestValues[n];
  }
  setStaticValue(n, r) {
    this.latestValues[n] = r;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(n, r) {
    (n.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = n, this.prevPresenceContext = this.presenceContext, this.presenceContext = r;
    for (let i = 0; i < Fy.length; i++) {
      const o = Fy[i];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, c = n[u];
      c && (this.propEventSubscriptions[o] = this.on(o, c));
    }
    this.prevMotionValues = C6(this, this.scrapeMotionValuesFromProps(n, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(n) {
    return this.props.variants ? this.props.variants[n] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(n) {
    const r = this.getClosestVariantNode();
    if (r)
      return r.variantChildren && r.variantChildren.add(n), () => r.variantChildren.delete(n);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(n, r) {
    const i = this.values.get(n);
    r !== i && (i && this.removeValue(n), this.bindToMotionValue(n, r), this.values.set(n, r), this.latestValues[n] = r.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(n) {
    this.values.delete(n);
    const r = this.valueSubscriptions.get(n);
    r && (r(), this.valueSubscriptions.delete(n)), delete this.latestValues[n], this.removeValueFromRenderState(n, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(n) {
    return this.values.has(n);
  }
  getValue(n, r) {
    if (this.props.values && this.props.values[n])
      return this.props.values[n];
    let i = this.values.get(n);
    return i === void 0 && r !== void 0 && (i = wi(r === null ? void 0 : r, { owner: this }), this.addValue(n, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(n, r) {
    let i = this.latestValues[n] !== void 0 || !this.current ? this.latestValues[n] : this.getBaseTargetFromProps(this.props, n) ?? this.readValueFromInstance(this.current, n, this.options);
    return i != null && (typeof i == "string" && (Xb(i) || Zb(i)) ? i = parseFloat(i) : !KT(i) && za.test(r) && (i = _w(n, r)), this.setBaseTarget(n, _t(i) ? i.get() : i)), _t(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(n, r) {
    this.baseTarget[n] = r;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(n) {
    var u;
    const { initial: r } = this.props;
    let i;
    if (typeof r == "string" || typeof r == "object") {
      const c = u0(this.props, r, (u = this.presenceContext) == null ? void 0 : u.custom);
      c && (i = c[n]);
    }
    if (r && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, n);
    return o !== void 0 && !_t(o) ? o : this.initialValues[n] !== void 0 && i === void 0 ? void 0 : this.baseTarget[n];
  }
  on(n, r) {
    return this.events[n] || (this.events[n] = new Uh()), this.events[n].add(r);
  }
  notify(n, ...r) {
    this.events[n] && this.events[n].notify(...r);
  }
}
class v2 extends _6 {
  constructor() {
    super(...arguments), this.KeyframeResolver = VT;
  }
  sortInstanceNodePosition(n, r) {
    return n.compareDocumentPosition(r) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(n, r) {
    return n.style ? n.style[r] : void 0;
  }
  removeValueFromRenderState(n, { vars: r, style: i }) {
    delete r[n], delete i[n];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: n } = this.props;
    _t(n) && (this.childSubscription = n.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
function b2(t, { style: n, vars: r }, i, o) {
  const u = t.style;
  let c;
  for (c in n)
    u[c] = n[c];
  o == null || o.applyProjectionStyles(u, i);
  for (c in r)
    u.setProperty(c, r[c]);
}
function R6(t) {
  return window.getComputedStyle(t);
}
class k6 extends v2 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = b2;
  }
  readValueFromInstance(n, r) {
    var i;
    if (ki.has(r))
      return (i = this.projection) != null && i.isProjecting ? Wd(r) : nT(n, r);
    {
      const o = R6(n), u = (Hh(r) ? o.getPropertyValue(r) : o[r]) || 0;
      return typeof u == "string" ? u.trim() : u;
    }
  }
  measureInstanceViewportBox(n, { transformPagePoint: r }) {
    return r2(n, r);
  }
  build(n, r, i) {
    s0(n, r, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(n, r, i) {
    return c0(n, r, i);
  }
}
const w2 = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function N6(t, n, r, i) {
  b2(t, n, void 0, i);
  for (const o in n.attrs)
    t.setAttribute(w2.has(o) ? o : i0(o), n.attrs[o]);
}
class D6 extends v2 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = nt;
  }
  getBaseTargetFromProps(n, r) {
    return n[r];
  }
  readValueFromInstance(n, r) {
    if (ki.has(r)) {
      const i = Cw(r);
      return i && i.default || 0;
    }
    return r = w2.has(r) ? r : i0(r), n.getAttribute(r);
  }
  scrapeMotionValuesFromProps(n, r, i) {
    return Ww(n, r, i);
  }
  build(n, r, i) {
    Yw(n, r, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(n, r, i, o) {
    N6(n, r, i, o);
  }
  mount(n) {
    this.isSVGTag = Iw(n.tagName), super.mount(n);
  }
}
const O6 = (t, n) => l0(t) ? new D6(n) : new k6(n, {
  allowProjection: t !== W.Fragment
}), L6 = /* @__PURE__ */ OM({
  ...i4,
  ...A6,
  ...d6,
  ...T6
}, O6), hn = /* @__PURE__ */ rM(L6);
var fd = { exports: {} }, $y;
function z6() {
  return $y || ($y = 1, function(t) {
    var n = Object.prototype.hasOwnProperty, r = "~";
    function i() {
    }
    Object.create && (i.prototype = /* @__PURE__ */ Object.create(null), new i().__proto__ || (r = !1));
    function o(d, p, g) {
      this.fn = d, this.context = p, this.once = g || !1;
    }
    function u(d, p, g, y, v) {
      if (typeof g != "function")
        throw new TypeError("The listener must be a function");
      var w = new o(g, y || d, v), x = r ? r + p : p;
      return d._events[x] ? d._events[x].fn ? d._events[x] = [d._events[x], w] : d._events[x].push(w) : (d._events[x] = w, d._eventsCount++), d;
    }
    function c(d, p) {
      --d._eventsCount === 0 ? d._events = new i() : delete d._events[p];
    }
    function h() {
      this._events = new i(), this._eventsCount = 0;
    }
    h.prototype.eventNames = function() {
      var p = [], g, y;
      if (this._eventsCount === 0) return p;
      for (y in g = this._events)
        n.call(g, y) && p.push(r ? y.slice(1) : y);
      return Object.getOwnPropertySymbols ? p.concat(Object.getOwnPropertySymbols(g)) : p;
    }, h.prototype.listeners = function(p) {
      var g = r ? r + p : p, y = this._events[g];
      if (!y) return [];
      if (y.fn) return [y.fn];
      for (var v = 0, w = y.length, x = new Array(w); v < w; v++)
        x[v] = y[v].fn;
      return x;
    }, h.prototype.listenerCount = function(p) {
      var g = r ? r + p : p, y = this._events[g];
      return y ? y.fn ? 1 : y.length : 0;
    }, h.prototype.emit = function(p, g, y, v, w, x) {
      var S = r ? r + p : p;
      if (!this._events[S]) return !1;
      var T = this._events[S], E = arguments.length, N, C;
      if (T.fn) {
        switch (T.once && this.removeListener(p, T.fn, void 0, !0), E) {
          case 1:
            return T.fn.call(T.context), !0;
          case 2:
            return T.fn.call(T.context, g), !0;
          case 3:
            return T.fn.call(T.context, g, y), !0;
          case 4:
            return T.fn.call(T.context, g, y, v), !0;
          case 5:
            return T.fn.call(T.context, g, y, v, w), !0;
          case 6:
            return T.fn.call(T.context, g, y, v, w, x), !0;
        }
        for (C = 1, N = new Array(E - 1); C < E; C++)
          N[C - 1] = arguments[C];
        T.fn.apply(T.context, N);
      } else {
        var X = T.length, D;
        for (C = 0; C < X; C++)
          switch (T[C].once && this.removeListener(p, T[C].fn, void 0, !0), E) {
            case 1:
              T[C].fn.call(T[C].context);
              break;
            case 2:
              T[C].fn.call(T[C].context, g);
              break;
            case 3:
              T[C].fn.call(T[C].context, g, y);
              break;
            case 4:
              T[C].fn.call(T[C].context, g, y, v);
              break;
            default:
              if (!N) for (D = 1, N = new Array(E - 1); D < E; D++)
                N[D - 1] = arguments[D];
              T[C].fn.apply(T[C].context, N);
          }
      }
      return !0;
    }, h.prototype.on = function(p, g, y) {
      return u(this, p, g, y, !1);
    }, h.prototype.once = function(p, g, y) {
      return u(this, p, g, y, !0);
    }, h.prototype.removeListener = function(p, g, y, v) {
      var w = r ? r + p : p;
      if (!this._events[w]) return this;
      if (!g)
        return c(this, w), this;
      var x = this._events[w];
      if (x.fn)
        x.fn === g && (!v || x.once) && (!y || x.context === y) && c(this, w);
      else {
        for (var S = 0, T = [], E = x.length; S < E; S++)
          (x[S].fn !== g || v && !x[S].once || y && x[S].context !== y) && T.push(x[S]);
        T.length ? this._events[w] = T.length === 1 ? T[0] : T : c(this, w);
      }
      return this;
    }, h.prototype.removeAllListeners = function(p) {
      var g;
      return p ? (g = r ? r + p : p, this._events[g] && c(this, g)) : (this._events = new i(), this._eventsCount = 0), this;
    }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = r, h.EventEmitter = h, t.exports = h;
  }(fd)), fd.exports;
}
var B6 = z6();
const V6 = /* @__PURE__ */ YS(B6);
var U6 = {}, bi;
(function(t) {
  t.Pending = "pending", t.Ready = "ready", t.Active = "active", t.Completed = "completed", t.Failed = "failed", t.Expired = "expired";
})(bi || (bi = {}));
var wn;
(function(t) {
  t[t.Idle = 0] = "Idle", t[t.CreatingRoom = 1] = "CreatingRoom", t[t.WaitingForRoom = 2] = "WaitingForRoom", t[t.Connecting = 3] = "Connecting", t[t.Active = 4] = "Active", t[t.Closing = 5] = "Closing";
})(wn || (wn = {}));
var wu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function j6(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var lh = { exports: {} };
(function(t, n) {
  (function(r, i) {
    i(n);
  })(wu, function(r) {
    var i = function(x) {
      return function(S) {
        var T = x(S);
        return S.add(T), T;
      };
    }, o = function(x) {
      return function(S, T) {
        return x.set(S, T), T;
      };
    }, u = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, c = 536870912, h = c * 2, d = function(x, S) {
      return function(T) {
        var E = S.get(T), N = E === void 0 ? T.size : E < h ? E + 1 : 0;
        if (!T.has(N))
          return x(T, N);
        if (T.size < c) {
          for (; T.has(N); )
            N = Math.floor(Math.random() * h);
          return x(T, N);
        }
        if (T.size > u)
          throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
        for (; T.has(N); )
          N = Math.floor(Math.random() * u);
        return x(T, N);
      };
    }, p = /* @__PURE__ */ new WeakMap(), g = o(p), y = d(g, p), v = i(y);
    r.addUniqueNumber = v, r.generateUniqueNumber = y;
  });
})(lh, lh.exports);
var au = lh.exports;
const P6 = (t) => typeof t.start == "function", Jy = /* @__PURE__ */ new WeakMap(), H6 = (t) => ({
  ...t,
  connect: ({ call: n }) => async () => {
    const { port1: r, port2: i } = new MessageChannel(), o = await n("connect", { port: r }, [r]);
    return Jy.set(i, o), i;
  },
  disconnect: ({ call: n }) => async (r) => {
    const i = Jy.get(r);
    if (i === void 0)
      throw new Error("The given port is not connected.");
    await n("disconnect", { portId: i });
  },
  isSupported: ({ call: n }) => () => n("isSupported")
}), dd = /* @__PURE__ */ new WeakMap(), q6 = (t) => {
  if (dd.has(t))
    return dd.get(t);
  const n = /* @__PURE__ */ new Map();
  return dd.set(t, n), n;
}, x2 = (t) => {
  const n = H6(t);
  return (r) => {
    const i = q6(r);
    r.addEventListener("message", ({ data: h }) => {
      const { id: d } = h;
      if (d !== null && i.has(d)) {
        const { reject: p, resolve: g } = i.get(d);
        i.delete(d), h.error === void 0 ? g(h.result) : p(new Error(h.error.message));
      }
    }), P6(r) && r.start();
    const o = (h, d = null, p = []) => new Promise((g, y) => {
      const v = au.generateUniqueNumber(i);
      i.set(v, { reject: y, resolve: g }), d === null ? r.postMessage({ id: v, method: h }, p) : r.postMessage({ id: v, method: h, params: d }, p);
    }), u = (h, d, p = []) => {
      r.postMessage({ id: null, method: h, params: d }, p);
    };
    let c = {};
    for (const [h, d] of Object.entries(n))
      c = { ...c, [h]: d({ call: o, notify: u }) };
    return { ...c };
  };
}, hd = /* @__PURE__ */ new Set(), ev = /* @__PURE__ */ new Set(), zs = /* @__PURE__ */ new WeakMap(), G6 = x2({
  deregister: ({ call: t }) => async (n) => {
    const r = zs.get(n);
    if (r === void 0)
      throw new Error("There is no encoder registered with the given port.");
    const i = await t("deregister", { encoderId: r });
    return hd.delete(r), zs.delete(n), i;
  },
  encode: ({ call: t }) => async (n, r) => {
    const i = await t("encode", { encoderInstanceId: n, timeslice: r });
    return ev.delete(n), i;
  },
  instantiate: ({ call: t }) => async (n, r) => {
    const i = au.addUniqueNumber(ev), o = await t("instantiate", { encoderInstanceId: i, mimeType: n, sampleRate: r });
    return { encoderInstanceId: i, port: o };
  },
  register: ({ call: t }) => async (n) => {
    if (zs.has(n))
      throw new Error("");
    const r = au.addUniqueNumber(hd);
    zs.set(n, r);
    try {
      return await t("register", { encoderId: r, port: n }, [n]);
    } catch (i) {
      throw hd.delete(r), zs.delete(n), i;
    }
  }
}), Y6 = (t) => {
  const n = new Worker(t);
  return G6(n);
}, X6 = `(()=>{var e={455:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,o=536870912,s=2*o,a=function(e,t){return function(r){var a=t.get(r),c=void 0===a?r.size:a<s?a+1:0;if(!r.has(c))return e(r,c);if(r.size<o){for(;r.has(c);)c=Math.floor(Math.random()*s);return e(r,c)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(c);)c=Math.floor(Math.random()*n);return e(r,c)}},c=new WeakMap,i=r(c),d=a(i,c),l=t(d);e.addUniqueNumber=l,e.generateUniqueNumber=d}(t)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,r),s.exports}(()=>{"use strict";var e=r(455);const t=new WeakMap,n=new WeakMap,o=(r=>{const o=(s=r,{...s,connect:({call:e})=>async()=>{const{port1:r,port2:n}=new MessageChannel,o=await e("connect",{port:r},[r]);return t.set(n,o),n},disconnect:({call:e})=>async r=>{const n=t.get(r);if(void 0===n)throw new Error("The given port is not connected.");await e("disconnect",{portId:n})},isSupported:({call:e})=>()=>e("isSupported")});var s;return t=>{const r=(e=>{if(n.has(e))return n.get(e);const t=new Map;return n.set(e,t),t})(t);t.addEventListener("message",(({data:e})=>{const{id:t}=e;if(null!==t&&r.has(t)){const{reject:n,resolve:o}=r.get(t);r.delete(t),void 0===e.error?o(e.result):n(new Error(e.error.message))}})),(e=>"function"==typeof e.start)(t)&&t.start();const s=(n,o=null,s=[])=>new Promise(((a,c)=>{const i=(0,e.generateUniqueNumber)(r);r.set(i,{reject:c,resolve:a}),null===o?t.postMessage({id:i,method:n},s):t.postMessage({id:i,method:n,params:o},s)})),a=(e,r,n=[])=>{t.postMessage({id:null,method:e,params:r},n)};let c={};for(const[e,t]of Object.entries(o))c={...c,[e]:t({call:s,notify:a})};return{...c}}})({characterize:({call:e})=>()=>e("characterize"),encode:({call:e})=>(t,r)=>e("encode",{recordingId:t,timeslice:r}),record:({call:e})=>async(t,r,n)=>{await e("record",{recordingId:t,sampleRate:r,typedArrays:n},n.map((({buffer:e})=>e)))}}),s=-32603,a=-32602,c=-32601,i=(e,t)=>Object.assign(new Error(e),{status:t}),d=e=>i('The handler of the method called "'.concat(e,'" returned an unexpected result.'),s),l=(e,t)=>async({data:{id:r,method:n,params:o}})=>{const a=t[n];try{if(void 0===a)throw(e=>i('The requested method called "'.concat(e,'" is not supported.'),c))(n);const t=void 0===o?a():a(o);if(void 0===t)throw(e=>i('The handler of the method called "'.concat(e,'" returned no required result.'),s))(n);const l=t instanceof Promise?await t:t;if(null===r){if(void 0!==l.result)throw d(n)}else{if(void 0===l.result)throw d(n);const{result:t,transferables:o=[]}=l;e.postMessage({id:r,result:t},o)}}catch(t){const{message:n,status:o=-32603}=t;e.postMessage({error:{code:o,message:n},id:r})}},u=new Map,h=(t,r,n)=>({...r,connect:({port:n})=>{n.start();const o=t(n,r),s=(0,e.generateUniqueNumber)(u);return u.set(s,(()=>{o(),n.close(),u.delete(s)})),{result:s}},disconnect:({portId:e})=>{const t=u.get(e);if(void 0===t)throw(e=>i('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),a))(e);return t(),{result:null}},isSupported:async()=>{if(await new Promise((e=>{const t=new ArrayBuffer(0),{port1:r,port2:n}=new MessageChannel;r.onmessage=({data:t})=>e(null!==t),n.postMessage(t,[t])}))){const e=n();return{result:e instanceof Promise?await e:e}}return{result:!1}}}),w=(e,t,r=()=>!0)=>{const n=h(w,t,r),o=l(e,n);return e.addEventListener("message",o),()=>e.removeEventListener("message",o)},f=e=>{e.onmessage=null,e.close()},p=new Map,m=new Map,g=((e,t)=>r=>{const n=t.get(r);if(void 0===n)throw new Error("There was no encoder stored with the given id.");e.delete(n),t.delete(r)})(p,m),v=new Map,y=(e=>t=>{const r=e.get(t);if(void 0===r)throw new Error("There was no instance of an encoder stored with the given id.");return r})(v),M=((e,t)=>r=>{const n=t(r);return e.delete(r),n})(v,y),E=((e,t)=>r=>{const[n,o,s,a]=t(r);return s?new Promise((t=>{o.onmessage=({data:s})=>{0===s.length?(e(o),t(n.encode(r,null))):n.record(r,a,s)}})):n.encode(r,null)})(f,M),b=(e=>t=>{for(const[r,n]of Array.from(e.values()))if(r.test(t))return n;throw new Error("There is no encoder registered which could handle the given mimeType.")})(p),T=((e,t,r)=>(n,o,s)=>{if(t.has(n))throw new Error('There is already an encoder instance registered with an id called "'.concat(n,'".'));const a=r(o),{port1:c,port2:i}=new MessageChannel,d=[a,c,!0,s];return t.set(n,d),c.onmessage=({data:t})=>{0===t.length?(e(c),d[2]=!1):a.record(n,s,t.map((e=>"number"==typeof e?new Float32Array(e):e)))},i})(f,v,b),I=((e,t,r)=>async(n,o)=>{const s=r(o),a=await s.characterize(),c=a.toString();if(e.has(c))throw new Error("There is already an encoder stored which handles exactly the same mime types.");if(t.has(n))throw new Error('There is already an encoder registered with an id called "'.concat(n,'".'));return e.set(c,[a,s]),t.set(n,c),a})(p,m,o),A=(e=>(t,r)=>{const[n]=e(t);return n.encode(t,r)})(y);w(self,{deregister:async({encoderId:e})=>(g(e),{result:null}),encode:async({encoderInstanceId:e,timeslice:t})=>{const r=null===t?await E(e):await A(e,t);return{result:r,transferables:r}},instantiate:({encoderInstanceId:e,mimeType:t,sampleRate:r})=>{const n=T(e,t,r);return{result:n,transferables:[n]}},register:async({encoderId:e,port:t})=>({result:await I(e,t)})})})()})();`, I6 = new Blob([X6], { type: "application/javascript; charset=utf-8" }), S2 = URL.createObjectURL(I6), d0 = Y6(S2), ru = d0.encode, A2 = d0.instantiate, Z6 = d0.register;
URL.revokeObjectURL(S2);
const W6 = (t) => (n, r) => {
  if (t === null)
    throw new Error("A native BlobEvent could not be created.");
  return new t(n, r);
}, K6 = (t, n) => (r, i, o) => {
  const u = [];
  let c = i, h = 0;
  for (; h < r.byteLength; )
    if (c === null) {
      const d = n(r, h);
      if (d === null)
        break;
      const { length: p, type: g } = d;
      c = g, h += p;
    } else {
      const d = t(r, h, c, o);
      if (d === null)
        break;
      const { content: p, length: g } = d;
      c = null, h += g, p !== null && u.push(p);
    }
  return { contents: u, currentElementType: c, offset: h };
}, Q6 = (t, n) => class {
  constructor(i = null) {
    this._listeners = /* @__PURE__ */ new WeakMap(), this._nativeEventTarget = i === null ? t() : i;
  }
  addEventListener(i, o, u) {
    if (o !== null) {
      let c = this._listeners.get(o);
      c === void 0 && (c = n(this, o), typeof o == "function" && this._listeners.set(o, c)), this._nativeEventTarget.addEventListener(i, c, u);
    }
  }
  dispatchEvent(i) {
    return this._nativeEventTarget.dispatchEvent(i);
  }
  removeEventListener(i, o, u) {
    const c = o === null ? void 0 : this._listeners.get(o);
    this._nativeEventTarget.removeEventListener(i, c === void 0 ? null : c, u);
  }
}, F6 = (t) => () => {
  if (t === null)
    throw new Error("A native EventTarget could not be created.");
  return t.document.createElement("p");
}, $6 = (t = "") => {
  try {
    return new DOMException(t, "InvalidModificationError");
  } catch (n) {
    return n.code = 13, n.message = t, n.name = "InvalidModificationError", n;
  }
}, J6 = () => {
  try {
    return new DOMException("", "InvalidStateError");
  } catch (t) {
    return t.code = 11, t.name = "InvalidStateError", t;
  }
}, eE = (t, n, r, i, o, u, c) => class extends u {
  constructor(d, p = {}) {
    const { mimeType: g } = p;
    if (c !== null && // Bug #10: Safari does not yet implement the isTypeSupported() method.
    (g === void 0 || c.isTypeSupported !== void 0 && c.isTypeSupported(g))) {
      const y = t(c, d, p);
      super(y), this._internalMediaRecorder = y;
    } else if (g !== void 0 && o.some((y) => y.test(g)))
      super(), c !== null && c.isTypeSupported !== void 0 && c.isTypeSupported("audio/webm; codecs=pcm") ? this._internalMediaRecorder = i(this, c, d, g) : this._internalMediaRecorder = r(this, d, g);
    else
      throw c !== null && t(c, d, p), n();
    this._ondataavailable = null, this._onerror = null, this._onpause = null, this._onresume = null, this._onstart = null, this._onstop = null;
  }
  get mimeType() {
    return this._internalMediaRecorder.mimeType;
  }
  get ondataavailable() {
    return this._ondataavailable === null ? this._ondataavailable : this._ondataavailable[0];
  }
  set ondataavailable(d) {
    if (this._ondataavailable !== null && this.removeEventListener("dataavailable", this._ondataavailable[1]), typeof d == "function") {
      const p = d.bind(this);
      this.addEventListener("dataavailable", p), this._ondataavailable = [d, p];
    } else
      this._ondataavailable = null;
  }
  get onerror() {
    return this._onerror === null ? this._onerror : this._onerror[0];
  }
  set onerror(d) {
    if (this._onerror !== null && this.removeEventListener("error", this._onerror[1]), typeof d == "function") {
      const p = d.bind(this);
      this.addEventListener("error", p), this._onerror = [d, p];
    } else
      this._onerror = null;
  }
  get onpause() {
    return this._onpause === null ? this._onpause : this._onpause[0];
  }
  set onpause(d) {
    if (this._onpause !== null && this.removeEventListener("pause", this._onpause[1]), typeof d == "function") {
      const p = d.bind(this);
      this.addEventListener("pause", p), this._onpause = [d, p];
    } else
      this._onpause = null;
  }
  get onresume() {
    return this._onresume === null ? this._onresume : this._onresume[0];
  }
  set onresume(d) {
    if (this._onresume !== null && this.removeEventListener("resume", this._onresume[1]), typeof d == "function") {
      const p = d.bind(this);
      this.addEventListener("resume", p), this._onresume = [d, p];
    } else
      this._onresume = null;
  }
  get onstart() {
    return this._onstart === null ? this._onstart : this._onstart[0];
  }
  set onstart(d) {
    if (this._onstart !== null && this.removeEventListener("start", this._onstart[1]), typeof d == "function") {
      const p = d.bind(this);
      this.addEventListener("start", p), this._onstart = [d, p];
    } else
      this._onstart = null;
  }
  get onstop() {
    return this._onstop === null ? this._onstop : this._onstop[0];
  }
  set onstop(d) {
    if (this._onstop !== null && this.removeEventListener("stop", this._onstop[1]), typeof d == "function") {
      const p = d.bind(this);
      this.addEventListener("stop", p), this._onstop = [d, p];
    } else
      this._onstop = null;
  }
  get state() {
    return this._internalMediaRecorder.state;
  }
  pause() {
    return this._internalMediaRecorder.pause();
  }
  resume() {
    return this._internalMediaRecorder.resume();
  }
  start(d) {
    return this._internalMediaRecorder.start(d);
  }
  stop() {
    return this._internalMediaRecorder.stop();
  }
  static isTypeSupported(d) {
    return c !== null && // Bug #10: Safari does not yet implement the isTypeSupported() method.
    c.isTypeSupported !== void 0 && c.isTypeSupported(d) || o.some((p) => p.test(d));
  }
}, tE = (t) => t !== null && t.BlobEvent !== void 0 ? t.BlobEvent : null, nE = (t) => t === null || t.MediaRecorder === void 0 ? null : t.MediaRecorder, aE = (t) => (n, r, i) => {
  const o = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), h = [], d = new n(r, i), p = /* @__PURE__ */ new WeakMap();
  return d.addEventListener("stop", ({ isTrusted: g }) => {
    g && setTimeout(() => h.shift());
  }), d.addEventListener = /* @__PURE__ */ ((g) => (y, v, w) => {
    let x = v;
    if (typeof v == "function")
      if (y === "dataavailable") {
        const S = [];
        x = (T) => {
          const [[E, N] = [!1, !1]] = h;
          E && !N ? S.push(T) : v.call(d, T);
        }, o.set(v, S), u.set(v, x);
      } else y === "error" ? (x = (S) => {
        S instanceof ErrorEvent ? v.call(d, S) : v.call(d, new ErrorEvent("error", { error: S.error }));
      }, c.set(v, x)) : y === "stop" && (x = (S) => {
        for (const [T, E] of o.entries())
          if (E.length > 0) {
            const [N] = E;
            E.length > 1 && Object.defineProperty(N, "data", {
              value: new Blob(E.map(({ data: C }) => C), { type: N.data.type })
            }), E.length = 0, T.call(d, N);
          }
        v.call(d, S);
      }, p.set(v, x));
    return g.call(d, y, x, w);
  })(d.addEventListener), d.removeEventListener = /* @__PURE__ */ ((g) => (y, v, w) => {
    let x = v;
    if (typeof v == "function") {
      if (y === "dataavailable") {
        o.delete(v);
        const S = u.get(v);
        S !== void 0 && (x = S);
      } else if (y === "error") {
        const S = c.get(v);
        S !== void 0 && (x = S);
      } else if (y === "stop") {
        const S = p.get(v);
        S !== void 0 && (x = S);
      }
    }
    return g.call(d, y, x, w);
  })(d.removeEventListener), d.start = /* @__PURE__ */ ((g) => (y) => {
    if (i.mimeType !== void 0 && i.mimeType.startsWith("audio/") && r.getVideoTracks().length > 0)
      throw t();
    return d.state === "inactive" && h.push([y !== void 0, !0]), y === void 0 ? g.call(d) : g.call(d, y);
  })(d.start), d.stop = /* @__PURE__ */ ((g) => () => {
    d.state !== "inactive" && (h[0][1] = !1), g.call(d);
  })(d.stop), d;
}, uh = () => {
  try {
    return new DOMException("", "NotSupportedError");
  } catch (t) {
    return t.code = 9, t.name = "NotSupportedError", t;
  }
}, rE = (t) => (n, r, i, o = 2) => {
  const u = t(n, r);
  if (u === null)
    return u;
  const { length: c, value: h } = u;
  if (i === "master")
    return { content: null, length: c };
  if (r + c + h > n.byteLength)
    return null;
  if (i === "binary") {
    const d = (h / Float32Array.BYTES_PER_ELEMENT - 1) / o, p = Array.from({ length: o }, () => new Float32Array(d));
    for (let g = 0; g < d; g += 1) {
      const y = g * o + 1;
      for (let v = 0; v < o; v += 1)
        p[v][g] = n.getFloat32(r + c + (y + v) * Float32Array.BYTES_PER_ELEMENT, !0);
    }
    return { content: p, length: c + h };
  }
  return { content: null, length: c + h };
}, iE = (t) => (n, r) => {
  const i = t(n, r);
  if (i === null)
    return i;
  const { length: o, value: u } = i;
  return u === 35 ? { length: o, type: "binary" } : u === 46 || u === 97 || u === 88713574 || u === 106212971 || u === 139690087 || u === 172351395 || u === 256095861 ? { length: o, type: "master" } : { length: o, type: "unknown" };
}, sE = (t) => (n, r) => {
  const i = t(n, r);
  if (i === null)
    return i;
  const o = r + Math.floor((i - 1) / 8);
  if (o + i > n.byteLength)
    return null;
  let c = n.getUint8(o) & (1 << 8 - i % 8) - 1;
  for (let h = 1; h < i; h += 1)
    c = (c << 8) + n.getUint8(o + h);
  return { length: i, value: c };
}, tv = Symbol.observable || "@@observable";
function oE(t) {
  return Symbol.observable || (typeof t == "function" && t.prototype && t.prototype[Symbol.observable] ? (t.prototype[tv] = t.prototype[Symbol.observable], delete t.prototype[Symbol.observable]) : (t[tv] = t[Symbol.observable], delete t[Symbol.observable])), t;
}
const Ol = () => {
}, nv = (t) => {
  throw t;
};
function lE(t) {
  return t ? t.next && t.error && t.complete ? t : {
    complete: (t.complete ?? Ol).bind(t),
    error: (t.error ?? nv).bind(t),
    next: (t.next ?? Ol).bind(t)
  } : {
    complete: Ol,
    error: nv,
    next: Ol
  };
}
const uE = (t) => (n, r, i) => t((o) => {
  const u = (c) => o.next(c);
  return n.addEventListener(r, u, i), () => n.removeEventListener(r, u, i);
}), cE = (t, n) => {
  const r = () => {
  }, i = (o) => typeof o[0] == "function";
  return (o) => {
    const u = (...c) => {
      const h = o(i(c) ? n({ next: c[0] }) : n(...c));
      return h !== void 0 ? h : r;
    };
    return u[Symbol.observable] = () => ({
      subscribe: (...c) => ({ unsubscribe: u(...c) })
    }), t(u);
  };
}, fE = cE(oE, lE), T2 = uE(fE), dE = (t, n, r) => async (i) => {
  const o = new t([r], { type: "application/javascript; charset=utf-8" }), u = n.createObjectURL(o);
  try {
    await i(u);
  } finally {
    n.revokeObjectURL(u);
  }
}, hE = (t) => ({ data: n }) => {
  const { id: r } = n;
  if (r !== null) {
    const i = t.get(r);
    if (i !== void 0) {
      const { reject: o, resolve: u } = i;
      t.delete(r), n.error === void 0 ? u(n.result) : o(new Error(n.error.message));
    }
  }
}, pE = (t) => (n, r) => (i, o = []) => new Promise((u, c) => {
  const h = t(n);
  n.set(h, { reject: c, resolve: u }), r.postMessage({ id: h, ...i }, o);
}), mE = (t, n, r, i) => (o, u, c = {}) => {
  const h = new o(u, "recorder-audio-worklet-processor", {
    ...c,
    channelCountMode: "explicit",
    numberOfInputs: 1,
    numberOfOutputs: 0
  }), d = /* @__PURE__ */ new Map(), p = n(d, h.port), g = r(h.port, "message")(t(d));
  h.port.start();
  let y = "inactive";
  return Object.defineProperties(h, {
    pause: {
      get() {
        return async () => (i(["recording"], y), y = "paused", p({
          method: "pause"
        }));
      }
    },
    port: {
      get() {
        throw new Error("The port of a RecorderAudioWorkletNode can't be accessed.");
      }
    },
    record: {
      get() {
        return async (v) => (i(["inactive"], y), y = "recording", p({
          method: "record",
          params: { encoderPort: v }
        }, [v]));
      }
    },
    resume: {
      get() {
        return async () => (i(["paused"], y), y = "recording", p({
          method: "resume"
        }));
      }
    },
    stop: {
      get() {
        return async () => {
          i(["paused", "recording"], y), y = "stopped";
          try {
            await p({ method: "stop" });
          } finally {
            g();
          }
        };
      }
    }
  }), h;
}, gE = (t, n) => {
  if (!t.includes(n))
    throw new Error(`Expected the state to be ${t.map((r) => `"${r}"`).join(" or ")} but it was "${n}".`);
}, yE = '(()=>{"use strict";class e extends AudioWorkletProcessor{constructor(){super(),this._encoderPort=null,this._numberOfChannels=0,this._state="inactive",this.port.onmessage=({data:e})=>{"pause"===e.method?"active"===this._state||"recording"===this._state?(this._state="paused",this._sendAcknowledgement(e.id)):this._sendUnexpectedStateError(e.id):"record"===e.method?"inactive"===this._state?(this._encoderPort=e.params.encoderPort,this._state="active",this._sendAcknowledgement(e.id)):this._sendUnexpectedStateError(e.id):"resume"===e.method?"paused"===this._state?(this._state="active",this._sendAcknowledgement(e.id)):this._sendUnexpectedStateError(e.id):"stop"===e.method?"active"!==this._state&&"paused"!==this._state&&"recording"!==this._state||null===this._encoderPort?this._sendUnexpectedStateError(e.id):(this._stop(this._encoderPort),this._sendAcknowledgement(e.id)):"number"==typeof e.id&&this.port.postMessage({error:{code:-32601,message:"The requested method is not supported."},id:e.id})}}process([e]){if("inactive"===this._state||"paused"===this._state)return!0;if("active"===this._state){if(void 0===e)throw new Error("No channelData was received for the first input.");if(0===e.length)return!0;this._state="recording"}if("recording"===this._state&&null!==this._encoderPort){if(void 0===e)throw new Error("No channelData was received for the first input.");return 0===e.length?this._encoderPort.postMessage(Array.from({length:this._numberOfChannels},(()=>128))):(this._encoderPort.postMessage(e,e.map((({buffer:e})=>e))),this._numberOfChannels=e.length),!0}return!1}_sendAcknowledgement(e){this.port.postMessage({id:e,result:null})}_sendUnexpectedStateError(e){this.port.postMessage({error:{code:-32603,message:"The internal state does not allow to process the given message."},id:e})}_stop(e){e.postMessage([]),e.close(),this._encoderPort=null,this._state="stopped"}}e.parameterDescriptors=[],registerProcessor("recorder-audio-worklet-processor",e)})();', vE = dE(Blob, URL, yE), bE = mE(hE, pE(au.generateUniqueNumber), T2, gE);
var ch = { exports: {} }, pd = { exports: {} }, md = { exports: {} }, av;
function wE() {
  return av || (av = 1, function(t) {
    function n(r) {
      if (Array.isArray(r)) return r;
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(md)), md.exports;
}
var gd = { exports: {} }, rv;
function xE() {
  return rv || (rv = 1, function(t) {
    function n(r, i) {
      var o = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (o != null) {
        var u, c, h, d, p = [], g = !0, y = !1;
        try {
          if (h = (o = o.call(r)).next, i === 0) {
            if (Object(o) !== o) return;
            g = !1;
          } else for (; !(g = (u = h.call(o)).done) && (p.push(u.value), p.length !== i); g = !0) ;
        } catch (v) {
          y = !0, c = v;
        } finally {
          try {
            if (!g && o.return != null && (d = o.return(), Object(d) !== d)) return;
          } finally {
            if (y) throw c;
          }
        }
        return p;
      }
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(gd)), gd.exports;
}
var yd = { exports: {} }, vd = { exports: {} }, iv;
function SE() {
  return iv || (iv = 1, function(t) {
    function n(r, i) {
      (i == null || i > r.length) && (i = r.length);
      for (var o = 0, u = Array(i); o < i; o++) u[o] = r[o];
      return u;
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(vd)), vd.exports;
}
var sv;
function AE() {
  return sv || (sv = 1, function(t) {
    var n = SE();
    function r(i, o) {
      if (i) {
        if (typeof i == "string") return n(i, o);
        var u = {}.toString.call(i).slice(8, -1);
        return u === "Object" && i.constructor && (u = i.constructor.name), u === "Map" || u === "Set" ? Array.from(i) : u === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u) ? n(i, o) : void 0;
      }
    }
    t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(yd)), yd.exports;
}
var bd = { exports: {} }, ov;
function TE() {
  return ov || (ov = 1, function(t) {
    function n() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(bd)), bd.exports;
}
var lv;
function M2() {
  return lv || (lv = 1, function(t) {
    var n = wE(), r = xE(), i = AE(), o = TE();
    function u(c, h) {
      return n(c) || r(c, h) || i(c, h) || o();
    }
    t.exports = u, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(pd)), pd.exports;
}
var wd = { exports: {} }, uv;
function E2() {
  return uv || (uv = 1, function(t) {
    function n(r, i) {
      if (!(r instanceof i)) throw new TypeError("Cannot call a class as a function");
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(wd)), wd.exports;
}
var xd = { exports: {} }, Sd = { exports: {} }, Ad = { exports: {} }, cv;
function C2() {
  return cv || (cv = 1, function(t) {
    function n(r) {
      "@babel/helpers - typeof";
      return t.exports = n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
        return typeof i;
      } : function(i) {
        return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
      }, t.exports.__esModule = !0, t.exports.default = t.exports, n(r);
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(Ad)), Ad.exports;
}
var Td = { exports: {} }, fv;
function ME() {
  return fv || (fv = 1, function(t) {
    var n = C2().default;
    function r(i, o) {
      if (n(i) != "object" || !i) return i;
      var u = i[Symbol.toPrimitive];
      if (u !== void 0) {
        var c = u.call(i, o || "default");
        if (n(c) != "object") return c;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (o === "string" ? String : Number)(i);
    }
    t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(Td)), Td.exports;
}
var dv;
function EE() {
  return dv || (dv = 1, function(t) {
    var n = C2().default, r = ME();
    function i(o) {
      var u = r(o, "string");
      return n(u) == "symbol" ? u : u + "";
    }
    t.exports = i, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(Sd)), Sd.exports;
}
var hv;
function _2() {
  return hv || (hv = 1, function(t) {
    var n = EE();
    function r(o, u) {
      for (var c = 0; c < u.length; c++) {
        var h = u[c];
        h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(o, n(h.key), h);
      }
    }
    function i(o, u, c) {
      return u && r(o.prototype, u), c && r(o, c), Object.defineProperty(o, "prototype", {
        writable: !1
      }), o;
    }
    t.exports = i, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(xd)), xd.exports;
}
(function(t, n) {
  (function(r, i) {
    i(n, M2(), E2(), _2());
  })(wu, function(r, i, o, u) {
    var c = function(O, z, q) {
      return {
        endTime: z,
        insertTime: q,
        type: "exponentialRampToValue",
        value: O
      };
    }, h = function(O, z, q) {
      return {
        endTime: z,
        insertTime: q,
        type: "linearRampToValue",
        value: O
      };
    }, d = function(O, z) {
      return {
        startTime: z,
        type: "setValue",
        value: O
      };
    }, p = function(O, z, q) {
      return {
        duration: q,
        startTime: z,
        type: "setValueCurve",
        values: O
      };
    }, g = function(O, z, q) {
      var M = q.startTime, B = q.target, G = q.timeConstant;
      return B + (z - B) * Math.exp((M - O) / G);
    }, y = function(O) {
      return O.type === "exponentialRampToValue";
    }, v = function(O) {
      return O.type === "linearRampToValue";
    }, w = function(O) {
      return y(O) || v(O);
    }, x = function(O) {
      return O.type === "setValue";
    }, S = function(O) {
      return O.type === "setValueCurve";
    }, T = function(O, z, q, M) {
      var B = O[z];
      return B === void 0 ? M : w(B) || x(B) ? B.value : S(B) ? B.values[B.values.length - 1] : g(q, T(O, z - 1, B.startTime, M), B);
    }, E = function(O, z, q, M, B) {
      return q === void 0 ? [M.insertTime, B] : w(q) ? [q.endTime, q.value] : x(q) ? [q.startTime, q.value] : S(q) ? [q.startTime + q.duration, q.values[q.values.length - 1]] : [q.startTime, T(O, z - 1, q.startTime, B)];
    }, N = function(O) {
      return O.type === "cancelAndHold";
    }, C = function(O) {
      return O.type === "cancelScheduledValues";
    }, X = function(O) {
      return N(O) || C(O) ? O.cancelTime : y(O) || v(O) ? O.endTime : O.startTime;
    }, D = function(O, z, q, M) {
      var B = M.endTime, G = M.value;
      return q === G ? G : 0 < q && 0 < G || q < 0 && G < 0 ? q * Math.pow(G / q, (O - z) / (B - z)) : 0;
    }, U = function(O, z, q, M) {
      var B = M.endTime, G = M.value;
      return q + (O - z) / (B - z) * (G - q);
    }, P = function(O, z) {
      var q = Math.floor(z), M = Math.ceil(z);
      return q === M ? O[q] : (1 - (z - q)) * O[q] + (1 - (M - z)) * O[M];
    }, _ = function(O, z) {
      var q = z.duration, M = z.startTime, B = z.values, G = (O - M) / q * (B.length - 1);
      return P(B, G);
    }, F = function(O) {
      return O.type === "setTarget";
    }, ae = /* @__PURE__ */ function() {
      function k(O) {
        o(this, k), this._automationEvents = [], this._currenTime = 0, this._defaultValue = O;
      }
      return u(k, [{
        key: Symbol.iterator,
        value: function() {
          return this._automationEvents[Symbol.iterator]();
        }
      }, {
        key: "add",
        value: function(z) {
          var q = X(z);
          if (N(z) || C(z)) {
            var M = this._automationEvents.findIndex(function(Ce) {
              return C(z) && S(Ce) ? Ce.startTime + Ce.duration >= q : X(Ce) >= q;
            }), B = this._automationEvents[M];
            if (M !== -1 && (this._automationEvents = this._automationEvents.slice(0, M)), N(z)) {
              var G = this._automationEvents[this._automationEvents.length - 1];
              if (B !== void 0 && w(B)) {
                if (G !== void 0 && F(G))
                  throw new Error("The internal list is malformed.");
                var J = G === void 0 ? B.insertTime : S(G) ? G.startTime + G.duration : X(G), te = G === void 0 ? this._defaultValue : S(G) ? G.values[G.values.length - 1] : G.value, pe = y(B) ? D(q, J, te, B) : U(q, J, te, B), ie = y(B) ? c(pe, q, this._currenTime) : h(pe, q, this._currenTime);
                this._automationEvents.push(ie);
              }
              if (G !== void 0 && F(G) && this._automationEvents.push(d(this.getValue(q), q)), G !== void 0 && S(G) && G.startTime + G.duration > q) {
                var me = q - G.startTime, Me = (G.values.length - 1) / G.duration, We = Math.max(2, 1 + Math.ceil(me * Me)), yt = me / (We - 1) * Me, Tt = G.values.slice(0, We);
                if (yt < 1)
                  for (var dt = 1; dt < We; dt += 1) {
                    var ra = yt * dt % 1;
                    Tt[dt] = G.values[dt - 1] * (1 - ra) + G.values[dt] * ra;
                  }
                this._automationEvents[this._automationEvents.length - 1] = p(Tt, G.startTime, me);
              }
            }
          } else {
            var mn = this._automationEvents.findIndex(function(Ce) {
              return X(Ce) > q;
            }), re = mn === -1 ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[mn - 1];
            if (re !== void 0 && S(re) && X(re) + re.duration > q)
              return !1;
            var ge = y(z) ? c(z.value, z.endTime, this._currenTime) : v(z) ? h(z.value, q, this._currenTime) : z;
            if (mn === -1)
              this._automationEvents.push(ge);
            else {
              if (S(z) && q + z.duration > X(this._automationEvents[mn]))
                return !1;
              this._automationEvents.splice(mn, 0, ge);
            }
          }
          return !0;
        }
      }, {
        key: "flush",
        value: function(z) {
          var q = this._automationEvents.findIndex(function(G) {
            return X(G) > z;
          });
          if (q > 1) {
            var M = this._automationEvents.slice(q - 1), B = M[0];
            F(B) && M.unshift(d(T(this._automationEvents, q - 2, B.startTime, this._defaultValue), B.startTime)), this._automationEvents = M;
          }
        }
      }, {
        key: "getValue",
        value: function(z) {
          if (this._automationEvents.length === 0)
            return this._defaultValue;
          var q = this._automationEvents.findIndex(function(Tt) {
            return X(Tt) > z;
          }), M = this._automationEvents[q], B = (q === -1 ? this._automationEvents.length : q) - 1, G = this._automationEvents[B];
          if (G !== void 0 && F(G) && (M === void 0 || !w(M) || M.insertTime > z))
            return g(z, T(this._automationEvents, B - 1, G.startTime, this._defaultValue), G);
          if (G !== void 0 && x(G) && (M === void 0 || !w(M)))
            return G.value;
          if (G !== void 0 && S(G) && (M === void 0 || !w(M) || G.startTime + G.duration > z))
            return z < G.startTime + G.duration ? _(z, G) : G.values[G.values.length - 1];
          if (G !== void 0 && w(G) && (M === void 0 || !w(M)))
            return G.value;
          if (M !== void 0 && y(M)) {
            var J = E(this._automationEvents, B, G, M, this._defaultValue), te = i(J, 2), pe = te[0], ie = te[1];
            return D(z, pe, ie, M);
          }
          if (M !== void 0 && v(M)) {
            var me = E(this._automationEvents, B, G, M, this._defaultValue), Me = i(me, 2), We = Me[0], yt = Me[1];
            return U(z, We, yt, M);
          }
          return this._defaultValue;
        }
      }]);
    }(), ee = function(O) {
      return {
        cancelTime: O,
        type: "cancelAndHold"
      };
    }, ne = function(O) {
      return {
        cancelTime: O,
        type: "cancelScheduledValues"
      };
    }, he = function(O, z) {
      return {
        endTime: z,
        type: "exponentialRampToValue",
        value: O
      };
    }, ce = function(O, z) {
      return {
        endTime: z,
        type: "linearRampToValue",
        value: O
      };
    }, se = function(O, z, q) {
      return {
        startTime: z,
        target: O,
        timeConstant: q,
        type: "setTarget"
      };
    };
    r.AutomationEventList = ae, r.createCancelAndHoldAutomationEvent = ee, r.createCancelScheduledValuesAutomationEvent = ne, r.createExponentialRampToValueAutomationEvent = he, r.createLinearRampToValueAutomationEvent = ce, r.createSetTargetAutomationEvent = se, r.createSetValueAutomationEvent = d, r.createSetValueCurveAutomationEvent = p;
  });
})(ch, ch.exports);
var Da = ch.exports;
const CE = () => new DOMException("", "AbortError"), _E = (t) => (n, r, [i, o, u], c) => {
  t(n[o], [r, i, u], (h) => h[0] === r && h[1] === i, c);
}, RE = (t) => (n, r, i) => {
  const o = [];
  for (let u = 0; u < i.numberOfInputs; u += 1)
    o.push(/* @__PURE__ */ new Set());
  t.set(n, {
    activeInputs: o,
    outputs: /* @__PURE__ */ new Set(),
    passiveInputs: /* @__PURE__ */ new WeakMap(),
    renderer: r
  });
}, kE = (t) => (n, r) => {
  t.set(n, { activeInputs: /* @__PURE__ */ new Set(), passiveInputs: /* @__PURE__ */ new WeakMap(), renderer: r });
}, Si = /* @__PURE__ */ new WeakSet(), R2 = /* @__PURE__ */ new WeakMap(), k2 = /* @__PURE__ */ new WeakMap(), N2 = /* @__PURE__ */ new WeakMap(), D2 = /* @__PURE__ */ new WeakMap(), O2 = /* @__PURE__ */ new WeakMap(), L2 = /* @__PURE__ */ new WeakMap(), fh = /* @__PURE__ */ new WeakMap(), dh = /* @__PURE__ */ new WeakMap(), hh = /* @__PURE__ */ new WeakMap(), z2 = {
  construct() {
    return z2;
  }
}, NE = (t) => {
  try {
    const n = new Proxy(t, z2);
    new n();
  } catch {
    return !1;
  }
  return !0;
}, pv = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/, mv = (t, n) => {
  const r = [];
  let i = t.replace(/^[\s]+/, ""), o = i.match(pv);
  for (; o !== null; ) {
    const u = o[1].slice(1, -1), c = o[0].replace(/([\s]+)?;?$/, "").replace(u, new URL(u, n).toString());
    r.push(c), i = i.slice(o[0].length).replace(/^[\s]+/, ""), o = i.match(pv);
  }
  return [r.join(";"), i];
}, gv = (t) => {
  if (t !== void 0 && !Array.isArray(t))
    throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.");
}, yv = (t) => {
  if (!NE(t))
    throw new TypeError("The given value for processorCtor should be a constructor.");
  if (t.prototype === null || typeof t.prototype != "object")
    throw new TypeError("The given value for processorCtor should have a prototype.");
}, DE = (t, n, r, i, o, u, c, h, d, p, g, y, v) => {
  let w = 0;
  return (x, S, T = { credentials: "omit" }) => {
    const E = g.get(x);
    if (E !== void 0 && E.has(S))
      return Promise.resolve();
    const N = p.get(x);
    if (N !== void 0) {
      const D = N.get(S);
      if (D !== void 0)
        return D;
    }
    const C = u(x), X = C.audioWorklet === void 0 ? o(S).then(([D, U]) => {
      const [P, _] = mv(D, U), F = `${P};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${_}
})})(window,'_AWGS')`;
      return r(F);
    }).then(() => {
      const D = v._AWGS.pop();
      if (D === void 0)
        throw new SyntaxError();
      i(C.currentTime, C.sampleRate, () => D(class {
      }, void 0, (U, P) => {
        if (U.trim() === "")
          throw n();
        const _ = dh.get(C);
        if (_ !== void 0) {
          if (_.has(U))
            throw n();
          yv(P), gv(P.parameterDescriptors), _.set(U, P);
        } else
          yv(P), gv(P.parameterDescriptors), dh.set(C, /* @__PURE__ */ new Map([[U, P]]));
      }, C.sampleRate, void 0, void 0));
    }) : Promise.all([
      o(S),
      Promise.resolve(t(y, y))
    ]).then(([[D, U], P]) => {
      const _ = w + 1;
      w = _;
      const [F, ae] = mv(D, U), ce = `${F};((AudioWorkletProcessor,registerProcessor)=>{${ae}
})(${P ? "AudioWorkletProcessor" : "class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${P ? "" : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${P ? "" : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${_}',class extends AudioWorkletProcessor{process(){return !1}})`, se = new Blob([ce], { type: "application/javascript; charset=utf-8" }), k = URL.createObjectURL(se);
      return C.audioWorklet.addModule(k, T).then(() => {
        if (h(C))
          return C;
        const O = c(C);
        return O.audioWorklet.addModule(k, T).then(() => O);
      }).then((O) => {
        if (d === null)
          throw new SyntaxError();
        try {
          new d(O, `__sac${_}`);
        } catch {
          throw new SyntaxError();
        }
      }).finally(() => URL.revokeObjectURL(k));
    });
    return N === void 0 ? p.set(x, /* @__PURE__ */ new Map([[S, X]])) : N.set(S, X), X.then(() => {
      const D = g.get(x);
      D === void 0 ? g.set(x, /* @__PURE__ */ new Set([S])) : D.add(S);
    }).finally(() => {
      const D = p.get(x);
      D !== void 0 && D.delete(S);
    }), X;
  };
}, An = (t, n) => {
  const r = t.get(n);
  if (r === void 0)
    throw new Error("A value with the given key could not be found.");
  return r;
}, xu = (t, n) => {
  const r = Array.from(t).filter(n);
  if (r.length > 1)
    throw Error("More than one element was found.");
  if (r.length === 0)
    throw Error("No element was found.");
  const [i] = r;
  return t.delete(i), i;
}, B2 = (t, n, r, i) => {
  const o = An(t, n), u = xu(o, (c) => c[0] === r && c[1] === i);
  return o.size === 0 && t.delete(n), u;
}, lo = (t) => An(L2, t), iu = (t) => {
  if (Si.has(t))
    throw new Error("The AudioNode is already stored.");
  Si.add(t), lo(t).forEach((n) => n(!0));
}, V2 = (t) => "port" in t, h0 = (t) => {
  if (!Si.has(t))
    throw new Error("The AudioNode is not stored.");
  Si.delete(t), lo(t).forEach((n) => n(!1));
}, ph = (t, n) => {
  !V2(t) && n.every((r) => r.size === 0) && h0(t);
}, OE = (t, n, r, i, o, u, c, h, d, p, g, y, v) => {
  const w = /* @__PURE__ */ new WeakMap();
  return (x, S, T, E, N) => {
    const { activeInputs: C, passiveInputs: X } = u(S), { outputs: D } = u(x), U = h(x), P = (_) => {
      const F = d(S), ae = d(x);
      if (_) {
        const ee = B2(X, x, T, E);
        t(C, x, ee, !1), !N && !y(x) && r(ae, F, T, E), v(S) && iu(S);
      } else {
        const ee = i(C, x, T, E);
        n(X, E, ee, !1), !N && !y(x) && o(ae, F, T, E);
        const ne = c(S);
        if (ne === 0)
          g(S) && ph(S, C);
        else {
          const he = w.get(S);
          he !== void 0 && clearTimeout(he), w.set(S, setTimeout(() => {
            g(S) && ph(S, C);
          }, ne * 1e3));
        }
      }
    };
    return p(D, [S, T, E], (_) => _[0] === S && _[1] === T && _[2] === E, !0) ? (U.add(P), g(x) ? t(C, x, [T, E, P], !0) : n(X, E, [x, T, P], !0), !0) : !1;
  };
}, LE = (t) => (n, r, [i, o, u], c) => {
  const h = n.get(i);
  h === void 0 ? n.set(i, /* @__PURE__ */ new Set([[o, r, u]])) : t(h, [o, r, u], (d) => d[0] === o && d[1] === r, c);
}, zE = (t) => (n, r) => {
  const i = t(n, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  });
  r.connect(i).connect(n.destination);
  const o = () => {
    r.removeEventListener("ended", o), r.disconnect(i), i.disconnect();
  };
  r.addEventListener("ended", o);
}, BE = (t) => (n, r) => {
  t(n).add(r);
}, U2 = (t, n) => t.context === n, vv = (t) => {
  try {
    t.copyToChannel(new Float32Array(1), 0, -1);
  } catch {
    return !1;
  }
  return !0;
}, xr = () => new DOMException("", "IndexSizeError"), VE = (t) => {
  t.getChannelData = /* @__PURE__ */ ((n) => (r) => {
    try {
      return n.call(t, r);
    } catch (i) {
      throw i.code === 12 ? xr() : i;
    }
  })(t.getChannelData);
}, UE = {
  numberOfChannels: 1
}, jE = (t, n, r, i, o, u, c, h) => {
  let d = null;
  return class j2 {
    constructor(g) {
      if (o === null)
        throw new Error("Missing the native OfflineAudioContext constructor.");
      const { length: y, numberOfChannels: v, sampleRate: w } = { ...UE, ...g };
      d === null && (d = new o(1, 1, 44100));
      const x = i !== null && n(u, u) ? new i({ length: y, numberOfChannels: v, sampleRate: w }) : d.createBuffer(v, y, w);
      if (x.numberOfChannels === 0)
        throw r();
      return typeof x.copyFromChannel != "function" ? (c(x), VE(x)) : n(vv, () => vv(x)) || h(x), t.add(x), x;
    }
    static [Symbol.hasInstance](g) {
      return g !== null && typeof g == "object" && Object.getPrototypeOf(g) === j2.prototype || t.has(g);
    }
  };
}, Su = -34028234663852886e22, p0 = -Su, yr = (t) => Si.has(t), PE = {
  buffer: null,
  channelCount: 2,
  channelCountMode: "max",
  channelInterpretation: "speakers",
  // Bug #149: Safari does not yet support the detune AudioParam.
  loop: !1,
  loopEnd: 0,
  loopStart: 0,
  playbackRate: 1
}, HE = (t, n, r, i, o, u, c, h) => class extends t {
  constructor(p, g) {
    const y = u(p), v = { ...PE, ...g }, w = o(y, v), x = c(y), S = x ? n() : null;
    super(p, !1, w, S), this._audioBufferSourceNodeRenderer = S, this._isBufferNullified = !1, this._isBufferSet = v.buffer !== null, this._nativeAudioBufferSourceNode = w, this._onended = null, this._playbackRate = r(this, x, w.playbackRate, p0, Su);
  }
  get buffer() {
    return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;
  }
  set buffer(p) {
    if (this._nativeAudioBufferSourceNode.buffer = p, p !== null) {
      if (this._isBufferSet)
        throw i();
      this._isBufferSet = !0;
    }
  }
  get loop() {
    return this._nativeAudioBufferSourceNode.loop;
  }
  set loop(p) {
    this._nativeAudioBufferSourceNode.loop = p;
  }
  get loopEnd() {
    return this._nativeAudioBufferSourceNode.loopEnd;
  }
  set loopEnd(p) {
    this._nativeAudioBufferSourceNode.loopEnd = p;
  }
  get loopStart() {
    return this._nativeAudioBufferSourceNode.loopStart;
  }
  set loopStart(p) {
    this._nativeAudioBufferSourceNode.loopStart = p;
  }
  get onended() {
    return this._onended;
  }
  set onended(p) {
    const g = typeof p == "function" ? h(this, p) : null;
    this._nativeAudioBufferSourceNode.onended = g;
    const y = this._nativeAudioBufferSourceNode.onended;
    this._onended = y !== null && y === g ? p : y;
  }
  get playbackRate() {
    return this._playbackRate;
  }
  start(p = 0, g = 0, y) {
    if (this._nativeAudioBufferSourceNode.start(p, g, y), this._audioBufferSourceNodeRenderer !== null && (this._audioBufferSourceNodeRenderer.start = y === void 0 ? [p, g] : [p, g, y]), this.context.state !== "closed") {
      iu(this);
      const v = () => {
        this._nativeAudioBufferSourceNode.removeEventListener("ended", v), yr(this) && h0(this);
      };
      this._nativeAudioBufferSourceNode.addEventListener("ended", v);
    }
  }
  stop(p = 0) {
    this._nativeAudioBufferSourceNode.stop(p), this._audioBufferSourceNodeRenderer !== null && (this._audioBufferSourceNodeRenderer.stop = p);
  }
}, qE = (t, n, r, i, o) => () => {
  const u = /* @__PURE__ */ new WeakMap();
  let c = null, h = null;
  const d = async (p, g) => {
    let y = r(p);
    const v = U2(y, g);
    if (!v) {
      const w = {
        buffer: y.buffer,
        channelCount: y.channelCount,
        channelCountMode: y.channelCountMode,
        channelInterpretation: y.channelInterpretation,
        // Bug #149: Safari does not yet support the detune AudioParam.
        loop: y.loop,
        loopEnd: y.loopEnd,
        loopStart: y.loopStart,
        playbackRate: y.playbackRate.value
      };
      y = n(g, w), c !== null && y.start(...c), h !== null && y.stop(h);
    }
    return u.set(g, y), v ? await t(g, p.playbackRate, y.playbackRate) : await i(g, p.playbackRate, y.playbackRate), await o(p, g, y), y;
  };
  return {
    set start(p) {
      c = p;
    },
    set stop(p) {
      h = p;
    },
    render(p, g) {
      const y = u.get(g);
      return y !== void 0 ? Promise.resolve(y) : d(p, g);
    }
  };
}, GE = (t) => "playbackRate" in t, YE = (t) => "frequency" in t && "gain" in t, XE = (t) => "offset" in t, IE = (t) => !("frequency" in t) && "gain" in t, ZE = (t) => "detune" in t && "frequency" in t && !("gain" in t), WE = (t) => "pan" in t, Nt = (t) => An(R2, t), uo = (t) => An(N2, t), mh = (t, n) => {
  const { activeInputs: r } = Nt(t);
  r.forEach((o) => o.forEach(([u]) => {
    n.includes(t) || mh(u, [...n, t]);
  }));
  const i = GE(t) ? [
    // Bug #149: Safari does not yet support the detune AudioParam.
    t.playbackRate
  ] : V2(t) ? Array.from(t.parameters.values()) : YE(t) ? [t.Q, t.detune, t.frequency, t.gain] : XE(t) ? [t.offset] : IE(t) ? [t.gain] : ZE(t) ? [t.detune, t.frequency] : WE(t) ? [t.pan] : [];
  for (const o of i) {
    const u = uo(o);
    u !== void 0 && u.activeInputs.forEach(([c]) => mh(c, n));
  }
  yr(t) && h0(t);
}, KE = (t) => {
  mh(t.destination, []);
}, QE = (t) => t === void 0 || typeof t == "number" || typeof t == "string" && (t === "balanced" || t === "interactive" || t === "playback"), FE = (t, n, r, i, o, u, c, h) => class extends t {
  constructor(p, g) {
    const y = u(p), v = c(y), w = o(y, g, v), x = v ? n(h) : null;
    super(p, !1, w, x), this._isNodeOfNativeOfflineAudioContext = v, this._nativeAudioDestinationNode = w;
  }
  get channelCount() {
    return this._nativeAudioDestinationNode.channelCount;
  }
  set channelCount(p) {
    if (this._isNodeOfNativeOfflineAudioContext)
      throw i();
    if (p > this._nativeAudioDestinationNode.maxChannelCount)
      throw r();
    this._nativeAudioDestinationNode.channelCount = p;
  }
  get channelCountMode() {
    return this._nativeAudioDestinationNode.channelCountMode;
  }
  set channelCountMode(p) {
    if (this._isNodeOfNativeOfflineAudioContext)
      throw i();
    this._nativeAudioDestinationNode.channelCountMode = p;
  }
  get maxChannelCount() {
    return this._nativeAudioDestinationNode.maxChannelCount;
  }
}, $E = (t) => {
  const n = /* @__PURE__ */ new WeakMap(), r = async (i, o) => {
    const u = o.destination;
    return n.set(o, u), await t(i, o, u), u;
  };
  return {
    render(i, o) {
      const u = n.get(o);
      return u !== void 0 ? Promise.resolve(u) : r(i, o);
    }
  };
}, JE = (t, n, r, i, o, u, c, h) => (d, p) => {
  const g = p.listener, y = () => {
    const D = new Float32Array(1), U = n(p, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
      numberOfInputs: 9
    }), P = c(p);
    let _ = !1, F = [0, 0, -1, 0, 1, 0], ae = [0, 0, 0];
    const ee = () => {
      if (_)
        return;
      _ = !0;
      const se = i(p, 256, 9, 0);
      se.onaudioprocess = ({ inputBuffer: k }) => {
        const O = [
          u(k, D, 0),
          u(k, D, 1),
          u(k, D, 2),
          u(k, D, 3),
          u(k, D, 4),
          u(k, D, 5)
        ];
        O.some((q, M) => q !== F[M]) && (g.setOrientation(...O), F = O);
        const z = [
          u(k, D, 6),
          u(k, D, 7),
          u(k, D, 8)
        ];
        z.some((q, M) => q !== ae[M]) && (g.setPosition(...z), ae = z);
      }, U.connect(se);
    }, ne = (se) => (k) => {
      k !== F[se] && (F[se] = k, g.setOrientation(...F));
    }, he = (se) => (k) => {
      k !== ae[se] && (ae[se] = k, g.setPosition(...ae));
    }, ce = (se, k, O) => {
      const z = r(p, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        offset: k
      });
      z.connect(U, 0, se), z.start(), Object.defineProperty(z.offset, "defaultValue", {
        get() {
          return k;
        }
      });
      const q = t({ context: d }, P, z.offset, p0, Su);
      return h(q, "value", (M) => () => M.call(q), (M) => (B) => {
        try {
          M.call(q, B);
        } catch (G) {
          if (G.code !== 9)
            throw G;
        }
        ee(), P && O(B);
      }), q.cancelAndHoldAtTime = /* @__PURE__ */ ((M) => P ? () => {
        throw o();
      } : (...B) => {
        const G = M.apply(q, B);
        return ee(), G;
      })(q.cancelAndHoldAtTime), q.cancelScheduledValues = /* @__PURE__ */ ((M) => P ? () => {
        throw o();
      } : (...B) => {
        const G = M.apply(q, B);
        return ee(), G;
      })(q.cancelScheduledValues), q.exponentialRampToValueAtTime = /* @__PURE__ */ ((M) => P ? () => {
        throw o();
      } : (...B) => {
        const G = M.apply(q, B);
        return ee(), G;
      })(q.exponentialRampToValueAtTime), q.linearRampToValueAtTime = /* @__PURE__ */ ((M) => P ? () => {
        throw o();
      } : (...B) => {
        const G = M.apply(q, B);
        return ee(), G;
      })(q.linearRampToValueAtTime), q.setTargetAtTime = /* @__PURE__ */ ((M) => P ? () => {
        throw o();
      } : (...B) => {
        const G = M.apply(q, B);
        return ee(), G;
      })(q.setTargetAtTime), q.setValueAtTime = /* @__PURE__ */ ((M) => P ? () => {
        throw o();
      } : (...B) => {
        const G = M.apply(q, B);
        return ee(), G;
      })(q.setValueAtTime), q.setValueCurveAtTime = /* @__PURE__ */ ((M) => P ? () => {
        throw o();
      } : (...B) => {
        const G = M.apply(q, B);
        return ee(), G;
      })(q.setValueCurveAtTime), q;
    };
    return {
      forwardX: ce(0, 0, ne(0)),
      forwardY: ce(1, 0, ne(1)),
      forwardZ: ce(2, -1, ne(2)),
      positionX: ce(6, 0, he(0)),
      positionY: ce(7, 0, he(1)),
      positionZ: ce(8, 0, he(2)),
      upX: ce(3, 0, ne(3)),
      upY: ce(4, 1, ne(4)),
      upZ: ce(5, 0, ne(5))
    };
  }, { forwardX: v, forwardY: w, forwardZ: x, positionX: S, positionY: T, positionZ: E, upX: N, upY: C, upZ: X } = g.forwardX === void 0 ? y() : g;
  return {
    get forwardX() {
      return v;
    },
    get forwardY() {
      return w;
    },
    get forwardZ() {
      return x;
    },
    get positionX() {
      return S;
    },
    get positionY() {
      return T;
    },
    get positionZ() {
      return E;
    },
    get upX() {
      return N;
    },
    get upY() {
      return C;
    },
    get upZ() {
      return X;
    }
  };
}, su = (t) => "context" in t, co = (t) => su(t[0]), Sr = (t, n, r, i) => {
  for (const o of t)
    if (r(o)) {
      if (i)
        return !1;
      throw Error("The set contains at least one similar element.");
    }
  return t.add(n), !0;
}, bv = (t, n, [r, i], o) => {
  Sr(t, [n, r, i], (u) => u[0] === n && u[1] === r, o);
}, wv = (t, [n, r, i], o) => {
  const u = t.get(n);
  u === void 0 ? t.set(n, /* @__PURE__ */ new Set([[r, i]])) : Sr(u, [r, i], (c) => c[0] === r, o);
}, P2 = (t) => "inputs" in t, gh = (t, n, r, i) => {
  if (P2(n)) {
    const o = n.inputs[i];
    return t.connect(o, r, 0), [o, r, 0];
  }
  return t.connect(n, r, i), [n, r, i];
}, H2 = (t, n, r) => {
  for (const i of t)
    if (i[0] === n && i[1] === r)
      return t.delete(i), i;
  return null;
}, e8 = (t, n, r) => xu(t, (i) => i[0] === n && i[1] === r), q2 = (t, n) => {
  if (!lo(t).delete(n))
    throw new Error("Missing the expected event listener.");
}, G2 = (t, n, r) => {
  const i = An(t, n), o = xu(i, (u) => u[0] === r);
  return i.size === 0 && t.delete(n), o;
}, yh = (t, n, r, i) => {
  P2(n) ? t.disconnect(n.inputs[i], r, 0) : t.disconnect(n, r, i);
}, xn = (t) => An(k2, t), Js = (t) => An(D2, t), br = (t) => fh.has(t), Ql = (t) => !Si.has(t), xv = (t, n) => new Promise((r) => {
  if (n !== null)
    r(!0);
  else {
    const i = t.createScriptProcessor(256, 1, 1), o = t.createGain(), u = t.createBuffer(1, 2, 44100), c = u.getChannelData(0);
    c[0] = 1, c[1] = 1;
    const h = t.createBufferSource();
    h.buffer = u, h.loop = !0, h.connect(i).connect(t.destination), h.connect(o), h.disconnect(o), i.onaudioprocess = (d) => {
      const p = d.inputBuffer.getChannelData(0);
      Array.prototype.some.call(p, (g) => g === 1) ? r(!0) : r(!1), h.stop(), i.onaudioprocess = null, h.disconnect(i), i.disconnect(t.destination);
    }, h.start();
  }
}), Md = (t, n) => {
  const r = /* @__PURE__ */ new Map();
  for (const i of t)
    for (const o of i) {
      const u = r.get(o);
      r.set(o, u === void 0 ? 1 : u + 1);
    }
  r.forEach((i, o) => n(o, i));
}, ou = (t) => "context" in t, t8 = (t) => {
  const n = /* @__PURE__ */ new Map();
  t.connect = /* @__PURE__ */ ((r) => (i, o = 0, u = 0) => {
    const c = ou(i) ? r(i, o, u) : r(i, o), h = n.get(i);
    return h === void 0 ? n.set(i, [{ input: u, output: o }]) : h.every((d) => d.input !== u || d.output !== o) && h.push({ input: u, output: o }), c;
  })(t.connect.bind(t)), t.disconnect = /* @__PURE__ */ ((r) => (i, o, u) => {
    if (r.apply(t), i === void 0)
      n.clear();
    else if (typeof i == "number")
      for (const [c, h] of n) {
        const d = h.filter((p) => p.output !== i);
        d.length === 0 ? n.delete(c) : n.set(c, d);
      }
    else if (n.has(i))
      if (o === void 0)
        n.delete(i);
      else {
        const c = n.get(i);
        if (c !== void 0) {
          const h = c.filter((d) => d.output !== o && (d.input !== u || u === void 0));
          h.length === 0 ? n.delete(i) : n.set(i, h);
        }
      }
    for (const [c, h] of n)
      h.forEach((d) => {
        ou(c) ? t.connect(c, d.output, d.input) : t.connect(c, d.output);
      });
  })(t.disconnect);
}, n8 = (t, n, r, i) => {
  const { activeInputs: o, passiveInputs: u } = uo(n), { outputs: c } = Nt(t), h = lo(t), d = (p) => {
    const g = xn(t), y = Js(n);
    if (p) {
      const v = G2(u, t, r);
      bv(o, t, v, !1), !i && !br(t) && g.connect(y, r);
    } else {
      const v = e8(o, t, r);
      wv(u, v, !1), !i && !br(t) && g.disconnect(y, r);
    }
  };
  return Sr(c, [n, r], (p) => p[0] === n && p[1] === r, !0) ? (h.add(d), yr(t) ? bv(o, t, [r, d], !0) : wv(u, [t, r, d], !0), !0) : !1;
}, a8 = (t, n, r, i) => {
  const { activeInputs: o, passiveInputs: u } = Nt(n), c = H2(o[i], t, r);
  return c === null ? [B2(u, t, r, i)[2], !1] : [c[2], !0];
}, r8 = (t, n, r) => {
  const { activeInputs: i, passiveInputs: o } = uo(n), u = H2(i, t, r);
  return u === null ? [G2(o, t, r)[1], !1] : [u[2], !0];
}, m0 = (t, n, r, i, o) => {
  const [u, c] = a8(t, r, i, o);
  if (u !== null && (q2(t, u), c && !n && !br(t) && yh(xn(t), xn(r), i, o)), yr(r)) {
    const { activeInputs: h } = Nt(r);
    ph(r, h);
  }
}, g0 = (t, n, r, i) => {
  const [o, u] = r8(t, r, i);
  o !== null && (q2(t, o), u && !n && !br(t) && xn(t).disconnect(Js(r), i));
}, i8 = (t, n) => {
  const r = Nt(t), i = [];
  for (const o of r.outputs)
    co(o) ? m0(t, n, ...o) : g0(t, n, ...o), i.push(o[0]);
  return r.outputs.clear(), i;
}, s8 = (t, n, r) => {
  const i = Nt(t), o = [];
  for (const u of i.outputs)
    u[1] === r && (co(u) ? m0(t, n, ...u) : g0(t, n, ...u), o.push(u[0]), i.outputs.delete(u));
  return o;
}, o8 = (t, n, r, i, o) => {
  const u = Nt(t);
  return Array.from(u.outputs).filter((c) => c[0] === r && (i === void 0 || c[1] === i) && (o === void 0 || c[2] === o)).map((c) => (co(c) ? m0(t, n, ...c) : g0(t, n, ...c), u.outputs.delete(c), c[0]));
}, l8 = (t, n, r, i, o, u, c, h, d, p, g, y, v, w, x, S) => class extends p {
  constructor(E, N, C, X) {
    super(C), this._context = E, this._nativeAudioNode = C;
    const D = g(E);
    y(D) && r(xv, () => xv(D, S)) !== !0 && t8(C), k2.set(this, C), L2.set(this, /* @__PURE__ */ new Set()), E.state !== "closed" && N && iu(this), t(this, X, C);
  }
  get channelCount() {
    return this._nativeAudioNode.channelCount;
  }
  set channelCount(E) {
    this._nativeAudioNode.channelCount = E;
  }
  get channelCountMode() {
    return this._nativeAudioNode.channelCountMode;
  }
  set channelCountMode(E) {
    this._nativeAudioNode.channelCountMode = E;
  }
  get channelInterpretation() {
    return this._nativeAudioNode.channelInterpretation;
  }
  set channelInterpretation(E) {
    this._nativeAudioNode.channelInterpretation = E;
  }
  get context() {
    return this._context;
  }
  get numberOfInputs() {
    return this._nativeAudioNode.numberOfInputs;
  }
  get numberOfOutputs() {
    return this._nativeAudioNode.numberOfOutputs;
  }
  // tslint:disable-next-line:invalid-void
  connect(E, N = 0, C = 0) {
    if (N < 0 || N >= this._nativeAudioNode.numberOfOutputs)
      throw o();
    const X = g(this._context), D = x(X);
    if (v(E) || w(E))
      throw u();
    if (su(E)) {
      const _ = xn(E);
      try {
        const ae = gh(this._nativeAudioNode, _, N, C), ee = Ql(this);
        (D || ee) && this._nativeAudioNode.disconnect(...ae), this.context.state !== "closed" && !ee && Ql(E) && iu(E);
      } catch (ae) {
        throw ae.code === 12 ? u() : ae;
      }
      if (n(this, E, N, C, D)) {
        const ae = d([this], E);
        Md(ae, i(D));
      }
      return E;
    }
    const U = Js(E);
    if (U.name === "playbackRate" && U.maxValue === 1024)
      throw c();
    try {
      this._nativeAudioNode.connect(U, N), (D || Ql(this)) && this._nativeAudioNode.disconnect(U, N);
    } catch (_) {
      throw _.code === 12 ? u() : _;
    }
    if (n8(this, E, N, D)) {
      const _ = d([this], E);
      Md(_, i(D));
    }
  }
  disconnect(E, N, C) {
    let X;
    const D = g(this._context), U = x(D);
    if (E === void 0)
      X = i8(this, U);
    else if (typeof E == "number") {
      if (E < 0 || E >= this.numberOfOutputs)
        throw o();
      X = s8(this, U, E);
    } else {
      if (N !== void 0 && (N < 0 || N >= this.numberOfOutputs) || su(E) && C !== void 0 && (C < 0 || C >= E.numberOfInputs))
        throw o();
      if (X = o8(this, U, E, N, C), X.length === 0)
        throw u();
    }
    for (const P of X) {
      const _ = d([this], P);
      Md(_, h);
    }
  }
}, u8 = (t, n, r, i, o, u, c, h, d, p, g, y, v) => (w, x, S, T = null, E = null) => {
  const N = S.value, C = new Da.AutomationEventList(N), X = x ? i(C) : null, D = {
    get defaultValue() {
      return N;
    },
    get maxValue() {
      return T === null ? S.maxValue : T;
    },
    get minValue() {
      return E === null ? S.minValue : E;
    },
    get value() {
      return S.value;
    },
    set value(U) {
      S.value = U, D.setValueAtTime(U, w.context.currentTime);
    },
    cancelAndHoldAtTime(U) {
      if (typeof S.cancelAndHoldAtTime == "function")
        X === null && C.flush(w.context.currentTime), C.add(o(U)), S.cancelAndHoldAtTime(U);
      else {
        const P = Array.from(C).pop();
        X === null && C.flush(w.context.currentTime), C.add(o(U));
        const _ = Array.from(C).pop();
        S.cancelScheduledValues(U), P !== _ && _ !== void 0 && (_.type === "exponentialRampToValue" ? S.exponentialRampToValueAtTime(_.value, _.endTime) : _.type === "linearRampToValue" ? S.linearRampToValueAtTime(_.value, _.endTime) : _.type === "setValue" ? S.setValueAtTime(_.value, _.startTime) : _.type === "setValueCurve" && S.setValueCurveAtTime(_.values, _.startTime, _.duration));
      }
      return D;
    },
    cancelScheduledValues(U) {
      return X === null && C.flush(w.context.currentTime), C.add(u(U)), S.cancelScheduledValues(U), D;
    },
    exponentialRampToValueAtTime(U, P) {
      if (U === 0)
        throw new RangeError();
      if (!Number.isFinite(P) || P < 0)
        throw new RangeError();
      const _ = w.context.currentTime;
      return X === null && C.flush(_), Array.from(C).length === 0 && (C.add(p(N, _)), S.setValueAtTime(N, _)), C.add(c(U, P)), S.exponentialRampToValueAtTime(U, P), D;
    },
    linearRampToValueAtTime(U, P) {
      const _ = w.context.currentTime;
      return X === null && C.flush(_), Array.from(C).length === 0 && (C.add(p(N, _)), S.setValueAtTime(N, _)), C.add(h(U, P)), S.linearRampToValueAtTime(U, P), D;
    },
    setTargetAtTime(U, P, _) {
      return X === null && C.flush(w.context.currentTime), C.add(d(U, P, _)), S.setTargetAtTime(U, P, _), D;
    },
    setValueAtTime(U, P) {
      return X === null && C.flush(w.context.currentTime), C.add(p(U, P)), S.setValueAtTime(U, P), D;
    },
    setValueCurveAtTime(U, P, _) {
      const F = U instanceof Float32Array ? U : new Float32Array(U);
      if (y !== null && y.name === "webkitAudioContext") {
        const ae = P + _, ee = w.context.sampleRate, ne = Math.ceil(P * ee), he = Math.floor(ae * ee), ce = he - ne, se = new Float32Array(ce);
        for (let O = 0; O < ce; O += 1) {
          const z = (F.length - 1) / _ * ((ne + O) / ee - P), q = Math.floor(z), M = Math.ceil(z);
          se[O] = q === M ? F[q] : (1 - (z - q)) * F[q] + (1 - (M - z)) * F[M];
        }
        X === null && C.flush(w.context.currentTime), C.add(g(se, P, _)), S.setValueCurveAtTime(se, P, _);
        const k = he / ee;
        k < ae && v(D, se[se.length - 1], k), v(D, F[F.length - 1], ae);
      } else
        X === null && C.flush(w.context.currentTime), C.add(g(F, P, _)), S.setValueCurveAtTime(F, P, _);
      return D;
    }
  };
  return r.set(D, S), n.set(D, w), t(D, X), D;
}, c8 = (t) => ({
  replay(n) {
    for (const r of t)
      if (r.type === "exponentialRampToValue") {
        const { endTime: i, value: o } = r;
        n.exponentialRampToValueAtTime(o, i);
      } else if (r.type === "linearRampToValue") {
        const { endTime: i, value: o } = r;
        n.linearRampToValueAtTime(o, i);
      } else if (r.type === "setTarget") {
        const { startTime: i, target: o, timeConstant: u } = r;
        n.setTargetAtTime(o, i, u);
      } else if (r.type === "setValue") {
        const { startTime: i, value: o } = r;
        n.setValueAtTime(o, i);
      } else if (r.type === "setValueCurve") {
        const { duration: i, startTime: o, values: u } = r;
        n.setValueCurveAtTime(u, o, i);
      } else
        throw new Error("Can't apply an unknown automation.");
  }
});
class Y2 {
  constructor(n) {
    this._map = new Map(n);
  }
  get size() {
    return this._map.size;
  }
  entries() {
    return this._map.entries();
  }
  forEach(n, r = null) {
    return this._map.forEach((i, o) => n.call(r, i, o, this));
  }
  get(n) {
    return this._map.get(n);
  }
  has(n) {
    return this._map.has(n);
  }
  keys() {
    return this._map.keys();
  }
  values() {
    return this._map.values();
  }
}
const f8 = {
  channelCount: 2,
  // Bug #61: The channelCountMode should be 'max' according to the spec but is set to 'explicit' to achieve consistent behavior.
  channelCountMode: "explicit",
  channelInterpretation: "speakers",
  numberOfInputs: 1,
  numberOfOutputs: 1,
  parameterData: {},
  processorOptions: {}
}, d8 = (t, n, r, i, o, u, c, h, d, p, g, y, v, w) => class extends n {
  constructor(S, T, E) {
    var N;
    const C = h(S), X = d(C), D = g({ ...f8, ...E });
    v(D);
    const U = dh.get(C), P = U == null ? void 0 : U.get(T), _ = X || C.state !== "closed" ? C : (N = c(C)) !== null && N !== void 0 ? N : C, F = o(_, X ? null : S.baseLatency, p, T, P, D), ae = X ? i(T, D, P) : null;
    super(S, !0, F, ae);
    const ee = [];
    F.parameters.forEach((he, ce) => {
      const se = r(this, X, he);
      ee.push([ce, se]);
    }), this._nativeAudioWorkletNode = F, this._onprocessorerror = null, this._parameters = new Y2(ee), X && t(C, this);
    const { activeInputs: ne } = u(this);
    y(F, ne);
  }
  get onprocessorerror() {
    return this._onprocessorerror;
  }
  set onprocessorerror(S) {
    const T = typeof S == "function" ? w(this, S) : null;
    this._nativeAudioWorkletNode.onprocessorerror = T;
    const E = this._nativeAudioWorkletNode.onprocessorerror;
    this._onprocessorerror = E !== null && E === T ? S : E;
  }
  get parameters() {
    return this._parameters === null ? this._nativeAudioWorkletNode.parameters : this._parameters;
  }
  get port() {
    return this._nativeAudioWorkletNode.port;
  }
};
function lu(t, n, r, i, o) {
  if (typeof t.copyFromChannel == "function")
    n[r].byteLength === 0 && (n[r] = new Float32Array(128)), t.copyFromChannel(n[r], i, o);
  else {
    const u = t.getChannelData(i);
    if (n[r].byteLength === 0)
      n[r] = u.slice(o, o + 128);
    else {
      const c = new Float32Array(u.buffer, o * Float32Array.BYTES_PER_ELEMENT, 128);
      n[r].set(c);
    }
  }
}
const X2 = (t, n, r, i, o) => {
  typeof t.copyToChannel == "function" ? n[r].byteLength !== 0 && t.copyToChannel(n[r], i, o) : n[r].byteLength !== 0 && t.getChannelData(i).set(n[r], o);
}, uu = (t, n) => {
  const r = [];
  for (let i = 0; i < t; i += 1) {
    const o = [], u = typeof n == "number" ? n : n[i];
    for (let c = 0; c < u; c += 1)
      o.push(new Float32Array(128));
    r.push(o);
  }
  return r;
}, h8 = (t, n) => {
  const r = An(hh, t), i = xn(n);
  return An(r, i);
}, p8 = async (t, n, r, i, o, u, c) => {
  const h = n === null ? Math.ceil(t.context.length / 128) * 128 : n.length, d = i.channelCount * i.numberOfInputs, p = o.reduce((T, E) => T + E, 0), g = p === 0 ? null : r.createBuffer(p, h, r.sampleRate);
  if (u === void 0)
    throw new Error("Missing the processor constructor.");
  const y = Nt(t), v = await h8(r, t), w = uu(i.numberOfInputs, i.channelCount), x = uu(i.numberOfOutputs, o), S = Array.from(t.parameters.keys()).reduce((T, E) => ({ ...T, [E]: new Float32Array(128) }), {});
  for (let T = 0; T < h; T += 128) {
    if (i.numberOfInputs > 0 && n !== null)
      for (let E = 0; E < i.numberOfInputs; E += 1)
        for (let N = 0; N < i.channelCount; N += 1)
          lu(n, w[E], N, N, T);
    u.parameterDescriptors !== void 0 && n !== null && u.parameterDescriptors.forEach(({ name: E }, N) => {
      lu(n, S, E, d + N, T);
    });
    for (let E = 0; E < i.numberOfInputs; E += 1)
      for (let N = 0; N < o[E]; N += 1)
        x[E][N].byteLength === 0 && (x[E][N] = new Float32Array(128));
    try {
      const E = w.map((C, X) => y.activeInputs[X].size === 0 ? [] : C), N = c(T / r.sampleRate, r.sampleRate, () => v.process(E, x, S));
      if (g !== null)
        for (let C = 0, X = 0; C < i.numberOfOutputs; C += 1) {
          for (let D = 0; D < o[C]; D += 1)
            X2(g, x[C], D, X + D, T);
          X += o[C];
        }
      if (!N)
        break;
    } catch (E) {
      t.dispatchEvent(new ErrorEvent("processorerror", {
        colno: E.colno,
        filename: E.filename,
        lineno: E.lineno,
        message: E.message
      }));
      break;
    }
  }
  return g;
}, m8 = (t, n, r, i, o, u, c, h, d, p, g, y, v, w, x, S) => (T, E, N) => {
  const C = /* @__PURE__ */ new WeakMap();
  let X = null;
  const D = async (U, P) => {
    let _ = g(U), F = null;
    const ae = U2(_, P), ee = Array.isArray(E.outputChannelCount) ? E.outputChannelCount : Array.from(E.outputChannelCount);
    if (y === null) {
      const ne = ee.reduce((k, O) => k + O, 0), he = o(P, {
        channelCount: Math.max(1, ne),
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        numberOfOutputs: Math.max(1, ne)
      }), ce = [];
      for (let k = 0; k < U.numberOfOutputs; k += 1)
        ce.push(i(P, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "speakers",
          numberOfInputs: ee[k]
        }));
      const se = c(P, {
        channelCount: E.channelCount,
        channelCountMode: E.channelCountMode,
        channelInterpretation: E.channelInterpretation,
        gain: 1
      });
      se.connect = n.bind(null, ce), se.disconnect = d.bind(null, ce), F = [he, ce, se];
    } else ae || (_ = new y(P, T));
    if (C.set(P, F === null ? _ : F[2]), F !== null) {
      if (X === null) {
        if (N === void 0)
          throw new Error("Missing the processor constructor.");
        if (v === null)
          throw new Error("Missing the native OfflineAudioContext constructor.");
        const O = U.channelCount * U.numberOfInputs, z = N.parameterDescriptors === void 0 ? 0 : N.parameterDescriptors.length, q = O + z;
        X = p8(U, q === 0 ? null : await (async () => {
          const B = new v(
            q,
            // Ceil the length to the next full render quantum.
            // Bug #17: Safari does not yet expose the length.
            Math.ceil(U.context.length / 128) * 128,
            P.sampleRate
          ), G = [], J = [];
          for (let ie = 0; ie < E.numberOfInputs; ie += 1)
            G.push(c(B, {
              channelCount: E.channelCount,
              channelCountMode: E.channelCountMode,
              channelInterpretation: E.channelInterpretation,
              gain: 1
            })), J.push(o(B, {
              channelCount: E.channelCount,
              channelCountMode: "explicit",
              channelInterpretation: "discrete",
              numberOfOutputs: E.channelCount
            }));
          const te = await Promise.all(Array.from(U.parameters.values()).map(async (ie) => {
            const me = u(B, {
              channelCount: 1,
              channelCountMode: "explicit",
              channelInterpretation: "discrete",
              offset: ie.value
            });
            return await w(B, ie, me.offset), me;
          })), pe = i(B, {
            channelCount: 1,
            channelCountMode: "explicit",
            channelInterpretation: "speakers",
            numberOfInputs: Math.max(1, O + z)
          });
          for (let ie = 0; ie < E.numberOfInputs; ie += 1) {
            G[ie].connect(J[ie]);
            for (let me = 0; me < E.channelCount; me += 1)
              J[ie].connect(pe, me, ie * E.channelCount + me);
          }
          for (const [ie, me] of te.entries())
            me.connect(pe, 0, O + ie), me.start(0);
          return pe.connect(B.destination), await Promise.all(G.map((ie) => x(U, B, ie))), S(B);
        })(), P, E, ee, N, p);
      }
      const ne = await X, he = r(P, {
        buffer: null,
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers",
        loop: !1,
        loopEnd: 0,
        loopStart: 0,
        playbackRate: 1
      }), [ce, se, k] = F;
      ne !== null && (he.buffer = ne, he.start(0)), he.connect(ce);
      for (let O = 0, z = 0; O < U.numberOfOutputs; O += 1) {
        const q = se[O];
        for (let M = 0; M < ee[O]; M += 1)
          ce.connect(q, z + M, M);
        z += ee[O];
      }
      return k;
    }
    if (ae)
      for (const [ne, he] of U.parameters.entries())
        await t(
          P,
          he,
          // @todo The definition that TypeScript uses of the AudioParamMap is lacking many methods.
          _.parameters.get(ne)
        );
    else
      for (const [ne, he] of U.parameters.entries())
        await w(
          P,
          he,
          // @todo The definition that TypeScript uses of the AudioParamMap is lacking many methods.
          _.parameters.get(ne)
        );
    return await x(U, P, _), _;
  };
  return {
    render(U, P) {
      h(P, U);
      const _ = C.get(P);
      return _ !== void 0 ? Promise.resolve(_) : D(U, P);
    }
  };
}, g8 = (t, n) => (r, i) => {
  const o = n.get(r);
  if (o !== void 0)
    return o;
  const u = t.get(r);
  if (u !== void 0)
    return u;
  try {
    const c = i();
    return c instanceof Promise ? (t.set(r, c), c.catch(() => !1).then((h) => (t.delete(r), n.set(r, h), h))) : (n.set(r, c), c);
  } catch {
    return n.set(r, !1), !1;
  }
}, y8 = (t) => (n, r, i) => t(r, n, i), v8 = (t) => (n, r, i = 0, o = 0) => {
  const u = n[i];
  if (u === void 0)
    throw t();
  return ou(r) ? u.connect(r, 0, o) : u.connect(r, 0);
}, b8 = (t) => (n) => (t[0] = n, t[0]), w8 = (t, n, r, i, o, u, c, h) => (d, p) => {
  const g = n.get(d);
  if (g === void 0)
    throw new Error("Missing the expected cycle count.");
  const y = u(d.context), v = h(y);
  if (g === p) {
    if (n.delete(d), !v && c(d)) {
      const w = i(d), { outputs: x } = r(d);
      for (const S of x)
        if (co(S)) {
          const T = i(S[0]);
          t(w, T, S[1], S[2]);
        } else {
          const T = o(S[0]);
          w.connect(T, S[1]);
        }
    }
  } else
    n.set(d, g - p);
}, x8 = (t) => (n, r, i, o) => t(n[o], (u) => u[0] === r && u[1] === i), S8 = (t) => (n, r) => {
  t(n).delete(r);
}, A8 = (t) => "delayTime" in t, T8 = (t, n, r) => function i(o, u) {
  const c = su(u) ? u : r(t, u);
  if (A8(c))
    return [];
  if (o[0] === c)
    return [o];
  if (o.includes(c))
    return [];
  const { outputs: h } = n(c);
  return Array.from(h).map((d) => i([...o, c], d[0])).reduce((d, p) => d.concat(p), []);
}, Ll = (t, n, r) => {
  const i = n[r];
  if (i === void 0)
    throw t();
  return i;
}, M8 = (t) => (n, r = void 0, i = void 0, o = 0) => r === void 0 ? n.forEach((u) => u.disconnect()) : typeof r == "number" ? Ll(t, n, r).disconnect() : ou(r) ? i === void 0 ? n.forEach((u) => u.disconnect(r)) : o === void 0 ? Ll(t, n, i).disconnect(r, 0) : Ll(t, n, i).disconnect(r, 0, o) : i === void 0 ? n.forEach((u) => u.disconnect(r)) : Ll(t, n, i).disconnect(r, 0), E8 = (t) => (n) => new Promise((r, i) => {
  if (t === null) {
    i(new SyntaxError());
    return;
  }
  const o = t.document.head;
  if (o === null)
    i(new SyntaxError());
  else {
    const u = t.document.createElement("script"), c = new Blob([n], { type: "application/javascript" }), h = URL.createObjectURL(c), d = t.onerror, p = () => {
      t.onerror = d, URL.revokeObjectURL(h);
    };
    t.onerror = (g, y, v, w, x) => {
      if (y === h || y === t.location.href && v === 1 && w === 1)
        return p(), i(x), !1;
      if (d !== null)
        return d(g, y, v, w, x);
    }, u.onerror = () => {
      p(), i(new SyntaxError());
    }, u.onload = () => {
      p(), r();
    }, u.src = h, u.type = "module", o.appendChild(u);
  }
}), C8 = (t) => class {
  constructor(r) {
    this._nativeEventTarget = r, this._listeners = /* @__PURE__ */ new WeakMap();
  }
  addEventListener(r, i, o) {
    if (i !== null) {
      let u = this._listeners.get(i);
      u === void 0 && (u = t(this, i), typeof i == "function" && this._listeners.set(i, u)), this._nativeEventTarget.addEventListener(r, u, o);
    }
  }
  dispatchEvent(r) {
    return this._nativeEventTarget.dispatchEvent(r);
  }
  removeEventListener(r, i, o) {
    const u = i === null ? void 0 : this._listeners.get(i);
    this._nativeEventTarget.removeEventListener(r, u === void 0 ? null : u, o);
  }
}, _8 = (t) => (n, r, i) => {
  Object.defineProperties(t, {
    currentFrame: {
      configurable: !0,
      get() {
        return Math.round(n * r);
      }
    },
    currentTime: {
      configurable: !0,
      get() {
        return n;
      }
    }
  });
  try {
    return i();
  } finally {
    t !== null && (delete t.currentFrame, delete t.currentTime);
  }
}, R8 = (t) => async (n) => {
  try {
    const r = await fetch(n);
    if (r.ok)
      return [await r.text(), r.url];
  } catch {
  }
  throw t();
}, k8 = (t, n) => (r) => n(t, r), N8 = (t) => (n) => {
  const r = t(n);
  if (r.renderer === null)
    throw new Error("Missing the renderer of the given AudioNode in the audio graph.");
  return r.renderer;
}, D8 = (t) => (n) => {
  var r;
  return (r = t.get(n)) !== null && r !== void 0 ? r : 0;
}, O8 = (t) => (n) => {
  const r = t(n);
  if (r.renderer === null)
    throw new Error("Missing the renderer of the given AudioParam in the audio graph.");
  return r.renderer;
}, L8 = (t) => (n) => t.get(n), Sn = () => new DOMException("", "InvalidStateError"), z8 = (t) => (n) => {
  const r = t.get(n);
  if (r === void 0)
    throw Sn();
  return r;
}, B8 = (t, n) => (r) => {
  let i = t.get(r);
  if (i !== void 0)
    return i;
  if (n === null)
    throw new Error("Missing the native OfflineAudioContext constructor.");
  return i = new n(1, 1, 44100), t.set(r, i), i;
}, V8 = (t) => (n) => {
  const r = t.get(n);
  if (r === void 0)
    throw new Error("The context has no set of AudioWorkletNodes.");
  return r;
}, U8 = () => new DOMException("", "InvalidAccessError"), j8 = (t, n, r, i, o, u) => (c) => (h, d) => {
  const p = t.get(h);
  if (p === void 0) {
    if (!c && u(h)) {
      const g = i(h), { outputs: y } = r(h);
      for (const v of y)
        if (co(v)) {
          const w = i(v[0]);
          n(g, w, v[1], v[2]);
        } else {
          const w = o(v[0]);
          g.disconnect(w, v[1]);
        }
    }
    t.set(h, d);
  } else
    t.set(h, p + d);
}, P8 = (t) => (n) => t !== null && n instanceof t, H8 = (t) => (n) => t !== null && typeof t.AudioNode == "function" && n instanceof t.AudioNode, q8 = (t) => (n) => t !== null && typeof t.AudioParam == "function" && n instanceof t.AudioParam, G8 = (t) => (n) => t !== null && n instanceof t, Y8 = (t) => t !== null && t.isSecureContext, X8 = (t, n, r, i) => class extends t {
  constructor(u, c) {
    const h = r(u), d = n(h, c);
    if (i(h))
      throw new TypeError();
    super(u, !0, d, null), this._nativeMediaStreamAudioSourceNode = d;
  }
  get mediaStream() {
    return this._nativeMediaStreamAudioSourceNode.mediaStream;
  }
}, I8 = (t, n, r, i, o) => class extends i {
  constructor(c = {}) {
    if (o === null)
      throw new Error("Missing the native AudioContext constructor.");
    let h;
    try {
      h = new o(c);
    } catch (g) {
      throw g.code === 12 && g.message === "sampleRate is not in range" ? n() : g;
    }
    if (h === null)
      throw r();
    if (!QE(c.latencyHint))
      throw new TypeError(`The provided value '${c.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);
    if (c.sampleRate !== void 0 && h.sampleRate !== c.sampleRate)
      throw n();
    super(h, 2);
    const { latencyHint: d } = c, { sampleRate: p } = h;
    if (this._baseLatency = typeof h.baseLatency == "number" ? h.baseLatency : d === "balanced" ? 512 / p : d === "interactive" || d === void 0 ? 256 / p : d === "playback" ? 1024 / p : (
      /*
       * @todo The min (256) and max (16384) values are taken from the allowed bufferSize values of a
       * ScriptProcessorNode.
       */
      Math.max(2, Math.min(128, Math.round(d * p / 128))) * 128 / p
    ), this._nativeAudioContext = h, o.name === "webkitAudioContext" ? (this._nativeGainNode = h.createGain(), this._nativeOscillatorNode = h.createOscillator(), this._nativeGainNode.gain.value = 1e-37, this._nativeOscillatorNode.connect(this._nativeGainNode).connect(h.destination), this._nativeOscillatorNode.start()) : (this._nativeGainNode = null, this._nativeOscillatorNode = null), this._state = null, h.state === "running") {
      this._state = "suspended";
      const g = () => {
        this._state === "suspended" && (this._state = null), h.removeEventListener("statechange", g);
      };
      h.addEventListener("statechange", g);
    }
  }
  get baseLatency() {
    return this._baseLatency;
  }
  get state() {
    return this._state !== null ? this._state : this._nativeAudioContext.state;
  }
  close() {
    return this.state === "closed" ? this._nativeAudioContext.close().then(() => {
      throw t();
    }) : (this._state === "suspended" && (this._state = null), this._nativeAudioContext.close().then(() => {
      this._nativeGainNode !== null && this._nativeOscillatorNode !== null && (this._nativeOscillatorNode.stop(), this._nativeGainNode.disconnect(), this._nativeOscillatorNode.disconnect()), KE(this);
    }));
  }
  resume() {
    return this._state === "suspended" ? new Promise((c, h) => {
      const d = () => {
        this._nativeAudioContext.removeEventListener("statechange", d), this._nativeAudioContext.state === "running" ? c() : this.resume().then(c, h);
      };
      this._nativeAudioContext.addEventListener("statechange", d);
    }) : this._nativeAudioContext.resume().catch((c) => {
      throw c === void 0 || c.code === 15 ? t() : c;
    });
  }
  suspend() {
    return this._nativeAudioContext.suspend().catch((c) => {
      throw c === void 0 ? t() : c;
    });
  }
}, Z8 = (t, n, r, i, o, u) => class extends r {
  constructor(h, d) {
    super(h), this._nativeContext = h, O2.set(this, h), i(h) && o.set(h, /* @__PURE__ */ new Set()), this._destination = new t(this, d), this._listener = n(this, h), this._onstatechange = null;
  }
  get currentTime() {
    return this._nativeContext.currentTime;
  }
  get destination() {
    return this._destination;
  }
  get listener() {
    return this._listener;
  }
  get onstatechange() {
    return this._onstatechange;
  }
  set onstatechange(h) {
    const d = typeof h == "function" ? u(this, h) : null;
    this._nativeContext.onstatechange = d;
    const p = this._nativeContext.onstatechange;
    this._onstatechange = p !== null && p === d ? h : p;
  }
  get sampleRate() {
    return this._nativeContext.sampleRate;
  }
  get state() {
    return this._nativeContext.state;
  }
}, Sv = (t) => {
  const n = new Uint32Array([1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 4, 0]);
  try {
    const r = t.decodeAudioData(n.buffer, () => {
    });
    return r === void 0 ? !1 : (r.catch(() => {
    }), !0);
  } catch {
  }
  return !1;
}, W8 = (t, n) => (r, i, o) => {
  const u = /* @__PURE__ */ new Set();
  return r.connect = /* @__PURE__ */ ((c) => (h, d = 0, p = 0) => {
    const g = u.size === 0;
    if (n(h))
      return c.call(r, h, d, p), t(u, [h, d, p], (y) => y[0] === h && y[1] === d && y[2] === p, !0), g && i(), h;
    c.call(r, h, d), t(u, [h, d], (y) => y[0] === h && y[1] === d, !0), g && i();
  })(r.connect), r.disconnect = /* @__PURE__ */ ((c) => (h, d, p) => {
    const g = u.size > 0;
    if (h === void 0)
      c.apply(r), u.clear();
    else if (typeof h == "number") {
      c.call(r, h);
      for (const v of u)
        v[1] === h && u.delete(v);
    } else {
      n(h) ? c.call(r, h, d, p) : c.call(r, h, d);
      for (const v of u)
        v[0] === h && (d === void 0 || v[1] === d) && (p === void 0 || v[2] === p) && u.delete(v);
    }
    const y = u.size === 0;
    g && y && o();
  })(r.disconnect), r;
}, hr = (t, n, r) => {
  const i = n[r];
  i !== void 0 && i !== t[r] && (t[r] = i);
}, fo = (t, n) => {
  hr(t, n, "channelCount"), hr(t, n, "channelCountMode"), hr(t, n, "channelInterpretation");
}, K8 = (t) => t === null ? null : t.hasOwnProperty("AudioBuffer") ? t.AudioBuffer : null, y0 = (t, n, r) => {
  const i = n[r];
  i !== void 0 && i !== t[r].value && (t[r].value = i);
}, Q8 = (t) => {
  t.start = /* @__PURE__ */ ((n) => {
    let r = !1;
    return (i = 0, o = 0, u) => {
      if (r)
        throw Sn();
      n.call(t, i, o, u), r = !0;
    };
  })(t.start);
}, I2 = (t) => {
  t.start = /* @__PURE__ */ ((n) => (r = 0, i = 0, o) => {
    if (typeof o == "number" && o < 0 || i < 0 || r < 0)
      throw new RangeError("The parameters can't be negative.");
    n.call(t, r, i, o);
  })(t.start);
}, Z2 = (t) => {
  t.stop = /* @__PURE__ */ ((n) => (r = 0) => {
    if (r < 0)
      throw new RangeError("The parameter can't be negative.");
    n.call(t, r);
  })(t.stop);
}, F8 = (t, n, r, i, o, u, c, h, d, p, g) => (y, v) => {
  const w = y.createBufferSource();
  return fo(w, v), y0(w, v, "playbackRate"), hr(w, v, "buffer"), hr(w, v, "loop"), hr(w, v, "loopEnd"), hr(w, v, "loopStart"), n(r, () => r(y)) || Q8(w), n(i, () => i(y)) || d(w), n(o, () => o(y)) || p(w, y), n(u, () => u(y)) || I2(w), n(c, () => c(y)) || g(w, y), n(h, () => h(y)) || Z2(w), t(y, w), w;
}, $8 = (t) => t === null ? null : t.hasOwnProperty("AudioContext") ? t.AudioContext : t.hasOwnProperty("webkitAudioContext") ? t.webkitAudioContext : null, J8 = (t, n) => (r, i, o) => {
  const u = r.destination;
  if (u.channelCount !== i)
    try {
      u.channelCount = i;
    } catch {
    }
  o && u.channelCountMode !== "explicit" && (u.channelCountMode = "explicit"), u.maxChannelCount === 0 && Object.defineProperty(u, "maxChannelCount", {
    value: i
  });
  const c = t(r, {
    channelCount: i,
    channelCountMode: u.channelCountMode,
    channelInterpretation: u.channelInterpretation,
    gain: 1
  });
  return n(c, "channelCount", (h) => () => h.call(c), (h) => (d) => {
    h.call(c, d);
    try {
      u.channelCount = d;
    } catch (p) {
      if (d > u.maxChannelCount)
        throw p;
    }
  }), n(c, "channelCountMode", (h) => () => h.call(c), (h) => (d) => {
    h.call(c, d), u.channelCountMode = d;
  }), n(c, "channelInterpretation", (h) => () => h.call(c), (h) => (d) => {
    h.call(c, d), u.channelInterpretation = d;
  }), Object.defineProperty(c, "maxChannelCount", {
    get: () => u.maxChannelCount
  }), c.connect(u), c;
}, eC = (t) => t === null ? null : t.hasOwnProperty("AudioWorkletNode") ? t.AudioWorkletNode : null, tC = (t) => {
  const { port1: n } = new MessageChannel();
  try {
    n.postMessage(t);
  } finally {
    n.close();
  }
}, nC = (t, n, r, i, o) => (u, c, h, d, p, g) => {
  if (h !== null)
    try {
      const y = new h(u, d, g), v = /* @__PURE__ */ new Map();
      let w = null;
      if (Object.defineProperties(y, {
        /*
         * Bug #61: Overwriting the property accessors for channelCount and channelCountMode is necessary as long as some
         * browsers have no native implementation to achieve a consistent behavior.
         */
        channelCount: {
          get: () => g.channelCount,
          set: () => {
            throw t();
          }
        },
        channelCountMode: {
          get: () => "explicit",
          set: () => {
            throw t();
          }
        },
        // Bug #156: Chrome and Edge do not yet fire an ErrorEvent.
        onprocessorerror: {
          get: () => w,
          set: (x) => {
            typeof w == "function" && y.removeEventListener("processorerror", w), w = typeof x == "function" ? x : null, typeof w == "function" && y.addEventListener("processorerror", w);
          }
        }
      }), y.addEventListener = /* @__PURE__ */ ((x) => (...S) => {
        if (S[0] === "processorerror") {
          const T = typeof S[1] == "function" ? S[1] : typeof S[1] == "object" && S[1] !== null && typeof S[1].handleEvent == "function" ? S[1].handleEvent : null;
          if (T !== null) {
            const E = v.get(S[1]);
            E !== void 0 ? S[1] = E : (S[1] = (N) => {
              N.type === "error" ? (Object.defineProperties(N, {
                type: { value: "processorerror" }
              }), T(N)) : T(new ErrorEvent(S[0], { ...N }));
            }, v.set(T, S[1]));
          }
        }
        return x.call(y, "error", S[1], S[2]), x.call(y, ...S);
      })(y.addEventListener), y.removeEventListener = /* @__PURE__ */ ((x) => (...S) => {
        if (S[0] === "processorerror") {
          const T = v.get(S[1]);
          T !== void 0 && (v.delete(S[1]), S[1] = T);
        }
        return x.call(y, "error", S[1], S[2]), x.call(y, S[0], S[1], S[2]);
      })(y.removeEventListener), g.numberOfOutputs !== 0) {
        const x = r(u, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
          gain: 0
        });
        return y.connect(x).connect(u.destination), o(y, () => x.disconnect(), () => x.connect(u.destination));
      }
      return y;
    } catch (y) {
      throw y.code === 11 ? i() : y;
    }
  if (p === void 0)
    throw i();
  return tC(g), n(u, c, p, g);
}, aC = (t, n) => t === null ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(t * n))))), rC = (t) => new Promise((n, r) => {
  const { port1: i, port2: o } = new MessageChannel();
  i.onmessage = ({ data: u }) => {
    i.close(), o.close(), n(u);
  }, i.onmessageerror = ({ data: u }) => {
    i.close(), o.close(), r(u);
  }, o.postMessage(t);
}), iC = async (t, n) => {
  const r = await rC(n);
  return new t(r);
}, sC = (t, n, r, i) => {
  let o = hh.get(t);
  o === void 0 && (o = /* @__PURE__ */ new WeakMap(), hh.set(t, o));
  const u = iC(r, i);
  return o.set(n, u), u;
}, oC = (t, n, r, i, o, u, c, h, d, p, g, y, v) => (w, x, S, T) => {
  if (T.numberOfInputs === 0 && T.numberOfOutputs === 0)
    throw d();
  const E = Array.isArray(T.outputChannelCount) ? T.outputChannelCount : Array.from(T.outputChannelCount);
  if (E.some((re) => re < 1))
    throw d();
  if (E.length !== T.numberOfOutputs)
    throw n();
  if (T.channelCountMode !== "explicit")
    throw d();
  const N = T.channelCount * T.numberOfInputs, C = E.reduce((re, ge) => re + ge, 0), X = S.parameterDescriptors === void 0 ? 0 : S.parameterDescriptors.length;
  if (N + X > 6 || C > 6)
    throw d();
  const D = new MessageChannel(), U = [], P = [];
  for (let re = 0; re < T.numberOfInputs; re += 1)
    U.push(c(w, {
      channelCount: T.channelCount,
      channelCountMode: T.channelCountMode,
      channelInterpretation: T.channelInterpretation,
      gain: 1
    })), P.push(o(w, {
      channelCount: T.channelCount,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      numberOfOutputs: T.channelCount
    }));
  const _ = [];
  if (S.parameterDescriptors !== void 0)
    for (const { defaultValue: re, maxValue: ge, minValue: Ce, name: qe } of S.parameterDescriptors) {
      const ke = u(w, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        offset: T.parameterData[qe] !== void 0 ? T.parameterData[qe] : re === void 0 ? 0 : re
      });
      Object.defineProperties(ke.offset, {
        defaultValue: {
          get: () => re === void 0 ? 0 : re
        },
        maxValue: {
          get: () => ge === void 0 ? p0 : ge
        },
        minValue: {
          get: () => Ce === void 0 ? Su : Ce
        }
      }), _.push(ke);
    }
  const F = i(w, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    numberOfInputs: Math.max(1, N + X)
  }), ae = aC(x, w.sampleRate), ee = h(
    w,
    ae,
    N + X,
    // Bug #87: Only Firefox will fire an AudioProcessingEvent if there is no connected output.
    Math.max(1, C)
  ), ne = o(w, {
    channelCount: Math.max(1, C),
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    numberOfOutputs: Math.max(1, C)
  }), he = [];
  for (let re = 0; re < T.numberOfOutputs; re += 1)
    he.push(i(w, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
      numberOfInputs: E[re]
    }));
  for (let re = 0; re < T.numberOfInputs; re += 1) {
    U[re].connect(P[re]);
    for (let ge = 0; ge < T.channelCount; ge += 1)
      P[re].connect(F, ge, re * T.channelCount + ge);
  }
  const ce = new Y2(S.parameterDescriptors === void 0 ? [] : S.parameterDescriptors.map(({ name: re }, ge) => {
    const Ce = _[ge];
    return Ce.connect(F, 0, N + ge), Ce.start(0), [re, Ce.offset];
  }));
  F.connect(ee);
  let se = T.channelInterpretation, k = null;
  const O = T.numberOfOutputs === 0 ? [ee] : he, z = {
    get bufferSize() {
      return ae;
    },
    get channelCount() {
      return T.channelCount;
    },
    set channelCount(re) {
      throw r();
    },
    get channelCountMode() {
      return T.channelCountMode;
    },
    set channelCountMode(re) {
      throw r();
    },
    get channelInterpretation() {
      return se;
    },
    set channelInterpretation(re) {
      for (const ge of U)
        ge.channelInterpretation = re;
      se = re;
    },
    get context() {
      return ee.context;
    },
    get inputs() {
      return U;
    },
    get numberOfInputs() {
      return T.numberOfInputs;
    },
    get numberOfOutputs() {
      return T.numberOfOutputs;
    },
    get onprocessorerror() {
      return k;
    },
    set onprocessorerror(re) {
      typeof k == "function" && z.removeEventListener("processorerror", k), k = typeof re == "function" ? re : null, typeof k == "function" && z.addEventListener("processorerror", k);
    },
    get parameters() {
      return ce;
    },
    get port() {
      return D.port2;
    },
    addEventListener(...re) {
      return ee.addEventListener(re[0], re[1], re[2]);
    },
    connect: t.bind(null, O),
    disconnect: p.bind(null, O),
    dispatchEvent(...re) {
      return ee.dispatchEvent(re[0]);
    },
    removeEventListener(...re) {
      return ee.removeEventListener(re[0], re[1], re[2]);
    }
  }, q = /* @__PURE__ */ new Map();
  D.port1.addEventListener = /* @__PURE__ */ ((re) => (...ge) => {
    if (ge[0] === "message") {
      const Ce = typeof ge[1] == "function" ? ge[1] : typeof ge[1] == "object" && ge[1] !== null && typeof ge[1].handleEvent == "function" ? ge[1].handleEvent : null;
      if (Ce !== null) {
        const qe = q.get(ge[1]);
        qe !== void 0 ? ge[1] = qe : (ge[1] = (ke) => {
          g(w.currentTime, w.sampleRate, () => Ce(ke));
        }, q.set(Ce, ge[1]));
      }
    }
    return re.call(D.port1, ge[0], ge[1], ge[2]);
  })(D.port1.addEventListener), D.port1.removeEventListener = /* @__PURE__ */ ((re) => (...ge) => {
    if (ge[0] === "message") {
      const Ce = q.get(ge[1]);
      Ce !== void 0 && (q.delete(ge[1]), ge[1] = Ce);
    }
    return re.call(D.port1, ge[0], ge[1], ge[2]);
  })(D.port1.removeEventListener);
  let M = null;
  Object.defineProperty(D.port1, "onmessage", {
    get: () => M,
    set: (re) => {
      typeof M == "function" && D.port1.removeEventListener("message", M), M = typeof re == "function" ? re : null, typeof M == "function" && (D.port1.addEventListener("message", M), D.port1.start());
    }
  }), S.prototype.port = D.port1;
  let B = null;
  sC(w, z, S, T).then((re) => B = re);
  const J = uu(T.numberOfInputs, T.channelCount), te = uu(T.numberOfOutputs, E), pe = S.parameterDescriptors === void 0 ? [] : S.parameterDescriptors.reduce((re, { name: ge }) => ({ ...re, [ge]: new Float32Array(128) }), {});
  let ie = !0;
  const me = () => {
    T.numberOfOutputs > 0 && ee.disconnect(ne);
    for (let re = 0, ge = 0; re < T.numberOfOutputs; re += 1) {
      const Ce = he[re];
      for (let qe = 0; qe < E[re]; qe += 1)
        ne.disconnect(Ce, ge + qe, qe);
      ge += E[re];
    }
  }, Me = /* @__PURE__ */ new Map();
  ee.onaudioprocess = ({ inputBuffer: re, outputBuffer: ge }) => {
    if (B !== null) {
      const Ce = y(z);
      for (let qe = 0; qe < ae; qe += 128) {
        for (let ke = 0; ke < T.numberOfInputs; ke += 1)
          for (let Ge = 0; Ge < T.channelCount; Ge += 1)
            lu(re, J[ke], Ge, Ge, qe);
        S.parameterDescriptors !== void 0 && S.parameterDescriptors.forEach(({ name: ke }, Ge) => {
          lu(re, pe, ke, N + Ge, qe);
        });
        for (let ke = 0; ke < T.numberOfInputs; ke += 1)
          for (let Ge = 0; Ge < E[ke]; Ge += 1)
            te[ke][Ge].byteLength === 0 && (te[ke][Ge] = new Float32Array(128));
        try {
          const ke = J.map((vt, Mn) => {
            if (Ce[Mn].size > 0)
              return Me.set(Mn, ae / 128), vt;
            const zi = Me.get(Mn);
            return zi === void 0 ? [] : (vt.every((Du) => Du.every((qa) => qa === 0)) && (zi === 1 ? Me.delete(Mn) : Me.set(Mn, zi - 1)), vt);
          });
          ie = g(w.currentTime + qe / w.sampleRate, w.sampleRate, () => B.process(ke, te, pe));
          for (let vt = 0, Mn = 0; vt < T.numberOfOutputs; vt += 1) {
            for (let ia = 0; ia < E[vt]; ia += 1)
              X2(ge, te[vt], ia, Mn + ia, qe);
            Mn += E[vt];
          }
        } catch (ke) {
          ie = !1, z.dispatchEvent(new ErrorEvent("processorerror", {
            colno: ke.colno,
            filename: ke.filename,
            lineno: ke.lineno,
            message: ke.message
          }));
        }
        if (!ie) {
          for (let ke = 0; ke < T.numberOfInputs; ke += 1) {
            U[ke].disconnect(P[ke]);
            for (let Ge = 0; Ge < T.channelCount; Ge += 1)
              P[qe].disconnect(F, Ge, ke * T.channelCount + Ge);
          }
          if (S.parameterDescriptors !== void 0) {
            const ke = S.parameterDescriptors.length;
            for (let Ge = 0; Ge < ke; Ge += 1) {
              const vt = _[Ge];
              vt.disconnect(F, 0, N + Ge), vt.stop();
            }
          }
          F.disconnect(ee), ee.onaudioprocess = null, We ? me() : dt();
          break;
        }
      }
    }
  };
  let We = !1;
  const yt = c(w, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  }), Tt = () => ee.connect(yt).connect(w.destination), dt = () => {
    ee.disconnect(yt), yt.disconnect();
  }, ra = () => {
    if (ie) {
      dt(), T.numberOfOutputs > 0 && ee.connect(ne);
      for (let re = 0, ge = 0; re < T.numberOfOutputs; re += 1) {
        const Ce = he[re];
        for (let qe = 0; qe < E[re]; qe += 1)
          ne.connect(Ce, ge + qe, qe);
        ge += E[re];
      }
    }
    We = !0;
  }, mn = () => {
    ie && (Tt(), me()), We = !1;
  };
  return Tt(), v(z, ra, mn);
}, lC = (t, n) => (r, i) => {
  const o = r.createChannelMerger(i.numberOfInputs);
  return t !== null && t.name === "webkitAudioContext" && n(r, o), fo(o, i), o;
}, uC = (t) => {
  const n = t.numberOfOutputs;
  Object.defineProperty(t, "channelCount", {
    get: () => n,
    set: (r) => {
      if (r !== n)
        throw Sn();
    }
  }), Object.defineProperty(t, "channelCountMode", {
    get: () => "explicit",
    set: (r) => {
      if (r !== "explicit")
        throw Sn();
    }
  }), Object.defineProperty(t, "channelInterpretation", {
    get: () => "discrete",
    set: (r) => {
      if (r !== "discrete")
        throw Sn();
    }
  });
}, W2 = (t, n) => {
  const r = t.createChannelSplitter(n.numberOfOutputs);
  return fo(r, n), uC(r), r;
}, cC = (t, n, r, i, o) => (u, c) => {
  if (u.createConstantSource === void 0)
    return r(u, c);
  const h = u.createConstantSource();
  return fo(h, c), y0(h, c, "offset"), n(i, () => i(u)) || I2(h), n(o, () => o(u)) || Z2(h), t(u, h), h;
}, K2 = (t, n) => (t.connect = n.connect.bind(n), t.disconnect = n.disconnect.bind(n), t), fC = (t, n, r, i) => (o, { offset: u, ...c }) => {
  const h = o.createBuffer(1, 2, 44100), d = n(o, {
    buffer: null,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    loop: !1,
    loopEnd: 0,
    loopStart: 0,
    playbackRate: 1
  }), p = r(o, { ...c, gain: u }), g = h.getChannelData(0);
  g[0] = 1, g[1] = 1, d.buffer = h, d.loop = !0;
  const y = {
    get bufferSize() {
    },
    get channelCount() {
      return p.channelCount;
    },
    set channelCount(x) {
      p.channelCount = x;
    },
    get channelCountMode() {
      return p.channelCountMode;
    },
    set channelCountMode(x) {
      p.channelCountMode = x;
    },
    get channelInterpretation() {
      return p.channelInterpretation;
    },
    set channelInterpretation(x) {
      p.channelInterpretation = x;
    },
    get context() {
      return p.context;
    },
    get inputs() {
      return [];
    },
    get numberOfInputs() {
      return d.numberOfInputs;
    },
    get numberOfOutputs() {
      return p.numberOfOutputs;
    },
    get offset() {
      return p.gain;
    },
    get onended() {
      return d.onended;
    },
    set onended(x) {
      d.onended = x;
    },
    addEventListener(...x) {
      return d.addEventListener(x[0], x[1], x[2]);
    },
    dispatchEvent(...x) {
      return d.dispatchEvent(x[0]);
    },
    removeEventListener(...x) {
      return d.removeEventListener(x[0], x[1], x[2]);
    },
    start(x = 0) {
      d.start.call(d, x);
    },
    stop(x = 0) {
      d.stop.call(d, x);
    }
  }, v = () => d.connect(p), w = () => d.disconnect(p);
  return t(o, d), i(K2(y, p), v, w);
}, Ba = (t, n) => {
  const r = t.createGain();
  return fo(r, n), y0(r, n, "gain"), r;
}, dC = (t, { mediaStream: n }) => {
  const r = n.getAudioTracks();
  r.sort((u, c) => u.id < c.id ? -1 : u.id > c.id ? 1 : 0);
  const i = r.slice(0, 1), o = t.createMediaStreamSource(new MediaStream(i));
  return Object.defineProperty(o, "mediaStream", { value: n }), o;
}, hC = (t) => t === null ? null : t.hasOwnProperty("OfflineAudioContext") ? t.OfflineAudioContext : t.hasOwnProperty("webkitOfflineAudioContext") ? t.webkitOfflineAudioContext : null, v0 = (t, n, r, i) => t.createScriptProcessor(n, r, i), Ar = () => new DOMException("", "NotSupportedError"), pC = (t, n) => (r, i, o) => (t(i).replay(o), n(i, r, o)), mC = (t, n, r) => async (i, o, u) => {
  const c = t(i);
  await Promise.all(c.activeInputs.map((h, d) => Array.from(h).map(async ([p, g]) => {
    const v = await n(p).render(p, o), w = i.context.destination;
    !r(p) && (i !== w || !r(i)) && v.connect(u, g, d);
  })).reduce((h, d) => [...h, ...d], []));
}, gC = (t, n, r) => async (i, o, u) => {
  const c = n(i);
  await Promise.all(Array.from(c.activeInputs).map(async ([h, d]) => {
    const g = await t(h).render(h, o);
    r(h) || g.connect(u, d);
  }));
}, yC = (t, n, r, i) => (o) => t(Sv, () => Sv(o)) ? Promise.resolve(t(i, i)).then((u) => {
  if (!u) {
    const c = r(o, 512, 0, 1);
    o.oncomplete = () => {
      c.onaudioprocess = null, c.disconnect();
    }, c.onaudioprocess = () => o.currentTime, c.connect(o.destination);
  }
  return o.startRendering();
}) : new Promise((u) => {
  const c = n(o, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  });
  o.oncomplete = (h) => {
    c.disconnect(), u(h.renderedBuffer);
  }, c.connect(o.destination), o.startRendering();
}), vC = (t) => (n, r) => {
  t.set(n, r);
}, bC = (t) => () => {
  if (t === null)
    return !1;
  try {
    new t({ length: 1, sampleRate: 44100 });
  } catch {
    return !1;
  }
  return !0;
}, wC = (t, n) => async () => {
  if (t === null)
    return !0;
  if (n === null)
    return !1;
  const r = new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'], {
    type: "application/javascript; charset=utf-8"
  }), i = new n(1, 128, 44100), o = URL.createObjectURL(r);
  let u = !1, c = !1;
  try {
    await i.audioWorklet.addModule(o);
    const h = new t(i, "a", { numberOfOutputs: 0 }), d = i.createOscillator();
    h.port.onmessage = () => u = !0, h.onprocessorerror = () => c = !0, d.connect(h), d.start(0), await i.startRendering(), await new Promise((p) => setTimeout(p));
  } catch {
  } finally {
    URL.revokeObjectURL(o);
  }
  return u && !c;
}, xC = (t, n) => () => {
  if (n === null)
    return Promise.resolve(!1);
  const r = new n(1, 1, 44100), i = t(r, {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    gain: 0
  });
  return new Promise((o) => {
    r.oncomplete = () => {
      i.disconnect(), o(r.currentTime !== 0);
    }, r.startRendering();
  });
}, SC = () => new DOMException("", "UnknownError"), AC = () => typeof window > "u" ? null : window, TC = (t, n) => (r) => {
  r.copyFromChannel = (i, o, u = 0) => {
    const c = t(u), h = t(o);
    if (h >= r.numberOfChannels)
      throw n();
    const d = r.length, p = r.getChannelData(h), g = i.length;
    for (let y = c < 0 ? -c : 0; y + c < d && y < g; y += 1)
      i[y] = p[y + c];
  }, r.copyToChannel = (i, o, u = 0) => {
    const c = t(u), h = t(o);
    if (h >= r.numberOfChannels)
      throw n();
    const d = r.length, p = r.getChannelData(h), g = i.length;
    for (let y = c < 0 ? -c : 0; y + c < d && y < g; y += 1)
      p[y + c] = i[y];
  };
}, MC = (t) => (n) => {
  n.copyFromChannel = /* @__PURE__ */ ((r) => (i, o, u = 0) => {
    const c = t(u), h = t(o);
    if (c < n.length)
      return r.call(n, i, h, c);
  })(n.copyFromChannel), n.copyToChannel = /* @__PURE__ */ ((r) => (i, o, u = 0) => {
    const c = t(u), h = t(o);
    if (c < n.length)
      return r.call(n, i, h, c);
  })(n.copyToChannel);
}, EC = (t) => (n, r) => {
  const i = r.createBuffer(1, 1, 44100);
  n.buffer === null && (n.buffer = i), t(n, "buffer", (o) => () => {
    const u = o.call(n);
    return u === i ? null : u;
  }, (o) => (u) => o.call(n, u === null ? i : u));
}, CC = (t, n) => (r, i) => {
  i.channelCount = 1, i.channelCountMode = "explicit", Object.defineProperty(i, "channelCount", {
    get: () => 1,
    set: () => {
      throw t();
    }
  }), Object.defineProperty(i, "channelCountMode", {
    get: () => "explicit",
    set: () => {
      throw t();
    }
  });
  const o = r.createBufferSource();
  n(i, () => {
    const h = i.numberOfInputs;
    for (let d = 0; d < h; d += 1)
      o.connect(i, 0, d);
  }, () => o.disconnect(i));
}, _C = (t, n, r) => t.copyFromChannel === void 0 ? t.getChannelData(r)[0] : (t.copyFromChannel(n, r), n[0]), b0 = (t, n, r, i) => {
  let o = t;
  for (; !o.hasOwnProperty(n); )
    o = Object.getPrototypeOf(o);
  const { get: u, set: c } = Object.getOwnPropertyDescriptor(o, n);
  Object.defineProperty(t, n, { get: r(u), set: i(c) });
}, RC = (t) => ({
  ...t,
  outputChannelCount: t.outputChannelCount !== void 0 ? t.outputChannelCount : t.numberOfInputs === 1 && t.numberOfOutputs === 1 ? (
    /*
     * Bug #61: This should be the computedNumberOfChannels, but unfortunately that is almost impossible to fake. That's why
     * the channelCountMode is required to be 'explicit' as long as there is not a native implementation in every browser. That
     * makes sure the computedNumberOfChannels is equivilant to the channelCount which makes it much easier to compute.
     */
    [t.channelCount]
  ) : Array.from({ length: t.numberOfOutputs }, () => 1)
}), Q2 = (t, n, r) => {
  try {
    t.setValueAtTime(n, r);
  } catch (i) {
    if (i.code !== 9)
      throw i;
    Q2(t, n, r + 1e-7);
  }
}, kC = (t) => {
  const n = t.createBufferSource();
  n.start();
  try {
    n.start();
  } catch {
    return !0;
  }
  return !1;
}, NC = (t) => {
  const n = t.createBufferSource(), r = t.createBuffer(1, 1, 44100);
  n.buffer = r;
  try {
    n.start(0, 1);
  } catch {
    return !1;
  }
  return !0;
}, DC = (t) => {
  const n = t.createBufferSource();
  n.start();
  try {
    n.stop();
  } catch {
    return !1;
  }
  return !0;
}, F2 = (t) => {
  const n = t.createOscillator();
  try {
    n.start(-1);
  } catch (r) {
    return r instanceof RangeError;
  }
  return !1;
}, OC = (t) => {
  const n = t.createBuffer(1, 1, 44100), r = t.createBufferSource();
  r.buffer = n, r.start(), r.stop();
  try {
    return r.stop(), !0;
  } catch {
    return !1;
  }
}, $2 = (t) => {
  const n = t.createOscillator();
  try {
    n.stop(-1);
  } catch (r) {
    return r instanceof RangeError;
  }
  return !1;
}, LC = (t) => {
  const { port1: n, port2: r } = new MessageChannel();
  try {
    n.postMessage(t);
  } finally {
    n.close(), r.close();
  }
}, zC = (t) => {
  t.start = /* @__PURE__ */ ((n) => (r = 0, i = 0, o) => {
    const u = t.buffer, c = u === null ? i : Math.min(u.duration, i);
    u !== null && c > u.duration - 0.5 / t.context.sampleRate ? n.call(t, r, 0, 0) : n.call(t, r, c, o);
  })(t.start);
}, BC = (t, n) => {
  const r = n.createGain();
  t.connect(r);
  const i = /* @__PURE__ */ ((o) => () => {
    o.call(t, r), t.removeEventListener("ended", i);
  })(t.disconnect);
  t.addEventListener("ended", i), K2(t, r), t.stop = /* @__PURE__ */ ((o) => {
    let u = !1;
    return (c = 0) => {
      if (u)
        try {
          o.call(t, c);
        } catch {
          r.gain.setValueAtTime(0, c);
        }
      else
        o.call(t, c), u = !0;
    };
  })(t.stop);
}, Au = (t, n) => (r) => {
  const i = { value: t };
  return Object.defineProperties(r, {
    currentTarget: i,
    target: i
  }), typeof n == "function" ? n.call(t, r) : n.handleEvent.call(t, r);
}, VC = _E(Sr), UC = LE(Sr), jC = x8(xu), PC = /* @__PURE__ */ new WeakMap(), HC = D8(PC), Ni = g8(/* @__PURE__ */ new Map(), /* @__PURE__ */ new WeakMap()), Bn = AC(), J2 = N8(Nt), w0 = mC(Nt, J2, br), wr = z8(O2), Di = hC(Bn), na = G8(Di), e5 = /* @__PURE__ */ new WeakMap(), t5 = C8(Au), Tu = $8(Bn), qC = P8(Tu), n5 = H8(Bn), GC = q8(Bn), eo = eC(Bn), Mu = l8(RE(R2), OE(VC, UC, gh, jC, yh, Nt, HC, lo, xn, Sr, yr, br, Ql), Ni, j8(fh, yh, Nt, xn, Js, yr), xr, U8, Ar, w8(gh, fh, Nt, xn, Js, wr, yr, na), T8(e5, Nt, An), t5, wr, qC, n5, GC, na, eo), YC = /* @__PURE__ */ new WeakSet(), Av = K8(Bn), a5 = b8(new Uint32Array(1)), XC = TC(a5, xr), IC = MC(a5), ZC = jE(YC, Ni, Ar, Av, Di, bC(Av), XC, IC), x0 = zE(Ba), r5 = gC(J2, uo, br), i5 = y8(r5), Eu = F8(x0, Ni, kC, NC, DC, F2, OC, $2, zC, EC(b0), BC), s5 = pC(O8(uo), r5), WC = qE(i5, Eu, xn, s5, w0), S0 = u8(kE(N2), e5, D2, c8, Da.createCancelAndHoldAutomationEvent, Da.createCancelScheduledValuesAutomationEvent, Da.createExponentialRampToValueAutomationEvent, Da.createLinearRampToValueAutomationEvent, Da.createSetTargetAutomationEvent, Da.createSetValueAutomationEvent, Da.createSetValueCurveAutomationEvent, Tu, Q2), KC = HE(Mu, WC, S0, Sn, Eu, wr, na, Au), QC = FE(Mu, $E, xr, Sn, J8(Ba, b0), wr, na, w0), Cu = W8(Sr, n5), FC = CC(Sn, Cu), A0 = lC(Tu, FC), $C = fC(x0, Eu, Ba, Cu), T0 = cC(x0, Ni, $C, F2, $2), JC = yC(Ni, Ba, v0, xC(Ba, Di)), e9 = JE(S0, A0, T0, v0, Ar, _C, na, b0), o5 = /* @__PURE__ */ new WeakMap(), t9 = Z8(QC, e9, t5, na, o5, Au), l5 = Y8(Bn), M0 = _8(Bn), u5 = /* @__PURE__ */ new WeakMap(), n9 = B8(u5, Di), Tv = l5 ? DE(
  Ni,
  Ar,
  E8(Bn),
  M0,
  R8(CE),
  wr,
  n9,
  na,
  eo,
  /* @__PURE__ */ new WeakMap(),
  /* @__PURE__ */ new WeakMap(),
  wC(eo, Di),
  // @todo window is guaranteed to be defined because isSecureContext checks that as well.
  Bn
) : void 0, a9 = X8(Mu, dC, wr, na), c5 = V8(o5), r9 = BE(c5), f5 = v8(xr), i9 = S8(c5), d5 = M8(xr), h5 = /* @__PURE__ */ new WeakMap(), s9 = k8(h5, An), o9 = oC(f5, xr, Sn, A0, W2, T0, Ba, v0, Ar, d5, M0, s9, Cu), l9 = nC(Sn, o9, Ba, Ar, Cu), u9 = m8(i5, f5, Eu, A0, W2, T0, Ba, i9, d5, M0, xn, eo, Di, s5, w0, JC), c9 = L8(u5), f9 = vC(h5), Mv = l5 ? d8(r9, Mu, S0, u9, l9, Nt, c9, wr, na, eo, RC, f9, LC, Au) : void 0, d9 = I8(Sn, Ar, SC, t9, Tu), p5 = "Missing AudioWorklet support. Maybe this is not running in a secure context.", h9 = async (t, n, r, i, o) => {
  const { encoderInstanceId: u, port: c } = await A2(o, n.sampleRate);
  if (Mv === void 0)
    throw new Error(p5);
  const h = t === null ? null : new KC(n, { buffer: t }), d = new a9(n, { mediaStream: i }), p = bE(Mv, n, { channelCount: r });
  return { audioBufferSourceNode: h, encoderInstanceId: u, mediaStreamAudioSourceNode: d, port: c, recorderAudioWorkletNode: p };
}, p9 = (t, n, r, i) => (o, u, c) => {
  var h;
  const d = (h = u.getAudioTracks()[0]) === null || h === void 0 ? void 0 : h.getSettings().sampleRate, p = new d9({ latencyHint: "playback", sampleRate: d }), g = MediaRecorder.isTypeSupported("audio/mp4") ? new ZC({ length: 2688, sampleRate: p.sampleRate }) : null, y = [], v = vE((P) => {
    if (Tv === void 0)
      throw new Error(p5);
    return Tv(p, P);
  });
  let w = null, x = null, S = null, T = null, E = !0;
  const N = (P) => {
    o.dispatchEvent(t("dataavailable", { data: new Blob(P, { type: c }) }));
  }, C = async (P, _) => {
    const F = await ru(P, _);
    S === null ? y.push(...F) : (N(F), T = C(P, _));
  }, X = () => (E = !0, p.resume()), D = () => {
    S !== null && (w !== null && (u.removeEventListener("addtrack", w), u.removeEventListener("removetrack", w)), x !== null && clearTimeout(x), S.then(async ({ encoderInstanceId: P, mediaStreamAudioSourceNode: _, recorderAudioWorkletNode: F }) => {
      T !== null && (T.catch(() => {
      }), T = null), await F.stop(), _.disconnect(F);
      const ae = await ru(P, null);
      S === null && await U(), N([...y, ...ae]), y.length = 0, o.dispatchEvent(new Event("stop"));
    }), S = null);
  }, U = () => (E = !1, p.suspend());
  return U(), {
    get mimeType() {
      return c;
    },
    get state() {
      return S === null ? "inactive" : E ? "recording" : "paused";
    },
    pause() {
      if (S === null)
        throw r();
      E && (U(), o.dispatchEvent(new Event("pause")));
    },
    resume() {
      if (S === null)
        throw r();
      E || (X(), o.dispatchEvent(new Event("resume")));
    },
    start(P) {
      var _;
      if (S !== null)
        throw r();
      if (u.getVideoTracks().length > 0)
        throw i();
      o.dispatchEvent(new Event("start"));
      const F = u.getAudioTracks(), ae = F.length === 0 ? 2 : (_ = F[0].getSettings().channelCount) !== null && _ !== void 0 ? _ : 2;
      S = Promise.all([
        X(),
        v.then(() => h9(g, p, ae, u, c))
      ]).then(async ([, { audioBufferSourceNode: ne, encoderInstanceId: he, mediaStreamAudioSourceNode: ce, port: se, recorderAudioWorkletNode: k }]) => (ce.connect(k), ne !== null && (await new Promise((O) => {
        ne.onended = O, ne.connect(k), ne.start();
      }), ne.disconnect(k)), await k.record(se), P !== void 0 && (T = C(he, P)), { encoderInstanceId: he, mediaStreamAudioSourceNode: ce, recorderAudioWorkletNode: k }));
      const ee = u.getTracks();
      w = () => {
        D(), o.dispatchEvent(new ErrorEvent("error", { error: n() }));
      }, u.addEventListener("addtrack", w), u.addEventListener("removetrack", w), x = setInterval(() => {
        const ne = u.getTracks();
        (ne.length !== ee.length || ne.some((he, ce) => he !== ee[ce])) && w !== null && w();
      }, 1e3);
    },
    stop: D
  };
};
var vh = { exports: {} };
(function(t, n) {
  (function(r, i) {
    i(n, M2(), E2(), _2());
  })(wu, function(r, i, o, u) {
    function c(g, y) {
      var v = typeof Symbol < "u" && g[Symbol.iterator] || g["@@iterator"];
      if (!v) {
        if (Array.isArray(g) || (v = h(g)) || y) {
          v && (g = v);
          var w = 0, x = function() {
          };
          return { s: x, n: function() {
            return w >= g.length ? { done: !0 } : { done: !1, value: g[w++] };
          }, e: function(C) {
            throw C;
          }, f: x };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var S, T = !0, E = !1;
      return { s: function() {
        v = v.call(g);
      }, n: function() {
        var C = v.next();
        return T = C.done, C;
      }, e: function(C) {
        E = !0, S = C;
      }, f: function() {
        try {
          T || v.return == null || v.return();
        } finally {
          if (E) throw S;
        }
      } };
    }
    function h(g, y) {
      if (g) {
        if (typeof g == "string") return d(g, y);
        var v = {}.toString.call(g).slice(8, -1);
        return v === "Object" && g.constructor && (v = g.constructor.name), v === "Map" || v === "Set" ? Array.from(g) : v === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v) ? d(g, y) : void 0;
      }
    }
    function d(g, y) {
      (y == null || y > g.length) && (y = g.length);
      for (var v = 0, w = Array(y); v < y; v++) w[v] = g[v];
      return w;
    }
    var p = /* @__PURE__ */ function() {
      function g(y) {
        var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, w = arguments.length > 2 ? arguments[2] : void 0;
        if (o(this, g), v < 0 || w !== void 0 && w < 0)
          throw new RangeError();
        var x = y.reduce(function(F, ae) {
          return F + ae.byteLength;
        }, 0);
        if (v > x || w !== void 0 && v + w > x)
          throw new RangeError();
        var S = [], T = w === void 0 ? x - v : w, E = [], N = 0, C = v, X = c(y), D;
        try {
          for (X.s(); !(D = X.n()).done; ) {
            var U = D.value;
            if (E.length === 0)
              if (U.byteLength > C) {
                N = U.byteLength - C;
                var P = N > T ? T : N;
                S.push(new DataView(U, C, P)), E.push(U);
              } else
                C -= U.byteLength;
            else if (N < T) {
              N += U.byteLength;
              var _ = N > T ? U.byteLength - N + T : U.byteLength;
              S.push(new DataView(U, 0, _)), E.push(U);
            }
          }
        } catch (F) {
          X.e(F);
        } finally {
          X.f();
        }
        this._buffers = E, this._byteLength = T, this._byteOffset = C, this._dataViews = S, this._internalBuffer = new DataView(new ArrayBuffer(8));
      }
      return u(g, [{
        key: "buffers",
        get: function() {
          return this._buffers;
        }
      }, {
        key: "byteLength",
        get: function() {
          return this._byteLength;
        }
      }, {
        key: "byteOffset",
        get: function() {
          return this._byteOffset;
        }
      }, {
        key: "getFloat32",
        value: function(v, w) {
          return this._internalBuffer.setUint8(0, this.getUint8(v + 0)), this._internalBuffer.setUint8(1, this.getUint8(v + 1)), this._internalBuffer.setUint8(2, this.getUint8(v + 2)), this._internalBuffer.setUint8(3, this.getUint8(v + 3)), this._internalBuffer.getFloat32(0, w);
        }
      }, {
        key: "getFloat64",
        value: function(v, w) {
          return this._internalBuffer.setUint8(0, this.getUint8(v + 0)), this._internalBuffer.setUint8(1, this.getUint8(v + 1)), this._internalBuffer.setUint8(2, this.getUint8(v + 2)), this._internalBuffer.setUint8(3, this.getUint8(v + 3)), this._internalBuffer.setUint8(4, this.getUint8(v + 4)), this._internalBuffer.setUint8(5, this.getUint8(v + 5)), this._internalBuffer.setUint8(6, this.getUint8(v + 6)), this._internalBuffer.setUint8(7, this.getUint8(v + 7)), this._internalBuffer.getFloat64(0, w);
        }
      }, {
        key: "getInt16",
        value: function(v, w) {
          return this._internalBuffer.setUint8(0, this.getUint8(v + 0)), this._internalBuffer.setUint8(1, this.getUint8(v + 1)), this._internalBuffer.getInt16(0, w);
        }
      }, {
        key: "getInt32",
        value: function(v, w) {
          return this._internalBuffer.setUint8(0, this.getUint8(v + 0)), this._internalBuffer.setUint8(1, this.getUint8(v + 1)), this._internalBuffer.setUint8(2, this.getUint8(v + 2)), this._internalBuffer.setUint8(3, this.getUint8(v + 3)), this._internalBuffer.getInt32(0, w);
        }
      }, {
        key: "getInt8",
        value: function(v) {
          var w = this._findDataViewWithOffset(v), x = i(w, 2), S = x[0], T = x[1];
          return S.getInt8(v - T);
        }
      }, {
        key: "getUint16",
        value: function(v, w) {
          return this._internalBuffer.setUint8(0, this.getUint8(v + 0)), this._internalBuffer.setUint8(1, this.getUint8(v + 1)), this._internalBuffer.getUint16(0, w);
        }
      }, {
        key: "getUint32",
        value: function(v, w) {
          return this._internalBuffer.setUint8(0, this.getUint8(v + 0)), this._internalBuffer.setUint8(1, this.getUint8(v + 1)), this._internalBuffer.setUint8(2, this.getUint8(v + 2)), this._internalBuffer.setUint8(3, this.getUint8(v + 3)), this._internalBuffer.getUint32(0, w);
        }
      }, {
        key: "getUint8",
        value: function(v) {
          var w = this._findDataViewWithOffset(v), x = i(w, 2), S = x[0], T = x[1];
          return S.getUint8(v - T);
        }
      }, {
        key: "setFloat32",
        value: function(v, w, x) {
          this._internalBuffer.setFloat32(0, w, x), this.setUint8(v, this._internalBuffer.getUint8(0)), this.setUint8(v + 1, this._internalBuffer.getUint8(1)), this.setUint8(v + 2, this._internalBuffer.getUint8(2)), this.setUint8(v + 3, this._internalBuffer.getUint8(3));
        }
      }, {
        key: "setFloat64",
        value: function(v, w, x) {
          this._internalBuffer.setFloat64(0, w, x), this.setUint8(v, this._internalBuffer.getUint8(0)), this.setUint8(v + 1, this._internalBuffer.getUint8(1)), this.setUint8(v + 2, this._internalBuffer.getUint8(2)), this.setUint8(v + 3, this._internalBuffer.getUint8(3)), this.setUint8(v + 4, this._internalBuffer.getUint8(4)), this.setUint8(v + 5, this._internalBuffer.getUint8(5)), this.setUint8(v + 6, this._internalBuffer.getUint8(6)), this.setUint8(v + 7, this._internalBuffer.getUint8(7));
        }
      }, {
        key: "setInt16",
        value: function(v, w, x) {
          this._internalBuffer.setInt16(0, w, x), this.setUint8(v, this._internalBuffer.getUint8(0)), this.setUint8(v + 1, this._internalBuffer.getUint8(1));
        }
      }, {
        key: "setInt32",
        value: function(v, w, x) {
          this._internalBuffer.setInt32(0, w, x), this.setUint8(v, this._internalBuffer.getUint8(0)), this.setUint8(v + 1, this._internalBuffer.getUint8(1)), this.setUint8(v + 2, this._internalBuffer.getUint8(2)), this.setUint8(v + 3, this._internalBuffer.getUint8(3));
        }
      }, {
        key: "setInt8",
        value: function(v, w) {
          var x = this._findDataViewWithOffset(v), S = i(x, 2), T = S[0], E = S[1];
          T.setInt8(v - E, w);
        }
      }, {
        key: "setUint16",
        value: function(v, w, x) {
          this._internalBuffer.setUint16(0, w, x), this.setUint8(v, this._internalBuffer.getUint8(0)), this.setUint8(v + 1, this._internalBuffer.getUint8(1));
        }
      }, {
        key: "setUint32",
        value: function(v, w, x) {
          this._internalBuffer.setUint32(0, w, x), this.setUint8(v, this._internalBuffer.getUint8(0)), this.setUint8(v + 1, this._internalBuffer.getUint8(1)), this.setUint8(v + 2, this._internalBuffer.getUint8(2)), this.setUint8(v + 3, this._internalBuffer.getUint8(3));
        }
      }, {
        key: "setUint8",
        value: function(v, w) {
          var x = this._findDataViewWithOffset(v), S = i(x, 2), T = S[0], E = S[1];
          T.setUint8(v - E, w);
        }
      }, {
        key: "_findDataViewWithOffset",
        value: function(v) {
          var w = 0, x = c(this._dataViews), S;
          try {
            for (x.s(); !(S = x.n()).done; ) {
              var T = S.value, E = w + T.byteLength;
              if (v >= w && v < E)
                return [T, w];
              w = E;
            }
          } catch (N) {
            x.e(N);
          } finally {
            x.f();
          }
          throw new RangeError();
        }
      }]);
    }();
    r.MultiBufferDataView = p;
  });
})(vh, vh.exports);
var Ed = vh.exports;
const m9 = (t, n, r) => (i, o, u, c) => {
  const h = [], d = new o(u, { mimeType: "audio/webm; codecs=pcm" });
  let p = null, g = () => {
  };
  const y = (x) => {
    i.dispatchEvent(t("dataavailable", { data: new Blob(x, { type: c }) }));
  }, v = async (x, S) => {
    const T = await ru(x, S);
    d.state === "inactive" ? h.push(...T) : (y(T), p = v(x, S));
  }, w = () => {
    d.state !== "inactive" && (p !== null && (p.catch(() => {
    }), p = null), g(), g = () => {
    }, d.stop());
  };
  return d.addEventListener("error", (x) => {
    w(), i.dispatchEvent(new ErrorEvent("error", {
      error: x.error
    }));
  }), d.addEventListener("pause", () => i.dispatchEvent(new Event("pause"))), d.addEventListener("resume", () => i.dispatchEvent(new Event("resume"))), d.addEventListener("start", () => i.dispatchEvent(new Event("start"))), {
    get mimeType() {
      return c;
    },
    get state() {
      return d.state;
    },
    pause() {
      return d.pause();
    },
    resume() {
      return d.resume();
    },
    start(x) {
      const [S] = u.getAudioTracks();
      if (S !== void 0 && d.state === "inactive") {
        const { channelCount: T, sampleRate: E } = S.getSettings();
        if (T === void 0)
          throw new Error("The channelCount is not defined.");
        if (E === void 0)
          throw new Error("The sampleRate is not defined.");
        let N = !1, C = !1, X = 0, D = A2(c, E);
        g = () => {
          C = !0;
        };
        const U = T2(d, "dataavailable")(({ data: P }) => {
          X += 1;
          const _ = P.arrayBuffer();
          D = D.then(async ({ dataView: F = null, elementType: ae = null, encoderInstanceId: ee, port: ne }) => {
            const he = await _;
            X -= 1;
            const ce = F === null ? new Ed.MultiBufferDataView([he]) : new Ed.MultiBufferDataView([...F.buffers, he], F.byteOffset);
            if (!N && d.state === "recording" && !C) {
              const q = r(ce, 0);
              if (q === null)
                return { dataView: ce, elementType: ae, encoderInstanceId: ee, port: ne };
              const { value: M } = q;
              if (M !== 172351395)
                return { dataView: F, elementType: ae, encoderInstanceId: ee, port: ne };
              N = !0;
            }
            const { currentElementType: se, offset: k, contents: O } = n(ce, ae, T), z = k < ce.byteLength ? new Ed.MultiBufferDataView(ce.buffers, ce.byteOffset + k) : null;
            return O.forEach((q) => ne.postMessage(q, q.map(({ buffer: M }) => M))), X === 0 && (d.state === "inactive" || C) && (ru(ee, null).then((q) => {
              y([...h, ...q]), h.length = 0, i.dispatchEvent(new Event("stop"));
            }), ne.postMessage([]), ne.close(), U()), { dataView: z, elementType: se, encoderInstanceId: ee, port: ne };
          });
        });
        x !== void 0 && D.then(({ encoderInstanceId: P }) => {
          C || (p = v(P, x));
        });
      }
      d.start(100);
    },
    stop: w
  };
}, g9 = () => typeof window > "u" ? null : window, m5 = (t, n) => {
  if (n >= t.byteLength)
    return null;
  const r = t.getUint8(n);
  if (r > 127)
    return 1;
  if (r > 63)
    return 2;
  if (r > 31)
    return 3;
  if (r > 15)
    return 4;
  if (r > 7)
    return 5;
  if (r > 3)
    return 6;
  if (r > 1)
    return 7;
  if (r > 0)
    return 8;
  const i = m5(t, n + 1);
  return i === null ? null : i + 8;
}, y9 = (t, n) => (r) => {
  const i = { value: t };
  return Object.defineProperties(r, {
    currentTarget: i,
    target: i
  }), typeof n == "function" ? n.call(t, r) : n.handleEvent.call(t, r);
}, g5 = [], E0 = g9(), v9 = tE(E0), y5 = W6(v9), b9 = p9(y5, $6, J6, uh), C0 = sE(m5), w9 = rE(C0), x9 = iE(C0), S9 = K6(w9, x9), A9 = m9(y5, S9, C0), T9 = F6(E0), M9 = nE(E0), Ev = eE(aE(uh), uh, b9, A9, g5, Q6(T9, y9), M9), E9 = /* @__PURE__ */ new WeakMap(), C9 = async (t) => {
  const n = await Z6(t);
  g5.push(n), E9.set(t, n);
}, _9 = x2({
  characterize: ({ call: t }) => () => t("characterize"),
  encode: ({ call: t }) => (n, r) => t("encode", { recordingId: n, timeslice: r }),
  record: ({ call: t }) => async (n, r, i) => {
    await t("record", { recordingId: n, sampleRate: r, typedArrays: i }, i.map(({ buffer: o }) => o));
  }
}), R9 = (t) => {
  const n = new Worker(t);
  return _9(n);
}, k9 = `(()=>{var e={455:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,s=536870912,a=2*s,o=function(e,t){return function(r){var o=t.get(r),i=void 0===o?r.size:o<a?o+1:0;if(!r.has(i))return e(r,i);if(r.size<s){for(;r.has(i);)i=Math.floor(Math.random()*a);return e(r,i)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(i);)i=Math.floor(Math.random()*n);return e(r,i)}},i=new WeakMap,c=r(i),l=o(c,i),u=t(l);e.addUniqueNumber=u,e.generateUniqueNumber=l}(t)}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}(()=>{"use strict";const e=-32603,t=-32602,n=-32601,s=(e,t)=>Object.assign(new Error(e),{status:t}),a=t=>s('The handler of the method called "'.concat(t,'" returned an unexpected result.'),e),o=(t,r)=>async({data:{id:o,method:i,params:c}})=>{const l=r[i];try{if(void 0===l)throw(e=>s('The requested method called "'.concat(e,'" is not supported.'),n))(i);const r=void 0===c?l():l(c);if(void 0===r)throw(t=>s('The handler of the method called "'.concat(t,'" returned no required result.'),e))(i);const u=r instanceof Promise?await r:r;if(null===o){if(void 0!==u.result)throw a(i)}else{if(void 0===u.result)throw a(i);const{result:e,transferables:r=[]}=u;t.postMessage({id:o,result:e},r)}}catch(e){const{message:r,status:n=-32603}=e;t.postMessage({error:{code:n,message:r},id:o})}};var i=r(455);const c=new Map,l=(e,r,n)=>({...r,connect:({port:t})=>{t.start();const n=e(t,r),s=(0,i.generateUniqueNumber)(c);return c.set(s,(()=>{n(),t.close(),c.delete(s)})),{result:s}},disconnect:({portId:e})=>{const r=c.get(e);if(void 0===r)throw(e=>s('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),t))(e);return r(),{result:null}},isSupported:async()=>{if(await new Promise((e=>{const t=new ArrayBuffer(0),{port1:r,port2:n}=new MessageChannel;r.onmessage=({data:t})=>e(null!==t),n.postMessage(t,[t])}))){const e=n();return{result:e instanceof Promise?await e:e}}return{result:!1}}}),u=(e,t,r=()=>!0)=>{const n=l(u,t,r),s=o(e,n);return e.addEventListener("message",s),()=>e.removeEventListener("message",s)},d=e=>e.reduce(((e,t)=>e+t.length),0),h=(e,t)=>{const r=[];let n=0;e:for(;n<t;){const t=e.length;for(let s=0;s<t;s+=1){const t=e[s];void 0===r[s]&&(r[s]=[]);const a=t.shift();if(void 0===a)break e;r[s].push(a),0===s&&(n+=a.length)}}if(n>t){const s=n-t;r.forEach(((t,r)=>{const n=t.pop(),a=n.length-s;t.push(n.subarray(0,a)),e[r].unshift(n.subarray(a))}))}return r},f=new Map,m=(e=>(t,r,n)=>{const s=e.get(t);if(void 0===s){const s={channelDataArrays:n.map((e=>[e])),isComplete:!0,sampleRate:r};return e.set(t,s),s}return s.channelDataArrays.forEach(((e,t)=>e.push(n[t]))),s})(f),p=((e,t)=>(r,n,s,a)=>{const o=s>>3,i="subsequent"===n?0:44,c=r.length,l=e(r[0]),u=new ArrayBuffer(l*c*o+i),d=new DataView(u);return"subsequent"!==n&&t(d,s,c,"complete"===n?l:Number.POSITIVE_INFINITY,a),r.forEach(((e,t)=>{let r=i+t*o;e.forEach((e=>{const t=e.length;for(let n=0;n<t;n+=1){const t=e[n];d.setInt16(r,t<0?32768*Math.max(-1,t):32767*Math.min(1,t),!0),r+=c*o}}))})),[u]})(d,((e,t,r,n,s)=>{const a=t>>3,o=Math.min(n*r*a,4294967251);e.setUint32(0,1380533830),e.setUint32(4,o+36,!0),e.setUint32(8,1463899717),e.setUint32(12,1718449184),e.setUint32(16,16,!0),e.setUint16(20,1,!0),e.setUint16(22,r,!0),e.setUint32(24,s,!0),e.setUint32(28,s*r*a,!0),e.setUint16(32,r*a,!0),e.setUint16(34,t,!0),e.setUint32(36,1684108385),e.setUint32(40,o,!0)})),v=new Map;u(self,{characterize:()=>({result:/^audio\\/wav$/}),encode:({recordingId:e,timeslice:t})=>{const r=v.get(e);void 0!==r&&(v.delete(e),r.reject(new Error("Another request was made to initiate an encoding.")));const n=f.get(e);if(null!==t){if(void 0===n||d(n.channelDataArrays[0])*(1e3/n.sampleRate)<t)return new Promise(((r,n)=>{v.set(e,{reject:n,resolve:r,timeslice:t})}));const r=h(n.channelDataArrays,Math.ceil(t*(n.sampleRate/1e3))),s=p(r,n.isComplete?"initial":"subsequent",16,n.sampleRate);return n.isComplete=!1,{result:s,transferables:s}}if(void 0!==n){const t=p(n.channelDataArrays,n.isComplete?"complete":"subsequent",16,n.sampleRate);return f.delete(e),{result:t,transferables:t}}return{result:[],transferables:[]}},record:({recordingId:e,sampleRate:t,typedArrays:r})=>{const n=m(e,t,r),s=v.get(e);if(void 0!==s&&d(n.channelDataArrays[0])*(1e3/t)>=s.timeslice){const r=h(n.channelDataArrays,Math.ceil(s.timeslice*(t/1e3))),a=p(r,n.isComplete?"initial":"subsequent",16,t);n.isComplete=!1,v.delete(e),s.resolve({result:a,transferables:a})}return{result:null}}})})()})();`, N9 = new Blob([k9], { type: "application/javascript; charset=utf-8" }), v5 = URL.createObjectURL(N9), D9 = R9(v5), O9 = D9.connect;
URL.revokeObjectURL(v5);
const L9 = async (t) => await new Promise((n) => {
  const r = new FileReader();
  r.onloadend = () => {
    var i;
    n(((i = r.result) === null || i === void 0 ? void 0 : i.toString().split(",")[1]) || null);
  }, r.readAsDataURL(t);
});
class z9 {
  constructor({ trackConstraints: n = { echoCancellation: !0 }, timeSlice: r = 10, onData: i, onStateChange: o = () => {
  }, onError: u = (c) => console.error("[AudioRecorder]", c) }) {
    this.recorder = null, this.stream = null, this.config = {
      trackConstraints: n,
      timeSlice: r,
      onData: i,
      onStateChange: o,
      onError: u
    };
  }
  /**
   * Initialize the WAV encoder and start recording
   */
  async start() {
    var n;
    try {
      Ev.isTypeSupported("audio/wav") || (console.log("[AudioRecorder] Registering WAV encoder"), await C9(await O9())), this.stream = await navigator.mediaDevices.getUserMedia({
        audio: this.config.trackConstraints
      });
      const r = (n = this.stream) === null || n === void 0 ? void 0 : n.getAudioTracks()[0].getSettings();
      console.log("[AudioRecorder] Mic settings:", r), this.recorder = new Ev(this.stream, {
        mimeType: "audio/wav"
      }), this.recorder.ondataavailable = this.handleDataAvailable.bind(this), this.recorder.onstop = this.handleStop.bind(this), this.recorder.onerror = (i) => this.config.onError(new Error(i.error.message)), this.recorder.addEventListener("statechange", () => {
        var i, o;
        return this.config.onStateChange((o = (i = this.recorder) === null || i === void 0 ? void 0 : i.state) !== null && o !== void 0 ? o : "inactive");
      }), this.recorder.start(this.config.timeSlice), console.log("[AudioRecorder] Started recording");
    } catch (r) {
      throw this.config.onError(r instanceof Error ? r : new Error("Failed to start recording")), r;
    }
  }
  /**
   * Stop recording and cleanup resources
   */
  stop() {
    if (this.recorder)
      try {
        this.recorder.state === "recording" && this.recorder.stop(), this.cleanup(), console.log("[AudioRecorder] Stopped recording");
      } catch (n) {
        this.config.onError(n instanceof Error ? n : new Error("Failed to stop recording"));
      }
  }
  /**
   * Get current recording state
   */
  getState() {
    var n, r;
    return (r = (n = this.recorder) === null || n === void 0 ? void 0 : n.state) !== null && r !== void 0 ? r : "inactive";
  }
  /**
   * Check if currently recording
   */
  isRecording() {
    var n;
    return ((n = this.recorder) === null || n === void 0 ? void 0 : n.state) === "recording";
  }
  async handleDataAvailable(n) {
    if (n.data.size)
      try {
        const r = await L9(n.data);
        r && this.config.onData(r);
      } catch (r) {
        this.config.onError(r instanceof Error ? r : new Error("Failed to convert audio data"));
      }
  }
  handleStop() {
    this.cleanup();
  }
  cleanup() {
    var n;
    (n = this.stream) === null || n === void 0 || n.getTracks().forEach((r) => r.stop()), this.stream = null, this.recorder && (this.recorder.onstop = null, this.recorder.ondataavailable = null, this.recorder.onerror = null, this.recorder.removeEventListener("dataavailable", this.handleDataAvailable.bind(this)), this.recorder.removeEventListener("stop", this.handleStop.bind(this)), this.recorder.removeEventListener("error", () => {
    }), this.recorder.removeEventListener("statechange", () => {
    }), this.recorder = null);
  }
}
var b5 = { exports: {} };
(function(t, n) {
  (function(r, i) {
    t.exports = i();
  })(wu, function() {
    class r {
      constructor(o) {
        this.init(o);
      }
      init(o) {
        const u = {
          inputCodec: "Int16",
          // 传入的数据是采用多少位编码，默认16位
          channels: 1,
          // 声道数
          sampleRate: 8e3,
          // 采样率 单位Hz
          flushTime: 1e3,
          // 缓存时间 单位 ms
          fftSize: 2048
          // analyserNode fftSize 
        };
        this.option = Object.assign({}, u, o), this.samples = new Float32Array(), this.interval = setInterval(this.flush.bind(this), this.option.flushTime), this.convertValue = this.getConvertValue(), this.typedArray = this.getTypedArray(), this.initAudioContext(), this.bindAudioContextEvent();
      }
      getConvertValue() {
        const o = {
          Int8: 128,
          Int16: 32768,
          Int32: 2147483648,
          Float32: 1
        };
        if (!o[this.option.inputCodec]) throw new Error("wrong codec.please input one of these codecs:Int8,Int16,Int32,Float32");
        return o[this.option.inputCodec];
      }
      getTypedArray() {
        const o = {
          Int8: Int8Array,
          Int16: Int16Array,
          Int32: Int32Array,
          Float32: Float32Array
        };
        if (!o[this.option.inputCodec]) throw new Error("wrong codec.please input one of these codecs:Int8,Int16,Int32,Float32");
        return o[this.option.inputCodec];
      }
      initAudioContext() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(), this.gainNode = this.audioCtx.createGain(), this.gainNode.gain.value = 0.1, this.gainNode.connect(this.audioCtx.destination), this.startTime = this.audioCtx.currentTime, this.analyserNode = this.audioCtx.createAnalyser(), this.analyserNode.fftSize = this.option.fftSize;
      }
      static isTypedArray(o) {
        return o.byteLength && o.buffer && o.buffer.constructor == ArrayBuffer || o.constructor == ArrayBuffer;
      }
      isSupported(o) {
        if (!r.isTypedArray(o)) throw new Error("请传入ArrayBuffer或者任意TypedArray");
        return !0;
      }
      feed(o) {
        this.isSupported(o), o = this.getFormattedValue(o);
        const u = new Float32Array(this.samples.length + o.length);
        u.set(this.samples, 0), u.set(o, this.samples.length), this.samples = u;
      }
      getFormattedValue(o) {
        o.constructor == ArrayBuffer ? o = new this.typedArray(o) : o = new this.typedArray(o.buffer);
        let u = new Float32Array(o.length);
        for (let c = 0; c < o.length; c++)
          u[c] = o[c] / this.convertValue;
        return u;
      }
      volume(o) {
        this.gainNode.gain.value = o;
      }
      destroy() {
        this.interval && clearInterval(this.interval), this.samples = null, this.audioCtx.close(), this.audioCtx = null;
      }
      flush() {
        if (!this.samples.length) return;
        const o = this;
        var u = this.audioCtx.createBufferSource();
        typeof this.option.onended == "function" && (u.onended = function(d) {
          o.option.onended(this, d);
        });
        const c = this.samples.length / this.option.channels, h = this.audioCtx.createBuffer(this.option.channels, c, this.option.sampleRate);
        for (let d = 0; d < this.option.channels; d++) {
          const p = h.getChannelData(d);
          let g = d, y = 50;
          for (let v = 0; v < c; v++)
            p[v] = this.samples[g], v < 50 && (p[v] = p[v] * v / 50), v >= c - 51 && (p[v] = p[v] * y-- / 50), g += this.option.channels;
        }
        this.startTime < this.audioCtx.currentTime && (this.startTime = this.audioCtx.currentTime), u.buffer = h, u.connect(this.gainNode), u.connect(this.analyserNode), u.start(this.startTime), this.startTime += h.duration, this.samples = new Float32Array();
      }
      async pause() {
        await this.audioCtx.suspend();
      }
      async continue() {
        await this.audioCtx.resume();
      }
      bindAudioContextEvent() {
        const o = this;
        typeof o.option.onstatechange == "function" && (this.audioCtx.onstatechange = function(u) {
          o.audioCtx && o.option.onstatechange(this, u, o.audioCtx.state);
        });
      }
    }
    return r;
  });
})(b5);
var B9 = b5.exports, V9 = /* @__PURE__ */ j6(B9), U9 = G9, dn = [], j9 = typeof Uint8Array < "u" ? Uint8Array : Array, Cv = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var zl = 0, P9 = Cv.length; zl < P9; ++zl)
  dn[Cv.charCodeAt(zl)] = zl;
dn[45] = 62;
dn[95] = 63;
function H9(t) {
  var n = t.length;
  if (n % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = n);
  var i = r === n ? 0 : 4 - r % 4;
  return [r, i];
}
function q9(t, n, r) {
  return (n + r) * 3 / 4 - r;
}
function G9(t) {
  var n, r = H9(t), i = r[0], o = r[1], u = new j9(q9(t, i, o)), c = 0, h = o > 0 ? i - 4 : i, d;
  for (d = 0; d < h; d += 4)
    n = dn[t.charCodeAt(d)] << 18 | dn[t.charCodeAt(d + 1)] << 12 | dn[t.charCodeAt(d + 2)] << 6 | dn[t.charCodeAt(d + 3)], u[c++] = n >> 16 & 255, u[c++] = n >> 8 & 255, u[c++] = n & 255;
  return o === 2 && (n = dn[t.charCodeAt(d)] << 2 | dn[t.charCodeAt(d + 1)] >> 4, u[c++] = n & 255), o === 1 && (n = dn[t.charCodeAt(d)] << 10 | dn[t.charCodeAt(d + 1)] << 4 | dn[t.charCodeAt(d + 2)] >> 2, u[c++] = n >> 8 & 255, u[c++] = n & 255), u;
}
class Y9 extends V6 {
  constructor(n, r = {}) {
    super(), this.log = {
      log: console.log.bind(console),
      info: console.info.bind(console),
      debug: console.debug.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }, this.state = wn.Idle, this.ws = null, this.roomState = null, this.currentNodeId = null, this.recorder = null, this.player = null, this.audioDeafened = !1, this.micMuted = !1, this.retryPolicy = { maxRetries: 3, backoffMs: 1e3 }, this.retryCount = 0, this.reconnectTimer = null, this.roomPollTimer = null, this.handleMessage = (i) => {
      try {
        const o = i.data, u = JSON.parse(o);
        switch (this.emit("message", u), u.type) {
          case "ready": {
            this.emit("ready"), this.lastOverrides && this.config.debug && console.warn("⚠️ Assistant overrides not supported by current backend");
            break;
          }
          case "speech-start": {
            this.emit("speechStart");
            break;
          }
          case "speech-end": {
            this.emit("speechEnd");
            break;
          }
          case "call-end": {
            this.config.debug && console.log("Message call-end received from server"), this.emit("closed", 1e3, "server-end"), this.stop();
            break;
          }
          case "error": {
            this.emit("error", new Error(u == null ? void 0 : u.message));
            break;
          }
          case "transcript": {
            this.emit("transcript", u);
            break;
          }
          case "audio": {
            if (this.player && !this.audioDeafened)
              try {
                const c = u.data, h = U9(c), d = new Int16Array(h.buffer);
                this.player.volume(1), this.player.feed(d);
              } catch (c) {
                this.config.debug && console.error("[Audial] Error processing audio data:", c), this.emit("error", new Error("Failed to process audio data"));
              }
            break;
          }
          case "node-update": {
            this.config.debug && console.log("[Audial] Node update:", u.node_id), this.currentNodeId = u.node_id, this.emit("node-update", this.currentNodeId), this.emit("node-update", this.currentNodeId);
            break;
          }
        }
      } catch (o) {
        this.config.debug && console.error("❌ Error parsing message:", o), this.emit("error", o instanceof Error ? o : new Error(String(o)));
      }
    }, this.publicKey = n, this.config = {
      baseUrl: this.getBaseUrl(),
      debug: !1,
      initialMuted: !1,
      autoReconnect: !0,
      maxRoomPollAttempts: 60,
      roomPollIntervalMs: 2e3,
      ...r
    }, this.config.debug && console.log("🎤 Audial SDK initialized:", {
      publicKey: this.publicKey.substring(0, 10) + "...",
      baseUrl: this.config.baseUrl,
      config: this.config
    }), this.initPlayer(), this.initRecorder();
  }
  start(n, r) {
    var i;
    if (this.state !== wn.Idle)
      throw new Error("Audial: call already active");
    this.currentNodeId = null;
    let o;
    typeof n == "string" ? o = { agentId: n } : o = n, this.state = wn.CreatingRoom, this.retryCount = 0, this.lastCallPayload = o, this.lastOverrides = r, this.config.debug && console.log("🎤 Starting call:", { payload: o, overrides: r }), this.player || this.initPlayer(), this.recorder || this.initRecorder(), (i = this.recorder) === null || i === void 0 || i.start(), this.createRoomAndConnect(o, r);
  }
  /**
   * Stop the current call
   */
  stop(n = 1e3, r = "client-stop") {
    this.config.debug && console.log("🛑 Stopping call:", { code: n, reason: r }), this.reconnectTimer && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.roomPollTimer && (clearTimeout(this.roomPollTimer), this.roomPollTimer = null), this.roomState = null, this.ws ? this.ws.close(n, r) : (this.emit("closed", n, r), this.cleanup());
  }
  /**
   * Send a message to the server
   */
  send(n, r = !0) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.config.debug && console.warn("⚠️ Cannot send message (type: " + n.type + "): WebSocket not connected");
      return;
    }
    if (n.type === "assistant-overrides" || n.type === "set-context" || n.type === "clear-context") {
      this.config.debug && console.warn(`⚠️ Message type '${n.type}' not supported by current backend`);
      return;
    }
    try {
      this.ws.send(JSON.stringify(n)), this.config.debug && r && console.log("📤 Sent message:", n);
    } catch (i) {
      this.config.debug && console.error("❌ Error sending message:", i), this.emit("error", i instanceof Error ? i : new Error(String(i)));
    }
  }
  /** Audio controls */
  deafen() {
    var n;
    this.audioDeafened || ((n = this.player) === null || n === void 0 || n.volume(0), this.audioDeafened = !0, this.emit("audio-deafened", !0));
  }
  undeafen() {
    var n;
    this.audioDeafened && ((n = this.player) === null || n === void 0 || n.volume(1), this.audioDeafened = !1, this.emit("audio-undeafened", !1));
  }
  toggleDeafen() {
    if (!this.player) {
      this.config.debug && console.warn("⚠️ Cannot toggle mute: Player not initialized");
      return;
    }
    this.audioDeafened ? this.undeafen() : this.deafen();
  }
  /**
  * Set volume level (0.0 to 1.0)
  */
  setVolume(n) {
    if (!this.player) {
      this.config.debug && console.warn("⚠️ Cannot set volume: Player not initialized");
      return;
    }
    this.player.volume(n);
  }
  /** Mic controls  */
  muteMic() {
    var n;
    this.micMuted || (this.micMuted = !0, this.emit("mic-muted"), (n = this.recorder) === null || n === void 0 || n.stop());
  }
  async unmuteMic() {
    var n;
    if (this.micMuted) {
      this.micMuted = !1, this.emit("mic-unmuted");
      try {
        await ((n = this.recorder) === null || n === void 0 ? void 0 : n.start());
      } catch (r) {
        this.emit("error", r instanceof Error ? r : new Error(String(r)));
      }
    }
  }
  toggleMicMute() {
    this.micMuted ? this.unmuteMic() : this.muteMic();
  }
  /* ---------- WS handlers ---------- */
  /**
   * Handle WebSocket open events
   */
  handleOpen(n) {
    this.log.debug("[Audial] WS open"), this.state = wn.Active, this.sendTwilioSimulationMessages();
    const r = {
      type: "start",
      input_audio_config: { sampling_rate: 48e3, audio_encoding: "linear16" },
      output_audio_config: {
        sampling_rate: 24e3,
        audio_encoding: "linear16"
      }
      // subscribe_transcript: true,
    };
    this.send(r);
  }
  /**
   * Send Twilio simulation messages to Daily API for Pipecat Cloud compatibility
   * This is a temporary workaround to simulate Twilio's WebSocket messages
   */
  sendTwilioSimulationMessages() {
    var n, r;
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.config.debug && console.warn("⚠️ Cannot send Twilio simulation: WebSocket not connected");
      return;
    }
    try {
      const i = ((n = this.roomState) === null || n === void 0 ? void 0 : n.roomId) || Date.now().toString(), o = (r = this.roomState) === null || r === void 0 ? void 0 : r.connectionParameters;
      if (!o) {
        this.config.debug && console.error("❌ connectionParameters not set - cannot send initialization messages");
        return;
      }
      const u = {
        event: "connected",
        protocol: "Call",
        version: "1.0.0"
      }, c = {
        event: "start",
        sequenceNumber: "1",
        start: {
          accountSid: "AC" + "x".repeat(32),
          streamSid: `MZ${i}`,
          callSid: `CA${i}`,
          tracks: ["inbound", "outbound"],
          mediaFormat: {
            encoding: "audio/x-mulaw",
            sampleRate: 8e3,
            channels: 1
          },
          customParameters: o
        },
        streamSid: `MZ${i}`
      };
      this.send(u), this.send(c), this.config.debug && console.log("📤 Sent Twilio simulation messages:", { connectedMessage: u, startMessage: c });
    } catch (i) {
      this.config.debug && console.error("❌ Error sending Twilio simulation messages:", i);
    }
  }
  /**
  * Create room and connect:
  * 1. Create room via REST API
  * 2. Poll room status until ready
  * 3. Connect to WebSocket URL
  */
  async createRoomAndConnect(n, r) {
    try {
      this.config.debug && console.log("🏠 Creating websocket room...");
      const i = await this.createRoom(n);
      this.roomState = {
        roomId: i.id,
        status: i.status,
        websocketUrl: i.websocketUrl,
        connectionParameters: i.connectionParameters,
        pollAttempts: 0,
        maxPollAttempts: this.config.maxRoomPollAttempts,
        pollIntervalMs: this.config.roomPollIntervalMs
      }, i.status === bi.Ready && i.websocketUrl ? this.connectToWebSocket(i.websocketUrl, r) : (this.state = wn.WaitingForRoom, this.pollRoomStatus());
    } catch (i) {
      this.roomState = null, this.handleConnectionError(i instanceof Error ? i : new Error(String(i)));
    }
  }
  /**
   * Create a websocket room via REST API
   */
  async createRoom(n) {
    const r = `${this.getHttpUrl()}/api/v1/call/websocket/create`, i = new URL(r);
    i.searchParams.set("public_key", this.publicKey), n.agentId && i.searchParams.set("agent_id", n.agentId);
    try {
      const o = await fetch(i.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(n)
      });
      if (!o.ok) {
        let u;
        try {
          u = await o.text() || o.statusText || "Unknown error";
        } catch {
          u = o.statusText || "Failed to read error response";
        }
        throw new Error(`Room creation failed [${o.status}]: ${u}`);
      }
      try {
        return await o.json();
      } catch (u) {
        throw new Error(`Room creation succeeded but response is not valid JSON: ${u instanceof Error ? u.message : "Parse error"}`);
      }
    } catch (o) {
      throw o instanceof Error ? o.message.includes("Room creation failed") ? o : new Error(`Network error during room creation: ${o.message}`) : new Error(`Unexpected error during room creation: ${String(o)}`);
    }
  }
  /**
   * Poll room status until ready or failed
   */
  async pollRoomStatus() {
    var n;
    if (!(!((n = this.roomState) === null || n === void 0) && n.roomId))
      throw new Error("No room ID to poll");
    try {
      const r = await this.getRoomStatus(this.roomState.roomId);
      if (this.roomState.status = r.status, this.roomState.websocketUrl = r.websocketUrl, this.roomState.connectionParameters = r.connectionParameters || this.roomState.connectionParameters, this.roomState.pollAttempts++, this.config.debug && console.log(`🔍 Room status: ${r.status} (attempt ${this.roomState.pollAttempts}/${this.roomState.maxPollAttempts})`), r.status === bi.Ready && r.websocketUrl) {
        this.connectToWebSocket(r.websocketUrl, this.lastOverrides);
        return;
      }
      if (r.status === bi.Failed || r.status === bi.Expired)
        throw new Error(`Room ${r.status}: ${r.id}`);
      if (this.roomState.pollAttempts >= this.roomState.maxPollAttempts)
        throw new Error(`Room polling timeout after ${this.roomState.pollAttempts} attempts`);
      this.roomPollTimer = setTimeout(() => {
        this.pollRoomStatus();
      }, this.roomState.pollIntervalMs);
    } catch (r) {
      this.handlePollError(r instanceof Error ? r : new Error(String(r)));
    }
  }
  /**
   * Handle polling errors - stop polling immediately without retry logic
   */
  handlePollError(n) {
    this.config.debug && console.error("❌ Room polling error:", n.message), this.roomPollTimer && (clearTimeout(this.roomPollTimer), this.roomPollTimer = null), this.roomState = null, this.state = wn.Idle, this.emit("error", n), this.cleanup();
  }
  /**
   * Get room status via REST API
   */
  async getRoomStatus(n) {
    var r;
    const i = `${this.getHttpUrl()}/api/v1/call/websocket/room/${n}`, o = new URL(i);
    o.searchParams.set("public_key", this.publicKey), !((r = this.lastCallPayload) === null || r === void 0) && r.agentId && o.searchParams.set("agent_id", this.lastCallPayload.agentId);
    try {
      const u = await fetch(o.toString(), {
        method: "GET"
      });
      if (!u.ok) {
        let c;
        try {
          c = await u.text() || u.statusText || "Unknown error";
        } catch {
          c = u.statusText || "Failed to read error response";
        }
        throw new Error(`Room status check failed [${u.status}]: ${c}`);
      }
      try {
        return await u.json();
      } catch (c) {
        throw new Error(`Room status check succeeded but response is not valid JSON: ${c instanceof Error ? c.message : "Parse error"}`);
      }
    } catch (u) {
      throw u instanceof Error ? u.message.includes("Room status check failed") ? u : new Error(`Network error during room status check: ${u.message}`) : new Error(`Unexpected error during room status check: ${String(u)}`);
    }
  }
  /**
   * Connect to WebSocket with the provided URL (Step 3)
   */
  connectToWebSocket(n, r) {
    this.config.debug && console.log("🔌 Connecting to WebSocket:", n), this.state = wn.Connecting;
    try {
      this.ws = new WebSocket(n), this.ws.binaryType = "arraybuffer", this.ws.onopen = this.handleOpen.bind(this), this.ws.onmessage = this.handleMessage.bind(this), this.ws.onerror = this.handleError.bind(this), this.ws.onclose = this.handleClose.bind(this);
    } catch (i) {
      this.handleConnectionError(i instanceof Error ? i : new Error(String(i)));
    }
  }
  /**
   * Get HTTP URL from WebSocket base URL
   */
  getHttpUrl() {
    return this.config.baseUrl.startsWith("http") ? this.config.baseUrl : this.config.baseUrl.includes("localhost") ? `http://${this.config.baseUrl}` : `https://${this.config.baseUrl}`;
  }
  initRecorder() {
    return this.recorder = new z9({
      onData: (n) => {
        if (!this.audioDeafened) {
          if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.config.debug && console.warn("⚠️ Cannot send audio: WebSocket not connected");
            return;
          }
          this.send({ type: "audio", data: n }, !1);
        }
      },
      onStateChange: (n) => {
        console.log("[Audial] Recording state:", n), n === "recording" ? this.emit("speech-start") : n === "inactive" && this.emit("speech-end");
      },
      onError: (n) => this.emit("error", n)
    }), this.recorder;
  }
  initPlayer() {
    return this.player = new V9({
      inputCodec: "Int16",
      channels: 1,
      sampleRate: 24e3,
      flushTime: 175,
      fftSize: 1024
    }), this.audioDeafened = this.config.initialMuted, this.player.volume(this.audioDeafened ? 0 : 1), this.player;
  }
  /**
   * Handle connection errors with retry logic
   */
  handleConnectionError(n) {
    if (this.config.debug && console.error("❌ Connection error:", n), this.state = wn.Idle, this.emit("error", n), this.config.autoReconnect && this.retryCount < this.retryPolicy.maxRetries) {
      this.retryCount++;
      const r = this.retryPolicy.backoffMs * Math.pow(2, this.retryCount - 1);
      this.config.debug && console.log(`🔄 Retrying connection in ${r}ms (attempt ${this.retryCount}/${this.retryPolicy.maxRetries})`), this.reconnectTimer = setTimeout(() => {
        this.start(this.lastCallPayload, this.lastOverrides);
      }, r);
    } else
      this.cleanup();
  }
  /**
   * Reconnect to the current call
   */
  reconnect() {
    if (this.lastCallPayload)
      this.config.debug && console.log("🔄 Reconnecting..."), this.stop(), setTimeout(() => {
        this.start(this.lastCallPayload, this.lastOverrides);
      }, 100);
    else
      throw new Error("Audial: no previous call to reconnect to");
  }
  /**
   * Get current connection status
   */
  getConnectionStatus() {
    var n, r;
    const i = {
      connected: ((n = this.ws) === null || n === void 0 ? void 0 : n.readyState) === WebSocket.OPEN || !1,
      state: this.state,
      readyState: ((r = this.ws) === null || r === void 0 ? void 0 : r.readyState) || null,
      retryCount: this.retryCount
    };
    return this.roomState && (i.roomState = this.roomState), i;
  }
  /**
  * Get base URL based on environment
  * Supports Doppler environment variables and fallbacks
  */
  getBaseUrl() {
    if (typeof window < "u" && window.__AUDIAL_CONFIG__)
      return window.__AUDIAL_CONFIG__.baseUrl;
    if (typeof process < "u") {
      const n = U6;
      if (n.AUDIAL_BASE_URL)
        return n.AUDIAL_BASE_URL;
      if (n.NODE_ENV === "production" && n.AUDIAL_PROD_URL)
        return n.AUDIAL_PROD_URL;
      if (n.NODE_ENV === "staging" && n.AUDIAL_STAGING_URL)
        return n.AUDIAL_STAGING_URL;
      if (n.NODE_ENV === "development" && n.AUDIAL_DEV_URL)
        return n.AUDIAL_DEV_URL;
    }
    if (typeof window < "u" && window.location && window.location.hostname) {
      const n = window.location.hostname;
      if (n === "localhost" || n === "127.0.0.1")
        return "localhost:8000";
      if (n.includes("staging"))
        return "lavoz-api-staging.fly.dev";
      if (n.includes("production") || n.includes("audial.co") || n.includes("audial.ai"))
        return "lavoz-api.fly.dev";
    }
    return "lavoz-api.fly.dev";
  }
  /**
   * Handle WebSocket errors
   */
  handleError(n) {
    this.config.debug && console.error("❌ WebSocket error:", n), this.emit("error", new Error("WebSocket error"));
  }
  /**
   * Handle WebSocket close events
   */
  handleClose(n) {
    this.config.debug && console.log("🔌 WebSocket closed:", { code: n.code, reason: n.reason }), this.emit("closed", n.code, n.reason), this.cleanup();
  }
  /* ---------- housekeeping ---------- */
  cleanup() {
    this.reconnectTimer && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.roomPollTimer && (clearTimeout(this.roomPollTimer), this.roomPollTimer = null), this.roomState = null, this.cleanupRecorder(), this.cleanupWebSocket(), this.state = wn.Idle, this.removeAllListeners();
  }
  cleanupRecorder() {
    var n;
    (n = this.recorder) === null || n === void 0 || n.stop(), this.recorder = null, this.player && (this.player.destroy(), this.player = null);
  }
  cleanupWebSocket() {
    if (this.config.debug) {
      if (console.log("[Audial.cleanupWebSocket] Cleaning up WebSocket"), !this.ws)
        return;
      this.ws.onopen = null, this.ws.onmessage = null, this.ws.onerror = null, this.ws.onclose = null, this.ws = null;
    }
  }
}
function X9(t) {
  const { apiKey: n, debug: r = !1, baseUrl: i } = t, o = W.useRef(null), [u, c] = W.useState("idle"), [h, d] = W.useState(!1), [p, g] = W.useState([]), [y, v] = W.useState(), [w, x] = W.useState(!1), [S, T] = W.useState(0), E = W.useRef(null), N = W.useCallback((_) => {
    _ != null && _.text && g((F) => [
      ...F,
      {
        id: (_.timestamp || Date.now()).toString(),
        sender: _.sender === "assistant" ? "agent" : "user",
        content: _.text,
        timestamp: new Date(_.timestamp || Date.now())
      }
    ]);
  }, []), C = W.useCallback(() => {
    const _ = o.current;
    if (!_) return;
    const F = () => {
      r && console.log("[Audial hook] onReady"), c("active"), T(0), E.current && clearInterval(E.current), E.current = setInterval(() => {
        T((k) => k + 1);
      }, 1e3);
    }, ae = (k, O) => {
      r && console.log("[Audial hook] onClose", { code: k, reason: O }), c("closed"), E.current && (clearInterval(E.current), E.current = null);
    }, ee = (k) => {
      console.error("[Audial hook] onError", k), v(k), c("closed"), E.current && (clearInterval(E.current), E.current = null);
    }, ne = (k) => {
      r && console.log("[Audial hook] onTranscript", k), N(k);
    }, he = (k) => {
      r && console.log("[Audial hook] onMuted", k), d(k);
    }, ce = () => {
      r && console.log("[Audial hook] onSpeechStart"), x(!0);
    }, se = () => {
      r && console.log("[Audial hook] onSpeechEnd"), x(!1);
    };
    return _.on("ready", F), _.on("closed", ae), _.on("error", ee), _.on("transcript", ne), _.on("muted", he), _.on("speechStart", ce), _.on("speechEnd", se), () => {
      _.off("ready", F), _.off("closed", ae), _.off("error", ee), _.off("transcript", ne), _.off("muted", he), _.off("speechStart", ce), _.off("speechEnd", se);
    };
  }, [N, r]), X = W.useCallback((_) => {
    if (r && console.log(`[Audial hook] start with agentId: ${_}`), typeof window > "u") {
      console.warn("[Audial hook] window is undefined, cannot start");
      return;
    }
    o.current = new Y9(n, {
      baseUrl: i || "",
      debug: r,
      autoReconnect: !0
      // connectionTimeout: 10000
    }), C(), g([]), v(void 0), c("connecting"), T(0), o.current.start(_);
  }, [n, i, r, C]), D = W.useCallback(() => {
    var _;
    r && console.log("[Audial hook] stop"), (_ = o.current) == null || _.stop(), E.current && (clearInterval(E.current), E.current = null);
  }, [r]), U = W.useCallback(() => {
    o.current && (r && console.log("[Audial hook] toggleMute"), o.current.toggleMicMute());
  }, [r]), P = W.useCallback((_) => {
    !o.current || !_.trim() || (r && console.log("[Audial hook] sendMessage", _), o.current.send({
      type: "text",
      text: _.trim()
    }), g((F) => [
      ...F,
      {
        id: Date.now().toString(),
        sender: "user",
        content: _.trim(),
        timestamp: /* @__PURE__ */ new Date()
      }
    ]));
  }, [r]);
  return W.useEffect(() => () => {
    var _;
    r && console.log("[Audial hook] cleanup on unmount"), (_ = o.current) == null || _.stop(), E.current && (clearInterval(E.current), E.current = null);
  }, [r]), {
    start: X,
    stop: D,
    toggleMute: U,
    isMuted: h,
    status: u,
    messages: p,
    lastError: y,
    audial: o.current,
    sendMessage: P,
    isAgentSpeaking: w,
    duration: S
    // expose duration
  };
}
function w5(t) {
  var n, r, i = "";
  if (typeof t == "string" || typeof t == "number") i += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var o = t.length;
    for (n = 0; n < o; n++) t[n] && (r = w5(t[n])) && (i && (i += " "), i += r);
  } else for (r in t) t[r] && (i && (i += " "), i += r);
  return i;
}
function x5() {
  for (var t, n, r = 0, i = "", o = arguments.length; r < o; r++) (t = arguments[r]) && (n = w5(t)) && (i && (i += " "), i += n);
  return i;
}
const _0 = "-", I9 = (t) => {
  const n = W9(t), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = t;
  return {
    getClassGroupId: (c) => {
      const h = c.split(_0);
      return h[0] === "" && h.length !== 1 && h.shift(), S5(h, n) || Z9(c);
    },
    getConflictingClassGroupIds: (c, h) => {
      const d = r[c] || [];
      return h && i[c] ? [...d, ...i[c]] : d;
    }
  };
}, S5 = (t, n) => {
  var c;
  if (t.length === 0)
    return n.classGroupId;
  const r = t[0], i = n.nextPart.get(r), o = i ? S5(t.slice(1), i) : void 0;
  if (o)
    return o;
  if (n.validators.length === 0)
    return;
  const u = t.join(_0);
  return (c = n.validators.find(({
    validator: h
  }) => h(u))) == null ? void 0 : c.classGroupId;
}, _v = /^\[(.+)\]$/, Z9 = (t) => {
  if (_v.test(t)) {
    const n = _v.exec(t)[1], r = n == null ? void 0 : n.substring(0, n.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, W9 = (t) => {
  const {
    theme: n,
    classGroups: r
  } = t, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in r)
    bh(r[o], i, o, n);
  return i;
}, bh = (t, n, r, i) => {
  t.forEach((o) => {
    if (typeof o == "string") {
      const u = o === "" ? n : Rv(n, o);
      u.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (K9(o)) {
        bh(o(i), n, r, i);
        return;
      }
      n.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([u, c]) => {
      bh(c, Rv(n, u), r, i);
    });
  });
}, Rv = (t, n) => {
  let r = t;
  return n.split(_0).forEach((i) => {
    r.nextPart.has(i) || r.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(i);
  }), r;
}, K9 = (t) => t.isThemeGetter, Q9 = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const o = (u, c) => {
    r.set(u, c), n++, n > t && (n = 0, i = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(u) {
      let c = r.get(u);
      if (c !== void 0)
        return c;
      if ((c = i.get(u)) !== void 0)
        return o(u, c), c;
    },
    set(u, c) {
      r.has(u) ? r.set(u, c) : o(u, c);
    }
  };
}, wh = "!", xh = ":", F9 = xh.length, $9 = (t) => {
  const {
    prefix: n,
    experimentalParseClassName: r
  } = t;
  let i = (o) => {
    const u = [];
    let c = 0, h = 0, d = 0, p;
    for (let x = 0; x < o.length; x++) {
      let S = o[x];
      if (c === 0 && h === 0) {
        if (S === xh) {
          u.push(o.slice(d, x)), d = x + F9;
          continue;
        }
        if (S === "/") {
          p = x;
          continue;
        }
      }
      S === "[" ? c++ : S === "]" ? c-- : S === "(" ? h++ : S === ")" && h--;
    }
    const g = u.length === 0 ? o : o.substring(d), y = J9(g), v = y !== g, w = p && p > d ? p - d : void 0;
    return {
      modifiers: u,
      hasImportantModifier: v,
      baseClassName: y,
      maybePostfixModifierPosition: w
    };
  };
  if (n) {
    const o = n + xh, u = i;
    i = (c) => c.startsWith(o) ? u(c.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: c,
      maybePostfixModifierPosition: void 0
    };
  }
  if (r) {
    const o = i;
    i = (u) => r({
      className: u,
      parseClassName: o
    });
  }
  return i;
}, J9 = (t) => t.endsWith(wh) ? t.substring(0, t.length - 1) : t.startsWith(wh) ? t.substring(1) : t, e_ = (t) => {
  const n = Object.fromEntries(t.orderSensitiveModifiers.map((i) => [i, !0]));
  return (i) => {
    if (i.length <= 1)
      return i;
    const o = [];
    let u = [];
    return i.forEach((c) => {
      c[0] === "[" || n[c] ? (o.push(...u.sort(), c), u = []) : u.push(c);
    }), o.push(...u.sort()), o;
  };
}, t_ = (t) => ({
  cache: Q9(t.cacheSize),
  parseClassName: $9(t),
  sortModifiers: e_(t),
  ...I9(t)
}), n_ = /\s+/, a_ = (t, n) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: o,
    sortModifiers: u
  } = n, c = [], h = t.trim().split(n_);
  let d = "";
  for (let p = h.length - 1; p >= 0; p -= 1) {
    const g = h[p], {
      isExternal: y,
      modifiers: v,
      hasImportantModifier: w,
      baseClassName: x,
      maybePostfixModifierPosition: S
    } = r(g);
    if (y) {
      d = g + (d.length > 0 ? " " + d : d);
      continue;
    }
    let T = !!S, E = i(T ? x.substring(0, S) : x);
    if (!E) {
      if (!T) {
        d = g + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (E = i(x), !E) {
        d = g + (d.length > 0 ? " " + d : d);
        continue;
      }
      T = !1;
    }
    const N = u(v).join(":"), C = w ? N + wh : N, X = C + E;
    if (c.includes(X))
      continue;
    c.push(X);
    const D = o(E, T);
    for (let U = 0; U < D.length; ++U) {
      const P = D[U];
      c.push(C + P);
    }
    d = g + (d.length > 0 ? " " + d : d);
  }
  return d;
};
function r_() {
  let t = 0, n, r, i = "";
  for (; t < arguments.length; )
    (n = arguments[t++]) && (r = A5(n)) && (i && (i += " "), i += r);
  return i;
}
const A5 = (t) => {
  if (typeof t == "string")
    return t;
  let n, r = "";
  for (let i = 0; i < t.length; i++)
    t[i] && (n = A5(t[i])) && (r && (r += " "), r += n);
  return r;
};
function i_(t, ...n) {
  let r, i, o, u = c;
  function c(d) {
    const p = n.reduce((g, y) => y(g), t());
    return r = t_(p), i = r.cache.get, o = r.cache.set, u = h, h(d);
  }
  function h(d) {
    const p = i(d);
    if (p)
      return p;
    const g = a_(d, r);
    return o(d, g), g;
  }
  return function() {
    return u(r_.apply(null, arguments));
  };
}
const ct = (t) => {
  const n = (r) => r[t] || [];
  return n.isThemeGetter = !0, n;
}, T5 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, M5 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, s_ = /^\d+\/\d+$/, o_ = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, l_ = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, u_ = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, c_ = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, f_ = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ui = (t) => s_.test(t), Te = (t) => !!t && !Number.isNaN(Number(t)), ka = (t) => !!t && Number.isInteger(Number(t)), Cd = (t) => t.endsWith("%") && Te(t.slice(0, -1)), Jn = (t) => o_.test(t), d_ = () => !0, h_ = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  l_.test(t) && !u_.test(t)
), E5 = () => !1, p_ = (t) => c_.test(t), m_ = (t) => f_.test(t), g_ = (t) => !le(t) && !ue(t), y_ = (t) => Oi(t, R5, E5), le = (t) => T5.test(t), lr = (t) => Oi(t, k5, h_), _d = (t) => Oi(t, S_, Te), kv = (t) => Oi(t, C5, E5), v_ = (t) => Oi(t, _5, m_), Bl = (t) => Oi(t, N5, p_), ue = (t) => M5.test(t), Bs = (t) => Li(t, k5), b_ = (t) => Li(t, A_), Nv = (t) => Li(t, C5), w_ = (t) => Li(t, R5), x_ = (t) => Li(t, _5), Vl = (t) => Li(t, N5, !0), Oi = (t, n, r) => {
  const i = T5.exec(t);
  return i ? i[1] ? n(i[1]) : r(i[2]) : !1;
}, Li = (t, n, r = !1) => {
  const i = M5.exec(t);
  return i ? i[1] ? n(i[1]) : r : !1;
}, C5 = (t) => t === "position" || t === "percentage", _5 = (t) => t === "image" || t === "url", R5 = (t) => t === "length" || t === "size" || t === "bg-size", k5 = (t) => t === "length", S_ = (t) => t === "number", A_ = (t) => t === "family-name", N5 = (t) => t === "shadow", T_ = () => {
  const t = ct("color"), n = ct("font"), r = ct("text"), i = ct("font-weight"), o = ct("tracking"), u = ct("leading"), c = ct("breakpoint"), h = ct("container"), d = ct("spacing"), p = ct("radius"), g = ct("shadow"), y = ct("inset-shadow"), v = ct("text-shadow"), w = ct("drop-shadow"), x = ct("blur"), S = ct("perspective"), T = ct("aspect"), E = ct("ease"), N = ct("animate"), C = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], X = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], D = () => [...X(), ue, le], U = () => ["auto", "hidden", "clip", "visible", "scroll"], P = () => ["auto", "contain", "none"], _ = () => [ue, le, d], F = () => [ui, "full", "auto", ..._()], ae = () => [ka, "none", "subgrid", ue, le], ee = () => ["auto", {
    span: ["full", ka, ue, le]
  }, ka, ue, le], ne = () => [ka, "auto", ue, le], he = () => ["auto", "min", "max", "fr", ue, le], ce = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], se = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], k = () => ["auto", ..._()], O = () => [ui, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ..._()], z = () => [t, ue, le], q = () => [...X(), Nv, kv, {
    position: [ue, le]
  }], M = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], B = () => ["auto", "cover", "contain", w_, y_, {
    size: [ue, le]
  }], G = () => [Cd, Bs, lr], J = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    p,
    ue,
    le
  ], te = () => ["", Te, Bs, lr], pe = () => ["solid", "dashed", "dotted", "double"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], me = () => [Te, Cd, Nv, kv], Me = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    x,
    ue,
    le
  ], We = () => ["none", Te, ue, le], yt = () => ["none", Te, ue, le], Tt = () => [Te, ue, le], dt = () => [ui, "full", ..._()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Jn],
      breakpoint: [Jn],
      color: [d_],
      container: [Jn],
      "drop-shadow": [Jn],
      ease: ["in", "out", "in-out"],
      font: [g_],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Jn],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Jn],
      shadow: [Jn],
      spacing: ["px", Te],
      text: [Jn],
      "text-shadow": [Jn],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ui, le, ue, T]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Te, le, ue, h]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": C()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": C()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: D()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: U()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": U()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": U()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: P()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": P()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": P()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: F()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": F()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": F()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: F()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: F()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: F()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: F()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: F()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: F()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [ka, "auto", ue, le]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ui, "full", "auto", h, ..._()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [Te, ui, "auto", "initial", "none", le]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Te, ue, le]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Te, ue, le]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ka, "first", "last", "none", ue, le]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": ae()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ee()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ne()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ne()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": ae()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ee()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ne()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ne()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": he()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": he()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: _()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": _()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": _()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ce(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...se(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...se()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ce()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...se(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...se(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ce()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...se(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...se()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: _()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: _()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: _()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: _()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: _()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: _()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: _()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: _()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: _()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: k()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: k()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: k()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: k()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: k()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: k()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: k()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: k()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: k()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": _()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": _()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: O()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [h, "screen", ...O()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          h,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...O()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          h,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [c]
          },
          ...O()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...O()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...O()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...O()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Bs, lr]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [i, ue, _d]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Cd, le]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [b_, le, n]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, ue, le]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Te, "none", ue, _d]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          u,
          ..._()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ue, le]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", ue, le]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: z()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: z()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...pe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Te, "from-font", "auto", ue, lr]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: z()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Te, "auto", ue, le]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: _()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ue, le]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ue, le]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: q()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: M()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: B()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ka, ue, le],
          radial: ["", ue, le],
          conic: [ka, ue, le]
        }, x_, v_]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: z()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: G()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: G()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: G()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: z()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: z()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: z()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: J()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": J()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": J()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": J()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": J()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": J()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": J()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": J()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": J()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": J()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": J()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": J()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": J()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": J()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": J()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: te()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": te()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": te()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": te()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": te()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": te()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": te()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": te()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": te()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": te()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": te()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...pe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...pe(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: z()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": z()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": z()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": z()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": z()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": z()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": z()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": z()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": z()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: z()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...pe(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Te, ue, le]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Te, Bs, lr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: z()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          g,
          Vl,
          Bl
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: z()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", y, Vl, Bl]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": z()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: te()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: z()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Te, lr]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": z()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": te()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": z()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", v, Vl, Bl]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": z()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Te, ue, le]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ie(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ie()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [Te]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": me()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": me()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": z()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": z()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": me()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": me()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": z()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": z()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": me()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": me()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": z()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": z()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": me()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": me()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": z()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": z()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": me()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": me()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": z()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": z()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": me()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": me()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": z()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": z()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": me()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": me()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": z()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": z()
      }],
      "mask-image-radial": [{
        "mask-radial": [ue, le]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": me()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": me()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": z()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": z()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": X()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Te]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": me()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": me()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": z()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": z()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: q()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: M()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: B()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", ue, le]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ue,
          le
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Me()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Te, ue, le]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Te, ue, le]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          w,
          Vl,
          Bl
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": z()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Te, ue, le]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Te, ue, le]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Te, ue, le]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Te, ue, le]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Te, ue, le]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ue,
          le
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Me()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Te, ue, le]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Te, ue, le]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Te, ue, le]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Te, ue, le]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Te, ue, le]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Te, ue, le]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Te, ue, le]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Te, ue, le]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": _()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": _()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": _()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ue, le]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [Te, "initial", ue, le]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", E, ue, le]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Te, ue, le]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", N, ue, le]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [S, ue, le]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": D()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: We()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": We()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": We()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": We()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: yt()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": yt()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": yt()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": yt()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Tt()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Tt()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Tt()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ue, le, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: D()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: dt()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": dt()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": dt()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": dt()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: z()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: z()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ue, le]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": _()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": _()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": _()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": _()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": _()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": _()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": _()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": _()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": _()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": _()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": _()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": _()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": _()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": _()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": _()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": _()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": _()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": _()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ue, le]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...z()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Te, Bs, lr, _d]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...z()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, M_ = /* @__PURE__ */ i_(T_);
function Tn(...t) {
  return M_(x5(t));
}
function E_(t) {
  const n = Math.floor(t / 60), r = t % 60;
  return `${n.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C_ = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), __ = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (n, r, i) => i ? i.toUpperCase() : r.toLowerCase()
), Dv = (t) => {
  const n = __(t);
  return n.charAt(0).toUpperCase() + n.slice(1);
}, D5 = (...t) => t.filter((n, r, i) => !!n && n.trim() !== "" && i.indexOf(n) === r).join(" ").trim(), R_ = (t) => {
  for (const n in t)
    if (n.startsWith("aria-") || n === "role" || n === "title")
      return !0;
};
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var k_ = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N_ = W.forwardRef(
  ({
    color: t = "currentColor",
    size: n = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: i,
    className: o = "",
    children: u,
    iconNode: c,
    ...h
  }, d) => W.createElement(
    "svg",
    {
      ref: d,
      ...k_,
      width: n,
      height: n,
      stroke: t,
      strokeWidth: i ? Number(r) * 24 / Number(n) : r,
      className: D5("lucide", o),
      ...!u && !R_(h) && { "aria-hidden": "true" },
      ...h
    },
    [
      ...c.map(([p, g]) => W.createElement(p, g)),
      ...Array.isArray(u) ? u : [u]
    ]
  )
);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jt = (t, n) => {
  const r = W.forwardRef(
    ({ className: i, ...o }, u) => W.createElement(N_, {
      ref: u,
      iconNode: n,
      className: D5(
        `lucide-${C_(Dv(t))}`,
        `lucide-${t}`,
        i
      ),
      ...o
    })
  );
  return r.displayName = Dv(t), r;
};
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D_ = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], O_ = Jt("arrow-left", D_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], z_ = Jt("circle-alert", L_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B_ = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], V_ = Jt("ellipsis", B_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U_ = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], j_ = Jt("loader-circle", U_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P_ = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
], O5 = Jt("message-square", P_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H_ = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
], q_ = Jt("mic-off", H_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G_ = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
], Y_ = Jt("mic", G_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X_ = [
  [
    "path",
    {
      d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
      key: "1wngk7"
    }
  ],
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  [
    "path",
    {
      d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
      key: "10hv5p"
    }
  ]
], Rd = Jt("phone-off", X_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I_ = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], Z_ = Jt("phone", I_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W_ = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], K_ = Jt("rotate-ccw", W_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q_ = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], F_ = Jt("send", Q_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $_ = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], J_ = Jt("x", $_);
/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e7 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], t7 = Jt("zap", e7);
function n7({ isActive: t = !0, className: n = "" }) {
  const r = Array.from({ length: 5 }, (i, o) => o);
  return /* @__PURE__ */ Z.jsx("div", { className: `aw:flex aw:items-center aw:justify-center aw:space-x-1 ${n}`, children: r.map((i) => /* @__PURE__ */ Z.jsx(
    hn.div,
    {
      className: "aw:w-1 aw:bg-green-400 aw:rounded-full",
      animate: t ? {
        height: [4, 16, 8, 20, 6, 14, 10],
        opacity: [0.4, 1, 0.6, 1, 0.5, 0.9, 0.7]
      } : { height: 4, opacity: 0.3 },
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.1,
        ease: "easeInOut"
      },
      style: { height: 4 }
    },
    i
  )) });
}
function Ov(t, n) {
  if (typeof t == "function")
    return t(n);
  t != null && (t.current = n);
}
function a7(...t) {
  return (n) => {
    let r = !1;
    const i = t.map((o) => {
      const u = Ov(o, n);
      return !r && typeof u == "function" && (r = !0), u;
    });
    if (r)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : Ov(t[o], null);
        }
      };
  };
}
// @__NO_SIDE_EFFECTS__
function L5(t) {
  const n = /* @__PURE__ */ i7(t), r = W.forwardRef((i, o) => {
    const { children: u, ...c } = i, h = W.Children.toArray(u), d = h.find(o7);
    if (d) {
      const p = d.props.children, g = h.map((y) => y === d ? W.Children.count(p) > 1 ? W.Children.only(null) : W.isValidElement(p) ? p.props.children : null : y);
      return /* @__PURE__ */ Z.jsx(n, { ...c, ref: o, children: W.isValidElement(p) ? W.cloneElement(p, void 0, g) : null });
    }
    return /* @__PURE__ */ Z.jsx(n, { ...c, ref: o, children: u });
  });
  return r.displayName = `${t}.Slot`, r;
}
var r7 = /* @__PURE__ */ L5("Slot");
// @__NO_SIDE_EFFECTS__
function i7(t) {
  const n = W.forwardRef((r, i) => {
    const { children: o, ...u } = r;
    if (W.isValidElement(o)) {
      const c = u7(o), h = l7(u, o.props);
      return o.type !== W.Fragment && (h.ref = i ? a7(i, c) : c), W.cloneElement(o, h);
    }
    return W.Children.count(o) > 1 ? W.Children.only(null) : null;
  });
  return n.displayName = `${t}.SlotClone`, n;
}
var s7 = Symbol("radix.slottable");
function o7(t) {
  return W.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === s7;
}
function l7(t, n) {
  const r = { ...n };
  for (const i in n) {
    const o = t[i], u = n[i];
    /^on[A-Z]/.test(i) ? o && u ? r[i] = (...h) => {
      const d = u(...h);
      return o(...h), d;
    } : o && (r[i] = o) : i === "style" ? r[i] = { ...o, ...u } : i === "className" && (r[i] = [o, u].filter(Boolean).join(" "));
  }
  return { ...t, ...r };
}
function u7(t) {
  var i, o;
  let n = (i = Object.getOwnPropertyDescriptor(t.props, "ref")) == null ? void 0 : i.get, r = n && "isReactWarning" in n && n.isReactWarning;
  return r ? t.ref : (n = (o = Object.getOwnPropertyDescriptor(t, "ref")) == null ? void 0 : o.get, r = n && "isReactWarning" in n && n.isReactWarning, r ? t.props.ref : t.props.ref || t.ref);
}
const Lv = (t) => typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t, zv = x5, c7 = (t, n) => (r) => {
  var i;
  if ((n == null ? void 0 : n.variants) == null) return zv(t, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
  const { variants: o, defaultVariants: u } = n, c = Object.keys(o).map((p) => {
    const g = r == null ? void 0 : r[p], y = u == null ? void 0 : u[p];
    if (g === null) return null;
    const v = Lv(g) || Lv(y);
    return o[p][v];
  }), h = r && Object.entries(r).reduce((p, g) => {
    let [y, v] = g;
    return v === void 0 || (p[y] = v), p;
  }, {}), d = n == null || (i = n.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((p, g) => {
    let { class: y, className: v, ...w } = g;
    return Object.entries(w).every((x) => {
      let [S, T] = x;
      return Array.isArray(T) ? T.includes({
        ...u,
        ...h
      }[S]) : {
        ...u,
        ...h
      }[S] === T;
    }) ? [
      ...p,
      y,
      v
    ] : p;
  }, []);
  return zv(t, c, d, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
}, f7 = c7(
  "aw:inline-flex aw:items-center aw:justify-center aw:gap-2 aw:whitespace-nowrap aw:rounded-md aw:text-sm aw:font-medium aw:transition-all aw:disabled:pointer-events-none aw:disabled:opacity-50 aw:[&_svg]:pointer-events-none aw:[&_svg:not([class*='size-'])]:size-4 aw:shrink-0 aw:[&_svg]:shrink-0 aw:outline-none aw:focus-visible:border-ring aw:focus-visible:ring-ring/50 aw:focus-visible:ring-[3px] aw:aria-invalid:ring-destructive/20 aw:aria-invalid:border-destructive aw:cursor-pointer",
  {
    variants: {
      variant: {
        default: "aw:bg-primary aw:text-primary-foreground aw:shadow-xs aw:hover:bg-primary/90",
        destructive: "aw:bg-destructive aw:text-white aw:shadow-xs aw:hover:bg-destructive/90 aw:focus-visible:ring-destructive/20 aw:aria-invalid:ring-destructive/40 aw:aria-invalid:border-destructive",
        outline: "aw:border aw:bg-background aw:shadow-xs aw:hover:bg-accent aw:hover:text-accent-foreground aw:aria-invalid:ring-destructive/20 aw:aria-invalid:border-destructive",
        secondary: "aw:bg-secondary aw:text-secondary-foreground aw:shadow-xs aw:hover:bg-secondary/80",
        ghost: "aw:hover:bg-accent aw:hover:text-accent-foreground aw:text-foreground aw:aria-invalid:ring-destructive/20 aw:aria-invalid:border-destructive",
        link: "aw:text-primary aw:underline-offset-4 aw:hover:underline"
      },
      size: {
        default: "aw:h-9 aw:px-4 aw:py-2 aw:has-[>svg]:px-3",
        sm: "aw:h-8 aw:rounded-md aw:gap-1.5 aw:px-3 aw:has-[>svg]:px-2.5",
        lg: "aw:h-10 aw:rounded-md aw:px-6 aw:has-[>svg]:px-4",
        icon: "aw:size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Nn({
  className: t,
  variant: n,
  size: r,
  asChild: i = !1,
  ...o
}) {
  const u = i ? r7 : "button";
  return /* @__PURE__ */ Z.jsx(
    u,
    {
      "data-slot": "button",
      className: Tn(f7({ variant: n, size: r, className: t })),
      ...o
    }
  );
}
function d7({
  callState: t,
  onEndCall: n,
  onToggleMute: r,
  onRetryCall: i,
  widgetConfig: o
}) {
  return t.status === "connecting" ? /* @__PURE__ */ Z.jsx("div", { className: "aw:absolute aw:bottom-6 aw:left-4 aw:right-4 aw:z-10", children: /* @__PURE__ */ Z.jsxs(
    hn.div,
    {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      className: "aw:bg-black/70 aw:backdrop-blur-lg aw:p-6 aw:rounded-2xl",
      children: [
        /* @__PURE__ */ Z.jsxs("div", { className: "aw:text-center aw:mb-6", children: [
          /* @__PURE__ */ Z.jsx("p", { className: "aw:text-white aw:text-lg aw:font-medium aw:mb-1", children: o.agent.name }),
          /* @__PURE__ */ Z.jsx("p", { className: "aw:text-sm aw:text-gray-400", children: "Connecting..." })
        ] }),
        /* @__PURE__ */ Z.jsx("div", { className: "aw:flex aw:justify-center", children: /* @__PURE__ */ Z.jsx(
          Nn,
          {
            onClick: (u) => {
              u.stopPropagation(), n();
            },
            className: "aw:w-16 aw:h-16 aw:bg-red-500 aw:hover:bg-red-600 aw:rounded-xl aw:flex aw:items-center aw:justify-center aw:transition-colors",
            children: /* @__PURE__ */ Z.jsx(Rd, { className: "aw:text-white aw:size-5" })
          }
        ) })
      ]
    }
  ) }) : t.status === "error" ? /* @__PURE__ */ Z.jsx("div", { className: "aw:absolute aw:bottom-6 aw:left-4 aw:right-4 aw:z-10", children: /* @__PURE__ */ Z.jsxs(
    hn.div,
    {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      className: "aw:bg-black/70 aw:backdrop-blur-lg aw:rounded-2xl aw:p-6",
      children: [
        /* @__PURE__ */ Z.jsxs("div", { className: "aw:text-center aw:mb-6", children: [
          /* @__PURE__ */ Z.jsx("div", { className: "aw:w-16 aw:h-16 aw:rounded-full aw:bg-red-500/20 aw:flex aw:items-center aw:justify-center aw:mx-auto aw:mb-3", children: /* @__PURE__ */ Z.jsx(z_, { className: "aw:w-8 aw:h-8 aw:text-red-400" }) }),
          /* @__PURE__ */ Z.jsx("p", { className: "aw:text-red-300 aw:text-sm aw:mb-2", children: "Call Failed" }),
          /* @__PURE__ */ Z.jsx("p", { className: "aw:text-white aw:text-xs aw:leading-relaxed", children: t.error || "--" })
        ] }),
        /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex aw:justify-center aw:space-x-4", children: [
          /* @__PURE__ */ Z.jsx(
            Nn,
            {
              onClick: (u) => {
                u.stopPropagation(), i == null || i();
              },
              className: "aw:w-12 aw:h-12 aw:bg-blue-500 aw:hover:bg-blue-600 aw:rounded-xl aw:flex aw:items-center aw:justify-center aw:transition-colors",
              children: /* @__PURE__ */ Z.jsx(K_, { className: "aw:text-white aw:size-5" })
            }
          ),
          /* @__PURE__ */ Z.jsx(
            Nn,
            {
              onClick: (u) => {
                u.stopPropagation(), n();
              },
              className: "aw:w-12 aw:h-12 aw:bg-red-500 aw:hover:bg-red-600 aw:rounded-xl aw:flex aw:items-center aw:justify-center aw:transition-colors",
              children: /* @__PURE__ */ Z.jsx(Rd, { className: "aw:text-white aw:size-5" })
            }
          )
        ] })
      ]
    }
  ) }) : t.status === "active" ? /* @__PURE__ */ Z.jsx("div", { className: "aw:absolute aw:bottom-6 aw:left-4 aw:right-4 aw:z-10", children: /* @__PURE__ */ Z.jsxs(
    hn.div,
    {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      className: "aw:bg-black/70 aw:backdrop-blur-lg aw:p-6 aw:rounded-2xl",
      children: [
        /* @__PURE__ */ Z.jsxs("div", { className: "aw:text-center aw:mb-6", children: [
          /* @__PURE__ */ Z.jsx("p", { className: "aw:text-white aw:text-lg aw:font-medium aw:mb-4", children: o.agent.name }),
          /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex aw:items-center aw:justify-center aw:space-x-3", children: [
            /* @__PURE__ */ Z.jsx(n7, { isActive: !t.isMuted }),
            /* @__PURE__ */ Z.jsx("span", { className: "aw:text-green-300 aw:text-sm", children: E_(t.duration) })
          ] })
        ] }),
        /* @__PURE__ */ Z.jsxs("footer", { className: "aw:flex aw:justify-center aw:space-x-4", children: [
          /* @__PURE__ */ Z.jsx(
            Nn,
            {
              onClick: (u) => {
                u.stopPropagation(), r();
              },
              className: `aw:w-12 aw:h-12 aw:rounded-xl aw:flex aw:items-center aw:justify-center aw:transition-colors ${t.isMuted ? "aw:bg-gray-600 aw:hover:bg-gray-700" : "aw:bg-blue-500 aw:hover:bg-blue-600"}`,
              children: t.isMuted ? /* @__PURE__ */ Z.jsx(Y_, { className: "aw:text-white aw:size-5" }) : /* @__PURE__ */ Z.jsx(q_, { className: "aw:text-white aw:size-5" })
            }
          ),
          /* @__PURE__ */ Z.jsx(
            Nn,
            {
              onClick: (u) => {
                u.stopPropagation(), n();
              },
              className: "aw:w-12 aw:h-12 aw:bg-red-500 aw:hover:bg-red-600 aw:rounded-xl aw:flex aw:items-center aw:justify-center aw:transition-colors",
              children: /* @__PURE__ */ Z.jsx(Rd, { className: "aw:text-white aw:size-5" })
            }
          )
        ] })
      ]
    }
  ) }) : null;
}
function h7(t, n = []) {
  let r = [];
  function i(u, c) {
    const h = W.createContext(c), d = r.length;
    r = [...r, c];
    const p = (y) => {
      var E;
      const { scope: v, children: w, ...x } = y, S = ((E = v == null ? void 0 : v[t]) == null ? void 0 : E[d]) || h, T = W.useMemo(() => x, Object.values(x));
      return /* @__PURE__ */ Z.jsx(S.Provider, { value: T, children: w });
    };
    p.displayName = u + "Provider";
    function g(y, v) {
      var S;
      const w = ((S = v == null ? void 0 : v[t]) == null ? void 0 : S[d]) || h, x = W.useContext(w);
      if (x) return x;
      if (c !== void 0) return c;
      throw new Error(`\`${y}\` must be used within \`${u}\``);
    }
    return [p, g];
  }
  const o = () => {
    const u = r.map((c) => W.createContext(c));
    return function(h) {
      const d = (h == null ? void 0 : h[t]) || u;
      return W.useMemo(
        () => ({ [`__scope${t}`]: { ...h, [t]: d } }),
        [h, d]
      );
    };
  };
  return o.scopeName = t, [i, p7(o, ...n)];
}
function p7(...t) {
  const n = t[0];
  if (t.length === 1) return n;
  const r = () => {
    const i = t.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(u) {
      const c = i.reduce((h, { useScope: d, scopeName: p }) => {
        const y = d(u)[`__scope${p}`];
        return { ...h, ...y };
      }, {});
      return W.useMemo(() => ({ [`__scope${n.scopeName}`]: c }), [c]);
    };
  };
  return r.scopeName = n.scopeName, r;
}
function m7(t) {
  const n = W.useRef(t);
  return W.useEffect(() => {
    n.current = t;
  }), W.useMemo(() => (...r) => {
    var i;
    return (i = n.current) == null ? void 0 : i.call(n, ...r);
  }, []);
}
var Sh = globalThis != null && globalThis.document ? W.useLayoutEffect : () => {
};
Gb();
var g7 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], R0 = g7.reduce((t, n) => {
  const r = /* @__PURE__ */ L5(`Primitive.${n}`), i = W.forwardRef((o, u) => {
    const { asChild: c, ...h } = o, d = c ? r : n;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ Z.jsx(d, { ...h, ref: u });
  });
  return i.displayName = `Primitive.${n}`, { ...t, [n]: i };
}, {}), kd = { exports: {} }, Nd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bv;
function y7() {
  if (Bv) return Nd;
  Bv = 1;
  var t = mu();
  function n(y, v) {
    return y === v && (y !== 0 || 1 / y === 1 / v) || y !== y && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, o = t.useEffect, u = t.useLayoutEffect, c = t.useDebugValue;
  function h(y, v) {
    var w = v(), x = i({ inst: { value: w, getSnapshot: v } }), S = x[0].inst, T = x[1];
    return u(
      function() {
        S.value = w, S.getSnapshot = v, d(S) && T({ inst: S });
      },
      [y, w, v]
    ), o(
      function() {
        return d(S) && T({ inst: S }), y(function() {
          d(S) && T({ inst: S });
        });
      },
      [y]
    ), c(w), w;
  }
  function d(y) {
    var v = y.getSnapshot;
    y = y.value;
    try {
      var w = v();
      return !r(y, w);
    } catch {
      return !0;
    }
  }
  function p(y, v) {
    return v();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : h;
  return Nd.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : g, Nd;
}
var Vv;
function v7() {
  return Vv || (Vv = 1, kd.exports = y7()), kd.exports;
}
var b7 = v7();
function w7() {
  return b7.useSyncExternalStore(
    x7,
    () => !0,
    () => !1
  );
}
function x7() {
  return () => {
  };
}
var k0 = "Avatar", [S7, fN] = h7(k0), [A7, z5] = S7(k0), B5 = W.forwardRef(
  (t, n) => {
    const { __scopeAvatar: r, ...i } = t, [o, u] = W.useState("idle");
    return /* @__PURE__ */ Z.jsx(
      A7,
      {
        scope: r,
        imageLoadingStatus: o,
        onImageLoadingStatusChange: u,
        children: /* @__PURE__ */ Z.jsx(R0.span, { ...i, ref: n })
      }
    );
  }
);
B5.displayName = k0;
var V5 = "AvatarImage", U5 = W.forwardRef(
  (t, n) => {
    const { __scopeAvatar: r, src: i, onLoadingStatusChange: o = () => {
    }, ...u } = t, c = z5(V5, r), h = T7(i, u), d = m7((p) => {
      o(p), c.onImageLoadingStatusChange(p);
    });
    return Sh(() => {
      h !== "idle" && d(h);
    }, [h, d]), h === "loaded" ? /* @__PURE__ */ Z.jsx(R0.img, { ...u, ref: n, src: i }) : null;
  }
);
U5.displayName = V5;
var j5 = "AvatarFallback", P5 = W.forwardRef(
  (t, n) => {
    const { __scopeAvatar: r, delayMs: i, ...o } = t, u = z5(j5, r), [c, h] = W.useState(i === void 0);
    return W.useEffect(() => {
      if (i !== void 0) {
        const d = window.setTimeout(() => h(!0), i);
        return () => window.clearTimeout(d);
      }
    }, [i]), c && u.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ Z.jsx(R0.span, { ...o, ref: n }) : null;
  }
);
P5.displayName = j5;
function Uv(t, n) {
  return t ? n ? (t.src !== n && (t.src = n), t.complete && t.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function T7(t, { referrerPolicy: n, crossOrigin: r }) {
  const i = w7(), o = W.useRef(null), u = i ? (o.current || (o.current = new window.Image()), o.current) : null, [c, h] = W.useState(
    () => Uv(u, t)
  );
  return Sh(() => {
    h(Uv(u, t));
  }, [u, t]), Sh(() => {
    const d = (y) => () => {
      h(y);
    };
    if (!u) return;
    const p = d("loaded"), g = d("error");
    return u.addEventListener("load", p), u.addEventListener("error", g), n && (u.referrerPolicy = n), typeof r == "string" && (u.crossOrigin = r), () => {
      u.removeEventListener("load", p), u.removeEventListener("error", g);
    };
  }, [u, r, n]), c;
}
var M7 = B5, E7 = U5, C7 = P5;
function H5({
  className: t,
  ...n
}) {
  return /* @__PURE__ */ Z.jsx(
    M7,
    {
      "data-slot": "avatar",
      className: Tn(
        "aw:relative aw:flex aw:size-8 aw:shrink-0 aw:overflow-hidden aw:rounded-full",
        t
      ),
      ...n
    }
  );
}
function q5({
  className: t,
  ...n
}) {
  return /* @__PURE__ */ Z.jsx(
    E7,
    {
      "data-slot": "avatar-image",
      className: Tn("aw:aspect-square aw:size-full", t),
      ...n
    }
  );
}
function _7({
  className: t,
  ...n
}) {
  return /* @__PURE__ */ Z.jsx(
    C7,
    {
      "data-slot": "avatar-fallback",
      className: Tn(
        "aw:bg-muted aw:flex aw:size-full aw:items-center aw:justify-center aw:rounded-full",
        t
      ),
      ...n
    }
  );
}
function R7({ className: t, type: n, ...r }) {
  return /* @__PURE__ */ Z.jsx(
    "input",
    {
      type: n,
      "data-slot": "input",
      className: Tn(
        "aw:file:text-foreground aw:placeholder:text-muted-foreground aw:selection:bg-primary aw:selection:text-primary-foreground aw:aria-invalid:ring-destructive/20 aw:aria-invalid:border-destructive",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aw:disabled:pointer-events-none aw:disabled:cursor-not-allowed aw:disabled:opacity-50 aw:md:text-sm",
        t
      ),
      ...r
    }
  );
}
function k7({
  widgetConfig: t,
  messages: n,
  onBack: r,
  status: i,
  sendMessage: o
}) {
  const [u, c] = W.useState(""), h = W.useRef(null);
  W.useEffect(() => {
    n.length > 0 && h.current && h.current.scrollIntoView({ behavior: "smooth" });
  }, [n]);
  const d = () => {
    u.trim() && (o(u.trim()), c(""));
  }, p = () => ["connecting", "reconnecting"].includes(i) || n.length === 0 ? /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex aw:flex-col aw:items-center aw:justify-start aw:h-full aw:text-foreground/80 pt-2", children: [
    /* @__PURE__ */ Z.jsx(j_, { className: "aw:size-6 aw:animate-spin aw:mb-1" }),
    /* @__PURE__ */ Z.jsx("p", { className: "aw:font-medium aw:text-sm", children: "Connecting..." }),
    /* @__PURE__ */ Z.jsx("p", { className: "aw:text-xs aw:text-muted-foreground aw:opacity-70", children: "Please wait a moment." })
  ] }) : /* @__PURE__ */ Z.jsx(Z.Fragment, { children: n.map((g) => (
    // {MOCK_MESSAGES.map((message) => (
    /* @__PURE__ */ Z.jsx(N7, { message: g, widgetConfig: t }, g == null ? void 0 : g.id)
  )) });
  return /* @__PURE__ */ Z.jsx(
    hn.div,
    {
      className: "aw:absolute aw:rounded-3xl aw:overflow-hidden aw:shadow-2xl aw:cursor-pointer",
      style: {
        width: 380,
        height: "608px"
      },
      children: /* @__PURE__ */ Z.jsxs(
        "div",
        {
          className: `aw:relative aw:w-[380px] aw:h-[608px] aw:rounded-3xl aw:overflow-hidden
       aw:bg-blend-multiply aw:backdrop-blur-sm`,
          style: {
            // TODO: use the background color and create rbg from hex util
            backgroundImage: `linear-gradient(rgba(2,6,23,0.85), rgba(2,6,23,0.85)), url('${t.style.agentAvatar}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          },
          children: [
            /* @__PURE__ */ Z.jsx("div", { className: "aw:absolute aw:inset-0 aw:backdrop-blur-sm aw:pointer-events-none" }),
            /* @__PURE__ */ Z.jsx("article", { className: "aw:relative aw:z-10 aw:flex aw:flex-col aw:h-full aw:p-10", children: /* @__PURE__ */ Z.jsxs("div", { className: "aw:absolute aw:right-0 aw:top-0 aw:h-full aw:w-full aw:z-50 aw:flex aw:flex-col aw:rounded-3xl", children: [
              /* @__PURE__ */ Z.jsxs("header", { className: "aw:flex aw:justify-between aw:items-center aw:p-4 aw:border-b aw:border-gray-500/30", children: [
                /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex aw:items-center aw:gap-2 aw:flex-1", children: [
                  /* @__PURE__ */ Z.jsx(
                    Nn,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "aw:text-white aw:hover:text-white/80",
                      onClick: () => {
                        r();
                      },
                      children: /* @__PURE__ */ Z.jsx(O_, {})
                    }
                  ),
                  /* @__PURE__ */ Z.jsxs("div", { className: "aw:w-8 aw:h-8 aw:flex aw:gap-2 aw:flex-1 aw:items-center", children: [
                    /* @__PURE__ */ Z.jsxs(H5, { className: "aw:w-8 aw:h-8", children: [
                      /* @__PURE__ */ Z.jsx(q5, { src: t.style.agentAvatar || "", className: "aw:w-8 aw:h-8 aw:object-cover" }),
                      /* @__PURE__ */ Z.jsx(_7, { className: "aw:w-8 aw:h-8 aw:bg-primary aw:text-primary-foreground aw:object-cover", children: t.agent.name.charAt(0) })
                    ] }),
                    /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex aw:flex-col aw:justify-center", children: [
                      /* @__PURE__ */ Z.jsx("p", { className: "aw:text-foreground aw:text-base aw:font-semibold aw:leading-tight", children: t.agent.name }),
                      /* @__PURE__ */ Z.jsx("p", { className: "aw:text-foreground/80 aw:text-sm aw:font-normal", children: "Agent" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ Z.jsx("div", { children: /* @__PURE__ */ Z.jsx(Nn, { variant: "ghost", size: "icon", children: /* @__PURE__ */ Z.jsx(V_, {}) }) })
              ] }),
              /* @__PURE__ */ Z.jsxs("section", { className: "aw:flex-1 aw:flex aw:flex-col aw:gap-4 aw:overflow-y-auto aw:p-4 aw:pb-2", children: [
                p(),
                /* @__PURE__ */ Z.jsx("div", { ref: h })
              ] }),
              /* @__PURE__ */ Z.jsx(
                "form",
                {
                  className: "aw:w-full aw:flex aw:items-center aw:gap-2 aw:p-4",
                  onSubmit: (g) => {
                    g.preventDefault(), d();
                  },
                  children: /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex-1 aw:relative", children: [
                    /* @__PURE__ */ Z.jsx(
                      R7,
                      {
                        type: "text",
                        placeholder: "Enter message...",
                        className: "aw:w-full aw:h-10! aw:px-4 aw:py-6 aw:bg-transparent aw:border aw:border-primary/50 aw:text-white aw:placeholder:text-white/50 aw:rounded-xl",
                        value: u,
                        onChange: (g) => c(g.target.value)
                      }
                    ),
                    /* @__PURE__ */ Z.jsx(
                      Nn,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "aw:absolute aw:right-1 aw:top-1/2 aw:-translate-y-1/2 aw:h-10 aw:w-10 aw:text-white/70 aw:hover:text-white aw:hover:bg-white/10",
                        children: /* @__PURE__ */ Z.jsx(F_, { className: "aw:h-5 aw:w-5" })
                      }
                    )
                  ] })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}
const N7 = ({ message: t, widgetConfig: n }) => {
  const r = "aw:p-4 aw:rounded-2xl aw:max-w-[90%]";
  return t.sender === "agent" ? /* @__PURE__ */ Z.jsxs("section", { className: Tn(r, "aw:flex aw:flex-col aw:gap-1 aw:border aw:border-gray-500/40 aw:self-start"), children: [
    /* @__PURE__ */ Z.jsxs("header", { className: "aw:flex aw:items-center aw:gap-2", children: [
      /* @__PURE__ */ Z.jsx(H5, { children: /* @__PURE__ */ Z.jsx(q5, { src: n.style.agentAvatar || "", className: "aw:w-8 aw:h-8 aw:object-cover" }) }),
      /* @__PURE__ */ Z.jsx("p", { className: "aw:text-foreground aw:text-sm aw:font-medium", children: n.agent.name })
    ] }),
    /* @__PURE__ */ Z.jsx("p", { className: "aw:text-foreground/80 aw:text-sm aw:font-medium", children: t.content })
  ] }) : /* @__PURE__ */ Z.jsx("section", { className: Tn(r, "aw:flex aw:flex-col aw:gap-2 aw:bg-primary aw:self-end"), children: /* @__PURE__ */ Z.jsx("p", { className: "aw:text-primary-foreground aw:text-sm aw:font-medium", children: t.content }) });
};
function D7({
  widgetConfig: t,
  onStartCall: n
}) {
  return /* @__PURE__ */ Z.jsxs(
    "div",
    {
      className: "aw:absolute aw:bottom-6 aw:left-4 aw:right-4 aw:z-10 aw:cursor-pointer",
      children: [
        /* @__PURE__ */ Z.jsx(
          hn.div,
          {
            initial: { y: 100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            className: "aw:bg-gray-400/30 aw:backdrop-blur-lg aw:rounded-2xl aw:p-2 aw:transition-colors",
            children: /* @__PURE__ */ Z.jsx("div", { className: "aw:flex aw:items-center aw:justify-between aw:min-w-0", children: /* @__PURE__ */ Z.jsxs("section", { className: "aw:flex aw:items-center aw:space-x-3 aw:flex-1 aw:min-w-0", children: [
              /* @__PURE__ */ Z.jsx("div", { className: "aw:w-12 aw:h-12 aw:rounded-full aw:overflow-hidden aw:flex-shrink-0", children: /* @__PURE__ */ Z.jsx(
                "img",
                {
                  src: t.style.agentAvatar || "",
                  alt: t.agent.name,
                  className: "aw:object-cover",
                  width: 48,
                  height: 48
                }
              ) }),
              /* @__PURE__ */ Z.jsxs("div", { className: "aw:min-w-0 aw:flex-1", children: [
                /* @__PURE__ */ Z.jsx("p", { className: "aw:text-white aw:text-sm aw:font-medium aw:truncate", children: t.banner.header }),
                /* @__PURE__ */ Z.jsx("p", { className: "aw:text-gray-300 aw:text-xs", children: t.banner.description })
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ Z.jsxs("footer", { className: "aw:flex aw:justify-center aw:space-x-4 aw:pt-4", children: [
          ["both", "chat"].includes(t.launcher.modality) && /* @__PURE__ */ Z.jsxs(Nn, { className: "aw:flex-1 aw:h-12! aw:rounded-xl", size: "lg", onClick: () => {
            var r;
            return n((r = t.agent) == null ? void 0 : r.id, "text");
          }, children: [
            /* @__PURE__ */ Z.jsx(O5, { className: "aw:w-5 aw:h-5" }),
            " Chat"
          ] }),
          ["both", "voice"].includes(t.launcher.modality) && /* @__PURE__ */ Z.jsxs(Nn, { className: "aw:flex-1 aw:h-12! aw:rounded-xl!", size: "lg", onClick: () => {
            var r;
            return n((r = t.agent) == null ? void 0 : r.id, "voice");
          }, children: [
            /* @__PURE__ */ Z.jsx(Z_, { className: "aw:w-5 aw:h-5" }),
            " Call"
          ] })
        ] })
      ]
    }
  );
}
function O7({
  callStatus: t,
  onStartCall: n,
  onEndCall: r,
  onToggleMute: i,
  onRetryCall: o,
  widgetConfig: u,
  messages: c,
  sendMessage: h
}) {
  const [d, p] = W.useState(null), [g, y] = W.useState(0);
  return W.useEffect(() => {
    if (t === "active") {
      y(0);
      const v = setInterval(() => {
        y((w) => w + 1);
      }, 1e3);
      return () => clearInterval(v);
    } else
      y(0);
  }, [t, y]), d === "text" ? /* @__PURE__ */ Z.jsx(
    k7,
    {
      widgetConfig: u,
      messages: c,
      status: t,
      sendMessage: h,
      onBack: () => {
        r(), p(null);
      }
    }
  ) : /* @__PURE__ */ Z.jsx(
    hn.div,
    {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: 1,
        scale: 1
      },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      },
      className: "aw:absolute aw:rounded-3xl aw:overflow-hidden aw:shadow-2xl aw:cursor-pointer",
      style: {
        width: 380,
        height: "608px"
      },
      children: /* @__PURE__ */ Z.jsxs("div", { className: "aw:relative aw:w-full aw:h-full aw:flex aw:justify-center aw:items-center", children: [
        /* @__PURE__ */ Z.jsx("section", { className: "aw:block aw:inset-0 aw:h-full aw:w-full aw:rounded-3xl", children: /* @__PURE__ */ Z.jsx(
          "img",
          {
            src: u.style.agentAvatar || "",
            alt: u.agent.name,
            className: "aw:object-cover aw:rounded-3xl",
            style: {
              height: "100%",
              width: "100%"
            }
          }
        ) }),
        /* @__PURE__ */ Z.jsx("div", { className: "aw:absolute aw:top-4 aw:left-4 aw:right-4 aw:z-10", children: /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex aw:justify-between aw:items-center", children: [
          /* @__PURE__ */ Z.jsx("div", { className: "aw:bg-black/50 aw:backdrop-blur-sm aw:rounded-full aw:px-3 aw:py-1", children: /* @__PURE__ */ Z.jsx("span", { className: "aw:text-white aw:text-sm aw:font-medium", children: "Agent" }) }),
          /* @__PURE__ */ Z.jsxs("div", { className: "aw:flex aw:items-center aw:bg-black/50 aw:backdrop-blur-sm aw:rounded-full aw:px-3 aw:py-1", children: [
            /* @__PURE__ */ Z.jsx(t7, { className: "aw:w-3 aw:h-3 aw:text-green-400 aw:mr-1" }),
            /* @__PURE__ */ Z.jsx("span", { className: "aw:text-white aw:text-xs aw:font-medium", children: "Active" })
          ] })
        ] }) }),
        ["connecting", "error", "active"].includes(t) ? /* @__PURE__ */ Z.jsx(
          d7,
          {
            callState: {
              status: t,
              // TODO: fix or remove activeAgent
              activeAgent: 0,
              duration: g,
              // TODO: fix or remove isMuted
              isMuted: !1
            },
            onStartCall: (v, w) => {
              p(w), n();
            },
            onEndCall: r,
            onToggleMute: i,
            onRetryCall: o,
            widgetConfig: u
          }
        ) : (
          // Show Profile Card and action buttons when call is idle
          /* @__PURE__ */ Z.jsx(
            D7,
            {
              widgetConfig: u,
              onStartCall: (v, w) => {
                p(w), n();
              }
            }
          )
        )
      ] })
    }
  );
}
const jv = "aw:w-[50px] aw:h-[50px]", L7 = ({
  isWidgetOpen: t,
  handleToggleWidget: n,
  status: r,
  widgetConfig: i
}) => /* @__PURE__ */ Z.jsxs("div", { className: Tn("aw:relative", jv), children: [
  /* @__PURE__ */ Z.jsx(
    hn.button,
    {
      onClick: n,
      className: Tn(
        "aw:shadow-xl aw:flex aw:items-center aw:justify-center aw:transition-colors aw:duration-200 aw:ease-in-out",
        jv,
        "aw:rounded-2xl aw:overflow-hidden aw:border-2 aw:border-background",
        "aw:focus:outline-none aw:focus:ring-inset aw:focus:ring-primary",
        t ? "aw:bg-background aw:text-foreground" : ""
      ),
      "aria-expanded": t,
      "aria-label": t ? "Close voice agent panel" : "Open voice agent panel",
      children: /* @__PURE__ */ Z.jsx(zw, { mode: "wait", initial: !1, children: t ? /* @__PURE__ */ Z.jsx(
        hn.div,
        {
          initial: { opacity: 0, rotate: -90, scale: 0.5 },
          animate: { opacity: 1, rotate: 0, scale: 1 },
          exit: { opacity: 0, rotate: 90, scale: 0.5 },
          transition: { duration: 0.2 },
          children: /* @__PURE__ */ Z.jsx(J_, { className: "aw:h-5 aw:w-5 aw:text-foreground/60" })
        },
        "close-icon"
      ) : i.style.agentAvatar ? /* @__PURE__ */ Z.jsx(
        hn.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
          transition: { duration: 0.2 },
          className: "w-full h-full",
          children: /* @__PURE__ */ Z.jsx(
            "img",
            {
              src: i.style.agentAvatar,
              alt: i.agent.name,
              className: "object-cover",
              width: "100px",
              height: "100%"
            }
          )
        },
        "agent-avatar"
      ) : /* @__PURE__ */ Z.jsx(
        hn.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
          transition: { duration: 0.2 },
          children: /* @__PURE__ */ Z.jsx(O5, { className: "aw:h-6 aw:w-6 aw:text-white" })
        },
        "fallback-icon"
      ) })
    }
  ),
  !t && r === "idle" && /* @__PURE__ */ Z.jsx("div", { className: "aw:absolute aw:top-[-2px] aw:right-[-2px] aw:w-3 aw:h-3 aw:bg-green-500 aw:rounded-full aw:border-2 aw:border-white aw:pointer-events-none" })
] }), z7 = "5px", B7 = "0", V7 = "aw:w-[380px]", U7 = "aw:h-[608px]";
function j7({
  defaultOpen: t = !1,
  apiKey: n,
  baseUrl: r,
  widgetConfig: i,
  previewMode: o,
  debug: u
}) {
  var E;
  const [c, h] = W.useState(t), { status: d, start: p, stop: g, toggleMute: y, messages: v, sendMessage: w } = X9({
    apiKey: n,
    debug: !0,
    baseUrl: r
  }), x = () => {
    var N;
    c || h(!0), p((N = i.agent) == null ? void 0 : N.id);
  };
  W.useEffect(() => {
    (d === "connecting" || d === "active" || d === "reconnecting") && h(!0);
  }, [d, (E = i.agent) == null ? void 0 : E.id]);
  const S = () => {
    h(!c), c && d === "active" && g();
  }, T = () => i.launcher.position === "right" ? {
    right: `${i.launcher.sideSpacing}px`,
    bottom: `${i.launcher.bottomSpacing}px`,
    "align-items": "flex-end"
  } : {
    left: `${i.launcher.sideSpacing}px`,
    bottom: `${i.launcher.bottomSpacing}px`,
    "align-items": "flex-start"
  };
  return /* @__PURE__ */ Z.jsxs("div", { className: Tn("aw:z-[9999] aw:flex aw:flex-col aw:justify-end", o ? "aw:h-[663px]" : "aw:fixed"), style: {
    ...T()
  }, children: [
    /* @__PURE__ */ Z.jsx(zw, { children: c && /* @__PURE__ */ Z.jsx(
      hn.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        transition: { duration: 0.2, ease: "circOut" },
        className: Tn(
          "",
          V7,
          U7
        ),
        style: { marginBottom: z7, marginRight: B7 },
        children: /* @__PURE__ */ Z.jsx(
          O7,
          {
            callStatus: d,
            onStartCall: x,
            onEndCall: g,
            onToggleMute: () => {
              y();
            },
            widgetConfig: i,
            messages: v,
            sendMessage: w
          }
        )
      }
    ) }),
    /* @__PURE__ */ Z.jsx(
      L7,
      {
        isWidgetOpen: c,
        handleToggleWidget: S,
        widgetConfig: i,
        status: d
      }
    )
  ] });
}
const P7 = async (t, n, r) => {
  const i = r || "";
  if (!i)
    return console.error("Error: API base URL not provided and default base URL not set"), null;
  const o = `${i}/api/deployment/widget/by-agent`, u = await fetch(`${o}?agent_id=${t}&public_key=${n}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": n
    }
  });
  return u.ok ? await u.json() : (console.error("Error fetching widget config", u.status, u.statusText), null);
}, H7 = (t, n, r) => {
  const [i, o] = W.useState(null), [u, c] = W.useState(!0), [h, d] = W.useState(null);
  return W.useEffect(() => {
    (async () => {
      try {
        const g = await P7(t, n, r);
        o(g);
      } catch (g) {
        console.log("error", g), d(g);
      } finally {
        c(!1);
      }
    })();
  }, [t, n, r, o, c, d]), { config: i, isLoading: u, error: h };
};
function Ze(t, n) {
  let r = t.length;
  Array.isArray(t[0]) || (t = [t]), Array.isArray(n[0]) || (n = n.map((c) => [c]));
  let i = n[0].length, o = n[0].map((c, h) => n.map((d) => d[h])), u = t.map((c) => o.map((h) => {
    let d = 0;
    if (!Array.isArray(c)) {
      for (let p of h)
        d += c * p;
      return d;
    }
    for (let p = 0; p < c.length; p++)
      d += c[p] * (h[p] || 0);
    return d;
  }));
  return r === 1 && (u = u[0]), i === 1 ? u.map((c) => c[0]) : u;
}
function ho(t) {
  return Oa(t) === "string";
}
function Oa(t) {
  return (Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
}
function cu(t, { precision: n, unit: r }) {
  return Va(t) ? "none" : G5(t, n) + (r ?? "");
}
function Va(t) {
  return Number.isNaN(t) || t instanceof Number && (t == null ? void 0 : t.none);
}
function ot(t) {
  return Va(t) ? 0 : t;
}
function G5(t, n) {
  if (t === 0)
    return 0;
  let r = ~~t, i = 0;
  r && n && (i = ~~Math.log10(Math.abs(r)) + 1);
  const o = 10 ** (n - i);
  return Math.floor(t * o + 0.5) / o;
}
const q7 = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
};
function Y5(t) {
  if (!t)
    return;
  t = t.trim();
  const n = /^([a-z]+)\((.+?)\)$/i, r = /^-?[\d.]+$/, i = /%|deg|g?rad|turn$/, o = /\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;
  let u = t.match(n);
  if (u) {
    let c = [];
    return u[2].replace(o, (h, d) => {
      let p = d.match(i), g = d;
      if (p) {
        let y = p[0], v = g.slice(0, -y.length);
        y === "%" ? (g = new Number(v / 100), g.type = "<percentage>") : (g = new Number(v * q7[y]), g.type = "<angle>", g.unit = y);
      } else r.test(g) ? (g = new Number(g), g.type = "<number>") : g === "none" && (g = new Number(NaN), g.none = !0);
      h.startsWith("/") && (g = g instanceof Number ? g : new Number(g), g.alpha = !0), typeof g == "object" && g instanceof Number && (g.raw = d), c.push(g);
    }), {
      name: u[1].toLowerCase(),
      rawName: u[1],
      rawArgs: u[2],
      // An argument could be (as of css-color-4):
      // a number, percentage, degrees (hue), ident (in color())
      args: c
    };
  }
}
function X5(t) {
  return t[t.length - 1];
}
function to(t, n, r) {
  return isNaN(t) ? n : isNaN(n) ? t : t + (n - t) * r;
}
function I5(t, n, r) {
  return (r - t) / (n - t);
}
function N0(t, n, r) {
  return to(n[0], n[1], I5(t[0], t[1], r));
}
function Z5(t) {
  return t.map((n) => n.split("|").map((r) => {
    r = r.trim();
    let i = r.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);
    if (i) {
      let o = new String(i[1]);
      return o.range = [+i[2], +i[3]], o;
    }
    return r;
  }));
}
function W5(t, n, r) {
  return Math.max(Math.min(r, n), t);
}
function _u(t, n) {
  return Math.sign(t) === Math.sign(n) ? t : -t;
}
function Dn(t, n) {
  return _u(Math.abs(t) ** n, t);
}
function D0(t, n) {
  return n === 0 ? 0 : t / n;
}
function K5(t, n, r = 0, i = t.length) {
  for (; r < i; ) {
    const o = r + i >> 1;
    t[o] < n ? r = o + 1 : i = o;
  }
  return r;
}
var G7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  bisectLeft: K5,
  clamp: W5,
  copySign: _u,
  interpolate: to,
  interpolateInv: I5,
  isNone: Va,
  isString: ho,
  last: X5,
  mapRange: N0,
  multiplyMatrices: Ze,
  parseCoordGrammar: Z5,
  parseFunction: Y5,
  serializeNumber: cu,
  skipNone: ot,
  spow: Dn,
  toPrecision: G5,
  type: Oa,
  zdiv: D0
});
class Y7 {
  add(n, r, i) {
    if (typeof arguments[0] != "string") {
      for (var n in arguments[0])
        this.add(n, arguments[0][n], arguments[1]);
      return;
    }
    (Array.isArray(n) ? n : [n]).forEach(function(o) {
      this[o] = this[o] || [], r && this[o][i ? "unshift" : "push"](r);
    }, this);
  }
  run(n, r) {
    this[n] = this[n] || [], this[n].forEach(function(i) {
      i.call(r && r.context ? r.context : r, r);
    });
  }
}
const Ua = new Y7();
var Pb, Hb, qb, $t = {
  gamut_mapping: "css",
  precision: 5,
  deltaE: "76",
  // Default deltaE method
  verbose: ((qb = (Hb = (Pb = globalThis == null ? void 0 : globalThis.process) == null ? void 0 : Pb.env) == null ? void 0 : Hb.NODE_ENV) == null ? void 0 : qb.toLowerCase()) !== "test",
  warn: function(n) {
    var r, i;
    this.verbose && ((i = (r = globalThis == null ? void 0 : globalThis.console) == null ? void 0 : r.warn) == null || i.call(r, n));
  }
};
const Dt = {
  // for compatibility, the four-digit chromaticity-derived ones everyone else uses
  D50: [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585],
  D65: [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329]
};
function Ah(t) {
  return Array.isArray(t) ? t : Dt[t];
}
function fu(t, n, r, i = {}) {
  if (t = Ah(t), n = Ah(n), !t || !n)
    throw new TypeError(`Missing white point to convert ${t ? "" : "from"}${!t && !n ? "/" : ""}${n ? "" : "to"}`);
  if (t === n)
    return r;
  let o = { W1: t, W2: n, XYZ: r, options: i };
  if (Ua.run("chromatic-adaptation-start", o), o.M || (o.W1 === Dt.D65 && o.W2 === Dt.D50 ? o.M = [
    [1.0479297925449969, 0.022946870601609652, -0.05019226628920524],
    [0.02962780877005599, 0.9904344267538799, -0.017073799063418826],
    [-0.009243040646204504, 0.015055191490298152, 0.7518742814281371]
  ] : o.W1 === Dt.D50 && o.W2 === Dt.D65 && (o.M = [
    [0.955473421488075, -0.02309845494876471, 0.06325924320057072],
    [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
    [0.012314014864481998, -0.020507649298898964, 1.330365926242124]
  ])), Ua.run("chromatic-adaptation-end", o), o.M)
    return Ze(o.M, o.XYZ);
  throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
}
const X7 = /* @__PURE__ */ new Set(["<number>", "<percentage>", "<angle>"]);
function Pv(t, n, r, i) {
  return Object.entries(t.coords).map(([u, c], h) => {
    let d = n.coordGrammar[h], p = i[h], g = p == null ? void 0 : p.type, y;
    if (p.none ? y = d.find((x) => X7.has(x)) : y = d.find((x) => x == g), !y) {
      let x = c.name || u;
      throw new TypeError(`${g ?? p.raw} not allowed for ${x} in ${r}()`);
    }
    let v = y.range;
    g === "<percentage>" && (v || (v = [0, 1]));
    let w = c.range || c.refRange;
    return v && w && (i[h] = N0(v, w, i[h])), y;
  });
}
function Q5(t, { meta: n } = {}) {
  var i, o, u, c;
  let r = { str: (i = String(t)) == null ? void 0 : i.trim() };
  if (Ua.run("parse-start", r), r.color)
    return r.color;
  if (r.parsed = Y5(r.str), r.parsed) {
    let h = r.parsed.name;
    if (h === "color") {
      let d = r.parsed.args.shift(), p = d.startsWith("--") ? d.substring(2) : `--${d}`, g = [d, p], y = r.parsed.rawArgs.indexOf("/") > 0 ? r.parsed.args.pop() : 1;
      for (let x of fe.all) {
        let S = x.getFormat("color");
        if (S && (g.includes(S.id) || (o = S.ids) != null && o.filter((T) => g.includes(T)).length)) {
          const T = Object.keys(x.coords).map((N, C) => r.parsed.args[C] || 0);
          let E;
          return S.coordGrammar && (E = Pv(x, S, "color", T)), n && Object.assign(n, { formatId: "color", types: E }), S.id.startsWith("--") && !d.startsWith("--") && $t.warn(`${x.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${S.id}) instead of color(${d}).`), d.startsWith("--") && !S.id.startsWith("--") && $t.warn(`${x.name} is a standard space and supported in the CSS spec. Use color(${S.id}) instead of prefixed color(${d}).`), { spaceId: x.id, coords: T, alpha: y };
        }
      }
      let v = "", w = d in fe.registry ? d : p;
      if (w in fe.registry) {
        let x = (c = (u = fe.registry[w].formats) == null ? void 0 : u.color) == null ? void 0 : c.id;
        x && (v = `Did you mean color(${x})?`);
      }
      throw new TypeError(`Cannot parse color(${d}). ` + (v || "Missing a plugin?"));
    } else
      for (let d of fe.all) {
        let p = d.getFormat(h);
        if (p && p.type === "function") {
          let g = 1;
          (p.lastAlpha || X5(r.parsed.args).alpha) && (g = r.parsed.args.pop());
          let y = r.parsed.args, v;
          return p.coordGrammar && (v = Pv(d, p, h, y)), n && Object.assign(n, { formatId: p.name, types: v }), {
            spaceId: d.id,
            coords: y,
            alpha: g
          };
        }
      }
  } else
    for (let h of fe.all)
      for (let d in h.formats) {
        let p = h.formats[d];
        if (p.type !== "custom" || p.test && !p.test(r.str))
          continue;
        let g = p.parse(r.str);
        if (g)
          return g.alpha ?? (g.alpha = 1), n && (n.formatId = d), g;
      }
  throw new TypeError(`Could not parse ${t} as a color. Missing a plugin?`);
}
function Se(t) {
  if (Array.isArray(t))
    return t.map(Se);
  if (!t)
    throw new TypeError("Empty color reference");
  ho(t) && (t = Q5(t));
  let n = t.space || t.spaceId;
  return n instanceof fe || (t.space = fe.get(n)), t.alpha === void 0 && (t.alpha = 1), t;
}
const I7 = 75e-6, Ut = class Ut {
  constructor(n) {
    var o;
    this.id = n.id, this.name = n.name, this.base = n.base ? Ut.get(n.base) : null, this.aliases = n.aliases, this.base && (this.fromBase = n.fromBase, this.toBase = n.toBase);
    let r = n.coords ?? this.base.coords;
    for (let u in r)
      "name" in r[u] || (r[u].name = u);
    this.coords = r;
    let i = n.white ?? this.base.white ?? "D65";
    this.white = Ah(i), this.formats = n.formats ?? {};
    for (let u in this.formats) {
      let c = this.formats[u];
      c.type || (c.type = "function"), c.name || (c.name = u);
    }
    (o = this.formats.color) != null && o.id || (this.formats.color = {
      ...this.formats.color ?? {},
      id: n.cssId || this.id
    }), n.gamutSpace ? this.gamutSpace = n.gamutSpace === "self" ? this : Ut.get(n.gamutSpace) : this.isPolar ? this.gamutSpace = this.base : this.gamutSpace = this, this.gamutSpace.isUnbounded && (this.inGamut = (u, c) => !0), this.referred = n.referred, Object.defineProperty(this, "path", {
      value: Z7(this).reverse(),
      writable: !1,
      enumerable: !0,
      configurable: !0
    }), Ua.run("colorspace-init-end", this);
  }
  inGamut(n, { epsilon: r = I7 } = {}) {
    if (!this.equals(this.gamutSpace))
      return n = this.to(this.gamutSpace, n), this.gamutSpace.inGamut(n, { epsilon: r });
    let i = Object.values(this.coords);
    return n.every((o, u) => {
      let c = i[u];
      if (c.type !== "angle" && c.range) {
        if (Number.isNaN(o))
          return !0;
        let [h, d] = c.range;
        return (h === void 0 || o >= h - r) && (d === void 0 || o <= d + r);
      }
      return !0;
    });
  }
  get isUnbounded() {
    return Object.values(this.coords).every((n) => !("range" in n));
  }
  get cssId() {
    var n, r;
    return ((r = (n = this.formats) == null ? void 0 : n.color) == null ? void 0 : r.id) || this.id;
  }
  get isPolar() {
    for (let n in this.coords)
      if (this.coords[n].type === "angle")
        return !0;
    return !1;
  }
  getFormat(n) {
    if (typeof n == "object")
      return n = Hv(n, this), n;
    let r;
    return n === "default" ? r = Object.values(this.formats)[0] : r = this.formats[n], r ? (r = Hv(r, this), r) : null;
  }
  /**
   * Check if this color space is the same as another color space reference.
   * Allows proxying color space objects and comparing color spaces with ids.
   * @param {string | ColorSpace} space ColorSpace object or id to compare to
   * @returns {boolean}
   */
  equals(n) {
    return n ? this === n || this.id === n || this.id === n.id : !1;
  }
  to(n, r) {
    if (arguments.length === 1) {
      const h = Se(n);
      [n, r] = [h.space, h.coords];
    }
    if (n = Ut.get(n), this.equals(n))
      return r;
    r = r.map((h) => Number.isNaN(h) ? 0 : h);
    let i = this.path, o = n.path, u, c;
    for (let h = 0; h < i.length && i[h].equals(o[h]); h++)
      u = i[h], c = h;
    if (!u)
      throw new Error(`Cannot convert between color spaces ${this} and ${n}: no connection space was found`);
    for (let h = i.length - 1; h > c; h--)
      r = i[h].toBase(r);
    for (let h = c + 1; h < o.length; h++)
      r = o[h].fromBase(r);
    return r;
  }
  from(n, r) {
    if (arguments.length === 1) {
      const i = Se(n);
      [n, r] = [i.space, i.coords];
    }
    return n = Ut.get(n), n.to(this, r);
  }
  toString() {
    return `${this.name} (${this.id})`;
  }
  getMinCoords() {
    let n = [];
    for (let r in this.coords) {
      let i = this.coords[r], o = i.range || i.refRange;
      n.push((o == null ? void 0 : o.min) ?? 0);
    }
    return n;
  }
  // Returns array of unique color spaces
  static get all() {
    return [...new Set(Object.values(Ut.registry))];
  }
  static register(n, r) {
    if (arguments.length === 1 && (r = arguments[0], n = r.id), r = this.get(r), this.registry[n] && this.registry[n] !== r)
      throw new Error(`Duplicate color space registration: '${n}'`);
    if (this.registry[n] = r, arguments.length === 1 && r.aliases)
      for (let i of r.aliases)
        this.register(i, r);
    return r;
  }
  /**
   * Lookup ColorSpace object by name
   * @param {ColorSpace | string} name
   */
  static get(n, ...r) {
    if (!n || n instanceof Ut)
      return n;
    if (Oa(n) === "string") {
      let o = Ut.registry[n.toLowerCase()];
      if (!o)
        throw new TypeError(`No color space found with id = "${n}"`);
      return o;
    }
    if (r.length)
      return Ut.get(...r);
    throw new TypeError(`${n} is not a valid color space`);
  }
  /**
   * Get metadata about a coordinate of a color space
   *
   * @static
   * @param {Array | string} ref
   * @param {ColorSpace | string} [workingSpace]
   * @return {Object}
   */
  static resolveCoord(n, r) {
    var d;
    let i = Oa(n), o, u;
    if (i === "string" ? n.includes(".") ? [o, u] = n.split(".") : [o, u] = [, n] : Array.isArray(n) ? [o, u] = n : (o = n.space, u = n.coordId), o = Ut.get(o), o || (o = r), !o)
      throw new TypeError(`Cannot resolve coordinate reference ${n}: No color space specified and relative references are not allowed here`);
    if (i = Oa(u), i === "number" || i === "string" && u >= 0) {
      let p = Object.entries(o.coords)[u];
      if (p)
        return { space: o, id: p[0], index: u, ...p[1] };
    }
    o = Ut.get(o);
    let c = u.toLowerCase(), h = 0;
    for (let p in o.coords) {
      let g = o.coords[p];
      if (p.toLowerCase() === c || ((d = g.name) == null ? void 0 : d.toLowerCase()) === c)
        return { space: o, id: p, index: h, ...g };
      h++;
    }
    throw new TypeError(`No "${u}" coordinate found in ${o.name}. Its coordinates are: ${Object.keys(o.coords).join(", ")}`);
  }
};
Xf(Ut, "registry", {}), Xf(Ut, "DEFAULT_FORMAT", {
  type: "functions",
  name: "color"
});
let fe = Ut;
function Z7(t) {
  let n = [t];
  for (let r = t; r = r.base; )
    n.push(r);
  return n;
}
function Hv(t, { coords: n } = {}) {
  if (t.coords && !t.coordGrammar) {
    t.type || (t.type = "function"), t.name || (t.name = "color"), t.coordGrammar = Z5(t.coords);
    let r = Object.entries(n).map(([i, o], u) => {
      let c = t.coordGrammar[u][0], h = o.range || o.refRange, d = c.range, p = "";
      return c == "<percentage>" ? (d = [0, 100], p = "%") : c == "<angle>" && (p = "deg"), { fromRange: h, toRange: d, suffix: p };
    });
    t.serializeCoords = (i, o) => i.map((u, c) => {
      let { fromRange: h, toRange: d, suffix: p } = r[c];
      return h && d && (u = N0(h, d, u)), u = cu(u, { precision: o, unit: p }), u;
    });
  }
  return t;
}
var At = new fe({
  id: "xyz-d65",
  name: "XYZ D65",
  coords: {
    x: { name: "X" },
    y: { name: "Y" },
    z: { name: "Z" }
  },
  white: "D65",
  formats: {
    color: {
      ids: ["xyz-d65", "xyz"]
    }
  },
  aliases: ["xyz"]
});
class Pt extends fe {
  /**
   * Creates a new RGB ColorSpace.
   * If coords are not specified, they will use the default RGB coords.
   * Instead of `fromBase()` and `toBase()` functions,
   * you can specify to/from XYZ matrices and have `toBase()` and `fromBase()` automatically generated.
   * @param {*} options - Same options as {@link ColorSpace} plus:
   * @param {number[][]} options.toXYZ_M - Matrix to convert to XYZ
   * @param {number[][]} options.fromXYZ_M - Matrix to convert from XYZ
   */
  constructor(n) {
    n.coords || (n.coords = {
      r: {
        range: [0, 1],
        name: "Red"
      },
      g: {
        range: [0, 1],
        name: "Green"
      },
      b: {
        range: [0, 1],
        name: "Blue"
      }
    }), n.base || (n.base = At), n.toXYZ_M && n.fromXYZ_M && (n.toBase ?? (n.toBase = (r) => {
      let i = Ze(n.toXYZ_M, r);
      return this.white !== this.base.white && (i = fu(this.white, this.base.white, i)), i;
    }), n.fromBase ?? (n.fromBase = (r) => (r = fu(this.base.white, this.white, r), Ze(n.fromXYZ_M, r)))), n.referred ?? (n.referred = "display"), super(n);
  }
}
function po(t, n) {
  return t = Se(t), !n || t.space.equals(n) ? t.coords.slice() : (n = fe.get(n), n.from(t));
}
function Qt(t, n) {
  t = Se(t);
  let { space: r, index: i } = fe.resolveCoord(n, t.space);
  return po(t, r)[i];
}
function O0(t, n, r) {
  return t = Se(t), n = fe.get(n), t.coords = n.to(t.space, r), t;
}
O0.returns = "color";
function aa(t, n, r) {
  if (t = Se(t), arguments.length === 2 && Oa(arguments[1]) === "object") {
    let i = arguments[1];
    for (let o in i)
      aa(t, o, i[o]);
  } else {
    typeof r == "function" && (r = r(Qt(t, n)));
    let { space: i, index: o } = fe.resolveCoord(n, t.space), u = po(t, i);
    u[o] = r, O0(t, i, u);
  }
  return t;
}
aa.returns = "color";
var L0 = new fe({
  id: "xyz-d50",
  name: "XYZ D50",
  white: "D50",
  base: At,
  fromBase: (t) => fu(At.white, "D50", t),
  toBase: (t) => fu("D50", At.white, t)
});
const W7 = 216 / 24389, qv = 24 / 116, Ul = 24389 / 27;
let Dd = Dt.D50;
var Ft = new fe({
  id: "lab",
  name: "Lab",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D50, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: Dd,
  base: L0,
  // Convert D50-adapted XYX to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(t) {
    let r = t.map((i, o) => i / Dd[o]).map((i) => i > W7 ? Math.cbrt(i) : (Ul * i + 16) / 116);
    return [
      116 * r[1] - 16,
      // L
      500 * (r[0] - r[1]),
      // a
      200 * (r[1] - r[2])
      // b
    ];
  },
  // Convert Lab to D50-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(t) {
    let n = [];
    return n[1] = (t[0] + 16) / 116, n[0] = t[1] / 500 + n[1], n[2] = n[1] - t[2] / 200, [
      n[0] > qv ? Math.pow(n[0], 3) : (116 * n[0] - 16) / Ul,
      t[0] > 8 ? Math.pow((t[0] + 16) / 116, 3) : t[0] / Ul,
      n[2] > qv ? Math.pow(n[2], 3) : (116 * n[2] - 16) / Ul
    ].map((i, o) => i * Dd[o]);
  },
  formats: {
    lab: {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function Vn(t) {
  return (t % 360 + 360) % 360;
}
function K7(t, n) {
  if (t === "raw")
    return n;
  let [r, i] = n.map(Vn), o = i - r;
  return t === "increasing" ? o < 0 && (i += 360) : t === "decreasing" ? o > 0 && (r += 360) : t === "longer" ? -180 < o && o < 180 && (o > 0 ? r += 360 : i += 360) : t === "shorter" && (o > 180 ? r += 360 : o < -180 && (i += 360)), [r, i];
}
var no = new fe({
  id: "lch",
  name: "LCH",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 150],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Ft,
  fromBase(t) {
    let [n, r, i] = t, o;
    const u = 0.02;
    return Math.abs(r) < u && Math.abs(i) < u ? o = NaN : o = Math.atan2(i, r) * 180 / Math.PI, [
      n,
      // L is still L
      Math.sqrt(r ** 2 + i ** 2),
      // Chroma
      Vn(o)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(t) {
    let [n, r, i] = t;
    return r < 0 && (r = 0), isNaN(i) && (i = 0), [
      n,
      // L is still L
      r * Math.cos(i * Math.PI / 180),
      // a
      r * Math.sin(i * Math.PI / 180)
      // b
    ];
  },
  formats: {
    lch: {
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
const Gv = 25 ** 7, du = Math.PI, Yv = 180 / du, ci = du / 180;
function Xv(t) {
  const n = t * t;
  return n * n * n * t;
}
function F5(t, n, { kL: r = 1, kC: i = 1, kH: o = 1 } = {}) {
  [t, n] = Se([t, n]);
  let [u, c, h] = Ft.from(t), d = no.from(Ft, [u, c, h])[1], [p, g, y] = Ft.from(n), v = no.from(Ft, [p, g, y])[1];
  d < 0 && (d = 0), v < 0 && (v = 0);
  let w = (d + v) / 2, x = Xv(w), S = 0.5 * (1 - Math.sqrt(x / (x + Gv))), T = (1 + S) * c, E = (1 + S) * g, N = Math.sqrt(T ** 2 + h ** 2), C = Math.sqrt(E ** 2 + y ** 2), X = T === 0 && h === 0 ? 0 : Math.atan2(h, T), D = E === 0 && y === 0 ? 0 : Math.atan2(y, E);
  X < 0 && (X += 2 * du), D < 0 && (D += 2 * du), X *= Yv, D *= Yv;
  let U = p - u, P = C - N, _ = D - X, F = X + D, ae = Math.abs(_), ee;
  N * C === 0 ? ee = 0 : ae <= 180 ? ee = _ : _ > 180 ? ee = _ - 360 : _ < -180 ? ee = _ + 360 : $t.warn("the unthinkable has happened");
  let ne = 2 * Math.sqrt(C * N) * Math.sin(ee * ci / 2), he = (u + p) / 2, ce = (N + C) / 2, se = Xv(ce), k;
  N * C === 0 ? k = F : ae <= 180 ? k = F / 2 : F < 360 ? k = (F + 360) / 2 : k = (F - 360) / 2;
  let O = (he - 50) ** 2, z = 1 + 0.015 * O / Math.sqrt(20 + O), q = 1 + 0.045 * ce, M = 1;
  M -= 0.17 * Math.cos((k - 30) * ci), M += 0.24 * Math.cos(2 * k * ci), M += 0.32 * Math.cos((3 * k + 6) * ci), M -= 0.2 * Math.cos((4 * k - 63) * ci);
  let B = 1 + 0.015 * ce * M, G = 30 * Math.exp(-1 * ((k - 275) / 25) ** 2), J = 2 * Math.sqrt(se / (se + Gv)), te = -1 * Math.sin(2 * G * ci) * J, pe = (U / (r * z)) ** 2;
  return pe += (P / (i * q)) ** 2, pe += (ne / (o * B)) ** 2, pe += te * (P / (i * q)) * (ne / (o * B)), Math.sqrt(pe);
}
const Q7 = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
], F7 = [
  [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
  [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
  [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
], $7 = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
], J7 = [
  [1, 0.3963377773761749, 0.2158037573099136],
  [1, -0.1055613458156586, -0.0638541728258133],
  [1, -0.0894841775298119, -1.2914855480194092]
];
var Ai = new fe({
  id: "oklab",
  name: "Oklab",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    a: {
      refRange: [-0.4, 0.4]
    },
    b: {
      refRange: [-0.4, 0.4]
    }
  },
  // Note that XYZ is relative to D65
  white: "D65",
  base: At,
  fromBase(t) {
    let r = Ze(Q7, t).map((i) => Math.cbrt(i));
    return Ze($7, r);
  },
  toBase(t) {
    let r = Ze(J7, t).map((i) => i ** 3);
    return Ze(F7, r);
  },
  formats: {
    oklab: {
      coords: ["<percentage> | <number>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function Th(t, n) {
  [t, n] = Se([t, n]);
  let [r, i, o] = Ai.from(t), [u, c, h] = Ai.from(n), d = r - u, p = i - c, g = o - h;
  return Math.sqrt(d ** 2 + p ** 2 + g ** 2);
}
const eR = 75e-6;
function vr(t, n, { epsilon: r = eR } = {}) {
  t = Se(t), n || (n = t.space), n = fe.get(n);
  let i = t.coords;
  return n !== t.space && (i = n.from(t)), n.inGamut(i, { epsilon: r });
}
function Ti(t) {
  return {
    space: t.space,
    coords: t.coords.slice(),
    alpha: t.alpha
  };
}
function $5(t, n, r = "lab") {
  r = fe.get(r);
  let i = r.from(t), o = r.from(n);
  return Math.sqrt(i.reduce((u, c, h) => {
    let d = o[h];
    return isNaN(c) || isNaN(d) ? u : u + (d - c) ** 2;
  }, 0));
}
function tR(t, n) {
  return $5(t, n, "lab");
}
const nR = Math.PI, Iv = nR / 180;
function aR(t, n, { l: r = 2, c: i = 1 } = {}) {
  [t, n] = Se([t, n]);
  let [o, u, c] = Ft.from(t), [, h, d] = no.from(Ft, [o, u, c]), [p, g, y] = Ft.from(n), v = no.from(Ft, [p, g, y])[1];
  h < 0 && (h = 0), v < 0 && (v = 0);
  let w = o - p, x = h - v, S = u - g, T = c - y, E = S ** 2 + T ** 2 - x ** 2, N = 0.511;
  o >= 16 && (N = 0.040975 * o / (1 + 0.01765 * o));
  let C = 0.0638 * h / (1 + 0.0131 * h) + 0.638, X;
  Number.isNaN(d) && (d = 0), d >= 164 && d <= 345 ? X = 0.56 + Math.abs(0.2 * Math.cos((d + 168) * Iv)) : X = 0.36 + Math.abs(0.4 * Math.cos((d + 35) * Iv));
  let D = Math.pow(h, 4), U = Math.sqrt(D / (D + 1900)), P = C * (U * X + 1 - U), _ = (w / (r * N)) ** 2;
  return _ += (x / (i * C)) ** 2, _ += E / P ** 2, Math.sqrt(_);
}
const Zv = 203;
var z0 = new fe({
  // Absolute CIE XYZ, with a D65 whitepoint,
  // as used in most HDR colorspaces as a starting point.
  // SDR spaces are converted per BT.2048
  // so that diffuse, media white is 203 cd/m²
  id: "xyz-abs-d65",
  cssId: "--xyz-abs-d65",
  name: "Absolute XYZ D65",
  coords: {
    x: {
      refRange: [0, 9504.7],
      name: "Xa"
    },
    y: {
      refRange: [0, 1e4],
      name: "Ya"
    },
    z: {
      refRange: [0, 10888.3],
      name: "Za"
    }
  },
  base: At,
  fromBase(t) {
    return t.map((n) => Math.max(n * Zv, 0));
  },
  toBase(t) {
    return t.map((n) => Math.max(n / Zv, 0));
  }
});
const jl = 1.15, Pl = 0.66, Wv = 2610 / 2 ** 14, rR = 2 ** 14 / 2610, Kv = 3424 / 2 ** 12, Qv = 2413 / 2 ** 7, Fv = 2392 / 2 ** 7, iR = 1.7 * 2523 / 2 ** 5, $v = 2 ** 5 / (1.7 * 2523), Hl = -0.56, Od = 16295499532821565e-27, sR = [
  [0.41478972, 0.579999, 0.014648],
  [-0.20151, 1.120649, 0.0531008],
  [-0.0166008, 0.2648, 0.6684799]
], oR = [
  [1.9242264357876067, -1.0047923125953657, 0.037651404030618],
  [0.35031676209499907, 0.7264811939316552, -0.06538442294808501],
  [-0.09098281098284752, -0.3127282905230739, 1.5227665613052603]
], lR = [
  [0.5, 0.5, 0],
  [3.524, -4.066708, 0.542708],
  [0.199076, 1.096799, -1.295875]
], uR = [
  [1, 0.1386050432715393, 0.05804731615611886],
  [0.9999999999999999, -0.1386050432715393, -0.05804731615611886],
  [0.9999999999999998, -0.09601924202631895, -0.8118918960560388]
];
var J5 = new fe({
  id: "jzazbz",
  name: "Jzazbz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    az: {
      refRange: [-0.5, 0.5]
    },
    bz: {
      refRange: [-0.5, 0.5]
    }
  },
  base: z0,
  fromBase(t) {
    let [n, r, i] = t, o = jl * n - (jl - 1) * i, u = Pl * r - (Pl - 1) * n, h = Ze(sR, [o, u, i]).map(function(v) {
      let w = Kv + Qv * (v / 1e4) ** Wv, x = 1 + Fv * (v / 1e4) ** Wv;
      return (w / x) ** iR;
    }), [d, p, g] = Ze(lR, h);
    return [(1 + Hl) * d / (1 + Hl * d) - Od, p, g];
  },
  toBase(t) {
    let [n, r, i] = t, o = (n + Od) / (1 + Hl - Hl * (n + Od)), c = Ze(uR, [o, r, i]).map(function(v) {
      let w = Kv - v ** $v, x = Fv * v ** $v - Qv;
      return 1e4 * (w / x) ** rR;
    }), [h, d, p] = Ze(oR, c), g = (h + (jl - 1) * p) / jl, y = (d + (Pl - 1) * g) / Pl;
    return [g, y, p];
  },
  formats: {
    // https://drafts.csswg.org/css-color-hdr/#Jzazbz
    color: {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
}), Mh = new fe({
  id: "jzczhz",
  name: "JzCzHz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    cz: {
      refRange: [0, 1],
      name: "Chroma"
    },
    hz: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: J5,
  fromBase(t) {
    let [n, r, i] = t, o;
    const u = 2e-4;
    return Math.abs(r) < u && Math.abs(i) < u ? o = NaN : o = Math.atan2(i, r) * 180 / Math.PI, [
      n,
      // Jz is still Jz
      Math.sqrt(r ** 2 + i ** 2),
      // Chroma
      Vn(o)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(t) {
    return [
      t[0],
      // Jz is still Jz
      t[1] * Math.cos(t[2] * Math.PI / 180),
      // az
      t[1] * Math.sin(t[2] * Math.PI / 180)
      // bz
    ];
  }
});
function cR(t, n) {
  [t, n] = Se([t, n]);
  let [r, i, o] = Mh.from(t), [u, c, h] = Mh.from(n), d = r - u, p = i - c;
  Number.isNaN(o) && Number.isNaN(h) ? (o = 0, h = 0) : Number.isNaN(o) ? o = h : Number.isNaN(h) && (h = o);
  let g = o - h, y = 2 * Math.sqrt(i * c) * Math.sin(g / 2 * (Math.PI / 180));
  return Math.sqrt(d ** 2 + p ** 2 + y ** 2);
}
const ex = 3424 / 4096, tx = 2413 / 128, nx = 2392 / 128, Jv = 2610 / 16384, fR = 2523 / 32, dR = 16384 / 2610, eb = 32 / 2523, hR = [
  [0.3592832590121217, 0.6976051147779502, -0.035891593232029],
  [-0.1920808463704993, 1.100476797037432, 0.0753748658519118],
  [0.0070797844607479, 0.0748396662186362, 0.8433265453898765]
], pR = [
  [2048 / 4096, 2048 / 4096, 0],
  [6610 / 4096, -13613 / 4096, 7003 / 4096],
  [17933 / 4096, -17390 / 4096, -543 / 4096]
], mR = [
  [0.9999999999999998, 0.0086090370379328, 0.111029625003026],
  [0.9999999999999998, -0.0086090370379328, -0.1110296250030259],
  [0.9999999999999998, 0.5600313357106791, -0.3206271749873188]
], gR = [
  [2.0701522183894223, -1.3263473389671563, 0.2066510476294053],
  [0.3647385209748072, 0.6805660249472273, -0.0453045459220347],
  [-0.0497472075358123, -0.0492609666966131, 1.1880659249923042]
];
var Eh = new fe({
  id: "ictcp",
  name: "ICTCP",
  // From BT.2100-2 page 7:
  // During production, signal values are expected to exceed the
  // range E′ = [0.0 : 1.0]. This provides processing headroom and avoids
  // signal degradation during cascaded processing. Such values of E′,
  // below 0.0 or exceeding 1.0, should not be clipped during production
  // and exchange.
  // Values below 0.0 should not be clipped in reference displays (even
  // though they represent “negative” light) to allow the black level of
  // the signal (LB) to be properly set using test signals known as “PLUGE”
  coords: {
    i: {
      refRange: [0, 1],
      // Constant luminance,
      name: "I"
    },
    ct: {
      refRange: [-0.5, 0.5],
      // Full BT.2020 gamut in range [-0.5, 0.5]
      name: "CT"
    },
    cp: {
      refRange: [-0.5, 0.5],
      name: "CP"
    }
  },
  base: z0,
  fromBase(t) {
    let n = Ze(hR, t);
    return yR(n);
  },
  toBase(t) {
    let n = vR(t);
    return Ze(gR, n);
  }
});
function yR(t) {
  let n = t.map(function(r) {
    let i = ex + tx * (r / 1e4) ** Jv, o = 1 + nx * (r / 1e4) ** Jv;
    return (i / o) ** fR;
  });
  return Ze(pR, n);
}
function vR(t) {
  return Ze(mR, t).map(function(i) {
    let o = Math.max(i ** eb - ex, 0), u = tx - nx * i ** eb;
    return 1e4 * (o / u) ** dR;
  });
}
function bR(t, n) {
  [t, n] = Se([t, n]);
  let [r, i, o] = Eh.from(t), [u, c, h] = Eh.from(n);
  return 720 * Math.sqrt((r - u) ** 2 + 0.25 * (i - c) ** 2 + (o - h) ** 2);
}
const wR = Dt.D65, ax = 0.42, tb = 1 / ax, Ld = 2 * Math.PI, rx = [
  [0.401288, 0.650173, -0.051461],
  [-0.250268, 1.204414, 0.045854],
  [-2079e-6, 0.048952, 0.953127]
], xR = [
  [1.8620678550872327, -1.0112546305316843, 0.14918677544445175],
  [0.38752654323613717, 0.6214474419314753, -0.008973985167612518],
  [-0.015841498849333856, -0.03412293802851557, 1.0499644368778496]
], SR = [
  [460, 451, 288],
  [460, -891, -261],
  [460, -220, -6300]
], AR = {
  dark: [0.8, 0.525, 0.8],
  dim: [0.9, 0.59, 0.9],
  average: [1, 0.69, 1]
}, cr = {
  // Red, Yellow, Green, Blue, Red
  h: [20.14, 90, 164.25, 237.53, 380.14],
  e: [0.8, 0.7, 1, 1.2, 0.8],
  H: [0, 100, 200, 300, 400]
}, TR = 180 / Math.PI, nb = Math.PI / 180;
function ix(t, n) {
  return t.map((i) => {
    const o = Dn(n * Math.abs(i) * 0.01, ax);
    return 400 * _u(o, i) / (o + 27.13);
  });
}
function MR(t, n) {
  const r = 100 / n * 27.13 ** tb;
  return t.map((i) => {
    const o = Math.abs(i);
    return _u(r * Dn(o / (400 - o), tb), i);
  });
}
function ER(t) {
  let n = Vn(t);
  n <= cr.h[0] && (n += 360);
  const r = K5(cr.h, n) - 1, [i, o] = cr.h.slice(r, r + 2), [u, c] = cr.e.slice(r, r + 2), h = cr.H[r], d = (n - i) / u;
  return h + 100 * d / (d + (o - n) / c);
}
function CR(t) {
  let n = (t % 400 + 400) % 400;
  const r = Math.floor(0.01 * n);
  n = n % 100;
  const [i, o] = cr.h.slice(r, r + 2), [u, c] = cr.e.slice(r, r + 2);
  return Vn(
    (n * (c * i - u * o) - 100 * i * c) / (n * (c - u) - 100 * c)
  );
}
function sx(t, n, r, i, o) {
  const u = {};
  u.discounting = o, u.refWhite = t, u.surround = i;
  const c = t.map((S) => S * 100);
  u.la = n, u.yb = r;
  const h = c[1], d = Ze(rx, c);
  i = AR[u.surround];
  const p = i[0];
  u.c = i[1], u.nc = i[2];
  const y = (1 / (5 * u.la + 1)) ** 4;
  u.fl = y * u.la + 0.1 * (1 - y) * (1 - y) * Math.cbrt(5 * u.la), u.flRoot = u.fl ** 0.25, u.n = u.yb / h, u.z = 1.48 + Math.sqrt(u.n), u.nbb = 0.725 * u.n ** -0.2, u.ncb = u.nbb;
  const v = Math.max(
    Math.min(p * (1 - 1 / 3.6 * Math.exp((-u.la - 42) / 92)), 1),
    0
  );
  u.dRgb = d.map((S) => to(1, h / S, v)), u.dRgbInv = u.dRgb.map((S) => 1 / S);
  const w = d.map((S, T) => S * u.dRgb[T]), x = ix(w, u.fl);
  return u.aW = u.nbb * (2 * x[0] + x[1] + 0.05 * x[2]), u;
}
const ab = sx(
  wR,
  64 / Math.PI * 0.2,
  20,
  "average",
  !1
);
function Ch(t, n) {
  if (!(t.J !== void 0 ^ t.Q !== void 0))
    throw new Error("Conversion requires one and only one: 'J' or 'Q'");
  if (!(t.C !== void 0 ^ t.M !== void 0 ^ t.s !== void 0))
    throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");
  if (!(t.h !== void 0 ^ t.H !== void 0))
    throw new Error("Conversion requires one and only one: 'h' or 'H'");
  if (t.J === 0 || t.Q === 0)
    return [0, 0, 0];
  let r = 0;
  t.h !== void 0 ? r = Vn(t.h) * nb : r = CR(t.H) * nb;
  const i = Math.cos(r), o = Math.sin(r);
  let u = 0;
  t.J !== void 0 ? u = Dn(t.J, 1 / 2) * 0.1 : t.Q !== void 0 && (u = 0.25 * n.c * t.Q / ((n.aW + 4) * n.flRoot));
  let c = 0;
  t.C !== void 0 ? c = t.C / u : t.M !== void 0 ? c = t.M / n.flRoot / u : t.s !== void 0 && (c = 4e-4 * t.s ** 2 * (n.aW + 4) / n.c);
  const h = Dn(
    c * Math.pow(1.64 - Math.pow(0.29, n.n), -0.73),
    10 / 9
  ), d = 0.25 * (Math.cos(r + 2) + 3.8), p = n.aW * Dn(u, 2 / n.c / n.z), g = 5e4 / 13 * n.nc * n.ncb * d, y = p / n.nbb, v = 23 * (y + 0.305) * D0(h, 23 * g + h * (11 * i + 108 * o)), w = v * i, x = v * o, S = MR(
    Ze(SR, [y, w, x]).map((T) => T * 1 / 1403),
    n.fl
  );
  return Ze(
    xR,
    S.map((T, E) => T * n.dRgbInv[E])
  ).map((T) => T / 100);
}
function ox(t, n) {
  const r = t.map((C) => C * 100), i = ix(
    Ze(rx, r).map((C, X) => C * n.dRgb[X]),
    n.fl
  ), o = i[0] + (-12 * i[1] + i[2]) / 11, u = (i[0] + i[1] - 2 * i[2]) / 9, c = (Math.atan2(u, o) % Ld + Ld) % Ld, h = 0.25 * (Math.cos(c + 2) + 3.8), d = 5e4 / 13 * n.nc * n.ncb * D0(
    h * Math.sqrt(o ** 2 + u ** 2),
    i[0] + i[1] + 1.05 * i[2] + 0.305
  ), p = Dn(d, 0.9) * Math.pow(1.64 - Math.pow(0.29, n.n), 0.73), g = n.nbb * (2 * i[0] + i[1] + 0.05 * i[2]), y = Dn(g / n.aW, 0.5 * n.c * n.z), v = 100 * Dn(y, 2), w = 4 / n.c * y * (n.aW + 4) * n.flRoot, x = p * y, S = x * n.flRoot, T = Vn(c * TR), E = ER(T), N = 50 * Dn(n.c * p / (n.aW + 4), 1 / 2);
  return { J: v, C: x, h: T, s: N, Q: w, M: S, H: E };
}
var _R = new fe({
  id: "cam16-jmh",
  cssId: "--cam16-jmh",
  name: "CAM16-JMh",
  coords: {
    j: {
      refRange: [0, 100],
      name: "J"
    },
    m: {
      refRange: [0, 105],
      name: "Colorfulness"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: At,
  fromBase(t) {
    const n = ox(t, ab);
    return [n.J, n.M, n.h];
  },
  toBase(t) {
    return Ch(
      { J: t[0], M: t[1], h: t[2] },
      ab
    );
  }
});
const RR = Dt.D65, kR = 216 / 24389, lx = 24389 / 27;
function NR(t) {
  return 116 * (t > kR ? Math.cbrt(t) : (lx * t + 16) / 116) - 16;
}
function _h(t) {
  return t > 8 ? Math.pow((t + 16) / 116, 3) : t / lx;
}
function DR(t, n) {
  let [r, i, o] = t, u = [], c = 0;
  if (o === 0)
    return [0, 0, 0];
  let h = _h(o);
  o > 0 ? c = 0.00379058511492914 * o ** 2 + 0.608983189401032 * o + 0.9155088574762233 : c = 9514440756550361e-21 * o ** 2 + 0.08693057439788597 * o - 21.928975842194614;
  const d = 2e-12, p = 15;
  let g = 0, y = 1 / 0;
  for (; g <= p; ) {
    u = Ch({ J: c, C: i, h: r }, n);
    const v = Math.abs(u[1] - h);
    if (v < y) {
      if (v <= d)
        return u;
      y = v;
    }
    c = c - (u[1] - h) * c / (2 * u[1]), g += 1;
  }
  return Ch({ J: c, C: i, h: r }, n);
}
function OR(t, n) {
  const r = NR(t[1]);
  if (r === 0)
    return [0, 0, 0];
  const i = ox(t, B0);
  return [Vn(i.h), i.C, r];
}
const B0 = sx(
  RR,
  200 / Math.PI * _h(50),
  _h(50) * 100,
  "average",
  !1
);
var ao = new fe({
  id: "hct",
  name: "HCT",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    c: {
      refRange: [0, 145],
      name: "Colorfulness"
    },
    t: {
      refRange: [0, 100],
      name: "Tone"
    }
  },
  base: At,
  fromBase(t) {
    return OR(t);
  },
  toBase(t) {
    return DR(t, B0);
  },
  formats: {
    color: {
      id: "--hct",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
const LR = Math.PI / 180, rb = [1, 7e-3, 0.0228];
function ib(t) {
  t[1] < 0 && (t = ao.fromBase(ao.toBase(t)));
  const n = Math.log(Math.max(1 + rb[2] * t[1] * B0.flRoot, 1)) / rb[2], r = t[0] * LR, i = n * Math.cos(r), o = n * Math.sin(r);
  return [t[2], i, o];
}
function zR(t, n) {
  [t, n] = Se([t, n]);
  let [r, i, o] = ib(ao.from(t)), [u, c, h] = ib(ao.from(n));
  return Math.sqrt((r - u) ** 2 + (i - c) ** 2 + (o - h) ** 2);
}
var Mi = {
  deltaE76: tR,
  deltaECMC: aR,
  deltaE2000: F5,
  deltaEJz: cR,
  deltaEITP: bR,
  deltaEOK: Th,
  deltaEHCT: zR
};
function BR(t) {
  const n = t ? Math.floor(Math.log10(Math.abs(t))) : 0;
  return Math.max(parseFloat(`1e${n - 2}`), 1e-6);
}
const sb = {
  hct: {
    method: "hct.c",
    jnd: 2,
    deltaEMethod: "hct",
    blackWhiteClamp: {}
  },
  "hct-tonal": {
    method: "hct.c",
    jnd: 0,
    deltaEMethod: "hct",
    blackWhiteClamp: { channel: "hct.t", min: 0, max: 100 }
  }
};
function ja(t, {
  method: n = $t.gamut_mapping,
  space: r = void 0,
  deltaEMethod: i = "",
  jnd: o = 2,
  blackWhiteClamp: u = {}
} = {}) {
  if (t = Se(t), ho(arguments[1]) ? r = arguments[1] : r || (r = t.space), r = fe.get(r), vr(t, r, { epsilon: 0 }))
    return t;
  let c;
  if (n === "css")
    c = VR(t, { space: r });
  else {
    if (n !== "clip" && !vr(t, r)) {
      Object.prototype.hasOwnProperty.call(sb, n) && ({ method: n, jnd: o, deltaEMethod: i, blackWhiteClamp: u } = sb[n]);
      let h = F5;
      if (i !== "") {
        for (let p in Mi)
          if ("deltae" + i.toLowerCase() === p.toLowerCase()) {
            h = Mi[p];
            break;
          }
      }
      let d = ja(Xe(t, r), { method: "clip", space: r });
      if (h(t, d) > o) {
        if (Object.keys(u).length === 3) {
          let N = fe.resolveCoord(u.channel), C = Qt(Xe(t, N.space), N.id);
          if (Va(C) && (C = 0), C >= u.max)
            return Xe({ space: "xyz-d65", coords: Dt.D65 }, t.space);
          if (C <= u.min)
            return Xe({ space: "xyz-d65", coords: [0, 0, 0] }, t.space);
        }
        let p = fe.resolveCoord(n), g = p.space, y = p.id, v = Xe(t, g);
        v.coords.forEach((N, C) => {
          Va(N) && (v.coords[C] = 0);
        });
        let x = (p.range || p.refRange)[0], S = BR(o), T = x, E = Qt(v, y);
        for (; E - T > S; ) {
          let N = Ti(v);
          N = ja(N, { space: r, method: "clip" }), h(v, N) - o < S ? T = Qt(v, y) : E = Qt(v, y), aa(v, y, (T + E) / 2);
        }
        c = Xe(v, r);
      } else
        c = d;
    } else
      c = Xe(t, r);
    if (n === "clip" || !vr(c, r, { epsilon: 0 })) {
      let h = Object.values(r.coords).map((d) => d.range || []);
      c.coords = c.coords.map((d, p) => {
        let [g, y] = h[p];
        return g !== void 0 && (d = Math.max(g, d)), y !== void 0 && (d = Math.min(d, y)), d;
      });
    }
  }
  return r !== t.space && (c = Xe(c, t.space)), t.coords = c.coords, t;
}
ja.returns = "color";
const ob = {
  WHITE: { space: Ai, coords: [1, 0, 0] },
  BLACK: { space: Ai, coords: [0, 0, 0] }
};
function VR(t, { space: n } = {}) {
  t = Se(t), n || (n = t.space), n = fe.get(n);
  const o = fe.get("oklch");
  if (n.isUnbounded)
    return Xe(t, n);
  const u = Xe(t, o);
  let c = u.coords[0];
  if (c >= 1) {
    const x = Xe(ob.WHITE, n);
    return x.alpha = t.alpha, Xe(x, n);
  }
  if (c <= 0) {
    const x = Xe(ob.BLACK, n);
    return x.alpha = t.alpha, Xe(x, n);
  }
  if (vr(u, n, { epsilon: 0 }))
    return Xe(u, n);
  function h(x) {
    const S = Xe(x, n), T = Object.values(n.coords);
    return S.coords = S.coords.map((E, N) => {
      if ("range" in T[N]) {
        const [C, X] = T[N].range;
        return W5(C, E, X);
      }
      return E;
    }), S;
  }
  let d = 0, p = u.coords[1], g = !0, y = Ti(u), v = h(y), w = Th(v, y);
  if (w < 0.02)
    return v;
  for (; p - d > 1e-4; ) {
    const x = (d + p) / 2;
    if (y.coords[1] = x, g && vr(y, n, { epsilon: 0 }))
      d = x;
    else if (v = h(y), w = Th(v, y), w < 0.02) {
      if (0.02 - w < 1e-4)
        break;
      g = !1, d = x;
    } else
      p = x;
  }
  return v;
}
function Xe(t, n, { inGamut: r } = {}) {
  t = Se(t), n = fe.get(n);
  let i = n.from(t), o = { space: n, coords: i, alpha: t.alpha };
  return r && (o = ja(o, r === !0 ? void 0 : r)), o;
}
Xe.returns = "color";
function Xs(t, {
  precision: n = $t.precision,
  format: r = "default",
  inGamut: i = !0,
  ...o
} = {}) {
  var d;
  let u;
  t = Se(t);
  let c = r;
  r = t.space.getFormat(r) ?? t.space.getFormat("default") ?? fe.DEFAULT_FORMAT;
  let h = t.coords.slice();
  if (i || (i = r.toGamut), i && !vr(t) && (h = ja(Ti(t), i === !0 ? void 0 : i).coords), r.type === "custom")
    if (o.precision = n, r.serialize)
      u = r.serialize(h, t.alpha, o);
    else
      throw new TypeError(`format ${c} can only be used to parse colors, not for serialization`);
  else {
    let p = r.name || "color";
    r.serializeCoords ? h = r.serializeCoords(h, n) : n !== null && (h = h.map((w) => cu(w, { precision: n })));
    let g = [...h];
    if (p === "color") {
      let w = r.id || ((d = r.ids) == null ? void 0 : d[0]) || t.space.id;
      g.unshift(w);
    }
    let y = t.alpha;
    n !== null && (y = cu(y, { precision: n }));
    let v = t.alpha >= 1 || r.noAlpha ? "" : `${r.commas ? "," : " /"} ${y}`;
    u = `${p}(${g.join(r.commas ? ", " : " ")}${v})`;
  }
  return u;
}
const UR = [
  [0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
  [0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
  [0, 0.028072693049087428, 1.060985057710791]
], jR = [
  [1.716651187971268, -0.355670783776392, -0.25336628137366],
  [-0.666684351832489, 1.616481236634939, 0.0157685458139111],
  [0.017639857445311, -0.042770613257809, 0.942103121235474]
];
var Ru = new Pt({
  id: "rec2020-linear",
  cssId: "--rec2020-linear",
  name: "Linear REC.2020",
  white: "D65",
  toXYZ_M: UR,
  fromXYZ_M: jR
});
const ql = 1.09929682680944, lb = 0.018053968510807;
var ux = new Pt({
  id: "rec2020",
  name: "REC.2020",
  base: Ru,
  // Non-linear transfer function from Rec. ITU-R BT.2020-2 table 4
  toBase(t) {
    return t.map(function(n) {
      return n < lb * 4.5 ? n / 4.5 : Math.pow((n + ql - 1) / ql, 1 / 0.45);
    });
  },
  fromBase(t) {
    return t.map(function(n) {
      return n >= lb ? ql * Math.pow(n, 0.45) - (ql - 1) : 4.5 * n;
    });
  }
});
const PR = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976]
], HR = [
  [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
  [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
  [0.03584583024378447, -0.07617238926804182, 0.9568845240076872]
];
var cx = new Pt({
  id: "p3-linear",
  cssId: "--display-p3-linear",
  name: "Linear P3",
  white: "D65",
  toXYZ_M: PR,
  fromXYZ_M: HR
});
const qR = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
], ft = [
  [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
  [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
  [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
];
var fx = new Pt({
  id: "srgb-linear",
  name: "Linear sRGB",
  white: "D65",
  toXYZ_M: qR,
  fromXYZ_M: ft
}), ub = {
  aliceblue: [240 / 255, 248 / 255, 1],
  antiquewhite: [250 / 255, 235 / 255, 215 / 255],
  aqua: [0, 1, 1],
  aquamarine: [127 / 255, 1, 212 / 255],
  azure: [240 / 255, 1, 1],
  beige: [245 / 255, 245 / 255, 220 / 255],
  bisque: [1, 228 / 255, 196 / 255],
  black: [0, 0, 0],
  blanchedalmond: [1, 235 / 255, 205 / 255],
  blue: [0, 0, 1],
  blueviolet: [138 / 255, 43 / 255, 226 / 255],
  brown: [165 / 255, 42 / 255, 42 / 255],
  burlywood: [222 / 255, 184 / 255, 135 / 255],
  cadetblue: [95 / 255, 158 / 255, 160 / 255],
  chartreuse: [127 / 255, 1, 0],
  chocolate: [210 / 255, 105 / 255, 30 / 255],
  coral: [1, 127 / 255, 80 / 255],
  cornflowerblue: [100 / 255, 149 / 255, 237 / 255],
  cornsilk: [1, 248 / 255, 220 / 255],
  crimson: [220 / 255, 20 / 255, 60 / 255],
  cyan: [0, 1, 1],
  darkblue: [0, 0, 139 / 255],
  darkcyan: [0, 139 / 255, 139 / 255],
  darkgoldenrod: [184 / 255, 134 / 255, 11 / 255],
  darkgray: [169 / 255, 169 / 255, 169 / 255],
  darkgreen: [0, 100 / 255, 0],
  darkgrey: [169 / 255, 169 / 255, 169 / 255],
  darkkhaki: [189 / 255, 183 / 255, 107 / 255],
  darkmagenta: [139 / 255, 0, 139 / 255],
  darkolivegreen: [85 / 255, 107 / 255, 47 / 255],
  darkorange: [1, 140 / 255, 0],
  darkorchid: [153 / 255, 50 / 255, 204 / 255],
  darkred: [139 / 255, 0, 0],
  darksalmon: [233 / 255, 150 / 255, 122 / 255],
  darkseagreen: [143 / 255, 188 / 255, 143 / 255],
  darkslateblue: [72 / 255, 61 / 255, 139 / 255],
  darkslategray: [47 / 255, 79 / 255, 79 / 255],
  darkslategrey: [47 / 255, 79 / 255, 79 / 255],
  darkturquoise: [0, 206 / 255, 209 / 255],
  darkviolet: [148 / 255, 0, 211 / 255],
  deeppink: [1, 20 / 255, 147 / 255],
  deepskyblue: [0, 191 / 255, 1],
  dimgray: [105 / 255, 105 / 255, 105 / 255],
  dimgrey: [105 / 255, 105 / 255, 105 / 255],
  dodgerblue: [30 / 255, 144 / 255, 1],
  firebrick: [178 / 255, 34 / 255, 34 / 255],
  floralwhite: [1, 250 / 255, 240 / 255],
  forestgreen: [34 / 255, 139 / 255, 34 / 255],
  fuchsia: [1, 0, 1],
  gainsboro: [220 / 255, 220 / 255, 220 / 255],
  ghostwhite: [248 / 255, 248 / 255, 1],
  gold: [1, 215 / 255, 0],
  goldenrod: [218 / 255, 165 / 255, 32 / 255],
  gray: [128 / 255, 128 / 255, 128 / 255],
  green: [0, 128 / 255, 0],
  greenyellow: [173 / 255, 1, 47 / 255],
  grey: [128 / 255, 128 / 255, 128 / 255],
  honeydew: [240 / 255, 1, 240 / 255],
  hotpink: [1, 105 / 255, 180 / 255],
  indianred: [205 / 255, 92 / 255, 92 / 255],
  indigo: [75 / 255, 0, 130 / 255],
  ivory: [1, 1, 240 / 255],
  khaki: [240 / 255, 230 / 255, 140 / 255],
  lavender: [230 / 255, 230 / 255, 250 / 255],
  lavenderblush: [1, 240 / 255, 245 / 255],
  lawngreen: [124 / 255, 252 / 255, 0],
  lemonchiffon: [1, 250 / 255, 205 / 255],
  lightblue: [173 / 255, 216 / 255, 230 / 255],
  lightcoral: [240 / 255, 128 / 255, 128 / 255],
  lightcyan: [224 / 255, 1, 1],
  lightgoldenrodyellow: [250 / 255, 250 / 255, 210 / 255],
  lightgray: [211 / 255, 211 / 255, 211 / 255],
  lightgreen: [144 / 255, 238 / 255, 144 / 255],
  lightgrey: [211 / 255, 211 / 255, 211 / 255],
  lightpink: [1, 182 / 255, 193 / 255],
  lightsalmon: [1, 160 / 255, 122 / 255],
  lightseagreen: [32 / 255, 178 / 255, 170 / 255],
  lightskyblue: [135 / 255, 206 / 255, 250 / 255],
  lightslategray: [119 / 255, 136 / 255, 153 / 255],
  lightslategrey: [119 / 255, 136 / 255, 153 / 255],
  lightsteelblue: [176 / 255, 196 / 255, 222 / 255],
  lightyellow: [1, 1, 224 / 255],
  lime: [0, 1, 0],
  limegreen: [50 / 255, 205 / 255, 50 / 255],
  linen: [250 / 255, 240 / 255, 230 / 255],
  magenta: [1, 0, 1],
  maroon: [128 / 255, 0, 0],
  mediumaquamarine: [102 / 255, 205 / 255, 170 / 255],
  mediumblue: [0, 0, 205 / 255],
  mediumorchid: [186 / 255, 85 / 255, 211 / 255],
  mediumpurple: [147 / 255, 112 / 255, 219 / 255],
  mediumseagreen: [60 / 255, 179 / 255, 113 / 255],
  mediumslateblue: [123 / 255, 104 / 255, 238 / 255],
  mediumspringgreen: [0, 250 / 255, 154 / 255],
  mediumturquoise: [72 / 255, 209 / 255, 204 / 255],
  mediumvioletred: [199 / 255, 21 / 255, 133 / 255],
  midnightblue: [25 / 255, 25 / 255, 112 / 255],
  mintcream: [245 / 255, 1, 250 / 255],
  mistyrose: [1, 228 / 255, 225 / 255],
  moccasin: [1, 228 / 255, 181 / 255],
  navajowhite: [1, 222 / 255, 173 / 255],
  navy: [0, 0, 128 / 255],
  oldlace: [253 / 255, 245 / 255, 230 / 255],
  olive: [128 / 255, 128 / 255, 0],
  olivedrab: [107 / 255, 142 / 255, 35 / 255],
  orange: [1, 165 / 255, 0],
  orangered: [1, 69 / 255, 0],
  orchid: [218 / 255, 112 / 255, 214 / 255],
  palegoldenrod: [238 / 255, 232 / 255, 170 / 255],
  palegreen: [152 / 255, 251 / 255, 152 / 255],
  paleturquoise: [175 / 255, 238 / 255, 238 / 255],
  palevioletred: [219 / 255, 112 / 255, 147 / 255],
  papayawhip: [1, 239 / 255, 213 / 255],
  peachpuff: [1, 218 / 255, 185 / 255],
  peru: [205 / 255, 133 / 255, 63 / 255],
  pink: [1, 192 / 255, 203 / 255],
  plum: [221 / 255, 160 / 255, 221 / 255],
  powderblue: [176 / 255, 224 / 255, 230 / 255],
  purple: [128 / 255, 0, 128 / 255],
  rebeccapurple: [102 / 255, 51 / 255, 153 / 255],
  red: [1, 0, 0],
  rosybrown: [188 / 255, 143 / 255, 143 / 255],
  royalblue: [65 / 255, 105 / 255, 225 / 255],
  saddlebrown: [139 / 255, 69 / 255, 19 / 255],
  salmon: [250 / 255, 128 / 255, 114 / 255],
  sandybrown: [244 / 255, 164 / 255, 96 / 255],
  seagreen: [46 / 255, 139 / 255, 87 / 255],
  seashell: [1, 245 / 255, 238 / 255],
  sienna: [160 / 255, 82 / 255, 45 / 255],
  silver: [192 / 255, 192 / 255, 192 / 255],
  skyblue: [135 / 255, 206 / 255, 235 / 255],
  slateblue: [106 / 255, 90 / 255, 205 / 255],
  slategray: [112 / 255, 128 / 255, 144 / 255],
  slategrey: [112 / 255, 128 / 255, 144 / 255],
  snow: [1, 250 / 255, 250 / 255],
  springgreen: [0, 1, 127 / 255],
  steelblue: [70 / 255, 130 / 255, 180 / 255],
  tan: [210 / 255, 180 / 255, 140 / 255],
  teal: [0, 128 / 255, 128 / 255],
  thistle: [216 / 255, 191 / 255, 216 / 255],
  tomato: [1, 99 / 255, 71 / 255],
  turquoise: [64 / 255, 224 / 255, 208 / 255],
  violet: [238 / 255, 130 / 255, 238 / 255],
  wheat: [245 / 255, 222 / 255, 179 / 255],
  white: [1, 1, 1],
  whitesmoke: [245 / 255, 245 / 255, 245 / 255],
  yellow: [1, 1, 0],
  yellowgreen: [154 / 255, 205 / 255, 50 / 255]
};
let cb = Array(3).fill("<percentage> | <number>[0, 255]"), fb = Array(3).fill("<number>[0, 255]");
var Ei = new Pt({
  id: "srgb",
  name: "sRGB",
  base: fx,
  fromBase: (t) => t.map((n) => {
    let r = n < 0 ? -1 : 1, i = n * r;
    return i > 31308e-7 ? r * (1.055 * i ** (1 / 2.4) - 0.055) : 12.92 * n;
  }),
  toBase: (t) => t.map((n) => {
    let r = n < 0 ? -1 : 1, i = n * r;
    return i <= 0.04045 ? n / 12.92 : r * ((i + 0.055) / 1.055) ** 2.4;
  }),
  formats: {
    rgb: {
      coords: cb
    },
    rgb_number: {
      name: "rgb",
      commas: !0,
      coords: fb,
      noAlpha: !0
    },
    color: {
      /* use defaults */
    },
    rgba: {
      coords: cb,
      commas: !0,
      lastAlpha: !0
    },
    rgba_number: {
      name: "rgba",
      commas: !0,
      coords: fb
    },
    hex: {
      type: "custom",
      toGamut: !0,
      test: (t) => /^#([a-f0-9]{3,4}){1,2}$/i.test(t),
      parse(t) {
        t.length <= 5 && (t = t.replace(/[a-f0-9]/gi, "$&$&"));
        let n = [];
        return t.replace(/[a-f0-9]{2}/gi, (r) => {
          n.push(parseInt(r, 16) / 255);
        }), {
          spaceId: "srgb",
          coords: n.slice(0, 3),
          alpha: n.slice(3)[0]
        };
      },
      serialize: (t, n, {
        collapse: r = !0
        // collapse to 3-4 digit hex when possible?
      } = {}) => {
        n < 1 && t.push(n), t = t.map((u) => Math.round(u * 255));
        let i = r && t.every((u) => u % 17 === 0);
        return "#" + t.map((u) => i ? (u / 17).toString(16) : u.toString(16).padStart(2, "0")).join("");
      }
    },
    keyword: {
      type: "custom",
      test: (t) => /^[a-z]+$/i.test(t),
      parse(t) {
        t = t.toLowerCase();
        let n = { spaceId: "srgb", coords: null, alpha: 1 };
        if (t === "transparent" ? (n.coords = ub.black, n.alpha = 0) : n.coords = ub[t], n.coords)
          return n;
      }
    }
  }
}), dx = new Pt({
  id: "p3",
  cssId: "display-p3",
  name: "P3",
  base: cx,
  // Gamma encoding/decoding is the same as sRGB
  fromBase: Ei.fromBase,
  toBase: Ei.toBase
});
$t.display_space = Ei;
let GR;
if (typeof CSS < "u" && CSS.supports)
  for (let t of [Ft, ux, dx]) {
    let n = t.getMinCoords(), i = Xs({ space: t, coords: n, alpha: 1 });
    if (CSS.supports("color", i)) {
      $t.display_space = t;
      break;
    }
  }
function YR(t, { space: n = $t.display_space, ...r } = {}) {
  let i = Xs(t, r);
  if (typeof CSS > "u" || CSS.supports("color", i) || !$t.display_space)
    i = new String(i), i.color = t;
  else {
    let o = t;
    if ((t.coords.some(Va) || Va(t.alpha)) && !(GR ?? (GR = CSS.supports("color", "hsl(none 50% 50%)"))) && (o = Ti(t), o.coords = o.coords.map(ot), o.alpha = ot(o.alpha), i = Xs(o, r), CSS.supports("color", i)))
      return i = new String(i), i.color = o, i;
    o = Xe(o, n), i = new String(Xs(o, r)), i.color = o;
  }
  return i;
}
function XR(t, n) {
  return t = Se(t), n = Se(n), t.space === n.space && t.alpha === n.alpha && t.coords.every((r, i) => r === n.coords[i]);
}
function Pa(t) {
  return Qt(t, [At, "y"]);
}
function hx(t, n) {
  aa(t, [At, "y"], n);
}
function IR(t) {
  Object.defineProperty(t.prototype, "luminance", {
    get() {
      return Pa(this);
    },
    set(n) {
      hx(this, n);
    }
  });
}
var ZR = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getLuminance: Pa,
  register: IR,
  setLuminance: hx
});
function WR(t, n) {
  t = Se(t), n = Se(n);
  let r = Math.max(Pa(t), 0), i = Math.max(Pa(n), 0);
  return i > r && ([r, i] = [i, r]), (r + 0.05) / (i + 0.05);
}
const KR = 0.56, QR = 0.57, FR = 0.62, $R = 0.65, db = 0.022, JR = 1.414, ek = 0.1, tk = 5e-4, nk = 1.14, hb = 0.027, ak = 1.14;
function pb(t) {
  return t >= db ? t : t + (db - t) ** JR;
}
function fi(t) {
  let n = t < 0 ? -1 : 1, r = Math.abs(t);
  return n * Math.pow(r, 2.4);
}
function rk(t, n) {
  n = Se(n), t = Se(t);
  let r, i, o, u, c, h;
  n = Xe(n, "srgb"), [u, c, h] = n.coords;
  let d = fi(u) * 0.2126729 + fi(c) * 0.7151522 + fi(h) * 0.072175;
  t = Xe(t, "srgb"), [u, c, h] = t.coords;
  let p = fi(u) * 0.2126729 + fi(c) * 0.7151522 + fi(h) * 0.072175, g = pb(d), y = pb(p), v = y > g;
  return Math.abs(y - g) < tk ? i = 0 : v ? (r = y ** KR - g ** QR, i = r * nk) : (r = y ** $R - g ** FR, i = r * ak), Math.abs(i) < ek ? o = 0 : i > 0 ? o = i - hb : o = i + hb, o * 100;
}
function ik(t, n) {
  t = Se(t), n = Se(n);
  let r = Math.max(Pa(t), 0), i = Math.max(Pa(n), 0);
  i > r && ([r, i] = [i, r]);
  let o = r + i;
  return o === 0 ? 0 : (r - i) / o;
}
const sk = 5e4;
function ok(t, n) {
  t = Se(t), n = Se(n);
  let r = Math.max(Pa(t), 0), i = Math.max(Pa(n), 0);
  return i > r && ([r, i] = [i, r]), i === 0 ? sk : (r - i) / i;
}
function lk(t, n) {
  t = Se(t), n = Se(n);
  let r = Qt(t, [Ft, "l"]), i = Qt(n, [Ft, "l"]);
  return Math.abs(r - i);
}
const uk = 216 / 24389, mb = 24 / 116, Gl = 24389 / 27;
let zd = Dt.D65;
var Rh = new fe({
  id: "lab-d65",
  name: "Lab D65",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D65, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: zd,
  base: At,
  // Convert D65-adapted XYZ to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(t) {
    let r = t.map((i, o) => i / zd[o]).map((i) => i > uk ? Math.cbrt(i) : (Gl * i + 16) / 116);
    return [
      116 * r[1] - 16,
      // L
      500 * (r[0] - r[1]),
      // a
      200 * (r[1] - r[2])
      // b
    ];
  },
  // Convert Lab to D65-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(t) {
    let n = [];
    return n[1] = (t[0] + 16) / 116, n[0] = t[1] / 500 + n[1], n[2] = n[1] - t[2] / 200, [
      n[0] > mb ? Math.pow(n[0], 3) : (116 * n[0] - 16) / Gl,
      t[0] > 8 ? Math.pow((t[0] + 16) / 116, 3) : t[0] / Gl,
      n[2] > mb ? Math.pow(n[2], 3) : (116 * n[2] - 16) / Gl
    ].map((i, o) => i * zd[o]);
  },
  formats: {
    "lab-d65": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
const Bd = Math.pow(5, 0.5) * 0.5 + 0.5;
function ck(t, n) {
  t = Se(t), n = Se(n);
  let r = Qt(t, [Rh, "l"]), i = Qt(n, [Rh, "l"]), o = Math.abs(Math.pow(r, Bd) - Math.pow(i, Bd)), u = Math.pow(o, 1 / Bd) * Math.SQRT2 - 40;
  return u < 7.5 ? 0 : u;
}
var Fl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  contrastAPCA: rk,
  contrastDeltaPhi: ck,
  contrastLstar: lk,
  contrastMichelson: ik,
  contrastWCAG21: WR,
  contrastWeber: ok
});
function fk(t, n, r = {}) {
  ho(r) && (r = { algorithm: r });
  let { algorithm: i, ...o } = r;
  if (!i) {
    let u = Object.keys(Fl).map((c) => c.replace(/^contrast/, "")).join(", ");
    throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${u}`);
  }
  t = Se(t), n = Se(n);
  for (let u in Fl)
    if ("contrast" + i.toLowerCase() === u.toLowerCase())
      return Fl[u](t, n, o);
  throw new TypeError(`Unknown contrast algorithm: ${i}`);
}
function ku(t) {
  let [n, r, i] = po(t, At), o = n + 15 * r + 3 * i;
  return [4 * n / o, 9 * r / o];
}
function px(t) {
  let [n, r, i] = po(t, At), o = n + r + i;
  return [n / o, r / o];
}
function dk(t) {
  Object.defineProperty(t.prototype, "uv", {
    get() {
      return ku(this);
    }
  }), Object.defineProperty(t.prototype, "xy", {
    get() {
      return px(this);
    }
  });
}
var hk = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  register: dk,
  uv: ku,
  xy: px
});
function js(t, n, r = {}) {
  ho(r) && (r = { method: r });
  let { method: i = $t.deltaE, ...o } = r;
  for (let u in Mi)
    if ("deltae" + i.toLowerCase() === u.toLowerCase())
      return Mi[u](t, n, o);
  throw new TypeError(`Unknown deltaE method: ${i}`);
}
function pk(t, n = 0.25) {
  let i = [fe.get("oklch", "lch"), "l"];
  return aa(t, i, (o) => o * (1 + n));
}
function mk(t, n = 0.25) {
  let i = [fe.get("oklch", "lch"), "l"];
  return aa(t, i, (o) => o * (1 - n));
}
var gk = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  darken: mk,
  lighten: pk
});
function mx(t, n, r = 0.5, i = {}) {
  return [t, n] = [Se(t), Se(n)], Oa(r) === "object" && ([r, i] = [0.5, r]), mo(t, n, i)(r);
}
function gx(t, n, r = {}) {
  let i;
  V0(t) && ([i, r] = [t, n], [t, n] = i.rangeArgs.colors);
  let {
    maxDeltaE: o,
    deltaEMethod: u,
    steps: c = 2,
    maxSteps: h = 1e3,
    ...d
  } = r;
  i || ([t, n] = [Se(t), Se(n)], i = mo(t, n, d));
  let p = js(t, n), g = o > 0 ? Math.max(c, Math.ceil(p / o) + 1) : c, y = [];
  if (h !== void 0 && (g = Math.min(g, h)), g === 1)
    y = [{ p: 0.5, color: i(0.5) }];
  else {
    let v = 1 / (g - 1);
    y = Array.from({ length: g }, (w, x) => {
      let S = x * v;
      return { p: S, color: i(S) };
    });
  }
  if (o > 0) {
    let v = y.reduce((w, x, S) => {
      if (S === 0)
        return 0;
      let T = js(x.color, y[S - 1].color, u);
      return Math.max(w, T);
    }, 0);
    for (; v > o; ) {
      v = 0;
      for (let w = 1; w < y.length && y.length < h; w++) {
        let x = y[w - 1], S = y[w], T = (S.p + x.p) / 2, E = i(T);
        v = Math.max(v, js(E, x.color), js(E, S.color)), y.splice(w, 0, { p: T, color: i(T) }), w++;
      }
    }
  }
  return y = y.map((v) => v.color), y;
}
function mo(t, n, r = {}) {
  if (V0(t)) {
    let [d, p] = [t, n];
    return mo(...d.rangeArgs.colors, { ...d.rangeArgs.options, ...p });
  }
  let { space: i, outputSpace: o, progression: u, premultiplied: c } = r;
  t = Se(t), n = Se(n), t = Ti(t), n = Ti(n);
  let h = { colors: [t, n], options: r };
  if (i ? i = fe.get(i) : i = fe.registry[$t.interpolationSpace] || t.space, o = o ? fe.get(o) : i, t = Xe(t, i), n = Xe(n, i), t = ja(t), n = ja(n), i.coords.h && i.coords.h.type === "angle") {
    let d = r.hue = r.hue || "shorter", p = [i, "h"], [g, y] = [Qt(t, p), Qt(n, p)];
    isNaN(g) && !isNaN(y) ? g = y : isNaN(y) && !isNaN(g) && (y = g), [g, y] = K7(d, [g, y]), aa(t, p, g), aa(n, p, y);
  }
  return c && (t.coords = t.coords.map((d) => d * t.alpha), n.coords = n.coords.map((d) => d * n.alpha)), Object.assign((d) => {
    d = u ? u(d) : d;
    let p = t.coords.map((v, w) => {
      let x = n.coords[w];
      return to(v, x, d);
    }), g = to(t.alpha, n.alpha, d), y = { space: i, coords: p, alpha: g };
    return c && (y.coords = y.coords.map((v) => v / g)), o !== i && (y = Xe(y, o)), y;
  }, {
    rangeArgs: h
  });
}
function V0(t) {
  return Oa(t) === "function" && !!t.rangeArgs;
}
$t.interpolationSpace = "lab";
function yk(t) {
  t.defineFunction("mix", mx, { returns: "color" }), t.defineFunction("range", mo, { returns: "function<color>" }), t.defineFunction("steps", gx, { returns: "array<color>" });
}
var vk = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  isRange: V0,
  mix: mx,
  range: mo,
  register: yk,
  steps: gx
}), yx = new fe({
  id: "hsl",
  name: "HSL",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: Ei,
  // Adapted from https://drafts.csswg.org/css-color-4/better-rgbToHsl.js
  fromBase: (t) => {
    let n = Math.max(...t), r = Math.min(...t), [i, o, u] = t, [c, h, d] = [NaN, 0, (r + n) / 2], p = n - r;
    if (p !== 0) {
      switch (h = d === 0 || d === 1 ? 0 : (n - d) / Math.min(d, 1 - d), n) {
        case i:
          c = (o - u) / p + (o < u ? 6 : 0);
          break;
        case o:
          c = (u - i) / p + 2;
          break;
        case u:
          c = (i - o) / p + 4;
      }
      c = c * 60;
    }
    return h < 0 && (c += 180, h = Math.abs(h)), c >= 360 && (c -= 360), [c, h * 100, d * 100];
  },
  // Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
  toBase: (t) => {
    let [n, r, i] = t;
    n = n % 360, n < 0 && (n += 360), r /= 100, i /= 100;
    function o(u) {
      let c = (u + n / 30) % 12, h = r * Math.min(i, 1 - i);
      return i - h * Math.max(-1, Math.min(c - 3, 9 - c, 1));
    }
    return [o(0), o(8), o(4)];
  },
  formats: {
    hsl: {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"]
    },
    hsla: {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"],
      commas: !0,
      lastAlpha: !0
    }
  }
}), vx = new fe({
  id: "hsv",
  name: "HSV",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    v: {
      range: [0, 100],
      name: "Value"
    }
  },
  base: yx,
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  fromBase(t) {
    let [n, r, i] = t;
    r /= 100, i /= 100;
    let o = i + r * Math.min(i, 1 - i);
    return [
      n,
      // h is the same
      o === 0 ? 0 : 200 * (1 - i / o),
      // s
      100 * o
    ];
  },
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  toBase(t) {
    let [n, r, i] = t;
    r /= 100, i /= 100;
    let o = i * (1 - r / 2);
    return [
      n,
      // h is the same
      o === 0 || o === 1 ? 0 : (i - o) / Math.min(o, 1 - o) * 100,
      o * 100
    ];
  },
  formats: {
    color: {
      id: "--hsv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
}), bk = new fe({
  id: "hwb",
  name: "HWB",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    w: {
      range: [0, 100],
      name: "Whiteness"
    },
    b: {
      range: [0, 100],
      name: "Blackness"
    }
  },
  base: vx,
  fromBase(t) {
    let [n, r, i] = t;
    return [n, i * (100 - r) / 100, 100 - i];
  },
  toBase(t) {
    let [n, r, i] = t;
    r /= 100, i /= 100;
    let o = r + i;
    if (o >= 1) {
      let h = r / o;
      return [n, 0, h * 100];
    }
    let u = 1 - i, c = u === 0 ? 0 : 1 - r / u;
    return [n, c * 100, u * 100];
  },
  formats: {
    hwb: {
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
const wk = [
  [0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
  [0.29734497525053605, 0.6273635662554661, 0.07529145849399788],
  [0.02703136138641234, 0.07068885253582723, 0.9913375368376388]
], xk = [
  [2.0415879038107465, -0.5650069742788596, -0.34473135077832956],
  [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557],
  [0.013444280632031142, -0.11836239223101838, 1.0151749943912054]
];
var bx = new Pt({
  id: "a98rgb-linear",
  cssId: "--a98-rgb-linear",
  name: "Linear Adobe® 98 RGB compatible",
  white: "D65",
  toXYZ_M: wk,
  fromXYZ_M: xk
}), Sk = new Pt({
  id: "a98rgb",
  cssId: "a98-rgb",
  name: "Adobe® 98 RGB compatible",
  base: bx,
  toBase: (t) => t.map((n) => Math.pow(Math.abs(n), 563 / 256) * Math.sign(n)),
  fromBase: (t) => t.map((n) => Math.pow(Math.abs(n), 256 / 563) * Math.sign(n))
});
const Ak = [
  [0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
  [0.2880748288194013, 0.711835234241873, 8993693872564e-17],
  [0, 0, 0.8251046025104602]
], Tk = [
  [1.3457868816471583, -0.25557208737979464, -0.05110186497554526],
  [-0.5446307051249019, 1.5082477428451468, 0.02052744743642139],
  [0, 0, 1.2119675456389452]
];
var wx = new Pt({
  id: "prophoto-linear",
  cssId: "--prophoto-rgb-linear",
  name: "Linear ProPhoto",
  white: "D50",
  base: L0,
  toXYZ_M: Ak,
  fromXYZ_M: Tk
});
const Mk = 1 / 512, Ek = 16 / 512;
var Ck = new Pt({
  id: "prophoto",
  cssId: "prophoto-rgb",
  name: "ProPhoto",
  base: wx,
  toBase(t) {
    return t.map((n) => n < Ek ? n / 16 : n ** 1.8);
  },
  fromBase(t) {
    return t.map((n) => n >= Mk ? n ** (1 / 1.8) : 16 * n);
  }
}), _k = new fe({
  id: "oklch",
  name: "Oklch",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    c: {
      refRange: [0, 0.4],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  white: "D65",
  base: Ai,
  fromBase(t) {
    let [n, r, i] = t, o;
    const u = 2e-4;
    return Math.abs(r) < u && Math.abs(i) < u ? o = NaN : o = Math.atan2(i, r) * 180 / Math.PI, [
      n,
      // OKLab L is still L
      Math.sqrt(r ** 2 + i ** 2),
      // Chroma
      Vn(o)
      // Hue, in degrees [0 to 360)
    ];
  },
  // Convert from polar form
  toBase(t) {
    let [n, r, i] = t, o, u;
    return isNaN(i) ? (o = 0, u = 0) : (o = r * Math.cos(i * Math.PI / 180), u = r * Math.sin(i * Math.PI / 180)), [n, o, u];
  },
  formats: {
    oklch: {
      coords: ["<percentage> | <number>", "<number> | <percentage>[0,1]", "<number> | <angle>"]
    }
  }
});
let xx = Dt.D65;
const Rk = 216 / 24389, gb = 24389 / 27, [yb, vb] = ku({ space: At, coords: xx });
var Sx = new fe({
  id: "luv",
  name: "Luv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    // Reference ranges from https://facelessuser.github.io/coloraide/colors/luv/
    u: {
      refRange: [-215, 215]
    },
    v: {
      refRange: [-215, 215]
    }
  },
  white: xx,
  base: At,
  // Convert D65-adapted XYZ to Luv
  // https://en.wikipedia.org/wiki/CIELUV#The_forward_transformation
  fromBase(t) {
    let n = [ot(t[0]), ot(t[1]), ot(t[2])], r = n[1], [i, o] = ku({ space: At, coords: n });
    if (!Number.isFinite(i) || !Number.isFinite(o))
      return [0, 0, 0];
    let u = r <= Rk ? gb * r : 116 * Math.cbrt(r) - 16;
    return [
      u,
      13 * u * (i - yb),
      13 * u * (o - vb)
    ];
  },
  // Convert Luv to D65-adapted XYZ
  // https://en.wikipedia.org/wiki/CIELUV#The_reverse_transformation
  toBase(t) {
    let [n, r, i] = t;
    if (n === 0 || Va(n))
      return [0, 0, 0];
    r = ot(r), i = ot(i);
    let o = r / (13 * n) + yb, u = i / (13 * n) + vb, c = n <= 8 ? n / gb : Math.pow((n + 16) / 116, 3);
    return [
      c * (9 * o / (4 * u)),
      c,
      c * ((12 - 3 * o - 20 * u) / (4 * u))
    ];
  },
  formats: {
    color: {
      id: "--luv",
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
}), U0 = new fe({
  id: "lchuv",
  name: "LChuv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 220],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Sx,
  fromBase(t) {
    let [n, r, i] = t, o;
    const u = 0.02;
    return Math.abs(r) < u && Math.abs(i) < u ? o = NaN : o = Math.atan2(i, r) * 180 / Math.PI, [
      n,
      // L is still L
      Math.sqrt(r ** 2 + i ** 2),
      // Chroma
      Vn(o)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(t) {
    let [n, r, i] = t;
    return r < 0 && (r = 0), isNaN(i) && (i = 0), [
      n,
      // L is still L
      r * Math.cos(i * Math.PI / 180),
      // u
      r * Math.sin(i * Math.PI / 180)
      // v
    ];
  },
  formats: {
    color: {
      id: "--lchuv",
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
const kk = 216 / 24389, Nk = 24389 / 27, bb = ft[0][0], wb = ft[0][1], Vd = ft[0][2], xb = ft[1][0], Sb = ft[1][1], Ud = ft[1][2], Ab = ft[2][0], Tb = ft[2][1], jd = ft[2][2];
function di(t, n, r) {
  const i = n / (Math.sin(r) - t * Math.cos(r));
  return i < 0 ? 1 / 0 : i;
}
function hu(t) {
  const n = Math.pow(t + 16, 3) / 1560896, r = n > kk ? n : t / Nk, i = r * (284517 * bb - 94839 * Vd), o = r * (838422 * Vd + 769860 * wb + 731718 * bb), u = r * (632260 * Vd - 126452 * wb), c = r * (284517 * xb - 94839 * Ud), h = r * (838422 * Ud + 769860 * Sb + 731718 * xb), d = r * (632260 * Ud - 126452 * Sb), p = r * (284517 * Ab - 94839 * jd), g = r * (838422 * jd + 769860 * Tb + 731718 * Ab), y = r * (632260 * jd - 126452 * Tb);
  return {
    r0s: i / u,
    r0i: o * t / u,
    r1s: i / (u + 126452),
    r1i: (o - 769860) * t / (u + 126452),
    g0s: c / d,
    g0i: h * t / d,
    g1s: c / (d + 126452),
    g1i: (h - 769860) * t / (d + 126452),
    b0s: p / y,
    b0i: g * t / y,
    b1s: p / (y + 126452),
    b1i: (g - 769860) * t / (y + 126452)
  };
}
function Mb(t, n) {
  const r = n / 360 * Math.PI * 2, i = di(t.r0s, t.r0i, r), o = di(t.r1s, t.r1i, r), u = di(t.g0s, t.g0i, r), c = di(t.g1s, t.g1i, r), h = di(t.b0s, t.b0i, r), d = di(t.b1s, t.b1i, r);
  return Math.min(i, o, u, c, h, d);
}
var Dk = new fe({
  id: "hsluv",
  name: "HSLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: U0,
  gamutSpace: Ei,
  // Convert LCHuv to HSLuv
  fromBase(t) {
    let [n, r, i] = [ot(t[0]), ot(t[1]), ot(t[2])], o;
    if (n > 99.9999999)
      o = 0, n = 100;
    else if (n < 1e-8)
      o = 0, n = 0;
    else {
      let u = hu(n), c = Mb(u, i);
      o = r / c * 100;
    }
    return [i, o, n];
  },
  // Convert HSLuv to LCHuv
  toBase(t) {
    let [n, r, i] = [ot(t[0]), ot(t[1]), ot(t[2])], o;
    if (i > 99.9999999)
      i = 100, o = 0;
    else if (i < 1e-8)
      i = 0, o = 0;
    else {
      let u = hu(i);
      o = Mb(u, n) / 100 * r;
    }
    return [i, o, n];
  },
  formats: {
    color: {
      id: "--hsluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
ft[0][0];
ft[0][1];
ft[0][2];
ft[1][0];
ft[1][1];
ft[1][2];
ft[2][0];
ft[2][1];
ft[2][2];
function hi(t, n) {
  return Math.abs(n) / Math.sqrt(Math.pow(t, 2) + 1);
}
function Eb(t) {
  let n = hi(t.r0s, t.r0i), r = hi(t.r1s, t.r1i), i = hi(t.g0s, t.g0i), o = hi(t.g1s, t.g1i), u = hi(t.b0s, t.b0i), c = hi(t.b1s, t.b1i);
  return Math.min(n, r, i, o, u, c);
}
var Ok = new fe({
  id: "hpluv",
  name: "HPLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: U0,
  gamutSpace: "self",
  // Convert LCHuv to HPLuv
  fromBase(t) {
    let [n, r, i] = [ot(t[0]), ot(t[1]), ot(t[2])], o;
    if (n > 99.9999999)
      o = 0, n = 100;
    else if (n < 1e-8)
      o = 0, n = 0;
    else {
      let u = hu(n), c = Eb(u);
      o = r / c * 100;
    }
    return [i, o, n];
  },
  // Convert HPLuv to LCHuv
  toBase(t) {
    let [n, r, i] = [ot(t[0]), ot(t[1]), ot(t[2])], o;
    if (i > 99.9999999)
      i = 100, o = 0;
    else if (i < 1e-8)
      i = 0, o = 0;
    else {
      let u = hu(i);
      o = Eb(u) / 100 * r;
    }
    return [i, o, n];
  },
  formats: {
    color: {
      id: "--hpluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
const Cb = 203, _b = 2610 / 2 ** 14, Lk = 2 ** 14 / 2610, zk = 2523 / 2 ** 5, Rb = 2 ** 5 / 2523, kb = 3424 / 2 ** 12, Nb = 2413 / 2 ** 7, Db = 2392 / 2 ** 7;
var Bk = new Pt({
  id: "rec2100pq",
  cssId: "rec2100-pq",
  name: "REC.2100-PQ",
  base: Ru,
  toBase(t) {
    return t.map(function(n) {
      return (Math.max(n ** Rb - kb, 0) / (Nb - Db * n ** Rb)) ** Lk * 1e4 / Cb;
    });
  },
  fromBase(t) {
    return t.map(function(n) {
      let r = Math.max(n * Cb / 1e4, 0), i = kb + Nb * r ** _b, o = 1 + Db * r ** _b;
      return (i / o) ** zk;
    });
  }
});
const Ob = 0.17883277, Lb = 0.28466892, zb = 0.55991073, Pd = 3.7743;
var Vk = new Pt({
  id: "rec2100hlg",
  cssId: "rec2100-hlg",
  name: "REC.2100-HLG",
  referred: "scene",
  base: Ru,
  toBase(t) {
    return t.map(function(n) {
      return n <= 0.5 ? n ** 2 / 3 * Pd : (Math.exp((n - zb) / Ob) + Lb) / 12 * Pd;
    });
  },
  fromBase(t) {
    return t.map(function(n) {
      return n /= Pd, n <= 1 / 12 ? Math.sqrt(3 * n) : Ob * Math.log(12 * n - Lb) + zb;
    });
  }
});
const Ax = {};
Ua.add("chromatic-adaptation-start", (t) => {
  t.options.method && (t.M = Tx(t.W1, t.W2, t.options.method));
});
Ua.add("chromatic-adaptation-end", (t) => {
  t.M || (t.M = Tx(t.W1, t.W2, t.options.method));
});
function Nu({ id: t, toCone_M: n, fromCone_M: r }) {
  Ax[t] = arguments[0];
}
function Tx(t, n, r = "Bradford") {
  let i = Ax[r], [o, u, c] = Ze(i.toCone_M, t), [h, d, p] = Ze(i.toCone_M, n), g = [
    [h / o, 0, 0],
    [0, d / u, 0],
    [0, 0, p / c]
  ], y = Ze(g, i.toCone_M);
  return Ze(i.fromCone_M, y);
}
Nu({
  id: "von Kries",
  toCone_M: [
    [0.40024, 0.7076, -0.08081],
    [-0.2263, 1.16532, 0.0457],
    [0, 0, 0.91822]
  ],
  fromCone_M: [
    [1.8599363874558397, -1.1293816185800916, 0.21989740959619328],
    [0.3611914362417676, 0.6388124632850422, -6370596838649899e-21],
    [0, 0, 1.0890636230968613]
  ]
});
Nu({
  id: "Bradford",
  // Convert an array of XYZ values in the range 0.0 - 1.0
  // to cone fundamentals
  toCone_M: [
    [0.8951, 0.2664, -0.1614],
    [-0.7502, 1.7135, 0.0367],
    [0.0389, -0.0685, 1.0296]
  ],
  // and back
  fromCone_M: [
    [0.9869929054667121, -0.14705425642099013, 0.15996265166373122],
    [0.4323052697233945, 0.5183602715367774, 0.049291228212855594],
    [-0.00852866457517732, 0.04004282165408486, 0.96848669578755]
  ]
});
Nu({
  id: "CAT02",
  // with complete chromatic adaptation to W2, so D = 1.0
  toCone_M: [
    [0.7328, 0.4296, -0.1624],
    [-0.7036, 1.6975, 61e-4],
    [3e-3, 0.0136, 0.9834]
  ],
  fromCone_M: [
    [1.0961238208355142, -0.27886900021828726, 0.18274517938277307],
    [0.4543690419753592, 0.4735331543074117, 0.07209780371722911],
    [-0.009627608738429355, -0.00569803121611342, 1.0153256399545427]
  ]
});
Nu({
  id: "CAT16",
  toCone_M: [
    [0.401288, 0.650173, -0.051461],
    [-0.250268, 1.204414, 0.045854],
    [-2079e-6, 0.048952, 0.953127]
  ],
  // the extra precision is needed to avoid roundtripping errors
  fromCone_M: [
    [1.862067855087233, -1.0112546305316845, 0.14918677544445172],
    [0.3875265432361372, 0.6214474419314753, -0.008973985167612521],
    [-0.01584149884933386, -0.03412293802851557, 1.0499644368778496]
  ]
});
Object.assign(Dt, {
  // whitepoint values from ASTM E308-01 with 10nm spacing, 1931 2 degree observer
  // all normalized to Y (luminance) = 1.00000
  // Illuminant A is a tungsten electric light, giving a very warm, orange light.
  A: [1.0985, 1, 0.35585],
  // Illuminant C was an early approximation to daylight: illuminant A with a blue filter.
  C: [0.98074, 1, 1.18232],
  // The daylight series of illuminants simulate natural daylight.
  // The color temperature (in degrees Kelvin/100) ranges from
  // cool, overcast daylight (D50) to bright, direct sunlight (D65).
  D55: [0.95682, 1, 0.92149],
  D75: [0.94972, 1, 1.22638],
  // Equal-energy illuminant, used in two-stage CAT16
  E: [1, 1, 1],
  // The F series of illuminants represent fluorescent lights
  F2: [0.99186, 1, 0.67393],
  F7: [0.95041, 1, 1.08747],
  F11: [1.00962, 1, 0.6435]
});
Dt.ACES = [0.32168 / 0.33767, 1, (1 - 0.32168 - 0.33767) / 0.33767];
const Uk = [
  [0.6624541811085053, 0.13400420645643313, 0.1561876870049078],
  [0.27222871678091454, 0.6740817658111484, 0.05368951740793705],
  [-0.005574649490394108, 0.004060733528982826, 1.0103391003129971]
], jk = [
  [1.6410233796943257, -0.32480329418479, -0.23642469523761225],
  [-0.6636628587229829, 1.6153315916573379, 0.016756347685530137],
  [0.011721894328375376, -0.008284441996237409, 0.9883948585390215]
];
var Mx = new Pt({
  id: "acescg",
  cssId: "--acescg",
  name: "ACEScg",
  // ACEScg – A scene-referred, linear-light encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescg/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  coords: {
    r: {
      range: [0, 65504],
      name: "Red"
    },
    g: {
      range: [0, 65504],
      name: "Green"
    },
    b: {
      range: [0, 65504],
      name: "Blue"
    }
  },
  referred: "scene",
  white: Dt.ACES,
  toXYZ_M: Uk,
  fromXYZ_M: jk
});
const Yl = 2 ** -16, Hd = -0.35828683, Xl = (Math.log2(65504) + 9.72) / 17.52;
var Pk = new Pt({
  id: "acescc",
  cssId: "--acescc",
  name: "ACEScc",
  // see S-2014-003 ACEScc – A Logarithmic Encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescc/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  // Appendix A: "Very small ACES scene referred values below 7 1/4 stops
  // below 18% middle gray are encoded as negative ACEScc values.
  // These values should be preserved per the encoding in Section 4.4
  // so that all positive ACES values are maintained."
  coords: {
    r: {
      range: [Hd, Xl],
      name: "Red"
    },
    g: {
      range: [Hd, Xl],
      name: "Green"
    },
    b: {
      range: [Hd, Xl],
      name: "Blue"
    }
  },
  referred: "scene",
  base: Mx,
  // from section 4.4.2 Decoding Function
  toBase(t) {
    const n = -0.3013698630136986;
    return t.map(function(r) {
      return r <= n ? (2 ** (r * 17.52 - 9.72) - Yl) * 2 : r < Xl ? 2 ** (r * 17.52 - 9.72) : 65504;
    });
  },
  // Non-linear encoding function from S-2014-003, section 4.4.1 Encoding Function
  fromBase(t) {
    return t.map(function(n) {
      return n <= 0 ? (Math.log2(Yl) + 9.72) / 17.52 : n < Yl ? (Math.log2(Yl + n * 0.5) + 9.72) / 17.52 : (Math.log2(n) + 9.72) / 17.52;
    });
  }
  // encoded media white (rgb 1,1,1) => linear  [ 222.861, 222.861, 222.861 ]
  // encoded media black (rgb 0,0,0) => linear [ 0.0011857, 0.0011857, 0.0011857]
}), Bb = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  A98RGB: Sk,
  A98RGB_Linear: bx,
  ACEScc: Pk,
  ACEScg: Mx,
  CAM16_JMh: _R,
  HCT: ao,
  HPLuv: Ok,
  HSL: yx,
  HSLuv: Dk,
  HSV: vx,
  HWB: bk,
  ICTCP: Eh,
  JzCzHz: Mh,
  Jzazbz: J5,
  LCH: no,
  LCHuv: U0,
  Lab: Ft,
  Lab_D65: Rh,
  Luv: Sx,
  OKLCH: _k,
  OKLab: Ai,
  P3: dx,
  P3_Linear: cx,
  ProPhoto: Ck,
  ProPhoto_Linear: wx,
  REC_2020: ux,
  REC_2020_Linear: Ru,
  REC_2100_HLG: Vk,
  REC_2100_PQ: Bk,
  XYZ_ABS_D65: z0,
  XYZ_D50: L0,
  XYZ_D65: At,
  sRGB: Ei,
  sRGB_Linear: fx
});
class Oe {
  /**
   * Creates an instance of Color.
   * Signatures:
   * - `new Color(stringToParse)`
   * - `new Color(otherColor)`
   * - `new Color({space, coords, alpha})`
   * - `new Color(space, coords, alpha)`
   * - `new Color(spaceId, coords, alpha)`
   */
  constructor(...n) {
    let r;
    n.length === 1 && (r = Se(n[0]));
    let i, o, u;
    r ? (i = r.space || r.spaceId, o = r.coords, u = r.alpha) : [i, o, u] = n, Object.defineProperty(this, "space", {
      value: fe.get(i),
      writable: !1,
      enumerable: !0,
      configurable: !0
      // see note in https://262.ecma-international.org/8.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
    }), this.coords = o ? o.slice() : [0, 0, 0], this.alpha = u > 1 || u === void 0 ? 1 : u < 0 ? 0 : u;
    for (let c = 0; c < this.coords.length; c++)
      this.coords[c] === "NaN" && (this.coords[c] = NaN);
    for (let c in this.space.coords)
      Object.defineProperty(this, c, {
        get: () => this.get(c),
        set: (h) => this.set(c, h)
      });
  }
  get spaceId() {
    return this.space.id;
  }
  clone() {
    return new Oe(this.space, this.coords, this.alpha);
  }
  toJSON() {
    return {
      spaceId: this.spaceId,
      coords: this.coords,
      alpha: this.alpha
    };
  }
  display(...n) {
    let r = YR(this, ...n);
    return r.color = new Oe(r.color), r;
  }
  /**
   * Get a color from the argument passed
   * Basically gets us the same result as new Color(color) but doesn't clone an existing color object
   */
  static get(n, ...r) {
    return n instanceof Oe ? n : new Oe(n, ...r);
  }
  static defineFunction(n, r, i = r) {
    let { instance: o = !0, returns: u } = i, c = function(...h) {
      let d = r(...h);
      if (u === "color")
        d = Oe.get(d);
      else if (u === "function<color>") {
        let p = d;
        d = function(...g) {
          let y = p(...g);
          return Oe.get(y);
        }, Object.assign(d, p);
      } else u === "array<color>" && (d = d.map((p) => Oe.get(p)));
      return d;
    };
    n in Oe || (Oe[n] = c), o && (Oe.prototype[n] = function(...h) {
      return c(this, ...h);
    });
  }
  static defineFunctions(n) {
    for (let r in n)
      Oe.defineFunction(r, n[r], n[r]);
  }
  static extend(n) {
    if (n.register)
      n.register(Oe);
    else
      for (let r in n)
        Oe.defineFunction(r, n[r]);
  }
}
Oe.defineFunctions({
  get: Qt,
  getAll: po,
  set: aa,
  setAll: O0,
  to: Xe,
  equals: XR,
  inGamut: vr,
  toGamut: ja,
  distance: $5,
  toString: Xs
});
Object.assign(Oe, {
  util: G7,
  hooks: Ua,
  WHITES: Dt,
  Space: fe,
  spaces: fe.registry,
  parse: Q5,
  // Global defaults one may want to configure
  defaults: $t
});
for (let t of Object.keys(Bb))
  fe.register(Bb[t]);
for (let t in fe.registry)
  kh(t, fe.registry[t]);
Ua.add("colorspace-init-end", (t) => {
  var n;
  kh(t.id, t), (n = t.aliases) == null || n.forEach((r) => {
    kh(r, t);
  });
});
function kh(t, n) {
  let r = t.replace(/-/g, "_");
  Object.defineProperty(Oe.prototype, r, {
    // Convert coords to coords in another colorspace and return them
    // Source colorspace: this.spaceId
    // Target colorspace: id
    get() {
      let i = this.getAll(t);
      return typeof Proxy > "u" ? i : new Proxy(i, {
        has: (o, u) => {
          try {
            return fe.resolveCoord([n, u]), !0;
          } catch {
          }
          return Reflect.has(o, u);
        },
        get: (o, u, c) => {
          if (u && typeof u != "symbol" && !(u in o)) {
            let { index: h } = fe.resolveCoord([n, u]);
            if (h >= 0)
              return o[h];
          }
          return Reflect.get(o, u, c);
        },
        set: (o, u, c, h) => {
          if (u && typeof u != "symbol" && !(u in o) || u >= 0) {
            let { index: d } = fe.resolveCoord([n, u]);
            if (d >= 0)
              return o[d] = c, this.setAll(t, o), !0;
          }
          return Reflect.set(o, u, c, h);
        }
      });
    },
    // Convert coords in another colorspace to internal coords and set them
    // Target colorspace: this.spaceId
    // Source colorspace: id
    set(i) {
      this.setAll(t, i);
    },
    configurable: !0,
    enumerable: !0
  });
}
Oe.extend(Mi);
Oe.extend({ deltaE: js });
Object.assign(Oe, { deltaEMethods: Mi });
Oe.extend(gk);
Oe.extend({ contrast: fk });
Oe.extend(hk);
Oe.extend(ZR);
Oe.extend(vk);
Oe.extend(Fl);
/** @preserve
/////    CoLoR PaRsLeY  a simple set of color parsing thingies!
/////           Beta 0.1.8   Revision date: June 04, 2022
/////
/////    Functions to parse color values and return array
/////    Copyright (c) 2019-2022 by Andrew Somers. All Rights Reserved.
/////    LICENSE: AGPL 3
/////    CONTACT: Please use the ISSUES or DISCUSSIONS tab at:
/////    https://github.com/Myndex/colorparsley/
/////
///////////////////////////////////////////////////////////////////////////////
/////
/////    IMPORT:
/////    import { colorParsley } from 'colorparsley';
/////
/////    let rgbaArray = colorParsley('#abcdef');
/////
/////    Output as array:  [r,g,b,a,isValid,colorspace]
/////    Example: [123,123,123,1.0,true,'sRGB']
// */
function Vb(t) {
  if (typeof t == "string")
    return Hk(t);
  if (typeof t == "number")
    return [
      (t & 16711680) >> 16,
      (t & 65280) >> 8,
      t & 255,
      1,
      !0,
      "unknown"
    ];
  if (typeof t == "object") {
    if (Array.isArray(t))
      return t;
    if (!isNaN(t.r) || !isNaN(t.red)) {
      let n = [0, 0, 0, 0, !1, "unknown"];
      return n[0] = t.r ? t.r : t.red ? t.red : !1, n[1] = t.g ? t.g : t.green ? t.green : !1, n[2] = t.b ? t.b : t.blue ? t.blue : !1, n[3] = t.a ? t.a : t.alpha ? t.alpha : 1, n[4] = !!(n[0] && n[1] && n[2]), n[5] = t.space ? t.space : t.colorSpace ? t.colorSpace : t.colorspace ? t.colorspace : "unknown", n;
    }
  }
  return console.log("colorParsley error: invalid input"), [0, 0, 0, 0, !1, "inputError"];
}
function Hk(t = "#abcdef") {
  t = t.replace(/[^\w,.#%()\/ -]/g, ""), t = t.toLowerCase();
  let n = !1, i = [0, 0, 0, 0, n, "sRGB"];
  if (t.match(/^(?:(?!rgb|l.h|hs|col|\d|#).{0,4})(?=[g-z])/)) {
    let c = {
      gray0: "000000",
      gray1: "111111",
      gray2: "222222",
      gray3: "333333",
      gray4: "444444",
      gray5: "555555",
      gray6: "666666",
      gray7: "777777",
      gray8: "888888",
      gray9: "999999",
      graya: "aaaaaa",
      grayb: "bbbbbb",
      grayc: "cccccc",
      grayd: "dddddd",
      graye: "eeeeee",
      grayf: "ffffff",
      midgray: "a0a0a0",
      grey0: "000000",
      grey1: "111111",
      grey2: "222222",
      grey3: "333333",
      grey4: "444444",
      grey5: "555555",
      grey6: "666666",
      grey7: "777777",
      grey8: "888888",
      grey9: "999999",
      greya: "aaaaaa",
      greyb: "bbbbbb",
      greyc: "cccccc",
      greyd: "dddddd",
      greye: "eeeeee",
      greyf: "ffffff",
      midgrey: "a0a0a0",
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "778899",
      lightslategrey: "778899",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "00ff00",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "ff00ff",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "ff0000",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "ffffff",
      whitesmoke: "f5f5f5",
      yellow: "ffff00",
      yellowgreen: "9acd32"
    };
    for (let h in c)
      if (t == h) {
        let d = {
          rex: /^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/,
          sprig: function(g) {
            for (let y = 0; y < 3; y++)
              i[y] = parseInt(g[y + 1], 16);
            return i[3] = 1, !0;
          }
        }, p = d.rex.exec(c[h]);
        return i[4] = n = d.sprig(p), i;
      }
  }
  let o = {
    rex: /(?:^(?:#|0x|)(?:(?:([\da-f])([\da-f])([\da-f])([\da-f])?)(?!\S)|(?:([\da-f]{2})(?:([\da-f]{2})([\da-f]{2})([\da-f]{2})?)?))|(?:(?:^(?:rgba?|)\(? ?(?:(?:(?:(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)))(?:,[^\S]*$|(?:(?:, ?| )(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)(?:, ?| )(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)))|(100%|\d{1,2}(?:\.\d{1,24})?%)(?:,?[^\S]*$|(?:(?:, ?| )(?:(100%|\d{1,2}(?:\.\d{1,24})?%)(?:, ?| )(100%|\d{1,2}(?:\.\d{1,24})?%)))))|^(?:color\((srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz|xyz-d50|xyz-d65) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))|^(?:((?:r(?!gb)|c(?!olor)|[abd-qs-z])[a-z]{2,5})\( ?((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?))))(?:(?:,| \/| ) ?(?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))?(?:\)| |))[^\S]*$/,
    parsley: function(c) {
      let h = 0, d = 0, p = 10, g = 100, y = 2.55, v = "1";
      c[23] && (v = c[23], delete c[23]), i[3] = v.match(/%/g) ? parseFloat(v) / g : parseFloat(v);
      for (let w = 1; w < c.length; w++)
        c[w] && (h = h || w, d = w);
      switch (d) {
        case 4:
          p = 16, g = 15, i[3] = parseInt(c[d], p) / g;
        case 3:
          p = 16;
          for (let w = 0; w < 3; w++)
            i[w] = parseInt(c[h + w] + c[h + w], p);
          break;
        case 5:
          p = 16;
        case 9:
          i[0] = i[1] = i[2] = p == 10 ? parseFloat(c[d]) : parseInt(c[d], p);
          break;
        case 12:
          i[0] = i[1] = i[2] = parseFloat(c[d]) * y;
          break;
        case 8:
          p = 16, g = 255, i[3] = parseInt(c[8], p) / g;
        case 7:
          p = 16;
        case 11:
          for (let w = 0; w < 3; w++)
            i[w] = p == 10 ? parseFloat(c[h + w]) : parseInt(c[h + w], p);
          break;
        case 14:
          for (let w = 0; w < 3; w++)
            i[w] = parseFloat(c[h + w]) * y;
          break;
        case 18:
          i[5] = c[15];
          for (let w = 0; w < 3; w++)
            h++, i[w] = c[h].match(/%/g) ? parseFloat(c[h]) * 2.55 : parseFloat(c[h]) * 255;
          break;
        case 22:
          i[5] = c[h];
          for (let w = 0; w < 3; w++)
            h++, i[w] = c[h] ? c[h].match(/%/g) ? parseFloat(c[h]) / g : parseFloat(c[h]) : 0;
          if (i[5].match(/^(?:hsla?|hwba?)/i)) {
            let C = function(X) {
              let D = (X + N / 30) % 12, U = w * Math.min(x, 1 - x);
              return x - U * Math.max(-1, Math.min(D - 3, 9 - D, 1));
            }, w, x, S, T, E, N = i[0] % 360;
            if (N < 0 && (N += 360), i[5].match(/^hsla?/i))
              w = i[1], x = i[2], S = 0, E = 1;
            else if (i[5].match(/^hwba?/i)) {
              if (S = i[1], T = i[2], S + T >= 1) {
                i[0] = i[1] = i[2] = S / (S + T), i[5] = "sRGB";
                break;
              }
              w = 1, x = 0.5, E = 1 - S - T;
            }
            i[0] = Math.round(255 * (C(0) * E + S)), i[1] = Math.round(255 * (C(8) * E + S)), i[2] = Math.round(255 * (C(4) * E + S)), i[5] = "sRGB";
          }
          break;
      }
      return !0;
    }
    // close parsley sub-function
  }, u = o.rex.exec(t);
  return u ? (i[4] = n = o.parsley(u), i) : (n = !1, console.log("colorParsley error: unable to parse string"), [0, 0, 0, 0, n, "parsleyError"]);
}
/** @preserve
/////    SAPC APCA - Advanced Perceptual Contrast Algorithm
/////           Beta 0.1.9 W3 • contrast function only
/////           DIST: W3 • Revision date: July 3, 2022
/////    Function to parse color values and determine Lc contrast
/////    Copyright © 2019-2022 by Andrew Somers. All Rights Reserved.
/////    LICENSE: W3 LICENSE
/////    CONTACT: Please use the ISSUES or DISCUSSIONS tab at:
/////    https://github.com/Myndex/SAPC-APCA/
/////
///////////////////////////////////////////////////////////////////////////////
/////
/////    MINIMAL IMPORTS:
/////      import { APCAcontrast, sRGBtoY, displayP3toY,
/////               calcAPCA, fontLookupAPCA } from 'apca-w3';
/////      import { colorParsley } from 'colorparsley';
/////
/////    FORWARD CONTRAST USAGE:
/////      Lc = APCAcontrast( sRGBtoY( TEXTcolor ) , sRGBtoY( BACKGNDcolor ) );
/////    Where the colors are sent as an rgba array [255,255,255,1]
/////
/////    Retrieving an array of font sizes for the contrast:
/////      fontArray = fontLookupAPCA(Lc);
/////
/////    Live Demonstrator at https://www.myndex.com/APCA/
// */
const it = {
  mainTRC: 2.4,
  // 2.4 exponent for emulating actual monitor perception
  // sRGB coefficients
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.072175,
  // G-4g constants for use with 2.4 exponent
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,
  // G-4g Clamps and Scalers
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  scaleWoB: 1.14,
  loBoWoffset: 0.027,
  loWoBoffset: 0.027,
  deltaYmin: 5e-4,
  loClip: 0.1
};
function qk(t, n, r = -1) {
  const i = [0, 1.1];
  if (isNaN(t) || isNaN(n) || Math.min(t, n) < i[0] || Math.max(t, n) > i[1])
    return 0;
  let o = 0, u = 0, c = "BoW";
  return t = t > it.blkThrs ? t : t + Math.pow(it.blkThrs - t, it.blkClmp), n = n > it.blkThrs ? n : n + Math.pow(it.blkThrs - n, it.blkClmp), Math.abs(n - t) < it.deltaYmin ? 0 : (n > t ? (o = (Math.pow(n, it.normBG) - Math.pow(t, it.normTXT)) * it.scaleBoW, u = o < it.loClip ? 0 : o - it.loBoWoffset) : (c = "WoB", o = (Math.pow(n, it.revBG) - Math.pow(t, it.revTXT)) * it.scaleWoB, u = o > -0.1 ? 0 : o + it.loWoBoffset), r < 0 ? u * 100 : r == 0 ? Math.round(Math.abs(u) * 100) + "<sub>" + c + "</sub>" : Number.isInteger(r) ? (u * 100).toFixed(r) : 0);
}
function Vs(t, n, r = -1, i = !0) {
  let o = Vb(n), u = Vb(t);
  return !(u[3] == "" || u[3] == 1) && (u = Gk(u, o, i)), qk(Ub(u), Ub(o), r);
}
function Ub(t = [0, 0, 0]) {
  function n(r) {
    return Math.pow(r / 255, it.mainTRC);
  }
  return it.sRco * n(t[0]) + it.sGco * n(t[1]) + it.sBco * n(t[2]);
}
function Gk(t = [0, 0, 0, 1], n = [0, 0, 0], r = !0) {
  t[3] = Math.max(Math.min(t[3], 1), 0);
  let i = 1 - t[3], o = [0, 0, 0, 1, !0];
  for (let u = 0; u < 3; u++)
    o[u] = n[u] * i + t[u] * t[3], r && (o[u] = Math.min(Math.round(o[u]), 255));
  return o;
}
const pu = class pu {
  /**
   * Convert a hex color to different formats
   * @param {string} hex - Color in hex format (#ffffff or ffffff)
   * @returns {object} Object with different color representations
   */
  static convertHex(n) {
    const r = n.replace("#", ""), i = r.length === 3 ? r.split("").map((u) => u + u).join("") : r, o = new Oe(`#${i}`);
    return {
      hex: `#${i}`,
      rgb: o.to("srgb").coords.map((u) => Math.round(u * 255)),
      hsl: o.to("hsl").coords.map((u, c) => Math.round(c === 0 ? u : u * 100)),
      oklch: o.to("oklch").coords,
      lab: o.to("lab").coords,
      colorObject: o
    };
  }
  /**
   * Convert hex to OKLCH format
   * @param {string} hex - Color in hex format
   * @returns {object} OKLCH values
   */
  static hexToOklch(n) {
    const i = new Oe(n).to("oklch");
    return {
      // || 0 is to handle the case where the color white, (it's returned NaN otherwise)
      l: i.coords[0] || 0,
      // Lightness (0-1)
      c: i.coords[1] || 0,
      // Chroma
      h: i.coords[2] || 0,
      // Hue (0-360)
      alpha: i.alpha || 1
    };
  }
  /**
   * Calculate the APCA contrast between two hex colors
   * @param {string} textColor - Text color in hex
   * @param {string} backgroundColor - Background color in hex
   * @returns {object} APCA contrast result
   */
  static calculateAPCA(n, r) {
    try {
      const i = Vs(n, r);
      return {
        contrast: i,
        isReadable: Math.abs(Number(i)) >= 60,
        level: this.getAPCALevel(Math.abs(Number(i)))
      };
    } catch (i) {
      return console.error("Error calculando APCA:", i), {
        contrast: 0,
        isReadable: !1,
        level: "error",
        error: (i == null ? void 0 : i.message) || "Unknown error"
      };
    }
  }
  /**
   * Determine the APCA contrast level
   * @param {number} contrast - Absolute contrast value
   * @returns {string} Contrast level
   */
  static getAPCALevel(n) {
    return n >= 90 ? "AAA" : n >= 75 ? "AA" : n >= 60 ? "A" : n >= 45 ? "marginal" : "insufficient";
  }
  /**
   * Generate a color palette based on a hex using OKLCH
   * @param {string} hex - Base color in hex
   * @param {number} steps - Number of variations (default: 5)
   * @returns {array} Array of hex colors
   */
  static generatePalette(n, r = 5) {
    const o = new Oe(n).to("oklch"), u = [];
    for (let c = 0; c < r; c++) {
      const h = c / (r - 1) * 0.9 + 0.1, d = new Oe("oklch", [
        h,
        o.coords[1],
        // Mantener chroma
        o.coords[2]
        // Mantener hue
      ]);
      u.push(d.to("srgb").toString({ format: "hex" }));
    }
    return u;
  }
  /**
   * Find the best text color (white or black) for a given background
   * @param {string} backgroundColor - Background color in hex
   * @returns {object} Best text color and its contrast
   */
  static getBestTextColor(n) {
    const r = this.calculateAPCA("#ffffff", n), i = this.calculateAPCA("#000000", n), o = Math.abs(Number(r.contrast)), u = Math.abs(Number(i.contrast));
    return o > u ? {
      color: "#ffffff",
      contrast: r
    } : {
      color: "#000000",
      contrast: i
    };
  }
  /**
   * Validate if a string is a valid hex color
   * @param {string} hex - String to validate
   * @returns {boolean} True if it is a valid hex color
   */
  static isValidHex(n) {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(n);
  }
  // tweak to 75 for tiny fonts ?
  /**
   * Encuentra el mejor color "muted" de foreground para un background dado, usando APCA y OKLCH.
   * @param {string} bgRaw - Color de fondo en hex/rgb/oklch
   * @returns {string} Color foreground sugerido (hex u oklch)
   */
  static bestMutedFg(n) {
    const r = new Oe(n), i = this.MUTED.filter((u) => Math.abs(Number(Vs(u.to("srgb").coords, r.to("srgb").coords))) >= this.TARGET_LC).sort(
      (u, c) => Math.abs(Number(Vs(c.to("srgb").coords, r.to("srgb").coords))) - Math.abs(Number(Vs(u.to("srgb").coords, r.to("srgb").coords)))
    );
    if (i[0]) return i[0].toString({ format: "hex" });
    let o = 0.15;
    for (; o <= 0.6; ) {
      const u = r.clone();
      if (u.oklch.l = r.oklch.l < 0.55 ? Math.min(r.oklch.l + o, 0.95) : Math.max(r.oklch.l - o, 0.05), u.oklch.c *= 0.25, Math.abs(Number(Vs(u.to("srgb").coords, r.to("srgb").coords))) >= this.TARGET_LC)
        return u.toString({ format: "oklch" });
      o += 0.05;
    }
    return r.oklch.l < 0.55 ? "#fafafa" : "#181818";
  }
};
pu.MUTED = ["#e6e8ea", "#c2c5c7", "#4e5256"].map((n) => new Oe(n)), pu.TARGET_LC = 60;
let Ci = pu;
const pr = "audial-widget";
function Yk() {
  const t = document.querySelector(pr);
  return t || console.error("[findWidgetHost] Widget host element not found"), t;
}
function Xk(t) {
  try {
    const n = Yk();
    if (!n) return;
    const r = getComputedStyle(n), { primaryColor: i, backgroundColor: o } = Ik(t, r);
    Zk(n, t, i, o), Wk(n, i, o);
  } catch (n) {
    console.error("[loadDynamicCssVars] Error applying CSS variables:", n);
  }
}
function Ik(t, n) {
  var o, u;
  const r = ((o = t.style) == null ? void 0 : o.primaryColor) ?? n.getPropertyValue("--aw-primary").trim(), i = ((u = t.style) == null ? void 0 : u.backgroundColor) ?? n.getPropertyValue("--aw-background").trim();
  return { primaryColor: r, backgroundColor: i };
}
function Zk(t, n, r, i) {
  var o, u;
  if ((o = n.style) != null && o.primaryColor) {
    const c = Ci.hexToOklch(r), h = jb(c);
    t.style.setProperty("--aw-primary", h);
  }
  if ((u = n.style) != null && u.backgroundColor) {
    const c = Ci.hexToOklch(i), h = jb(c);
    t.style.setProperty("--aw-background", h);
  }
}
function Wk(t, n, r) {
  const i = Ci.bestMutedFg(r), o = Ci.bestMutedFg(n);
  console.log("[applyForegroundProperties] foregroundColor", i), console.log("[applyForegroundProperties] primaryForegroundColor", o), t.style.setProperty("--aw-foreground", i), t.style.setProperty("--aw-primary-foreground", o);
}
function jb(t) {
  return `oklch(${t.l} ${t.c} ${t.h})`;
}
const Kk = W.forwardRef(({
  agentId: t,
  apiKey: n,
  baseUrl: r,
  options: i = {}
}, o) => {
  const [u, c] = W.useState(null), { config: h, error: d } = H7(t, n, r);
  return W.useEffect(() => {
    h && c(h);
  }, [h]), W.useEffect(() => {
    u && Xk(u);
  }, [u]), W.useImperativeHandle(o, () => ({
    dispatchAction: (p, g) => {
      switch (p) {
        case "update-config":
          console.log("[WidgetApp] update-config", g), c((y) => y ? { ...y, ...g } : null);
          break;
        default:
          console.warn(`Unknown command: ${p}`);
      }
    }
  }), [c]), i != null && i.debug && console.log("WidgetApp config: ", u), !u || d ? null : /* @__PURE__ */ Z.jsx(
    j7,
    {
      agentId: t,
      apiKey: n,
      baseUrl: r,
      widgetConfig: u,
      previewMode: i == null ? void 0 : i.previewMode,
      defaultOpen: i == null ? void 0 : i.defaultOpen,
      debug: (i == null ? void 0 : i.debug) ?? !1
    }
  );
}), Qk = `/*! tailwindcss v4.1.10 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-space-x-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--aw-font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--aw-font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--aw-color-red-300:oklch(80.8% .114 19.571);--aw-color-red-400:oklch(70.4% .191 22.216);--aw-color-red-500:oklch(63.7% .237 25.331);--aw-color-red-600:oklch(57.7% .245 27.325);--aw-color-green-300:oklch(87.1% .15 154.449);--aw-color-green-400:oklch(79.2% .209 151.711);--aw-color-green-500:oklch(72.3% .219 149.579);--aw-color-blue-500:oklch(62.3% .214 259.815);--aw-color-blue-600:oklch(54.6% .245 262.881);--aw-color-gray-300:oklch(87.2% .01 258.338);--aw-color-gray-400:oklch(70.7% .022 261.325);--aw-color-gray-500:oklch(55.1% .027 264.364);--aw-color-gray-600:oklch(44.6% .03 256.802);--aw-color-gray-700:oklch(37.3% .034 259.733);--aw-color-black:#000;--aw-color-white:#fff;--aw-spacing:.25rem;--aw-text-xs:.75rem;--aw-text-xs--line-height:calc(1/.75);--aw-text-sm:.875rem;--aw-text-sm--line-height:calc(1.25/.875);--aw-text-base:1rem;--aw-text-base--line-height: 1.5 ;--aw-text-lg:1.125rem;--aw-text-lg--line-height:calc(1.75/1.125);--aw-font-weight-normal:400;--aw-font-weight-medium:500;--aw-font-weight-semibold:600;--aw-leading-tight:1.25;--aw-leading-relaxed:1.625;--aw-radius-md:.375rem;--aw-radius-xl:.75rem;--aw-radius-2xl:1rem;--aw-radius-3xl:1.5rem;--aw-ease-in-out:cubic-bezier(.4,0,.2,1);--aw-animate-spin:spin 1s linear infinite;--aw-blur-sm:8px;--aw-blur-lg:16px;--aw-default-transition-duration:.15s;--aw-default-transition-timing-function:cubic-bezier(.4,0,.2,1);--aw-default-font-family:var(--aw-font-sans);--aw-default-mono-font-family:var(--aw-font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--aw-default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--aw-default-font-feature-settings,normal);font-variation-settings:var(--aw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--aw-default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--aw-default-mono-font-feature-settings,normal);font-variation-settings:var(--aw-default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}:host{--aw-background:oklch(12.88% .041 264.7);--aw-foreground:oklch(100% 0 0);--aw-primary:oklch(100% 0 0);--aw-primary-foreground:oklch(17.76% 0 0)}}@layer components;@layer utilities{.aw\\:pointer-events-none{pointer-events:none}.aw\\:absolute{position:absolute}.aw\\:fixed{position:fixed}.aw\\:relative{position:relative}.aw\\:inset-0{inset:calc(var(--aw-spacing)*0)}.aw\\:top-0{top:calc(var(--aw-spacing)*0)}.aw\\:top-1\\/2{top:50%}.aw\\:top-4{top:calc(var(--aw-spacing)*4)}.aw\\:top-\\[-2px\\]{top:-2px}.aw\\:right-0{right:calc(var(--aw-spacing)*0)}.aw\\:right-1{right:calc(var(--aw-spacing)*1)}.aw\\:right-4{right:calc(var(--aw-spacing)*4)}.aw\\:right-\\[-2px\\]{right:-2px}.aw\\:bottom-6{bottom:calc(var(--aw-spacing)*6)}.aw\\:left-4{left:calc(var(--aw-spacing)*4)}.aw\\:z-10{z-index:10}.aw\\:z-50{z-index:50}.aw\\:z-\\[9999\\]{z-index:9999}.aw\\:mx-auto{margin-inline:auto}.aw\\:mr-1{margin-right:calc(var(--aw-spacing)*1)}.aw\\:mb-1{margin-bottom:calc(var(--aw-spacing)*1)}.aw\\:mb-2{margin-bottom:calc(var(--aw-spacing)*2)}.aw\\:mb-3{margin-bottom:calc(var(--aw-spacing)*3)}.aw\\:mb-4{margin-bottom:calc(var(--aw-spacing)*4)}.aw\\:mb-6{margin-bottom:calc(var(--aw-spacing)*6)}.aw\\:block{display:block}.aw\\:flex{display:flex}.aw\\:inline-flex{display:inline-flex}.aw\\:aspect-square{aspect-ratio:1}.aw\\:size-5{width:calc(var(--aw-spacing)*5);height:calc(var(--aw-spacing)*5)}.aw\\:size-6{width:calc(var(--aw-spacing)*6);height:calc(var(--aw-spacing)*6)}.aw\\:size-8{width:calc(var(--aw-spacing)*8);height:calc(var(--aw-spacing)*8)}.aw\\:size-9{width:calc(var(--aw-spacing)*9);height:calc(var(--aw-spacing)*9)}.aw\\:size-full{width:100%;height:100%}.aw\\:h-2\\.5{height:calc(var(--aw-spacing)*2.5)}.aw\\:h-3{height:calc(var(--aw-spacing)*3)}.aw\\:h-5{height:calc(var(--aw-spacing)*5)}.aw\\:h-6{height:calc(var(--aw-spacing)*6)}.aw\\:h-8{height:calc(var(--aw-spacing)*8)}.aw\\:h-9{height:calc(var(--aw-spacing)*9)}.aw\\:h-10{height:calc(var(--aw-spacing)*10)}.aw\\:h-10\\!{height:calc(var(--aw-spacing)*10)!important}.aw\\:h-12{height:calc(var(--aw-spacing)*12)}.aw\\:h-12\\!{height:calc(var(--aw-spacing)*12)!important}.aw\\:h-16{height:calc(var(--aw-spacing)*16)}.aw\\:h-20{height:calc(var(--aw-spacing)*20)}.aw\\:h-\\[50px\\]{height:50px}.aw\\:h-\\[608px\\]{height:608px}.aw\\:h-\\[663px\\]{height:663px}.aw\\:h-full{height:100%}.aw\\:w-1{width:calc(var(--aw-spacing)*1)}.aw\\:w-2\\.5{width:calc(var(--aw-spacing)*2.5)}.aw\\:w-3{width:calc(var(--aw-spacing)*3)}.aw\\:w-5{width:calc(var(--aw-spacing)*5)}.aw\\:w-6{width:calc(var(--aw-spacing)*6)}.aw\\:w-8{width:calc(var(--aw-spacing)*8)}.aw\\:w-10{width:calc(var(--aw-spacing)*10)}.aw\\:w-12{width:calc(var(--aw-spacing)*12)}.aw\\:w-16{width:calc(var(--aw-spacing)*16)}.aw\\:w-20{width:calc(var(--aw-spacing)*20)}.aw\\:w-\\[50px\\]{width:50px}.aw\\:w-\\[380px\\]{width:380px}.aw\\:w-full{width:100%}.aw\\:max-w-\\[90\\%\\]{max-width:90%}.aw\\:min-w-0{min-width:calc(var(--aw-spacing)*0)}.aw\\:flex-1{flex:1}.aw\\:flex-shrink-0,.aw\\:shrink-0{flex-shrink:0}.aw\\:-translate-y-1\\/2{--tw-translate-y: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.aw\\:animate-spin{animation:var(--aw-animate-spin)}.aw\\:cursor-pointer{cursor:pointer}.aw\\:touch-none{touch-action:none}.aw\\:flex-col{flex-direction:column}.aw\\:items-center{align-items:center}.aw\\:justify-between{justify-content:space-between}.aw\\:justify-center{justify-content:center}.aw\\:justify-end{justify-content:flex-end}.aw\\:justify-start{justify-content:flex-start}.aw\\:gap-1{gap:calc(var(--aw-spacing)*1)}.aw\\:gap-1\\.5{gap:calc(var(--aw-spacing)*1.5)}.aw\\:gap-2{gap:calc(var(--aw-spacing)*2)}.aw\\:gap-4{gap:calc(var(--aw-spacing)*4)}:where(.aw\\:space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--aw-spacing)*1)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--aw-spacing)*1)*calc(1 - var(--tw-space-x-reverse)))}:where(.aw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--aw-spacing)*3)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--aw-spacing)*3)*calc(1 - var(--tw-space-x-reverse)))}:where(.aw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--aw-spacing)*4)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--aw-spacing)*4)*calc(1 - var(--tw-space-x-reverse)))}.aw\\:self-end{align-self:flex-end}.aw\\:self-start{align-self:flex-start}.aw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.aw\\:overflow-hidden{overflow:hidden}.aw\\:overflow-y-auto{overflow-y:auto}.aw\\:rounded-2xl{border-radius:var(--aw-radius-2xl)}.aw\\:rounded-3xl{border-radius:var(--aw-radius-3xl)}.aw\\:rounded-\\[inherit\\]{border-radius:inherit}.aw\\:rounded-full{border-radius:3.40282e38px}.aw\\:rounded-md{border-radius:var(--aw-radius-md)}.aw\\:rounded-xl{border-radius:var(--aw-radius-xl)}.aw\\:rounded-xl\\!{border-radius:var(--aw-radius-xl)!important}.aw\\:border{border-style:var(--tw-border-style);border-width:1px}.aw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.aw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.aw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.aw\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.aw\\:border-background{border-color:var(--aw-background)}.aw\\:border-gray-500\\/30{border-color:var(--aw-color-gray-500)}@supports (color:color-mix(in lab,red,red)){.aw\\:border-gray-500\\/30{border-color:color-mix(in oklab,var(--aw-color-gray-500)30%,transparent)}}.aw\\:border-gray-500\\/40{border-color:var(--aw-color-gray-500)}@supports (color:color-mix(in lab,red,red)){.aw\\:border-gray-500\\/40{border-color:color-mix(in oklab,var(--aw-color-gray-500)40%,transparent)}}.aw\\:border-primary\\/50{border-color:var(--aw-primary)}@supports (color:color-mix(in lab,red,red)){.aw\\:border-primary\\/50{border-color:color-mix(in oklab,var(--aw-primary)50%,transparent)}}.aw\\:border-white{border-color:var(--aw-color-white)}.aw\\:border-t-transparent{border-top-color:#0000}.aw\\:border-l-transparent{border-left-color:#0000}.aw\\:bg-background{background-color:var(--aw-background)}.aw\\:bg-black\\/50{background-color:var(--aw-color-black)}@supports (color:color-mix(in lab,red,red)){.aw\\:bg-black\\/50{background-color:color-mix(in oklab,var(--aw-color-black)50%,transparent)}}.aw\\:bg-black\\/70{background-color:var(--aw-color-black)}@supports (color:color-mix(in lab,red,red)){.aw\\:bg-black\\/70{background-color:color-mix(in oklab,var(--aw-color-black)70%,transparent)}}.aw\\:bg-blue-500{background-color:var(--aw-color-blue-500)}.aw\\:bg-gray-400\\/30{background-color:var(--aw-color-gray-400)}@supports (color:color-mix(in lab,red,red)){.aw\\:bg-gray-400\\/30{background-color:color-mix(in oklab,var(--aw-color-gray-400)30%,transparent)}}.aw\\:bg-gray-600{background-color:var(--aw-color-gray-600)}.aw\\:bg-green-400{background-color:var(--aw-color-green-400)}.aw\\:bg-green-500{background-color:var(--aw-color-green-500)}.aw\\:bg-primary{background-color:var(--aw-primary)}.aw\\:bg-red-500,.aw\\:bg-red-500\\/20{background-color:var(--aw-color-red-500)}@supports (color:color-mix(in lab,red,red)){.aw\\:bg-red-500\\/20{background-color:color-mix(in oklab,var(--aw-color-red-500)20%,transparent)}}.aw\\:bg-transparent{background-color:#0000}.aw\\:object-cover{object-fit:cover}.aw\\:p-2{padding:calc(var(--aw-spacing)*2)}.aw\\:p-4{padding:calc(var(--aw-spacing)*4)}.aw\\:p-6{padding:calc(var(--aw-spacing)*6)}.aw\\:p-10{padding:calc(var(--aw-spacing)*10)}.aw\\:p-px{padding:1px}.aw\\:px-3{padding-inline:calc(var(--aw-spacing)*3)}.aw\\:px-4{padding-inline:calc(var(--aw-spacing)*4)}.aw\\:px-6{padding-inline:calc(var(--aw-spacing)*6)}.aw\\:py-1{padding-block:calc(var(--aw-spacing)*1)}.aw\\:py-2{padding-block:calc(var(--aw-spacing)*2)}.aw\\:py-6{padding-block:calc(var(--aw-spacing)*6)}.aw\\:pt-4{padding-top:calc(var(--aw-spacing)*4)}.aw\\:pb-2{padding-bottom:calc(var(--aw-spacing)*2)}.aw\\:text-center{text-align:center}.aw\\:text-base{font-size:var(--aw-text-base);line-height:var(--tw-leading,var(--aw-text-base--line-height))}.aw\\:text-lg{font-size:var(--aw-text-lg);line-height:var(--tw-leading,var(--aw-text-lg--line-height))}.aw\\:text-sm{font-size:var(--aw-text-sm);line-height:var(--tw-leading,var(--aw-text-sm--line-height))}.aw\\:text-xs{font-size:var(--aw-text-xs);line-height:var(--tw-leading,var(--aw-text-xs--line-height))}.aw\\:leading-relaxed{--tw-leading:var(--aw-leading-relaxed);line-height:var(--aw-leading-relaxed)}.aw\\:leading-tight{--tw-leading:var(--aw-leading-tight);line-height:var(--aw-leading-tight)}.aw\\:font-medium{--tw-font-weight:var(--aw-font-weight-medium);font-weight:var(--aw-font-weight-medium)}.aw\\:font-normal{--tw-font-weight:var(--aw-font-weight-normal);font-weight:var(--aw-font-weight-normal)}.aw\\:font-semibold{--tw-font-weight:var(--aw-font-weight-semibold);font-weight:var(--aw-font-weight-semibold)}.aw\\:whitespace-nowrap{white-space:nowrap}.aw\\:text-foreground,.aw\\:text-foreground\\/60{color:var(--aw-foreground)}@supports (color:color-mix(in lab,red,red)){.aw\\:text-foreground\\/60{color:color-mix(in oklab,var(--aw-foreground)60%,transparent)}}.aw\\:text-foreground\\/80{color:var(--aw-foreground)}@supports (color:color-mix(in lab,red,red)){.aw\\:text-foreground\\/80{color:color-mix(in oklab,var(--aw-foreground)80%,transparent)}}.aw\\:text-gray-300{color:var(--aw-color-gray-300)}.aw\\:text-gray-400{color:var(--aw-color-gray-400)}.aw\\:text-green-300{color:var(--aw-color-green-300)}.aw\\:text-green-400{color:var(--aw-color-green-400)}.aw\\:text-primary{color:var(--aw-primary)}.aw\\:text-primary-foreground{color:var(--aw-primary-foreground)}.aw\\:text-red-300{color:var(--aw-color-red-300)}.aw\\:text-red-400{color:var(--aw-color-red-400)}.aw\\:text-white,.aw\\:text-white\\/70{color:var(--aw-color-white)}@supports (color:color-mix(in lab,red,red)){.aw\\:text-white\\/70{color:color-mix(in oklab,var(--aw-color-white)70%,transparent)}}.aw\\:underline-offset-4{text-underline-offset:4px}.aw\\:opacity-70{opacity:.7}.aw\\:bg-blend-multiply{background-blend-mode:multiply}.aw\\:shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.aw\\:shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.aw\\:shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.aw\\:backdrop-blur-lg{--tw-backdrop-blur:blur(var(--aw-blur-lg));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.aw\\:backdrop-blur-sm{--tw-backdrop-blur:blur(var(--aw-blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.aw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--aw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--aw-default-transition-duration))}.aw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--aw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--aw-default-transition-duration))}.aw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--aw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--aw-default-transition-duration))}.aw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.aw\\:ease-in-out{--tw-ease:var(--aw-ease-in-out);transition-timing-function:var(--aw-ease-in-out)}.aw\\:outline-none{--tw-outline-style:none;outline-style:none}.aw\\:select-none{-webkit-user-select:none;user-select:none}.aw\\:selection\\:bg-primary ::selection{background-color:var(--aw-primary)}.aw\\:selection\\:bg-primary::selection{background-color:var(--aw-primary)}.aw\\:selection\\:text-primary-foreground ::selection{color:var(--aw-primary-foreground)}.aw\\:selection\\:text-primary-foreground::selection{color:var(--aw-primary-foreground)}.aw\\:file\\:text-foreground::file-selector-button{color:var(--aw-foreground)}.aw\\:placeholder\\:text-white\\/50::placeholder{color:var(--aw-color-white)}@supports (color:color-mix(in lab,red,red)){.aw\\:placeholder\\:text-white\\/50::placeholder{color:color-mix(in oklab,var(--aw-color-white)50%,transparent)}}@media (hover:hover){.aw\\:hover\\:bg-blue-600:hover{background-color:var(--aw-color-blue-600)}.aw\\:hover\\:bg-gray-700:hover{background-color:var(--aw-color-gray-700)}.aw\\:hover\\:bg-primary\\/90:hover{background-color:var(--aw-primary)}@supports (color:color-mix(in lab,red,red)){.aw\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab,var(--aw-primary)90%,transparent)}}.aw\\:hover\\:bg-red-600:hover{background-color:var(--aw-color-red-600)}.aw\\:hover\\:bg-white\\/10:hover{background-color:var(--aw-color-white)}@supports (color:color-mix(in lab,red,red)){.aw\\:hover\\:bg-white\\/10:hover{background-color:color-mix(in oklab,var(--aw-color-white)10%,transparent)}}.aw\\:hover\\:text-white:hover,.aw\\:hover\\:text-white\\/80:hover{color:var(--aw-color-white)}@supports (color:color-mix(in lab,red,red)){.aw\\:hover\\:text-white\\/80:hover{color:color-mix(in oklab,var(--aw-color-white)80%,transparent)}}.aw\\:hover\\:underline:hover{text-decoration-line:underline}}.aw\\:focus\\:ring-primary:focus{--tw-ring-color:var(--aw-primary)}.aw\\:focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.aw\\:focus\\:ring-inset:focus{--tw-ring-inset:inset}.aw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.aw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.aw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.aw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.aw\\:disabled\\:opacity-50:disabled{opacity:.5}.aw\\:has-\\[\\>svg\\]\\:px-2\\.5:has(>svg){padding-inline:calc(var(--aw-spacing)*2.5)}.aw\\:has-\\[\\>svg\\]\\:px-3:has(>svg){padding-inline:calc(var(--aw-spacing)*3)}.aw\\:has-\\[\\>svg\\]\\:px-4:has(>svg){padding-inline:calc(var(--aw-spacing)*4)}@media (min-width:48rem){.aw\\:md\\:text-sm{font-size:var(--aw-text-sm);line-height:var(--tw-leading,var(--aw-text-sm--line-height))}}.aw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.aw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.aw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--aw-spacing)*4);height:calc(var(--aw-spacing)*4)}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}`;
class Fk extends HTMLElement {
  constructor() {
    super(...arguments), this.eventHandlers = /* @__PURE__ */ new Map();
  }
  connectedCallback() {
    const n = this.getAttribute("data-agent-id") ?? "undefined-agent", r = this.getAttribute("data-api-key") ?? "undefined-api-key", i = this.getAttribute("data-base-url") ?? "undefined-base-url", o = this.getAttribute("data-preview-mode") === "true", u = this.getAttribute("data-default-open") === "true", c = this.getAttribute("data-debug") === "true", h = this.attachShadow({ mode: "open" }), d = document.createElement("div");
    h.appendChild(d);
    const p = document.createElement("style");
    if (p.textContent = Qk, h.appendChild(p), !n || !r) {
      console.error("Missing required attributes. You need to provide at least agentId and apiKey");
      return;
    }
    this.root = JS.createRoot(d), this.root.render(
      /* @__PURE__ */ Z.jsx(
        Kk,
        {
          ref: (g) => {
            this.reactRef = g;
          },
          agentId: n,
          apiKey: r,
          baseUrl: i,
          options: {
            previewMode: o,
            defaultOpen: u,
            debug: c
          }
        }
      )
    );
  }
  disconnectedCallback() {
    this.root && this.root.unmount();
  }
  dispatchAction(n, r) {
    this.reactRef && this.reactRef.dispatchAction && this.reactRef.dispatchAction(n, r);
  }
}
customElements.get(pr) || customElements.define(pr, Fk);
window.audial = {
  loadWidget: ({ agentId: t, apiKey: n, baseUrl: r, options: i = {} }) => {
    console.log("[AudialWidget] Loading widget with agentId:", t, "apiKey:", n, "baseUrl:", r, "options:", i);
    const { previewMode: o, containerId: u, defaultOpen: c, debug: h } = i;
    document.querySelector(pr);
    const d = document.createElement(pr);
    if (d.setAttribute("data-agent-id", t), d.setAttribute("data-api-key", n), d.setAttribute("data-base-url", r ?? ""), d.setAttribute("data-preview-mode", o ? "true" : "false"), d.setAttribute("data-default-open", c ? "true" : "false"), d.setAttribute("data-debug", h ? "true" : "false"), u) {
      const p = document.getElementById(u);
      if (!p)
        return console.error(`[AudialWidget] Mount point with id ${u} not found`), null;
      p.appendChild(d);
    } else
      document.body.appendChild(d);
    return d;
  },
  getWidget: (t) => {
    if (t) {
      const n = document.getElementById(t);
      return n == null ? void 0 : n.querySelector(pr);
    }
    return document.querySelector(pr);
  },
  dispatchAction: (t, n, r) => {
    var o;
    const i = (o = window.audial) == null ? void 0 : o.getWidget(r);
    i && i.dispatchAction(t, n);
  }
};
