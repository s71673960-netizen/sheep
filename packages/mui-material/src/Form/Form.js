'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForm from './useForm';
import { FormContext } from './FormContext';

const FormRoot = styled('form', { name: 'MuiForm', slot: 'Root' })(
  memoTheme(({ theme }) => ({
    margin: 0,
    padding: 0,
    width: '100%',
    '&[data-layout="horizontal"]': {
      '& .MuiFormItem-Root': {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
    },
    '&[data-layout="vertical"]': {
      '& .MuiFormItem-Root': {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 8,
      },
    },
    '&[data-layout="inline"]': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      '& .MuiFormItem-Root': {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 0,
      },
    },
  })),
);

const Form = React.forwardRef(function Form(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiForm' });
  const {
    children,
    form: formProp,
    initialValues,
    layout = 'horizontal',
    labelCol,
    wrapperCol,
    labelAlign = 'right',
    colon = true,
    requiredMark = true,
    disabled = false,
    onFinish,
    onFinishFailed,
    onValuesChange,
    preserve = true,
    sx,
    ...other
  } = props;

  const [formInstance] = useForm(formProp);

  React.useEffect(() => {
    if (formInstance._store) {
      formInstance._store.setInitialValues(initialValues, true);
    }
  }, []);

  React.useEffect(() => {
    if (formInstance._store) {
      formInstance._store.setCallbacks({
        onFinish,
        onFinishFailed,
        onValuesChange,
      });
    }
  }, [onFinish, onFinishFailed, onValuesChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    formInstance.submit();
  };

  const contextValue = React.useMemo(
    () => ({
      ...formInstance,
      layout,
      labelCol,
      wrapperCol,
      labelAlign,
      colon,
      requiredMark,
      disabled,
    }),
    [formInstance, layout, labelCol, wrapperCol, labelAlign, colon, requiredMark, disabled],
  );

  return (
    <FormContext.Provider value={contextValue}>
      <FormRoot
        ref={ref}
        data-layout={layout}
        onSubmit={handleSubmit}
        sx={sx}
        {...other}
      >
        {children}
      </FormRoot>
    </FormContext.Provider>
  );
});

export default Form;
