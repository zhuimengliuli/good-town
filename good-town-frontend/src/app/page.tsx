"use client";
import "./index.css";
import {useRouter} from "next/navigation";

export default async function HomePage() {
  const router = useRouter();
  router.push("/promotion");
  return <div></div>;
}