(()=>{var S=Object.create;var h=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var R=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var D=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),T=(e,n)=>{for(var t in n)h(e,t,{get:n[t],enumerable:!0})},x=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of E(n))!I.call(e,a)&&a!==t&&h(e,a,{get:()=>n[a],enumerable:!(o=z(n,a))||o.enumerable});return e};var g=(e,n,t)=>(t=e!=null?S(R(e)):{},x(n||!e||!e.__esModule?h(t,"default",{value:e,enumerable:!0}):t,e)),A=e=>x(h({},"__esModule",{value:!0}),e);var m=D((ie,b)=>{b.exports=shelter.solidWeb});var re={};T(re,{onLoad:()=>se,onUnload:()=>oe});var v=g(m(),1),y=g(m(),1),f=g(m(),1),M=g(m(),1),p=g(m(),1),c=g(m(),1),L=(0,v.template)('<div class="pr-2"><div class="add-response"></div></div>',4),U=(0,v.template)('<div class="response"><div class="header"><div class="buttons"></div></div></div>',6),j=(0,v.template)('<div class="send-popout"><div class="header"><h3>Canned Responses</h3></div><div class="body"></div></div>',8),O=(0,v.template)("<div></div>",2),q=(0,v.template)('<div class="no-responses"><h4>No canned responses</h4><p>Click the "Manage" button to add some.</p></div>',6),F=(0,v.template)('<div id="canned-responses"><button><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22" fill="currentColor"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"></path></svg></div></button></div>',10),{observeDom:H,ui:{injectCss:W,Button:$,openModal:Y,ModalRoot:G,ModalHeader:J,ModalBody:K,ModalFooter:de,ModalSizes:Q,ButtonColors:w,ButtonSizes:N,TextArea:V,TextBox:X,niceScrollbarsClass:Z},plugin:{store:l},util:{getFiber:ee}}=shelter;l.responses||(l.responses=[]);var k=null,te=()=>(0,c.createComponent)(G,{get size(){return Q.MEDIUM},get children(){return[(0,c.createComponent)(J,{close:()=>k(),children:"Canned Responses"}),(0,c.createComponent)(K,{get children(){let e=L.cloneNode(!0),n=e.firstChild;return(0,p.insert)(n,(0,c.createComponent)($,{onClick:()=>{l.responses.push({id:Math.random().toString(36).substring(7),name:"New Response",content:""})},grow:!0,style:{width:"100%"},children:"Add Response"})),(0,p.insert)(e,()=>l.responses.map(t=>(()=>{let o=U.cloneNode(!0),a=o.firstChild,d=a.firstChild;return(0,p.insert)(a,(0,c.createComponent)(X,{get value(){return t.name},placeholder:"Response name",onInput:s=>{let r=l.responses.findIndex(({id:i})=>i===t.id);l.responses[r].name=s}}),d),(0,p.insert)(d,(0,c.createComponent)($,{get color(){return w.RED},get size(){return N.MEDIUM},onClick:()=>{l.responses.splice(l.responses.findIndex(({id:s})=>s===t.id),1),l.responses=[...l.responses]},children:"Delete"})),(0,p.insert)(o,(0,c.createComponent)(V,{get value(){return t.content},placeholder:"Message content",onInput:s=>{let r=l.responses.findIndex(({id:i})=>i===t.id);l.responses[r].content=s}}),null),o})()),null),e}})]}}),ne=e=>{let n=document.querySelector('[class*="slateContainer-"]');ee(n).child.pendingProps.editor.insertText(e)},u=null,B=null,_=()=>{if(u){u.remove(),u=null;return}let e=B.getBoundingClientRect();u=document.body.appendChild((()=>{let t=j.cloneNode(!0),o=t.firstChild,a=o.firstChild,d=o.nextSibling;return t.style.setProperty("width","300px"),(0,p.insert)(o,(0,c.createComponent)($,{onClick:()=>{_(),k=Y(s=>te())},children:"Manage"}),null),(0,p.insert)(d,(()=>{let s=(0,M.memo)(()=>l.responses.length>0);return()=>s()?(()=>{let r=O.cloneNode(!0);return r.style.setProperty("display","grid"),r.style.setProperty("gap",".5rem"),(0,p.insert)(r,()=>l.responses.map(i=>(0,c.createComponent)($,{get size(){return N.MEDIUM},get color(){return w.SECONDARY},style:{width:"100%"},grow:!0,onClick:()=>{console.log(i.content),ne(i.content),_()},get children(){return i.name}}))),(0,f.effect)(()=>r.className=`${Z()} send-responses`),r})():q.cloneNode(!0)})()),(0,f.effect)(s=>{let r=`${e.top+(e.height+18)}px`,i=`${e.left+e.width/2}px`,C=`translate(-50%, calc(-100% - ${e.height+18}px))`;return r!==s._v$&&t.style.setProperty("top",s._v$=r),i!==s._v$2&&t.style.setProperty("left",s._v$2=i),C!==s._v$3&&t.style.setProperty("transform",s._v$3=C),s},{_v$:void 0,_v$2:void 0,_v$3:void 0}),t})());let n=t=>{u?.contains(t.target)||(u?.remove(),u=null,document.removeEventListener("click",n))};document.addEventListener("click",n)},P=null;function se(){W(`
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
`),P=H('[class^="channelTextArea"] [class^="buttons"]',e=>{if(document.querySelector("#canned-responses"))return;let n=e.lastChild.previousSibling;B=e.insertBefore((()=>{let t=F.cloneNode(!0),o=t.firstChild,a=o.firstChild;return o.$$click=_,(0,f.effect)(d=>{let s=n.className,r=n.firstChild.className,i=n.firstChild.firstChild.className;return s!==d._v$4&&(t.className=d._v$4=s),r!==d._v$5&&(o.className=d._v$5=r),i!==d._v$6&&(a.className=d._v$6=i),d},{_v$4:void 0,_v$5:void 0,_v$6:void 0}),t})(),e.firstChild)})}function oe(){P(),u?.remove()}(0,y.delegateEvents)(["click"]);return A(re);})();
