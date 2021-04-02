import Component from './Component';
import { wrapToVdom } from './utils';
import { useState } from './react-dom';

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

const React = { createElement, Component, useState };

export default React;