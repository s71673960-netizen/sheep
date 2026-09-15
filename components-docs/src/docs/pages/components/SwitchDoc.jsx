import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Switch from '@ui/components/Switch';
import FormControlLabel from '@ui/components/FormControlLabel';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Switch from '@ui/components/Switch';
import FormControlLabel from '@ui/components/FormControlLabel';

<Switch defaultChecked />
<Switch />
<Switch disabled />
<Switch disabled checked />`;

const labelCode = `<FormControlLabel control={<Switch defaultChecked />} label="示例标签" />`;

const sizeCode = `<Switch size="small" defaultChecked />
<Switch size="medium" defaultChecked />
<Switch size="large" defaultChecked />`;

const propsData = [
  { name: 'checked', type: 'boolean', default: '-', description: '是否选中（受控）' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: '默认选中状态' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '尺寸：small(32×16) / medium(40×20) / large(48×24)' },
  { name: 'color', type: "'primary' | 'secondary' | ...", default: "'primary'", description: '颜色' },
  { name: 'onChange', type: '(event) => void', default: '-', description: '状态变化回调' },
];

export default function SwitchDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="switch-title">
        Switch 开关
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        开关用于切换单个选项的状态。适合需要即时生效的场景（如启用/禁用设置）。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Switch from '@ui/components/Switch'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" code={basicCode}>
        <Switch defaultChecked />
        <Switch />
        <Switch disabled />
        <Switch disabled checked />
      </DemoBlock>

      <DemoBlock title="带标签" code={labelCode}>
        <FormControlLabel control={<Switch defaultChecked />} label="示例标签" />
      </DemoBlock>

      <DemoBlock title="尺寸" code={sizeCode}>
        <Switch size="small" defaultChecked />
        <Switch size="medium" defaultChecked />
        <Switch size="large" defaultChecked />
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
