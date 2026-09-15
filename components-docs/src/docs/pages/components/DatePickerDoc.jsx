import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import DatePicker from '@ui/components/DatePicker';
import DateRangePicker from '@ui/components/DateRangePicker';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import DatePicker from '@ui/components/DatePicker';
import { useState } from 'react';

const [value, setValue] = useState(null);

<DatePicker
  placeholder="请选择日期"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`;

const disabledCode = `<DatePicker
  placeholder="禁用状态"
  value={null}
  disabled
/>`;

const rangeCode = `import DateRangePicker from '@ui/components/DateRangePicker';
import { useState } from 'react';

const [value, setValue] = useState([null, null]);

<DateRangePicker
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`;

const propsData = [
  { name: 'value', type: 'Dayjs | null', default: 'null', description: '当前选中的日期' },
  { name: 'onChange', type: '(value: Dayjs | null) => void', default: '-', description: '日期变更回调' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'label', type: 'string', default: '-', description: '输入框标签' },
  { name: 'format', type: 'string', default: "'YYYY-MM-DD'", description: '日期格式' },
];

export default function DatePickerDoc() {
  const [value, setValue] = useState(null);
  const [rangeValue, setRangeValue] = useState([null, null]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="datepicker-title">
        DatePicker 日期选择器
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        日期选择器用于选取日期，支持日历面板交互。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import DatePicker from '@ui/components/DatePicker'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="点击输入框展开日历面板，选取日期。" code={basicCode}>
        <DatePicker
          placeholder="请选择日期"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoBlock>

      <DemoBlock title="禁用" description="设置 disabled 属性使选择器不可操作。" code={disabledCode}>
        <DatePicker
          placeholder="禁用状态"
          value={null}
          disabled
        />
      </DemoBlock>

      <DemoBlock title="日期范围选择" description="选择一个日期范围，包含开始日期和结束日期。" code={rangeCode}>
        <DateRangePicker
          value={rangeValue}
          onChange={(newValue) => setRangeValue(newValue)}
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
