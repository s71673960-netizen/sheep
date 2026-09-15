import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Button from '@ui/components/Button';
import IconButton from '@ui/components/IconButton';
import Divider from '@ui/components/Divider';
import Collapse from '@ui/components/Collapse';
import ArticleIcon from '@ui/components/icons/Article';
import DeleteIcon from '@ui/components/icons/Delete';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const descListCode = `import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';

const data = [
  { label: '编号:', value: 'SAMPLE-001' },
  { label: '名称:', value: '示例名称' },
  { label: '类型:', value: '示例类型' },
  { label: '日期:', value: '暂无数据' },
  { label: '状态:', value: '默认状态' },
  { label: '备注:', value: '示例备注' },
];

<Box sx={{ p: 1.5, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
    以下为示例信息：
  </Typography>
  <Stack spacing={2}>
    {data.map((item) => (
      <Stack key={item.label} direction="row" spacing={1}>
        <Typography sx={{ width: 96, flexShrink: 0, fontSize: 14, color: 'text.secondary' }}>
          {item.label}
        </Typography>
        <Typography sx={{ fontSize: 14, color: item.value === '暂无数据' ? 'text.disabled' : 'text.primary' }}>
          {item.value}
        </Typography>
      </Stack>
    ))}
  </Stack>
</Box>`;

const descData = [
  { label: '编号:', value: 'SAMPLE-001' },
  { label: '名称:', value: '示例名称' },
  { label: '类型:', value: '示例类型' },
  { label: '日期:', value: '暂无数据' },
  { label: '状态:', value: '默认状态' },
  { label: '备注:', value: '示例备注' },
];

const basicCode = `import React, { useState } from 'react';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import IconButton from '@ui/components/IconButton';
import ArticleIcon from '@ui/components/icons/Article';
import DeleteIcon from '@ui/components/icons/Delete';

const [files, setFiles] = useState([
  '示例文档一.pdf',
  '示例文档二.pdf',
  '示例表格.xlsx',
]);

const handleDelete = (name) => {
  setFiles((prev) => prev.filter((f) => f !== name));
};

<Stack spacing={0}>
  {files.map((name) => (
    <Stack key={name} direction="row" alignItems="center" sx={{
      px: 1, py: 0.5, gap: 1, borderRadius: 1, height: 40,
      '&:hover': { bgcolor: 'action.hover' },
      '&:hover .delete-btn': { opacity: 1 },
    }}>
      <ArticleIcon sx={{ fontSize: 16, color: 'text.tertiary' }} />
      <Typography sx={{ fontSize: 14, flex: 1 }}>{name}</Typography>
      <IconButton className="delete-btn" size="small" sx={{ opacity: 0 }} onClick={() => handleDelete(name)}>
        <DeleteIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Stack>
  ))}
</Stack>`;

const basicFiles = [
  '示例文档一.pdf',
  '示例文档二.pdf',
  '示例表格.xlsx',
];

const actionListCode = `import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Button from '@ui/components/Button';

const fields = [
  { label: '字段一', value: '示例内容一' },
  { label: '字段二', value: '示例内容二 / 示例内容三' },
  { label: '字段三', value: '暂无内容' },
];

<Box sx={{ p: 1.5, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
    这是一段示例标题
  </Typography>
  <Stack spacing="16px">
    {fields.map((item) => (
      <Stack key={item.label} spacing="8px">
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>
          {item.label}
        </Typography>
        <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
          {item.value}
        </Typography>
      </Stack>
    ))}
    <Stack spacing="8px">
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>
        请选择一个操作
      </Typography>
      <Stack direction="row" spacing="8px">
        <Button variant="outlined" color="primary">操作一</Button>
        <Button variant="outlined" color="error">操作二</Button>
      </Stack>
    </Stack>
  </Stack>
</Box>`;

const actionFields = [
  { label: '字段一', value: '示例内容一' },
  { label: '字段二', value: '示例内容二 / 示例内容三' },
  { label: '字段三', value: '暂无内容' },
];

const propsData = [
  { name: 'dense', type: 'boolean', default: 'false', description: '紧凑模式，减少列表项间距' },
  { name: 'disablePadding', type: 'boolean', default: 'false', description: '移除列表内边距' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式' },
];

export default function ListDoc() {
  const [files, setFiles] = useState([...basicFiles]);
  const [removing, setRemoving] = useState(null);

  const handleDelete = (name) => {
    setRemoving(name);
    setTimeout(() => {
      setFiles((prev) => prev.filter((f) => f !== name));
      setRemoving(null);
    }, 300);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="list-title">
        List 列表
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        列表用于展示一组结构化的数据，可以包含图标、文字和操作。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import List from '@ui/components/List'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="描述列表" description="键值对形式的纯文字描述列表，适合展示结构化信息。" code={descListCode}>
        <Box sx={{ p: 1.5, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary', lineHeight: '150%' }}>
            以下为示例信息：
          </Typography>
          <Stack spacing={2}>
            {descData.map((item) => (
              <Stack key={item.label} direction="row" spacing={1}>
                <Typography sx={{ width: 96, flexShrink: 0, fontSize: 14, color: 'text.secondary', lineHeight: '115%', letterSpacing: '0.01em' }}>
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '115%', letterSpacing: '0.01em', color: item.value === '暂无数据' ? 'text.disabled' : 'text.primary' }}>
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </DemoBlock>

      <DemoBlock title="基本列表" description="带图标和操作的文件列表，悬浮显示删除按钮。" code={basicCode}>
        <Stack spacing={0} sx={{ width: '100%' }}>
          {files.map((name) => (
            <Collapse key={name} in={removing !== name} timeout={300}>
              <Stack direction="row" alignItems="center" sx={{
                px: 1, py: 0.5, gap: 1, borderRadius: 1, height: 40,
                '&:hover': { bgcolor: 'action.hover' },
                '&:hover .list-delete-btn': { opacity: 1 },
              }}>
                <ArticleIcon sx={{ fontSize: 16, color: 'text.tertiary' }} />
                <Typography sx={{ fontSize: 14, color: 'text.primary', flex: 1, lineHeight: '20px' }}>{name}</Typography>
                <IconButton className="list-delete-btn" size="small" sx={{ p: '6px', opacity: 0, transition: 'opacity 0.15s' }} onClick={() => handleDelete(name)}>
                  <DeleteIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </IconButton>
              </Stack>
            </Collapse>
          ))}
        </Stack>
      </DemoBlock>

      <DemoBlock title="带操作的列表" description="上下结构的字段列表，底部可包含操作按钮。" code={actionListCode}>
        <Box sx={{ p: 1.5, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary', lineHeight: '150%' }}>
            这是一段示例标题
          </Typography>
          <Stack spacing="16px">
            {actionFields.map((item) => (
              <Stack key={item.label} spacing="8px">
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary', lineHeight: '115%', letterSpacing: '0.01em' }}>
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: 14, color: 'text.primary', lineHeight: '115%', letterSpacing: '0.01em' }}>
                  {item.value}
                </Typography>
              </Stack>
            ))}
            <Stack spacing="8px">
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary', lineHeight: '115%', letterSpacing: '0.01em' }}>
                请选择一个操作
              </Typography>
              <Stack direction="row" spacing="8px">
                <Button variant="outlined" color="primary">操作一</Button>
                <Button variant="outlined" color="error">操作二</Button>
              </Stack>
            </Stack>
          </Stack>
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
