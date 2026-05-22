import { Helmet } from "react-helmet-async"

const DEFAULT_SEO = {
  title: "Данил - Цифровое портфолио",
  description:
    "Portfolio site with versioned professional positioning, skills, experience and contacts.",
  keywords: [],
  themeColor: "#09090f",
  ogType: "website",
}

const normalizeKeywords = (keywords) => {
  if (Array.isArray(keywords)) {
    return keywords.filter(Boolean).join(", ")
  }

  return keywords ?? ""
}

export const Seo = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  themeColor = DEFAULT_SEO.themeColor,
  ogImage,
  ogType = DEFAULT_SEO.ogType,
  twitterImage = ogImage,
}) => {
  const normalizedKeywords = normalizeKeywords(keywords)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {normalizedKeywords ? (
        <meta name="keywords" content={normalizedKeywords} />
      ) : null}
      <meta name="theme-color" content={themeColor} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      <meta name="twitter:card" content={twitterImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {twitterImage ? <meta name="twitter:image" content={twitterImage} /> : null}
    </Helmet>
  )
}
