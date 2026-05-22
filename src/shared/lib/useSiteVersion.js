import { useParams } from "react-router"
import { buildVersionedPath } from "@/shared/config/routes"
import {
  getSiteVersionContent,
  getSiteVersionSeo,
} from "@/shared/config/siteVersions"

export const useSiteVersion = () => {
  const { versionId } = useParams()

  return {
    versionId,
    content: getSiteVersionContent(versionId),
    seo: getSiteVersionSeo(versionId),
  }
}

export const useSiteVersionContent = () => useSiteVersion().content

export const useSiteVersionSeo = () => useSiteVersion().seo

export const useVersionedPath = () => {
  const { versionId } = useParams()
  return (path) => buildVersionedPath(path, versionId)
}
