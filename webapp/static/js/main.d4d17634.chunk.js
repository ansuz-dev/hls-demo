(this["webpackJsonphls-webapp"]=this["webpackJsonphls-webapp"]||[]).push([[0],{107:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(64),s=n.n(r),i=(n(82),n(145)),l=n(44),u=n(130),o=n(25),d=n.n(o),j=n(31),b=n(15),p=n(137),h=n(136),O=n(134),x=n(126),f=n(128),m=n(138),v=n(133),g=n(140),w=n(141),k=n(127),y=n(129),C=n(34),S=n.n(C);S.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",S.a.defaults.baseURL="http://localhost:3000/api/v1/";var R=function(){var e=Object(j.a)(d.a.mark((function e(t){var n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{"Content-Type":"application/x-www-form-urlencoded"}},(a=new FormData).append("file",t),e.next=6,S.a.post("media",a,n);case 6:return e.abrupt("return",!0);case 9:return e.prev=9,e.t0=e.catch(0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(j.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.a.get("media/list");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",[]);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),z=n(1),E=function(){var e=Object(a.useRef)(),t=Object(a.useState)(null),n=Object(b.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(null),i=Object(b.a)(s,2),o=i[0],C=i[1],S=Object(a.useState)(!1),T=Object(b.a)(S,2),E=T[0],F=T[1],H=Object(a.useCallback)((function(){e.current.click()}),[]),L=Object(a.useCallback)((function(e){e.target.files&&e.target.files.length&&(r(e.target.files[0]),C(null))}),[]),M=Object(a.useCallback)((function(){r(null)}),[]),P=Object(a.useCallback)(Object(j.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return F(!0),e.next=3,R(c);case 3:t=e.sent,F(!1),C(t?"success":"error");case 6:case"end":return e.stop()}}),e)}))),[c]);return Object(z.jsxs)(p.a,{sx:{p:2,border:"1px solid lightgrey",borderRadius:2},children:[Object(z.jsx)(l.a,{variant:"h5",sx:{mb:2},children:"Upload media file"}),c&&Object(z.jsx)(h.a,{container:!0,sx:{mt:2},children:Object(z.jsxs)(h.a,{item:!0,xs:12,md:6,children:[Object(z.jsxs)(O.a,{disableRipple:!0,disableTouchRipple:!0,children:[Object(z.jsx)(x.a,{children:Object(z.jsx)(k.a,{fontSize:"small"})}),Object(z.jsx)(f.a,{children:c.name}),Object(z.jsx)(m.a,{color:"error",disabled:E,onClick:M,children:Object(z.jsx)(y.a,{})})]}),o&&Object(z.jsxs)(v.a,{security:o,sx:{mt:2},children:["success"===o&&"Video is ready for streaming !","error"===o&&"There's an error while uploading the video !"]})]})}),Object(z.jsxs)(u.a,{spacing:2,direction:"row",sx:{mt:2},children:[Object(z.jsxs)(g.a,{disableElevation:!0,size:"small",variant:"contained",disabled:E,onClick:H,children:["Choose media file",Object(z.jsx)("input",{ref:e,type:"file",accept:"video/*",hidden:!0,onChange:L})]}),Object(z.jsxs)(g.a,{disableElevation:!0,disabled:!c||E,size:"small",variant:"contained",onClick:P,children:[!E&&"Upload",E&&Object(z.jsx)(w.a,{size:20})]})]})]})},F=n(142),H=n(143),L=n(144),M=n(131),P=function(e){var t=e.onMediaSelect,n=Object(a.useState)([]),c=Object(b.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){T().then((function(e){return s(e)}))}),[]),Object(z.jsx)(h.a,{container:!0,direction:"row",spacing:2,children:r.map((function(e){return Object(z.jsx)(h.a,{item:!0,xs:6,sm:4,md:3,lg:2,children:Object(z.jsxs)(F.a,{children:[Object(z.jsx)(H.a,{component:"img",image:e.thumbnail,alt:e.name}),Object(z.jsx)(L.a,{sx:{justifyContent:"center"},children:Object(z.jsx)(g.a,{size:"small",startIcon:Object(z.jsx)(M.a,{}),onClick:function(){t(e)},children:"Play"})})]})},e.name)}))})},I=function(e){var t=e.media,n=Object(a.useRef)();return Object(a.useEffect)((function(){if(t)if(n.current.canPlayType("application/vnd.apple.mpegurl"))n.current.src=t.media,n.current.play();else if(window.Hls&&window.Hls.isSupported()){var e=new window.Hls;e.loadSource(t.media),e.attachMedia(n.current),n.current.play()}}),[t]),t?Object(z.jsx)("div",{children:Object(z.jsx)("video",{ref:n,width:"100%",controls:!0,children:Object(z.jsx)("track",{kind:"captions"})})}):null};I.defaultProps={media:null};var U=I,q=function(){var e=Object(a.useState)(null),t=Object(b.a)(e,2),n=t[0],c=t[1],r=Object(a.useCallback)((function(e){c(e)}),[]);return Object(z.jsxs)(p.a,{sx:{p:2,border:"1px solid lightgrey",borderRadius:2},children:[Object(z.jsx)(l.a,{variant:"h5",sx:{mb:2},children:"Streaming videos"}),Object(z.jsxs)(u.a,{spacing:2,children:[Object(z.jsx)(P,{onMediaSelect:r}),Object(z.jsx)(U,{media:n})]})]})},B=function(){return Object(z.jsxs)(i.a,{sx:{mb:8},children:[Object(z.jsx)(l.a,{variant:"h4",sx:{my:4},children:"HLS demo"}),Object(z.jsxs)(u.a,{spacing:2,children:[Object(z.jsx)(E,{}),Object(z.jsx)(q,{})]})]})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,146)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(z.jsx)(c.a.StrictMode,{children:Object(z.jsx)(B,{})}),document.getElementById("root")),D()},82:function(e,t,n){}},[[107,1,2]]]);
//# sourceMappingURL=main.d4d17634.chunk.js.map