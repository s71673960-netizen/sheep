import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Breadcrumbs from '@ui/components/Breadcrumbs';
import Link from '@ui/components/Link';
import Typography from '@ui/components/Typography';
import Box from '@ui/components/Box';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Breadcrumbs from '@ui/components/Breadcrumbs';
import Link from '@ui/components/Link';
import Typography from '@ui/components/Typography';

<Breadcrumbs>
  <Link underline="hover" color="inherit" href="#">起始页</Link>
  <Link underline="hover" color="inherit" href="#">一级页面</Link>
  <Typography color="text.primary">当前页面</Typography>
</Breadcrumbs>`;

const separatorCode = `import Breadcrumbs from '@ui/components/Breadcrumbs';
import Link from '@ui/components/Link';
import Typography from '@ui/components/Typography';

<Breadcrumbs separator="›">
  <Link underline="hover" color="inherit" href="#">起始页</Link>
  <Link underline="hover" color="inherit" href="#">分类</Link>
  <Typography color="text.primary">当前页</Typography>
</Breadcrumbs>

<Breadcrumbs separator="-">
  <Link underline="hover" color="inherit" href="#">起始页</Link>
  <Link underline="hover" color="inherit" href="#">分类</Link>
  <Typography color="text.primary">当前页</Typography>
</Breadcrumbs>`;

const iconCode = `import Breadcrumbs from '@ui/components/Breadcrumbs';
import Link from '@ui/components/Link';
import Typography from '@ui/components/Typography';
import HomeIcon from '@ui/components/icons/Home';
import FolderIcon from '@ui/components/icons/Folder';

<Breadcrumbs>
  <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    起始页
  </Link>
  <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
    <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    一级页面
  </Link>
  <Typography color="text.primary">当前页面</Typography>
</Breadcrumbs>`;

const propsData = [
  { name: 'separator', type: 'ReactNode', default: "'/'", description: '分隔符，可以是字符串或 React 节点' },
  { name: 'maxItems', type: 'number', default: '8', description: '最多显示的条目数量，超出时自动折叠' },
  { name: 'sx', type: 'object', default: '-', description: '自定义样式' },
];

export default function BreadcrumbsDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="breadcrumbs-title">
        Breadcrumbs 面包屑
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        面包屑导航用于显示当前页面在系统层级结构中的位置，并能向上返回。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Breadcrumbs from '@ui/components/Breadcrumbs'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="最简单的面包屑导航，展示页面层级路径。" code={basicCode}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="#">起始页</Link>
          <Link underline="hover" color="inherit" href="#">一级页面</Link>
          <Typography color="text.primary">当前页面</Typography>
        </Breadcrumbs>
      </DemoBlock>

      <DemoBlock title="自定义分隔符" description="通过 separator 属性自定义分隔符。" code={separatorCode}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Breadcrumbs separator="›">
            <Link underline="hover" color="inherit" href="#">起始页</Link>
            <Link underline="hover" color="inherit" href="#">分类</Link>
            <Typography color="text.primary">当前页</Typography>
          </Breadcrumbs>
          <Breadcrumbs separator="-">
            <Link underline="hover" color="inherit" href="#">起始页</Link>
            <Link underline="hover" color="inherit" href="#">分类</Link>
            <Typography color="text.primary">当前页</Typography>
          </Breadcrumbs>
        </Box>
      </DemoBlock>

      <DemoBlock title="带图标" description="在面包屑项中添加图标，增强视觉辨识度。" code={iconCode}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
            起始页
          </Link>
          <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
            一级页面
          </Link>
          <Typography color="text.primary">当前页面</Typography>
        </Breadcrumbs>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
