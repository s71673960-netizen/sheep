import React, { useState, useEffect } from 'react';
import CircularProgress from '@ui/components/CircularProgress';
import LinearProgress from '@ui/components/LinearProgress';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Stack from '@ui/components/Stack';
import Button from '@ui/components/Button';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const circularCode = `import CircularProgress from '@ui/components/CircularProgress';
import Box from '@ui/components/Box';

// 带轨道的圆形进度
<Box sx={{ position: 'relative', display: 'inline-flex' }}>
  <CircularProgress variant="determinate" value={100} thickness={4} sx={{ color: 'action.disabledBackground' }} />
  <CircularProgress variant="determinate" value={30} thickness={4} sx={{ position: 'absolute', left: 0 }} />
</Box>

// 不同尺寸
<CircularProgress variant="determinate" value={45} size={48} thickness={4.5} />
<CircularProgress variant="determinate" value={65} size={60} thickness={5} />`;

const linearCode = `import LinearProgress from '@ui/components/LinearProgress';

<LinearProgress />
<LinearProgress variant="determinate" value={65} />`;

const dotProgressCode = `import { DotProgress } from './DotProgress';

// 基础用法
<DotProgress value={4} total={10} />

// 带交互按钮
const [step, setStep] = useState(4);
<DotProgress value={step} total={10} />
<Button onClick={() => setStep(s => Math.min(s + 1, 10))}>下一步</Button>
<Button onClick={() => setStep(s => Math.max(s - 1, 0))}>上一步</Button>`;

function DotProgress({ value = 0, total = 10 }) {
  return (
    <Stack direction="row" alignItems="center" spacing="12px">
      <Stack direction="row" alignItems="baseline" spacing="0px">
        <Typography sx={{ fontSize: 12, color: 'text.primary' }}>进度：</Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main' }}>{value}/{total}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="1.5px">
        {Array.from({ length: total }).map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 7,
              height: 6,
              borderRadius: '32px',
              bgcolor: 'action.disabledBackground',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '32px',
                bgcolor: 'primary.main',
                transform: i < value ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.35s cubic-bezier(0.645, 0.045, 0.355, 1)',
                transitionDelay: i < value ? `${i * 60}ms` : '0ms',
              },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

function DotProgressDemo() {
  const [step, setStep] = useState(4);
  const total = 10;

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <DotProgress value={step} total={total} />
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          size="small"
          disabled={step <= 0}
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
        >
          上一步
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={step >= total}
          onClick={() => setStep((s) => Math.min(s + 1, total))}
        >
          下一步
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setStep(0)}
        >
          重置
        </Button>
      </Stack>
    </Stack>
  );
}

const propsData = [
  { name: 'variant', type: "'determinate' | 'indeterminate'", default: "'indeterminate'", description: '模式（确定/不确定进度）' },
  { name: 'value', type: 'number (0-100)', default: '-', description: 'determinate 模式下的进度值' },
  { name: 'size', type: 'number | string', default: '40', description: '圆形进度条的直径' },
  { name: 'thickness', type: 'number', default: '4', description: '圆环粗细' },
  { name: 'color', type: "'primary' | 'secondary' | ...", default: "'primary'", description: '颜色' },
];

const dotPropsData = [
  { name: 'value', type: 'number', default: '0', description: '当前完成的步数' },
  { name: 'total', type: 'number', default: '10', description: '总步数' },
];

function AnimatedCircularDemo() {
  const [progress, setProgress] = useState([30, 45, 65]);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const step = (now) => {
      const delta = now - last;
      last = now;
      setProgress((prev) =>
        prev.map((v) => {
          const next = v + delta * 0.02;
          return next > 100 ? next - 100 : next;
        }),
      );
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <CircularProgress
        variant="determinate"
        value={progress[0]}
        thickness={4}
        size={40}
        sx={{
          '& .MuiCircularProgress-track': { stroke: (theme) => theme.palette.action.disabledBackground, opacity: 1 },
          '& .MuiCircularProgress-circle': { transition: 'none' },
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progress[1]}
        thickness={4.5}
        size={48}
        sx={{
          '& .MuiCircularProgress-track': { stroke: (theme) => theme.palette.action.disabledBackground, opacity: 1 },
          '& .MuiCircularProgress-circle': { transition: 'none' },
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progress[2]}
        thickness={5}
        size={60}
        sx={{
          '& .MuiCircularProgress-track': { stroke: (theme) => theme.palette.action.disabledBackground, opacity: 1 },
          '& .MuiCircularProgress-circle': { transition: 'none' },
        }}
      />
    </>
  );
}

function AnimatedLinearDemo() {
  const [progress, setProgress] = useState(55);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const step = (now) => {
      const delta = now - last;
      last = now;
      setProgress((value) => {
        const next = value + delta * 0.02;
        return next > 100 ? next - 100 : next;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <LinearProgress />
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: 'action.disabledBackground',
          '& .MuiLinearProgress-bar': { borderRadius: 3, transition: 'none' },
        }}
      />
    </Stack>
  );
}

export default function ProgressDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="progress-title">
        Progress 进度
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        进度指示器向用户展示操作的当前状态，包含圆形和线形两种。
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="圆形进度" code={circularCode}>
        <AnimatedCircularDemo />
      </DemoBlock>

      <DemoBlock title="线形进度" code={linearCode}>
        <AnimatedLinearDemo />
      </DemoBlock>

      <DemoBlock title="点状进度" description="离散点状进度指示器，支持从左到右填满的过渡动画。点击按钮查看动画效果。" code={dotProgressCode}>
        <DotProgressDemo />
      </DemoBlock>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>API</Typography>
      <PropsTable data={propsData} />

      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>DotProgress</Typography>
      <PropsTable data={dotPropsData} />
    </Box>
  );
}
