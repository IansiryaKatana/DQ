import { useRouterState } from '@tanstack/react-router'
import { useCms } from '#/contexts/CmsContext'
import { FloatingActionBubble } from './FloatingActionBubble'

export function FloatingActionBubbleHost() {
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith('/backend') })
  const { data } = useCms()

  if (isAdmin) return null

  return <FloatingActionBubble donateUrl={data?.siteSettings.donate_url ?? '/donate'} />
}
