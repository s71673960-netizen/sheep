import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Tooltip from '@ui/components/Tooltip';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Tooltip from '@ui/components/Tooltip';
import Button from '@ui/components/Button';

<Tooltip title="这是提示信息">
  <Button variant="outlined">鼠标悬停</Button>
</Tooltip>`;

const placementCode = `<Tooltip title="上方" placement="top">
  <Button variant="outlined">Top</Button>
</Tooltip>
<Tooltip title="下方" placement="bottom">
  <Button variant="outlined">Bottom</Button>
</Tooltip>
<Tooltip title="左侧" placement="left">
  <Button variant="outlined">Left</Button>
</Tooltip>
<Tooltip title="右侧" placement="right">
  <Button variant="outlined">Right</Button>
</Tooltip>`;

const arrowCode = `<Tooltip title="带箭头的提示" arrow>
  <Button variant="outlined">带箭头</Button>
</Tooltip>`;

const propsData = [
  { name: 'title', type: 'ReactNode', default: '-', description: '提示文字内容' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | ...", default: "'bottom'", description: '提示框位置' },
  { name: 'arrow', type: 'boolean', default: 'false', description: '是否显示箭头' },
  { name: 'open', type: 'boolean', default: '-', description: '手动控制显示/隐藏' },
];

export default function TooltipDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="tooltip-title">
        Tooltip 文字提示
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        文字提示用于在鼠标悬停时展示简短的提示信息。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Tooltip from '@ui/components/Tooltip'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="鼠标悬停在元素上时显示提示信息。" code={basicCode}>
        <Tooltip title="这是提示信息">
          <Button variant="outlined">鼠标悬停</Button>
        </Tooltip>
      </DemoBlock>

      <DemoBlock title="位置" description="提示框可以出现在元素的不同方向。" code={placementCode}>
        <Stack direction="row" spacing={2}>
          <Tooltip title="上方" placement="top">
            <Button variant="outlined">Top</Button>
          </Tooltip>
          <Tooltip title="下方" placement="bottom">
            <Button variant="outlined">Bottom</Button>
          </Tooltip>
          <Tooltip title="左侧" placement="left">
            <Button variant="outlined">Left</Button>
          </Tooltip>
          <Tooltip title="右侧" placement="right">
            <Button variant="outlined">Right</Button>
          </Tooltip>
        </Stack>
      </DemoBlock>

      <DemoBlock title="箭头" description="使用 arrow 属性显示指向元素的箭头。" code={arrowCode}>
        <Tooltip title="带箭头的提示" arrow>
          <Button variant="outlined">带箭头</Button>
        </Tooltip>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
