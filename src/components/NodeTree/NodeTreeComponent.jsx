import React, {
  createRef, useRef, useState,
} from 'react';
import Node from './Node';
import './style.css';

function NodeTreeComponent() {
  const node = useRef();
  // eslint-disable-next-line no-unused-vars
  let noderef;
  const handleSelect = (ref) => {
    noderef = ref;
  };
  const handleAdd = () => {
    if (noderef === undefined) {
      noderef = node;
    }
    const newNodeRef = createRef();
    const newId = window.crypto.getRandomValues(new Uint8Array(3))[0];
    noderef.current.setChildren(noderef.current.children.concat({
      newId, newName: 'newNode', newNodeRef, parentRef: noderef,
    }));
  };
  const handleRemove = () => {
    // eslint-disable-next-line react/no-find-dom-node,max-len
    if (noderef !== null && noderef.current.parentNode !== null) {
      noderef.current.parentNode.current.removeChildren(noderef.current.id);
    }
    noderef = node;
  };
  const handleEdit = () => {
    noderef.current.disable();
  };
  const newId = window.crypto.getRandomValues(new Uint8Array(3))[0];
  // eslint-disable-next-line no-unused-vars
  const [root, setRoot] = useState(<Node ref={node} onSelect={handleSelect} key={newId} id={newId} name="root" parent={null} />);
  const handleReset = () => {
    node.current.setChildren([]);
    node.current.setNodeName('root');
  };

  // eslint-disable-next-line no-unused-vars

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
        <div
          aria-hidden="true"
          aria-label="close"
          onClick={handleAdd}
        >
          Add
        </div>
        <div
          aria-hidden="true"
          aria-label="close"
          onClick={handleRemove}
        >
          Remove
        </div>
        <div
          aria-hidden="true"
          aria-label="close"
          onClick={handleEdit}
        >
          Edit
        </div>
        <div
          aria-hidden="true"
          aria-label="close"
          onClick={handleReset}
        >
          Reset
        </div>
      </div>
    </div>
  );
}

export default NodeTreeComponent;
