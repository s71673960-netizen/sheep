import React, { useState } from 'react';
import Tree from '@ui/components/Tree';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Switch from '@ui/components/Switch';
import FormControlLabel from '@ui/components/FormControlLabel';
import Stack from '@ui/components/Stack';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicTreeData = [
  {
    title: '节点一',
    key: '0-0',
    children: [
      {
        title: '子节点一',
        key: '0-0-0',
        children: [
          { title: '子项一', key: '0-0-0-0' },
          { title: '子项二', key: '0-0-0-1' },
        ],
      },
      {
        title: '子节点二',
        key: '0-0-1',
        children: [
          { title: '子项三', key: '0-0-1-0' },
          { title: '子项四', key: '0-0-1-1' },
        ],
      },
    ],
  },
  {
    title: '节点二',
    key: '0-1',
    children: [
      { title: '子节点三', key: '0-1-0' },
      { title: '子节点四', key: '0-1-1' },
    ],
  },
];

const disabledTreeData = [
  {
    title: '全部节点',
    key: 'd-0',
    children: [
      { title: '节点 A', key: 'd-0-0' },
      { title: '节点 B（禁用）', key: 'd-0-1', disabled: true },
      { title: '节点 C', key: 'd-0-2' },
    ],
  },
];

const basicCode = `import Tree from '@ui/components/Tree';

const treeData = [
  {
    title: '节点一',
    key: '0-0',
    children: [
      {
        title: '子节点一',
        key: '0-0-0',
        children: [
          { title: '子项一', key: '0-0-0-0' },
          { title: '子项二', key: '0-0-0-1' },
        ],
      },
      {
        title: '子节点二',
        key: '0-0-1',
        children: [
          { title: '子项三', key: '0-0-1-0' },
          { title: '子项四', key: '0-0-1-1' },
        ],
      },
    ],
  },
  {
    title: '节点二',
    key: '0-1',
    children: [
      { title: '子节点三', key: '0-1-0' },
      { title: '子节点四', key: '0-1-1' },
    ],
  },
];

<Tree
  treeData={treeData}
  defaultExpandedKeys={['0-0']}
  onSelect={(keys, info) => console.log('选中:', keys)}
/>`;

const checkableCode = `<Tree
  treeData={treeData}
  checkable
  defaultExpandedKeys={['0-0', '0-0-0']}
  onCheck={(keys, info) => console.log('勾选:', keys)}
/>`;

const controlledCode = `const [checkedKeys, setCheckedKeys] = useState(['0-0-0-0']);
const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0']);

<Tree
  treeData={treeData}
  checkable
  checkedKeys={checkedKeys}
  expandedKeys={expandedKeys}
  onCheck={(keys) => setCheckedKeys(keys)}
  onExpand={(keys) => setExpandedKeys(keys)}
/>`;

const lineCode = `<Tree
  treeData={treeData}
  showLine
  defaultExpandAll
/>`;

const disabledCode = `const treeData = [
  {
    title: '全部节点',
    key: 'd-0',
    children: [
      { title: '节点 A', key: 'd-0-0' },
      { title: '节点 B（禁用）', key: 'd-0-1', disabled: true },
      { title: '节点 C', key: 'd-0-2' },
    ],
  },
];

<Tree treeData={treeData} checkable defaultExpandAll />`;

const propsData = [
  { name: 'treeData', type: 'TreeDataNode[]', default: '[]', desc: '树形结构数据' },
  { name: 'checkable', type: 'boolean', default: 'false', desc: '节点前添加 Checkbox 复选框' },
  { name: 'checkedKeys', type: 'string[]', default: '-', desc: '受控：勾选的节点 key' },
  { name: 'defaultCheckedKeys', type: 'string[]', default: '[]', desc: '默认勾选的节点 key' },
  { name: 'checkStrictly', type: 'boolean', default: 'false', desc: '父子节点选中状态不再关联' },
  { name: 'expandedKeys', type: 'string[]', default: '-', desc: '受控：展开的节点 key' },
  { name: 'defaultExpandedKeys', type: 'string[]', default: '[]', desc: '默认展开的节点 key' },
  { name: 'defaultExpandAll', type: 'boolean', default: 'false', desc: '默认展开所有节点' },
  { name: 'selectedKeys', type: 'string[]', default: '-', desc: '受控：选中的节点 key' },
  { name: 'defaultSelectedKeys', type: 'string[]', default: '[]', desc: '默认选中的节点 key' },
  { name: 'multiple', type: 'boolean', default: 'false', desc: '支持多选' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: '全局禁用' },
  { name: 'showLine', type: 'boolean', default: 'false', desc: '是否显示连接线' },
  { name: 'showIcon', type: 'boolean', default: 'false', desc: '是否显示节点图标' },
  { name: 'switcherIcon', type: 'ReactNode', default: '-', desc: '自定义展开/折叠图标' },
  { name: 'onExpand', type: '(keys, info) => void', default: '-', desc: '展开/收起节点时的回调' },
  { name: 'onSelect', type: '(keys, info) => void', default: '-', desc: '点击选中节点时的回调' },
  { name: 'onCheck', type: '(keys, info) => void', default: '-', desc: '勾选节点时的回调' },
  { name: 'sx', type: 'object', default: '-', desc: '自定义样式' },
];

const nodePropsData = [
  { name: 'key', type: 'string', default: '-', desc: '节点唯一标识（必填）' },
  { name: 'title', type: 'ReactNode', default: '-', desc: '节点标题' },
  { name: 'children', type: 'TreeDataNode[]', default: '-', desc: '子节点数据' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用节点' },
  { name: 'disableCheckbox', type: 'boolean', default: 'false', desc: '禁用节点的 Checkbox' },
  { name: 'selectable', type: 'boolean', default: 'true', desc: '节点是否可选中' },
  { name: 'checkable', type: 'boolean', default: 'true', desc: '节点是否显示 Checkbox' },
  { name: 'icon', type: 'ReactNode', default: '-', desc: '自定义节点图标' },
  { name: 'isLeaf', type: 'boolean', default: '-', desc: '强制标记为叶子节点' },
];

function BasicDemo() {
  return (
    <Tree
      treeData={basicTreeData}
      defaultExpandedKeys={['0-0']}
      onSelect={(keys, info) => console.log('选中:', keys)}
      sx={{ width: 224 }}
    />
  );
}

function CheckableDemo() {
  return (
    <Tree
      treeData={basicTreeData}
      checkable
      defaultExpandedKeys={['0-0', '0-0-0']}
      onCheck={(keys, info) => console.log('勾选:', keys)}
      sx={{ width: 224 }}
    />
  );
}

function ControlledDemo() {
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0-0']);
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0']);

  return (
    <Tree
      treeData={basicTreeData}
      checkable
      checkedKeys={checkedKeys}
      expandedKeys={expandedKeys}
      onCheck={(keys) => setCheckedKeys(keys)}
      onExpand={(keys) => setExpandedKeys(keys)}
      sx={{ width: 224 }}
    />
  );
}

function LineDemo() {
  return (
    <Tree
      treeData={basicTreeData}
      showLine
      defaultExpandAll
      sx={{ width: 224 }}
    />
  );
}

function DisabledDemo() {
  return (
    <Tree
      treeData={disabledTreeData}
      checkable
      defaultExpandAll
      sx={{ width: 224 }}
    />
  );
}

export default function TreeDoc() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tree 树形控件
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        多层次的结构列表。用于展示文件夹、分类目录等具有层级关系的数据。
      </Typography>

      <DemoBlock title="基本用法" code={basicCode}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title="带 Checkbox" code={checkableCode}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          设置 checkable 后节点前会显示复选框，勾选父节点会自动联动子节点。
        </Typography>
        <CheckableDemo />
      </DemoBlock>

      <DemoBlock title="受控模式" code={controlledCode}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          通过 checkedKeys / expandedKeys 实现完全受控的树。
        </Typography>
        <ControlledDemo />
      </DemoBlock>

      <DemoBlock title="连接线" code={lineCode}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          设置 showLine 显示节点之间的连接线。
        </Typography>
        <LineDemo />
      </DemoBlock>

      <DemoBlock title="禁用节点" code={disabledCode}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          节点设置 disabled 后不可交互，勾选父节点时也不会联动禁用节点。
        </Typography>
        <DisabledDemo />
      </DemoBlock>

      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Tree Props
      </Typography>
      <PropsTable data={propsData} />

      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        TreeDataNode
      </Typography>
      <PropsTable data={nodePropsData} />
    </Box>
  );
}
