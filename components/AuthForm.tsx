"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { formSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {

  const router = useRouter();

  const [user, setUser] = useState(null);

  const [loading, setIsLoading] = useState(false);

  const authFormSchema = formSchema(type)

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema)
  });

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);

  try {


    if(type === 'sign-up'){

      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        email: data.email,
        password: data.password,
        address1: data.address1!,
        city: data.city!,
        postalCode: data.postalCode!,
        state: data.state!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!
      }
      const newUser = await signUp(userData);

      setUser(newUser)
    }

    if(type === 'sign-in'){


      const response = await signIn({
        email: data.email,
        password: data.password
      })

      if(response){
        router.push("/")
      }
    }
    
  } catch (error) {
    
    console.log(error)
  }finally{

    setIsLoading(false)
  }
  
  };

  const onerror = (error: any) => {
    console.log(error);
  };
  return (
    <>
      <section className=" auth-form">
        <header className=" flex flex-col md:gap-8 gap-5">
          <Link href={"/"} className=" cursor-pointer flex items-center gap-1">
            <Image
              src={"/icons/logo.svg"}
              width={34}
              height={34}
              alt="Horizon Logo"
              className=" size-[24px] max-md:size-12"
            />
            <h1 className=" text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className=" text-24 lg:text-26 font-semibold text-gray-900">
              {user ? (
                "Link Account"
              ) : (
                <>{type === "sign-in" ? "Sign In" : "Sign Up"}</>
              )}
            </h1>
            <p className=" text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </div>
        </header>
        {user ? (
          <div className=" flex flex-col gap-4">

            <PlaidLink user={user} variant="primary"/>
          </div>
         ) : (<> 
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onerror)}
              className="space-y-6"
            >
              {type === "sign-up" && (<>
                <div className=" flex gap-4">
                  <CustomInput
                    control={form.control}
                    label="First Name"
                    placeholder="ex: John"
                    type="text"
                    name="firstName"
                  />
                  <CustomInput
                    control={form.control}
                    label="Last Name"
                    placeholder="ex: Doe"
                    type="text"
                    name="lastName"
                  />
                </div>
                  <CustomInput
                  control={form.control}
                  label="Address"
                  placeholder="Enter your specific address"
                  type="text"
                  name="address1"
                />
                  <CustomInput
                  control={form.control}
                  label="City"
                  placeholder="Enter your city"
                  type="text"
                  name="city"
                />
                  <div className=" flex gap-4">
                  <CustomInput
                    control={form.control}
                    label="State"
                    placeholder="ex: Bagmati"
                    type="text"
                    name="state"
                  />
                  <CustomInput
                    control={form.control}
                    label="Postal Code"
                    placeholder="ex: 44600"
                    type="text"
                    name="postalCode"
                  />
                </div>
                <div className=" flex gap-4">
                  <CustomInput
                    control={form.control}
                    label="Date of Birth"
                    placeholder="yyyy-mm-dd"
                    type="text"
                    name="dateOfBirth"
                  />
                  <CustomInput
                    control={form.control}
                    label="SSN"
                    placeholder="ex: 1234"
                    type="text"
                    name="ssn"
                  />
                </div>
                </>
              )}
              
                <CustomInput
                  control={form.control}
                  label="Email"
                  placeholder="Enter your Email"
                  type="text"
                  name="email"
                />
                <CustomInput
                  control={form.control}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                />
              <div className=" flex flex-col gap-4">
                <Button type="submit" className=" form-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className=" animate-spin" size={20} />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        
        <footer className=" flex justify-center gap-1">
          <p className=" text-gray-600 text-14">
            {type === "sign-in"
              ? "Don't have an Account?"
              : "Already Have an Account?"}
          </p>
          <Link
            href={type === "sign-in" ? "/sign-up" : "sign-in"}
            className="form-link"
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </footer>
        </>
        )} 
      </section>
    </>
  );
};

export default AuthForm;
