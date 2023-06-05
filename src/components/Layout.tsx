import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <main className="px-[60px] py-[20px]">
      <header className="w-full flex justify-between items-center gap-8">
        <nav>
          <ul className="flex gap-[40px] font-[700] text-[54px]">
            <li>
              <Link
                to="/competition"
                className={`${
                  location.pathname === "/competition"
                    ? "text-black"
                    : "text-[#B3B3B3]"
                }`}
              >
                Competitions
              </Link>
            </li>
            <li>
              <Link
                to="/rating"
                className={`${
                  location.pathname === "/rating"
                    ? "text-black"
                    : "text-[#B3B3B3]"
                }`}
              >
                Rating
              </Link>
            </li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Find user"
          className="h-[54px] w-[374px] border border-solid rounded-[20px] px-[15px] py-[16px] focus:outline-none text-[16px]"
        />
      </header>
      {children}
    </main>
  );
};

export default Layout;
