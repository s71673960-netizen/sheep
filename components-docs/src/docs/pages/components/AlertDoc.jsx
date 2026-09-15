import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Alert from '@ui/components/Alert';
import AlertTitle from '@ui/components/AlertTitle';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Stack from '@ui/components/Stack';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Alert from '@ui/components/Alert';

<Alert severity="success">操作成功完成。</Alert>
<Alert severity="info">这是一条信息提示。</Alert>
<Alert severity="warning">请注意潜在风险。</Alert>
<Alert severity="error">操作失败，请重试。</Alert>`;

const titleCode = `import AlertTitle from '@ui/components/AlertTitle';

<Alert severity="success">
  <AlertTitle>成功</AlertTitle>
  数据已保存到服务器。
</Alert>`;

const variantCode = `<Alert variant="outlined" severity="success">outlined 样式</Alert>
<Alert variant="filled" severity="success">成功消息</Alert>
<Alert variant="filled" severity="info">信息消息</Alert>
<Alert variant="filled" severity="warning">警告消息</Alert>
<Alert variant="filled" severity="error">错误消息</Alert>`;

const propsData = [
  { name: 'severity', type: "'success' | 'info' | 'warning' | 'error'", default: "'success'", description: '严重程度（决定颜色和图标）' },
  { name: 'type', type: "'success' | 'info' | 'warning' | 'error'", default: '-', description: 'severity 别名，优先级更高' },
  { name: 'variant', type: "'standard' | 'filled' | 'outlined'", default: "'standard'", description: '外观变体' },
  { name: 'onClose', type: '() => void', default: '-', description: '设置后显示关闭按钮并回调' },
  { name: 'icon', type: 'ReactNode | false', default: '-', description: '自定义图标，false 隐藏' },
  { name: 'action', type: 'ReactNode', default: '-', description: '右侧操作区内容' },
];

export default function AlertDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="alert-title">
        Alert 警告
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        警告组件用于向用户展示简短的重要信息，且不会打断用户操作。颜色自动取 palette token（bgcolor / border / main）。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Alert from '@ui/components/Alert'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="四种严重程度，standard 变体自动带背景色和边框。" code={basicCode}>
        <Stack spacing={1.5} sx={{ width: '100%' }}>
          <Alert severity="success">操作成功完成。</Alert>
          <Alert severity="info">这是一条信息提示。</Alert>
          <Alert severity="warning">请注意潜在风险。</Alert>
          <Alert severity="error">操作失败，请重试。</Alert>
        </Stack>
      </DemoBlock>

      <DemoBlock title="带标题" code={titleCode}>
        <Stack spacing={1.5} sx={{ width: '100%' }}>
          <Alert severity="success">
            <AlertTitle>成功</AlertTitle>
            数据已保存到服务器。
          </Alert>
        </Stack>
      </DemoBlock>

      <DemoBlock title="变体" description="outlined 带边框无背景，filled 使用柔和的同色系实心背景。" code={variantCode}>
        <Stack spacing={1.5} sx={{ width: '100%' }}>
          <Alert variant="outlined" severity="success">outlined 样式</Alert>
          <Alert variant="filled" severity="success">成功消息</Alert>
          <Alert variant="filled" severity="info">信息消息</Alert>
          <Alert variant="filled" severity="warning">警告消息</Alert>
          <Alert variant="filled" severity="error">错误消息</Alert>
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
