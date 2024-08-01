import Image from "next/image"

const RootLayout = ({children}:{children: React.ReactNode}) => {
    return (
      <main className=" flex justify-between min-h-screen  w-full font-inter">
          {children}
<div className=" auth-asset">
  <div>
    <Image src={"/icons/auth-image.svg"} width={500} height={500} alt="Auth Image" />
  </div>
 
</div>
      </main>
    )
  }
  
  export default RootLayout