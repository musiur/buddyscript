import AuthContainer from "@/widgets/auth/auth-container";
import RegisterForm from "@/widgets/auth/register-form";

const RegisterPage = () => {
    return <AuthContainer form={<RegisterForm />} type="register" />;
}

export default RegisterPage;