import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Button from '@ui/components/Button';
import Upload from '@ui/components/Upload';
import UploadIcon from '@ui/components/icons/Upload';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Upload from '@ui/components/Upload';
import Button from '@ui/components/Button';
import UploadIcon from '@ui/components/icons/Upload';

<Upload action="https://httpbin.org/post">
  <Button variant="outlined" startIcon={<UploadIcon />}>
    点击上传
  </Button>
</Upload>`;

const multipleCode = `<Upload
  action="https://httpbin.org/post"
  multiple
  maxCount={3}
>
  <Button variant="outlined" startIcon={<UploadIcon />}>
    批量上传（最多3个）
  </Button>
</Upload>`;

const controlledCode = `const [fileList, setFileList] = useState([]);

<Upload
  action="https://httpbin.org/post"
  fileList={fileList}
  onChange={({ fileList: newList }) => setFileList(newList)}
>
  <Button variant="outlined" startIcon={<UploadIcon />}>
    受控上传
  </Button>
</Upload>`;

const acceptCode = `<Upload
  action="https://httpbin.org/post"
  accept=".png,.jpg,.jpeg"
>
  <Button variant="outlined" startIcon={<UploadIcon />}>
    仅图片
  </Button>
</Upload>`;

const propsData = [
  { name: 'accept', type: 'string', default: '-', description: '接受的文件类型（如 .png,.jpg）' },
  { name: 'action', type: 'string | (file) => Promise<string>', default: '-', description: '上传地址' },
  { name: 'beforeUpload', type: '(file, fileList) => boolean | Promise', default: '-', description: '上传前的钩子，返回 false 阻止上传' },
  { name: 'customRequest', type: '(options) => void', default: '-', description: '自定义上传实现' },
  { name: 'defaultFileList', type: 'FileItem[]', default: '[]', description: '非受控模式默认文件列表' },
  { name: 'fileList', type: 'FileItem[]', default: '-', description: '受控模式文件列表' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用状态' },
  { name: 'directory', type: 'boolean', default: 'false', description: '支持上传文件夹' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否支持多选' },
  { name: 'maxCount', type: 'number', default: '-', description: '最大上传数量' },
  { name: 'listType', type: "'text'", default: "'text'", description: '文件列表展示类型' },
  { name: 'name', type: 'string', default: "'file'", description: '上传文件字段名' },
  { name: 'headers', type: 'object', default: '-', description: '请求头' },
  { name: 'data', type: 'object | (file) => object', default: '-', description: '附加数据' },
  { name: 'method', type: 'string', default: "'post'", description: '请求方法' },
  { name: 'withCredentials', type: 'boolean', default: 'false', description: '是否携带 cookie' },
  { name: 'showUploadList', type: 'boolean', default: 'true', description: '是否显示文件列表' },
  { name: 'block', type: 'boolean', default: 'false', description: '是否撑满容器宽度' },
  { name: 'onChange', type: '({ file, fileList, event }) => void', default: '-', description: '文件状态变化回调' },
  { name: 'onRemove', type: '(file) => boolean | Promise', default: '-', description: '删除文件回调' },
  { name: 'onPreview', type: '(file) => void', default: '-', description: '点击文件名预览回调' },
  { name: 'onDrop', type: '(event) => void', default: '-', description: '拖拽放置回调' },
];

export default function UploadDoc() {
  const [fileList, setFileList] = useState([]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Upload 上传
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        文件上传组件，支持点击和拖拽上传，支持受控/非受控两种模式。
      </Typography>
      <Typography className="component-import" variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        使用：<InlineImportCode code="import Upload from '@ui/components/Upload'" />
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>代码演示</Typography>

      <DemoBlock title="基础用法" description="点击按钮触发文件选择。" code={basicCode}>
        <Box sx={{ width: '100%' }}>
          <Upload action="https://httpbin.org/post">
            <Button variant="outlined" startIcon={<UploadIcon />}>
              点击上传
            </Button>
          </Upload>
        </Box>
      </DemoBlock>

      <DemoBlock title="多文件上传" description="设置 multiple 支持多选，maxCount 限制数量。" code={multipleCode}>
        <Box sx={{ width: '100%' }}>
          <Upload action="https://httpbin.org/post" multiple maxCount={3}>
            <Button variant="outlined" startIcon={<UploadIcon />}>
              批量上传（最多3个）
            </Button>
          </Upload>
        </Box>
      </DemoBlock>

      <DemoBlock title="受控模式" description="通过 fileList 和 onChange 完全控制文件列表。" code={controlledCode}>
        <Box sx={{ width: '100%' }}>
          <Upload
            action="https://httpbin.org/post"
            fileList={fileList}
            onChange={({ fileList: newList }) => setFileList(newList)}
          >
            <Button variant="outlined" startIcon={<UploadIcon />}>
              受控上传
            </Button>
          </Upload>
        </Box>
      </DemoBlock>

      <DemoBlock title="限制文件类型" description="通过 accept 限制可选文件类型。" code={acceptCode}>
        <Box sx={{ width: '100%' }}>
          <Upload action="https://httpbin.org/post" accept=".png,.jpg,.jpeg">
            <Button variant="outlined" startIcon={<UploadIcon />}>
              仅图片
            </Button>
          </Upload>
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>API</Typography>
      <PropsTable data={propsData} />
    </Box>
  );
}
