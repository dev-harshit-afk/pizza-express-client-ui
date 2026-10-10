"use server";
import * as cookie from "cookie";
import { cookies } from "next/headers";

export default async function login(
  prevState: {
    type: string;
    message: string;
  },
  formdata: FormData,
) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      // const error = await response.json();
      console.log("error", error);
      return {
        type: "error",
        message: error.errors[0].msg,
      };
    }
    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));
    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookies were found!",
      };
    }

    const parsedAccessToken = cookie.parseCookie(accessToken);
    console.log("parsedAccessTple", parsedAccessToken);
    const parsedRefreshToken = cookie.parseCookie(refreshToken);
    (await cookies()).set({
      name: "accessToken",
      value: parsedAccessToken.accessToken as string,
      expires: new Date(parsedAccessToken.Expires as string),
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });
    (await cookies()).set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken as string,
      expires: new Date(parsedRefreshToken.Expires!),
      // todo: check auth service for httpOnly parameter
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Path,
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message,
    };
  }
}
