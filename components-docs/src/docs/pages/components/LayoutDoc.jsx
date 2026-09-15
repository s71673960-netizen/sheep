import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';

const basicCode = `import Box from '@ui/components/Box';

// 上中下布局
<Box sx={{ display: 'flex', flexDirection: 'column', height: 360 }}>
  <Box sx={{ height: 56, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', px: 2 }}>
    <Typography sx={{ color: '#fff' }}>Header</Typography>
  </Box>
  <Box sx={{ flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography color="text.secondary">Content</Typography>
  </Box>
  <Box sx={{ height: 48, bgcolor: 'background.soft', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">Footer</Typography>
  </Box>
</Box>`;

const siderCode = `import Box from '@ui/components/Box';

// 侧边栏布局
<Box sx={{ display: 'flex', height: 320 }}>
  <Box sx={{ width: 200, bgcolor: 'background.subtle', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography color="text.primary">Sider</Typography>
  </Box>
  <Box sx={{ flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography color="text.secondary">Content</Typography>
  </Box>
</Box>`;

const complexCode = `import Box from '@ui/components/Box';

// 顶部-侧边栏-内容布局
<Box sx={{ display: 'flex', flexDirection: 'column', height: 400 }}>
  <Box sx={{ height: 56, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', px: 2 }}>
    <Typography sx={{ color: '#fff' }}>Header</Typography>
  </Box>
  <Box sx={{ display: 'flex', flex: 1 }}>
    <Box sx={{ width: 200, bgcolor: 'background.subtle', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3 }}>
      <Typography color="text.primary">Sider</Typography>
    </Box>
    <Box sx={{ flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography color="text.secondary">Content</Typography>
    </Box>
  </Box>
</Box>`;

export default function LayoutDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="layout-title">
        Layout 布局
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        常见的页面布局模式，包括上中下布局、侧边栏布局等。使用 Box 组件配合 Flex 实现各种经典布局结构。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Box from '@ui/components/Box'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="上中下布局" description="最基本的页面布局：固定头部、自适应内容区域、固定底部。" code={basicCode}>
        <Box sx={{ width: '100%', border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: 280 }}>
            <Box sx={{ height: 48, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', px: 2 }}>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>Header</Typography>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">Content</Typography>
            </Box>
            <Box sx={{ height: 40, bgcolor: 'background.soft', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" color="text.secondary">Footer</Typography>
            </Box>
          </Box>
        </Box>
      </DemoBlock>

      <DemoBlock title="侧边栏布局" description="左侧固定宽度侧边栏，右侧自适应内容区域。" code={siderCode}>
        <Box sx={{ width: '100%', border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', height: 240 }}>
            <Box sx={{ width: 160, bgcolor: 'background.subtle', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>Sider</Typography>
              <Box sx={{ mt: 2, width: '80%' }}>
                {['菜单一', '菜单二', '菜单三'].map((item) => (
                  <Box key={item} sx={{ py: 0.75, px: 1, borderRadius: 0.5, mb: 0.5, '&:hover': { bgcolor: 'action.hover' } }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">Content</Typography>
            </Box>
          </Box>
        </Box>
      </DemoBlock>

      <DemoBlock title="顶部-侧边栏-内容" description="顶部通栏导航 + 左侧边栏 + 右侧内容区的经典后台管理布局。" code={complexCode}>
        <Box sx={{ width: '100%', border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: 300 }}>
            <Box sx={{ height: 48, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', px: 2, justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>Header</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {['导航一', '导航二', '导航三'].map((item) => (
                  <Typography key={item} variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>{item}</Typography>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Box sx={{ width: 140, bgcolor: 'background.subtle', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, mb: 1 }}>Sider</Typography>
                {['子菜单1', '子菜单2', '子菜单3'].map((item) => (
                  <Box key={item} sx={{ py: 0.5, px: 1, width: '80%', borderRadius: 0.5, mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Content</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="layout-patterns" sx={{ fontWeight: 600, mb: 2 }}>
        布局说明
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Layout 布局基于 CSS Flexbox 实现，使用 Box 组件配合 sx 属性即可构建各种页面布局。常见模式：
      </Typography>
      <Box component="ul" sx={{ pl: 3, color: 'text.secondary' }}>
        <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>上中下布局：外层 column 方向，Header/Footer 固定高度，Content 设置 flex: 1</Typography>
        <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>侧边栏布局：外层 row 方向，Sider 固定宽度，Content 设置 flex: 1</Typography>
        <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>组合布局：嵌套使用上述模式即可实现复杂布局</Typography>
      </Box>
    </Box>
  );
}
