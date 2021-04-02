// var a = [];
// for (let i = 0; i < 10; i++) {
//     a[i] = function () {
//         console.log(i);
//     };
//     console.log(a[i].toString())
// }

// function make () {  return ()=>{    console.log(this);  }}var testFunc = make.call({ name:'foo' });testFunc(); testFunc.call({ name:'bar' });

// function make () {
//     return () => {
//         console.log(this)
//     }
// }
//
// var testFunc = make.call({name: 'foo'});
// testFunc();
// // testFunc.call({name: 'bar'})
//
// // make();

// var zz=100;

// var a={
//     zz:10,
//     show: function(){
//         console.log(this.zz);
//     }
// }
// a.show();
// var fn=a.show;
// fn();
function a(xx) {
    console.log(this)
    this.x = xx;
    return this;
}
var x = a(5);
var y = a(6);
console.log('x', x);//undefined
// console.log(y.x);//6
