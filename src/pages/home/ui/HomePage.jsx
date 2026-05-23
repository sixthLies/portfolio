import { Cards, Reveal } from "@/shared/ui"
import { ROUTE_PATHS } from "@/shared/config/routes"
import { useSiteVersion } from "@/shared/lib/useSiteVersion"
import { homePageCards } from "../model/pageConfig"
import { homeClasses } from "../model/classes"

const TECHNICAL_SUPPORT_VERSION_ID = "technical-support"
const DISABLED_CARD_TEXT = "Страница скоро будет доступна."

export const HomePage = () => {
  const { home } = homeClasses
  const { versionId } = useSiteVersion()
  const cards =
    versionId === TECHNICAL_SUPPORT_VERSION_ID
      ? homePageCards.map((card) =>
          card.link === ROUTE_PATHS.projects
            ? {
                ...card,
                disabled: true,
                disabledText: DISABLED_CARD_TEXT,
              }
            : card,
        )
      : homePageCards

  return (
    <section className={home}>
      <Reveal preset="section">
        <Cards cards={cards} />
      </Reveal>
    </section>
  )
}
