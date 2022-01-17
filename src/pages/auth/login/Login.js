import React from 'react'
import { auth } from '../../../firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { googleProvider, facebookProvider } from '../../../firebaseConfig'
import { formStyle, textStyle, lineStyle, authDiv, linkText, iconStyle } from './styles'
import * as Yup from 'yup';
import '../../../styles/global.scss';

const Login = () => {
  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  }

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required(),
    email: Yup.string().email('Invalid email').required(),
  });

  const handleLoginUser = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider)
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
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleLoginUser(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid, errors }) => (
          <Form style={formStyle}>
            <h2>Email</h2>
            <Field className={!errors.email ? 'input' : 'input err'} type="email" name="email" placeholder='Email' />
            <h2 className='marg-top-xtra'>Password</h2>
            <Field className={!errors.password ? 'input' : 'input err'} type="password" name="password" placeholder='Password' />
            <button style={{ alignSelf: 'center' }} className='btn marg-top-xtra' type="submit" disabled={isSubmitting || !isValid}>
              Login
            </button>
            <p className='hover-underline' style={textStyle}>Forgot Password?</p>
            <hr style={lineStyle} />
            <div onClick={handleGoogleLogin} style={authDiv} className='hover'>
              <span style={iconStyle}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' alt='logo' />
              </span>
              <p style={linkText}>
                Login with Google
              </p>
            </div>
            <div onClick={handleFacebookLogin} style={authDiv} className='hover'>
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
