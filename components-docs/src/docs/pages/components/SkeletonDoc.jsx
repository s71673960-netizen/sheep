import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Skeleton from '@ui/components/Skeleton';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Skeleton from '@ui/components/Skeleton';
import Stack from '@ui/components/Stack';

<Stack spacing={1}>
  <Skeleton variant="text" width={210} />
  <Skeleton variant="circular" width={40} height={40} />
  <Skeleton variant="rectangular" width={210} height={60} />
  <Skeleton variant="rounded" width={210} height={60} />
</Stack>`;

const animationCode = `<Stack spacing={1}>
  <Skeleton variant="text" width={210} animation="pulse" />
  <Skeleton variant="text" width={210} animation="wave" />
  <Skeleton variant="text" width={210} animation={false} />
</Stack>`;

const compositeCode = `// 模拟卡片加载
<Box sx={{ width: 300, p: 2 }}>
  <Skeleton variant="rectangular" width="100%" height={140} />
  <Box sx={{ pt: 1 }}>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="40%" />
  </Box>
</Box>`;

const propsData = [
  { name: 'variant', type: "'text' | 'circular' | 'rectangular' | 'rounded'", default: "'text'", description: '骨架屏形状类型' },
  { name: 'animation', type: "'pulse' | 'wave' | false", default: "'pulse'", description: '动画效果' },
  { name: 'width', type: 'number | string', default: '-', description: '宽度' },
  { name: 'height', type: 'number | string', default: '-', description: '高度' },
];

export default function SkeletonDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="skeleton-title">
        Skeleton 骨架屏
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        骨架屏在数据加载过程中作为内容占位符，减少用户等待焦虑。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Skeleton from '@ui/components/Skeleton'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本类型" description="提供 text、circular、rectangular、rounded 四种形状。" code={basicCode}>
        <Stack spacing={1}>
          <Skeleton variant="text" width={210} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      </DemoBlock>

      <DemoBlock title="动画" description="支持 pulse 和 wave 两种动画，也可以关闭动画。" code={animationCode}>
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ width: 60 }}>pulse:</Typography>
            <Skeleton variant="text" width={210} animation="pulse" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ width: 60 }}>wave:</Typography>
            <Skeleton variant="text" width={210} animation="wave" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ width: 60 }}>无动画:</Typography>
            <Skeleton variant="text" width={210} animation={false} />
          </Box>
        </Stack>
      </DemoBlock>

      <DemoBlock title="组合" description="组合多种骨架屏模拟卡片加载效果。" code={compositeCode}>
        <Box sx={{ width: 300, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={140} />
          <Box sx={{ pt: 1 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="40%" />
          </Box>
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
