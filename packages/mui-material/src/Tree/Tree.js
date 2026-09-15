'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import TreeNode from './TreeNode';
import { getAllKeys, buildKeyEntities, conductCheck, calcCheckState } from './utils';

const TreeRoot = styled('ul', { name: 'MuiTree', slot: 'Root' })(
  memoTheme(({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: theme.typography.pxToRem(14),
    color: (theme.vars || theme).palette.text.primary,
  })),
);

const Tree = React.forwardRef(function Tree(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTree' });
  const {
    treeData = [],
    checkable = false,
    checkedKeys: checkedKeysProp,
    defaultCheckedKeys = [],
    checkStrictly = false,
    expandedKeys: expandedKeysProp,
    defaultExpandedKeys = [],
    defaultExpandAll = false,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys = [],
    multiple = false,
    disabled = false,
    blockNode = false,
    showLine = false,
    showIcon = false,
    switcherIcon,
    onExpand,
    onSelect,
    onCheck,
    sx,
    ...other
  } = props;

  const keyEntities = React.useMemo(() => buildKeyEntities(treeData), [treeData]);

  // Expanded state
  const [internalExpanded, setInternalExpanded] = React.useState(() => {
    if (defaultExpandAll) return new Set(getAllKeys(treeData));
    return new Set(defaultExpandedKeys);
  });
  const isExpandedControlled = expandedKeysProp !== undefined;
  const expandedSet = React.useMemo(
    () => (isExpandedControlled ? new Set(expandedKeysProp) : internalExpanded),
    [isExpandedControlled, expandedKeysProp, internalExpanded],
  );

  // Selected state
  const [internalSelected, setInternalSelected] = React.useState(() => new Set(defaultSelectedKeys));
  const isSelectedControlled = selectedKeysProp !== undefined;
  const selectedSet = React.useMemo(
    () => (isSelectedControlled ? new Set(selectedKeysProp) : internalSelected),
    [isSelectedControlled, selectedKeysProp, internalSelected],
  );

  // Checked state
  const [internalChecked, setInternalChecked] = React.useState(() => new Set(defaultCheckedKeys));
  const isCheckedControlled = checkedKeysProp !== undefined;
  const checkedSet = React.useMemo(
    () => (isCheckedControlled ? new Set(checkedKeysProp) : internalChecked),
    [isCheckedControlled, checkedKeysProp, internalChecked],
  );

  // Half-checked (indeterminate) state
  const halfCheckedSet = React.useMemo(() => {
    if (checkStrictly) return new Set();
    return calcCheckState(checkedSet, keyEntities);
  }, [checkedSet, keyEntities, checkStrictly]);

  const handleExpand = React.useCallback(
    (key, expanded, node) => {
      const newSet = new Set(expandedSet);
      if (expanded) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      if (!isExpandedControlled) {
        setInternalExpanded(newSet);
      }
      if (onExpand) {
        onExpand([...newSet], { expanded, node });
      }
    },
    [expandedSet, isExpandedControlled, onExpand],
  );

  const handleSelect = React.useCallback(
    (key, selected, node) => {
      let newSet;
      if (multiple) {
        newSet = new Set(selectedSet);
        if (selected) {
          newSet.add(key);
        } else {
          newSet.delete(key);
        }
      } else {
        newSet = selected ? new Set([key]) : new Set();
      }
      if (!isSelectedControlled) {
        setInternalSelected(newSet);
      }
      if (onSelect) {
        onSelect([...newSet], { selected, node, selectedNodes: [] });
      }
    },
    [selectedSet, isSelectedControlled, multiple, onSelect],
  );

  const handleCheck = React.useCallback(
    (key, checked, node) => {
      let newCheckedKeys;
      let newHalfCheckedKeys = [];

      if (checkStrictly) {
        const newSet = new Set(checkedSet);
        if (checked) {
          newSet.add(key);
        } else {
          newSet.delete(key);
        }
        newCheckedKeys = [...newSet];
      } else {
        const result = conductCheck(checkedSet, checked, key, keyEntities);
        newCheckedKeys = result.checkedKeys;
        newHalfCheckedKeys = result.halfCheckedKeys;
      }

      if (!isCheckedControlled) {
        setInternalChecked(new Set(newCheckedKeys));
      }
      if (onCheck) {
        if (checkStrictly) {
          onCheck({ checked: newCheckedKeys, halfChecked: newHalfCheckedKeys }, { checked, node });
        } else {
          onCheck(newCheckedKeys, { checked, node, halfCheckedKeys: newHalfCheckedKeys });
        }
      }
    },
    [checkedSet, isCheckedControlled, checkStrictly, keyEntities, onCheck],
  );

  return (
    <TreeRoot ref={ref} role="tree" sx={sx} {...other}>
      {treeData.map((node) => (
        <TreeNode
          key={node.key}
          node={node}
          level={0}
          checkable={checkable}
          showLine={showLine}
          showIcon={showIcon}
          blockNode={blockNode}
          disabled={disabled}
          switcherIcon={switcherIcon}
          onExpand={handleExpand}
          onSelect={handleSelect}
          onCheck={handleCheck}
          expandedKeys={expandedSet}
          selectedKeys={selectedSet}
          checkedKeys={checkedSet}
          halfCheckedKeys={halfCheckedSet}
          keyEntities={keyEntities}
        />
      ))}
    </TreeRoot>
  );
});

Tree.propTypes = {
  treeData: PropTypes.array,
  checkable: PropTypes.bool,
  checkedKeys: PropTypes.array,
  defaultCheckedKeys: PropTypes.array,
  checkStrictly: PropTypes.bool,
  expandedKeys: PropTypes.array,
  defaultExpandedKeys: PropTypes.array,
  defaultExpandAll: PropTypes.bool,
  selectedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  blockNode: PropTypes.bool,
  showLine: PropTypes.bool,
  showIcon: PropTypes.bool,
  switcherIcon: PropTypes.node,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Tree;
