import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Divider from '@ui/components/Divider';

<p>示例内容一</p>
<Divider />
<p>示例内容二</p>`;

const textCode = `import Divider from '@ui/components/Divider';

// 居中文字（默认）
<Divider>居中标题</Divider>

// 左对齐
<Divider textAlign="left">左侧标题</Divider>

// 右对齐
<Divider textAlign="right">右侧标题</Divider>`;

const verticalCode = `import Divider from '@ui/components/Divider';

Text
<Divider orientation="vertical" flexItem />
<a href="#">Link</a>`;

const variantCode = `import Divider from '@ui/components/Divider';

// 虚线
<Divider dashed>Dashed</Divider>

// 点线
<Divider sx={{ borderStyle: 'dotted' }}>Dotted</Divider>`;

const propsData = [
  { name: 'children', type: 'ReactNode', default: '-', description: '嵌套的标题内容' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '分割线方向' },
  { name: 'vertical', type: 'boolean', default: 'false', description: '是否垂直，orientation 的简写' },
  { name: 'textAlign', type: "'left' | 'center' | 'right'", default: "'center'", description: '分割线标题的位置' },
  { name: 'dashed', type: 'boolean', default: 'false', description: '是否虚线' },
  { name: 'flexItem', type: 'boolean', default: 'false', description: '在 flex 容器中使用时自适应高度' },
  { name: 'variant', type: "'fullWidth' | 'inset' | 'middle'", default: "'fullWidth'", description: '分割线变体' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式（可通过 borderStyle 设置点线等）' },
];

export default function DividerDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="divider-title">
        Divider 分割线
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        区隔内容的分割线。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Divider from '@ui/components/Divider'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="when-to-use" sx={{ fontWeight: 600, mb: 2 }}>
        何时使用
      </Typography>
      <Typography variant="body2" color="text.secondary" component="ul" sx={{ mb: 4, pl: 2 }}>
        <li>对不同章节的文本段落进行分割。</li>
        <li>对行内文字/链接进行分割，例如表格的操作列。</li>
      </Typography>

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="水平分割线" description="默认的水平分割线。" code={basicCode}>
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容一
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容二
          </Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="带文字的分割线" description="分割线中带有文字，可以用 textAlign 指定文字位置。" code={textCode}>
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容
          </Typography>
          <Divider sx={{ my: 2 }}>居中标题</Divider>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容
          </Typography>
          <Divider textAlign="left" sx={{ my: 2 }}>左侧标题</Divider>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容
          </Typography>
          <Divider textAlign="right" sx={{ my: 2 }}>右侧标题</Divider>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容
          </Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="垂直分割线" description="使用 orientation=&quot;vertical&quot; 设置行内垂直分割线。" code={verticalCode}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">文字</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }} />
          <Typography variant="body2" component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none' }}>链接</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock title="线型" description="补充展示虚线和点线样式。" code={variantCode}>
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容
          </Typography>
          <Divider dashed sx={{ my: 2 }}>Dashed</Divider>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容
          </Typography>
          <Divider sx={{ my: 2, borderStyle: 'dotted' }}>Dotted</Divider>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            示例内容
          </Typography>
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
