import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

const EDGE_GAP = 18
const MOBILE_EDGE_GAP = 12
const CORNER_RADIUS = 24
const MIN_SIDE_ROUTE = 96
const MOBILE_BREAKPOINT = 768
const CARD_CONTENT_SELECTOR = ".process__content"

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

const getRelativeRect = (node, rootRect) => {
  const rect = node.getBoundingClientRect()

  return {
    bottom: rect.bottom - rootRect.top,
    height: rect.height,
    left: rect.left - rootRect.left,
    right: rect.right - rootRect.left,
    top: rect.top - rootRect.top,
    width: rect.width,
  }
}

const getLayoutRect = (node, rootNode) => {
  let left = 0
  let top = 0
  let currentNode = node

  while (currentNode && currentNode !== rootNode) {
    left += currentNode.offsetLeft
    top += currentNode.offsetTop
    currentNode = currentNode.offsetParent
  }

  if (currentNode !== rootNode) {
    return getRelativeRect(node, rootNode.getBoundingClientRect())
  }

  return {
    bottom: top + node.offsetHeight,
    height: node.offsetHeight,
    left,
    right: left + node.offsetWidth,
    top,
    width: node.offsetWidth,
  }
}

const getMeasuredCardNode = (node) => {
  return node.querySelector(CARD_CONTENT_SELECTOR) ?? node
}

const getDistance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)

const getUnit = (from, to) => {
  const distance = getDistance(from, to)
  if (distance === 0) return { x: 0, y: 0 }

  return {
    x: (to.x - from.x) / distance,
    y: (to.y - from.y) / distance,
  }
}

const roundValue = (value) => Math.round(value * 10) / 10

const getRoundedPath = (points, radius = CORNER_RADIUS) => {
  if (points.length < 2) return ""

  const [start, ...rest] = points
  const commands = [`M ${roundValue(start.x)} ${roundValue(start.y)}`]

  rest.forEach((point, index) => {
    const next = rest[index + 1]

    if (!next) {
      commands.push(`L ${roundValue(point.x)} ${roundValue(point.y)}`)
      return
    }

    const previous = index === 0 ? start : rest[index - 1]
    const incoming = getUnit(point, previous)
    const outgoing = getUnit(point, next)
    const cornerRadius = Math.min(
      radius,
      getDistance(previous, point) / 2,
      getDistance(point, next) / 2,
    )

    const beforeCorner = {
      x: point.x + incoming.x * cornerRadius,
      y: point.y + incoming.y * cornerRadius,
    }
    const afterCorner = {
      x: point.x + outgoing.x * cornerRadius,
      y: point.y + outgoing.y * cornerRadius,
    }

    commands.push(`L ${roundValue(beforeCorner.x)} ${roundValue(beforeCorner.y)}`)
    commands.push(
      `Q ${roundValue(point.x)} ${roundValue(point.y)} ${roundValue(afterCorner.x)} ${roundValue(afterCorner.y)}`,
    )
  })

  return commands.join(" ")
}

const getDesktopRoute = (from, to) => {
  const fromCenterY = from.top + from.height / 2
  const toCenterY = to.top + to.height / 2
  const isNextOnRight = to.left > from.left
  const start = {
    x: isNextOnRight ? from.right + EDGE_GAP : from.left - EDGE_GAP,
    y: fromCenterY,
  }
  const end = {
    x: isNextOnRight ? to.left - EDGE_GAP : to.right + EDGE_GAP,
    y: toCenterY,
  }
  const horizontalDistance = Math.abs(end.x - start.x)
  const turnX =
    horizontalDistance < MIN_SIDE_ROUTE
      ? (start.x + end.x) / 2
      : isNextOnRight
        ? Math.min(start.x + horizontalDistance * 0.58, end.x - EDGE_GAP)
        : Math.max(start.x - horizontalDistance * 0.58, end.x + EDGE_GAP)

  return [
    start,
    { x: turnX, y: start.y },
    { x: turnX, y: end.y },
    end,
  ]
}

const getMobileRoute = (from, to) => {
  const x = Math.min(from.left, to.left) + MOBILE_EDGE_GAP
  const start = {
    x,
    y: from.bottom + MOBILE_EDGE_GAP,
  }
  const end = {
    x,
    y: to.top - MOBILE_EDGE_GAP,
  }

  return [start, end]
}

const getConnectorData = ({ itemNodes, rootNode }) => {
  if (!rootNode) return null

  const nodes = itemNodes.filter(Boolean)
  if (nodes.length < 2) return null

  const width = Math.max(rootNode.clientWidth, 1)
  const height = Math.max(rootNode.clientHeight, 1)
  const itemRects = nodes.map((node) =>
    getLayoutRect(getMeasuredCardNode(node), rootNode),
  )
  const isMobileRoute = width < MOBILE_BREAKPOINT
  const routePoints = []
  const connectionNodes = []

  itemRects.forEach((rect, index) => {
    const nextRect = itemRects[index + 1]
    if (!nextRect) return

    const segmentPoints = isMobileRoute
      ? getMobileRoute(rect, nextRect)
      : getDesktopRoute(rect, nextRect)

    if (routePoints.length === 0) {
      routePoints.push(...segmentPoints)
      connectionNodes.push(segmentPoints[0])
      return
    }

    const [, ...segmentTail] = segmentPoints
    routePoints.push(...segmentTail)
    connectionNodes.push(segmentPoints[0])
  })

  connectionNodes.push(routePoints[routePoints.length - 1])

  return {
    d: getRoundedPath(routePoints),
    height,
    nodes: connectionNodes,
    width,
  }
}

export const useProcessConnector = () => {
  const rootRef = useRef(null)
  const itemRefs = useRef([])
  const [connector, setConnector] = useState(null)

  const updateConnector = useCallback(() => {
    const nextConnector = getConnectorData({
        itemNodes: itemRefs.current,
        rootNode: rootRef.current,
    })

    setConnector((currentConnector) => {
      if (
        currentConnector?.d === nextConnector?.d &&
        currentConnector?.height === nextConnector?.height &&
        currentConnector?.width === nextConnector?.width
      ) {
        return currentConnector
      }

      return nextConnector
    })
  }, [])

  const itemRefCallbacks = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => (node) => {
      itemRefs.current[index] = node
    })
  }, [])

  const getItemRef = useCallback(
    (index) => itemRefCallbacks[index],
    [itemRefCallbacks],
  )

  useIsomorphicLayoutEffect(() => {
    updateConnector()

    if (typeof window === "undefined") return undefined

    const handleResize = () => updateConnector()
    const frame = window.requestAnimationFrame(updateConnector)
    window.addEventListener("resize", handleResize)

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateConnector)

    if (resizeObserver) {
      if (rootRef.current) resizeObserver.observe(rootRef.current)
      itemRefs.current.filter(Boolean).forEach((node) => resizeObserver.observe(node))
    }

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", handleResize)
      resizeObserver?.disconnect()
    }
  }, [updateConnector])

  return {
    connector,
    getItemRef,
    rootRef,
  }
}
