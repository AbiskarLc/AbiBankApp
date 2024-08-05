import { signOut } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await signOut();

      console.log(response)
      if (response) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <footer className=" footer">
      <div
        className={type === "mobile" ? " footer_name-mobile" : "footer_name"}
      >
        <p className=" text-xl font-bold text-gray-700 ">{user?.firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? " footer_email-mobile" : "footer_email"}
      >
        <h1 className=" text-14 truncate font-semibold text-gray-600">
          {user?.firstName}
        </h1>
        <p className=" text-14 truncate font-semibold text-gray-600">
          {user?.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogOut}>
        <Image
          src="/icons/logout.svg"
          width={24}
          height={24}
          alt="Log Out icon"
        />
      </div>
    </footer>
  );
};

export default Footer;
