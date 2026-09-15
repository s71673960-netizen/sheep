import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Tabs from '@ui/components/Tabs';
import Tab from '@ui/components/Tab';
import CapsuleTabs from '@ui/components/CapsuleTabs';
import OutlinedTabs from '@ui/components/OutlinedTabs';
import SegmentedControl from '@ui/components/SegmentedControl';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Stack from '@ui/components/Stack';
import Radio from '@ui/components/Radio';
import RadioGroup from '@ui/components/RadioGroup';
import FormControlLabel from '@ui/components/FormControlLabel';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Tabs from '@ui/components/Tabs';
import Tab from '@ui/components/Tab';

const [value, setValue] = useState(0);

<Tabs value={value} onChange={(e, v) => setValue(v)}>
  <Tab label="标签一" />
  <Tab label="标签二" />
  <Tab label="标签三" />
</Tabs>`;

const disabledCode = `<Tabs value={value} onChange={(e, v) => setValue(v)}>
  <Tab label="标签一" />
  <Tab label="标签二" disabled />
  <Tab label="标签三" />
</Tabs>`;

const centeredCode = `<Tabs value={value} onChange={(e, v) => setValue(v)} centered>
  <Tab label="标签一" />
  <Tab label="标签二" />
  <Tab label="标签三" />
</Tabs>`;

const scrollableCode = `<Tabs value={value} onChange={(e, v) => setValue(v)} variant="scrollable" scrollButtons="auto">
  <Tab label="标签一" />
  <Tab label="标签二" />
  <Tab label="标签三" />
  <Tab label="标签四" />
  <Tab label="标签五" />
  <Tab label="标签六" />
  <Tab label="标签七" />
  <Tab label="标签八" />
</Tabs>`;

const positionCode = `// 垂直方向
<Tabs orientation="vertical" value={value} onChange={(e, v) => setValue(v)}>
  <Tab label="标签一" />
  <Tab label="标签二" />
  <Tab label="标签三" />
</Tabs>`;

const capsuleCode = `import CapsuleTabs from '@ui/components/CapsuleTabs';
import Stack from '@ui/components/Stack';

const [value, setValue] = useState('first');

<Stack spacing={2} alignItems="flex-start">
  <CapsuleTabs
    value={value}
    onChange={(val) => setValue(val)}
    options={[
      { value: 'first', label: '选项一' },
      { value: 'second', label: '选项二' },
      { value: 'third', label: '选项三' },
    ]}
  />
  <CapsuleTabs
    size="small"
    defaultValue="first"
    options={[
      { value: 'first', label: '选项一' },
      { value: 'second', label: '选项二' },
      { value: 'third', label: '禁用选项', disabled: true },
    ]}
  />
</Stack>`;

const outlinedPillCode = `import OutlinedTabs from '@ui/components/OutlinedTabs';
import Stack from '@ui/components/Stack';

const [value, setValue] = useState('first');

<Stack spacing={2} alignItems="flex-start">
  <OutlinedTabs
    value={value}
    onChange={(val) => setValue(val)}
    options={[
      { value: 'first', label: '选项一' },
      { value: 'second', label: '选项二' },
      { value: 'third', label: '选项三' },
    ]}
  />
  <OutlinedTabs
    size="small"
    defaultValue="first"
    options={[
      { value: 'first', label: '选项一' },
      { value: 'second', label: '选项二' },
      { value: 'third', label: '禁用选项', disabled: true },
    ]}
  />
</Stack>`;

const segmentedCode = `import SegmentedControl from '@ui/components/SegmentedControl';

<SegmentedControl
  defaultValue="first"
  options={[
    { value: 'first', label: '选项一' },
    { value: 'second', label: '选项二' },
    { value: 'third', label: '选项三' },
  ]}
/>`;

const propsData = [
  { name: 'value', type: 'any', default: '-', description: '当前选中值' },
  { name: 'onChange', type: '(event, value) => void', default: '-', description: '切换回调' },
  {
    name: 'variant',
    type: "'standard' | 'scrollable' | 'fullWidth'",
    default: "'standard'",
    description: '展示模式',
  },
  { name: 'centered', type: 'boolean', default: 'false', description: '是否居中' },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: '标签方向',
  },
  {
    name: 'textColor',
    type: "'primary' | 'secondary' | 'inherit'",
    default: "'primary'",
    description: '文字颜色',
  },
  {
    name: 'indicatorColor',
    type: "'primary' | 'secondary'",
    default: "'primary'",
    description: '指示器颜色',
  },
  {
    name: 'scrollButtons',
    type: "'auto' | true | false",
    default: "'auto'",
    description: '滚动按钮显示方式',
  },
];

const tabPropsData = [
  { name: 'label', type: 'ReactNode', default: '-', description: '标签文字' },
  { name: 'icon', type: 'ReactElement', default: '-', description: '标签图标' },
  {
    name: 'iconPosition',
    type: "'top' | 'bottom' | 'start' | 'end'",
    default: "'top'",
    description: '图标位置',
  },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'value', type: 'any', default: '索引', description: '标签值' },
  { name: 'wrapped', type: 'boolean', default: 'false', description: '标签文字是否换行' },
];

const selectionPropsData = [
  { name: 'value', type: 'string', default: '-', description: '当前选中值（受控）' },
  {
    name: 'defaultValue',
    type: 'string',
    default: '第一项',
    description: '默认选中值（非受控）',
  },
  { name: 'onChange', type: '(value: string) => void', default: '-', description: '切换回调' },
  {
    name: 'options',
    type: 'Array<{ value, label, disabled? }>',
    default: '[]',
    description: '选项列表',
  },
  { name: 'size', type: "'small' | 'medium'", default: "'medium'", description: '尺寸' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式' },
];

export default function TabsDoc() {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(0);
  const [val4, setVal4] = useState(0);
  const [val5, setVal5] = useState(0);
  const [val6, setVal6] = useState('first');
  const [val7, setVal7] = useState('first');
  const [position, setPosition] = useState('horizontal');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="tabs-title">
        Tabs 标签页
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        选项卡切换组件。提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Tabs from '@ui/components/Tabs'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock
        title="基本用法"
        description="默认选项卡样式，下划线指示器跟随选中项滑动。"
        code={basicCode}
      >
        <Tabs value={val1} onChange={(e, v) => setVal1(v)}>
          <Tab label="标签一" />
          <Tab label="标签二" />
          <Tab label="标签三" />
        </Tabs>
      </DemoBlock>

      <DemoBlock
        title="胶囊型"
        description="选中项以胶囊形状填充背景高亮，适合筛选类场景。使用 CapsuleTabs 组件。"
        code={capsuleCode}
      >
        <Stack spacing={2} alignItems="flex-start">
          <CapsuleTabs
            value={val6}
            onChange={(val) => setVal6(val)}
            options={[
              { value: 'first', label: '选项一' },
              { value: 'second', label: '选项二' },
              { value: 'third', label: '选项三' },
            ]}
          />
          <CapsuleTabs
            size="small"
            defaultValue="first"
            options={[
              { value: 'first', label: '选项一' },
              { value: 'second', label: '选项二' },
              { value: 'third', label: '禁用选项', disabled: true },
            ]}
          />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="圆角描边型"
        description="大圆角描边卡片式标签，选中项填充背景色。使用 OutlinedTabs 组件。"
        code={outlinedPillCode}
      >
        <Stack spacing={2} alignItems="flex-start">
          <OutlinedTabs
            value={val7}
            onChange={(val) => setVal7(val)}
            options={[
              { value: 'first', label: '选项一' },
              { value: 'second', label: '选项二' },
              { value: 'third', label: '选项三' },
            ]}
          />
          <OutlinedTabs
            size="small"
            defaultValue="first"
            options={[
              { value: 'first', label: '选项一' },
              { value: 'second', label: '选项二' },
              { value: 'third', label: '禁用选项', disabled: true },
            ]}
          />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="分段选择"
        description="方形分段选择器，适合在少量互斥选项之间切换。使用 SegmentedControl 组件。"
        code={segmentedCode}
      >
        <SegmentedControl
          defaultValue="first"
          options={[
            { value: 'first', label: '选项一' },
            { value: 'second', label: '选项二' },
            { value: 'third', label: '选项三' },
          ]}
        />
      </DemoBlock>

      <DemoBlock title="禁用" description="禁用某一项标签。" code={disabledCode}>
        <Tabs value={val2} onChange={(e, v) => setVal2(v)}>
          <Tab label="标签一" />
          <Tab label="标签二" disabled />
          <Tab label="标签三" />
        </Tabs>
      </DemoBlock>

      <DemoBlock title="居中" description="标签居中展示。" code={centeredCode}>
        <Tabs value={val3} onChange={(e, v) => setVal3(v)} centered>
          <Tab label="标签一" />
          <Tab label="标签二" />
          <Tab label="标签三" />
        </Tabs>
      </DemoBlock>

      <DemoBlock
        title="滚动"
        description="标签数量较多时，可以滚动并显示左右切换箭头。"
        code={scrollableCode}
      >
        <Box sx={{ maxWidth: 400 }}>
          <Tabs value={val4} onChange={(e, v) => setVal4(v)} variant="scrollable" scrollButtons="auto">
            <Tab label="标签一" />
            <Tab label="标签二" />
            <Tab label="标签三" />
            <Tab label="标签四" />
            <Tab label="标签五" />
            <Tab label="标签六" />
            <Tab label="标签七" />
            <Tab label="标签八" />
          </Tabs>
        </Box>
      </DemoBlock>

      <DemoBlock title="位置" description="支持水平和垂直方向的标签排列。" code={positionCode}>
        <Stack spacing={2}>
          <RadioGroup
            row
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              setVal5(0);
            }}
          >
            <FormControlLabel value="horizontal" control={<Radio size="small" />} label="水平" />
            <FormControlLabel value="vertical" control={<Radio size="small" />} label="垂直" />
          </RadioGroup>
          <Box sx={{ display: 'flex', height: position === 'vertical' ? 160 : 'auto' }}>
            <Tabs
              orientation={position}
              value={val5}
              onChange={(e, v) => setVal5(v)}
            >
              <Tab label="标签一" />
              <Tab label="标签二" />
              <Tab label="标签三" />
            </Tabs>
          </Box>
        </Stack>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
        Tabs
      </Typography>
      <PropsTable data={propsData} />

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}>
        Tab
      </Typography>
      <PropsTable data={tabPropsData} />

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}>
        CapsuleTabs / OutlinedTabs / SegmentedControl
      </Typography>
      <PropsTable data={selectionPropsData} />
    </Box>
  );
}
