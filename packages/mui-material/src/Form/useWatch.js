'use client';
import * as React from 'react';
import { FormContext } from './FormContext';

export default function useWatch(name, form) {
  const formContext = React.useContext(FormContext);
  const formInstance = form || formContext;
  const [value, setValue] = React.useState(() => {
    if (!formInstance) return undefined;
    return name ? formInstance.getFieldValue(name) : formInstance.getFieldsValue();
  });

  React.useEffect(() => {
    if (!formInstance || !formInstance._store) return;

    const entity = {
      props: { name: '__watch__' },
      onStoreChange: () => {
        const newValue = name
          ? formInstance.getFieldValue(name)
          : formInstance.getFieldsValue();
        setValue(newValue);
      },
      validateRules: () => [],
      getErrors: () => [],
      isTouched: () => false,
    };

    const unregister = formInstance._store.registerField(entity);
    return unregister;
  }, [formInstance, name]);

  return value;
}
