import Cycle from '@cycle/core';
import {h, p, span, h1, h2, h3, br, div, label, input, hr, makeDOMDriver} from '@cycle/dom';
import Rx from 'rx';

var Group = 'solo';
var Name;

function createWebSocket(path) {
    let host = window.location.hostname;
    if(host == '') host = 'localhost';
    let uri = 'ws://' + host + ':3093' + path;
    let Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

var socket = createWebSocket('/');

var words = 'Cow';
mM1.ret([2,4,6,8]);
mM3.ret([]);

function main(sources) {
  const numClick$ = sources.DOM
    .select('.num').events('click');
  
  const numClickAction$ = numClick$.map(e => {
    mM3
    .bnd(push,e.target.textContent)
    .bnd(() => {mM1.x[e.target.id] = "";})
    if (mM3.x.length === 2 && mM8.x !== 0) {words = 'Good to go'; updateCalc();}
  }).startWith(mM1.x);

  const opClick$ = sources.DOM
    .select('.op').events('click');

  const opClickAction$ = opClick$.map(e => {
    mM8.ret(e.target.textContent);
    if (mM3.x.length === 2 && mM8.x !== 0) {words = 'Good to go'; updateCalc();}
  })  

  const calcStream$ = Rx.Observable.merge(numClickAction$,opClickAction$);

  return {
    DOM: 
      calcStream$.map(x => 
      h('div', [
      h('button#0.num', mM1.x[0]+'' ),
      h('button#1.num', mM1.x[1]+'' ),
      h('button#2.num', mM1.x[2]+'' ),
      h('button#3.num', mM1.x[3]+'' ),
      h('br'),
      h('br'),
      h('button#4.op', 'add'  ),
      h('button#5.op', 'subtract' ),
      h('button#5.op', 'mult' ),
      h('button#5.op', 'div' ),
      h('button#5.op', 'concat' ),
      h('p', 'In order to create a unique socket, please enter some name.'  ),
      h('input', { onkeydown: updateLogin }   ),
      h('p', words )
      ]))
  } 
}  

function updateCalc() { 
  ret('start').bnd(() => (
      ( mMZ2.bnd(() => mM13
                    .bnd(score,1)
                    .bnd(next2, ((mM13.x % 5) === 0), mMZ5) 
                    .bnd(newRoll)) ),
      ( mMZ4.bnd(() => mM13
                    .bnd(score,1)
                    .bnd(next2, ((mM13.x % 5) === 0), mMZ5) 
                    .bnd(newRoll)) ),
          ( mMZ5.bnd(() => mM13
                        .bnd(score,5)
                        .bnd(next, 25, mMZ6)) ),
              ( mMZ6.bnd(() => mM9.bnd(score2) 
                            .bnd(next,3,mMZ7)) ),
                  (mMZ7.bnd(() => mM13.bnd(winner)) ),                 
      (mM3.bnd(x => mM7
                    .ret(calc(x[0], mM8.x, x[1]))
                    .bnd(next, 18, mMZ4)
                    .bnd(next, 20, mMZ2) 
                    .bnd(() => mM1.bnd(push,mM7.x)
                    .bnd(mM1.ret)
                    .bnd(displayOff, ((mM1.x.length)+''))
                    .bnd(() => mM3
                    .ret([])
                    .bnd(() => mM4
                    .ret(0).bnd(mM8.ret))))) ) 
  ))     
}

var updateScoreboard = function updateScoreboard(v) {
  mMscoreboard.ret([]);
  let ar = mMscbd.x;
  let keys = Object.keys(ar);
  for (let k in keys) {
    mMscoreboard.bnd(unshift, ar[k])
    .bnd(unshift, h('br'));
  }
    mMscoreboard.bnd(unshift, h('br'))
    .bnd(unshift, h('br'))
    .bnd(unshift,'player [score] [goals]')
  return mMscoreboard;
}

window.onload = function (event) {
    console.log('onopen event: ', event);
};

var updateMessages = function updateMessages(v) {
  mMmessages.ret([]);
  let ar = mMmsg.x;
  let keys = Object.keys(ar);
  for (let k in keys) {
    mMmessages.bnd(unshift, ar[k])
    .bnd(unshift, h('br'));
  }
  return mMmessages;
}

var displayOff = function displayOff(x,a) {
    document.getElementById(a).style.display = 'none';
    return ret(x);
};

var displayInline = function displayInline(x,a) {
    document.getElementById(a).style.display = 'inline';
    return ret(x);
};

var send = function() {
  socket.send(`CA#$42,${Group},${Name},6,6,12,20`);
};

var score = function score(v,j) {
  socket.send('CG#$42,' + Group + ',' + Name + ',' + j + ',' + 0);
  return mM13.ret(v + j);
}

var score2 = function score2() {
  mMgoals.ret(mMgoals.x + 1);
  let j = -25;
  socket.send('CG#$42,' + Group + ',' + Name + ',' + j + ',' + 1);
  mM13.ret(0);
  return mMgoals;
}

var winner = function winner() {
  let k = -3
  mMgoals.ret(mMgoals.x + 1);
  socket.send('CG#$42,' + Group + ',' + Name + ',' + 0 + ',' + k);
  mMgoals2.ret('The winner is ' + Name);
  return ret(0);
}

var newRoll = function(v) {
  socket.send(`CA#$42,${Group},${Name},6,6,12,20`);
  return ret(v);
};

function updateLogin(e) {
     let v = e.target.value;
     if (v == '' ) {
       return;
     } 
     if( e.keyCode == 13 ) {
       socket.send("CC#$42" + v);
       Name = v;
       mM3.ret([]).bnd(mM2.ret);
       e.target.value = '';
     }
}

function updateGoback() {
       monadStyle = inputStyleA;
       chatStyle = inputStyleB;
       update0();
}

function  updateRoll() {
  styleRoll2 = {display: 'none'};    
  mM13.bnd(score,-1)
  .bnd(update);
  socket.send(`CA#$42,${Group},${Name},6,6,12,20`);
}

function updateGotochat() {
       monadStyle = inputStyleB;
       chatStyle = inputStyleA;
       update0();
}

function updateMessage(e) {
  if( e.keyCode == 13 ) {
    socket.send(`CD#$42,${Group},${Name},${e.target.value}`);
    monadStyle = inputStyleB;
    chatStyle = inputStyleA;
    e.target.value = '';
  }
}

function pauseDemo() {
  mM1.ret("Wait two seconds.")
    .bnd(update)
    .bnd(pause,2,mMZ1)
    .bnd(() => mM1.ret("Goodbye")
    .bnd(update))
}

function updateGroup(e) {
  Group = e.target.value;
  if( e.keyCode == 13 ) {
    socket.send(`CO#$42,${e.target.value},${Name},${e.target.value}`);
  }
  oldVnode = patch(oldVnode, newVnode());
}

Cycle.run(main, {
  DOM: makeDOMDriver('#main-container')
});


socket.onmessage = function(event) {
  console.log(event);
  let gameArray = event.data.split(",");
  let makeStr = x => {
    let l = x.length;
    let str = '';
      for (let i=5; i<l; i+=1) {
        str = str + ', ' + x[i];
      }
    return (x[4] + ' ' + str);
  }
  let d2 = event.data.substring(0,6);
  // let d3 = event.data.substring(2,6);
  let sender = gameArray[2];
  let extra = gameArray[3];
  let ext4 = gameArray[4];
  let ext5 = gameArray[5];
  let ext6 = gameArray[6];

      switch (d2) {
          case "CC#$42":                         // Not broadcast. Login message.
            if (extra === '%#8*&&^1#$%^')  {
              mM6.ret('Name taken');
              //that.setState({info: `You entered a name which is already taken`})
              setTimeout( function () {
                document.location.reload(false);
              },2000);
            }
            else {
              mM6.ret(sender + '\'s socket is now open');
            }
      
          break;

          case "CZ#$42":                  // Solutions.
          break;
          
          case "CA#$42":                    // Triggedarkred by ROLL
              mM1.ret([extra,  ext4,  ext5,  ext6])
              .bnd(() => mM17.ret(['add', 'subtract', 'mult', 'div', 'concat']) 
              .bnd(() => mM3.ret([])
              .bnd(() => mM8.ret(0)
              .bnd(() => mM6
              .bnd(displayInline,'0')
              .bnd(displayInline,'1')
              .bnd(displayInline,'2')
              .bnd(displayInline,'3')))));
          break;

          case "CB#$42":                             // Updates the scoreboaard.
            let scores = extra.split("<br>");
            mMscbd.ret(scores)
            .bnd(updateScoreboard)
            .bnd(() => mM3.ret([])
            .bnd(() => mM8.ret(0)
            .bnd(() => mM6)));
          break;

          case "CD#$42":  // Updates the message display.
            gameArray.splice(0,3);
            let message = gameArray.reduce((a,b) => a + ", " + b)
            let str = sender + ': ' + message;
            mMmsg
            .bnd(push,str)
            .bnd(updateMessages)
          break;
          
          default:
            console.log('Message fell through to default');
          break;
      }
   }

