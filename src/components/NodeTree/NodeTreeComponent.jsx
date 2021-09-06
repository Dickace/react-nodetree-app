import React, { useState } from 'react';
import Node from './Node';
import './style.css';

function NodeTreeComponent() {
  const [root, setRoot] = useState(<Node key={window.crypto.getRandomValues(new Uint8Array(3))[0]} name="root" parentNode={null} isRoot />);
  const handleReset = function f() {
    setRoot(<Node key={window.crypto.getRandomValues(new Uint8Array(3))[0]} name="root" parentNode={null} isRoot />);
  };
  return (
    <div className="container">
      <h3 className="nodeTree-title">Tree</h3>
      <div
        aria-hidden="true"
        aria-label="close"
        className="nodeTree-treeBox"
        id="treeRoot"
        onClick={() => {
          const allNodes = document.getElementsByTagName('input');
          for (let i = 0; i < allNodes.length; i += 1) {
            allNodes[i].classList.remove('select');
          }
        }}
      >
        {root}
      </div>
      <div className="nodeTree-btnGroup">
        <div id="Add">Add</div>
        <div id="Remove">Remove</div>
        <div id="Edit">Edit</div>
        <div
          aria-hidden="true"
          aria-label="close"
          id="Reset"
          onClick={() => {
            handleReset();
          }}
        >
          Reset
        </div>
      </div>
    </div>
  );
}

export default NodeTreeComponent;
