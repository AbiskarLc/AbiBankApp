import MobileNav from "@/components/MobileNav"
import SideBar from "@/components/SideBar"
import Image from "next/image"
const RootLayout = ({children}:{children: React.ReactNode}) => {
  const loggedIn = {
    firstName: 'Abiskar ',lastName:'Lamichhane'
  }
  return (
    <main className=" flex h-screen font-inter">
       <SideBar user={loggedIn}/>

       <div className=" flex size-full flex-col">
        <div className="root-layout">
          <Image src={"/icons/logo.svg"} width={30} height={30} alt="Horizon app logo"/>
          <div>
            <MobileNav user={loggedIn}/>
          </div>
        </div>
        
        {children}
       </div>
    </main>
  )
}

export default RootLayout