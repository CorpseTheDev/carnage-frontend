import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav style={{display:'flex', justifyContent:'space-between', padding:'10px', borderBottom:'1px solid #ccc'}}>
      <div>
        <Link href="/chats">Chats</Link> |{" "}
        <Link href="/profile">Profile</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}