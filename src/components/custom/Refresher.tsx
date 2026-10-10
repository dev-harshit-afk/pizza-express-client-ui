"use client";
import React, { useCallback, useEffect, useRef } from "react";
import * as jose from "jose";

const Refresher = ({ children }: { children: React.ReactNode }) => {
  const timeoutId = useRef<NodeJS.Timeout>(null);
  const getAccessToken = async () => {
    const res = await fetch("/api/auth/accessToken");
    if (!res.ok) {
      return;
    }
    const accessToken = await res.json();
    return accessToken.token;
  };

  async function refreshAccessToken() {
    try {
      const res = await fetch("/api/auth/refreshToken", { method: "POST" });
      if (!res.ok) {
        console.log("Failed to refresh access Token");
        return;
      }
      startRefresh();
    } catch (error) {}
  }

  const startRefresh = useCallback(async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) return;

      const decoceAccessToken = jose.decodeJwt(accessToken);
      if (typeof decoceAccessToken.exp !== "number") return;

      const exp = decoceAccessToken.exp * 1000;
      const currentTime = Date.now();

      const refreshTime = Math.max(exp - currentTime - 5000, 1000);
      console.log(`Current time: ${new Date(currentTime).toISOString()}`);
      console.log(`Token expiry time: ${new Date(exp).toISOString()}`);
      console.log(
        `Scheduled refresh time: ${new Date(currentTime + refreshTime).toISOString()}`,
      );

      timeoutId.current = setTimeout(() => {
        refreshAccessToken();
      }, refreshTime);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    startRefresh();
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [startRefresh, timeoutId]);
  return <div>{children}</div>;
};

export default Refresher;
