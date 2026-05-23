import { heroClasses } from "../model/classes"

const STATUS_CARDS = [
  { label: "Реакция на инциденты", value: "Быстрое восстановление" },
  { label: "Диагностика", value: "Поиск первопричины" },
  { label: "Стабильность среды", value: "Минимизация простоев" },
]

const TERMINAL_LINES = ["ping gateway", "clear dns cache", "restart service"]
const TERMINAL_TYPING_DELAY_STEP_MS = 1560
const TERMINAL_TYPING_MS_PER_CHAR = 58
const TERMINAL_TYPING_MIN_DURATION_MS = 620

export const HeroVisual = () => {
  const {
    root,
    grid,
    terminal,
    terminalBar,
    terminalDot,
    terminalBody,
    terminalLine,
    terminalCommand,
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
          {TERMINAL_LINES.map((line, index) => {
            const isLastLine = index === TERMINAL_LINES.length - 1
            const commandClassName = `${terminalCommand}${
              isLastLine ? ` ${terminalCommand}--active` : ""
            }`
            const typingDuration = Math.max(
              line.length * TERMINAL_TYPING_MS_PER_CHAR,
              TERMINAL_TYPING_MIN_DURATION_MS,
            )

            return (
              <div className={terminalLine} key={line}>
                <span>$</span>
                <span
                  className={commandClassName}
                  style={{
                    "--typing-chars": line.length,
                    "--typing-delay": `${index * TERMINAL_TYPING_DELAY_STEP_MS}ms`,
                    "--typing-duration": `${typingDuration}ms`,
                    "--typing-width": `${line.length}ch`,
                  }}
                >
                  {line}
                </span>
              </div>
            )
          })}
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
