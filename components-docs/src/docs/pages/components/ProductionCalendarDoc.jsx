import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import ProductionCalendar from '@ui/components/ProductionCalendar';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import ProductionCalendar from '@ui/components/ProductionCalendar';

// days 格式: [id, date, weekday, isProduction]
const calendar = {
  title: '请选择日期',
  productionCount: 5,
  restCount: 2,
  days: [
    [1, '07/01', '周二', true],
    [2, '07/02', '周三', true],
    [3, '07/03', '周四', false],
    [4, '07/04', '周五', true],
    [5, '07/05', '周六', false],
    [6, '07/06', '周日', false],
    [7, '07/07', '周一', true],
  ],
};

<ProductionCalendar
  defaultCalendar={calendar}
  executor={{ name: '示例用户' }}
  onConfirm={(cal) => console.log('confirmed', cal)}
/>`;

const controlledCode = `const [calendar, setCalendar] = useState(initialCalendar);

// days 格式: [id, date, weekday, isProduction]
<ProductionCalendar
  calendar={calendar}
  executor={{ name: '示例用户' }}
  onToggle={(dayId, triggerId) => { /* 更新 calendar */ }}
  onConfirm={() => { /* 提交 */ }}
  footerText="这是默认提示文字"
  footerLinkText="示例链接"
  onFooterLink={() => {}}
/>`;

const defaultCalendar = {
  title: '请选择日期',
  productionCount: 5,
  restCount: 2,
  days: [
    [1, '07/01', '周二', true],
    [2, '07/02', '周三', true],
    [3, '07/03', '周四', false],
    [4, '07/04', '周五', true],
    [5, '07/05', '周六', false],
    [6, '07/06', '周日', false],
    [7, '07/07', '周一', true],
  ],
};

const propsData = [
  { name: 'defaultCalendar', type: 'CalendarData', default: '-', description: '非受控模式初始日历数据' },
  { name: 'calendar', type: 'CalendarData', default: '-', description: '受控模式日历数据' },
  { name: 'executor', type: '{ name: string }', default: '-', description: '显示名称' },
  { name: 'avatar', type: 'string', default: '-', description: '头像 URL' },
  { name: 'loading', type: 'boolean', default: 'false', description: '加载状态' },
  { name: 'onToggle', type: '(dayId, triggerId) => void', default: '-', description: '日期切换回调（受控模式）' },
  { name: 'onConfirm', type: '(calendar) => void', default: '-', description: '确认按钮回调' },
  { name: 'footerText', type: 'string', default: '-', description: '底部提示文字' },
  { name: 'footerLinkText', type: 'string', default: '-', description: '底部链接文字' },
  { name: 'onFooterLink', type: '() => void', default: '-', description: '底部链接点击回调' },
];

export default function ProductionCalendarDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        ProductionCalendar 日期面板
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        用于展示和选择一组日期，支持受控和非受控两种模式。
      </Typography>
      <Typography className="component-import" variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        使用：<InlineImportCode code="import ProductionCalendar from '@ui/components/ProductionCalendar'" />
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>代码演示</Typography>

      <DemoBlock title="基础用法" description="非受控模式，组件内部管理日期状态，点击日期可切换启用或停用。" code={basicCode}>
        <Box sx={{ width: '100%' }}>
          <ProductionCalendar
            defaultCalendar={defaultCalendar}
            executor={{ name: '示例用户' }}
            footerText="这是默认提示文字"
            footerLinkText="示例链接"
            onConfirm={(cal) => console.log('confirmed', cal)}
          />
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>API</Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
