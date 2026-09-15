import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Button from '@ui/components/Button';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Radio from '@ui/components/Radio';
import RadioGroup from '@ui/components/RadioGroup';
import FormControlLabel from '@ui/components/FormControlLabel';
import Slider from '@ui/components/Slider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Stack from '@ui/components/Stack';
import Button from '@ui/components/Button';

// 水平间距
<Stack direction="row" spacing={2}>
  <Button variant="contained">按钮1</Button>
  <Button variant="contained">按钮2</Button>
  <Button variant="contained">按钮3</Button>
</Stack>`;

const verticalCode = `import Stack from '@ui/components/Stack';
import Button from '@ui/components/Button';

// 垂直间距
<Stack direction="column" spacing={2}>
  <Button variant="contained">按钮1</Button>
  <Button variant="outlined">按钮2</Button>
  <Button variant="text">按钮3</Button>
</Stack>`;

const customCode = `import Stack from '@ui/components/Stack';
import Button from '@ui/components/Button';

// 自定义间距大小
<Stack direction="row" spacing={4}>
  <Button variant="contained">间距=4</Button>
  <Button variant="contained">间距=4</Button>
  <Button variant="contained">间距=4</Button>
</Stack>

<Stack direction="row" spacing={1}>
  <Button variant="outlined">间距=1</Button>
  <Button variant="outlined">间距=1</Button>
  <Button variant="outlined">间距=1</Button>
</Stack>`;

const dividerCode = `import Stack from '@ui/components/Stack';
import Button from '@ui/components/Button';
import Divider from '@ui/components/Divider';

// 带分割线的间距
<Stack
  direction="row"
  spacing={2}
  divider={<Divider orientation="vertical" flexItem />}
>
  <Button variant="text">选项一</Button>
  <Button variant="text">选项二</Button>
  <Button variant="text">选项三</Button>
</Stack>`;

const propsData = [
  { name: 'direction', type: "'row' | 'row-reverse' | 'column' | 'column-reverse'", default: "'row'", description: '排列方向' },
  { name: 'spacing', type: 'number | string', default: '0', description: '子元素间距（单位基于主题 8px 基数）' },
  { name: 'divider', type: 'ReactNode', default: '-', description: '子元素之间插入的分割元素' },
  { name: 'alignItems', type: "'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'", default: "'stretch'", description: '交叉轴对齐方式' },
  { name: 'flexWrap', type: "'nowrap' | 'wrap' | 'wrap-reverse'", default: "'nowrap'", description: '是否换行' },
];

export default function SpaceDoc() {
  const [spacing, setSpacing] = useState(2);
  const [direction, setDirection] = useState('row');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="space-title">
        Space 间距
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        设置组件之间的间距，避免手动添加 margin。基于 Stack 组件实现，支持水平和垂直方向的间距控制。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Stack from '@ui/components/Stack'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="水平排列组件并设置间距。" code={basicCode}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">按钮1</Button>
          <Button variant="contained">按钮2</Button>
          <Button variant="contained">按钮3</Button>
        </Stack>
      </DemoBlock>

      <DemoBlock title="垂直间距" description="设置 direction='column' 实现垂直排列。" code={verticalCode}>
        <Stack spacing={2}>
          <Box>
            <RadioGroup row value={direction} onChange={(e) => setDirection(e.target.value)}>
              <FormControlLabel value="row" control={<Radio size="small" />} label="水平" />
              <FormControlLabel value="column" control={<Radio size="small" />} label="垂直" />
            </RadioGroup>
          </Box>
          <Stack direction={direction} spacing={2} alignItems="flex-start">
            <Button variant="contained">按钮1</Button>
            <Button variant="outlined">按钮2</Button>
            <Button variant="text">按钮3</Button>
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock title="自定义间距大小" description="通过 spacing 属性控制间距大小，数值基于 8px 基数。" code={customCode}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>spacing: {spacing}（{spacing * 8}px）</Typography>
            <Slider
              value={spacing}
              onChange={(e, v) => setSpacing(v)}
              min={0}
              max={6}
              step={0.5}
              sx={{ width: 240 }}
            />
          </Box>
          <Stack direction="row" spacing={spacing}>
            <Button variant="contained">按钮</Button>
            <Button variant="contained">按钮</Button>
            <Button variant="contained">按钮</Button>
          </Stack>
        </Box>
      </DemoBlock>

      <DemoBlock title="带分割线" description="通过 divider 属性在元素之间插入分割线或自定义分隔元素。" code={dividerCode}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          divider={<Divider orientation="vertical" sx={{ height: 12 }} />}
        >
          <Button variant="text">选项一</Button>
          <Button variant="text">选项二</Button>
          <Button variant="text">选项三</Button>
        </Stack>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
