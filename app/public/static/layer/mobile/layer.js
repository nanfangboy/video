/* ! layer mobile-v2.0.0 Web弹层组件 MIT License  http://layer.layui.com/mobile  By 贤心 */
!function(e) {
  'use strict'; const t = document,
    n = 'querySelectorAll',
    i = 'getElementsByClassName',
    a = function(e) { return t[n](e); },
    s = { type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: 'scale' },
    l = { extend(e) { const t = JSON.parse(JSON.stringify(s)); for (const n in e)t[n] = e[n]; return t; }, timer: {}, end: {} }; l.touch = function(e, t) { e.addEventListener('click', function(e) { t.call(this, e); }, !1); }; let r = 0,
    o = [ 'layui-m-layer' ],
    c = function(e) { const t = this; t.config = l.extend(e), t.view(); }; c.prototype.view = function() {
    const e = this,
      n = e.config,
      s = t.createElement('div'); e.id = s.id = o[0] + r, s.setAttribute('class', o[0] + ' ' + o[0] + (n.type || 0)), s.setAttribute('index', r); const l = function() { const e = typeof n.title === 'object'; return n.title ? '<h3 style="' + (e ? n.title[1] : '') + '">' + (e ? n.title[0] : n.title) + '</h3>' : ''; }(),
      c = function() {
        typeof n.btn === 'string' && (n.btn = [ n.btn ]); let e,
          t = (n.btn || []).length; return t !== 0 && n.btn ? (e = '<span yes type="1">' + n.btn[0] + '</span>', t === 2 && (e = '<span no type="0">' + n.btn[1] + '</span>' + e), '<div class="layui-m-layerbtn">' + e + '</div>') : '';
      }(); if (n.fixed || (n.top = n.hasOwnProperty('top') ? n.top : 100, n.style = n.style || '', n.style += ' top:' + (t.body.scrollTop + n.top) + 'px'), n.type === 2 && (n.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (n.content || '') + '</p>'), n.skin && (n.anim = 'up'), n.skin === 'msg' && (n.shade = !1), s.innerHTML = (n.shade ? '<div ' + (typeof n.shade === 'string' ? 'style="' + n.shade + '"' : '') + ' class="layui-m-layershade"></div>' : '') + '<div class="layui-m-layermain" ' + (n.fixed ? '' : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (n.skin ? 'layui-m-layer-' + n.skin + ' ' : '') + (n.className ? n.className : '') + ' ' + (n.anim ? 'layui-m-anim-' + n.anim : '') + '" ' + (n.style ? 'style="' + n.style + '"' : '') + '>' + l + '<div class="layui-m-layercont">' + n.content + '</div>' + c + '</div></div></div>', !n.type || n.type === 2) {
      const d = t[i](o[0] + n.type),
        y = d.length; y >= 1 && layer.close(d[0].getAttribute('index'));
    }document.body.appendChild(s); const u = e.elem = a('#' + e.id)[0]; n.success && n.success(u), e.index = r++, e.action(n, u);
  }, c.prototype.action = function(e, t) { const n = this; e.time && (l.timer[n.index] = setTimeout(function() { layer.close(n.index); }, 1e3 * e.time)); const a = function() { const t = this.getAttribute('type'); t == 0 ? (e.no && e.no(), layer.close(n.index)) : e.yes ? e.yes(n.index) : layer.close(n.index); }; if (e.btn) for (let s = t[i]('layui-m-layerbtn')[0].children, r = s.length, o = 0; o < r; o++)l.touch(s[o], a); if (e.shade && e.shadeClose) { const c = t[i]('layui-m-layershade')[0]; l.touch(c, function() { layer.close(n.index, e.end); }); }e.end && (l.end[n.index] = e.end); }, e.layer = { v: '2.0', index: r, open(e) { const t = new c(e || {}); return t.index; }, close(e) { const n = a('#' + o[0] + e)[0]; n && (n.innerHTML = '', t.body.removeChild(n), clearTimeout(l.timer[e]), delete l.timer[e], typeof l.end[e] === 'function' && l.end[e](), delete l.end[e]); }, closeAll() { for (let e = t[i](o[0]), n = 0, a = e.length; n < a; n++)layer.close(0 | e[0].getAttribute('index')); } }, typeof define === 'function' ? define(function() { return layer; }) : function() {
    const e = document.scripts,
      n = e[e.length - 1],
      i = n.src,
      a = i.substring(0, i.lastIndexOf('/') + 1); n.getAttribute('merge') || document.head.appendChild(function() { const e = t.createElement('link'); return e.href = a + 'need/layer.css?2.0', e.type = 'text/css', e.rel = 'styleSheet', e.id = 'layermcss', e; }());
  }();
}(window);
