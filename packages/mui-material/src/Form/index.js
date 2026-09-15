'use client';
import Form from './Form';
import FormItem from './FormItem';
import FormList from './FormList';
import useForm from './useForm';
import useWatch from './useWatch';

Form.Item = FormItem;
Form.List = FormList;
Form.useForm = useForm;
Form.useWatch = useWatch;

export default Form;
export { FormItem, FormList, useForm, useWatch };
