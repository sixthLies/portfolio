import github from "@/shared/assets/icons/socials/github.svg"
import gmail from "@/shared/assets/icons/socials/gmail.svg"
import telegram from "@/shared/assets/icons/socials/telegram.svg"
import { socialItems } from "@/shared/config/navigation"
import {
  githubLink,
  gmailLink,
  telegrammLink,
} from "@/shared/config/profileLinks"
import { IconsList } from "@/shared/ui"
import { footerClasses } from "../model/classes"

const links = { telegrammLink, githubLink, gmailLink }
const icons = { telegram, github, gmail }
const HIDDEN_FOOTER_SOCIAL_ITEM_ALT = "gmail"

export const FooterNav = () => {
  const visibleSocialItems = socialItems(links, icons).filter(
    ({ alt }) => alt !== HIDDEN_FOOTER_SOCIAL_ITEM_ALT,
  )

  return (
    <nav className="footer__nav">
      <IconsList items={visibleSocialItems} {...footerClasses} />
    </nav>
  )
}
