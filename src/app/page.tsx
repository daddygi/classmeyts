import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p>Landing Page</p>
      <Link href="./sign-in">
        <button>Sign in</button>
      </Link>
      <Link href="./sign-up">
        <button>Sign up</button>
      </Link>
    </main>
  );
}
