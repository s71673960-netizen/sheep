import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Select from '@ui/components/Select';
import MenuItem from '@ui/components/MenuItem';
import ListSubheader from '@ui/components/ListSubheader';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Chip from '@ui/components/Chip';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Select from '@ui/components/Select';
import MenuItem from '@ui/components/MenuItem';

const [value, setValue] = useState('');

<Select
  value={value}
  onChange={(e) => setValue(e.target.value)}
  displayEmpty
  renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>请选择</span> : { option1: '选项一', option2: '选项二', option3: '选项三' }[v]}
  sx={{ minWidth: 200 }}
>
  <MenuItem value="option1">选项一</MenuItem>
  <MenuItem value="option2">选项二</MenuItem>
  <MenuItem value="option3">选项三</MenuItem>
  <MenuItem value="disabled" disabled>禁用选项</MenuItem>
</Select>`;

const sizeCode = `<Select displayEmpty defaultValue="" size="small" sx={{ minWidth: 160 }}
  renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>Small</span> : v === 'a' ? '选项 A' : '选项 B'}>
  <MenuItem value="a">选项 A</MenuItem>
  <MenuItem value="b">选项 B</MenuItem>
</Select>
<Select displayEmpty defaultValue="" sx={{ minWidth: 160 }}
  renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>Medium</span> : v === 'a' ? '选项 A' : '选项 B'}>
  <MenuItem value="a">选项 A</MenuItem>
  <MenuItem value="b">选项 B</MenuItem>
</Select>
<Select displayEmpty defaultValue="" size="large" sx={{ minWidth: 160 }}
  renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>Large</span> : v === 'a' ? '选项 A' : '选项 B'}>
  <MenuItem value="a">选项 A</MenuItem>
  <MenuItem value="b">选项 B</MenuItem>
</Select>`;

const multipleCode = `const [values, setValues] = useState([]);

<Select
  multiple
  value={values}
  onChange={(e) => setValues(e.target.value)}
  displayEmpty
  sx={{ minWidth: 300 }}
  renderValue={(selected) =>
    selected.length === 0
      ? '请选择选项'
      : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((v) => <Chip key={v} label={v} size="small" color="primary" />)}
        </Box>
  }
>
  <MenuItem value="option1">选项一</MenuItem>
  <MenuItem value="option2">选项二</MenuItem>
  <MenuItem value="option3">选项三</MenuItem>
  <MenuItem value="option4">选项四</MenuItem>
</Select>`;

const groupCode = `<Select displayEmpty defaultValue="" sx={{ minWidth: 200 }}
  renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>分组选择</span> : v}>
  <ListSubheader>分组一</ListSubheader>
  <MenuItem value="option1">选项一</MenuItem>
  <MenuItem value="option2">选项二</MenuItem>
  <ListSubheader>分组二</ListSubheader>
  <MenuItem value="option3">选项三</MenuItem>
  <MenuItem value="option4">选项四</MenuItem>
</Select>`;

const disabledCode = `<Select displayEmpty defaultValue="option1" disabled sx={{ minWidth: 200 }}>
  <MenuItem value="option1">选项一</MenuItem>
  <MenuItem value="option2">选项二</MenuItem>
</Select>`;

const linkedCode = `const [group, setGroup] = useState('group1');
const [item, setItem] = useState('item1');
const optionData = {
  group1: [{ value: 'item1', label: '子选项一' }, { value: 'item2', label: '子选项二' }],
  group2: [{ value: 'item3', label: '子选项三' }, { value: 'item4', label: '子选项四' }],
};

<Stack direction="row" spacing={2}>
  <Select value={group} sx={{ minWidth: 140 }} onChange={(e) => {
    setGroup(e.target.value);
    setItem(optionData[e.target.value][0].value);
  }}>
    <MenuItem value="group1">分组一</MenuItem>
    <MenuItem value="group2">分组二</MenuItem>
  </Select>
  <Select value={item} sx={{ minWidth: 140 }} onChange={(e) => setItem(e.target.value)}>
    {optionData[group].map((option) => (
      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
    ))}
  </Select>
</Stack>`;

const propsData = [
  { name: 'value', type: 'any', default: '-', description: '当前选中的值（受控）' },
  { name: 'defaultValue', type: 'any', default: '-', description: '默认选中的值' },
  { name: 'onChange', type: '(event) => void', default: '-', description: '选中值变化时的回调' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许多选' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '尺寸：32px / 36px / 40px' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'displayEmpty', type: 'boolean', default: 'false', description: '值为空时是否显示占位' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: '是否占满宽度' },
  { name: 'renderValue', type: '(value) => ReactNode', default: '-', description: '自定义渲染选中值' },
  { name: 'variant', type: "'outlined' | 'filled' | 'standard'", default: "'outlined'", description: '外观变体' },
  { name: 'MenuProps', type: 'object', default: '-', description: '传递给下拉菜单的 props' },
];

export default function SelectDoc() {
  const [value, setValue] = useState('');
  const [multiValues, setMultiValues] = useState([]);
  const [group, setGroup] = useState('group1');
  const [item, setItem] = useState('item1');

  const optionData = {
    group1: [{ value: 'item1', label: '子选项一' }, { value: 'item2', label: '子选项二' }, { value: 'item3', label: '子选项三' }],
    group2: [{ value: 'item4', label: '子选项四' }, { value: 'item5', label: '子选项五' }, { value: 'item6', label: '子选项六' }],
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="select-title">
        Select 选择器
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        下拉选择器。弹出一个下拉菜单给用户选择操作，用于代替原生的选择器。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Select from '@ui/components/Select'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本使用" description="基本使用，支持禁用选项。" code={basicCode}>
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          displayEmpty
          renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>请选择</span> : { option1: '选项一', option2: '选项二', option3: '选项三' }[v]}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="option1">选项一</MenuItem>
          <MenuItem value="option2">选项二</MenuItem>
          <MenuItem value="option3">选项三</MenuItem>
          <MenuItem value="disabled" disabled>禁用选项</MenuItem>
        </Select>
      </DemoBlock>

      <DemoBlock title="多选" description="多选模式，结合 Chip 展示已选标签。" code={multipleCode}>
        <Select
          multiple
          value={multiValues}
          onChange={(e) => setMultiValues(e.target.value)}
          displayEmpty
          sx={{ minWidth: 300 }}
          renderValue={(selected) =>
            selected.length === 0
              ? '请选择选项'
              : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((v) => <Chip key={v} label={v} size="small" color="primary" />)}
                </Box>
          }
        >
          <MenuItem value="option1">选项一</MenuItem>
          <MenuItem value="option2">选项二</MenuItem>
          <MenuItem value="option3">选项三</MenuItem>
          <MenuItem value="option4">选项四</MenuItem>
        </Select>
      </DemoBlock>

      <DemoBlock title="分组" description="使用 ListSubheader 对选项进行分组。" code={groupCode}>
        <Select displayEmpty defaultValue="" sx={{ minWidth: 200 }}
          renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>分组选择</span> : v}>
          <ListSubheader>分组一</ListSubheader>
          <MenuItem value="option1">选项一</MenuItem>
          <MenuItem value="option2">选项二</MenuItem>
          <ListSubheader>分组二</ListSubheader>
          <MenuItem value="option3">选项三</MenuItem>
          <MenuItem value="option4">选项四</MenuItem>
        </Select>
      </DemoBlock>

      <DemoBlock title="尺寸" description="支持 small、medium 和 large 三种尺寸，高度分别为 32px、36px 和 40px。" code={sizeCode}>
        <Stack direction="row" spacing={2}>
          <Select displayEmpty defaultValue="" size="small" sx={{ minWidth: 160 }}
            renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>Small</span> : v === 'a' ? '选项 A' : '选项 B'}>
            <MenuItem value="a">选项 A</MenuItem>
            <MenuItem value="b">选项 B</MenuItem>
          </Select>
          <Select displayEmpty defaultValue="" sx={{ minWidth: 160 }}
            renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>Medium</span> : v === 'a' ? '选项 A' : '选项 B'}>
            <MenuItem value="a">选项 A</MenuItem>
            <MenuItem value="b">选项 B</MenuItem>
          </Select>
          <Select displayEmpty defaultValue="" size="large" sx={{ minWidth: 160 }}
            renderValue={(v) => v === '' ? <span style={{ opacity: 0.55 }}>Large</span> : v === 'a' ? '选项 A' : '选项 B'}>
            <MenuItem value="a">选项 A</MenuItem>
            <MenuItem value="b">选项 B</MenuItem>
          </Select>
        </Stack>
      </DemoBlock>

      <DemoBlock title="联动" description="两级联动选择器。" code={linkedCode}>
        <Stack direction="row" spacing={2}>
          <Select
            value={group}
            sx={{ minWidth: 140 }}
            onChange={(e) => {
              setGroup(e.target.value);
              setItem(optionData[e.target.value][0].value);
            }}
          >
            <MenuItem value="group1">分组一</MenuItem>
            <MenuItem value="group2">分组二</MenuItem>
          </Select>
          <Select value={item} sx={{ minWidth: 140 }} onChange={(e) => setItem(e.target.value)}>
            {optionData[group].map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </Stack>
      </DemoBlock>

      <DemoBlock title="禁用状态" description="设置 disabled 禁用选择器。" code={disabledCode}>
        <Select displayEmpty defaultValue="option1" disabled sx={{ minWidth: 200 }}>
          <MenuItem value="option1">选项一</MenuItem>
          <MenuItem value="option2">选项二</MenuItem>
        </Select>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
