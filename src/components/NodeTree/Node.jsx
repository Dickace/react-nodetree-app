import React, {
  useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Node = React.forwardRef(({
  id, name, onSelect, parent,
}, ref) => {
  const [nodeName, setNodeName] = useState(name);
  const [children, setChildren] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [parentNode, setParentNode] = useState(parent);
  const [isDisabled, setIsDisabled] = useState(true);
  const removeChildren = (childId) => {
    setChildren(children.filter((el) => el.newId !== childId));
  };
  const inputRef = useRef();
  useEffect(() => {
    if (!isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);
  const disable = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      return false;
    }
    setIsDisabled(true);
    return true;
  };
  useImperativeHandle(ref, () => ({
    setNodeName,
    setChildren,
    children,
    parentNode,
    setParentNode,
    id,
    removeChildren,
    disable,
  }));

  const handleNodeNameChange = (event) => {
    setNodeName(event.target.value);
  };
  const missFocus = () => {
    setIsDisabled(true);
  };
  const select = (event) => {
    event.stopPropagation();
    const allNodes = document.getElementsByTagName('input');
    for (let i = 0; i < allNodes.length; i += 1) {
      allNodes[i].classList.remove('select');
    }
    event.target?.classList.add('select');
  };
  return (
    <li>
      <div
        aria-hidden="true"
        aria-label="close"
        onClick={(event) => {
          select(event);
          onSelect(ref);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setIsDisabled(true);
          }
        }}
      >
        <input
          ref={inputRef}
          type="text"
          onChange={handleNodeNameChange}
          value={nodeName}
          disabled={isDisabled ? 'disabled' : ''}
          onBlur={missFocus}
        />
      </div>
      <ul>
        {children.map((child) => (
          // eslint-disable-next-line max-len,no-return-assign
          <Node ref={child.newNodeRef} key={child.newId} id={child.newId} name={child.newName} onSelect={onSelect} parent={child.parentRef} />
        ))}
      </ul>
    </li
        >

  );
});

Node.defaultProps = {
  name: 'node',
  parent: null,
  onSelect: '',
  id: 0,
};

Node.propTypes = {
  name: PropTypes.string,
  parent: PropTypes.func,
  onSelect: PropTypes.func,
  id: PropTypes.number,
};

export default Node;
