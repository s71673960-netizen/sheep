import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Rating from '@ui/components/Rating';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Rating from '@ui/components/Rating';

const [value, setValue] = useState(3);

<Rating value={value} onChange={(e, newValue) => setValue(newValue)} />`;

const halfCode = `const [value, setValue] = useState(2.5);

<Rating
  value={value}
  precision={0.5}
  onChange={(e, newValue) => setValue(newValue)}
/>`;

const readOnlyCode = `<Rating value={4} readOnly />`;

const sizeCode = `<Rating defaultValue={3} size="small" />
<Rating defaultValue={3} size="medium" />
<Rating defaultValue={3} size="large" />`;

const propsData = [
  { name: 'value', type: 'number', default: '-', description: '当前评分值（受控）' },
  { name: 'onChange', type: '(event, value) => void', default: '-', description: '评分变化回调' },
  { name: 'precision', type: 'number', default: '1', description: '精度，设为 0.5 可选半星' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: '是否只读' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '尺寸' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
];

export default function RatingDoc() {
  const [value, setValue] = useState(3);
  const [halfValue, setHalfValue] = useState(2.5);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="rating-title">
        Rating 评分
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        评分组件允许用户通过星级对内容进行评价，支持半星和只读模式。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Rating from '@ui/components/Rating'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="通过 useState 管理评分值。" code={basicCode}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Rating value={value} onChange={(e, newValue) => setValue(newValue)} />
          <Typography variant="body2" color="text.secondary">评分：{value}</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="半星" description="设置 precision={0.5} 支持半星选择。" code={halfCode}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Rating value={halfValue} precision={0.5} onChange={(e, newValue) => setHalfValue(newValue)} />
          <Typography variant="body2" color="text.secondary">评分：{halfValue}</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="只读" description="设置 readOnly 禁止用户交互，仅展示评分。" code={readOnlyCode}>
        <Rating value={4} readOnly />
      </DemoBlock>

      <DemoBlock title="尺寸" description="支持 small、medium、large 三种尺寸。" code={sizeCode}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Rating defaultValue={3} size="small" />
          <Rating defaultValue={3} size="medium" />
          <Rating defaultValue={3} size="large" />
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
