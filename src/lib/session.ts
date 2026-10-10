import { cookies } from "next/headers";
interface Session {
  user: User;
}
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "customer" | "manager";
  tenant: number | null;
}
export const getSession = async () => {
  return await getSelf();
};

export const getSelf = async (): Promise<Session | null> => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/self`,
      {
        headers: {
          Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        },
      },
    );
    if (!response.ok) {
      return null;
    }

    return {
      user: (await response.json()) as User,
    };
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
