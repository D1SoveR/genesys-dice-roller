!function(e){function t(t){for(var n,c,i=t[0],o=t[1],a=t[2],u=0,d=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&d.push(r[c][0]),r[c]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);for(h&&h(t);d.length;)d.shift()();return l.push.apply(l,a||[]),s()}function s(){for(var e,t=0;t<l.length;t++){for(var s=l[t],n=!0,i=1;i<s.length;i++){var o=s[i];0!==r[o]&&(n=!1)}n&&(l.splice(t--,1),e=c(c.s=s[0]))}return e}var n={},r={0:0},l=[];function c(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.m=e,c.c=n,c.d=function(e,t,s){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(s,n,function(t){return e[t]}.bind(null,n));return s},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window.webpackJsonp=window.webpackJsonp||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var a=0;a<i.length;a++)t(i[a]);var h=o;l.push([38,1]),s()}({0:function(e,t){e.exports=React},34:function(e,t){e.exports=ReactDOM},38:function(e,t,s){s(39),e.exports=s(40)},39:function(e,t,s){},40:function(e,t,s){"use strict";s.r(t);var n=s(0),r=s(34),l=s(35);const c=["light","dark",null];const i=new class o extends class e{constructor(e,t){this.subscriptions=new Map;const s=window.localStorage.getItem(e);s&&(t=JSON.parse(s).value),this.name=e,this.store=Object(l.a)(this.reducer.bind(this),{value:t})}reducer(e,t){if("CHANGE"===t.type&&t.value!==e.value){const e={value:t.value};return window.localStorage.setItem(this.name,JSON.stringify(e)),e}return e}on(e){this.subscriptions.set(e,this.store.subscribe(()=>e(this.get())))}off(e){const t=this.subscriptions.get(e);t&&t()}get(){return this.store.getState().value}set(e){this.store.dispatch({type:"CHANGE",value:e})}}{constructor(){super("theme",null)}getClass(){const e=this.get();return e||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}toggle(){const e=(c.indexOf(this.get())+1)%c.length;this.set(c[e])}};var a=s(44),h=s(43);class u{constructor(){this.currentResult=null,this.rollCount=0}}class d extends u{roll(){return this.rollCount++,this.currentResult=this.possibleResults[Math.floor(Math.random()*this.possibleResults.length)],this.currentResult}}class AbilityDie extends d{constructor(){super(...arguments),this.possibleResults=[[],["s"],["s"],["s","s"],["a"],["a"],["s","a"],["a","a"]]}}class ProficiencyDie extends d{constructor(){super(...arguments),this.possibleResults=[[],["s"],["s"],["s","s"],["s","s"],["a"],["s","a"],["s","a"],["s","a"],["a","a"],["a","a"],["t"]]}}class BoostDie extends d{constructor(){super(...arguments),this.possibleResults=[[],[],["s"],["s","a"],["a","a"],["a"]]}}class DifficultyDie extends d{constructor(){super(...arguments),this.possibleResults=[[],["f"],["f","f"],["h"],["h"],["h"],["h","h"],["f","h"]]}}class ChallengeDie extends d{constructor(){super(...arguments),this.possibleResults=[[],["f"],["f"],["f","f"],["f","f"],["h"],["h"],["f","h"],["f","h"],["h","h"],["h","h"],["d"]]}}class SetbackDie extends d{constructor(){super(...arguments),this.possibleResults=[[],[],["f"],["f"],["h"],["h"]]}}var p=s(1);var m=({symbol:e})=>n.createElement("span",{className:"dice-symbol"},Object(p.a)(e)?e.join(""):e);class f extends n.Component{constructor(){super(...arguments),this.dieReference=n.createRef()}render(){let e=Object(h.a)(this.props.die.constructor.name).toLowerCase();return this.props.selected&&(e+=" selected"),n.createElement("div",{ref:this.dieReference,className:e,onClick:this.props.onClick},null===(t=this.props.die.currentResult)?[n.createElement("span",null,"?")]:"number"==typeof t?[n.createElement("span",null,t+"")]:t.map((e,t)=>n.createElement(m,{symbol:e,key:t})));var t}shouldComponentUpdate(e){return this.props.die!==e.die||this.props.selected!==e.selected||this.props.rollCount!==e.rollCount}componentDidUpdate(e){if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&this.props.rollCount!==e.rollCount){const e=this.dieReference.current;e.addEventListener("animationend",this,!1),e.classList.contains("shake")&&(e.classList.remove("shake"),e.getBoundingClientRect()),e.classList.add("shake")}}handleEvent(e){if("animationend"===e.type){const e=this.dieReference.current;e.removeEventListener("animationend",this,!1),e.classList.remove("shake")}}}const b=[{cls:AbilityDie,result:["s"]},{cls:ProficiencyDie,result:["t"]},{cls:BoostDie,result:["a"]},{cls:DifficultyDie,result:["f"]},{cls:ChallengeDie,result:["d"]},{cls:SetbackDie,result:["h"]},{cls:class PercentileDie extends u{roll(){return this.rollCount++,this.currentResult=Math.ceil(100*Math.random()),this.currentResult}},result:42}];class g extends n.PureComponent{render(){const e=b.map(({cls:e,result:t},s)=>{const r=Object(h.a)(e.name).split(" ")[0].toLowerCase();return n.createElement("button",{type:"button",id:"add-"+r,key:s,onClick:()=>this.props.callback(new e)},n.createElement(f,{die:Object.assign(new e,{currentResult:t})}))});return n.createElement("div",{className:"dice-controls"},e)}}class v extends n.Component{render(){const e=this.props.dice.map(e=>{const t=this.props.selectCallback?()=>this.props.selectCallback(e):void 0;return n.createElement(f,{die:e,selected:this.props.selected.includes(e),rollCount:e.rollCount,onClick:t})});return n.createElement("div",{className:"dice-list"},e)}}var y=s(41),C=s(42);const E=Object.freeze({t:0,s:1,a:2,d:3,f:4,h:5});function w(e,t){return E[e]-E[t]}function O(e){return e instanceof ProficiencyDie?0:e instanceof AbilityDie?1:e instanceof BoostDie?2:e instanceof ChallengeDie?3:e instanceof DifficultyDie?4:e instanceof SetbackDie?5:6}function k(e,t){return O(e)-O(t)}var x=({results:e})=>{let t="neutral";const s=[],r=[],l=[];if(e.forEach(e=>{"number"==typeof e?r.push(e):Object(p.a)(e)&&s.push(e)}),s.length){const e=function(e){const t=Object(C.a)(e);delete t.t,delete t.d,t.s=t.f=Math.min(t.s,t.f),t.a=t.h=Math.min(t.a,t.h);const s=[];return e.forEach(e=>{t[e]?t[e]--:s.push(e)}),s}(Object(y.a)(s)).sort(w);t=function(e){const t=Object(C.a)(e),s=(t.t||0)+(t.s||0),n=(t.d||0)+(t.f||0);return console.warn("COUNT: ",t),s-n>0?"success":"failure"}(e),e.length&&l.push(n.createElement("div",{className:"group symbolic "+(e.length>8?"large":"")},e.map(e=>n.createElement(m,{symbol:e}))))}return l.push(...r.map(e=>n.createElement("div",{className:"group numeric"},e))),n.createElement("div",{className:"roll-results "+t},l)};Object.freeze(["ability","proficiency","boost","difficulty","challenge","setback"]);class j extends n.Component{constructor(e){super(e),this.state={dice:[],selected:[],results:[]},this.addDie=this.addDie.bind(this),this.clearDice=this.clearDice.bind(this),this.toggleSelection=this.toggleSelection.bind(this),this.roll=this.roll.bind(this)}addDie(e){const{dice:t}=this.state;this.setState(Object.assign(Object.assign({},this.state),{dice:t.concat([e]).sort(k)}))}clearDice(){const{dice:e,selected:t}=this.state;if(t.length){const s=Object(a.a)(e,t);this.setState({dice:s,selected:[],results:s.map(e=>e.currentResult)})}else this.setState({dice:[],selected:[],results:[]})}toggleSelection(e){const{selected:t}=this.state;t.includes(e)?this.setState(Object.assign(Object.assign({},this.state),{selected:t.filter(t=>t!==e)})):this.setState(Object.assign(Object.assign({},this.state),{selected:t.concat([e])}))}roll(){const{dice:e,selected:t}=this.state;t.length?(t.forEach(e=>e.roll()),this.setState({dice:e,selected:[],results:e.map(e=>e.currentResult)})):this.setState(Object.assign(Object.assign({},this.state),{results:this.state.dice.map(e=>e.roll())}))}render(){return n.createElement("div",{className:"dice-area"},n.createElement(g,{callback:this.addDie}),n.createElement(v,{dice:this.state.dice,selected:this.state.selected,selectCallback:this.toggleSelection}),n.createElement("div",{className:"actions"},n.createElement("button",{id:"roll",onClick:this.roll},this.state.selected.length?"Re-roll Selected":"Roll"),n.createElement("button",{id:"clear",onClick:this.clearDice},this.state.selected.length?"Remove Selected":"Clear")),n.createElement(x,{results:this.state.results}))}}class R extends n.PureComponent{constructor(e){super(e),this.state={expanded:!1},this.handleClick=this.handleClick.bind(this)}handleClick(){const e=!this.state.expanded;this.setState({expanded:e}),this.props.toggleCallback&&this.props.toggleCallback(e)}render(){const e=[2,5,8].map(e=>n.createElement("line",{x1:"1.5",y1:e,x2:"8.5",y2:e}));return n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 10 10",className:"nav-button "+(this.state.expanded?"expanded":""),style:{strokeWidth:1.5,strokeLinecap:"round"},onClick:this.handleClick},e)}}class S extends n.Component{constructor(e){super(e),this.switchTheme=this.switchTheme.bind(this)}switchTheme(){document.body.classList.remove("light","dark"),document.body.classList.add(this.props.themeSettings.getClass())}componentDidMount(){this.props.themeSettings.on(this.switchTheme),this.switchTheme()}componentWillUnmount(){this.props.themeSettings.off(this.switchTheme)}render(){return n.createElement(n.Fragment,null,n.createElement(R,null),n.createElement("h1",{onClick:()=>this.props.themeSettings.toggle()},n.createElement("span",{className:"logo"},"Genesys")," Dice Roller"),n.createElement(j,null))}}document.body.classList.remove("no-js"),r.render(n.createElement(S,{themeSettings:i}),document.getElementById("app"))}});