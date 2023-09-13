import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image className="h-16 hidden lg:block" src="/logo.svg" alt="" unoptimized />
      <Image
        className="h-10 lg:hidden"
        src="/logo-only-icon.png"
        alt=""
        unoptimized
      />
    </>
  )
}
