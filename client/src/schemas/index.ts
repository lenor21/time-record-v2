import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const formLoginSchema = yup.object().shape({
  email: yup.string().email('please enter a valid email').required('required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'please create a stronger password' })
    .required('required'),
});

export const formRegisterSchema = yup.object().shape({
  name: yup.string().min(3).required('required'),
  email: yup.string().email('please enter a valid email').required('required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'please create a stronger password' })
    .required('required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
    .required('required')
    .nullable(),
});

export const formUpdateUserSchema = yup.object().shape({
  name: yup.string().min(3).required('required'),
  email: yup.string().email('please enter a valid email').required('required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'please create a stronger password' })
    .required('required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
    .required('required')
    .nullable(),
});
