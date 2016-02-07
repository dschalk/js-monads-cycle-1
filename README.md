#JS-monads-part3
 
This is the third page of the `Javascript Monads` series.  

The project's running code is at [http://schalk.net](http://schalk.net). You can run the binary on port 3093 by entering `dist/build/server/server`. The named monads and and most of the functions demonstrated here are in a script, so you can press F12 and experiment with them in the console.

The flow of the interactive websockets game running at [http://schalk.net:3093](http://schalk.net:3093) is controlled by the following tree of monads:

```javascript
  function updateCalc() { 
    console.log('In updateCalc');
    ret('start').bnd(() => (
        ( mMZ2.block().bnd(() => mM13
                      .bnd(score,1)
                      .bnd(next2, ((mM13.x % 5) === 0), mMZ5) 
                      .bnd(newRoll)) ),
        ( mMZ4.block().bnd(() => mM13
                      .bnd(score,3)
                      .bnd(next2, ((mM13.x % 5) === 0), mMZ5) 
                      .bnd(newRoll)) ),
            ( mMZ5.block().bnd(() => mM13
                          .bnd(score,5)
                          .bnd(next, 25, mMZ6)) ),
                ( mMZ6.block().bnd(() => mM13
                              .bnd(score2) 
                              .bnd(() => mMgoals.bnd(next,3,mMZ7))) ),
                    (mMZ7.block().bnd(() => mM13.bnd(winner)) ),                 
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
                      .ret(0).bnd(mM8.ret)
                      .bnd(update) ))))) ) 
    ))     
  }
```

The "mM" prefix designates monads. The "mMZ" prefix specifically designates instances of MonadIter. Here is how the monad classes are defined:

```javascript
  class Monad {
    var _this = this;
    constructor(z,g) {

      this.x = z;
      if (arguments.length === 1) {this.id = 'anonymous'}
      else {this.id = g}

      this.bnd = function (func, ...args) {
        return func(_this.x, ...args);
      };

      this.ret = function (a) {
        _this.x = a;
        return _this;
      };
    }
  };

  class MonadIter {
    var _this = this;
    constructor() {

      this.p = function() {};

      this.release = () => {
        return _this.p();
      }
 
      this.bnd = func => {
          _this.p = func;
      }
    }
  }
```
Here are the definitions of "next" and "next2":

```javascript
  var next = function next(x,y,mon2) {
    if (x === y) {
      mon2.release();
    }
    return ret(x);
  }
  
  var next2 = function next(x,condition,mon2) {
    if (condition) {
      mon2.release();
    }
    return ret(x);
  }
```
Scanning down the lines of "updateCalc()" (above), we see that the first time it is called, functions are stored in the "p" attributes of mMZ2, mMZ4, mMZ5, mMZ6, and mMZ7. Then a computation is performed, and if the result is "18" or "20",  either mM4 or mM5 is released causing the function p to execute. If the result is a multiple of the number "5", mMZ5 is released. And if the result is "25", mMZ6.p is called. Finally, if the number of goals is "3", mMZ7 is released, ending the game.

 This project is not about mathematics, it is about controlling the flow of actions in web applications. The function "ret" does happen to be similar to "return" in Haskell. For any value v, ret(v) returns a monad with value v, and for all monads m, values v, and functions f mapping values to monads, ret(v).bnd(f) is equivalent to f(v) and ret(v).bnd(ret) is equivalent to ret(v). And, like Haskell monads, composition is associative; that is, for any monad m and functions f and g mapping values to monads, m.bnd(f).bnd(g) and m.bnd(x => f(x).bnd(g)) both produce the same result. For me, these facts are reassuring, and I think they help explain why the monads are robust and versitile. 

Here is the definition of "ret():
```javascript
var ret = function ret(v) {
  var mon = new Monad(v, 'anonymous');
  return mon;
}
```
updateCalc (above) shows MonadIter instances being used in independent branches. It, along with an example of a single MondadIter instance helping control movement along a four-stage progression, are running online at [schalk.net:3093](http://schalk.net:3093).
##Some Elementary Operations
For any monad m and function f mapping values to monads:

m.bnd(m2.ret) gives m2 the same value as m. In other words, m.x = m2.x. 

m.bnd(f).bnd(m2.ret) leaves m unchanged, but assigns the value f(m.x) to m2.

m.bnd(f).bnd(m.ret) changes m's value to f(m.x).

m.bnd(x => m2.bnd(y => m3.bnd(z => m4.ret(f(x,y,z)) leaves m, m2, and m3 unchanged, but provides their values as arguments to f, giving mM4 the value f(mM1.x, mM2.x, mM3.x). That result could also be accomplished by simply running ret(f(mM1.x, mM2.x, mM3.x)).bnd(mM4.ret) (see "m.bnd(mM2.ret)" above).

"bnd()" is designed to take as arguments functions mapping values to monads, but functions mapping values to values also work. For example, ret(4).bnd(x => x\*x\*x) returns the number 64.


