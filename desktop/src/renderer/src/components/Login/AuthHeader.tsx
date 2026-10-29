interface AuthHeaderProps {
  title: string
  subtitle: string
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps): React.JSX.Element {
  return (
    <header>
      <div className="h-1 w-14 rounded-full bg-brand" />
      <h1 className="mt-6 text-[34px] font-bold tracking-tight text-white">{title}</h1>
      <p className="mt-2 text-[16px] text-muted">{subtitle}</p>
    </header>
  )
}
