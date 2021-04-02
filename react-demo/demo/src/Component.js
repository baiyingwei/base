import { createDOM, compareTwoVdom } from './react-dom';

export let updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set(),
  batchUpdate() {
    for (let updater of this.updaters) {
      updater.updateClassComponent();
    }
    this.isBatchingUpdate = false;
  }
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];

  }
  addState(newState) {
    this.pendingStates.push(newState);
    this.emitUpdate();
  }

  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateClassComponent();
    }
  }

  updateClassComponent() {
    const { classInstance, pendingStates, nextProps } = this;
    if (nextProps || pendingStates.length) {
      shouldUpdate(classInstance, nextProps, this.getState());
    }
  }

  getState() {
    const { classInstance, pendingStates } = this;
    let { state } = classInstance;
    // const newState = {}
    pendingStates.forEach(nextState => {
      state = {
        ...state,
        ...nextState
      }
    });
    pendingStates.length = 0;
    return state;
  }

}

function shouldUpdate(classInstance, nextProps, state) {
  if (nextProps) {
    classInstance.props = nextProps;
  }
  classInstance.state = state;
  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, state)) {
    return;
  }
  classInstance.forceUpdate();
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(newState) {
    this.updater.addState(newState);
  }
  forceUpdate() {
    this.componentWillUpdate && this.componentWillUpdate();
    let newRenderVdom = this.render();
    const currentRenderVdom = compareTwoVdom(this.oldRenderVdom.dom.parentNode, this.oldRenderVdom, newRenderVdom);
    // this.oldRenderVdom = currentRenderVdom;
    // updateClassComponent(this, newRenderVdom);
    this.componentDidUpdate && this.componentDidUpdate();
  }
  render() {

  }
}
class PureComponent extends Component {
  debugger
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) && !shallowEqual(this.state, nextState)
  }
}

function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }
}

function updateClassComponent(classInstance, newVDom) {
  let oldDom = classInstance.dom;
  let newDom = createDOM(newVDom);
  oldDom.parentNode.replaceChild(newDom, oldDom);
  classInstance.dom = newDom;
}

export {
  Component,
  PureComponent
};