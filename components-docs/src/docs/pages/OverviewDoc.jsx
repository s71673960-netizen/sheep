import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@ui/components/Box';
import Button from '@ui/components/Button';
import Typography from '@ui/components/Typography';
import { categories } from '../data/navigation';

const categoryDescriptions = {
  general: '高频基础操作与视觉表达，是所有产品界面的起点。',
  layout: '统一页面结构、间距和内容组织方式。',
  navigation: '帮助用户理解当前位置并快速完成页面切换。',
  'data-entry': '覆盖输入、选择、校验和复杂表单场景。',
  'data-display': '清晰呈现列表、表格、卡片和结构化数据。',
  feedback: '及时反馈系统状态、操作结果和等待过程。',
  chart: '将复杂数据转化为可理解的可视化信息。',
  extended: '面向真实业务场景沉淀的复合型组件。',
};

export default function OverviewDoc() {
  const navigate = useNavigate();
  const componentCount = categories.reduce((total, category) => total + category.children.length, 0);

  return (
    <Box sx={{ pb: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 3, sm: 4, md: 5 },
          border: 1,
          borderColor: 'divider',
          borderRadius: 3,
          bgcolor: 'background.paper',
          '&::after': {
            position: 'absolute',
            top: '-35%',
            right: '-10%',
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'radial-gradient(circle, rgba(91, 171, 120, 0.18), rgba(91, 171, 120, 0) 68%)'
                : 'radial-gradient(circle, rgba(46, 125, 74, 0.14), rgba(46, 125, 74, 0) 68%)',
            content: '""',
            pointerEvents: 'none',
          },
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.13em' }}
        >
          React · Design System · Production Ready
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          id="overview-title"
          sx={{ mt: 1.5, maxWidth: 680, fontWeight: 700, letterSpacing: '-0.035em' }}
        >
          一套可以直接落地的组件系统
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, maxWidth: 660, lineHeight: 1.85 }}
        >
          从基础控件到业务扩展组件，统一视觉、交互状态和实现方式。每个组件都提供真实 Demo、使用代码和 API 说明。
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          <Button variant="contained" onClick={() => navigate('/components/button')}>
            开始浏览
          </Button>
          <Button variant="outlined" onClick={() => navigate('/components/chart')}>
            查看图表组件
          </Button>
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            mt: { xs: 4, md: 5 },
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' },
            gap: 1,
            maxWidth: 560,
          }}
        >
          {[
            [componentCount, '组件'],
            [categories.length, '分类'],
            ['Light / Dark', '主题模式'],
          ].map(([value, label]) => (
            <Box
              key={label}
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: 1.5,
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.035)' : 'rgba(15,16,17,0.035)',
              }}
            >
              <Typography sx={{ fontSize: { xs: 18, sm: 21 }, fontWeight: 700, lineHeight: 1.2 }}>
                {value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 5, md: 7 } }}>
        <Typography variant="h5" component="h2" id="component-categories" sx={{ fontWeight: 700 }}>
          组件分类
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          选择分类快速查看组件，也可以通过左侧搜索定位具体组件。
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: 2,
          }}
        >
          {categories.map((category, categoryIndex) => (
            <Box
              component="section"
              key={category.key}
              sx={{
                minWidth: 0,
                p: { xs: 2.25, sm: 2.75 },
                border: 1,
                borderColor: 'divider',
                borderRadius: 2.5,
                bgcolor: 'background.paper',
                transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: 'primary.main',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 18px 42px rgba(0,0,0,0.22)'
                      : '0 18px 42px rgba(32,38,35,0.08)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                  <Box
                    aria-hidden="true"
                    sx={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 30,
                      height: 30,
                      flexShrink: 0,
                      borderRadius: 1.5,
                      color: 'primary.main',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(91,171,120,0.12)' : 'rgba(46,125,74,0.09)',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {String(categoryIndex + 1).padStart(2, '0')}
                  </Box>
                  <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {category.label}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                  {category.children.length} 个组件
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, minHeight: 42, lineHeight: 1.65 }}>
                {categoryDescriptions[category.key]}
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {category.children.map((component) => (
                  <Box
                    component="button"
                    type="button"
                    key={component.key}
                    onClick={() => navigate(component.path)}
                    sx={{
                      appearance: 'none',
                      px: 1.25,
                      py: 0.7,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1.25,
                      color: 'text.secondary',
                      bgcolor: 'transparent',
                      font: 'inherit',
                      fontSize: 12,
                      lineHeight: 1.2,
                      cursor: 'pointer',
                      transition: 'color 150ms ease, border-color 150ms ease, background-color 150ms ease',
                      '&:hover, &:focus-visible': {
                        color: 'text.primary',
                        borderColor: 'primary.main',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(91,171,120,0.08)' : 'rgba(46,125,74,0.06)',
                        outline: 'none',
                      },
                    }}
                  >
                    {component.label.split(' ')[0]}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
