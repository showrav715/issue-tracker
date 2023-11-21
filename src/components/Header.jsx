"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
const Header = () => {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Issues", path: "/issues" },
  ];
  return (
    <>
      <nav className="flex space-x-6 mb-5 border-b px-5 h-14 items-center">
        <Link href="/">
          <AiFillBug />
        </Link>

        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                className={classnames({
                  "text-zinc-900": pathname == link.path,
                  "text-zinc-500": pathname != link.path,
                  "hover:text-zinc-800 transition-colors": true,
                })}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;
