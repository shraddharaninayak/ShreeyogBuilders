const fs = require('fs');

let js = fs.readFileSync('obsidianassembly.com/_nuxt/default.ea02c3da.js', 'utf8');

const oldTarget = 'C(S)?(x(),j(k,{key:0,class:"-h0 -mid-h1 -m-h2 -nl back-home",style:{"--l-delay":"1"},to:"/",string:"split","string-split":"char",onClick:t[5]||(t[5]=l=>_())},{default:A(()=>[...t[19]||(t[19]=[z("Home",-1)])]),_:1})):P("",!0),m(k,{class:"-h0 -mid-h1 -m-h2 -nl places",style:{"--l-delay":"1"},to:"/places",string:"split","string-split":"char",onClick:t[6]||(t[6]=l=>_())},{default:A(()=>[...t[20]||(t[20]=[z("Places",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl objects",style:{"--l-delay":"2"},to:"/objects",string:"split","string-split":"char",onClick:t[7]||(t[7]=l=>_())},{default:A(()=>[...t[21]||(t[21]=[z("Objects",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl about",style:{"--l-delay":"3"},to:"/about",string:"split","string-split":"char",onClick:t[8]||(t[8]=l=>_())},{default:A(()=>[...t[22]||(t[22]=[z("About",-1)])]),_:1}),o("span",{class:"-h0 -mid-h1 -m-h2 -nl contacts",style:{"--l-delay":"4"},string:"split","string-split":"char",onClick:t[9]||(t[9]=l=>_())},"Contacts"),m(k,{class:"-h0 -mid-h1 -m-h2 -nl people",style:{"--l-delay":"5"},to:"/people",string:"split","string-split":"char",onClick:t[10]||(t[10]=l=>_())},{default:A(()=>[...t[23]||(t[23]=[z("People",-1)])]),_:1})';

const newTarget = 'm(k,{class:"-h0 -mid-h1 -m-h2 -nl back-home",style:{"--l-delay":"1"},to:"/",string:"split","string-split":"char",onClick:t[5]||(t[5]=l=>_())},{default:A(()=>[...t[19]||(t[19]=[z("Home",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl about",style:{"--l-delay":"2"},to:"/about",string:"split","string-split":"char",onClick:t[8]||(t[8]=l=>_())},{default:A(()=>[...t[22]||(t[22]=[z("About",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl places",style:{"--l-delay":"3"},to:"/places",string:"split","string-split":"char",onClick:t[6]||(t[6]=l=>_())},{default:A(()=>[...t[20]||(t[20]=[z("Projects",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl people",style:{"--l-delay":"4"},to:"/people",string:"split","string-split":"char",onClick:t[10]||(t[10]=l=>_())},{default:A(()=>[...t[23]||(t[23]=[z("Contact",-1)])]),_:1})';

console.log('Matches oldTarget?', js.includes(oldTarget));
if (js.includes(oldTarget)) {
  js = js.replace(oldTarget, newTarget);
  fs.writeFileSync('obsidianassembly.com/_nuxt/default.ea02c3da.js', js, 'utf8');
  console.log('Successfully updated menu links in default.ea02c3da.js');
}
