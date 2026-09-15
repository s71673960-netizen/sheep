import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Menu from '@ui/components/Menu';
import MenuItem from '@ui/components/MenuItem';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';
import List from '@ui/components/List';
import ListItemButton from '@ui/components/ListItemButton';
import ListItemIcon from '@ui/components/ListItemIcon';
import ListItemText from '@ui/components/ListItemText';
import Collapse from '@ui/components/Collapse';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';
import InboxIcon from '@ui/components/icons/Inbox';
import DraftsIcon from '@ui/components/icons/Email';
import SendIcon from '@ui/components/icons/EmailOpen';
import ExpandLessIcon from '@ui/components/icons/SmallUp';
import ExpandMoreIcon from '@ui/components/icons/SmallDown';
import StarIcon from '@ui/components/icons/Star';
import ArrowLeftIcon from '@ui/components/icons/ArrowLeft';
import ArrowRightIcon from '@ui/components/icons/ArrowRight';
import CopyIcon from '@ui/components/icons/Copy';
import DeleteIcon from '@ui/components/icons/Delete';
import TextIcon from '@ui/components/icons/Text';

const basicCode = `import Menu from '@ui/components/Menu';
import MenuItem from '@ui/components/MenuItem';
import Button from '@ui/components/Button';

const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

<Button variant="outlined" onClick={(e) => setAnchorEl(e.currentTarget)}>
  打开菜单
</Button>
<Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
  <MenuItem onClick={() => setAnchorEl(null)}>选项一</MenuItem>
  <MenuItem onClick={() => setAnchorEl(null)}>选项二</MenuItem>
  <MenuItem onClick={() => setAnchorEl(null)}>选项三</MenuItem>
</Menu>`;

const selectedCode = `import Menu from '@ui/components/Menu';
import MenuItem from '@ui/components/MenuItem';

<Menu open anchorEl={...}>
  <MenuItem selected>当前选中</MenuItem>
  <MenuItem>其他选项</MenuItem>
  <MenuItem disabled>禁用选项</MenuItem>
</Menu>`;

const inlineCode = `import List from '@ui/components/List';
import ListItemButton from '@ui/components/ListItemButton';
import ListItemIcon from '@ui/components/ListItemIcon';
import ListItemText from '@ui/components/ListItemText';
import Collapse from '@ui/components/Collapse';

// 内嵌导航菜单
<List sx={{ width: 256 }}>
  <ListItemButton selected>
    <ListItemIcon><InboxIcon /></ListItemIcon>
    <ListItemText primary="收件箱" />
  </ListItemButton>
  <ListItemButton onClick={handleToggle}>
    <ListItemIcon><SendIcon /></ListItemIcon>
    <ListItemText primary="发件箱" />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  <Collapse in={open}>
    <List disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="已发送" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="草稿" />
      </ListItemButton>
    </List>
  </Collapse>
</List>`;

const dividerCode = `import Menu from '@ui/components/Menu';
import MenuItem from '@ui/components/MenuItem';
import Divider from '@ui/components/Divider';

<Menu open anchorEl={...}>
  <MenuItem>撤销</MenuItem>
  <MenuItem>重做</MenuItem>
  <Divider />
  <MenuItem>剪切</MenuItem>
  <MenuItem>复制</MenuItem>
  <MenuItem>粘贴</MenuItem>
</Menu>`;

const menuPropsData = [
  { name: 'open', type: 'boolean', default: 'false', description: '是否显示菜单' },
  { name: 'anchorEl', type: 'Element | null', default: 'null', description: '菜单锚定元素' },
  { name: 'onClose', type: '(event, reason) => void', default: '-', description: '菜单关闭时的回调' },
  { name: 'variant', type: "'menu' | 'selectedMenu'", default: "'selectedMenu'", description: '菜单变体' },
  { name: 'transitionDuration', type: "number | 'auto'", default: "'auto'", description: '动画时长' },
];

const menuItemPropsData = [
  { name: 'selected', type: 'boolean', default: 'false', description: '是否选中' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'dense', type: 'boolean', default: 'false', description: '紧凑模式' },
  { name: 'divider', type: 'boolean', default: 'false', description: '底部分割线' },
  { name: 'disableGutters', type: 'boolean', default: 'false', description: '移除左右内边距' },
];

export default function MenuDoc() {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inlineOpen, setInlineOpen] = useState(true);
  const [navSelected, setNavSelected] = useState('inbox');

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="menu-title">
        Menu 导航菜单
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        为页面和功能提供导航的菜单列表。支持弹出式菜单和内嵌式导航菜单两种形式。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Menu from '@ui/components/Menu'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本菜单" description="点击按钮触发菜单弹出，选择后自动关闭。" code={basicCode}>
        <Button variant="outlined" onClick={(e) => setAnchorEl1(e.currentTarget)}>
          打开菜单
        </Button>
        <Menu anchorEl={anchorEl1} open={open1} onClose={() => setAnchorEl1(null)}>
          <MenuItem onClick={() => setAnchorEl1(null)}>选项一</MenuItem>
          <MenuItem onClick={() => setAnchorEl1(null)}>选项二</MenuItem>
          <MenuItem onClick={() => setAnchorEl1(null)}>选项三</MenuItem>
        </Menu>
      </DemoBlock>

      <DemoBlock title="选中与禁用" description="支持 selected 选中状态和 disabled 禁用状态。" code={selectedCode}>
        <Button variant="outlined" onClick={(e) => setAnchorEl2(e.currentTarget)}>
          选中菜单
        </Button>
        <Menu anchorEl={anchorEl2} open={open2} onClose={() => setAnchorEl2(null)}>
          {['导航一', '导航二', '导航三', '导航四'].map((item, i) => (
            <MenuItem
              key={item}
              selected={i === selectedIndex}
              disabled={i === 3}
              onClick={() => { setSelectedIndex(i); setAnchorEl2(null); }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </DemoBlock>

      <DemoBlock title="分割线" description="通过 Divider 组件对菜单项进行分组。" code={dividerCode}>
        <Button variant="outlined" onClick={(e) => setAnchorEl3(e.currentTarget)}>
          编辑菜单
        </Button>
        <Menu anchorEl={anchorEl3} open={open3} onClose={() => setAnchorEl3(null)}>
          <MenuItem onClick={() => setAnchorEl3(null)}>
            <ListItemIcon><ArrowLeftIcon fontSize="small" /></ListItemIcon>
            <ListItemText>撤销</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl3(null)}>
            <ListItemIcon><ArrowRightIcon fontSize="small" /></ListItemIcon>
            <ListItemText>重做</ListItemText>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={() => setAnchorEl3(null)}>
            <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
            <ListItemText>剪切</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl3(null)}>
            <ListItemIcon><CopyIcon fontSize="small" /></ListItemIcon>
            <ListItemText>复制</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl3(null)}>
            <ListItemIcon><TextIcon fontSize="small" /></ListItemIcon>
            <ListItemText>粘贴</ListItemText>
          </MenuItem>
        </Menu>
      </DemoBlock>

      <DemoBlock title="内嵌导航菜单" description="垂直内嵌菜单，支持子菜单展开/折叠，适用于侧边栏导航。" code={inlineCode}>
        <Box sx={{ width: 256, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.subtle' }}>
          <List disablePadding sx={{ p: 0.5 }}>
            <ListItemButton
              selected={navSelected === 'inbox'}
              onClick={() => setNavSelected('inbox')}
            >
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="收件箱" />
            </ListItemButton>
            <ListItemButton
              selected={navSelected === 'drafts'}
              onClick={() => setNavSelected('drafts')}
            >
              <ListItemIcon><DraftsIcon /></ListItemIcon>
              <ListItemText primary="草稿箱" />
            </ListItemButton>
            <ListItemButton onClick={() => setInlineOpen(!inlineOpen)}>
              <ListItemIcon><SendIcon /></ListItemIcon>
              <ListItemText primary="发件箱" />
              {inlineOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={inlineOpen} timeout="auto" unmountOnExit>
              <List disablePadding sx={{ pl: 2 }}>
                <ListItemButton
                  selected={navSelected === 'sent'}
                  onClick={() => setNavSelected('sent')}
                >
                  <ListItemIcon><StarIcon /></ListItemIcon>
                  <ListItemText primary="已发送" />
                </ListItemButton>
                <ListItemButton
                  selected={navSelected === 'scheduled'}
                  onClick={() => setNavSelected('scheduled')}
                >
                  <ListItemIcon><StarIcon /></ListItemIcon>
                  <ListItemText primary="定时发送" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>Menu</Typography>
      <PropsTable data={menuPropsData} />

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}>MenuItem</Typography>
      <PropsTable data={menuItemPropsData} />
    </Box>
  );
}
