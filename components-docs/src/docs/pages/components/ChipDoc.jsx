import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Chip from '@ui/components/Chip';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import SmallCloseIcon from '@ui/components/icons/SmallClose';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Chip from '@ui/components/Chip';

<Chip label="成功" type="success" />
<Chip label="错误" type="error" />
<Chip label="警告" type="warning" />
<Chip label="信息" type="info" />`;

const defaultTagCode = `import Chip from '@ui/components/Chip';

// 默认标签：不传 type/color，用于展示分类或属性
<Chip label="默认标签" size="small" />`;

const appearanceCode = `<Chip label="Filled" type="success" />
<Chip label="Bordered" type="success" bordered />
<Chip label="Outlined" variant="outlined" />`;

const colorCode = `<Chip label="主色" color="primary" />
<Chip label="次要色" color="secondary" />`;

const deletableCode = `import SmallCloseIcon from '@ui/components/icons/SmallClose';

const [chips, setChips] = useState(['可删除标签']);

{chips.map(label => (
  <Chip
    key={label}
    label={label}
    onDelete={() => setChips(prev => prev.filter(c => c !== label))}
    deleteIcon={<SmallCloseIcon sx={{ fontSize: 6 }} />}
  />
))}`;

const sizeCode = `<Chip label="Small" size="small" type="success" />
<Chip label="Medium" size="medium" type="success" />
<Chip label="Large" size="large" type="success" />`;

const propsData = [
  { name: 'label', type: 'ReactNode', default: '-', description: '标签内容' },
  { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", default: '-', description: '语义类型，优先级高于 color' },
  { name: 'color', type: "'default' | 'primary' | 'secondary' | string", default: "'default'", description: '颜色，支持自定义 palette 颜色' },
  { name: 'bordered', type: 'boolean', default: 'false', description: '是否显示边框' },
  { name: 'variant', type: "'filled' | 'outlined'", default: "'filled'", description: '外观变体' },
  { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '尺寸' },
  { name: 'onDelete', type: '() => void', default: '-', description: '设置后显示删除图标' },
  { name: 'avatar', type: 'ReactNode', default: '-', description: '头像元素' },
  { name: 'icon', type: 'ReactNode', default: '-', description: '图标元素' },
  { name: 'clickable', type: 'boolean', default: 'false', description: '是否可点击' },
];

export default function ChipDoc() {
  const [chips, setChips] = useState(['可删除标签']);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="chip-title">
        Chip 标签
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        标签用于展示属性、分类、标记状态，或作为筛选条件的可交互元素。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Chip from '@ui/components/Chip'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="默认标签" description="不传 type 和 color 时为默认样式，适用于展示分类、属性标签等场景。推荐使用 size='small'。" code={defaultTagCode}>
        <Chip label="默认标签" size="small" />
      </DemoBlock>

      <DemoBlock title="语义类型" description="通过 type 属性设置状态类型：success、error、warning、info。" code={basicCode}>
        <Chip label="成功" type="success" />
        <Chip label="错误" type="error" />
        <Chip label="警告" type="warning" />
        <Chip label="信息" type="info" />
      </DemoBlock>

      <DemoBlock title="外观" description="集中展示填充、带边框和描边三种外观。" code={appearanceCode}>
        <Chip label="Filled" type="success" />
        <Chip label="Bordered" type="success" bordered />
        <Chip label="Outlined" variant="outlined" />
      </DemoBlock>

      <DemoBlock title="颜色" description="使用 color 属性自定义颜色，支持 palette 中的任何颜色。" code={colorCode}>
        <Chip label="主色" color="primary" />
        <Chip label="次要色" color="secondary" />
      </DemoBlock>

      <DemoBlock title="可删除" code={deletableCode}>
        {chips.map(label => (
          <Chip
            key={label}
            label={label}
            onDelete={() => setChips(prev => prev.filter(c => c !== label))}
            deleteIcon={<SmallCloseIcon sx={{ fontSize: 6 }} />}
          />
        ))}
        {chips.length === 0 && (
          <Chip
            label="已全部删除，点击重置"
            variant="outlined"
            onClick={() => setChips(['可删除标签'])}
          />
        )}
      </DemoBlock>

      <DemoBlock title="尺寸" code={sizeCode}>
        <Chip label="Small" size="small" type="success" />
        <Chip label="Medium" size="medium" type="success" />
        <Chip label="Large" size="large" type="success" />
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
