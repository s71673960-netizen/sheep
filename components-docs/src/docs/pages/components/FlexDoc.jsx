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

// 水平布局
<Stack direction="row" spacing={2}>
  <div style={{ width: '25%', height: 54, background: '#038247' }} />
  <div style={{ width: '25%', height: 54, background: '#038247bf' }} />
  <div style={{ width: '25%', height: 54, background: '#038247' }} />
  <div style={{ width: '25%', height: 54, background: '#038247bf' }} />
</Stack>

// 垂直布局
<Stack direction="column" spacing={2}>
  <div style={{ height: 54, background: '#038247' }} />
  <div style={{ height: 54, background: '#038247bf' }} />
  <div style={{ height: 54, background: '#038247' }} />
</Stack>`;

const alignCode = `import Stack from '@ui/components/Stack';

<Stack
  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={2}
  sx={{ height: 120, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
>
  <Button variant="contained">Primary</Button>
  <Button variant="contained">Primary</Button>
  <Button variant="contained">Primary</Button>
  <Button variant="contained">Primary</Button>
</Stack>`;

const gapCode = `import Stack from '@ui/components/Stack';

// 预设间距
<Stack direction="row" spacing={1}>...</Stack>  // 8px
<Stack direction="row" spacing={2}>...</Stack>  // 16px
<Stack direction="row" spacing={3}>...</Stack>  // 24px

// 自定义间距
<Stack direction="row" spacing={0.5}>...</Stack>  // 4px`;

const wrapCode = `import Stack from '@ui/components/Stack';

<Stack direction="row" flexWrap="wrap" spacing={1}>
  {Array.from({ length: 24 }).map((_, i) => (
    <Button key={i} variant="contained">Button</Button>
  ))}
</Stack>`;

const combineCode = `import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';

<Stack direction="row" justifyContent="space-between" sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 3 }}>
  <Box sx={{ width: 200, height: 160, bgcolor: 'background.soft', borderRadius: 1 }} />
  <Stack direction="column" justifyContent="space-between" alignItems="flex-end" sx={{ flex: 1, pl: 3 }}>
    <Typography variant="h6">弹性布局组合示例</Typography>
    <Button variant="contained">了解更多</Button>
  </Stack>
</Stack>`;

const propsData = [
  { name: 'direction', type: "'row' | 'row-reverse' | 'column' | 'column-reverse'", default: "'row'", description: 'flex 主轴方向' },
  { name: 'spacing', type: 'number | string', default: '0', description: '子元素间距（单位基于主题 8px 基数）' },
  { name: 'justifyContent', type: "'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'", default: "'flex-start'", description: '主轴对齐方式' },
  { name: 'alignItems', type: "'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'", default: "'stretch'", description: '交叉轴对齐方式' },
  { name: 'flexWrap', type: "'nowrap' | 'wrap' | 'wrap-reverse'", default: "'nowrap'", description: '是否换行' },
  { name: 'divider', type: 'ReactNode', default: '-', description: '子元素之间的分割元素' },
  { name: 'component', type: 'elementType', default: "'div'", description: '渲染的根元素类型' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式' },
];

export default function FlexDoc() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('flex-start');
  const [gapSize, setGapSize] = useState(2);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="flex-title">
        Flex 弹性布局
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        用于对齐的弹性布局容器。适合设置元素之间的间距以及各种水平、垂直对齐方式。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Stack from '@ui/components/Stack'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本布局" description="通过 direction 控制主轴方向，支持水平和垂直布局。" code={basicCode}>
        <Stack spacing={3}>
          <Box>
            <RadioGroup row value={direction} onChange={(e) => setDirection(e.target.value)}>
              <FormControlLabel value="row" control={<Radio size="small" />} label="horizontal" />
              <FormControlLabel value="column" control={<Radio size="small" />} label="vertical" />
            </RadioGroup>
          </Box>
          <Stack direction={direction} spacing={1}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: direction === 'row' ? '25%' : '100%',
                  height: 54,
                  bgcolor: i % 2 ? 'primary.main' : 'primary.dark',
                  borderRadius: 1,
                  opacity: i % 2 ? 0.75 : 1,
                }}
              />
            ))}
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock title="对齐方式" description="通过 justifyContent 和 alignItems 设置主轴和交叉轴的对齐方式。" code={alignCode}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>justifyContent：</Typography>
            <RadioGroup row value={justify} onChange={(e) => setJustify(e.target.value)} sx={{ flexWrap: 'wrap', gap: 0 }}>
              {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio size="small" />} label={opt} sx={{ mr: 2 }} />
              ))}
            </RadioGroup>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>alignItems：</Typography>
            <RadioGroup row value={align} onChange={(e) => setAlign(e.target.value)}>
              {['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio size="small" />} label={opt} sx={{ mr: 2 }} />
              ))}
            </RadioGroup>
          </Box>
          <Stack
            direction="row"
            justifyContent={justify}
            alignItems={align}
            spacing={1}
            sx={{
              height: 120,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
            }}
          >
            <Button variant="contained" sx={{ height: 32 }}>Primary</Button>
            <Button variant="contained" sx={{ height: 40 }}>Primary</Button>
            <Button variant="contained" sx={{ height: 36 }}>Primary</Button>
            <Button variant="contained" sx={{ height: 28 }}>Primary</Button>
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock title="设置间隙" description="使用 spacing 设置元素之间的间距。数值基于 8px 基数（1=8px, 2=16px, 3=24px）。" code={gapCode}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>spacing: {gapSize}（{gapSize * 8}px）</Typography>
            <Slider
              value={gapSize}
              onChange={(e, v) => setGapSize(v)}
              min={0}
              max={6}
              step={0.5}
              sx={{ width: 240 }}
            />
          </Box>
          <Stack direction="row" spacing={gapSize}>
            <Button variant="contained">Primary</Button>
            <Button variant="outlined">Default</Button>
            <Button variant="dashed">Dashed</Button>
            <Button variant="text">Text</Button>
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock title="自动换行" description="设置 flexWrap='wrap' 实现自动换行。" code={wrapCode}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <Button key={i} variant="contained">Button</Button>
          ))}
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
