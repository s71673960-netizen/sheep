import React from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Avatar from '@ui/components/Avatar';
import AvatarTag from '@ui/components/AvatarTag';
import Stack from '@ui/components/Stack';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Avatar from '@ui/components/Avatar';

<Avatar>示</Avatar>`;

const sizeCode = `<Stack direction="row" spacing={2} alignItems="center">
  <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>S</Avatar>
  <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
  <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
</Stack>`;

const avatarTagCode = `import AvatarTag from '@ui/components/AvatarTag';

// 大号（默认）
<AvatarTag name="示例用户" src="/avatar.png" />

// 小号
<AvatarTag name="示例用户" src="/avatar.png" size="small" />`;

const propsData = [
  { name: 'src', type: 'string', default: '-', description: '图片来源地址' },
  { name: 'alt', type: 'string', default: '-', description: '图片替代文本' },
  { name: 'children', type: 'string', default: '-', description: '文字头像内容' },
  { name: 'variant', type: "'circular' | 'rounded' | 'square'", default: "'circular'", description: '头像形状' },
  { name: 'sx', type: 'SxProps', default: '-', description: '自定义样式（可设置尺寸和颜色）' },
];

export default function AvatarDoc() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="avatar-title">
        Avatar 头像
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        头像用于展示用户或事物的图片、图标或文字信息。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Avatar from '@ui/components/Avatar'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="使用文字作为头像内容。" code={basicCode}>
        <Avatar>示</Avatar>
      </DemoBlock>

      <DemoBlock title="尺寸" description="通过 sx 属性的 width 和 height 自定义头像尺寸。" code={sizeCode}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>S</Avatar>
          <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
          <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
        </Stack>
      </DemoBlock>

      <DemoBlock title="组合头像 AvatarTag" description="胶囊形头像标签，支持大号（默认）和小号两种尺寸。" code={avatarTagCode}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AvatarTag name="示例用户" />
          <AvatarTag name="示例用户" size="small" />
        </Stack>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
