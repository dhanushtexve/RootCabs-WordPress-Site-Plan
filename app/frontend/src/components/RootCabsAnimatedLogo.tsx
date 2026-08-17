type RootCabsAnimatedLogoProps = {
  variant?: "header" | "splash-horizontal" | "splash-vertical";
  className?: string;
};

const variantClassMap: Record<NonNullable<RootCabsAnimatedLogoProps["variant"]>, string> = {
  header: "rc-logo--header",
  "splash-horizontal": "rc-logo--splash-horizontal",
  "splash-vertical": "rc-logo--splash-vertical",
};

export default function RootCabsAnimatedLogo({
  variant = "header",
  className = "",
}: RootCabsAnimatedLogoProps) {
  const classes = ["rc-logo", variantClassMap[variant], className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="img" aria-label="RootCabs animated logo">
      <div className="rc-logo__stage">
        <div className="rc-logo__pill">
          <span className="rc-logo__sheen" aria-hidden="true" />
          <span className="rc-logo__root">ROOT</span>
        </div>

        <div className="rc-logo__wheel-drop" aria-hidden="true">
          <div className="rc-logo__wheel-spin">
            <div className="rc-logo__wheel-hub" />
          </div>
          <div className="rc-logo__wheel-text">CABS</div>
        </div>
      </div>
    </div>
  );
}
