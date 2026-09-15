import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Chart from '@ui/components/Chart';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const barCode = `import Chart from '@ui/components/Chart';

<Chart
  type="bar"
  title="柱状图示例"
  height={300}
  data={{
    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10'],
    datasets: [{ name: '系列 A', values: [235, 198, 90, 72, 95, 235, 110, 108, 105, 112] }]
  }}
/>`;

const lineCode = `<Chart
  type="line"
  title="折线图示例"
  height={300}
  data={{
    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10'],
    datasets: [
      { name: '系列 A', values: [5, 20, 32, 30, 28, 28, 35, 40, 38, 42] },
      { name: '系列 B', values: [62, 92, 95, 94, 93, 95, 98, 96, 99, 101] },
      { name: '总计', values: [80, 128, 140, 138, 132, 135, 145, 150, 148, 155] }
    ]
  }}
/>`;

const pieCode = `<Chart
  type="pie"
  title="饼图示例"
  height={400}
  data={{
    labels: ['分类 A', '分类 B', '分类 C', '分类 D', '分类 E', '分类 F', '其他'],
    datasets: [{ name: '数值', values: [12325, 6006, 2436, 3787, 5716, 3277, 404] }]
  }}
/>`;

const donutCode = `<Chart
  type="donut"
  title="环形图示例"
  height={400}
  data={{
    labels: ['分类 A', '分类 B', '分类 C', '分类 D', '分类 E', '分类 F', '其他'],
    datasets: [{ name: '数值', values: [12325, 6006, 2436, 3787, 5716, 3277, 404] }]
  }}
/>`;

const stackedBarCode = `<Chart
  type="stackedBar"
  title="堆叠柱状图"
  height={400}
  data={{
    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07'],
    datasets: [
      { name: '系列A', values: [120, 80, 95, 110, 60, 55, 50] },
      { name: '系列B', values: [100, 70, 85, 90, 50, 45, 45] },
      { name: '系列C', values: [90, 60, 75, 80, 40, 40, 40] },
      { name: '系列D', values: [80, 50, 60, 70, 35, 35, 35] },
      { name: '系列E', values: [70, 45, 55, 60, 30, 30, 30] },
      { name: '系列F', values: [60, 40, 50, 55, 25, 25, 25] }
    ]
  }}
/>`;

const propsData = [
  { name: 'type', type: "'bar' | 'stackedBar' | 'line' | 'pie' | 'donut' | 'scatter' | 'area'", default: "'bar'", description: '图表类型' },
  { name: 'data', type: 'object', default: '-', description: '图表数据，包含 labels 和 datasets' },
  { name: 'height', type: 'number', default: '300', description: '图表高度（像素）' },
  { name: 'title', type: 'string', default: '-', description: '图表标题' },
];

export default function ChartDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="chart-title">
        Chart 图表
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        图表组件用于数据可视化，支持柱状图、折线图、饼图等多种类型。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Chart from '@ui/components/Chart'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="柱状图" description="使用 type='bar' 展示分类对比数据，柱体带圆角，hover 显示阴影高亮。" code={barCode}>
        <Box sx={{ width: '100%' }}>
          <Chart
            type="bar"
            title="柱状图示例"
            height={300}
            data={{
              labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10'],
              datasets: [{ name: '系列 A', values: [235, 198, 90, 72, 95, 235, 110, 108, 105, 112] }]
            }}
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="折线图" description="使用 type='line' 展示数据趋势变化，平滑曲线，多系列对比。" code={lineCode}>
        <Box sx={{ width: '100%' }}>
          <Chart
            type="line"
            title="折线图示例"
            height={300}
            data={{
              labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10'],
              datasets: [
                { name: '系列 A', values: [5, 20, 32, 30, 28, 28, 35, 40, 38, 42] },
                { name: '系列 B', values: [62, 92, 95, 94, 93, 95, 98, 96, 99, 101] },
                { name: '总计', values: [80, 128, 140, 138, 132, 135, 145, 150, 148, 155] }
              ]
            }}
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="堆叠柱状图" description="使用 type='stackedBar' 展示多系列堆叠数据对比。" code={stackedBarCode}>
        <Box sx={{ width: '100%' }}>
          <Chart
            type="stackedBar"
            title="堆叠柱状图"
            height={400}
            data={{
              labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07'],
              datasets: [
                { name: '系列A', values: [120, 80, 95, 110, 60, 55, 50] },
                { name: '系列B', values: [100, 70, 85, 90, 50, 45, 45] },
                { name: '系列C', values: [90, 60, 75, 80, 40, 40, 40] },
                { name: '系列D', values: [80, 50, 60, 70, 35, 35, 35] },
                { name: '系列E', values: [70, 45, 55, 60, 30, 30, 30] },
                { name: '系列F', values: [60, 40, 50, 55, 25, 25, 25] }
              ]
            }}
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="饼图 / 环形图" description="使用 type='pie' 展示实心饼图，type='donut' 展示环形图，标签通过引导线指向对应区块。" code={pieCode + '\n\n' + donutCode}>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Box sx={{ flex: 1 }}>
            <Chart
              type="donut"
              title="环形图示例"
              height={400}
              data={{
                labels: ['分类 A', '分类 B', '分类 C', '分类 D', '分类 E', '分类 F', '其他'],
                datasets: [{ name: '数值', values: [12325, 6006, 2436, 3787, 5716, 3277, 404] }]
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Chart
              type="pie"
              title="饼图示例"
              height={400}
              data={{
                labels: ['分类 A', '分类 B', '分类 C', '分类 D', '分类 E', '分类 F', '其他'],
                datasets: [{ name: '数值', values: [12325, 6006, 2436, 3787, 5716, 3277, 404] }]
              }}
            />
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
