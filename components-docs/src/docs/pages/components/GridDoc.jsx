import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Grid from '@ui/components/Grid';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Slider from '@ui/components/Slider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Grid from '@ui/components/Grid';
import Box from '@ui/components/Box';

<Grid container spacing={2}>
  <Grid item xs={12}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=12
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=6
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=6
    </Box>
  </Grid>
  <Grid item xs={4}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=4
    </Box>
  </Grid>
  <Grid item xs={4}>
    <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=4
    </Box>
  </Grid>
  <Grid item xs={4}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=4
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=3
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=3
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=3
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=3
    </Box>
  </Grid>
</Grid>`;

const spacingCode = `import Grid from '@ui/components/Grid';

// spacing 属性设置栅格间距，数值基于 8px 基数
<Grid container spacing={3}>
  <Grid item xs={4}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1 }} />
  </Grid>
  <Grid item xs={4}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1 }} />
  </Grid>
  <Grid item xs={4}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1 }} />
  </Grid>
</Grid>`;

const responsiveCode = `import Grid from '@ui/components/Grid';

// 不同断点下设置不同的列宽
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=12 sm=6 md=4 lg=3
    </Box>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=12 sm=6 md=4 lg=3
    </Box>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=12 sm=6 md=4 lg=3
    </Box>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
      xs=12 sm=6 md=4 lg=3
    </Box>
  </Grid>
</Grid>`;

const propsData = [
  { name: 'container', type: 'boolean', default: 'false', description: '设为 true 时作为栅格容器' },
  { name: 'item', type: 'boolean', default: 'false', description: '设为 true 时作为栅格子项' },
  { name: 'xs', type: 'number | "auto" | boolean', default: 'false', description: '超小屏幕断点下占据的列数（0-12）' },
  { name: 'sm', type: 'number | "auto" | boolean', default: 'false', description: '小屏幕断点下占据的列数（≥600px）' },
  { name: 'md', type: 'number | "auto" | boolean', default: 'false', description: '中屏幕断点下占据的列数（≥900px）' },
  { name: 'lg', type: 'number | "auto" | boolean', default: 'false', description: '大屏幕断点下占据的列数（≥1200px）' },
  { name: 'xl', type: 'number | "auto" | boolean', default: 'false', description: '超大屏幕断点下占据的列数（≥1536px）' },
  { name: 'spacing', type: 'number | string', default: '0', description: '栅格间距（单位基于主题 8px 基数）' },
  { name: 'columns', type: 'number', default: '12', description: '栅格总列数' },
];

export default function GridDoc() {
  const [spacing, setSpacing] = useState(2);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="grid-title">
        Grid 栅格
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        基于 12 列的栅格系统，用于创建响应式的页面布局。通过 container 和 item 组合实现灵活的列式布局。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Grid from '@ui/components/Grid'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基础栅格" description="使用 12 列栅格系统，通过 xs 属性设置每个子项占据的列数。" code={basicCode}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=12
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=6
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=6
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=4
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=4
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=4
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=3
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=3
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ bgcolor: 'primary.dark', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=3
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                xs=3
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DemoBlock>

      <DemoBlock title="间距控制" description="通过 spacing 属性设置栅格之间的间距，数值基于 8px 基数。" code={spacingCode}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>spacing: {spacing}（{spacing * 8}px）</Typography>
            <Slider
              value={spacing}
              onChange={(e, v) => setSpacing(v)}
              min={0}
              max={6}
              step={1}
              sx={{ width: 240 }}
            />
          </Box>
          <Grid container spacing={spacing}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Grid item xs={4} key={i}>
                <Box sx={{ bgcolor: i % 2 ? 'primary.dark' : 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText' }}>
                  xs=4
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DemoBlock>

      <DemoBlock title="响应式布局" description="通过 xs/sm/md/lg/xl 断点属性，设置不同屏幕尺寸下的列宽。缩小浏览器窗口查看效果。" code={responsiveCode}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Box sx={{ bgcolor: i % 2 ? 'primary.dark' : 'primary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'primary.contrastText', fontSize: 12 }}>
                  xs=12 sm=6 md=4 lg=3
                </Box>
              </Grid>
            ))}
          </Grid>
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
