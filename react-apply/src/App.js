import React, { Component } from 'react';

function HocComponent(ParamsComponent) {
  return class WrapperComponent extends Component {
    render() {
      console.log(new ParamsComponent())
      return (
        <ParamsComponent {...{name: '123'}}>1234567</ParamsComponent>
      )
    }
  }
}

class Base extends Component {
  constructor() {
    super()
    console.log(this.props)
  }

  say() {
    return '123'
  }

  render(){
    return (
      <div>base-btn</div>
    )
  }

}

export default HocComponent(Base);
/***
 * 强化组件的方式
 * 1.extends继承
 * 2.高阶组件
 *
 *
 *
 *
 */