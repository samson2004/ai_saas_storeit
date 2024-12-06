"use client";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUser, GetUserbyEmail, hashpasswd,verifypasswd } from "@/lib/actions/user.actions";
import { useRouter } from 'next/navigation';


const authformschema=(formtype)=>{
  return z.object({
    email:z.string().email(),
    fullname:formtype=='sign-up'? z.string().min(5).max(30):z.string().optional(),
    password:z.string().min(6).max(30),
  })
}


// : { type: "sign-in" | "sign-up" }
const AuthForm = ({ type }) => {

  const router=useRouter();
  const [isloading, setisloading] = useState(false);
  const [errorMessage,seterrorMessage]=useState('');


  const formSchema=authformschema(type);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",email:"",password:""
    },
  });


  //onsubmit -> succesfull-only when data addded into db (email&password as unique property)
  const onSubmit = async (values)=> {
    setisloading(true);
    


    if(type=='sign-up'){
      const newpass=await hashpasswd(values.password);
      values.password=newpass;

      const checkuser=await GetUserbyEmail(values.email);
      if(checkuser == null){
        setisloading(false);
        router.push(`/home/${userdata._id}/dashboard`);
      }else{
        seterrorMessage("Email already exists");
        setisloading(false);
      }
    }
    if(type=='sign-in'){
      const userdata=await GetUserbyEmail(values.email);
      const normalpass=values.password;
      const hash=userdata.password
      if(userdata){
        const checkpass=await verifypasswd(normalpass,hash);
        if(checkpass){
          setisloading(false);
          router.push(`/home/${userdata._id}/dashboard`);
        }else{
          seterrorMessage("Invalid password");
          setisloading(false);
        }
      }else{
        seterrorMessage("Email not found - Signup!");
        setisloading(false);
      }
    }


  };

  return (
    <div className="w-full">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="form-title md:w-[300px] md:mx-auto lg:w-[400px]">{type=='sign-in'?'Login':'Create Account'}</h1>
        {type == 'sign-up' && (
          <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem >
              <div className="shad-form-item md:w-[300px] md:mx-auto lg:w-[400px]  ">
                  <FormLabel className="shad-form-label">FullName</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your fullname" {...field} className="shad-input"/>
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message  flex-center" />
              
            </FormItem>
          )}
        />
        )}
        {(type == 'sign-in' || type=='sign-up') && (
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item md:w-[300px] md:mx-auto lg:w-[400px]">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="shad-input"/>
                  </FormControl>
              </div> 
              <FormMessage className="shad-form-message flex-center" />                
            </FormItem>
          )}
        />
        )}
        {(type == 'sign-in' || type=='sign-up') && (
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item md:w-[300px] md:mx-auto lg:w-[400px]">
                  <FormLabel className="shad-form-label">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} className="shad-input"/>
                  </FormControl>
              </div> 
              <FormMessage className="shad-form-message flex-center" />                
            </FormItem>
          )}
        />
        )}
        <div className="w-full flex-center">
          <Button type="submit" className="form-submit-button w-full md:w-[300px] md:mx-auto lg:w-[400px]" disabled={isloading}>
            {type=='sign-in'?'SignIn':'SignUp'}
            {isloading && (
              <Image src='/assets/icons/loader.svg' width={24} height={24} alt='spin-svg' className="animate-spin"/>
            )}
            </Button>
          { errorMessage && (
            <p className="error-message">*{errorMessage}</p>
          )}

          
        </div>
        <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type=='sign-in'?"Don't have a account?":"Already have an account ?"}
            </p>
            <Link href={type=='sign-in'?"/sign-up":"/sign-in"} className="text-brand-100 ml-1 font-medium">{type=='sign-in'?"sign-up":"sign-in"}</Link>
          </div>
      </form>
    </Form>
    {/* otp verification? */}
    </div>

  );
};

export default AuthForm;
