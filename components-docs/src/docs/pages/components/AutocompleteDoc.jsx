import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Autocomplete from '@ui/components/Autocomplete';
import TextField from '@ui/components/TextField';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Autocomplete from '@ui/components/Autocomplete';
import TextField from '@ui/components/TextField';

const options = ['选项一', '选项二', '选项三', '选项四', '选项五'];
const [value, setValue] = useState(null);

<Autocomplete
  options={options}
  value={value}
  onChange={(event, newValue) => setValue(newValue)}
  renderInput={(params) => <TextField {...params} placeholder="请选择" />}
  sx={{ width: 300 }}
/>`;

const freeSoloCode = `const [inputValue, setInputValue] = useState('');

<Autocomplete
  freeSolo
  options={['选项一', '选项二', '选项三', '选项四', '选项五']}
  inputValue={inputValue}
  onInputChange={(event, newValue) => setInputValue(newValue)}
  renderInput={(params) => <TextField {...params} placeholder="自由输入" />}
  sx={{ width: 300 }}
/>`;

const propsData = [
  { name: 'options', type: 'array', default: '[]', description: '选项列表' },
  { name: 'value', type: 'any', default: '-', description: '当前选中值（受控）' },
  { name: 'onChange', type: '(event, value) => void', default: '-', description: '选中值变化回调' },
  { name: 'freeSolo', type: 'boolean', default: 'false', description: '是否允许自由输入' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'renderInput', type: '(params) => ReactNode', default: '-', description: '渲染输入框的函数' },
];

const options = ['选项一', '选项二', '选项三', '选项四', '选项五'];

export default function AutocompleteDoc() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="autocomplete-title">
        Autocomplete 自动完成
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        自动完成组件在用户输入时提供建议选项，支持过滤、自由输入等功能。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Autocomplete from '@ui/components/Autocomplete'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="从预设选项中选择，支持搜索过滤。" code={basicCode}>
        <Autocomplete
          options={options}
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} placeholder="请选择" />}
          sx={{ width: 300 }}
        />
      </DemoBlock>

      <DemoBlock title="自由输入" description="设置 freeSolo 允许输入不在选项列表中的值。" code={freeSoloCode}>
        <Autocomplete
          freeSolo
          options={options}
          inputValue={inputValue}
          onInputChange={(event, newValue) => setInputValue(newValue)}
          renderInput={(params) => <TextField {...params} placeholder="自由输入" />}
          sx={{ width: 300 }}
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
