if(!window.DIATONIC){window.DIATONIC={}}if(!window.DIATONIC.map){window.DIATONIC.map={}}DIATONIC.map.AccordionMap=function(b,a){this.id=b.id;this.menuOrder=b.menuOrder;this.model=b.model;this.tuning=b.tuning;this.buttons=b.buttons;this.image=b.image||"img/accordion.default.gif";this.keyboard=new DIATONIC.map.Keyboard(b.keyboard,b.pedal);this.songPathList=b.songPathList;this.practicePathList=b.practicePathList;this.chordPathList=b.chordPathList;this.localResource=a||false;this.songs={items:{},sortedIndex:[]};this.practices={items:{},sortedIndex:[]};this.chords={items:{},sortedIndex:[]};if(!this.localResource){this.songs=this.loadABCX(this.songPathList);this.chords=this.loadABCX(this.chordPathList);this.practices=this.loadABCX(this.practicePathList)}};DIATONIC.map.AccordionMap.prototype.getId=function(){return this.id};DIATONIC.map.AccordionMap.prototype.getFullName=function(){return this.getTxtModel()+" "+this.getTxtTuning()+" - "+this.getTxtNumButtons()};DIATONIC.map.AccordionMap.prototype.getTxtModel=function(){return this.model};DIATONIC.map.AccordionMap.prototype.getTxtNumButtons=function(){var b=this.buttons;var e="";for(var d=b.length-1;d>0;d--){e="/"+b[d]+e}return b[0]+e};DIATONIC.map.AccordionMap.prototype.getTxtTuning=function(){var b=this.tuning;var e="";for(var d=b.length-1;d>0;d--){e="/"+b[d]+e}return b[0]+e};DIATONIC.map.AccordionMap.prototype.getPathToImage=function(){return this.image};DIATONIC.map.AccordionMap.prototype.getChord=function(a){return this.chords.items[a]};DIATONIC.map.AccordionMap.prototype.setChord=function(a,b,c){this.chords.items[a]=b;if(c){this.chords.sortedIndex.push(a)}};DIATONIC.map.AccordionMap.prototype.getSong=function(a){return this.songs.items[a]};DIATONIC.map.AccordionMap.prototype.setSong=function(a,b,c){this.songs.items[a]=b;if(c){this.songs.sortedIndex.push(a)}};DIATONIC.map.AccordionMap.prototype.getPractice=function(a){return this.practices.items[a]};DIATONIC.map.AccordionMap.prototype.setPractice=function(a,b,c){this.practices.items[a]=b;if(c){this.practices.sortedIndex.push(a)}};DIATONIC.map.AccordionMap.prototype.getFirstSong=function(){var a=this.songs.sortedIndex[0]||"";return a};DIATONIC.map.AccordionMap.prototype.getFirstPractice=function(){var a=this.practices.sortedIndex[0]||"";return a};DIATONIC.map.AccordionMap.prototype.getFirstChord=function(){var a=this.chords.sortedIndex[0]||"";return a};DIATONIC.map.AccordionMap.prototype.loadABCX=function(f,a){var d=0;var e;var c={items:{},sortedIndex:[]};for(var b=0;b<f.length;b++){d++;FILEMANAGER.register("ABCX");e=f[b];$.get(e).done(function(h){FILEMANAGER.deregister("ABCX",true);var i=new ABCXJS.TuneBook(h);for(var g=0;g<i.tunes.length;g++){c.items[i.tunes[g].title]=i.tunes[g].abc;c.sortedIndex.push(i.tunes[g].title)}}).fail(function(i,j,g){FILEMANAGER.deregister("ABCX",false);var h=j+", "+g;console.log("ABCX Load Failed:\nLoading: "+i.responseText.substr(1,40)+"...\nError:\n "+h)}).always(function(){d--;if(d===0){c.sortedIndex.sort();if(a){a()}}})}return c};if(!window.DIATONIC){window.DIATONIC={}}if(!window.DIATONIC.map){window.DIATONIC.map={}}DIATONIC.map.Button=function(a,d,b){var c=b||{};this.x=a;this.y=d;this.openNote=null;this.closeNote=null;this.tabButton=null;this.SVG={gid:0};this.openColor=c.openColor||"#00ff00";this.closeColor=c.closeColor||"#00b2ee";this.radius=c.radius||26;this.kls=c.kls||"button"};DIATONIC.map.Button.prototype.draw=function(f,e,d,c){var b,a;if(c.transpose){b=this.y;a=c.mirror?this.x:d.maxX-this.radius*2-(this.x-d.minX)}else{b=c.mirror?d.maxX-this.radius*2-(this.x-d.minX):this.x;a=this.y}this.SVG.gid=e.printButton(f,b,a,this.radius,this.kls)};DIATONIC.map.Button.prototype.clear=function(a){if(!this.SVG.button){return}var b=this;if(a){window.setTimeout(function(){b.clear()},a*1000);return}this.SVG.closeArc.style.setProperty("fill","none");this.SVG.openArc.style.setProperty("fill","none")};DIATONIC.map.Button.prototype.setOpen=function(a){if(!this.SVG.button){return}var b=this;if(a){window.setTimeout(function(){b.setOpen()},a*1000);return}this.SVG.openArc.style.setProperty("fill",this.openColor)};DIATONIC.map.Button.prototype.setClose=function(a){if(!this.SVG.button){return}var b=this;if(a){window.setTimeout(function(){b.setClose()},a*1000);return}this.SVG.closeArc.style.setProperty("fill",this.closeColor)};DIATONIC.map.Button.prototype.setSVG=function(c,d,e){var a=this.SVG;this.SVG.button=document.getElementById(a.gid);this.SVG.openArc=document.getElementById(a.gid+"_ao");this.SVG.openText=document.getElementById(a.gid+"_to");this.SVG.closeArc=document.getElementById(a.gid+"_ac");this.SVG.closeText=document.getElementById(a.gid+"_tc");this.setText(c,d,e)};DIATONIC.map.Button.prototype.setText=function(a,b,c){if(this.SVG.openText){this.SVG.openText.textContent=b?b:this.getLabel(this.openNote,a);this.SVG.closeText.textContent=c?c:this.getLabel(this.closeNote,a)}};DIATONIC.map.Button.prototype.getLabel=function(c,b){var a="";if(b){a=DIATONIC.map.number2key_br[c.value]}else{a=DIATONIC.map.number2key[c.value]}if(b){a=a.toUpperCase()+""}if(c.isChord){a=a.toLowerCase()+""}if(c.isMinor){a+="-"}return a};if(!window.DIATONIC){window.DIATONIC={}}if(!window.DIATONIC.map){window.DIATONIC.map={}}DIATONIC.map.accordionMaps=[];DIATONIC.map.key2number={C:0,"C♯":1,"D♭":1,D:2,"D♯":3,"E♭":3,E:4,F:5,"F♯":6,"G♭":6,G:7,"G♯":8,"A♭":8,A:9,"A♯":10,"B♭":10,B:11};DIATONIC.map.number2key=["C","C♯","D","E♭","E","F","F♯","G","G♯","A","B♭","B"];DIATONIC.map.number2key_br=["Dó","Dó♯","Ré","Mi♭","Mi","Fá","Fá♯","Sol","Sol♯","Lá","Si♭","Si"];DIATONIC.map.loadAccordionMaps=function(c,a){var b=0;for(var d=0;d<c.length;d++){b++;FILEMANAGER.register("MAP");$.getJSON(c[d],{format:"json"}).done(function(e){FILEMANAGER.deregister("MAP",true);DIATONIC.map.accordionMaps.push(new DIATONIC.map.AccordionMap(e))}).fail(function(g,h,e){FILEMANAGER.deregister("MAP",false);var f=h+", "+e;console.log("Accordion Load Failed:\nLoading: "+g.responseText.substr(1,40)+"...\nError:\n "+f)}).always(function(){b--;if(b===0&&a){a()}})}};if(!window.DIATONIC){window.DIATONIC={}}if(!window.DIATONIC.map){window.DIATONIC.map={}}DIATONIC.map.Keyboard=function(b,a){this.pedalInfo=a;this.layout=b.layout;this.keys=b.keys;this.basses=b.basses;this.noteToButtonsOpen={};this.noteToButtonsClose={};this.legenda={};this.baseLine={};this.limits={minX:10000,minY:10000,maxX:0,maxY:0};this.radius=26;this.size=this.radius*2;this.setup(b)};DIATONIC.map.Keyboard.prototype.setup=function(n){var r,p,e;var q=n.keys.open.length;var o=n.basses.open.length;this.keyMap=new Array();this.modifiedItems=new Array();var a=0;for(g=0;g<q;g++){this.keyMap[g]=new Array(n.keys.open[g].length);a=Math.max(n.keys.open[g].length,a)}var k=n.basses.open[0].length;for(g=q;g<q+o;g++){this.keyMap[g]=new Array(n.basses.open[g-q].length)}this.width=(q+o+1)*(this.size);this.height=(a)*(this.size);var d=(a-(k/2))/2*this.size;var c,m,l,h;for(var f=0;f<this.keyMap.length;f++){if(f<q){r=(f+0.5)*(this.size);e=this.getLayout(f)*this.size;c=n.keys.open[f];m=n.keys.close[f];
l=false}else{r=(f+1.5)*(this.size);e=d;c=n.basses.open[f-q];m=n.basses.close[f-q];l=true}for(var g=0;g<this.keyMap[f].length;g++){p=e+(g+0.5)*this.size;this.limits.minX=Math.min(this.limits.minX,r);this.limits.minY=Math.min(this.limits.minY,p);this.limits.maxX=Math.max(this.limits.maxX,r);this.limits.maxY=Math.max(this.limits.maxY,p);var b=new DIATONIC.map.Button(r-this.radius,p-this.radius,{kls:this.isPedal(g,f)?"bpedal":"button"});b.tabButton=(g+1)+Array(f+1).join("'");b.openNote=this.parseNote(c[g],l);b.closeNote=this.parseNote(m[g],l);h=this.getNoteVal(b.openNote);if(!this.noteToButtonsOpen[h]){this.noteToButtonsOpen[h]=[]}this.noteToButtonsOpen[h].push(b.tabButton);h=this.getNoteVal(b.closeNote);if(!this.noteToButtonsClose[h]){this.noteToButtonsClose[h]=[]}this.noteToButtonsClose[h].push(b.tabButton);this.keyMap[f][g]=b}}r=(q+0.5)*(this.size);p=d-0.5*this.size;this.baseLine={x:r,yi:p,yf:p+5*this.size};var s=36;this.legenda=new DIATONIC.map.Button(this.limits.maxX-(s+this.radius),this.limits.minY+(s),{radius:36,kls:"blegenda"})};DIATONIC.map.Keyboard.prototype.getButtons=function(b){var a=this.getNoteVal(b);return{open:this.noteToButtonsOpen[a],close:this.noteToButtonsClose[a]}};DIATONIC.map.Keyboard.prototype.getNoteVal=function(a){return DIATONIC.map.key2number[a.key.toUpperCase()]+(a.isBass?(a.isChord?-12:0):a.octave*12)};DIATONIC.map.Keyboard.prototype.print=function(h,c){var g;c=c||{};c.fillColor=c.fillColor||"none";c.backgroundColor=c.backgroundColor||"none";c.openColor=c.openColor||"#00ff00";c.closeColor=c.closeColor||"#00b2ee";c.scale=c.scale||1;c.mirror=c.mirror||false;c.transpose=c.transpose||false;c.label=c.label||false;var f="   .bpedal,\n   .blegenda,\n    .button {\n        font-family: serif;\n        text-anchor: middle;\n        font-size: 16px;\n        font-weight: bold;\n    }\n    .normal {\n        fill: none;\n        stroke: black;\n        stroke-width: 1px;\n    }\n    .pedal {\n        fill: none;\n        stroke: red;\n        stroke-width: 2px;\n    }\n    .bopen {\n        fill: "+c.openColor+";\n    }\n    .bclose {\n        fill: "+c.closeColor+";\n    }\n    .nofill {\n        fill: none;\n    }\n    .blegenda {\n        font-weight: normal;\n        font-size: 13px;\n    }";this.paper=new SVG.Printer(h);this.paper.initDoc("keyb","Diatonic Map Keyboard",f,c);this.paper.initPage(c.scale);this.legenda.draw("l00",this.paper,this.limits,c);if(c.transpose){g={w:this.height,h:this.width};var e=c.mirror?this.baseLine.x:this.limits.maxX-(this.baseLine.x-this.limits.minX);for(var a=e-10;a<=e+10;a+=10){this.drawLine(this.baseLine.yi,a,this.baseLine.yf,a)}}else{g={w:this.width,h:this.height};var e=c.mirror?this.limits.maxX-(this.baseLine.x-this.limits.minX):this.baseLine.x;for(var a=e-10;a<=e+10;a+=10){this.drawLine(a,this.baseLine.yi,a,this.baseLine.yf)}}for(var b=0;b<this.keyMap.length;b++){for(var d=0;d<this.keyMap[b].length;d++){this.keyMap[b][d].draw("b"+b+d,this.paper,this.limits,c)}}this.paper.endPage(g);this.paper.endDoc();this.legenda.setSVG(c.label,"Abre","Fecha");for(var b=0;b<this.keyMap.length;b++){for(var d=0;d<this.keyMap[b].length;d++){this.keyMap[b][d].setSVG(c.label)}}};DIATONIC.map.Keyboard.prototype.drawLine=function(a,b,c,d){this.paper.printLine(a,b,c,d)};DIATONIC.map.Keyboard.prototype.getLayout=function(a){return this.layout[a]||0};DIATONIC.map.Keyboard.prototype.isPedal=function(b,a){return(this.pedalInfo[1]===(b+1))&&(this.pedalInfo[0]===(a+1))};DIATONIC.map.Keyboard.prototype.parseNote=function(e,c){var d={};var b=e.split(":");var a=b[0].charAt(b[0].length-1);d.key=parseInt(a)?b[0].replace(a,""):b[0];d.octave=parseInt(a)?parseInt(a):4;d.complement=b[1]?b[1]:"";d.value=DIATONIC.map.key2number[d.key.toUpperCase()];d.isChord=(d.key===d.key.toLowerCase());d.isBass=c;d.isMinor=d.complement.substr(0,2).indexOf("m")>=0;d.isSetima=d.complement.substr(0,2).indexOf("7")>=0;if(typeof(d.value)==="undefined"){throw new Error("Nota inválida: "+e)}return d};DIATONIC.map.Keyboard.prototype.redraw=function(d){for(var a=0;a<this.keyMap.length;a++){for(var c=0;c<this.keyMap[a].length;c++){var b=this.keyMap[a][c];b.setText(d.label)}}};DIATONIC.map.Keyboard.prototype.clear=function(c){c=true;if(c){for(var a=0;a<this.keyMap.length;a++){for(var b=0;b<this.keyMap[a].length;b++){this.keyMap[a][b].clear()}}}else{for(var b=0;b<this.modifiedItems.length;b++){this.modifiedItems[b].clear()}}this.modifiedItems=new Array()};