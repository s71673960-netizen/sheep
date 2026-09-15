import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Scrollbar from '@ui/components/Scrollbar';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Scrollbar from '@ui/components/Scrollbar';

<Scrollbar sx={{ maxHeight: 200 }}>
  {/* 长内容 */}
</Scrollbar>`;

const horizontalCode = `import Scrollbar from '@ui/components/Scrollbar';

<Scrollbar sx={{ maxWidth: 300 }}>
  <div style={{ width: 600 }}>
    {/* 超宽内容 */}
  </div>
</Scrollbar>`;

const customCode = `import Scrollbar from '@ui/components/Scrollbar';

<Scrollbar
  sx={{
    maxHeight: 200,
    '&::-webkit-scrollbar': { width: 6 },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'primary.main',
      borderRadius: 3,
    },
  }}
>
  {/* 内容 */}
</Scrollbar>`;

const componentCode = `import Scrollbar from '@ui/components/Scrollbar';

// 作为 ul 渲染
<Scrollbar component="ul" sx={{ maxHeight: 200, pl: 2 }}>
  <li>Item 1</li>
  <li>Item 2</li>
  ...
</Scrollbar>`;

const propsData = [
  { name: 'children', type: 'ReactNode', default: '-', description: '滚动区域内容' },
  { name: 'component', type: 'elementType', default: "'div'", description: '渲染的根元素类型' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式，可覆盖默认滚动条样式' },
];

const sampleItems = Array.from({ length: 30 }, (_, i) => `列表项 ${i + 1}`);

export default function ScrollbarDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Scrollbar 滚动条
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        统一的美化滚动条容器组件，提供细窄、低调的滚动条样式。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Scrollbar from '@ui/components/Scrollbar'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        何时使用
      </Typography>
      <Typography variant="body2" color="text.secondary" component="ul" sx={{ mb: 4, pl: 2 }}>
        <li>需要在有限高度/宽度的区域中展示大量内容时。</li>
        <li>替代浏览器默认粗滚动条，提供更好的视觉体验。</li>
        <li>侧边栏、下拉列表、对话框内容等场景。</li>
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="垂直滚动" description="设置 maxHeight 后，内容超出时显示细滚动条。" code={basicCode}>
        <Scrollbar sx={{ maxHeight: 200, border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
          {sampleItems.map((item) => (
            <Box key={item} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2">{item}</Typography>
            </Box>
          ))}
        </Scrollbar>
      </DemoBlock>

      <DemoBlock title="水平滚动" description="内容宽度超出容器时，出现水平滚动条。" code={horizontalCode}>
        <Scrollbar sx={{ maxWidth: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
          <Box sx={{ width: 800, display: 'flex', gap: 2 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <Box
                key={i}
                sx={{
                  minWidth: 100,
                  height: 80,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {i + 1}
                </Typography>
              </Box>
            ))}
          </Box>
        </Scrollbar>
      </DemoBlock>

      <DemoBlock title="自定义样式" description="通过 sx 覆盖滚动条颜色、宽度等。" code={customCode}>
        <Scrollbar
          sx={{
            maxHeight: 200,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 2,
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'primary.main',
              borderRadius: 3,
            },
          }}
        >
          {sampleItems.map((item) => (
            <Box key={item} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2">{item}</Typography>
            </Box>
          ))}
        </Scrollbar>
      </DemoBlock>

      <DemoBlock title="自定义元素类型" description="通过 component 属性渲染为不同的 HTML 元素。" code={componentCode}>
        <Scrollbar
          component="ul"
          sx={{ maxHeight: 160, border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, pl: 4 }}
        >
          {sampleItems.slice(0, 20).map((item) => (
            <li key={item}>
              <Typography variant="body2" sx={{ py: 0.5 }}>{item}</Typography>
            </li>
          ))}
        </Scrollbar>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
