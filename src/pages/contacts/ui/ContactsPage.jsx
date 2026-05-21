import { Cards, InfoBlock, LinksBlock, Reveal } from "@/shared/ui"
import { infoBoxContactsData } from "../model/infoBox"
import { contactsPageCards } from "../model/pageConfig"
import { CONTACTS_TITLE } from "../model/constants"
import { selectContactsLinks } from "../lib/selectContactsLinks"
import { contactsPageClasses } from "../model/classes"
import { useSiteVersion } from "@/shared/lib/useSiteVersion"
import { ROUTE_PATHS } from "@/shared/config/routes"

export const ContactsPage = () => {
  const { versionId } = useSiteVersion()
  const links = selectContactsLinks(versionId)
  const previousPageLink =
    links.find((link) => link.href !== ROUTE_PATHS.home) ?? links[0]
  const transitionText = previousPageLink
    ? `Вернуться на страницу ${previousPageLink.label}`
    : undefined
  const { CONTACTS_PAGE_CLASS, CONTACTS_TITLE_CLASS } = contactsPageClasses

  return (
    <section className={CONTACTS_PAGE_CLASS}>
      <Reveal as="h2" className={CONTACTS_TITLE_CLASS} preset="text">
        {CONTACTS_TITLE}
      </Reveal>

      <InfoBlock data={infoBoxContactsData} />

      <Cards cards={contactsPageCards} />

      <LinksBlock links={links} text={transitionText} />
    </section>
  )
}
