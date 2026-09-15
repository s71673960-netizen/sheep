import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Card from '@ui/components/Card';
import CardHeader from '@ui/components/CardHeader';
import CardContent from '@ui/components/CardContent';
import CardActions from '@ui/components/CardActions';
import Button from '@ui/components/Button';
import Typography from '@ui/components/Typography';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Grid from '@ui/components/Grid';
import Divider from '@ui/components/Divider';
import Chip from '@ui/components/Chip';
import SvgIcon from '@ui/components/SvgIcon';
import AddIcon from '@ui/components/icons/Add';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const cardSx = {
  background: 'background.paper',
  border: 'none',
  boxShadow: (theme) =>
    theme.palette.mode === 'dark'
      ? '0 12px 32px rgba(0, 0, 0, 0.28)'
      : '0px 0px 1px rgba(101, 94, 85, 0.2), 0px 8px 16px rgba(101, 94, 85, 0.08)',
  borderRadius: '21px',
  p: '8px',
  width: '100%',
};

const detailData = [
  { label: '编号:', value: 'SAMPLE-001' },
  { label: '名称:', value: '示例名称' },
  { label: '类型:', value: '示例类型' },
  { label: '日期:', value: '暂无数据', empty: true },
  { label: '状态:', value: '默认状态' },
  { label: '备注:', value: '示例备注' },
];

const basicCode = `import Card from '@ui/components/Card';
import CardHeader from '@ui/components/CardHeader';
import CardContent from '@ui/components/CardContent';

<Card sx={{ width: { xs: '100%', sm: 300 } }}>
  <CardHeader title="示例标题" action={<Button size="small" variant="text">更多</Button>} />
  <CardContent>
    <Typography variant="body2">示例内容</Typography>
  </CardContent>
</Card>`;

const infoCardCode = `// 纯信息展示卡片
<Card sx={{
  background: 'background.paper',
  border: 'none',
  borderRadius: '21px',
  p: '8px',
}}>
  <Box sx={{ borderRadius: '8px', p: '12px' }}>
    <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary' }}>
      以下为示例信息：
    </Typography>
    <Stack spacing="16px" sx={{ mt: '20px' }}>
      <Stack direction="row">
        <Typography sx={{ width: 96, fontSize: 14, color: 'text.secondary' }}>编号:</Typography>
        <Typography sx={{ fontSize: 14, color: 'text.primary' }}>SAMPLE-001</Typography>
      </Stack>
    </Stack>
  </Box>
</Card>`;

const actionsCode = `// 带操作的信息卡片
<Box sx={cardSx}>
  <Box sx={{ borderRadius: '8px', p: '12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary' }}>
      这是一段示例标题
    </Typography>
    <Stack spacing="8px">
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>字段一</Typography>
        <Typography sx={{ fontSize: 14, color: 'text.primary', mt: '8px' }}>示例内容</Typography>
      </Box>
    </Stack>
    <Box>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>
        请选择一个操作
      </Typography>
      <Stack direction="row" spacing="8px" sx={{ mt: '8px' }}>
        <Button variant="outlined" color="primary">操作一</Button>
        <Button variant="outlined" color="error">操作二</Button>
      </Stack>
    </Box>
  </Box>
</Box>`;

const gridCardCode = `import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import SvgIcon from '@ui/components/SvgIcon';
import AddIcon from '@ui/components/icons/Add';

// 网格卡片样式
const gridCardSx = {
  p: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  minHeight: 160,
  background: 'background.paper',
  border: 'none',
  borderRadius: '16px',
};

// 操作按钮 hover 样式
const actionBtnSx = {
  flex: 1,
  justifyContent: 'center',
  cursor: 'pointer',
  py: '6px',
  borderRadius: '7px',
  '&:hover': { bgcolor: 'action.hover' },
};

// 箭头图标
function ArrowUpRightIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path d="M5 11L11 5M11 5H6M11 5V10" fill="none"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
  {items.map((item) => (
    <Box sx={gridCardSx}>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {item.name}
      </Typography>
      <Stack spacing={0.5} sx={{ flexShrink: 0 }}>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ fontSize: 12, color: 'text.tertiary' }}>数值：</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main' }}>{item.progress}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ fontSize: 12, color: 'text.tertiary' }}>时间：</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.primary' }}>{item.time}</Typography>
        </Stack>
      </Stack>
      <Box sx={{ mt: 'auto', borderTop: '1px solid', borderColor: 'divider', pt: '12px' }}>
        <Stack direction="row" alignItems="center" spacing={0}>
          <Stack direction="row" alignItems="center" spacing={0.5} sx={actionBtnSx}>
            <AddIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 12 }}>操作一</Typography>
          </Stack>
          <Box sx={{ width: 0, height: 16, borderLeft: '1px solid', borderColor: 'divider' }} />
          <Stack direction="row" alignItems="center" spacing={0.5} sx={actionBtnSx}>
            <ArrowUpRightIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 12 }}>操作二</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  ))}
</Box>`;

const contentCardCode = `import Card from '@ui/components/Card';
import Box from '@ui/components/Box';
import Stack from '@ui/components/Stack';
import Typography from '@ui/components/Typography';
import Chip from '@ui/components/Chip';
import SvgIcon from '@ui/components/SvgIcon';

// 内容卡片 — 带封面图、标签、描述和底部操作栏
<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
  {items.map((item) => (
    <Card hoverable sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: '16px', gap: '16px', borderRadius: '16px' }}>
      {/* 封面图 */}
      <Box sx={{ position: 'relative', height: 110, borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
        <Box component="img" src={item.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)' }} />
      </Box>
      {/* 内容 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{item.title}</Typography>
        <Stack direction="row" sx={{ gap: '10px', flexWrap: 'wrap' }}>
          {item.tags.map((tag) => <Chip key={tag} label={tag} size="small" />)}
        </Stack>
        <Typography sx={{ fontSize: 12, color: 'text.tertiary', lineHeight: '160%',
          overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {item.description}
        </Typography>
      </Box>
      {/* 操作栏 */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', display: 'flex', pt: '6px' }}>
        {item.actions.map((action, i) => (
          <React.Fragment key={action}>
            {i > 0 && <Box sx={{ width: '1px', bgcolor: 'divider', my: '2px' }} />}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
              gap: '4px', height: 28, cursor: 'pointer', borderRadius: '6px',
              '&:hover': { bgcolor: 'action.hover' } }}>
              <Typography sx={{ fontSize: 12 }}>{action}</Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Card>
  ))}
</Box>`;

const actionData = [
  { label: '字段一', value: '示例内容一' },
  { label: '字段二', value: '示例内容二 / 示例内容三' },
  { label: '字段三', value: '暂无内容' },
];

const propsData = [
  { name: 'raised', type: 'boolean', default: 'false', description: '是否使用阴影悬浮效果' },
  { name: 'hoverable', type: 'boolean', default: 'false', description: '鼠标移过时可浮起' },
  { name: 'variant', type: "'outlined' | 'elevation'", default: "'outlined'", description: '卡片变体样式' },
  { name: 'sx', type: 'object', default: '-', description: '自定义样式' },
];

const headerPropsData = [
  { name: 'title', type: 'ReactNode', default: '-', description: '标题内容' },
  { name: 'subheader', type: 'ReactNode', default: '-', description: '副标题内容' },
  { name: 'avatar', type: 'ReactNode', default: '-', description: '头像/图标' },
  { name: 'action', type: 'ReactNode', default: '-', description: '右上角操作区域' },
];

export default function CardDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="card-title">
        Card 卡片
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        通用卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Card from '@ui/components/Card'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="典型卡片" description="包含标题、内容、操作区域。" code={basicCode}>
        <Stack spacing={2}>
          <Card sx={{ width: { xs: '100%', sm: 300 } }}>
            <CardHeader
              title="示例标题"
              action={
                <Button size="small" variant="text">
                  更多
                </Button>
              }
            />
            <CardContent>
              <Typography variant="body2">示例内容</Typography>
              <Typography variant="body2">示例内容</Typography>
              <Typography variant="body2">示例内容</Typography>
            </CardContent>
          </Card>
        </Stack>
      </DemoBlock>

      <DemoBlock title="信息展示卡片 — 键值对型" description="使用键值对布局展示通用信息。" code={infoCardCode}>
        <Box sx={cardSx}>
          <Box sx={{ borderRadius: '8px', p: '12px' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary', lineHeight: '150%' }}>
              以下为示例信息：
            </Typography>
            <Stack spacing="16px" sx={{ mt: '20px' }}>
              {detailData.map((item, i) => (
                <Stack key={i} direction="row" alignItems="flex-start">
                  <Typography sx={{ width: 96, flexShrink: 0, fontSize: 14, fontWeight: 400, color: 'text.secondary', letterSpacing: '0.01em', lineHeight: '115%' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 400, color: item.empty ? 'text.disabled' : 'text.primary', letterSpacing: '0.01em', lineHeight: '115%' }}>
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </DemoBlock>

      <DemoBlock title="带操作的信息卡片" description="包含说明文字和操作按钮，适合需要用户确认的场景。" code={actionsCode}>
        <Box sx={cardSx}>
          <Box sx={{ borderRadius: '8px', p: '12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary', lineHeight: '150%' }}>
              这是一段示例标题
            </Typography>
            <Stack spacing="8px">
              {actionData.map((item, i) => (
                <Stack key={i} spacing="8px">
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary', letterSpacing: '0.01em', lineHeight: '115%' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 400, color: 'text.primary', letterSpacing: '0.01em', lineHeight: '115%' }}>
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Stack spacing="8px">
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary', letterSpacing: '0.01em', lineHeight: '115%' }}>
                请选择一个操作
              </Typography>
              <Stack direction="row" spacing="8px">
                <Button
                  variant="outlined"
                  sx={{
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: '6px',
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                    fontSize: 14,
                    fontWeight: 400,
                    height: 32,
                    px: '8px',
                    textTransform: 'none',
                    '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
                  }}
                >
                  操作一
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    border: '1px solid',
                    borderColor: 'error.main',
                    borderRadius: '6px',
                    color: 'error.main',
                    backgroundColor: 'transparent',
                    fontSize: 14,
                    fontWeight: 400,
                    height: 32,
                    px: '8px',
                    textTransform: 'none',
                    '&:hover': { borderColor: 'error.main', backgroundColor: 'action.hover' },
                  }}
                >
                  操作二
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </DemoBlock>

      <DemoBlock title="网格卡片" description="带标题、键值信息和底部操作栏的通用网格卡片。" code={gridCardCode}>
        <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
          {[
            { name: '示例卡片一', progress: '4/10', time: '2026-04-29 17:00' },
            { name: '示例卡片二', progress: '7/7', time: '2026-03-05 10:10' },
            { name: '示例卡片三', progress: '10/13', time: '2026-04-10 09:17' },
            { name: '示例卡片四', progress: '10/10', time: '2026-01-07 16:39' },
          ].map((item, idx) => (
            <Box key={idx} sx={{ p: '16px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 160, background: 'background.paper', border: 'none', borderRadius: '16px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.name}</Typography>
              <Stack spacing={0.5} sx={{ flexShrink: 0 }}>
                <Stack direction="row" alignItems="center">
                  <Typography sx={{ fontSize: 12, color: 'text.tertiary' }}>数值：</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main' }}>{item.progress}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Typography sx={{ fontSize: 12, color: 'text.tertiary' }}>时间：</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.primary' }}>{item.time}</Typography>
                </Stack>
              </Stack>
              <Box sx={{ mt: 'auto', borderTop: '1px solid', borderColor: 'divider', pt: '12px' }}>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flex: 1, justifyContent: 'center', cursor: 'pointer', py: '6px', borderRadius: '7px', '&:hover': { bgcolor: 'action.hover' } }}>
                    <AddIcon sx={{ fontSize: 14, color: 'text.primary' }} />
                    <Typography sx={{ fontSize: 12, color: 'text.primary' }}>操作一</Typography>
                  </Stack>
                  <Box sx={{ width: 0, height: 16, borderLeft: '1px solid', borderColor: 'divider' }} />
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flex: 1, justifyContent: 'center', cursor: 'pointer', py: '6px', borderRadius: '7px', '&:hover': { bgcolor: 'action.hover' } }}>
                    <SvgIcon sx={{ fontSize: 14, color: 'text.primary' }} viewBox="0 0 16 16"><path d="M5 11L11 5M11 5H6M11 5V10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></SvgIcon>
                    <Typography sx={{ fontSize: 12, color: 'text.primary' }}>操作二</Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      </DemoBlock>

      <DemoBlock title="内容卡片" description="带封面图、标签、描述和底部操作栏的通用卡片。" code={contentCardCode}>
        <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
          {[
            { title: '示例标题一', tags: ['标签一'], description: '这是一段用于展示卡片内容的默认示例文字。', actions: ['操作一', '操作二'] },
            { title: '示例标题二', tags: ['标签一', '标签二'], description: '这是一段较长的默认示例文字，用于展示多标签和文本截断效果。', actions: ['操作一', '操作二'] },
            { title: '示例标题三', tags: ['标签三'], description: '这是一段用于展示标题、标签与操作栏组合方式的示例文字。', actions: ['操作一', '操作二'] },
          ].map((item, idx) => (
            <Card key={idx} hoverable sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: '16px', gap: '16px', borderRadius: '16px' }}>
              <Box sx={{ position: 'relative', height: 110, borderRadius: '12px', overflow: 'hidden', bgcolor: 'background.soft', flexShrink: 0 }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)' }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{item.title}</Typography>
                <Stack direction="row" sx={{ gap: '10px', flexWrap: 'wrap' }}>
                  {item.tags.map((tag) => <Chip key={tag} label={tag} size="small" />)}
                </Stack>
                <Typography sx={{ fontSize: 12, color: 'text.tertiary', lineHeight: '160%', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.description}</Typography>
              </Box>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', display: 'flex', pt: '6px' }}>
                {item.actions.map((action, i) => (
                  <React.Fragment key={action}>
                    {i > 0 && <Box sx={{ width: '1px', bgcolor: 'divider', my: '2px' }} />}
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', height: 28, cursor: 'pointer', borderRadius: '6px', '&:hover': { bgcolor: 'action.hover' } }}>
                      {i === 0 ? (
                        <SvgIcon sx={{ fontSize: 14 }} viewBox="0 0 16 16"><path d="M2.5 2.5V13.5H7V2.5H2.5ZM9 2.5V13.5H13.5V2.5H9Z" fill="none" stroke="currentColor" strokeWidth="1.2" /></SvgIcon>
                      ) : (
                        <SvgIcon sx={{ fontSize: 14 }} viewBox="0 0 16 16"><path d="M4 12L12 4M12 4H6M12 4V10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></SvgIcon>
                      )}
                      <Typography sx={{ fontSize: 12 }}>{action}</Typography>
                    </Box>
                  </React.Fragment>
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Card
      </Typography>
      <PropsTable data={propsData} />
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
        CardHeader
      </Typography>
      <PropsTable data={headerPropsData} />
    </Box>
  );
}
