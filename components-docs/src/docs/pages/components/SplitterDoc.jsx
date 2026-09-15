import React, { useState, useCallback } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Box from '@ui/components/Box';

// 水平分隔面板 - 可拖拽调整左右宽度
<Box sx={{ display: 'flex', height: 300, border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
  <Box sx={{ width: '40%', bgcolor: 'background.soft', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography color="text.secondary">Left Panel</Typography>
  </Box>
  <Box sx={{ width: '2px', bgcolor: 'divider', cursor: 'col-resize', '&:hover': { bgcolor: 'primary.main' } }} />
  <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography color="text.secondary">Right Panel</Typography>
  </Box>
</Box>`;

const verticalCode = `import Box from '@ui/components/Box';

// 垂直分隔面板 - 可拖拽调整上下高度
<Box sx={{ display: 'flex', flexDirection: 'column', height: 300, border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
  <Box sx={{ height: '40%', bgcolor: 'background.soft', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography color="text.secondary">Top Panel</Typography>
  </Box>
  <Box sx={{ height: '2px', bgcolor: 'divider', cursor: 'row-resize', '&:hover': { bgcolor: 'primary.main' } }} />
  <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography color="text.secondary">Bottom Panel</Typography>
  </Box>
</Box>`;

const propsData = [
  { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '分隔方向，水平或垂直' },
  { name: 'sizes', type: 'number[]', default: '[50, 50]', description: '各面板的初始尺寸比例（百分比）' },
  { name: 'onResize', type: '(sizes: number[]) => void', default: '-', description: '拖拽调整大小时的回调函数' },
];

export default function SplitterDoc() {
  const [leftWidth, setLeftWidth] = useState(40);
  const [topHeight, setTopHeight] = useState(40);
  const [dragging, setDragging] = useState(null);

  const handleMouseDown = useCallback((type) => (e) => {
    e.preventDefault();
    setDragging(type);

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = leftWidth;
    const startTop = topHeight;
    const container = e.target.parentElement;
    const rect = container.getBoundingClientRect();

    const handleMouseMove = (moveEvent) => {
      if (type === 'horizontal') {
        const deltaX = moveEvent.clientX - startX;
        const newPercent = Math.min(80, Math.max(20, startLeft + (deltaX / rect.width) * 100));
        setLeftWidth(newPercent);
      } else {
        const deltaY = moveEvent.clientY - startY;
        const newPercent = Math.min(80, Math.max(20, startTop + (deltaY / rect.height) * 100));
        setTopHeight(newPercent);
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [leftWidth, topHeight]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="splitter-title">
        Splitter 分隔面板
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        可拖拽的分隔面板，允许用户通过拖动分隔条调整面板大小。常用于编辑器、文件管理器等需要灵活分割区域的场景。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Box from '@ui/components/Box'" />（基于 Box 组件组合实现）
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="水平分隔" description="左右分隔面板，拖动中间分隔条可调整面板宽度。" code={basicCode}>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              height: 240,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              userSelect: dragging === 'horizontal' ? 'none' : 'auto',
            }}
          >
            <Box
              sx={{
                width: `${leftWidth}%`,
                bgcolor: 'background.soft',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: dragging === 'horizontal' ? 'none' : 'width 0.1s',
              }}
            >
              <Typography variant="body2" color="text.secondary">Left Panel ({Math.round(leftWidth)}%)</Typography>
            </Box>
            <Box
              onMouseDown={handleMouseDown('horizontal')}
              sx={{
                width: '2px',
                bgcolor: dragging === 'horizontal' ? 'primary.main' : 'divider',
                cursor: 'col-resize',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'primary.main' },
              }}
            />
            <Box
              sx={{
                flex: 1,
                bgcolor: 'background.paper',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">Right Panel ({Math.round(100 - leftWidth)}%)</Typography>
            </Box>
          </Box>
        </Box>
      </DemoBlock>

      <DemoBlock title="垂直分隔" description="上下分隔面板，拖动中间分隔条可调整面板高度。" code={verticalCode}>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 280,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              userSelect: dragging === 'vertical' ? 'none' : 'auto',
            }}
          >
            <Box
              sx={{
                height: `${topHeight}%`,
                bgcolor: 'background.soft',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: dragging === 'vertical' ? 'none' : 'height 0.1s',
              }}
            >
              <Typography variant="body2" color="text.secondary">Top Panel ({Math.round(topHeight)}%)</Typography>
            </Box>
            <Box
              onMouseDown={handleMouseDown('vertical')}
              sx={{
                height: '2px',
                bgcolor: dragging === 'vertical' ? 'primary.main' : 'divider',
                cursor: 'row-resize',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'primary.main' },
              }}
            />
            <Box
              sx={{
                flex: 1,
                bgcolor: 'background.paper',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">Bottom Panel ({Math.round(100 - topHeight)}%)</Typography>
            </Box>
          </Box>
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
