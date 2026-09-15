'use client';
import * as React from 'react';

class FormStore {
  constructor() {
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
    this.initialValues = {};
  }

  getFieldValue = (name) => {
    return getNestedValue(this.store, name);
  };

  getFieldsValue = (nameList) => {
    if (!nameList) return { ...this.store };
    const values = {};
    nameList.forEach((name) => {
      setNestedValue(values, name, this.getFieldValue(name));
    });
    return values;
  };

  setFieldsValue = (values) => {
    this.store = { ...this.store, ...values };
    this.notifyObservers();
  };

  setFieldValue = (name, value) => {
    setNestedValue(this.store, name, value);
    this.store = { ...this.store };
    this.notifyObservers(name);
  };

  registerField = (entity) => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
    };
  };

  notifyObservers = (name) => {
    this.fieldEntities.forEach((entity) => {
      entity.onStoreChange(name);
    });
  };

  setCallbacks = (callbacks) => {
    this.callbacks = { ...this.callbacks, ...callbacks };
  };

  setInitialValues = (values, init) => {
    this.initialValues = values || {};
    if (init) {
      this.store = { ...this.initialValues };
    }
  };

  resetFields = (nameList) => {
    if (!nameList) {
      this.store = { ...this.initialValues };
    } else {
      nameList.forEach((name) => {
        setNestedValue(this.store, name, getNestedValue(this.initialValues, name));
      });
      this.store = { ...this.store };
    }
    this.notifyObservers();
  };

  validateFields = async (nameList) => {
    const fieldsToValidate = nameList
      ? this.fieldEntities.filter((f) => nameList.includes(f.props.name))
      : this.fieldEntities.filter((f) => f.props.name && f.props.rules?.length > 0);

    const errors = [];
    for (const entity of fieldsToValidate) {
      const fieldErrors = await entity.validateRules();
      if (fieldErrors.length > 0) {
        errors.push({ name: entity.props.name, errors: fieldErrors });
      }
    }

    if (errors.length > 0) {
      const err = new Error('Validate Failed');
      err.errorFields = errors;
      err.values = this.getFieldsValue();
      throw err;
    }

    return this.getFieldsValue();
  };

  submit = async () => {
    try {
      const values = await this.validateFields();
      if (this.callbacks.onFinish) {
        this.callbacks.onFinish(values);
      }
    } catch (err) {
      if (this.callbacks.onFinishFailed) {
        this.callbacks.onFinishFailed({
          values: err.values,
          errorFields: err.errorFields,
        });
      }
    }
  };

  getFieldError = (name) => {
    const entity = this.fieldEntities.find((f) => f.props.name === name);
    return entity?.getErrors() || [];
  };

  getFieldsError = () => {
    return this.fieldEntities
      .filter((f) => f.props.name)
      .map((entity) => ({
        name: entity.props.name,
        errors: entity.getErrors(),
      }));
  };

  isFieldTouched = (name) => {
    const entity = this.fieldEntities.find((f) => f.props.name === name);
    return entity?.isTouched() || false;
  };

  isFieldsTouched = (nameList, allFieldsTouched) => {
    const entities = nameList
      ? this.fieldEntities.filter((f) => nameList.includes(f.props.name))
      : this.fieldEntities.filter((f) => f.props.name);

    if (allFieldsTouched) {
      return entities.every((entity) => entity.isTouched());
    }
    return entities.some((entity) => entity.isTouched());
  };

  getForm = () => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    setFieldValue: this.setFieldValue,
    resetFields: this.resetFields,
    validateFields: this.validateFields,
    submit: this.submit,
    getFieldError: this.getFieldError,
    getFieldsError: this.getFieldsError,
    isFieldTouched: this.isFieldTouched,
    isFieldsTouched: this.isFieldsTouched,
  });
}

function getNestedValue(obj, path) {
  if (!path) return obj;
  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result == null) return undefined;
    result = result[key];
  }
  return result;
}

function setNestedValue(obj, path, value) {
  if (!path) return;
  const keys = Array.isArray(path) ? path : path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] == null) {
      current[key] = typeof keys[i + 1] === 'number' ? [] : {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

export default function useForm(form) {
  const formRef = React.useRef(null);

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const store = new FormStore();
      formRef.current = store.getForm();
      formRef.current._store = store;
    }
  }

  return [formRef.current];
}
