import { cookies } from "next/headers";
import * as cookie from "cookie";

export async function POST() {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
          cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
        },
      },
    );
    console.log("Refresh failed", await response.json());

    if (!response.ok) {
      console.log("Refresh failed");
      return Response.json({ success: false });
    }
    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      console.log("Tokens could not found.");
      return Response.json({ success: false });
    }

    const parsedAccessToken = cookie.parseCookie(accessToken);
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

    return Response.json({ success: true });
  } catch (error) {
    console.log("error from refresh token", error);
  }
}
