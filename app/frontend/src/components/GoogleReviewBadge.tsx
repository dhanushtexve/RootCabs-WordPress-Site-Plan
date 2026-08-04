type GoogleReviewBadgeProps = {
  className?: string;
};

export function GoogleReviewBadge({ className }: GoogleReviewBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-[#EEF3FF] px-2.5 py-1 text-[11px] font-semibold text-[#1A73E8] ${className ?? ""}`.trim()}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4285F4"
          d="M23.2 12.27c0-.75-.07-1.3-.21-1.86H12v3.52h6.44c-.13 1.02-.81 2.55-2.34 3.58l-.02.16 3.4 2.64.24.02c2.2-2.03 3.48-5.02 3.48-8.06Z"
        />
        <path
          fill="#34A853"
          d="M12 21.99c3.15 0 5.79-1.04 7.72-2.82l-3.67-2.8c-.98.68-2.3 1.15-4.05 1.15-3.1 0-5.73-2.03-6.67-4.83l-.15.01-3.54 2.74-.05.15C3.54 18.92 7.48 21.99 12 21.99Z"
        />
        <path
          fill="#FBBC05"
          d="M5.33 13.49A7.54 7.54 0 0 1 4.94 12c0-.52.07-1.03.19-1.49l-.01-.16-3.58-2.78-.12.05A11.99 11.99 0 0 0 1 12c0 1.94.46 3.78 1.29 5.41l3.04-2.36Z"
        />
        <path
          fill="#EA4335"
          d="M12 5.2c2.19 0 3.66.94 4.51 1.73l3.3-3.22C17.77 1.74 15.14.66 12 .66 7.48.66 3.54 3.73 1.29 8.58l4.03 3.12C6.27 7.23 8.9 5.2 12 5.2Z"
        />
      </svg>
      <span>Google</span>
    </span>
  );
}
