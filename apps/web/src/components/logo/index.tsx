export function Logo() {
  return (
    <>
      <img className="h-10 hidden lg:block" src="/logo.png" alt="" srcSet="" />
      <img
        className="h-10 lg:hidden"
        src="/logo-only-icon.png"
        alt=""
        srcSet=""
      />
    </>
  )
}
