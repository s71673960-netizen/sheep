'use client';
import * as React from 'react';
import { FormContext } from './FormContext';

function FormList(props) {
  const { name, children, initialValue = [] } = props;
  const formContext = React.useContext(FormContext);
  const [fields, setFields] = React.useState(() => {
    const initial = (formContext && formContext.getFieldValue(name)) || initialValue;
    return initial.map((_, index) => ({
      name: index,
      key: index,
      fieldKey: index,
    }));
  });
  const keyRef = React.useRef(fields.length);

  const syncFieldsFromStore = () => {
    if (!formContext) return;
    const values = formContext.getFieldValue(name) || [];
    setFields(
      values.map((_, index) => ({
        name: index,
        key: index,
        fieldKey: index,
      })),
    );
  };

  React.useEffect(() => {
    if (formContext && formContext._store) {
      const entity = {
        props: { name: `__list_${name}__` },
        onStoreChange: (changedName) => {
          if (!changedName || changedName === name || (typeof changedName === 'string' && changedName.startsWith(name + '.'))) {
            syncFieldsFromStore();
          }
        },
        validateRules: () => [],
        getErrors: () => [],
        isTouched: () => false,
      };
      const unregister = formContext._store.registerField(entity);

      if (initialValue.length > 0 && !formContext.getFieldValue(name)) {
        formContext.setFieldValue(name, initialValue);
      }

      return unregister;
    }
  }, []);

  const operations = React.useMemo(
    () => ({
      add: (defaultValue, insertIndex) => {
        const values = (formContext && formContext.getFieldValue(name)) || [];
        const newValues = [...values];
        const idx = insertIndex !== undefined ? insertIndex : newValues.length;
        newValues.splice(idx, 0, defaultValue !== undefined ? defaultValue : undefined);
        if (formContext) {
          formContext.setFieldValue(name, newValues);
        }
        keyRef.current += 1;
        setFields(
          newValues.map((_, i) => ({
            name: i,
            key: i,
            fieldKey: i,
          })),
        );
      },
      remove: (index) => {
        const values = (formContext && formContext.getFieldValue(name)) || [];
        const indices = Array.isArray(index) ? index : [index];
        const newValues = values.filter((_, i) => !indices.includes(i));
        if (formContext) {
          formContext.setFieldValue(name, newValues);
        }
        setFields(
          newValues.map((_, i) => ({
            name: i,
            key: i,
            fieldKey: i,
          })),
        );
      },
      move: (from, to) => {
        const values = (formContext && formContext.getFieldValue(name)) || [];
        const newValues = [...values];
        const [removed] = newValues.splice(from, 1);
        newValues.splice(to, 0, removed);
        if (formContext) {
          formContext.setFieldValue(name, newValues);
        }
        setFields(
          newValues.map((_, i) => ({
            name: i,
            key: i,
            fieldKey: i,
          })),
        );
      },
    }),
    [formContext, name],
  );

  if (typeof children !== 'function') return null;

  return children(fields, operations, { errors: [] });
}

export default FormList;
