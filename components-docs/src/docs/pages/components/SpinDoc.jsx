import React, { useState } from 'react';
import Spin from '@ui/components/Spin';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Switch from '@ui/components/Switch';
import Button from '@ui/components/Button';
import Alert from '@ui/components/Alert';
import Typography from '@ui/components/Typography';
import FormControlLabel from '@ui/components/FormControlLabel';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const sizeCode = `import Spin from '@ui/components/Spin';

<Spin size="small" />
<Spin />
<Spin size="large" />`;

const nestedCode = `import Spin from '@ui/components/Spin';

<Spin spinning={loading}>
  <Alert severity="info" title="提示">
    这里是被包裹的内容区域，加载时会显示遮罩。
  </Alert>
</Spin>`;

const delayCode = `import Spin from '@ui/components/Spin';

// 延迟 500ms 才显示加载状态，避免闪烁
<Spin spinning={loading} delay={500}>
  <div>内容区域</div>
</Spin>`;

const descriptionCode = `import Spin from '@ui/components/Spin';

<Spin description="加载中..." />`;

const fullscreenCode = `import Spin from '@ui/components/Spin';

<Spin spinning={spinning} fullscreen />`;

const waitingCode = `import Spin from '@ui/components/Spin';

// 等待类型：实心圆点 + 外圈呼吸动画
<Spin variant="waiting" description="等待中..." />`;

const spinProps = [
  { name: 'spinning', type: 'boolean', default: 'true', desc: '是否为加载中状态' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", desc: '组件大小' },
  { name: 'delay', type: 'number', default: '-', desc: '延迟显示加载效果的时间（毫秒），防止闪烁' },
  { name: 'description', type: 'ReactNode', default: '-', desc: '自定义描述文案' },
  { name: 'fullscreen', type: 'boolean', default: 'false', desc: '显示全屏加载遮罩' },
  { name: 'indicator', type: 'ReactNode', default: '-', desc: '自定义加载指示符' },
  { name: 'percent', type: "number | 'auto'", default: '-', desc: '展示进度百分比，显示确定进度' },
  { name: 'children', type: 'ReactNode', default: '-', desc: '包裹内容，启用容器模式' },
  { name: 'sx', type: 'SxProps', default: '-', desc: '自定义样式' },
];

function BasicDemo() {
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Stack>
  );
}

function NestedDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <Stack spacing={2}>
      <Spin spinning={loading}>
        <Alert severity="info">
          <Typography variant="subtitle2">提示标题</Typography>
          <Typography variant="body2">这里是被包裹的内容区域，加载时会显示遮罩层。</Typography>
        </Alert>
      </Spin>
      <FormControlLabel
        control={<Switch checked={loading} onChange={(e) => setLoading(e.target.checked)} />}
        label="加载状态"
      />
    </Stack>
  );
}

function DelayDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Stack spacing={2}>
      <Spin spinning={loading} delay={500}>
        <Alert severity="info">
          <Typography variant="body2">延迟 500ms 显示加载状态，快速切换时不会闪烁。</Typography>
        </Alert>
      </Spin>
      <FormControlLabel
        control={<Switch checked={loading} onChange={(e) => setLoading(e.target.checked)} />}
        label="加载状态（延迟 500ms）"
      />
    </Stack>
  );
}

function DescriptionDemo() {
  return <Spin description="加载中..." />;
}

function WaitingDemo() {
  return <Spin variant="waiting" description="等待中..." />;
}

function FullscreenDemo() {
  const [spinning, setSpinning] = useState(false);

  const showFullscreen = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 3000);
  };

  return (
    <Box>
      <Button variant="contained" onClick={showFullscreen}>
        显示全屏加载
      </Button>
      <Spin spinning={spinning} fullscreen description="页面加载中..." />
    </Box>
  );
}

export default function SpinDoc() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Spin 加载中
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        用于页面和区块的加载中状态。页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
      </Typography>

      <DemoBlock title="基本用法 - 各种大小" code={sizeCode}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title="容器加载" code={nestedCode}>
        <NestedDemo />
      </DemoBlock>

      <DemoBlock title="延迟加载" code={delayCode}>
        <DelayDemo />
      </DemoBlock>

      <DemoBlock title="自定义描述文案" code={descriptionCode}>
        <DescriptionDemo />
      </DemoBlock>

      <DemoBlock title="等待类型" code={waitingCode}>
        <WaitingDemo />
      </DemoBlock>

      <DemoBlock title="全屏加载" code={fullscreenCode}>
        <FullscreenDemo />
      </DemoBlock>

      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={spinProps} />
    </Box>
  );
}
