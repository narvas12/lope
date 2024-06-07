/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const dt = window,
  Qt =
    dt.ShadowRoot &&
    (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  Zt = Symbol(),
  oe = new WeakMap();
let Te = class {
  constructor(t, n, i) {
    if (((this._$cssResult$ = !0), i !== Zt))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    (this.cssText = t), (this.t = n);
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Qt && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = oe.get(n)),
        t === void 0 &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          i && oe.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const an = (e) => new Te(typeof e == "string" ? e : e + "", void 0, Zt),
  er = (e, ...t) => {
    const n =
      e.length === 1
        ? e[0]
        : t.reduce(
            (i, r, s) =>
              i +
              ((o) => {
                if (o._$cssResult$ === !0) return o.cssText;
                if (typeof o == "number") return o;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    o +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(r) +
              e[s + 1],
            e[0]
          );
    return new Te(n, e, Zt);
  },
  ln = (e, t) => {
    Qt
      ? (e.adoptedStyleSheets = t.map((n) =>
          n instanceof CSSStyleSheet ? n : n.styleSheet
        ))
      : t.forEach((n) => {
          const i = document.createElement("style"),
            r = dt.litNonce;
          r !== void 0 && i.setAttribute("nonce", r),
            (i.textContent = n.cssText),
            e.appendChild(i);
        });
  },
  ae = Qt
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((t) => {
              let n = "";
              for (const i of t.cssRules) n += i.cssText;
              return an(n);
            })(e)
          : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var Tt;
const gt = window,
  le = gt.trustedTypes,
  cn = le ? le.emptyScript : "",
  ce = gt.reactiveElementPolyfillSupport,
  xt = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? cn : null;
          break;
        case Object:
        case Array:
          e = e == null ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      let n = e;
      switch (t) {
        case Boolean:
          n = e !== null;
          break;
        case Number:
          n = e === null ? null : Number(e);
          break;
        case Object:
        case Array:
          try {
            n = JSON.parse(e);
          } catch {
            n = null;
          }
      }
      return n;
    },
  },
  Pe = (e, t) => t !== e && (t == t || e == e),
  Pt = {
    attribute: !0,
    type: String,
    converter: xt,
    reflect: !1,
    hasChanged: Pe,
  };
let x = class extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u();
  }
  static addInitializer(t) {
    var n;
    this.finalize(),
      ((n = this.h) !== null && n !== void 0 ? n : (this.h = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((n, i) => {
        const r = this._$Ep(i, n);
        r !== void 0 && (this._$Ev.set(r, i), t.push(r));
      }),
      t
    );
  }
  static createProperty(t, n = Pt) {
    if (
      (n.state && (n.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, n),
      !n.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t,
        r = this.getPropertyDescriptor(t, i, n);
      r !== void 0 && Object.defineProperty(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    return {
      get() {
        return this[n];
      },
      set(r) {
        const s = this[t];
        (this[n] = r), this.requestUpdate(t, s, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || Pt;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      t.h !== void 0 && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const n = this.properties,
        i = [
          ...Object.getOwnPropertyNames(n),
          ...Object.getOwnPropertySymbols(n),
        ];
      for (const r of i) this.createProperty(r, n[r]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) n.unshift(ae(r));
    } else t !== void 0 && n.push(ae(t));
    return n;
  }
  static _$Ep(t, n) {
    const i = n.attribute;
    return i === !1
      ? void 0
      : typeof i == "string"
      ? i
      : typeof t == "string"
      ? t.toLowerCase()
      : void 0;
  }
  u() {
    var t;
    (this._$E_ = new Promise((n) => (this.enableUpdating = n))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      (t = this.constructor.h) === null ||
        t === void 0 ||
        t.forEach((n) => n(this));
  }
  addController(t) {
    var n, i;
    ((n = this._$ES) !== null && n !== void 0 ? n : (this._$ES = [])).push(t),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var n;
    (n = this._$ES) === null ||
      n === void 0 ||
      n.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, n) => {
      this.hasOwnProperty(n) && (this._$Ei.set(n, this[n]), delete this[n]);
    });
  }
  createRenderRoot() {
    var t;
    const n =
      (t = this.shadowRoot) !== null && t !== void 0
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return ln(n, this.constructor.elementStyles), n;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (t = this._$ES) === null ||
        t === void 0 ||
        t.forEach((n) => {
          var i;
          return (i = n.hostConnected) === null || i === void 0
            ? void 0
            : i.call(n);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null ||
      t === void 0 ||
      t.forEach((n) => {
        var i;
        return (i = n.hostDisconnected) === null || i === void 0
          ? void 0
          : i.call(n);
      });
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$EO(t, n, i = Pt) {
    var r;
    const s = this.constructor._$Ep(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (
        ((r = i.converter) === null || r === void 0
          ? void 0
          : r.toAttribute) !== void 0
          ? i.converter
          : xt
      ).toAttribute(n, i.type);
      (this._$El = t),
        o == null ? this.removeAttribute(s) : this.setAttribute(s, o),
        (this._$El = null);
    }
  }
  _$AK(t, n) {
    var i;
    const r = this.constructor,
      s = r._$Ev.get(t);
    if (s !== void 0 && this._$El !== s) {
      const o = r.getPropertyOptions(s),
        l =
          typeof o.converter == "function"
            ? { fromAttribute: o.converter }
            : ((i = o.converter) === null || i === void 0
                ? void 0
                : i.fromAttribute) !== void 0
            ? o.converter
            : xt;
      (this._$El = s),
        (this[s] = l.fromAttribute(n, o.type)),
        (this._$El = null);
    }
  }
  requestUpdate(t, n, i) {
    let r = !0;
    t !== void 0 &&
      (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || Pe)(
        this[t],
        n
      )
        ? (this._$AL.has(t) || this._$AL.set(t, n),
          i.reflect === !0 &&
            this._$El !== t &&
            (this._$EC === void 0 && (this._$EC = new Map()),
            this._$EC.set(t, i)))
        : (r = !1)),
      !this.isUpdatePending && r && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((r, s) => (this[s] = r)), (this._$Ei = void 0));
    let n = !1;
    const i = this._$AL;
    try {
      (n = this.shouldUpdate(i)),
        n
          ? (this.willUpdate(i),
            (t = this._$ES) === null ||
              t === void 0 ||
              t.forEach((r) => {
                var s;
                return (s = r.hostUpdate) === null || s === void 0
                  ? void 0
                  : s.call(r);
              }),
            this.update(i))
          : this._$Ek();
    } catch (r) {
      throw ((n = !1), this._$Ek(), r);
    }
    n && this._$AE(i);
  }
  willUpdate(t) {}
  _$AE(t) {
    var n;
    (n = this._$ES) === null ||
      n === void 0 ||
      n.forEach((i) => {
        var r;
        return (r = i.hostUpdated) === null || r === void 0
          ? void 0
          : r.call(i);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 &&
      (this._$EC.forEach((n, i) => this._$EO(i, this[i], n)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
};
(x.finalized = !0),
  (x.elementProperties = new Map()),
  (x.elementStyles = []),
  (x.shadowRootOptions = { mode: "open" }),
  ce == null || ce({ ReactiveElement: x }),
  ((Tt = gt.reactiveElementVersions) !== null && Tt !== void 0
    ? Tt
    : (gt.reactiveElementVersions = [])
  ).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var Bt;
const pt = window,
  K = pt.trustedTypes,
  ue = K ? K.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
  Vt = "$lit$",
  U = `lit$${(Math.random() + "").slice(9)}$`,
  Be = "?" + U,
  un = `<${Be}>`,
  H = document,
  nt = () => H.createComment(""),
  it = (e) => e === null || (typeof e != "object" && typeof e != "function"),
  Ne = Array.isArray,
  hn = (e) =>
    Ne(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function",
  Nt = `[ 	
\f\r]`,
  Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  he = /-->/g,
  de = />/g,
  k = RegExp(
    `>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
    "g"
  ),
  fe = /'/g,
  ge = /"/g,
  Me = /^(?:script|style|textarea|title)$/i,
  Re =
    (e) =>
    (t, ...n) => ({ _$litType$: e, strings: t, values: n }),
  ir = Re(1),
  rr = Re(2),
  z = Symbol.for("lit-noChange"),
  b = Symbol.for("lit-nothing"),
  pe = new WeakMap(),
  F = H.createTreeWalker(H, 129, null, !1),
  dn = (e, t) => {
    const n = e.length - 1,
      i = [];
    let r,
      s = t === 2 ? "<svg>" : "",
      o = Z;
    for (let a = 0; a < n; a++) {
      const c = e[a];
      let h,
        f,
        u = -1,
        d = 0;
      for (; d < c.length && ((o.lastIndex = d), (f = o.exec(c)), f !== null); )
        (d = o.lastIndex),
          o === Z
            ? f[1] === "!--"
              ? (o = he)
              : f[1] !== void 0
              ? (o = de)
              : f[2] !== void 0
              ? (Me.test(f[2]) && (r = RegExp("</" + f[2], "g")), (o = k))
              : f[3] !== void 0 && (o = k)
            : o === k
            ? f[0] === ">"
              ? ((o = r ?? Z), (u = -1))
              : f[1] === void 0
              ? (u = -2)
              : ((u = o.lastIndex - f[2].length),
                (h = f[1]),
                (o = f[3] === void 0 ? k : f[3] === '"' ? ge : fe))
            : o === ge || o === fe
            ? (o = k)
            : o === he || o === de
            ? (o = Z)
            : ((o = k), (r = void 0));
      const m = o === k && e[a + 1].startsWith("/>") ? " " : "";
      s +=
        o === Z
          ? c + un
          : u >= 0
          ? (i.push(h), c.slice(0, u) + Vt + c.slice(u) + U + m)
          : c + U + (u === -2 ? (i.push(void 0), a) : m);
    }
    const l = s + (e[n] || "<?>") + (t === 2 ? "</svg>" : "");
    if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [ue !== void 0 ? ue.createHTML(l) : l, i];
  };
class rt {
  constructor({ strings: t, _$litType$: n }, i) {
    let r;
    this.parts = [];
    let s = 0,
      o = 0;
    const l = t.length - 1,
      a = this.parts,
      [c, h] = dn(t, n);
    if (
      ((this.el = rt.createElement(c, i)),
      (F.currentNode = this.el.content),
      n === 2)
    ) {
      const f = this.el.content,
        u = f.firstChild;
      u.remove(), f.append(...u.childNodes);
    }
    for (; (r = F.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const f = [];
          for (const u of r.getAttributeNames())
            if (u.endsWith(Vt) || u.startsWith(U)) {
              const d = h[o++];
              if ((f.push(u), d !== void 0)) {
                const m = r.getAttribute(d.toLowerCase() + Vt).split(U),
                  A = /([.?@])?(.*)/.exec(d);
                a.push({
                  type: 1,
                  index: s,
                  name: A[2],
                  strings: m,
                  ctor:
                    A[1] === "."
                      ? gn
                      : A[1] === "?"
                      ? mn
                      : A[1] === "@"
                      ? yn
                      : wt,
                });
              } else a.push({ type: 6, index: s });
            }
          for (const u of f) r.removeAttribute(u);
        }
        if (Me.test(r.tagName)) {
          const f = r.textContent.split(U),
            u = f.length - 1;
          if (u > 0) {
            r.textContent = K ? K.emptyScript : "";
            for (let d = 0; d < u; d++)
              r.append(f[d], nt()),
                F.nextNode(),
                a.push({ type: 2, index: ++s });
            r.append(f[u], nt());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === Be) a.push({ type: 2, index: s });
        else {
          let f = -1;
          for (; (f = r.data.indexOf(U, f + 1)) !== -1; )
            a.push({ type: 7, index: s }), (f += U.length - 1);
        }
      s++;
    }
  }
  static createElement(t, n) {
    const i = H.createElement("template");
    return (i.innerHTML = t), i;
  }
}
function J(e, t, n = e, i) {
  var r, s, o, l;
  if (t === z) return t;
  let a =
    i !== void 0
      ? (r = n._$Co) === null || r === void 0
        ? void 0
        : r[i]
      : n._$Cl;
  const c = it(t) ? void 0 : t._$litDirective$;
  return (
    (a == null ? void 0 : a.constructor) !== c &&
      ((s = a == null ? void 0 : a._$AO) === null ||
        s === void 0 ||
        s.call(a, !1),
      c === void 0 ? (a = void 0) : ((a = new c(e)), a._$AT(e, n, i)),
      i !== void 0
        ? (((o = (l = n)._$Co) !== null && o !== void 0 ? o : (l._$Co = []))[
            i
          ] = a)
        : (n._$Cl = a)),
    a !== void 0 && (t = J(e, a._$AS(e, t.values), a, i)),
    t
  );
}
class fn {
  constructor(t, n) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = n);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var n;
    const {
        el: { content: i },
        parts: r,
      } = this._$AD,
      s = (
        (n = t == null ? void 0 : t.creationScope) !== null && n !== void 0
          ? n
          : H
      ).importNode(i, !0);
    F.currentNode = s;
    let o = F.nextNode(),
      l = 0,
      a = 0,
      c = r[0];
    for (; c !== void 0; ) {
      if (l === c.index) {
        let h;
        c.type === 2
          ? (h = new at(o, o.nextSibling, this, t))
          : c.type === 1
          ? (h = new c.ctor(o, c.name, c.strings, this, t))
          : c.type === 6 && (h = new An(o, this, t)),
          this._$AV.push(h),
          (c = r[++a]);
      }
      l !== (c == null ? void 0 : c.index) && ((o = F.nextNode()), l++);
    }
    return (F.currentNode = H), s;
  }
  v(t) {
    let n = 0;
    for (const i of this._$AV)
      i !== void 0 &&
        (i.strings !== void 0
          ? (i._$AI(t, i, n), (n += i.strings.length - 2))
          : i._$AI(t[n])),
        n++;
  }
}
class at {
  constructor(t, n, i, r) {
    var s;
    (this.type = 2),
      (this._$AH = b),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = n),
      (this._$AM = i),
      (this.options = r),
      (this._$Cp =
        (s = r == null ? void 0 : r.isConnected) === null || s === void 0 || s);
  }
  get _$AU() {
    var t, n;
    return (n = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !==
      null && n !== void 0
      ? n
      : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return (
      n !== void 0 &&
        (t == null ? void 0 : t.nodeType) === 11 &&
        (t = n.parentNode),
      t
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    (t = J(this, t, n)),
      it(t)
        ? t === b || t == null || t === ""
          ? (this._$AH !== b && this._$AR(), (this._$AH = b))
          : t !== this._$AH && t !== z && this._(t)
        : t._$litType$ !== void 0
        ? this.g(t)
        : t.nodeType !== void 0
        ? this.$(t)
        : hn(t)
        ? this.T(t)
        : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
  }
  _(t) {
    this._$AH !== b && it(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.$(H.createTextNode(t)),
      (this._$AH = t);
  }
  g(t) {
    var n;
    const { values: i, _$litType$: r } = t,
      s =
        typeof r == "number"
          ? this._$AC(t)
          : (r.el === void 0 && (r.el = rt.createElement(r.h, this.options)),
            r);
    if (((n = this._$AH) === null || n === void 0 ? void 0 : n._$AD) === s)
      this._$AH.v(i);
    else {
      const o = new fn(s, this),
        l = o.u(this.options);
      o.v(i), this.$(l), (this._$AH = o);
    }
  }
  _$AC(t) {
    let n = pe.get(t.strings);
    return n === void 0 && pe.set(t.strings, (n = new rt(t))), n;
  }
  T(t) {
    Ne(this._$AH) || ((this._$AH = []), this._$AR());
    const n = this._$AH;
    let i,
      r = 0;
    for (const s of t)
      r === n.length
        ? n.push((i = new at(this.k(nt()), this.k(nt()), this, this.options)))
        : (i = n[r]),
        i._$AI(s),
        r++;
    r < n.length && (this._$AR(i && i._$AB.nextSibling, r), (n.length = r));
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for (
      (i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, n);
      t && t !== this._$AB;

    ) {
      const r = t.nextSibling;
      t.remove(), (t = r);
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 &&
      ((this._$Cp = t),
      (n = this._$AP) === null || n === void 0 || n.call(this, t));
  }
}
class wt {
  constructor(t, n, i, r, s) {
    (this.type = 1),
      (this._$AH = b),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = n),
      (this._$AM = r),
      (this.options = s),
      i.length > 2 || i[0] !== "" || i[1] !== ""
        ? ((this._$AH = Array(i.length - 1).fill(new String())),
          (this.strings = i))
        : (this._$AH = b);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, n = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0)
      (t = J(this, t, n, 0)),
        (o = !it(t) || (t !== this._$AH && t !== z)),
        o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = s[0], a = 0; a < s.length - 1; a++)
        (c = J(this, l[i + a], n, a)),
          c === z && (c = this._$AH[a]),
          o || (o = !it(c) || c !== this._$AH[a]),
          c === b ? (t = b) : t !== b && (t += (c ?? "") + s[a + 1]),
          (this._$AH[a] = c);
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === b
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? "");
  }
}
class gn extends wt {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const pn = K ? K.emptyScript : "";
class mn extends wt {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    t && t !== b
      ? this.element.setAttribute(this.name, pn)
      : this.element.removeAttribute(this.name);
  }
}
class yn extends wt {
  constructor(t, n, i, r, s) {
    super(t, n, i, r, s), (this.type = 5);
  }
  _$AI(t, n = this) {
    var i;
    if ((t = (i = J(this, t, n, 0)) !== null && i !== void 0 ? i : b) === z)
      return;
    const r = this._$AH,
      s =
        (t === b && r !== b) ||
        t.capture !== r.capture ||
        t.once !== r.once ||
        t.passive !== r.passive,
      o = t !== b && (r === b || s);
    s && this.element.removeEventListener(this.name, this, r),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var n, i;
    typeof this._$AH == "function"
      ? this._$AH.call(
          (i =
            (n = this.options) === null || n === void 0 ? void 0 : n.host) !==
            null && i !== void 0
            ? i
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class An {
  constructor(t, n, i) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = n),
      (this.options = i);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    J(this, t);
  }
}
const me = pt.litHtmlPolyfillSupport;
me == null || me(rt, at),
  ((Bt = pt.litHtmlVersions) !== null && Bt !== void 0
    ? Bt
    : (pt.litHtmlVersions = [])
  ).push("2.7.4");
const vn = (e, t, n) => {
  var i, r;
  const s =
    (i = n == null ? void 0 : n.renderBefore) !== null && i !== void 0 ? i : t;
  let o = s._$litPart$;
  if (o === void 0) {
    const l =
      (r = n == null ? void 0 : n.renderBefore) !== null && r !== void 0
        ? r
        : null;
    s._$litPart$ = o = new at(t.insertBefore(nt(), l), l, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var Mt, Rt;
class ft extends x {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var t, n;
    const i = super.createRenderRoot();
    return (
      ((t = (n = this.renderOptions).renderBefore) !== null && t !== void 0) ||
        (n.renderBefore = i.firstChild),
      i
    );
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = vn(n, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return z;
  }
}
(ft.finalized = !0),
  (ft._$litElement$ = !0),
  (Mt = globalThis.litElementHydrateSupport) === null ||
    Mt === void 0 ||
    Mt.call(globalThis, { LitElement: ft });
const ye = globalThis.litElementPolyfillSupport;
ye == null || ye({ LitElement: ft });
((Rt = globalThis.litElementVersions) !== null && Rt !== void 0
  ? Rt
  : (globalThis.litElementVersions = [])
).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const sr = (e) => (t) =>
  typeof t == "function"
    ? ((n, i) => (customElements.define(n, i), i))(e, t)
    : ((n, i) => {
        const { kind: r, elements: s } = i;
        return {
          kind: r,
          elements: s,
          finisher(o) {
            customElements.define(n, o);
          },
        };
      })(e, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const En = (e, t) =>
  t.kind === "method" && t.descriptor && !("value" in t.descriptor)
    ? {
        ...t,
        finisher(n) {
          n.createProperty(t.key, e);
        },
      }
    : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: t.key,
        initializer() {
          typeof t.initializer == "function" &&
            (this[t.key] = t.initializer.call(this));
        },
        finisher(n) {
          n.createProperty(t.key, e);
        },
      };
function wn(e) {
  return (t, n) =>
    n !== void 0
      ? ((i, r, s) => {
          r.constructor.createProperty(s, i);
        })(e, t, n)
      : En(e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function or(e) {
  return wn({ ...e, state: !0 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var It;
((It = window.HTMLSlotElement) === null || It === void 0
  ? void 0
  : It.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $n = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  _n =
    (e) =>
    (...t) => ({ _$litDirective$: e, values: t });
class Cn {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, n, i) {
    (this._$Ct = t), (this._$AM = n), (this._$Ci = i);
  }
  _$AS(t, n) {
    return this.update(t, n);
  }
  update(t, n) {
    return this.render(...n);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ar = _n(
  class extends Cn {
    constructor(e) {
      var t;
      if (
        (super(e),
        e.type !== $n.ATTRIBUTE ||
          e.name !== "class" ||
          ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      )
        throw Error(
          "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
        );
    }
    render(e) {
      return (
        " " +
        Object.keys(e)
          .filter((t) => e[t])
          .join(" ") +
        " "
      );
    }
    update(e, [t]) {
      var n, i;
      if (this.it === void 0) {
        (this.it = new Set()),
          e.strings !== void 0 &&
            (this.nt = new Set(
              e.strings
                .join(" ")
                .split(/\s/)
                .filter((s) => s !== "")
            ));
        for (const s in t)
          t[s] &&
            !(!((n = this.nt) === null || n === void 0) && n.has(s)) &&
            this.it.add(s);
        return this.render(t);
      }
      const r = e.element.classList;
      this.it.forEach((s) => {
        s in t || (r.remove(s), this.it.delete(s));
      });
      for (const s in t) {
        const o = !!t[s];
        o === this.it.has(s) ||
          (!((i = this.nt) === null || i === void 0) && i.has(s)) ||
          (o ? (r.add(s), this.it.add(s)) : (r.remove(s), this.it.delete(s)));
      }
      return z;
    }
  }
);
function Sn(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
const Ie = (e, t, n) => Math.min(Math.max(n, e), t),
  P = { duration: 0.3, delay: 0, endDelay: 0, repeat: 0, easing: "ease" },
  mt = (e) => typeof e == "number",
  j = (e) => Array.isArray(e) && !mt(e[0]),
  bn = (e, t, n) => {
    const i = t - e;
    return ((((n - e) % i) + i) % i) + e;
  };
function Tn(e, t) {
  return j(e) ? e[bn(0, e.length, t)] : e;
}
const Ue = (e, t, n) => -n * e + n * t + e,
  Le = () => {},
  D = (e) => e,
  Xt = (e, t, n) => (t - e === 0 ? 1 : (n - e) / (t - e));
function De(e, t) {
  const n = e[e.length - 1];
  for (let i = 1; i <= t; i++) {
    const r = Xt(0, t, i);
    e.push(Ue(n, 1, r));
  }
}
function Pn(e) {
  const t = [0];
  return De(t, e - 1), t;
}
function Bn(e, t = Pn(e.length), n = D) {
  const i = e.length,
    r = i - t.length;
  return (
    r > 0 && De(t, r),
    (s) => {
      let o = 0;
      for (; o < i - 2 && !(s < t[o + 1]); o++);
      let l = Ie(0, 1, Xt(t[o], t[o + 1], s));
      return (l = Tn(n, o)(l)), Ue(e[o], e[o + 1], l);
    }
  );
}
const Oe = (e) => Array.isArray(e) && mt(e[0]),
  jt = (e) => typeof e == "object" && !!e.createAnimation,
  Y = (e) => typeof e == "function",
  Nn = (e) => typeof e == "string",
  tt = { ms: (e) => e * 1e3, s: (e) => e / 1e3 },
  ke = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  Mn = 1e-7,
  Rn = 12;
function In(e, t, n, i, r) {
  let s,
    o,
    l = 0;
  do (o = t + (n - t) / 2), (s = ke(o, i, r) - e), s > 0 ? (n = o) : (t = o);
  while (Math.abs(s) > Mn && ++l < Rn);
  return o;
}
function X(e, t, n, i) {
  if (e === t && n === i) return D;
  const r = (s) => In(s, 0, 1, e, n);
  return (s) => (s === 0 || s === 1 ? s : ke(r(s), t, i));
}
const Un =
    (e, t = "end") =>
    (n) => {
      n = t === "end" ? Math.min(n, 0.999) : Math.max(n, 0.001);
      const i = n * e,
        r = t === "end" ? Math.floor(i) : Math.ceil(i);
      return Ie(0, 1, r / e);
    },
  Ae = {
    ease: X(0.25, 0.1, 0.25, 1),
    "ease-in": X(0.42, 0, 1, 1),
    "ease-in-out": X(0.42, 0, 0.58, 1),
    "ease-out": X(0, 0, 0.58, 1),
  },
  Ln = /\((.*?)\)/;
function ve(e) {
  if (Y(e)) return e;
  if (Oe(e)) return X(...e);
  if (Ae[e]) return Ae[e];
  if (e.startsWith("steps")) {
    const t = Ln.exec(e);
    if (t) {
      const n = t[1].split(",");
      return Un(parseFloat(n[0]), n[1].trim());
    }
  }
  return D;
}
class Fe {
  constructor(
    t,
    n = [0, 1],
    {
      easing: i,
      duration: r = P.duration,
      delay: s = P.delay,
      endDelay: o = P.endDelay,
      repeat: l = P.repeat,
      offset: a,
      direction: c = "normal",
    } = {}
  ) {
    if (
      ((this.startTime = null),
      (this.rate = 1),
      (this.t = 0),
      (this.cancelTimestamp = null),
      (this.easing = D),
      (this.duration = 0),
      (this.totalDuration = 0),
      (this.repeat = 0),
      (this.playState = "idle"),
      (this.finished = new Promise((f, u) => {
        (this.resolve = f), (this.reject = u);
      })),
      (i = i || P.easing),
      jt(i))
    ) {
      const f = i.createAnimation(n);
      (i = f.easing), (n = f.keyframes || n), (r = f.duration || r);
    }
    (this.repeat = l), (this.easing = j(i) ? D : ve(i)), this.updateDuration(r);
    const h = Bn(n, a, j(i) ? i.map(ve) : D);
    (this.tick = (f) => {
      var u;
      s = s;
      let d = 0;
      this.pauseTime !== void 0
        ? (d = this.pauseTime)
        : (d = (f - this.startTime) * this.rate),
        (this.t = d),
        (d /= 1e3),
        (d = Math.max(d - s, 0)),
        this.playState === "finished" &&
          this.pauseTime === void 0 &&
          (d = this.totalDuration);
      const m = d / this.duration;
      let A = Math.floor(m),
        C = m % 1;
      !C && m >= 1 && (C = 1), C === 1 && A--;
      const y = A % 2;
      (c === "reverse" ||
        (c === "alternate" && y) ||
        (c === "alternate-reverse" && !y)) &&
        (C = 1 - C);
      const v = d >= this.totalDuration ? 1 : Math.min(C, 1),
        p = h(this.easing(v));
      t(p),
        this.pauseTime === void 0 &&
        (this.playState === "finished" || d >= this.totalDuration + o)
          ? ((this.playState = "finished"),
            (u = this.resolve) === null || u === void 0 || u.call(this, p))
          : this.playState !== "idle" &&
            (this.frameRequestId = requestAnimationFrame(this.tick));
    }),
      this.play();
  }
  play() {
    const t = performance.now();
    (this.playState = "running"),
      this.pauseTime !== void 0
        ? (this.startTime = t - this.pauseTime)
        : this.startTime || (this.startTime = t),
      (this.cancelTimestamp = this.startTime),
      (this.pauseTime = void 0),
      (this.frameRequestId = requestAnimationFrame(this.tick));
  }
  pause() {
    (this.playState = "paused"), (this.pauseTime = this.t);
  }
  finish() {
    (this.playState = "finished"), this.tick(0);
  }
  stop() {
    var t;
    (this.playState = "idle"),
      this.frameRequestId !== void 0 &&
        cancelAnimationFrame(this.frameRequestId),
      (t = this.reject) === null || t === void 0 || t.call(this, !1);
  }
  cancel() {
    this.stop(), this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {}
  updateDuration(t) {
    (this.duration = t), (this.totalDuration = t * (this.repeat + 1));
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(t) {
    this.pauseTime !== void 0 || this.rate === 0
      ? (this.pauseTime = t)
      : (this.startTime = performance.now() - t / this.rate);
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(t) {
    this.rate = t;
  }
}
class Dn {
  setAnimation(t) {
    (this.animation = t),
      t == null || t.finished.then(() => this.clearAnimation()).catch(() => {});
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const Ut = new WeakMap();
function He(e) {
  return (
    Ut.has(e) || Ut.set(e, { transforms: [], values: new Map() }), Ut.get(e)
  );
}
function On(e, t) {
  return e.has(t) || e.set(t, new Dn()), e.get(t);
}
const kn = ["", "X", "Y", "Z"],
  Fn = ["translate", "scale", "rotate", "skew"],
  yt = { x: "translateX", y: "translateY", z: "translateZ" },
  Ee = {
    syntax: "<angle>",
    initialValue: "0deg",
    toDefaultUnit: (e) => e + "deg",
  },
  Hn = {
    translate: {
      syntax: "<length-percentage>",
      initialValue: "0px",
      toDefaultUnit: (e) => e + "px",
    },
    rotate: Ee,
    scale: { syntax: "<number>", initialValue: 1, toDefaultUnit: D },
    skew: Ee,
  },
  st = new Map(),
  te = (e) => `--motion-${e}`,
  At = ["x", "y", "z"];
Fn.forEach((e) => {
  kn.forEach((t) => {
    At.push(e + t), st.set(te(e + t), Hn[e]);
  });
});
const zn = (e, t) => At.indexOf(e) - At.indexOf(t),
  xn = new Set(At),
  ze = (e) => xn.has(e),
  Vn = (e, t) => {
    yt[t] && (t = yt[t]);
    const { transforms: n } = He(e);
    Sn(n, t), (e.style.transform = jn(n));
  },
  jn = (e) => e.sort(zn).reduce(Kn, "").trim(),
  Kn = (e, t) => `${e} ${t}(var(${te(t)}))`,
  Kt = (e) => e.startsWith("--"),
  we = new Set();
function Jn(e) {
  if (!we.has(e)) {
    we.add(e);
    try {
      const { syntax: t, initialValue: n } = st.has(e) ? st.get(e) : {};
      CSS.registerProperty({
        name: e,
        inherits: !1,
        syntax: t,
        initialValue: n,
      });
    } catch {}
  }
}
const Lt = (e, t) => document.createElement("div").animate(e, t),
  $e = {
    cssRegisterProperty: () =>
      typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
    partialKeyframes: () => {
      try {
        Lt({ opacity: [1] });
      } catch {
        return !1;
      }
      return !0;
    },
    finished: () => !!Lt({ opacity: [0, 1] }, { duration: 0.001 }).finished,
    linearEasing: () => {
      try {
        Lt({ opacity: 0 }, { easing: "linear(0, 1)" });
      } catch {
        return !1;
      }
      return !0;
    },
  },
  Dt = {},
  V = {};
for (const e in $e) V[e] = () => (Dt[e] === void 0 && (Dt[e] = $e[e]()), Dt[e]);
const Yn = 0.015,
  qn = (e, t) => {
    let n = "";
    const i = Math.round(t / Yn);
    for (let r = 0; r < i; r++) n += e(Xt(0, i - 1, r)) + ", ";
    return n.substring(0, n.length - 2);
  },
  _e = (e, t) =>
    Y(e)
      ? V.linearEasing()
        ? `linear(${qn(e, t)})`
        : P.easing
      : Oe(e)
      ? Gn(e)
      : e,
  Gn = ([e, t, n, i]) => `cubic-bezier(${e}, ${t}, ${n}, ${i})`;
function Wn(e, t) {
  for (let n = 0; n < e.length; n++)
    e[n] === null && (e[n] = n ? e[n - 1] : t());
  return e;
}
const Qn = (e) => (Array.isArray(e) ? e : [e]);
function Jt(e) {
  return yt[e] && (e = yt[e]), ze(e) ? te(e) : e;
}
const ct = {
  get: (e, t) => {
    t = Jt(t);
    let n = Kt(t) ? e.style.getPropertyValue(t) : getComputedStyle(e)[t];
    if (!n && n !== 0) {
      const i = st.get(t);
      i && (n = i.initialValue);
    }
    return n;
  },
  set: (e, t, n) => {
    (t = Jt(t)), Kt(t) ? e.style.setProperty(t, n) : (e.style[t] = n);
  },
};
function xe(e, t = !0) {
  if (!(!e || e.playState === "finished"))
    try {
      e.stop ? e.stop() : (t && e.commitStyles(), e.cancel());
    } catch {}
}
function Zn(e, t) {
  var n;
  let i = (t == null ? void 0 : t.toDefaultUnit) || D;
  const r = e[e.length - 1];
  if (Nn(r)) {
    const s =
      ((n = r.match(/(-?[\d.]+)([a-z%]*)/)) === null || n === void 0
        ? void 0
        : n[2]) || "";
    s && (i = (o) => o + s);
  }
  return i;
}
function Xn() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function ti(e, t, n, i = {}, r) {
  const s = Xn(),
    o = i.record !== !1 && s;
  let l,
    {
      duration: a = P.duration,
      delay: c = P.delay,
      endDelay: h = P.endDelay,
      repeat: f = P.repeat,
      easing: u = P.easing,
      persist: d = !1,
      direction: m,
      offset: A,
      allowWebkitAcceleration: C = !1,
    } = i;
  const y = He(e),
    v = ze(t);
  let p = V.waapi();
  v && Vn(e, t);
  const g = Jt(t),
    E = On(y.values, g),
    w = st.get(g);
  return (
    xe(E.animation, !(jt(u) && E.generator) && i.record !== !1),
    () => {
      const S = () => {
        var _, N;
        return (N =
          (_ = ct.get(e, g)) !== null && _ !== void 0
            ? _
            : w == null
            ? void 0
            : w.initialValue) !== null && N !== void 0
          ? N
          : 0;
      };
      let $ = Wn(Qn(n), S);
      const B = Zn($, w);
      if (jt(u)) {
        const _ = u.createAnimation($, t !== "opacity", S, g, E);
        (u = _.easing), ($ = _.keyframes || $), (a = _.duration || a);
      }
      if (
        (Kt(g) && (V.cssRegisterProperty() ? Jn(g) : (p = !1)),
        v && !V.linearEasing() && (Y(u) || (j(u) && u.some(Y))) && (p = !1),
        p)
      ) {
        w && ($ = $.map((M) => (mt(M) ? w.toDefaultUnit(M) : M))),
          $.length === 1 && (!V.partialKeyframes() || o) && $.unshift(S());
        const _ = {
          delay: tt.ms(c),
          duration: tt.ms(a),
          endDelay: tt.ms(h),
          easing: j(u) ? void 0 : _e(u, a),
          direction: m,
          iterations: f + 1,
          fill: "both",
        };
        (l = e.animate(
          { [g]: $, offset: A, easing: j(u) ? u.map((M) => _e(M, a)) : void 0 },
          _
        )),
          l.finished ||
            (l.finished = new Promise((M, R) => {
              (l.onfinish = M), (l.oncancel = R);
            }));
        const N = $[$.length - 1];
        l.finished
          .then(() => {
            d || (ct.set(e, g, N), l.cancel());
          })
          .catch(Le),
          C || (l.playbackRate = 1.000001);
      } else if (r && v)
        ($ = $.map((_) => (typeof _ == "string" ? parseFloat(_) : _))),
          $.length === 1 && $.unshift(parseFloat(S())),
          (l = new r(
            (_) => {
              ct.set(e, g, B ? B(_) : _);
            },
            $,
            Object.assign(Object.assign({}, i), { duration: a, easing: u })
          ));
      else {
        const _ = $[$.length - 1];
        ct.set(e, g, w && mt(_) ? w.toDefaultUnit(_) : _);
      }
      return (
        o &&
          s(
            e,
            t,
            $,
            { duration: a, delay: c, easing: u, repeat: f, offset: A },
            "motion-one"
          ),
        E.setAnimation(l),
        l
      );
    }
  );
}
const ei = (e, t) =>
  e[t] ? Object.assign(Object.assign({}, e), e[t]) : Object.assign({}, e);
function ni(e, t) {
  var n;
  return (
    typeof e == "string"
      ? t
        ? (((n = t[e]) !== null && n !== void 0) ||
            (t[e] = document.querySelectorAll(e)),
          (e = t[e]))
        : (e = document.querySelectorAll(e))
      : e instanceof Element && (e = [e]),
    Array.from(e || [])
  );
}
const ii = (e) => e(),
  Ve = (e, t, n = P.duration) =>
    new Proxy(
      { animations: e.map(ii).filter(Boolean), duration: n, options: t },
      si
    ),
  ri = (e) => e.animations[0],
  si = {
    get: (e, t) => {
      const n = ri(e);
      switch (t) {
        case "duration":
          return e.duration;
        case "currentTime":
          return tt.s((n == null ? void 0 : n[t]) || 0);
        case "playbackRate":
        case "playState":
          return n == null ? void 0 : n[t];
        case "finished":
          return (
            e.finished ||
              (e.finished = Promise.all(e.animations.map(oi)).catch(Le)),
            e.finished
          );
        case "stop":
          return () => {
            e.animations.forEach((i) => xe(i));
          };
        case "forEachNative":
          return (i) => {
            e.animations.forEach((r) => i(r, e));
          };
        default:
          return typeof (n == null ? void 0 : n[t]) > "u"
            ? void 0
            : () => e.animations.forEach((i) => i[t]());
      }
    },
    set: (e, t, n) => {
      switch (t) {
        case "currentTime":
          n = tt.ms(n);
        case "currentTime":
        case "playbackRate":
          for (let i = 0; i < e.animations.length; i++) e.animations[i][t] = n;
          return !0;
      }
      return !1;
    },
  },
  oi = (e) => e.finished;
function ai(e, t, n) {
  return Y(e) ? e(t, n) : e;
}
function li(e) {
  return function (n, i, r = {}) {
    n = ni(n);
    const s = n.length,
      o = [];
    for (let l = 0; l < s; l++) {
      const a = n[l];
      for (const c in i) {
        const h = ei(r, c);
        h.delay = ai(h.delay, l, s);
        const f = ti(a, c, i[c], h, e);
        o.push(f);
      }
    }
    return Ve(o, r, r.duration);
  };
}
const ci = li(Fe);
function ui(e, t = {}) {
  return Ve(
    [
      () => {
        const n = new Fe(e, [0, 1], t);
        return n.finished.catch(() => {}), n;
      },
    ],
    t,
    t.duration
  );
}
function lr(e, t, n) {
  return (Y(e) ? ui : ci)(e, t, n);
}
var $t = {},
  hi = function () {
    return (
      typeof Promise == "function" &&
      Promise.prototype &&
      Promise.prototype.then
    );
  },
  je = {},
  T = {};
let ee;
const di = [
  0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
  733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
  2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
];
T.getSymbolSize = function (t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
T.getSymbolTotalCodewords = function (t) {
  return di[t];
};
T.getBCHDigit = function (e) {
  let t = 0;
  for (; e !== 0; ) t++, (e >>>= 1);
  return t;
};
T.setToSJISFunction = function (t) {
  if (typeof t != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  ee = t;
};
T.isKanjiModeEnabled = function () {
  return typeof ee < "u";
};
T.toSJIS = function (t) {
  return ee(t);
};
var _t = {};
(function (e) {
  (e.L = { bit: 1 }),
    (e.M = { bit: 0 }),
    (e.Q = { bit: 3 }),
    (e.H = { bit: 2 });
  function t(n) {
    if (typeof n != "string") throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + n);
    }
  }
  (e.isValid = function (i) {
    return i && typeof i.bit < "u" && i.bit >= 0 && i.bit < 4;
  }),
    (e.from = function (i, r) {
      if (e.isValid(i)) return i;
      try {
        return t(i);
      } catch {
        return r;
      }
    });
})(_t);
function Ke() {
  (this.buffer = []), (this.length = 0);
}
Ke.prototype = {
  get: function (e) {
    const t = Math.floor(e / 8);
    return ((this.buffer[t] >>> (7 - (e % 8))) & 1) === 1;
  },
  put: function (e, t) {
    for (let n = 0; n < t; n++) this.putBit(((e >>> (t - n - 1)) & 1) === 1);
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (e) {
    const t = Math.floor(this.length / 8);
    this.buffer.length <= t && this.buffer.push(0),
      e && (this.buffer[t] |= 128 >>> this.length % 8),
      this.length++;
  },
};
var fi = Ke;
function lt(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  (this.size = e),
    (this.data = new Uint8Array(e * e)),
    (this.reservedBit = new Uint8Array(e * e));
}
lt.prototype.set = function (e, t, n, i) {
  const r = e * this.size + t;
  (this.data[r] = n), i && (this.reservedBit[r] = !0);
};
lt.prototype.get = function (e, t) {
  return this.data[e * this.size + t];
};
lt.prototype.xor = function (e, t, n) {
  this.data[e * this.size + t] ^= n;
};
lt.prototype.isReserved = function (e, t) {
  return this.reservedBit[e * this.size + t];
};
var gi = lt,
  Je = {};
(function (e) {
  const t = T.getSymbolSize;
  (e.getRowColCoords = function (i) {
    if (i === 1) return [];
    const r = Math.floor(i / 7) + 2,
      s = t(i),
      o = s === 145 ? 26 : Math.ceil((s - 13) / (2 * r - 2)) * 2,
      l = [s - 7];
    for (let a = 1; a < r - 1; a++) l[a] = l[a - 1] - o;
    return l.push(6), l.reverse();
  }),
    (e.getPositions = function (i) {
      const r = [],
        s = e.getRowColCoords(i),
        o = s.length;
      for (let l = 0; l < o; l++)
        for (let a = 0; a < o; a++)
          (l === 0 && a === 0) ||
            (l === 0 && a === o - 1) ||
            (l === o - 1 && a === 0) ||
            r.push([s[l], s[a]]);
      return r;
    });
})(Je);
var Ye = {};
const pi = T.getSymbolSize,
  Ce = 7;
Ye.getPositions = function (t) {
  const n = pi(t);
  return [
    [0, 0],
    [n - Ce, 0],
    [0, n - Ce],
  ];
};
var qe = {};
(function (e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  const t = { N1: 3, N2: 3, N3: 40, N4: 10 };
  (e.isValid = function (r) {
    return r != null && r !== "" && !isNaN(r) && r >= 0 && r <= 7;
  }),
    (e.from = function (r) {
      return e.isValid(r) ? parseInt(r, 10) : void 0;
    }),
    (e.getPenaltyN1 = function (r) {
      const s = r.size;
      let o = 0,
        l = 0,
        a = 0,
        c = null,
        h = null;
      for (let f = 0; f < s; f++) {
        (l = a = 0), (c = h = null);
        for (let u = 0; u < s; u++) {
          let d = r.get(f, u);
          d === c ? l++ : (l >= 5 && (o += t.N1 + (l - 5)), (c = d), (l = 1)),
            (d = r.get(u, f)),
            d === h ? a++ : (a >= 5 && (o += t.N1 + (a - 5)), (h = d), (a = 1));
        }
        l >= 5 && (o += t.N1 + (l - 5)), a >= 5 && (o += t.N1 + (a - 5));
      }
      return o;
    }),
    (e.getPenaltyN2 = function (r) {
      const s = r.size;
      let o = 0;
      for (let l = 0; l < s - 1; l++)
        for (let a = 0; a < s - 1; a++) {
          const c =
            r.get(l, a) +
            r.get(l, a + 1) +
            r.get(l + 1, a) +
            r.get(l + 1, a + 1);
          (c === 4 || c === 0) && o++;
        }
      return o * t.N2;
    }),
    (e.getPenaltyN3 = function (r) {
      const s = r.size;
      let o = 0,
        l = 0,
        a = 0;
      for (let c = 0; c < s; c++) {
        l = a = 0;
        for (let h = 0; h < s; h++)
          (l = ((l << 1) & 2047) | r.get(c, h)),
            h >= 10 && (l === 1488 || l === 93) && o++,
            (a = ((a << 1) & 2047) | r.get(h, c)),
            h >= 10 && (a === 1488 || a === 93) && o++;
      }
      return o * t.N3;
    }),
    (e.getPenaltyN4 = function (r) {
      let s = 0;
      const o = r.data.length;
      for (let a = 0; a < o; a++) s += r.data[a];
      return Math.abs(Math.ceil((s * 100) / o / 5) - 10) * t.N4;
    });
  function n(i, r, s) {
    switch (i) {
      case e.Patterns.PATTERN000:
        return (r + s) % 2 === 0;
      case e.Patterns.PATTERN001:
        return r % 2 === 0;
      case e.Patterns.PATTERN010:
        return s % 3 === 0;
      case e.Patterns.PATTERN011:
        return (r + s) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(r / 2) + Math.floor(s / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return ((r * s) % 2) + ((r * s) % 3) === 0;
      case e.Patterns.PATTERN110:
        return (((r * s) % 2) + ((r * s) % 3)) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (((r * s) % 3) + ((r + s) % 2)) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + i);
    }
  }
  (e.applyMask = function (r, s) {
    const o = s.size;
    for (let l = 0; l < o; l++)
      for (let a = 0; a < o; a++) s.isReserved(a, l) || s.xor(a, l, n(r, a, l));
  }),
    (e.getBestMask = function (r, s) {
      const o = Object.keys(e.Patterns).length;
      let l = 0,
        a = 1 / 0;
      for (let c = 0; c < o; c++) {
        s(c), e.applyMask(c, r);
        const h =
          e.getPenaltyN1(r) +
          e.getPenaltyN2(r) +
          e.getPenaltyN3(r) +
          e.getPenaltyN4(r);
        e.applyMask(c, r), h < a && ((a = h), (l = c));
      }
      return l;
    });
})(qe);
var Ct = {};
const L = _t,
  ut = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
    4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
    9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13,
    18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18,
    25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13,
    26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54,
    18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59,
    70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
  ],
  ht = [
    7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
    88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192,
    72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352,
    120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448,
    532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442,
    644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312,
    588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050,
    1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510,
    924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064,
    1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860,
    2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
  ];
Ct.getBlocksCount = function (t, n) {
  switch (n) {
    case L.L:
      return ut[(t - 1) * 4 + 0];
    case L.M:
      return ut[(t - 1) * 4 + 1];
    case L.Q:
      return ut[(t - 1) * 4 + 2];
    case L.H:
      return ut[(t - 1) * 4 + 3];
    default:
      return;
  }
};
Ct.getTotalCodewordsCount = function (t, n) {
  switch (n) {
    case L.L:
      return ht[(t - 1) * 4 + 0];
    case L.M:
      return ht[(t - 1) * 4 + 1];
    case L.Q:
      return ht[(t - 1) * 4 + 2];
    case L.H:
      return ht[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var Ge = {},
  St = {};
const et = new Uint8Array(512),
  vt = new Uint8Array(256);
(function () {
  let t = 1;
  for (let n = 0; n < 255; n++)
    (et[n] = t), (vt[t] = n), (t <<= 1), t & 256 && (t ^= 285);
  for (let n = 255; n < 512; n++) et[n] = et[n - 255];
})();
St.log = function (t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return vt[t];
};
St.exp = function (t) {
  return et[t];
};
St.mul = function (t, n) {
  return t === 0 || n === 0 ? 0 : et[vt[t] + vt[n]];
};
(function (e) {
  const t = St;
  (e.mul = function (i, r) {
    const s = new Uint8Array(i.length + r.length - 1);
    for (let o = 0; o < i.length; o++)
      for (let l = 0; l < r.length; l++) s[o + l] ^= t.mul(i[o], r[l]);
    return s;
  }),
    (e.mod = function (i, r) {
      let s = new Uint8Array(i);
      for (; s.length - r.length >= 0; ) {
        const o = s[0];
        for (let a = 0; a < r.length; a++) s[a] ^= t.mul(r[a], o);
        let l = 0;
        for (; l < s.length && s[l] === 0; ) l++;
        s = s.slice(l);
      }
      return s;
    }),
    (e.generateECPolynomial = function (i) {
      let r = new Uint8Array([1]);
      for (let s = 0; s < i; s++) r = e.mul(r, new Uint8Array([1, t.exp(s)]));
      return r;
    });
})(Ge);
const We = Ge;
function ne(e) {
  (this.genPoly = void 0),
    (this.degree = e),
    this.degree && this.initialize(this.degree);
}
ne.prototype.initialize = function (t) {
  (this.degree = t), (this.genPoly = We.generateECPolynomial(this.degree));
};
ne.prototype.encode = function (t) {
  if (!this.genPoly) throw new Error("Encoder not initialized");
  const n = new Uint8Array(t.length + this.degree);
  n.set(t);
  const i = We.mod(n, this.genPoly),
    r = this.degree - i.length;
  if (r > 0) {
    const s = new Uint8Array(this.degree);
    return s.set(i, r), s;
  }
  return i;
};
var mi = ne,
  Qe = {},
  O = {},
  ie = {};
ie.isValid = function (t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var I = {};
const Ze = "[0-9]+",
  yi = "[A-Z $%*+\\-./:]+";
let ot =
  "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
ot = ot.replace(/u/g, "\\u");
const Ai =
  "(?:(?![A-Z0-9 $%*+\\-./:]|" +
  ot +
  `)(?:.|[\r
]))+`;
I.KANJI = new RegExp(ot, "g");
I.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
I.BYTE = new RegExp(Ai, "g");
I.NUMERIC = new RegExp(Ze, "g");
I.ALPHANUMERIC = new RegExp(yi, "g");
const vi = new RegExp("^" + ot + "$"),
  Ei = new RegExp("^" + Ze + "$"),
  wi = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
I.testKanji = function (t) {
  return vi.test(t);
};
I.testNumeric = function (t) {
  return Ei.test(t);
};
I.testAlphanumeric = function (t) {
  return wi.test(t);
};
(function (e) {
  const t = ie,
    n = I;
  (e.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
    (e.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }),
    (e.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
    (e.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
    (e.MIXED = { bit: -1 }),
    (e.getCharCountIndicator = function (s, o) {
      if (!s.ccBits) throw new Error("Invalid mode: " + s);
      if (!t.isValid(o)) throw new Error("Invalid version: " + o);
      return o >= 1 && o < 10
        ? s.ccBits[0]
        : o < 27
        ? s.ccBits[1]
        : s.ccBits[2];
    }),
    (e.getBestModeForData = function (s) {
      return n.testNumeric(s)
        ? e.NUMERIC
        : n.testAlphanumeric(s)
        ? e.ALPHANUMERIC
        : n.testKanji(s)
        ? e.KANJI
        : e.BYTE;
    }),
    (e.toString = function (s) {
      if (s && s.id) return s.id;
      throw new Error("Invalid mode");
    }),
    (e.isValid = function (s) {
      return s && s.bit && s.ccBits;
    });
  function i(r) {
    if (typeof r != "string") throw new Error("Param is not a string");
    switch (r.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + r);
    }
  }
  e.from = function (s, o) {
    if (e.isValid(s)) return s;
    try {
      return i(s);
    } catch {
      return o;
    }
  };
})(O);
(function (e) {
  const t = T,
    n = Ct,
    i = _t,
    r = O,
    s = ie,
    o = 7973,
    l = t.getBCHDigit(o);
  function a(u, d, m) {
    for (let A = 1; A <= 40; A++) if (d <= e.getCapacity(A, m, u)) return A;
  }
  function c(u, d) {
    return r.getCharCountIndicator(u, d) + 4;
  }
  function h(u, d) {
    let m = 0;
    return (
      u.forEach(function (A) {
        const C = c(A.mode, d);
        m += C + A.getBitsLength();
      }),
      m
    );
  }
  function f(u, d) {
    for (let m = 1; m <= 40; m++)
      if (h(u, m) <= e.getCapacity(m, d, r.MIXED)) return m;
  }
  (e.from = function (d, m) {
    return s.isValid(d) ? parseInt(d, 10) : m;
  }),
    (e.getCapacity = function (d, m, A) {
      if (!s.isValid(d)) throw new Error("Invalid QR Code version");
      typeof A > "u" && (A = r.BYTE);
      const C = t.getSymbolTotalCodewords(d),
        y = n.getTotalCodewordsCount(d, m),
        v = (C - y) * 8;
      if (A === r.MIXED) return v;
      const p = v - c(A, d);
      switch (A) {
        case r.NUMERIC:
          return Math.floor((p / 10) * 3);
        case r.ALPHANUMERIC:
          return Math.floor((p / 11) * 2);
        case r.KANJI:
          return Math.floor(p / 13);
        case r.BYTE:
        default:
          return Math.floor(p / 8);
      }
    }),
    (e.getBestVersionForData = function (d, m) {
      let A;
      const C = i.from(m, i.M);
      if (Array.isArray(d)) {
        if (d.length > 1) return f(d, C);
        if (d.length === 0) return 1;
        A = d[0];
      } else A = d;
      return a(A.mode, A.getLength(), C);
    }),
    (e.getEncodedBits = function (d) {
      if (!s.isValid(d) || d < 7) throw new Error("Invalid QR Code version");
      let m = d << 12;
      for (; t.getBCHDigit(m) - l >= 0; ) m ^= o << (t.getBCHDigit(m) - l);
      return (d << 12) | m;
    });
})(Qe);
var Xe = {};
const Yt = T,
  tn = 1335,
  $i = 21522,
  Se = Yt.getBCHDigit(tn);
Xe.getEncodedBits = function (t, n) {
  const i = (t.bit << 3) | n;
  let r = i << 10;
  for (; Yt.getBCHDigit(r) - Se >= 0; ) r ^= tn << (Yt.getBCHDigit(r) - Se);
  return ((i << 10) | r) ^ $i;
};
var en = {};
const _i = O;
function q(e) {
  (this.mode = _i.NUMERIC), (this.data = e.toString());
}
q.getBitsLength = function (t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
};
q.prototype.getLength = function () {
  return this.data.length;
};
q.prototype.getBitsLength = function () {
  return q.getBitsLength(this.data.length);
};
q.prototype.write = function (t) {
  let n, i, r;
  for (n = 0; n + 3 <= this.data.length; n += 3)
    (i = this.data.substr(n, 3)), (r = parseInt(i, 10)), t.put(r, 10);
  const s = this.data.length - n;
  s > 0 &&
    ((i = this.data.substr(n)), (r = parseInt(i, 10)), t.put(r, s * 3 + 1));
};
var Ci = q;
const Si = O,
  Ot = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":",
  ];
function G(e) {
  (this.mode = Si.ALPHANUMERIC), (this.data = e);
}
G.getBitsLength = function (t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
G.prototype.getLength = function () {
  return this.data.length;
};
G.prototype.getBitsLength = function () {
  return G.getBitsLength(this.data.length);
};
G.prototype.write = function (t) {
  let n;
  for (n = 0; n + 2 <= this.data.length; n += 2) {
    let i = Ot.indexOf(this.data[n]) * 45;
    (i += Ot.indexOf(this.data[n + 1])), t.put(i, 11);
  }
  this.data.length % 2 && t.put(Ot.indexOf(this.data[n]), 6);
};
var bi = G,
  Ti = function (t) {
    for (var n = [], i = t.length, r = 0; r < i; r++) {
      var s = t.charCodeAt(r);
      if (s >= 55296 && s <= 56319 && i > r + 1) {
        var o = t.charCodeAt(r + 1);
        o >= 56320 &&
          o <= 57343 &&
          ((s = (s - 55296) * 1024 + o - 56320 + 65536), (r += 1));
      }
      if (s < 128) {
        n.push(s);
        continue;
      }
      if (s < 2048) {
        n.push((s >> 6) | 192), n.push((s & 63) | 128);
        continue;
      }
      if (s < 55296 || (s >= 57344 && s < 65536)) {
        n.push((s >> 12) | 224),
          n.push(((s >> 6) & 63) | 128),
          n.push((s & 63) | 128);
        continue;
      }
      if (s >= 65536 && s <= 1114111) {
        n.push((s >> 18) | 240),
          n.push(((s >> 12) & 63) | 128),
          n.push(((s >> 6) & 63) | 128),
          n.push((s & 63) | 128);
        continue;
      }
      n.push(239, 191, 189);
    }
    return new Uint8Array(n).buffer;
  };
const Pi = Ti,
  Bi = O;
function W(e) {
  (this.mode = Bi.BYTE),
    typeof e == "string" && (e = Pi(e)),
    (this.data = new Uint8Array(e));
}
W.getBitsLength = function (t) {
  return t * 8;
};
W.prototype.getLength = function () {
  return this.data.length;
};
W.prototype.getBitsLength = function () {
  return W.getBitsLength(this.data.length);
};
W.prototype.write = function (e) {
  for (let t = 0, n = this.data.length; t < n; t++) e.put(this.data[t], 8);
};
var Ni = W;
const Mi = O,
  Ri = T;
function Q(e) {
  (this.mode = Mi.KANJI), (this.data = e);
}
Q.getBitsLength = function (t) {
  return t * 13;
};
Q.prototype.getLength = function () {
  return this.data.length;
};
Q.prototype.getBitsLength = function () {
  return Q.getBitsLength(this.data.length);
};
Q.prototype.write = function (e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let n = Ri.toSJIS(this.data[t]);
    if (n >= 33088 && n <= 40956) n -= 33088;
    else if (n >= 57408 && n <= 60351) n -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " +
          this.data[t] +
          `
Make sure your charset is UTF-8`
      );
    (n = ((n >>> 8) & 255) * 192 + (n & 255)), e.put(n, 13);
  }
};
var Ii = Q,
  nn = { exports: {} };
(function (e) {
  var t = {
    single_source_shortest_paths: function (n, i, r) {
      var s = {},
        o = {};
      o[i] = 0;
      var l = t.PriorityQueue.make();
      l.push(i, 0);
      for (var a, c, h, f, u, d, m, A, C; !l.empty(); ) {
        (a = l.pop()), (c = a.value), (f = a.cost), (u = n[c] || {});
        for (h in u)
          u.hasOwnProperty(h) &&
            ((d = u[h]),
            (m = f + d),
            (A = o[h]),
            (C = typeof o[h] > "u"),
            (C || A > m) && ((o[h] = m), l.push(h, m), (s[h] = c)));
      }
      if (typeof r < "u" && typeof o[r] > "u") {
        var y = ["Could not find a path from ", i, " to ", r, "."].join("");
        throw new Error(y);
      }
      return s;
    },
    extract_shortest_path_from_predecessor_list: function (n, i) {
      for (var r = [], s = i; s; ) r.push(s), n[s], (s = n[s]);
      return r.reverse(), r;
    },
    find_path: function (n, i, r) {
      var s = t.single_source_shortest_paths(n, i, r);
      return t.extract_shortest_path_from_predecessor_list(s, r);
    },
    PriorityQueue: {
      make: function (n) {
        var i = t.PriorityQueue,
          r = {},
          s;
        n = n || {};
        for (s in i) i.hasOwnProperty(s) && (r[s] = i[s]);
        return (r.queue = []), (r.sorter = n.sorter || i.default_sorter), r;
      },
      default_sorter: function (n, i) {
        return n.cost - i.cost;
      },
      push: function (n, i) {
        var r = { value: n, cost: i };
        this.queue.push(r), this.queue.sort(this.sorter);
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return this.queue.length === 0;
      },
    },
  };
  e.exports = t;
})(nn);
var Ui = nn.exports;
(function (e) {
  const t = O,
    n = Ci,
    i = bi,
    r = Ni,
    s = Ii,
    o = I,
    l = T,
    a = Ui;
  function c(y) {
    return unescape(encodeURIComponent(y)).length;
  }
  function h(y, v, p) {
    const g = [];
    let E;
    for (; (E = y.exec(p)) !== null; )
      g.push({ data: E[0], index: E.index, mode: v, length: E[0].length });
    return g;
  }
  function f(y) {
    const v = h(o.NUMERIC, t.NUMERIC, y),
      p = h(o.ALPHANUMERIC, t.ALPHANUMERIC, y);
    let g, E;
    return (
      l.isKanjiModeEnabled()
        ? ((g = h(o.BYTE, t.BYTE, y)), (E = h(o.KANJI, t.KANJI, y)))
        : ((g = h(o.BYTE_KANJI, t.BYTE, y)), (E = [])),
      v
        .concat(p, g, E)
        .sort(function (S, $) {
          return S.index - $.index;
        })
        .map(function (S) {
          return { data: S.data, mode: S.mode, length: S.length };
        })
    );
  }
  function u(y, v) {
    switch (v) {
      case t.NUMERIC:
        return n.getBitsLength(y);
      case t.ALPHANUMERIC:
        return i.getBitsLength(y);
      case t.KANJI:
        return s.getBitsLength(y);
      case t.BYTE:
        return r.getBitsLength(y);
    }
  }
  function d(y) {
    return y.reduce(function (v, p) {
      const g = v.length - 1 >= 0 ? v[v.length - 1] : null;
      return g && g.mode === p.mode
        ? ((v[v.length - 1].data += p.data), v)
        : (v.push(p), v);
    }, []);
  }
  function m(y) {
    const v = [];
    for (let p = 0; p < y.length; p++) {
      const g = y[p];
      switch (g.mode) {
        case t.NUMERIC:
          v.push([
            g,
            { data: g.data, mode: t.ALPHANUMERIC, length: g.length },
            { data: g.data, mode: t.BYTE, length: g.length },
          ]);
          break;
        case t.ALPHANUMERIC:
          v.push([g, { data: g.data, mode: t.BYTE, length: g.length }]);
          break;
        case t.KANJI:
          v.push([g, { data: g.data, mode: t.BYTE, length: c(g.data) }]);
          break;
        case t.BYTE:
          v.push([{ data: g.data, mode: t.BYTE, length: c(g.data) }]);
      }
    }
    return v;
  }
  function A(y, v) {
    const p = {},
      g = { start: {} };
    let E = ["start"];
    for (let w = 0; w < y.length; w++) {
      const S = y[w],
        $ = [];
      for (let B = 0; B < S.length; B++) {
        const _ = S[B],
          N = "" + w + B;
        $.push(N), (p[N] = { node: _, lastCount: 0 }), (g[N] = {});
        for (let M = 0; M < E.length; M++) {
          const R = E[M];
          p[R] && p[R].node.mode === _.mode
            ? ((g[R][N] =
                u(p[R].lastCount + _.length, _.mode) -
                u(p[R].lastCount, _.mode)),
              (p[R].lastCount += _.length))
            : (p[R] && (p[R].lastCount = _.length),
              (g[R][N] =
                u(_.length, _.mode) + 4 + t.getCharCountIndicator(_.mode, v)));
        }
      }
      E = $;
    }
    for (let w = 0; w < E.length; w++) g[E[w]].end = 0;
    return { map: g, table: p };
  }
  function C(y, v) {
    let p;
    const g = t.getBestModeForData(y);
    if (((p = t.from(v, g)), p !== t.BYTE && p.bit < g.bit))
      throw new Error(
        '"' +
          y +
          '" cannot be encoded with mode ' +
          t.toString(p) +
          `.
 Suggested mode is: ` +
          t.toString(g)
      );
    switch ((p === t.KANJI && !l.isKanjiModeEnabled() && (p = t.BYTE), p)) {
      case t.NUMERIC:
        return new n(y);
      case t.ALPHANUMERIC:
        return new i(y);
      case t.KANJI:
        return new s(y);
      case t.BYTE:
        return new r(y);
    }
  }
  (e.fromArray = function (v) {
    return v.reduce(function (p, g) {
      return (
        typeof g == "string"
          ? p.push(C(g, null))
          : g.data && p.push(C(g.data, g.mode)),
        p
      );
    }, []);
  }),
    (e.fromString = function (v, p) {
      const g = f(v, l.isKanjiModeEnabled()),
        E = m(g),
        w = A(E, p),
        S = a.find_path(w.map, "start", "end"),
        $ = [];
      for (let B = 1; B < S.length - 1; B++) $.push(w.table[S[B]].node);
      return e.fromArray(d($));
    }),
    (e.rawSplit = function (v) {
      return e.fromArray(f(v, l.isKanjiModeEnabled()));
    });
})(en);
const bt = T,
  kt = _t,
  Li = fi,
  Di = gi,
  Oi = Je,
  ki = Ye,
  qt = qe,
  Gt = Ct,
  Fi = mi,
  Et = Qe,
  Hi = Xe,
  zi = O,
  Ft = en;
function xi(e, t) {
  const n = e.size,
    i = ki.getPositions(t);
  for (let r = 0; r < i.length; r++) {
    const s = i[r][0],
      o = i[r][1];
    for (let l = -1; l <= 7; l++)
      if (!(s + l <= -1 || n <= s + l))
        for (let a = -1; a <= 7; a++)
          o + a <= -1 ||
            n <= o + a ||
            ((l >= 0 && l <= 6 && (a === 0 || a === 6)) ||
            (a >= 0 && a <= 6 && (l === 0 || l === 6)) ||
            (l >= 2 && l <= 4 && a >= 2 && a <= 4)
              ? e.set(s + l, o + a, !0, !0)
              : e.set(s + l, o + a, !1, !0));
  }
}
function Vi(e) {
  const t = e.size;
  for (let n = 8; n < t - 8; n++) {
    const i = n % 2 === 0;
    e.set(n, 6, i, !0), e.set(6, n, i, !0);
  }
}
function ji(e, t) {
  const n = Oi.getPositions(t);
  for (let i = 0; i < n.length; i++) {
    const r = n[i][0],
      s = n[i][1];
    for (let o = -2; o <= 2; o++)
      for (let l = -2; l <= 2; l++)
        o === -2 || o === 2 || l === -2 || l === 2 || (o === 0 && l === 0)
          ? e.set(r + o, s + l, !0, !0)
          : e.set(r + o, s + l, !1, !0);
  }
}
function Ki(e, t) {
  const n = e.size,
    i = Et.getEncodedBits(t);
  let r, s, o;
  for (let l = 0; l < 18; l++)
    (r = Math.floor(l / 3)),
      (s = (l % 3) + n - 8 - 3),
      (o = ((i >> l) & 1) === 1),
      e.set(r, s, o, !0),
      e.set(s, r, o, !0);
}
function Ht(e, t, n) {
  const i = e.size,
    r = Hi.getEncodedBits(t, n);
  let s, o;
  for (s = 0; s < 15; s++)
    (o = ((r >> s) & 1) === 1),
      s < 6
        ? e.set(s, 8, o, !0)
        : s < 8
        ? e.set(s + 1, 8, o, !0)
        : e.set(i - 15 + s, 8, o, !0),
      s < 8
        ? e.set(8, i - s - 1, o, !0)
        : s < 9
        ? e.set(8, 15 - s - 1 + 1, o, !0)
        : e.set(8, 15 - s - 1, o, !0);
  e.set(i - 8, 8, 1, !0);
}
function Ji(e, t) {
  const n = e.size;
  let i = -1,
    r = n - 1,
    s = 7,
    o = 0;
  for (let l = n - 1; l > 0; l -= 2)
    for (l === 6 && l--; ; ) {
      for (let a = 0; a < 2; a++)
        if (!e.isReserved(r, l - a)) {
          let c = !1;
          o < t.length && (c = ((t[o] >>> s) & 1) === 1),
            e.set(r, l - a, c),
            s--,
            s === -1 && (o++, (s = 7));
        }
      if (((r += i), r < 0 || n <= r)) {
        (r -= i), (i = -i);
        break;
      }
    }
}
function Yi(e, t, n) {
  const i = new Li();
  n.forEach(function (a) {
    i.put(a.mode.bit, 4),
      i.put(a.getLength(), zi.getCharCountIndicator(a.mode, e)),
      a.write(i);
  });
  const r = bt.getSymbolTotalCodewords(e),
    s = Gt.getTotalCodewordsCount(e, t),
    o = (r - s) * 8;
  for (
    i.getLengthInBits() + 4 <= o && i.put(0, 4);
    i.getLengthInBits() % 8 !== 0;

  )
    i.putBit(0);
  const l = (o - i.getLengthInBits()) / 8;
  for (let a = 0; a < l; a++) i.put(a % 2 ? 17 : 236, 8);
  return qi(i, e, t);
}
function qi(e, t, n) {
  const i = bt.getSymbolTotalCodewords(t),
    r = Gt.getTotalCodewordsCount(t, n),
    s = i - r,
    o = Gt.getBlocksCount(t, n),
    l = i % o,
    a = o - l,
    c = Math.floor(i / o),
    h = Math.floor(s / o),
    f = h + 1,
    u = c - h,
    d = new Fi(u);
  let m = 0;
  const A = new Array(o),
    C = new Array(o);
  let y = 0;
  const v = new Uint8Array(e.buffer);
  for (let S = 0; S < o; S++) {
    const $ = S < a ? h : f;
    (A[S] = v.slice(m, m + $)),
      (C[S] = d.encode(A[S])),
      (m += $),
      (y = Math.max(y, $));
  }
  const p = new Uint8Array(i);
  let g = 0,
    E,
    w;
  for (E = 0; E < y; E++)
    for (w = 0; w < o; w++) E < A[w].length && (p[g++] = A[w][E]);
  for (E = 0; E < u; E++) for (w = 0; w < o; w++) p[g++] = C[w][E];
  return p;
}
function Gi(e, t, n, i) {
  let r;
  if (Array.isArray(e)) r = Ft.fromArray(e);
  else if (typeof e == "string") {
    let c = t;
    if (!c) {
      const h = Ft.rawSplit(e);
      c = Et.getBestVersionForData(h, n);
    }
    r = Ft.fromString(e, c || 40);
  } else throw new Error("Invalid data");
  const s = Et.getBestVersionForData(r, n);
  if (!s)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!t) t = s;
  else if (t < s)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` +
        s +
        `.
`
    );
  const o = Yi(t, n, r),
    l = bt.getSymbolSize(t),
    a = new Di(l);
  return (
    xi(a, t),
    Vi(a),
    ji(a, t),
    Ht(a, n, 0),
    t >= 7 && Ki(a, t),
    Ji(a, o),
    isNaN(i) && (i = qt.getBestMask(a, Ht.bind(null, a, n))),
    qt.applyMask(i, a),
    Ht(a, n, i),
    {
      modules: a,
      version: t,
      errorCorrectionLevel: n,
      maskPattern: i,
      segments: r,
    }
  );
}
je.create = function (t, n) {
  if (typeof t > "u" || t === "") throw new Error("No input text");
  let i = kt.M,
    r,
    s;
  return (
    typeof n < "u" &&
      ((i = kt.from(n.errorCorrectionLevel, kt.M)),
      (r = Et.from(n.version)),
      (s = qt.from(n.maskPattern)),
      n.toSJISFunc && bt.setToSJISFunction(n.toSJISFunc)),
    Gi(t, r, i, s)
  );
};
var rn = {},
  re = {};
(function (e) {
  function t(n) {
    if ((typeof n == "number" && (n = n.toString()), typeof n != "string"))
      throw new Error("Color should be defined as hex string");
    let i = n.slice().replace("#", "").split("");
    if (i.length < 3 || i.length === 5 || i.length > 8)
      throw new Error("Invalid hex color: " + n);
    (i.length === 3 || i.length === 4) &&
      (i = Array.prototype.concat.apply(
        [],
        i.map(function (s) {
          return [s, s];
        })
      )),
      i.length === 6 && i.push("F", "F");
    const r = parseInt(i.join(""), 16);
    return {
      r: (r >> 24) & 255,
      g: (r >> 16) & 255,
      b: (r >> 8) & 255,
      a: r & 255,
      hex: "#" + i.slice(0, 6).join(""),
    };
  }
  (e.getOptions = function (i) {
    i || (i = {}), i.color || (i.color = {});
    const r =
        typeof i.margin > "u" || i.margin === null || i.margin < 0
          ? 4
          : i.margin,
      s = i.width && i.width >= 21 ? i.width : void 0,
      o = i.scale || 4;
    return {
      width: s,
      scale: s ? 4 : o,
      margin: r,
      color: {
        dark: t(i.color.dark || "#000000ff"),
        light: t(i.color.light || "#ffffffff"),
      },
      type: i.type,
      rendererOpts: i.rendererOpts || {},
    };
  }),
    (e.getScale = function (i, r) {
      return r.width && r.width >= i + r.margin * 2
        ? r.width / (i + r.margin * 2)
        : r.scale;
    }),
    (e.getImageWidth = function (i, r) {
      const s = e.getScale(i, r);
      return Math.floor((i + r.margin * 2) * s);
    }),
    (e.qrToImageData = function (i, r, s) {
      const o = r.modules.size,
        l = r.modules.data,
        a = e.getScale(o, s),
        c = Math.floor((o + s.margin * 2) * a),
        h = s.margin * a,
        f = [s.color.light, s.color.dark];
      for (let u = 0; u < c; u++)
        for (let d = 0; d < c; d++) {
          let m = (u * c + d) * 4,
            A = s.color.light;
          if (u >= h && d >= h && u < c - h && d < c - h) {
            const C = Math.floor((u - h) / a),
              y = Math.floor((d - h) / a);
            A = f[l[C * o + y] ? 1 : 0];
          }
          (i[m++] = A.r), (i[m++] = A.g), (i[m++] = A.b), (i[m] = A.a);
        }
    });
})(re);
(function (e) {
  const t = re;
  function n(r, s, o) {
    r.clearRect(0, 0, s.width, s.height),
      s.style || (s.style = {}),
      (s.height = o),
      (s.width = o),
      (s.style.height = o + "px"),
      (s.style.width = o + "px");
  }
  function i() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  (e.render = function (s, o, l) {
    let a = l,
      c = o;
    typeof a > "u" && (!o || !o.getContext) && ((a = o), (o = void 0)),
      o || (c = i()),
      (a = t.getOptions(a));
    const h = t.getImageWidth(s.modules.size, a),
      f = c.getContext("2d"),
      u = f.createImageData(h, h);
    return (
      t.qrToImageData(u.data, s, a), n(f, c, h), f.putImageData(u, 0, 0), c
    );
  }),
    (e.renderToDataURL = function (s, o, l) {
      let a = l;
      typeof a > "u" && (!o || !o.getContext) && ((a = o), (o = void 0)),
        a || (a = {});
      const c = e.render(s, o, a),
        h = a.type || "image/png",
        f = a.rendererOpts || {};
      return c.toDataURL(h, f.quality);
    });
})(rn);
var sn = {};
const Wi = re;
function be(e, t) {
  const n = e.a / 255,
    i = t + '="' + e.hex + '"';
  return n < 1 ? i + " " + t + '-opacity="' + n.toFixed(2).slice(1) + '"' : i;
}
function zt(e, t, n) {
  let i = e + t;
  return typeof n < "u" && (i += " " + n), i;
}
function Qi(e, t, n) {
  let i = "",
    r = 0,
    s = !1,
    o = 0;
  for (let l = 0; l < e.length; l++) {
    const a = Math.floor(l % t),
      c = Math.floor(l / t);
    !a && !s && (s = !0),
      e[l]
        ? (o++,
          (l > 0 && a > 0 && e[l - 1]) ||
            ((i += s ? zt("M", a + n, 0.5 + c + n) : zt("m", r, 0)),
            (r = 0),
            (s = !1)),
          (a + 1 < t && e[l + 1]) || ((i += zt("h", o)), (o = 0)))
        : r++;
  }
  return i;
}
sn.render = function (t, n, i) {
  const r = Wi.getOptions(n),
    s = t.modules.size,
    o = t.modules.data,
    l = s + r.margin * 2,
    a = r.color.light.a
      ? "<path " +
        be(r.color.light, "fill") +
        ' d="M0 0h' +
        l +
        "v" +
        l +
        'H0z"/>'
      : "",
    c =
      "<path " +
      be(r.color.dark, "stroke") +
      ' d="' +
      Qi(o, s, r.margin) +
      '"/>',
    h = 'viewBox="0 0 ' + l + " " + l + '"',
    u =
      '<svg xmlns="http://www.w3.org/2000/svg" ' +
      (r.width ? 'width="' + r.width + '" height="' + r.width + '" ' : "") +
      h +
      ' shape-rendering="crispEdges">' +
      a +
      c +
      `</svg>
`;
  return typeof i == "function" && i(null, u), u;
};
const Zi = hi,
  Wt = je,
  on = rn,
  Xi = sn;
function se(e, t, n, i, r) {
  const s = [].slice.call(arguments, 1),
    o = s.length,
    l = typeof s[o - 1] == "function";
  if (!l && !Zi()) throw new Error("Callback required as last argument");
  if (l) {
    if (o < 2) throw new Error("Too few arguments provided");
    o === 2
      ? ((r = n), (n = t), (t = i = void 0))
      : o === 3 &&
        (t.getContext && typeof r > "u"
          ? ((r = i), (i = void 0))
          : ((r = i), (i = n), (n = t), (t = void 0)));
  } else {
    if (o < 1) throw new Error("Too few arguments provided");
    return (
      o === 1
        ? ((n = t), (t = i = void 0))
        : o === 2 && !t.getContext && ((i = n), (n = t), (t = void 0)),
      new Promise(function (a, c) {
        try {
          const h = Wt.create(n, i);
          a(e(h, t, i));
        } catch (h) {
          c(h);
        }
      })
    );
  }
  try {
    const a = Wt.create(n, i);
    r(null, e(a, t, i));
  } catch (a) {
    r(a);
  }
}
$t.create = Wt.create;
$t.toCanvas = se.bind(null, on.render);
$t.toDataURL = se.bind(null, on.renderToDataURL);
$t.toString = se.bind(null, function (e, t, n) {
  return Xi.render(e, n);
});
export {
  b as A,
  lr as a,
  rr as b,
  sr as c,
  $t as d,
  wn as e,
  er as i,
  ar as o,
  ft as s,
  or as t,
  ir as x,
};
