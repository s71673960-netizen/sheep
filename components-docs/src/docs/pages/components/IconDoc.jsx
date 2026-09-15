import React, { useState, useMemo } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import TextField from '@ui/components/TextField';
import InputAdornment from '@ui/components/InputAdornment';
import Tooltip from '@ui/components/Tooltip';
import SearchIcon from '@ui/components/icons/Search';
import * as Icons from '@ui/components/icons';
import DemoBlock from '../../components/DemoBlock';

const HIDDEN_ICONS = ['Sparkle'];

const allIcons = Object.entries(Icons)
  .filter(([name, comp]) => (typeof comp === 'function' || (comp && comp.$$typeof)) && !HIDDEN_ICONS.includes(name))
  .map(([name, component]) => ({ name, component }))
  .sort((a, b) => a.name.localeCompare(b.name));

const usageCode = `import SearchIcon from '@ui/components/icons/Search';
import DeleteIcon from '@ui/components/icons/Delete';

// 直接使用
<SearchIcon />

// 设置尺寸
<SearchIcon sx={{ fontSize: 24 }} />

// 设置颜色（使用主题色）
<SearchIcon sx={{ color: 'text.primary' }} />`;

const sizeCode = `<SearchIcon sx={{ fontSize: 12 }} />  // 导航二级菜单栏icon
<SearchIcon sx={{ fontSize: 14 }} />  // 内容二级icon
<SearchIcon sx={{ fontSize: 16 }} />  // 通用icon
<SearchIcon sx={{ fontSize: 18 }} />  // 菜单导航icon
<SearchIcon sx={{ fontSize: 26 }} />  // 最大icon，慎用`;

function IconCard({ name, Icon }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(`import ${name} from '@ui/components/icons/${name}';`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Tooltip title={copied ? '已复制!' : `点击复制 import 语句`} arrow>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.75,
          p: 1.5,
          borderRadius: 1,
          cursor: 'pointer',
          transition: 'all 0.15s',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <Icon sx={{ fontSize: 24, color: 'text.primary' }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.65rem',
            color: 'text.secondary',
            textAlign: 'center',
            wordBreak: 'break-all',
            lineHeight: 1.2,
          }}
        >
          {name}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default function IconDoc() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return allIcons;
    const q = query.toLowerCase();
    return allIcons.filter((icon) => icon.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="icon-title">
        Icon 图标
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        语义化的矢量图标。所有图标均为 16×16 SVG，支持通过 sx 自定义尺寸和颜色。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import IconName from '@ui/components/icons/IconName'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-usage" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基础用法" description="通过按需引入使用图标组件。" code={usageCode}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchIcon sx={{ color: 'text.primary' }} />
          {allIcons.slice(1, 5).map((icon) => (
            <icon.component key={icon.name} sx={{ color: 'text.primary' }} />
          ))}
        </Box>
      </DemoBlock>

      <DemoBlock title="图标尺寸" description="通过 sx.fontSize 设置图标大小。" code={sizeCode}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          {[
            { size: 12, label: '导航二级菜单栏icon' },
            { size: 14, label: '内容二级icon' },
            { size: 16, label: '通用icon' },
            { size: 18, label: '菜单导航icon' },
            { size: 26, label: '最大icon，慎用' },
          ].map((item) => (
            <Box key={item.size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <SearchIcon sx={{ fontSize: item.size, color: 'text.primary' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.size}px</Typography>
              <Typography variant="caption" color="text.secondary">（{item.label}）</Typography>
            </Box>
          ))}
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="icon-gallery" sx={{ fontWeight: 600, mb: 2 }}>
        图标列表
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        点击图标可复制 import 语句。共 {allIcons.length} 个图标。
      </Typography>

      <TextField
        size="small"
        placeholder="搜索图标..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3, width: 280 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: 0.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
        }}
      >
        {filtered.map((icon) => (
          <IconCard key={icon.name} name={icon.name} Icon={icon.component} />
        ))}
        {filtered.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
            未找到匹配的图标
          </Typography>
        )}
      </Box>
    </Box>
  );
}
