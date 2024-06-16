import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser, reset } from '../features/auth/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/tasks');
        }

        dispatch(reset());
    }, [isError, message, isSuccess, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email)) {
            toast.error("Please enter valid email address");
        } else {
            const userData = {
                email,
                password
            }

            dispatch(loginUser(userData));
        }
    }

    if (isLoading) {
        
    }

    return (
        <>
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 h-3/4 mt-28">
                    <h3 className="text-2xl font-bold text-center">Sign In</h3>
                    <form onSubmit={onSubmit}>
                        <div className="mt-4">
                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email</label>
                                <input type="email" placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <input type="password" placeholder="Password"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="flex">
                                <button type='submit' className="w-full px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition duration-200">
                                    Log In
                                </button>
                            </div>
                            <div className="mt-6 text-grey-dark">
                                <span className="mr-2">Don't have an account?</span>
                                <Link to='/' className="text-teal-600 hover:underline font-bold">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Login;
