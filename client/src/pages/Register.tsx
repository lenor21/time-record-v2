import { useEffect, useState } from 'react';
import GoogleButton from '../components/GoogleButton';
import { useFormik, FormikHelpers } from 'formik';
import { formRegisterSchema } from '../schemas';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useRegisterMutation } from '../features/auth/usersApiSlice';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import { setCredentials } from '../features/auth/authSlice';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RecaptchaResponse = string | null;

const Register = () => {
  const [recaptchaVal, setRecaptchaVal] = useState<RecaptchaResponse>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/account');
    }
  }, [navigate, userInfo]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate('/account');
      actions.resetForm();

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: formRegisterSchema,
    onSubmit,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='grid place-items-center min-h-[85vh] py-20'>
      <div className='card bg-base-100 max-w-96 shadow-xl'>
        <form
          onSubmit={formik.handleSubmit}
          className='card-body flex flex-col gap-y-4'>
          <h2 className='card-title'>Sign up</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <div className='card-actions'>
            <input
              type='text'
              placeholder='Name'
              className={`input bg-white input-bordered w-full ${
                formik.errors.name && formik.touched.name ? 'border-[red]' : ''
              }`}
              id='name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <p className='text-[red] text-sm'>{formik.errors.name}</p>
            )}
          </div>
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
            <div className='w-full relative'>
              <input
                type={`${!showConfirmPassword ? 'text' : 'password'}`}
                placeholder='Confirm password'
                className={`input input-bordered w-full pr-10 ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? 'border-[red]'
                    : ''
                }`}
                id='confirmPassword'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {showConfirmPassword ? (
                <FaEye
                  className='absolute top-[50%] right-4 translate-y-[-50%]'
                  onClick={handleShowConfirmPassword}
                />
              ) : (
                <FaEyeSlash
                  className='absolute top-[50%] right-4 translate-y-[-50%]'
                  onClick={handleShowConfirmPassword}
                />
              )}
            </div>

            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className='text-[red] text-sm'>
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <div className='card-actions'>
            <div className='grid place-items-center w-full'>
              <ReCAPTCHA
                size='compact'
                sitekey='6Leo_rYqAAAAAGJzBJgU-kbEYPWN98vpxlmy-f8x'
                onChange={(val: RecaptchaResponse) => setRecaptchaVal(val)}
              />
            </div>

            <button
              disabled={formik.isSubmitting || !recaptchaVal}
              type='submit'
              className={`btn btn-neutral w-full`}>
              Sign up
            </button>
          </div>
          <div className='divider my-0'>or</div>
          <div className='card-actions'>
            <GoogleButton />
          </div>
          <p className='text-center'>
            Already have an account?{' '}
            <Link className='text-blue-500 underline' to='/sign-in'>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
