import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Drawer from '@ui/components/Drawer';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';
import List from '@ui/components/List';
import ListItem from '@ui/components/ListItem';
import ListItemButton from '@ui/components/ListItemButton';
import ListItemText from '@ui/components/ListItemText';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Drawer from '@ui/components/Drawer';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';
import List from '@ui/components/List';
import ListItem from '@ui/components/ListItem';
import ListItemButton from '@ui/components/ListItemButton';
import ListItemText from '@ui/components/ListItemText';

const [open, setOpen] = useState(false);

<Button variant="outlined" onClick={() => setOpen(true)}>打开抽屉</Button>
<Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
  <Box sx={{ width: 250 }}>
    <List>
      {['收件箱', '已发送', '草稿箱', '垃圾箱'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>`;

const anchorCode = `import Drawer from '@ui/components/Drawer';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';

const [open, setOpen] = useState(false);
const [anchor, setAnchor] = useState('left');

<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
  {['left', 'right', 'top', 'bottom'].map((dir) => (
    <Button key={dir} variant="outlined"
      onClick={() => { setAnchor(dir); setOpen(true); }}>
      {dir}
    </Button>
  ))}
</Box>
<Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
  <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, p: 2 }}>
    <Typography>这是 {anchor} 方向的抽屉内容</Typography>
  </Box>
</Drawer>`;

const propsData = [
  { name: 'open', type: 'boolean', default: 'false', description: '是否显示抽屉' },
  { name: 'anchor', type: "'left' | 'right' | 'top' | 'bottom'", default: "'left'", description: '抽屉弹出方向' },
  { name: 'onClose', type: '(event, reason) => void', default: '-', description: '关闭回调' },
  { name: 'sx', type: 'object', default: '-', description: '自定义样式' },
];

const menuItems = ['收件箱', '已发送', '草稿箱', '垃圾箱'];

export default function DrawerDoc() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [anchor, setAnchor] = useState('left');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="drawer-title">
        Drawer 抽屉
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        抽屉从屏幕边缘滑出的浮层面板，用于承载导航链接或额外操作内容。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Drawer from '@ui/components/Drawer'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本抽屉" description="从左侧滑出的基本抽屉，包含列表导航。" code={basicCode}>
        <Button variant="outlined" onClick={() => setOpen1(true)}>打开抽屉</Button>
        <Drawer anchor="left" open={open1} onClose={() => setOpen1(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              {menuItems.map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => setOpen1(false)}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </DemoBlock>

      <DemoBlock title="方向" description="抽屉支持从四个方向弹出：左、右、上、下。" code={anchorCode}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['left', 'right', 'top', 'bottom'].map((dir) => (
            <Button
              key={dir}
              variant="outlined"
              onClick={() => { setAnchor(dir); setOpen2(true); }}
            >
              {dir}
            </Button>
          ))}
        </Box>
        <Drawer anchor={anchor} open={open2} onClose={() => setOpen2(false)}>
          <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, p: 2 }}>
            <Typography variant="body1">这是 {anchor} 方向的抽屉内容</Typography>
          </Box>
        </Drawer>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
