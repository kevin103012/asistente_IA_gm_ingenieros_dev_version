interface AuthFooterProps {
  question: string
  actionLabel: string
  onAction: () => void
}

export default function AuthFooter({
  question,
  actionLabel,
  onAction
}: AuthFooterProps): React.JSX.Element {
  return (
    <p className="text-center text-[13px] text-white/55">
      {question}{' '}
      <button
        type="button"
        onClick={onAction}
        className="font-semibold text-brand transition hover:text-brand-hover"
      >
        {actionLabel}
      </button>
    </p>
  )
}
