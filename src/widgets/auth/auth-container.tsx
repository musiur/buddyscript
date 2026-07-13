import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const AuthContainer = ({
  form,
  type = "login",
}: {
  form: React.ReactNode;
  type?: "login" | "register";
}) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col lg:flex-row items-center justify-center gap-12 sm:gap-8 lg:gap-16 md:gap-32 xl:gap-48 min-h-screen py-32 px-3",
        {
          "sm:gap-8 lg:gap-16 md:gap-32 xl:gap-48": type === "login",
          "sm:gap-8 lg:gap-16 md:gap-32": type === "register",
        },
      )}
    >
      <Image
        src="/images/shape1.png"
        alt="login"
        width={400}
        height={400}
        loading="eager"
        className="w-8 lg:w-40 absolute top-0 left-0"
      />
      <Image
        src="/images/shape3.svg"
        alt="login"
        width={400}
        height={400}
        loading="eager"
        className="w-120 absolute top-0  hidden md:block md:right-0 xl:right-10 -translate-y-1/3"
      />
      <Image
        src="/images/shape3.svg"
        alt="login"
        width={400}
        height={400}
        loading="eager"
        className="w-100 absolute bottom-0 hidden md:block md:right-0 xl:right-120"
      />
      <div
        className={clsx("flex items-center justify-center min-w-auto md:min-w-[600px]", {
          // "md:min-w-[600px]": type === "login",
          // "sm:min-w-[600px] lg:min-w-[700px]": type === "register",
        })}
      >
        <Image
          src={
            type === "login" ? "/images/login.png" : "/images/registration.png"
          }
          alt={type === "login" ? "login" : "register"}
          width={400}
          height={400}
          loading="eager"
          className="object-cover w-11/12 sm:w-full h-full z-10"
        />
      </div>
      <div className="min-w-[90%] sm:min-w-[70%] lg:min-w-[400px] bg-background relative my-auto px-4 sm:px-10 py-16 rounded-xl grid grid-cols-1 gap-6 items-center justify-center text-center">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="login"
            width={400}
            height={400}
            loading="eager"
            className="w-36 mx-auto"
          />
        </Link>
        <div>
          <p>{type === "login" ? "Welcome back" : "Get started now"}</p>
          <p className="text-xl font-semibold">
            {type === "login"
              ? "Login to your account"
              : "Register for an account"}
          </p>
        </div>
        <Button variant="outline" className="my-6">
          <Image
            src="/images/google.svg"
            alt="login"
            width={400}
            height={400}
            className="w-6"
          />
          Continue with Google
        </Button>
        <div className="border-b relative text-muted-foreground">
          <span className="bg-background px-4 absolute -top-3 left-1/2 transform -translate-x-1/2">
            or
          </span>
        </div>
        {form}
        <div>
          <p>
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
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
  );
};

export default AuthContainer;
