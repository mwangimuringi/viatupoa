'use client';
// import { cookies } from "next/headers"; // For Next.js 13+ App Directory
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Navbar } from "./Navbar";

export default async function NavbarWrapper() {
  // const cookieStore = cookies(); // Get cookies store
  // const idToken = await (await cookieStore).get('id_token'); // Await the cookie retrieval

  const { getUser } = getKindeServerSession();
  // const user = await getUser(); // Ensure getUser is awaited correctly

  // return <Navbar user={user} />; // Pass the user prop to Navbar
}
