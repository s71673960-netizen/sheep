import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Table from '@ui/components/Table';
import TableBody from '@ui/components/TableBody';
import TableCell from '@ui/components/TableCell';
import TableContainer from '@ui/components/TableContainer';
import TableHead from '@ui/components/TableHead';
import TableRow from '@ui/components/TableRow';
import TableSortLabel from '@ui/components/TableSortLabel';
import Checkbox from '@ui/components/Checkbox';
import Chip from '@ui/components/Chip';
import Collapse from '@ui/components/Collapse';
import Stack from '@ui/components/Stack';
import IconButton from '@ui/components/IconButton';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Link from '@ui/components/Link';
import SvgIcon from '@ui/components/SvgIcon';
import Scrollbar from '@ui/components/Scrollbar';
import PreviewIcon from '@ui/components/icons/Preview';
import EditIcon from '@ui/components/icons/Edit';
import DeleteIcon from '@ui/components/icons/Delete';
import AddIcon from '@ui/components/icons/Add';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

function SortIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" sx={{ fontSize: 18 }}>
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor" transform="rotate(90 12 12)" />
    </SvgIcon>
  );
}

function CbUnchecked(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'text.tertiary' }}>
      <rect x="0.75" y="0.75" width="12.5" height="12.5" rx="2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </SvgIcon>
  );
}

function CbChecked(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'primary.main' }}>
      <rect width="14" height="14" rx="3" fill="currentColor" />
      <path d="M3.5 7.2L5.8 9.5L10.5 4.5" fill="none" stroke="var(--checkbox-mark-color, #fff)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function CbIndeterminate(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14, color: 'primary.main' }}>
      <rect width="14" height="14" rx="3" fill="currentColor" />
      <path d="M4 7H10" fill="none" stroke="var(--checkbox-mark-color, #fff)" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

const basicCode = `import Table from '@ui/components/Table';
import TableBody from '@ui/components/TableBody';
import TableCell from '@ui/components/TableCell';
import TableContainer from '@ui/components/TableContainer';
import TableHead from '@ui/components/TableHead';
import TableRow from '@ui/components/TableRow';
import Chip from '@ui/components/Chip';

const columns = ['标题', '状态', '类型', '数值一', '数值二'];
const rows = [
  { name: '示例条目一', status: '状态一', statusColor: 'success', type: '类型一', valueA: 10, valueB: 20 },
  { name: '示例条目二', status: '状态二', statusColor: 'warning', type: '类型二', valueA: 30, valueB: 40 },
];

<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        {columns.map(col => <TableCell key={col}>{col}</TableCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.name}>
          <TableCell>{row.name}</TableCell>
          <TableCell><Chip label={row.status} color={row.statusColor} /></TableCell>
          <TableCell>{row.type}</TableCell>
          <TableCell>{row.valueA}</TableCell>
          <TableCell>{row.valueB}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>`;

const sortCode = `import TableSortLabel from '@ui/components/TableSortLabel';

<TableCell>
  <TableSortLabel active={orderBy === 'name'} direction={order}>
    标题
  </TableSortLabel>
</TableCell>`;

const sizeCode = `<Table size="small">
  ...
</Table>`;

const selectionCode = `<TableRow hover selected>
  <TableCell padding="checkbox">
    <Checkbox checked />
  </TableCell>
  <TableCell>示例条目</TableCell>
</TableRow>`;

const fixedColumnCode = `import Scrollbar from '@ui/components/Scrollbar';
import Link from '@ui/components/Link';

const stickyHeadSx = {
  position: 'sticky', right: 0, bgcolor: 'background.soft', zIndex: 2,
  whiteSpace: 'nowrap',
  '&::before': {
    content: '""', position: 'absolute',
    top: 0, bottom: 0, left: 0, width: '20px',
    transform: 'translateX(-100%)',
    background: (theme) => theme.palette.mode === 'dark'
      ? 'linear-gradient(to right, transparent, rgba(0,0,0,0.32))'
      : 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))',
    pointerEvents: 'none',
  },
};
const stickyCellSx = { ...stickyHeadSx, bgcolor: 'background.paper', zIndex: 1 };

<Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
  <Scrollbar>
    <Table sx={{ minWidth: 1400 }}>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Field 1</TableCell>
          ...
          <TableCell sx={stickyHeadSx}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Example</TableCell>
          <TableCell>Content</TableCell>
          ...
          <TableCell sx={stickyCellSx}>
            <Link href="#">action</Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Scrollbar>
</Box>`;

const rows1 = [
  { name: '示例条目一', status: '状态一', statusColor: 'success', type: '类型一', valueA: 10, valueB: 20 },
  { name: '示例条目二', status: '状态二', statusColor: 'warning', type: '类型二', valueA: 30, valueB: 40 },
];

const sortRows = [
  { name: '示例条目一', status: '状态一', statusColor: 'success', type: '类型一', valueA: 10, valueB: 20 },
  { name: '示例条目二', status: '状态二', statusColor: 'warning', type: '类型二', valueA: 30, valueB: 40 },
];

const propsData = [
  { name: 'size', type: "'small' | 'medium'", default: "'medium'", description: '表格紧凑程度' },
  { name: 'padding', type: "'checkbox' | 'none' | 'normal'", default: "'normal'", description: '单元格内边距' },
  { name: 'stickyHeader', type: 'boolean', default: 'false', description: '是否固定表头' },
];

const cellPropsData = [
  { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: '对齐方式' },
  { name: 'padding', type: "'checkbox' | 'none' | 'normal'", default: "'normal'", description: '内边距' },
  { name: 'size', type: "'small' | 'medium'", default: '-', description: '继承自 Table' },
  { name: 'sortDirection', type: "'asc' | 'desc' | false", default: '-', description: '排序方向（用于 aria）' },
  { name: 'variant', type: "'head' | 'body' | 'footer'", default: '-', description: '自动根据上下文推断' },
];

const expandableCode = `// 可展开表格关键实现
import Collapse from '@ui/components/Collapse';
import IconButton from '@ui/components/IconButton';

// 父行 + 展开行结构
<TableRow>
  <TableCell>
    <IconButton onClick={() => setOpen(!open)}>
      {open ? <CollapseIcon /> : <ExpandIcon />}
    </IconButton>
  </TableCell>
  <TableCell>数据列...</TableCell>
</TableRow>
<TableRow>
  <TableCell colSpan={N} sx={{ p: '0 !important', border: 'none !important', height: 0 }}>
    <Collapse in={open} timeout={300}>
      <Box>
        {/* 展开区域内容 */}
      </Box>
    </Collapse>
  </TableCell>
</TableRow>`;

const expandableRows = [
  { name: '示例条目一', category: '分类一', version: 'V2', children: [{ name: '子项一' }, { name: '子项二' }] },
  { name: '示例条目二', category: '分类二', version: 'V1', children: [{ name: '子项三' }] },
  { name: '示例条目三', category: '分类三', version: 'V3', children: [] },
];

function ExpandableIconPlus() {
  return (
    <SvgIcon sx={{ fontSize: 16, color: 'text.tertiary' }} viewBox="0 0 16 16">
      <path d="M8 3.87695C8.27608 3.87695 8.4999 4.1009 8.5 4.37695V7.50195H11.624C11.9 7.50212 12.124 7.72591 12.124 8.00195C12.124 8.27794 11.9 8.50178 11.624 8.50195H8.5V11.624C8.49999 11.9002 8.27614 12.124 8 12.124C7.72386 12.124 7.50001 11.9002 7.5 11.624V8.50195H4.37695C4.10084 8.50195 3.87701 8.27805 3.87695 8.00195C3.87695 7.72581 4.10081 7.50195 4.37695 7.50195H7.5V4.37695C7.5001 4.1009 7.72392 3.87696 8 3.87695Z" fill="currentColor"/>
      <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" fill="none"/>
    </SvgIcon>
  );
}

function ExpandableIconMinus() {
  return (
    <SvgIcon sx={{ fontSize: 16, color: 'primary.main' }} viewBox="0 0 16 16">
      <path d="M11.624 7.50195C11.9 7.50212 12.124 7.72591 12.124 8.00195C12.124 8.27794 11.9 8.50178 11.624 8.50195H4.37695C4.10084 8.50195 3.87701 8.27805 3.87695 8.00195C3.87695 7.72581 4.10081 7.50195 4.37695 7.50195H11.624Z" fill="currentColor"/>
      <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" fill="none"/>
    </SvgIcon>
  );
}

function ExpandableRow({ row }) {
  const [open, setOpen] = React.useState(false);
  const hasChildren = row.children && row.children.length > 0;
  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell sx={{ textAlign: 'center', p: 0, width: 48 }}>
          {hasChildren && (
            <IconButton
              size="small"
              aria-label={open ? `收起${row.name}` : `展开${row.name}`}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              sx={{
                width: 28,
                height: 28,
                p: 0,
                borderRadius: '7px',
              }}
            >
              {open ? <ExpandableIconMinus /> : <ExpandableIconPlus />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell>{row.version}</TableCell>
      </TableRow>
      {hasChildren && (
        <TableRow>
          <TableCell colSpan={4} sx={{ p: '0 !important', border: 'none !important', height: 0 }}>
            <Collapse in={open} timeout={300}>
              <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '48px minmax(0, 4fr) minmax(0, 3fr) minmax(0, 3fr)',
                    alignItems: 'center',
                    minHeight: 40,
                    py: '6px',
                    bgcolor: 'background.default',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ gridColumn: 2, px: '16px', fontWeight: 600 }}
                  >
                    子项 {row.children.length}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{
                      gridColumn: 4,
                      justifySelf: 'start',
                      minHeight: 28,
                      ml: '16px',
                      px: 1.25,
                      borderRadius: '7px',
                      fontSize: 12,
                    }}
                  >
                    新建
                  </Button>
                </Box>
                <Table sx={{ tableLayout: 'fixed' }}>
                  <colgroup>
                    <col style={{ width: 48 }} />
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '30%' }} />
                  </colgroup>
                  <TableBody>
                    {row.children.map((child, i) => (
                      <TableRow key={i} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                        <TableCell sx={{ width: 48, p: 0, borderColor: 'divider' }} />
                        <TableCell sx={{ borderColor: 'divider' }}>{child.name}</TableCell>
                        <TableCell sx={{ borderColor: 'divider' }} />
                        <TableCell sx={{ borderColor: 'divider' }} />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

export default function TableDoc() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('valueB');
  const [selected, setSelected] = useState([]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = [...sortRows].sort((a, b) => {
    if (order === 'asc') return a[orderBy] > b[orderBy] ? 1 : -1;
    return a[orderBy] < b[orderBy] ? 1 : -1;
  });

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const handleSelect = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(sortRows.map((row) => row.name));
    } else {
      setSelected([]);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="table-title">
        Table 表格
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        展示行列数据。当有大量结构化数据需要展现，或需要对数据进行排序、搜索、分页等操作时使用。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Table from '@ui/components/Table'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="简单的表格，含表头和数据行。" code={basicCode}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>标题</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>数值一</TableCell>
                <TableCell>数值二</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows1.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><Chip label={row.status} color={row.statusColor} /></TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.valueA}</TableCell>
                  <TableCell>{row.valueB}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DemoBlock>

      <DemoBlock title="排序" description="点击表头可排序，支持升序/降序切换。" code={sortCode}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                    IconComponent={SortIcon}
                  >
                    标题
                  </TableSortLabel>
                </TableCell>
                <TableCell>状态</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'valueA'}
                    direction={orderBy === 'valueA' ? order : 'asc'}
                    onClick={() => handleSort('valueA')}
                    IconComponent={SortIcon}
                  >
                    数值一
                  </TableSortLabel>
                </TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><Chip label={row.status} color={row.statusColor} /></TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.valueA}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing="16px" alignItems="center" sx={{ color: 'primary.main', fontSize: 13 }}>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ cursor: 'pointer' }}>
                        <PreviewIcon sx={{ fontSize: 16 }} />
                        <span>查看</span>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ cursor: 'pointer' }}>
                        <EditIcon sx={{ fontSize: 16 }} />
                        <span>应用</span>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ cursor: 'pointer' }}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                        <span>删除</span>
                      </Stack>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DemoBlock>

      <DemoBlock title="可选择" description="第一列为选择框，支持全选和单行选择。" code={selectionCode}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ textAlign: 'center' }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < sortRows.length}
                    checked={selected.length === sortRows.length}
                    onChange={handleSelectAll}
                    icon={<CbUnchecked />}
                    checkedIcon={<CbChecked />}
                    indeterminateIcon={<CbIndeterminate />}
                    sx={{ p: 0 }}
                  />
                </TableCell>
                <TableCell>标题</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>数值一</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortRows.map((row) => (
                <TableRow
                  key={row.name}
                  hover
                  selected={isSelected(row.name)}
                  onClick={() => handleSelect(row.name)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox" sx={{ textAlign: 'center' }}>
                    <Checkbox checked={isSelected(row.name)} icon={<CbUnchecked />} checkedIcon={<CbChecked />} sx={{ p: 0 }} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><Chip label={row.status} color={row.statusColor} /></TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.valueA}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DemoBlock>

      <DemoBlock title="紧凑型" description="size='small' 减小行高和内边距。" code={sizeCode}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>标题</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>数值一</TableCell>
                <TableCell>数值二</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows1.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><Chip label={row.status} color={row.statusColor} /></TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.valueA}</TableCell>
                  <TableCell>{row.valueB}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DemoBlock>

      <DemoBlock title="固定列" description="列数较多时，固定操作列到右侧，配合 Scrollbar 横向滚动查看其他列。" code={fixedColumnCode}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 1400 }}>
              <TableHead>
                <TableRow>
                  {['Full Name', 'Age', 'Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6'].map((col) => (
                    <TableCell key={col} sx={{ whiteSpace: 'nowrap' }}>{col}</TableCell>
                  ))}
                  <TableCell sx={{ position: 'sticky', right: 0, bgcolor: 'background.soft', zIndex: 2, whiteSpace: 'nowrap', '&::before': { content: '""', position: 'absolute', top: 0, bottom: 0, left: 0, width: '20px', transform: 'translateX(-100%)', background: (theme) => `linear-gradient(to right, transparent, ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.06)'})`, pointerEvents: 'none' } }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: '示例一', age: 10 },
                  { name: '示例二', age: 20 },
                  { name: '示例三', age: 30 },
                  { name: '示例四', age: 40 },
                ].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>示例内容</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>示例内容</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>示例内容</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>示例内容</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>示例内容</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>示例内容</TableCell>
                    <TableCell sx={{ position: 'sticky', right: 0, bgcolor: 'background.paper', zIndex: 1, whiteSpace: 'nowrap', '&::before': { content: '""', position: 'absolute', top: 0, bottom: 0, left: 0, width: '20px', transform: 'translateX(-100%)', background: (theme) => `linear-gradient(to right, transparent, ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.06)'})`, pointerEvents: 'none' } }}>
                      <Link href="#" underline="hover" sx={{ color: 'primary.main' }}>操作</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </DemoBlock>

      <DemoBlock title="可展开" description="行可展开收起，通过 Collapse 组件实现推拉动画效果，适用于树形数据或父子关系的数据展示。" code={expandableCode}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
          <Table sx={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: 48 }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 48, p: 0 }} />
                <TableCell>名称</TableCell>
                <TableCell>分类</TableCell>
                <TableCell>版本</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expandableRows.map((row, idx) => (
                <ExpandableRow key={idx} row={row} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Table</Typography>
      <PropsTable data={propsData} />
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>TableCell</Typography>
      <PropsTable data={cellPropsData} />
    </Box>
  );
}
