import React, { useState } from './react';
import ReactDOM from './react-dom';
import './index.less';

//原生组件
// let element1 = (
//   <div className="parent" style={{
//     height: '30px'
//   }}>element<span>123</span>second</div>
// );

//函数组件
// function FuncComponent(props) {
//   return (
//     <div className="parent" style={{
//       height: '30px'
//     }}>element<span>123</span>second{props.children}</div>
//   )
// }

// //类组件
// class ClassComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log('1.constructor组件初始化')
//     this.state = {
//       count: 1,
//       count2: 1,
//     }
//   }

//   // componentWillMount() {
//   //   console.log('2.constructor组件即将挂载')
//   // }

//   // componentDidMount() {
//   //   console.log('4.constructor组件挂载完成')
//   // }

//   // shouldComponentUpdate() {
//   //   console.log('5.组件允许更新')
//   //   return true;
//   // }
//   // componentWillUpdate() {
//   //   console.log('6.组件更新前')
//   // }
//   // componentWillUnmount() {
//   //   console.log('8.组建卸载')
//   // }
//   // componentDidUpdate() {
//   //   console.log('7.组件更新完成')
//   // }
//   handleClick = (e) => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }

//   handleClick2 = (e) => {
//     this.setState({
//       count2: this.state.count2 + 1
//     })
//   }

//   handleParentClick = () => {
//     // console.log('handleParentClick')
//   }

//   render() {
//     console.log('3.constructor组件挂在中');
//     return (
//       // <ChildClassComponent count={this.state.count}>
//       //   <ChildClassComponent count={this.state.count} />
//       // </ChildClassComponent>
//       <div onClick={this.handleParentClick}>
//         {this.state.count}
//         <button onClick={this.handleClick}><span>按钮</span></button>
//         <button onClick={this.handleClick2}><span>按钮2</span></button>
//         <ChildClassComponent count={this.state.count} count2={this.state.count2} />
//         <ChildFunctionComponent count={this.state.count} />
//       </div>
//     )
//   }
// }

// class ChildClassComponent extends React.Component {
//   constructor(props) {
//     super(props)
//     console.log('111, 子组件初始化')
//   }

//   componentDidMount() {
//     console.log('444, 子组件执行完成')
//   }

//   componentWillMount() {
//     console.error('222, 子组件挂在')
//   }

//   componentWillUnmount() {
//     console.log('555, 子组件卸载')
//   }
//   componentWillReceiveProps(newProps) {
//     console.log('666,自组吉安接受props')
//   }
//   shouldComponentUpdate() {
//     console.log('777.子组件允许更新')
//     return true;
//   }
//   componentWillUpdate() {
//     console.log('888.zi组件更新前')
//   }

//   componentDidUpdate() {
//     console.log('999.zi组件更新完成')
//   }
//   render() {
//     console.log('3333, 类组件子组件渲染')
//     return (
//       <div>子组件{this.props.count}</div>
//     )
//   }
// }

const NewMemo = React.memo(ChildFunctionComponent);
function FunctionComponent(props) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  function handleBtn() {
    setA(2)
    console.log('a=====', a)
  }

  // const data = React.useMemo(() => {
  //   return {
  //     a
  //   }
  // }, []);

  return (
    <div>
      函数子组件{props.count}
      <button onClick={handleBtn}>按钮</button>
      <ChildFunctionComponent2 a={a} b={b} />
      <NewMemo />
    </div>
  )
}

function ChildFunctionComponent2(props) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  function handleBtn() {
    setA(2)
    console.log('a=====', a)
  }

  console.error('a自组吉安渲染1111111111111111111111', a);

  return (
    <div>
      函数子组件{props.count}
      <button onClick={handleBtn}>按钮</button>
    </div>
  )
}

function ChildFunctionComponent(props) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  function handleBtn() {
    setA(2)
    console.log('a=====', a)
  }

  console.error('a自组吉安渲染322222222222222222222', a);

  return (
    <div>
      函数子组件{props.count}
      <button onClick={handleBtn}>按钮</button>
    </div>
  )
}

// console.log(JSON.stringify(element1, null, 2))
ReactDOM.render(
  <FunctionComponent />,
  document.getElementById('root')
);

