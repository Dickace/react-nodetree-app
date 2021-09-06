import React, {
  useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Node({ name, parentNode, isRoot }) {
  const [nodeName, setNodeName] = useState(name);
  const [children, setChildren] = useState([]);
  const [root, setRoot] = useState(false);
  let isDeleted = false;
  // maybe in future we need this (no)
  // eslint-disable-next-line no-unused-vars
  const [parent, setParent] = useState(parentNode);
  const addChildren = function f(newName, newParent) {
    const newId = window.crypto.getRandomValues(new Uint8Array(3))[0];
    // if you wanna add new Nodes in end of subtree, write children.concat(obj)
    setChildren(children.concat({ newId, newName, newParent }));
  };
  const editNode = function f(target) {
    target.disabled = false;
    target.focus();
  };
  function removeNode(target) {
    // costil' x2
    if (isDeleted === false) {
      if (target.dataset.isroot !== 'true') {
        target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
        isDeleted = true;
      }
    }
  }
  function setAdd() {
    document.getElementById('Add').onclick = function f(e) {
      e.stopPropagation();
      addChildren('newNode', nodeName);
    };
  }
  function setEdit(target) {
    document.getElementById('Edit').onclick = function f(e) {
      e.stopPropagation();
      editNode(target);
    };
  }
  function setRemove(target) {
    document.getElementById('Remove').onclick = function f(e) {
      e.stopPropagation();
      removeNode(target);
    };
  }
  useEffect(() => {
    setRoot(isRoot);
  }, []);
  useEffect(() => {
    setAdd();
  }, [children]);
  const handleNodeNameChange = (event) => {
    setNodeName(event.target.value);
  };
  const missFocus = (event) => {
    event.target.disabled = true;
  };
  return (
    <li>
      <div
        aria-hidden="true"
        aria-label="close"
        onClick={(event) => {
          event.stopPropagation();
          const allNodes = document.getElementsByTagName('input');
          for (let i = 0; i < allNodes.length; i += 1) {
            allNodes[i].classList.remove('select');
          }
          event.target?.classList.add('select');
          setAdd();
          setEdit(event.target);
          setRemove(event.target);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.target.disabled = true;
          }
        }}
      >
        <input
          type="text"
          onChange={handleNodeNameChange}
          value={nodeName}
          disabled
          onBlur={missFocus}
          data-isroot={root}
        />
      </div>
      <ul>
        {children.map((child) => (
          <Node key={child.newId} name={child.newName} parentNode={child.newParent} />
        ))}
      </ul>
    </li
      >

  );
}

Node.defaultProps = {
  name: 'node',
  parentNode: null,
  isRoot: false,
};

Node.propTypes = {
  name: PropTypes.string,
  parentNode: PropTypes.node,
  isRoot: PropTypes.bool,
};

export default Node;
