import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Button from '@ui/components/Button';
import IconButton from '@ui/components/IconButton';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import AddIcon from '@ui/components/icons/Add';
import DeleteIcon from '@ui/components/icons/Delete';
import SearchIcon from '@ui/components/icons/Search';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const typeCode = `import Button from '@ui/components/Button';

<Button variant="contained">实心按钮</Button>
<Button variant="outlined">描边按钮</Button>
<Button variant="dashed">虚线按钮</Button>
<Button variant="text">文本按钮</Button>
<Button variant="link">链接按钮</Button>`;

const sizeCode = `<Button variant="contained" size="small">Small</Button>
<Button variant="contained" size="medium">Medium</Button>
<Button variant="contained" size="large">Large</Button>`;

const iconCode = `import IconButton from '@ui/components/IconButton';
import SearchIcon from '@ui/components/icons/Search';
import AddIcon from '@ui/components/icons/Add';
import DeleteIcon from '@ui/components/icons/Delete';

<IconButton aria-label="搜索"><SearchIcon /></IconButton>
<Button variant="contained" startIcon={<AddIcon />}>前置图标</Button>
<Button variant="outlined" endIcon={<DeleteIcon />}>后置图标</Button>`;

const disabledCode = `<Button variant="outlined" disabled>禁用按钮</Button>`;

const blockCode = `<Button variant="contained" fullWidth>通栏按钮</Button>`;

const propsData = [
  { name: 'variant', type: "'contained' | 'outlined' | 'dashed' | 'text' | 'link'", default: "'outlined'", description: '按钮变体样式' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '按钮尺寸：32px / 36px / 40px' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'startIcon', type: 'ReactNode', default: '-', description: '放在文字前面的图标' },
  { name: 'endIcon', type: 'ReactNode', default: '-', description: '放在文字后面的图标' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: '是否占满宽度（Block 按钮）' },
  { name: 'href', type: 'string', default: '-', description: '点击跳转的链接，设置后渲染为 <a>' },
  { name: 'loading', type: 'boolean', default: 'false', description: '是否显示加载状态' },
  { name: 'onClick', type: '(event) => void', default: '-', description: '点击事件回调' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式' },
];

export default function ButtonDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="button-title">
        Button 按钮
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        按钮用于开始一个即时操作。标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的处理逻辑。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Button from '@ui/components/Button'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="按钮类型" description="每种视觉类型只展示一个示例。" code={typeCode}>
        <Button variant="contained">实心按钮</Button>
        <Button variant="outlined">描边按钮</Button>
        <Button variant="dashed">虚线按钮</Button>
        <Button variant="text">文本按钮</Button>
        <Button variant="link">链接按钮</Button>
      </DemoBlock>

      <DemoBlock title="尺寸" description="提供 small、medium、large 三种尺寸，高度分别为 32px、36px 和 40px。" code={sizeCode}>
        <Button variant="contained" size="small">Small</Button>
        <Button variant="contained" size="medium">Medium</Button>
        <Button variant="contained" size="large">Large</Button>
      </DemoBlock>

      <DemoBlock title="按钮图标" description="可以通过 icon 属性添加图标。" code={iconCode}>
        <IconButton aria-label="搜索"><SearchIcon /></IconButton>
        <Button variant="contained" startIcon={<AddIcon />}>前置图标</Button>
        <Button variant="outlined" endIcon={<DeleteIcon />}>后置图标</Button>
      </DemoBlock>

      <DemoBlock title="禁用状态" description="添加 disabled 属性即可让按钮处于不可用状态。" code={disabledCode}>
        <Button variant="outlined" disabled>禁用按钮</Button>
      </DemoBlock>

      <DemoBlock title="Block 按钮" description="block 属性将使按钮适合其父宽度。" code={blockCode}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="contained" fullWidth>通栏按钮</Button>
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
