import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Snackbar from '@ui/components/Snackbar';
import Alert from '@ui/components/Alert';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Snackbar from '@ui/components/Snackbar';
import Button from '@ui/components/Button';

const [open, setOpen] = useState(false);

<Button variant="outlined" onClick={() => setOpen(true)}>显示消息</Button>
<Snackbar
  open={open}
  autoHideDuration={3000}
  onClose={() => setOpen(false)}
  message="这是一条消息提示"
/>`;

const alertCode = `import Alert from '@ui/components/Alert';

<Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
  <Alert severity="success" onClose={() => setOpen(false)}>
    操作成功！
  </Alert>
</Snackbar>`;

const positionCode = `<Snackbar
  open={open}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  message="顶部居中消息"
/>`;

const propsData = [
  { name: 'open', type: 'boolean', default: 'false', description: '是否显示消息条' },
  { name: 'autoHideDuration', type: 'number', default: '-', description: '自动关闭时间（毫秒）' },
  { name: 'onClose', type: '(event, reason) => void', default: '-', description: '关闭回调' },
  { name: 'anchorOrigin', type: '{ vertical, horizontal }', default: "{ vertical: 'bottom', horizontal: 'left' }", description: '显示位置' },
  { name: 'message', type: 'string', default: '-', description: '消息文字内容' },
];

export default function SnackbarDoc() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [severity, setSeverity] = useState('success');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="snackbar-title">
        Snackbar 消息条
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        消息条用于在页面底部或指定位置短暂展示操作反馈信息。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Snackbar from '@ui/components/Snackbar'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="点击按钮触发消息条显示，3秒后自动关闭。" code={basicCode}>
        <Button variant="outlined" onClick={() => setOpen1(true)}>显示消息</Button>
        <Snackbar
          open={open1}
          autoHideDuration={3000}
          onClose={() => setOpen1(false)}
          message="这是一条消息提示"
        />
      </DemoBlock>

      <DemoBlock title="不同类型" description="配合 Alert 组件展示不同状态的消息。" code={alertCode}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="success" onClick={() => { setSeverity('success'); setOpen2(true); }}>成功</Button>
          <Button variant="outlined" color="error" onClick={() => { setSeverity('error'); setOpen2(true); }}>错误</Button>
          <Button variant="outlined" color="warning" onClick={() => { setSeverity('warning'); setOpen2(true); }}>警告</Button>
          <Button variant="outlined" color="info" onClick={() => { setSeverity('info'); setOpen2(true); }}>信息</Button>
        </Stack>
        <Snackbar open={open2} autoHideDuration={3000} onClose={() => setOpen2(false)}>
          <Alert severity={severity} onClose={() => setOpen2(false)}>
            {severity === 'success' && '操作成功！'}
            {severity === 'error' && '操作失败，请重试。'}
            {severity === 'warning' && '请注意潜在风险。'}
            {severity === 'info' && '这是一条提示信息。'}
          </Alert>
        </Snackbar>
      </DemoBlock>

      <DemoBlock title="位置" description="通过 anchorOrigin 控制消息条出现的位置。" code={positionCode}>
        <Button variant="outlined" onClick={() => setOpen3(true)}>顶部居中</Button>
        <Snackbar
          open={open3}
          autoHideDuration={3000}
          onClose={() => setOpen3(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message="顶部居中消息"
        />
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
