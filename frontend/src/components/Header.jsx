"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { UserSlicePath } from "@/app/redux/slices/UserSlice";
import { useMainContext } from "@/context/MainContext";
import ProfileButton from "./auth/ProfileButton";
import LogoComponent from "./reuseable/LogoComponent";
import { usePathname } from "next/navigation";
import { private_routes } from "@/utils/constant";

const Header = () => {
  const user = useSelector(UserSlicePath);
  const { logoutHandler } = useMainContext();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all ${isScrolled ? "bg-white" : "bg-whitesmoke"}`}>
      <div className="container mx-auto flex items-center justify-between p-5">
        {/* Logo & Mobile Menu Button */}
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-3xl text-black lg:hidden"
          >
            {mobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>
          <LogoComponent />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
        </nav>

        {/* Auth Section */}
        {user && user.email ? (
          <ProfileButton />
        ) : (
          <Link
            href="/login"
            className="px-6 py-3 bg-indigo-500 text-white rounded-sm flex items-center gap-x-2"
          >
            <span>Login</span> <FaArrowRight />
          </Link>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-transparent bg-opacity-50 transition-opacity lg:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col space-y-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
        </div>
      </aside>
    </header>
  );
};

// Reusable NavLink Component
const NavLink = ({ href, label }) => (
  <Link href={href} className="text-black hover:text-gray-900 flex items-center gap-x-2">
    {label}
  </Link>
);

export default Header;
