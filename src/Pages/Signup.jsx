import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useContext, useState } from 'react';
import Context from '../ContextAPI/Context';
import { signUp } from '../Utils/BaseUrl'

export default function Signup() {

  let navigate = useNavigate()

  // Contexts 
  let { setIsLoading, showAlerts } = useContext(Context)
  // Contexts 

  // States 
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  // States 

  // FORM VALIDATION 
  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name requires 3 characters').max(30, 'Name is too large').matches(/^[A-Za-z_\s]{3,30}$/, 'Name can only contain letters and spaces.'),
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
    password: Yup.string().required('Password is required').min(8, 'Password requires 8 characters'),
    confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Confirm password must match')
  })
  // FORM VALIDATION 

  // HANDLE SIGNUP 
  const handleSignUp = async (payload) => {
    try {

      let response = await signUp(payload)
      let { token, message } = response.data

      if (response.status === 200) {
        sessionStorage.setItem('token', token)
        setIsLoading(false)
        
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
  // HANDLE SIGNUP 

  return (
    // CONTENT
    <div className="w-full flex justify-center">
      {/* CARD */}
      <div className="card min-h-96 w-10/12 md:w-1/2 lg:w-[27%] mt-20 lg:mt-14 shadow-lg bg-white rounded-3xl text-center relative pb-8">

        {/* TOP HEADER */}
        <div className="text-indigo-500 user-svg absolute -top-14 left-[50%] translate-x-[-50%] bg-white rounded-full">
          <AccountCircleIcon className='user-icon' />
        </div>
        <h1 className="text-4xl mt-[3.75rem] lg:mt-20 text-indigo-500 mb-2">Register</h1>
        {/* TOP HEADER */}

        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
          }}
          validateSchema={validateSchema}
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
          onSubmit={async (value, {setSubmitting})=>{
            try {
              setIsLoading(true)
              handleSignUp(value)
            }
            catch(err){
              setSubmitting(false);
              setIsLoading(false)
            }
          }}
        >
          {() => (
            <Form>

              {/* ALERT MESSAGE */}
              {errorMessage ? <p className='text-red-500 text-sm lg:text-base mb-4'>{errorMessage}</p> :
                <p className='text-sm lg:text-base mb-4'>Already have an account? <NavLink className='text-indigo-700' to={'/log-in'}>Log In</NavLink></p>
              }
              {/* ALERT MESSAGE */}

              {/* FORM INPUTS NAME*/}
              <div className="form-group w-4/5 lg:w-3/4 mx-auto mb-4">
                <Field type="text" name='name' className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border' placeholder='Name' />
              </div>
              {/* FORM INPUTS NAME*/}

              {/* FORM INPUTS EMAIL*/}
              <div className="form-group w-4/5 lg:w-3/4 mx-auto mb-4">
                <Field type="email" name='email' className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border' placeholder='Email' />
              </div>
              {/* FORM INPUTS EMAIL*/}

              {/* CONFIRM PASSWORD */}
              <div className="form-group w-4/5 lg:w-3/4 mx-auto mb-4">
                <Field type="password" name='password' className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border' placeholder='Password' />
              </div>
              {/* CONFIRM PASSWORD */}

              {/* FORM INPUTS PASSWORD*/}
              <div className="form-group w-4/5 lg:w-3/4 mx-auto mb-4">
                <Field type="password" name='confirmPassword' className='flex items-center shadow-md py-2 px-3 lg:px-4 w-full text-sm lg:text-base rounded-full outline-none border-indigo-300 border' placeholder='Confirm Password' />
              </div>
              {/* FORM INPUTS PASSWORD*/}
              <button type='submit' disabled={!isSuccess} className={`w-4/5 lg:w-3/4 py-2 ${!isSuccess ? 'bg-indigo-400' : 'bg-indigo-600'} active:bg-indigo-800 rounded-3xl text-white text-sm lg:text-base transition-all`}>Sign Up</button>
            </Form>
          )}
        </Formik>
      </div>
      {/* CARD */}
    </div >
    // CONTENT
  )
}
