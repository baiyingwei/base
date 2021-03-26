import { updateQueue } from './Component';
function addEvent(dom, eventType, listener) {
  let store = dom.stote || (dom.store = {});
  store[eventType] = listener;
  if (!document[eventType])
    document[eventType] = dispatchEvent;
}

let syntheticEvent = {};

function dispatchEvent(event) {
  let { target, type } = event;
  let eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  createSyntheticEvent(event);
  while (target) {
    const { store } = target;
    const listener = store && store[eventType];
    listener && listener.call(target, createSyntheticEvent);
    target = target.parentNode;
  }
  for (let key in createSyntheticEvent) {
    createSyntheticEvent[key] = null;
  }
  updateQueue.batchUpdate();
}

function createSyntheticEvent(event) {
  for (let key in event) {
    syntheticEvent[key] = event[key];
  }
}

export default addEvent;