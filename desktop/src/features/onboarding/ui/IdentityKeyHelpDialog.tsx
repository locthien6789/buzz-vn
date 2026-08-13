import * as React from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { ONBOARDING_INK_ICON_CLASS } from "./OnboardingChrome";
import { OnboardingFooter } from "./OnboardingFooter";

const IDENTITY_KEY_HELP_SEEN_STORAGE_KEY =
  "buzz.machine-onboarding.identity-key-help-seen.v1";
const IDENTITY_KEY_HELP_DELAY_MS = 2_000;

function hasSeenIdentityKeyHelp(): boolean {
  try {
    return (
      window.localStorage.getItem(IDENTITY_KEY_HELP_SEEN_STORAGE_KEY) === "true"
    );
  } catch {
    return false;
  }
}

function rememberIdentityKeyHelpSeen() {
  try {
    window.localStorage.setItem(IDENTITY_KEY_HELP_SEEN_STORAGE_KEY, "true");
  } catch {
    // The help remains available for this visit if storage is unavailable.
  }
}

export function IdentityKeyHelpDialog() {
  const [isVisible, setIsVisible] = React.useState(hasSeenIdentityKeyHelp);

  React.useEffect(() => {
    if (isVisible) return;

    const timeout = window.setTimeout(() => {
      rememberIdentityKeyHelpSeen();
      setIsVisible(true);
    }, IDENTITY_KEY_HELP_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [isVisible]);

  return (
    <Dialog>
      <OnboardingFooter className="max-w-none">
        <DialogTrigger asChild>
          <Button
            className={`text-foreground/70 transition-opacity duration-300 hover:text-foreground motion-reduce:transition-none ${
              isVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            data-testid="identity-key-help-trigger"
            tabIndex={isVisible ? 0 : -1}
            type="button"
            variant="link"
          >
            Khóa danh tính là gì?
          </Button>
        </DialogTrigger>
      </OnboardingFooter>
      <DialogContent
        className="buzz-onboarding-neutral-theme max-w-[47.5rem] -translate-y-5"
        closeButtonClassName={ONBOARDING_INK_ICON_CLASS}
        data-system-color-scheme="light"
        data-testid="identity-key-help-dialog"
        overlayVariant="transparent"
        surface="textured"
      >
        <div className="mx-auto w-full max-w-[35rem] py-14 text-left max-sm:py-6">
          <DialogTitle className="text-balance pr-8 text-3xl font-normal text-foreground">
            Khóa danh tính là gì?
          </DialogTitle>
          <DialogDescription
            asChild
            className="mt-6 space-y-4 text-pretty text-base leading-7 text-[color:var(--buzz-onboarding-backup-ink)]"
          >
            <div>
              <p>
                Buzz sử dụng một khóa danh tính thay vì một tài khoản truyền thống. Khóa này
                được tạo trên thiết bị của bạn và đại diện cho bạn mỗi khi bạn sử dụng Buzz.
              </p>
              <p>
                Danh tính của bạn thuộc về bạn, không phải Buzz. Không có mật khẩu để
                đặt lại, và Buzz không thể khôi phục khóa của bạn nếu bạn làm mất nó. Hãy giữ một
                bản sao lưu ở nơi an toàn và không bao giờ chia sẻ nó. Bất kỳ ai có khóa của bạn
                đều có thể hành động với tư cách là bạn.
              </p>
              <p>
                Nếu bạn mới sử dụng Buzz, hãy tạo một khóa danh tính mới. Nếu bạn đã
                có danh tính Nostr, hãy sử dụng khóa hiện tại của bạn.
              </p>
            </div>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
