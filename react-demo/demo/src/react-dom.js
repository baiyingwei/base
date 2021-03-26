import addEvent from './event';
import { REACT_TEXT } from './constants';

function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

function createDOM(vdom) {
  //创建dom
  let { type, props } = vdom;
  let { children } = props;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);//自定义类组件
    } else {
      return mountFunctionComponent(vdom);//自定义函数组件
    }

  } else {
    dom = document.createElement(type);//原生组件
  }
  //更新属性
  updateProps(dom, {}, props);
  //处理儿子
  if (typeof children === 'string' || typeof children === 'number') {
    dom.textContent = children;
  } else if (typeof children === 'object' && props.children.type) {
    render(children, dom);
  } else if (Array.isArray(children)) {
    reconcileChildren(children, dom);
  } else {
    document.textContent = children ? children.toString() : '';
  }
  vdom.dom = dom;
  return dom;
}

function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') continue;
    if (key === 'style') {
      for (let i in newProps.style) {
        dom.style[i] = newProps.style[i]
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newProps[key];
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
}

function reconcileChildren(childrenVDOM, parentDOM) {
  for (var i = 0; i < childrenVDOM.length; i++) {
    if (childrenVDOM[i] !== null) {//?????
      render(childrenVDOM[i], parentDOM);
    }
  }
}

function mountFunctionComponent(vdom) {
  const { type: functionComponent, props } = vdom;
  vdom = functionComponent(props);
  vdom.oldRenderVdom = vdom;
  return createDOM(vdom);
}

function mountClassComponent(vdom) {
  const { type: ClassComponent, props } = vdom;
  const classInstance = new ClassComponent(props);
  vdom.classInstance = classInstance;
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  let renderVdom = classInstance.render();
  classInstance.oldRenderVdom = renderVdom;
  vdom.oldRenderVdom = renderVdom;
  const dom = createDOM(renderVdom);
  classInstance.dom = dom;
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount();
  }
  return dom;
}

export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  if (!oldVdom && !newVdom) {

  } else if (oldVdom && !newVdom) {
    let oldVdom = findDOM(oldVdom);
    if (oldVdom)
      parentDOM.removeChild(oldVdom);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnMount) {
      oldVdom.classInstance.componentWillUnMount();
    }
  } else if (!oldVdom && newVdom) {
    let newDOM = createDOM(newVdom);
    if (nextDOM) {
      parentDOM.insertBefore(newDOM, nextDOM);
    } else {
      parentDOM.appendChild(newDOM);
    }
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    const oldDOM = findDOM(oldVdom);
    const newDOM = createDOM(newVdom);
    parentDOM.replaceChild(newDOM, oldDOM);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnMount) {
      oldVdom.classInstance.componentWillUnMount();
    }
  } else {
    updateElement(oldVdom, newVdom);
  }
}

function findDOM(vdom) {
  debugger
  let { type } = vdom;
  let dom;
  if (typeof type === 'function') {
    dom = findDOM(vdom.oldRenderVdom)
  } else {
    dom = vdom.dom;
  }
  return dom;
}

function updateElement(oldVdom, newVdom) {
  if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    let currentDOM = newVdom.dom = oldVdom.dom;
    currentDOM.textContent = newVdom.props.content;
  } else if (typeof oldVdom.type === 'string') {//真实dom
    let currentDOM = newVdom.dom = oldVdom.dom;
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === 'function') {
    if (oldVdom.type.isReactComponent) {
      updateClassComponent(oldVdom, newVdom);
    } else {
      // updateFunctionComponent(oldVdom, newVdom);
    }
  }
}

function updateClassComponent(oldVdom, newVdom) {
  let classInstance = newVdom.classInstance = oldVdom.classInstance;
  newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
  if (classInstance.componentWillRecieveProps) {
    classInstance.componentWillRecieveProps();
  }
  classInstance.updater.emitUpdate(newVdom.props);
}

function updateChildren(parentDOM, oldVChildren, newVChildren) {
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  const maxLen = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLen; i++) {
    compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i]);
  }
}

const ReactDOM = { render };
export {
  createDOM
}
export default ReactDOM;