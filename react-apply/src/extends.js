import React, { Component } from 'react';

 class Base extends Component {
   constructor(props){
     super(props);
     console.log('props', props, this)
     this.state = {
       name: 'initName'
     }
     
 
   }
 
   say(){
     return this.state.name;
   }
   render(){
     return (
       <div>base-btn</div>
     )
   }
 }
 
 class Button extends Base{
   constructor(props){
     super(props);
     console.log(this.state)
     console.log('btn-props', props, this)
     console.log(this.say())
   }
 
 }
 
 export default Button;
 /***
  * 强化组件的方式
  * 1.extends继承
  * 2.高阶组件
  * 
  * 
  * 
  * 
  */