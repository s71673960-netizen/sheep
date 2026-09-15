import React, { useState } from 'react';
import Form from '@ui/components/Form';
import TextField from '@ui/components/TextField';
import Select from '@ui/components/Select';
import MenuItem from '@ui/components/MenuItem';
import Radio from '@ui/components/Radio';
import RadioGroup from '@ui/components/RadioGroup';
import FormControlLabel from '@ui/components/FormControlLabel';
import DateRangePicker from '@ui/components/DateRangePicker';
import TimePicker from '@ui/components/TimePicker';
import Switch from '@ui/components/Switch';
import Button from '@ui/components/Button';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Stack from '@ui/components/Stack';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const basicCode = `import Form from '@ui/components/Form';
import TextField from '@ui/components/TextField';
import Select from '@ui/components/Select';
import MenuItem from '@ui/components/MenuItem';
import Button from '@ui/components/Button';

const [form] = Form.useForm();

<Form
  form={form}
  layout="vertical"
  onFinish={(values) => console.log('提交:', values)}
>
  <Form.Item label="字段一" name="field1" rules={[{ required: true, message: '请输入字段一' }]}>
    <TextField placeholder="请输入内容" fullWidth />
  </Form.Item>
  <Form.Item label="字段二" name="field2" rules={[{ required: true, message: '请输入字段二' }]}>
    <TextField placeholder="请输入内容" fullWidth />
  </Form.Item>
  <Form.Item label="选择项" name="option">
    <Select fullWidth displayEmpty>
      <MenuItem value="">请选择</MenuItem>
      <MenuItem value="option1">选项一</MenuItem>
      <MenuItem value="option2">选项二</MenuItem>
    </Select>
  </Form.Item>
  <Form.Item>
    <Button type="submit" variant="contained">提交</Button>
  </Form.Item>
</Form>`;

const verticalCode = `<Form layout="vertical" onFinish={(values) => console.log(values)}>
  <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入有效邮箱' }]}>
    <TextField placeholder="name@example.com" fullWidth />
  </Form.Item>
  <Form.Item label="手机号" name="phone">
    <TextField placeholder="请输入手机号" fullWidth />
  </Form.Item>
  <Form.Item>
    <Button type="submit" variant="contained">保存</Button>
  </Form.Item>
</Form>`;

const inlineCode = `<Form layout="inline" onFinish={(values) => console.log(values)}>
  <Form.Item name="keyword">
    <TextField placeholder="搜索关键词" />
  </Form.Item>
  <Form.Item name="status">
    <Select displayEmpty sx={{ minWidth: 120 }}>
      <MenuItem value="">全部状态</MenuItem>
      <MenuItem value="active">活跃</MenuItem>
      <MenuItem value="inactive">停用</MenuItem>
    </Select>
  </Form.Item>
  <Form.Item>
    <Button type="submit" variant="contained">搜索</Button>
  </Form.Item>
</Form>`;

const validationCode = `<Form layout="vertical" onFinish={(values) => alert(JSON.stringify(values))}>
  <Form.Item
    label="字段名称"
    name="fieldName"
    rules={[
      { required: true, message: '字段名称不能为空' },
      { min: 3, message: '字段名称至少 3 个字符' },
      { max: 20, message: '字段名称最多 20 个字符' },
    ]}
  >
    <TextField placeholder="3-20 个字符" fullWidth />
  </Form.Item>
  <Form.Item
    label="邮箱"
    name="email"
    rules={[
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ]}
  >
    <TextField placeholder="name@example.com" fullWidth />
  </Form.Item>
  <Form.Item
    label="确认内容"
    name="confirm"
    dependencies={['fieldName']}
    rules={[
      { required: true, message: '请确认内容' },
      { validator: (rule, value, formValues) => {
          if (value && value !== formValues?.fieldName) {
            throw new Error('两次输入不一致');
          }
        }
      },
    ]}
  >
    <TextField type="password" fullWidth />
  </Form.Item>
  <Form.Item>
    <Button type="submit" variant="contained">验证</Button>
  </Form.Item>
</Form>`;

const controlledCode = `const [form] = Form.useForm();

<Form form={form} layout="vertical" onFinish={(values) => console.log(values)}>
  <Form.Item label="名称" name="name" rules={[{ required: true }]}>
    <TextField fullWidth />
  </Form.Item>
  <Form.Item label="启用" name="enabled" valuePropName="checked" initialValue={true}>
    <Switch />
  </Form.Item>
  <Form.Item>
    <Stack direction="row" spacing={2}>
      <Button type="submit" variant="contained">保存</Button>
      <Button variant="outlined" onClick={() => form.resetFields()}>重置</Button>
      <Button onClick={() => form.setFieldsValue({ name: '默认文字', enabled: false })}>
        填入默认值
      </Button>
    </Stack>
  </Form.Item>
</Form>`;

const dynamicCode = `<Form layout="vertical" onFinish={(values) => console.log(values)}>
  <Form.List name="items" initialValue={[{ name: '' }]}>
    {(fields, { add, remove }) => (
      <>
        {fields.map((field) => (
          <Stack key={field.key} direction="row" spacing={2} sx={{ mb: 2 }}>
            <Form.Item
              name={\`items.\${field.name}.name\`}
              rules={[{ required: true, message: '请输入条目名称' }]}
              noStyle
            >
              <TextField placeholder="条目名称" />
            </Form.Item>
            <Button color="error" onClick={() => remove(field.name)}>
              删除
            </Button>
          </Stack>
        ))}
        <Button variant="outlined" onClick={() => add({ name: '' })}>
          + 添加条目
        </Button>
      </>
    )}
  </Form.List>
  <Form.Item sx={{ mt: 3 }}>
    <Button type="submit" variant="contained">提交</Button>
  </Form.Item>
</Form>`;

const formPropsData = [
  { name: 'form', type: 'FormInstance', default: '-', desc: '表单实例，由 Form.useForm() 创建' },
  { name: 'initialValues', type: 'object', default: '-', desc: '表单默认值' },
  { name: 'layout', type: "'horizontal' | 'vertical' | 'inline'", default: "'horizontal'", desc: '表单布局方式' },
  { name: 'labelCol', type: '{ span?: number, flex?: string }', default: '-', desc: '标签布局（span 为 24 栅格）' },
  { name: 'wrapperCol', type: '{ span?: number, offset?: number }', default: '-', desc: '控件布局' },
  { name: 'labelAlign', type: "'left' | 'right'", default: "'right'", desc: '标签对齐方式' },
  { name: 'colon', type: 'boolean', default: 'true', desc: '是否显示标签后的冒号' },
  { name: 'requiredMark', type: 'boolean', default: 'true', desc: '是否显示必填标记 *' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: '全局禁用表单' },
  { name: 'onFinish', type: '(values) => void', default: '-', desc: '校验通过后的提交回调' },
  { name: 'onFinishFailed', type: '({ values, errorFields }) => void', default: '-', desc: '校验失败时的回调' },
  { name: 'onValuesChange', type: '(changedValues, allValues) => void', default: '-', desc: '字段值变化时的回调' },
];

const itemPropsData = [
  { name: 'name', type: 'string', default: '-', desc: '字段名（用于表单数据收集和校验）' },
  { name: 'label', type: 'ReactNode', default: '-', desc: '标签文本' },
  { name: 'rules', type: 'Rule[]', default: '[]', desc: '校验规则数组' },
  { name: 'required', type: 'boolean', default: '-', desc: '是否必填（也可通过 rules 自动判断）' },
  { name: 'initialValue', type: 'any', default: '-', desc: '字段初始值' },
  { name: 'valuePropName', type: 'string', default: "'value'", desc: '子组件的值属性名（如 Switch 用 "checked"）' },
  { name: 'trigger', type: 'string', default: "'onChange'", desc: '收集值的事件名' },
  { name: 'validateTrigger', type: "string | string[]", default: "'onChange'", desc: '触发校验的事件名' },
  { name: 'dependencies', type: 'string[]', default: '-', desc: '依赖字段（依赖变化时重新校验）' },
  { name: 'extra', type: 'ReactNode', default: '-', desc: '额外提示信息' },
  { name: 'help', type: 'ReactNode', default: '-', desc: '自定义提示信息（覆盖校验错误）' },
  { name: 'hidden', type: 'boolean', default: 'false', desc: '隐藏字段（仍参与数据收集）' },
  { name: 'noStyle', type: 'boolean', default: 'false', desc: '不渲染外层容器，仅绑定数据' },
  { name: 'labelCol', type: '{ span?: number }', default: '-', desc: '覆盖 Form 的 labelCol' },
  { name: 'wrapperCol', type: '{ span?: number }', default: '-', desc: '覆盖 Form 的 wrapperCol' },
];

const rulePropsData = [
  { name: 'required', type: 'boolean', default: '-', desc: '是否必填' },
  { name: 'message', type: 'string', default: '-', desc: '错误提示信息' },
  { name: 'min', type: 'number', default: '-', desc: '最小长度' },
  { name: 'max', type: 'number', default: '-', desc: '最大长度' },
  { name: 'pattern', type: 'RegExp', default: '-', desc: '正则表达式校验' },
  { name: 'type', type: "'email' | 'number' | ...", default: '-', desc: '内置类型校验' },
  { name: 'validator', type: '(rule, value, formValues) => Promise', default: '-', desc: '自定义校验函数（抛出 Error 表示失败）' },
  { name: 'warningOnly', type: 'boolean', default: 'false', desc: '仅警告，不阻止提交' },
];

const formInstanceData = [
  { name: 'getFieldValue', type: '(name) => any', default: '-', desc: '获取指定字段的值' },
  { name: 'getFieldsValue', type: '(nameList?) => object', default: '-', desc: '获取一组/所有字段的值' },
  { name: 'setFieldValue', type: '(name, value) => void', default: '-', desc: '设置指定字段的值' },
  { name: 'setFieldsValue', type: '(values) => void', default: '-', desc: '设置多个字段的值' },
  { name: 'resetFields', type: '(nameList?) => void', default: '-', desc: '重置字段为初始值' },
  { name: 'validateFields', type: '(nameList?) => Promise', default: '-', desc: '校验字段并返回值' },
  { name: 'submit', type: '() => void', default: '-', desc: '提交表单' },
  { name: 'getFieldError', type: '(name) => string[]', default: '-', desc: '获取字段的错误信息' },
  { name: 'isFieldTouched', type: '(name) => boolean', default: '-', desc: '字段是否被操作过' },
];

function BasicDemo() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => console.log('提交:', values)}
    >
      <Form.Item label="字段一" name="field1" rules={[{ required: true, message: '请输入字段一' }]}>
        <TextField placeholder="请输入内容" fullWidth />
      </Form.Item>
      <Form.Item label="字段二" name="field2" rules={[{ required: true, message: '请输入字段二' }]}>
        <TextField placeholder="请输入内容" fullWidth />
      </Form.Item>
      <Form.Item label="选择项" name="option" initialValue="">
        <Select fullWidth displayEmpty>
          <MenuItem value="">请选择</MenuItem>
          <MenuItem value="option1">选项一</MenuItem>
          <MenuItem value="option2">选项二</MenuItem>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="submit" variant="contained">提交</Button>
      </Form.Item>
    </Form>
  );
}

function VerticalDemo() {
  return (
    <Form
      layout="vertical"
      onFinish={(values) => console.log(values)}
      sx={{ maxWidth: 400 }}
    >
      <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入有效邮箱' }]}>
        <TextField placeholder="name@example.com" fullWidth />
      </Form.Item>
      <Form.Item label="手机号" name="phone">
        <TextField placeholder="请输入手机号" fullWidth />
      </Form.Item>
      <Form.Item>
        <Button type="submit" variant="contained">保存</Button>
      </Form.Item>
    </Form>
  );
}

function InlineDemo() {
  return (
    <Form layout="inline" onFinish={(values) => console.log(values)}>
      <Form.Item name="keyword">
        <TextField placeholder="搜索关键词" />
      </Form.Item>
      <Form.Item name="status" initialValue="">
        <Select displayEmpty sx={{ minWidth: 120 }}>
          <MenuItem value="">全部状态</MenuItem>
          <MenuItem value="active">活跃</MenuItem>
          <MenuItem value="inactive">停用</MenuItem>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="submit" variant="contained">搜索</Button>
      </Form.Item>
    </Form>
  );
}

function ValidationDemo() {
  return (
    <Form
      layout="vertical"
      onFinish={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Form.Item
        label="字段名称"
        name="fieldName"
        rules={[
          { required: true, message: '字段名称不能为空' },
          { min: 3, message: '字段名称至少 3 个字符' },
          { max: 20, message: '字段名称最多 20 个字符' },
        ]}
      >
        <TextField placeholder="3-20 个字符" fullWidth />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' },
        ]}
      >
        <TextField placeholder="name@example.com" fullWidth />
      </Form.Item>
      <Form.Item>
        <Button type="submit" variant="contained">验证</Button>
      </Form.Item>
    </Form>
  );
}

function ControlledDemo() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => console.log(values)}
    >
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <TextField fullWidth />
      </Form.Item>
      <Form.Item label="启用" name="enabled" valuePropName="checked" initialValue={true}>
        <Switch />
      </Form.Item>
      <Form.Item>
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">保存</Button>
          <Button variant="outlined" onClick={() => form.resetFields()}>重置</Button>
          <Button onClick={() => form.setFieldsValue({ name: '默认文字', enabled: false })}>
            填入默认值
          </Button>
        </Stack>
      </Form.Item>
    </Form>
  );
}

function DynamicDemo() {
  return (
    <Form
      layout="vertical"
      onFinish={(values) => console.log(values)}
    >
      <Form.List name="items" initialValue={[{ name: '' }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Stack key={field.key} direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                <Form.Item
                  name={`items.${field.name}.name`}
                  rules={[{ required: true, message: '请输入条目名称' }]}
                  noStyle
                >
                  <TextField placeholder="条目名称" />
                </Form.Item>
                <Button color="error" onClick={() => remove(field.name)}>
                  删除
                </Button>
              </Stack>
            ))}
            <Button variant="outlined" onClick={() => add({ name: '' })}>
              + 添加条目
            </Button>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>提交</Button>
      </Form.Item>
    </Form>
  );
}

const combinedCode = `import Form from '@ui/components/Form';
import TextField from '@ui/components/TextField';
import Select from '@ui/components/Select';
import MenuItem from '@ui/components/MenuItem';
import Radio from '@ui/components/Radio';
import RadioGroup from '@ui/components/RadioGroup';
import FormControlLabel from '@ui/components/FormControlLabel';
import DateRangePicker from '@ui/components/DateRangePicker';
import TimePicker from '@ui/components/TimePicker';
import Switch from '@ui/components/Switch';
import Button from '@ui/components/Button';

const [form] = Form.useForm();

<Form form={form} layout="vertical" onFinish={(values) => console.log(values)}>
  <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
    <TextField placeholder="请输入名称" fullWidth />
  </Form.Item>
  <Form.Item label="类型" name="type" initialValue="" rules={[{ required: true, message: '请选择类型' }]}>
    <Select fullWidth displayEmpty>
      <MenuItem value="">请选择</MenuItem>
      <MenuItem value="option1">选项一</MenuItem>
      <MenuItem value="option2">选项二</MenuItem>
      <MenuItem value="option3">选项三</MenuItem>
    </Select>
  </Form.Item>
  <Form.Item label="优先级" name="priority" initialValue="normal">
    <RadioGroup row>
      <FormControlLabel value="high" control={<Radio />} label="高" />
      <FormControlLabel value="normal" control={<Radio />} label="中" />
      <FormControlLabel value="low" control={<Radio />} label="低" />
    </RadioGroup>
  </Form.Item>
  <Form.Item label="执行时间范围" name="dateRange">
    <DateRangePicker placeholder={['开始日期', '结束日期']} />
  </Form.Item>
  <Form.Item label="提醒时间" name="remindTime">
    <TimePicker placeholder="选择时间" />
  </Form.Item>
  <Form.Item label="备注" name="remark">
    <TextField placeholder="请输入备注信息" fullWidth multiline rows={3} />
  </Form.Item>
  <Form.Item label="立即启用" name="enabled" valuePropName="checked" initialValue={true}>
    <Switch />
  </Form.Item>
  <Form.Item>
    <Stack direction="row" spacing={2}>
      <Button type="submit" variant="contained">提交</Button>
      <Button variant="outlined" onClick={() => form.resetFields()}>重置</Button>
    </Stack>
  </Form.Item>
</Form>`;

function CombinedDemo() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => console.log('提交:', values)}
    >
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <TextField placeholder="请输入名称" fullWidth />
      </Form.Item>
      <Form.Item label="类型" name="type" initialValue="" rules={[{ required: true, message: '请选择类型' }]}>
        <Select fullWidth displayEmpty>
          <MenuItem value="">请选择</MenuItem>
          <MenuItem value="option1">选项一</MenuItem>
          <MenuItem value="option2">选项二</MenuItem>
          <MenuItem value="option3">选项三</MenuItem>
        </Select>
      </Form.Item>
      <Form.Item label="优先级" name="priority" initialValue="normal">
        <RadioGroup row>
          <FormControlLabel value="high" control={<Radio />} label="高" />
          <FormControlLabel value="normal" control={<Radio />} label="中" />
          <FormControlLabel value="low" control={<Radio />} label="低" />
        </RadioGroup>
      </Form.Item>
      <Form.Item label="执行时间范围" name="dateRange">
        <DateRangePicker placeholder={['开始日期', '结束日期']} />
      </Form.Item>
      <Form.Item label="提醒时间" name="remindTime">
        <TimePicker placeholder="选择时间" />
      </Form.Item>
      <Form.Item label="备注" name="remark">
        <TextField placeholder="请输入备注信息" fullWidth multiline rows={3} />
      </Form.Item>
      <Form.Item label="立即启用" name="enabled" valuePropName="checked" initialValue={true}>
        <Switch />
      </Form.Item>
      <Form.Item>
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">提交</Button>
          <Button variant="outlined" onClick={() => form.resetFields()}>重置</Button>
        </Stack>
      </Form.Item>
    </Form>
  );
}

export default function FormDoc() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Form 表单
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        高性能表单控件，自带数据域管理、校验、布局。配合 TextField、Select、Switch 等组件使用。
      </Typography>

      <DemoBlock title="基本用法" description="水平布局表单，通过 labelCol 控制标签宽度。点击提交触发校验。" code={basicCode}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title="垂直布局" description="设置 layout=&quot;vertical&quot;，标签在输入框上方。" code={verticalCode}>
        <VerticalDemo />
      </DemoBlock>

      <DemoBlock title="行内布局" description="设置 layout=&quot;inline&quot;，所有表单项水平排列，适合搜索栏场景。" code={inlineCode}>
        <InlineDemo />
      </DemoBlock>

      <DemoBlock title="校验规则" description="通过 rules 配置校验，支持 required、min、max、pattern、type、自定义 validator 等。" code={validationCode}>
        <ValidationDemo />
      </DemoBlock>

      <DemoBlock title="表单实例控制" description="使用 Form.useForm() 获取表单实例，可以 resetFields / setFieldsValue / validateFields。" code={controlledCode}>
        <ControlledDemo />
      </DemoBlock>

      <DemoBlock title="动态增减字段" description="Form.List 管理数组字段，支持 add / remove / move 操作。" code={dynamicCode}>
        <DynamicDemo />
      </DemoBlock>

      <DemoBlock title="组合使用" description="综合展示输入框、选择框、单选、日期范围、时间选择、开关等表单控件的组合。" code={combinedCode}>
        <CombinedDemo />
      </DemoBlock>

      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Form Props
      </Typography>
      <PropsTable data={formPropsData} />

      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Form.Item Props
      </Typography>
      <PropsTable data={itemPropsData} />

      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Rule 校验规则
      </Typography>
      <PropsTable data={rulePropsData} />

      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        FormInstance 方法
      </Typography>
      <PropsTable data={formInstanceData} />
    </Box>
  );
}
