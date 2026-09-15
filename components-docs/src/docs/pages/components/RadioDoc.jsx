import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Radio from '@ui/components/Radio';
import RadioGroup from '@ui/components/RadioGroup';
import FormControlLabel from '@ui/components/FormControlLabel';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import SvgIcon from '@ui/components/SvgIcon';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

function RadioUncheckedIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'text.tertiary', transition: 'transform 0.2s ease' }}>
      <circle cx="7" cy="7" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </SvgIcon>
  );
}

function RadioCheckedIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'primary.main', transition: 'transform 0.2s ease', animation: 'radioPopIn 0.25s ease' }}>
      <circle cx="7" cy="7" r="7" fill="currentColor" />
      <circle cx="7" cy="7" r="2.5" fill="var(--radio-mark-color, #fff)" />
    </SvgIcon>
  );
}

const basicCode = `import Radio from '@ui/components/Radio';
import RadioGroup from '@ui/components/RadioGroup';
import FormControlLabel from '@ui/components/FormControlLabel';

const [value, setValue] = useState('option1');

<RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
  <FormControlLabel value="option1" control={<Radio />} label="选项一" />
  <FormControlLabel value="option2" control={<Radio />} label="选项二" />
  <FormControlLabel value="option3" control={<Radio />} label="选项三" />
</RadioGroup>`;

const rowCode = `const [value, setValue] = useState('a');

<RadioGroup row value={value} onChange={(e) => setValue(e.target.value)}>
  <FormControlLabel value="a" control={<Radio />} label="选项 A" />
  <FormControlLabel value="b" control={<Radio />} label="选项 B" />
  <FormControlLabel value="c" control={<Radio />} label="选项 C" />
</RadioGroup>`;

const disabledCode = `<RadioGroup defaultValue="option1">
  <FormControlLabel value="option1" control={<Radio />} label="可用" />
  <FormControlLabel value="option2" control={<Radio disabled />} label="禁用" />
  <FormControlLabel value="option3" control={<Radio disabled />} label="禁用" />
</RadioGroup>`;

const propsData = [
  { name: 'value', type: 'any', default: '-', description: '当前选中值（受控）' },
  { name: 'onChange', type: '(event) => void', default: '-', description: '选中值变化回调' },
  { name: 'row', type: 'boolean', default: 'false', description: '是否水平排列' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'color', type: "'primary' | 'secondary' | ...", default: "'primary'", description: '颜色' },
  { name: 'size', type: "'small' | 'medium'", default: "'medium'", description: '尺寸' },
];

export default function RadioDoc() {
  const [value, setValue] = useState('option1');
  const [rowValue, setRowValue] = useState('a');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="radio-title">
        Radio 单选框
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        单选框允许用户从一组选项中选择一个值。适合选项较少且需要直接展示所有选项的场景。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Radio from '@ui/components/Radio'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="通过 useState 实现受控单选组。" code={basicCode}>
        <RadioGroup
          row
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            gap: 4,
            '& .MuiFormControlLabel-root': {
              mx: 0,
              gap: '6px',
            },
            '& .MuiFormControlLabel-label': {
              fontSize: 14,
              fontWeight: 500,
              color: 'text.primary',
            },
            '& .MuiRadio-root': {
              p: 0,
              '& .MuiSvgIcon-root': { fontSize: 14 },
              '&:hover': { backgroundColor: 'transparent' },
              '@keyframes radioPopIn': {
                '0%': { transform: 'scale(0.6)', opacity: 0.5 },
                '60%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            },
          }}
        >
          <FormControlLabel value="option1" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} />} label="选项一" />
          <FormControlLabel value="option2" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} />} label="选项二" />
          <FormControlLabel value="option3" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} />} label="选项三" />
        </RadioGroup>
      </DemoBlock>

      <DemoBlock title="水平排列" description="设置 row 属性使单选组水平排列。" code={rowCode}>
        <RadioGroup
          row
          value={rowValue}
          onChange={(e) => setRowValue(e.target.value)}
          sx={{
            gap: 4,
            '& .MuiFormControlLabel-root': { mx: 0, gap: '6px' },
            '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500, color: 'text.primary' },
            '& .MuiRadio-root': {
              p: 0,
              '&:hover': { backgroundColor: 'transparent' },
              '@keyframes radioPopIn': {
                '0%': { transform: 'scale(0.6)', opacity: 0.5 },
                '60%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            },
          }}
        >
          <FormControlLabel value="a" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} />} label="选项 A" />
          <FormControlLabel value="b" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} />} label="选项 B" />
          <FormControlLabel value="c" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} />} label="选项 C" />
        </RadioGroup>
      </DemoBlock>

      <DemoBlock title="禁用" description="单独禁用某个选项。" code={disabledCode}>
        <RadioGroup
          defaultValue="option1"
          sx={{
            gap: 1,
            '& .MuiFormControlLabel-root': { mx: 0, gap: '6px' },
            '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500, color: 'text.primary' },
            '& .MuiRadio-root': {
              p: 0,
              '&:hover': { backgroundColor: 'transparent' },
              '@keyframes radioPopIn': {
                '0%': { transform: 'scale(0.6)', opacity: 0.5 },
                '60%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            },
          }}
        >
          <FormControlLabel value="option1" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} />} label="可用" />
          <FormControlLabel value="option2" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} disabled />} label="禁用" />
          <FormControlLabel value="option3" control={<Radio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} disabled />} label="禁用" />
        </RadioGroup>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
