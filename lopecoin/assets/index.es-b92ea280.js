import { g as gu, a as vu, c as _r, _ as xb } from "./index-dfe7f50f.js";
var yu = { exports: {} },
  Pn = typeof Reflect == "object" ? Reflect : null,
  ql =
    Pn && typeof Pn.apply == "function"
      ? Pn.apply
      : function (e, r, s) {
          return Function.prototype.apply.call(e, r, s);
        },
  To;
Pn && typeof Pn.ownKeys == "function"
  ? (To = Pn.ownKeys)
  : Object.getOwnPropertySymbols
  ? (To = function (e) {
      return Object.getOwnPropertyNames(e).concat(
        Object.getOwnPropertySymbols(e)
      );
    })
  : (To = function (e) {
      return Object.getOwnPropertyNames(e);
    });
function Ob(i) {
  console && console.warn && console.warn(i);
}
var xd =
  Number.isNaN ||
  function (e) {
    return e !== e;
  };
function ot() {
  ot.init.call(this);
}
yu.exports = ot;
yu.exports.once = Tb;
ot.EventEmitter = ot;
ot.prototype._events = void 0;
ot.prototype._eventsCount = 0;
ot.prototype._maxListeners = void 0;
var zl = 10;
function zo(i) {
  if (typeof i != "function")
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof i
    );
}
Object.defineProperty(ot, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return zl;
  },
  set: function (i) {
    if (typeof i != "number" || i < 0 || xd(i))
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          i +
          "."
      );
    zl = i;
  },
});
ot.init = function () {
  (this._events === void 0 ||
    this._events === Object.getPrototypeOf(this)._events) &&
    ((this._events = Object.create(null)), (this._eventsCount = 0)),
    (this._maxListeners = this._maxListeners || void 0);
};
ot.prototype.setMaxListeners = function (e) {
  if (typeof e != "number" || e < 0 || xd(e))
    throw new RangeError(
      'The value of "n" is out of range. It must be a non-negative number. Received ' +
        e +
        "."
    );
  return (this._maxListeners = e), this;
};
function Od(i) {
  return i._maxListeners === void 0 ? ot.defaultMaxListeners : i._maxListeners;
}
ot.prototype.getMaxListeners = function () {
  return Od(this);
};
ot.prototype.emit = function (e) {
  for (var r = [], s = 1; s < arguments.length; s++) r.push(arguments[s]);
  var o = e === "error",
    c = this._events;
  if (c !== void 0) o = o && c.error === void 0;
  else if (!o) return !1;
  if (o) {
    var d;
    if ((r.length > 0 && (d = r[0]), d instanceof Error)) throw d;
    var f = new Error("Unhandled error." + (d ? " (" + d.message + ")" : ""));
    throw ((f.context = d), f);
  }
  var g = c[e];
  if (g === void 0) return !1;
  if (typeof g == "function") ql(g, this, r);
  else
    for (var w = g.length, D = Rd(g, w), s = 0; s < w; ++s) ql(D[s], this, r);
  return !0;
};
function Cd(i, e, r, s) {
  var o, c, d;
  if (
    (zo(r),
    (c = i._events),
    c === void 0
      ? ((c = i._events = Object.create(null)), (i._eventsCount = 0))
      : (c.newListener !== void 0 &&
          (i.emit("newListener", e, r.listener ? r.listener : r),
          (c = i._events)),
        (d = c[e])),
    d === void 0)
  )
    (d = c[e] = r), ++i._eventsCount;
  else if (
    (typeof d == "function"
      ? (d = c[e] = s ? [r, d] : [d, r])
      : s
      ? d.unshift(r)
      : d.push(r),
    (o = Od(i)),
    o > 0 && d.length > o && !d.warned)
  ) {
    d.warned = !0;
    var f = new Error(
      "Possible EventEmitter memory leak detected. " +
        d.length +
        " " +
        String(e) +
        " listeners added. Use emitter.setMaxListeners() to increase limit"
    );
    (f.name = "MaxListenersExceededWarning"),
      (f.emitter = i),
      (f.type = e),
      (f.count = d.length),
      Ob(f);
  }
  return i;
}
ot.prototype.addListener = function (e, r) {
  return Cd(this, e, r, !1);
};
ot.prototype.on = ot.prototype.addListener;
ot.prototype.prependListener = function (e, r) {
  return Cd(this, e, r, !0);
};
function Cb() {
  if (!this.fired)
    return (
      this.target.removeListener(this.type, this.wrapFn),
      (this.fired = !0),
      arguments.length === 0
        ? this.listener.call(this.target)
        : this.listener.apply(this.target, arguments)
    );
}
function Ad(i, e, r) {
  var s = { fired: !1, wrapFn: void 0, target: i, type: e, listener: r },
    o = Cb.bind(s);
  return (o.listener = r), (s.wrapFn = o), o;
}
ot.prototype.once = function (e, r) {
  return zo(r), this.on(e, Ad(this, e, r)), this;
};
ot.prototype.prependOnceListener = function (e, r) {
  return zo(r), this.prependListener(e, Ad(this, e, r)), this;
};
ot.prototype.removeListener = function (e, r) {
  var s, o, c, d, f;
  if ((zo(r), (o = this._events), o === void 0)) return this;
  if (((s = o[e]), s === void 0)) return this;
  if (s === r || s.listener === r)
    --this._eventsCount === 0
      ? (this._events = Object.create(null))
      : (delete o[e],
        o.removeListener && this.emit("removeListener", e, s.listener || r));
  else if (typeof s != "function") {
    for (c = -1, d = s.length - 1; d >= 0; d--)
      if (s[d] === r || s[d].listener === r) {
        (f = s[d].listener), (c = d);
        break;
      }
    if (c < 0) return this;
    c === 0 ? s.shift() : Ab(s, c),
      s.length === 1 && (o[e] = s[0]),
      o.removeListener !== void 0 && this.emit("removeListener", e, f || r);
  }
  return this;
};
ot.prototype.off = ot.prototype.removeListener;
ot.prototype.removeAllListeners = function (e) {
  var r, s, o;
  if (((s = this._events), s === void 0)) return this;
  if (s.removeListener === void 0)
    return (
      arguments.length === 0
        ? ((this._events = Object.create(null)), (this._eventsCount = 0))
        : s[e] !== void 0 &&
          (--this._eventsCount === 0
            ? (this._events = Object.create(null))
            : delete s[e]),
      this
    );
  if (arguments.length === 0) {
    var c = Object.keys(s),
      d;
    for (o = 0; o < c.length; ++o)
      (d = c[o]), d !== "removeListener" && this.removeAllListeners(d);
    return (
      this.removeAllListeners("removeListener"),
      (this._events = Object.create(null)),
      (this._eventsCount = 0),
      this
    );
  }
  if (((r = s[e]), typeof r == "function")) this.removeListener(e, r);
  else if (r !== void 0)
    for (o = r.length - 1; o >= 0; o--) this.removeListener(e, r[o]);
  return this;
};
function Pd(i, e, r) {
  var s = i._events;
  if (s === void 0) return [];
  var o = s[e];
  return o === void 0
    ? []
    : typeof o == "function"
    ? r
      ? [o.listener || o]
      : [o]
    : r
    ? Pb(o)
    : Rd(o, o.length);
}
ot.prototype.listeners = function (e) {
  return Pd(this, e, !0);
};
ot.prototype.rawListeners = function (e) {
  return Pd(this, e, !1);
};
ot.listenerCount = function (i, e) {
  return typeof i.listenerCount == "function"
    ? i.listenerCount(e)
    : Td.call(i, e);
};
ot.prototype.listenerCount = Td;
function Td(i) {
  var e = this._events;
  if (e !== void 0) {
    var r = e[i];
    if (typeof r == "function") return 1;
    if (r !== void 0) return r.length;
  }
  return 0;
}
ot.prototype.eventNames = function () {
  return this._eventsCount > 0 ? To(this._events) : [];
};
function Rd(i, e) {
  for (var r = new Array(e), s = 0; s < e; ++s) r[s] = i[s];
  return r;
}
function Ab(i, e) {
  for (; e + 1 < i.length; e++) i[e] = i[e + 1];
  i.pop();
}
function Pb(i) {
  for (var e = new Array(i.length), r = 0; r < e.length; ++r)
    e[r] = i[r].listener || i[r];
  return e;
}
function Tb(i, e) {
  return new Promise(function (r, s) {
    function o(d) {
      i.removeListener(e, c), s(d);
    }
    function c() {
      typeof i.removeListener == "function" && i.removeListener("error", o),
        r([].slice.call(arguments));
    }
    Nd(i, e, c, { once: !0 }), e !== "error" && Rb(i, o, { once: !0 });
  });
}
function Rb(i, e, r) {
  typeof i.on == "function" && Nd(i, "error", e, r);
}
function Nd(i, e, r, s) {
  if (typeof i.on == "function") s.once ? i.once(e, r) : i.on(e, r);
  else if (typeof i.addEventListener == "function")
    i.addEventListener(e, function o(c) {
      s.once && i.removeEventListener(e, o), r(c);
    });
  else
    throw new TypeError(
      'The "emitter" argument must be of type EventEmitter. Received type ' +
        typeof i
    );
}
var xr = yu.exports;
const _u = gu(xr);
var bu = {},
  Ho = {},
  Ue = {},
  Fd = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  function e(f, g) {
    var w = (f >>> 16) & 65535,
      D = f & 65535,
      R = (g >>> 16) & 65535,
      U = g & 65535;
    return (D * U + (((w * U + D * R) << 16) >>> 0)) | 0;
  }
  i.mul = Math.imul || e;
  function r(f, g) {
    return (f + g) | 0;
  }
  i.add = r;
  function s(f, g) {
    return (f - g) | 0;
  }
  i.sub = s;
  function o(f, g) {
    return (f << g) | (f >>> (32 - g));
  }
  i.rotl = o;
  function c(f, g) {
    return (f << (32 - g)) | (f >>> g);
  }
  i.rotr = c;
  function d(f) {
    return typeof f == "number" && isFinite(f) && Math.floor(f) === f;
  }
  (i.isInteger = Number.isInteger || d),
    (i.MAX_SAFE_INTEGER = 9007199254740991),
    (i.isSafeInteger = function (f) {
      return (
        i.isInteger(f) && f >= -i.MAX_SAFE_INTEGER && f <= i.MAX_SAFE_INTEGER
      );
    });
})(Fd);
Object.defineProperty(Ue, "__esModule", { value: !0 });
var Ld = Fd;
function Nb(i, e) {
  return e === void 0 && (e = 0), (((i[e + 0] << 8) | i[e + 1]) << 16) >> 16;
}
Ue.readInt16BE = Nb;
function Fb(i, e) {
  return e === void 0 && (e = 0), ((i[e + 0] << 8) | i[e + 1]) >>> 0;
}
Ue.readUint16BE = Fb;
function Lb(i, e) {
  return e === void 0 && (e = 0), (((i[e + 1] << 8) | i[e]) << 16) >> 16;
}
Ue.readInt16LE = Lb;
function Ub(i, e) {
  return e === void 0 && (e = 0), ((i[e + 1] << 8) | i[e]) >>> 0;
}
Ue.readUint16LE = Ub;
function Ud(i, e, r) {
  return (
    e === void 0 && (e = new Uint8Array(2)),
    r === void 0 && (r = 0),
    (e[r + 0] = i >>> 8),
    (e[r + 1] = i >>> 0),
    e
  );
}
Ue.writeUint16BE = Ud;
Ue.writeInt16BE = Ud;
function $d(i, e, r) {
  return (
    e === void 0 && (e = new Uint8Array(2)),
    r === void 0 && (r = 0),
    (e[r + 0] = i >>> 0),
    (e[r + 1] = i >>> 8),
    e
  );
}
Ue.writeUint16LE = $d;
Ue.writeInt16LE = $d;
function Wc(i, e) {
  return (
    e === void 0 && (e = 0),
    (i[e] << 24) | (i[e + 1] << 16) | (i[e + 2] << 8) | i[e + 3]
  );
}
Ue.readInt32BE = Wc;
function Gc(i, e) {
  return (
    e === void 0 && (e = 0),
    ((i[e] << 24) | (i[e + 1] << 16) | (i[e + 2] << 8) | i[e + 3]) >>> 0
  );
}
Ue.readUint32BE = Gc;
function Yc(i, e) {
  return (
    e === void 0 && (e = 0),
    (i[e + 3] << 24) | (i[e + 2] << 16) | (i[e + 1] << 8) | i[e]
  );
}
Ue.readInt32LE = Yc;
function Jc(i, e) {
  return (
    e === void 0 && (e = 0),
    ((i[e + 3] << 24) | (i[e + 2] << 16) | (i[e + 1] << 8) | i[e]) >>> 0
  );
}
Ue.readUint32LE = Jc;
function Lo(i, e, r) {
  return (
    e === void 0 && (e = new Uint8Array(4)),
    r === void 0 && (r = 0),
    (e[r + 0] = i >>> 24),
    (e[r + 1] = i >>> 16),
    (e[r + 2] = i >>> 8),
    (e[r + 3] = i >>> 0),
    e
  );
}
Ue.writeUint32BE = Lo;
Ue.writeInt32BE = Lo;
function Uo(i, e, r) {
  return (
    e === void 0 && (e = new Uint8Array(4)),
    r === void 0 && (r = 0),
    (e[r + 0] = i >>> 0),
    (e[r + 1] = i >>> 8),
    (e[r + 2] = i >>> 16),
    (e[r + 3] = i >>> 24),
    e
  );
}
Ue.writeUint32LE = Uo;
Ue.writeInt32LE = Uo;
function $b(i, e) {
  e === void 0 && (e = 0);
  var r = Wc(i, e),
    s = Wc(i, e + 4);
  return r * 4294967296 + s - (s >> 31) * 4294967296;
}
Ue.readInt64BE = $b;
function Mb(i, e) {
  e === void 0 && (e = 0);
  var r = Gc(i, e),
    s = Gc(i, e + 4);
  return r * 4294967296 + s;
}
Ue.readUint64BE = Mb;
function jb(i, e) {
  e === void 0 && (e = 0);
  var r = Yc(i, e),
    s = Yc(i, e + 4);
  return s * 4294967296 + r - (r >> 31) * 4294967296;
}
Ue.readInt64LE = jb;
function Bb(i, e) {
  e === void 0 && (e = 0);
  var r = Jc(i, e),
    s = Jc(i, e + 4);
  return s * 4294967296 + r;
}
Ue.readUint64LE = Bb;
function Md(i, e, r) {
  return (
    e === void 0 && (e = new Uint8Array(8)),
    r === void 0 && (r = 0),
    Lo((i / 4294967296) >>> 0, e, r),
    Lo(i >>> 0, e, r + 4),
    e
  );
}
Ue.writeUint64BE = Md;
Ue.writeInt64BE = Md;
function jd(i, e, r) {
  return (
    e === void 0 && (e = new Uint8Array(8)),
    r === void 0 && (r = 0),
    Uo(i >>> 0, e, r),
    Uo((i / 4294967296) >>> 0, e, r + 4),
    e
  );
}
Ue.writeUint64LE = jd;
Ue.writeInt64LE = jd;
function qb(i, e, r) {
  if ((r === void 0 && (r = 0), i % 8 !== 0))
    throw new Error("readUintBE supports only bitLengths divisible by 8");
  if (i / 8 > e.length - r)
    throw new Error("readUintBE: array is too short for the given bitLength");
  for (var s = 0, o = 1, c = i / 8 + r - 1; c >= r; c--)
    (s += e[c] * o), (o *= 256);
  return s;
}
Ue.readUintBE = qb;
function zb(i, e, r) {
  if ((r === void 0 && (r = 0), i % 8 !== 0))
    throw new Error("readUintLE supports only bitLengths divisible by 8");
  if (i / 8 > e.length - r)
    throw new Error("readUintLE: array is too short for the given bitLength");
  for (var s = 0, o = 1, c = r; c < r + i / 8; c++) (s += e[c] * o), (o *= 256);
  return s;
}
Ue.readUintLE = zb;
function Hb(i, e, r, s) {
  if (
    (r === void 0 && (r = new Uint8Array(i / 8)),
    s === void 0 && (s = 0),
    i % 8 !== 0)
  )
    throw new Error("writeUintBE supports only bitLengths divisible by 8");
  if (!Ld.isSafeInteger(e))
    throw new Error("writeUintBE value must be an integer");
  for (var o = 1, c = i / 8 + s - 1; c >= s; c--)
    (r[c] = (e / o) & 255), (o *= 256);
  return r;
}
Ue.writeUintBE = Hb;
function Kb(i, e, r, s) {
  if (
    (r === void 0 && (r = new Uint8Array(i / 8)),
    s === void 0 && (s = 0),
    i % 8 !== 0)
  )
    throw new Error("writeUintLE supports only bitLengths divisible by 8");
  if (!Ld.isSafeInteger(e))
    throw new Error("writeUintLE value must be an integer");
  for (var o = 1, c = s; c < s + i / 8; c++) (r[c] = (e / o) & 255), (o *= 256);
  return r;
}
Ue.writeUintLE = Kb;
function kb(i, e) {
  e === void 0 && (e = 0);
  var r = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return r.getFloat32(e);
}
Ue.readFloat32BE = kb;
function Vb(i, e) {
  e === void 0 && (e = 0);
  var r = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return r.getFloat32(e, !0);
}
Ue.readFloat32LE = Vb;
function Wb(i, e) {
  e === void 0 && (e = 0);
  var r = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return r.getFloat64(e);
}
Ue.readFloat64BE = Wb;
function Gb(i, e) {
  e === void 0 && (e = 0);
  var r = new DataView(i.buffer, i.byteOffset, i.byteLength);
  return r.getFloat64(e, !0);
}
Ue.readFloat64LE = Gb;
function Yb(i, e, r) {
  e === void 0 && (e = new Uint8Array(4)), r === void 0 && (r = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat32(r, i), e;
}
Ue.writeFloat32BE = Yb;
function Jb(i, e, r) {
  e === void 0 && (e = new Uint8Array(4)), r === void 0 && (r = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat32(r, i, !0), e;
}
Ue.writeFloat32LE = Jb;
function Xb(i, e, r) {
  e === void 0 && (e = new Uint8Array(8)), r === void 0 && (r = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat64(r, i), e;
}
Ue.writeFloat64BE = Xb;
function Qb(i, e, r) {
  e === void 0 && (e = new Uint8Array(8)), r === void 0 && (r = 0);
  var s = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return s.setFloat64(r, i, !0), e;
}
Ue.writeFloat64LE = Qb;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
function Zb(i) {
  for (var e = 0; e < i.length; e++) i[e] = 0;
  return i;
}
Or.wipe = Zb;
Object.defineProperty(Ho, "__esModule", { value: !0 });
var er = Ue,
  Xc = Or,
  em = 20;
function tm(i, e, r) {
  for (
    var s = 1634760805,
      o = 857760878,
      c = 2036477234,
      d = 1797285236,
      f = (r[3] << 24) | (r[2] << 16) | (r[1] << 8) | r[0],
      g = (r[7] << 24) | (r[6] << 16) | (r[5] << 8) | r[4],
      w = (r[11] << 24) | (r[10] << 16) | (r[9] << 8) | r[8],
      D = (r[15] << 24) | (r[14] << 16) | (r[13] << 8) | r[12],
      R = (r[19] << 24) | (r[18] << 16) | (r[17] << 8) | r[16],
      U = (r[23] << 24) | (r[22] << 16) | (r[21] << 8) | r[20],
      N = (r[27] << 24) | (r[26] << 16) | (r[25] << 8) | r[24],
      P = (r[31] << 24) | (r[30] << 16) | (r[29] << 8) | r[28],
      z = (e[3] << 24) | (e[2] << 16) | (e[1] << 8) | e[0],
      K = (e[7] << 24) | (e[6] << 16) | (e[5] << 8) | e[4],
      ne = (e[11] << 24) | (e[10] << 16) | (e[9] << 8) | e[8],
      T = (e[15] << 24) | (e[14] << 16) | (e[13] << 8) | e[12],
      $ = s,
      S = o,
      C = c,
      m = d,
      u = f,
      _ = g,
      W = w,
      G = D,
      se = R,
      ce = U,
      de = N,
      b = P,
      x = z,
      ee = K,
      X = ne,
      k = T,
      V = 0;
    V < em;
    V += 2
  )
    ($ = ($ + u) | 0),
      (x ^= $),
      (x = (x >>> (32 - 16)) | (x << 16)),
      (se = (se + x) | 0),
      (u ^= se),
      (u = (u >>> (32 - 12)) | (u << 12)),
      (S = (S + _) | 0),
      (ee ^= S),
      (ee = (ee >>> (32 - 16)) | (ee << 16)),
      (ce = (ce + ee) | 0),
      (_ ^= ce),
      (_ = (_ >>> (32 - 12)) | (_ << 12)),
      (C = (C + W) | 0),
      (X ^= C),
      (X = (X >>> (32 - 16)) | (X << 16)),
      (de = (de + X) | 0),
      (W ^= de),
      (W = (W >>> (32 - 12)) | (W << 12)),
      (m = (m + G) | 0),
      (k ^= m),
      (k = (k >>> (32 - 16)) | (k << 16)),
      (b = (b + k) | 0),
      (G ^= b),
      (G = (G >>> (32 - 12)) | (G << 12)),
      (C = (C + W) | 0),
      (X ^= C),
      (X = (X >>> (32 - 8)) | (X << 8)),
      (de = (de + X) | 0),
      (W ^= de),
      (W = (W >>> (32 - 7)) | (W << 7)),
      (m = (m + G) | 0),
      (k ^= m),
      (k = (k >>> (32 - 8)) | (k << 8)),
      (b = (b + k) | 0),
      (G ^= b),
      (G = (G >>> (32 - 7)) | (G << 7)),
      (S = (S + _) | 0),
      (ee ^= S),
      (ee = (ee >>> (32 - 8)) | (ee << 8)),
      (ce = (ce + ee) | 0),
      (_ ^= ce),
      (_ = (_ >>> (32 - 7)) | (_ << 7)),
      ($ = ($ + u) | 0),
      (x ^= $),
      (x = (x >>> (32 - 8)) | (x << 8)),
      (se = (se + x) | 0),
      (u ^= se),
      (u = (u >>> (32 - 7)) | (u << 7)),
      ($ = ($ + _) | 0),
      (k ^= $),
      (k = (k >>> (32 - 16)) | (k << 16)),
      (de = (de + k) | 0),
      (_ ^= de),
      (_ = (_ >>> (32 - 12)) | (_ << 12)),
      (S = (S + W) | 0),
      (x ^= S),
      (x = (x >>> (32 - 16)) | (x << 16)),
      (b = (b + x) | 0),
      (W ^= b),
      (W = (W >>> (32 - 12)) | (W << 12)),
      (C = (C + G) | 0),
      (ee ^= C),
      (ee = (ee >>> (32 - 16)) | (ee << 16)),
      (se = (se + ee) | 0),
      (G ^= se),
      (G = (G >>> (32 - 12)) | (G << 12)),
      (m = (m + u) | 0),
      (X ^= m),
      (X = (X >>> (32 - 16)) | (X << 16)),
      (ce = (ce + X) | 0),
      (u ^= ce),
      (u = (u >>> (32 - 12)) | (u << 12)),
      (C = (C + G) | 0),
      (ee ^= C),
      (ee = (ee >>> (32 - 8)) | (ee << 8)),
      (se = (se + ee) | 0),
      (G ^= se),
      (G = (G >>> (32 - 7)) | (G << 7)),
      (m = (m + u) | 0),
      (X ^= m),
      (X = (X >>> (32 - 8)) | (X << 8)),
      (ce = (ce + X) | 0),
      (u ^= ce),
      (u = (u >>> (32 - 7)) | (u << 7)),
      (S = (S + W) | 0),
      (x ^= S),
      (x = (x >>> (32 - 8)) | (x << 8)),
      (b = (b + x) | 0),
      (W ^= b),
      (W = (W >>> (32 - 7)) | (W << 7)),
      ($ = ($ + _) | 0),
      (k ^= $),
      (k = (k >>> (32 - 8)) | (k << 8)),
      (de = (de + k) | 0),
      (_ ^= de),
      (_ = (_ >>> (32 - 7)) | (_ << 7));
  er.writeUint32LE(($ + s) | 0, i, 0),
    er.writeUint32LE((S + o) | 0, i, 4),
    er.writeUint32LE((C + c) | 0, i, 8),
    er.writeUint32LE((m + d) | 0, i, 12),
    er.writeUint32LE((u + f) | 0, i, 16),
    er.writeUint32LE((_ + g) | 0, i, 20),
    er.writeUint32LE((W + w) | 0, i, 24),
    er.writeUint32LE((G + D) | 0, i, 28),
    er.writeUint32LE((se + R) | 0, i, 32),
    er.writeUint32LE((ce + U) | 0, i, 36),
    er.writeUint32LE((de + N) | 0, i, 40),
    er.writeUint32LE((b + P) | 0, i, 44),
    er.writeUint32LE((x + z) | 0, i, 48),
    er.writeUint32LE((ee + K) | 0, i, 52),
    er.writeUint32LE((X + ne) | 0, i, 56),
    er.writeUint32LE((k + T) | 0, i, 60);
}
function Bd(i, e, r, s, o) {
  if ((o === void 0 && (o = 0), i.length !== 32))
    throw new Error("ChaCha: key size must be 32 bytes");
  if (s.length < r.length)
    throw new Error("ChaCha: destination is shorter than source");
  var c, d;
  if (o === 0) {
    if (e.length !== 8 && e.length !== 12)
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    (c = new Uint8Array(16)), (d = c.length - e.length), c.set(e, d);
  } else {
    if (e.length !== 16)
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    (c = e), (d = o);
  }
  for (var f = new Uint8Array(64), g = 0; g < r.length; g += 64) {
    tm(f, c, i);
    for (var w = g; w < g + 64 && w < r.length; w++) s[w] = r[w] ^ f[w - g];
    im(c, 0, d);
  }
  return Xc.wipe(f), o === 0 && Xc.wipe(c), s;
}
Ho.streamXOR = Bd;
function rm(i, e, r, s) {
  return s === void 0 && (s = 0), Xc.wipe(r), Bd(i, e, r, r, s);
}
Ho.stream = rm;
function im(i, e, r) {
  for (var s = 1; r--; )
    (s = (s + (i[e] & 255)) | 0), (i[e] = s & 255), (s >>>= 8), e++;
  if (s > 0) throw new Error("ChaCha: counter overflow");
}
var qd = {},
  Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
function nm(i, e, r) {
  return (~(i - 1) & e) | ((i - 1) & r);
}
Ni.select = nm;
function sm(i, e) {
  return (((i | 0) - (e | 0) - 1) >>> 31) & 1;
}
Ni.lessOrEqual = sm;
function zd(i, e) {
  if (i.length !== e.length) return 0;
  for (var r = 0, s = 0; s < i.length; s++) r |= i[s] ^ e[s];
  return 1 & ((r - 1) >>> 8);
}
Ni.compare = zd;
function om(i, e) {
  return i.length === 0 || e.length === 0 ? !1 : zd(i, e) !== 0;
}
Ni.equal = om;
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ni,
    r = Or;
  i.DIGEST_LENGTH = 16;
  var s = (function () {
    function d(f) {
      (this.digestLength = i.DIGEST_LENGTH),
        (this._buffer = new Uint8Array(16)),
        (this._r = new Uint16Array(10)),
        (this._h = new Uint16Array(10)),
        (this._pad = new Uint16Array(8)),
        (this._leftover = 0),
        (this._fin = 0),
        (this._finished = !1);
      var g = f[0] | (f[1] << 8);
      this._r[0] = g & 8191;
      var w = f[2] | (f[3] << 8);
      this._r[1] = ((g >>> 13) | (w << 3)) & 8191;
      var D = f[4] | (f[5] << 8);
      this._r[2] = ((w >>> 10) | (D << 6)) & 7939;
      var R = f[6] | (f[7] << 8);
      this._r[3] = ((D >>> 7) | (R << 9)) & 8191;
      var U = f[8] | (f[9] << 8);
      (this._r[4] = ((R >>> 4) | (U << 12)) & 255),
        (this._r[5] = (U >>> 1) & 8190);
      var N = f[10] | (f[11] << 8);
      this._r[6] = ((U >>> 14) | (N << 2)) & 8191;
      var P = f[12] | (f[13] << 8);
      this._r[7] = ((N >>> 11) | (P << 5)) & 8065;
      var z = f[14] | (f[15] << 8);
      (this._r[8] = ((P >>> 8) | (z << 8)) & 8191),
        (this._r[9] = (z >>> 5) & 127),
        (this._pad[0] = f[16] | (f[17] << 8)),
        (this._pad[1] = f[18] | (f[19] << 8)),
        (this._pad[2] = f[20] | (f[21] << 8)),
        (this._pad[3] = f[22] | (f[23] << 8)),
        (this._pad[4] = f[24] | (f[25] << 8)),
        (this._pad[5] = f[26] | (f[27] << 8)),
        (this._pad[6] = f[28] | (f[29] << 8)),
        (this._pad[7] = f[30] | (f[31] << 8));
    }
    return (
      (d.prototype._blocks = function (f, g, w) {
        for (
          var D = this._fin ? 0 : 2048,
            R = this._h[0],
            U = this._h[1],
            N = this._h[2],
            P = this._h[3],
            z = this._h[4],
            K = this._h[5],
            ne = this._h[6],
            T = this._h[7],
            $ = this._h[8],
            S = this._h[9],
            C = this._r[0],
            m = this._r[1],
            u = this._r[2],
            _ = this._r[3],
            W = this._r[4],
            G = this._r[5],
            se = this._r[6],
            ce = this._r[7],
            de = this._r[8],
            b = this._r[9];
          w >= 16;

        ) {
          var x = f[g + 0] | (f[g + 1] << 8);
          R += x & 8191;
          var ee = f[g + 2] | (f[g + 3] << 8);
          U += ((x >>> 13) | (ee << 3)) & 8191;
          var X = f[g + 4] | (f[g + 5] << 8);
          N += ((ee >>> 10) | (X << 6)) & 8191;
          var k = f[g + 6] | (f[g + 7] << 8);
          P += ((X >>> 7) | (k << 9)) & 8191;
          var V = f[g + 8] | (f[g + 9] << 8);
          (z += ((k >>> 4) | (V << 12)) & 8191), (K += (V >>> 1) & 8191);
          var J = f[g + 10] | (f[g + 11] << 8);
          ne += ((V >>> 14) | (J << 2)) & 8191;
          var re = f[g + 12] | (f[g + 13] << 8);
          T += ((J >>> 11) | (re << 5)) & 8191;
          var me = f[g + 14] | (f[g + 15] << 8);
          ($ += ((re >>> 8) | (me << 8)) & 8191), (S += (me >>> 5) | D);
          var oe = 0,
            we = oe;
          (we += R * C),
            (we += U * (5 * b)),
            (we += N * (5 * de)),
            (we += P * (5 * ce)),
            (we += z * (5 * se)),
            (oe = we >>> 13),
            (we &= 8191),
            (we += K * (5 * G)),
            (we += ne * (5 * W)),
            (we += T * (5 * _)),
            (we += $ * (5 * u)),
            (we += S * (5 * m)),
            (oe += we >>> 13),
            (we &= 8191);
          var le = oe;
          (le += R * m),
            (le += U * C),
            (le += N * (5 * b)),
            (le += P * (5 * de)),
            (le += z * (5 * ce)),
            (oe = le >>> 13),
            (le &= 8191),
            (le += K * (5 * se)),
            (le += ne * (5 * G)),
            (le += T * (5 * W)),
            (le += $ * (5 * _)),
            (le += S * (5 * u)),
            (oe += le >>> 13),
            (le &= 8191);
          var _e = oe;
          (_e += R * u),
            (_e += U * m),
            (_e += N * C),
            (_e += P * (5 * b)),
            (_e += z * (5 * de)),
            (oe = _e >>> 13),
            (_e &= 8191),
            (_e += K * (5 * ce)),
            (_e += ne * (5 * se)),
            (_e += T * (5 * G)),
            (_e += $ * (5 * W)),
            (_e += S * (5 * _)),
            (oe += _e >>> 13),
            (_e &= 8191);
          var q = oe;
          (q += R * _),
            (q += U * u),
            (q += N * m),
            (q += P * C),
            (q += z * (5 * b)),
            (oe = q >>> 13),
            (q &= 8191),
            (q += K * (5 * de)),
            (q += ne * (5 * ce)),
            (q += T * (5 * se)),
            (q += $ * (5 * G)),
            (q += S * (5 * W)),
            (oe += q >>> 13),
            (q &= 8191);
          var B = oe;
          (B += R * W),
            (B += U * _),
            (B += N * u),
            (B += P * m),
            (B += z * C),
            (oe = B >>> 13),
            (B &= 8191),
            (B += K * (5 * b)),
            (B += ne * (5 * de)),
            (B += T * (5 * ce)),
            (B += $ * (5 * se)),
            (B += S * (5 * G)),
            (oe += B >>> 13),
            (B &= 8191);
          var F = oe;
          (F += R * G),
            (F += U * W),
            (F += N * _),
            (F += P * u),
            (F += z * m),
            (oe = F >>> 13),
            (F &= 8191),
            (F += K * C),
            (F += ne * (5 * b)),
            (F += T * (5 * de)),
            (F += $ * (5 * ce)),
            (F += S * (5 * se)),
            (oe += F >>> 13),
            (F &= 8191);
          var l = oe;
          (l += R * se),
            (l += U * G),
            (l += N * W),
            (l += P * _),
            (l += z * u),
            (oe = l >>> 13),
            (l &= 8191),
            (l += K * m),
            (l += ne * C),
            (l += T * (5 * b)),
            (l += $ * (5 * de)),
            (l += S * (5 * ce)),
            (oe += l >>> 13),
            (l &= 8191);
          var O = oe;
          (O += R * ce),
            (O += U * se),
            (O += N * G),
            (O += P * W),
            (O += z * _),
            (oe = O >>> 13),
            (O &= 8191),
            (O += K * u),
            (O += ne * m),
            (O += T * C),
            (O += $ * (5 * b)),
            (O += S * (5 * de)),
            (oe += O >>> 13),
            (O &= 8191);
          var ae = oe;
          (ae += R * de),
            (ae += U * ce),
            (ae += N * se),
            (ae += P * G),
            (ae += z * W),
            (oe = ae >>> 13),
            (ae &= 8191),
            (ae += K * _),
            (ae += ne * u),
            (ae += T * m),
            (ae += $ * C),
            (ae += S * (5 * b)),
            (oe += ae >>> 13),
            (ae &= 8191);
          var fe = oe;
          (fe += R * b),
            (fe += U * de),
            (fe += N * ce),
            (fe += P * se),
            (fe += z * G),
            (oe = fe >>> 13),
            (fe &= 8191),
            (fe += K * W),
            (fe += ne * _),
            (fe += T * u),
            (fe += $ * m),
            (fe += S * C),
            (oe += fe >>> 13),
            (fe &= 8191),
            (oe = ((oe << 2) + oe) | 0),
            (oe = (oe + we) | 0),
            (we = oe & 8191),
            (oe = oe >>> 13),
            (le += oe),
            (R = we),
            (U = le),
            (N = _e),
            (P = q),
            (z = B),
            (K = F),
            (ne = l),
            (T = O),
            ($ = ae),
            (S = fe),
            (g += 16),
            (w -= 16);
        }
        (this._h[0] = R),
          (this._h[1] = U),
          (this._h[2] = N),
          (this._h[3] = P),
          (this._h[4] = z),
          (this._h[5] = K),
          (this._h[6] = ne),
          (this._h[7] = T),
          (this._h[8] = $),
          (this._h[9] = S);
      }),
      (d.prototype.finish = function (f, g) {
        g === void 0 && (g = 0);
        var w = new Uint16Array(10),
          D,
          R,
          U,
          N;
        if (this._leftover) {
          for (N = this._leftover, this._buffer[N++] = 1; N < 16; N++)
            this._buffer[N] = 0;
          (this._fin = 1), this._blocks(this._buffer, 0, 16);
        }
        for (D = this._h[1] >>> 13, this._h[1] &= 8191, N = 2; N < 10; N++)
          (this._h[N] += D), (D = this._h[N] >>> 13), (this._h[N] &= 8191);
        for (
          this._h[0] += D * 5,
            D = this._h[0] >>> 13,
            this._h[0] &= 8191,
            this._h[1] += D,
            D = this._h[1] >>> 13,
            this._h[1] &= 8191,
            this._h[2] += D,
            w[0] = this._h[0] + 5,
            D = w[0] >>> 13,
            w[0] &= 8191,
            N = 1;
          N < 10;
          N++
        )
          (w[N] = this._h[N] + D), (D = w[N] >>> 13), (w[N] &= 8191);
        for (w[9] -= 8192, R = (D ^ 1) - 1, N = 0; N < 10; N++) w[N] &= R;
        for (R = ~R, N = 0; N < 10; N++) this._h[N] = (this._h[N] & R) | w[N];
        for (
          this._h[0] = (this._h[0] | (this._h[1] << 13)) & 65535,
            this._h[1] = ((this._h[1] >>> 3) | (this._h[2] << 10)) & 65535,
            this._h[2] = ((this._h[2] >>> 6) | (this._h[3] << 7)) & 65535,
            this._h[3] = ((this._h[3] >>> 9) | (this._h[4] << 4)) & 65535,
            this._h[4] =
              ((this._h[4] >>> 12) | (this._h[5] << 1) | (this._h[6] << 14)) &
              65535,
            this._h[5] = ((this._h[6] >>> 2) | (this._h[7] << 11)) & 65535,
            this._h[6] = ((this._h[7] >>> 5) | (this._h[8] << 8)) & 65535,
            this._h[7] = ((this._h[8] >>> 8) | (this._h[9] << 5)) & 65535,
            U = this._h[0] + this._pad[0],
            this._h[0] = U & 65535,
            N = 1;
          N < 8;
          N++
        )
          (U = (((this._h[N] + this._pad[N]) | 0) + (U >>> 16)) | 0),
            (this._h[N] = U & 65535);
        return (
          (f[g + 0] = this._h[0] >>> 0),
          (f[g + 1] = this._h[0] >>> 8),
          (f[g + 2] = this._h[1] >>> 0),
          (f[g + 3] = this._h[1] >>> 8),
          (f[g + 4] = this._h[2] >>> 0),
          (f[g + 5] = this._h[2] >>> 8),
          (f[g + 6] = this._h[3] >>> 0),
          (f[g + 7] = this._h[3] >>> 8),
          (f[g + 8] = this._h[4] >>> 0),
          (f[g + 9] = this._h[4] >>> 8),
          (f[g + 10] = this._h[5] >>> 0),
          (f[g + 11] = this._h[5] >>> 8),
          (f[g + 12] = this._h[6] >>> 0),
          (f[g + 13] = this._h[6] >>> 8),
          (f[g + 14] = this._h[7] >>> 0),
          (f[g + 15] = this._h[7] >>> 8),
          (this._finished = !0),
          this
        );
      }),
      (d.prototype.update = function (f) {
        var g = 0,
          w = f.length,
          D;
        if (this._leftover) {
          (D = 16 - this._leftover), D > w && (D = w);
          for (var R = 0; R < D; R++)
            this._buffer[this._leftover + R] = f[g + R];
          if (((w -= D), (g += D), (this._leftover += D), this._leftover < 16))
            return this;
          this._blocks(this._buffer, 0, 16), (this._leftover = 0);
        }
        if (
          (w >= 16 &&
            ((D = w - (w % 16)), this._blocks(f, g, D), (g += D), (w -= D)),
          w)
        ) {
          for (var R = 0; R < w; R++)
            this._buffer[this._leftover + R] = f[g + R];
          this._leftover += w;
        }
        return this;
      }),
      (d.prototype.digest = function () {
        if (this._finished) throw new Error("Poly1305 was finished");
        var f = new Uint8Array(16);
        return this.finish(f), f;
      }),
      (d.prototype.clean = function () {
        return (
          r.wipe(this._buffer),
          r.wipe(this._r),
          r.wipe(this._h),
          r.wipe(this._pad),
          (this._leftover = 0),
          (this._fin = 0),
          (this._finished = !0),
          this
        );
      }),
      d
    );
  })();
  i.Poly1305 = s;
  function o(d, f) {
    var g = new s(d);
    g.update(f);
    var w = g.digest();
    return g.clean(), w;
  }
  i.oneTimeAuth = o;
  function c(d, f) {
    return d.length !== i.DIGEST_LENGTH || f.length !== i.DIGEST_LENGTH
      ? !1
      : e.equal(d, f);
  }
  i.equal = c;
})(qd);
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ho,
    r = qd,
    s = Or,
    o = Ue,
    c = Ni;
  (i.KEY_LENGTH = 32), (i.NONCE_LENGTH = 12), (i.TAG_LENGTH = 16);
  var d = new Uint8Array(16),
    f = (function () {
      function g(w) {
        if (
          ((this.nonceLength = i.NONCE_LENGTH),
          (this.tagLength = i.TAG_LENGTH),
          w.length !== i.KEY_LENGTH)
        )
          throw new Error("ChaCha20Poly1305 needs 32-byte key");
        this._key = new Uint8Array(w);
      }
      return (
        (g.prototype.seal = function (w, D, R, U) {
          if (w.length > 16)
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          var N = new Uint8Array(16);
          N.set(w, N.length - w.length);
          var P = new Uint8Array(32);
          e.stream(this._key, N, P, 4);
          var z = D.length + this.tagLength,
            K;
          if (U) {
            if (U.length !== z)
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            K = U;
          } else K = new Uint8Array(z);
          return (
            e.streamXOR(this._key, N, D, K, 4),
            this._authenticate(
              K.subarray(K.length - this.tagLength, K.length),
              P,
              K.subarray(0, K.length - this.tagLength),
              R
            ),
            s.wipe(N),
            K
          );
        }),
        (g.prototype.open = function (w, D, R, U) {
          if (w.length > 16)
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          if (D.length < this.tagLength) return null;
          var N = new Uint8Array(16);
          N.set(w, N.length - w.length);
          var P = new Uint8Array(32);
          e.stream(this._key, N, P, 4);
          var z = new Uint8Array(this.tagLength);
          if (
            (this._authenticate(
              z,
              P,
              D.subarray(0, D.length - this.tagLength),
              R
            ),
            !c.equal(z, D.subarray(D.length - this.tagLength, D.length)))
          )
            return null;
          var K = D.length - this.tagLength,
            ne;
          if (U) {
            if (U.length !== K)
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            ne = U;
          } else ne = new Uint8Array(K);
          return (
            e.streamXOR(
              this._key,
              N,
              D.subarray(0, D.length - this.tagLength),
              ne,
              4
            ),
            s.wipe(N),
            ne
          );
        }),
        (g.prototype.clean = function () {
          return s.wipe(this._key), this;
        }),
        (g.prototype._authenticate = function (w, D, R, U) {
          var N = new r.Poly1305(D);
          U &&
            (N.update(U),
            U.length % 16 > 0 && N.update(d.subarray(U.length % 16))),
            N.update(R),
            R.length % 16 > 0 && N.update(d.subarray(R.length % 16));
          var P = new Uint8Array(8);
          U && o.writeUint64LE(U.length, P),
            N.update(P),
            o.writeUint64LE(R.length, P),
            N.update(P);
          for (var z = N.digest(), K = 0; K < z.length; K++) w[K] = z[K];
          N.clean(), s.wipe(z), s.wipe(P);
        }),
        g
      );
    })();
  i.ChaCha20Poly1305 = f;
})(bu);
var Hd = {},
  _s = {},
  mu = {};
Object.defineProperty(mu, "__esModule", { value: !0 });
function am(i) {
  return (
    typeof i.saveState < "u" &&
    typeof i.restoreState < "u" &&
    typeof i.cleanSavedState < "u"
  );
}
mu.isSerializableHash = am;
Object.defineProperty(_s, "__esModule", { value: !0 });
var ti = mu,
  cm = Ni,
  um = Or,
  Kd = (function () {
    function i(e, r) {
      (this._finished = !1),
        (this._inner = new e()),
        (this._outer = new e()),
        (this.blockSize = this._outer.blockSize),
        (this.digestLength = this._outer.digestLength);
      var s = new Uint8Array(this.blockSize);
      r.length > this.blockSize
        ? this._inner.update(r).finish(s).clean()
        : s.set(r);
      for (var o = 0; o < s.length; o++) s[o] ^= 54;
      this._inner.update(s);
      for (var o = 0; o < s.length; o++) s[o] ^= 106;
      this._outer.update(s),
        ti.isSerializableHash(this._inner) &&
          ti.isSerializableHash(this._outer) &&
          ((this._innerKeyedState = this._inner.saveState()),
          (this._outerKeyedState = this._outer.saveState())),
        um.wipe(s);
    }
    return (
      (i.prototype.reset = function () {
        if (
          !ti.isSerializableHash(this._inner) ||
          !ti.isSerializableHash(this._outer)
        )
          throw new Error(
            "hmac: can't reset() because hash doesn't implement restoreState()"
          );
        return (
          this._inner.restoreState(this._innerKeyedState),
          this._outer.restoreState(this._outerKeyedState),
          (this._finished = !1),
          this
        );
      }),
      (i.prototype.clean = function () {
        ti.isSerializableHash(this._inner) &&
          this._inner.cleanSavedState(this._innerKeyedState),
          ti.isSerializableHash(this._outer) &&
            this._outer.cleanSavedState(this._outerKeyedState),
          this._inner.clean(),
          this._outer.clean();
      }),
      (i.prototype.update = function (e) {
        return this._inner.update(e), this;
      }),
      (i.prototype.finish = function (e) {
        return this._finished
          ? (this._outer.finish(e), this)
          : (this._inner.finish(e),
            this._outer.update(e.subarray(0, this.digestLength)).finish(e),
            (this._finished = !0),
            this);
      }),
      (i.prototype.digest = function () {
        var e = new Uint8Array(this.digestLength);
        return this.finish(e), e;
      }),
      (i.prototype.saveState = function () {
        if (!ti.isSerializableHash(this._inner))
          throw new Error(
            "hmac: can't saveState() because hash doesn't implement it"
          );
        return this._inner.saveState();
      }),
      (i.prototype.restoreState = function (e) {
        if (
          !ti.isSerializableHash(this._inner) ||
          !ti.isSerializableHash(this._outer)
        )
          throw new Error(
            "hmac: can't restoreState() because hash doesn't implement it"
          );
        return (
          this._inner.restoreState(e),
          this._outer.restoreState(this._outerKeyedState),
          (this._finished = !1),
          this
        );
      }),
      (i.prototype.cleanSavedState = function (e) {
        if (!ti.isSerializableHash(this._inner))
          throw new Error(
            "hmac: can't cleanSavedState() because hash doesn't implement it"
          );
        this._inner.cleanSavedState(e);
      }),
      i
    );
  })();
_s.HMAC = Kd;
function hm(i, e, r) {
  var s = new Kd(i, e);
  s.update(r);
  var o = s.digest();
  return s.clean(), o;
}
_s.hmac = hm;
_s.equal = cm.equal;
Object.defineProperty(Hd, "__esModule", { value: !0 });
var Hl = _s,
  Kl = Or,
  lm = (function () {
    function i(e, r, s, o) {
      s === void 0 && (s = new Uint8Array(0)),
        (this._counter = new Uint8Array(1)),
        (this._hash = e),
        (this._info = o);
      var c = Hl.hmac(this._hash, s, r);
      (this._hmac = new Hl.HMAC(e, c)),
        (this._buffer = new Uint8Array(this._hmac.digestLength)),
        (this._bufpos = this._buffer.length);
    }
    return (
      (i.prototype._fillBuffer = function () {
        this._counter[0]++;
        var e = this._counter[0];
        if (e === 0) throw new Error("hkdf: cannot expand more");
        this._hmac.reset(),
          e > 1 && this._hmac.update(this._buffer),
          this._info && this._hmac.update(this._info),
          this._hmac.update(this._counter),
          this._hmac.finish(this._buffer),
          (this._bufpos = 0);
      }),
      (i.prototype.expand = function (e) {
        for (var r = new Uint8Array(e), s = 0; s < r.length; s++)
          this._bufpos === this._buffer.length && this._fillBuffer(),
            (r[s] = this._buffer[this._bufpos++]);
        return r;
      }),
      (i.prototype.clean = function () {
        this._hmac.clean(),
          Kl.wipe(this._buffer),
          Kl.wipe(this._counter),
          (this._bufpos = 0);
      }),
      i
    );
  })(),
  fm = (Hd.HKDF = lm),
  Nn = {},
  Ko = {},
  ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
ko.BrowserRandomSource = void 0;
const kl = 65536;
class dm {
  constructor() {
    (this.isAvailable = !1), (this.isInstantiated = !1);
    const e = typeof self < "u" ? self.crypto || self.msCrypto : null;
    e &&
      e.getRandomValues !== void 0 &&
      ((this._crypto = e), (this.isAvailable = !0), (this.isInstantiated = !0));
  }
  randomBytes(e) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Browser random byte generator is not available.");
    const r = new Uint8Array(e);
    for (let s = 0; s < r.length; s += kl)
      this._crypto.getRandomValues(
        r.subarray(s, s + Math.min(r.length - s, kl))
      );
    return r;
  }
}
ko.BrowserRandomSource = dm;
function pm(i) {
  throw new Error(
    'Could not dynamically require "' +
      i +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  );
}
var Vo = {};
const gm = {},
  vm = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: gm },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ym = vu(vm);
Object.defineProperty(Vo, "__esModule", { value: !0 });
Vo.NodeRandomSource = void 0;
const _m = Or;
class bm {
  constructor() {
    if (
      ((this.isAvailable = !1), (this.isInstantiated = !1), typeof pm < "u")
    ) {
      const e = ym;
      e &&
        e.randomBytes &&
        ((this._crypto = e),
        (this.isAvailable = !0),
        (this.isInstantiated = !0));
    }
  }
  randomBytes(e) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Node.js random byte generator is not available.");
    let r = this._crypto.randomBytes(e);
    if (r.length !== e)
      throw new Error("NodeRandomSource: got fewer bytes than requested");
    const s = new Uint8Array(e);
    for (let o = 0; o < s.length; o++) s[o] = r[o];
    return (0, _m.wipe)(r), s;
  }
}
Vo.NodeRandomSource = bm;
Object.defineProperty(Ko, "__esModule", { value: !0 });
Ko.SystemRandomSource = void 0;
const mm = ko,
  wm = Vo;
class Em {
  constructor() {
    if (
      ((this.isAvailable = !1),
      (this.name = ""),
      (this._source = new mm.BrowserRandomSource()),
      this._source.isAvailable)
    ) {
      (this.isAvailable = !0), (this.name = "Browser");
      return;
    }
    if (
      ((this._source = new wm.NodeRandomSource()), this._source.isAvailable)
    ) {
      (this.isAvailable = !0), (this.name = "Node");
      return;
    }
  }
  randomBytes(e) {
    if (!this.isAvailable)
      throw new Error("System random byte generator is not available.");
    return this._source.randomBytes(e);
  }
}
Ko.SystemRandomSource = Em;
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }),
    (i.randomStringForEntropy =
      i.randomString =
      i.randomUint32 =
      i.randomBytes =
      i.defaultRandomSource =
        void 0);
  const e = Ko,
    r = Ue,
    s = Or;
  i.defaultRandomSource = new e.SystemRandomSource();
  function o(w, D = i.defaultRandomSource) {
    return D.randomBytes(w);
  }
  i.randomBytes = o;
  function c(w = i.defaultRandomSource) {
    const D = o(4, w),
      R = (0, r.readUint32LE)(D);
    return (0, s.wipe)(D), R;
  }
  i.randomUint32 = c;
  const d = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function f(w, D = d, R = i.defaultRandomSource) {
    if (D.length < 2) throw new Error("randomString charset is too short");
    if (D.length > 256) throw new Error("randomString charset is too long");
    let U = "";
    const N = D.length,
      P = 256 - (256 % N);
    for (; w > 0; ) {
      const z = o(Math.ceil((w * 256) / P), R);
      for (let K = 0; K < z.length && w > 0; K++) {
        const ne = z[K];
        ne < P && ((U += D.charAt(ne % N)), w--);
      }
      (0, s.wipe)(z);
    }
    return U;
  }
  i.randomString = f;
  function g(w, D = d, R = i.defaultRandomSource) {
    const U = Math.ceil(w / (Math.log(D.length) / Math.LN2));
    return f(U, D, R);
  }
  i.randomStringForEntropy = g;
})(Nn);
var Wo = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ue,
    r = Or;
  (i.DIGEST_LENGTH = 32), (i.BLOCK_SIZE = 64);
  var s = (function () {
    function f() {
      (this.digestLength = i.DIGEST_LENGTH),
        (this.blockSize = i.BLOCK_SIZE),
        (this._state = new Int32Array(8)),
        (this._temp = new Int32Array(64)),
        (this._buffer = new Uint8Array(128)),
        (this._bufferLength = 0),
        (this._bytesHashed = 0),
        (this._finished = !1),
        this.reset();
    }
    return (
      (f.prototype._initState = function () {
        (this._state[0] = 1779033703),
          (this._state[1] = 3144134277),
          (this._state[2] = 1013904242),
          (this._state[3] = 2773480762),
          (this._state[4] = 1359893119),
          (this._state[5] = 2600822924),
          (this._state[6] = 528734635),
          (this._state[7] = 1541459225);
      }),
      (f.prototype.reset = function () {
        return (
          this._initState(),
          (this._bufferLength = 0),
          (this._bytesHashed = 0),
          (this._finished = !1),
          this
        );
      }),
      (f.prototype.clean = function () {
        r.wipe(this._buffer), r.wipe(this._temp), this.reset();
      }),
      (f.prototype.update = function (g, w) {
        if ((w === void 0 && (w = g.length), this._finished))
          throw new Error("SHA256: can't update because hash was finished.");
        var D = 0;
        if (((this._bytesHashed += w), this._bufferLength > 0)) {
          for (; this._bufferLength < this.blockSize && w > 0; )
            (this._buffer[this._bufferLength++] = g[D++]), w--;
          this._bufferLength === this.blockSize &&
            (c(this._temp, this._state, this._buffer, 0, this.blockSize),
            (this._bufferLength = 0));
        }
        for (
          w >= this.blockSize &&
          ((D = c(this._temp, this._state, g, D, w)), (w %= this.blockSize));
          w > 0;

        )
          (this._buffer[this._bufferLength++] = g[D++]), w--;
        return this;
      }),
      (f.prototype.finish = function (g) {
        if (!this._finished) {
          var w = this._bytesHashed,
            D = this._bufferLength,
            R = (w / 536870912) | 0,
            U = w << 3,
            N = w % 64 < 56 ? 64 : 128;
          this._buffer[D] = 128;
          for (var P = D + 1; P < N - 8; P++) this._buffer[P] = 0;
          e.writeUint32BE(R, this._buffer, N - 8),
            e.writeUint32BE(U, this._buffer, N - 4),
            c(this._temp, this._state, this._buffer, 0, N),
            (this._finished = !0);
        }
        for (var P = 0; P < this.digestLength / 4; P++)
          e.writeUint32BE(this._state[P], g, P * 4);
        return this;
      }),
      (f.prototype.digest = function () {
        var g = new Uint8Array(this.digestLength);
        return this.finish(g), g;
      }),
      (f.prototype.saveState = function () {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          state: new Int32Array(this._state),
          buffer:
            this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed,
        };
      }),
      (f.prototype.restoreState = function (g) {
        return (
          this._state.set(g.state),
          (this._bufferLength = g.bufferLength),
          g.buffer && this._buffer.set(g.buffer),
          (this._bytesHashed = g.bytesHashed),
          (this._finished = !1),
          this
        );
      }),
      (f.prototype.cleanSavedState = function (g) {
        r.wipe(g.state),
          g.buffer && r.wipe(g.buffer),
          (g.bufferLength = 0),
          (g.bytesHashed = 0);
      }),
      f
    );
  })();
  i.SHA256 = s;
  var o = new Int32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]);
  function c(f, g, w, D, R) {
    for (; R >= 64; ) {
      for (
        var U = g[0],
          N = g[1],
          P = g[2],
          z = g[3],
          K = g[4],
          ne = g[5],
          T = g[6],
          $ = g[7],
          S = 0;
        S < 16;
        S++
      ) {
        var C = D + S * 4;
        f[S] = e.readUint32BE(w, C);
      }
      for (var S = 16; S < 64; S++) {
        var m = f[S - 2],
          u =
            ((m >>> 17) | (m << (32 - 17))) ^
            ((m >>> 19) | (m << (32 - 19))) ^
            (m >>> 10);
        m = f[S - 15];
        var _ =
          ((m >>> 7) | (m << (32 - 7))) ^
          ((m >>> 18) | (m << (32 - 18))) ^
          (m >>> 3);
        f[S] = ((u + f[S - 7]) | 0) + ((_ + f[S - 16]) | 0);
      }
      for (var S = 0; S < 64; S++) {
        var u =
            ((((((K >>> 6) | (K << 26)) ^
              ((K >>> 11) | (K << 21)) ^
              ((K >>> 25) | (K << 7))) +
              ((K & ne) ^ (~K & T))) |
              0) +
              (($ + ((o[S] + f[S]) | 0)) | 0)) |
            0,
          _ =
            ((((U >>> 2) | (U << (32 - 2))) ^
              ((U >>> 13) | (U << (32 - 13))) ^
              ((U >>> 22) | (U << (32 - 22)))) +
              ((U & N) ^ (U & P) ^ (N & P))) |
            0;
        ($ = T),
          (T = ne),
          (ne = K),
          (K = (z + u) | 0),
          (z = P),
          (P = N),
          (N = U),
          (U = (u + _) | 0);
      }
      (g[0] += U),
        (g[1] += N),
        (g[2] += P),
        (g[3] += z),
        (g[4] += K),
        (g[5] += ne),
        (g[6] += T),
        (g[7] += $),
        (D += 64),
        (R -= 64);
    }
    return D;
  }
  function d(f) {
    var g = new s();
    g.update(f);
    var w = g.digest();
    return g.clean(), w;
  }
  i.hash = d;
})(Wo);
var wu = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }),
    (i.sharedKey =
      i.generateKeyPair =
      i.generateKeyPairFromSeed =
      i.scalarMultBase =
      i.scalarMult =
      i.SHARED_KEY_LENGTH =
      i.SECRET_KEY_LENGTH =
      i.PUBLIC_KEY_LENGTH =
        void 0);
  const e = Nn,
    r = Or;
  (i.PUBLIC_KEY_LENGTH = 32),
    (i.SECRET_KEY_LENGTH = 32),
    (i.SHARED_KEY_LENGTH = 32);
  function s(S) {
    const C = new Float64Array(16);
    if (S) for (let m = 0; m < S.length; m++) C[m] = S[m];
    return C;
  }
  const o = new Uint8Array(32);
  o[0] = 9;
  const c = s([56129, 1]);
  function d(S) {
    let C = 1;
    for (let m = 0; m < 16; m++) {
      let u = S[m] + C + 65535;
      (C = Math.floor(u / 65536)), (S[m] = u - C * 65536);
    }
    S[0] += C - 1 + 37 * (C - 1);
  }
  function f(S, C, m) {
    const u = ~(m - 1);
    for (let _ = 0; _ < 16; _++) {
      const W = u & (S[_] ^ C[_]);
      (S[_] ^= W), (C[_] ^= W);
    }
  }
  function g(S, C) {
    const m = s(),
      u = s();
    for (let _ = 0; _ < 16; _++) u[_] = C[_];
    d(u), d(u), d(u);
    for (let _ = 0; _ < 2; _++) {
      m[0] = u[0] - 65517;
      for (let G = 1; G < 15; G++)
        (m[G] = u[G] - 65535 - ((m[G - 1] >> 16) & 1)), (m[G - 1] &= 65535);
      m[15] = u[15] - 32767 - ((m[14] >> 16) & 1);
      const W = (m[15] >> 16) & 1;
      (m[14] &= 65535), f(u, m, 1 - W);
    }
    for (let _ = 0; _ < 16; _++)
      (S[2 * _] = u[_] & 255), (S[2 * _ + 1] = u[_] >> 8);
  }
  function w(S, C) {
    for (let m = 0; m < 16; m++) S[m] = C[2 * m] + (C[2 * m + 1] << 8);
    S[15] &= 32767;
  }
  function D(S, C, m) {
    for (let u = 0; u < 16; u++) S[u] = C[u] + m[u];
  }
  function R(S, C, m) {
    for (let u = 0; u < 16; u++) S[u] = C[u] - m[u];
  }
  function U(S, C, m) {
    let u,
      _,
      W = 0,
      G = 0,
      se = 0,
      ce = 0,
      de = 0,
      b = 0,
      x = 0,
      ee = 0,
      X = 0,
      k = 0,
      V = 0,
      J = 0,
      re = 0,
      me = 0,
      oe = 0,
      we = 0,
      le = 0,
      _e = 0,
      q = 0,
      B = 0,
      F = 0,
      l = 0,
      O = 0,
      ae = 0,
      fe = 0,
      Ie = 0,
      ze = 0,
      ke = 0,
      $e = 0,
      gt = 0,
      vt = 0,
      je = m[0],
      xe = m[1],
      Ne = m[2],
      Fe = m[3],
      Be = m[4],
      Ce = m[5],
      Le = m[6],
      Se = m[7],
      Ae = m[8],
      He = m[9],
      Oe = m[10],
      Ve = m[11],
      Ge = m[12],
      et = m[13],
      tt = m[14],
      Je = m[15];
    (u = C[0]),
      (W += u * je),
      (G += u * xe),
      (se += u * Ne),
      (ce += u * Fe),
      (de += u * Be),
      (b += u * Ce),
      (x += u * Le),
      (ee += u * Se),
      (X += u * Ae),
      (k += u * He),
      (V += u * Oe),
      (J += u * Ve),
      (re += u * Ge),
      (me += u * et),
      (oe += u * tt),
      (we += u * Je),
      (u = C[1]),
      (G += u * je),
      (se += u * xe),
      (ce += u * Ne),
      (de += u * Fe),
      (b += u * Be),
      (x += u * Ce),
      (ee += u * Le),
      (X += u * Se),
      (k += u * Ae),
      (V += u * He),
      (J += u * Oe),
      (re += u * Ve),
      (me += u * Ge),
      (oe += u * et),
      (we += u * tt),
      (le += u * Je),
      (u = C[2]),
      (se += u * je),
      (ce += u * xe),
      (de += u * Ne),
      (b += u * Fe),
      (x += u * Be),
      (ee += u * Ce),
      (X += u * Le),
      (k += u * Se),
      (V += u * Ae),
      (J += u * He),
      (re += u * Oe),
      (me += u * Ve),
      (oe += u * Ge),
      (we += u * et),
      (le += u * tt),
      (_e += u * Je),
      (u = C[3]),
      (ce += u * je),
      (de += u * xe),
      (b += u * Ne),
      (x += u * Fe),
      (ee += u * Be),
      (X += u * Ce),
      (k += u * Le),
      (V += u * Se),
      (J += u * Ae),
      (re += u * He),
      (me += u * Oe),
      (oe += u * Ve),
      (we += u * Ge),
      (le += u * et),
      (_e += u * tt),
      (q += u * Je),
      (u = C[4]),
      (de += u * je),
      (b += u * xe),
      (x += u * Ne),
      (ee += u * Fe),
      (X += u * Be),
      (k += u * Ce),
      (V += u * Le),
      (J += u * Se),
      (re += u * Ae),
      (me += u * He),
      (oe += u * Oe),
      (we += u * Ve),
      (le += u * Ge),
      (_e += u * et),
      (q += u * tt),
      (B += u * Je),
      (u = C[5]),
      (b += u * je),
      (x += u * xe),
      (ee += u * Ne),
      (X += u * Fe),
      (k += u * Be),
      (V += u * Ce),
      (J += u * Le),
      (re += u * Se),
      (me += u * Ae),
      (oe += u * He),
      (we += u * Oe),
      (le += u * Ve),
      (_e += u * Ge),
      (q += u * et),
      (B += u * tt),
      (F += u * Je),
      (u = C[6]),
      (x += u * je),
      (ee += u * xe),
      (X += u * Ne),
      (k += u * Fe),
      (V += u * Be),
      (J += u * Ce),
      (re += u * Le),
      (me += u * Se),
      (oe += u * Ae),
      (we += u * He),
      (le += u * Oe),
      (_e += u * Ve),
      (q += u * Ge),
      (B += u * et),
      (F += u * tt),
      (l += u * Je),
      (u = C[7]),
      (ee += u * je),
      (X += u * xe),
      (k += u * Ne),
      (V += u * Fe),
      (J += u * Be),
      (re += u * Ce),
      (me += u * Le),
      (oe += u * Se),
      (we += u * Ae),
      (le += u * He),
      (_e += u * Oe),
      (q += u * Ve),
      (B += u * Ge),
      (F += u * et),
      (l += u * tt),
      (O += u * Je),
      (u = C[8]),
      (X += u * je),
      (k += u * xe),
      (V += u * Ne),
      (J += u * Fe),
      (re += u * Be),
      (me += u * Ce),
      (oe += u * Le),
      (we += u * Se),
      (le += u * Ae),
      (_e += u * He),
      (q += u * Oe),
      (B += u * Ve),
      (F += u * Ge),
      (l += u * et),
      (O += u * tt),
      (ae += u * Je),
      (u = C[9]),
      (k += u * je),
      (V += u * xe),
      (J += u * Ne),
      (re += u * Fe),
      (me += u * Be),
      (oe += u * Ce),
      (we += u * Le),
      (le += u * Se),
      (_e += u * Ae),
      (q += u * He),
      (B += u * Oe),
      (F += u * Ve),
      (l += u * Ge),
      (O += u * et),
      (ae += u * tt),
      (fe += u * Je),
      (u = C[10]),
      (V += u * je),
      (J += u * xe),
      (re += u * Ne),
      (me += u * Fe),
      (oe += u * Be),
      (we += u * Ce),
      (le += u * Le),
      (_e += u * Se),
      (q += u * Ae),
      (B += u * He),
      (F += u * Oe),
      (l += u * Ve),
      (O += u * Ge),
      (ae += u * et),
      (fe += u * tt),
      (Ie += u * Je),
      (u = C[11]),
      (J += u * je),
      (re += u * xe),
      (me += u * Ne),
      (oe += u * Fe),
      (we += u * Be),
      (le += u * Ce),
      (_e += u * Le),
      (q += u * Se),
      (B += u * Ae),
      (F += u * He),
      (l += u * Oe),
      (O += u * Ve),
      (ae += u * Ge),
      (fe += u * et),
      (Ie += u * tt),
      (ze += u * Je),
      (u = C[12]),
      (re += u * je),
      (me += u * xe),
      (oe += u * Ne),
      (we += u * Fe),
      (le += u * Be),
      (_e += u * Ce),
      (q += u * Le),
      (B += u * Se),
      (F += u * Ae),
      (l += u * He),
      (O += u * Oe),
      (ae += u * Ve),
      (fe += u * Ge),
      (Ie += u * et),
      (ze += u * tt),
      (ke += u * Je),
      (u = C[13]),
      (me += u * je),
      (oe += u * xe),
      (we += u * Ne),
      (le += u * Fe),
      (_e += u * Be),
      (q += u * Ce),
      (B += u * Le),
      (F += u * Se),
      (l += u * Ae),
      (O += u * He),
      (ae += u * Oe),
      (fe += u * Ve),
      (Ie += u * Ge),
      (ze += u * et),
      (ke += u * tt),
      ($e += u * Je),
      (u = C[14]),
      (oe += u * je),
      (we += u * xe),
      (le += u * Ne),
      (_e += u * Fe),
      (q += u * Be),
      (B += u * Ce),
      (F += u * Le),
      (l += u * Se),
      (O += u * Ae),
      (ae += u * He),
      (fe += u * Oe),
      (Ie += u * Ve),
      (ze += u * Ge),
      (ke += u * et),
      ($e += u * tt),
      (gt += u * Je),
      (u = C[15]),
      (we += u * je),
      (le += u * xe),
      (_e += u * Ne),
      (q += u * Fe),
      (B += u * Be),
      (F += u * Ce),
      (l += u * Le),
      (O += u * Se),
      (ae += u * Ae),
      (fe += u * He),
      (Ie += u * Oe),
      (ze += u * Ve),
      (ke += u * Ge),
      ($e += u * et),
      (gt += u * tt),
      (vt += u * Je),
      (W += 38 * le),
      (G += 38 * _e),
      (se += 38 * q),
      (ce += 38 * B),
      (de += 38 * F),
      (b += 38 * l),
      (x += 38 * O),
      (ee += 38 * ae),
      (X += 38 * fe),
      (k += 38 * Ie),
      (V += 38 * ze),
      (J += 38 * ke),
      (re += 38 * $e),
      (me += 38 * gt),
      (oe += 38 * vt),
      (_ = 1),
      (u = W + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (W = u - _ * 65536),
      (u = G + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (G = u - _ * 65536),
      (u = se + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (se = u - _ * 65536),
      (u = ce + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (ce = u - _ * 65536),
      (u = de + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (de = u - _ * 65536),
      (u = b + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (b = u - _ * 65536),
      (u = x + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (x = u - _ * 65536),
      (u = ee + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (ee = u - _ * 65536),
      (u = X + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (X = u - _ * 65536),
      (u = k + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (k = u - _ * 65536),
      (u = V + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (V = u - _ * 65536),
      (u = J + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (J = u - _ * 65536),
      (u = re + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (re = u - _ * 65536),
      (u = me + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (me = u - _ * 65536),
      (u = oe + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (oe = u - _ * 65536),
      (u = we + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (we = u - _ * 65536),
      (W += _ - 1 + 37 * (_ - 1)),
      (_ = 1),
      (u = W + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (W = u - _ * 65536),
      (u = G + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (G = u - _ * 65536),
      (u = se + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (se = u - _ * 65536),
      (u = ce + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (ce = u - _ * 65536),
      (u = de + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (de = u - _ * 65536),
      (u = b + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (b = u - _ * 65536),
      (u = x + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (x = u - _ * 65536),
      (u = ee + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (ee = u - _ * 65536),
      (u = X + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (X = u - _ * 65536),
      (u = k + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (k = u - _ * 65536),
      (u = V + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (V = u - _ * 65536),
      (u = J + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (J = u - _ * 65536),
      (u = re + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (re = u - _ * 65536),
      (u = me + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (me = u - _ * 65536),
      (u = oe + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (oe = u - _ * 65536),
      (u = we + _ + 65535),
      (_ = Math.floor(u / 65536)),
      (we = u - _ * 65536),
      (W += _ - 1 + 37 * (_ - 1)),
      (S[0] = W),
      (S[1] = G),
      (S[2] = se),
      (S[3] = ce),
      (S[4] = de),
      (S[5] = b),
      (S[6] = x),
      (S[7] = ee),
      (S[8] = X),
      (S[9] = k),
      (S[10] = V),
      (S[11] = J),
      (S[12] = re),
      (S[13] = me),
      (S[14] = oe),
      (S[15] = we);
  }
  function N(S, C) {
    U(S, C, C);
  }
  function P(S, C) {
    const m = s();
    for (let u = 0; u < 16; u++) m[u] = C[u];
    for (let u = 253; u >= 0; u--) N(m, m), u !== 2 && u !== 4 && U(m, m, C);
    for (let u = 0; u < 16; u++) S[u] = m[u];
  }
  function z(S, C) {
    const m = new Uint8Array(32),
      u = new Float64Array(80),
      _ = s(),
      W = s(),
      G = s(),
      se = s(),
      ce = s(),
      de = s();
    for (let X = 0; X < 31; X++) m[X] = S[X];
    (m[31] = (S[31] & 127) | 64), (m[0] &= 248), w(u, C);
    for (let X = 0; X < 16; X++) W[X] = u[X];
    _[0] = se[0] = 1;
    for (let X = 254; X >= 0; --X) {
      const k = (m[X >>> 3] >>> (X & 7)) & 1;
      f(_, W, k),
        f(G, se, k),
        D(ce, _, G),
        R(_, _, G),
        D(G, W, se),
        R(W, W, se),
        N(se, ce),
        N(de, _),
        U(_, G, _),
        U(G, W, ce),
        D(ce, _, G),
        R(_, _, G),
        N(W, _),
        R(G, se, de),
        U(_, G, c),
        D(_, _, se),
        U(G, G, _),
        U(_, se, de),
        U(se, W, u),
        N(W, ce),
        f(_, W, k),
        f(G, se, k);
    }
    for (let X = 0; X < 16; X++)
      (u[X + 16] = _[X]),
        (u[X + 32] = G[X]),
        (u[X + 48] = W[X]),
        (u[X + 64] = se[X]);
    const b = u.subarray(32),
      x = u.subarray(16);
    P(b, b), U(x, x, b);
    const ee = new Uint8Array(32);
    return g(ee, x), ee;
  }
  i.scalarMult = z;
  function K(S) {
    return z(S, o);
  }
  i.scalarMultBase = K;
  function ne(S) {
    if (S.length !== i.SECRET_KEY_LENGTH)
      throw new Error(`x25519: seed must be ${i.SECRET_KEY_LENGTH} bytes`);
    const C = new Uint8Array(S);
    return { publicKey: K(C), secretKey: C };
  }
  i.generateKeyPairFromSeed = ne;
  function T(S) {
    const C = (0, e.randomBytes)(32, S),
      m = ne(C);
    return (0, r.wipe)(C), m;
  }
  i.generateKeyPair = T;
  function $(S, C, m = !1) {
    if (S.length !== i.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect secret key length");
    if (C.length !== i.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect public key length");
    const u = z(S, C);
    if (m) {
      let _ = 0;
      for (let W = 0; W < u.length; W++) _ |= u[W];
      if (_ === 0) throw new Error("X25519: invalid shared key");
    }
    return u;
  }
  i.sharedKey = $;
})(wu);
function Eu(i) {
  return globalThis.Buffer != null
    ? new Uint8Array(i.buffer, i.byteOffset, i.byteLength)
    : i;
}
function kd(i = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null
    ? Eu(globalThis.Buffer.allocUnsafe(i))
    : new Uint8Array(i);
}
function Qc(i, e) {
  e || (e = i.reduce((o, c) => o + c.length, 0));
  const r = kd(e);
  let s = 0;
  for (const o of i) r.set(o, s), (s += o.length);
  return Eu(r);
}
function Dm(i, e) {
  if (i.length >= 255) throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), s = 0; s < r.length; s++) r[s] = 255;
  for (var o = 0; o < i.length; o++) {
    var c = i.charAt(o),
      d = c.charCodeAt(0);
    if (r[d] !== 255) throw new TypeError(c + " is ambiguous");
    r[d] = o;
  }
  var f = i.length,
    g = i.charAt(0),
    w = Math.log(f) / Math.log(256),
    D = Math.log(256) / Math.log(f);
  function R(P) {
    if (
      (P instanceof Uint8Array ||
        (ArrayBuffer.isView(P)
          ? (P = new Uint8Array(P.buffer, P.byteOffset, P.byteLength))
          : Array.isArray(P) && (P = Uint8Array.from(P))),
      !(P instanceof Uint8Array))
    )
      throw new TypeError("Expected Uint8Array");
    if (P.length === 0) return "";
    for (var z = 0, K = 0, ne = 0, T = P.length; ne !== T && P[ne] === 0; )
      ne++, z++;
    for (var $ = ((T - ne) * D + 1) >>> 0, S = new Uint8Array($); ne !== T; ) {
      for (
        var C = P[ne], m = 0, u = $ - 1;
        (C !== 0 || m < K) && u !== -1;
        u--, m++
      )
        (C += (256 * S[u]) >>> 0), (S[u] = C % f >>> 0), (C = (C / f) >>> 0);
      if (C !== 0) throw new Error("Non-zero carry");
      (K = m), ne++;
    }
    for (var _ = $ - K; _ !== $ && S[_] === 0; ) _++;
    for (var W = g.repeat(z); _ < $; ++_) W += i.charAt(S[_]);
    return W;
  }
  function U(P) {
    if (typeof P != "string") throw new TypeError("Expected String");
    if (P.length === 0) return new Uint8Array();
    var z = 0;
    if (P[z] !== " ") {
      for (var K = 0, ne = 0; P[z] === g; ) K++, z++;
      for (
        var T = ((P.length - z) * w + 1) >>> 0, $ = new Uint8Array(T);
        P[z];

      ) {
        var S = r[P.charCodeAt(z)];
        if (S === 255) return;
        for (var C = 0, m = T - 1; (S !== 0 || C < ne) && m !== -1; m--, C++)
          (S += (f * $[m]) >>> 0),
            ($[m] = S % 256 >>> 0),
            (S = (S / 256) >>> 0);
        if (S !== 0) throw new Error("Non-zero carry");
        (ne = C), z++;
      }
      if (P[z] !== " ") {
        for (var u = T - ne; u !== T && $[u] === 0; ) u++;
        for (var _ = new Uint8Array(K + (T - u)), W = K; u !== T; )
          _[W++] = $[u++];
        return _;
      }
    }
  }
  function N(P) {
    var z = U(P);
    if (z) return z;
    throw new Error(`Non-${e} character`);
  }
  return { encode: R, decodeUnsafe: U, decode: N };
}
var Sm = Dm,
  Im = Sm;
const xm = (i) => {
    if (i instanceof Uint8Array && i.constructor.name === "Uint8Array")
      return i;
    if (i instanceof ArrayBuffer) return new Uint8Array(i);
    if (ArrayBuffer.isView(i))
      return new Uint8Array(i.buffer, i.byteOffset, i.byteLength);
    throw new Error("Unknown type, must be binary type");
  },
  Om = (i) => new TextEncoder().encode(i),
  Cm = (i) => new TextDecoder().decode(i);
class Am {
  constructor(e, r, s) {
    (this.name = e), (this.prefix = r), (this.baseEncode = s);
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class Pm {
  constructor(e, r, s) {
    if (((this.name = e), (this.prefix = r), r.codePointAt(0) === void 0))
      throw new Error("Invalid prefix character");
    (this.prefixCodePoint = r.codePointAt(0)), (this.baseDecode = s);
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(
          `Unable to decode multibase string ${JSON.stringify(e)}, ${
            this.name
          } decoder only supports inputs prefixed with ${this.prefix}`
        );
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Vd(this, e);
  }
}
class Tm {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Vd(this, e);
  }
  decode(e) {
    const r = e[0],
      s = this.decoders[r];
    if (s) return s.decode(e);
    throw RangeError(
      `Unable to decode multibase string ${JSON.stringify(
        e
      )}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
    );
  }
}
const Vd = (i, e) =>
  new Tm({
    ...(i.decoders || { [i.prefix]: i }),
    ...(e.decoders || { [e.prefix]: e }),
  });
class Rm {
  constructor(e, r, s, o) {
    (this.name = e),
      (this.prefix = r),
      (this.baseEncode = s),
      (this.baseDecode = o),
      (this.encoder = new Am(e, r, s)),
      (this.decoder = new Pm(e, r, o));
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Go = ({ name: i, prefix: e, encode: r, decode: s }) => new Rm(i, e, r, s),
  bs = ({ prefix: i, name: e, alphabet: r }) => {
    const { encode: s, decode: o } = Im(r, e);
    return Go({ prefix: i, name: e, encode: s, decode: (c) => xm(o(c)) });
  },
  Nm = (i, e, r, s) => {
    const o = {};
    for (let D = 0; D < e.length; ++D) o[e[D]] = D;
    let c = i.length;
    for (; i[c - 1] === "="; ) --c;
    const d = new Uint8Array(((c * r) / 8) | 0);
    let f = 0,
      g = 0,
      w = 0;
    for (let D = 0; D < c; ++D) {
      const R = o[i[D]];
      if (R === void 0) throw new SyntaxError(`Non-${s} character`);
      (g = (g << r) | R),
        (f += r),
        f >= 8 && ((f -= 8), (d[w++] = 255 & (g >> f)));
    }
    if (f >= r || 255 & (g << (8 - f)))
      throw new SyntaxError("Unexpected end of data");
    return d;
  },
  Fm = (i, e, r) => {
    const s = e[e.length - 1] === "=",
      o = (1 << r) - 1;
    let c = "",
      d = 0,
      f = 0;
    for (let g = 0; g < i.length; ++g)
      for (f = (f << 8) | i[g], d += 8; d > r; )
        (d -= r), (c += e[o & (f >> d)]);
    if ((d && (c += e[o & (f << (r - d))]), s))
      for (; (c.length * r) & 7; ) c += "=";
    return c;
  },
  Jt = ({ name: i, prefix: e, bitsPerChar: r, alphabet: s }) =>
    Go({
      prefix: e,
      name: i,
      encode(o) {
        return Fm(o, s, r);
      },
      decode(o) {
        return Nm(o, s, r, i);
      },
    }),
  Lm = Go({
    prefix: "\0",
    name: "identity",
    encode: (i) => Cm(i),
    decode: (i) => Om(i),
  }),
  Um = Object.freeze(
    Object.defineProperty(
      { __proto__: null, identity: Lm },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  $m = Jt({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 }),
  Mm = Object.freeze(
    Object.defineProperty({ __proto__: null, base2: $m }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  jm = Jt({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 }),
  Bm = Object.freeze(
    Object.defineProperty({ __proto__: null, base8: jm }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  qm = bs({ prefix: "9", name: "base10", alphabet: "0123456789" }),
  zm = Object.freeze(
    Object.defineProperty({ __proto__: null, base10: qm }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  Hm = Jt({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4,
  }),
  Km = Jt({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4,
  }),
  km = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base16: Hm, base16upper: Km },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Vm = Jt({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5,
  }),
  Wm = Jt({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5,
  }),
  Gm = Jt({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5,
  }),
  Ym = Jt({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5,
  }),
  Jm = Jt({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5,
  }),
  Xm = Jt({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5,
  }),
  Qm = Jt({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5,
  }),
  Zm = Jt({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5,
  }),
  ew = Jt({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5,
  }),
  tw = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        base32: Vm,
        base32hex: Jm,
        base32hexpad: Qm,
        base32hexpadupper: Zm,
        base32hexupper: Xm,
        base32pad: Gm,
        base32padupper: Ym,
        base32upper: Wm,
        base32z: ew,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  rw = bs({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
  }),
  iw = bs({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  }),
  nw = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base36: rw, base36upper: iw },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  sw = bs({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  }),
  ow = bs({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  }),
  aw = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base58btc: sw, base58flickr: ow },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  cw = Jt({
    prefix: "m",
    name: "base64",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6,
  }),
  uw = Jt({
    prefix: "M",
    name: "base64pad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6,
  }),
  hw = Jt({
    prefix: "u",
    name: "base64url",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6,
  }),
  lw = Jt({
    prefix: "U",
    name: "base64urlpad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6,
  }),
  fw = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        base64: cw,
        base64pad: uw,
        base64url: hw,
        base64urlpad: lw,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Wd = Array.from(
    "🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"
  ),
  dw = Wd.reduce((i, e, r) => ((i[r] = e), i), []),
  pw = Wd.reduce((i, e, r) => ((i[e.codePointAt(0)] = r), i), []);
function gw(i) {
  return i.reduce((e, r) => ((e += dw[r]), e), "");
}
function vw(i) {
  const e = [];
  for (const r of i) {
    const s = pw[r.codePointAt(0)];
    if (s === void 0) throw new Error(`Non-base256emoji character: ${r}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const yw = Go({ prefix: "🚀", name: "base256emoji", encode: gw, decode: vw }),
  _w = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base256emoji: yw },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
new TextEncoder();
new TextDecoder();
const Vl = {
  ...Um,
  ...Mm,
  ...Bm,
  ...zm,
  ...km,
  ...tw,
  ...nw,
  ...aw,
  ...fw,
  ..._w,
};
function Gd(i, e, r, s) {
  return {
    name: i,
    prefix: e,
    encoder: { name: i, prefix: e, encode: r },
    decoder: { decode: s },
  };
}
const Wl = Gd(
    "utf8",
    "u",
    (i) => "u" + new TextDecoder("utf8").decode(i),
    (i) => new TextEncoder().encode(i.substring(1))
  ),
  Ic = Gd(
    "ascii",
    "a",
    (i) => {
      let e = "a";
      for (let r = 0; r < i.length; r++) e += String.fromCharCode(i[r]);
      return e;
    },
    (i) => {
      i = i.substring(1);
      const e = kd(i.length);
      for (let r = 0; r < i.length; r++) e[r] = i.charCodeAt(r);
      return e;
    }
  ),
  Yd = {
    utf8: Wl,
    "utf-8": Wl,
    hex: Vl.base16,
    latin1: Ic,
    ascii: Ic,
    binary: Ic,
    ...Vl,
  };
function br(i, e = "utf8") {
  const r = Yd[e];
  if (!r) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") &&
    globalThis.Buffer != null &&
    globalThis.Buffer.from != null
    ? Eu(globalThis.Buffer.from(i, "utf-8"))
    : r.decoder.decode(`${r.prefix}${i}`);
}
function hr(i, e = "utf8") {
  const r = Yd[e];
  if (!r) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") &&
    globalThis.Buffer != null &&
    globalThis.Buffer.from != null
    ? globalThis.Buffer.from(i.buffer, i.byteOffset, i.byteLength).toString(
        "utf8"
      )
    : r.encoder.encode(i).substring(1);
}
var Gl =
    (globalThis && globalThis.__spreadArray) ||
    function (i, e, r) {
      if (r || arguments.length === 2)
        for (var s = 0, o = e.length, c; s < o; s++)
          (c || !(s in e)) &&
            (c || (c = Array.prototype.slice.call(e, 0, s)), (c[s] = e[s]));
      return i.concat(c || Array.prototype.slice.call(e));
    },
  bw = (function () {
    function i(e, r, s) {
      (this.name = e),
        (this.version = r),
        (this.os = s),
        (this.type = "browser");
    }
    return i;
  })(),
  mw = (function () {
    function i(e) {
      (this.version = e),
        (this.type = "node"),
        (this.name = "node"),
        (this.os = process.platform);
    }
    return i;
  })(),
  ww = (function () {
    function i(e, r, s, o) {
      (this.name = e),
        (this.version = r),
        (this.os = s),
        (this.bot = o),
        (this.type = "bot-device");
    }
    return i;
  })(),
  Ew = (function () {
    function i() {
      (this.type = "bot"),
        (this.bot = !0),
        (this.name = "bot"),
        (this.version = null),
        (this.os = null);
    }
    return i;
  })(),
  Dw = (function () {
    function i() {
      (this.type = "react-native"),
        (this.name = "react-native"),
        (this.version = null),
        (this.os = null);
    }
    return i;
  })(),
  Sw =
    /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,
  Iw =
    /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,
  Yl = 3,
  xw = [
    ["aol", /AOLShield\/([0-9\._]+)/],
    ["edge", /Edge\/([0-9\._]+)/],
    ["edge-ios", /EdgiOS\/([0-9\._]+)/],
    ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
    ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
    ["samsung", /SamsungBrowser\/([0-9\.]+)/],
    ["silk", /\bSilk\/([0-9._-]+)\b/],
    ["miui", /MiuiBrowser\/([0-9\.]+)$/],
    ["beaker", /BeakerBrowser\/([0-9\.]+)/],
    ["edge-chromium", /EdgA?\/([0-9\.]+)/],
    [
      "chromium-webview",
      /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
    ],
    ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
    ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
    ["fxios", /FxiOS\/([0-9\.]+)/],
    ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
    ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
    ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
    ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
    [
      "pie",
      /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/,
    ],
    ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
    ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ["ie", /MSIE\s(7\.0)/],
    ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ["android", /Android\s([0-9\.]+)/],
    ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ["safari", /Version\/([0-9\._]+).*Safari/],
    ["facebook", /FB[AS]V\/([0-9\.]+)/],
    ["instagram", /Instagram\s([0-9\.]+)/],
    ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
    ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
    ["curl", /^curl\/([0-9\.]+)$/],
    ["searchbot", Sw],
  ],
  Jl = [
    ["iOS", /iP(hone|od|ad)/],
    ["Android OS", /Android/],
    ["BlackBerry OS", /BlackBerry|BB10/],
    ["Windows Mobile", /IEMobile/],
    ["Amazon OS", /Kindle/],
    ["Windows 3.11", /Win16/],
    ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
    ["Windows 98", /(Windows 98)|(Win98)/],
    ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
    ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
    ["Windows Server 2003", /(Windows NT 5.2)/],
    ["Windows Vista", /(Windows NT 6.0)/],
    ["Windows 7", /(Windows NT 6.1)/],
    ["Windows 8", /(Windows NT 6.2)/],
    ["Windows 8.1", /(Windows NT 6.3)/],
    ["Windows 10", /(Windows NT 10.0)/],
    ["Windows ME", /Windows ME/],
    ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
    ["Open BSD", /OpenBSD/],
    ["Sun OS", /SunOS/],
    ["Chrome OS", /CrOS/],
    ["Linux", /(Linux)|(X11)/],
    ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
    ["QNX", /QNX/],
    ["BeOS", /BeOS/],
    ["OS/2", /OS\/2/],
  ];
function Ow(i) {
  return i
    ? Xl(i)
    : typeof document > "u" &&
      typeof navigator < "u" &&
      navigator.product === "ReactNative"
    ? new Dw()
    : typeof navigator < "u"
    ? Xl(navigator.userAgent)
    : Pw();
}
function Cw(i) {
  return (
    i !== "" &&
    xw.reduce(function (e, r) {
      var s = r[0],
        o = r[1];
      if (e) return e;
      var c = o.exec(i);
      return !!c && [s, c];
    }, !1)
  );
}
function Xl(i) {
  var e = Cw(i);
  if (!e) return null;
  var r = e[0],
    s = e[1];
  if (r === "searchbot") return new Ew();
  var o = s[1] && s[1].split(".").join("_").split("_").slice(0, 3);
  o
    ? o.length < Yl && (o = Gl(Gl([], o, !0), Tw(Yl - o.length), !0))
    : (o = []);
  var c = o.join("."),
    d = Aw(i),
    f = Iw.exec(i);
  return f && f[1] ? new ww(r, c, d, f[1]) : new bw(r, c, d);
}
function Aw(i) {
  for (var e = 0, r = Jl.length; e < r; e++) {
    var s = Jl[e],
      o = s[0],
      c = s[1],
      d = c.exec(i);
    if (d) return o;
  }
  return null;
}
function Pw() {
  var i = typeof process < "u" && process.version;
  return i ? new mw(process.version.slice(1)) : null;
}
function Tw(i) {
  for (var e = [], r = 0; r < i; r++) e.push("0");
  return e;
}
var ye = {};
/*! *****************************************************************************
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
***************************************************************************** */ var Zc =
  function (i, e) {
    return (
      (Zc =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (r, s) {
            r.__proto__ = s;
          }) ||
        function (r, s) {
          for (var o in s) s.hasOwnProperty(o) && (r[o] = s[o]);
        }),
      Zc(i, e)
    );
  };
function Rw(i, e) {
  Zc(i, e);
  function r() {
    this.constructor = i;
  }
  i.prototype =
    e === null ? Object.create(e) : ((r.prototype = e.prototype), new r());
}
var eu = function () {
  return (
    (eu =
      Object.assign ||
      function (e) {
        for (var r, s = 1, o = arguments.length; s < o; s++) {
          r = arguments[s];
          for (var c in r)
            Object.prototype.hasOwnProperty.call(r, c) && (e[c] = r[c]);
        }
        return e;
      }),
    eu.apply(this, arguments)
  );
};
function Nw(i, e) {
  var r = {};
  for (var s in i)
    Object.prototype.hasOwnProperty.call(i, s) &&
      e.indexOf(s) < 0 &&
      (r[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(i); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(i, s[o]) &&
        (r[s[o]] = i[s[o]]);
  return r;
}
function Fw(i, e, r, s) {
  var o = arguments.length,
    c =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, r)) : s,
    d;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    c = Reflect.decorate(i, e, r, s);
  else
    for (var f = i.length - 1; f >= 0; f--)
      (d = i[f]) && (c = (o < 3 ? d(c) : o > 3 ? d(e, r, c) : d(e, r)) || c);
  return o > 3 && c && Object.defineProperty(e, r, c), c;
}
function Lw(i, e) {
  return function (r, s) {
    e(r, s, i);
  };
}
function Uw(i, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, e);
}
function $w(i, e, r, s) {
  function o(c) {
    return c instanceof r
      ? c
      : new r(function (d) {
          d(c);
        });
  }
  return new (r || (r = Promise))(function (c, d) {
    function f(D) {
      try {
        w(s.next(D));
      } catch (R) {
        d(R);
      }
    }
    function g(D) {
      try {
        w(s.throw(D));
      } catch (R) {
        d(R);
      }
    }
    function w(D) {
      D.done ? c(D.value) : o(D.value).then(f, g);
    }
    w((s = s.apply(i, e || [])).next());
  });
}
function Mw(i, e) {
  var r = {
      label: 0,
      sent: function () {
        if (c[0] & 1) throw c[1];
        return c[1];
      },
      trys: [],
      ops: [],
    },
    s,
    o,
    c,
    d;
  return (
    (d = { next: f(0), throw: f(1), return: f(2) }),
    typeof Symbol == "function" &&
      (d[Symbol.iterator] = function () {
        return this;
      }),
    d
  );
  function f(w) {
    return function (D) {
      return g([w, D]);
    };
  }
  function g(w) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; r; )
      try {
        if (
          ((s = 1),
          o &&
            (c =
              w[0] & 2
                ? o.return
                : w[0]
                ? o.throw || ((c = o.return) && c.call(o), 0)
                : o.next) &&
            !(c = c.call(o, w[1])).done)
        )
          return c;
        switch (((o = 0), c && (w = [w[0] & 2, c.value]), w[0])) {
          case 0:
          case 1:
            c = w;
            break;
          case 4:
            return r.label++, { value: w[1], done: !1 };
          case 5:
            r.label++, (o = w[1]), (w = [0]);
            continue;
          case 7:
            (w = r.ops.pop()), r.trys.pop();
            continue;
          default:
            if (
              ((c = r.trys),
              !(c = c.length > 0 && c[c.length - 1]) &&
                (w[0] === 6 || w[0] === 2))
            ) {
              r = 0;
              continue;
            }
            if (w[0] === 3 && (!c || (w[1] > c[0] && w[1] < c[3]))) {
              r.label = w[1];
              break;
            }
            if (w[0] === 6 && r.label < c[1]) {
              (r.label = c[1]), (c = w);
              break;
            }
            if (c && r.label < c[2]) {
              (r.label = c[2]), r.ops.push(w);
              break;
            }
            c[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        w = e.call(i, r);
      } catch (D) {
        (w = [6, D]), (o = 0);
      } finally {
        s = c = 0;
      }
    if (w[0] & 5) throw w[1];
    return { value: w[0] ? w[1] : void 0, done: !0 };
  }
}
function jw(i, e, r, s) {
  s === void 0 && (s = r), (i[s] = e[r]);
}
function Bw(i, e) {
  for (var r in i) r !== "default" && !e.hasOwnProperty(r) && (e[r] = i[r]);
}
function tu(i) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    r = e && i[e],
    s = 0;
  if (r) return r.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function () {
        return (
          i && s >= i.length && (i = void 0), { value: i && i[s++], done: !i }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function Jd(i, e) {
  var r = typeof Symbol == "function" && i[Symbol.iterator];
  if (!r) return i;
  var s = r.call(i),
    o,
    c = [],
    d;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = s.next()).done; ) c.push(o.value);
  } catch (f) {
    d = { error: f };
  } finally {
    try {
      o && !o.done && (r = s.return) && r.call(s);
    } finally {
      if (d) throw d.error;
    }
  }
  return c;
}
function qw() {
  for (var i = [], e = 0; e < arguments.length; e++)
    i = i.concat(Jd(arguments[e]));
  return i;
}
function zw() {
  for (var i = 0, e = 0, r = arguments.length; e < r; e++)
    i += arguments[e].length;
  for (var s = Array(i), o = 0, e = 0; e < r; e++)
    for (var c = arguments[e], d = 0, f = c.length; d < f; d++, o++)
      s[o] = c[d];
  return s;
}
function gs(i) {
  return this instanceof gs ? ((this.v = i), this) : new gs(i);
}
function Hw(i, e, r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = r.apply(i, e || []),
    o,
    c = [];
  return (
    (o = {}),
    d("next"),
    d("throw"),
    d("return"),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function d(U) {
    s[U] &&
      (o[U] = function (N) {
        return new Promise(function (P, z) {
          c.push([U, N, P, z]) > 1 || f(U, N);
        });
      });
  }
  function f(U, N) {
    try {
      g(s[U](N));
    } catch (P) {
      R(c[0][3], P);
    }
  }
  function g(U) {
    U.value instanceof gs
      ? Promise.resolve(U.value.v).then(w, D)
      : R(c[0][2], U);
  }
  function w(U) {
    f("next", U);
  }
  function D(U) {
    f("throw", U);
  }
  function R(U, N) {
    U(N), c.shift(), c.length && f(c[0][0], c[0][1]);
  }
}
function Kw(i) {
  var e, r;
  return (
    (e = {}),
    s("next"),
    s("throw", function (o) {
      throw o;
    }),
    s("return"),
    (e[Symbol.iterator] = function () {
      return this;
    }),
    e
  );
  function s(o, c) {
    e[o] = i[o]
      ? function (d) {
          return (r = !r)
            ? { value: gs(i[o](d)), done: o === "return" }
            : c
            ? c(d)
            : d;
        }
      : c;
  }
}
function kw(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = i[Symbol.asyncIterator],
    r;
  return e
    ? e.call(i)
    : ((i = typeof tu == "function" ? tu(i) : i[Symbol.iterator]()),
      (r = {}),
      s("next"),
      s("throw"),
      s("return"),
      (r[Symbol.asyncIterator] = function () {
        return this;
      }),
      r);
  function s(c) {
    r[c] =
      i[c] &&
      function (d) {
        return new Promise(function (f, g) {
          (d = i[c](d)), o(f, g, d.done, d.value);
        });
      };
  }
  function o(c, d, f, g) {
    Promise.resolve(g).then(function (w) {
      c({ value: w, done: f });
    }, d);
  }
}
function Vw(i, e) {
  return (
    Object.defineProperty
      ? Object.defineProperty(i, "raw", { value: e })
      : (i.raw = e),
    i
  );
}
function Ww(i) {
  if (i && i.__esModule) return i;
  var e = {};
  if (i != null)
    for (var r in i) Object.hasOwnProperty.call(i, r) && (e[r] = i[r]);
  return (e.default = i), e;
}
function Gw(i) {
  return i && i.__esModule ? i : { default: i };
}
function Yw(i, e) {
  if (!e.has(i))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(i);
}
function Jw(i, e, r) {
  if (!e.has(i))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(i, r), r;
}
const Xw = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        get __assign() {
          return eu;
        },
        __asyncDelegator: Kw,
        __asyncGenerator: Hw,
        __asyncValues: kw,
        __await: gs,
        __awaiter: $w,
        __classPrivateFieldGet: Yw,
        __classPrivateFieldSet: Jw,
        __createBinding: jw,
        __decorate: Fw,
        __exportStar: Bw,
        __extends: Rw,
        __generator: Mw,
        __importDefault: Gw,
        __importStar: Ww,
        __makeTemplateObject: Vw,
        __metadata: Uw,
        __param: Lw,
        __read: Jd,
        __rest: Nw,
        __spread: qw,
        __spreadArrays: zw,
        __values: tu,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Br = vu(Xw);
var xc = {},
  rs = {},
  Ql;
function Qw() {
  if (Ql) return rs;
  (Ql = 1),
    Object.defineProperty(rs, "__esModule", { value: !0 }),
    (rs.delay = void 0);
  function i(e) {
    return new Promise((r) => {
      setTimeout(() => {
        r(!0);
      }, e);
    });
  }
  return (rs.delay = i), rs;
}
var Ji = {},
  Oc = {},
  Xi = {},
  Zl;
function Zw() {
  return (
    Zl ||
      ((Zl = 1),
      Object.defineProperty(Xi, "__esModule", { value: !0 }),
      (Xi.ONE_THOUSAND = Xi.ONE_HUNDRED = void 0),
      (Xi.ONE_HUNDRED = 100),
      (Xi.ONE_THOUSAND = 1e3)),
    Xi
  );
}
var Cc = {},
  ef;
function eE() {
  return (
    ef ||
      ((ef = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          (i.ONE_YEAR =
            i.FOUR_WEEKS =
            i.THREE_WEEKS =
            i.TWO_WEEKS =
            i.ONE_WEEK =
            i.THIRTY_DAYS =
            i.SEVEN_DAYS =
            i.FIVE_DAYS =
            i.THREE_DAYS =
            i.ONE_DAY =
            i.TWENTY_FOUR_HOURS =
            i.TWELVE_HOURS =
            i.SIX_HOURS =
            i.THREE_HOURS =
            i.ONE_HOUR =
            i.SIXTY_MINUTES =
            i.THIRTY_MINUTES =
            i.TEN_MINUTES =
            i.FIVE_MINUTES =
            i.ONE_MINUTE =
            i.SIXTY_SECONDS =
            i.THIRTY_SECONDS =
            i.TEN_SECONDS =
            i.FIVE_SECONDS =
            i.ONE_SECOND =
              void 0),
          (i.ONE_SECOND = 1),
          (i.FIVE_SECONDS = 5),
          (i.TEN_SECONDS = 10),
          (i.THIRTY_SECONDS = 30),
          (i.SIXTY_SECONDS = 60),
          (i.ONE_MINUTE = i.SIXTY_SECONDS),
          (i.FIVE_MINUTES = i.ONE_MINUTE * 5),
          (i.TEN_MINUTES = i.ONE_MINUTE * 10),
          (i.THIRTY_MINUTES = i.ONE_MINUTE * 30),
          (i.SIXTY_MINUTES = i.ONE_MINUTE * 60),
          (i.ONE_HOUR = i.SIXTY_MINUTES),
          (i.THREE_HOURS = i.ONE_HOUR * 3),
          (i.SIX_HOURS = i.ONE_HOUR * 6),
          (i.TWELVE_HOURS = i.ONE_HOUR * 12),
          (i.TWENTY_FOUR_HOURS = i.ONE_HOUR * 24),
          (i.ONE_DAY = i.TWENTY_FOUR_HOURS),
          (i.THREE_DAYS = i.ONE_DAY * 3),
          (i.FIVE_DAYS = i.ONE_DAY * 5),
          (i.SEVEN_DAYS = i.ONE_DAY * 7),
          (i.THIRTY_DAYS = i.ONE_DAY * 30),
          (i.ONE_WEEK = i.SEVEN_DAYS),
          (i.TWO_WEEKS = i.ONE_WEEK * 2),
          (i.THREE_WEEKS = i.ONE_WEEK * 3),
          (i.FOUR_WEEKS = i.ONE_WEEK * 4),
          (i.ONE_YEAR = i.ONE_DAY * 365);
      })(Cc)),
    Cc
  );
}
var tf;
function Xd() {
  return (
    tf ||
      ((tf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        const e = Br;
        e.__exportStar(Zw(), i), e.__exportStar(eE(), i);
      })(Oc)),
    Oc
  );
}
var rf;
function tE() {
  if (rf) return Ji;
  (rf = 1),
    Object.defineProperty(Ji, "__esModule", { value: !0 }),
    (Ji.fromMiliseconds = Ji.toMiliseconds = void 0);
  const i = Xd();
  function e(s) {
    return s * i.ONE_THOUSAND;
  }
  Ji.toMiliseconds = e;
  function r(s) {
    return Math.floor(s / i.ONE_THOUSAND);
  }
  return (Ji.fromMiliseconds = r), Ji;
}
var nf;
function rE() {
  return (
    nf ||
      ((nf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        const e = Br;
        e.__exportStar(Qw(), i), e.__exportStar(tE(), i);
      })(xc)),
    xc
  );
}
var On = {},
  sf;
function iE() {
  if (sf) return On;
  (sf = 1),
    Object.defineProperty(On, "__esModule", { value: !0 }),
    (On.Watch = void 0);
  class i {
    constructor() {
      this.timestamps = new Map();
    }
    start(r) {
      if (this.timestamps.has(r))
        throw new Error(`Watch already started for label: ${r}`);
      this.timestamps.set(r, { started: Date.now() });
    }
    stop(r) {
      const s = this.get(r);
      if (typeof s.elapsed < "u")
        throw new Error(`Watch already stopped for label: ${r}`);
      const o = Date.now() - s.started;
      this.timestamps.set(r, { started: s.started, elapsed: o });
    }
    get(r) {
      const s = this.timestamps.get(r);
      if (typeof s > "u") throw new Error(`No timestamp found for label: ${r}`);
      return s;
    }
    elapsed(r) {
      const s = this.get(r);
      return s.elapsed || Date.now() - s.started;
    }
  }
  return (On.Watch = i), (On.default = i), On;
}
var Ac = {},
  is = {},
  of;
function nE() {
  if (of) return is;
  (of = 1),
    Object.defineProperty(is, "__esModule", { value: !0 }),
    (is.IWatch = void 0);
  class i {}
  return (is.IWatch = i), is;
}
var af;
function sE() {
  return (
    af ||
      ((af = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Br.__exportStar(nE(), i);
      })(Ac)),
    Ac
  );
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  const e = Br;
  e.__exportStar(rE(), i),
    e.__exportStar(iE(), i),
    e.__exportStar(sE(), i),
    e.__exportStar(Xd(), i);
})(ye);
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.getLocalStorage =
  ft.getLocalStorageOrThrow =
  ft.getCrypto =
  ft.getCryptoOrThrow =
  Zd =
  ft.getLocation =
  ft.getLocationOrThrow =
  Du =
  ft.getNavigator =
  ft.getNavigatorOrThrow =
  Qd =
  ft.getDocument =
  ft.getDocumentOrThrow =
  ft.getFromWindowOrThrow =
  ft.getFromWindow =
    void 0;
function rn(i) {
  let e;
  return typeof window < "u" && typeof window[i] < "u" && (e = window[i]), e;
}
ft.getFromWindow = rn;
function Fn(i) {
  const e = rn(i);
  if (!e) throw new Error(`${i} is not defined in Window`);
  return e;
}
ft.getFromWindowOrThrow = Fn;
function oE() {
  return Fn("document");
}
ft.getDocumentOrThrow = oE;
function aE() {
  return rn("document");
}
var Qd = (ft.getDocument = aE);
function cE() {
  return Fn("navigator");
}
ft.getNavigatorOrThrow = cE;
function uE() {
  return rn("navigator");
}
var Du = (ft.getNavigator = uE);
function hE() {
  return Fn("location");
}
ft.getLocationOrThrow = hE;
function lE() {
  return rn("location");
}
var Zd = (ft.getLocation = lE);
function fE() {
  return Fn("crypto");
}
ft.getCryptoOrThrow = fE;
function dE() {
  return rn("crypto");
}
ft.getCrypto = dE;
function pE() {
  return Fn("localStorage");
}
ft.getLocalStorageOrThrow = pE;
function gE() {
  return rn("localStorage");
}
ft.getLocalStorage = gE;
var Su = {};
Object.defineProperty(Su, "__esModule", { value: !0 });
var ep = (Su.getWindowMetadata = void 0);
const cf = ft;
function vE() {
  let i, e;
  try {
    (i = cf.getDocumentOrThrow()), (e = cf.getLocationOrThrow());
  } catch {
    return null;
  }
  function r() {
    const R = i.getElementsByTagName("link"),
      U = [];
    for (let N = 0; N < R.length; N++) {
      const P = R[N],
        z = P.getAttribute("rel");
      if (z && z.toLowerCase().indexOf("icon") > -1) {
        const K = P.getAttribute("href");
        if (K)
          if (
            K.toLowerCase().indexOf("https:") === -1 &&
            K.toLowerCase().indexOf("http:") === -1 &&
            K.indexOf("//") !== 0
          ) {
            let ne = e.protocol + "//" + e.host;
            if (K.indexOf("/") === 0) ne += K;
            else {
              const T = e.pathname.split("/");
              T.pop();
              const $ = T.join("/");
              ne += $ + "/" + K;
            }
            U.push(ne);
          } else if (K.indexOf("//") === 0) {
            const ne = e.protocol + K;
            U.push(ne);
          } else U.push(K);
      }
    }
    return U;
  }
  function s(...R) {
    const U = i.getElementsByTagName("meta");
    for (let N = 0; N < U.length; N++) {
      const P = U[N],
        z = ["itemprop", "property", "name"]
          .map((K) => P.getAttribute(K))
          .filter((K) => (K ? R.includes(K) : !1));
      if (z.length && z) {
        const K = P.getAttribute("content");
        if (K) return K;
      }
    }
    return "";
  }
  function o() {
    let R = s("name", "og:site_name", "og:title", "twitter:title");
    return R || (R = i.title), R;
  }
  function c() {
    return s(
      "description",
      "og:description",
      "twitter:description",
      "keywords"
    );
  }
  const d = o(),
    f = c(),
    g = e.origin,
    w = r();
  return { description: f, url: g, icons: w, name: d };
}
ep = Su.getWindowMetadata = vE;
var vs = {},
  yE = (i) =>
    encodeURIComponent(i).replace(
      /[!'()*]/g,
      (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`
    ),
  tp = "%[a-f0-9]{2}",
  uf = new RegExp("(" + tp + ")|([^%]+?)", "gi"),
  hf = new RegExp("(" + tp + ")+", "gi");
function ru(i, e) {
  try {
    return [decodeURIComponent(i.join(""))];
  } catch {}
  if (i.length === 1) return i;
  e = e || 1;
  var r = i.slice(0, e),
    s = i.slice(e);
  return Array.prototype.concat.call([], ru(r), ru(s));
}
function _E(i) {
  try {
    return decodeURIComponent(i);
  } catch {
    for (var e = i.match(uf) || [], r = 1; r < e.length; r++)
      (i = ru(e, r).join("")), (e = i.match(uf) || []);
    return i;
  }
}
function bE(i) {
  for (var e = { "%FE%FF": "��", "%FF%FE": "��" }, r = hf.exec(i); r; ) {
    try {
      e[r[0]] = decodeURIComponent(r[0]);
    } catch {
      var s = _E(r[0]);
      s !== r[0] && (e[r[0]] = s);
    }
    r = hf.exec(i);
  }
  e["%C2"] = "�";
  for (var o = Object.keys(e), c = 0; c < o.length; c++) {
    var d = o[c];
    i = i.replace(new RegExp(d, "g"), e[d]);
  }
  return i;
}
var mE = function (i) {
    if (typeof i != "string")
      throw new TypeError(
        "Expected `encodedURI` to be of type `string`, got `" + typeof i + "`"
      );
    try {
      return (i = i.replace(/\+/g, " ")), decodeURIComponent(i);
    } catch {
      return bE(i);
    }
  },
  wE = (i, e) => {
    if (!(typeof i == "string" && typeof e == "string"))
      throw new TypeError("Expected the arguments to be of type `string`");
    if (e === "") return [i];
    const r = i.indexOf(e);
    return r === -1 ? [i] : [i.slice(0, r), i.slice(r + e.length)];
  },
  EE = function (i, e) {
    for (
      var r = {}, s = Object.keys(i), o = Array.isArray(e), c = 0;
      c < s.length;
      c++
    ) {
      var d = s[c],
        f = i[d];
      (o ? e.indexOf(d) !== -1 : e(d, f, i)) && (r[d] = f);
    }
    return r;
  };
(function (i) {
  const e = yE,
    r = mE,
    s = wE,
    o = EE,
    c = (T) => T == null,
    d = Symbol("encodeFragmentIdentifier");
  function f(T) {
    switch (T.arrayFormat) {
      case "index":
        return ($) => (S, C) => {
          const m = S.length;
          return C === void 0 ||
            (T.skipNull && C === null) ||
            (T.skipEmptyString && C === "")
            ? S
            : C === null
            ? [...S, [D($, T), "[", m, "]"].join("")]
            : [...S, [D($, T), "[", D(m, T), "]=", D(C, T)].join("")];
        };
      case "bracket":
        return ($) => (S, C) =>
          C === void 0 ||
          (T.skipNull && C === null) ||
          (T.skipEmptyString && C === "")
            ? S
            : C === null
            ? [...S, [D($, T), "[]"].join("")]
            : [...S, [D($, T), "[]=", D(C, T)].join("")];
      case "colon-list-separator":
        return ($) => (S, C) =>
          C === void 0 ||
          (T.skipNull && C === null) ||
          (T.skipEmptyString && C === "")
            ? S
            : C === null
            ? [...S, [D($, T), ":list="].join("")]
            : [...S, [D($, T), ":list=", D(C, T)].join("")];
      case "comma":
      case "separator":
      case "bracket-separator": {
        const $ = T.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (S) => (C, m) =>
          m === void 0 ||
          (T.skipNull && m === null) ||
          (T.skipEmptyString && m === "")
            ? C
            : ((m = m === null ? "" : m),
              C.length === 0
                ? [[D(S, T), $, D(m, T)].join("")]
                : [[C, D(m, T)].join(T.arrayFormatSeparator)]);
      }
      default:
        return ($) => (S, C) =>
          C === void 0 ||
          (T.skipNull && C === null) ||
          (T.skipEmptyString && C === "")
            ? S
            : C === null
            ? [...S, D($, T)]
            : [...S, [D($, T), "=", D(C, T)].join("")];
    }
  }
  function g(T) {
    let $;
    switch (T.arrayFormat) {
      case "index":
        return (S, C, m) => {
          if (
            (($ = /\[(\d*)\]$/.exec(S)), (S = S.replace(/\[\d*\]$/, "")), !$)
          ) {
            m[S] = C;
            return;
          }
          m[S] === void 0 && (m[S] = {}), (m[S][$[1]] = C);
        };
      case "bracket":
        return (S, C, m) => {
          if ((($ = /(\[\])$/.exec(S)), (S = S.replace(/\[\]$/, "")), !$)) {
            m[S] = C;
            return;
          }
          if (m[S] === void 0) {
            m[S] = [C];
            return;
          }
          m[S] = [].concat(m[S], C);
        };
      case "colon-list-separator":
        return (S, C, m) => {
          if ((($ = /(:list)$/.exec(S)), (S = S.replace(/:list$/, "")), !$)) {
            m[S] = C;
            return;
          }
          if (m[S] === void 0) {
            m[S] = [C];
            return;
          }
          m[S] = [].concat(m[S], C);
        };
      case "comma":
      case "separator":
        return (S, C, m) => {
          const u = typeof C == "string" && C.includes(T.arrayFormatSeparator),
            _ =
              typeof C == "string" &&
              !u &&
              R(C, T).includes(T.arrayFormatSeparator);
          C = _ ? R(C, T) : C;
          const W =
            u || _
              ? C.split(T.arrayFormatSeparator).map((G) => R(G, T))
              : C === null
              ? C
              : R(C, T);
          m[S] = W;
        };
      case "bracket-separator":
        return (S, C, m) => {
          const u = /(\[\])$/.test(S);
          if (((S = S.replace(/\[\]$/, "")), !u)) {
            m[S] = C && R(C, T);
            return;
          }
          const _ =
            C === null
              ? []
              : C.split(T.arrayFormatSeparator).map((W) => R(W, T));
          if (m[S] === void 0) {
            m[S] = _;
            return;
          }
          m[S] = [].concat(m[S], _);
        };
      default:
        return (S, C, m) => {
          if (m[S] === void 0) {
            m[S] = C;
            return;
          }
          m[S] = [].concat(m[S], C);
        };
    }
  }
  function w(T) {
    if (typeof T != "string" || T.length !== 1)
      throw new TypeError(
        "arrayFormatSeparator must be single character string"
      );
  }
  function D(T, $) {
    return $.encode ? ($.strict ? e(T) : encodeURIComponent(T)) : T;
  }
  function R(T, $) {
    return $.decode ? r(T) : T;
  }
  function U(T) {
    return Array.isArray(T)
      ? T.sort()
      : typeof T == "object"
      ? U(Object.keys(T))
          .sort(($, S) => Number($) - Number(S))
          .map(($) => T[$])
      : T;
  }
  function N(T) {
    const $ = T.indexOf("#");
    return $ !== -1 && (T = T.slice(0, $)), T;
  }
  function P(T) {
    let $ = "";
    const S = T.indexOf("#");
    return S !== -1 && ($ = T.slice(S)), $;
  }
  function z(T) {
    T = N(T);
    const $ = T.indexOf("?");
    return $ === -1 ? "" : T.slice($ + 1);
  }
  function K(T, $) {
    return (
      $.parseNumbers &&
      !Number.isNaN(Number(T)) &&
      typeof T == "string" &&
      T.trim() !== ""
        ? (T = Number(T))
        : $.parseBooleans &&
          T !== null &&
          (T.toLowerCase() === "true" || T.toLowerCase() === "false") &&
          (T = T.toLowerCase() === "true"),
      T
    );
  }
  function ne(T, $) {
    ($ = Object.assign(
      {
        decode: !0,
        sort: !0,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: !1,
        parseBooleans: !1,
      },
      $
    )),
      w($.arrayFormatSeparator);
    const S = g($),
      C = Object.create(null);
    if (typeof T != "string" || ((T = T.trim().replace(/^[?#&]/, "")), !T))
      return C;
    for (const m of T.split("&")) {
      if (m === "") continue;
      let [u, _] = s($.decode ? m.replace(/\+/g, " ") : m, "=");
      (_ =
        _ === void 0
          ? null
          : ["comma", "separator", "bracket-separator"].includes($.arrayFormat)
          ? _
          : R(_, $)),
        S(R(u, $), _, C);
    }
    for (const m of Object.keys(C)) {
      const u = C[m];
      if (typeof u == "object" && u !== null)
        for (const _ of Object.keys(u)) u[_] = K(u[_], $);
      else C[m] = K(u, $);
    }
    return $.sort === !1
      ? C
      : ($.sort === !0
          ? Object.keys(C).sort()
          : Object.keys(C).sort($.sort)
        ).reduce((m, u) => {
          const _ = C[u];
          return (
            _ && typeof _ == "object" && !Array.isArray(_)
              ? (m[u] = U(_))
              : (m[u] = _),
            m
          );
        }, Object.create(null));
  }
  (i.extract = z),
    (i.parse = ne),
    (i.stringify = (T, $) => {
      if (!T) return "";
      ($ = Object.assign(
        {
          encode: !0,
          strict: !0,
          arrayFormat: "none",
          arrayFormatSeparator: ",",
        },
        $
      )),
        w($.arrayFormatSeparator);
      const S = (_) =>
          ($.skipNull && c(T[_])) || ($.skipEmptyString && T[_] === ""),
        C = f($),
        m = {};
      for (const _ of Object.keys(T)) S(_) || (m[_] = T[_]);
      const u = Object.keys(m);
      return (
        $.sort !== !1 && u.sort($.sort),
        u
          .map((_) => {
            const W = T[_];
            return W === void 0
              ? ""
              : W === null
              ? D(_, $)
              : Array.isArray(W)
              ? W.length === 0 && $.arrayFormat === "bracket-separator"
                ? D(_, $) + "[]"
                : W.reduce(C(_), []).join("&")
              : D(_, $) + "=" + D(W, $);
          })
          .filter((_) => _.length > 0)
          .join("&")
      );
    }),
    (i.parseUrl = (T, $) => {
      $ = Object.assign({ decode: !0 }, $);
      const [S, C] = s(T, "#");
      return Object.assign(
        { url: S.split("?")[0] || "", query: ne(z(T), $) },
        $ && $.parseFragmentIdentifier && C
          ? { fragmentIdentifier: R(C, $) }
          : {}
      );
    }),
    (i.stringifyUrl = (T, $) => {
      $ = Object.assign({ encode: !0, strict: !0, [d]: !0 }, $);
      const S = N(T.url).split("?")[0] || "",
        C = i.extract(T.url),
        m = i.parse(C, { sort: !1 }),
        u = Object.assign(m, T.query);
      let _ = i.stringify(u, $);
      _ && (_ = `?${_}`);
      let W = P(T.url);
      return (
        T.fragmentIdentifier &&
          (W = `#${$[d] ? D(T.fragmentIdentifier, $) : T.fragmentIdentifier}`),
        `${S}${_}${W}`
      );
    }),
    (i.pick = (T, $, S) => {
      S = Object.assign({ parseFragmentIdentifier: !0, [d]: !1 }, S);
      const { url: C, query: m, fragmentIdentifier: u } = i.parseUrl(T, S);
      return i.stringifyUrl(
        { url: C, query: o(m, $), fragmentIdentifier: u },
        S
      );
    }),
    (i.exclude = (T, $, S) => {
      const C = Array.isArray($) ? (m) => !$.includes(m) : (m, u) => !$(m, u);
      return i.pick(T, C, S);
    });
})(vs);
const DE = {
  waku: {
    publish: "waku_publish",
    batchPublish: "waku_batchPublish",
    subscribe: "waku_subscribe",
    batchSubscribe: "waku_batchSubscribe",
    subscription: "waku_subscription",
    unsubscribe: "waku_unsubscribe",
    batchUnsubscribe: "waku_batchUnsubscribe",
  },
  irn: {
    publish: "irn_publish",
    batchPublish: "irn_batchPublish",
    subscribe: "irn_subscribe",
    batchSubscribe: "irn_batchSubscribe",
    subscription: "irn_subscription",
    unsubscribe: "irn_unsubscribe",
    batchUnsubscribe: "irn_batchUnsubscribe",
  },
  iridium: {
    publish: "iridium_publish",
    batchPublish: "iridium_batchPublish",
    subscribe: "iridium_subscribe",
    batchSubscribe: "iridium_batchSubscribe",
    subscription: "iridium_subscription",
    unsubscribe: "iridium_unsubscribe",
    batchUnsubscribe: "iridium_batchUnsubscribe",
  },
};
function SE(i, e = []) {
  const r = [];
  return (
    Object.keys(i).forEach((s) => {
      if (e.length && !e.includes(s)) return;
      const o = i[s];
      r.push(...o.accounts);
    }),
    r
  );
}
function rp(i, e) {
  return i.includes(":") ? [i] : e.chains || [];
}
const ip = "base10",
  ur = "base16",
  iu = "base64pad",
  Iu = "utf8",
  np = 0,
  nn = 1,
  IE = 0,
  lf = 1,
  nu = 12,
  xu = 32;
function xE() {
  const i = wu.generateKeyPair();
  return { privateKey: hr(i.secretKey, ur), publicKey: hr(i.publicKey, ur) };
}
function su() {
  const i = Nn.randomBytes(xu);
  return hr(i, ur);
}
function OE(i, e) {
  const r = wu.sharedKey(br(i, ur), br(e, ur)),
    s = new fm(Wo.SHA256, r).expand(xu);
  return hr(s, ur);
}
function CE(i) {
  const e = Wo.hash(br(i, ur));
  return hr(e, ur);
}
function Tn(i) {
  const e = Wo.hash(br(i, Iu));
  return hr(e, ur);
}
function AE(i) {
  return br(`${i}`, ip);
}
function ms(i) {
  return Number(hr(i, ip));
}
function PE(i) {
  const e = AE(typeof i.type < "u" ? i.type : np);
  if (ms(e) === nn && typeof i.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const r = typeof i.senderPublicKey < "u" ? br(i.senderPublicKey, ur) : void 0,
    s = typeof i.iv < "u" ? br(i.iv, ur) : Nn.randomBytes(nu),
    o = new bu.ChaCha20Poly1305(br(i.symKey, ur)).seal(s, br(i.message, Iu));
  return RE({ type: e, sealed: o, iv: s, senderPublicKey: r });
}
function TE(i) {
  const e = new bu.ChaCha20Poly1305(br(i.symKey, ur)),
    { sealed: r, iv: s } = $o(i.encoded),
    o = e.open(s, r);
  if (o === null) throw new Error("Failed to decrypt");
  return hr(o, Iu);
}
function RE(i) {
  if (ms(i.type) === nn) {
    if (typeof i.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return hr(Qc([i.type, i.senderPublicKey, i.iv, i.sealed]), iu);
  }
  return hr(Qc([i.type, i.iv, i.sealed]), iu);
}
function $o(i) {
  const e = br(i, iu),
    r = e.slice(IE, lf),
    s = lf;
  if (ms(r) === nn) {
    const f = s + xu,
      g = f + nu,
      w = e.slice(s, f),
      D = e.slice(f, g),
      R = e.slice(g);
    return { type: r, sealed: R, iv: D, senderPublicKey: w };
  }
  const o = s + nu,
    c = e.slice(s, o),
    d = e.slice(o);
  return { type: r, sealed: d, iv: c };
}
function NE(i, e) {
  const r = $o(i);
  return sp({
    type: ms(r.type),
    senderPublicKey:
      typeof r.senderPublicKey < "u" ? hr(r.senderPublicKey, ur) : void 0,
    receiverPublicKey: e == null ? void 0 : e.receiverPublicKey,
  });
}
function sp(i) {
  const e = (i == null ? void 0 : i.type) || np;
  if (e === nn) {
    if (typeof (i == null ? void 0 : i.senderPublicKey) > "u")
      throw new Error("missing sender public key");
    if (typeof (i == null ? void 0 : i.receiverPublicKey) > "u")
      throw new Error("missing receiver public key");
  }
  return {
    type: e,
    senderPublicKey: i == null ? void 0 : i.senderPublicKey,
    receiverPublicKey: i == null ? void 0 : i.receiverPublicKey,
  };
}
function ff(i) {
  return (
    i.type === nn &&
    typeof i.senderPublicKey == "string" &&
    typeof i.receiverPublicKey == "string"
  );
}
var FE = Object.defineProperty,
  df = Object.getOwnPropertySymbols,
  LE = Object.prototype.hasOwnProperty,
  UE = Object.prototype.propertyIsEnumerable,
  pf = (i, e, r) =>
    e in i
      ? FE(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  gf = (i, e) => {
    for (var r in e || (e = {})) LE.call(e, r) && pf(i, r, e[r]);
    if (df) for (var r of df(e)) UE.call(e, r) && pf(i, r, e[r]);
    return i;
  };
const $E = "ReactNative",
  en = {
    reactNative: "react-native",
    node: "node",
    browser: "browser",
    unknown: "unknown",
  },
  ME = "js";
function Ou() {
  return (
    typeof process < "u" &&
    typeof process.versions < "u" &&
    typeof process.versions.node < "u"
  );
}
function op() {
  return !Qd() && !!Du() && navigator.product === $E;
}
function Cu() {
  return !Ou() && !!Du();
}
function ap() {
  return op()
    ? en.reactNative
    : Ou()
    ? en.node
    : Cu()
    ? en.browser
    : en.unknown;
}
function jE(i, e) {
  let r = vs.parse(i);
  return (r = gf(gf({}, r), e)), (i = vs.stringify(r)), i;
}
function BE() {
  return ep() || { name: "", description: "", url: "", icons: [""] };
}
function qE() {
  if (typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: r, Version: s } = global.Platform;
    return [r, s].join("-");
  }
  const i = Ow();
  if (i === null) return "unknown";
  const e = i.os ? i.os.replace(" ", "").toLowerCase() : "unknown";
  return i.type === "browser"
    ? [e, i.name, i.version].join("-")
    : [e, i.version].join("-");
}
function zE() {
  var i;
  const e = ap();
  return e === en.browser
    ? [e, ((i = Zd()) == null ? void 0 : i.host) || "unknown"].join(":")
    : e;
}
function HE(i, e, r) {
  const s = qE(),
    o = zE();
  return [[i, e].join("-"), [ME, r].join("-"), s, o].join("/");
}
function KE({
  protocol: i,
  version: e,
  relayUrl: r,
  sdkVersion: s,
  auth: o,
  projectId: c,
  useOnCloseEvent: d,
}) {
  const f = r.split("?"),
    g = HE(i, e, s),
    w = { auth: o, ua: g, projectId: c, useOnCloseEvent: d || void 0 },
    D = jE(f[1] || "", w);
  return f[0] + "?" + D;
}
function tn(i, e) {
  return i.filter((r) => e.includes(r)).length === i.length;
}
function cp(i) {
  return Object.fromEntries(i.entries());
}
function up(i) {
  return new Map(Object.entries(i));
}
function Cn(i = ye.FIVE_MINUTES, e) {
  const r = ye.toMiliseconds(i || ye.FIVE_MINUTES);
  let s, o, c;
  return {
    resolve: (d) => {
      c && s && (clearTimeout(c), s(d));
    },
    reject: (d) => {
      c && o && (clearTimeout(c), o(d));
    },
    done: () =>
      new Promise((d, f) => {
        (c = setTimeout(() => {
          f(new Error(e));
        }, r)),
          (s = d),
          (o = f);
      }),
  };
}
function Mo(i, e, r) {
  return new Promise(async (s, o) => {
    const c = setTimeout(() => o(new Error(r)), e);
    try {
      const d = await i;
      s(d);
    } catch (d) {
      o(d);
    }
    clearTimeout(c);
  });
}
function hp(i, e) {
  if (typeof e == "string" && e.startsWith(`${i}:`)) return e;
  if (i.toLowerCase() === "topic") {
    if (typeof e != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (i.toLowerCase() === "id") {
    if (typeof e != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${i}`);
}
function kE(i) {
  return hp("topic", i);
}
function VE(i) {
  return hp("id", i);
}
function lp(i) {
  const [e, r] = i.split(":"),
    s = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof r == "string") s.topic = r;
  else if (e === "id" && Number.isInteger(Number(r))) s.id = Number(r);
  else
    throw new Error(
      `Invalid target, expected id:number or topic:string, got ${e}:${r}`
    );
  return s;
}
function Wr(i, e) {
  return ye.fromMiliseconds((e || Date.now()) + ye.toMiliseconds(i));
}
function Ti(i) {
  return Date.now() >= ye.toMiliseconds(i);
}
function Ht(i, e) {
  return `${i}${e ? `:${e}` : ""}`;
}
function Pc(i = [], e = []) {
  return [...new Set([...i, ...e])];
}
async function WE({ id: i, topic: e, wcDeepLink: r }) {
  try {
    if (!r) return;
    const s = typeof r == "string" ? JSON.parse(r) : r;
    let o = s == null ? void 0 : s.href;
    if (typeof o != "string") return;
    o.endsWith("/") && (o = o.slice(0, -1));
    const c = `${o}/wc?requestId=${i}&sessionTopic=${e}`,
      d = ap();
    d === en.browser
      ? c.startsWith("https://")
        ? window.open(c, "_blank", "noreferrer noopener")
        : window.open(c, "_self", "noreferrer noopener")
      : d === en.reactNative &&
        typeof (global == null ? void 0 : global.Linking) < "u" &&
        (await global.Linking.openURL(c));
  } catch (s) {
    console.error(s);
  }
}
const GE = "irn";
function ou(i) {
  return (i == null ? void 0 : i.relay) || { protocol: GE };
}
function Ro(i) {
  const e = DE[i];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${i}`);
  return e;
}
var YE = Object.defineProperty,
  vf = Object.getOwnPropertySymbols,
  JE = Object.prototype.hasOwnProperty,
  XE = Object.prototype.propertyIsEnumerable,
  yf = (i, e, r) =>
    e in i
      ? YE(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  QE = (i, e) => {
    for (var r in e || (e = {})) JE.call(e, r) && yf(i, r, e[r]);
    if (vf) for (var r of vf(e)) XE.call(e, r) && yf(i, r, e[r]);
    return i;
  };
function ZE(i, e = "-") {
  const r = {},
    s = "relay" + e;
  return (
    Object.keys(i).forEach((o) => {
      if (o.startsWith(s)) {
        const c = o.replace(s, ""),
          d = i[o];
        r[c] = d;
      }
    }),
    r
  );
}
function e3(i) {
  const e = i.indexOf(":"),
    r = i.indexOf("?") !== -1 ? i.indexOf("?") : void 0,
    s = i.substring(0, e),
    o = i.substring(e + 1, r).split("@"),
    c = typeof r < "u" ? i.substring(r) : "",
    d = vs.parse(c);
  return {
    protocol: s,
    topic: t3(o[0]),
    version: parseInt(o[1], 10),
    symKey: d.symKey,
    relay: ZE(d),
  };
}
function t3(i) {
  return i.startsWith("//") ? i.substring(2) : i;
}
function r3(i, e = "-") {
  const r = "relay",
    s = {};
  return (
    Object.keys(i).forEach((o) => {
      const c = r + e + o;
      i[o] && (s[c] = i[o]);
    }),
    s
  );
}
function i3(i) {
  return (
    `${i.protocol}:${i.topic}@${i.version}?` +
    vs.stringify(QE({ symKey: i.symKey }, r3(i.relay)))
  );
}
function Ln(i) {
  const e = [];
  return (
    i.forEach((r) => {
      const [s, o] = r.split(":");
      e.push(`${s}:${o}`);
    }),
    e
  );
}
function n3(i) {
  const e = [];
  return (
    Object.values(i).forEach((r) => {
      e.push(...Ln(r.accounts));
    }),
    e
  );
}
function s3(i, e) {
  const r = [];
  return (
    Object.values(i).forEach((s) => {
      Ln(s.accounts).includes(e) && r.push(...s.methods);
    }),
    r
  );
}
function o3(i, e) {
  const r = [];
  return (
    Object.values(i).forEach((s) => {
      Ln(s.accounts).includes(e) && r.push(...s.events);
    }),
    r
  );
}
function a3(i, e) {
  const r = Fo(i, e);
  if (r) throw new Error(r.message);
  const s = {};
  for (const [o, c] of Object.entries(i))
    s[o] = {
      methods: c.methods,
      events: c.events,
      chains: c.accounts.map((d) => `${d.split(":")[0]}:${d.split(":")[1]}`),
    };
  return s;
}
function fp(i) {
  return i.includes(":");
}
function No(i) {
  return fp(i) ? i.split(":")[0] : i;
}
const c3 = {
    INVALID_METHOD: { message: "Invalid method.", code: 1001 },
    INVALID_EVENT: { message: "Invalid event.", code: 1002 },
    INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 },
    INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 },
    INVALID_SESSION_SETTLE_REQUEST: {
      message: "Invalid session settle request.",
      code: 1005,
    },
    UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 },
    UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 },
    UNAUTHORIZED_UPDATE_REQUEST: {
      message: "Unauthorized update request.",
      code: 3003,
    },
    UNAUTHORIZED_EXTEND_REQUEST: {
      message: "Unauthorized extend request.",
      code: 3004,
    },
    USER_REJECTED: { message: "User rejected.", code: 5e3 },
    USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 },
    USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 },
    USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 },
    UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 },
    UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 },
    UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 },
    UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 },
    UNSUPPORTED_NAMESPACE_KEY: {
      message: "Unsupported namespace key.",
      code: 5104,
    },
    USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 },
    SESSION_SETTLEMENT_FAILED: {
      message: "Session settlement failed.",
      code: 7e3,
    },
    WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 },
  },
  u3 = {
    NOT_INITIALIZED: { message: "Not initialized.", code: 1 },
    NO_MATCHING_KEY: { message: "No matching key.", code: 2 },
    RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 },
    RESUBSCRIBED: { message: "Resubscribed.", code: 4 },
    MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 },
    EXPIRED: { message: "Expired.", code: 6 },
    UNKNOWN_TYPE: { message: "Unknown type.", code: 7 },
    MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 },
    NON_CONFORMING_NAMESPACES: {
      message: "Non conforming namespaces.",
      code: 9,
    },
  };
function he(i, e) {
  const { message: r, code: s } = u3[i];
  return { message: e ? `${r} ${e}` : r, code: s };
}
function Ft(i, e) {
  const { message: r, code: s } = c3[i];
  return { message: e ? `${r} ${e}` : r, code: s };
}
function ni(i, e) {
  return Array.isArray(i) ? (typeof e < "u" && i.length ? i.every(e) : !0) : !1;
}
function Rn(i) {
  return Object.getPrototypeOf(i) === Object.prototype && Object.keys(i).length;
}
function cr(i) {
  return typeof i > "u";
}
function Gt(i, e) {
  return e && cr(i) ? !0 : typeof i == "string" && !!i.trim().length;
}
function Au(i, e) {
  return e && cr(i) ? !0 : typeof i == "number" && !isNaN(i);
}
function h3(i, e) {
  const { requiredNamespaces: r } = e,
    s = Object.keys(i.namespaces),
    o = Object.keys(r);
  let c = !0;
  return tn(o, s)
    ? (s.forEach((d) => {
        const { accounts: f, methods: g, events: w } = i.namespaces[d],
          D = Ln(f),
          R = r[d];
        (!tn(rp(d, R), D) || !tn(R.methods, g) || !tn(R.events, w)) && (c = !1);
      }),
      c)
    : !1;
}
function jo(i) {
  return Gt(i, !1) && i.includes(":") ? i.split(":").length === 2 : !1;
}
function l3(i) {
  if (Gt(i, !1) && i.includes(":")) {
    const e = i.split(":");
    if (e.length === 3) {
      const r = e[0] + ":" + e[1];
      return !!e[2] && jo(r);
    }
  }
  return !1;
}
function f3(i) {
  if (Gt(i, !1))
    try {
      return typeof new URL(i) < "u";
    } catch {
      return !1;
    }
  return !1;
}
function d3(i) {
  var e;
  return (e = i == null ? void 0 : i.proposer) == null ? void 0 : e.publicKey;
}
function p3(i) {
  return i == null ? void 0 : i.topic;
}
function g3(i, e) {
  let r = null;
  return (
    Gt(i == null ? void 0 : i.publicKey, !1) ||
      (r = he(
        "MISSING_OR_INVALID",
        `${e} controller public key should be a string`
      )),
    r
  );
}
function _f(i) {
  let e = !0;
  return ni(i) ? i.length && (e = i.every((r) => Gt(r, !1))) : (e = !1), e;
}
function v3(i, e, r) {
  let s = null;
  return (
    ni(e) && e.length
      ? e.forEach((o) => {
          s ||
            jo(o) ||
            (s = Ft(
              "UNSUPPORTED_CHAINS",
              `${r}, chain ${o} should be a string and conform to "namespace:chainId" format`
            ));
        })
      : jo(i) ||
        (s = Ft(
          "UNSUPPORTED_CHAINS",
          `${r}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`
        )),
    s
  );
}
function y3(i, e, r) {
  let s = null;
  return (
    Object.entries(i).forEach(([o, c]) => {
      if (s) return;
      const d = v3(o, rp(o, c), `${e} ${r}`);
      d && (s = d);
    }),
    s
  );
}
function _3(i, e) {
  let r = null;
  return (
    ni(i)
      ? i.forEach((s) => {
          r ||
            l3(s) ||
            (r = Ft(
              "UNSUPPORTED_ACCOUNTS",
              `${e}, account ${s} should be a string and conform to "namespace:chainId:address" format`
            ));
        })
      : (r = Ft(
          "UNSUPPORTED_ACCOUNTS",
          `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`
        )),
    r
  );
}
function b3(i, e) {
  let r = null;
  return (
    Object.values(i).forEach((s) => {
      if (r) return;
      const o = _3(s == null ? void 0 : s.accounts, `${e} namespace`);
      o && (r = o);
    }),
    r
  );
}
function m3(i, e) {
  let r = null;
  return (
    _f(i == null ? void 0 : i.methods)
      ? _f(i == null ? void 0 : i.events) ||
        (r = Ft(
          "UNSUPPORTED_EVENTS",
          `${e}, events should be an array of strings or empty array for no events`
        ))
      : (r = Ft(
          "UNSUPPORTED_METHODS",
          `${e}, methods should be an array of strings or empty array for no methods`
        )),
    r
  );
}
function dp(i, e) {
  let r = null;
  return (
    Object.values(i).forEach((s) => {
      if (r) return;
      const o = m3(s, `${e}, namespace`);
      o && (r = o);
    }),
    r
  );
}
function w3(i, e, r) {
  let s = null;
  if (i && Rn(i)) {
    const o = dp(i, e);
    o && (s = o);
    const c = y3(i, e, r);
    c && (s = c);
  } else
    s = he("MISSING_OR_INVALID", `${e}, ${r} should be an object with data`);
  return s;
}
function Fo(i, e) {
  let r = null;
  if (i && Rn(i)) {
    const s = dp(i, e);
    s && (r = s);
    const o = b3(i, e);
    o && (r = o);
  } else
    r = he(
      "MISSING_OR_INVALID",
      `${e}, namespaces should be an object with data`
    );
  return r;
}
function pp(i) {
  return Gt(i.protocol, !0);
}
function E3(i, e) {
  let r = !1;
  return (
    e && !i
      ? (r = !0)
      : i &&
        ni(i) &&
        i.length &&
        i.forEach((s) => {
          r = pp(s);
        }),
    r
  );
}
function D3(i) {
  return typeof i == "number";
}
function yr(i) {
  return typeof i < "u" && typeof i !== null;
}
function S3(i) {
  return !(
    !i ||
    typeof i != "object" ||
    !i.code ||
    !Au(i.code, !1) ||
    !i.message ||
    !Gt(i.message, !1)
  );
}
function I3(i) {
  return !(cr(i) || !Gt(i.method, !1));
}
function x3(i) {
  return !(
    cr(i) ||
    (cr(i.result) && cr(i.error)) ||
    !Au(i.id, !1) ||
    !Gt(i.jsonrpc, !1)
  );
}
function O3(i) {
  return !(cr(i) || !Gt(i.name, !1));
}
function bf(i, e) {
  return !(!jo(e) || !n3(i).includes(e));
}
function C3(i, e, r) {
  return Gt(r, !1) ? s3(i, e).includes(r) : !1;
}
function A3(i, e, r) {
  return Gt(r, !1) ? o3(i, e).includes(r) : !1;
}
function mf(i, e, r) {
  let s = null;
  const o = P3(i),
    c = T3(e),
    d = Object.keys(o),
    f = Object.keys(c),
    g = wf(Object.keys(i)),
    w = wf(Object.keys(e)),
    D = g.filter((R) => !w.includes(R));
  return (
    D.length &&
      (s = he(
        "NON_CONFORMING_NAMESPACES",
        `${r} namespaces keys don't satisfy requiredNamespaces.
      Required: ${D.toString()}
      Received: ${Object.keys(e).toString()}`
      )),
    tn(d, f) ||
      (s = he(
        "NON_CONFORMING_NAMESPACES",
        `${r} namespaces chains don't satisfy required namespaces.
      Required: ${d.toString()}
      Approved: ${f.toString()}`
      )),
    Object.keys(e).forEach((R) => {
      if (!R.includes(":") || s) return;
      const U = Ln(e[R].accounts);
      U.includes(R) ||
        (s = he(
          "NON_CONFORMING_NAMESPACES",
          `${r} namespaces accounts don't satisfy namespace accounts for ${R}
        Required: ${R}
        Approved: ${U.toString()}`
        ));
    }),
    d.forEach((R) => {
      s ||
        (tn(o[R].methods, c[R].methods)
          ? tn(o[R].events, c[R].events) ||
            (s = he(
              "NON_CONFORMING_NAMESPACES",
              `${r} namespaces events don't satisfy namespace events for ${R}`
            ))
          : (s = he(
              "NON_CONFORMING_NAMESPACES",
              `${r} namespaces methods don't satisfy namespace methods for ${R}`
            )));
    }),
    s
  );
}
function P3(i) {
  const e = {};
  return (
    Object.keys(i).forEach((r) => {
      var s;
      r.includes(":")
        ? (e[r] = i[r])
        : (s = i[r].chains) == null ||
          s.forEach((o) => {
            e[o] = { methods: i[r].methods, events: i[r].events };
          });
    }),
    e
  );
}
function wf(i) {
  return [...new Set(i.map((e) => (e.includes(":") ? e.split(":")[0] : e)))];
}
function T3(i) {
  const e = {};
  return (
    Object.keys(i).forEach((r) => {
      if (r.includes(":")) e[r] = i[r];
      else {
        const s = Ln(i[r].accounts);
        s == null ||
          s.forEach((o) => {
            e[o] = {
              accounts: i[r].accounts.filter((c) => c.includes(`${o}:`)),
              methods: i[r].methods,
              events: i[r].events,
            };
          });
      }
    }),
    e
  );
}
function R3(i, e) {
  return Au(i, !1) && i <= e.max && i >= e.min;
}
var Yo = {},
  ws = {};
Object.defineProperty(ws, "__esModule", { value: !0 });
function N3(i) {
  if (typeof i != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof i}`);
  try {
    return JSON.parse(i);
  } catch {
    return i;
  }
}
ws.safeJsonParse = N3;
function F3(i) {
  return typeof i == "string"
    ? i
    : JSON.stringify(i, (e, r) => (typeof r > "u" ? null : r));
}
ws.safeJsonStringify = F3;
var ns = { exports: {} },
  Ef;
function L3() {
  return (
    Ef ||
      ((Ef = 1),
      (function () {
        let i;
        function e() {}
        (i = e),
          (i.prototype.getItem = function (r) {
            return this.hasOwnProperty(r) ? String(this[r]) : null;
          }),
          (i.prototype.setItem = function (r, s) {
            this[r] = String(s);
          }),
          (i.prototype.removeItem = function (r) {
            delete this[r];
          }),
          (i.prototype.clear = function () {
            const r = this;
            Object.keys(r).forEach(function (s) {
              (r[s] = void 0), delete r[s];
            });
          }),
          (i.prototype.key = function (r) {
            return (r = r || 0), Object.keys(this)[r];
          }),
          i.prototype.__defineGetter__("length", function () {
            return Object.keys(this).length;
          }),
          typeof _r < "u" && _r.localStorage
            ? (ns.exports = _r.localStorage)
            : typeof window < "u" && window.localStorage
            ? (ns.exports = window.localStorage)
            : (ns.exports = new e());
      })()),
    ns.exports
  );
}
var Tc = {},
  ss = {},
  Df;
function U3() {
  if (Df) return ss;
  (Df = 1),
    Object.defineProperty(ss, "__esModule", { value: !0 }),
    (ss.IKeyValueStorage = void 0);
  class i {}
  return (ss.IKeyValueStorage = i), ss;
}
var os = {},
  Sf;
function $3() {
  if (Sf) return os;
  (Sf = 1),
    Object.defineProperty(os, "__esModule", { value: !0 }),
    (os.parseEntry = void 0);
  const i = ws;
  function e(r) {
    var s;
    return [
      r[0],
      i.safeJsonParse((s = r[1]) !== null && s !== void 0 ? s : ""),
    ];
  }
  return (os.parseEntry = e), os;
}
var If;
function M3() {
  return (
    If ||
      ((If = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        const e = Br;
        e.__exportStar(U3(), i), e.__exportStar($3(), i);
      })(Tc)),
    Tc
  );
}
Object.defineProperty(Yo, "__esModule", { value: !0 });
Yo.KeyValueStorage = void 0;
const An = Br,
  xf = ws,
  j3 = An.__importDefault(L3()),
  B3 = M3();
class gp {
  constructor() {
    this.localStorage = j3.default;
  }
  getKeys() {
    return An.__awaiter(this, void 0, void 0, function* () {
      return Object.keys(this.localStorage);
    });
  }
  getEntries() {
    return An.__awaiter(this, void 0, void 0, function* () {
      return Object.entries(this.localStorage).map(B3.parseEntry);
    });
  }
  getItem(e) {
    return An.__awaiter(this, void 0, void 0, function* () {
      const r = this.localStorage.getItem(e);
      if (r !== null) return xf.safeJsonParse(r);
    });
  }
  setItem(e, r) {
    return An.__awaiter(this, void 0, void 0, function* () {
      this.localStorage.setItem(e, xf.safeJsonStringify(r));
    });
  }
  removeItem(e) {
    return An.__awaiter(this, void 0, void 0, function* () {
      this.localStorage.removeItem(e);
    });
  }
}
Yo.KeyValueStorage = gp;
var q3 = (Yo.default = gp),
  Un = {},
  as = {},
  Rc = {},
  cs = {};
let sn = class {};
const z3 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, IEvents: sn },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  H3 = vu(z3);
var Of;
function K3() {
  if (Of) return cs;
  (Of = 1),
    Object.defineProperty(cs, "__esModule", { value: !0 }),
    (cs.IHeartBeat = void 0);
  const i = H3;
  class e extends i.IEvents {
    constructor(s) {
      super();
    }
  }
  return (cs.IHeartBeat = e), cs;
}
var Cf;
function vp() {
  return (
    Cf ||
      ((Cf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Br.__exportStar(K3(), i);
      })(Rc)),
    Rc
  );
}
var Nc = {},
  Qi = {},
  Af;
function k3() {
  if (Af) return Qi;
  (Af = 1),
    Object.defineProperty(Qi, "__esModule", { value: !0 }),
    (Qi.HEARTBEAT_EVENTS = Qi.HEARTBEAT_INTERVAL = void 0);
  const i = ye;
  return (
    (Qi.HEARTBEAT_INTERVAL = i.FIVE_SECONDS),
    (Qi.HEARTBEAT_EVENTS = { pulse: "heartbeat_pulse" }),
    Qi
  );
}
var Pf;
function yp() {
  return (
    Pf ||
      ((Pf = 1),
      (function (i) {
        Object.defineProperty(i, "__esModule", { value: !0 }),
          Br.__exportStar(k3(), i);
      })(Nc)),
    Nc
  );
}
var Tf;
function V3() {
  if (Tf) return as;
  (Tf = 1),
    Object.defineProperty(as, "__esModule", { value: !0 }),
    (as.HeartBeat = void 0);
  const i = Br,
    e = xr,
    r = ye,
    s = vp(),
    o = yp();
  class c extends s.IHeartBeat {
    constructor(f) {
      super(f),
        (this.events = new e.EventEmitter()),
        (this.interval = o.HEARTBEAT_INTERVAL),
        (this.interval =
          (f == null ? void 0 : f.interval) || o.HEARTBEAT_INTERVAL);
    }
    static init(f) {
      return i.__awaiter(this, void 0, void 0, function* () {
        const g = new c(f);
        return yield g.init(), g;
      });
    }
    init() {
      return i.__awaiter(this, void 0, void 0, function* () {
        yield this.initialize();
      });
    }
    stop() {
      clearInterval(this.intervalRef);
    }
    on(f, g) {
      this.events.on(f, g);
    }
    once(f, g) {
      this.events.once(f, g);
    }
    off(f, g) {
      this.events.off(f, g);
    }
    removeListener(f, g) {
      this.events.removeListener(f, g);
    }
    initialize() {
      return i.__awaiter(this, void 0, void 0, function* () {
        this.intervalRef = setInterval(
          () => this.pulse(),
          r.toMiliseconds(this.interval)
        );
      });
    }
    pulse() {
      this.events.emit(o.HEARTBEAT_EVENTS.pulse);
    }
  }
  return (as.HeartBeat = c), as;
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  const e = Br;
  e.__exportStar(V3(), i), e.__exportStar(vp(), i), e.__exportStar(yp(), i);
})(Un);
var Ze = {},
  Fc,
  Rf;
function W3() {
  if (Rf) return Fc;
  Rf = 1;
  function i(r) {
    try {
      return JSON.stringify(r);
    } catch {
      return '"[Circular]"';
    }
  }
  Fc = e;
  function e(r, s, o) {
    var c = (o && o.stringify) || i,
      d = 1;
    if (typeof r == "object" && r !== null) {
      var f = s.length + d;
      if (f === 1) return r;
      var g = new Array(f);
      g[0] = c(r);
      for (var w = 1; w < f; w++) g[w] = c(s[w]);
      return g.join(" ");
    }
    if (typeof r != "string") return r;
    var D = s.length;
    if (D === 0) return r;
    for (
      var R = "", U = 1 - d, N = -1, P = (r && r.length) || 0, z = 0;
      z < P;

    ) {
      if (r.charCodeAt(z) === 37 && z + 1 < P) {
        switch (((N = N > -1 ? N : 0), r.charCodeAt(z + 1))) {
          case 100:
          case 102:
            if (U >= D || s[U] == null) break;
            N < z && (R += r.slice(N, z)),
              (R += Number(s[U])),
              (N = z + 2),
              z++;
            break;
          case 105:
            if (U >= D || s[U] == null) break;
            N < z && (R += r.slice(N, z)),
              (R += Math.floor(Number(s[U]))),
              (N = z + 2),
              z++;
            break;
          case 79:
          case 111:
          case 106:
            if (U >= D || s[U] === void 0) break;
            N < z && (R += r.slice(N, z));
            var K = typeof s[U];
            if (K === "string") {
              (R += "'" + s[U] + "'"), (N = z + 2), z++;
              break;
            }
            if (K === "function") {
              (R += s[U].name || "<anonymous>"), (N = z + 2), z++;
              break;
            }
            (R += c(s[U])), (N = z + 2), z++;
            break;
          case 115:
            if (U >= D) break;
            N < z && (R += r.slice(N, z)),
              (R += String(s[U])),
              (N = z + 2),
              z++;
            break;
          case 37:
            N < z && (R += r.slice(N, z)), (R += "%"), (N = z + 2), z++, U--;
            break;
        }
        ++U;
      }
      ++z;
    }
    return N === -1 ? r : (N < P && (R += r.slice(N)), R);
  }
  return Fc;
}
var Lc, Nf;
function G3() {
  if (Nf) return Lc;
  Nf = 1;
  const i = W3();
  Lc = o;
  const e = C().console || {},
    r = {
      mapHttpRequest: P,
      mapHttpResponse: P,
      wrapRequestSerializer: z,
      wrapResponseSerializer: z,
      wrapErrorSerializer: z,
      req: P,
      res: P,
      err: U,
    };
  function s(m, u) {
    return Array.isArray(m)
      ? m.filter(function (W) {
          return W !== "!stdSerializers.err";
        })
      : m === !0
      ? Object.keys(u)
      : !1;
  }
  function o(m) {
    (m = m || {}), (m.browser = m.browser || {});
    const u = m.browser.transmit;
    if (u && typeof u.send != "function")
      throw Error("pino: transmit option must have a send function");
    const _ = m.browser.write || e;
    m.browser.write && (m.browser.asObject = !0);
    const W = m.serializers || {},
      G = s(m.browser.serialize, W);
    let se = m.browser.serialize;
    Array.isArray(m.browser.serialize) &&
      m.browser.serialize.indexOf("!stdSerializers.err") > -1 &&
      (se = !1);
    const ce = ["error", "fatal", "warn", "info", "debug", "trace"];
    typeof _ == "function" &&
      (_.error = _.fatal = _.warn = _.info = _.debug = _.trace = _),
      m.enabled === !1 && (m.level = "silent");
    const de = m.level || "info",
      b = Object.create(_);
    b.log || (b.log = K),
      Object.defineProperty(b, "levelVal", { get: ee }),
      Object.defineProperty(b, "level", { get: X, set: k });
    const x = {
      transmit: u,
      serialize: G,
      asObject: m.browser.asObject,
      levels: ce,
      timestamp: N(m),
    };
    (b.levels = o.levels),
      (b.level = de),
      (b.setMaxListeners =
        b.getMaxListeners =
        b.emit =
        b.addListener =
        b.on =
        b.prependListener =
        b.once =
        b.prependOnceListener =
        b.removeListener =
        b.removeAllListeners =
        b.listeners =
        b.listenerCount =
        b.eventNames =
        b.write =
        b.flush =
          K),
      (b.serializers = W),
      (b._serialize = G),
      (b._stdErrSerialize = se),
      (b.child = V),
      u && (b._logEvent = R());
    function ee() {
      return this.level === "silent" ? 1 / 0 : this.levels.values[this.level];
    }
    function X() {
      return this._level;
    }
    function k(J) {
      if (J !== "silent" && !this.levels.values[J])
        throw Error("unknown level " + J);
      (this._level = J),
        c(x, b, "error", "log"),
        c(x, b, "fatal", "error"),
        c(x, b, "warn", "error"),
        c(x, b, "info", "log"),
        c(x, b, "debug", "log"),
        c(x, b, "trace", "log");
    }
    function V(J, re) {
      if (!J) throw new Error("missing bindings for child Pino");
      (re = re || {}), G && J.serializers && (re.serializers = J.serializers);
      const me = re.serializers;
      if (G && me) {
        var oe = Object.assign({}, W, me),
          we = m.browser.serialize === !0 ? Object.keys(oe) : G;
        delete J.serializers, g([J], we, oe, this._stdErrSerialize);
      }
      function le(_e) {
        (this._childLevel = (_e._childLevel | 0) + 1),
          (this.error = w(_e, J, "error")),
          (this.fatal = w(_e, J, "fatal")),
          (this.warn = w(_e, J, "warn")),
          (this.info = w(_e, J, "info")),
          (this.debug = w(_e, J, "debug")),
          (this.trace = w(_e, J, "trace")),
          oe && ((this.serializers = oe), (this._serialize = we)),
          u && (this._logEvent = R([].concat(_e._logEvent.bindings, J)));
      }
      return (le.prototype = this), new le(this);
    }
    return b;
  }
  (o.levels = {
    values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 },
    labels: {
      10: "trace",
      20: "debug",
      30: "info",
      40: "warn",
      50: "error",
      60: "fatal",
    },
  }),
    (o.stdSerializers = r),
    (o.stdTimeFunctions = Object.assign(
      {},
      { nullTime: ne, epochTime: T, unixTime: $, isoTime: S }
    ));
  function c(m, u, _, W) {
    const G = Object.getPrototypeOf(u);
    (u[_] =
      u.levelVal > u.levels.values[_] ? K : G[_] ? G[_] : e[_] || e[W] || K),
      d(m, u, _);
  }
  function d(m, u, _) {
    (!m.transmit && u[_] === K) ||
      (u[_] = (function (W) {
        return function () {
          const se = m.timestamp(),
            ce = new Array(arguments.length),
            de =
              Object.getPrototypeOf && Object.getPrototypeOf(this) === e
                ? e
                : this;
          for (var b = 0; b < ce.length; b++) ce[b] = arguments[b];
          if (
            (m.serialize &&
              !m.asObject &&
              g(ce, this._serialize, this.serializers, this._stdErrSerialize),
            m.asObject ? W.call(de, f(this, _, ce, se)) : W.apply(de, ce),
            m.transmit)
          ) {
            const x = m.transmit.level || u.level,
              ee = o.levels.values[x],
              X = o.levels.values[_];
            if (X < ee) return;
            D(
              this,
              {
                ts: se,
                methodLevel: _,
                methodValue: X,
                transmitLevel: x,
                transmitValue: o.levels.values[m.transmit.level || u.level],
                send: m.transmit.send,
                val: u.levelVal,
              },
              ce
            );
          }
        };
      })(u[_]));
  }
  function f(m, u, _, W) {
    m._serialize && g(_, m._serialize, m.serializers, m._stdErrSerialize);
    const G = _.slice();
    let se = G[0];
    const ce = {};
    W && (ce.time = W), (ce.level = o.levels.values[u]);
    let de = (m._childLevel | 0) + 1;
    if ((de < 1 && (de = 1), se !== null && typeof se == "object")) {
      for (; de-- && typeof G[0] == "object"; ) Object.assign(ce, G.shift());
      se = G.length ? i(G.shift(), G) : void 0;
    } else typeof se == "string" && (se = i(G.shift(), G));
    return se !== void 0 && (ce.msg = se), ce;
  }
  function g(m, u, _, W) {
    for (const G in m)
      if (W && m[G] instanceof Error) m[G] = o.stdSerializers.err(m[G]);
      else if (typeof m[G] == "object" && !Array.isArray(m[G]))
        for (const se in m[G])
          u && u.indexOf(se) > -1 && se in _ && (m[G][se] = _[se](m[G][se]));
  }
  function w(m, u, _) {
    return function () {
      const W = new Array(1 + arguments.length);
      W[0] = u;
      for (var G = 1; G < W.length; G++) W[G] = arguments[G - 1];
      return m[_].apply(this, W);
    };
  }
  function D(m, u, _) {
    const W = u.send,
      G = u.ts,
      se = u.methodLevel,
      ce = u.methodValue,
      de = u.val,
      b = m._logEvent.bindings;
    g(
      _,
      m._serialize || Object.keys(m.serializers),
      m.serializers,
      m._stdErrSerialize === void 0 ? !0 : m._stdErrSerialize
    ),
      (m._logEvent.ts = G),
      (m._logEvent.messages = _.filter(function (x) {
        return b.indexOf(x) === -1;
      })),
      (m._logEvent.level.label = se),
      (m._logEvent.level.value = ce),
      W(se, m._logEvent, de),
      (m._logEvent = R(b));
  }
  function R(m) {
    return {
      ts: 0,
      messages: [],
      bindings: m || [],
      level: { label: "", value: 0 },
    };
  }
  function U(m) {
    const u = { type: m.constructor.name, msg: m.message, stack: m.stack };
    for (const _ in m) u[_] === void 0 && (u[_] = m[_]);
    return u;
  }
  function N(m) {
    return typeof m.timestamp == "function"
      ? m.timestamp
      : m.timestamp === !1
      ? ne
      : T;
  }
  function P() {
    return {};
  }
  function z(m) {
    return m;
  }
  function K() {}
  function ne() {
    return !1;
  }
  function T() {
    return Date.now();
  }
  function $() {
    return Math.round(Date.now() / 1e3);
  }
  function S() {
    return new Date(Date.now()).toISOString();
  }
  function C() {
    function m(u) {
      return typeof u < "u" && u;
    }
    try {
      return (
        typeof globalThis < "u" ||
          Object.defineProperty(Object.prototype, "globalThis", {
            get: function () {
              return (
                delete Object.prototype.globalThis, (this.globalThis = this)
              );
            },
            configurable: !0,
          }),
        globalThis
      );
    } catch {
      return m(self) || m(window) || m(this) || {};
    }
  }
  return Lc;
}
var Zi = {},
  Ff;
function _p() {
  return (
    Ff ||
      ((Ff = 1),
      Object.defineProperty(Zi, "__esModule", { value: !0 }),
      (Zi.PINO_CUSTOM_CONTEXT_KEY = Zi.PINO_LOGGER_DEFAULTS = void 0),
      (Zi.PINO_LOGGER_DEFAULTS = { level: "info" }),
      (Zi.PINO_CUSTOM_CONTEXT_KEY = "custom_context")),
    Zi
  );
}
var ar = {},
  Lf;
function Y3() {
  if (Lf) return ar;
  (Lf = 1),
    Object.defineProperty(ar, "__esModule", { value: !0 }),
    (ar.generateChildLogger =
      ar.formatChildLoggerContext =
      ar.getLoggerContext =
      ar.setBrowserLoggerContext =
      ar.getBrowserLoggerContext =
      ar.getDefaultLoggerOptions =
        void 0);
  const i = _p();
  function e(f) {
    return Object.assign(Object.assign({}, f), {
      level: (f == null ? void 0 : f.level) || i.PINO_LOGGER_DEFAULTS.level,
    });
  }
  ar.getDefaultLoggerOptions = e;
  function r(f, g = i.PINO_CUSTOM_CONTEXT_KEY) {
    return f[g] || "";
  }
  ar.getBrowserLoggerContext = r;
  function s(f, g, w = i.PINO_CUSTOM_CONTEXT_KEY) {
    return (f[w] = g), f;
  }
  ar.setBrowserLoggerContext = s;
  function o(f, g = i.PINO_CUSTOM_CONTEXT_KEY) {
    let w = "";
    return (
      typeof f.bindings > "u"
        ? (w = r(f, g))
        : (w = f.bindings().context || ""),
      w
    );
  }
  ar.getLoggerContext = o;
  function c(f, g, w = i.PINO_CUSTOM_CONTEXT_KEY) {
    const D = o(f, w);
    return D.trim() ? `${D}/${g}` : g;
  }
  ar.formatChildLoggerContext = c;
  function d(f, g, w = i.PINO_CUSTOM_CONTEXT_KEY) {
    const D = c(f, g, w),
      R = f.child({ context: D });
    return s(R, D, w);
  }
  return (ar.generateChildLogger = d), ar;
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), (i.pino = void 0);
  const e = Br,
    r = e.__importDefault(G3());
  Object.defineProperty(i, "pino", {
    enumerable: !0,
    get: function () {
      return r.default;
    },
  }),
    e.__exportStar(_p(), i),
    e.__exportStar(Y3(), i);
})(Ze);
class J3 extends sn {
  constructor(e) {
    super(), (this.opts = e), (this.protocol = "wc"), (this.version = 2);
  }
}
class X3 extends sn {
  constructor(e, r) {
    super(), (this.core = e), (this.logger = r), (this.records = new Map());
  }
}
class Q3 {
  constructor(e, r) {
    (this.logger = e), (this.core = r);
  }
}
let Z3 = class extends sn {
    constructor(e, r) {
      super(), (this.relayer = e), (this.logger = r);
    }
  },
  e6 = class extends sn {
    constructor(e) {
      super();
    }
  },
  t6 = class {
    constructor(e, r, s, o) {
      (this.core = e), (this.logger = r), (this.name = s);
    }
  };
class r6 extends sn {
  constructor(e, r) {
    super(), (this.relayer = e), (this.logger = r);
  }
}
class i6 extends sn {
  constructor(e, r) {
    super(), (this.core = e), (this.logger = r);
  }
}
let n6 = class {
    constructor(e, r) {
      (this.projectId = e), (this.logger = r);
    }
  },
  s6 = class {
    constructor(e) {
      (this.opts = e), (this.protocol = "wc"), (this.version = 2);
    }
  };
class o6 {
  constructor(e) {
    this.client = e;
  }
}
const a6 = (i) =>
    JSON.stringify(i, (e, r) =>
      typeof r == "bigint" ? r.toString() + "n" : r
    ),
  c6 = (i) => {
    const e =
        /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g,
      r = i.replace(e, '$1"$2n"$3');
    return JSON.parse(r, (s, o) =>
      typeof o == "string" && o.match(/^\d+n$/)
        ? BigInt(o.substring(0, o.length - 1))
        : o
    );
  };
function Pu(i) {
  if (typeof i != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof i}`);
  try {
    return c6(i);
  } catch {
    return i;
  }
}
function ys(i) {
  return typeof i == "string" ? i : a6(i) || "";
}
var Tu = {},
  bp = {};
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ue,
    r = Or;
  (i.DIGEST_LENGTH = 64), (i.BLOCK_SIZE = 128);
  var s = (function () {
    function f() {
      (this.digestLength = i.DIGEST_LENGTH),
        (this.blockSize = i.BLOCK_SIZE),
        (this._stateHi = new Int32Array(8)),
        (this._stateLo = new Int32Array(8)),
        (this._tempHi = new Int32Array(16)),
        (this._tempLo = new Int32Array(16)),
        (this._buffer = new Uint8Array(256)),
        (this._bufferLength = 0),
        (this._bytesHashed = 0),
        (this._finished = !1),
        this.reset();
    }
    return (
      (f.prototype._initState = function () {
        (this._stateHi[0] = 1779033703),
          (this._stateHi[1] = 3144134277),
          (this._stateHi[2] = 1013904242),
          (this._stateHi[3] = 2773480762),
          (this._stateHi[4] = 1359893119),
          (this._stateHi[5] = 2600822924),
          (this._stateHi[6] = 528734635),
          (this._stateHi[7] = 1541459225),
          (this._stateLo[0] = 4089235720),
          (this._stateLo[1] = 2227873595),
          (this._stateLo[2] = 4271175723),
          (this._stateLo[3] = 1595750129),
          (this._stateLo[4] = 2917565137),
          (this._stateLo[5] = 725511199),
          (this._stateLo[6] = 4215389547),
          (this._stateLo[7] = 327033209);
      }),
      (f.prototype.reset = function () {
        return (
          this._initState(),
          (this._bufferLength = 0),
          (this._bytesHashed = 0),
          (this._finished = !1),
          this
        );
      }),
      (f.prototype.clean = function () {
        r.wipe(this._buffer),
          r.wipe(this._tempHi),
          r.wipe(this._tempLo),
          this.reset();
      }),
      (f.prototype.update = function (g, w) {
        if ((w === void 0 && (w = g.length), this._finished))
          throw new Error("SHA512: can't update because hash was finished.");
        var D = 0;
        if (((this._bytesHashed += w), this._bufferLength > 0)) {
          for (; this._bufferLength < i.BLOCK_SIZE && w > 0; )
            (this._buffer[this._bufferLength++] = g[D++]), w--;
          this._bufferLength === this.blockSize &&
            (c(
              this._tempHi,
              this._tempLo,
              this._stateHi,
              this._stateLo,
              this._buffer,
              0,
              this.blockSize
            ),
            (this._bufferLength = 0));
        }
        for (
          w >= this.blockSize &&
          ((D = c(
            this._tempHi,
            this._tempLo,
            this._stateHi,
            this._stateLo,
            g,
            D,
            w
          )),
          (w %= this.blockSize));
          w > 0;

        )
          (this._buffer[this._bufferLength++] = g[D++]), w--;
        return this;
      }),
      (f.prototype.finish = function (g) {
        if (!this._finished) {
          var w = this._bytesHashed,
            D = this._bufferLength,
            R = (w / 536870912) | 0,
            U = w << 3,
            N = w % 128 < 112 ? 128 : 256;
          this._buffer[D] = 128;
          for (var P = D + 1; P < N - 8; P++) this._buffer[P] = 0;
          e.writeUint32BE(R, this._buffer, N - 8),
            e.writeUint32BE(U, this._buffer, N - 4),
            c(
              this._tempHi,
              this._tempLo,
              this._stateHi,
              this._stateLo,
              this._buffer,
              0,
              N
            ),
            (this._finished = !0);
        }
        for (var P = 0; P < this.digestLength / 8; P++)
          e.writeUint32BE(this._stateHi[P], g, P * 8),
            e.writeUint32BE(this._stateLo[P], g, P * 8 + 4);
        return this;
      }),
      (f.prototype.digest = function () {
        var g = new Uint8Array(this.digestLength);
        return this.finish(g), g;
      }),
      (f.prototype.saveState = function () {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer:
            this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed,
        };
      }),
      (f.prototype.restoreState = function (g) {
        return (
          this._stateHi.set(g.stateHi),
          this._stateLo.set(g.stateLo),
          (this._bufferLength = g.bufferLength),
          g.buffer && this._buffer.set(g.buffer),
          (this._bytesHashed = g.bytesHashed),
          (this._finished = !1),
          this
        );
      }),
      (f.prototype.cleanSavedState = function (g) {
        r.wipe(g.stateHi),
          r.wipe(g.stateLo),
          g.buffer && r.wipe(g.buffer),
          (g.bufferLength = 0),
          (g.bytesHashed = 0);
      }),
      f
    );
  })();
  i.SHA512 = s;
  var o = new Int32Array([
    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
    2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
    3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
    113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
    773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
    1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
    2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
    3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
    430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
    883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
    1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
    2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
    2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
    3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
    3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
    174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
    685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
    1607167915, 987167468, 1816402316, 1246189591,
  ]);
  function c(f, g, w, D, R, U, N) {
    for (
      var P = w[0],
        z = w[1],
        K = w[2],
        ne = w[3],
        T = w[4],
        $ = w[5],
        S = w[6],
        C = w[7],
        m = D[0],
        u = D[1],
        _ = D[2],
        W = D[3],
        G = D[4],
        se = D[5],
        ce = D[6],
        de = D[7],
        b,
        x,
        ee,
        X,
        k,
        V,
        J,
        re;
      N >= 128;

    ) {
      for (var me = 0; me < 16; me++) {
        var oe = 8 * me + U;
        (f[me] = e.readUint32BE(R, oe)), (g[me] = e.readUint32BE(R, oe + 4));
      }
      for (var me = 0; me < 80; me++) {
        var we = P,
          le = z,
          _e = K,
          q = ne,
          B = T,
          F = $,
          l = S,
          O = C,
          ae = m,
          fe = u,
          Ie = _,
          ze = W,
          ke = G,
          $e = se,
          gt = ce,
          vt = de;
        if (
          ((b = C),
          (x = de),
          (k = x & 65535),
          (V = x >>> 16),
          (J = b & 65535),
          (re = b >>> 16),
          (b =
            ((T >>> 14) | (G << (32 - 14))) ^
            ((T >>> 18) | (G << (32 - 18))) ^
            ((G >>> (41 - 32)) | (T << (32 - (41 - 32))))),
          (x =
            ((G >>> 14) | (T << (32 - 14))) ^
            ((G >>> 18) | (T << (32 - 18))) ^
            ((T >>> (41 - 32)) | (G << (32 - (41 - 32))))),
          (k += x & 65535),
          (V += x >>> 16),
          (J += b & 65535),
          (re += b >>> 16),
          (b = (T & $) ^ (~T & S)),
          (x = (G & se) ^ (~G & ce)),
          (k += x & 65535),
          (V += x >>> 16),
          (J += b & 65535),
          (re += b >>> 16),
          (b = o[me * 2]),
          (x = o[me * 2 + 1]),
          (k += x & 65535),
          (V += x >>> 16),
          (J += b & 65535),
          (re += b >>> 16),
          (b = f[me % 16]),
          (x = g[me % 16]),
          (k += x & 65535),
          (V += x >>> 16),
          (J += b & 65535),
          (re += b >>> 16),
          (V += k >>> 16),
          (J += V >>> 16),
          (re += J >>> 16),
          (ee = (J & 65535) | (re << 16)),
          (X = (k & 65535) | (V << 16)),
          (b = ee),
          (x = X),
          (k = x & 65535),
          (V = x >>> 16),
          (J = b & 65535),
          (re = b >>> 16),
          (b =
            ((P >>> 28) | (m << (32 - 28))) ^
            ((m >>> (34 - 32)) | (P << (32 - (34 - 32)))) ^
            ((m >>> (39 - 32)) | (P << (32 - (39 - 32))))),
          (x =
            ((m >>> 28) | (P << (32 - 28))) ^
            ((P >>> (34 - 32)) | (m << (32 - (34 - 32)))) ^
            ((P >>> (39 - 32)) | (m << (32 - (39 - 32))))),
          (k += x & 65535),
          (V += x >>> 16),
          (J += b & 65535),
          (re += b >>> 16),
          (b = (P & z) ^ (P & K) ^ (z & K)),
          (x = (m & u) ^ (m & _) ^ (u & _)),
          (k += x & 65535),
          (V += x >>> 16),
          (J += b & 65535),
          (re += b >>> 16),
          (V += k >>> 16),
          (J += V >>> 16),
          (re += J >>> 16),
          (O = (J & 65535) | (re << 16)),
          (vt = (k & 65535) | (V << 16)),
          (b = q),
          (x = ze),
          (k = x & 65535),
          (V = x >>> 16),
          (J = b & 65535),
          (re = b >>> 16),
          (b = ee),
          (x = X),
          (k += x & 65535),
          (V += x >>> 16),
          (J += b & 65535),
          (re += b >>> 16),
          (V += k >>> 16),
          (J += V >>> 16),
          (re += J >>> 16),
          (q = (J & 65535) | (re << 16)),
          (ze = (k & 65535) | (V << 16)),
          (z = we),
          (K = le),
          (ne = _e),
          (T = q),
          ($ = B),
          (S = F),
          (C = l),
          (P = O),
          (u = ae),
          (_ = fe),
          (W = Ie),
          (G = ze),
          (se = ke),
          (ce = $e),
          (de = gt),
          (m = vt),
          me % 16 === 15)
        )
          for (var oe = 0; oe < 16; oe++)
            (b = f[oe]),
              (x = g[oe]),
              (k = x & 65535),
              (V = x >>> 16),
              (J = b & 65535),
              (re = b >>> 16),
              (b = f[(oe + 9) % 16]),
              (x = g[(oe + 9) % 16]),
              (k += x & 65535),
              (V += x >>> 16),
              (J += b & 65535),
              (re += b >>> 16),
              (ee = f[(oe + 1) % 16]),
              (X = g[(oe + 1) % 16]),
              (b =
                ((ee >>> 1) | (X << (32 - 1))) ^
                ((ee >>> 8) | (X << (32 - 8))) ^
                (ee >>> 7)),
              (x =
                ((X >>> 1) | (ee << (32 - 1))) ^
                ((X >>> 8) | (ee << (32 - 8))) ^
                ((X >>> 7) | (ee << (32 - 7)))),
              (k += x & 65535),
              (V += x >>> 16),
              (J += b & 65535),
              (re += b >>> 16),
              (ee = f[(oe + 14) % 16]),
              (X = g[(oe + 14) % 16]),
              (b =
                ((ee >>> 19) | (X << (32 - 19))) ^
                ((X >>> (61 - 32)) | (ee << (32 - (61 - 32)))) ^
                (ee >>> 6)),
              (x =
                ((X >>> 19) | (ee << (32 - 19))) ^
                ((ee >>> (61 - 32)) | (X << (32 - (61 - 32)))) ^
                ((X >>> 6) | (ee << (32 - 6)))),
              (k += x & 65535),
              (V += x >>> 16),
              (J += b & 65535),
              (re += b >>> 16),
              (V += k >>> 16),
              (J += V >>> 16),
              (re += J >>> 16),
              (f[oe] = (J & 65535) | (re << 16)),
              (g[oe] = (k & 65535) | (V << 16));
      }
      (b = P),
        (x = m),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[0]),
        (x = D[0]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[0] = P = (J & 65535) | (re << 16)),
        (D[0] = m = (k & 65535) | (V << 16)),
        (b = z),
        (x = u),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[1]),
        (x = D[1]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[1] = z = (J & 65535) | (re << 16)),
        (D[1] = u = (k & 65535) | (V << 16)),
        (b = K),
        (x = _),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[2]),
        (x = D[2]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[2] = K = (J & 65535) | (re << 16)),
        (D[2] = _ = (k & 65535) | (V << 16)),
        (b = ne),
        (x = W),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[3]),
        (x = D[3]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[3] = ne = (J & 65535) | (re << 16)),
        (D[3] = W = (k & 65535) | (V << 16)),
        (b = T),
        (x = G),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[4]),
        (x = D[4]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[4] = T = (J & 65535) | (re << 16)),
        (D[4] = G = (k & 65535) | (V << 16)),
        (b = $),
        (x = se),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[5]),
        (x = D[5]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[5] = $ = (J & 65535) | (re << 16)),
        (D[5] = se = (k & 65535) | (V << 16)),
        (b = S),
        (x = ce),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[6]),
        (x = D[6]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[6] = S = (J & 65535) | (re << 16)),
        (D[6] = ce = (k & 65535) | (V << 16)),
        (b = C),
        (x = de),
        (k = x & 65535),
        (V = x >>> 16),
        (J = b & 65535),
        (re = b >>> 16),
        (b = w[7]),
        (x = D[7]),
        (k += x & 65535),
        (V += x >>> 16),
        (J += b & 65535),
        (re += b >>> 16),
        (V += k >>> 16),
        (J += V >>> 16),
        (re += J >>> 16),
        (w[7] = C = (J & 65535) | (re << 16)),
        (D[7] = de = (k & 65535) | (V << 16)),
        (U += 128),
        (N -= 128);
    }
    return U;
  }
  function d(f) {
    var g = new s();
    g.update(f);
    var w = g.digest();
    return g.clean(), w;
  }
  i.hash = d;
})(bp);
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 }),
    (i.convertSecretKeyToX25519 =
      i.convertPublicKeyToX25519 =
      i.verify =
      i.sign =
      i.extractPublicKeyFromSecretKey =
      i.generateKeyPair =
      i.generateKeyPairFromSeed =
      i.SEED_LENGTH =
      i.SECRET_KEY_LENGTH =
      i.PUBLIC_KEY_LENGTH =
      i.SIGNATURE_LENGTH =
        void 0);
  const e = Nn,
    r = bp,
    s = Or;
  (i.SIGNATURE_LENGTH = 64),
    (i.PUBLIC_KEY_LENGTH = 32),
    (i.SECRET_KEY_LENGTH = 64),
    (i.SEED_LENGTH = 32);
  function o(q) {
    const B = new Float64Array(16);
    if (q) for (let F = 0; F < q.length; F++) B[F] = q[F];
    return B;
  }
  const c = new Uint8Array(32);
  c[0] = 9;
  const d = o(),
    f = o([1]),
    g = o([
      30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505,
      36039, 65139, 11119, 27886, 20995,
    ]),
    w = o([
      61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010,
      6542, 64743, 22239, 55772, 9222,
    ]),
    D = o([
      54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982,
      57905, 49316, 21502, 52590, 14035, 8553,
    ]),
    R = o([
      26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
      26214, 26214, 26214, 26214, 26214, 26214,
    ]),
    U = o([
      41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153,
      11085, 57099, 20417, 9344, 11139,
    ]);
  function N(q, B) {
    for (let F = 0; F < 16; F++) q[F] = B[F] | 0;
  }
  function P(q) {
    let B = 1;
    for (let F = 0; F < 16; F++) {
      let l = q[F] + B + 65535;
      (B = Math.floor(l / 65536)), (q[F] = l - B * 65536);
    }
    q[0] += B - 1 + 37 * (B - 1);
  }
  function z(q, B, F) {
    const l = ~(F - 1);
    for (let O = 0; O < 16; O++) {
      const ae = l & (q[O] ^ B[O]);
      (q[O] ^= ae), (B[O] ^= ae);
    }
  }
  function K(q, B) {
    const F = o(),
      l = o();
    for (let O = 0; O < 16; O++) l[O] = B[O];
    P(l), P(l), P(l);
    for (let O = 0; O < 2; O++) {
      F[0] = l[0] - 65517;
      for (let fe = 1; fe < 15; fe++)
        (F[fe] = l[fe] - 65535 - ((F[fe - 1] >> 16) & 1)), (F[fe - 1] &= 65535);
      F[15] = l[15] - 32767 - ((F[14] >> 16) & 1);
      const ae = (F[15] >> 16) & 1;
      (F[14] &= 65535), z(l, F, 1 - ae);
    }
    for (let O = 0; O < 16; O++)
      (q[2 * O] = l[O] & 255), (q[2 * O + 1] = l[O] >> 8);
  }
  function ne(q, B) {
    let F = 0;
    for (let l = 0; l < 32; l++) F |= q[l] ^ B[l];
    return (1 & ((F - 1) >>> 8)) - 1;
  }
  function T(q, B) {
    const F = new Uint8Array(32),
      l = new Uint8Array(32);
    return K(F, q), K(l, B), ne(F, l);
  }
  function $(q) {
    const B = new Uint8Array(32);
    return K(B, q), B[0] & 1;
  }
  function S(q, B) {
    for (let F = 0; F < 16; F++) q[F] = B[2 * F] + (B[2 * F + 1] << 8);
    q[15] &= 32767;
  }
  function C(q, B, F) {
    for (let l = 0; l < 16; l++) q[l] = B[l] + F[l];
  }
  function m(q, B, F) {
    for (let l = 0; l < 16; l++) q[l] = B[l] - F[l];
  }
  function u(q, B, F) {
    let l,
      O,
      ae = 0,
      fe = 0,
      Ie = 0,
      ze = 0,
      ke = 0,
      $e = 0,
      gt = 0,
      vt = 0,
      je = 0,
      xe = 0,
      Ne = 0,
      Fe = 0,
      Be = 0,
      Ce = 0,
      Le = 0,
      Se = 0,
      Ae = 0,
      He = 0,
      Oe = 0,
      Ve = 0,
      Ge = 0,
      et = 0,
      tt = 0,
      Je = 0,
      tr = 0,
      lr = 0,
      Yr = 0,
      rr = 0,
      si = 0,
      mi = 0,
      Ui = 0,
      Et = F[0],
      yt = F[1],
      Dt = F[2],
      St = F[3],
      mt = F[4],
      _t = F[5],
      Ut = F[6],
      $t = F[7],
      It = F[8],
      Mt = F[9],
      xt = F[10],
      Pt = F[11],
      Ot = F[12],
      lt = F[13],
      jt = F[14],
      Bt = F[15];
    (l = B[0]),
      (ae += l * Et),
      (fe += l * yt),
      (Ie += l * Dt),
      (ze += l * St),
      (ke += l * mt),
      ($e += l * _t),
      (gt += l * Ut),
      (vt += l * $t),
      (je += l * It),
      (xe += l * Mt),
      (Ne += l * xt),
      (Fe += l * Pt),
      (Be += l * Ot),
      (Ce += l * lt),
      (Le += l * jt),
      (Se += l * Bt),
      (l = B[1]),
      (fe += l * Et),
      (Ie += l * yt),
      (ze += l * Dt),
      (ke += l * St),
      ($e += l * mt),
      (gt += l * _t),
      (vt += l * Ut),
      (je += l * $t),
      (xe += l * It),
      (Ne += l * Mt),
      (Fe += l * xt),
      (Be += l * Pt),
      (Ce += l * Ot),
      (Le += l * lt),
      (Se += l * jt),
      (Ae += l * Bt),
      (l = B[2]),
      (Ie += l * Et),
      (ze += l * yt),
      (ke += l * Dt),
      ($e += l * St),
      (gt += l * mt),
      (vt += l * _t),
      (je += l * Ut),
      (xe += l * $t),
      (Ne += l * It),
      (Fe += l * Mt),
      (Be += l * xt),
      (Ce += l * Pt),
      (Le += l * Ot),
      (Se += l * lt),
      (Ae += l * jt),
      (He += l * Bt),
      (l = B[3]),
      (ze += l * Et),
      (ke += l * yt),
      ($e += l * Dt),
      (gt += l * St),
      (vt += l * mt),
      (je += l * _t),
      (xe += l * Ut),
      (Ne += l * $t),
      (Fe += l * It),
      (Be += l * Mt),
      (Ce += l * xt),
      (Le += l * Pt),
      (Se += l * Ot),
      (Ae += l * lt),
      (He += l * jt),
      (Oe += l * Bt),
      (l = B[4]),
      (ke += l * Et),
      ($e += l * yt),
      (gt += l * Dt),
      (vt += l * St),
      (je += l * mt),
      (xe += l * _t),
      (Ne += l * Ut),
      (Fe += l * $t),
      (Be += l * It),
      (Ce += l * Mt),
      (Le += l * xt),
      (Se += l * Pt),
      (Ae += l * Ot),
      (He += l * lt),
      (Oe += l * jt),
      (Ve += l * Bt),
      (l = B[5]),
      ($e += l * Et),
      (gt += l * yt),
      (vt += l * Dt),
      (je += l * St),
      (xe += l * mt),
      (Ne += l * _t),
      (Fe += l * Ut),
      (Be += l * $t),
      (Ce += l * It),
      (Le += l * Mt),
      (Se += l * xt),
      (Ae += l * Pt),
      (He += l * Ot),
      (Oe += l * lt),
      (Ve += l * jt),
      (Ge += l * Bt),
      (l = B[6]),
      (gt += l * Et),
      (vt += l * yt),
      (je += l * Dt),
      (xe += l * St),
      (Ne += l * mt),
      (Fe += l * _t),
      (Be += l * Ut),
      (Ce += l * $t),
      (Le += l * It),
      (Se += l * Mt),
      (Ae += l * xt),
      (He += l * Pt),
      (Oe += l * Ot),
      (Ve += l * lt),
      (Ge += l * jt),
      (et += l * Bt),
      (l = B[7]),
      (vt += l * Et),
      (je += l * yt),
      (xe += l * Dt),
      (Ne += l * St),
      (Fe += l * mt),
      (Be += l * _t),
      (Ce += l * Ut),
      (Le += l * $t),
      (Se += l * It),
      (Ae += l * Mt),
      (He += l * xt),
      (Oe += l * Pt),
      (Ve += l * Ot),
      (Ge += l * lt),
      (et += l * jt),
      (tt += l * Bt),
      (l = B[8]),
      (je += l * Et),
      (xe += l * yt),
      (Ne += l * Dt),
      (Fe += l * St),
      (Be += l * mt),
      (Ce += l * _t),
      (Le += l * Ut),
      (Se += l * $t),
      (Ae += l * It),
      (He += l * Mt),
      (Oe += l * xt),
      (Ve += l * Pt),
      (Ge += l * Ot),
      (et += l * lt),
      (tt += l * jt),
      (Je += l * Bt),
      (l = B[9]),
      (xe += l * Et),
      (Ne += l * yt),
      (Fe += l * Dt),
      (Be += l * St),
      (Ce += l * mt),
      (Le += l * _t),
      (Se += l * Ut),
      (Ae += l * $t),
      (He += l * It),
      (Oe += l * Mt),
      (Ve += l * xt),
      (Ge += l * Pt),
      (et += l * Ot),
      (tt += l * lt),
      (Je += l * jt),
      (tr += l * Bt),
      (l = B[10]),
      (Ne += l * Et),
      (Fe += l * yt),
      (Be += l * Dt),
      (Ce += l * St),
      (Le += l * mt),
      (Se += l * _t),
      (Ae += l * Ut),
      (He += l * $t),
      (Oe += l * It),
      (Ve += l * Mt),
      (Ge += l * xt),
      (et += l * Pt),
      (tt += l * Ot),
      (Je += l * lt),
      (tr += l * jt),
      (lr += l * Bt),
      (l = B[11]),
      (Fe += l * Et),
      (Be += l * yt),
      (Ce += l * Dt),
      (Le += l * St),
      (Se += l * mt),
      (Ae += l * _t),
      (He += l * Ut),
      (Oe += l * $t),
      (Ve += l * It),
      (Ge += l * Mt),
      (et += l * xt),
      (tt += l * Pt),
      (Je += l * Ot),
      (tr += l * lt),
      (lr += l * jt),
      (Yr += l * Bt),
      (l = B[12]),
      (Be += l * Et),
      (Ce += l * yt),
      (Le += l * Dt),
      (Se += l * St),
      (Ae += l * mt),
      (He += l * _t),
      (Oe += l * Ut),
      (Ve += l * $t),
      (Ge += l * It),
      (et += l * Mt),
      (tt += l * xt),
      (Je += l * Pt),
      (tr += l * Ot),
      (lr += l * lt),
      (Yr += l * jt),
      (rr += l * Bt),
      (l = B[13]),
      (Ce += l * Et),
      (Le += l * yt),
      (Se += l * Dt),
      (Ae += l * St),
      (He += l * mt),
      (Oe += l * _t),
      (Ve += l * Ut),
      (Ge += l * $t),
      (et += l * It),
      (tt += l * Mt),
      (Je += l * xt),
      (tr += l * Pt),
      (lr += l * Ot),
      (Yr += l * lt),
      (rr += l * jt),
      (si += l * Bt),
      (l = B[14]),
      (Le += l * Et),
      (Se += l * yt),
      (Ae += l * Dt),
      (He += l * St),
      (Oe += l * mt),
      (Ve += l * _t),
      (Ge += l * Ut),
      (et += l * $t),
      (tt += l * It),
      (Je += l * Mt),
      (tr += l * xt),
      (lr += l * Pt),
      (Yr += l * Ot),
      (rr += l * lt),
      (si += l * jt),
      (mi += l * Bt),
      (l = B[15]),
      (Se += l * Et),
      (Ae += l * yt),
      (He += l * Dt),
      (Oe += l * St),
      (Ve += l * mt),
      (Ge += l * _t),
      (et += l * Ut),
      (tt += l * $t),
      (Je += l * It),
      (tr += l * Mt),
      (lr += l * xt),
      (Yr += l * Pt),
      (rr += l * Ot),
      (si += l * lt),
      (mi += l * jt),
      (Ui += l * Bt),
      (ae += 38 * Ae),
      (fe += 38 * He),
      (Ie += 38 * Oe),
      (ze += 38 * Ve),
      (ke += 38 * Ge),
      ($e += 38 * et),
      (gt += 38 * tt),
      (vt += 38 * Je),
      (je += 38 * tr),
      (xe += 38 * lr),
      (Ne += 38 * Yr),
      (Fe += 38 * rr),
      (Be += 38 * si),
      (Ce += 38 * mi),
      (Le += 38 * Ui),
      (O = 1),
      (l = ae + O + 65535),
      (O = Math.floor(l / 65536)),
      (ae = l - O * 65536),
      (l = fe + O + 65535),
      (O = Math.floor(l / 65536)),
      (fe = l - O * 65536),
      (l = Ie + O + 65535),
      (O = Math.floor(l / 65536)),
      (Ie = l - O * 65536),
      (l = ze + O + 65535),
      (O = Math.floor(l / 65536)),
      (ze = l - O * 65536),
      (l = ke + O + 65535),
      (O = Math.floor(l / 65536)),
      (ke = l - O * 65536),
      (l = $e + O + 65535),
      (O = Math.floor(l / 65536)),
      ($e = l - O * 65536),
      (l = gt + O + 65535),
      (O = Math.floor(l / 65536)),
      (gt = l - O * 65536),
      (l = vt + O + 65535),
      (O = Math.floor(l / 65536)),
      (vt = l - O * 65536),
      (l = je + O + 65535),
      (O = Math.floor(l / 65536)),
      (je = l - O * 65536),
      (l = xe + O + 65535),
      (O = Math.floor(l / 65536)),
      (xe = l - O * 65536),
      (l = Ne + O + 65535),
      (O = Math.floor(l / 65536)),
      (Ne = l - O * 65536),
      (l = Fe + O + 65535),
      (O = Math.floor(l / 65536)),
      (Fe = l - O * 65536),
      (l = Be + O + 65535),
      (O = Math.floor(l / 65536)),
      (Be = l - O * 65536),
      (l = Ce + O + 65535),
      (O = Math.floor(l / 65536)),
      (Ce = l - O * 65536),
      (l = Le + O + 65535),
      (O = Math.floor(l / 65536)),
      (Le = l - O * 65536),
      (l = Se + O + 65535),
      (O = Math.floor(l / 65536)),
      (Se = l - O * 65536),
      (ae += O - 1 + 37 * (O - 1)),
      (O = 1),
      (l = ae + O + 65535),
      (O = Math.floor(l / 65536)),
      (ae = l - O * 65536),
      (l = fe + O + 65535),
      (O = Math.floor(l / 65536)),
      (fe = l - O * 65536),
      (l = Ie + O + 65535),
      (O = Math.floor(l / 65536)),
      (Ie = l - O * 65536),
      (l = ze + O + 65535),
      (O = Math.floor(l / 65536)),
      (ze = l - O * 65536),
      (l = ke + O + 65535),
      (O = Math.floor(l / 65536)),
      (ke = l - O * 65536),
      (l = $e + O + 65535),
      (O = Math.floor(l / 65536)),
      ($e = l - O * 65536),
      (l = gt + O + 65535),
      (O = Math.floor(l / 65536)),
      (gt = l - O * 65536),
      (l = vt + O + 65535),
      (O = Math.floor(l / 65536)),
      (vt = l - O * 65536),
      (l = je + O + 65535),
      (O = Math.floor(l / 65536)),
      (je = l - O * 65536),
      (l = xe + O + 65535),
      (O = Math.floor(l / 65536)),
      (xe = l - O * 65536),
      (l = Ne + O + 65535),
      (O = Math.floor(l / 65536)),
      (Ne = l - O * 65536),
      (l = Fe + O + 65535),
      (O = Math.floor(l / 65536)),
      (Fe = l - O * 65536),
      (l = Be + O + 65535),
      (O = Math.floor(l / 65536)),
      (Be = l - O * 65536),
      (l = Ce + O + 65535),
      (O = Math.floor(l / 65536)),
      (Ce = l - O * 65536),
      (l = Le + O + 65535),
      (O = Math.floor(l / 65536)),
      (Le = l - O * 65536),
      (l = Se + O + 65535),
      (O = Math.floor(l / 65536)),
      (Se = l - O * 65536),
      (ae += O - 1 + 37 * (O - 1)),
      (q[0] = ae),
      (q[1] = fe),
      (q[2] = Ie),
      (q[3] = ze),
      (q[4] = ke),
      (q[5] = $e),
      (q[6] = gt),
      (q[7] = vt),
      (q[8] = je),
      (q[9] = xe),
      (q[10] = Ne),
      (q[11] = Fe),
      (q[12] = Be),
      (q[13] = Ce),
      (q[14] = Le),
      (q[15] = Se);
  }
  function _(q, B) {
    u(q, B, B);
  }
  function W(q, B) {
    const F = o();
    let l;
    for (l = 0; l < 16; l++) F[l] = B[l];
    for (l = 253; l >= 0; l--) _(F, F), l !== 2 && l !== 4 && u(F, F, B);
    for (l = 0; l < 16; l++) q[l] = F[l];
  }
  function G(q, B) {
    const F = o();
    let l;
    for (l = 0; l < 16; l++) F[l] = B[l];
    for (l = 250; l >= 0; l--) _(F, F), l !== 1 && u(F, F, B);
    for (l = 0; l < 16; l++) q[l] = F[l];
  }
  function se(q, B) {
    const F = o(),
      l = o(),
      O = o(),
      ae = o(),
      fe = o(),
      Ie = o(),
      ze = o(),
      ke = o(),
      $e = o();
    m(F, q[1], q[0]),
      m($e, B[1], B[0]),
      u(F, F, $e),
      C(l, q[0], q[1]),
      C($e, B[0], B[1]),
      u(l, l, $e),
      u(O, q[3], B[3]),
      u(O, O, w),
      u(ae, q[2], B[2]),
      C(ae, ae, ae),
      m(fe, l, F),
      m(Ie, ae, O),
      C(ze, ae, O),
      C(ke, l, F),
      u(q[0], fe, Ie),
      u(q[1], ke, ze),
      u(q[2], ze, Ie),
      u(q[3], fe, ke);
  }
  function ce(q, B, F) {
    for (let l = 0; l < 4; l++) z(q[l], B[l], F);
  }
  function de(q, B) {
    const F = o(),
      l = o(),
      O = o();
    W(O, B[2]), u(F, B[0], O), u(l, B[1], O), K(q, l), (q[31] ^= $(F) << 7);
  }
  function b(q, B, F) {
    N(q[0], d), N(q[1], f), N(q[2], f), N(q[3], d);
    for (let l = 255; l >= 0; --l) {
      const O = (F[(l / 8) | 0] >> (l & 7)) & 1;
      ce(q, B, O), se(B, q), se(q, q), ce(q, B, O);
    }
  }
  function x(q, B) {
    const F = [o(), o(), o(), o()];
    N(F[0], D), N(F[1], R), N(F[2], f), u(F[3], D, R), b(q, F, B);
  }
  function ee(q) {
    if (q.length !== i.SEED_LENGTH)
      throw new Error(`ed25519: seed must be ${i.SEED_LENGTH} bytes`);
    const B = (0, r.hash)(q);
    (B[0] &= 248), (B[31] &= 127), (B[31] |= 64);
    const F = new Uint8Array(32),
      l = [o(), o(), o(), o()];
    x(l, B), de(F, l);
    const O = new Uint8Array(64);
    return O.set(q), O.set(F, 32), { publicKey: F, secretKey: O };
  }
  i.generateKeyPairFromSeed = ee;
  function X(q) {
    const B = (0, e.randomBytes)(32, q),
      F = ee(B);
    return (0, s.wipe)(B), F;
  }
  i.generateKeyPair = X;
  function k(q) {
    if (q.length !== i.SECRET_KEY_LENGTH)
      throw new Error(
        `ed25519: secret key must be ${i.SECRET_KEY_LENGTH} bytes`
      );
    return new Uint8Array(q.subarray(32));
  }
  i.extractPublicKeyFromSecretKey = k;
  const V = new Float64Array([
    237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
  ]);
  function J(q, B) {
    let F, l, O, ae;
    for (l = 63; l >= 32; --l) {
      for (F = 0, O = l - 32, ae = l - 12; O < ae; ++O)
        (B[O] += F - 16 * B[l] * V[O - (l - 32)]),
          (F = Math.floor((B[O] + 128) / 256)),
          (B[O] -= F * 256);
      (B[O] += F), (B[l] = 0);
    }
    for (F = 0, O = 0; O < 32; O++)
      (B[O] += F - (B[31] >> 4) * V[O]), (F = B[O] >> 8), (B[O] &= 255);
    for (O = 0; O < 32; O++) B[O] -= F * V[O];
    for (l = 0; l < 32; l++) (B[l + 1] += B[l] >> 8), (q[l] = B[l] & 255);
  }
  function re(q) {
    const B = new Float64Array(64);
    for (let F = 0; F < 64; F++) B[F] = q[F];
    for (let F = 0; F < 64; F++) q[F] = 0;
    J(q, B);
  }
  function me(q, B) {
    const F = new Float64Array(64),
      l = [o(), o(), o(), o()],
      O = (0, r.hash)(q.subarray(0, 32));
    (O[0] &= 248), (O[31] &= 127), (O[31] |= 64);
    const ae = new Uint8Array(64);
    ae.set(O.subarray(32), 32);
    const fe = new r.SHA512();
    fe.update(ae.subarray(32)), fe.update(B);
    const Ie = fe.digest();
    fe.clean(),
      re(Ie),
      x(l, Ie),
      de(ae, l),
      fe.reset(),
      fe.update(ae.subarray(0, 32)),
      fe.update(q.subarray(32)),
      fe.update(B);
    const ze = fe.digest();
    re(ze);
    for (let ke = 0; ke < 32; ke++) F[ke] = Ie[ke];
    for (let ke = 0; ke < 32; ke++)
      for (let $e = 0; $e < 32; $e++) F[ke + $e] += ze[ke] * O[$e];
    return J(ae.subarray(32), F), ae;
  }
  i.sign = me;
  function oe(q, B) {
    const F = o(),
      l = o(),
      O = o(),
      ae = o(),
      fe = o(),
      Ie = o(),
      ze = o();
    return (
      N(q[2], f),
      S(q[1], B),
      _(O, q[1]),
      u(ae, O, g),
      m(O, O, q[2]),
      C(ae, q[2], ae),
      _(fe, ae),
      _(Ie, fe),
      u(ze, Ie, fe),
      u(F, ze, O),
      u(F, F, ae),
      G(F, F),
      u(F, F, O),
      u(F, F, ae),
      u(F, F, ae),
      u(q[0], F, ae),
      _(l, q[0]),
      u(l, l, ae),
      T(l, O) && u(q[0], q[0], U),
      _(l, q[0]),
      u(l, l, ae),
      T(l, O)
        ? -1
        : ($(q[0]) === B[31] >> 7 && m(q[0], d, q[0]), u(q[3], q[0], q[1]), 0)
    );
  }
  function we(q, B, F) {
    const l = new Uint8Array(32),
      O = [o(), o(), o(), o()],
      ae = [o(), o(), o(), o()];
    if (F.length !== i.SIGNATURE_LENGTH)
      throw new Error(`ed25519: signature must be ${i.SIGNATURE_LENGTH} bytes`);
    if (oe(ae, q)) return !1;
    const fe = new r.SHA512();
    fe.update(F.subarray(0, 32)), fe.update(q), fe.update(B);
    const Ie = fe.digest();
    return (
      re(Ie),
      b(O, ae, Ie),
      x(ae, F.subarray(32)),
      se(O, ae),
      de(l, O),
      !ne(F, l)
    );
  }
  i.verify = we;
  function le(q) {
    let B = [o(), o(), o(), o()];
    if (oe(B, q)) throw new Error("Ed25519: invalid public key");
    let F = o(),
      l = o(),
      O = B[1];
    C(F, f, O), m(l, f, O), W(l, l), u(F, F, l);
    let ae = new Uint8Array(32);
    return K(ae, F), ae;
  }
  i.convertPublicKeyToX25519 = le;
  function _e(q) {
    const B = (0, r.hash)(q.subarray(0, 32));
    (B[0] &= 248), (B[31] &= 127), (B[31] |= 64);
    const F = new Uint8Array(B.subarray(0, 32));
    return (0, s.wipe)(B), F;
  }
  i.convertSecretKeyToX25519 = _e;
})(Tu);
const u6 = "EdDSA",
  h6 = "JWT",
  mp = ".",
  wp = "base64url",
  l6 = "utf8",
  f6 = "utf8",
  d6 = ":",
  p6 = "did",
  g6 = "key",
  Uf = "base58btc",
  v6 = "z",
  y6 = "K36",
  _6 = 32;
function Bo(i) {
  return hr(br(ys(i), l6), wp);
}
function Ep(i) {
  const e = br(y6, Uf),
    r = v6 + hr(Qc([e, i]), Uf);
  return [p6, g6, r].join(d6);
}
function b6(i) {
  return hr(i, wp);
}
function m6(i) {
  return br([Bo(i.header), Bo(i.payload)].join(mp), f6);
}
function w6(i) {
  return [Bo(i.header), Bo(i.payload), b6(i.signature)].join(mp);
}
function $f(i = Nn.randomBytes(_6)) {
  return Tu.generateKeyPairFromSeed(i);
}
async function E6(i, e, r, s, o = ye.fromMiliseconds(Date.now())) {
  const c = { alg: u6, typ: h6 },
    d = Ep(s.publicKey),
    f = o + r,
    g = { iss: d, sub: i, aud: e, iat: o, exp: f },
    w = m6({ header: c, payload: g }),
    D = Tu.sign(s.secretKey, w);
  return w6({ header: c, payload: g, signature: D });
}
const D6 = "PARSE_ERROR",
  S6 = "INVALID_REQUEST",
  I6 = "METHOD_NOT_FOUND",
  x6 = "INVALID_PARAMS",
  Dp = "INTERNAL_ERROR",
  Ru = "SERVER_ERROR",
  O6 = [-32700, -32600, -32601, -32602, -32603],
  ps = {
    [D6]: { code: -32700, message: "Parse error" },
    [S6]: { code: -32600, message: "Invalid Request" },
    [I6]: { code: -32601, message: "Method not found" },
    [x6]: { code: -32602, message: "Invalid params" },
    [Dp]: { code: -32603, message: "Internal error" },
    [Ru]: { code: -32e3, message: "Server error" },
  },
  Sp = Ru;
function C6(i) {
  return O6.includes(i);
}
function Mf(i) {
  return Object.keys(ps).includes(i) ? ps[i] : ps[Sp];
}
function A6(i) {
  const e = Object.values(ps).find((r) => r.code === i);
  return e || ps[Sp];
}
function Ip(i, e, r) {
  return i.message.includes("getaddrinfo ENOTFOUND") ||
    i.message.includes("connect ECONNREFUSED")
    ? new Error(`Unavailable ${r} RPC url at ${e}`)
    : i;
}
var xp = {},
  yi = {},
  jf;
function P6() {
  if (jf) return yi;
  (jf = 1),
    Object.defineProperty(yi, "__esModule", { value: !0 }),
    (yi.isBrowserCryptoAvailable =
      yi.getSubtleCrypto =
      yi.getBrowerCrypto =
        void 0);
  function i() {
    return (
      (_r === null || _r === void 0 ? void 0 : _r.crypto) ||
      (_r === null || _r === void 0 ? void 0 : _r.msCrypto) ||
      {}
    );
  }
  yi.getBrowerCrypto = i;
  function e() {
    const s = i();
    return s.subtle || s.webkitSubtle;
  }
  yi.getSubtleCrypto = e;
  function r() {
    return !!i() && !!e();
  }
  return (yi.isBrowserCryptoAvailable = r), yi;
}
var _i = {},
  Bf;
function T6() {
  if (Bf) return _i;
  (Bf = 1),
    Object.defineProperty(_i, "__esModule", { value: !0 }),
    (_i.isBrowser = _i.isNode = _i.isReactNative = void 0);
  function i() {
    return (
      typeof document > "u" &&
      typeof navigator < "u" &&
      navigator.product === "ReactNative"
    );
  }
  _i.isReactNative = i;
  function e() {
    return (
      typeof process < "u" &&
      typeof process.versions < "u" &&
      typeof process.versions.node < "u"
    );
  }
  _i.isNode = e;
  function r() {
    return !i() && !e();
  }
  return (_i.isBrowser = r), _i;
}
(function (i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  const e = Br;
  e.__exportStar(P6(), i), e.__exportStar(T6(), i);
})(xp);
function Op(i = 3) {
  const e = Date.now() * Math.pow(10, i),
    r = Math.floor(Math.random() * Math.pow(10, i));
  return e + r;
}
function Nu(i = 6) {
  return BigInt(Op(i));
}
function Jo(i, e, r) {
  return { id: r || Op(), jsonrpc: "2.0", method: i, params: e };
}
function Fu(i, e) {
  return { id: i, jsonrpc: "2.0", result: e };
}
function Xo(i, e, r) {
  return { id: i, jsonrpc: "2.0", error: R6(e, r) };
}
function R6(i, e) {
  return typeof i > "u"
    ? Mf(Dp)
    : (typeof i == "string" &&
        (i = Object.assign(Object.assign({}, Mf(Ru)), { message: i })),
      typeof e < "u" && (i.data = e),
      C6(i.code) && (i = A6(i.code)),
      i);
}
class N6 {}
class F6 extends N6 {
  constructor() {
    super();
  }
}
class L6 extends F6 {
  constructor(e) {
    super();
  }
}
const U6 = "^https?:",
  $6 = "^wss?:";
function M6(i) {
  const e = i.match(new RegExp(/^\w+:/, "gi"));
  if (!(!e || !e.length)) return e[0];
}
function Cp(i, e) {
  const r = M6(i);
  return typeof r > "u" ? !1 : new RegExp(e).test(r);
}
function qf(i) {
  return Cp(i, U6);
}
function zf(i) {
  return Cp(i, $6);
}
function j6(i) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(i);
}
function Ap(i) {
  return (
    typeof i == "object" && "id" in i && "jsonrpc" in i && i.jsonrpc === "2.0"
  );
}
function Lu(i) {
  return Ap(i) && "method" in i;
}
function Qo(i) {
  return Ap(i) && (bi(i) || Gr(i));
}
function bi(i) {
  return "result" in i;
}
function Gr(i) {
  return "error" in i;
}
class Fi extends L6 {
  constructor(e) {
    super(e),
      (this.events = new xr.EventEmitter()),
      (this.hasRegisteredEventListeners = !1),
      (this.connection = this.setConnection(e)),
      this.connection.connected && this.registerEventListeners();
  }
  async connect(e = this.connection) {
    await this.open(e);
  }
  async disconnect() {
    await this.close();
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  async request(e, r) {
    return this.requestStrict(
      Jo(e.method, e.params || [], e.id || Nu().toString()),
      r
    );
  }
  async requestStrict(e, r) {
    return new Promise(async (s, o) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (c) {
          o(c);
        }
      this.events.on(`${e.id}`, (c) => {
        Gr(c) ? o(c.error) : s(c.result);
      });
      try {
        await this.connection.send(e, r);
      } catch (c) {
        o(c);
      }
    });
  }
  setConnection(e = this.connection) {
    return e;
  }
  onPayload(e) {
    this.events.emit("payload", e),
      Qo(e)
        ? this.events.emit(`${e.id}`, e)
        : this.events.emit("message", { type: e.method, data: e.params });
  }
  onClose(e) {
    e &&
      e.code === 3e3 &&
      this.events.emit(
        "error",
        new Error(
          `WebSocket connection closed abnormally with code: ${e.code} ${
            e.reason ? `(${e.reason})` : ""
          }`
        )
      ),
      this.events.emit("disconnect");
  }
  async open(e = this.connection) {
    (this.connection === e && this.connection.connected) ||
      (this.connection.connected && this.close(),
      typeof e == "string" &&
        (await this.connection.open(e), (e = this.connection)),
      (this.connection = this.setConnection(e)),
      await this.connection.open(),
      this.registerEventListeners(),
      this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners ||
      (this.connection.on("payload", (e) => this.onPayload(e)),
      this.connection.on("close", (e) => this.onClose(e)),
      this.connection.on("error", (e) => this.events.emit("error", e)),
      this.connection.on("register_error", (e) => this.onClose()),
      (this.hasRegisteredEventListeners = !0));
  }
}
var Uc, Hf;
function B6() {
  return (
    Hf ||
      ((Hf = 1),
      (Uc = function () {
        throw new Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object"
        );
      })),
    Uc
  );
}
const q6 = () =>
    typeof global < "u" && typeof global.WebSocket < "u"
      ? global.WebSocket
      : typeof window < "u" && typeof window.WebSocket < "u"
      ? window.WebSocket
      : B6(),
  z6 = () => typeof window < "u",
  Kf = (i) => i.split("?")[0],
  kf = 10,
  H6 = q6();
class K6 {
  constructor(e) {
    if (
      ((this.url = e),
      (this.events = new xr.EventEmitter()),
      (this.registering = !1),
      !zf(e))
    )
      throw new Error(
        `Provided URL is not compatible with WebSocket connection: ${e}`
      );
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    return new Promise((e, r) => {
      if (typeof this.socket > "u") {
        r(new Error("Connection already closed"));
        return;
      }
      (this.socket.onclose = (s) => {
        this.onClose(s), e();
      }),
        this.socket.close();
    });
  }
  async send(e, r) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(ys(e));
    } catch (s) {
      this.onError(e.id, s);
    }
  }
  register(e = this.url) {
    if (!zf(e))
      throw new Error(
        `Provided URL is not compatible with WebSocket connection: ${e}`
      );
    if (this.registering) {
      const r = this.events.getMaxListeners();
      return (
        (this.events.listenerCount("register_error") >= r ||
          this.events.listenerCount("open") >= r) &&
          this.events.setMaxListeners(r + 1),
        new Promise((s, o) => {
          this.events.once("register_error", (c) => {
            this.resetMaxListeners(), o(c);
          }),
            this.events.once("open", () => {
              if ((this.resetMaxListeners(), typeof this.socket > "u"))
                return o(
                  new Error("WebSocket connection is missing or invalid")
                );
              s(this.socket);
            });
        })
      );
    }
    return (
      (this.url = e),
      (this.registering = !0),
      new Promise((r, s) => {
        const o = xp.isReactNative() ? void 0 : { rejectUnauthorized: !j6(e) },
          c = new H6(e, [], o);
        z6()
          ? (c.onerror = (d) => {
              const f = d;
              s(this.emitError(f.error));
            })
          : c.on("error", (d) => {
              s(this.emitError(d));
            }),
          (c.onopen = () => {
            this.onOpen(c), r(c);
          });
      })
    );
  }
  onOpen(e) {
    (e.onmessage = (r) => this.onPayload(r)),
      (e.onclose = (r) => this.onClose(r)),
      (this.socket = e),
      (this.registering = !1),
      this.events.emit("open");
  }
  onClose(e) {
    (this.socket = void 0),
      (this.registering = !1),
      this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const r = typeof e.data == "string" ? Pu(e.data) : e.data;
    this.events.emit("payload", r);
  }
  onError(e, r) {
    const s = this.parseError(r),
      o = s.message || s.toString(),
      c = Xo(e, o);
    this.events.emit("payload", c);
  }
  parseError(e, r = this.url) {
    return Ip(e, Kf(r), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > kf && this.events.setMaxListeners(kf);
  }
  emitError(e) {
    const r = this.parseError(
      new Error(
        (e == null ? void 0 : e.message) ||
          `WebSocket connection failed for host: ${Kf(this.url)}`
      )
    );
    return this.events.emit("register_error", r), r;
  }
}
var qo = { exports: {} };
qo.exports;
(function (i, e) {
  var r = 200,
    s = "__lodash_hash_undefined__",
    o = 1,
    c = 2,
    d = 9007199254740991,
    f = "[object Arguments]",
    g = "[object Array]",
    w = "[object AsyncFunction]",
    D = "[object Boolean]",
    R = "[object Date]",
    U = "[object Error]",
    N = "[object Function]",
    P = "[object GeneratorFunction]",
    z = "[object Map]",
    K = "[object Number]",
    ne = "[object Null]",
    T = "[object Object]",
    $ = "[object Promise]",
    S = "[object Proxy]",
    C = "[object RegExp]",
    m = "[object Set]",
    u = "[object String]",
    _ = "[object Symbol]",
    W = "[object Undefined]",
    G = "[object WeakMap]",
    se = "[object ArrayBuffer]",
    ce = "[object DataView]",
    de = "[object Float32Array]",
    b = "[object Float64Array]",
    x = "[object Int8Array]",
    ee = "[object Int16Array]",
    X = "[object Int32Array]",
    k = "[object Uint8Array]",
    V = "[object Uint8ClampedArray]",
    J = "[object Uint16Array]",
    re = "[object Uint32Array]",
    me = /[\\^$.*+?()[\]{}|]/g,
    oe = /^\[object .+?Constructor\]$/,
    we = /^(?:0|[1-9]\d*)$/,
    le = {};
  (le[de] =
    le[b] =
    le[x] =
    le[ee] =
    le[X] =
    le[k] =
    le[V] =
    le[J] =
    le[re] =
      !0),
    (le[f] =
      le[g] =
      le[se] =
      le[D] =
      le[ce] =
      le[R] =
      le[U] =
      le[N] =
      le[z] =
      le[K] =
      le[T] =
      le[C] =
      le[m] =
      le[u] =
      le[G] =
        !1);
  var _e = typeof _r == "object" && _r && _r.Object === Object && _r,
    q = typeof self == "object" && self && self.Object === Object && self,
    B = _e || q || Function("return this")(),
    F = e && !e.nodeType && e,
    l = F && !0 && i && !i.nodeType && i,
    O = l && l.exports === F,
    ae = O && _e.process,
    fe = (function () {
      try {
        return ae && ae.binding && ae.binding("util");
      } catch {}
    })(),
    Ie = fe && fe.isTypedArray;
  function ze(E, L) {
    for (
      var te = -1, pe = E == null ? 0 : E.length, ct = 0, Te = [];
      ++te < pe;

    ) {
      var dt = E[te];
      L(dt, te, E) && (Te[ct++] = dt);
    }
    return Te;
  }
  function ke(E, L) {
    for (var te = -1, pe = L.length, ct = E.length; ++te < pe; )
      E[ct + te] = L[te];
    return E;
  }
  function $e(E, L) {
    for (var te = -1, pe = E == null ? 0 : E.length; ++te < pe; )
      if (L(E[te], te, E)) return !0;
    return !1;
  }
  function gt(E, L) {
    for (var te = -1, pe = Array(E); ++te < E; ) pe[te] = L(te);
    return pe;
  }
  function vt(E) {
    return function (L) {
      return E(L);
    };
  }
  function je(E, L) {
    return E.has(L);
  }
  function xe(E, L) {
    return E == null ? void 0 : E[L];
  }
  function Ne(E) {
    var L = -1,
      te = Array(E.size);
    return (
      E.forEach(function (pe, ct) {
        te[++L] = [ct, pe];
      }),
      te
    );
  }
  function Fe(E, L) {
    return function (te) {
      return E(L(te));
    };
  }
  function Be(E) {
    var L = -1,
      te = Array(E.size);
    return (
      E.forEach(function (pe) {
        te[++L] = pe;
      }),
      te
    );
  }
  var Ce = Array.prototype,
    Le = Function.prototype,
    Se = Object.prototype,
    Ae = B["__core-js_shared__"],
    He = Le.toString,
    Oe = Se.hasOwnProperty,
    Ve = (function () {
      var E = /[^.]+$/.exec((Ae && Ae.keys && Ae.keys.IE_PROTO) || "");
      return E ? "Symbol(src)_1." + E : "";
    })(),
    Ge = Se.toString,
    et = RegExp(
      "^" +
        He.call(Oe)
          .replace(me, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    tt = O ? B.Buffer : void 0,
    Je = B.Symbol,
    tr = B.Uint8Array,
    lr = Se.propertyIsEnumerable,
    Yr = Ce.splice,
    rr = Je ? Je.toStringTag : void 0,
    si = Object.getOwnPropertySymbols,
    mi = tt ? tt.isBuffer : void 0,
    Ui = Fe(Object.keys, Object),
    Et = mr(B, "DataView"),
    yt = mr(B, "Map"),
    Dt = mr(B, "Promise"),
    St = mr(B, "Set"),
    mt = mr(B, "WeakMap"),
    _t = mr(Object, "create"),
    Ut = ai(Et),
    $t = ai(yt),
    It = ai(Dt),
    Mt = ai(St),
    xt = ai(mt),
    Pt = Je ? Je.prototype : void 0,
    Ot = Pt ? Pt.valueOf : void 0;
  function lt(E) {
    var L = -1,
      te = E == null ? 0 : E.length;
    for (this.clear(); ++L < te; ) {
      var pe = E[L];
      this.set(pe[0], pe[1]);
    }
  }
  function jt() {
    (this.__data__ = _t ? _t(null) : {}), (this.size = 0);
  }
  function Bt(E) {
    var L = this.has(E) && delete this.__data__[E];
    return (this.size -= L ? 1 : 0), L;
  }
  function ta(E) {
    var L = this.__data__;
    if (_t) {
      var te = L[E];
      return te === s ? void 0 : te;
    }
    return Oe.call(L, E) ? L[E] : void 0;
  }
  function ra(E) {
    var L = this.__data__;
    return _t ? L[E] !== void 0 : Oe.call(L, E);
  }
  function ia(E, L) {
    var te = this.__data__;
    return (
      (this.size += this.has(E) ? 0 : 1),
      (te[E] = _t && L === void 0 ? s : L),
      this
    );
  }
  (lt.prototype.clear = jt),
    (lt.prototype.delete = Bt),
    (lt.prototype.get = ta),
    (lt.prototype.has = ra),
    (lt.prototype.set = ia);
  function Cr(E) {
    var L = -1,
      te = E == null ? 0 : E.length;
    for (this.clear(); ++L < te; ) {
      var pe = E[L];
      this.set(pe[0], pe[1]);
    }
  }
  function na() {
    (this.__data__ = []), (this.size = 0);
  }
  function sa(E) {
    var L = this.__data__,
      te = $i(L, E);
    if (te < 0) return !1;
    var pe = L.length - 1;
    return te == pe ? L.pop() : Yr.call(L, te, 1), --this.size, !0;
  }
  function oa(E) {
    var L = this.__data__,
      te = $i(L, E);
    return te < 0 ? void 0 : L[te][1];
  }
  function aa(E) {
    return $i(this.__data__, E) > -1;
  }
  function ca(E, L) {
    var te = this.__data__,
      pe = $i(te, E);
    return pe < 0 ? (++this.size, te.push([E, L])) : (te[pe][1] = L), this;
  }
  (Cr.prototype.clear = na),
    (Cr.prototype.delete = sa),
    (Cr.prototype.get = oa),
    (Cr.prototype.has = aa),
    (Cr.prototype.set = ca);
  function oi(E) {
    var L = -1,
      te = E == null ? 0 : E.length;
    for (this.clear(); ++L < te; ) {
      var pe = E[L];
      this.set(pe[0], pe[1]);
    }
  }
  function an() {
    (this.size = 0),
      (this.__data__ = {
        hash: new lt(),
        map: new (yt || Cr)(),
        string: new lt(),
      });
  }
  function ua(E) {
    var L = wi(this, E).delete(E);
    return (this.size -= L ? 1 : 0), L;
  }
  function cn(E) {
    return wi(this, E).get(E);
  }
  function ha(E) {
    return wi(this, E).has(E);
  }
  function la(E, L) {
    var te = wi(this, E),
      pe = te.size;
    return te.set(E, L), (this.size += te.size == pe ? 0 : 1), this;
  }
  (oi.prototype.clear = an),
    (oi.prototype.delete = ua),
    (oi.prototype.get = cn),
    (oi.prototype.has = ha),
    (oi.prototype.set = la);
  function un(E) {
    var L = -1,
      te = E == null ? 0 : E.length;
    for (this.__data__ = new oi(); ++L < te; ) this.add(E[L]);
  }
  function Ds(E) {
    return this.__data__.set(E, s), this;
  }
  function Ss(E) {
    return this.__data__.has(E);
  }
  (un.prototype.add = un.prototype.push = Ds), (un.prototype.has = Ss);
  function qr(E) {
    var L = (this.__data__ = new Cr(E));
    this.size = L.size;
  }
  function fa() {
    (this.__data__ = new Cr()), (this.size = 0);
  }
  function da(E) {
    var L = this.__data__,
      te = L.delete(E);
    return (this.size = L.size), te;
  }
  function pa(E) {
    return this.__data__.get(E);
  }
  function ga(E) {
    return this.__data__.has(E);
  }
  function Is(E, L) {
    var te = this.__data__;
    if (te instanceof Cr) {
      var pe = te.__data__;
      if (!yt || pe.length < r - 1)
        return pe.push([E, L]), (this.size = ++te.size), this;
      te = this.__data__ = new oi(pe);
    }
    return te.set(E, L), (this.size = te.size), this;
  }
  (qr.prototype.clear = fa),
    (qr.prototype.delete = da),
    (qr.prototype.get = pa),
    (qr.prototype.has = ga),
    (qr.prototype.set = Is);
  function xs(E, L) {
    var te = fn(E),
      pe = !te && Ms(E),
      ct = !te && !pe && jn(E),
      Te = !te && !pe && !ct && qs(E),
      dt = te || pe || ct || Te,
      qt = dt ? gt(E.length, String) : [],
      Xe = qt.length;
    for (var ut in E)
      (L || Oe.call(E, ut)) &&
        !(
          dt &&
          (ut == "length" ||
            (ct && (ut == "offset" || ut == "parent")) ||
            (Te &&
              (ut == "buffer" || ut == "byteLength" || ut == "byteOffset")) ||
            Ns(ut, Xe))
        ) &&
        qt.push(ut);
    return qt;
  }
  function $i(E, L) {
    for (var te = E.length; te--; ) if ($s(E[te][0], L)) return te;
    return -1;
  }
  function $n(E, L, te) {
    var pe = L(E);
    return fn(E) ? pe : ke(pe, te(E));
  }
  function Mi(E) {
    return E == null
      ? E === void 0
        ? W
        : ne
      : rr && rr in Object(E)
      ? Ts(E)
      : _a(E);
  }
  function Mn(E) {
    return Bi(E) && Mi(E) == f;
  }
  function ji(E, L, te, pe, ct) {
    return E === L
      ? !0
      : E == null || L == null || (!Bi(E) && !Bi(L))
      ? E !== E && L !== L
      : Os(E, L, te, pe, ji, ct);
  }
  function Os(E, L, te, pe, ct, Te) {
    var dt = fn(E),
      qt = fn(L),
      Xe = dt ? g : Jr(E),
      ut = qt ? g : Jr(L);
    (Xe = Xe == f ? T : Xe), (ut = ut == f ? T : ut);
    var Tt = Xe == T,
      fr = ut == T,
      zt = Xe == ut;
    if (zt && jn(E)) {
      if (!jn(L)) return !1;
      (dt = !0), (Tt = !1);
    }
    if (zt && !Tt)
      return (
        Te || (Te = new qr()),
        dt || qs(E) ? hn(E, L, te, pe, ct, Te) : ya(E, L, Xe, te, pe, ct, Te)
      );
    if (!(te & o)) {
      var pt = Tt && Oe.call(E, "__wrapped__"),
        ir = fr && Oe.call(L, "__wrapped__");
      if (pt || ir) {
        var zr = pt ? E.value() : E,
          Ar = ir ? L.value() : L;
        return Te || (Te = new qr()), ct(zr, Ar, te, pe, Te);
      }
    }
    return zt ? (Te || (Te = new qr()), Ps(E, L, te, pe, ct, Te)) : !1;
  }
  function va(E) {
    if (!Bs(E) || Ls(E)) return !1;
    var L = dn(E) ? et : oe;
    return L.test(ai(E));
  }
  function Cs(E) {
    return Bi(E) && js(E.length) && !!le[Mi(E)];
  }
  function As(E) {
    if (!Us(E)) return Ui(E);
    var L = [];
    for (var te in Object(E))
      Oe.call(E, te) && te != "constructor" && L.push(te);
    return L;
  }
  function hn(E, L, te, pe, ct, Te) {
    var dt = te & o,
      qt = E.length,
      Xe = L.length;
    if (qt != Xe && !(dt && Xe > qt)) return !1;
    var ut = Te.get(E);
    if (ut && Te.get(L)) return ut == L;
    var Tt = -1,
      fr = !0,
      zt = te & c ? new un() : void 0;
    for (Te.set(E, L), Te.set(L, E); ++Tt < qt; ) {
      var pt = E[Tt],
        ir = L[Tt];
      if (pe) var zr = dt ? pe(ir, pt, Tt, L, E, Te) : pe(pt, ir, Tt, E, L, Te);
      if (zr !== void 0) {
        if (zr) continue;
        fr = !1;
        break;
      }
      if (zt) {
        if (
          !$e(L, function (Ar, Xr) {
            if (!je(zt, Xr) && (pt === Ar || ct(pt, Ar, te, pe, Te)))
              return zt.push(Xr);
          })
        ) {
          fr = !1;
          break;
        }
      } else if (!(pt === ir || ct(pt, ir, te, pe, Te))) {
        fr = !1;
        break;
      }
    }
    return Te.delete(E), Te.delete(L), fr;
  }
  function ya(E, L, te, pe, ct, Te, dt) {
    switch (te) {
      case ce:
        if (E.byteLength != L.byteLength || E.byteOffset != L.byteOffset)
          return !1;
        (E = E.buffer), (L = L.buffer);
      case se:
        return !(E.byteLength != L.byteLength || !Te(new tr(E), new tr(L)));
      case D:
      case R:
      case K:
        return $s(+E, +L);
      case U:
        return E.name == L.name && E.message == L.message;
      case C:
      case u:
        return E == L + "";
      case z:
        var qt = Ne;
      case m:
        var Xe = pe & o;
        if ((qt || (qt = Be), E.size != L.size && !Xe)) return !1;
        var ut = dt.get(E);
        if (ut) return ut == L;
        (pe |= c), dt.set(E, L);
        var Tt = hn(qt(E), qt(L), pe, ct, Te, dt);
        return dt.delete(E), Tt;
      case _:
        if (Ot) return Ot.call(E) == Ot.call(L);
    }
    return !1;
  }
  function Ps(E, L, te, pe, ct, Te) {
    var dt = te & o,
      qt = ln(E),
      Xe = qt.length,
      ut = ln(L),
      Tt = ut.length;
    if (Xe != Tt && !dt) return !1;
    for (var fr = Xe; fr--; ) {
      var zt = qt[fr];
      if (!(dt ? zt in L : Oe.call(L, zt))) return !1;
    }
    var pt = Te.get(E);
    if (pt && Te.get(L)) return pt == L;
    var ir = !0;
    Te.set(E, L), Te.set(L, E);
    for (var zr = dt; ++fr < Xe; ) {
      zt = qt[fr];
      var Ar = E[zt],
        Xr = L[zt];
      if (pe) var Bn = dt ? pe(Xr, Ar, zt, L, E, Te) : pe(Ar, Xr, zt, E, L, Te);
      if (!(Bn === void 0 ? Ar === Xr || ct(Ar, Xr, te, pe, Te) : Bn)) {
        ir = !1;
        break;
      }
      zr || (zr = zt == "constructor");
    }
    if (ir && !zr) {
      var qi = E.constructor,
        Vt = L.constructor;
      qi != Vt &&
        "constructor" in E &&
        "constructor" in L &&
        !(
          typeof qi == "function" &&
          qi instanceof qi &&
          typeof Vt == "function" &&
          Vt instanceof Vt
        ) &&
        (ir = !1);
    }
    return Te.delete(E), Te.delete(L), ir;
  }
  function ln(E) {
    return $n(E, wa, Rs);
  }
  function wi(E, L) {
    var te = E.__data__;
    return Fs(L) ? te[typeof L == "string" ? "string" : "hash"] : te.map;
  }
  function mr(E, L) {
    var te = xe(E, L);
    return va(te) ? te : void 0;
  }
  function Ts(E) {
    var L = Oe.call(E, rr),
      te = E[rr];
    try {
      E[rr] = void 0;
      var pe = !0;
    } catch {}
    var ct = Ge.call(E);
    return pe && (L ? (E[rr] = te) : delete E[rr]), ct;
  }
  var Rs = si
      ? function (E) {
          return E == null
            ? []
            : ((E = Object(E)),
              ze(si(E), function (L) {
                return lr.call(E, L);
              }));
        }
      : at,
    Jr = Mi;
  ((Et && Jr(new Et(new ArrayBuffer(1))) != ce) ||
    (yt && Jr(new yt()) != z) ||
    (Dt && Jr(Dt.resolve()) != $) ||
    (St && Jr(new St()) != m) ||
    (mt && Jr(new mt()) != G)) &&
    (Jr = function (E) {
      var L = Mi(E),
        te = L == T ? E.constructor : void 0,
        pe = te ? ai(te) : "";
      if (pe)
        switch (pe) {
          case Ut:
            return ce;
          case $t:
            return z;
          case It:
            return $;
          case Mt:
            return m;
          case xt:
            return G;
        }
      return L;
    });
  function Ns(E, L) {
    return (
      (L = L ?? d),
      !!L &&
        (typeof E == "number" || we.test(E)) &&
        E > -1 &&
        E % 1 == 0 &&
        E < L
    );
  }
  function Fs(E) {
    var L = typeof E;
    return L == "string" || L == "number" || L == "symbol" || L == "boolean"
      ? E !== "__proto__"
      : E === null;
  }
  function Ls(E) {
    return !!Ve && Ve in E;
  }
  function Us(E) {
    var L = E && E.constructor,
      te = (typeof L == "function" && L.prototype) || Se;
    return E === te;
  }
  function _a(E) {
    return Ge.call(E);
  }
  function ai(E) {
    if (E != null) {
      try {
        return He.call(E);
      } catch {}
      try {
        return E + "";
      } catch {}
    }
    return "";
  }
  function $s(E, L) {
    return E === L || (E !== E && L !== L);
  }
  var Ms = Mn(
      (function () {
        return arguments;
      })()
    )
      ? Mn
      : function (E) {
          return Bi(E) && Oe.call(E, "callee") && !lr.call(E, "callee");
        },
    fn = Array.isArray;
  function ba(E) {
    return E != null && js(E.length) && !dn(E);
  }
  var jn = mi || st;
  function ma(E, L) {
    return ji(E, L);
  }
  function dn(E) {
    if (!Bs(E)) return !1;
    var L = Mi(E);
    return L == N || L == P || L == w || L == S;
  }
  function js(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= d;
  }
  function Bs(E) {
    var L = typeof E;
    return E != null && (L == "object" || L == "function");
  }
  function Bi(E) {
    return E != null && typeof E == "object";
  }
  var qs = Ie ? vt(Ie) : Cs;
  function wa(E) {
    return ba(E) ? xs(E) : As(E);
  }
  function at() {
    return [];
  }
  function st() {
    return !1;
  }
  i.exports = ma;
})(qo, qo.exports);
var k6 = qo.exports;
const V6 = gu(k6);
function W6(i, e) {
  if (i.length >= 255) throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), s = 0; s < r.length; s++) r[s] = 255;
  for (var o = 0; o < i.length; o++) {
    var c = i.charAt(o),
      d = c.charCodeAt(0);
    if (r[d] !== 255) throw new TypeError(c + " is ambiguous");
    r[d] = o;
  }
  var f = i.length,
    g = i.charAt(0),
    w = Math.log(f) / Math.log(256),
    D = Math.log(256) / Math.log(f);
  function R(P) {
    if (
      (P instanceof Uint8Array ||
        (ArrayBuffer.isView(P)
          ? (P = new Uint8Array(P.buffer, P.byteOffset, P.byteLength))
          : Array.isArray(P) && (P = Uint8Array.from(P))),
      !(P instanceof Uint8Array))
    )
      throw new TypeError("Expected Uint8Array");
    if (P.length === 0) return "";
    for (var z = 0, K = 0, ne = 0, T = P.length; ne !== T && P[ne] === 0; )
      ne++, z++;
    for (var $ = ((T - ne) * D + 1) >>> 0, S = new Uint8Array($); ne !== T; ) {
      for (
        var C = P[ne], m = 0, u = $ - 1;
        (C !== 0 || m < K) && u !== -1;
        u--, m++
      )
        (C += (256 * S[u]) >>> 0), (S[u] = C % f >>> 0), (C = (C / f) >>> 0);
      if (C !== 0) throw new Error("Non-zero carry");
      (K = m), ne++;
    }
    for (var _ = $ - K; _ !== $ && S[_] === 0; ) _++;
    for (var W = g.repeat(z); _ < $; ++_) W += i.charAt(S[_]);
    return W;
  }
  function U(P) {
    if (typeof P != "string") throw new TypeError("Expected String");
    if (P.length === 0) return new Uint8Array();
    var z = 0;
    if (P[z] !== " ") {
      for (var K = 0, ne = 0; P[z] === g; ) K++, z++;
      for (
        var T = ((P.length - z) * w + 1) >>> 0, $ = new Uint8Array(T);
        P[z];

      ) {
        var S = r[P.charCodeAt(z)];
        if (S === 255) return;
        for (var C = 0, m = T - 1; (S !== 0 || C < ne) && m !== -1; m--, C++)
          (S += (f * $[m]) >>> 0),
            ($[m] = S % 256 >>> 0),
            (S = (S / 256) >>> 0);
        if (S !== 0) throw new Error("Non-zero carry");
        (ne = C), z++;
      }
      if (P[z] !== " ") {
        for (var u = T - ne; u !== T && $[u] === 0; ) u++;
        for (var _ = new Uint8Array(K + (T - u)), W = K; u !== T; )
          _[W++] = $[u++];
        return _;
      }
    }
  }
  function N(P) {
    var z = U(P);
    if (z) return z;
    throw new Error(`Non-${e} character`);
  }
  return { encode: R, decodeUnsafe: U, decode: N };
}
var G6 = W6,
  Y6 = G6;
const Pp = (i) => {
    if (i instanceof Uint8Array && i.constructor.name === "Uint8Array")
      return i;
    if (i instanceof ArrayBuffer) return new Uint8Array(i);
    if (ArrayBuffer.isView(i))
      return new Uint8Array(i.buffer, i.byteOffset, i.byteLength);
    throw new Error("Unknown type, must be binary type");
  },
  J6 = (i) => new TextEncoder().encode(i),
  X6 = (i) => new TextDecoder().decode(i);
class Q6 {
  constructor(e, r, s) {
    (this.name = e), (this.prefix = r), (this.baseEncode = s);
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class Z6 {
  constructor(e, r, s) {
    if (((this.name = e), (this.prefix = r), r.codePointAt(0) === void 0))
      throw new Error("Invalid prefix character");
    (this.prefixCodePoint = r.codePointAt(0)), (this.baseDecode = s);
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(
          `Unable to decode multibase string ${JSON.stringify(e)}, ${
            this.name
          } decoder only supports inputs prefixed with ${this.prefix}`
        );
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Tp(this, e);
  }
}
class eD {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Tp(this, e);
  }
  decode(e) {
    const r = e[0],
      s = this.decoders[r];
    if (s) return s.decode(e);
    throw RangeError(
      `Unable to decode multibase string ${JSON.stringify(
        e
      )}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
    );
  }
}
const Tp = (i, e) =>
  new eD({
    ...(i.decoders || { [i.prefix]: i }),
    ...(e.decoders || { [e.prefix]: e }),
  });
class tD {
  constructor(e, r, s, o) {
    (this.name = e),
      (this.prefix = r),
      (this.baseEncode = s),
      (this.baseDecode = o),
      (this.encoder = new Q6(e, r, s)),
      (this.decoder = new Z6(e, r, o));
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Zo = ({ name: i, prefix: e, encode: r, decode: s }) => new tD(i, e, r, s),
  Es = ({ prefix: i, name: e, alphabet: r }) => {
    const { encode: s, decode: o } = Y6(r, e);
    return Zo({ prefix: i, name: e, encode: s, decode: (c) => Pp(o(c)) });
  },
  rD = (i, e, r, s) => {
    const o = {};
    for (let D = 0; D < e.length; ++D) o[e[D]] = D;
    let c = i.length;
    for (; i[c - 1] === "="; ) --c;
    const d = new Uint8Array(((c * r) / 8) | 0);
    let f = 0,
      g = 0,
      w = 0;
    for (let D = 0; D < c; ++D) {
      const R = o[i[D]];
      if (R === void 0) throw new SyntaxError(`Non-${s} character`);
      (g = (g << r) | R),
        (f += r),
        f >= 8 && ((f -= 8), (d[w++] = 255 & (g >> f)));
    }
    if (f >= r || 255 & (g << (8 - f)))
      throw new SyntaxError("Unexpected end of data");
    return d;
  },
  iD = (i, e, r) => {
    const s = e[e.length - 1] === "=",
      o = (1 << r) - 1;
    let c = "",
      d = 0,
      f = 0;
    for (let g = 0; g < i.length; ++g)
      for (f = (f << 8) | i[g], d += 8; d > r; )
        (d -= r), (c += e[o & (f >> d)]);
    if ((d && (c += e[o & (f << (r - d))]), s))
      for (; (c.length * r) & 7; ) c += "=";
    return c;
  },
  Xt = ({ name: i, prefix: e, bitsPerChar: r, alphabet: s }) =>
    Zo({
      prefix: e,
      name: i,
      encode(o) {
        return iD(o, s, r);
      },
      decode(o) {
        return rD(o, s, r, i);
      },
    }),
  nD = Zo({
    prefix: "\0",
    name: "identity",
    encode: (i) => X6(i),
    decode: (i) => J6(i),
  });
var sD = Object.freeze({ __proto__: null, identity: nD });
const oD = Xt({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var aD = Object.freeze({ __proto__: null, base2: oD });
const cD = Xt({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3,
});
var uD = Object.freeze({ __proto__: null, base8: cD });
const hD = Es({ prefix: "9", name: "base10", alphabet: "0123456789" });
var lD = Object.freeze({ __proto__: null, base10: hD });
const fD = Xt({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4,
  }),
  dD = Xt({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4,
  });
var pD = Object.freeze({ __proto__: null, base16: fD, base16upper: dD });
const gD = Xt({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5,
  }),
  vD = Xt({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5,
  }),
  yD = Xt({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5,
  }),
  _D = Xt({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5,
  }),
  bD = Xt({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5,
  }),
  mD = Xt({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5,
  }),
  wD = Xt({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5,
  }),
  ED = Xt({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5,
  }),
  DD = Xt({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5,
  });
var SD = Object.freeze({
  __proto__: null,
  base32: gD,
  base32upper: vD,
  base32pad: yD,
  base32padupper: _D,
  base32hex: bD,
  base32hexupper: mD,
  base32hexpad: wD,
  base32hexpadupper: ED,
  base32z: DD,
});
const ID = Es({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
  }),
  xD = Es({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  });
var OD = Object.freeze({ __proto__: null, base36: ID, base36upper: xD });
const CD = Es({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  }),
  AD = Es({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  });
var PD = Object.freeze({ __proto__: null, base58btc: CD, base58flickr: AD });
const TD = Xt({
    prefix: "m",
    name: "base64",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6,
  }),
  RD = Xt({
    prefix: "M",
    name: "base64pad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6,
  }),
  ND = Xt({
    prefix: "u",
    name: "base64url",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6,
  }),
  FD = Xt({
    prefix: "U",
    name: "base64urlpad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6,
  });
var LD = Object.freeze({
  __proto__: null,
  base64: TD,
  base64pad: RD,
  base64url: ND,
  base64urlpad: FD,
});
const Rp = Array.from(
    "🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"
  ),
  UD = Rp.reduce((i, e, r) => ((i[r] = e), i), []),
  $D = Rp.reduce((i, e, r) => ((i[e.codePointAt(0)] = r), i), []);
function MD(i) {
  return i.reduce((e, r) => ((e += UD[r]), e), "");
}
function jD(i) {
  const e = [];
  for (const r of i) {
    const s = $D[r.codePointAt(0)];
    if (s === void 0) throw new Error(`Non-base256emoji character: ${r}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const BD = Zo({ prefix: "🚀", name: "base256emoji", encode: MD, decode: jD });
var qD = Object.freeze({ __proto__: null, base256emoji: BD }),
  zD = Np,
  Vf = 128,
  HD = 127,
  KD = ~HD,
  kD = Math.pow(2, 31);
function Np(i, e, r) {
  (e = e || []), (r = r || 0);
  for (var s = r; i >= kD; ) (e[r++] = (i & 255) | Vf), (i /= 128);
  for (; i & KD; ) (e[r++] = (i & 255) | Vf), (i >>>= 7);
  return (e[r] = i | 0), (Np.bytes = r - s + 1), e;
}
var VD = au,
  WD = 128,
  Wf = 127;
function au(i, s) {
  var r = 0,
    s = s || 0,
    o = 0,
    c = s,
    d,
    f = i.length;
  do {
    if (c >= f)
      throw ((au.bytes = 0), new RangeError("Could not decode varint"));
    (d = i[c++]),
      (r += o < 28 ? (d & Wf) << o : (d & Wf) * Math.pow(2, o)),
      (o += 7);
  } while (d >= WD);
  return (au.bytes = c - s), r;
}
var GD = Math.pow(2, 7),
  YD = Math.pow(2, 14),
  JD = Math.pow(2, 21),
  XD = Math.pow(2, 28),
  QD = Math.pow(2, 35),
  ZD = Math.pow(2, 42),
  e2 = Math.pow(2, 49),
  t2 = Math.pow(2, 56),
  r2 = Math.pow(2, 63),
  i2 = function (i) {
    return i < GD
      ? 1
      : i < YD
      ? 2
      : i < JD
      ? 3
      : i < XD
      ? 4
      : i < QD
      ? 5
      : i < ZD
      ? 6
      : i < e2
      ? 7
      : i < t2
      ? 8
      : i < r2
      ? 9
      : 10;
  },
  n2 = { encode: zD, decode: VD, encodingLength: i2 },
  Fp = n2;
const Gf = (i, e, r = 0) => (Fp.encode(i, e, r), e),
  Yf = (i) => Fp.encodingLength(i),
  cu = (i, e) => {
    const r = e.byteLength,
      s = Yf(i),
      o = s + Yf(r),
      c = new Uint8Array(o + r);
    return Gf(i, c, 0), Gf(r, c, s), c.set(e, o), new s2(i, r, e, c);
  };
class s2 {
  constructor(e, r, s, o) {
    (this.code = e), (this.size = r), (this.digest = s), (this.bytes = o);
  }
}
const Lp = ({ name: i, code: e, encode: r }) => new o2(i, e, r);
class o2 {
  constructor(e, r, s) {
    (this.name = e), (this.code = r), (this.encode = s);
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const r = this.encode(e);
      return r instanceof Uint8Array
        ? cu(this.code, r)
        : r.then((s) => cu(this.code, s));
    } else throw Error("Unknown type, must be binary type");
  }
}
const Up = (i) => async (e) => new Uint8Array(await crypto.subtle.digest(i, e)),
  a2 = Lp({ name: "sha2-256", code: 18, encode: Up("SHA-256") }),
  c2 = Lp({ name: "sha2-512", code: 19, encode: Up("SHA-512") });
var u2 = Object.freeze({ __proto__: null, sha256: a2, sha512: c2 });
const $p = 0,
  h2 = "identity",
  Mp = Pp,
  l2 = (i) => cu($p, Mp(i)),
  f2 = { code: $p, name: h2, encode: Mp, digest: l2 };
var d2 = Object.freeze({ __proto__: null, identity: f2 });
new TextEncoder(), new TextDecoder();
const Jf = {
  ...sD,
  ...aD,
  ...uD,
  ...lD,
  ...pD,
  ...SD,
  ...OD,
  ...PD,
  ...LD,
  ...qD,
};
({ ...u2, ...d2 });
function jp(i) {
  return globalThis.Buffer != null
    ? new Uint8Array(i.buffer, i.byteOffset, i.byteLength)
    : i;
}
function p2(i = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null
    ? jp(globalThis.Buffer.allocUnsafe(i))
    : new Uint8Array(i);
}
function Bp(i, e, r, s) {
  return {
    name: i,
    prefix: e,
    encoder: { name: i, prefix: e, encode: r },
    decoder: { decode: s },
  };
}
const Xf = Bp(
    "utf8",
    "u",
    (i) => "u" + new TextDecoder("utf8").decode(i),
    (i) => new TextEncoder().encode(i.substring(1))
  ),
  $c = Bp(
    "ascii",
    "a",
    (i) => {
      let e = "a";
      for (let r = 0; r < i.length; r++) e += String.fromCharCode(i[r]);
      return e;
    },
    (i) => {
      i = i.substring(1);
      const e = p2(i.length);
      for (let r = 0; r < i.length; r++) e[r] = i.charCodeAt(r);
      return e;
    }
  ),
  g2 = {
    utf8: Xf,
    "utf-8": Xf,
    hex: Jf.base16,
    latin1: $c,
    ascii: $c,
    binary: $c,
    ...Jf,
  };
function v2(i, e = "utf8") {
  const r = g2[e];
  if (!r) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") &&
    globalThis.Buffer != null &&
    globalThis.Buffer.from != null
    ? jp(globalThis.Buffer.from(i, "utf-8"))
    : r.decoder.decode(`${r.prefix}${i}`);
}
const qp = "wc",
  y2 = 2,
  Uu = "core",
  Ri = `${qp}@2:${Uu}:`,
  _2 = { name: Uu, logger: "error" },
  b2 = { database: ":memory:" },
  m2 = "crypto",
  Qf = "client_ed25519_seed",
  w2 = ye.ONE_DAY,
  E2 = "keychain",
  D2 = "0.3",
  S2 = "messages",
  I2 = "0.3",
  x2 = ye.SIX_HOURS,
  O2 = "publisher",
  zp = "irn",
  C2 = "error",
  Hp = "wss://relay.walletconnect.com",
  Zf = "wss://relay.walletconnect.org",
  A2 = "relayer",
  At = {
    message: "relayer_message",
    message_ack: "relayer_message_ack",
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error",
    connection_stalled: "relayer_connection_stalled",
    transport_closed: "relayer_transport_closed",
    publish: "relayer_publish",
  },
  P2 = "_subscription",
  us = {
    payload: "payload",
    connect: "connect",
    disconnect: "disconnect",
    error: "error",
  },
  T2 = ye.ONE_SECOND / 2,
  R2 = "2.8.6",
  N2 = 1e4,
  F2 = "0.3",
  L2 = "WALLETCONNECT_CLIENT_ID",
  ii = {
    created: "subscription_created",
    deleted: "subscription_deleted",
    expired: "subscription_expired",
    disabled: "subscription_disabled",
    sync: "subscription_sync",
    resubscribed: "subscription_resubscribed",
  },
  U2 = "subscription",
  $2 = "0.3",
  M2 = ye.FIVE_SECONDS * 1e3,
  j2 = "pairing",
  B2 = "0.3",
  hs = {
    wc_pairingDelete: {
      req: { ttl: ye.ONE_DAY, prompt: !1, tag: 1e3 },
      res: { ttl: ye.ONE_DAY, prompt: !1, tag: 1001 },
    },
    wc_pairingPing: {
      req: { ttl: ye.THIRTY_SECONDS, prompt: !1, tag: 1002 },
      res: { ttl: ye.THIRTY_SECONDS, prompt: !1, tag: 1003 },
    },
    unregistered_method: {
      req: { ttl: ye.ONE_DAY, prompt: !1, tag: 0 },
      res: { ttl: ye.ONE_DAY, prompt: !1, tag: 0 },
    },
  },
  ri = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync",
  },
  q2 = "history",
  z2 = "0.3",
  H2 = "expirer",
  Mr = {
    created: "expirer_created",
    deleted: "expirer_deleted",
    expired: "expirer_expired",
    sync: "expirer_sync",
  },
  K2 = "0.3",
  Mc = "verify-api",
  ed = "https://verify.walletconnect.com";
class k2 {
  constructor(e, r) {
    (this.core = e),
      (this.logger = r),
      (this.keychain = new Map()),
      (this.name = E2),
      (this.version = D2),
      (this.initialized = !1),
      (this.storagePrefix = Ri),
      (this.init = async () => {
        if (!this.initialized) {
          const s = await this.getKeyChain();
          typeof s < "u" && (this.keychain = s), (this.initialized = !0);
        }
      }),
      (this.has = (s) => (this.isInitialized(), this.keychain.has(s))),
      (this.set = async (s, o) => {
        this.isInitialized(), this.keychain.set(s, o), await this.persist();
      }),
      (this.get = (s) => {
        this.isInitialized();
        const o = this.keychain.get(s);
        if (typeof o > "u") {
          const { message: c } = he("NO_MATCHING_KEY", `${this.name}: ${s}`);
          throw new Error(c);
        }
        return o;
      }),
      (this.del = async (s) => {
        this.isInitialized(), this.keychain.delete(s), await this.persist();
      }),
      (this.core = e),
      (this.logger = Ze.generateChildLogger(r, this.name));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, cp(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? up(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class V2 {
  constructor(e, r, s) {
    (this.core = e),
      (this.logger = r),
      (this.name = m2),
      (this.initialized = !1),
      (this.init = async () => {
        this.initialized ||
          (await this.keychain.init(), (this.initialized = !0));
      }),
      (this.hasKeys = (o) => (this.isInitialized(), this.keychain.has(o))),
      (this.getClientId = async () => {
        this.isInitialized();
        const o = await this.getClientSeed(),
          c = $f(o);
        return Ep(c.publicKey);
      }),
      (this.generateKeyPair = () => {
        this.isInitialized();
        const o = xE();
        return this.setPrivateKey(o.publicKey, o.privateKey);
      }),
      (this.signJWT = async (o) => {
        this.isInitialized();
        const c = await this.getClientSeed(),
          d = $f(c),
          f = su();
        return await E6(f, o, w2, d);
      }),
      (this.generateSharedKey = (o, c, d) => {
        this.isInitialized();
        const f = this.getPrivateKey(o),
          g = OE(f, c);
        return this.setSymKey(g, d);
      }),
      (this.setSymKey = async (o, c) => {
        this.isInitialized();
        const d = c || CE(o);
        return await this.keychain.set(d, o), d;
      }),
      (this.deleteKeyPair = async (o) => {
        this.isInitialized(), await this.keychain.del(o);
      }),
      (this.deleteSymKey = async (o) => {
        this.isInitialized(), await this.keychain.del(o);
      }),
      (this.encode = async (o, c, d) => {
        this.isInitialized();
        const f = sp(d),
          g = ys(c);
        if (ff(f)) {
          const U = f.senderPublicKey,
            N = f.receiverPublicKey;
          o = await this.generateSharedKey(U, N);
        }
        const w = this.getSymKey(o),
          { type: D, senderPublicKey: R } = f;
        return PE({ type: D, symKey: w, message: g, senderPublicKey: R });
      }),
      (this.decode = async (o, c, d) => {
        this.isInitialized();
        const f = NE(c, d);
        if (ff(f)) {
          const D = f.receiverPublicKey,
            R = f.senderPublicKey;
          o = await this.generateSharedKey(D, R);
        }
        const g = this.getSymKey(o),
          w = TE({ symKey: g, encoded: c });
        return Pu(w);
      }),
      (this.getPayloadType = (o) => {
        const c = $o(o);
        return ms(c.type);
      }),
      (this.getPayloadSenderPublicKey = (o) => {
        const c = $o(o);
        return c.senderPublicKey ? hr(c.senderPublicKey, ur) : void 0;
      }),
      (this.core = e),
      (this.logger = Ze.generateChildLogger(r, this.name)),
      (this.keychain = s || new k2(this.core, this.logger));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  async setPrivateKey(e, r) {
    return await this.keychain.set(e, r), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(Qf);
    } catch {
      (e = su()), await this.keychain.set(Qf, e);
    }
    return v2(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class W2 extends Q3 {
  constructor(e, r) {
    super(e, r),
      (this.logger = e),
      (this.core = r),
      (this.messages = new Map()),
      (this.name = S2),
      (this.version = I2),
      (this.initialized = !1),
      (this.storagePrefix = Ri),
      (this.init = async () => {
        if (!this.initialized) {
          this.logger.trace("Initialized");
          try {
            const s = await this.getRelayerMessages();
            typeof s < "u" && (this.messages = s),
              this.logger.debug(
                `Successfully Restored records for ${this.name}`
              ),
              this.logger.trace({
                type: "method",
                method: "restore",
                size: this.messages.size,
              });
          } catch (s) {
            this.logger.debug(`Failed to Restore records for ${this.name}`),
              this.logger.error(s);
          } finally {
            this.initialized = !0;
          }
        }
      }),
      (this.set = async (s, o) => {
        this.isInitialized();
        const c = Tn(o);
        let d = this.messages.get(s);
        return (
          typeof d > "u" && (d = {}),
          typeof d[c] < "u" ||
            ((d[c] = o), this.messages.set(s, d), await this.persist()),
          c
        );
      }),
      (this.get = (s) => {
        this.isInitialized();
        let o = this.messages.get(s);
        return typeof o > "u" && (o = {}), o;
      }),
      (this.has = (s, o) => {
        this.isInitialized();
        const c = this.get(s),
          d = Tn(o);
        return typeof c[d] < "u";
      }),
      (this.del = async (s) => {
        this.isInitialized(), this.messages.delete(s), await this.persist();
      }),
      (this.logger = Ze.generateChildLogger(e, this.name)),
      (this.core = r);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, cp(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? up(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class G2 extends Z3 {
  constructor(e, r) {
    super(e, r),
      (this.relayer = e),
      (this.logger = r),
      (this.events = new xr.EventEmitter()),
      (this.name = O2),
      (this.queue = new Map()),
      (this.publishTimeout = ye.toMiliseconds(ye.TEN_SECONDS)),
      (this.queueTimeout = ye.toMiliseconds(ye.FIVE_SECONDS)),
      (this.needsTransportRestart = !1),
      (this.publish = async (s, o, c) => {
        this.logger.debug("Publishing Payload"),
          this.logger.trace({
            type: "method",
            method: "publish",
            params: { topic: s, message: o, opts: c },
          });
        try {
          const d = (c == null ? void 0 : c.ttl) || x2,
            f = ou(c),
            g = (c == null ? void 0 : c.prompt) || !1,
            w = (c == null ? void 0 : c.tag) || 0,
            D = (c == null ? void 0 : c.id) || Nu().toString(),
            R = {
              topic: s,
              message: o,
              opts: { ttl: d, relay: f, prompt: g, tag: w, id: D },
            },
            U = setTimeout(() => this.queue.set(D, R), this.queueTimeout);
          try {
            await await Mo(
              this.rpcPublish(s, o, d, f, g, w, D),
              this.publishTimeout
            ),
              clearTimeout(U),
              this.relayer.events.emit(At.publish, R);
          } catch {
            this.logger.debug("Publishing Payload stalled"),
              (this.needsTransportRestart = !0);
            return;
          }
          this.logger.debug("Successfully Published Payload"),
            this.logger.trace({
              type: "method",
              method: "publish",
              params: { topic: s, message: o, opts: c },
            });
        } catch (d) {
          throw (
            (this.logger.debug("Failed to Publish Payload"),
            this.logger.error(d),
            d)
          );
        }
      }),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.relayer = e),
      (this.logger = Ze.generateChildLogger(r, this.name)),
      this.registerEventListeners();
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  rpcPublish(e, r, s, o, c, d, f) {
    var g, w, D, R;
    const U = {
      method: Ro(o.protocol).publish,
      params: { topic: e, message: r, ttl: s, prompt: c, tag: d },
      id: f,
    };
    return (
      cr((g = U.params) == null ? void 0 : g.prompt) &&
        ((w = U.params) == null || delete w.prompt),
      cr((D = U.params) == null ? void 0 : D.tag) &&
        ((R = U.params) == null || delete R.tag),
      this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "message", direction: "outgoing", request: U }),
      this.relayer.request(U)
    );
  }
  onPublish(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e) => {
      const { topic: r, message: s, opts: o } = e;
      await this.publish(r, s, o);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Un.HEARTBEAT_EVENTS.pulse, () => {
      if (this.needsTransportRestart) {
        (this.needsTransportRestart = !1),
          this.relayer.events.emit(At.connection_stalled);
        return;
      }
      this.checkQueue();
    }),
      this.relayer.on(At.message_ack, (e) => {
        this.onPublish(e.id.toString());
      });
  }
}
class Y2 {
  constructor() {
    (this.map = new Map()),
      (this.set = (e, r) => {
        const s = this.get(e);
        this.exists(e, r) || this.map.set(e, [...s, r]);
      }),
      (this.get = (e) => this.map.get(e) || []),
      (this.exists = (e, r) => this.get(e).includes(r)),
      (this.delete = (e, r) => {
        if (typeof r > "u") {
          this.map.delete(e);
          return;
        }
        if (!this.map.has(e)) return;
        const s = this.get(e);
        if (!this.exists(e, r)) return;
        const o = s.filter((c) => c !== r);
        if (!o.length) {
          this.map.delete(e);
          return;
        }
        this.map.set(e, o);
      }),
      (this.clear = () => {
        this.map.clear();
      });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var J2 = Object.defineProperty,
  X2 = Object.defineProperties,
  Q2 = Object.getOwnPropertyDescriptors,
  td = Object.getOwnPropertySymbols,
  Z2 = Object.prototype.hasOwnProperty,
  e5 = Object.prototype.propertyIsEnumerable,
  rd = (i, e, r) =>
    e in i
      ? J2(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  ls = (i, e) => {
    for (var r in e || (e = {})) Z2.call(e, r) && rd(i, r, e[r]);
    if (td) for (var r of td(e)) e5.call(e, r) && rd(i, r, e[r]);
    return i;
  },
  jc = (i, e) => X2(i, Q2(e));
class t5 extends r6 {
  constructor(e, r) {
    super(e, r),
      (this.relayer = e),
      (this.logger = r),
      (this.subscriptions = new Map()),
      (this.topicMap = new Y2()),
      (this.events = new xr.EventEmitter()),
      (this.name = U2),
      (this.version = $2),
      (this.pending = new Map()),
      (this.cached = []),
      (this.initialized = !1),
      (this.pendingSubscriptionWatchLabel = "pending_sub_watch_label"),
      (this.pollingInterval = 20),
      (this.storagePrefix = Ri),
      (this.subscribeTimeout = 1e4),
      (this.restartInProgress = !1),
      (this.batchSubscribeTopicsLimit = 500),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restart(),
          this.registerEventListeners(),
          this.onEnable(),
          (this.clientId = await this.relayer.core.crypto.getClientId()));
      }),
      (this.subscribe = async (s, o) => {
        await this.restartToComplete(),
          this.isInitialized(),
          this.logger.debug("Subscribing Topic"),
          this.logger.trace({
            type: "method",
            method: "subscribe",
            params: { topic: s, opts: o },
          });
        try {
          const c = ou(o),
            d = { topic: s, relay: c };
          this.pending.set(s, d);
          const f = await this.rpcSubscribe(s, c);
          return (
            this.onSubscribe(f, d),
            this.logger.debug("Successfully Subscribed Topic"),
            this.logger.trace({
              type: "method",
              method: "subscribe",
              params: { topic: s, opts: o },
            }),
            f
          );
        } catch (c) {
          throw (
            (this.logger.debug("Failed to Subscribe Topic"),
            this.logger.error(c),
            c)
          );
        }
      }),
      (this.unsubscribe = async (s, o) => {
        await this.restartToComplete(),
          this.isInitialized(),
          typeof (o == null ? void 0 : o.id) < "u"
            ? await this.unsubscribeById(s, o.id, o)
            : await this.unsubscribeByTopic(s, o);
      }),
      (this.isSubscribed = async (s) =>
        this.topics.includes(s)
          ? !0
          : await new Promise((o, c) => {
              const d = new ye.Watch();
              d.start(this.pendingSubscriptionWatchLabel);
              const f = setInterval(() => {
                !this.pending.has(s) &&
                  this.topics.includes(s) &&
                  (clearInterval(f),
                  d.stop(this.pendingSubscriptionWatchLabel),
                  o(!0)),
                  d.elapsed(this.pendingSubscriptionWatchLabel) >= M2 &&
                    (clearInterval(f),
                    d.stop(this.pendingSubscriptionWatchLabel),
                    c(new Error("Subscription resolution timeout")));
              }, this.pollingInterval);
            }).catch(() => !1)),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.restart = async () => {
        (this.restartInProgress = !0),
          await this.restore(),
          await this.reset(),
          (this.restartInProgress = !1);
      }),
      (this.relayer = e),
      (this.logger = Ze.generateChildLogger(r, this.name)),
      (this.clientId = "");
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e, r) {
    let s = !1;
    try {
      s = this.getSubscription(e).topic === r;
    } catch {}
    return s;
  }
  onEnable() {
    (this.cached = []), (this.initialized = !0);
  }
  onDisable() {
    (this.cached = this.values),
      this.subscriptions.clear(),
      this.topicMap.clear();
  }
  async unsubscribeByTopic(e, r) {
    const s = this.topicMap.get(e);
    await Promise.all(s.map(async (o) => await this.unsubscribeById(e, o, r)));
  }
  async unsubscribeById(e, r, s) {
    this.logger.debug("Unsubscribing Topic"),
      this.logger.trace({
        type: "method",
        method: "unsubscribe",
        params: { topic: e, id: r, opts: s },
      });
    try {
      const o = ou(s);
      await this.rpcUnsubscribe(e, r, o);
      const c = Ft("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, r, c),
        this.logger.debug("Successfully Unsubscribed Topic"),
        this.logger.trace({
          type: "method",
          method: "unsubscribe",
          params: { topic: e, id: r, opts: s },
        });
    } catch (o) {
      throw (
        (this.logger.debug("Failed to Unsubscribe Topic"),
        this.logger.error(o),
        o)
      );
    }
  }
  async rpcSubscribe(e, r) {
    const s = { method: Ro(r.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    try {
      await await Mo(this.relayer.request(s), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Subscribe Payload stalled"),
        this.relayer.events.emit(At.connection_stalled);
    }
    return Tn(e + this.clientId);
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return;
    const r = e[0].relay,
      s = {
        method: Ro(r.protocol).batchSubscribe,
        params: { topics: e.map((o) => o.topic) },
      };
    this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    try {
      return await await Mo(this.relayer.request(s), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Payload stalled"),
        this.relayer.events.emit(At.connection_stalled);
    }
  }
  rpcUnsubscribe(e, r, s) {
    const o = {
      method: Ro(s.protocol).unsubscribe,
      params: { topic: e, id: r },
    };
    return (
      this.logger.debug("Outgoing Relay Payload"),
      this.logger.trace({ type: "payload", direction: "outgoing", request: o }),
      this.relayer.request(o)
    );
  }
  onSubscribe(e, r) {
    this.setSubscription(e, jc(ls({}, r), { id: e })),
      this.pending.delete(r.topic);
  }
  onBatchSubscribe(e) {
    e.length &&
      e.forEach((r) => {
        this.setSubscription(r.id, ls({}, r)), this.pending.delete(r.topic);
      });
  }
  async onUnsubscribe(e, r, s) {
    this.events.removeAllListeners(r),
      this.hasSubscription(r, e) && this.deleteSubscription(r, s),
      await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, r) {
    this.subscriptions.has(e) ||
      (this.logger.debug("Setting subscription"),
      this.logger.trace({
        type: "method",
        method: "setSubscription",
        id: e,
        subscription: r,
      }),
      this.addSubscription(e, r));
  }
  addSubscription(e, r) {
    this.subscriptions.set(e, ls({}, r)),
      this.topicMap.set(r.topic, e),
      this.events.emit(ii.created, r);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"),
      this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const r = this.subscriptions.get(e);
    if (!r) {
      const { message: s } = he("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return r;
  }
  deleteSubscription(e, r) {
    this.logger.debug("Deleting subscription"),
      this.logger.trace({
        type: "method",
        method: "deleteSubscription",
        id: e,
        reason: r,
      });
    const s = this.getSubscription(e);
    this.subscriptions.delete(e),
      this.topicMap.delete(s.topic, e),
      this.events.emit(ii.deleted, jc(ls({}, s), { reason: r }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(ii.sync);
  }
  async reset() {
    if (this.cached.length) {
      const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let r = 0; r < e; r++) {
        const s = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(s);
      }
    }
    this.events.emit(ii.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size) {
        const { message: r } = he("RESTORE_WILL_OVERRIDE", this.name);
        throw (
          (this.logger.error(r),
          this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),
          new Error(r))
        );
      }
      (this.cached = e),
        this.logger.debug(
          `Successfully Restored subscriptions for ${this.name}`
        ),
        this.logger.trace({
          type: "method",
          method: "restore",
          subscriptions: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),
        this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    if (!e.length) return;
    const r = await this.rpcBatchSubscribe(e);
    ni(r) &&
      this.onBatchSubscribe(r.map((s, o) => jc(ls({}, e[o]), { id: s })));
  }
  async onConnect() {
    this.restartInProgress || (await this.restart(), this.onEnable());
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (this.relayer.transportExplicitlyClosed) return;
    const e = [];
    this.pending.forEach((r) => {
      e.push(r);
    }),
      await this.batchSubscribe(e);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Un.HEARTBEAT_EVENTS.pulse, async () => {
      await this.checkPending();
    }),
      this.relayer.on(At.connect, async () => {
        await this.onConnect();
      }),
      this.relayer.on(At.disconnect, () => {
        this.onDisconnect();
      }),
      this.events.on(ii.created, async (e) => {
        const r = ii.created;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: "event", event: r, data: e }),
          await this.persist();
      }),
      this.events.on(ii.deleted, async (e) => {
        const r = ii.deleted;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: "event", event: r, data: e }),
          await this.persist();
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete() {
    this.restartInProgress &&
      (await new Promise((e) => {
        const r = setInterval(() => {
          this.restartInProgress || (clearInterval(r), e());
        }, this.pollingInterval);
      }));
  }
}
var r5 = Object.defineProperty,
  id = Object.getOwnPropertySymbols,
  i5 = Object.prototype.hasOwnProperty,
  n5 = Object.prototype.propertyIsEnumerable,
  nd = (i, e, r) =>
    e in i
      ? r5(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  s5 = (i, e) => {
    for (var r in e || (e = {})) i5.call(e, r) && nd(i, r, e[r]);
    if (id) for (var r of id(e)) n5.call(e, r) && nd(i, r, e[r]);
    return i;
  };
class o5 extends e6 {
  constructor(e) {
    super(e),
      (this.protocol = "wc"),
      (this.version = 2),
      (this.events = new xr.EventEmitter()),
      (this.name = A2),
      (this.transportExplicitlyClosed = !1),
      (this.initialized = !1),
      (this.reconnecting = !1),
      (this.connectionStatusPollingInterval = 20),
      (this.staleConnectionErrors = ["socket hang up", "socket stalled"]),
      (this.request = async (r) => {
        this.logger.debug("Publishing Request Payload");
        try {
          return (
            await this.toEstablishConnection(), await this.provider.request(r)
          );
        } catch (s) {
          throw (
            (this.logger.debug("Failed to Publish Request"),
            this.logger.error(s),
            s)
          );
        }
      }),
      (this.core = e.core),
      (this.logger =
        typeof e.logger < "u" && typeof e.logger != "string"
          ? Ze.generateChildLogger(e.logger, this.name)
          : Ze.pino(Ze.getDefaultLoggerOptions({ level: e.logger || C2 }))),
      (this.messages = new W2(this.logger, e.core)),
      (this.subscriber = new t5(this, this.logger)),
      (this.publisher = new G2(this, this.logger)),
      (this.relayUrl = (e == null ? void 0 : e.relayUrl) || Hp),
      (this.projectId = e.projectId),
      (this.provider = {});
  }
  async init() {
    this.logger.trace("Initialized"),
      await this.createProvider(),
      await Promise.all([this.messages.init(), this.subscriber.init()]);
    try {
      await this.transportOpen();
    } catch {
      this.logger.warn(
        `Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${Zf}...`
      ),
        await this.restartTransport(Zf);
    }
    this.registerEventListeners(),
      (this.initialized = !0),
      setTimeout(async () => {
        this.subscriber.topics.length === 0 &&
          (this.logger.info(
            "No topics subscribed to after init, closing transport"
          ),
          await this.transportClose(),
          (this.transportExplicitlyClosed = !1));
      }, N2);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get connected() {
    return this.provider.connection.connected;
  }
  get connecting() {
    return this.provider.connection.connecting;
  }
  async publish(e, r, s) {
    this.isInitialized(),
      await this.publisher.publish(e, r, s),
      await this.recordMessageEvent({
        topic: e,
        message: r,
        publishedAt: Date.now(),
      });
  }
  async subscribe(e, r) {
    var s;
    this.isInitialized();
    let o =
      ((s = this.subscriber.topicMap.get(e)) == null ? void 0 : s[0]) || "";
    return (
      o ||
      (await Promise.all([
        new Promise((c) => {
          this.subscriber.once(ii.created, (d) => {
            d.topic === e && c();
          });
        }),
        new Promise(async (c) => {
          (o = await this.subscriber.subscribe(e, r)), c();
        }),
      ]),
      o)
    );
  }
  async unsubscribe(e, r) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, r);
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  async transportClose() {
    (this.transportExplicitlyClosed = !0),
      this.connected &&
        (await this.provider.disconnect(),
        this.events.emit(At.transport_closed));
  }
  async transportOpen(e) {
    if (((this.transportExplicitlyClosed = !1), !this.reconnecting)) {
      (this.relayUrl = e || this.relayUrl), (this.reconnecting = !0);
      try {
        await Promise.all([
          new Promise((r) => {
            this.initialized || r(),
              this.subscriber.once(ii.resubscribed, () => {
                r();
              });
          }),
          await Promise.race([
            new Promise(async (r, s) => {
              await Mo(
                this.provider.connect(),
                5e3,
                `Socket stalled when trying to connect to ${this.relayUrl}`
              )
                .catch((o) => s(o))
                .then(() => r())
                .finally(() =>
                  this.removeListener(
                    At.transport_closed,
                    this.rejectTransportOpen
                  )
                );
            }),
            new Promise((r) =>
              this.once(At.transport_closed, this.rejectTransportOpen)
            ),
          ]),
        ]);
      } catch (r) {
        this.logger.error(r);
        const s = r;
        if (!this.isConnectionStalled(s.message)) throw r;
        this.events.emit(At.transport_closed);
      } finally {
        this.reconnecting = !1;
      }
    }
  }
  async restartTransport(e) {
    this.transportExplicitlyClosed ||
      this.reconnecting ||
      ((this.relayUrl = e || this.relayUrl),
      this.connected &&
        (await Promise.all([
          new Promise((r) => {
            this.provider.once(us.disconnect, () => {
              r();
            });
          }),
          this.transportClose(),
        ])),
      await this.createProvider(),
      await this.transportOpen());
  }
  isConnectionStalled(e) {
    return this.staleConnectionErrors.some((r) => e.includes(r));
  }
  rejectTransportOpen() {
    throw new Error(
      "Attempt to connect to relay via `transportOpen` has stalled. Retrying..."
    );
  }
  async createProvider() {
    const e = await this.core.crypto.signJWT(this.relayUrl);
    (this.provider = new Fi(
      new K6(
        KE({
          sdkVersion: R2,
          protocol: this.protocol,
          version: this.version,
          relayUrl: this.relayUrl,
          projectId: this.projectId,
          auth: e,
          useOnCloseEvent: !0,
        })
      )
    )),
      this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: r, message: s } = e;
    await this.messages.set(r, s);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: r, message: s } = e;
    return (await this.subscriber.isSubscribed(r))
      ? this.messages.has(r, s)
      : !0;
  }
  async onProviderPayload(e) {
    if (
      (this.logger.debug("Incoming Relay Payload"),
      this.logger.trace({ type: "payload", direction: "incoming", payload: e }),
      Lu(e))
    ) {
      if (!e.method.endsWith(P2)) return;
      const r = e.params,
        { topic: s, message: o, publishedAt: c } = r.data,
        d = { topic: s, message: o, publishedAt: c };
      this.logger.debug("Emitting Relayer Payload"),
        this.logger.trace(s5({ type: "event", event: r.id }, d)),
        this.events.emit(r.id, d),
        await this.acknowledgePayload(e),
        await this.onMessageEvent(d);
    } else Qo(e) && this.events.emit(At.message_ack, e);
  }
  async onMessageEvent(e) {
    (await this.shouldIgnoreMessageEvent(e)) ||
      (this.events.emit(At.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const r = Fu(e.id, !0);
    await this.provider.connection.send(r);
  }
  registerProviderListeners() {
    this.provider.on(us.payload, (e) => this.onProviderPayload(e)),
      this.provider.on(us.connect, () => {
        this.events.emit(At.connect);
      }),
      this.provider.on(us.disconnect, () => {
        this.onProviderDisconnect();
      }),
      this.provider.on(us.error, (e) => {
        this.logger.error(e), this.events.emit(At.error, e);
      });
  }
  registerEventListeners() {
    this.events.on(At.connection_stalled, async () => {
      await this.restartTransport();
    });
  }
  onProviderDisconnect() {
    this.events.emit(At.disconnect), this.attemptToReconnect();
  }
  attemptToReconnect() {
    this.transportExplicitlyClosed ||
      setTimeout(async () => {
        await this.restartTransport();
      }, ye.toMiliseconds(T2));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (!this.connected) {
      if (this.connecting)
        return await new Promise((e) => {
          const r = setInterval(() => {
            this.connected && (clearInterval(r), e());
          }, this.connectionStatusPollingInterval);
        });
      await this.restartTransport();
    }
  }
}
var a5 = Object.defineProperty,
  sd = Object.getOwnPropertySymbols,
  c5 = Object.prototype.hasOwnProperty,
  u5 = Object.prototype.propertyIsEnumerable,
  od = (i, e, r) =>
    e in i
      ? a5(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  ad = (i, e) => {
    for (var r in e || (e = {})) c5.call(e, r) && od(i, r, e[r]);
    if (sd) for (var r of sd(e)) u5.call(e, r) && od(i, r, e[r]);
    return i;
  };
class ea extends t6 {
  constructor(e, r, s, o = Ri, c = void 0) {
    super(e, r, s, o),
      (this.core = e),
      (this.logger = r),
      (this.name = s),
      (this.map = new Map()),
      (this.version = F2),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = Ri),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restore(),
          this.cached.forEach((d) => {
            this.getKey && d !== null && !cr(d)
              ? this.map.set(this.getKey(d), d)
              : d3(d)
              ? this.map.set(d.id, d)
              : p3(d) && this.map.set(d.topic, d);
          }),
          (this.cached = []),
          (this.initialized = !0));
      }),
      (this.set = async (d, f) => {
        this.isInitialized(),
          this.map.has(d)
            ? await this.update(d, f)
            : (this.logger.debug("Setting value"),
              this.logger.trace({
                type: "method",
                method: "set",
                key: d,
                value: f,
              }),
              this.map.set(d, f),
              await this.persist());
      }),
      (this.get = (d) => (
        this.isInitialized(),
        this.logger.debug("Getting value"),
        this.logger.trace({ type: "method", method: "get", key: d }),
        this.getData(d)
      )),
      (this.getAll = (d) => (
        this.isInitialized(),
        d
          ? this.values.filter((f) =>
              Object.keys(d).every((g) => V6(f[g], d[g]))
            )
          : this.values
      )),
      (this.update = async (d, f) => {
        this.isInitialized(),
          this.logger.debug("Updating value"),
          this.logger.trace({
            type: "method",
            method: "update",
            key: d,
            update: f,
          });
        const g = ad(ad({}, this.getData(d)), f);
        this.map.set(d, g), await this.persist();
      }),
      (this.delete = async (d, f) => {
        this.isInitialized(),
          this.map.has(d) &&
            (this.logger.debug("Deleting value"),
            this.logger.trace({
              type: "method",
              method: "delete",
              key: d,
              reason: f,
            }),
            this.map.delete(d),
            await this.persist());
      }),
      (this.logger = Ze.generateChildLogger(r, this.name)),
      (this.storagePrefix = o),
      (this.getKey = c);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const r = this.map.get(e);
    if (!r) {
      const { message: s } = he("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw (this.logger.error(s), new Error(s));
    }
    return r;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length) return;
      if (this.map.size) {
        const { message: r } = he("RESTORE_WILL_OVERRIDE", this.name);
        throw (this.logger.error(r), new Error(r));
      }
      (this.cached = e),
        this.logger.debug(`Successfully Restored value for ${this.name}`),
        this.logger.trace({
          type: "method",
          method: "restore",
          value: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`),
        this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class h5 {
  constructor(e, r) {
    (this.core = e),
      (this.logger = r),
      (this.name = j2),
      (this.version = B2),
      (this.events = new _u()),
      (this.initialized = !1),
      (this.storagePrefix = Ri),
      (this.ignoredPayloadTypes = [nn]),
      (this.registeredMethods = []),
      (this.init = async () => {
        this.initialized ||
          (await this.pairings.init(),
          await this.cleanup(),
          this.registerRelayerEvents(),
          this.registerExpirerEvents(),
          (this.initialized = !0),
          this.logger.trace("Initialized"));
      }),
      (this.register = ({ methods: s }) => {
        this.isInitialized(),
          (this.registeredMethods = [
            ...new Set([...this.registeredMethods, ...s]),
          ]);
      }),
      (this.create = async () => {
        this.isInitialized();
        const s = su(),
          o = await this.core.crypto.setSymKey(s),
          c = Wr(ye.FIVE_MINUTES),
          d = { protocol: zp },
          f = { topic: o, expiry: c, relay: d, active: !1 },
          g = i3({
            protocol: this.core.protocol,
            version: this.core.version,
            topic: o,
            symKey: s,
            relay: d,
          });
        return (
          await this.pairings.set(o, f),
          await this.core.relayer.subscribe(o),
          this.core.expirer.set(o, c),
          { topic: o, uri: g }
        );
      }),
      (this.pair = async (s) => {
        this.isInitialized(), this.isValidPair(s);
        const { topic: o, symKey: c, relay: d } = e3(s.uri);
        if (this.pairings.keys.includes(o))
          throw new Error(`Pairing already exists: ${o}`);
        if (this.core.crypto.hasKeys(o))
          throw new Error(`Keychain already exists: ${o}`);
        const f = Wr(ye.FIVE_MINUTES),
          g = { topic: o, relay: d, expiry: f, active: !1 };
        return (
          await this.pairings.set(o, g),
          await this.core.crypto.setSymKey(c, o),
          await this.core.relayer.subscribe(o, { relay: d }),
          this.core.expirer.set(o, f),
          s.activatePairing && (await this.activate({ topic: o })),
          g
        );
      }),
      (this.activate = async ({ topic: s }) => {
        this.isInitialized();
        const o = Wr(ye.THIRTY_DAYS);
        await this.pairings.update(s, { active: !0, expiry: o }),
          this.core.expirer.set(s, o);
      }),
      (this.ping = async (s) => {
        this.isInitialized(), await this.isValidPing(s);
        const { topic: o } = s;
        if (this.pairings.keys.includes(o)) {
          const c = await this.sendRequest(o, "wc_pairingPing", {}),
            { done: d, resolve: f, reject: g } = Cn();
          this.events.once(Ht("pairing_ping", c), ({ error: w }) => {
            w ? g(w) : f();
          }),
            await d();
        }
      }),
      (this.updateExpiry = async ({ topic: s, expiry: o }) => {
        this.isInitialized(), await this.pairings.update(s, { expiry: o });
      }),
      (this.updateMetadata = async ({ topic: s, metadata: o }) => {
        this.isInitialized(),
          await this.pairings.update(s, { peerMetadata: o });
      }),
      (this.getPairings = () => (this.isInitialized(), this.pairings.values)),
      (this.disconnect = async (s) => {
        this.isInitialized(), await this.isValidDisconnect(s);
        const { topic: o } = s;
        this.pairings.keys.includes(o) &&
          (await this.sendRequest(
            o,
            "wc_pairingDelete",
            Ft("USER_DISCONNECTED")
          ),
          await this.deletePairing(o));
      }),
      (this.sendRequest = async (s, o, c) => {
        const d = Jo(o, c),
          f = await this.core.crypto.encode(s, d),
          g = hs[o].req;
        return (
          this.core.history.set(s, d), this.core.relayer.publish(s, f, g), d.id
        );
      }),
      (this.sendResult = async (s, o, c) => {
        const d = Fu(s, c),
          f = await this.core.crypto.encode(o, d),
          g = await this.core.history.get(o, s),
          w = hs[g.request.method].res;
        await this.core.relayer.publish(o, f, w),
          await this.core.history.resolve(d);
      }),
      (this.sendError = async (s, o, c) => {
        const d = Xo(s, c),
          f = await this.core.crypto.encode(o, d),
          g = await this.core.history.get(o, s),
          w = hs[g.request.method]
            ? hs[g.request.method].res
            : hs.unregistered_method.res;
        await this.core.relayer.publish(o, f, w),
          await this.core.history.resolve(d);
      }),
      (this.deletePairing = async (s, o) => {
        await this.core.relayer.unsubscribe(s),
          await Promise.all([
            this.pairings.delete(s, Ft("USER_DISCONNECTED")),
            this.core.crypto.deleteSymKey(s),
            o ? Promise.resolve() : this.core.expirer.del(s),
          ]);
      }),
      (this.cleanup = async () => {
        const s = this.pairings.getAll().filter((o) => Ti(o.expiry));
        await Promise.all(s.map((o) => this.deletePairing(o.topic)));
      }),
      (this.onRelayEventRequest = (s) => {
        const { topic: o, payload: c } = s,
          d = c.method;
        if (this.pairings.keys.includes(o))
          switch (d) {
            case "wc_pairingPing":
              return this.onPairingPingRequest(o, c);
            case "wc_pairingDelete":
              return this.onPairingDeleteRequest(o, c);
            default:
              return this.onUnknownRpcMethodRequest(o, c);
          }
      }),
      (this.onRelayEventResponse = async (s) => {
        const { topic: o, payload: c } = s,
          d = (await this.core.history.get(o, c.id)).request.method;
        if (this.pairings.keys.includes(o))
          switch (d) {
            case "wc_pairingPing":
              return this.onPairingPingResponse(o, c);
            default:
              return this.onUnknownRpcMethodResponse(d);
          }
      }),
      (this.onPairingPingRequest = async (s, o) => {
        const { id: c } = o;
        try {
          this.isValidPing({ topic: s }),
            await this.sendResult(c, s, !0),
            this.events.emit("pairing_ping", { id: c, topic: s });
        } catch (d) {
          await this.sendError(c, s, d), this.logger.error(d);
        }
      }),
      (this.onPairingPingResponse = (s, o) => {
        const { id: c } = o;
        setTimeout(() => {
          bi(o)
            ? this.events.emit(Ht("pairing_ping", c), {})
            : Gr(o) &&
              this.events.emit(Ht("pairing_ping", c), { error: o.error });
        }, 500);
      }),
      (this.onPairingDeleteRequest = async (s, o) => {
        const { id: c } = o;
        try {
          this.isValidDisconnect({ topic: s }),
            await this.deletePairing(s),
            this.events.emit("pairing_delete", { id: c, topic: s });
        } catch (d) {
          await this.sendError(c, s, d), this.logger.error(d);
        }
      }),
      (this.onUnknownRpcMethodRequest = async (s, o) => {
        const { id: c, method: d } = o;
        try {
          if (this.registeredMethods.includes(d)) return;
          const f = Ft("WC_METHOD_UNSUPPORTED", d);
          await this.sendError(c, s, f), this.logger.error(f);
        } catch (f) {
          await this.sendError(c, s, f), this.logger.error(f);
        }
      }),
      (this.onUnknownRpcMethodResponse = (s) => {
        this.registeredMethods.includes(s) ||
          this.logger.error(Ft("WC_METHOD_UNSUPPORTED", s));
      }),
      (this.isValidPair = (s) => {
        if (!yr(s)) {
          const { message: o } = he(
            "MISSING_OR_INVALID",
            `pair() params: ${s}`
          );
          throw new Error(o);
        }
        if (!f3(s.uri)) {
          const { message: o } = he(
            "MISSING_OR_INVALID",
            `pair() uri: ${s.uri}`
          );
          throw new Error(o);
        }
      }),
      (this.isValidPing = async (s) => {
        if (!yr(s)) {
          const { message: c } = he(
            "MISSING_OR_INVALID",
            `ping() params: ${s}`
          );
          throw new Error(c);
        }
        const { topic: o } = s;
        await this.isValidPairingTopic(o);
      }),
      (this.isValidDisconnect = async (s) => {
        if (!yr(s)) {
          const { message: c } = he(
            "MISSING_OR_INVALID",
            `disconnect() params: ${s}`
          );
          throw new Error(c);
        }
        const { topic: o } = s;
        await this.isValidPairingTopic(o);
      }),
      (this.isValidPairingTopic = async (s) => {
        if (!Gt(s, !1)) {
          const { message: o } = he(
            "MISSING_OR_INVALID",
            `pairing topic should be a string: ${s}`
          );
          throw new Error(o);
        }
        if (!this.pairings.keys.includes(s)) {
          const { message: o } = he(
            "NO_MATCHING_KEY",
            `pairing topic doesn't exist: ${s}`
          );
          throw new Error(o);
        }
        if (Ti(this.pairings.get(s).expiry)) {
          await this.deletePairing(s);
          const { message: o } = he("EXPIRED", `pairing topic: ${s}`);
          throw new Error(o);
        }
      }),
      (this.core = e),
      (this.logger = Ze.generateChildLogger(r, this.name)),
      (this.pairings = new ea(
        this.core,
        this.logger,
        this.name,
        this.storagePrefix
      ));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(At.message, async (e) => {
      const { topic: r, message: s } = e;
      if (this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s)))
        return;
      const o = await this.core.crypto.decode(r, s);
      Lu(o)
        ? (this.core.history.set(r, o),
          this.onRelayEventRequest({ topic: r, payload: o }))
        : Qo(o) &&
          (await this.core.history.resolve(o),
          await this.onRelayEventResponse({ topic: r, payload: o }),
          this.core.history.delete(r, o.id));
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(Mr.expired, async (e) => {
      const { topic: r } = lp(e.target);
      r &&
        this.pairings.keys.includes(r) &&
        (await this.deletePairing(r, !0),
        this.events.emit("pairing_expire", { topic: r }));
    });
  }
}
class l5 extends X3 {
  constructor(e, r) {
    super(e, r),
      (this.core = e),
      (this.logger = r),
      (this.records = new Map()),
      (this.events = new xr.EventEmitter()),
      (this.name = q2),
      (this.version = z2),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = Ri),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restore(),
          this.cached.forEach((s) => this.records.set(s.id, s)),
          (this.cached = []),
          this.registerEventListeners(),
          (this.initialized = !0));
      }),
      (this.set = (s, o, c) => {
        if (
          (this.isInitialized(),
          this.logger.debug("Setting JSON-RPC request history record"),
          this.logger.trace({
            type: "method",
            method: "set",
            topic: s,
            request: o,
            chainId: c,
          }),
          this.records.has(o.id))
        )
          return;
        const d = {
          id: o.id,
          topic: s,
          request: { method: o.method, params: o.params || null },
          chainId: c,
          expiry: Wr(ye.THIRTY_DAYS),
        };
        this.records.set(d.id, d), this.events.emit(ri.created, d);
      }),
      (this.resolve = async (s) => {
        if (
          (this.isInitialized(),
          this.logger.debug("Updating JSON-RPC response history record"),
          this.logger.trace({ type: "method", method: "update", response: s }),
          !this.records.has(s.id))
        )
          return;
        const o = await this.getRecord(s.id);
        typeof o.response > "u" &&
          ((o.response = Gr(s) ? { error: s.error } : { result: s.result }),
          this.records.set(o.id, o),
          this.events.emit(ri.updated, o));
      }),
      (this.get = async (s, o) => (
        this.isInitialized(),
        this.logger.debug("Getting record"),
        this.logger.trace({ type: "method", method: "get", topic: s, id: o }),
        await this.getRecord(o)
      )),
      (this.delete = (s, o) => {
        this.isInitialized(),
          this.logger.debug("Deleting record"),
          this.logger.trace({ type: "method", method: "delete", id: o }),
          this.values.forEach((c) => {
            if (c.topic === s) {
              if (typeof o < "u" && c.id !== o) return;
              this.records.delete(c.id), this.events.emit(ri.deleted, c);
            }
          });
      }),
      (this.exists = async (s, o) => (
        this.isInitialized(),
        this.records.has(o) ? (await this.getRecord(o)).topic === s : !1
      )),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.logger = Ze.generateChildLogger(r, this.name));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return (
      this.values.forEach((r) => {
        if (typeof r.response < "u") return;
        const s = {
          topic: r.topic,
          request: Jo(r.request.method, r.request.params, r.id),
          chainId: r.chainId,
        };
        return e.push(s);
      }),
      e
    );
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const r = this.records.get(e);
    if (!r) {
      const { message: s } = he("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return r;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(ri.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: r } = he("RESTORE_WILL_OVERRIDE", this.name);
        throw (this.logger.error(r), new Error(r));
      }
      (this.cached = e),
        this.logger.debug(`Successfully Restored records for ${this.name}`),
        this.logger.trace({
          type: "method",
          method: "restore",
          records: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`),
        this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(ri.created, (e) => {
      const r = ri.created;
      this.logger.info(`Emitting ${r}`),
        this.logger.debug({ type: "event", event: r, record: e }),
        this.persist();
    }),
      this.events.on(ri.updated, (e) => {
        const r = ri.updated;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: "event", event: r, record: e }),
          this.persist();
      }),
      this.events.on(ri.deleted, (e) => {
        const r = ri.deleted;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: "event", event: r, record: e }),
          this.persist();
      }),
      this.core.heartbeat.on(Un.HEARTBEAT_EVENTS.pulse, () => {
        this.cleanup();
      });
  }
  cleanup() {
    try {
      this.records.forEach((e) => {
        ye.toMiliseconds(e.expiry || 0) - Date.now() <= 0 &&
          (this.logger.info(`Deleting expired history log: ${e.id}`),
          this.delete(e.topic, e.id));
      });
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class f5 extends i6 {
  constructor(e, r) {
    super(e, r),
      (this.core = e),
      (this.logger = r),
      (this.expirations = new Map()),
      (this.events = new xr.EventEmitter()),
      (this.name = H2),
      (this.version = K2),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = Ri),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace("Initialized"),
          await this.restore(),
          this.cached.forEach((s) => this.expirations.set(s.target, s)),
          (this.cached = []),
          this.registerEventListeners(),
          (this.initialized = !0));
      }),
      (this.has = (s) => {
        try {
          const o = this.formatTarget(s);
          return typeof this.getExpiration(o) < "u";
        } catch {
          return !1;
        }
      }),
      (this.set = (s, o) => {
        this.isInitialized();
        const c = this.formatTarget(s),
          d = { target: c, expiry: o };
        this.expirations.set(c, d),
          this.checkExpiry(c, d),
          this.events.emit(Mr.created, { target: c, expiration: d });
      }),
      (this.get = (s) => {
        this.isInitialized();
        const o = this.formatTarget(s);
        return this.getExpiration(o);
      }),
      (this.del = (s) => {
        if ((this.isInitialized(), this.has(s))) {
          const o = this.formatTarget(s),
            c = this.getExpiration(o);
          this.expirations.delete(o),
            this.events.emit(Mr.deleted, { target: o, expiration: c });
        }
      }),
      (this.on = (s, o) => {
        this.events.on(s, o);
      }),
      (this.once = (s, o) => {
        this.events.once(s, o);
      }),
      (this.off = (s, o) => {
        this.events.off(s, o);
      }),
      (this.removeListener = (s, o) => {
        this.events.removeListener(s, o);
      }),
      (this.logger = Ze.generateChildLogger(r, this.name));
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string") return kE(e);
    if (typeof e == "number") return VE(e);
    const { message: r } = he("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(r);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(Mr.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: r } = he("RESTORE_WILL_OVERRIDE", this.name);
        throw (this.logger.error(r), new Error(r));
      }
      (this.cached = e),
        this.logger.debug(`Successfully Restored expirations for ${this.name}`),
        this.logger.trace({
          type: "method",
          method: "restore",
          expirations: this.values,
        });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`),
        this.logger.error(e);
    }
  }
  getExpiration(e) {
    const r = this.expirations.get(e);
    if (!r) {
      const { message: s } = he("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw (this.logger.error(s), new Error(s));
    }
    return r;
  }
  checkExpiry(e, r) {
    const { expiry: s } = r;
    ye.toMiliseconds(s) - Date.now() <= 0 && this.expire(e, r);
  }
  expire(e, r) {
    this.expirations.delete(e),
      this.events.emit(Mr.expired, { target: e, expiration: r });
  }
  checkExpirations() {
    this.core.relayer.connected &&
      this.expirations.forEach((e, r) => this.checkExpiry(r, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(Un.HEARTBEAT_EVENTS.pulse, () =>
      this.checkExpirations()
    ),
      this.events.on(Mr.created, (e) => {
        const r = Mr.created;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: "event", event: r, data: e }),
          this.persist();
      }),
      this.events.on(Mr.expired, (e) => {
        const r = Mr.expired;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: "event", event: r, data: e }),
          this.persist();
      }),
      this.events.on(Mr.deleted, (e) => {
        const r = Mr.deleted;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: "event", event: r, data: e }),
          this.persist();
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class d5 extends n6 {
  constructor(e, r) {
    super(e, r),
      (this.projectId = e),
      (this.logger = r),
      (this.name = Mc),
      (this.initialized = !1),
      (this.init = async (s) => {
        op() ||
          !Cu() ||
          ((this.verifyUrl = (s == null ? void 0 : s.verifyUrl) || ed),
          await this.createIframe());
      }),
      (this.register = async (s) => {
        var o;
        if ((this.initialized || (await this.init()), !!this.iframe))
          try {
            (o = this.iframe.contentWindow) == null ||
              o.postMessage(s.attestationId, this.verifyUrl),
              this.logger.info(
                `postMessage sent: ${s.attestationId} ${this.verifyUrl}`
              );
          } catch {}
      }),
      (this.resolve = async (s) => {
        var o;
        if (this.isDevEnv) return "";
        this.logger.info(`resolving attestation: ${s.attestationId}`);
        const c = this.startAbortTimer(ye.FIVE_SECONDS),
          d = await fetch(`${this.verifyUrl}/attestation/${s.attestationId}`, {
            signal: this.abortController.signal,
          });
        return (
          clearTimeout(c),
          d.status === 200
            ? (o = await d.json()) == null
              ? void 0
              : o.origin
            : ""
        );
      }),
      (this.createIframe = async () => {
        try {
          await Promise.race([
            new Promise((s, o) => {
              if (document.getElementById(Mc)) return s();
              const c = document.createElement("iframe");
              c.setAttribute("id", Mc),
                c.setAttribute("src", `${this.verifyUrl}/${this.projectId}`),
                (c.style.display = "none"),
                c.addEventListener("load", () => {
                  (this.initialized = !0), s();
                }),
                c.addEventListener("error", (d) => {
                  o(d);
                }),
                document.body.append(c),
                (this.iframe = c);
            }),
            new Promise((s) => {
              setTimeout(
                () => s("iframe load timeout"),
                ye.toMiliseconds(ye.ONE_SECOND / 2)
              );
            }),
          ]);
        } catch (s) {
          this.logger.error(`Verify iframe failed to load: ${this.verifyUrl}`),
            this.logger.error(s);
        }
      }),
      (this.logger = Ze.generateChildLogger(r, this.name)),
      (this.verifyUrl = ed),
      (this.abortController = new AbortController()),
      (this.isDevEnv = Ou() && {}.IS_VITEST);
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  startAbortTimer(e) {
    return setTimeout(() => this.abortController.abort(), ye.toMiliseconds(e));
  }
}
var p5 = Object.defineProperty,
  cd = Object.getOwnPropertySymbols,
  g5 = Object.prototype.hasOwnProperty,
  v5 = Object.prototype.propertyIsEnumerable,
  ud = (i, e, r) =>
    e in i
      ? p5(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  hd = (i, e) => {
    for (var r in e || (e = {})) g5.call(e, r) && ud(i, r, e[r]);
    if (cd) for (var r of cd(e)) v5.call(e, r) && ud(i, r, e[r]);
    return i;
  };
class $u extends J3 {
  constructor(e) {
    super(e),
      (this.protocol = qp),
      (this.version = y2),
      (this.name = Uu),
      (this.events = new xr.EventEmitter()),
      (this.initialized = !1),
      (this.on = (s, o) => this.events.on(s, o)),
      (this.once = (s, o) => this.events.once(s, o)),
      (this.off = (s, o) => this.events.off(s, o)),
      (this.removeListener = (s, o) => this.events.removeListener(s, o)),
      (this.projectId = e == null ? void 0 : e.projectId),
      (this.relayUrl = (e == null ? void 0 : e.relayUrl) || Hp);
    const r =
      typeof (e == null ? void 0 : e.logger) < "u" &&
      typeof (e == null ? void 0 : e.logger) != "string"
        ? e.logger
        : Ze.pino(
            Ze.getDefaultLoggerOptions({
              level: (e == null ? void 0 : e.logger) || _2.logger,
            })
          );
    (this.logger = Ze.generateChildLogger(r, this.name)),
      (this.heartbeat = new Un.HeartBeat()),
      (this.crypto = new V2(
        this,
        this.logger,
        e == null ? void 0 : e.keychain
      )),
      (this.history = new l5(this, this.logger)),
      (this.expirer = new f5(this, this.logger)),
      (this.storage =
        e != null && e.storage
          ? e.storage
          : new q3(hd(hd({}, b2), e == null ? void 0 : e.storageOptions))),
      (this.relayer = new o5({
        core: this,
        logger: this.logger,
        relayUrl: this.relayUrl,
        projectId: this.projectId,
      })),
      (this.pairing = new h5(this, this.logger)),
      (this.verify = new d5(this.projectId || "", this.logger));
  }
  static async init(e) {
    const r = new $u(e);
    await r.initialize();
    const s = await r.crypto.getClientId();
    return await r.storage.setItem(L2, s), r;
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  async start() {
    this.initialized || (await this.initialize());
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(),
        await this.history.init(),
        await this.expirer.init(),
        await this.relayer.init(),
        await this.heartbeat.init(),
        await this.pairing.init(),
        (this.initialized = !0),
        this.logger.info("Core Initialization Success");
    } catch (e) {
      throw (
        (this.logger.warn(
          `Core Initialization Failure at epoch ${Date.now()}`,
          e
        ),
        this.logger.error(e.message),
        e)
      );
    }
  }
}
const y5 = $u,
  Kp = "wc",
  kp = 2,
  Vp = "client",
  Mu = `${Kp}@${kp}:${Vp}:`,
  Bc = {
    name: Vp,
    logger: "error",
    controller: !1,
    relayUrl: "wss://relay.walletconnect.com",
  },
  _5 = "WALLETCONNECT_DEEPLINK_CHOICE",
  b5 = "proposal",
  Wp = "Proposal expired",
  m5 = "session",
  Co = ye.SEVEN_DAYS,
  w5 = "engine",
  fs = {
    wc_sessionPropose: {
      req: { ttl: ye.FIVE_MINUTES, prompt: !0, tag: 1100 },
      res: { ttl: ye.FIVE_MINUTES, prompt: !1, tag: 1101 },
    },
    wc_sessionSettle: {
      req: { ttl: ye.FIVE_MINUTES, prompt: !1, tag: 1102 },
      res: { ttl: ye.FIVE_MINUTES, prompt: !1, tag: 1103 },
    },
    wc_sessionUpdate: {
      req: { ttl: ye.ONE_DAY, prompt: !1, tag: 1104 },
      res: { ttl: ye.ONE_DAY, prompt: !1, tag: 1105 },
    },
    wc_sessionExtend: {
      req: { ttl: ye.ONE_DAY, prompt: !1, tag: 1106 },
      res: { ttl: ye.ONE_DAY, prompt: !1, tag: 1107 },
    },
    wc_sessionRequest: {
      req: { ttl: ye.FIVE_MINUTES, prompt: !0, tag: 1108 },
      res: { ttl: ye.FIVE_MINUTES, prompt: !1, tag: 1109 },
    },
    wc_sessionEvent: {
      req: { ttl: ye.FIVE_MINUTES, prompt: !0, tag: 1110 },
      res: { ttl: ye.FIVE_MINUTES, prompt: !1, tag: 1111 },
    },
    wc_sessionDelete: {
      req: { ttl: ye.ONE_DAY, prompt: !1, tag: 1112 },
      res: { ttl: ye.ONE_DAY, prompt: !1, tag: 1113 },
    },
    wc_sessionPing: {
      req: { ttl: ye.THIRTY_SECONDS, prompt: !1, tag: 1114 },
      res: { ttl: ye.THIRTY_SECONDS, prompt: !1, tag: 1115 },
    },
  },
  qc = { min: ye.FIVE_MINUTES, max: ye.SEVEN_DAYS },
  E5 = "request",
  D5 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest"];
var S5 = Object.defineProperty,
  I5 = Object.defineProperties,
  x5 = Object.getOwnPropertyDescriptors,
  ld = Object.getOwnPropertySymbols,
  O5 = Object.prototype.hasOwnProperty,
  C5 = Object.prototype.propertyIsEnumerable,
  fd = (i, e, r) =>
    e in i
      ? S5(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  $r = (i, e) => {
    for (var r in e || (e = {})) O5.call(e, r) && fd(i, r, e[r]);
    if (ld) for (var r of ld(e)) C5.call(e, r) && fd(i, r, e[r]);
    return i;
  },
  zc = (i, e) => I5(i, x5(e));
class A5 extends o6 {
  constructor(e) {
    super(e),
      (this.name = w5),
      (this.events = new _u()),
      (this.initialized = !1),
      (this.ignoredPayloadTypes = [nn]),
      (this.init = async () => {
        this.initialized ||
          (await this.cleanup(),
          this.registerRelayerEvents(),
          this.registerExpirerEvents(),
          this.client.core.pairing.register({ methods: Object.keys(fs) }),
          (this.initialized = !0));
      }),
      (this.connect = async (r) => {
        this.isInitialized();
        const s = zc($r({}, r), {
          requiredNamespaces: r.requiredNamespaces || {},
          optionalNamespaces: r.optionalNamespaces || {},
        });
        await this.isValidConnect(s);
        const {
          pairingTopic: o,
          requiredNamespaces: c,
          optionalNamespaces: d,
          sessionProperties: f,
          relays: g,
        } = s;
        let w = o,
          D,
          R = !1;
        if (
          (w && (R = this.client.core.pairing.pairings.get(w).active), !w || !R)
        ) {
          const { topic: $, uri: S } = await this.client.core.pairing.create();
          (w = $), (D = S);
        }
        const U = await this.client.core.crypto.generateKeyPair(),
          N = $r(
            {
              requiredNamespaces: c,
              optionalNamespaces: d,
              relays: g ?? [{ protocol: zp }],
              proposer: { publicKey: U, metadata: this.client.metadata },
            },
            f && { sessionProperties: f }
          ),
          { reject: P, resolve: z, done: K } = Cn(ye.FIVE_MINUTES, Wp);
        if (
          (this.events.once(
            Ht("session_connect"),
            async ({ error: $, session: S }) => {
              if ($) P($);
              else if (S) {
                S.self.publicKey = U;
                const C = zc($r({}, S), {
                  requiredNamespaces: S.requiredNamespaces,
                  optionalNamespaces: S.optionalNamespaces,
                });
                await this.client.session.set(S.topic, C),
                  await this.setExpiry(S.topic, S.expiry),
                  w &&
                    (await this.client.core.pairing.updateMetadata({
                      topic: w,
                      metadata: S.peer.metadata,
                    })),
                  z(C);
              }
            }
          ),
          !w)
        ) {
          const { message: $ } = he(
            "NO_MATCHING_KEY",
            `connect() pairing topic: ${w}`
          );
          throw new Error($);
        }
        const ne = await this.sendRequest(w, "wc_sessionPropose", N),
          T = Wr(ye.FIVE_MINUTES);
        return (
          await this.setProposal(ne, $r({ id: ne, expiry: T }, N)),
          { uri: D, approval: K }
        );
      }),
      (this.pair = async (r) => (
        this.isInitialized(), await this.client.core.pairing.pair(r)
      )),
      (this.approve = async (r) => {
        this.isInitialized(), await this.isValidApprove(r);
        const {
            id: s,
            relayProtocol: o,
            namespaces: c,
            sessionProperties: d,
          } = r,
          f = this.client.proposal.get(s);
        let {
          pairingTopic: g,
          proposer: w,
          requiredNamespaces: D,
          optionalNamespaces: R,
        } = f;
        (g = g || ""), Rn(D) || (D = a3(c, "approve()"));
        const U = await this.client.core.crypto.generateKeyPair(),
          N = w.publicKey,
          P = await this.client.core.crypto.generateSharedKey(U, N);
        g &&
          s &&
          (await this.client.core.pairing.updateMetadata({
            topic: g,
            metadata: w.metadata,
          }),
          await this.sendResult(s, g, {
            relay: { protocol: o ?? "irn" },
            responderPublicKey: U,
          }),
          await this.client.proposal.delete(s, Ft("USER_DISCONNECTED")),
          await this.client.core.pairing.activate({ topic: g }));
        const z = $r(
          {
            relay: { protocol: o ?? "irn" },
            namespaces: c,
            requiredNamespaces: D,
            optionalNamespaces: R,
            pairingTopic: g,
            controller: { publicKey: U, metadata: this.client.metadata },
            expiry: Wr(Co),
          },
          d && { sessionProperties: d }
        );
        await this.client.core.relayer.subscribe(P),
          await this.sendRequest(P, "wc_sessionSettle", z);
        const K = zc($r({}, z), {
          topic: P,
          pairingTopic: g,
          acknowledged: !1,
          self: z.controller,
          peer: { publicKey: w.publicKey, metadata: w.metadata },
          controller: U,
        });
        return (
          await this.client.session.set(P, K),
          await this.setExpiry(P, Wr(Co)),
          {
            topic: P,
            acknowledged: () =>
              new Promise((ne) =>
                setTimeout(() => ne(this.client.session.get(P)), 500)
              ),
          }
        );
      }),
      (this.reject = async (r) => {
        this.isInitialized(), await this.isValidReject(r);
        const { id: s, reason: o } = r,
          { pairingTopic: c } = this.client.proposal.get(s);
        c &&
          (await this.sendError(s, c, o),
          await this.client.proposal.delete(s, Ft("USER_DISCONNECTED")));
      }),
      (this.update = async (r) => {
        this.isInitialized(), await this.isValidUpdate(r);
        const { topic: s, namespaces: o } = r,
          c = await this.sendRequest(s, "wc_sessionUpdate", { namespaces: o }),
          { done: d, resolve: f, reject: g } = Cn();
        return (
          this.events.once(Ht("session_update", c), ({ error: w }) => {
            w ? g(w) : f();
          }),
          await this.client.session.update(s, { namespaces: o }),
          { acknowledged: d }
        );
      }),
      (this.extend = async (r) => {
        this.isInitialized(), await this.isValidExtend(r);
        const { topic: s } = r,
          o = await this.sendRequest(s, "wc_sessionExtend", {}),
          { done: c, resolve: d, reject: f } = Cn();
        return (
          this.events.once(Ht("session_extend", o), ({ error: g }) => {
            g ? f(g) : d();
          }),
          await this.setExpiry(s, Wr(Co)),
          { acknowledged: c }
        );
      }),
      (this.request = async (r) => {
        this.isInitialized(), await this.isValidRequest(r);
        const { chainId: s, request: o, topic: c, expiry: d } = r,
          f = await this.sendRequest(
            c,
            "wc_sessionRequest",
            { request: o, chainId: s },
            d
          ),
          { done: g, resolve: w, reject: D } = Cn(d);
        this.events.once(
          Ht("session_request", f),
          ({ error: U, result: N }) => {
            U ? D(U) : w(N);
          }
        ),
          this.client.events.emit("session_request_sent", {
            topic: c,
            request: o,
            chainId: s,
            id: f,
          });
        const R = await this.client.core.storage.getItem(_5);
        return WE({ id: f, topic: c, wcDeepLink: R }), await g();
      }),
      (this.respond = async (r) => {
        this.isInitialized(), await this.isValidRespond(r);
        const { topic: s, response: o } = r,
          { id: c } = o;
        bi(o)
          ? await this.sendResult(c, s, o.result)
          : Gr(o) && (await this.sendError(c, s, o.error)),
          this.deletePendingSessionRequest(r.response.id, {
            message: "fulfilled",
            code: 0,
          });
      }),
      (this.ping = async (r) => {
        this.isInitialized(), await this.isValidPing(r);
        const { topic: s } = r;
        if (this.client.session.keys.includes(s)) {
          const o = await this.sendRequest(s, "wc_sessionPing", {}),
            { done: c, resolve: d, reject: f } = Cn();
          this.events.once(Ht("session_ping", o), ({ error: g }) => {
            g ? f(g) : d();
          }),
            await c();
        } else
          this.client.core.pairing.pairings.keys.includes(s) &&
            (await this.client.core.pairing.ping({ topic: s }));
      }),
      (this.emit = async (r) => {
        this.isInitialized(), await this.isValidEmit(r);
        const { topic: s, event: o, chainId: c } = r;
        await this.sendRequest(s, "wc_sessionEvent", { event: o, chainId: c });
      }),
      (this.disconnect = async (r) => {
        this.isInitialized(), await this.isValidDisconnect(r);
        const { topic: s } = r;
        if (this.client.session.keys.includes(s)) {
          const o = Nu().toString();
          let c;
          const d = (f) => {
            (f == null ? void 0 : f.id.toString()) === o &&
              (this.client.core.relayer.events.removeListener(
                At.message_ack,
                d
              ),
              c());
          };
          await Promise.all([
            new Promise((f) => {
              (c = f), this.client.core.relayer.on(At.message_ack, d);
            }),
            this.sendRequest(
              s,
              "wc_sessionDelete",
              Ft("USER_DISCONNECTED"),
              void 0,
              o
            ),
          ]),
            await this.deleteSession(s);
        } else await this.client.core.pairing.disconnect({ topic: s });
      }),
      (this.find = (r) => (
        this.isInitialized(),
        this.client.session.getAll().filter((s) => h3(s, r))
      )),
      (this.getPendingSessionRequests = () => (
        this.isInitialized(), this.client.pendingRequest.getAll()
      )),
      (this.cleanupDuplicatePairings = async (r) => {
        if (r.pairingTopic)
          try {
            const s = this.client.core.pairing.pairings.get(r.pairingTopic),
              o = this.client.core.pairing.pairings.getAll().filter((c) => {
                var d, f;
                return (
                  ((d = c.peerMetadata) == null ? void 0 : d.url) &&
                  ((f = c.peerMetadata) == null ? void 0 : f.url) ===
                    r.peer.metadata.url &&
                  c.topic &&
                  c.topic !== s.topic
                );
              });
            if (o.length === 0) return;
            this.client.logger.info(
              `Cleaning up ${o.length} duplicate pairing(s)`
            ),
              await Promise.all(
                o.map((c) =>
                  this.client.core.pairing.disconnect({ topic: c.topic })
                )
              ),
              this.client.logger.info("Duplicate pairings clean up finished");
          } catch (s) {
            this.client.logger.error(s);
          }
      }),
      (this.deleteSession = async (r, s) => {
        const { self: o } = this.client.session.get(r);
        await this.client.core.relayer.unsubscribe(r),
          this.client.session.delete(r, Ft("USER_DISCONNECTED")),
          this.client.core.crypto.keychain.has(o.publicKey) &&
            (await this.client.core.crypto.deleteKeyPair(o.publicKey)),
          this.client.core.crypto.keychain.has(r) &&
            (await this.client.core.crypto.deleteSymKey(r)),
          s || this.client.core.expirer.del(r);
      }),
      (this.deleteProposal = async (r, s) => {
        await Promise.all([
          this.client.proposal.delete(r, Ft("USER_DISCONNECTED")),
          s ? Promise.resolve() : this.client.core.expirer.del(r),
        ]);
      }),
      (this.deletePendingSessionRequest = async (r, s, o = !1) => {
        await Promise.all([
          this.client.pendingRequest.delete(r, s),
          o ? Promise.resolve() : this.client.core.expirer.del(r),
        ]);
      }),
      (this.setExpiry = async (r, s) => {
        this.client.session.keys.includes(r) &&
          (await this.client.session.update(r, { expiry: s })),
          this.client.core.expirer.set(r, s);
      }),
      (this.setProposal = async (r, s) => {
        await this.client.proposal.set(r, s),
          this.client.core.expirer.set(r, s.expiry);
      }),
      (this.setPendingSessionRequest = async (r) => {
        const s = fs.wc_sessionRequest.req.ttl,
          { id: o, topic: c, params: d } = r;
        await this.client.pendingRequest.set(o, { id: o, topic: c, params: d }),
          s && this.client.core.expirer.set(o, Wr(s));
      }),
      (this.sendRequest = async (r, s, o, c, d) => {
        const f = Jo(s, o);
        if (Cu() && D5.includes(s)) {
          const D = Tn(JSON.stringify(f));
          await this.client.core.verify.register({ attestationId: D });
        }
        const g = await this.client.core.crypto.encode(r, f),
          w = fs[s].req;
        return (
          c && (w.ttl = c),
          d && (w.id = d),
          this.client.core.history.set(r, f),
          this.client.core.relayer.publish(r, g, w),
          f.id
        );
      }),
      (this.sendResult = async (r, s, o) => {
        const c = Fu(r, o),
          d = await this.client.core.crypto.encode(s, c),
          f = await this.client.core.history.get(s, r),
          g = fs[f.request.method].res;
        this.client.core.relayer.publish(s, d, g),
          await this.client.core.history.resolve(c);
      }),
      (this.sendError = async (r, s, o) => {
        const c = Xo(r, o),
          d = await this.client.core.crypto.encode(s, c),
          f = await this.client.core.history.get(s, r),
          g = fs[f.request.method].res;
        this.client.core.relayer.publish(s, d, g),
          await this.client.core.history.resolve(c);
      }),
      (this.cleanup = async () => {
        const r = [],
          s = [];
        this.client.session.getAll().forEach((o) => {
          Ti(o.expiry) && r.push(o.topic);
        }),
          this.client.proposal.getAll().forEach((o) => {
            Ti(o.expiry) && s.push(o.id);
          }),
          await Promise.all([
            ...r.map((o) => this.deleteSession(o)),
            ...s.map((o) => this.deleteProposal(o)),
          ]);
      }),
      (this.onRelayEventRequest = (r) => {
        const { topic: s, payload: o } = r,
          c = o.method;
        switch (c) {
          case "wc_sessionPropose":
            return this.onSessionProposeRequest(s, o);
          case "wc_sessionSettle":
            return this.onSessionSettleRequest(s, o);
          case "wc_sessionUpdate":
            return this.onSessionUpdateRequest(s, o);
          case "wc_sessionExtend":
            return this.onSessionExtendRequest(s, o);
          case "wc_sessionPing":
            return this.onSessionPingRequest(s, o);
          case "wc_sessionDelete":
            return this.onSessionDeleteRequest(s, o);
          case "wc_sessionRequest":
            return this.onSessionRequest(s, o);
          case "wc_sessionEvent":
            return this.onSessionEventRequest(s, o);
          default:
            return this.client.logger.info(`Unsupported request method ${c}`);
        }
      }),
      (this.onRelayEventResponse = async (r) => {
        const { topic: s, payload: o } = r,
          c = (await this.client.core.history.get(s, o.id)).request.method;
        switch (c) {
          case "wc_sessionPropose":
            return this.onSessionProposeResponse(s, o);
          case "wc_sessionSettle":
            return this.onSessionSettleResponse(s, o);
          case "wc_sessionUpdate":
            return this.onSessionUpdateResponse(s, o);
          case "wc_sessionExtend":
            return this.onSessionExtendResponse(s, o);
          case "wc_sessionPing":
            return this.onSessionPingResponse(s, o);
          case "wc_sessionRequest":
            return this.onSessionRequestResponse(s, o);
          default:
            return this.client.logger.info(`Unsupported response method ${c}`);
        }
      }),
      (this.onRelayEventUnknownPayload = (r) => {
        const { topic: s } = r,
          { message: o } = he(
            "MISSING_OR_INVALID",
            `Decoded payload on topic ${s} is not identifiable as a JSON-RPC request or a response.`
          );
        throw new Error(o);
      }),
      (this.onSessionProposeRequest = async (r, s) => {
        const { params: o, id: c } = s;
        try {
          this.isValidConnect($r({}, s.params));
          const d = Wr(ye.FIVE_MINUTES),
            f = $r({ id: c, pairingTopic: r, expiry: d }, o);
          await this.setProposal(c, f);
          const g = Tn(JSON.stringify(s)),
            w = await this.getVerifyContext(g, f.proposer.metadata);
          this.client.events.emit("session_proposal", {
            id: c,
            params: f,
            verifyContext: w,
          });
        } catch (d) {
          await this.sendError(c, r, d), this.client.logger.error(d);
        }
      }),
      (this.onSessionProposeResponse = async (r, s) => {
        const { id: o } = s;
        if (bi(s)) {
          const { result: c } = s;
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            result: c,
          });
          const d = this.client.proposal.get(o);
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            proposal: d,
          });
          const f = d.proposer.publicKey;
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            selfPublicKey: f,
          });
          const g = c.responderPublicKey;
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            peerPublicKey: g,
          });
          const w = await this.client.core.crypto.generateSharedKey(f, g);
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            sessionTopic: w,
          });
          const D = await this.client.core.relayer.subscribe(w);
          this.client.logger.trace({
            type: "method",
            method: "onSessionProposeResponse",
            subscriptionId: D,
          }),
            await this.client.core.pairing.activate({ topic: r });
        } else
          Gr(s) &&
            (await this.client.proposal.delete(o, Ft("USER_DISCONNECTED")),
            this.events.emit(Ht("session_connect"), { error: s.error }));
      }),
      (this.onSessionSettleRequest = async (r, s) => {
        const { id: o, params: c } = s;
        try {
          this.isValidSessionSettleRequest(c);
          const {
              relay: d,
              controller: f,
              expiry: g,
              namespaces: w,
              requiredNamespaces: D,
              optionalNamespaces: R,
              sessionProperties: U,
              pairingTopic: N,
            } = s.params,
            P = $r(
              {
                topic: r,
                relay: d,
                expiry: g,
                namespaces: w,
                acknowledged: !0,
                pairingTopic: N,
                requiredNamespaces: D,
                optionalNamespaces: R,
                controller: f.publicKey,
                self: { publicKey: "", metadata: this.client.metadata },
                peer: { publicKey: f.publicKey, metadata: f.metadata },
              },
              U && { sessionProperties: U }
            );
          await this.sendResult(s.id, r, !0),
            this.events.emit(Ht("session_connect"), { session: P }),
            this.cleanupDuplicatePairings(P);
        } catch (d) {
          await this.sendError(o, r, d), this.client.logger.error(d);
        }
      }),
      (this.onSessionSettleResponse = async (r, s) => {
        const { id: o } = s;
        bi(s)
          ? (await this.client.session.update(r, { acknowledged: !0 }),
            this.events.emit(Ht("session_approve", o), {}))
          : Gr(s) &&
            (await this.client.session.delete(r, Ft("USER_DISCONNECTED")),
            this.events.emit(Ht("session_approve", o), { error: s.error }));
      }),
      (this.onSessionUpdateRequest = async (r, s) => {
        const { params: o, id: c } = s;
        try {
          this.isValidUpdate($r({ topic: r }, o)),
            await this.client.session.update(r, { namespaces: o.namespaces }),
            await this.sendResult(c, r, !0),
            this.client.events.emit("session_update", {
              id: c,
              topic: r,
              params: o,
            });
        } catch (d) {
          await this.sendError(c, r, d), this.client.logger.error(d);
        }
      }),
      (this.onSessionUpdateResponse = (r, s) => {
        const { id: o } = s;
        bi(s)
          ? this.events.emit(Ht("session_update", o), {})
          : Gr(s) &&
            this.events.emit(Ht("session_update", o), { error: s.error });
      }),
      (this.onSessionExtendRequest = async (r, s) => {
        const { id: o } = s;
        try {
          this.isValidExtend({ topic: r }),
            await this.setExpiry(r, Wr(Co)),
            await this.sendResult(o, r, !0),
            this.client.events.emit("session_extend", { id: o, topic: r });
        } catch (c) {
          await this.sendError(o, r, c), this.client.logger.error(c);
        }
      }),
      (this.onSessionExtendResponse = (r, s) => {
        const { id: o } = s;
        bi(s)
          ? this.events.emit(Ht("session_extend", o), {})
          : Gr(s) &&
            this.events.emit(Ht("session_extend", o), { error: s.error });
      }),
      (this.onSessionPingRequest = async (r, s) => {
        const { id: o } = s;
        try {
          this.isValidPing({ topic: r }),
            await this.sendResult(o, r, !0),
            this.client.events.emit("session_ping", { id: o, topic: r });
        } catch (c) {
          await this.sendError(o, r, c), this.client.logger.error(c);
        }
      }),
      (this.onSessionPingResponse = (r, s) => {
        const { id: o } = s;
        setTimeout(() => {
          bi(s)
            ? this.events.emit(Ht("session_ping", o), {})
            : Gr(s) &&
              this.events.emit(Ht("session_ping", o), { error: s.error });
        }, 500);
      }),
      (this.onSessionDeleteRequest = async (r, s) => {
        const { id: o } = s;
        try {
          this.isValidDisconnect({ topic: r, reason: s.params }),
            await Promise.all([
              new Promise((c) => {
                this.client.core.relayer.once(At.publish, async () => {
                  c(await this.deleteSession(r));
                });
              }),
              this.sendResult(o, r, !0),
            ]),
            this.client.events.emit("session_delete", { id: o, topic: r });
        } catch (c) {
          this.client.logger.error(c);
        }
      }),
      (this.onSessionRequest = async (r, s) => {
        const { id: o, params: c } = s;
        try {
          this.isValidRequest($r({ topic: r }, c)),
            await this.setPendingSessionRequest({ id: o, topic: r, params: c });
          const d = Tn(JSON.stringify(s)),
            f = this.client.session.get(r),
            g = await this.getVerifyContext(d, f.peer.metadata);
          this.client.events.emit("session_request", {
            id: o,
            topic: r,
            params: c,
            verifyContext: g,
          });
        } catch (d) {
          await this.sendError(o, r, d), this.client.logger.error(d);
        }
      }),
      (this.onSessionRequestResponse = (r, s) => {
        const { id: o } = s;
        bi(s)
          ? this.events.emit(Ht("session_request", o), { result: s.result })
          : Gr(s) &&
            this.events.emit(Ht("session_request", o), { error: s.error });
      }),
      (this.onSessionEventRequest = async (r, s) => {
        const { id: o, params: c } = s;
        try {
          this.isValidEmit($r({ topic: r }, c)),
            this.client.events.emit("session_event", {
              id: o,
              topic: r,
              params: c,
            });
        } catch (d) {
          await this.sendError(o, r, d), this.client.logger.error(d);
        }
      }),
      (this.isValidConnect = async (r) => {
        if (!yr(r)) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `connect() params: ${JSON.stringify(r)}`
          );
          throw new Error(g);
        }
        const {
          pairingTopic: s,
          requiredNamespaces: o,
          optionalNamespaces: c,
          sessionProperties: d,
          relays: f,
        } = r;
        if ((cr(s) || (await this.isValidPairingTopic(s)), !E3(f, !0))) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `connect() relays: ${f}`
          );
          throw new Error(g);
        }
        !cr(o) &&
          Rn(o) !== 0 &&
          this.validateNamespaces(o, "requiredNamespaces"),
          !cr(c) &&
            Rn(c) !== 0 &&
            this.validateNamespaces(c, "optionalNamespaces"),
          cr(d) || this.validateSessionProps(d, "sessionProperties");
      }),
      (this.validateNamespaces = (r, s) => {
        const o = w3(r, "connect()", s);
        if (o) throw new Error(o.message);
      }),
      (this.isValidApprove = async (r) => {
        if (!yr(r))
          throw new Error(
            he("MISSING_OR_INVALID", `approve() params: ${r}`).message
          );
        const {
          id: s,
          namespaces: o,
          relayProtocol: c,
          sessionProperties: d,
        } = r;
        await this.isValidProposalId(s);
        const f = this.client.proposal.get(s),
          g = Fo(o, "approve()");
        if (g) throw new Error(g.message);
        const w = mf(f.requiredNamespaces, o, "approve()");
        if (w) throw new Error(w.message);
        if (!Gt(c, !0)) {
          const { message: D } = he(
            "MISSING_OR_INVALID",
            `approve() relayProtocol: ${c}`
          );
          throw new Error(D);
        }
        cr(d) || this.validateSessionProps(d, "sessionProperties");
      }),
      (this.isValidReject = async (r) => {
        if (!yr(r)) {
          const { message: c } = he(
            "MISSING_OR_INVALID",
            `reject() params: ${r}`
          );
          throw new Error(c);
        }
        const { id: s, reason: o } = r;
        if ((await this.isValidProposalId(s), !S3(o))) {
          const { message: c } = he(
            "MISSING_OR_INVALID",
            `reject() reason: ${JSON.stringify(o)}`
          );
          throw new Error(c);
        }
      }),
      (this.isValidSessionSettleRequest = (r) => {
        if (!yr(r)) {
          const { message: w } = he(
            "MISSING_OR_INVALID",
            `onSessionSettleRequest() params: ${r}`
          );
          throw new Error(w);
        }
        const { relay: s, controller: o, namespaces: c, expiry: d } = r;
        if (!pp(s)) {
          const { message: w } = he(
            "MISSING_OR_INVALID",
            "onSessionSettleRequest() relay protocol should be a string"
          );
          throw new Error(w);
        }
        const f = g3(o, "onSessionSettleRequest()");
        if (f) throw new Error(f.message);
        const g = Fo(c, "onSessionSettleRequest()");
        if (g) throw new Error(g.message);
        if (Ti(d)) {
          const { message: w } = he("EXPIRED", "onSessionSettleRequest()");
          throw new Error(w);
        }
      }),
      (this.isValidUpdate = async (r) => {
        if (!yr(r)) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `update() params: ${r}`
          );
          throw new Error(g);
        }
        const { topic: s, namespaces: o } = r;
        await this.isValidSessionTopic(s);
        const c = this.client.session.get(s),
          d = Fo(o, "update()");
        if (d) throw new Error(d.message);
        const f = mf(c.requiredNamespaces, o, "update()");
        if (f) throw new Error(f.message);
      }),
      (this.isValidExtend = async (r) => {
        if (!yr(r)) {
          const { message: o } = he(
            "MISSING_OR_INVALID",
            `extend() params: ${r}`
          );
          throw new Error(o);
        }
        const { topic: s } = r;
        await this.isValidSessionTopic(s);
      }),
      (this.isValidRequest = async (r) => {
        if (!yr(r)) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `request() params: ${r}`
          );
          throw new Error(g);
        }
        const { topic: s, request: o, chainId: c, expiry: d } = r;
        await this.isValidSessionTopic(s);
        const { namespaces: f } = this.client.session.get(s);
        if (!bf(f, c)) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `request() chainId: ${c}`
          );
          throw new Error(g);
        }
        if (!I3(o)) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `request() ${JSON.stringify(o)}`
          );
          throw new Error(g);
        }
        if (!C3(f, c, o.method)) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `request() method: ${o.method}`
          );
          throw new Error(g);
        }
        if (d && !R3(d, qc)) {
          const { message: g } = he(
            "MISSING_OR_INVALID",
            `request() expiry: ${d}. Expiry must be a number (in seconds) between ${qc.min} and ${qc.max}`
          );
          throw new Error(g);
        }
      }),
      (this.isValidRespond = async (r) => {
        if (!yr(r)) {
          const { message: c } = he(
            "MISSING_OR_INVALID",
            `respond() params: ${r}`
          );
          throw new Error(c);
        }
        const { topic: s, response: o } = r;
        if ((await this.isValidSessionTopic(s), !x3(o))) {
          const { message: c } = he(
            "MISSING_OR_INVALID",
            `respond() response: ${JSON.stringify(o)}`
          );
          throw new Error(c);
        }
      }),
      (this.isValidPing = async (r) => {
        if (!yr(r)) {
          const { message: o } = he(
            "MISSING_OR_INVALID",
            `ping() params: ${r}`
          );
          throw new Error(o);
        }
        const { topic: s } = r;
        await this.isValidSessionOrPairingTopic(s);
      }),
      (this.isValidEmit = async (r) => {
        if (!yr(r)) {
          const { message: f } = he(
            "MISSING_OR_INVALID",
            `emit() params: ${r}`
          );
          throw new Error(f);
        }
        const { topic: s, event: o, chainId: c } = r;
        await this.isValidSessionTopic(s);
        const { namespaces: d } = this.client.session.get(s);
        if (!bf(d, c)) {
          const { message: f } = he(
            "MISSING_OR_INVALID",
            `emit() chainId: ${c}`
          );
          throw new Error(f);
        }
        if (!O3(o)) {
          const { message: f } = he(
            "MISSING_OR_INVALID",
            `emit() event: ${JSON.stringify(o)}`
          );
          throw new Error(f);
        }
        if (!A3(d, c, o.name)) {
          const { message: f } = he(
            "MISSING_OR_INVALID",
            `emit() event: ${JSON.stringify(o)}`
          );
          throw new Error(f);
        }
      }),
      (this.isValidDisconnect = async (r) => {
        if (!yr(r)) {
          const { message: o } = he(
            "MISSING_OR_INVALID",
            `disconnect() params: ${r}`
          );
          throw new Error(o);
        }
        const { topic: s } = r;
        await this.isValidSessionOrPairingTopic(s);
      }),
      (this.getVerifyContext = async (r, s) => {
        const o = {
          verified: {
            verifyUrl: s.verifyUrl || "",
            validation: "UNKNOWN",
            origin: s.url || "",
          },
        };
        try {
          const c = await this.client.core.verify.resolve({
            attestationId: r,
            verifyUrl: s.verifyUrl,
          });
          c &&
            ((o.verified.origin = c),
            (o.verified.validation = c === s.url ? "VALID" : "INVALID"));
        } catch (c) {
          this.client.logger.error(c);
        }
        return (
          this.client.logger.info(`Verify context: ${JSON.stringify(o)}`), o
        );
      }),
      (this.validateSessionProps = (r, s) => {
        Object.values(r).forEach((o) => {
          if (!Gt(o, !1)) {
            const { message: c } = he(
              "MISSING_OR_INVALID",
              `${s} must be in Record<string, string> format. Received: ${JSON.stringify(
                o
              )}`
            );
            throw new Error(c);
          }
        });
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = he("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(At.message, async (e) => {
      const { topic: r, message: s } = e;
      if (
        this.ignoredPayloadTypes.includes(
          this.client.core.crypto.getPayloadType(s)
        )
      )
        return;
      const o = await this.client.core.crypto.decode(r, s);
      Lu(o)
        ? (this.client.core.history.set(r, o),
          this.onRelayEventRequest({ topic: r, payload: o }))
        : Qo(o)
        ? (await this.client.core.history.resolve(o),
          await this.onRelayEventResponse({ topic: r, payload: o }),
          this.client.core.history.delete(r, o.id))
        : this.onRelayEventUnknownPayload({ topic: r, payload: o });
    });
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(Mr.expired, async (e) => {
      const { topic: r, id: s } = lp(e.target);
      if (s && this.client.pendingRequest.keys.includes(s))
        return await this.deletePendingSessionRequest(s, he("EXPIRED"), !0);
      r
        ? this.client.session.keys.includes(r) &&
          (await this.deleteSession(r, !0),
          this.client.events.emit("session_expire", { topic: r }))
        : s &&
          (await this.deleteProposal(s, !0),
          this.client.events.emit("proposal_expire", { id: s }));
    });
  }
  isValidPairingTopic(e) {
    if (!Gt(e, !1)) {
      const { message: r } = he(
        "MISSING_OR_INVALID",
        `pairing topic should be a string: ${e}`
      );
      throw new Error(r);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: r } = he(
        "NO_MATCHING_KEY",
        `pairing topic doesn't exist: ${e}`
      );
      throw new Error(r);
    }
    if (Ti(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: r } = he("EXPIRED", `pairing topic: ${e}`);
      throw new Error(r);
    }
  }
  async isValidSessionTopic(e) {
    if (!Gt(e, !1)) {
      const { message: r } = he(
        "MISSING_OR_INVALID",
        `session topic should be a string: ${e}`
      );
      throw new Error(r);
    }
    if (!this.client.session.keys.includes(e)) {
      const { message: r } = he(
        "NO_MATCHING_KEY",
        `session topic doesn't exist: ${e}`
      );
      throw new Error(r);
    }
    if (Ti(this.client.session.get(e).expiry)) {
      await this.deleteSession(e);
      const { message: r } = he("EXPIRED", `session topic: ${e}`);
      throw new Error(r);
    }
  }
  async isValidSessionOrPairingTopic(e) {
    if (this.client.session.keys.includes(e)) await this.isValidSessionTopic(e);
    else if (this.client.core.pairing.pairings.keys.includes(e))
      this.isValidPairingTopic(e);
    else if (Gt(e, !1)) {
      const { message: r } = he(
        "NO_MATCHING_KEY",
        `session or pairing topic doesn't exist: ${e}`
      );
      throw new Error(r);
    } else {
      const { message: r } = he(
        "MISSING_OR_INVALID",
        `session or pairing topic should be a string: ${e}`
      );
      throw new Error(r);
    }
  }
  async isValidProposalId(e) {
    if (!D3(e)) {
      const { message: r } = he(
        "MISSING_OR_INVALID",
        `proposal id should be a number: ${e}`
      );
      throw new Error(r);
    }
    if (!this.client.proposal.keys.includes(e)) {
      const { message: r } = he(
        "NO_MATCHING_KEY",
        `proposal id doesn't exist: ${e}`
      );
      throw new Error(r);
    }
    if (Ti(this.client.proposal.get(e).expiry)) {
      await this.deleteProposal(e);
      const { message: r } = he("EXPIRED", `proposal id: ${e}`);
      throw new Error(r);
    }
  }
}
class P5 extends ea {
  constructor(e, r) {
    super(e, r, b5, Mu), (this.core = e), (this.logger = r);
  }
}
class T5 extends ea {
  constructor(e, r) {
    super(e, r, m5, Mu), (this.core = e), (this.logger = r);
  }
}
class R5 extends ea {
  constructor(e, r) {
    super(e, r, E5, Mu, (s) => s.id), (this.core = e), (this.logger = r);
  }
}
class ju extends s6 {
  constructor(e) {
    super(e),
      (this.protocol = Kp),
      (this.version = kp),
      (this.name = Bc.name),
      (this.events = new xr.EventEmitter()),
      (this.on = (s, o) => this.events.on(s, o)),
      (this.once = (s, o) => this.events.once(s, o)),
      (this.off = (s, o) => this.events.off(s, o)),
      (this.removeListener = (s, o) => this.events.removeListener(s, o)),
      (this.removeAllListeners = (s) => this.events.removeAllListeners(s)),
      (this.connect = async (s) => {
        try {
          return await this.engine.connect(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.pair = async (s) => {
        try {
          return await this.engine.pair(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.approve = async (s) => {
        try {
          return await this.engine.approve(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.reject = async (s) => {
        try {
          return await this.engine.reject(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.update = async (s) => {
        try {
          return await this.engine.update(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.extend = async (s) => {
        try {
          return await this.engine.extend(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.request = async (s) => {
        try {
          return await this.engine.request(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.respond = async (s) => {
        try {
          return await this.engine.respond(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.ping = async (s) => {
        try {
          return await this.engine.ping(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.emit = async (s) => {
        try {
          return await this.engine.emit(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.disconnect = async (s) => {
        try {
          return await this.engine.disconnect(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.find = (s) => {
        try {
          return this.engine.find(s);
        } catch (o) {
          throw (this.logger.error(o.message), o);
        }
      }),
      (this.getPendingSessionRequests = () => {
        try {
          return this.engine.getPendingSessionRequests();
        } catch (s) {
          throw (this.logger.error(s.message), s);
        }
      }),
      (this.name = (e == null ? void 0 : e.name) || Bc.name),
      (this.metadata = (e == null ? void 0 : e.metadata) || BE());
    const r =
      typeof (e == null ? void 0 : e.logger) < "u" &&
      typeof (e == null ? void 0 : e.logger) != "string"
        ? e.logger
        : Ze.pino(
            Ze.getDefaultLoggerOptions({
              level: (e == null ? void 0 : e.logger) || Bc.logger,
            })
          );
    (this.core = (e == null ? void 0 : e.core) || new y5(e)),
      (this.logger = Ze.generateChildLogger(r, this.name)),
      (this.session = new T5(this.core, this.logger)),
      (this.proposal = new P5(this.core, this.logger)),
      (this.pendingRequest = new R5(this.core, this.logger)),
      (this.engine = new A5(this));
  }
  static async init(e) {
    const r = new ju(e);
    return await r.initialize(), r;
  }
  get context() {
    return Ze.getLoggerContext(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(),
        await this.session.init(),
        await this.proposal.init(),
        await this.pendingRequest.init(),
        await this.engine.init(),
        this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }),
        this.logger.info("SignClient Initialization Success");
    } catch (e) {
      throw (
        (this.logger.info("SignClient Initialization Failure"),
        this.logger.error(e.message),
        e)
      );
    }
  }
}
var uu = { exports: {} };
(function (i, e) {
  var r = typeof self < "u" ? self : _r,
    s = (function () {
      function c() {
        (this.fetch = !1), (this.DOMException = r.DOMException);
      }
      return (c.prototype = r), new c();
    })();
  (function (c) {
    (function (d) {
      var f = {
        searchParams: "URLSearchParams" in c,
        iterable: "Symbol" in c && "iterator" in Symbol,
        blob:
          "FileReader" in c &&
          "Blob" in c &&
          (function () {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          })(),
        formData: "FormData" in c,
        arrayBuffer: "ArrayBuffer" in c,
      };
      function g(b) {
        return b && DataView.prototype.isPrototypeOf(b);
      }
      if (f.arrayBuffer)
        var w = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]",
          ],
          D =
            ArrayBuffer.isView ||
            function (b) {
              return b && w.indexOf(Object.prototype.toString.call(b)) > -1;
            };
      function R(b) {
        if (
          (typeof b != "string" && (b = String(b)),
          /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(b))
        )
          throw new TypeError("Invalid character in header field name");
        return b.toLowerCase();
      }
      function U(b) {
        return typeof b != "string" && (b = String(b)), b;
      }
      function N(b) {
        var x = {
          next: function () {
            var ee = b.shift();
            return { done: ee === void 0, value: ee };
          },
        };
        return (
          f.iterable &&
            (x[Symbol.iterator] = function () {
              return x;
            }),
          x
        );
      }
      function P(b) {
        (this.map = {}),
          b instanceof P
            ? b.forEach(function (x, ee) {
                this.append(ee, x);
              }, this)
            : Array.isArray(b)
            ? b.forEach(function (x) {
                this.append(x[0], x[1]);
              }, this)
            : b &&
              Object.getOwnPropertyNames(b).forEach(function (x) {
                this.append(x, b[x]);
              }, this);
      }
      (P.prototype.append = function (b, x) {
        (b = R(b)), (x = U(x));
        var ee = this.map[b];
        this.map[b] = ee ? ee + ", " + x : x;
      }),
        (P.prototype.delete = function (b) {
          delete this.map[R(b)];
        }),
        (P.prototype.get = function (b) {
          return (b = R(b)), this.has(b) ? this.map[b] : null;
        }),
        (P.prototype.has = function (b) {
          return this.map.hasOwnProperty(R(b));
        }),
        (P.prototype.set = function (b, x) {
          this.map[R(b)] = U(x);
        }),
        (P.prototype.forEach = function (b, x) {
          for (var ee in this.map)
            this.map.hasOwnProperty(ee) && b.call(x, this.map[ee], ee, this);
        }),
        (P.prototype.keys = function () {
          var b = [];
          return (
            this.forEach(function (x, ee) {
              b.push(ee);
            }),
            N(b)
          );
        }),
        (P.prototype.values = function () {
          var b = [];
          return (
            this.forEach(function (x) {
              b.push(x);
            }),
            N(b)
          );
        }),
        (P.prototype.entries = function () {
          var b = [];
          return (
            this.forEach(function (x, ee) {
              b.push([ee, x]);
            }),
            N(b)
          );
        }),
        f.iterable && (P.prototype[Symbol.iterator] = P.prototype.entries);
      function z(b) {
        if (b.bodyUsed) return Promise.reject(new TypeError("Already read"));
        b.bodyUsed = !0;
      }
      function K(b) {
        return new Promise(function (x, ee) {
          (b.onload = function () {
            x(b.result);
          }),
            (b.onerror = function () {
              ee(b.error);
            });
        });
      }
      function ne(b) {
        var x = new FileReader(),
          ee = K(x);
        return x.readAsArrayBuffer(b), ee;
      }
      function T(b) {
        var x = new FileReader(),
          ee = K(x);
        return x.readAsText(b), ee;
      }
      function $(b) {
        for (
          var x = new Uint8Array(b), ee = new Array(x.length), X = 0;
          X < x.length;
          X++
        )
          ee[X] = String.fromCharCode(x[X]);
        return ee.join("");
      }
      function S(b) {
        if (b.slice) return b.slice(0);
        var x = new Uint8Array(b.byteLength);
        return x.set(new Uint8Array(b)), x.buffer;
      }
      function C() {
        return (
          (this.bodyUsed = !1),
          (this._initBody = function (b) {
            (this._bodyInit = b),
              b
                ? typeof b == "string"
                  ? (this._bodyText = b)
                  : f.blob && Blob.prototype.isPrototypeOf(b)
                  ? (this._bodyBlob = b)
                  : f.formData && FormData.prototype.isPrototypeOf(b)
                  ? (this._bodyFormData = b)
                  : f.searchParams && URLSearchParams.prototype.isPrototypeOf(b)
                  ? (this._bodyText = b.toString())
                  : f.arrayBuffer && f.blob && g(b)
                  ? ((this._bodyArrayBuffer = S(b.buffer)),
                    (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                  : f.arrayBuffer &&
                    (ArrayBuffer.prototype.isPrototypeOf(b) || D(b))
                  ? (this._bodyArrayBuffer = S(b))
                  : (this._bodyText = b = Object.prototype.toString.call(b))
                : (this._bodyText = ""),
              this.headers.get("content-type") ||
                (typeof b == "string"
                  ? this.headers.set("content-type", "text/plain;charset=UTF-8")
                  : this._bodyBlob && this._bodyBlob.type
                  ? this.headers.set("content-type", this._bodyBlob.type)
                  : f.searchParams &&
                    URLSearchParams.prototype.isPrototypeOf(b) &&
                    this.headers.set(
                      "content-type",
                      "application/x-www-form-urlencoded;charset=UTF-8"
                    ));
          }),
          f.blob &&
            ((this.blob = function () {
              var b = z(this);
              if (b) return b;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer)
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData)
                throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]));
            }),
            (this.arrayBuffer = function () {
              return this._bodyArrayBuffer
                ? z(this) || Promise.resolve(this._bodyArrayBuffer)
                : this.blob().then(ne);
            })),
          (this.text = function () {
            var b = z(this);
            if (b) return b;
            if (this._bodyBlob) return T(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve($(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }),
          f.formData &&
            (this.formData = function () {
              return this.text().then(W);
            }),
          (this.json = function () {
            return this.text().then(JSON.parse);
          }),
          this
        );
      }
      var m = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function u(b) {
        var x = b.toUpperCase();
        return m.indexOf(x) > -1 ? x : b;
      }
      function _(b, x) {
        x = x || {};
        var ee = x.body;
        if (b instanceof _) {
          if (b.bodyUsed) throw new TypeError("Already read");
          (this.url = b.url),
            (this.credentials = b.credentials),
            x.headers || (this.headers = new P(b.headers)),
            (this.method = b.method),
            (this.mode = b.mode),
            (this.signal = b.signal),
            !ee &&
              b._bodyInit != null &&
              ((ee = b._bodyInit), (b.bodyUsed = !0));
        } else this.url = String(b);
        if (
          ((this.credentials =
            x.credentials || this.credentials || "same-origin"),
          (x.headers || !this.headers) && (this.headers = new P(x.headers)),
          (this.method = u(x.method || this.method || "GET")),
          (this.mode = x.mode || this.mode || null),
          (this.signal = x.signal || this.signal),
          (this.referrer = null),
          (this.method === "GET" || this.method === "HEAD") && ee)
        )
          throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(ee);
      }
      _.prototype.clone = function () {
        return new _(this, { body: this._bodyInit });
      };
      function W(b) {
        var x = new FormData();
        return (
          b
            .trim()
            .split("&")
            .forEach(function (ee) {
              if (ee) {
                var X = ee.split("="),
                  k = X.shift().replace(/\+/g, " "),
                  V = X.join("=").replace(/\+/g, " ");
                x.append(decodeURIComponent(k), decodeURIComponent(V));
              }
            }),
          x
        );
      }
      function G(b) {
        var x = new P(),
          ee = b.replace(/\r?\n[\t ]+/g, " ");
        return (
          ee.split(/\r?\n/).forEach(function (X) {
            var k = X.split(":"),
              V = k.shift().trim();
            if (V) {
              var J = k.join(":").trim();
              x.append(V, J);
            }
          }),
          x
        );
      }
      C.call(_.prototype);
      function se(b, x) {
        x || (x = {}),
          (this.type = "default"),
          (this.status = x.status === void 0 ? 200 : x.status),
          (this.ok = this.status >= 200 && this.status < 300),
          (this.statusText = "statusText" in x ? x.statusText : "OK"),
          (this.headers = new P(x.headers)),
          (this.url = x.url || ""),
          this._initBody(b);
      }
      C.call(se.prototype),
        (se.prototype.clone = function () {
          return new se(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new P(this.headers),
            url: this.url,
          });
        }),
        (se.error = function () {
          var b = new se(null, { status: 0, statusText: "" });
          return (b.type = "error"), b;
        });
      var ce = [301, 302, 303, 307, 308];
      (se.redirect = function (b, x) {
        if (ce.indexOf(x) === -1) throw new RangeError("Invalid status code");
        return new se(null, { status: x, headers: { location: b } });
      }),
        (d.DOMException = c.DOMException);
      try {
        new d.DOMException();
      } catch {
        (d.DOMException = function (x, ee) {
          (this.message = x), (this.name = ee);
          var X = Error(x);
          this.stack = X.stack;
        }),
          (d.DOMException.prototype = Object.create(Error.prototype)),
          (d.DOMException.prototype.constructor = d.DOMException);
      }
      function de(b, x) {
        return new Promise(function (ee, X) {
          var k = new _(b, x);
          if (k.signal && k.signal.aborted)
            return X(new d.DOMException("Aborted", "AbortError"));
          var V = new XMLHttpRequest();
          function J() {
            V.abort();
          }
          (V.onload = function () {
            var re = {
              status: V.status,
              statusText: V.statusText,
              headers: G(V.getAllResponseHeaders() || ""),
            };
            re.url =
              "responseURL" in V
                ? V.responseURL
                : re.headers.get("X-Request-URL");
            var me = "response" in V ? V.response : V.responseText;
            ee(new se(me, re));
          }),
            (V.onerror = function () {
              X(new TypeError("Network request failed"));
            }),
            (V.ontimeout = function () {
              X(new TypeError("Network request failed"));
            }),
            (V.onabort = function () {
              X(new d.DOMException("Aborted", "AbortError"));
            }),
            V.open(k.method, k.url, !0),
            k.credentials === "include"
              ? (V.withCredentials = !0)
              : k.credentials === "omit" && (V.withCredentials = !1),
            "responseType" in V && f.blob && (V.responseType = "blob"),
            k.headers.forEach(function (re, me) {
              V.setRequestHeader(me, re);
            }),
            k.signal &&
              (k.signal.addEventListener("abort", J),
              (V.onreadystatechange = function () {
                V.readyState === 4 && k.signal.removeEventListener("abort", J);
              })),
            V.send(typeof k._bodyInit > "u" ? null : k._bodyInit);
        });
      }
      return (
        (de.polyfill = !0),
        c.fetch ||
          ((c.fetch = de), (c.Headers = P), (c.Request = _), (c.Response = se)),
        (d.Headers = P),
        (d.Request = _),
        (d.Response = se),
        (d.fetch = de),
        Object.defineProperty(d, "__esModule", { value: !0 }),
        d
      );
    })({});
  })(s),
    (s.fetch.ponyfill = !0),
    delete s.fetch.polyfill;
  var o = s;
  (e = o.fetch),
    (e.default = o.fetch),
    (e.fetch = o.fetch),
    (e.Headers = o.Headers),
    (e.Request = o.Request),
    (e.Response = o.Response),
    (i.exports = e);
})(uu, uu.exports);
var N5 = uu.exports;
const dd = gu(N5),
  F5 = { Accept: "application/json", "Content-Type": "application/json" },
  L5 = "POST",
  pd = { headers: F5, method: L5 },
  gd = 10;
class on {
  constructor(e, r = !1) {
    if (
      ((this.url = e),
      (this.disableProviderPing = r),
      (this.events = new xr.EventEmitter()),
      (this.isAvailable = !1),
      (this.registering = !1),
      !qf(e))
    )
      throw new Error(
        `Provided URL is not compatible with HTTP connection: ${e}`
      );
    (this.url = e), (this.disableProviderPing = r);
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(e, r) {
    this.isAvailable || (await this.register());
    try {
      const s = ys(e),
        c = await (
          await dd(this.url, Object.assign(Object.assign({}, pd), { body: s }))
        ).json();
      this.onPayload({ data: c });
    } catch (s) {
      this.onError(e.id, s);
    }
  }
  async register(e = this.url) {
    if (!qf(e))
      throw new Error(
        `Provided URL is not compatible with HTTP connection: ${e}`
      );
    if (this.registering) {
      const r = this.events.getMaxListeners();
      return (
        (this.events.listenerCount("register_error") >= r ||
          this.events.listenerCount("open") >= r) &&
          this.events.setMaxListeners(r + 1),
        new Promise((s, o) => {
          this.events.once("register_error", (c) => {
            this.resetMaxListeners(), o(c);
          }),
            this.events.once("open", () => {
              if ((this.resetMaxListeners(), typeof this.isAvailable > "u"))
                return o(new Error("HTTP connection is missing or invalid"));
              s();
            });
        })
      );
    }
    (this.url = e), (this.registering = !0);
    try {
      if (!this.disableProviderPing) {
        const r = ys({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await dd(e, Object.assign(Object.assign({}, pd), { body: r }));
      }
      this.onOpen();
    } catch (r) {
      const s = this.parseError(r);
      throw (this.events.emit("register_error", s), this.onClose(), s);
    }
  }
  onOpen() {
    (this.isAvailable = !0), (this.registering = !1), this.events.emit("open");
  }
  onClose() {
    (this.isAvailable = !1), (this.registering = !1), this.events.emit("close");
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const r = typeof e.data == "string" ? Pu(e.data) : e.data;
    this.events.emit("payload", r);
  }
  onError(e, r) {
    const s = this.parseError(r),
      o = s.message || s.toString(),
      c = Xo(e, o);
    this.events.emit("payload", c);
  }
  parseError(e, r = this.url) {
    return Ip(e, r, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > gd && this.events.setMaxListeners(gd);
  }
}
const vd = "error",
  U5 = "wss://relay.walletconnect.com",
  $5 = "wc",
  M5 = "universal_provider",
  yd = `${$5}@2:${M5}:`,
  j5 = "https://rpc.walletconnect.com/v1",
  Li = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
var ds =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  hu = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ (function (i, e) {
  (function () {
    var r,
      s = "4.17.21",
      o = 200,
      c = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
      d = "Expected a function",
      f = "Invalid `variable` option passed into `_.template`",
      g = "__lodash_hash_undefined__",
      w = 500,
      D = "__lodash_placeholder__",
      R = 1,
      U = 2,
      N = 4,
      P = 1,
      z = 2,
      K = 1,
      ne = 2,
      T = 4,
      $ = 8,
      S = 16,
      C = 32,
      m = 64,
      u = 128,
      _ = 256,
      W = 512,
      G = 30,
      se = "...",
      ce = 800,
      de = 16,
      b = 1,
      x = 2,
      ee = 3,
      X = 1 / 0,
      k = 9007199254740991,
      V = 17976931348623157e292,
      J = 0 / 0,
      re = 4294967295,
      me = re - 1,
      oe = re >>> 1,
      we = [
        ["ary", u],
        ["bind", K],
        ["bindKey", ne],
        ["curry", $],
        ["curryRight", S],
        ["flip", W],
        ["partial", C],
        ["partialRight", m],
        ["rearg", _],
      ],
      le = "[object Arguments]",
      _e = "[object Array]",
      q = "[object AsyncFunction]",
      B = "[object Boolean]",
      F = "[object Date]",
      l = "[object DOMException]",
      O = "[object Error]",
      ae = "[object Function]",
      fe = "[object GeneratorFunction]",
      Ie = "[object Map]",
      ze = "[object Number]",
      ke = "[object Null]",
      $e = "[object Object]",
      gt = "[object Promise]",
      vt = "[object Proxy]",
      je = "[object RegExp]",
      xe = "[object Set]",
      Ne = "[object String]",
      Fe = "[object Symbol]",
      Be = "[object Undefined]",
      Ce = "[object WeakMap]",
      Le = "[object WeakSet]",
      Se = "[object ArrayBuffer]",
      Ae = "[object DataView]",
      He = "[object Float32Array]",
      Oe = "[object Float64Array]",
      Ve = "[object Int8Array]",
      Ge = "[object Int16Array]",
      et = "[object Int32Array]",
      tt = "[object Uint8Array]",
      Je = "[object Uint8ClampedArray]",
      tr = "[object Uint16Array]",
      lr = "[object Uint32Array]",
      Yr = /\b__p \+= '';/g,
      rr = /\b(__p \+=) '' \+/g,
      si = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      mi = /&(?:amp|lt|gt|quot|#39);/g,
      Ui = /[&<>"']/g,
      Et = RegExp(mi.source),
      yt = RegExp(Ui.source),
      Dt = /<%-([\s\S]+?)%>/g,
      St = /<%([\s\S]+?)%>/g,
      mt = /<%=([\s\S]+?)%>/g,
      _t = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Ut = /^\w*$/,
      $t =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      It = /[\\^$.*+?()[\]{}|]/g,
      Mt = RegExp(It.source),
      xt = /^\s+/,
      Pt = /\s/,
      Ot = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      lt = /\{\n\/\* \[wrapped with (.+)\] \*/,
      jt = /,? & /,
      Bt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      ta = /[()=,{}\[\]\/\s]/,
      ra = /\\(\\)?/g,
      ia = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      Cr = /\w*$/,
      na = /^[-+]0x[0-9a-f]+$/i,
      sa = /^0b[01]+$/i,
      oa = /^\[object .+?Constructor\]$/,
      aa = /^0o[0-7]+$/i,
      ca = /^(?:0|[1-9]\d*)$/,
      oi = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      an = /($^)/,
      ua = /['\n\r\u2028\u2029\\]/g,
      cn = "\\ud800-\\udfff",
      ha = "\\u0300-\\u036f",
      la = "\\ufe20-\\ufe2f",
      un = "\\u20d0-\\u20ff",
      Ds = ha + la + un,
      Ss = "\\u2700-\\u27bf",
      qr = "a-z\\xdf-\\xf6\\xf8-\\xff",
      fa = "\\xac\\xb1\\xd7\\xf7",
      da = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
      pa = "\\u2000-\\u206f",
      ga =
        " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      Is = "A-Z\\xc0-\\xd6\\xd8-\\xde",
      xs = "\\ufe0e\\ufe0f",
      $i = fa + da + pa + ga,
      $n = "['’]",
      Mi = "[" + cn + "]",
      Mn = "[" + $i + "]",
      ji = "[" + Ds + "]",
      Os = "\\d+",
      va = "[" + Ss + "]",
      Cs = "[" + qr + "]",
      As = "[^" + cn + $i + Os + Ss + qr + Is + "]",
      hn = "\\ud83c[\\udffb-\\udfff]",
      ya = "(?:" + ji + "|" + hn + ")",
      Ps = "[^" + cn + "]",
      ln = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      wi = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      mr = "[" + Is + "]",
      Ts = "\\u200d",
      Rs = "(?:" + Cs + "|" + As + ")",
      Jr = "(?:" + mr + "|" + As + ")",
      Ns = "(?:" + $n + "(?:d|ll|m|re|s|t|ve))?",
      Fs = "(?:" + $n + "(?:D|LL|M|RE|S|T|VE))?",
      Ls = ya + "?",
      Us = "[" + xs + "]?",
      _a = "(?:" + Ts + "(?:" + [Ps, ln, wi].join("|") + ")" + Us + Ls + ")*",
      ai = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
      $s = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
      Ms = Us + Ls + _a,
      fn = "(?:" + [va, ln, wi].join("|") + ")" + Ms,
      ba = "(?:" + [Ps + ji + "?", ji, ln, wi, Mi].join("|") + ")",
      jn = RegExp($n, "g"),
      ma = RegExp(ji, "g"),
      dn = RegExp(hn + "(?=" + hn + ")|" + ba + Ms, "g"),
      js = RegExp(
        [
          mr + "?" + Cs + "+" + Ns + "(?=" + [Mn, mr, "$"].join("|") + ")",
          Jr + "+" + Fs + "(?=" + [Mn, mr + Rs, "$"].join("|") + ")",
          mr + "?" + Rs + "+" + Ns,
          mr + "+" + Fs,
          $s,
          ai,
          Os,
          fn,
        ].join("|"),
        "g"
      ),
      Bs = RegExp("[" + Ts + cn + Ds + xs + "]"),
      Bi = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      qs = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout",
      ],
      wa = -1,
      at = {};
    (at[He] =
      at[Oe] =
      at[Ve] =
      at[Ge] =
      at[et] =
      at[tt] =
      at[Je] =
      at[tr] =
      at[lr] =
        !0),
      (at[le] =
        at[_e] =
        at[Se] =
        at[B] =
        at[Ae] =
        at[F] =
        at[O] =
        at[ae] =
        at[Ie] =
        at[ze] =
        at[$e] =
        at[je] =
        at[xe] =
        at[Ne] =
        at[Ce] =
          !1);
    var st = {};
    (st[le] =
      st[_e] =
      st[Se] =
      st[Ae] =
      st[B] =
      st[F] =
      st[He] =
      st[Oe] =
      st[Ve] =
      st[Ge] =
      st[et] =
      st[Ie] =
      st[ze] =
      st[$e] =
      st[je] =
      st[xe] =
      st[Ne] =
      st[Fe] =
      st[tt] =
      st[Je] =
      st[tr] =
      st[lr] =
        !0),
      (st[O] = st[ae] = st[Ce] = !1);
    var E = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s",
      },
      L = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      },
      te = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      },
      pe = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      ct = parseFloat,
      Te = parseInt,
      dt = typeof ds == "object" && ds && ds.Object === Object && ds,
      qt = typeof self == "object" && self && self.Object === Object && self,
      Xe = dt || qt || Function("return this")(),
      ut = e && !e.nodeType && e,
      Tt = ut && !0 && i && !i.nodeType && i,
      fr = Tt && Tt.exports === ut,
      zt = fr && dt.process,
      pt = (function () {
        try {
          var M = Tt && Tt.require && Tt.require("util").types;
          return M || (zt && zt.binding && zt.binding("util"));
        } catch {}
      })(),
      ir = pt && pt.isArrayBuffer,
      zr = pt && pt.isDate,
      Ar = pt && pt.isMap,
      Xr = pt && pt.isRegExp,
      Bn = pt && pt.isSet,
      qi = pt && pt.isTypedArray;
    function Vt(M, Y, H) {
      switch (H.length) {
        case 0:
          return M.call(Y);
        case 1:
          return M.call(Y, H[0]);
        case 2:
          return M.call(Y, H[0], H[1]);
        case 3:
          return M.call(Y, H[0], H[1], H[2]);
      }
      return M.apply(Y, H);
    }
    function Yp(M, Y, H, ge) {
      for (var Pe = -1, rt = M == null ? 0 : M.length; ++Pe < rt; ) {
        var Kt = M[Pe];
        Y(ge, Kt, H(Kt), M);
      }
      return ge;
    }
    function Pr(M, Y) {
      for (
        var H = -1, ge = M == null ? 0 : M.length;
        ++H < ge && Y(M[H], H, M) !== !1;

      );
      return M;
    }
    function Jp(M, Y) {
      for (var H = M == null ? 0 : M.length; H-- && Y(M[H], H, M) !== !1; );
      return M;
    }
    function zu(M, Y) {
      for (var H = -1, ge = M == null ? 0 : M.length; ++H < ge; )
        if (!Y(M[H], H, M)) return !1;
      return !0;
    }
    function Ei(M, Y) {
      for (
        var H = -1, ge = M == null ? 0 : M.length, Pe = 0, rt = [];
        ++H < ge;

      ) {
        var Kt = M[H];
        Y(Kt, H, M) && (rt[Pe++] = Kt);
      }
      return rt;
    }
    function zs(M, Y) {
      var H = M == null ? 0 : M.length;
      return !!H && pn(M, Y, 0) > -1;
    }
    function Ea(M, Y, H) {
      for (var ge = -1, Pe = M == null ? 0 : M.length; ++ge < Pe; )
        if (H(Y, M[ge])) return !0;
      return !1;
    }
    function bt(M, Y) {
      for (
        var H = -1, ge = M == null ? 0 : M.length, Pe = Array(ge);
        ++H < ge;

      )
        Pe[H] = Y(M[H], H, M);
      return Pe;
    }
    function Di(M, Y) {
      for (var H = -1, ge = Y.length, Pe = M.length; ++H < ge; )
        M[Pe + H] = Y[H];
      return M;
    }
    function Da(M, Y, H, ge) {
      var Pe = -1,
        rt = M == null ? 0 : M.length;
      for (ge && rt && (H = M[++Pe]); ++Pe < rt; ) H = Y(H, M[Pe], Pe, M);
      return H;
    }
    function Xp(M, Y, H, ge) {
      var Pe = M == null ? 0 : M.length;
      for (ge && Pe && (H = M[--Pe]); Pe--; ) H = Y(H, M[Pe], Pe, M);
      return H;
    }
    function Sa(M, Y) {
      for (var H = -1, ge = M == null ? 0 : M.length; ++H < ge; )
        if (Y(M[H], H, M)) return !0;
      return !1;
    }
    var Qp = Ia("length");
    function Zp(M) {
      return M.split("");
    }
    function eg(M) {
      return M.match(Bt) || [];
    }
    function Hu(M, Y, H) {
      var ge;
      return (
        H(M, function (Pe, rt, Kt) {
          if (Y(Pe, rt, Kt)) return (ge = rt), !1;
        }),
        ge
      );
    }
    function Hs(M, Y, H, ge) {
      for (var Pe = M.length, rt = H + (ge ? 1 : -1); ge ? rt-- : ++rt < Pe; )
        if (Y(M[rt], rt, M)) return rt;
      return -1;
    }
    function pn(M, Y, H) {
      return Y === Y ? fg(M, Y, H) : Hs(M, Ku, H);
    }
    function tg(M, Y, H, ge) {
      for (var Pe = H - 1, rt = M.length; ++Pe < rt; )
        if (ge(M[Pe], Y)) return Pe;
      return -1;
    }
    function Ku(M) {
      return M !== M;
    }
    function ku(M, Y) {
      var H = M == null ? 0 : M.length;
      return H ? Oa(M, Y) / H : J;
    }
    function Ia(M) {
      return function (Y) {
        return Y == null ? r : Y[M];
      };
    }
    function xa(M) {
      return function (Y) {
        return M == null ? r : M[Y];
      };
    }
    function Vu(M, Y, H, ge, Pe) {
      return (
        Pe(M, function (rt, Kt, ht) {
          H = ge ? ((ge = !1), rt) : Y(H, rt, Kt, ht);
        }),
        H
      );
    }
    function rg(M, Y) {
      var H = M.length;
      for (M.sort(Y); H--; ) M[H] = M[H].value;
      return M;
    }
    function Oa(M, Y) {
      for (var H, ge = -1, Pe = M.length; ++ge < Pe; ) {
        var rt = Y(M[ge]);
        rt !== r && (H = H === r ? rt : H + rt);
      }
      return H;
    }
    function Ca(M, Y) {
      for (var H = -1, ge = Array(M); ++H < M; ) ge[H] = Y(H);
      return ge;
    }
    function ig(M, Y) {
      return bt(Y, function (H) {
        return [H, M[H]];
      });
    }
    function Wu(M) {
      return M && M.slice(0, Xu(M) + 1).replace(xt, "");
    }
    function wr(M) {
      return function (Y) {
        return M(Y);
      };
    }
    function Aa(M, Y) {
      return bt(Y, function (H) {
        return M[H];
      });
    }
    function qn(M, Y) {
      return M.has(Y);
    }
    function Gu(M, Y) {
      for (var H = -1, ge = M.length; ++H < ge && pn(Y, M[H], 0) > -1; );
      return H;
    }
    function Yu(M, Y) {
      for (var H = M.length; H-- && pn(Y, M[H], 0) > -1; );
      return H;
    }
    function ng(M, Y) {
      for (var H = M.length, ge = 0; H--; ) M[H] === Y && ++ge;
      return ge;
    }
    var sg = xa(E),
      og = xa(L);
    function ag(M) {
      return "\\" + pe[M];
    }
    function cg(M, Y) {
      return M == null ? r : M[Y];
    }
    function gn(M) {
      return Bs.test(M);
    }
    function ug(M) {
      return Bi.test(M);
    }
    function hg(M) {
      for (var Y, H = []; !(Y = M.next()).done; ) H.push(Y.value);
      return H;
    }
    function Pa(M) {
      var Y = -1,
        H = Array(M.size);
      return (
        M.forEach(function (ge, Pe) {
          H[++Y] = [Pe, ge];
        }),
        H
      );
    }
    function Ju(M, Y) {
      return function (H) {
        return M(Y(H));
      };
    }
    function Si(M, Y) {
      for (var H = -1, ge = M.length, Pe = 0, rt = []; ++H < ge; ) {
        var Kt = M[H];
        (Kt === Y || Kt === D) && ((M[H] = D), (rt[Pe++] = H));
      }
      return rt;
    }
    function Ks(M) {
      var Y = -1,
        H = Array(M.size);
      return (
        M.forEach(function (ge) {
          H[++Y] = ge;
        }),
        H
      );
    }
    function lg(M) {
      var Y = -1,
        H = Array(M.size);
      return (
        M.forEach(function (ge) {
          H[++Y] = [ge, ge];
        }),
        H
      );
    }
    function fg(M, Y, H) {
      for (var ge = H - 1, Pe = M.length; ++ge < Pe; )
        if (M[ge] === Y) return ge;
      return -1;
    }
    function dg(M, Y, H) {
      for (var ge = H + 1; ge--; ) if (M[ge] === Y) return ge;
      return ge;
    }
    function vn(M) {
      return gn(M) ? gg(M) : Qp(M);
    }
    function Hr(M) {
      return gn(M) ? vg(M) : Zp(M);
    }
    function Xu(M) {
      for (var Y = M.length; Y-- && Pt.test(M.charAt(Y)); );
      return Y;
    }
    var pg = xa(te);
    function gg(M) {
      for (var Y = (dn.lastIndex = 0); dn.test(M); ) ++Y;
      return Y;
    }
    function vg(M) {
      return M.match(dn) || [];
    }
    function yg(M) {
      return M.match(js) || [];
    }
    var _g = function M(Y) {
        Y = Y == null ? Xe : yn.defaults(Xe.Object(), Y, yn.pick(Xe, qs));
        var H = Y.Array,
          ge = Y.Date,
          Pe = Y.Error,
          rt = Y.Function,
          Kt = Y.Math,
          ht = Y.Object,
          Ta = Y.RegExp,
          bg = Y.String,
          Tr = Y.TypeError,
          ks = H.prototype,
          mg = rt.prototype,
          _n = ht.prototype,
          Vs = Y["__core-js_shared__"],
          Ws = mg.toString,
          nt = _n.hasOwnProperty,
          wg = 0,
          Qu = (function () {
            var t = /[^.]+$/.exec((Vs && Vs.keys && Vs.keys.IE_PROTO) || "");
            return t ? "Symbol(src)_1." + t : "";
          })(),
          Gs = _n.toString,
          Eg = Ws.call(ht),
          Dg = Xe._,
          Sg = Ta(
            "^" +
              Ws.call(nt)
                .replace(It, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          Ys = fr ? Y.Buffer : r,
          Ii = Y.Symbol,
          Js = Y.Uint8Array,
          Zu = Ys ? Ys.allocUnsafe : r,
          Xs = Ju(ht.getPrototypeOf, ht),
          eh = ht.create,
          th = _n.propertyIsEnumerable,
          Qs = ks.splice,
          rh = Ii ? Ii.isConcatSpreadable : r,
          zn = Ii ? Ii.iterator : r,
          zi = Ii ? Ii.toStringTag : r,
          Zs = (function () {
            try {
              var t = Wi(ht, "defineProperty");
              return t({}, "", {}), t;
            } catch {}
          })(),
          Ig = Y.clearTimeout !== Xe.clearTimeout && Y.clearTimeout,
          xg = ge && ge.now !== Xe.Date.now && ge.now,
          Og = Y.setTimeout !== Xe.setTimeout && Y.setTimeout,
          eo = Kt.ceil,
          to = Kt.floor,
          Ra = ht.getOwnPropertySymbols,
          Cg = Ys ? Ys.isBuffer : r,
          ih = Y.isFinite,
          Ag = ks.join,
          Pg = Ju(ht.keys, ht),
          kt = Kt.max,
          Qt = Kt.min,
          Tg = ge.now,
          Rg = Y.parseInt,
          nh = Kt.random,
          Ng = ks.reverse,
          Na = Wi(Y, "DataView"),
          Hn = Wi(Y, "Map"),
          Fa = Wi(Y, "Promise"),
          bn = Wi(Y, "Set"),
          Kn = Wi(Y, "WeakMap"),
          kn = Wi(ht, "create"),
          ro = Kn && new Kn(),
          mn = {},
          Fg = Gi(Na),
          Lg = Gi(Hn),
          Ug = Gi(Fa),
          $g = Gi(bn),
          Mg = Gi(Kn),
          io = Ii ? Ii.prototype : r,
          Vn = io ? io.valueOf : r,
          sh = io ? io.toString : r;
        function v(t) {
          if (Ct(t) && !Re(t) && !(t instanceof Ye)) {
            if (t instanceof Rr) return t;
            if (nt.call(t, "__wrapped__")) return ol(t);
          }
          return new Rr(t);
        }
        var wn = (function () {
          function t() {}
          return function (n) {
            if (!wt(n)) return {};
            if (eh) return eh(n);
            t.prototype = n;
            var a = new t();
            return (t.prototype = r), a;
          };
        })();
        function no() {}
        function Rr(t, n) {
          (this.__wrapped__ = t),
            (this.__actions__ = []),
            (this.__chain__ = !!n),
            (this.__index__ = 0),
            (this.__values__ = r);
        }
        (v.templateSettings = {
          escape: Dt,
          evaluate: St,
          interpolate: mt,
          variable: "",
          imports: { _: v },
        }),
          (v.prototype = no.prototype),
          (v.prototype.constructor = v),
          (Rr.prototype = wn(no.prototype)),
          (Rr.prototype.constructor = Rr);
        function Ye(t) {
          (this.__wrapped__ = t),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = re),
            (this.__views__ = []);
        }
        function jg() {
          var t = new Ye(this.__wrapped__);
          return (
            (t.__actions__ = dr(this.__actions__)),
            (t.__dir__ = this.__dir__),
            (t.__filtered__ = this.__filtered__),
            (t.__iteratees__ = dr(this.__iteratees__)),
            (t.__takeCount__ = this.__takeCount__),
            (t.__views__ = dr(this.__views__)),
            t
          );
        }
        function Bg() {
          if (this.__filtered__) {
            var t = new Ye(this);
            (t.__dir__ = -1), (t.__filtered__ = !0);
          } else (t = this.clone()), (t.__dir__ *= -1);
          return t;
        }
        function qg() {
          var t = this.__wrapped__.value(),
            n = this.__dir__,
            a = Re(t),
            h = n < 0,
            p = a ? t.length : 0,
            y = Z0(0, p, this.__views__),
            I = y.start,
            A = y.end,
            j = A - I,
            Q = h ? A : I - 1,
            Z = this.__iteratees__,
            ie = Z.length,
            ue = 0,
            ve = Qt(j, this.__takeCount__);
          if (!a || (!h && p == j && ve == j)) return Ah(t, this.__actions__);
          var Ee = [];
          e: for (; j-- && ue < ve; ) {
            Q += n;
            for (var qe = -1, De = t[Q]; ++qe < ie; ) {
              var We = Z[qe],
                Qe = We.iteratee,
                Sr = We.type,
                or = Qe(De);
              if (Sr == x) De = or;
              else if (!or) {
                if (Sr == b) continue e;
                break e;
              }
            }
            Ee[ue++] = De;
          }
          return Ee;
        }
        (Ye.prototype = wn(no.prototype)), (Ye.prototype.constructor = Ye);
        function Hi(t) {
          var n = -1,
            a = t == null ? 0 : t.length;
          for (this.clear(); ++n < a; ) {
            var h = t[n];
            this.set(h[0], h[1]);
          }
        }
        function zg() {
          (this.__data__ = kn ? kn(null) : {}), (this.size = 0);
        }
        function Hg(t) {
          var n = this.has(t) && delete this.__data__[t];
          return (this.size -= n ? 1 : 0), n;
        }
        function Kg(t) {
          var n = this.__data__;
          if (kn) {
            var a = n[t];
            return a === g ? r : a;
          }
          return nt.call(n, t) ? n[t] : r;
        }
        function kg(t) {
          var n = this.__data__;
          return kn ? n[t] !== r : nt.call(n, t);
        }
        function Vg(t, n) {
          var a = this.__data__;
          return (
            (this.size += this.has(t) ? 0 : 1),
            (a[t] = kn && n === r ? g : n),
            this
          );
        }
        (Hi.prototype.clear = zg),
          (Hi.prototype.delete = Hg),
          (Hi.prototype.get = Kg),
          (Hi.prototype.has = kg),
          (Hi.prototype.set = Vg);
        function ci(t) {
          var n = -1,
            a = t == null ? 0 : t.length;
          for (this.clear(); ++n < a; ) {
            var h = t[n];
            this.set(h[0], h[1]);
          }
        }
        function Wg() {
          (this.__data__ = []), (this.size = 0);
        }
        function Gg(t) {
          var n = this.__data__,
            a = so(n, t);
          if (a < 0) return !1;
          var h = n.length - 1;
          return a == h ? n.pop() : Qs.call(n, a, 1), --this.size, !0;
        }
        function Yg(t) {
          var n = this.__data__,
            a = so(n, t);
          return a < 0 ? r : n[a][1];
        }
        function Jg(t) {
          return so(this.__data__, t) > -1;
        }
        function Xg(t, n) {
          var a = this.__data__,
            h = so(a, t);
          return h < 0 ? (++this.size, a.push([t, n])) : (a[h][1] = n), this;
        }
        (ci.prototype.clear = Wg),
          (ci.prototype.delete = Gg),
          (ci.prototype.get = Yg),
          (ci.prototype.has = Jg),
          (ci.prototype.set = Xg);
        function ui(t) {
          var n = -1,
            a = t == null ? 0 : t.length;
          for (this.clear(); ++n < a; ) {
            var h = t[n];
            this.set(h[0], h[1]);
          }
        }
        function Qg() {
          (this.size = 0),
            (this.__data__ = {
              hash: new Hi(),
              map: new (Hn || ci)(),
              string: new Hi(),
            });
        }
        function Zg(t) {
          var n = _o(this, t).delete(t);
          return (this.size -= n ? 1 : 0), n;
        }
        function e0(t) {
          return _o(this, t).get(t);
        }
        function t0(t) {
          return _o(this, t).has(t);
        }
        function r0(t, n) {
          var a = _o(this, t),
            h = a.size;
          return a.set(t, n), (this.size += a.size == h ? 0 : 1), this;
        }
        (ui.prototype.clear = Qg),
          (ui.prototype.delete = Zg),
          (ui.prototype.get = e0),
          (ui.prototype.has = t0),
          (ui.prototype.set = r0);
        function Ki(t) {
          var n = -1,
            a = t == null ? 0 : t.length;
          for (this.__data__ = new ui(); ++n < a; ) this.add(t[n]);
        }
        function i0(t) {
          return this.__data__.set(t, g), this;
        }
        function n0(t) {
          return this.__data__.has(t);
        }
        (Ki.prototype.add = Ki.prototype.push = i0), (Ki.prototype.has = n0);
        function Kr(t) {
          var n = (this.__data__ = new ci(t));
          this.size = n.size;
        }
        function s0() {
          (this.__data__ = new ci()), (this.size = 0);
        }
        function o0(t) {
          var n = this.__data__,
            a = n.delete(t);
          return (this.size = n.size), a;
        }
        function a0(t) {
          return this.__data__.get(t);
        }
        function c0(t) {
          return this.__data__.has(t);
        }
        function u0(t, n) {
          var a = this.__data__;
          if (a instanceof ci) {
            var h = a.__data__;
            if (!Hn || h.length < o - 1)
              return h.push([t, n]), (this.size = ++a.size), this;
            a = this.__data__ = new ui(h);
          }
          return a.set(t, n), (this.size = a.size), this;
        }
        (Kr.prototype.clear = s0),
          (Kr.prototype.delete = o0),
          (Kr.prototype.get = a0),
          (Kr.prototype.has = c0),
          (Kr.prototype.set = u0);
        function oh(t, n) {
          var a = Re(t),
            h = !a && Yi(t),
            p = !a && !h && Pi(t),
            y = !a && !h && !p && In(t),
            I = a || h || p || y,
            A = I ? Ca(t.length, bg) : [],
            j = A.length;
          for (var Q in t)
            (n || nt.call(t, Q)) &&
              !(
                I &&
                (Q == "length" ||
                  (p && (Q == "offset" || Q == "parent")) ||
                  (y &&
                    (Q == "buffer" ||
                      Q == "byteLength" ||
                      Q == "byteOffset")) ||
                  di(Q, j))
              ) &&
              A.push(Q);
          return A;
        }
        function ah(t) {
          var n = t.length;
          return n ? t[ka(0, n - 1)] : r;
        }
        function h0(t, n) {
          return bo(dr(t), ki(n, 0, t.length));
        }
        function l0(t) {
          return bo(dr(t));
        }
        function La(t, n, a) {
          ((a !== r && !kr(t[n], a)) || (a === r && !(n in t))) && hi(t, n, a);
        }
        function Wn(t, n, a) {
          var h = t[n];
          (!(nt.call(t, n) && kr(h, a)) || (a === r && !(n in t))) &&
            hi(t, n, a);
        }
        function so(t, n) {
          for (var a = t.length; a--; ) if (kr(t[a][0], n)) return a;
          return -1;
        }
        function f0(t, n, a, h) {
          return (
            xi(t, function (p, y, I) {
              n(h, p, a(p), I);
            }),
            h
          );
        }
        function ch(t, n) {
          return t && Zr(n, Wt(n), t);
        }
        function d0(t, n) {
          return t && Zr(n, gr(n), t);
        }
        function hi(t, n, a) {
          n == "__proto__" && Zs
            ? Zs(t, n, {
                configurable: !0,
                enumerable: !0,
                value: a,
                writable: !0,
              })
            : (t[n] = a);
        }
        function Ua(t, n) {
          for (var a = -1, h = n.length, p = H(h), y = t == null; ++a < h; )
            p[a] = y ? r : vc(t, n[a]);
          return p;
        }
        function ki(t, n, a) {
          return (
            t === t &&
              (a !== r && (t = t <= a ? t : a),
              n !== r && (t = t >= n ? t : n)),
            t
          );
        }
        function Nr(t, n, a, h, p, y) {
          var I,
            A = n & R,
            j = n & U,
            Q = n & N;
          if ((a && (I = p ? a(t, h, p, y) : a(t)), I !== r)) return I;
          if (!wt(t)) return t;
          var Z = Re(t);
          if (Z) {
            if (((I = t1(t)), !A)) return dr(t, I);
          } else {
            var ie = Zt(t),
              ue = ie == ae || ie == fe;
            if (Pi(t)) return Rh(t, A);
            if (ie == $e || ie == le || (ue && !p)) {
              if (((I = j || ue ? {} : Xh(t)), !A))
                return j ? K0(t, d0(I, t)) : H0(t, ch(I, t));
            } else {
              if (!st[ie]) return p ? t : {};
              I = r1(t, ie, A);
            }
          }
          y || (y = new Kr());
          var ve = y.get(t);
          if (ve) return ve;
          y.set(t, I),
            xl(t)
              ? t.forEach(function (De) {
                  I.add(Nr(De, n, a, De, t, y));
                })
              : Sl(t) &&
                t.forEach(function (De, We) {
                  I.set(We, Nr(De, n, a, We, t, y));
                });
          var Ee = Q ? (j ? rc : tc) : j ? gr : Wt,
            qe = Z ? r : Ee(t);
          return (
            Pr(qe || t, function (De, We) {
              qe && ((We = De), (De = t[We])),
                Wn(I, We, Nr(De, n, a, We, t, y));
            }),
            I
          );
        }
        function p0(t) {
          var n = Wt(t);
          return function (a) {
            return uh(a, t, n);
          };
        }
        function uh(t, n, a) {
          var h = a.length;
          if (t == null) return !h;
          for (t = ht(t); h--; ) {
            var p = a[h],
              y = n[p],
              I = t[p];
            if ((I === r && !(p in t)) || !y(I)) return !1;
          }
          return !0;
        }
        function hh(t, n, a) {
          if (typeof t != "function") throw new Tr(d);
          return es(function () {
            t.apply(r, a);
          }, n);
        }
        function Gn(t, n, a, h) {
          var p = -1,
            y = zs,
            I = !0,
            A = t.length,
            j = [],
            Q = n.length;
          if (!A) return j;
          a && (n = bt(n, wr(a))),
            h
              ? ((y = Ea), (I = !1))
              : n.length >= o && ((y = qn), (I = !1), (n = new Ki(n)));
          e: for (; ++p < A; ) {
            var Z = t[p],
              ie = a == null ? Z : a(Z);
            if (((Z = h || Z !== 0 ? Z : 0), I && ie === ie)) {
              for (var ue = Q; ue--; ) if (n[ue] === ie) continue e;
              j.push(Z);
            } else y(n, ie, h) || j.push(Z);
          }
          return j;
        }
        var xi = $h(Qr),
          lh = $h(Ma, !0);
        function g0(t, n) {
          var a = !0;
          return (
            xi(t, function (h, p, y) {
              return (a = !!n(h, p, y)), a;
            }),
            a
          );
        }
        function oo(t, n, a) {
          for (var h = -1, p = t.length; ++h < p; ) {
            var y = t[h],
              I = n(y);
            if (I != null && (A === r ? I === I && !Dr(I) : a(I, A)))
              var A = I,
                j = y;
          }
          return j;
        }
        function v0(t, n, a, h) {
          var p = t.length;
          for (
            a = Me(a),
              a < 0 && (a = -a > p ? 0 : p + a),
              h = h === r || h > p ? p : Me(h),
              h < 0 && (h += p),
              h = a > h ? 0 : Cl(h);
            a < h;

          )
            t[a++] = n;
          return t;
        }
        function fh(t, n) {
          var a = [];
          return (
            xi(t, function (h, p, y) {
              n(h, p, y) && a.push(h);
            }),
            a
          );
        }
        function Yt(t, n, a, h, p) {
          var y = -1,
            I = t.length;
          for (a || (a = n1), p || (p = []); ++y < I; ) {
            var A = t[y];
            n > 0 && a(A)
              ? n > 1
                ? Yt(A, n - 1, a, h, p)
                : Di(p, A)
              : h || (p[p.length] = A);
          }
          return p;
        }
        var $a = Mh(),
          dh = Mh(!0);
        function Qr(t, n) {
          return t && $a(t, n, Wt);
        }
        function Ma(t, n) {
          return t && dh(t, n, Wt);
        }
        function ao(t, n) {
          return Ei(n, function (a) {
            return pi(t[a]);
          });
        }
        function Vi(t, n) {
          n = Ci(n, t);
          for (var a = 0, h = n.length; t != null && a < h; ) t = t[ei(n[a++])];
          return a && a == h ? t : r;
        }
        function ph(t, n, a) {
          var h = n(t);
          return Re(t) ? h : Di(h, a(t));
        }
        function nr(t) {
          return t == null
            ? t === r
              ? Be
              : ke
            : zi && zi in ht(t)
            ? Q0(t)
            : l1(t);
        }
        function ja(t, n) {
          return t > n;
        }
        function y0(t, n) {
          return t != null && nt.call(t, n);
        }
        function _0(t, n) {
          return t != null && n in ht(t);
        }
        function b0(t, n, a) {
          return t >= Qt(n, a) && t < kt(n, a);
        }
        function Ba(t, n, a) {
          for (
            var h = a ? Ea : zs,
              p = t[0].length,
              y = t.length,
              I = y,
              A = H(y),
              j = 1 / 0,
              Q = [];
            I--;

          ) {
            var Z = t[I];
            I && n && (Z = bt(Z, wr(n))),
              (j = Qt(Z.length, j)),
              (A[I] =
                !a && (n || (p >= 120 && Z.length >= 120))
                  ? new Ki(I && Z)
                  : r);
          }
          Z = t[0];
          var ie = -1,
            ue = A[0];
          e: for (; ++ie < p && Q.length < j; ) {
            var ve = Z[ie],
              Ee = n ? n(ve) : ve;
            if (
              ((ve = a || ve !== 0 ? ve : 0), !(ue ? qn(ue, Ee) : h(Q, Ee, a)))
            ) {
              for (I = y; --I; ) {
                var qe = A[I];
                if (!(qe ? qn(qe, Ee) : h(t[I], Ee, a))) continue e;
              }
              ue && ue.push(Ee), Q.push(ve);
            }
          }
          return Q;
        }
        function m0(t, n, a, h) {
          return (
            Qr(t, function (p, y, I) {
              n(h, a(p), y, I);
            }),
            h
          );
        }
        function Yn(t, n, a) {
          (n = Ci(n, t)), (t = tl(t, n));
          var h = t == null ? t : t[ei(Lr(n))];
          return h == null ? r : Vt(h, t, a);
        }
        function gh(t) {
          return Ct(t) && nr(t) == le;
        }
        function w0(t) {
          return Ct(t) && nr(t) == Se;
        }
        function E0(t) {
          return Ct(t) && nr(t) == F;
        }
        function Jn(t, n, a, h, p) {
          return t === n
            ? !0
            : t == null || n == null || (!Ct(t) && !Ct(n))
            ? t !== t && n !== n
            : D0(t, n, a, h, Jn, p);
        }
        function D0(t, n, a, h, p, y) {
          var I = Re(t),
            A = Re(n),
            j = I ? _e : Zt(t),
            Q = A ? _e : Zt(n);
          (j = j == le ? $e : j), (Q = Q == le ? $e : Q);
          var Z = j == $e,
            ie = Q == $e,
            ue = j == Q;
          if (ue && Pi(t)) {
            if (!Pi(n)) return !1;
            (I = !0), (Z = !1);
          }
          if (ue && !Z)
            return (
              y || (y = new Kr()),
              I || In(t) ? Gh(t, n, a, h, p, y) : J0(t, n, j, a, h, p, y)
            );
          if (!(a & P)) {
            var ve = Z && nt.call(t, "__wrapped__"),
              Ee = ie && nt.call(n, "__wrapped__");
            if (ve || Ee) {
              var qe = ve ? t.value() : t,
                De = Ee ? n.value() : n;
              return y || (y = new Kr()), p(qe, De, a, h, y);
            }
          }
          return ue ? (y || (y = new Kr()), X0(t, n, a, h, p, y)) : !1;
        }
        function S0(t) {
          return Ct(t) && Zt(t) == Ie;
        }
        function qa(t, n, a, h) {
          var p = a.length,
            y = p,
            I = !h;
          if (t == null) return !y;
          for (t = ht(t); p--; ) {
            var A = a[p];
            if (I && A[2] ? A[1] !== t[A[0]] : !(A[0] in t)) return !1;
          }
          for (; ++p < y; ) {
            A = a[p];
            var j = A[0],
              Q = t[j],
              Z = A[1];
            if (I && A[2]) {
              if (Q === r && !(j in t)) return !1;
            } else {
              var ie = new Kr();
              if (h) var ue = h(Q, Z, j, t, n, ie);
              if (!(ue === r ? Jn(Z, Q, P | z, h, ie) : ue)) return !1;
            }
          }
          return !0;
        }
        function vh(t) {
          if (!wt(t) || o1(t)) return !1;
          var n = pi(t) ? Sg : oa;
          return n.test(Gi(t));
        }
        function I0(t) {
          return Ct(t) && nr(t) == je;
        }
        function x0(t) {
          return Ct(t) && Zt(t) == xe;
        }
        function O0(t) {
          return Ct(t) && Io(t.length) && !!at[nr(t)];
        }
        function yh(t) {
          return typeof t == "function"
            ? t
            : t == null
            ? vr
            : typeof t == "object"
            ? Re(t)
              ? mh(t[0], t[1])
              : bh(t)
            : jl(t);
        }
        function za(t) {
          if (!Zn(t)) return Pg(t);
          var n = [];
          for (var a in ht(t)) nt.call(t, a) && a != "constructor" && n.push(a);
          return n;
        }
        function C0(t) {
          if (!wt(t)) return h1(t);
          var n = Zn(t),
            a = [];
          for (var h in t)
            (h == "constructor" && (n || !nt.call(t, h))) || a.push(h);
          return a;
        }
        function Ha(t, n) {
          return t < n;
        }
        function _h(t, n) {
          var a = -1,
            h = pr(t) ? H(t.length) : [];
          return (
            xi(t, function (p, y, I) {
              h[++a] = n(p, y, I);
            }),
            h
          );
        }
        function bh(t) {
          var n = nc(t);
          return n.length == 1 && n[0][2]
            ? Zh(n[0][0], n[0][1])
            : function (a) {
                return a === t || qa(a, t, n);
              };
        }
        function mh(t, n) {
          return oc(t) && Qh(n)
            ? Zh(ei(t), n)
            : function (a) {
                var h = vc(a, t);
                return h === r && h === n ? yc(a, t) : Jn(n, h, P | z);
              };
        }
        function co(t, n, a, h, p) {
          t !== n &&
            $a(
              n,
              function (y, I) {
                if ((p || (p = new Kr()), wt(y))) A0(t, n, I, a, co, h, p);
                else {
                  var A = h ? h(cc(t, I), y, I + "", t, n, p) : r;
                  A === r && (A = y), La(t, I, A);
                }
              },
              gr
            );
        }
        function A0(t, n, a, h, p, y, I) {
          var A = cc(t, a),
            j = cc(n, a),
            Q = I.get(j);
          if (Q) {
            La(t, a, Q);
            return;
          }
          var Z = y ? y(A, j, a + "", t, n, I) : r,
            ie = Z === r;
          if (ie) {
            var ue = Re(j),
              ve = !ue && Pi(j),
              Ee = !ue && !ve && In(j);
            (Z = j),
              ue || ve || Ee
                ? Re(A)
                  ? (Z = A)
                  : Rt(A)
                  ? (Z = dr(A))
                  : ve
                  ? ((ie = !1), (Z = Rh(j, !0)))
                  : Ee
                  ? ((ie = !1), (Z = Nh(j, !0)))
                  : (Z = [])
                : ts(j) || Yi(j)
                ? ((Z = A),
                  Yi(A) ? (Z = Al(A)) : (!wt(A) || pi(A)) && (Z = Xh(j)))
                : (ie = !1);
          }
          ie && (I.set(j, Z), p(Z, j, h, y, I), I.delete(j)), La(t, a, Z);
        }
        function wh(t, n) {
          var a = t.length;
          if (a) return (n += n < 0 ? a : 0), di(n, a) ? t[n] : r;
        }
        function Eh(t, n, a) {
          n.length
            ? (n = bt(n, function (y) {
                return Re(y)
                  ? function (I) {
                      return Vi(I, y.length === 1 ? y[0] : y);
                    }
                  : y;
              }))
            : (n = [vr]);
          var h = -1;
          n = bt(n, wr(be()));
          var p = _h(t, function (y, I, A) {
            var j = bt(n, function (Q) {
              return Q(y);
            });
            return { criteria: j, index: ++h, value: y };
          });
          return rg(p, function (y, I) {
            return z0(y, I, a);
          });
        }
        function P0(t, n) {
          return Dh(t, n, function (a, h) {
            return yc(t, h);
          });
        }
        function Dh(t, n, a) {
          for (var h = -1, p = n.length, y = {}; ++h < p; ) {
            var I = n[h],
              A = Vi(t, I);
            a(A, I) && Xn(y, Ci(I, t), A);
          }
          return y;
        }
        function T0(t) {
          return function (n) {
            return Vi(n, t);
          };
        }
        function Ka(t, n, a, h) {
          var p = h ? tg : pn,
            y = -1,
            I = n.length,
            A = t;
          for (t === n && (n = dr(n)), a && (A = bt(t, wr(a))); ++y < I; )
            for (
              var j = 0, Q = n[y], Z = a ? a(Q) : Q;
              (j = p(A, Z, j, h)) > -1;

            )
              A !== t && Qs.call(A, j, 1), Qs.call(t, j, 1);
          return t;
        }
        function Sh(t, n) {
          for (var a = t ? n.length : 0, h = a - 1; a--; ) {
            var p = n[a];
            if (a == h || p !== y) {
              var y = p;
              di(p) ? Qs.call(t, p, 1) : Ga(t, p);
            }
          }
          return t;
        }
        function ka(t, n) {
          return t + to(nh() * (n - t + 1));
        }
        function R0(t, n, a, h) {
          for (var p = -1, y = kt(eo((n - t) / (a || 1)), 0), I = H(y); y--; )
            (I[h ? y : ++p] = t), (t += a);
          return I;
        }
        function Va(t, n) {
          var a = "";
          if (!t || n < 1 || n > k) return a;
          do n % 2 && (a += t), (n = to(n / 2)), n && (t += t);
          while (n);
          return a;
        }
        function Ke(t, n) {
          return uc(el(t, n, vr), t + "");
        }
        function N0(t) {
          return ah(xn(t));
        }
        function F0(t, n) {
          var a = xn(t);
          return bo(a, ki(n, 0, a.length));
        }
        function Xn(t, n, a, h) {
          if (!wt(t)) return t;
          n = Ci(n, t);
          for (
            var p = -1, y = n.length, I = y - 1, A = t;
            A != null && ++p < y;

          ) {
            var j = ei(n[p]),
              Q = a;
            if (j === "__proto__" || j === "constructor" || j === "prototype")
              return t;
            if (p != I) {
              var Z = A[j];
              (Q = h ? h(Z, j, A) : r),
                Q === r && (Q = wt(Z) ? Z : di(n[p + 1]) ? [] : {});
            }
            Wn(A, j, Q), (A = A[j]);
          }
          return t;
        }
        var Ih = ro
            ? function (t, n) {
                return ro.set(t, n), t;
              }
            : vr,
          L0 = Zs
            ? function (t, n) {
                return Zs(t, "toString", {
                  configurable: !0,
                  enumerable: !1,
                  value: bc(n),
                  writable: !0,
                });
              }
            : vr;
        function U0(t) {
          return bo(xn(t));
        }
        function Fr(t, n, a) {
          var h = -1,
            p = t.length;
          n < 0 && (n = -n > p ? 0 : p + n),
            (a = a > p ? p : a),
            a < 0 && (a += p),
            (p = n > a ? 0 : (a - n) >>> 0),
            (n >>>= 0);
          for (var y = H(p); ++h < p; ) y[h] = t[h + n];
          return y;
        }
        function $0(t, n) {
          var a;
          return (
            xi(t, function (h, p, y) {
              return (a = n(h, p, y)), !a;
            }),
            !!a
          );
        }
        function uo(t, n, a) {
          var h = 0,
            p = t == null ? h : t.length;
          if (typeof n == "number" && n === n && p <= oe) {
            for (; h < p; ) {
              var y = (h + p) >>> 1,
                I = t[y];
              I !== null && !Dr(I) && (a ? I <= n : I < n)
                ? (h = y + 1)
                : (p = y);
            }
            return p;
          }
          return Wa(t, n, vr, a);
        }
        function Wa(t, n, a, h) {
          var p = 0,
            y = t == null ? 0 : t.length;
          if (y === 0) return 0;
          n = a(n);
          for (
            var I = n !== n, A = n === null, j = Dr(n), Q = n === r;
            p < y;

          ) {
            var Z = to((p + y) / 2),
              ie = a(t[Z]),
              ue = ie !== r,
              ve = ie === null,
              Ee = ie === ie,
              qe = Dr(ie);
            if (I) var De = h || Ee;
            else
              Q
                ? (De = Ee && (h || ue))
                : A
                ? (De = Ee && ue && (h || !ve))
                : j
                ? (De = Ee && ue && !ve && (h || !qe))
                : ve || qe
                ? (De = !1)
                : (De = h ? ie <= n : ie < n);
            De ? (p = Z + 1) : (y = Z);
          }
          return Qt(y, me);
        }
        function xh(t, n) {
          for (var a = -1, h = t.length, p = 0, y = []; ++a < h; ) {
            var I = t[a],
              A = n ? n(I) : I;
            if (!a || !kr(A, j)) {
              var j = A;
              y[p++] = I === 0 ? 0 : I;
            }
          }
          return y;
        }
        function Oh(t) {
          return typeof t == "number" ? t : Dr(t) ? J : +t;
        }
        function Er(t) {
          if (typeof t == "string") return t;
          if (Re(t)) return bt(t, Er) + "";
          if (Dr(t)) return sh ? sh.call(t) : "";
          var n = t + "";
          return n == "0" && 1 / t == -X ? "-0" : n;
        }
        function Oi(t, n, a) {
          var h = -1,
            p = zs,
            y = t.length,
            I = !0,
            A = [],
            j = A;
          if (a) (I = !1), (p = Ea);
          else if (y >= o) {
            var Q = n ? null : G0(t);
            if (Q) return Ks(Q);
            (I = !1), (p = qn), (j = new Ki());
          } else j = n ? [] : A;
          e: for (; ++h < y; ) {
            var Z = t[h],
              ie = n ? n(Z) : Z;
            if (((Z = a || Z !== 0 ? Z : 0), I && ie === ie)) {
              for (var ue = j.length; ue--; ) if (j[ue] === ie) continue e;
              n && j.push(ie), A.push(Z);
            } else p(j, ie, a) || (j !== A && j.push(ie), A.push(Z));
          }
          return A;
        }
        function Ga(t, n) {
          return (
            (n = Ci(n, t)), (t = tl(t, n)), t == null || delete t[ei(Lr(n))]
          );
        }
        function Ch(t, n, a, h) {
          return Xn(t, n, a(Vi(t, n)), h);
        }
        function ho(t, n, a, h) {
          for (
            var p = t.length, y = h ? p : -1;
            (h ? y-- : ++y < p) && n(t[y], y, t);

          );
          return a
            ? Fr(t, h ? 0 : y, h ? y + 1 : p)
            : Fr(t, h ? y + 1 : 0, h ? p : y);
        }
        function Ah(t, n) {
          var a = t;
          return (
            a instanceof Ye && (a = a.value()),
            Da(
              n,
              function (h, p) {
                return p.func.apply(p.thisArg, Di([h], p.args));
              },
              a
            )
          );
        }
        function Ya(t, n, a) {
          var h = t.length;
          if (h < 2) return h ? Oi(t[0]) : [];
          for (var p = -1, y = H(h); ++p < h; )
            for (var I = t[p], A = -1; ++A < h; )
              A != p && (y[p] = Gn(y[p] || I, t[A], n, a));
          return Oi(Yt(y, 1), n, a);
        }
        function Ph(t, n, a) {
          for (var h = -1, p = t.length, y = n.length, I = {}; ++h < p; ) {
            var A = h < y ? n[h] : r;
            a(I, t[h], A);
          }
          return I;
        }
        function Ja(t) {
          return Rt(t) ? t : [];
        }
        function Xa(t) {
          return typeof t == "function" ? t : vr;
        }
        function Ci(t, n) {
          return Re(t) ? t : oc(t, n) ? [t] : sl(it(t));
        }
        var M0 = Ke;
        function Ai(t, n, a) {
          var h = t.length;
          return (a = a === r ? h : a), !n && a >= h ? t : Fr(t, n, a);
        }
        var Th =
          Ig ||
          function (t) {
            return Xe.clearTimeout(t);
          };
        function Rh(t, n) {
          if (n) return t.slice();
          var a = t.length,
            h = Zu ? Zu(a) : new t.constructor(a);
          return t.copy(h), h;
        }
        function Qa(t) {
          var n = new t.constructor(t.byteLength);
          return new Js(n).set(new Js(t)), n;
        }
        function j0(t, n) {
          var a = n ? Qa(t.buffer) : t.buffer;
          return new t.constructor(a, t.byteOffset, t.byteLength);
        }
        function B0(t) {
          var n = new t.constructor(t.source, Cr.exec(t));
          return (n.lastIndex = t.lastIndex), n;
        }
        function q0(t) {
          return Vn ? ht(Vn.call(t)) : {};
        }
        function Nh(t, n) {
          var a = n ? Qa(t.buffer) : t.buffer;
          return new t.constructor(a, t.byteOffset, t.length);
        }
        function Fh(t, n) {
          if (t !== n) {
            var a = t !== r,
              h = t === null,
              p = t === t,
              y = Dr(t),
              I = n !== r,
              A = n === null,
              j = n === n,
              Q = Dr(n);
            if (
              (!A && !Q && !y && t > n) ||
              (y && I && j && !A && !Q) ||
              (h && I && j) ||
              (!a && j) ||
              !p
            )
              return 1;
            if (
              (!h && !y && !Q && t < n) ||
              (Q && a && p && !h && !y) ||
              (A && a && p) ||
              (!I && p) ||
              !j
            )
              return -1;
          }
          return 0;
        }
        function z0(t, n, a) {
          for (
            var h = -1,
              p = t.criteria,
              y = n.criteria,
              I = p.length,
              A = a.length;
            ++h < I;

          ) {
            var j = Fh(p[h], y[h]);
            if (j) {
              if (h >= A) return j;
              var Q = a[h];
              return j * (Q == "desc" ? -1 : 1);
            }
          }
          return t.index - n.index;
        }
        function Lh(t, n, a, h) {
          for (
            var p = -1,
              y = t.length,
              I = a.length,
              A = -1,
              j = n.length,
              Q = kt(y - I, 0),
              Z = H(j + Q),
              ie = !h;
            ++A < j;

          )
            Z[A] = n[A];
          for (; ++p < I; ) (ie || p < y) && (Z[a[p]] = t[p]);
          for (; Q--; ) Z[A++] = t[p++];
          return Z;
        }
        function Uh(t, n, a, h) {
          for (
            var p = -1,
              y = t.length,
              I = -1,
              A = a.length,
              j = -1,
              Q = n.length,
              Z = kt(y - A, 0),
              ie = H(Z + Q),
              ue = !h;
            ++p < Z;

          )
            ie[p] = t[p];
          for (var ve = p; ++j < Q; ) ie[ve + j] = n[j];
          for (; ++I < A; ) (ue || p < y) && (ie[ve + a[I]] = t[p++]);
          return ie;
        }
        function dr(t, n) {
          var a = -1,
            h = t.length;
          for (n || (n = H(h)); ++a < h; ) n[a] = t[a];
          return n;
        }
        function Zr(t, n, a, h) {
          var p = !a;
          a || (a = {});
          for (var y = -1, I = n.length; ++y < I; ) {
            var A = n[y],
              j = h ? h(a[A], t[A], A, a, t) : r;
            j === r && (j = t[A]), p ? hi(a, A, j) : Wn(a, A, j);
          }
          return a;
        }
        function H0(t, n) {
          return Zr(t, sc(t), n);
        }
        function K0(t, n) {
          return Zr(t, Yh(t), n);
        }
        function lo(t, n) {
          return function (a, h) {
            var p = Re(a) ? Yp : f0,
              y = n ? n() : {};
            return p(a, t, be(h, 2), y);
          };
        }
        function En(t) {
          return Ke(function (n, a) {
            var h = -1,
              p = a.length,
              y = p > 1 ? a[p - 1] : r,
              I = p > 2 ? a[2] : r;
            for (
              y = t.length > 3 && typeof y == "function" ? (p--, y) : r,
                I && sr(a[0], a[1], I) && ((y = p < 3 ? r : y), (p = 1)),
                n = ht(n);
              ++h < p;

            ) {
              var A = a[h];
              A && t(n, A, h, y);
            }
            return n;
          });
        }
        function $h(t, n) {
          return function (a, h) {
            if (a == null) return a;
            if (!pr(a)) return t(a, h);
            for (
              var p = a.length, y = n ? p : -1, I = ht(a);
              (n ? y-- : ++y < p) && h(I[y], y, I) !== !1;

            );
            return a;
          };
        }
        function Mh(t) {
          return function (n, a, h) {
            for (var p = -1, y = ht(n), I = h(n), A = I.length; A--; ) {
              var j = I[t ? A : ++p];
              if (a(y[j], j, y) === !1) break;
            }
            return n;
          };
        }
        function k0(t, n, a) {
          var h = n & K,
            p = Qn(t);
          function y() {
            var I = this && this !== Xe && this instanceof y ? p : t;
            return I.apply(h ? a : this, arguments);
          }
          return y;
        }
        function jh(t) {
          return function (n) {
            n = it(n);
            var a = gn(n) ? Hr(n) : r,
              h = a ? a[0] : n.charAt(0),
              p = a ? Ai(a, 1).join("") : n.slice(1);
            return h[t]() + p;
          };
        }
        function Dn(t) {
          return function (n) {
            return Da($l(Ul(n).replace(jn, "")), t, "");
          };
        }
        function Qn(t) {
          return function () {
            var n = arguments;
            switch (n.length) {
              case 0:
                return new t();
              case 1:
                return new t(n[0]);
              case 2:
                return new t(n[0], n[1]);
              case 3:
                return new t(n[0], n[1], n[2]);
              case 4:
                return new t(n[0], n[1], n[2], n[3]);
              case 5:
                return new t(n[0], n[1], n[2], n[3], n[4]);
              case 6:
                return new t(n[0], n[1], n[2], n[3], n[4], n[5]);
              case 7:
                return new t(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
            }
            var a = wn(t.prototype),
              h = t.apply(a, n);
            return wt(h) ? h : a;
          };
        }
        function V0(t, n, a) {
          var h = Qn(t);
          function p() {
            for (var y = arguments.length, I = H(y), A = y, j = Sn(p); A--; )
              I[A] = arguments[A];
            var Q = y < 3 && I[0] !== j && I[y - 1] !== j ? [] : Si(I, j);
            if (((y -= Q.length), y < a))
              return Kh(t, n, fo, p.placeholder, r, I, Q, r, r, a - y);
            var Z = this && this !== Xe && this instanceof p ? h : t;
            return Vt(Z, this, I);
          }
          return p;
        }
        function Bh(t) {
          return function (n, a, h) {
            var p = ht(n);
            if (!pr(n)) {
              var y = be(a, 3);
              (n = Wt(n)),
                (a = function (A) {
                  return y(p[A], A, p);
                });
            }
            var I = t(n, a, h);
            return I > -1 ? p[y ? n[I] : I] : r;
          };
        }
        function qh(t) {
          return fi(function (n) {
            var a = n.length,
              h = a,
              p = Rr.prototype.thru;
            for (t && n.reverse(); h--; ) {
              var y = n[h];
              if (typeof y != "function") throw new Tr(d);
              if (p && !I && yo(y) == "wrapper") var I = new Rr([], !0);
            }
            for (h = I ? h : a; ++h < a; ) {
              y = n[h];
              var A = yo(y),
                j = A == "wrapper" ? ic(y) : r;
              j &&
              ac(j[0]) &&
              j[1] == (u | $ | C | _) &&
              !j[4].length &&
              j[9] == 1
                ? (I = I[yo(j[0])].apply(I, j[3]))
                : (I = y.length == 1 && ac(y) ? I[A]() : I.thru(y));
            }
            return function () {
              var Q = arguments,
                Z = Q[0];
              if (I && Q.length == 1 && Re(Z)) return I.plant(Z).value();
              for (var ie = 0, ue = a ? n[ie].apply(this, Q) : Z; ++ie < a; )
                ue = n[ie].call(this, ue);
              return ue;
            };
          });
        }
        function fo(t, n, a, h, p, y, I, A, j, Q) {
          var Z = n & u,
            ie = n & K,
            ue = n & ne,
            ve = n & ($ | S),
            Ee = n & W,
            qe = ue ? r : Qn(t);
          function De() {
            for (var We = arguments.length, Qe = H(We), Sr = We; Sr--; )
              Qe[Sr] = arguments[Sr];
            if (ve)
              var or = Sn(De),
                Ir = ng(Qe, or);
            if (
              (h && (Qe = Lh(Qe, h, p, ve)),
              y && (Qe = Uh(Qe, y, I, ve)),
              (We -= Ir),
              ve && We < Q)
            ) {
              var Nt = Si(Qe, or);
              return Kh(t, n, fo, De.placeholder, a, Qe, Nt, A, j, Q - We);
            }
            var Vr = ie ? a : this,
              vi = ue ? Vr[t] : t;
            return (
              (We = Qe.length),
              A ? (Qe = f1(Qe, A)) : Ee && We > 1 && Qe.reverse(),
              Z && j < We && (Qe.length = j),
              this && this !== Xe && this instanceof De && (vi = qe || Qn(vi)),
              vi.apply(Vr, Qe)
            );
          }
          return De;
        }
        function zh(t, n) {
          return function (a, h) {
            return m0(a, t, n(h), {});
          };
        }
        function po(t, n) {
          return function (a, h) {
            var p;
            if (a === r && h === r) return n;
            if ((a !== r && (p = a), h !== r)) {
              if (p === r) return h;
              typeof a == "string" || typeof h == "string"
                ? ((a = Er(a)), (h = Er(h)))
                : ((a = Oh(a)), (h = Oh(h))),
                (p = t(a, h));
            }
            return p;
          };
        }
        function Za(t) {
          return fi(function (n) {
            return (
              (n = bt(n, wr(be()))),
              Ke(function (a) {
                var h = this;
                return t(n, function (p) {
                  return Vt(p, h, a);
                });
              })
            );
          });
        }
        function go(t, n) {
          n = n === r ? " " : Er(n);
          var a = n.length;
          if (a < 2) return a ? Va(n, t) : n;
          var h = Va(n, eo(t / vn(n)));
          return gn(n) ? Ai(Hr(h), 0, t).join("") : h.slice(0, t);
        }
        function W0(t, n, a, h) {
          var p = n & K,
            y = Qn(t);
          function I() {
            for (
              var A = -1,
                j = arguments.length,
                Q = -1,
                Z = h.length,
                ie = H(Z + j),
                ue = this && this !== Xe && this instanceof I ? y : t;
              ++Q < Z;

            )
              ie[Q] = h[Q];
            for (; j--; ) ie[Q++] = arguments[++A];
            return Vt(ue, p ? a : this, ie);
          }
          return I;
        }
        function Hh(t) {
          return function (n, a, h) {
            return (
              h && typeof h != "number" && sr(n, a, h) && (a = h = r),
              (n = gi(n)),
              a === r ? ((a = n), (n = 0)) : (a = gi(a)),
              (h = h === r ? (n < a ? 1 : -1) : gi(h)),
              R0(n, a, h, t)
            );
          };
        }
        function vo(t) {
          return function (n, a) {
            return (
              (typeof n == "string" && typeof a == "string") ||
                ((n = Ur(n)), (a = Ur(a))),
              t(n, a)
            );
          };
        }
        function Kh(t, n, a, h, p, y, I, A, j, Q) {
          var Z = n & $,
            ie = Z ? I : r,
            ue = Z ? r : I,
            ve = Z ? y : r,
            Ee = Z ? r : y;
          (n |= Z ? C : m), (n &= ~(Z ? m : C)), n & T || (n &= ~(K | ne));
          var qe = [t, n, p, ve, ie, Ee, ue, A, j, Q],
            De = a.apply(r, qe);
          return ac(t) && rl(De, qe), (De.placeholder = h), il(De, t, n);
        }
        function ec(t) {
          var n = Kt[t];
          return function (a, h) {
            if (
              ((a = Ur(a)), (h = h == null ? 0 : Qt(Me(h), 292)), h && ih(a))
            ) {
              var p = (it(a) + "e").split("e"),
                y = n(p[0] + "e" + (+p[1] + h));
              return (
                (p = (it(y) + "e").split("e")), +(p[0] + "e" + (+p[1] - h))
              );
            }
            return n(a);
          };
        }
        var G0 =
          bn && 1 / Ks(new bn([, -0]))[1] == X
            ? function (t) {
                return new bn(t);
              }
            : Ec;
        function kh(t) {
          return function (n) {
            var a = Zt(n);
            return a == Ie ? Pa(n) : a == xe ? lg(n) : ig(n, t(n));
          };
        }
        function li(t, n, a, h, p, y, I, A) {
          var j = n & ne;
          if (!j && typeof t != "function") throw new Tr(d);
          var Q = h ? h.length : 0;
          if (
            (Q || ((n &= ~(C | m)), (h = p = r)),
            (I = I === r ? I : kt(Me(I), 0)),
            (A = A === r ? A : Me(A)),
            (Q -= p ? p.length : 0),
            n & m)
          ) {
            var Z = h,
              ie = p;
            h = p = r;
          }
          var ue = j ? r : ic(t),
            ve = [t, n, a, h, p, Z, ie, y, I, A];
          if (
            (ue && u1(ve, ue),
            (t = ve[0]),
            (n = ve[1]),
            (a = ve[2]),
            (h = ve[3]),
            (p = ve[4]),
            (A = ve[9] = ve[9] === r ? (j ? 0 : t.length) : kt(ve[9] - Q, 0)),
            !A && n & ($ | S) && (n &= ~($ | S)),
            !n || n == K)
          )
            var Ee = k0(t, n, a);
          else
            n == $ || n == S
              ? (Ee = V0(t, n, A))
              : (n == C || n == (K | C)) && !p.length
              ? (Ee = W0(t, n, a, h))
              : (Ee = fo.apply(r, ve));
          var qe = ue ? Ih : rl;
          return il(qe(Ee, ve), t, n);
        }
        function Vh(t, n, a, h) {
          return t === r || (kr(t, _n[a]) && !nt.call(h, a)) ? n : t;
        }
        function Wh(t, n, a, h, p, y) {
          return (
            wt(t) && wt(n) && (y.set(n, t), co(t, n, r, Wh, y), y.delete(n)), t
          );
        }
        function Y0(t) {
          return ts(t) ? r : t;
        }
        function Gh(t, n, a, h, p, y) {
          var I = a & P,
            A = t.length,
            j = n.length;
          if (A != j && !(I && j > A)) return !1;
          var Q = y.get(t),
            Z = y.get(n);
          if (Q && Z) return Q == n && Z == t;
          var ie = -1,
            ue = !0,
            ve = a & z ? new Ki() : r;
          for (y.set(t, n), y.set(n, t); ++ie < A; ) {
            var Ee = t[ie],
              qe = n[ie];
            if (h) var De = I ? h(qe, Ee, ie, n, t, y) : h(Ee, qe, ie, t, n, y);
            if (De !== r) {
              if (De) continue;
              ue = !1;
              break;
            }
            if (ve) {
              if (
                !Sa(n, function (We, Qe) {
                  if (!qn(ve, Qe) && (Ee === We || p(Ee, We, a, h, y)))
                    return ve.push(Qe);
                })
              ) {
                ue = !1;
                break;
              }
            } else if (!(Ee === qe || p(Ee, qe, a, h, y))) {
              ue = !1;
              break;
            }
          }
          return y.delete(t), y.delete(n), ue;
        }
        function J0(t, n, a, h, p, y, I) {
          switch (a) {
            case Ae:
              if (t.byteLength != n.byteLength || t.byteOffset != n.byteOffset)
                return !1;
              (t = t.buffer), (n = n.buffer);
            case Se:
              return !(
                t.byteLength != n.byteLength || !y(new Js(t), new Js(n))
              );
            case B:
            case F:
            case ze:
              return kr(+t, +n);
            case O:
              return t.name == n.name && t.message == n.message;
            case je:
            case Ne:
              return t == n + "";
            case Ie:
              var A = Pa;
            case xe:
              var j = h & P;
              if ((A || (A = Ks), t.size != n.size && !j)) return !1;
              var Q = I.get(t);
              if (Q) return Q == n;
              (h |= z), I.set(t, n);
              var Z = Gh(A(t), A(n), h, p, y, I);
              return I.delete(t), Z;
            case Fe:
              if (Vn) return Vn.call(t) == Vn.call(n);
          }
          return !1;
        }
        function X0(t, n, a, h, p, y) {
          var I = a & P,
            A = tc(t),
            j = A.length,
            Q = tc(n),
            Z = Q.length;
          if (j != Z && !I) return !1;
          for (var ie = j; ie--; ) {
            var ue = A[ie];
            if (!(I ? ue in n : nt.call(n, ue))) return !1;
          }
          var ve = y.get(t),
            Ee = y.get(n);
          if (ve && Ee) return ve == n && Ee == t;
          var qe = !0;
          y.set(t, n), y.set(n, t);
          for (var De = I; ++ie < j; ) {
            ue = A[ie];
            var We = t[ue],
              Qe = n[ue];
            if (h) var Sr = I ? h(Qe, We, ue, n, t, y) : h(We, Qe, ue, t, n, y);
            if (!(Sr === r ? We === Qe || p(We, Qe, a, h, y) : Sr)) {
              qe = !1;
              break;
            }
            De || (De = ue == "constructor");
          }
          if (qe && !De) {
            var or = t.constructor,
              Ir = n.constructor;
            or != Ir &&
              "constructor" in t &&
              "constructor" in n &&
              !(
                typeof or == "function" &&
                or instanceof or &&
                typeof Ir == "function" &&
                Ir instanceof Ir
              ) &&
              (qe = !1);
          }
          return y.delete(t), y.delete(n), qe;
        }
        function fi(t) {
          return uc(el(t, r, ul), t + "");
        }
        function tc(t) {
          return ph(t, Wt, sc);
        }
        function rc(t) {
          return ph(t, gr, Yh);
        }
        var ic = ro
          ? function (t) {
              return ro.get(t);
            }
          : Ec;
        function yo(t) {
          for (
            var n = t.name + "", a = mn[n], h = nt.call(mn, n) ? a.length : 0;
            h--;

          ) {
            var p = a[h],
              y = p.func;
            if (y == null || y == t) return p.name;
          }
          return n;
        }
        function Sn(t) {
          var n = nt.call(v, "placeholder") ? v : t;
          return n.placeholder;
        }
        function be() {
          var t = v.iteratee || mc;
          return (
            (t = t === mc ? yh : t),
            arguments.length ? t(arguments[0], arguments[1]) : t
          );
        }
        function _o(t, n) {
          var a = t.__data__;
          return s1(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
        }
        function nc(t) {
          for (var n = Wt(t), a = n.length; a--; ) {
            var h = n[a],
              p = t[h];
            n[a] = [h, p, Qh(p)];
          }
          return n;
        }
        function Wi(t, n) {
          var a = cg(t, n);
          return vh(a) ? a : r;
        }
        function Q0(t) {
          var n = nt.call(t, zi),
            a = t[zi];
          try {
            t[zi] = r;
            var h = !0;
          } catch {}
          var p = Gs.call(t);
          return h && (n ? (t[zi] = a) : delete t[zi]), p;
        }
        var sc = Ra
            ? function (t) {
                return t == null
                  ? []
                  : ((t = ht(t)),
                    Ei(Ra(t), function (n) {
                      return th.call(t, n);
                    }));
              }
            : Dc,
          Yh = Ra
            ? function (t) {
                for (var n = []; t; ) Di(n, sc(t)), (t = Xs(t));
                return n;
              }
            : Dc,
          Zt = nr;
        ((Na && Zt(new Na(new ArrayBuffer(1))) != Ae) ||
          (Hn && Zt(new Hn()) != Ie) ||
          (Fa && Zt(Fa.resolve()) != gt) ||
          (bn && Zt(new bn()) != xe) ||
          (Kn && Zt(new Kn()) != Ce)) &&
          (Zt = function (t) {
            var n = nr(t),
              a = n == $e ? t.constructor : r,
              h = a ? Gi(a) : "";
            if (h)
              switch (h) {
                case Fg:
                  return Ae;
                case Lg:
                  return Ie;
                case Ug:
                  return gt;
                case $g:
                  return xe;
                case Mg:
                  return Ce;
              }
            return n;
          });
        function Z0(t, n, a) {
          for (var h = -1, p = a.length; ++h < p; ) {
            var y = a[h],
              I = y.size;
            switch (y.type) {
              case "drop":
                t += I;
                break;
              case "dropRight":
                n -= I;
                break;
              case "take":
                n = Qt(n, t + I);
                break;
              case "takeRight":
                t = kt(t, n - I);
                break;
            }
          }
          return { start: t, end: n };
        }
        function e1(t) {
          var n = t.match(lt);
          return n ? n[1].split(jt) : [];
        }
        function Jh(t, n, a) {
          n = Ci(n, t);
          for (var h = -1, p = n.length, y = !1; ++h < p; ) {
            var I = ei(n[h]);
            if (!(y = t != null && a(t, I))) break;
            t = t[I];
          }
          return y || ++h != p
            ? y
            : ((p = t == null ? 0 : t.length),
              !!p && Io(p) && di(I, p) && (Re(t) || Yi(t)));
        }
        function t1(t) {
          var n = t.length,
            a = new t.constructor(n);
          return (
            n &&
              typeof t[0] == "string" &&
              nt.call(t, "index") &&
              ((a.index = t.index), (a.input = t.input)),
            a
          );
        }
        function Xh(t) {
          return typeof t.constructor == "function" && !Zn(t) ? wn(Xs(t)) : {};
        }
        function r1(t, n, a) {
          var h = t.constructor;
          switch (n) {
            case Se:
              return Qa(t);
            case B:
            case F:
              return new h(+t);
            case Ae:
              return j0(t, a);
            case He:
            case Oe:
            case Ve:
            case Ge:
            case et:
            case tt:
            case Je:
            case tr:
            case lr:
              return Nh(t, a);
            case Ie:
              return new h();
            case ze:
            case Ne:
              return new h(t);
            case je:
              return B0(t);
            case xe:
              return new h();
            case Fe:
              return q0(t);
          }
        }
        function i1(t, n) {
          var a = n.length;
          if (!a) return t;
          var h = a - 1;
          return (
            (n[h] = (a > 1 ? "& " : "") + n[h]),
            (n = n.join(a > 2 ? ", " : " ")),
            t.replace(
              Ot,
              `{
/* [wrapped with ` +
                n +
                `] */
`
            )
          );
        }
        function n1(t) {
          return Re(t) || Yi(t) || !!(rh && t && t[rh]);
        }
        function di(t, n) {
          var a = typeof t;
          return (
            (n = n ?? k),
            !!n &&
              (a == "number" || (a != "symbol" && ca.test(t))) &&
              t > -1 &&
              t % 1 == 0 &&
              t < n
          );
        }
        function sr(t, n, a) {
          if (!wt(a)) return !1;
          var h = typeof n;
          return (
            h == "number" ? pr(a) && di(n, a.length) : h == "string" && n in a
          )
            ? kr(a[n], t)
            : !1;
        }
        function oc(t, n) {
          if (Re(t)) return !1;
          var a = typeof t;
          return a == "number" ||
            a == "symbol" ||
            a == "boolean" ||
            t == null ||
            Dr(t)
            ? !0
            : Ut.test(t) || !_t.test(t) || (n != null && t in ht(n));
        }
        function s1(t) {
          var n = typeof t;
          return n == "string" ||
            n == "number" ||
            n == "symbol" ||
            n == "boolean"
            ? t !== "__proto__"
            : t === null;
        }
        function ac(t) {
          var n = yo(t),
            a = v[n];
          if (typeof a != "function" || !(n in Ye.prototype)) return !1;
          if (t === a) return !0;
          var h = ic(a);
          return !!h && t === h[0];
        }
        function o1(t) {
          return !!Qu && Qu in t;
        }
        var a1 = Vs ? pi : Sc;
        function Zn(t) {
          var n = t && t.constructor,
            a = (typeof n == "function" && n.prototype) || _n;
          return t === a;
        }
        function Qh(t) {
          return t === t && !wt(t);
        }
        function Zh(t, n) {
          return function (a) {
            return a == null ? !1 : a[t] === n && (n !== r || t in ht(a));
          };
        }
        function c1(t) {
          var n = Do(t, function (h) {
              return a.size === w && a.clear(), h;
            }),
            a = n.cache;
          return n;
        }
        function u1(t, n) {
          var a = t[1],
            h = n[1],
            p = a | h,
            y = p < (K | ne | u),
            I =
              (h == u && a == $) ||
              (h == u && a == _ && t[7].length <= n[8]) ||
              (h == (u | _) && n[7].length <= n[8] && a == $);
          if (!(y || I)) return t;
          h & K && ((t[2] = n[2]), (p |= a & K ? 0 : T));
          var A = n[3];
          if (A) {
            var j = t[3];
            (t[3] = j ? Lh(j, A, n[4]) : A), (t[4] = j ? Si(t[3], D) : n[4]);
          }
          return (
            (A = n[5]),
            A &&
              ((j = t[5]),
              (t[5] = j ? Uh(j, A, n[6]) : A),
              (t[6] = j ? Si(t[5], D) : n[6])),
            (A = n[7]),
            A && (t[7] = A),
            h & u && (t[8] = t[8] == null ? n[8] : Qt(t[8], n[8])),
            t[9] == null && (t[9] = n[9]),
            (t[0] = n[0]),
            (t[1] = p),
            t
          );
        }
        function h1(t) {
          var n = [];
          if (t != null) for (var a in ht(t)) n.push(a);
          return n;
        }
        function l1(t) {
          return Gs.call(t);
        }
        function el(t, n, a) {
          return (
            (n = kt(n === r ? t.length - 1 : n, 0)),
            function () {
              for (
                var h = arguments, p = -1, y = kt(h.length - n, 0), I = H(y);
                ++p < y;

              )
                I[p] = h[n + p];
              p = -1;
              for (var A = H(n + 1); ++p < n; ) A[p] = h[p];
              return (A[n] = a(I)), Vt(t, this, A);
            }
          );
        }
        function tl(t, n) {
          return n.length < 2 ? t : Vi(t, Fr(n, 0, -1));
        }
        function f1(t, n) {
          for (var a = t.length, h = Qt(n.length, a), p = dr(t); h--; ) {
            var y = n[h];
            t[h] = di(y, a) ? p[y] : r;
          }
          return t;
        }
        function cc(t, n) {
          if (
            !(n === "constructor" && typeof t[n] == "function") &&
            n != "__proto__"
          )
            return t[n];
        }
        var rl = nl(Ih),
          es =
            Og ||
            function (t, n) {
              return Xe.setTimeout(t, n);
            },
          uc = nl(L0);
        function il(t, n, a) {
          var h = n + "";
          return uc(t, i1(h, d1(e1(h), a)));
        }
        function nl(t) {
          var n = 0,
            a = 0;
          return function () {
            var h = Tg(),
              p = de - (h - a);
            if (((a = h), p > 0)) {
              if (++n >= ce) return arguments[0];
            } else n = 0;
            return t.apply(r, arguments);
          };
        }
        function bo(t, n) {
          var a = -1,
            h = t.length,
            p = h - 1;
          for (n = n === r ? h : n; ++a < n; ) {
            var y = ka(a, p),
              I = t[y];
            (t[y] = t[a]), (t[a] = I);
          }
          return (t.length = n), t;
        }
        var sl = c1(function (t) {
          var n = [];
          return (
            t.charCodeAt(0) === 46 && n.push(""),
            t.replace($t, function (a, h, p, y) {
              n.push(p ? y.replace(ra, "$1") : h || a);
            }),
            n
          );
        });
        function ei(t) {
          if (typeof t == "string" || Dr(t)) return t;
          var n = t + "";
          return n == "0" && 1 / t == -X ? "-0" : n;
        }
        function Gi(t) {
          if (t != null) {
            try {
              return Ws.call(t);
            } catch {}
            try {
              return t + "";
            } catch {}
          }
          return "";
        }
        function d1(t, n) {
          return (
            Pr(we, function (a) {
              var h = "_." + a[0];
              n & a[1] && !zs(t, h) && t.push(h);
            }),
            t.sort()
          );
        }
        function ol(t) {
          if (t instanceof Ye) return t.clone();
          var n = new Rr(t.__wrapped__, t.__chain__);
          return (
            (n.__actions__ = dr(t.__actions__)),
            (n.__index__ = t.__index__),
            (n.__values__ = t.__values__),
            n
          );
        }
        function p1(t, n, a) {
          (a ? sr(t, n, a) : n === r) ? (n = 1) : (n = kt(Me(n), 0));
          var h = t == null ? 0 : t.length;
          if (!h || n < 1) return [];
          for (var p = 0, y = 0, I = H(eo(h / n)); p < h; )
            I[y++] = Fr(t, p, (p += n));
          return I;
        }
        function g1(t) {
          for (
            var n = -1, a = t == null ? 0 : t.length, h = 0, p = [];
            ++n < a;

          ) {
            var y = t[n];
            y && (p[h++] = y);
          }
          return p;
        }
        function v1() {
          var t = arguments.length;
          if (!t) return [];
          for (var n = H(t - 1), a = arguments[0], h = t; h--; )
            n[h - 1] = arguments[h];
          return Di(Re(a) ? dr(a) : [a], Yt(n, 1));
        }
        var y1 = Ke(function (t, n) {
            return Rt(t) ? Gn(t, Yt(n, 1, Rt, !0)) : [];
          }),
          _1 = Ke(function (t, n) {
            var a = Lr(n);
            return (
              Rt(a) && (a = r), Rt(t) ? Gn(t, Yt(n, 1, Rt, !0), be(a, 2)) : []
            );
          }),
          b1 = Ke(function (t, n) {
            var a = Lr(n);
            return Rt(a) && (a = r), Rt(t) ? Gn(t, Yt(n, 1, Rt, !0), r, a) : [];
          });
        function m1(t, n, a) {
          var h = t == null ? 0 : t.length;
          return h
            ? ((n = a || n === r ? 1 : Me(n)), Fr(t, n < 0 ? 0 : n, h))
            : [];
        }
        function w1(t, n, a) {
          var h = t == null ? 0 : t.length;
          return h
            ? ((n = a || n === r ? 1 : Me(n)),
              (n = h - n),
              Fr(t, 0, n < 0 ? 0 : n))
            : [];
        }
        function E1(t, n) {
          return t && t.length ? ho(t, be(n, 3), !0, !0) : [];
        }
        function D1(t, n) {
          return t && t.length ? ho(t, be(n, 3), !0) : [];
        }
        function S1(t, n, a, h) {
          var p = t == null ? 0 : t.length;
          return p
            ? (a && typeof a != "number" && sr(t, n, a) && ((a = 0), (h = p)),
              v0(t, n, a, h))
            : [];
        }
        function al(t, n, a) {
          var h = t == null ? 0 : t.length;
          if (!h) return -1;
          var p = a == null ? 0 : Me(a);
          return p < 0 && (p = kt(h + p, 0)), Hs(t, be(n, 3), p);
        }
        function cl(t, n, a) {
          var h = t == null ? 0 : t.length;
          if (!h) return -1;
          var p = h - 1;
          return (
            a !== r && ((p = Me(a)), (p = a < 0 ? kt(h + p, 0) : Qt(p, h - 1))),
            Hs(t, be(n, 3), p, !0)
          );
        }
        function ul(t) {
          var n = t == null ? 0 : t.length;
          return n ? Yt(t, 1) : [];
        }
        function I1(t) {
          var n = t == null ? 0 : t.length;
          return n ? Yt(t, X) : [];
        }
        function x1(t, n) {
          var a = t == null ? 0 : t.length;
          return a ? ((n = n === r ? 1 : Me(n)), Yt(t, n)) : [];
        }
        function O1(t) {
          for (var n = -1, a = t == null ? 0 : t.length, h = {}; ++n < a; ) {
            var p = t[n];
            h[p[0]] = p[1];
          }
          return h;
        }
        function hl(t) {
          return t && t.length ? t[0] : r;
        }
        function C1(t, n, a) {
          var h = t == null ? 0 : t.length;
          if (!h) return -1;
          var p = a == null ? 0 : Me(a);
          return p < 0 && (p = kt(h + p, 0)), pn(t, n, p);
        }
        function A1(t) {
          var n = t == null ? 0 : t.length;
          return n ? Fr(t, 0, -1) : [];
        }
        var P1 = Ke(function (t) {
            var n = bt(t, Ja);
            return n.length && n[0] === t[0] ? Ba(n) : [];
          }),
          T1 = Ke(function (t) {
            var n = Lr(t),
              a = bt(t, Ja);
            return (
              n === Lr(a) ? (n = r) : a.pop(),
              a.length && a[0] === t[0] ? Ba(a, be(n, 2)) : []
            );
          }),
          R1 = Ke(function (t) {
            var n = Lr(t),
              a = bt(t, Ja);
            return (
              (n = typeof n == "function" ? n : r),
              n && a.pop(),
              a.length && a[0] === t[0] ? Ba(a, r, n) : []
            );
          });
        function N1(t, n) {
          return t == null ? "" : Ag.call(t, n);
        }
        function Lr(t) {
          var n = t == null ? 0 : t.length;
          return n ? t[n - 1] : r;
        }
        function F1(t, n, a) {
          var h = t == null ? 0 : t.length;
          if (!h) return -1;
          var p = h;
          return (
            a !== r && ((p = Me(a)), (p = p < 0 ? kt(h + p, 0) : Qt(p, h - 1))),
            n === n ? dg(t, n, p) : Hs(t, Ku, p, !0)
          );
        }
        function L1(t, n) {
          return t && t.length ? wh(t, Me(n)) : r;
        }
        var U1 = Ke(ll);
        function ll(t, n) {
          return t && t.length && n && n.length ? Ka(t, n) : t;
        }
        function $1(t, n, a) {
          return t && t.length && n && n.length ? Ka(t, n, be(a, 2)) : t;
        }
        function M1(t, n, a) {
          return t && t.length && n && n.length ? Ka(t, n, r, a) : t;
        }
        var j1 = fi(function (t, n) {
          var a = t == null ? 0 : t.length,
            h = Ua(t, n);
          return (
            Sh(
              t,
              bt(n, function (p) {
                return di(p, a) ? +p : p;
              }).sort(Fh)
            ),
            h
          );
        });
        function B1(t, n) {
          var a = [];
          if (!(t && t.length)) return a;
          var h = -1,
            p = [],
            y = t.length;
          for (n = be(n, 3); ++h < y; ) {
            var I = t[h];
            n(I, h, t) && (a.push(I), p.push(h));
          }
          return Sh(t, p), a;
        }
        function hc(t) {
          return t == null ? t : Ng.call(t);
        }
        function q1(t, n, a) {
          var h = t == null ? 0 : t.length;
          return h
            ? (a && typeof a != "number" && sr(t, n, a)
                ? ((n = 0), (a = h))
                : ((n = n == null ? 0 : Me(n)), (a = a === r ? h : Me(a))),
              Fr(t, n, a))
            : [];
        }
        function z1(t, n) {
          return uo(t, n);
        }
        function H1(t, n, a) {
          return Wa(t, n, be(a, 2));
        }
        function K1(t, n) {
          var a = t == null ? 0 : t.length;
          if (a) {
            var h = uo(t, n);
            if (h < a && kr(t[h], n)) return h;
          }
          return -1;
        }
        function k1(t, n) {
          return uo(t, n, !0);
        }
        function V1(t, n, a) {
          return Wa(t, n, be(a, 2), !0);
        }
        function W1(t, n) {
          var a = t == null ? 0 : t.length;
          if (a) {
            var h = uo(t, n, !0) - 1;
            if (kr(t[h], n)) return h;
          }
          return -1;
        }
        function G1(t) {
          return t && t.length ? xh(t) : [];
        }
        function Y1(t, n) {
          return t && t.length ? xh(t, be(n, 2)) : [];
        }
        function J1(t) {
          var n = t == null ? 0 : t.length;
          return n ? Fr(t, 1, n) : [];
        }
        function X1(t, n, a) {
          return t && t.length
            ? ((n = a || n === r ? 1 : Me(n)), Fr(t, 0, n < 0 ? 0 : n))
            : [];
        }
        function Q1(t, n, a) {
          var h = t == null ? 0 : t.length;
          return h
            ? ((n = a || n === r ? 1 : Me(n)),
              (n = h - n),
              Fr(t, n < 0 ? 0 : n, h))
            : [];
        }
        function Z1(t, n) {
          return t && t.length ? ho(t, be(n, 3), !1, !0) : [];
        }
        function ev(t, n) {
          return t && t.length ? ho(t, be(n, 3)) : [];
        }
        var tv = Ke(function (t) {
            return Oi(Yt(t, 1, Rt, !0));
          }),
          rv = Ke(function (t) {
            var n = Lr(t);
            return Rt(n) && (n = r), Oi(Yt(t, 1, Rt, !0), be(n, 2));
          }),
          iv = Ke(function (t) {
            var n = Lr(t);
            return (
              (n = typeof n == "function" ? n : r), Oi(Yt(t, 1, Rt, !0), r, n)
            );
          });
        function nv(t) {
          return t && t.length ? Oi(t) : [];
        }
        function sv(t, n) {
          return t && t.length ? Oi(t, be(n, 2)) : [];
        }
        function ov(t, n) {
          return (
            (n = typeof n == "function" ? n : r),
            t && t.length ? Oi(t, r, n) : []
          );
        }
        function lc(t) {
          if (!(t && t.length)) return [];
          var n = 0;
          return (
            (t = Ei(t, function (a) {
              if (Rt(a)) return (n = kt(a.length, n)), !0;
            })),
            Ca(n, function (a) {
              return bt(t, Ia(a));
            })
          );
        }
        function fl(t, n) {
          if (!(t && t.length)) return [];
          var a = lc(t);
          return n == null
            ? a
            : bt(a, function (h) {
                return Vt(n, r, h);
              });
        }
        var av = Ke(function (t, n) {
            return Rt(t) ? Gn(t, n) : [];
          }),
          cv = Ke(function (t) {
            return Ya(Ei(t, Rt));
          }),
          uv = Ke(function (t) {
            var n = Lr(t);
            return Rt(n) && (n = r), Ya(Ei(t, Rt), be(n, 2));
          }),
          hv = Ke(function (t) {
            var n = Lr(t);
            return (n = typeof n == "function" ? n : r), Ya(Ei(t, Rt), r, n);
          }),
          lv = Ke(lc);
        function fv(t, n) {
          return Ph(t || [], n || [], Wn);
        }
        function dv(t, n) {
          return Ph(t || [], n || [], Xn);
        }
        var pv = Ke(function (t) {
          var n = t.length,
            a = n > 1 ? t[n - 1] : r;
          return (a = typeof a == "function" ? (t.pop(), a) : r), fl(t, a);
        });
        function dl(t) {
          var n = v(t);
          return (n.__chain__ = !0), n;
        }
        function gv(t, n) {
          return n(t), t;
        }
        function mo(t, n) {
          return n(t);
        }
        var vv = fi(function (t) {
          var n = t.length,
            a = n ? t[0] : 0,
            h = this.__wrapped__,
            p = function (y) {
              return Ua(y, t);
            };
          return n > 1 ||
            this.__actions__.length ||
            !(h instanceof Ye) ||
            !di(a)
            ? this.thru(p)
            : ((h = h.slice(a, +a + (n ? 1 : 0))),
              h.__actions__.push({ func: mo, args: [p], thisArg: r }),
              new Rr(h, this.__chain__).thru(function (y) {
                return n && !y.length && y.push(r), y;
              }));
        });
        function yv() {
          return dl(this);
        }
        function _v() {
          return new Rr(this.value(), this.__chain__);
        }
        function bv() {
          this.__values__ === r && (this.__values__ = Ol(this.value()));
          var t = this.__index__ >= this.__values__.length,
            n = t ? r : this.__values__[this.__index__++];
          return { done: t, value: n };
        }
        function mv() {
          return this;
        }
        function wv(t) {
          for (var n, a = this; a instanceof no; ) {
            var h = ol(a);
            (h.__index__ = 0),
              (h.__values__ = r),
              n ? (p.__wrapped__ = h) : (n = h);
            var p = h;
            a = a.__wrapped__;
          }
          return (p.__wrapped__ = t), n;
        }
        function Ev() {
          var t = this.__wrapped__;
          if (t instanceof Ye) {
            var n = t;
            return (
              this.__actions__.length && (n = new Ye(this)),
              (n = n.reverse()),
              n.__actions__.push({ func: mo, args: [hc], thisArg: r }),
              new Rr(n, this.__chain__)
            );
          }
          return this.thru(hc);
        }
        function Dv() {
          return Ah(this.__wrapped__, this.__actions__);
        }
        var Sv = lo(function (t, n, a) {
          nt.call(t, a) ? ++t[a] : hi(t, a, 1);
        });
        function Iv(t, n, a) {
          var h = Re(t) ? zu : g0;
          return a && sr(t, n, a) && (n = r), h(t, be(n, 3));
        }
        function xv(t, n) {
          var a = Re(t) ? Ei : fh;
          return a(t, be(n, 3));
        }
        var Ov = Bh(al),
          Cv = Bh(cl);
        function Av(t, n) {
          return Yt(wo(t, n), 1);
        }
        function Pv(t, n) {
          return Yt(wo(t, n), X);
        }
        function Tv(t, n, a) {
          return (a = a === r ? 1 : Me(a)), Yt(wo(t, n), a);
        }
        function pl(t, n) {
          var a = Re(t) ? Pr : xi;
          return a(t, be(n, 3));
        }
        function gl(t, n) {
          var a = Re(t) ? Jp : lh;
          return a(t, be(n, 3));
        }
        var Rv = lo(function (t, n, a) {
          nt.call(t, a) ? t[a].push(n) : hi(t, a, [n]);
        });
        function Nv(t, n, a, h) {
          (t = pr(t) ? t : xn(t)), (a = a && !h ? Me(a) : 0);
          var p = t.length;
          return (
            a < 0 && (a = kt(p + a, 0)),
            xo(t) ? a <= p && t.indexOf(n, a) > -1 : !!p && pn(t, n, a) > -1
          );
        }
        var Fv = Ke(function (t, n, a) {
            var h = -1,
              p = typeof n == "function",
              y = pr(t) ? H(t.length) : [];
            return (
              xi(t, function (I) {
                y[++h] = p ? Vt(n, I, a) : Yn(I, n, a);
              }),
              y
            );
          }),
          Lv = lo(function (t, n, a) {
            hi(t, a, n);
          });
        function wo(t, n) {
          var a = Re(t) ? bt : _h;
          return a(t, be(n, 3));
        }
        function Uv(t, n, a, h) {
          return t == null
            ? []
            : (Re(n) || (n = n == null ? [] : [n]),
              (a = h ? r : a),
              Re(a) || (a = a == null ? [] : [a]),
              Eh(t, n, a));
        }
        var $v = lo(
          function (t, n, a) {
            t[a ? 0 : 1].push(n);
          },
          function () {
            return [[], []];
          }
        );
        function Mv(t, n, a) {
          var h = Re(t) ? Da : Vu,
            p = arguments.length < 3;
          return h(t, be(n, 4), a, p, xi);
        }
        function jv(t, n, a) {
          var h = Re(t) ? Xp : Vu,
            p = arguments.length < 3;
          return h(t, be(n, 4), a, p, lh);
        }
        function Bv(t, n) {
          var a = Re(t) ? Ei : fh;
          return a(t, So(be(n, 3)));
        }
        function qv(t) {
          var n = Re(t) ? ah : N0;
          return n(t);
        }
        function zv(t, n, a) {
          (a ? sr(t, n, a) : n === r) ? (n = 1) : (n = Me(n));
          var h = Re(t) ? h0 : F0;
          return h(t, n);
        }
        function Hv(t) {
          var n = Re(t) ? l0 : U0;
          return n(t);
        }
        function Kv(t) {
          if (t == null) return 0;
          if (pr(t)) return xo(t) ? vn(t) : t.length;
          var n = Zt(t);
          return n == Ie || n == xe ? t.size : za(t).length;
        }
        function kv(t, n, a) {
          var h = Re(t) ? Sa : $0;
          return a && sr(t, n, a) && (n = r), h(t, be(n, 3));
        }
        var Vv = Ke(function (t, n) {
            if (t == null) return [];
            var a = n.length;
            return (
              a > 1 && sr(t, n[0], n[1])
                ? (n = [])
                : a > 2 && sr(n[0], n[1], n[2]) && (n = [n[0]]),
              Eh(t, Yt(n, 1), [])
            );
          }),
          Eo =
            xg ||
            function () {
              return Xe.Date.now();
            };
        function Wv(t, n) {
          if (typeof n != "function") throw new Tr(d);
          return (
            (t = Me(t)),
            function () {
              if (--t < 1) return n.apply(this, arguments);
            }
          );
        }
        function vl(t, n, a) {
          return (
            (n = a ? r : n),
            (n = t && n == null ? t.length : n),
            li(t, u, r, r, r, r, n)
          );
        }
        function yl(t, n) {
          var a;
          if (typeof n != "function") throw new Tr(d);
          return (
            (t = Me(t)),
            function () {
              return (
                --t > 0 && (a = n.apply(this, arguments)), t <= 1 && (n = r), a
              );
            }
          );
        }
        var fc = Ke(function (t, n, a) {
            var h = K;
            if (a.length) {
              var p = Si(a, Sn(fc));
              h |= C;
            }
            return li(t, h, n, a, p);
          }),
          _l = Ke(function (t, n, a) {
            var h = K | ne;
            if (a.length) {
              var p = Si(a, Sn(_l));
              h |= C;
            }
            return li(n, h, t, a, p);
          });
        function bl(t, n, a) {
          n = a ? r : n;
          var h = li(t, $, r, r, r, r, r, n);
          return (h.placeholder = bl.placeholder), h;
        }
        function ml(t, n, a) {
          n = a ? r : n;
          var h = li(t, S, r, r, r, r, r, n);
          return (h.placeholder = ml.placeholder), h;
        }
        function wl(t, n, a) {
          var h,
            p,
            y,
            I,
            A,
            j,
            Q = 0,
            Z = !1,
            ie = !1,
            ue = !0;
          if (typeof t != "function") throw new Tr(d);
          (n = Ur(n) || 0),
            wt(a) &&
              ((Z = !!a.leading),
              (ie = "maxWait" in a),
              (y = ie ? kt(Ur(a.maxWait) || 0, n) : y),
              (ue = "trailing" in a ? !!a.trailing : ue));
          function ve(Nt) {
            var Vr = h,
              vi = p;
            return (h = p = r), (Q = Nt), (I = t.apply(vi, Vr)), I;
          }
          function Ee(Nt) {
            return (Q = Nt), (A = es(We, n)), Z ? ve(Nt) : I;
          }
          function qe(Nt) {
            var Vr = Nt - j,
              vi = Nt - Q,
              Bl = n - Vr;
            return ie ? Qt(Bl, y - vi) : Bl;
          }
          function De(Nt) {
            var Vr = Nt - j,
              vi = Nt - Q;
            return j === r || Vr >= n || Vr < 0 || (ie && vi >= y);
          }
          function We() {
            var Nt = Eo();
            if (De(Nt)) return Qe(Nt);
            A = es(We, qe(Nt));
          }
          function Qe(Nt) {
            return (A = r), ue && h ? ve(Nt) : ((h = p = r), I);
          }
          function Sr() {
            A !== r && Th(A), (Q = 0), (h = j = p = A = r);
          }
          function or() {
            return A === r ? I : Qe(Eo());
          }
          function Ir() {
            var Nt = Eo(),
              Vr = De(Nt);
            if (((h = arguments), (p = this), (j = Nt), Vr)) {
              if (A === r) return Ee(j);
              if (ie) return Th(A), (A = es(We, n)), ve(j);
            }
            return A === r && (A = es(We, n)), I;
          }
          return (Ir.cancel = Sr), (Ir.flush = or), Ir;
        }
        var Gv = Ke(function (t, n) {
            return hh(t, 1, n);
          }),
          Yv = Ke(function (t, n, a) {
            return hh(t, Ur(n) || 0, a);
          });
        function Jv(t) {
          return li(t, W);
        }
        function Do(t, n) {
          if (typeof t != "function" || (n != null && typeof n != "function"))
            throw new Tr(d);
          var a = function () {
            var h = arguments,
              p = n ? n.apply(this, h) : h[0],
              y = a.cache;
            if (y.has(p)) return y.get(p);
            var I = t.apply(this, h);
            return (a.cache = y.set(p, I) || y), I;
          };
          return (a.cache = new (Do.Cache || ui)()), a;
        }
        Do.Cache = ui;
        function So(t) {
          if (typeof t != "function") throw new Tr(d);
          return function () {
            var n = arguments;
            switch (n.length) {
              case 0:
                return !t.call(this);
              case 1:
                return !t.call(this, n[0]);
              case 2:
                return !t.call(this, n[0], n[1]);
              case 3:
                return !t.call(this, n[0], n[1], n[2]);
            }
            return !t.apply(this, n);
          };
        }
        function Xv(t) {
          return yl(2, t);
        }
        var Qv = M0(function (t, n) {
            n =
              n.length == 1 && Re(n[0])
                ? bt(n[0], wr(be()))
                : bt(Yt(n, 1), wr(be()));
            var a = n.length;
            return Ke(function (h) {
              for (var p = -1, y = Qt(h.length, a); ++p < y; )
                h[p] = n[p].call(this, h[p]);
              return Vt(t, this, h);
            });
          }),
          dc = Ke(function (t, n) {
            var a = Si(n, Sn(dc));
            return li(t, C, r, n, a);
          }),
          El = Ke(function (t, n) {
            var a = Si(n, Sn(El));
            return li(t, m, r, n, a);
          }),
          Zv = fi(function (t, n) {
            return li(t, _, r, r, r, n);
          });
        function ey(t, n) {
          if (typeof t != "function") throw new Tr(d);
          return (n = n === r ? n : Me(n)), Ke(t, n);
        }
        function ty(t, n) {
          if (typeof t != "function") throw new Tr(d);
          return (
            (n = n == null ? 0 : kt(Me(n), 0)),
            Ke(function (a) {
              var h = a[n],
                p = Ai(a, 0, n);
              return h && Di(p, h), Vt(t, this, p);
            })
          );
        }
        function ry(t, n, a) {
          var h = !0,
            p = !0;
          if (typeof t != "function") throw new Tr(d);
          return (
            wt(a) &&
              ((h = "leading" in a ? !!a.leading : h),
              (p = "trailing" in a ? !!a.trailing : p)),
            wl(t, n, { leading: h, maxWait: n, trailing: p })
          );
        }
        function iy(t) {
          return vl(t, 1);
        }
        function ny(t, n) {
          return dc(Xa(n), t);
        }
        function sy() {
          if (!arguments.length) return [];
          var t = arguments[0];
          return Re(t) ? t : [t];
        }
        function oy(t) {
          return Nr(t, N);
        }
        function ay(t, n) {
          return (n = typeof n == "function" ? n : r), Nr(t, N, n);
        }
        function cy(t) {
          return Nr(t, R | N);
        }
        function uy(t, n) {
          return (n = typeof n == "function" ? n : r), Nr(t, R | N, n);
        }
        function hy(t, n) {
          return n == null || uh(t, n, Wt(n));
        }
        function kr(t, n) {
          return t === n || (t !== t && n !== n);
        }
        var ly = vo(ja),
          fy = vo(function (t, n) {
            return t >= n;
          }),
          Yi = gh(
            (function () {
              return arguments;
            })()
          )
            ? gh
            : function (t) {
                return Ct(t) && nt.call(t, "callee") && !th.call(t, "callee");
              },
          Re = H.isArray,
          dy = ir ? wr(ir) : w0;
        function pr(t) {
          return t != null && Io(t.length) && !pi(t);
        }
        function Rt(t) {
          return Ct(t) && pr(t);
        }
        function py(t) {
          return t === !0 || t === !1 || (Ct(t) && nr(t) == B);
        }
        var Pi = Cg || Sc,
          gy = zr ? wr(zr) : E0;
        function vy(t) {
          return Ct(t) && t.nodeType === 1 && !ts(t);
        }
        function yy(t) {
          if (t == null) return !0;
          if (
            pr(t) &&
            (Re(t) ||
              typeof t == "string" ||
              typeof t.splice == "function" ||
              Pi(t) ||
              In(t) ||
              Yi(t))
          )
            return !t.length;
          var n = Zt(t);
          if (n == Ie || n == xe) return !t.size;
          if (Zn(t)) return !za(t).length;
          for (var a in t) if (nt.call(t, a)) return !1;
          return !0;
        }
        function _y(t, n) {
          return Jn(t, n);
        }
        function by(t, n, a) {
          a = typeof a == "function" ? a : r;
          var h = a ? a(t, n) : r;
          return h === r ? Jn(t, n, r, a) : !!h;
        }
        function pc(t) {
          if (!Ct(t)) return !1;
          var n = nr(t);
          return (
            n == O ||
            n == l ||
            (typeof t.message == "string" &&
              typeof t.name == "string" &&
              !ts(t))
          );
        }
        function my(t) {
          return typeof t == "number" && ih(t);
        }
        function pi(t) {
          if (!wt(t)) return !1;
          var n = nr(t);
          return n == ae || n == fe || n == q || n == vt;
        }
        function Dl(t) {
          return typeof t == "number" && t == Me(t);
        }
        function Io(t) {
          return typeof t == "number" && t > -1 && t % 1 == 0 && t <= k;
        }
        function wt(t) {
          var n = typeof t;
          return t != null && (n == "object" || n == "function");
        }
        function Ct(t) {
          return t != null && typeof t == "object";
        }
        var Sl = Ar ? wr(Ar) : S0;
        function wy(t, n) {
          return t === n || qa(t, n, nc(n));
        }
        function Ey(t, n, a) {
          return (a = typeof a == "function" ? a : r), qa(t, n, nc(n), a);
        }
        function Dy(t) {
          return Il(t) && t != +t;
        }
        function Sy(t) {
          if (a1(t)) throw new Pe(c);
          return vh(t);
        }
        function Iy(t) {
          return t === null;
        }
        function xy(t) {
          return t == null;
        }
        function Il(t) {
          return typeof t == "number" || (Ct(t) && nr(t) == ze);
        }
        function ts(t) {
          if (!Ct(t) || nr(t) != $e) return !1;
          var n = Xs(t);
          if (n === null) return !0;
          var a = nt.call(n, "constructor") && n.constructor;
          return typeof a == "function" && a instanceof a && Ws.call(a) == Eg;
        }
        var gc = Xr ? wr(Xr) : I0;
        function Oy(t) {
          return Dl(t) && t >= -k && t <= k;
        }
        var xl = Bn ? wr(Bn) : x0;
        function xo(t) {
          return typeof t == "string" || (!Re(t) && Ct(t) && nr(t) == Ne);
        }
        function Dr(t) {
          return typeof t == "symbol" || (Ct(t) && nr(t) == Fe);
        }
        var In = qi ? wr(qi) : O0;
        function Cy(t) {
          return t === r;
        }
        function Ay(t) {
          return Ct(t) && Zt(t) == Ce;
        }
        function Py(t) {
          return Ct(t) && nr(t) == Le;
        }
        var Ty = vo(Ha),
          Ry = vo(function (t, n) {
            return t <= n;
          });
        function Ol(t) {
          if (!t) return [];
          if (pr(t)) return xo(t) ? Hr(t) : dr(t);
          if (zn && t[zn]) return hg(t[zn]());
          var n = Zt(t),
            a = n == Ie ? Pa : n == xe ? Ks : xn;
          return a(t);
        }
        function gi(t) {
          if (!t) return t === 0 ? t : 0;
          if (((t = Ur(t)), t === X || t === -X)) {
            var n = t < 0 ? -1 : 1;
            return n * V;
          }
          return t === t ? t : 0;
        }
        function Me(t) {
          var n = gi(t),
            a = n % 1;
          return n === n ? (a ? n - a : n) : 0;
        }
        function Cl(t) {
          return t ? ki(Me(t), 0, re) : 0;
        }
        function Ur(t) {
          if (typeof t == "number") return t;
          if (Dr(t)) return J;
          if (wt(t)) {
            var n = typeof t.valueOf == "function" ? t.valueOf() : t;
            t = wt(n) ? n + "" : n;
          }
          if (typeof t != "string") return t === 0 ? t : +t;
          t = Wu(t);
          var a = sa.test(t);
          return a || aa.test(t)
            ? Te(t.slice(2), a ? 2 : 8)
            : na.test(t)
            ? J
            : +t;
        }
        function Al(t) {
          return Zr(t, gr(t));
        }
        function Ny(t) {
          return t ? ki(Me(t), -k, k) : t === 0 ? t : 0;
        }
        function it(t) {
          return t == null ? "" : Er(t);
        }
        var Fy = En(function (t, n) {
            if (Zn(n) || pr(n)) {
              Zr(n, Wt(n), t);
              return;
            }
            for (var a in n) nt.call(n, a) && Wn(t, a, n[a]);
          }),
          Pl = En(function (t, n) {
            Zr(n, gr(n), t);
          }),
          Oo = En(function (t, n, a, h) {
            Zr(n, gr(n), t, h);
          }),
          Ly = En(function (t, n, a, h) {
            Zr(n, Wt(n), t, h);
          }),
          Uy = fi(Ua);
        function $y(t, n) {
          var a = wn(t);
          return n == null ? a : ch(a, n);
        }
        var My = Ke(function (t, n) {
            t = ht(t);
            var a = -1,
              h = n.length,
              p = h > 2 ? n[2] : r;
            for (p && sr(n[0], n[1], p) && (h = 1); ++a < h; )
              for (var y = n[a], I = gr(y), A = -1, j = I.length; ++A < j; ) {
                var Q = I[A],
                  Z = t[Q];
                (Z === r || (kr(Z, _n[Q]) && !nt.call(t, Q))) && (t[Q] = y[Q]);
              }
            return t;
          }),
          jy = Ke(function (t) {
            return t.push(r, Wh), Vt(Tl, r, t);
          });
        function By(t, n) {
          return Hu(t, be(n, 3), Qr);
        }
        function qy(t, n) {
          return Hu(t, be(n, 3), Ma);
        }
        function zy(t, n) {
          return t == null ? t : $a(t, be(n, 3), gr);
        }
        function Hy(t, n) {
          return t == null ? t : dh(t, be(n, 3), gr);
        }
        function Ky(t, n) {
          return t && Qr(t, be(n, 3));
        }
        function ky(t, n) {
          return t && Ma(t, be(n, 3));
        }
        function Vy(t) {
          return t == null ? [] : ao(t, Wt(t));
        }
        function Wy(t) {
          return t == null ? [] : ao(t, gr(t));
        }
        function vc(t, n, a) {
          var h = t == null ? r : Vi(t, n);
          return h === r ? a : h;
        }
        function Gy(t, n) {
          return t != null && Jh(t, n, y0);
        }
        function yc(t, n) {
          return t != null && Jh(t, n, _0);
        }
        var Yy = zh(function (t, n, a) {
            n != null && typeof n.toString != "function" && (n = Gs.call(n)),
              (t[n] = a);
          }, bc(vr)),
          Jy = zh(function (t, n, a) {
            n != null && typeof n.toString != "function" && (n = Gs.call(n)),
              nt.call(t, n) ? t[n].push(a) : (t[n] = [a]);
          }, be),
          Xy = Ke(Yn);
        function Wt(t) {
          return pr(t) ? oh(t) : za(t);
        }
        function gr(t) {
          return pr(t) ? oh(t, !0) : C0(t);
        }
        function Qy(t, n) {
          var a = {};
          return (
            (n = be(n, 3)),
            Qr(t, function (h, p, y) {
              hi(a, n(h, p, y), h);
            }),
            a
          );
        }
        function Zy(t, n) {
          var a = {};
          return (
            (n = be(n, 3)),
            Qr(t, function (h, p, y) {
              hi(a, p, n(h, p, y));
            }),
            a
          );
        }
        var e_ = En(function (t, n, a) {
            co(t, n, a);
          }),
          Tl = En(function (t, n, a, h) {
            co(t, n, a, h);
          }),
          t_ = fi(function (t, n) {
            var a = {};
            if (t == null) return a;
            var h = !1;
            (n = bt(n, function (y) {
              return (y = Ci(y, t)), h || (h = y.length > 1), y;
            })),
              Zr(t, rc(t), a),
              h && (a = Nr(a, R | U | N, Y0));
            for (var p = n.length; p--; ) Ga(a, n[p]);
            return a;
          });
        function r_(t, n) {
          return Rl(t, So(be(n)));
        }
        var i_ = fi(function (t, n) {
          return t == null ? {} : P0(t, n);
        });
        function Rl(t, n) {
          if (t == null) return {};
          var a = bt(rc(t), function (h) {
            return [h];
          });
          return (
            (n = be(n)),
            Dh(t, a, function (h, p) {
              return n(h, p[0]);
            })
          );
        }
        function n_(t, n, a) {
          n = Ci(n, t);
          var h = -1,
            p = n.length;
          for (p || ((p = 1), (t = r)); ++h < p; ) {
            var y = t == null ? r : t[ei(n[h])];
            y === r && ((h = p), (y = a)), (t = pi(y) ? y.call(t) : y);
          }
          return t;
        }
        function s_(t, n, a) {
          return t == null ? t : Xn(t, n, a);
        }
        function o_(t, n, a, h) {
          return (
            (h = typeof h == "function" ? h : r), t == null ? t : Xn(t, n, a, h)
          );
        }
        var Nl = kh(Wt),
          Fl = kh(gr);
        function a_(t, n, a) {
          var h = Re(t),
            p = h || Pi(t) || In(t);
          if (((n = be(n, 4)), a == null)) {
            var y = t && t.constructor;
            p
              ? (a = h ? new y() : [])
              : wt(t)
              ? (a = pi(y) ? wn(Xs(t)) : {})
              : (a = {});
          }
          return (
            (p ? Pr : Qr)(t, function (I, A, j) {
              return n(a, I, A, j);
            }),
            a
          );
        }
        function c_(t, n) {
          return t == null ? !0 : Ga(t, n);
        }
        function u_(t, n, a) {
          return t == null ? t : Ch(t, n, Xa(a));
        }
        function h_(t, n, a, h) {
          return (
            (h = typeof h == "function" ? h : r),
            t == null ? t : Ch(t, n, Xa(a), h)
          );
        }
        function xn(t) {
          return t == null ? [] : Aa(t, Wt(t));
        }
        function l_(t) {
          return t == null ? [] : Aa(t, gr(t));
        }
        function f_(t, n, a) {
          return (
            a === r && ((a = n), (n = r)),
            a !== r && ((a = Ur(a)), (a = a === a ? a : 0)),
            n !== r && ((n = Ur(n)), (n = n === n ? n : 0)),
            ki(Ur(t), n, a)
          );
        }
        function d_(t, n, a) {
          return (
            (n = gi(n)),
            a === r ? ((a = n), (n = 0)) : (a = gi(a)),
            (t = Ur(t)),
            b0(t, n, a)
          );
        }
        function p_(t, n, a) {
          if (
            (a && typeof a != "boolean" && sr(t, n, a) && (n = a = r),
            a === r &&
              (typeof n == "boolean"
                ? ((a = n), (n = r))
                : typeof t == "boolean" && ((a = t), (t = r))),
            t === r && n === r
              ? ((t = 0), (n = 1))
              : ((t = gi(t)), n === r ? ((n = t), (t = 0)) : (n = gi(n))),
            t > n)
          ) {
            var h = t;
            (t = n), (n = h);
          }
          if (a || t % 1 || n % 1) {
            var p = nh();
            return Qt(t + p * (n - t + ct("1e-" + ((p + "").length - 1))), n);
          }
          return ka(t, n);
        }
        var g_ = Dn(function (t, n, a) {
          return (n = n.toLowerCase()), t + (a ? Ll(n) : n);
        });
        function Ll(t) {
          return _c(it(t).toLowerCase());
        }
        function Ul(t) {
          return (t = it(t)), t && t.replace(oi, sg).replace(ma, "");
        }
        function v_(t, n, a) {
          (t = it(t)), (n = Er(n));
          var h = t.length;
          a = a === r ? h : ki(Me(a), 0, h);
          var p = a;
          return (a -= n.length), a >= 0 && t.slice(a, p) == n;
        }
        function y_(t) {
          return (t = it(t)), t && yt.test(t) ? t.replace(Ui, og) : t;
        }
        function __(t) {
          return (t = it(t)), t && Mt.test(t) ? t.replace(It, "\\$&") : t;
        }
        var b_ = Dn(function (t, n, a) {
            return t + (a ? "-" : "") + n.toLowerCase();
          }),
          m_ = Dn(function (t, n, a) {
            return t + (a ? " " : "") + n.toLowerCase();
          }),
          w_ = jh("toLowerCase");
        function E_(t, n, a) {
          (t = it(t)), (n = Me(n));
          var h = n ? vn(t) : 0;
          if (!n || h >= n) return t;
          var p = (n - h) / 2;
          return go(to(p), a) + t + go(eo(p), a);
        }
        function D_(t, n, a) {
          (t = it(t)), (n = Me(n));
          var h = n ? vn(t) : 0;
          return n && h < n ? t + go(n - h, a) : t;
        }
        function S_(t, n, a) {
          (t = it(t)), (n = Me(n));
          var h = n ? vn(t) : 0;
          return n && h < n ? go(n - h, a) + t : t;
        }
        function I_(t, n, a) {
          return (
            a || n == null ? (n = 0) : n && (n = +n),
            Rg(it(t).replace(xt, ""), n || 0)
          );
        }
        function x_(t, n, a) {
          return (
            (a ? sr(t, n, a) : n === r) ? (n = 1) : (n = Me(n)), Va(it(t), n)
          );
        }
        function O_() {
          var t = arguments,
            n = it(t[0]);
          return t.length < 3 ? n : n.replace(t[1], t[2]);
        }
        var C_ = Dn(function (t, n, a) {
          return t + (a ? "_" : "") + n.toLowerCase();
        });
        function A_(t, n, a) {
          return (
            a && typeof a != "number" && sr(t, n, a) && (n = a = r),
            (a = a === r ? re : a >>> 0),
            a
              ? ((t = it(t)),
                t &&
                (typeof n == "string" || (n != null && !gc(n))) &&
                ((n = Er(n)), !n && gn(t))
                  ? Ai(Hr(t), 0, a)
                  : t.split(n, a))
              : []
          );
        }
        var P_ = Dn(function (t, n, a) {
          return t + (a ? " " : "") + _c(n);
        });
        function T_(t, n, a) {
          return (
            (t = it(t)),
            (a = a == null ? 0 : ki(Me(a), 0, t.length)),
            (n = Er(n)),
            t.slice(a, a + n.length) == n
          );
        }
        function R_(t, n, a) {
          var h = v.templateSettings;
          a && sr(t, n, a) && (n = r), (t = it(t)), (n = Oo({}, n, h, Vh));
          var p = Oo({}, n.imports, h.imports, Vh),
            y = Wt(p),
            I = Aa(p, y),
            A,
            j,
            Q = 0,
            Z = n.interpolate || an,
            ie = "__p += '",
            ue = Ta(
              (n.escape || an).source +
                "|" +
                Z.source +
                "|" +
                (Z === mt ? ia : an).source +
                "|" +
                (n.evaluate || an).source +
                "|$",
              "g"
            ),
            ve =
              "//# sourceURL=" +
              (nt.call(n, "sourceURL")
                ? (n.sourceURL + "").replace(/\s/g, " ")
                : "lodash.templateSources[" + ++wa + "]") +
              `
`;
          t.replace(ue, function (De, We, Qe, Sr, or, Ir) {
            return (
              Qe || (Qe = Sr),
              (ie += t.slice(Q, Ir).replace(ua, ag)),
              We &&
                ((A = !0),
                (ie +=
                  `' +
__e(` +
                  We +
                  `) +
'`)),
              or &&
                ((j = !0),
                (ie +=
                  `';
` +
                  or +
                  `;
__p += '`)),
              Qe &&
                (ie +=
                  `' +
((__t = (` +
                  Qe +
                  `)) == null ? '' : __t) +
'`),
              (Q = Ir + De.length),
              De
            );
          }),
            (ie += `';
`);
          var Ee = nt.call(n, "variable") && n.variable;
          if (!Ee)
            ie =
              `with (obj) {
` +
              ie +
              `
}
`;
          else if (ta.test(Ee)) throw new Pe(f);
          (ie = (j ? ie.replace(Yr, "") : ie)
            .replace(rr, "$1")
            .replace(si, "$1;")),
            (ie =
              "function(" +
              (Ee || "obj") +
              `) {
` +
              (Ee
                ? ""
                : `obj || (obj = {});
`) +
              "var __t, __p = ''" +
              (A ? ", __e = _.escape" : "") +
              (j
                ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                : `;
`) +
              ie +
              `return __p
}`);
          var qe = Ml(function () {
            return rt(y, ve + "return " + ie).apply(r, I);
          });
          if (((qe.source = ie), pc(qe))) throw qe;
          return qe;
        }
        function N_(t) {
          return it(t).toLowerCase();
        }
        function F_(t) {
          return it(t).toUpperCase();
        }
        function L_(t, n, a) {
          if (((t = it(t)), t && (a || n === r))) return Wu(t);
          if (!t || !(n = Er(n))) return t;
          var h = Hr(t),
            p = Hr(n),
            y = Gu(h, p),
            I = Yu(h, p) + 1;
          return Ai(h, y, I).join("");
        }
        function U_(t, n, a) {
          if (((t = it(t)), t && (a || n === r))) return t.slice(0, Xu(t) + 1);
          if (!t || !(n = Er(n))) return t;
          var h = Hr(t),
            p = Yu(h, Hr(n)) + 1;
          return Ai(h, 0, p).join("");
        }
        function $_(t, n, a) {
          if (((t = it(t)), t && (a || n === r))) return t.replace(xt, "");
          if (!t || !(n = Er(n))) return t;
          var h = Hr(t),
            p = Gu(h, Hr(n));
          return Ai(h, p).join("");
        }
        function M_(t, n) {
          var a = G,
            h = se;
          if (wt(n)) {
            var p = "separator" in n ? n.separator : p;
            (a = "length" in n ? Me(n.length) : a),
              (h = "omission" in n ? Er(n.omission) : h);
          }
          t = it(t);
          var y = t.length;
          if (gn(t)) {
            var I = Hr(t);
            y = I.length;
          }
          if (a >= y) return t;
          var A = a - vn(h);
          if (A < 1) return h;
          var j = I ? Ai(I, 0, A).join("") : t.slice(0, A);
          if (p === r) return j + h;
          if ((I && (A += j.length - A), gc(p))) {
            if (t.slice(A).search(p)) {
              var Q,
                Z = j;
              for (
                p.global || (p = Ta(p.source, it(Cr.exec(p)) + "g")),
                  p.lastIndex = 0;
                (Q = p.exec(Z));

              )
                var ie = Q.index;
              j = j.slice(0, ie === r ? A : ie);
            }
          } else if (t.indexOf(Er(p), A) != A) {
            var ue = j.lastIndexOf(p);
            ue > -1 && (j = j.slice(0, ue));
          }
          return j + h;
        }
        function j_(t) {
          return (t = it(t)), t && Et.test(t) ? t.replace(mi, pg) : t;
        }
        var B_ = Dn(function (t, n, a) {
            return t + (a ? " " : "") + n.toUpperCase();
          }),
          _c = jh("toUpperCase");
        function $l(t, n, a) {
          return (
            (t = it(t)),
            (n = a ? r : n),
            n === r ? (ug(t) ? yg(t) : eg(t)) : t.match(n) || []
          );
        }
        var Ml = Ke(function (t, n) {
            try {
              return Vt(t, r, n);
            } catch (a) {
              return pc(a) ? a : new Pe(a);
            }
          }),
          q_ = fi(function (t, n) {
            return (
              Pr(n, function (a) {
                (a = ei(a)), hi(t, a, fc(t[a], t));
              }),
              t
            );
          });
        function z_(t) {
          var n = t == null ? 0 : t.length,
            a = be();
          return (
            (t = n
              ? bt(t, function (h) {
                  if (typeof h[1] != "function") throw new Tr(d);
                  return [a(h[0]), h[1]];
                })
              : []),
            Ke(function (h) {
              for (var p = -1; ++p < n; ) {
                var y = t[p];
                if (Vt(y[0], this, h)) return Vt(y[1], this, h);
              }
            })
          );
        }
        function H_(t) {
          return p0(Nr(t, R));
        }
        function bc(t) {
          return function () {
            return t;
          };
        }
        function K_(t, n) {
          return t == null || t !== t ? n : t;
        }
        var k_ = qh(),
          V_ = qh(!0);
        function vr(t) {
          return t;
        }
        function mc(t) {
          return yh(typeof t == "function" ? t : Nr(t, R));
        }
        function W_(t) {
          return bh(Nr(t, R));
        }
        function G_(t, n) {
          return mh(t, Nr(n, R));
        }
        var Y_ = Ke(function (t, n) {
            return function (a) {
              return Yn(a, t, n);
            };
          }),
          J_ = Ke(function (t, n) {
            return function (a) {
              return Yn(t, a, n);
            };
          });
        function wc(t, n, a) {
          var h = Wt(n),
            p = ao(n, h);
          a == null &&
            !(wt(n) && (p.length || !h.length)) &&
            ((a = n), (n = t), (t = this), (p = ao(n, Wt(n))));
          var y = !(wt(a) && "chain" in a) || !!a.chain,
            I = pi(t);
          return (
            Pr(p, function (A) {
              var j = n[A];
              (t[A] = j),
                I &&
                  (t.prototype[A] = function () {
                    var Q = this.__chain__;
                    if (y || Q) {
                      var Z = t(this.__wrapped__),
                        ie = (Z.__actions__ = dr(this.__actions__));
                      return (
                        ie.push({ func: j, args: arguments, thisArg: t }),
                        (Z.__chain__ = Q),
                        Z
                      );
                    }
                    return j.apply(t, Di([this.value()], arguments));
                  });
            }),
            t
          );
        }
        function X_() {
          return Xe._ === this && (Xe._ = Dg), this;
        }
        function Ec() {}
        function Q_(t) {
          return (
            (t = Me(t)),
            Ke(function (n) {
              return wh(n, t);
            })
          );
        }
        var Z_ = Za(bt),
          eb = Za(zu),
          tb = Za(Sa);
        function jl(t) {
          return oc(t) ? Ia(ei(t)) : T0(t);
        }
        function rb(t) {
          return function (n) {
            return t == null ? r : Vi(t, n);
          };
        }
        var ib = Hh(),
          nb = Hh(!0);
        function Dc() {
          return [];
        }
        function Sc() {
          return !1;
        }
        function sb() {
          return {};
        }
        function ob() {
          return "";
        }
        function ab() {
          return !0;
        }
        function cb(t, n) {
          if (((t = Me(t)), t < 1 || t > k)) return [];
          var a = re,
            h = Qt(t, re);
          (n = be(n)), (t -= re);
          for (var p = Ca(h, n); ++a < t; ) n(a);
          return p;
        }
        function ub(t) {
          return Re(t) ? bt(t, ei) : Dr(t) ? [t] : dr(sl(it(t)));
        }
        function hb(t) {
          var n = ++wg;
          return it(t) + n;
        }
        var lb = po(function (t, n) {
            return t + n;
          }, 0),
          fb = ec("ceil"),
          db = po(function (t, n) {
            return t / n;
          }, 1),
          pb = ec("floor");
        function gb(t) {
          return t && t.length ? oo(t, vr, ja) : r;
        }
        function vb(t, n) {
          return t && t.length ? oo(t, be(n, 2), ja) : r;
        }
        function yb(t) {
          return ku(t, vr);
        }
        function _b(t, n) {
          return ku(t, be(n, 2));
        }
        function bb(t) {
          return t && t.length ? oo(t, vr, Ha) : r;
        }
        function mb(t, n) {
          return t && t.length ? oo(t, be(n, 2), Ha) : r;
        }
        var wb = po(function (t, n) {
            return t * n;
          }, 1),
          Eb = ec("round"),
          Db = po(function (t, n) {
            return t - n;
          }, 0);
        function Sb(t) {
          return t && t.length ? Oa(t, vr) : 0;
        }
        function Ib(t, n) {
          return t && t.length ? Oa(t, be(n, 2)) : 0;
        }
        return (
          (v.after = Wv),
          (v.ary = vl),
          (v.assign = Fy),
          (v.assignIn = Pl),
          (v.assignInWith = Oo),
          (v.assignWith = Ly),
          (v.at = Uy),
          (v.before = yl),
          (v.bind = fc),
          (v.bindAll = q_),
          (v.bindKey = _l),
          (v.castArray = sy),
          (v.chain = dl),
          (v.chunk = p1),
          (v.compact = g1),
          (v.concat = v1),
          (v.cond = z_),
          (v.conforms = H_),
          (v.constant = bc),
          (v.countBy = Sv),
          (v.create = $y),
          (v.curry = bl),
          (v.curryRight = ml),
          (v.debounce = wl),
          (v.defaults = My),
          (v.defaultsDeep = jy),
          (v.defer = Gv),
          (v.delay = Yv),
          (v.difference = y1),
          (v.differenceBy = _1),
          (v.differenceWith = b1),
          (v.drop = m1),
          (v.dropRight = w1),
          (v.dropRightWhile = E1),
          (v.dropWhile = D1),
          (v.fill = S1),
          (v.filter = xv),
          (v.flatMap = Av),
          (v.flatMapDeep = Pv),
          (v.flatMapDepth = Tv),
          (v.flatten = ul),
          (v.flattenDeep = I1),
          (v.flattenDepth = x1),
          (v.flip = Jv),
          (v.flow = k_),
          (v.flowRight = V_),
          (v.fromPairs = O1),
          (v.functions = Vy),
          (v.functionsIn = Wy),
          (v.groupBy = Rv),
          (v.initial = A1),
          (v.intersection = P1),
          (v.intersectionBy = T1),
          (v.intersectionWith = R1),
          (v.invert = Yy),
          (v.invertBy = Jy),
          (v.invokeMap = Fv),
          (v.iteratee = mc),
          (v.keyBy = Lv),
          (v.keys = Wt),
          (v.keysIn = gr),
          (v.map = wo),
          (v.mapKeys = Qy),
          (v.mapValues = Zy),
          (v.matches = W_),
          (v.matchesProperty = G_),
          (v.memoize = Do),
          (v.merge = e_),
          (v.mergeWith = Tl),
          (v.method = Y_),
          (v.methodOf = J_),
          (v.mixin = wc),
          (v.negate = So),
          (v.nthArg = Q_),
          (v.omit = t_),
          (v.omitBy = r_),
          (v.once = Xv),
          (v.orderBy = Uv),
          (v.over = Z_),
          (v.overArgs = Qv),
          (v.overEvery = eb),
          (v.overSome = tb),
          (v.partial = dc),
          (v.partialRight = El),
          (v.partition = $v),
          (v.pick = i_),
          (v.pickBy = Rl),
          (v.property = jl),
          (v.propertyOf = rb),
          (v.pull = U1),
          (v.pullAll = ll),
          (v.pullAllBy = $1),
          (v.pullAllWith = M1),
          (v.pullAt = j1),
          (v.range = ib),
          (v.rangeRight = nb),
          (v.rearg = Zv),
          (v.reject = Bv),
          (v.remove = B1),
          (v.rest = ey),
          (v.reverse = hc),
          (v.sampleSize = zv),
          (v.set = s_),
          (v.setWith = o_),
          (v.shuffle = Hv),
          (v.slice = q1),
          (v.sortBy = Vv),
          (v.sortedUniq = G1),
          (v.sortedUniqBy = Y1),
          (v.split = A_),
          (v.spread = ty),
          (v.tail = J1),
          (v.take = X1),
          (v.takeRight = Q1),
          (v.takeRightWhile = Z1),
          (v.takeWhile = ev),
          (v.tap = gv),
          (v.throttle = ry),
          (v.thru = mo),
          (v.toArray = Ol),
          (v.toPairs = Nl),
          (v.toPairsIn = Fl),
          (v.toPath = ub),
          (v.toPlainObject = Al),
          (v.transform = a_),
          (v.unary = iy),
          (v.union = tv),
          (v.unionBy = rv),
          (v.unionWith = iv),
          (v.uniq = nv),
          (v.uniqBy = sv),
          (v.uniqWith = ov),
          (v.unset = c_),
          (v.unzip = lc),
          (v.unzipWith = fl),
          (v.update = u_),
          (v.updateWith = h_),
          (v.values = xn),
          (v.valuesIn = l_),
          (v.without = av),
          (v.words = $l),
          (v.wrap = ny),
          (v.xor = cv),
          (v.xorBy = uv),
          (v.xorWith = hv),
          (v.zip = lv),
          (v.zipObject = fv),
          (v.zipObjectDeep = dv),
          (v.zipWith = pv),
          (v.entries = Nl),
          (v.entriesIn = Fl),
          (v.extend = Pl),
          (v.extendWith = Oo),
          wc(v, v),
          (v.add = lb),
          (v.attempt = Ml),
          (v.camelCase = g_),
          (v.capitalize = Ll),
          (v.ceil = fb),
          (v.clamp = f_),
          (v.clone = oy),
          (v.cloneDeep = cy),
          (v.cloneDeepWith = uy),
          (v.cloneWith = ay),
          (v.conformsTo = hy),
          (v.deburr = Ul),
          (v.defaultTo = K_),
          (v.divide = db),
          (v.endsWith = v_),
          (v.eq = kr),
          (v.escape = y_),
          (v.escapeRegExp = __),
          (v.every = Iv),
          (v.find = Ov),
          (v.findIndex = al),
          (v.findKey = By),
          (v.findLast = Cv),
          (v.findLastIndex = cl),
          (v.findLastKey = qy),
          (v.floor = pb),
          (v.forEach = pl),
          (v.forEachRight = gl),
          (v.forIn = zy),
          (v.forInRight = Hy),
          (v.forOwn = Ky),
          (v.forOwnRight = ky),
          (v.get = vc),
          (v.gt = ly),
          (v.gte = fy),
          (v.has = Gy),
          (v.hasIn = yc),
          (v.head = hl),
          (v.identity = vr),
          (v.includes = Nv),
          (v.indexOf = C1),
          (v.inRange = d_),
          (v.invoke = Xy),
          (v.isArguments = Yi),
          (v.isArray = Re),
          (v.isArrayBuffer = dy),
          (v.isArrayLike = pr),
          (v.isArrayLikeObject = Rt),
          (v.isBoolean = py),
          (v.isBuffer = Pi),
          (v.isDate = gy),
          (v.isElement = vy),
          (v.isEmpty = yy),
          (v.isEqual = _y),
          (v.isEqualWith = by),
          (v.isError = pc),
          (v.isFinite = my),
          (v.isFunction = pi),
          (v.isInteger = Dl),
          (v.isLength = Io),
          (v.isMap = Sl),
          (v.isMatch = wy),
          (v.isMatchWith = Ey),
          (v.isNaN = Dy),
          (v.isNative = Sy),
          (v.isNil = xy),
          (v.isNull = Iy),
          (v.isNumber = Il),
          (v.isObject = wt),
          (v.isObjectLike = Ct),
          (v.isPlainObject = ts),
          (v.isRegExp = gc),
          (v.isSafeInteger = Oy),
          (v.isSet = xl),
          (v.isString = xo),
          (v.isSymbol = Dr),
          (v.isTypedArray = In),
          (v.isUndefined = Cy),
          (v.isWeakMap = Ay),
          (v.isWeakSet = Py),
          (v.join = N1),
          (v.kebabCase = b_),
          (v.last = Lr),
          (v.lastIndexOf = F1),
          (v.lowerCase = m_),
          (v.lowerFirst = w_),
          (v.lt = Ty),
          (v.lte = Ry),
          (v.max = gb),
          (v.maxBy = vb),
          (v.mean = yb),
          (v.meanBy = _b),
          (v.min = bb),
          (v.minBy = mb),
          (v.stubArray = Dc),
          (v.stubFalse = Sc),
          (v.stubObject = sb),
          (v.stubString = ob),
          (v.stubTrue = ab),
          (v.multiply = wb),
          (v.nth = L1),
          (v.noConflict = X_),
          (v.noop = Ec),
          (v.now = Eo),
          (v.pad = E_),
          (v.padEnd = D_),
          (v.padStart = S_),
          (v.parseInt = I_),
          (v.random = p_),
          (v.reduce = Mv),
          (v.reduceRight = jv),
          (v.repeat = x_),
          (v.replace = O_),
          (v.result = n_),
          (v.round = Eb),
          (v.runInContext = M),
          (v.sample = qv),
          (v.size = Kv),
          (v.snakeCase = C_),
          (v.some = kv),
          (v.sortedIndex = z1),
          (v.sortedIndexBy = H1),
          (v.sortedIndexOf = K1),
          (v.sortedLastIndex = k1),
          (v.sortedLastIndexBy = V1),
          (v.sortedLastIndexOf = W1),
          (v.startCase = P_),
          (v.startsWith = T_),
          (v.subtract = Db),
          (v.sum = Sb),
          (v.sumBy = Ib),
          (v.template = R_),
          (v.times = cb),
          (v.toFinite = gi),
          (v.toInteger = Me),
          (v.toLength = Cl),
          (v.toLower = N_),
          (v.toNumber = Ur),
          (v.toSafeInteger = Ny),
          (v.toString = it),
          (v.toUpper = F_),
          (v.trim = L_),
          (v.trimEnd = U_),
          (v.trimStart = $_),
          (v.truncate = M_),
          (v.unescape = j_),
          (v.uniqueId = hb),
          (v.upperCase = B_),
          (v.upperFirst = _c),
          (v.each = pl),
          (v.eachRight = gl),
          (v.first = hl),
          wc(
            v,
            (function () {
              var t = {};
              return (
                Qr(v, function (n, a) {
                  nt.call(v.prototype, a) || (t[a] = n);
                }),
                t
              );
            })(),
            { chain: !1 }
          ),
          (v.VERSION = s),
          Pr(
            [
              "bind",
              "bindKey",
              "curry",
              "curryRight",
              "partial",
              "partialRight",
            ],
            function (t) {
              v[t].placeholder = v;
            }
          ),
          Pr(["drop", "take"], function (t, n) {
            (Ye.prototype[t] = function (a) {
              a = a === r ? 1 : kt(Me(a), 0);
              var h = this.__filtered__ && !n ? new Ye(this) : this.clone();
              return (
                h.__filtered__
                  ? (h.__takeCount__ = Qt(a, h.__takeCount__))
                  : h.__views__.push({
                      size: Qt(a, re),
                      type: t + (h.__dir__ < 0 ? "Right" : ""),
                    }),
                h
              );
            }),
              (Ye.prototype[t + "Right"] = function (a) {
                return this.reverse()[t](a).reverse();
              });
          }),
          Pr(["filter", "map", "takeWhile"], function (t, n) {
            var a = n + 1,
              h = a == b || a == ee;
            Ye.prototype[t] = function (p) {
              var y = this.clone();
              return (
                y.__iteratees__.push({ iteratee: be(p, 3), type: a }),
                (y.__filtered__ = y.__filtered__ || h),
                y
              );
            };
          }),
          Pr(["head", "last"], function (t, n) {
            var a = "take" + (n ? "Right" : "");
            Ye.prototype[t] = function () {
              return this[a](1).value()[0];
            };
          }),
          Pr(["initial", "tail"], function (t, n) {
            var a = "drop" + (n ? "" : "Right");
            Ye.prototype[t] = function () {
              return this.__filtered__ ? new Ye(this) : this[a](1);
            };
          }),
          (Ye.prototype.compact = function () {
            return this.filter(vr);
          }),
          (Ye.prototype.find = function (t) {
            return this.filter(t).head();
          }),
          (Ye.prototype.findLast = function (t) {
            return this.reverse().find(t);
          }),
          (Ye.prototype.invokeMap = Ke(function (t, n) {
            return typeof t == "function"
              ? new Ye(this)
              : this.map(function (a) {
                  return Yn(a, t, n);
                });
          })),
          (Ye.prototype.reject = function (t) {
            return this.filter(So(be(t)));
          }),
          (Ye.prototype.slice = function (t, n) {
            t = Me(t);
            var a = this;
            return a.__filtered__ && (t > 0 || n < 0)
              ? new Ye(a)
              : (t < 0 ? (a = a.takeRight(-t)) : t && (a = a.drop(t)),
                n !== r &&
                  ((n = Me(n)), (a = n < 0 ? a.dropRight(-n) : a.take(n - t))),
                a);
          }),
          (Ye.prototype.takeRightWhile = function (t) {
            return this.reverse().takeWhile(t).reverse();
          }),
          (Ye.prototype.toArray = function () {
            return this.take(re);
          }),
          Qr(Ye.prototype, function (t, n) {
            var a = /^(?:filter|find|map|reject)|While$/.test(n),
              h = /^(?:head|last)$/.test(n),
              p = v[h ? "take" + (n == "last" ? "Right" : "") : n],
              y = h || /^find/.test(n);
            p &&
              (v.prototype[n] = function () {
                var I = this.__wrapped__,
                  A = h ? [1] : arguments,
                  j = I instanceof Ye,
                  Q = A[0],
                  Z = j || Re(I),
                  ie = function (We) {
                    var Qe = p.apply(v, Di([We], A));
                    return h && ue ? Qe[0] : Qe;
                  };
                Z &&
                  a &&
                  typeof Q == "function" &&
                  Q.length != 1 &&
                  (j = Z = !1);
                var ue = this.__chain__,
                  ve = !!this.__actions__.length,
                  Ee = y && !ue,
                  qe = j && !ve;
                if (!y && Z) {
                  I = qe ? I : new Ye(this);
                  var De = t.apply(I, A);
                  return (
                    De.__actions__.push({ func: mo, args: [ie], thisArg: r }),
                    new Rr(De, ue)
                  );
                }
                return Ee && qe
                  ? t.apply(this, A)
                  : ((De = this.thru(ie)),
                    Ee ? (h ? De.value()[0] : De.value()) : De);
              });
          }),
          Pr(
            ["pop", "push", "shift", "sort", "splice", "unshift"],
            function (t) {
              var n = ks[t],
                a = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                h = /^(?:pop|shift)$/.test(t);
              v.prototype[t] = function () {
                var p = arguments;
                if (h && !this.__chain__) {
                  var y = this.value();
                  return n.apply(Re(y) ? y : [], p);
                }
                return this[a](function (I) {
                  return n.apply(Re(I) ? I : [], p);
                });
              };
            }
          ),
          Qr(Ye.prototype, function (t, n) {
            var a = v[n];
            if (a) {
              var h = a.name + "";
              nt.call(mn, h) || (mn[h] = []), mn[h].push({ name: n, func: a });
            }
          }),
          (mn[fo(r, ne).name] = [{ name: "wrapper", func: r }]),
          (Ye.prototype.clone = jg),
          (Ye.prototype.reverse = Bg),
          (Ye.prototype.value = qg),
          (v.prototype.at = vv),
          (v.prototype.chain = yv),
          (v.prototype.commit = _v),
          (v.prototype.next = bv),
          (v.prototype.plant = wv),
          (v.prototype.reverse = Ev),
          (v.prototype.toJSON = v.prototype.valueOf = v.prototype.value = Dv),
          (v.prototype.first = v.prototype.head),
          zn && (v.prototype[zn] = mv),
          v
        );
      },
      yn = _g();
    Tt ? (((Tt.exports = yn)._ = yn), (ut._ = yn)) : (Xe._ = yn);
  }).call(ds);
})(hu, hu.exports);
var B5 = Object.defineProperty,
  q5 = Object.defineProperties,
  z5 = Object.getOwnPropertyDescriptors,
  _d = Object.getOwnPropertySymbols,
  H5 = Object.prototype.hasOwnProperty,
  K5 = Object.prototype.propertyIsEnumerable,
  bd = (i, e, r) =>
    e in i
      ? B5(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  Ao = (i, e) => {
    for (var r in e || (e = {})) H5.call(e, r) && bd(i, r, e[r]);
    if (_d) for (var r of _d(e)) K5.call(e, r) && bd(i, r, e[r]);
    return i;
  },
  k5 = (i, e) => q5(i, z5(e));
function jr(i, e, r) {
  let s;
  const o = lu(i);
  return (
    e.rpcMap && (s = e.rpcMap[o]),
    s || (s = `${j5}?chainId=eip155:${o}&projectId=${r}`),
    s
  );
}
function lu(i) {
  return i.includes("eip155") ? Number(i.split(":")[1]) : Number(i);
}
function V5(i) {
  return i.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function W5(i, e) {
  const r = Object.keys(e.namespaces).filter((o) => o.includes(i));
  if (!r.length) return [];
  const s = [];
  return (
    r.forEach((o) => {
      const c = e.namespaces[o].accounts;
      s.push(...c);
    }),
    s
  );
}
function G5(i, e = {}) {
  const r = md(i),
    s = md(e);
  return hu.exports.merge(r, s);
}
function md(i) {
  var e, r, s, o;
  const c = {};
  if (!Rn(i)) return c;
  for (const [d, f] of Object.entries(i)) {
    const g = fp(d) ? [d] : f.chains,
      w = f.methods || [],
      D = f.events || [],
      R = f.rpcMap || {},
      U = No(d);
    c[U] = k5(Ao(Ao({}, c[U]), f), {
      chains: Pc(g, (e = c[U]) == null ? void 0 : e.chains),
      methods: Pc(w, (r = c[U]) == null ? void 0 : r.methods),
      events: Pc(D, (s = c[U]) == null ? void 0 : s.events),
      rpcMap: Ao(Ao({}, R), (o = c[U]) == null ? void 0 : o.rpcMap),
    });
  }
  return c;
}
function Y5(i) {
  return i.includes(":") ? i.split(":")[2] : i;
}
const Gp = {},
  Lt = (i) => Gp[i],
  Hc = (i, e) => {
    Gp[i] = e;
  };
class J5 {
  constructor(e) {
    (this.name = "polkadot"),
      (this.namespace = e.namespace),
      (this.events = Lt("events")),
      (this.client = Lt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (((this.chainId = e), !this.httpProviders[e])) {
      const s = r || jr(`${this.name}:${e}`, this.namespace);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit(Li.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? e
          .filter((r) => r.split(":")[1] === this.chainId.toString())
          .map((r) => r.split(":")[2]) || []
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((r) => {
        var s;
        e[r] = this.createHttpProvider(
          r,
          (s = this.namespace.rpcMap) == null ? void 0 : s[r]
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || jr(e, this.namespace);
    return typeof s > "u"
      ? void 0
      : new Fi(new on(s, Lt("disableProviderPing")));
  }
}
class X5 {
  constructor(e) {
    (this.name = "eip155"),
      (this.namespace = e.namespace),
      (this.events = Lt("events")),
      (this.client = Lt("client")),
      (this.httpProviders = this.createHttpProviders()),
      (this.chainId = parseInt(this.getDefaultChain()));
  }
  async request(e) {
    switch (e.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(e);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
    }
    return this.namespace.methods.includes(e.request.method)
      ? await this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  setDefaultChain(e, r) {
    const s = lu(e);
    if (!this.httpProviders[s]) {
      const o =
        r ||
        jr(`${this.name}:${s}`, this.namespace, this.client.core.projectId);
      if (!o) throw new Error(`No RPC url provided for chainId: ${s}`);
      this.setHttpProvider(s, o);
    }
    (this.chainId = s),
      this.events.emit(Li.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  createHttpProvider(e, r) {
    const s =
      r || jr(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Fi(new on(s, Lt("disableProviderPing")));
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((r) => {
        var s;
        const o = lu(r);
        e[o] = this.createHttpProvider(
          o,
          (s = this.namespace.rpcMap) == null ? void 0 : s[r]
        );
      }),
      e
    );
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((r) => r.split(":")[1] === this.chainId.toString())
              .map((r) => r.split(":")[2])
          ),
        ]
      : [];
  }
  getHttpProvider() {
    const e = this.chainId,
      r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  async handleSwitchChain(e) {
    var r;
    let s = e.request.params
      ? (r = e.request.params[0]) == null
        ? void 0
        : r.chainId
      : "0x0";
    s = s.startsWith("0x") ? s : `0x${s}`;
    const o = parseInt(s, 16);
    if (this.isChainApproved(o)) this.setDefaultChain(`${o}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
      await this.client.request({
        topic: e.topic,
        request: { method: e.request.method, params: [{ chainId: s }] },
        chainId: e.chainId,
      }),
        this.setDefaultChain(`${o}`);
    else
      throw new Error(
        `Failed to switch to chain 'eip155:${o}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`
      );
    return null;
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
}
class Q5 {
  constructor(e) {
    (this.name = "solana"),
      (this.namespace = e.namespace),
      (this.events = Lt("events")),
      (this.client = Lt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (!this.httpProviders[e]) {
      const s =
        r ||
        jr(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    (this.chainId = e),
      this.events.emit(
        Li.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`
      );
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((r) => r.split(":")[1] === this.chainId.toString())
              .map((r) => r.split(":")[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((r) => {
        var s;
        e[r] = this.createHttpProvider(
          r,
          (s = this.namespace.rpcMap) == null ? void 0 : s[r]
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || jr(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Fi(new on(s, Lt("disableProviderPing")));
  }
}
class Z5 {
  constructor(e) {
    (this.name = "cosmos"),
      (this.namespace = e.namespace),
      (this.events = Lt("events")),
      (this.client = Lt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (((this.chainId = e), !this.httpProviders[e])) {
      const s =
        r ||
        jr(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit(Li.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((r) => r.split(":")[1] === this.chainId.toString())
              .map((r) => r.split(":")[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((r) => {
        var s;
        e[r] = this.createHttpProvider(
          r,
          (s = this.namespace.rpcMap) == null ? void 0 : s[r]
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || jr(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Fi(new on(s, Lt("disableProviderPing")));
  }
}
class eS {
  constructor(e) {
    (this.name = "cip34"),
      (this.namespace = e.namespace),
      (this.events = Lt("events")),
      (this.client = Lt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (((this.chainId = e), !this.httpProviders[e])) {
      const s = r || this.getCardanoRPCUrl(e);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit(Li.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((r) => r.split(":")[1] === this.chainId.toString())
              .map((r) => r.split(":")[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((r) => {
        const s = this.getCardanoRPCUrl(r);
        e[r] = this.createHttpProvider(r, s);
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  getCardanoRPCUrl(e) {
    const r = this.namespace.rpcMap;
    if (r) return r[e];
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || this.getCardanoRPCUrl(e);
    return typeof s > "u"
      ? void 0
      : new Fi(new on(s, Lt("disableProviderPing")));
  }
}
class tS {
  constructor(e) {
    (this.name = "elrond"),
      (this.namespace = e.namespace),
      (this.events = Lt("events")),
      (this.client = Lt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (!this.httpProviders[e]) {
      const s =
        r ||
        jr(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    (this.chainId = e),
      this.events.emit(
        Li.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`
      );
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((r) => r.split(":")[1] === this.chainId.toString())
              .map((r) => r.split(":")[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((r) => {
        var s;
        e[r] = this.createHttpProvider(
          r,
          (s = this.namespace.rpcMap) == null ? void 0 : s[r]
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || jr(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Fi(new on(s, Lt("disableProviderPing")));
  }
}
class rS {
  constructor(e) {
    (this.name = "multiversx"),
      (this.namespace = e.namespace),
      (this.events = Lt("events")),
      (this.client = Lt("client")),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method)
      ? this.client.request(e)
      : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (!this.httpProviders[e]) {
      const s =
        r ||
        jr(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    (this.chainId = e),
      this.events.emit(
        Li.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`
      );
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e
      ? [
          ...new Set(
            e
              .filter((r) => r.split(":")[1] === this.chainId.toString())
              .map((r) => r.split(":")[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const e = {};
    return (
      this.namespace.chains.forEach((r) => {
        var s;
        e[r] = this.createHttpProvider(
          r,
          (s = this.namespace.rpcMap) == null ? void 0 : s[r]
        );
      }),
      e
    );
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`,
      r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || jr(e, this.namespace, this.client.core.projectId);
    return typeof s > "u"
      ? void 0
      : new Fi(new on(s, Lt("disableProviderPing")));
  }
}
var iS = Object.defineProperty,
  nS = Object.defineProperties,
  sS = Object.getOwnPropertyDescriptors,
  wd = Object.getOwnPropertySymbols,
  oS = Object.prototype.hasOwnProperty,
  aS = Object.prototype.propertyIsEnumerable,
  Ed = (i, e, r) =>
    e in i
      ? iS(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  Po = (i, e) => {
    for (var r in e || (e = {})) oS.call(e, r) && Ed(i, r, e[r]);
    if (wd) for (var r of wd(e)) aS.call(e, r) && Ed(i, r, e[r]);
    return i;
  },
  Kc = (i, e) => nS(i, sS(e));
class Bu {
  constructor(e) {
    (this.events = new _u()),
      (this.rpcProviders = {}),
      (this.shouldAbortPairingAttempt = !1),
      (this.maxPairingAttempts = 10),
      (this.disableProviderPing = !1),
      (this.providerOpts = e),
      (this.logger =
        typeof (e == null ? void 0 : e.logger) < "u" &&
        typeof (e == null ? void 0 : e.logger) != "string"
          ? e.logger
          : Ze.pino(
              Ze.getDefaultLoggerOptions({
                level: (e == null ? void 0 : e.logger) || vd,
              })
            )),
      (this.disableProviderPing =
        (e == null ? void 0 : e.disableProviderPing) || !1);
  }
  static async init(e) {
    const r = new Bu(e);
    return await r.initialize(), r;
  }
  async request(e, r) {
    const [s, o] = this.validateChain(r);
    if (!this.session)
      throw new Error("Please call connect() before request()");
    return await this.getProvider(s).request({
      request: Po({}, e),
      chainId: `${s}:${o}`,
      topic: this.session.topic,
    });
  }
  sendAsync(e, r, s) {
    this.request(e, s)
      .then((o) => r(null, o))
      .catch((o) => r(o, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return (
      this.session ||
        (await this.connect({
          namespaces: this.namespaces,
          optionalNamespaces: this.optionalNamespaces,
          sessionProperties: this.sessionProperties,
        })),
      await this.requestAccounts()
    );
  }
  async disconnect() {
    var e;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({
      topic: (e = this.session) == null ? void 0 : e.topic,
      reason: Ft("USER_DISCONNECTED"),
    }),
      await this.cleanup();
  }
  async connect(e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (
      (this.setNamespaces(e),
      await this.cleanupPendingPairings(),
      !e.skipPairing)
    )
      return await this.pair(e.pairingTopic);
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  get isWalletConnect() {
    return !0;
  }
  async pair(e) {
    this.shouldAbortPairingAttempt = !1;
    let r = 0;
    do {
      if (this.shouldAbortPairingAttempt) throw new Error("Pairing aborted");
      if (r >= this.maxPairingAttempts)
        throw new Error("Max auto pairing attempts reached");
      const { uri: s, approval: o } = await this.client.connect({
        pairingTopic: e,
        requiredNamespaces: this.namespaces,
        optionalNamespaces: this.optionalNamespaces,
        sessionProperties: this.sessionProperties,
      });
      s && ((this.uri = s), this.events.emit("display_uri", s)),
        await o()
          .then((c) => {
            this.session = c;
          })
          .catch((c) => {
            if (c.message !== Wp) throw c;
            r++;
          });
    } while (!this.session);
    return this.onConnect(), this.session;
  }
  setDefaultChain(e, r) {
    try {
      const [s, o] = this.validateChain(e);
      this.getProvider(s).setDefaultChain(o, r);
    } catch (s) {
      if (!/Please call connect/.test(s.message)) throw s;
    }
  }
  async cleanupPendingPairings(e = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const r = this.client.pairing.getAll();
    if (ni(r)) {
      for (const s of r)
        e.deletePairings
          ? this.client.core.expirer.set(s.topic, 0)
          : await this.client.core.relayer.subscriber.unsubscribe(s.topic);
      this.logger.info(`Inactive pairings cleared: ${r.length}`);
    }
  }
  abortPairingAttempt() {
    this.shouldAbortPairingAttempt = !0;
  }
  async checkStorage() {
    if (
      ((this.namespaces = (await this.getFromStore("namespaces")) || {}),
      (this.optionalNamespaces =
        (await this.getFromStore("optionalNamespaces")) || {}),
      this.client.session.length)
    ) {
      const e = this.client.session.keys.length - 1;
      (this.session = this.client.session.get(this.client.session.keys[e])),
        this.createProviders();
    }
  }
  async initialize() {
    this.logger.trace("Initialized"),
      await this.createClient(),
      await this.checkStorage(),
      this.registerEventListeners();
  }
  async createClient() {
    (this.client =
      this.providerOpts.client ||
      (await ju.init({
        logger: this.providerOpts.logger || vd,
        relayUrl: this.providerOpts.relayUrl || U5,
        projectId: this.providerOpts.projectId,
        metadata: this.providerOpts.metadata,
        storageOptions: this.providerOpts.storageOptions,
        name: this.providerOpts.name,
      }))),
      this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session)
      throw new Error(
        "Session not initialized. Please call connect() before enable()"
      );
    const e = [
      ...new Set(Object.keys(this.session.namespaces).map((r) => No(r))),
    ];
    Hc("client", this.client),
      Hc("events", this.events),
      Hc("disableProviderPing", this.disableProviderPing),
      e.forEach((r) => {
        if (!this.session) return;
        const s = W5(r, this.session),
          o = V5(s),
          c = G5(this.namespaces, this.optionalNamespaces),
          d = Kc(Po({}, c[r]), { accounts: s, chains: o });
        switch (r) {
          case "eip155":
            this.rpcProviders[r] = new X5({ namespace: d });
            break;
          case "solana":
            this.rpcProviders[r] = new Q5({ namespace: d });
            break;
          case "cosmos":
            this.rpcProviders[r] = new Z5({ namespace: d });
            break;
          case "polkadot":
            this.rpcProviders[r] = new J5({ namespace: d });
            break;
          case "cip34":
            this.rpcProviders[r] = new eS({ namespace: d });
            break;
          case "elrond":
            this.rpcProviders[r] = new tS({ namespace: d });
            break;
          case "multiversx":
            this.rpcProviders[r] = new rS({ namespace: d });
            break;
        }
      });
  }
  registerEventListeners() {
    if (typeof this.client > "u")
      throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      this.events.emit("session_ping", e);
    }),
      this.client.on("session_event", (e) => {
        const { params: r } = e,
          { event: s } = r;
        if (s.name === "accountsChanged") {
          const o = s.data;
          o && ni(o) && this.events.emit("accountsChanged", o.map(Y5));
        } else
          s.name === "chainChanged"
            ? this.onChainChanged(r.chainId)
            : this.events.emit(s.name, s.data);
        this.events.emit("session_event", e);
      }),
      this.client.on("session_update", ({ topic: e, params: r }) => {
        var s;
        const { namespaces: o } = r,
          c = (s = this.client) == null ? void 0 : s.session.get(e);
        (this.session = Kc(Po({}, c), { namespaces: o })),
          this.onSessionUpdate(),
          this.events.emit("session_update", { topic: e, params: r });
      }),
      this.client.on("session_delete", async (e) => {
        await this.cleanup(),
          this.events.emit("session_delete", e),
          this.events.emit(
            "disconnect",
            Kc(Po({}, Ft("USER_DISCONNECTED")), { data: e.topic })
          );
      }),
      this.on(Li.DEFAULT_CHAIN_CHANGED, (e) => {
        this.onChainChanged(e, !0);
      });
  }
  getProvider(e) {
    if (!this.rpcProviders[e]) throw new Error(`Provider not found: ${e}`);
    return this.rpcProviders[e];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      var r;
      this.getProvider(e).updateNamespace(
        (r = this.session) == null ? void 0 : r.namespaces[e]
      );
    });
  }
  setNamespaces(e) {
    const { namespaces: r, optionalNamespaces: s, sessionProperties: o } = e;
    if (!r || !Object.keys(r).length)
      throw new Error("Namespaces must be not empty");
    (this.namespaces = r),
      (this.optionalNamespaces = s),
      (this.sessionProperties = o),
      this.persist("namespaces", r),
      this.persist("optionalNamespaces", s);
  }
  validateChain(e) {
    const [r, s] = (e == null ? void 0 : e.split(":")) || ["", ""];
    if (
      r &&
      !Object.keys(this.namespaces)
        .map((d) => No(d))
        .includes(r)
    )
      throw new Error(
        `Namespace '${r}' is not configured. Please call connect() first with namespace config.`
      );
    if (r && s) return [r, s];
    const o = No(Object.keys(this.namespaces)[0]),
      c = this.rpcProviders[o].getDefaultChain();
    return [o, c];
  }
  async requestAccounts() {
    const [e] = this.validateChain();
    return await this.getProvider(e).requestAccounts();
  }
  onChainChanged(e, r = !1) {
    var s;
    const [o, c] = this.validateChain(e);
    r || this.getProvider(o).setDefaultChain(c),
      (((s = this.namespaces[o]) != null
        ? s
        : this.namespaces[`${o}:${c}`]
      ).defaultChain = c),
      this.persist("namespaces", this.namespaces),
      this.events.emit("chainChanged", c);
  }
  onConnect() {
    this.createProviders(),
      this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    (this.session = void 0),
      await this.cleanupPendingPairings({ deletePairings: !0 });
  }
  persist(e, r) {
    this.client.core.storage.setItem(`${yd}/${e}`, r);
  }
  async getFromStore(e) {
    return await this.client.core.storage.getItem(`${yd}/${e}`);
  }
}
const cS = Bu,
  uS = "wc",
  hS = "ethereum_provider",
  lS = `${uS}@2:${hS}:`,
  fS = "https://rpc.walletconnect.com/v1/",
  fu = ["eth_sendTransaction", "personal_sign"],
  xS = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
  ],
  du = ["chainChanged", "accountsChanged"],
  OS = ["message", "disconnect", "connect"];
var dS = Object.defineProperty,
  pS = Object.defineProperties,
  gS = Object.getOwnPropertyDescriptors,
  Dd = Object.getOwnPropertySymbols,
  vS = Object.prototype.hasOwnProperty,
  yS = Object.prototype.propertyIsEnumerable,
  Sd = (i, e, r) =>
    e in i
      ? dS(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  kc = (i, e) => {
    for (var r in e || (e = {})) vS.call(e, r) && Sd(i, r, e[r]);
    if (Dd) for (var r of Dd(e)) yS.call(e, r) && Sd(i, r, e[r]);
    return i;
  },
  Id = (i, e) => pS(i, gS(e));
function pu(i) {
  return Number(i[0].split(":")[1]);
}
function Vc(i) {
  return `0x${i.toString(16)}`;
}
function _S(i) {
  const {
    chains: e,
    optionalChains: r,
    methods: s,
    optionalMethods: o,
    events: c,
    optionalEvents: d,
    rpcMap: f,
  } = i;
  if (!ni(e)) throw new Error("Invalid chains");
  const g = e,
    w = s || fu,
    D = c || du,
    R = { [pu(g)]: f[pu(g)] },
    U = { chains: g, methods: w, events: D, rpcMap: R },
    N = c == null ? void 0 : c.filter((ne) => !du.includes(ne)),
    P = s == null ? void 0 : s.filter((ne) => !fu.includes(ne));
  if (!r && !d && !o && !(N != null && N.length) && !(P != null && P.length))
    return { required: U };
  const z =
      ((N == null ? void 0 : N.length) && (P == null ? void 0 : P.length)) ||
      !r,
    K = {
      chains: [...new Set(z ? g.concat(r || []) : r)],
      methods: [...new Set(w.concat(o || []))],
      events: [...new Set(D.concat(d || []))],
      rpcMap: f,
    };
  return { required: U, optional: K };
}
class qu {
  constructor() {
    (this.events = new xr.EventEmitter()),
      (this.namespace = "eip155"),
      (this.accounts = []),
      (this.chainId = 1),
      (this.STORAGE_KEY = lS),
      (this.on = (e, r) => (this.events.on(e, r), this)),
      (this.once = (e, r) => (this.events.once(e, r), this)),
      (this.removeListener = (e, r) => (
        this.events.removeListener(e, r), this
      )),
      (this.off = (e, r) => (this.events.off(e, r), this)),
      (this.parseAccount = (e) =>
        this.isCompatibleChainId(e) ? this.parseAccountId(e).address : e),
      (this.signer = {}),
      (this.rpc = {});
  }
  static async init(e) {
    const r = new qu();
    return await r.initialize(e), r;
  }
  async request(e) {
    return await this.signer.request(e, this.formatChainId(this.chainId));
  }
  sendAsync(e, r) {
    this.signer.sendAsync(e, r, this.formatChainId(this.chainId));
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : !1;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
  }
  async enable() {
    return (
      this.session || (await this.connect()),
      await this.request({ method: "eth_requestAccounts" })
    );
  }
  async connect(e) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(e);
    const { required: r, optional: s } = _S(this.rpc);
    try {
      const o = await new Promise(async (d, f) => {
        var g;
        this.rpc.showQrModal &&
          ((g = this.modal) == null ||
            g.subscribeModal((w) => {
              !w.open &&
                !this.signer.session &&
                (this.signer.abortPairingAttempt(),
                f(new Error("Connection request reset. Please try again.")));
            })),
          await this.signer
            .connect(
              Id(
                kc(
                  { namespaces: { [this.namespace]: r } },
                  s && { optionalNamespaces: { [this.namespace]: s } }
                ),
                { pairingTopic: e == null ? void 0 : e.pairingTopic }
              )
            )
            .then((w) => {
              d(w);
            })
            .catch((w) => {
              f(new Error(w.message));
            });
      });
      if (!o) return;
      this.setChainIds(this.rpc.chains);
      const c = SE(o.namespaces, [this.namespace]);
      this.setAccounts(c),
        this.events.emit("connect", { chainId: Vc(this.chainId) });
    } catch (o) {
      throw (this.signer.logger.error(o), o);
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && (await this.signer.disconnect()), this.reset();
  }
  get isWalletConnect() {
    return !0;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (e) => {
      const { params: r } = e,
        { event: s } = r;
      s.name === "accountsChanged"
        ? ((this.accounts = this.parseAccounts(s.data)),
          this.events.emit("accountsChanged", this.accounts))
        : s.name === "chainChanged"
        ? this.setChainId(this.formatChainId(s.data))
        : this.events.emit(s.name, s.data),
        this.events.emit("session_event", e);
    }),
      this.signer.on("chainChanged", (e) => {
        const r = parseInt(e);
        (this.chainId = r),
          this.events.emit("chainChanged", Vc(this.chainId)),
          this.persist();
      }),
      this.signer.on("session_update", (e) => {
        this.events.emit("session_update", e);
      }),
      this.signer.on("session_delete", (e) => {
        this.reset(),
          this.events.emit("session_delete", e),
          this.events.emit(
            "disconnect",
            Id(kc({}, Ft("USER_DISCONNECTED")), {
              data: e.topic,
              name: "USER_DISCONNECTED",
            })
          );
      }),
      this.signer.on("display_uri", (e) => {
        var r, s;
        this.rpc.showQrModal &&
          ((r = this.modal) == null || r.closeModal(),
          (s = this.modal) == null || s.openModal({ uri: e })),
          this.events.emit("display_uri", e);
      });
  }
  switchEthereumChain(e) {
    this.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.toString(16) }],
    });
  }
  isCompatibleChainId(e) {
    return typeof e == "string" ? e.startsWith(`${this.namespace}:`) : !1;
  }
  formatChainId(e) {
    return `${this.namespace}:${e}`;
  }
  parseChainId(e) {
    return Number(e.split(":")[1]);
  }
  setChainIds(e) {
    const r = e
      .filter((s) => this.isCompatibleChainId(s))
      .map((s) => this.parseChainId(s));
    r.length &&
      ((this.chainId = r[0]),
      this.events.emit("chainChanged", Vc(this.chainId)),
      this.persist());
  }
  setChainId(e) {
    if (this.isCompatibleChainId(e)) {
      const r = this.parseChainId(e);
      (this.chainId = r), this.switchEthereumChain(r);
    }
  }
  parseAccountId(e) {
    const [r, s, o] = e.split(":");
    return { chainId: `${r}:${s}`, address: o };
  }
  setAccounts(e) {
    (this.accounts = e
      .filter(
        (r) =>
          this.parseChainId(this.parseAccountId(r).chainId) === this.chainId
      )
      .map((r) => this.parseAccountId(r).address)),
      this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(e) {
    var r, s;
    return {
      chains: ((r = e.chains) == null
        ? void 0
        : r.map((o) => this.formatChainId(o))) || [`${this.namespace}:1`],
      optionalChains: e.optionalChains
        ? e.optionalChains.map((o) => this.formatChainId(o))
        : void 0,
      methods: (e == null ? void 0 : e.methods) || fu,
      events: (e == null ? void 0 : e.events) || du,
      optionalMethods: (e == null ? void 0 : e.optionalMethods) || [],
      optionalEvents: (e == null ? void 0 : e.optionalEvents) || [],
      rpcMap:
        (e == null ? void 0 : e.rpcMap) ||
        this.buildRpcMap(e.chains.concat(e.optionalChains || []), e.projectId),
      showQrModal: !!(e != null && e.showQrModal),
      qrModalOptions:
        (s = e == null ? void 0 : e.qrModalOptions) != null ? s : void 0,
      projectId: e.projectId,
      metadata: e.metadata,
    };
  }
  buildRpcMap(e, r) {
    const s = {};
    return (
      e.forEach((o) => {
        s[o] = this.getRpcUrl(o, r);
      }),
      s
    );
  }
  async initialize(e) {
    if (
      ((this.rpc = this.getRpcConfig(e)),
      (this.chainId = pu(this.rpc.chains)),
      (this.signer = await cS.init({
        projectId: this.rpc.projectId,
        metadata: this.rpc.metadata,
        disableProviderPing: e.disableProviderPing,
        relayUrl: e.relayUrl,
        storageOptions: e.storageOptions,
      })),
      this.registerEventListeners(),
      await this.loadPersistedSession(),
      this.rpc.showQrModal)
    ) {
      let r;
      try {
        const { WalletConnectModal: s } = await xb(
          () => import("./index-d73f7f1f.js").then((o) => o.a),
          [
            "assets/index-d73f7f1f.js",
            "assets/index-dfe7f50f.js",
            "assets/index-6121731f.css",
          ]
        );
        r = s;
      } catch {
        throw new Error(
          "To use QR modal, please install @walletconnect/modal package"
        );
      }
      if (r)
        try {
          this.modal = new r(
            kc(
              {
                walletConnectVersion: 2,
                projectId: this.rpc.projectId,
                standaloneChains: this.rpc.chains,
              },
              this.rpc.qrModalOptions
            )
          );
        } catch (s) {
          throw (
            (this.signer.logger.error(s),
            new Error("Could not generate WalletConnectModal Instance"))
          );
        }
    }
  }
  loadConnectOpts(e) {
    if (!e) return;
    const { chains: r, optionalChains: s, rpcMap: o } = e;
    r &&
      ni(r) &&
      ((this.rpc.chains = r.map((c) => this.formatChainId(c))),
      r.forEach((c) => {
        this.rpc.rpcMap[c] = (o == null ? void 0 : o[c]) || this.getRpcUrl(c);
      })),
      s &&
        ni(s) &&
        ((this.rpc.optionalChains = []),
        (this.rpc.optionalChains =
          s == null ? void 0 : s.map((c) => this.formatChainId(c))),
        s.forEach((c) => {
          this.rpc.rpcMap[c] = (o == null ? void 0 : o[c]) || this.getRpcUrl(c);
        }));
  }
  getRpcUrl(e, r) {
    var s;
    return (
      ((s = this.rpc.rpcMap) == null ? void 0 : s[e]) ||
      `${fS}?chainId=eip155:${e}&projectId=${r || this.rpc.projectId}`
    );
  }
  async loadPersistedSession() {
    if (!this.session) return;
    const e = await this.signer.client.core.storage.getItem(
        `${this.STORAGE_KEY}/chainId`
      ),
      r = this.session.namespaces[`${this.namespace}:${e}`]
        ? this.session.namespaces[`${this.namespace}:${e}`]
        : this.session.namespaces[this.namespace];
    this.setChainIds(
      e ? [this.formatChainId(e)] : r == null ? void 0 : r.accounts
    ),
      this.setAccounts(r == null ? void 0 : r.accounts);
  }
  reset() {
    (this.chainId = 1), (this.accounts = []);
  }
  persist() {
    this.session &&
      this.signer.client.core.storage.setItem(
        `${this.STORAGE_KEY}/chainId`,
        this.chainId
      );
  }
  parseAccounts(e) {
    return typeof e == "string" || e instanceof String
      ? [this.parseAccount(e)]
      : e.map((r) => this.parseAccount(r));
  }
}
const CS = qu;
export {
  CS as EthereumProvider,
  OS as OPTIONAL_EVENTS,
  xS as OPTIONAL_METHODS,
  du as REQUIRED_EVENTS,
  fu as REQUIRED_METHODS,
  qu as default,
};
