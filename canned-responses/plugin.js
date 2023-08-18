(()=>{var B=Object.create;var f=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty;var T=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),D=(e,t)=>{for(var n in t)f(e,n,{get:t[n],enumerable:!0})},C=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of z(t))!R.call(e,c)&&c!==n&&f(e,c,{get:()=>t[c],enumerable:!(r=P(t,c))||r.enumerable});return e};var g=(e,t,n)=>(n=e!=null?B(I(e)):{},C(t||!e||!e.__esModule?f(n,"default",{value:e,enumerable:!0}):n,e)),O=e=>C(f({},"__esModule",{value:!0}),e);var v=T((ce,b)=>{b.exports=shelter.solidWeb});var de={};D(de,{onLoad:()=>ie,onUnload:()=>le});var m=g(v(),1),y=g(v(),1),$=g(v(),1),w=g(v(),1),p=g(v(),1),d=g(v(),1),A=(0,m.template)('<div class="pr-2"><div class="add-response"></div></div>',4),L=(0,m.template)('<div class="buttons-container"></div>',2),U=(0,m.template)('<div class="response"><div class="header"><div class="buttons"></div></div></div>',6),j=(0,m.template)('<div class="send-popout"><div class="header"><h3>Canned Responses</h3></div><div class="body"></div></div>',8),q=(0,m.template)("<div></div>",2),F=(0,m.template)('<div class="no-responses"><h4>No canned responses</h4><p>Click the "Manage" button to add some.</p></div>',6),J=(0,m.template)('<div id="canned-responses"><button><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22" fill="currentColor"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"></path></svg></div></button></div>',10),{observeDom:H,ui:{injectCss:W,Button:h,openModal:Y,ModalRoot:G,ModalHeader:K,ModalBody:Q,ModalFooter:V,ModalSizes:X,ButtonColors:M,ButtonSizes:N,TextArea:Z,TextBox:ee,niceScrollbarsClass:te,showToast:ne},plugin:{store:o},util:{getFiber:se}}=shelter;o.responses||(o.responses=[]);var k=null,oe=()=>(0,d.createComponent)(G,{get size(){return X.MEDIUM},get children(){return[(0,d.createComponent)(K,{close:()=>k(),children:"Canned Responses"}),(0,d.createComponent)(Q,{get children(){let e=A.cloneNode(!0),t=e.firstChild;return(0,p.insert)(t,(0,d.createComponent)(h,{onClick:()=>{o.responses.push({id:Math.random().toString(36).substring(7),name:"New Response",content:""})},grow:!0,style:{width:"100%"},children:"Add Response"})),(0,p.insert)(e,()=>o.responses.map(n=>(()=>{let r=U.cloneNode(!0),c=r.firstChild,a=c.firstChild;return(0,p.insert)(c,(0,d.createComponent)(ee,{get value(){return n.name},placeholder:"Response name",onInput:s=>{let i=o.responses.findIndex(({id:l})=>l===n.id);o.responses[i].name=s}}),a),(0,p.insert)(a,(0,d.createComponent)(h,{get color(){return M.RED},get size(){return N.MEDIUM},onClick:()=>{o.responses.splice(o.responses.findIndex(({id:s})=>s===n.id),1),o.responses=[...o.responses]},children:"Delete"})),(0,p.insert)(r,(0,d.createComponent)(Z,{get value(){return n.content},placeholder:"Message content",onInput:s=>{let i=o.responses.findIndex(({id:l})=>l===n.id);o.responses[i].content=s}}),null),r})()),null),e}}),(0,d.createComponent)(V,{get children(){let e=L.cloneNode(!0);return(0,p.insert)(e,(0,d.createComponent)(h,{onClick:()=>{navigator.clipboard.writeText(JSON.stringify(o.responses)),ne({title:"Exported",content:"Canned responses copied to clipboard",duration:3e3})},grow:!0,children:"Export"}),null),(0,p.insert)(e,(0,d.createComponent)(h,{onClick:async()=>{let t=await navigator.clipboard.readText();o.responses=JSON.parse(t)},grow:!0,children:"Import"}),null),e}})]}}),re=e=>{let t=document.querySelector('[class*="slateContainer-"]');se(t).child.pendingProps.editor.insertText(e)},u=null,S=null,_=()=>{if(u){u.remove(),u=null;return}let e=S.getBoundingClientRect();u=document.body.appendChild((()=>{let n=j.cloneNode(!0),r=n.firstChild,c=r.firstChild,a=r.nextSibling;return n.style.setProperty("width","300px"),(0,p.insert)(r,(0,d.createComponent)(h,{onClick:()=>{_(),k=Y(s=>oe())},children:"Manage"}),null),(0,p.insert)(a,(()=>{let s=(0,w.memo)(()=>o.responses.length>0);return()=>s()?(()=>{let i=q.cloneNode(!0);return i.style.setProperty("display","grid"),i.style.setProperty("gap",".5rem"),(0,p.insert)(i,()=>o.responses.map(l=>(0,d.createComponent)(h,{get size(){return N.MEDIUM},get color(){return M.SECONDARY},style:{width:"100%"},grow:!0,onClick:()=>{console.log(l.content),re(l.content),_()},get children(){return l.name}}))),(0,$.effect)(()=>i.className=`${te()} send-responses`),i})():F.cloneNode(!0)})()),(0,$.effect)(s=>{let i=`${e.top+(e.height+18)}px`,l=`${e.left+e.width/2}px`,x=`translate(-50%, calc(-100% - ${e.height+18}px))`;return i!==s._v$&&n.style.setProperty("top",s._v$=i),l!==s._v$2&&n.style.setProperty("left",s._v$2=l),x!==s._v$3&&n.style.setProperty("transform",s._v$3=x),s},{_v$:void 0,_v$2:void 0,_v$3:void 0}),n})());let t=n=>{u?.contains(n.target)||(u?.remove(),u=null,document.removeEventListener("click",t))};document.addEventListener("click",t)},E=null;function ie(){W(`
.buttons-container {
  display: flex;
  gap: .5rem;
}

  .send-responses {
    max-height: 200px;
    overflow-y: auto;
  }
.response .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .25rem;
}

.response {
  margin-bottom: .5rem;
}

.add-response {
  margin-bottom: .75rem;
}

.send-popout {
	  background: var(--modal-background);
	color: var(--text-normal);
	border-radius: 4px;
	padding: var(--spacing-16);
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 1000;
	box-shadow: var(--elevation-stroke),var(--elevation-high);
}

.send-popout .header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.send-popout .header h3 {
	font-size: 1.1rem;
	font-weight: 600;
}

.send-popout .body {
	margin-top: var(--spacing-16);
}

.no-responses {
	text-align: center;
}

.no-responses h4 {
	font-size: 1.06rem;
	font-weight: 600;
}

.no-responses p {
	margin-top: 0;
	color: var(--text-muted);
}

.pr-2 {
  padding-right: .5rem;
}
`),E=H('[class^="channelTextArea"] [class^="buttons"]',e=>{if(document.querySelector("#canned-responses"))return;let t=e.lastChild.previousSibling;S=e.insertBefore((()=>{let n=J.cloneNode(!0),r=n.firstChild,c=r.firstChild;return r.$$click=_,(0,$.effect)(a=>{let s=t.className,i=t.firstChild.className,l=t.firstChild.firstChild.className;return s!==a._v$4&&(n.className=a._v$4=s),i!==a._v$5&&(r.className=a._v$5=i),l!==a._v$6&&(c.className=a._v$6=l),a},{_v$4:void 0,_v$5:void 0,_v$6:void 0}),n})(),e.firstChild)})}function le(){E(),u?.remove()}(0,y.delegateEvents)(["click"]);return O(de);})();
