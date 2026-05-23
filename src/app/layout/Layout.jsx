import { useState } from "react"
import { Outlet } from "react-router"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { IntroLoader } from "@/widgets/intro-loader"
import { Stars } from "@/widgets/stars"
import { buildVersionedPath, ROUTE_PATHS } from "@/shared/config/routes"
import { PUBLIC_WORKING_VERSION_ID } from "@/shared/config/siteVersions"
import { useSiteVersion } from "@/shared/lib/useSiteVersion"
import { MaintenanceScreen, Seo } from "@/shared/ui"

export const Layout = () => {
  const { isMaintenance: shouldUseMaintenance, seo, versionKey } = useSiteVersion()
  const [maintenanceState, setMaintenanceState] = useState(() => ({
    isMaintenance: shouldUseMaintenance,
    versionKey,
  }))
  const workingVersionPath = buildVersionedPath(
    ROUTE_PATHS.home,
    PUBLIC_WORKING_VERSION_ID,
  )

  if (maintenanceState.versionKey !== versionKey) {
    setMaintenanceState({
      isMaintenance: shouldUseMaintenance,
      versionKey,
    })
  }

  const isMaintenance =
    maintenanceState.versionKey === versionKey
      ? maintenanceState.isMaintenance
      : shouldUseMaintenance

  if (isMaintenance) {
    return (
      <div className="l-page container">
        <Seo {...seo} />
        <IntroLoader />
        <Stars />
        <main className="l-page__content">
          <MaintenanceScreen workingVersionPath={workingVersionPath} />
        </main>
      </div>
    )
  }

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
