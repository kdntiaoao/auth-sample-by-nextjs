type Props = {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return <div className="mx-auto max-w-4xl px-4">{children}</div>
}
