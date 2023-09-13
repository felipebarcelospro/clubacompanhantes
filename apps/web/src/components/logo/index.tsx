
export function Logo() {
  return (
    <>
      <img className="h-16 hidden lg:block" src="/logo.svg" alt=""
        width="132"
        height="64"
      />
      <img
        className="h-10 lg:hidden"
        src="/logo-only-icon.png"
        alt=""
        width="132"
        height="64"
      />
    </>
  )
}
