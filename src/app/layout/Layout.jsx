import { Outlet } from "react-router"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { IntroLoader } from "@/widgets/intro-loader"
import { Stars } from "@/widgets/stars"
import { useSiteVersionSeo } from "@/shared/lib/useSiteVersion"
import { Seo } from "@/shared/ui"

export const Layout = () => {
  const seo = useSiteVersionSeo()

  return (
    <div className="l-page container">
      <Seo {...seo} />
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
