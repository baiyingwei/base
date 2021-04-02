import { Component, PureComponent } from './Component';
import { wrapToVdom } from './utils';
import { useState, memo } from './react-dom';

function createElement(type, config, children) {
  const props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children)
  }
  return {
    type,
    props
  }
}

const React = {
  createElement,
  Component,
  PureComponent,
  memo
};

export {
  useState, 
}

export default React;