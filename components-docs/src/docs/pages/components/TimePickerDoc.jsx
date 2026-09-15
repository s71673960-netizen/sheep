import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import TimePicker from '@ui/components/TimePicker';
import TimeRangePicker from '@ui/components/TimeRangePicker';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import TimePicker from '@ui/components/TimePicker';
import { useState } from 'react';

const [value, setValue] = useState(null);

<TimePicker
  placeholder="请选择时间"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`;

const disabledCode = `<TimePicker
  placeholder="禁用状态"
  value={null}
  disabled
/>`;

const rangeCode = `import TimeRangePicker from '@ui/components/TimeRangePicker';
import { useState } from 'react';

const [value, setValue] = useState([null, null]);

<TimeRangePicker
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`;

const propsData = [
  { name: 'value', type: 'Dayjs | null', default: 'null', description: '当前选中的时间' },
  { name: 'onChange', type: '(value: Dayjs | null) => void', default: '-', description: '时间变更回调' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'label', type: 'string', default: '-', description: '输入框标签' },
  { name: 'ampm', type: 'boolean', default: 'false', description: '是否使用 12 小时制' },
];

export default function TimePickerDoc() {
  const [value, setValue] = useState(null);
  const [rangeValue, setRangeValue] = useState([null, null]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="timepicker-title">
        TimePicker 时间选择器
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        时间选择器用于选取时间，支持时分秒选择。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import TimePicker from '@ui/components/TimePicker'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="点击输入框展开时间面板，选取时间。" code={basicCode}>
        <TimePicker
          placeholder="请选择时间"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoBlock>

      <DemoBlock title="禁用" description="设置 disabled 属性使选择器不可操作。" code={disabledCode}>
        <TimePicker
          placeholder="禁用状态"
          value={null}
          disabled
        />
      </DemoBlock>

      <DemoBlock title="时间范围选择" description="选择一个时间范围，包含开始时间和结束时间。" code={rangeCode}>
        <TimeRangePicker
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
