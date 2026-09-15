import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Statistic from '@ui/components/Statistic';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import QuestionIcon from '@ui/components/icons/Question';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const { Timer } = Statistic;

const basicCode = `import Statistic from '@ui/components/Statistic';

<Statistic title="示例指标" value={64330} />`;

const loadingCode = `import Statistic from '@ui/components/Statistic';

<Statistic title="示例指标" loading />`;

const customCode = `import Statistic from '@ui/components/Statistic';

<Stack direction="row" spacing={1} sx={{ width: '100%' }}>
  <Statistic
    title="增长率"
    value={11.28}
    precision={2}
    suffix="%"
    sx={{ '& .MuiStatistic-content': { color: 'success.main' } }}
  />
  <Statistic
    title="下降率"
    value={9.3}
    precision={2}
    suffix="%"
    sx={{ '& .MuiStatistic-content': { color: 'error.main' } }}
  />
</Stack>`;

const formatterCode = `import Statistic from '@ui/components/Statistic';

<Statistic
  title="完成率"
  value={99.8}
  formatter={(val) => \`\${val}%\`}
/>`;

const timerCode = `import Statistic from '@ui/components/Statistic';
const { Timer } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2;

<Stack direction="row" spacing={1} sx={{ width: '100%' }}>
  <Timer type="countdown" title="倒计时" value={deadline} />
  <Timer type="countup" title="已运行" value={Date.now() - 1000 * 60 * 5} />
</Stack>`;

const outlinedCode = `import Statistic from '@ui/components/Statistic';
import Stack from '@ui/components/Stack';
import QuestionIcon from '@ui/components/icons/Question';

<Stack direction="row" spacing={1}>
  <Statistic
    variant="outlined"
    title="示例指标"
    subtitle="示例说明文字"
    value="86.1%"
    trend="↑0.3%"
    icon={<QuestionIcon sx={{ fontSize: 16, color: 'text.tertiary' }} />}
  />
</Stack>`;

const propsData = [
  { name: 'variant', type: "'filled' | 'outlined'", default: "'filled'", description: '样式变体。filled 为色块背景，outlined 为白底边框卡片' },
  { name: 'title', type: 'ReactNode', default: '-', description: '数值的标题' },
  { name: 'subtitle', type: 'ReactNode', default: '-', description: '标题下方的副标题（outlined 变体）' },
  { name: 'value', type: 'string | number', default: '-', description: '数值内容' },
  { name: 'precision', type: 'number', default: '-', description: '数值精度（小数位数）' },
  { name: 'prefix', type: 'ReactNode', default: '-', description: '数值前缀' },
  { name: 'suffix', type: 'ReactNode', default: '-', description: '数值后缀' },
  { name: 'trend', type: 'ReactNode', default: '-', description: '趋势文本，显示在数值后方（如 "↑100%"）' },
  { name: 'icon', type: 'ReactNode', default: '-', description: '标题旁的图标' },
  { name: 'align', type: "'center' | 'start'", default: "filled='center', outlined='start'", description: '内容对齐方式' },
  { name: 'groupSeparator', type: 'string', default: "','", description: '千分位分隔符' },
  { name: 'decimalSeparator', type: 'string', default: "'.'", description: '小数点字符' },
  { name: 'formatter', type: '(value) => ReactNode', default: '-', description: '自定义数值格式化' },
  { name: 'loading', type: 'boolean', default: 'false', description: '加载状态（显示骨架屏）' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式' },
];

const timerPropsData = [
  { name: 'type', type: "'countdown' | 'countup'", default: '-', description: '计时类型' },
  { name: 'title', type: 'ReactNode', default: '-', description: '标题' },
  { name: 'value', type: 'number', default: '-', description: '目标/起始时间戳（ms）' },
  { name: 'format', type: 'string', default: "'HH:mm:ss'", description: '时间格式化，支持 D/H/HH/m/mm/s/ss/SSS' },
  { name: 'prefix', type: 'ReactNode', default: '-', description: '前缀' },
  { name: 'suffix', type: 'ReactNode', default: '-', description: '后缀' },
  { name: 'onFinish', type: '() => void', default: '-', description: '倒计时完成回调（仅 countdown）' },
  { name: 'onChange', type: '(value: number) => void', default: '-', description: '时间变化回调' },
];

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2;
const elapsed = Date.now() - 1000 * 60 * 5;

export default function StatisticDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="statistic-title">
        Statistic 统计数值
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        展示统计数值。当需要突出某个或某组数字时，或展示带描述的统计类数据时使用。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Statistic from '@ui/components/Statistic'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本" description="展示数值和对应标题。" code={basicCode}>
        <Statistic title="示例指标" value={64330} />
      </DemoBlock>

      <DemoBlock title="加载中" description="数据加载中显示骨架屏。" code={loadingCode}>
        <Statistic title="示例指标" loading />
      </DemoBlock>

      <DemoBlock title="自定义颜色" description="通过 sx 自定义数值颜色表示增减趋势。" code={customCode}>
        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
          <Statistic
            title="增长率"
            value={11.28}
            precision={2}
            suffix="%"
            sx={{ '& .MuiStatistic-content': { color: 'success.main' } }}
          />
          <Statistic
            title="下降率"
            value={9.3}
            precision={2}
            suffix="%"
            sx={{ '& .MuiStatistic-content': { color: 'error.main' } }}
          />
        </Stack>
      </DemoBlock>

      <DemoBlock title="自定义格式化" description="通过 formatter 完全自定义数值显示。" code={formatterCode}>
        <Statistic
          title="完成率"
          value={99.8}
          formatter={(val) => `${val}%`}
        />
      </DemoBlock>

      <DemoBlock title="计时器" description="Statistic.Timer 支持倒计时和正计时。" code={timerCode}>
        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
          <Timer type="countdown" title="倒计时" value={deadline} />
          <Timer type="countup" title="已运行" value={elapsed} />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Outlined 卡片变体" description="variant='outlined' 使用白底边框卡片样式，并支持副标题、趋势和图标。" code={outlinedCode}>
        <Stack direction="row" spacing={1} sx={{ width: '100%', alignItems: 'stretch' }}>
          <Statistic
            variant="outlined"
            title="示例指标"
            subtitle="示例说明文字"
            value="86.1%"
            trend="↑0.3%"
            icon={<QuestionIcon sx={{ fontSize: 16, color: 'text.tertiary' }} />}
          />
        </Stack>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Statistic
      </Typography>
      <PropsTable data={propsData} />

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
        Statistic.Timer
      </Typography>
      <PropsTable data={timerPropsData} />
    </Box>
  );
}
