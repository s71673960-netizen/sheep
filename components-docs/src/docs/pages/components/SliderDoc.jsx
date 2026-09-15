import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Slider from '@ui/components/Slider';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Slider from '@ui/components/Slider';

const [value, setValue] = useState(30);

<Slider value={value} onChange={(e, val) => setValue(val)} />`;

const rangeCode = `const [range, setRange] = useState([20, 60]);

<Slider value={range} onChange={(e, val) => setRange(val)} />`;

const stepCode = `const [value, setValue] = useState(40);

<Slider
  value={value}
  onChange={(e, val) => setValue(val)}
  step={10}
  marks
  min={0}
  max={100}
/>`;

const disabledCode = `<Slider disabled defaultValue={50} />`;

const propsData = [
  { name: 'value', type: 'number | number[]', default: '-', description: '当前值（受控），传数组为范围选择' },
  { name: 'onChange', type: '(event, value) => void', default: '-', description: '值变化回调' },
  { name: 'min', type: 'number', default: '0', description: '最小值' },
  { name: 'max', type: 'number', default: '100', description: '最大值' },
  { name: 'step', type: 'number', default: '1', description: '步长' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'marks', type: 'boolean', default: 'false', description: '是否显示刻度标记' },
];

export default function SliderDoc() {
  const [value, setValue] = useState(30);
  const [range, setRange] = useState([20, 60]);
  const [stepValue, setStepValue] = useState(40);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="slider-title">
        Slider 滑块
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        滑块允许用户在一个范围内选择值，支持连续和离散模式。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Slider from '@ui/components/Slider'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="通过 useState 实现受控滑块。" code={basicCode}>
        <Box sx={{ width: 300, px: 1 }}>
          <Slider value={value} onChange={(e, val) => setValue(val)} />
          <Typography variant="body2" color="text.secondary">当前值：{value}</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="范围选择" description="传入数组实现双端滑块，选择一个范围。" code={rangeCode}>
        <Box sx={{ width: 300, px: 1 }}>
          <Slider value={range} onChange={(e, val) => setRange(val)} />
          <Typography variant="body2" color="text.secondary">范围：{range[0]} - {range[1]}</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="步长" description="设置 step 和 marks 定义离散步长并显示刻度。" code={stepCode}>
        <Box sx={{ width: 300, px: 1 }}>
          <Slider
            value={stepValue}
            onChange={(e, val) => setStepValue(val)}
            step={10}
            marks
            min={0}
            max={100}
          />
          <Typography variant="body2" color="text.secondary">当前值：{stepValue}</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="禁用" description="设置 disabled 禁用滑块交互。" code={disabledCode}>
        <Box sx={{ width: 300, px: 1 }}>
          <Slider disabled defaultValue={50} />
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
