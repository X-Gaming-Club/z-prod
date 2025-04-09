// app/page.js

"use client";
import { redirect } from 'next/navigation'; // Added import for redirect

// Changed from showing LoginPage to redirecting to Homepage
export default function Home() {
  // Redirect to Homepage instead of showing the login screen
  redirect('/Homepage');
}