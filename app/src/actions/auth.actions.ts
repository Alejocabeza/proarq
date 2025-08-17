"use server";

import {
  forgotPasswordInterface,
  LoginInterface,
  RegisterInterface,
  resetPasswordInterface,
} from "@app/intefaces/auth.interface";
import { signIn, signOut } from "@app/lib/auth/auth";

export const loginAction = async (formValues: LoginInterface) => {
  try {
    const result = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return {
      title: "Login successfully",
      message: "Login successfully to your account",
      error: false,
    };
  } catch (error) {
    return {
      title: "Login Error",
      message: error.cause.err.message || "An unexpected error occurred",
      error: true,
    };
  }
};

export const registerAction = async (formValues: RegisterInterface) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`,
      {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    return {
      title: "Register successfully",
      message: data.message,
      error: false,
    };
  } catch (error) {
    return {
      title: "Register Failed",
      message: error.message,
      error: true,
    };
  }
};

export const forgotPasswordAction = async ({
  email,
}: forgotPasswordInterface) => {
  try {
    const url = process.env.NEXT_PUBLIC_APP_URL + "/reset-password";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`,
      {
        method: "POST",
        body: JSON.stringify({ email, url }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    return {
      title: "Forgot Password Successfully",
      message: data.message,
      error: false,
    };
  } catch (error) {
    return {
      title: "Forgot Password Failed",
      message: error.message,
      error: true,
    };
  }
};

export const resetPasswordAction = async (
  { password }: resetPasswordInterface,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change_password`,
      {
        method: "POST",
        body: JSON.stringify({ password, token }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    return {
      title: "Reset Password Successfully",
      message: data.message,
      error: false,
    };
  } catch (error) {
    return {
      title: "Reset Password Failed",
      message: error.message,
      error: true,
    };
  }
};

export const logoutAction = async () => {
  try {
    await signOut({
      redirect: false
    });
    return {
      title: "Logout Successfully",
      message: "Logout Successfully",
      error: false,
    };
  } catch (error) {
    return {
      title: "Logout Failed",
      message: error.message,
      error: true,
    };
  }
};
