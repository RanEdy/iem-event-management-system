import LoginForm from "@/components/loginUI/LoginForm";
import React from "react";

const LoginPage = () =>
{
    return (
        <div className="h-screen w-screen m-0 p-0 flex flex-col lg:flex-row">
            {/* Logo */}
            <div className="shadow-lg shadow-gray-900 bg-bluedark-gradient-tr flex flex-col flex-shrink-0 items-center justify-evenly lg:h-full lg:w-1/2 ">
                <div className="my-4">
                    <img className="justify-self-center mb-4 h-20 lg:h-52" src="/img/iem_icon_white.png"></img>
                    <div className="justify-self-center lg:flex ">
                        <span className="text-base text-white text-center font-bold lg:text-3xl">EVENT MANAGEMENT SYSTEM</span>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="flex h-full w-full py-16 px-8">
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage;