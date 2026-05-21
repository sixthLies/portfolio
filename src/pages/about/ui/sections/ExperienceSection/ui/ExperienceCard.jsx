import { Reveal } from "@/shared/ui"
import { ABOUT_CARD_REVEAL_PROPS } from "@/pages/about/model/reveal"
import { getExperienceImpact } from "../model/impact"

const getCompanyLinkTone = (item) => {
  const id = item.id.toLowerCase()
  const company = item.company.toLowerCase()

  if (id.includes("colezium") || company.includes("colezium")) {
    return "colezium"
  }

  if (id.includes("kiberpride") || company.includes("kiberpride")) {
    return "kiberpride"
  }

  return "default"
}

export const ExperienceCard = ({
  item,
  index,
  root,
  badge,
  company,
  summary,
  list,
  listItem,
}) => {
  const impact = getExperienceImpact(item.id)
  const companyLinkTone = getCompanyLinkTone(item)

  return (
    <Reveal preset="card" index={index} {...ABOUT_CARD_REVEAL_PROPS}>
      <article className={root}>
        <div className="experience__topline">
          <span className={badge}>{item.focus}</span>
          <span className="experience__index">0{index + 1}</span>
        </div>

        <h3 className={company}>{item.company}</h3>
        {item.website ? (
          <a
            className={`experience__website experience__website--${companyLinkTone}`}
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.website.replace(/^https?:\/\//, "")}
          </a>
        ) : null}
        <p className={summary}>{item.summary}</p>

        <div className="experience__metrics" aria-label="Key impact areas">
          {impact.metrics.map((metric) => (
            <span className="experience__metric" key={metric}>
              {metric}
            </span>
          ))}
        </div>

        <ul className={list}>
          {item.points.slice(0, 8).map((point) => (
            <li key={point} className={listItem}>
              {point.replace(/^-\s*/, "")}
            </li>
          ))}
        </ul>

        <div className="experience__outcomes">
          {impact.outcomes.map((outcome) => (
            <span className="experience__outcome" key={outcome}>
              {outcome}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  )
}
