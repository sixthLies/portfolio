import { Link } from "react-router"
import { Reveal } from "../reveal"
import { useVersionedPath } from "@/shared/lib/useSiteVersion"

export const LinksBlock = ({ links }) => {
  const toVersionedPath = useVersionedPath()

  if (!links?.length) return null

  const [first, ...rest] = links
  const orderedLinks = [first, ...rest]

  return (
    <Reveal
      as="nav"
      preset="section"
      className="page-transition"
      aria-label="Переходы между разделами"
    >
      <p className="page-transition__text">
        Продолжайте маршрут по портфолио или вернитесь к предыдущему разделу.
      </p>

      <div className="page-transition__actions">
        {orderedLinks.map((link, index) => (
          <Reveal
            as={Link}
            key={link.href}
            preset="inline"
            index={index}
            className="page-transition__link"
            to={toVersionedPath(link.href)}
          >
            {link.href === first.href
              ? `\u2190 ${link.label}`
              : `${link.label} \u2192`}
          </Reveal>
        ))}
      </div>
    </Reveal>
  )
}
