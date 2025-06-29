"use client";
import React, { use } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className=" w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className=" bg-white border-none " side={"left"}>
          <Link
            href={"/"}
            className=" px-4 cursor-pointer flex items-center gap-1"
          >
            <Image
              src={"/icons/logo.svg"}
              width={34}
              height={34}
              alt="Horizon Logo"
              className=" size-[24px] max-md:size-12"
            />
            <h1 className=" text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>
          <div className=" mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item, index: number) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild    key={item.imgURL}>      
                                  <Link
                      href={item.route}
                   
                      className={cn("mobilenav-sheet_close w-full", {
                        "bg-bank-gradient": isActive,
                      })}
                    >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                      <p
                        className={cn(" text-16 font-semibold text-black-2", {
                          "!text-white": isActive,
                        })}
                      >
                        {item.label}
                      </p>
                    </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
           
           <Footer user={user} type={"mobile"}/>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
