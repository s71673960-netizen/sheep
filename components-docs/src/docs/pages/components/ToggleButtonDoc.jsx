import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import ToggleButton from '@ui/components/ToggleButton';
import ToggleButtonGroup from '@ui/components/ToggleButtonGroup';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import ToggleButton from '@ui/components/ToggleButton';
import ToggleButtonGroup from '@ui/components/ToggleButtonGroup';

const [alignment, setAlignment] = useState('left');

<ToggleButtonGroup
  value={alignment}
  exclusive
  onChange={(e, val) => { if (val !== null) setAlignment(val); }}
>
  <ToggleButton value="left">左对齐</ToggleButton>
  <ToggleButton value="center">居中</ToggleButton>
  <ToggleButton value="right">右对齐</ToggleButton>
</ToggleButtonGroup>`;

const multiCode = `const [formats, setFormats] = useState(['bold']);

<ToggleButtonGroup
  value={formats}
  onChange={(e, val) => setFormats(val)}
>
  <ToggleButton value="bold">加粗</ToggleButton>
  <ToggleButton value="italic">斜体</ToggleButton>
  <ToggleButton value="underline">下划线</ToggleButton>
</ToggleButtonGroup>`;

const sizeCode = `<ToggleButtonGroup size="small" exclusive defaultValue="a">
  <ToggleButton value="a">小</ToggleButton>
  <ToggleButton value="b">尺寸</ToggleButton>
</ToggleButtonGroup>
<ToggleButtonGroup size="medium" exclusive defaultValue="a">
  <ToggleButton value="a">中</ToggleButton>
  <ToggleButton value="b">尺寸</ToggleButton>
</ToggleButtonGroup>
<ToggleButtonGroup size="large" exclusive defaultValue="a">
  <ToggleButton value="a">大</ToggleButton>
  <ToggleButton value="b">尺寸</ToggleButton>
</ToggleButtonGroup>`;

const verticalCode = `const [value, setValue] = useState('top');

<ToggleButtonGroup
  orientation="vertical"
  value={value}
  exclusive
  onChange={(e, val) => { if (val !== null) setValue(val); }}
>
  <ToggleButton value="top">顶部</ToggleButton>
  <ToggleButton value="middle">中间</ToggleButton>
  <ToggleButton value="bottom">底部</ToggleButton>
</ToggleButtonGroup>`;

const propsData = [
  { name: 'value', type: 'any | any[]', default: '-', description: '当前选中值（受控）' },
  { name: 'onChange', type: '(event, value) => void', default: '-', description: '选中值变化回调' },
  { name: 'exclusive', type: 'boolean', default: 'false', description: '是否为互斥模式（单选）' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '排列方向' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '尺寸' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
];

export default function ToggleButtonDoc() {
  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(['bold']);
  const [vertical, setVertical] = useState('top');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="togglebutton-title">
        ToggleButton 切换按钮
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        切换按钮组用于在多个互相关联的选项中进行选择，支持单选和多选模式。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import ToggleButton from '@ui/components/ToggleButton'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="exclusive 模式下仅允许单选。" code={basicCode}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(e, val) => { if (val !== null) setAlignment(val); }}
        >
          <ToggleButton value="left">左对齐</ToggleButton>
          <ToggleButton value="center">居中</ToggleButton>
          <ToggleButton value="right">右对齐</ToggleButton>
        </ToggleButtonGroup>
      </DemoBlock>

      <DemoBlock title="多选" description="不设置 exclusive 即可多选。" code={multiCode}>
        <ToggleButtonGroup
          value={formats}
          onChange={(e, val) => setFormats(val)}
        >
          <ToggleButton value="bold">加粗</ToggleButton>
          <ToggleButton value="italic">斜体</ToggleButton>
          <ToggleButton value="underline">下划线</ToggleButton>
        </ToggleButtonGroup>
      </DemoBlock>

      <DemoBlock title="尺寸" description="支持 small、medium、large 三种尺寸。" code={sizeCode}>
        <Stack direction="row" spacing={2} alignItems="center">
          <ToggleButtonGroup size="small" exclusive value="a">
            <ToggleButton value="a">小</ToggleButton>
            <ToggleButton value="b">尺寸</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="medium" exclusive value="a">
            <ToggleButton value="a">中</ToggleButton>
            <ToggleButton value="b">尺寸</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="large" exclusive value="a">
            <ToggleButton value="a">大</ToggleButton>
            <ToggleButton value="b">尺寸</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </DemoBlock>

      <DemoBlock title="垂直方向" description="设置 orientation='vertical' 切换为纵向排列。" code={verticalCode}>
        <ToggleButtonGroup
          orientation="vertical"
          value={vertical}
          exclusive
          onChange={(e, val) => { if (val !== null) setVertical(val); }}
        >
          <ToggleButton value="top">顶部</ToggleButton>
          <ToggleButton value="middle">中间</ToggleButton>
          <ToggleButton value="bottom">底部</ToggleButton>
        </ToggleButtonGroup>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
