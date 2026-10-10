"use server";
import { cookies } from "next/headers";

export default async function logout() {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/logout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
          cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
        },
      },
    );

    if (!response.ok) {
      console.log("Logout failed", response.status);
      return false;
    }

    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
}
