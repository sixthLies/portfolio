import { useParams } from "react-router"
import { buildVersionedPath } from "@/shared/config/routes"
import {
  getSiteVersionContent,
  getSiteVersionSeo,
  isMaintenanceVersion,
  DEFAULT_SITE_VERSION_ID,
} from "@/shared/config/siteVersions"

export const useSiteVersion = () => {
  const { versionId } = useParams()
  const versionKey = versionId ?? DEFAULT_SITE_VERSION_ID

  return {
    versionId,
    versionKey,
    content: getSiteVersionContent(versionId),
    seo: getSiteVersionSeo(versionId),
    isMaintenance: isMaintenanceVersion(versionId),
  }
}

export const useSiteVersionContent = () => useSiteVersion().content

export const useVersionedPath = () => {
  const { versionId } = useParams()
  return (path) => buildVersionedPath(path, versionId)
}
