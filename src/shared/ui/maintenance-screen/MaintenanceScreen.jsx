import { Link } from "react-router"
import { MAINTENANCE_SCREEN_CONTENT } from "@/shared/config/siteVersions"

export const MaintenanceScreen = ({
  workingVersionPath,
  content = MAINTENANCE_SCREEN_CONTENT,
}) => {
  return (
    <section className="maintenance-screen" aria-labelledby="maintenance-screen-title">
      <div className="maintenance-screen__content">
        <p className="maintenance-screen__progress" aria-hidden="true">
          <span>{content.progress}</span>{" "}
          <span className="maintenance-screen__progress-highlight">
            {content.progressHighlight}
          </span>{" "}
          <span>{content.progressValue}</span>
        </p>

        <h1 className="maintenance-screen__line" id="maintenance-screen-title">
          <span aria-hidden="true">&gt;</span> {content.title}
        </h1>
        <p className="maintenance-screen__line">
          <span aria-hidden="true">&gt;</span> {content.workingVersionText}
        </p>
        <p className="maintenance-screen__line">
          <span aria-hidden="true">&gt;</span>{" "}
          <Link className="maintenance-screen__link" to={workingVersionPath}>
            {content.workingVersionUrl}
          </Link>
        </p>
      </div>
    </section>
  )
}
