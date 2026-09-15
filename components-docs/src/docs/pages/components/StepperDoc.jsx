import React, { useState } from 'react';
import InlineImportCode from '../../components/InlineImportCode';
import Stepper from '@ui/components/Stepper';
import Step from '@ui/components/Step';
import StepLabel from '@ui/components/StepLabel';
import StepButton from '@ui/components/StepButton';
import StepContent from '@ui/components/StepContent';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import Divider from '@ui/components/Divider';
import Button from '@ui/components/Button';
import DemoBlock from '../../components/DemoBlock';
import PropsTable from '../../components/PropsTable';

const steps = ['已完成', '进行中', '待处理'];

const basicCode = `import Stepper from '@ui/components/Stepper';
import Step from '@ui/components/Step';
import StepLabel from '@ui/components/StepLabel';

const steps = ['已完成', '进行中', '待处理'];

<Stepper activeStep={1}>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>`;

const errorCode = `<Stepper activeStep={1}>
  <Step>
    <StepLabel>已完成</StepLabel>
  </Step>
  <Step>
    <StepLabel error>出错了</StepLabel>
  </Step>
  <Step>
    <StepLabel>待处理</StepLabel>
  </Step>
</Stepper>`;

const clickableCode = `const [activeStep, setActiveStep] = useState(0);

<Stepper nonLinear activeStep={activeStep}>
  {steps.map((label, index) => (
    <Step key={label}>
      <StepButton onClick={() => setActiveStep(index)}>
        {label}
      </StepButton>
    </Step>
  ))}
</Stepper>`;

const alternativeCode = `<Stepper activeStep={1} alternativeLabel>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>`;

const interactiveCode = `const [activeStep, setActiveStep] = useState(0);
const steps = ['选择方案', '填写信息', '确认提交'];

<Stepper activeStep={activeStep}>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
<Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
  <Button disabled={activeStep === 0} onClick={() => setActiveStep(prev => prev - 1)}>
    上一步
  </Button>
  <Button variant="contained" onClick={() => setActiveStep(prev => prev + 1)}
    disabled={activeStep === steps.length}>
    {activeStep === steps.length - 1 ? '完成' : '下一步'}
  </Button>
</Box>`;

const verticalContentCode = `const [activeStep, setActiveStep] = useState(0);
const steps = [
  { label: '选择方案', content: '请选择您需要的服务方案。' },
  { label: '填写信息', content: '请填写必要的个人或企业信息。' },
  { label: '完成提交', content: '确认信息无误后提交申请。' },
];

<Stepper activeStep={activeStep} orientation="vertical">
  {steps.map((step, index) => (
    <Step key={step.label}>
      <StepLabel>{step.label}</StepLabel>
      <StepContent>
        <Typography variant="body2">{step.content}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" size="small" onClick={() => setActiveStep(index + 1)} sx={{ mr: 1 }}>
            {index === steps.length - 1 ? '完成' : '下一步'}
          </Button>
          {index > 0 && (
            <Button size="small" onClick={() => setActiveStep(index - 1)}>上一步</Button>
          )}
        </Box>
      </StepContent>
    </Step>
  ))}
</Stepper>`;

const stepperPropsData = [
  { name: 'activeStep', type: 'number', default: '0', description: '当前步骤，从 0 开始' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '步骤条方向' },
  { name: 'alternativeLabel', type: 'boolean', default: 'false', description: '标签放在图标下方' },
  { name: 'nonLinear', type: 'boolean', default: 'false', description: '非线性步骤，允许任意跳转' },
  { name: 'connector', type: 'ReactElement', default: '<StepConnector />', description: '步骤之间的连接器' },
];

const stepLabelPropsData = [
  { name: 'children', type: 'ReactNode', default: '-', description: '标签内容' },
  { name: 'error', type: 'boolean', default: 'false', description: '标记为错误状态' },
  { name: 'icon', type: 'ReactNode', default: '-', description: '自定义图标' },
  { name: 'optional', type: 'ReactNode', default: '-', description: '可选的附加节点' },
];

const stepButtonPropsData = [
  { name: 'children', type: 'ReactNode', default: '-', description: '按钮内容' },
  { name: 'icon', type: 'ReactNode', default: '-', description: '自定义图标' },
  { name: 'optional', type: 'ReactNode', default: '-', description: '可选的附加节点' },
];

export default function StepperDoc() {
  const [activeStep, setActiveStep] = useState(0);
  const [clickStep, setClickStep] = useState(0);
  const [verticalStep, setVerticalStep] = useState(0);
  const interactiveSteps = ['选择方案', '填写信息', '确认提交'];
  const verticalSteps = [
    { label: '选择方案', content: '请选择您需要的服务方案。' },
    { label: '填写信息', content: '请填写必要的个人或企业信息。' },
    { label: '完成提交', content: '确认信息无误后提交申请。' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} id="stepper-title">
        Stepper 步骤条
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        引导用户按照流程完成操作的导航条。当流程复杂或存在先后关系时，可将其分解成一系列步骤。
      </Typography>
      <Typography className="component-import" variant="body2" sx={{ mb: 3 }}>
        使用：<InlineImportCode code="import Stepper from '@ui/components/Stepper'" />
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" id="demo-basic" sx={{ fontWeight: 600, mb: 2 }}>
        代码演示
      </Typography>

      <DemoBlock title="基本用法" description="简单的水平步骤条。" code={basicCode}>
        <Stepper activeStep={1}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DemoBlock>

      <DemoBlock title="步骤运行错误" description="使用 StepLabel 的 error 属性标记错误步骤。" code={errorCode}>
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>已完成</StepLabel>
          </Step>
          <Step>
            <StepLabel error>出错了</StepLabel>
          </Step>
          <Step>
            <StepLabel>待处理</StepLabel>
          </Step>
        </Stepper>
      </DemoBlock>

      <DemoBlock title="标签放置位置" description="使用 alternativeLabel 将标签放在图标下方。" code={alternativeCode}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DemoBlock>

      <DemoBlock title="可点击" description="设置 nonLinear 和 StepButton 后，步骤可点击跳转。" code={clickableCode}>
        <Stepper nonLinear activeStep={clickStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={() => setClickStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </DemoBlock>

      <DemoBlock title="交互式" description="结合按钮控制步骤前进和后退。" code={interactiveCode}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {interactiveSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              上一步
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveStep((prev) => prev + 1)}
              disabled={activeStep === interactiveSteps.length}
            >
              {activeStep === interactiveSteps.length - 1 ? '完成' : '下一步'}
            </Button>
          </Box>
          {activeStep === interactiveSteps.length && (
            <Box sx={{ mt: 2 }}>
              <Typography color="success.main">所有步骤已完成！</Typography>
              <Button size="small" onClick={() => setActiveStep(0)} sx={{ mt: 1 }}>重置</Button>
            </Box>
          )}
        </Box>
      </DemoBlock>

      <DemoBlock title="带内容的竖直步骤" description="竖直步骤条配合 StepContent 展示每步详情。" code={verticalContentCode}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={verticalStep} orientation="vertical">
            {verticalSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography variant="body2">{step.content}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setVerticalStep(index + 1)}
                      sx={{ mr: 1 }}
                    >
                      {index === verticalSteps.length - 1 ? '完成' : '下一步'}
                    </Button>
                    {index > 0 && (
                      <Button size="small" onClick={() => setVerticalStep(index - 1)}>
                        上一步
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {verticalStep === verticalSteps.length && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">所有步骤已完成</Typography>
              <Button size="small" onClick={() => setVerticalStep(0)} sx={{ mt: 1 }}>重置</Button>
            </Box>
          )}
        </Box>
      </DemoBlock>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" id="api" sx={{ fontWeight: 600, mb: 2 }}>API</Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>Stepper</Typography>
      <PropsTable data={stepperPropsData} />

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>StepLabel</Typography>
      <PropsTable data={stepLabelPropsData} />

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>StepButton</Typography>
      <PropsTable data={stepButtonPropsData} />
    </Box>
  );
}
