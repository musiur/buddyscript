import { Button } from "@/components/ui/button";
import Image from "next/image";

const AuthContainer = ({
    form
}:{
    form: React.ReactNode
}) => {
    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-16 md:gap-32 xl:gap-48 min-h-screen py-32">
            <Image src="/images/shape1.png" alt="login" width={400} height={400} className="w-8 lg:w-36 absolute top-0 left-0" />
            <Image src="/images/shape3.svg" alt="login" width={400} height={400} className="w-120 absolute top-0  hidden md:block md:right-0 xl:right-10 -translate-y-1/2" />
            <Image src="/images/shape3.svg" alt="login" width={400} height={400} className="w-100 absolute bottom-0 hidden md:block md:right-0 xl:right-120" />
            <div className="flex items-center justify-center">
                <Image src="/images/login.png" alt="login" width={400} height={400} className="object-contain w-11/12 sm:w-full h-full z-10" />
            </div>
            <div className="min-w-[90%] sm:min-w-[70%] lg:min-w-[400px] bg-background relative my-auto p-8 rounded-xl grid grid-cols-1 gap-6 items-center justify-center text-center">
                <Image src="/images/logo.svg" alt="login" width={400} height={400} className="w-36 mx-auto" />
                <div>
                    <p>Welcome back</p>
                    <p className="text-xl font-semibold">Login to your account</p>
                </div>
                <Button variant="outline" size="lg" className="my-6">
                    <Image src="/images/google.svg" alt="login" width={400} height={400} className="w-4" />
                    Continue with Google
                </Button>
                <div className="border-b relative text-muted-foreground">
                    <span className="bg-background px-4 absolute -top-3 left-1/2 transform -translate-x-1/2">or</span>
                </div>
                {form}
            </div>
        </div>
    )
}

export default AuthContainer;