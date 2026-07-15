import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

const AuthContainer = ({
  form,
  type = "login",
}: {
  form: React.ReactNode
  type?: "login" | "register"
}) => {
  return (
    <div
      className={clsx(
        "relative flex min-h-screen flex-col items-center justify-center gap-12 px-3 py-32 sm:gap-8 md:gap-32 lg:flex-row lg:gap-16 xl:gap-48",
        {
          "sm:gap-8 md:gap-32 lg:gap-16 xl:gap-48": type === "login",
          "sm:gap-8 md:gap-32 lg:gap-16": type === "register",
        }
      )}
    >
      <Image
        src="/images/shape1.png"
        alt="login"
        width={400}
        height={400}
        loading="eager"
        className="absolute top-0 left-0 w-8 lg:w-40"
      />
      <Image
        src="/images/shape3.svg"
        alt="login"
        width={400}
        height={400}
        loading="eager"
        className="absolute top-0 hidden w-120 -translate-y-1/3 md:right-0 md:block xl:right-10"
      />
      <Image
        src="/images/shape3.svg"
        alt="login"
        width={400}
        height={400}
        loading="eager"
        className="absolute bottom-0 hidden w-100 md:right-0 md:block xl:right-120"
      />
      <div
        className={clsx("flex min-w-auto items-center justify-center md:min-w-[600px]", {
          // "md:min-w-[600px]": type === "login",
          // "sm:min-w-[600px] lg:min-w-[700px]": type === "register",
        })}
      >
        <Image
          src={type === "login" ? "/images/login.png" : "/images/registration.png"}
          alt={type === "login" ? "login" : "register"}
          width={400}
          height={400}
          loading="eager"
          className="z-10 h-full w-11/12 object-cover sm:w-full"
        />
      </div>
      <div className="bg-background relative my-auto grid min-w-[90%] grid-cols-1 items-center justify-center gap-6 rounded-xl px-4 py-16 text-center sm:min-w-[70%] sm:px-10 lg:min-w-[400px]">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="login"
            width={400}
            height={400}
            loading="eager"
            className="mx-auto w-36"
          />
        </Link>
        <div>
          <p>{type === "login" ? "Welcome back" : "Get started now"}</p>
          <p className="text-xl font-semibold">
            {type === "login" ? "Login to your account" : "Register for an account"}
          </p>
        </div>
        <Button variant="outline" className="my-6">
          <Image src="/images/google.svg" alt="login" width={400} height={400} className="w-6" />
          Continue with Google
        </Button>
        <div className="text-muted-foreground relative border-b">
          <span className="bg-background absolute -top-3 left-1/2 -translate-x-1/2 transform px-4">
            or
          </span>
        </div>
        {form}
        <div>
          <p>
            {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={type === "login" ? "/register" : "/login"}
              className="text-primary hover:underline"
            >
              {type === "login" ? "Create an account" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
