import React from 'react'
import { auth } from '../../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { formStyle, textStyle, lineStyle, authDiv, linkText, iconStyle } from './styles'
import '../../../styles/global.scss';

const Login = () => {
  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  }

  const handleLoginUser = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='flex-col center' style={{ height: '100vh', backgroundColor: 'rgb(248, 250, 252)' }}>

      <h1 className='title-main'>Walk My Pup</h1>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {};
          if (!values.password && !values.email) {
            errors.email = true;
            errors.password = true;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } else if (!values.password) {
            errors.password = true;
          } else if (!values.email) {
            errors.email = true;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleLoginUser(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid, errors }) => (
          <Form style={formStyle}>
            <h2>Email</h2>
            <Field className={!errors.email ? 'input' : 'input err'} type="email" name="email" placeholder='Email' />
            <ErrorMessage name="email" component="div" />
            <h2 className='marg-top-xtra'>Password</h2>
            <Field className={!errors.password ? 'input' : 'input err'} type="password" name="password" placeholder='Password' />
            <ErrorMessage name="password" component="div" />
            <button style={{ alignSelf: 'center' }} className='btn marg-top-xtra' type="submit" disabled={isSubmitting || !isValid}>
              Login
            </button>
            <p className='hover-underline' style={textStyle}>Forgot Password?</p>
            <hr style={lineStyle} />
            <div style={authDiv} className='hover'>
              <span style={iconStyle}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' alt='logo' />
              </span>
              <p style={linkText}>
                Login with Google
              </p>
            </div>
            <div style={authDiv} className='hover'>
              <span style={iconStyle}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://www.rebelup.org/wp-content/uploads/2017/09/facebook-icon-preview-400x400.png' alt='logo' />
              </span>
              <p style={linkText}>
                Login with Facebook
              </p>
            </div>
          </Form>
        )}
      </Formik>

      <p className='marg-top-xtra'> &mdash; Don't have an account?
        {' '}
        <span
          onClick={() => navigate('/signup')}
          style={{ fontWeight: 'bolder' }} className='hover-underline'>
          Sign Up
        </span>
        {' '}
        &mdash;
      </p>

    </div>
  )
}

export default Login
