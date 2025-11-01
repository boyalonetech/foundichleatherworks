"use client";
import React, { useEffect } from "react";
import Python from "../api/python";

export default function Page() {
  useEffect(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1280) {
      window.location.href = "/home";
    }
  }, []); // Run once on component mount

  return <Python />;
}
