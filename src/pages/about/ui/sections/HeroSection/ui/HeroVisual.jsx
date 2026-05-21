import { heroClasses } from "../model/classes"

const STATUS_CARDS = [
  { label: "Реакция на инциденты", value: "Быстрое восстановление" },
  { label: "Диагностика", value: "Поиск первопричины" },
  { label: "Стабильность среды", value: "Минимизация простоев" },
]

const TERMINAL_LINES = ["ping gateway", "clear dns cache", "restart service"]

export const HeroVisual = () => {
  const {
    root,
    grid,
    terminal,
    terminalBar,
    terminalDot,
    terminalBody,
    terminalLine,
    cards,
    card,
    cardLabel,
    cardValue,
    rail,
    railTrack,
    railFill,
  } = heroClasses.visual

  return (
    <aside className={root} aria-label="Engineering workspace overview">
      <div className={grid} aria-hidden="true" />

      <div className={terminal}>
        <div className={terminalBar} aria-hidden="true">
          <span className={terminalDot} />
          <span className={terminalDot} />
          <span className={terminalDot} />
        </div>
        <div className={terminalBody}>
          {TERMINAL_LINES.map((line) => (
            <div className={terminalLine} key={line}>
              <span>$</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={cards}>
        {STATUS_CARDS.map((item) => (
          <div className={card} key={item.label}>
            <span className={cardLabel}>{item.label}</span>
            <strong className={cardValue}>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className={rail} aria-hidden="true">
        <span className={railTrack}>
          <span className={railFill} />
        </span>
      </div>
    </aside>
  )
}
