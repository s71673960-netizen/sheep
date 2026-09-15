'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import Collapse from '../Collapse';
import Checkbox from '../Checkbox';
import SvgIcon from '../SvgIcon';
import SmallRightChevronIcon from '../icons/SmallRightChevron';

const TreeSwitcherIcon = styled(SvgIcon, {
  name: 'MuiTree',
  slot: 'SwitcherIcon',
})(
  memoTheme(({ theme }) => ({
    width: 16,
    height: 16,
    color: (theme.vars || theme).palette.text.secondary,
    '& rect': {
      fill: (theme.vars || theme).palette.background.paper,
      stroke: (theme.vars || theme).palette.text.tertiary,
    },
  })),
);

function PlusSquareIcon(props) {
  return (
    <TreeSwitcherIcon {...props} viewBox="0 0 16 16">
      <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" strokeWidth="1" />
      <path d="M4 8H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 4V12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </TreeSwitcherIcon>
  );
}

function MinusSquareIcon(props) {
  return (
    <TreeSwitcherIcon {...props} viewBox="0 0 16 16">
      <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" strokeWidth="1" />
      <path d="M4 8H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </TreeSwitcherIcon>
  );
}

const NodeRoot = styled('li', { name: 'MuiTree', slot: 'Node' })(
  memoTheme(({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    margin: 0,
  })),
);

const NodeContent = styled('div', { name: 'MuiTree', slot: 'NodeContent' })(
  memoTheme(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: 36,
    padding: '2px 10px',
    borderRadius: 7,
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    '&[data-selected="true"]': {
      backgroundColor: (theme.vars || theme).palette.action.selected,
      '& .MuiTree-Title': {
        fontWeight: 600,
        color: (theme.vars || theme).palette.primary.main,
      },
    },
    '&[data-disabled="true"]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  })),
);

const SwitcherWrapper = styled('span', { name: 'MuiTree', slot: 'Switcher' })(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    flexShrink: 0,
    color: (theme.vars || theme).palette.text.secondary,
    transition: 'transform 0.2s',
    '&[data-expanded="true"]': {
      transform: 'rotate(90deg)',
    },
    '&[data-expanded="false"]': {
      transform: 'rotate(0deg)',
    },
    '& svg': {
      fontSize: 16,
    },
  })),
);

const SwitcherPlaceholder = styled('span', { name: 'MuiTree', slot: 'SwitcherPlaceholder' })({
  display: 'inline-flex',
  width: 16,
  height: 16,
  flexShrink: 0,
});

const CheckboxWrapper = styled('span', { name: 'MuiTree', slot: 'Checkbox' })({
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: 8,
  marginRight: -4,
  flexShrink: 0,
});

const IconWrapper = styled('span', { name: 'MuiTree', slot: 'Icon' })(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: 8,
    flexShrink: 0,
    color: (theme.vars || theme).palette.text.secondary,
    '& svg': {
      fontSize: 16,
    },
  })),
);

const TitleWrapper = styled('span', { name: 'MuiTree', slot: 'Title' })(
  memoTheme(({ theme }) => ({
    flex: 1,
    marginLeft: 8,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    userSelect: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: (theme.vars || theme).palette.text.primary,
  })),
);

const ChildrenList = styled('ul', { name: 'MuiTree', slot: 'Children' })({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const LineChildrenList = styled('ul', { name: 'MuiTree', slot: 'LineChildren' })(
  memoTheme(({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 18,
      left: 'var(--line-left)',
      width: 1,
      backgroundColor: (theme.vars || theme).palette.divider,
    },
  })),
);

const LineNodeItem = styled('li', { name: 'MuiTree', slot: 'LineNode' })({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

function TreeNode(props) {
  const {
    node,
    level,
    expanded,
    selected,
    checked,
    halfChecked,
    checkable,
    showLine,
    showIcon,
    blockNode,
    disabled: treeDisabled,
    switcherIcon,
    isLast,
    onExpand,
    onSelect,
    onCheck,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    halfCheckedKeys,
    keyEntities,
  } = props;

  const isLeaf = node.isLeaf || !node.children || node.children.length === 0;
  const isDisabled = treeDisabled || node.disabled;
  const isExpanded = expandedKeys.has(node.key);
  const isSelected = selectedKeys.has(node.key);
  const isChecked = checkedKeys.has(node.key);
  const isHalfChecked = halfCheckedKeys.has(node.key);

  const handleExpand = (e) => {
    e.stopPropagation();
    if (isDisabled) return;
    onExpand(node.key, !isExpanded, node);
  };

  const handleSelect = (e) => {
    if (isDisabled) return;
    if (node.selectable === false) return;
    onSelect(node.key, !isSelected, node);
  };

  const handleCheck = (e) => {
    e.stopPropagation();
    if (isDisabled || node.disableCheckbox) return;
    onCheck(node.key, !isChecked, node);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };

  const indent = level * 16;
  const leafExtraIndent = isLeaf && !showLine ? 24 : 0;

  const switcherElement = isLeaf ? (
    showLine ? <SwitcherPlaceholder /> : null
  ) : showLine ? (
    <SwitcherWrapper
      data-expanded={isExpanded ? 'true' : 'false'}
      onClick={handleExpand}
      role="button"
      tabIndex={-1}
      style={{ transform: 'none' }}
    >
      {isExpanded ? <MinusSquareIcon /> : <PlusSquareIcon />}
    </SwitcherWrapper>
  ) : (
    <SwitcherWrapper
      data-expanded={isExpanded ? 'true' : 'false'}
      onClick={handleExpand}
      role="button"
      tabIndex={-1}
    >
      {switcherIcon || <SmallRightChevronIcon />}
    </SwitcherWrapper>
  );

  const NodeWrapper = showLine && level > 0 ? LineNodeItem : NodeRoot;

  return (
    <NodeWrapper>
      <NodeContent
        data-selected={isSelected ? 'true' : 'false'}
        data-disabled={isDisabled ? 'true' : 'false'}
        onClick={handleSelect}
        style={{ paddingLeft: indent + leafExtraIndent + 10 }}
      >
        {switcherElement}
        {checkable && node.checkable !== false && (
          <CheckboxWrapper style={isLeaf ? { marginLeft: 0 } : undefined} onClick={handleCheckboxClick}>
            <Checkbox
              size="small"
              checked={isChecked}
              indeterminate={isHalfChecked}
              disabled={isDisabled || node.disableCheckbox}
              onChange={handleCheck}
              tabIndex={-1}
              sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}
            />
          </CheckboxWrapper>
        )}
        {showIcon && node.icon && (
          <IconWrapper>{node.icon}</IconWrapper>
        )}
        <TitleWrapper className="MuiTree-Title" style={isLeaf && !checkable ? { marginLeft: 0 } : undefined}>{node.title}</TitleWrapper>
      </NodeContent>
      {!isLeaf && (
        <Collapse in={isExpanded} timeout={200}>
          {showLine ? (
            <LineChildrenList style={{ '--line-left': `${level * 16 + 18}px` }}>
              {node.children.map((child, idx) => (
                <TreeNode
                  key={child.key}
                  node={child}
                  level={level + 1}
                  checkable={checkable}
                  showLine={showLine}
                  showIcon={showIcon}
                  blockNode={blockNode}
                  disabled={treeDisabled}
                  switcherIcon={switcherIcon}
                  isLast={idx === node.children.length - 1}
                  onExpand={onExpand}
                  onSelect={onSelect}
                  onCheck={onCheck}
                  expandedKeys={expandedKeys}
                  selectedKeys={selectedKeys}
                  checkedKeys={checkedKeys}
                  halfCheckedKeys={halfCheckedKeys}
                  keyEntities={keyEntities}
                />
              ))}
            </LineChildrenList>
          ) : (
            <ChildrenList>
              {node.children.map((child) => (
                <TreeNode
                  key={child.key}
                  node={child}
                  level={level + 1}
                  checkable={checkable}
                  showLine={showLine}
                  showIcon={showIcon}
                  blockNode={blockNode}
                  disabled={treeDisabled}
                  switcherIcon={switcherIcon}
                  onExpand={onExpand}
                  onSelect={onSelect}
                  onCheck={onCheck}
                  expandedKeys={expandedKeys}
                  selectedKeys={selectedKeys}
                  checkedKeys={checkedKeys}
                  halfCheckedKeys={halfCheckedKeys}
                  keyEntities={keyEntities}
                />
              ))}
            </ChildrenList>
          )}
        </Collapse>
      )}
    </NodeWrapper>
  );
}

export default TreeNode;
