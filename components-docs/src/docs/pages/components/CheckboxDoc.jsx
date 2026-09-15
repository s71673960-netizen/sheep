import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Checkbox from '@ui/components/Checkbox';
import FormControlLabel from '@ui/components/FormControlLabel';
import FormGroup from '@ui/components/FormGroup';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import SvgIcon from '@ui/components/SvgIcon';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

function CheckboxUncheckedIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'text.tertiary', transition: 'transform 0.2s ease' }}>
      <rect x="0.75" y="0.75" width="12.5" height="12.5" rx="2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </SvgIcon>
  );
}

function CheckboxCheckedIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'primary.main', transition: 'transform 0.2s ease', animation: 'checkboxPopIn 0.25s ease' }}>
      <rect width="14" height="14" rx="3" fill="currentColor" />
      <path d="M3.5 7.2L5.8 9.5L10.5 4.5" fill="none" stroke="var(--checkbox-mark-color, #fff)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function CheckboxIndeterminateIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'primary.main', transition: 'transform 0.2s ease' }}>
      <rect width="14" height="14" rx="3" fill="currentColor" />
      <path d="M4 7H10" fill="none" stroke="var(--checkbox-mark-color, #fff)" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

const checkboxSx = {
  '& .MuiFormControlLabel-root': { mx: 0, gap: '6px', mr: 4 },
  '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500, color: 'text.primary' },
  '& .MuiCheckbox-root': {
    p: 0,
    '&:hover': { backgroundColor: 'transparent' },
    '@keyframes checkboxPopIn': {
      '0%': { transform: 'scale(0.6)', opacity: 0.5 },
      '60%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)', opacity: 1 },
    },
  },
};

const basicCode = `import Checkbox from '@ui/components/Checkbox';
import FormControlLabel from '@ui/components/FormControlLabel';

const [checked, setChecked] = useState(false);

<FormControlLabel
  control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
  label="同意协议"
/>
<FormControlLabel control={<Checkbox defaultChecked />} label="默认选中" />`;

const disabledCode = `<FormControlLabel control={<Checkbox disabled />} label="禁用未选" />
<FormControlLabel control={<Checkbox disabled checked />} label="禁用已选" />`;

const indeterminateCode = `const [checked, setChecked] = useState([true, false]);

const allChecked = checked.every(Boolean);
const indeterminate = checked.some(Boolean) && !allChecked;

<FormControlLabel
  control={
    <Checkbox
      checked={allChecked}
      indeterminate={indeterminate}
      onChange={(e) => setChecked([e.target.checked, e.target.checked])}
    />
  }
  label="全选"
/>
<FormGroup sx={{ ml: 3 }}>
  <FormControlLabel
    control={<Checkbox checked={checked[0]} onChange={(e) => setChecked([e.target.checked, checked[1]])} />}
    label="选项一"
  />
  <FormControlLabel
    control={<Checkbox checked={checked[1]} onChange={(e) => setChecked([checked[0], e.target.checked])} />}
    label="选项二"
  />
</FormGroup>`;

const propsData = [
  { name: 'checked', type: 'boolean', default: '-', description: '是否选中（受控）' },
  { name: 'onChange', type: '(event) => void', default: '-', description: '状态变化回调' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: '是否为半选状态' },
  { name: 'color', type: "'primary' | 'secondary' | ...", default: "'primary'", description: '颜色' },
  { name: 'size', type: "'small' | 'medium'", default: "'medium'", description: '尺寸' },
];

export default function CheckboxDoc() {
  const [checked, setChecked] = useState(false);
  const [groupChecked, setGroupChecked] = useState([true, false]);

  const allChecked = groupChecked.every(Boolean);
  const indeterminate = groupChecked.some(Boolean) && !allChecked;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="checkbox-title">
        Checkbox 复选框
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        复选框允许用户从一组选项中选择多个值，或切换某个独立选项的状态。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Checkbox from '@ui/components/Checkbox'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="受控复选框，通过 useState 管理状态。" code={basicCode}>
        <Stack direction="row" spacing={4} sx={checkboxSx}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} icon={<CheckboxUncheckedIcon />} checkedIcon={<CheckboxCheckedIcon />} />}
            label="同意协议"
          />
          <FormControlLabel control={<Checkbox defaultChecked icon={<CheckboxUncheckedIcon />} checkedIcon={<CheckboxCheckedIcon />} />} label="默认选中" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="禁用" description="设置 disabled 属性禁用复选框。" code={disabledCode}>
        <Stack direction="row" spacing={4} sx={checkboxSx}>
          <FormControlLabel control={<Checkbox disabled icon={<CheckboxUncheckedIcon />} checkedIcon={<CheckboxCheckedIcon />} />} label="禁用未选" />
          <FormControlLabel control={<Checkbox disabled checked icon={<CheckboxUncheckedIcon />} checkedIcon={<CheckboxCheckedIcon />} />} label="禁用已选" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="全选（半选状态）" description="使用 indeterminate 属性实现全选/半选联动。" code={indeterminateCode}>
        <Box sx={checkboxSx}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={(e) => setGroupChecked([e.target.checked, e.target.checked])}
                icon={<CheckboxUncheckedIcon />}
                checkedIcon={<CheckboxCheckedIcon />}
                indeterminateIcon={<CheckboxIndeterminateIcon />}
              />
            }
            label="全选"
          />
          <FormGroup sx={{ ml: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={groupChecked[0]}
                  onChange={(e) => setGroupChecked([e.target.checked, groupChecked[1]])}
                  icon={<CheckboxUncheckedIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                />
              }
              label="选项一"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={groupChecked[1]}
                  onChange={(e) => setGroupChecked([groupChecked[0], e.target.checked])}
                  icon={<CheckboxUncheckedIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                />
              }
              label="选项二"
            />
          </FormGroup>
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
