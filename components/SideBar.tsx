"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";


const SideBar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href={"/"}
          className="mb-12 cursor-pointer flex items-center gap-2"
        >
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Horizon Logo"
            className=" size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((item, index: number) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.imgURL}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className=" size-6 relative">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink variant={""} user={user}/>
      </nav>
    
    <Footer user={user} type="desktop" />
    </section>
  );
};

export default SideBar;
