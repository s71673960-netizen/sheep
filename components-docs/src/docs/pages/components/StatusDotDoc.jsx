import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import StatusDot from '@ui/components/StatusDot';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Stack from '@ui/components/Stack';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import StatusDot from '@ui/components/StatusDot';

<StatusDot color="primary" />
<StatusDot color="success" />
<StatusDot color="warning" />
<StatusDot color="error" />
<StatusDot color="info" />`;

const sizeCode = `<StatusDot size="small" />   // 6px
<StatusDot size="medium" />  // 10px（默认）
<StatusDot size="large" />   // 14px`;

const animateCode = `// animate 启用呼吸动效
<StatusDot color="primary" animate />`;

const propsData = [
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'error' | 'info'", default: "'primary'", description: '颜色' },
  { name: 'type', type: "'success' | 'warning' | 'error' | 'info'", default: '-', description: 'color 别名，优先级更高' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '尺寸（6 / 10 / 14 px）' },
  { name: 'animate', type: 'boolean', default: 'false', description: '是否启用呼吸动效' },
];

export default function StatusDotDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="statusdot-title">
        StatusDot 状态点
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        状态指示器，用于表示连接、运行等状态，支持呼吸动效。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import StatusDot from '@ui/components/StatusDot'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="五种颜色。" code={basicCode}>
        <Stack direction="row" spacing={2} alignItems="center">
          <StatusDot color="primary" />
          <StatusDot color="success" />
          <StatusDot color="warning" />
          <StatusDot color="error" />
          <StatusDot color="info" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="尺寸" description="三种尺寸。" code={sizeCode}>
        <Stack direction="row" spacing={2} alignItems="center">
          <StatusDot size="small" />
          <StatusDot size="medium" />
          <StatusDot size="large" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="呼吸动效" description="animate 开启后用于表示运行中状态。" code={animateCode}>
        <StatusDot color="primary" animate />
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
