import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Dialog from '@ui/components/Dialog';
import DialogTitle from '@ui/components/DialogTitle';
import DialogContent from '@ui/components/DialogContent';
import DialogContentText from '@ui/components/DialogContentText';
import DialogActions from '@ui/components/DialogActions';
import Button from '@ui/components/Button';
import IconButton from '@ui/components/IconButton';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import SvgIcon from '@ui/components/SvgIcon';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

function CloseIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16" sx={{ fontSize: 16 }}>
      <path d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </SvgIcon>
  );
}

function WarningIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" sx={{ fontSize: 24, color: 'warning.main' }}>
      <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" />
    </SvgIcon>
  );
}

const dialogPaperSx = {
  '& .MuiDialog-paper': {
    backgroundColor: 'background.paper',
    borderRadius: '20px',
    padding: '24px',
    gap: '24px',
    width: 394,
  },
};

const titleSx = {
  fontSize: 18,
  fontWeight: 600,
  color: 'text.primary',
  p: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const contentSx = {
  p: 0,
  '& .MuiDialogContentText-root': {
    fontSize: 15,
    fontWeight: 600,
    color: 'text.primary',
  },
};

const actionsSx = {
  p: 0,
  justifyContent: 'flex-end',
  gap: '8px',
  '& > :not(:first-of-type)': { ml: 0 },
};

const cancelBtnSx = {
  border: '1px solid',
  borderColor: 'primary.main',
  borderRadius: '8px',
  color: 'primary.main',
  backgroundColor: 'transparent',
  fontSize: 14,
  fontWeight: 500,
  height: 36,
  minWidth: 96,
  textTransform: 'none',
  '&:hover': {
    border: '1px solid',
    borderColor: 'primary.main',
    backgroundColor: 'action.hover',
  },
};

const confirmBtnSx = {
  backgroundColor: 'primary.main',
  borderRadius: '8px',
  color: 'primary.contrastText',
  fontSize: 14,
  fontWeight: 500,
  height: 36,
  minWidth: 96,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'primary.hover',
    boxShadow: 'none',
  },
};

const closeBtnSx = {
  width: 32,
  height: 32,
  borderRadius: '7px',
  color: 'text.secondary',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

const basicCode = `import Dialog from '@ui/components/Dialog';
import DialogTitle from '@ui/components/DialogTitle';
import DialogContent from '@ui/components/DialogContent';
import DialogActions from '@ui/components/DialogActions';
import Button from '@ui/components/Button';

const [open, setOpen] = useState(false);

<Button variant="outlined" onClick={() => setOpen(true)}>打开对话框</Button>
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  sx={{
    '& .MuiDialog-paper': {
      backgroundColor: 'background.paper',
      borderRadius: '20px',
      padding: '24px',
      gap: '24px',
    },
  }}
>
  <DialogTitle sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary', p: 0 }}>
    确认操作
  </DialogTitle>
  <DialogContent sx={{ p: 0 }}>
    <DialogContentText sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
      确定要执行此操作吗？此操作不可撤销。
    </DialogContentText>
  </DialogContent>
  <DialogActions sx={{ p: 0, justifyContent: 'flex-end', gap: '8px' }}>
    <Button variant="outlined" sx={{ borderRadius: '8px', borderColor: 'primary.main', color: 'primary.main', height: 36, minWidth: 96 }}>
      取消
    </Button>
    <Button variant="contained" sx={{ borderRadius: '8px', bgcolor: 'primary.main', color: 'primary.contrastText', height: 36, minWidth: 96 }}>
      确认
    </Button>
  </DialogActions>
</Dialog>`;

const detailCode = `<Dialog open={open} onClose={() => setOpen(false)} sx={dialogPaperSx}>
  <DialogTitle>重新标注确认</DialogTitle>
  <DialogContent>
    <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
      这是一段信息，需要用户知悉并确认下一步操作。
    </Typography>
    <Typography sx={{ fontSize: 14, fontWeight: 400, color: 'text.tertiary', mt: '12px', lineHeight: '150%' }}>
      这是详情描述文字，用于补充说明或提示注意事项，帮助用户做出更准确的判断。
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button variant="outlined">取消</Button>
    <Button variant="contained">确认标注</Button>
  </DialogActions>
</Dialog>`;

const iconCode = `// 标题带警告图标
<Dialog open={open} onClose={() => setOpen(false)} sx={dialogPaperSx}>
  <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <WarningIcon />
    重新标注确认
  </DialogTitle>
  <DialogContent>
    <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
      这是一段信息，需要用户知悉并确认下一步操作。
    </Typography>
    <Typography sx={{ fontSize: 14, fontWeight: 400, color: 'text.tertiary', mt: '12px' }}>
      详情描述文字，补充说明注意事项。
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button variant="outlined">取消</Button>
    <Button variant="contained">确认标注</Button>
  </DialogActions>
</Dialog>`;

const propsData = [
  { name: 'open', type: 'boolean', default: 'false', description: '是否显示对话框' },
  { name: 'onClose', type: '(event, reason) => void', default: '-', description: '关闭回调' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: '是否占满容器宽度' },
  { name: 'maxWidth', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | false", default: "'sm'", description: '最大宽度' },
  { name: 'fullScreen', type: 'boolean', default: 'false', description: '是否全屏' },
  { name: 'scroll', type: "'body' | 'paper'", default: "'paper'", description: '滚动区域' },
];

export default function DialogDoc() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="dialog-title">
        Dialog 对话框
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        对话框用于在不离开当前页面的情况下，告知用户重要信息或要求用户做出决策。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Dialog from '@ui/components/Dialog'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="确认类对话框，含标题、内容和操作按钮。" code={basicCode}>
        <Button variant="outlined" onClick={() => setOpen(true)}>打开对话框</Button>
        <Dialog open={open} onClose={() => setOpen(false)} sx={dialogPaperSx}>
          <DialogTitle sx={titleSx}>
            确认操作
            <IconButton onClick={() => setOpen(false)} sx={closeBtnSx}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={contentSx}>
            <DialogContentText>确定要执行此操作吗？此操作不可撤销。</DialogContentText>
          </DialogContent>
          <DialogActions sx={actionsSx}>
            <Button variant="outlined" onClick={() => setOpen(false)} sx={cancelBtnSx}>
              取消
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)} sx={confirmBtnSx}>
              确认
            </Button>
          </DialogActions>
        </Dialog>
      </DemoBlock>

      <DemoBlock title="带详情文字" description="内容区包含主标题和补充描述，适合需要用户知悉详情后确认的场景。" code={detailCode}>
        <Button variant="outlined" onClick={() => setOpen2(true)}>打开详情对话框</Button>
        <Dialog open={open2} onClose={() => setOpen2(false)} sx={dialogPaperSx}>
          <DialogTitle sx={titleSx}>
            重新标注确认
            <IconButton onClick={() => setOpen2(false)} sx={closeBtnSx}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary', letterSpacing: '0.005em', lineHeight: '115%' }}>
              这是一段信息，需要用户知悉并确认下一步操作。
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 400, color: 'text.tertiary', letterSpacing: '-0.005em', lineHeight: '150%' }}>
              这是详情描述文字，用于补充说明或提示注意事项，帮助用户做出更准确的判断。
            </Typography>
          </DialogContent>
          <DialogActions sx={actionsSx}>
            <Button variant="outlined" onClick={() => setOpen2(false)} sx={cancelBtnSx}>
              取消
            </Button>
            <Button variant="contained" onClick={() => setOpen2(false)} sx={confirmBtnSx}>
              确认标注
            </Button>
          </DialogActions>
        </Dialog>
      </DemoBlock>

      <DemoBlock title="带图标" description="标题前带警告图标，用于需要引起用户注意的确认操作。" code={iconCode}>
        <Button variant="outlined" onClick={() => setOpen3(true)}>打开图标对话框</Button>
        <Dialog open={open3} onClose={() => setOpen3(false)} sx={dialogPaperSx}>
          <DialogTitle sx={{ ...titleSx, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <WarningIcon />
              <span>重新标注确认</span>
            </Box>
            <IconButton onClick={() => setOpen3(false)} sx={closeBtnSx}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary', letterSpacing: '0.005em', lineHeight: '115%' }}>
              这是一段信息，需要用户知悉并确认下一步操作。
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 400, color: 'text.tertiary', letterSpacing: '-0.005em', lineHeight: '150%' }}>
              这是详情描述文字，用于补充说明或提示注意事项，帮助用户做出更准确的判断。
            </Typography>
          </DialogContent>
          <DialogActions sx={actionsSx}>
            <Button variant="outlined" onClick={() => setOpen3(false)} sx={cancelBtnSx}>
              取消
            </Button>
            <Button variant="contained" onClick={() => setOpen3(false)} sx={confirmBtnSx}>
              确认标注
            </Button>
          </DialogActions>
        </Dialog>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>
        API
      </Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
