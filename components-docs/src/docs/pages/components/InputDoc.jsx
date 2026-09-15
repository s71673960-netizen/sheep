import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import TextField from '@ui/components/TextField';
import InputAdornment from '@ui/components/InputAdornment';
import IconButton from '@ui/components/IconButton';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import UserIcon from '@ui/components/icons/User';
import SearchIcon from '@ui/components/icons/Search';
import PreviewIcon from '@ui/components/icons/Preview';
import PreviewoffIcon from '@ui/components/icons/Previewoff';
import CloseCircleIcon from '@ui/components/icons/CloseCircle';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import TextField from '@ui/components/TextField';

<TextField placeholder="Basic usage" />`;

const sizeCode = `import InputAdornment from '@ui/components/InputAdornment';
import UserIcon from '@ui/components/icons/User';

<TextField
  size="small"
  placeholder="small size"
  slotProps={{
    input: {
      startAdornment: <InputAdornment position="start"><UserIcon sx={{ fontSize: 16 }} /></InputAdornment>,
    },
  }}
/>
<TextField
  placeholder="default size"
  slotProps={{
    input: {
      startAdornment: <InputAdornment position="start"><UserIcon sx={{ fontSize: 16 }} /></InputAdornment>,
    },
  }}
/>
<TextField
  size="large"
  placeholder="large size"
  slotProps={{
    input: {
      startAdornment: <InputAdornment position="start"><UserIcon sx={{ fontSize: 16 }} /></InputAdornment>,
    },
  }}
/>`;

const adornmentCode = `import InputAdornment from '@ui/components/InputAdornment';

<TextField
  placeholder="请输入金额"
  slotProps={{
    input: {
      startAdornment: <InputAdornment position="start">￥</InputAdornment>,
      endAdornment: <InputAdornment position="end">RMB</InputAdornment>,
    },
  }}
/>`;

const passwordCode = `import PreviewIcon from '@ui/components/icons/Preview';
import PreviewoffIcon from '@ui/components/icons/Previewoff';

const [showPassword, setShowPassword] = useState(false);

<TextField
  type={showPassword ? 'text' : 'password'}
  placeholder="请输入密码"
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
            {showPassword ? <PreviewIcon /> : <PreviewoffIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  }}
/>`;

const searchCode = `import SearchIcon from '@ui/components/icons/Search';

<TextField
  placeholder="搜索内容"
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton edge="end"><SearchIcon sx={{ fontSize: 16 }} /></IconButton>
        </InputAdornment>
      ),
    },
  }}
/>`;

const textareaCode = `import TextField from '@ui/components/TextField';
import InputAdornment from '@ui/components/InputAdornment';
import Typography from '@ui/components/Typography';

const [text, setText] = useState('');

<TextField
  multiline
  rows={4}
  placeholder="固定4行文本域"
  fullWidth
  value={text}
  onChange={(e) => setText(e.target.value.slice(0, 100))}
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end" sx={{ position: 'absolute', right: 12, bottom: 10, alignItems: 'flex-end' }}>
          <Typography sx={{ fontSize: 12, lineHeight: '16px', color: 'text.disabled' }}>
            {text.length}/100
          </Typography>
        </InputAdornment>
      ),
    },
  }}
/>
<TextField multiline minRows={2} maxRows={6} placeholder="自适应高度（2~6行）" fullWidth />`;

const clearCode = `import CloseCircleIcon from '@ui/components/icons/CloseCircle';

const [value, setValue] = useState('');

<TextField
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="可清除输入框"
  slotProps={{
    input: {
      endAdornment: value && (
        <InputAdornment position="end">
          <IconButton onClick={() => setValue('')} edge="end" size="small">
            <CloseCircleIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </InputAdornment>
      ),
    },
  }}
/>`;

const countCode = `const [text, setText] = useState('');

<TextField
  value={text}
  onChange={(e) => setText(e.target.value.slice(0, 20))}
  placeholder="最多20字"
  fullWidth
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <Typography sx={{ fontSize: 12, lineHeight: '16px', color: 'text.disabled' }}>
            {text.length}/20
          </Typography>
        </InputAdornment>
      ),
    },
  }}
/>`;

const statusCode = `<TextField placeholder="Error" error helperText="请输入正确内容" />
<TextField
  placeholder="Warning"
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'warning.main' },
      '&:hover fieldset': { borderColor: 'warning.main' },
      '&.Mui-focused fieldset': { borderColor: 'warning.main' },
    },
  }}
  helperText="警告提示"
  FormHelperTextProps={{ sx: { color: 'warning.main' } }}
/>
<TextField placeholder="禁用输入框" disabled />
<TextField defaultValue="只读内容" slotProps={{ input: { readOnly: true } }} />`;

const propsData = [
  { name: 'variant', type: "'outlined' | 'filled' | 'standard'", default: "'outlined'", description: '外观变体' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '控件大小：32px / 36px / 40px' },
  { name: 'placeholder', type: 'string', default: '-', description: '占位文字' },
  { name: 'label', type: 'string', default: '-', description: '标签文字' },
  { name: 'helperText', type: 'ReactNode', default: '-', description: '帮助/提示文字' },
  { name: 'error', type: 'boolean', default: 'false', description: '是否为错误状态' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: '是否占满宽度' },
  { name: 'multiline', type: 'boolean', default: 'false', description: '是否为多行文本域' },
  { name: 'rows', type: 'number', default: '-', description: '多行时固定行数' },
  { name: 'maxRows', type: 'number', default: '-', description: '多行时最大行数' },
  { name: 'type', type: 'string', default: "'text'", description: '输入类型（text/password/number等）' },
  { name: 'slotProps', type: 'object', default: '-', description: '传递给子组件的属性，如 slotProps.input 的 startAdornment/endAdornment' },
  { name: 'defaultValue', type: 'string', default: '-', description: '默认值' },
  { name: 'value', type: 'string', default: '-', description: '受控值' },
  { name: 'onChange', type: '(event) => void', default: '-', description: '值变化回调' },
];

function PasswordDemo() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      placeholder="请输入密码"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                {showPassword ? <PreviewIcon sx={{ fontSize: 16 }} /> : <PreviewoffIcon sx={{ fontSize: 16 }} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

function ClearDemo() {
  const [value, setValue] = useState('');
  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="可清除输入框"
      slotProps={{
        input: {
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton onClick={() => setValue('')} edge="end" size="small">
                <CloseCircleIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
}

function TextareaDemo() {
  const [text, setText] = useState('');
  return (
    <TextField
      multiline
      rows={4}
      placeholder="固定4行文本域"
      fullWidth
      value={text}
      onChange={(e) => { if (e.target.value.length <= 100) setText(e.target.value); }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{ position: 'absolute', right: 12, bottom: 10, alignItems: 'flex-end' }}>
              <Typography sx={{ fontSize: 12, lineHeight: '16px', color: 'text.disabled' }}>
                {text.length}/100
              </Typography>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

function CountDemo() {
  const [text, setText] = useState('');
  return (
    <TextField
      value={text}
      onChange={(e) => { if (e.target.value.length <= 20) setText(e.target.value); }}
      placeholder="最多20字"
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Typography sx={{ fontSize: 12, lineHeight: '16px', color: 'text.disabled' }}>
                {text.length}/20
              </Typography>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default function InputDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="input-title">
        Input 输入框
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        通过鼠标或键盘输入内容，是最基础的表单域的包装。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import TextField from '@ui/components/TextField'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本使用" description="基本的输入框用法。" code={basicCode}>
        <TextField placeholder="Basic usage" />
      </DemoBlock>

      <DemoBlock title="三种大小" description="输入框定义了三种尺寸（大、中、小）。" code={sizeCode}>
        <Stack spacing={2} sx={{ maxWidth: 360 }}>
          <TextField
            size="large"
            placeholder="large size"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><UserIcon sx={{ fontSize: 16 }} /></InputAdornment>,
              },
            }}
          />
          <TextField
            placeholder="default size"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><UserIcon sx={{ fontSize: 16 }} /></InputAdornment>,
              },
            }}
          />
          <TextField
            size="small"
            placeholder="small size"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><UserIcon sx={{ fontSize: 16 }} /></InputAdornment>,
              },
            }}
          />
        </Stack>
      </DemoBlock>

      <DemoBlock title="前缀和后缀" description="在输入框上添加前缀或后缀内容。" code={adornmentCode}>
        <TextField
          placeholder="请输入金额"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">￥</InputAdornment>,
              endAdornment: <InputAdornment position="end">RMB</InputAdornment>,
            },
          }}
        />
      </DemoBlock>

      <DemoBlock title="密码框" description="密码输入框，支持切换显示/隐藏。" code={passwordCode}>
        <PasswordDemo />
      </DemoBlock>

      <DemoBlock title="搜索框" description="带有搜索图标的输入框。" code={searchCode}>
        <TextField
          placeholder="搜索内容"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" size="small"><SearchIcon sx={{ fontSize: 16 }} /></IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </DemoBlock>

      <DemoBlock title="文本域" description="用于多行输入，支持固定行数或自适应高度。" code={textareaCode}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextareaDemo />
          <TextField multiline minRows={2} maxRows={6} placeholder="自适应高度（2~6行）" fullWidth />
        </Stack>
      </DemoBlock>

      <DemoBlock title="带移除图标" description="点击图标删除所有内容。" code={clearCode}>
        <ClearDemo />
      </DemoBlock>

      <DemoBlock title="带字数提示" description="展示字数提示。" code={countCode}>
        <CountDemo />
      </DemoBlock>

      <DemoBlock title="状态" description="集中展示错误、警告、禁用和只读状态。" code={statusCode}>
        <Stack spacing={2}>
          <TextField placeholder="Error" error helperText="请输入正确内容" />
          <TextField
            placeholder="Warning"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'warning.main' },
                '&:hover fieldset': { borderColor: 'warning.main' },
                '&.Mui-focused fieldset': { borderColor: 'warning.main' },
              },
            }}
            helperText="警告提示"
            FormHelperTextProps={{ sx: { color: 'warning.main' } }}
          />
          <TextField placeholder="禁用输入框" disabled />
          <TextField defaultValue="只读内容" slotProps={{ input: { readOnly: true } }} />
        </Stack>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
