import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Pagination from '@ui/components/Pagination';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Stack from '@ui/components/Stack';
import Select from '@ui/components/Select';
import MenuItem from '@ui/components/MenuItem';
import TextField from '@ui/components/TextField';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Pagination from '@ui/components/Pagination';

<Pagination count={10} />`;

const styleCode = `<Pagination count={10} color="primary" />
<Pagination count={10} variant="outlined" />`;

const moreCode = `// 更多页码时自动显示省略号
<Pagination count={20} defaultPage={6} />`;

const controlledCode = `const [page, setPage] = useState(3);

<Pagination
  count={10}
  page={page}
  onChange={(e, v) => setPage(v)}
  color="primary"
/>`;

const disabledCode = `<Pagination count={10} disabled />`;

const fullCode = `// 完整分页：页码 + 每页条数 + 跳转
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [jumpValue, setJumpValue] = useState('');
const total = 50;
const count = Math.ceil(total / pageSize);

<Stack direction="row" alignItems="center" spacing={2}>
  <Pagination
    count={count}
    page={page}
    onChange={(e, v) => setPage(v)}
  />
  <Select
    size="small"
    value={pageSize}
    onChange={(e) => { setPageSize(e.target.value); setPage(1); }}
    sx={{ minWidth: 100 }}
  >
    <MenuItem value={10}>10 条/页</MenuItem>
    <MenuItem value={20}>20 条/页</MenuItem>
    <MenuItem value={50}>50 条/页</MenuItem>
  </Select>
  <Stack direction="row" alignItems="center" spacing={1}>
    <Typography variant="body2">跳至</Typography>
    <TextField
      size="small"
      sx={{ width: 56 }}
      value={jumpValue}
      onChange={(e) => setJumpValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const p = Number(jumpValue);
          if (p >= 1 && p <= count) setPage(p);
          setJumpValue('');
        }
      }}
    />
    <Typography variant="body2">页</Typography>
  </Stack>
</Stack>`;

const propsData = [
  { name: 'count', type: 'number', default: '1', description: '总页数' },
  { name: 'page', type: 'number', default: '-', description: '当前页（受控）' },
  { name: 'defaultPage', type: 'number', default: '1', description: '默认当前页' },
  { name: 'color', type: "'primary' | 'secondary' | 'standard'", default: "'standard'", description: '选中项颜色' },
  { name: 'variant', type: "'text' | 'outlined'", default: "'text'", description: '外观变体' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '尺寸' },
  { name: 'shape', type: "'circular' | 'rounded'", default: "'rounded'", description: '形状' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'showFirstButton', type: 'boolean', default: 'false', description: '显示首页按钮' },
  { name: 'showLastButton', type: 'boolean', default: 'false', description: '显示尾页按钮' },
  { name: 'onChange', type: '(event, page) => void', default: '-', description: '页码变化回调' },
];

export default function PaginationDoc() {
  const [page, setPage] = useState(3);

  // 完整分页 state
  const [fullPage, setFullPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [jumpValue, setJumpValue] = useState('');
  const total = 50;
  const fullCount = Math.ceil(total / pageSize);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="pagination-title">
        Pagination 分页
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        分页器用于分隔长列表，每次只加载一个页面。当加载/渲染所有数据将花费很多时间时使用。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Pagination from '@ui/components/Pagination'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本" description="基础分页。" code={basicCode}>
        <Pagination count={10} />
      </DemoBlock>

      <DemoBlock title="完整功能" description="带每页条数选择和页码跳转的完整分页。" code={fullCode}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Pagination
            count={fullCount}
            page={fullPage}
            onChange={(e, v) => setFullPage(v)}
          />
          <Select
            size="small"
            value={pageSize}
            onChange={(e) => { setPageSize(e.target.value); setFullPage(1); }}
            sx={{ minWidth: 100 }}
          >
            <MenuItem value={10}>10 条/页</MenuItem>
            <MenuItem value={20}>20 条/页</MenuItem>
            <MenuItem value={50}>50 条/页</MenuItem>
          </Select>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">跳至</Typography>
            <TextField
              size="small"
              sx={{ width: 56 }}
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const p = Number(jumpValue);
                  if (p >= 1 && p <= fullCount) setFullPage(p);
                  setJumpValue('');
                }
              }}
            />
            <Typography variant="body2">页</Typography>
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock title="样式" description="展示主题色和描边两种常用样式。" code={styleCode}>
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
          <Pagination count={10} variant="outlined" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="更多" description="页码多时自动显示省略号。" code={moreCode}>
        <Pagination count={20} defaultPage={6} />
      </DemoBlock>

      <DemoBlock title="受控" description="通过 page 和 onChange 实现受控模式。" code={controlledCode}>
        <Pagination
          count={10}
          page={page}
          onChange={(e, v) => setPage(v)}
          color="primary"
        />
      </DemoBlock>

      <DemoBlock title="禁用" description="禁用分页。" code={disabledCode}>
        <Pagination count={10} disabled />
      </DemoBlock>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>API</Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
