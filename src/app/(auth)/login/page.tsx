import AuthContainer from "@/widgets/auth/auth-container"
import LoginForm from "@/widgets/auth/login-form"

const LoginPage = () => {
  return <AuthContainer form={<LoginForm />} />
}

export default LoginPage
