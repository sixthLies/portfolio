import { Outlet } from "react-router"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { IntroLoader } from "@/widgets/intro-loader"
import { Stars } from "@/widgets/stars"

export const Layout = () => {
  return (
    <div className="l-page container">
      <IntroLoader />
      <Stars />
      <Header />
      <main className="l-page__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
