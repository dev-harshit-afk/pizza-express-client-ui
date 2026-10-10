"use client";
import { Button } from "../ui/button";
import logout from "@/lib/actions/logout";

const Logout = () => {
  return <Button onClick={async () => await logout()}>Logout</Button>;
};

export default Logout;
