'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { FormContext, FormItemContext } from './FormContext';

const FormItemRoot = styled('div', { name: 'MuiFormItem', slot: 'Root' })(
  memoTheme(({ theme }) => ({
    display: 'flex',
    marginBottom: 16,
    '&:last-child': {
      marginBottom: 0,
    },
  })),
);

const FormItemLabel = styled('label', { name: 'MuiFormItem', slot: 'Label' })(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: '14px',
    color: (theme.vars || theme).palette.text.secondary,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '&[data-align="right"]': {
      justifyContent: 'flex-end',
    },
    '&[data-align="left"]': {
      justifyContent: 'flex-start',
    },
    '&[data-required="true"]::before': {
      content: '"*"',
      color: (theme.vars || theme).palette.error.main,
      marginRight: theme.spacing(1),
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1,
    },
  })),
);

const FormItemControl = styled('div', { name: 'MuiFormItem', slot: 'Control' })({
  flex: 1,
  minWidth: 0,
});

const FormItemExplain = styled('div', { name: 'MuiFormItem', slot: 'Explain' })(
  memoTheme(({ theme }) => ({
    minHeight: 22,
    paddingTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '20px',
    color: (theme.vars || theme).palette.error.main,
    transition: 'color 0.3s',
  })),
);

const FormItemExtra = styled('div', { name: 'MuiFormItem', slot: 'Extra' })(
  memoTheme(({ theme }) => ({
    paddingTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '20px',
    color: (theme.vars || theme).palette.text.secondary,
  })),
);

async function validateRule(rule, value, formValues) {
  if (rule.required && (value === undefined || value === null || value === '')) {
    return rule.message || '此项为必填项';
  }
  if (rule.min !== undefined && typeof value === 'string' && value.length < rule.min) {
    return rule.message || `最少 ${rule.min} 个字符`;
  }
  if (rule.max !== undefined && typeof value === 'string' && value.length > rule.max) {
    return rule.message || `最多 ${rule.max} 个字符`;
  }
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message || '格式不正确';
  }
  if (rule.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return rule.message || '请输入有效的邮箱地址';
  }
  if (rule.type === 'number' && value && isNaN(Number(value))) {
    return rule.message || '请输入数字';
  }
  if (rule.validator) {
    try {
      await rule.validator(rule, value, formValues);
    } catch (err) {
      return err.message || err || '校验未通过';
    }
  }
  if (rule.warningOnly) return null;
  return null;
}

function FormItem(props) {
  const {
    children,
    name,
    label,
    rules = [],
    valuePropName = 'value',
    trigger = 'onChange',
    validateTrigger = 'onChange',
    initialValue,
    dependencies,
    extra,
    tooltip,
    hidden,
    noStyle,
    required,
    labelCol: itemLabelCol,
    wrapperCol: itemWrapperCol,
    labelAlign: itemLabelAlign,
    colon: itemColon,
    help,
    validateStatus: validateStatusProp,
    hasFeedback,
    style,
  } = props;

  const formContext = React.useContext(FormContext);
  const {
    layout,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    labelAlign: formLabelAlign,
    colon: formColon,
    requiredMark,
    disabled: formDisabled,
  } = formContext || {};

  const labelCol = itemLabelCol || formLabelCol;
  const wrapperCol = itemWrapperCol || formWrapperCol;
  const labelAlign = itemLabelAlign || formLabelAlign || 'right';
  const colon = itemColon !== undefined ? itemColon : formColon;

  const [value, setValue] = React.useState(() => {
    if (name && formContext) {
      const formValue = formContext.getFieldValue(name);
      return formValue !== undefined ? formValue : initialValue;
    }
    return initialValue;
  });
  const [errors, setErrors] = React.useState([]);
  const [touched, setTouched] = React.useState(false);

  const entityRef = React.useRef({
    props,
    onStoreChange: () => {},
    validateRules: async () => [],
    getErrors: () => [],
    isTouched: () => false,
  });

  entityRef.current.props = props;
  entityRef.current.getErrors = () => errors;
  entityRef.current.isTouched = () => touched;

  entityRef.current.validateRules = async () => {
    if (!rules || rules.length === 0) return [];
    const currentValue = name && formContext ? formContext.getFieldValue(name) : value;
    const formValues = formContext ? formContext.getFieldsValue() : {};
    const fieldErrors = [];
    for (const rule of rules) {
      const error = await validateRule(rule, currentValue, formValues);
      if (error) fieldErrors.push(error);
    }
    setErrors(fieldErrors);
    return fieldErrors;
  };

  entityRef.current.onStoreChange = (changedName) => {
    if (name && formContext) {
      const newValue = formContext.getFieldValue(name);
      setValue(newValue);

      if (dependencies && dependencies.includes(changedName)) {
        entityRef.current.validateRules();
      }
    }
  };

  React.useEffect(() => {
    if (!formContext || !formContext._store) return;
    const unregister = formContext._store.registerField(entityRef.current);

    if (initialValue !== undefined && name) {
      const currentValue = formContext.getFieldValue(name);
      if (currentValue === undefined) {
        formContext.setFieldValue(name, initialValue);
      }
    }

    return unregister;
  }, []);

  if (hidden) return null;

  const isRequired =
    required !== undefined ? required : rules.some((rule) => rule.required);

  const handleChange = (eventOrValue) => {
    let newValue;
    if (eventOrValue && eventOrValue.target) {
      const { target } = eventOrValue;
      if (target.type === 'checkbox') {
        newValue = target.checked;
      } else {
        newValue = target.value;
      }
    } else {
      newValue = eventOrValue;
    }

    setTouched(true);

    if (name && formContext) {
      formContext.setFieldValue(name, newValue);
      if (formContext._store?.callbacks?.onValuesChange) {
        const changedValues = {};
        changedValues[name] = newValue;
        formContext._store.callbacks.onValuesChange(
          changedValues,
          formContext.getFieldsValue(),
        );
      }
    } else {
      setValue(newValue);
    }

    if (validateTrigger === 'onChange' || validateTrigger.includes?.('onChange')) {
      setTimeout(() => entityRef.current.validateRules(), 0);
    }
  };

  const handleBlur = () => {
    if (validateTrigger === 'onBlur' || validateTrigger.includes?.('onBlur')) {
      entityRef.current.validateRules();
    }
  };

  const getControlled = () => {
    const childProps = {};
    const fieldValue = name && formContext ? formContext.getFieldValue(name) : value;

    if (valuePropName === 'checked') {
      childProps.checked = !!fieldValue;
    } else {
      childProps[valuePropName] = fieldValue;
    }

    childProps[trigger] = handleChange;
    childProps.onBlur = handleBlur;

    if (formDisabled) {
      childProps.disabled = true;
    }

    return childProps;
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(formContext);
    }

    if (!name) return children;

    if (!React.isValidElement(children)) return children;

    const controlledProps = getControlled();
    return React.cloneElement(children, controlledProps);
  };

  if (noStyle) {
    return renderChildren();
  }

  const showErrors = validateStatusProp === 'error' || (errors.length > 0 && !help);
  const labelWidth = labelCol?.span ? `${(labelCol.span / 24) * 100}%` : labelCol?.flex || undefined;
  const wrapperFlex = wrapperCol?.span ? `0 0 ${(wrapperCol.span / 24) * 100}%` : undefined;
  const wrapperOffset = wrapperCol?.offset ? `${(wrapperCol.offset / 24) * 100}%` : undefined;

  const labelStyle = {};
  if (layout === 'horizontal' && labelWidth) {
    labelStyle.width = labelWidth;
    labelStyle.flexShrink = 0;
  }
  if (layout === 'horizontal') {
    labelStyle.paddingRight = 12;
  }

  const wrapperStyle = {};
  if (wrapperFlex) {
    wrapperStyle.flex = wrapperFlex;
  }
  if (wrapperOffset && !label) {
    wrapperStyle.marginLeft = wrapperOffset;
  }

  const colonSuffix = colon && layout !== 'vertical' && label && String(label).trim() ? '：' : '';

  return (
    <FormItemContext.Provider value={{ name, errors, touched }}>
      <FormItemRoot className="MuiFormItem-Root" style={style}>
        {label !== undefined && layout === 'horizontal' && (
          <FormItemLabel
            data-align={labelAlign}
            data-required={requiredMark && isRequired ? 'true' : 'false'}
            style={labelStyle}
          >
            {label}{colonSuffix}
          </FormItemLabel>
        )}
        {label !== undefined && layout === 'vertical' && (
          <FormItemLabel
            data-align="left"
            data-required={requiredMark && isRequired ? 'true' : 'false'}
          >
            {label}{colonSuffix}
          </FormItemLabel>
        )}
        <FormItemControl style={label === undefined && layout === 'horizontal' && labelWidth ? { ...wrapperStyle, marginLeft: `calc(${labelWidth} + 12px)` } : wrapperStyle}>
          {renderChildren()}
          {(showErrors || help) && (
            <FormItemExplain>
              {help || errors[0]}
            </FormItemExplain>
          )}
          {extra && <FormItemExtra>{extra}</FormItemExtra>}
        </FormItemControl>
      </FormItemRoot>
    </FormItemContext.Provider>
  );
}

export default FormItem;
