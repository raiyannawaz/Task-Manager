import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useContext, useState } from 'react';
import Context from '../ContextAPI/Context';

export default function SignIn() {

  // States 
  let navigate = useNavigate()

  let { setIsLoading, showAlerts } = useContext(Context)

  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  // States 

  // Validate Schema 
  const validateSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
    password: Yup.string().required('Password is required').min(8, 'Password requires 8 characters'),
  })
  // Validate Schema 

  const handleLogin = async (payload) => {

    try {
      // API CALLING 
      let response = await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      // API CALLING 

      let { token, message } = await response.json()

      if (response.status === 200 && response.ok) {
        setIsLoading(false)
        sessionStorage.setItem('token', token)
        
        showAlerts({ isShown: true, mode: 'success', message })
        navigate('/dashboard')
      }
      else {
        setIsLoading(false)
        showAlerts({ isShown: true, mode: 'danger', message })
      }
    }
    catch (err) {
      setIsLoading(false)
      showAlerts({ isShown: true, mode: 'danger', message: 'Uncaught error' })
    }

  }

  return (
    // CONTENT
    <div className="w-full flex justify-center">

      {/* CARD */}
      <div className="card w-10/12 lg:w-[25%] md:w-1/2 mt-24 lg:mt-18 min-h-[23rem] shadow-lg bg-white rounded-3xl text-center relative">


        {/* TOP HEADER */}
        <div className="text-indigo-500 user-svg absolute -top-10 lg:-top-14 left-[50%] translate-x-[-50%] bg-white rounded-full">
          <AccountCircleIcon className='user-icon' />
        </div>
        <h1 className="text-4xl mt-20 mb-2 text-indigo-500">Login</h1>
        {/* TOP HEADER */}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validateSchema}
          validate={(values) => {
            try {
              validateSchema.validateSync(values, { abortEarly: false });
              setErrorMessage("")
              setIsSuccess(true)
            } catch (err) {
              setErrorMessage(err.errors[0])
              setIsSuccess(false)
            }
          }}
          onSubmit={(value, { setSubmitting }) => {
            try {
              setIsLoading(true)
              handleLogin(value)
            }
            catch (err) {
              setSubmitting(false);
            }
          }}
        >

          {() => (
            <Form>
              {/* ALERT MESSAGE  */}
              {
                errorMessage ?
                  <p className='text-red-500 text-sm lg:text-base mb-4'>
                    {errorMessage}
                  </p> :
                  <p className='text-sm lg:text-base mb-4'>Don't have an account? <NavLink className='text-indigo-500' to={'/sign-up'}>Sign Up</NavLink></p>
              }
              {/* ALERT MESSAGE  */}

              {/* EMAIL INPUT  */}
              <div className="form-group w-4/5 lg:w-3/4 mx-auto mb-4">
                <Field type="text" name='email' className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border' placeholder='Email' />
              </div>
              {/* EMAIL INPUT */}

              {/* PASSWORD INPUT */}
              <div className="form-group w-4/5 lg:w-3/4 mx-auto mb-4">
                <Field type="password" name='password' className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border' placeholder='Password' />
              </div>
              {/* PASSWORD INPUT */}
              <button type='submit' disabled={!isSuccess} className={`w-4/5 lg:w-3/4 py-2 mb-4 ${!isSuccess ? 'bg-indigo-400' : 'bg-indigo-600'} active:bg-indigo-800 rounded-3xl text-white text-sm lg:text-base transition-all`}>Log In</button>
            </Form>
          )}

        </Formik>

      </div>
      {/* CARD */}

    </div >
    // CONTENT
  )
}
