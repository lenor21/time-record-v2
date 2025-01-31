import GoogleButton from '../components/GoogleButton';
import { Link, useNavigate } from 'react-router';
import { useFormik, FormikHelpers } from 'formik';
import { formLoginSchema } from '../schemas';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../features/auth/usersApiSlice';
import { setCredentials } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import { useRecordTodayQuery } from '../features/record/recordsApiSlice';
import { setRecord } from '../features/record/recordSlice';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [login, { isLoading }] = useLoginMutation();
  const { data, refetch } = useRecordTodayQuery(userInfo?._id, {
    skip: !userInfo,
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      // handle successful login
      dispatch(setCredentials({ ...res }));

      dispatch(setRecord({ ...data }));

      navigate('/account');
      actions.resetForm();
      // console.log(values.email, actions);

      // Optional: Simulate loading state (if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err: unknown) {
      if (isApiError(err)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.data.message || err.error}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (err instanceof Error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const isApiError = (
    error: unknown
  ): error is { data: { message?: string }; error?: string } => {
    return (
      typeof error === 'object' &&
      error !== null &&
      'data' in error &&
      typeof error.data === 'object'
    );
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formLoginSchema,
    onSubmit,
  });

  useEffect(() => {
    if (userInfo) {
      navigate('/account');
      refetch();
    }
  }, [navigate, userInfo]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='card bg-base-100 max-w-96 shadow-xl'>
        <form
          onSubmit={formik.handleSubmit}
          className='card-body flex flex-col gap-y-4'>
          <h2 className='card-title'>Sign in</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <div className='card-actions'>
            <input
              type='email'
              placeholder='Email'
              className={`input bg-white input-bordered w-full ${
                formik.errors.email && formik.touched.email
                  ? 'border-[red]'
                  : ''
              }`}
              id='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className='text-[red] text-sm'>{formik.errors.email}</p>
            )}
          </div>
          <div className='card-actions'>
            <div className='w-full relative'>
              <input
                type={`${!showPassword ? 'text' : 'password'}`}
                placeholder='Password'
                className={`input input-bordered w-full pr-10 ${
                  formik.errors.password && formik.touched.password
                    ? 'border-[red]'
                    : ''
                }`}
                id='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {showPassword ? (
                <FaEye
                  className='absolute top-[50%] right-4 translate-y-[-50%]'
                  onClick={handleShowPassword}
                />
              ) : (
                <FaEyeSlash
                  className='absolute top-[50%] right-4 translate-y-[-50%]'
                  onClick={handleShowPassword}
                />
              )}
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className='text-[red] text-sm'>{formik.errors.password}</p>
            )}
          </div>
          <div className='card-actions'>
            <button
              disabled={formik.isSubmitting}
              type='submit'
              className={`btn btn-neutral w-full`}>
              Sign in
            </button>
            <Link className='underline' to='/'>
              Forgot password?
            </Link>
          </div>
          <div className='divider my-0'>or</div>
          <div className='card-actions'>
            <GoogleButton />
          </div>
          <p className='text-center'>
            Don't have an account?{' '}
            <Link className='text-blue-500 underline' to='/sign-up'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
