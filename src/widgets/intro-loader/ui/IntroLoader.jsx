import { useEffect, useState } from "react"

const SESSION_KEY = "hh:intro-loader-shown"
const LOAD_DELAY_MS = 1000
const EXIT_DELAY_MS = 900
const REDUCED_LOAD_DELAY_MS = 120
const REDUCED_EXIT_DELAY_MS = 180

const canUseSessionStorage = () => {
  try {
    return typeof window !== "undefined" && "sessionStorage" in window
  } catch {
    return false
  }
}

const hasIntroBeenShown = () => {
  if (!canUseSessionStorage()) {
    return false
  }

  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "true"
  } catch {
    return false
  }
}

const markIntroAsShown = () => {
  if (!canUseSessionStorage()) {
    return
  }

  try {
    window.sessionStorage.setItem(SESSION_KEY, "true")
  } catch {
    // The loader should never trap the user if session storage is unavailable.
  }
}

const getPrefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

export const IntroLoader = () => {
  const [shouldRender, setShouldRender] = useState(() => !hasIntroBeenShown())
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!shouldRender) {
      return undefined
    }

    const isReducedMotion = getPrefersReducedMotion()
    const loadDelay = isReducedMotion ? REDUCED_LOAD_DELAY_MS : LOAD_DELAY_MS
    const exitDelay = isReducedMotion ? REDUCED_EXIT_DELAY_MS : EXIT_DELAY_MS

    const loadTimerId = window.setTimeout(() => {
      setIsLoaded(true)
    }, loadDelay)

    const unmountTimerId = window.setTimeout(() => {
      markIntroAsShown()
      setShouldRender(false)
    }, loadDelay + exitDelay)

    return () => {
      window.clearTimeout(loadTimerId)
      window.clearTimeout(unmountTimerId)
    }
  }, [shouldRender])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      className={`intro-loader${isLoaded ? " intro-loader--loaded" : ""}`}
      role="status"
      aria-label="Loading site"
      aria-live="polite"
    >
      <div
        className="intro-loader__section intro-loader__section--left"
        aria-hidden="true"
      />
      <div
        className="intro-loader__section intro-loader__section--right"
        aria-hidden="true"
      />
    </div>
  )
}
