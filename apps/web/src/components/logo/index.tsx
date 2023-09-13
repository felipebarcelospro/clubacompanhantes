
export function Logo() {
  return (
    <>
      <img className="h-16 hidden lg:block" src="/logo.svg" alt=""
        width="132"
        height="64"
        title="Club Acompanhantes - As melhores acompanhantes de São Paulo"
      />
      <img
        className="h-10 lg:hidden"
        src="/logo-only-icon.png"
        alt="Club Acompanhantes - As melhores acompanhantes de São Paulo"
        width="132"
        height="64"
      />
    </>
  )
}
