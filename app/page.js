"use client";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Welcome from "./components/Welcome";
import Session from "./components/Session";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  databaseURL: "https://empanadas-ea8a4-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Home() {
  return (
    <main className="flex flex-col items-center p-6 lg:p-12 justify-center min-h-screen">
      <Welcome />
    </main>
  );
}
