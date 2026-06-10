import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Database } from '#/integrations/supabase/database.types'
import { getSupabase } from '#/integrations/supabase/client'
import { useCms } from '#/contexts/CmsContext'
import { useAdminPageHeader } from './AdminPageContext'

type NavRow = Database['public']['Tables']['dq_navigation_links']['Row']
type FooterRow = Database['public']['Tables']['dq_footer_settings']['Row']

export function AdminSite() {
  const { refetch } = useCms()
  const [nav, setNav] = useState<NavRow[]>([])
  const [footer, setFooter] = useState<FooterRow | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function refresh() {
    const sb = getSupabase()
    if (!sb) return
    const [navRes, footerRes] = await Promise.all([
      sb.from('dq_navigation_links').select('*').order('sort_order'),
      sb.from('dq_footer_settings').select('*').limit(1).maybeSingle(),
    ])
    if (navRes.error) setErr(navRes.error.message)
    setNav(navRes.data ?? [])
    setFooter(footerRes.data)
  }

  useEffect(() => {
    void refresh()
  }, [])

  const saveFooter = useCallback(async () => {
    if (!footer) return
    const sb = getSupabase()
    if (!sb) return
    await sb.from('dq_footer_settings').upsert(footer)
    await refetch()
  }, [footer, refetch])

  const headerActions = useMemo(
    () => (footer ? [{ label: 'Save footer', onClick: () => void saveFooter() }] : []),
    [footer, saveFooter],
  )

  useAdminPageHeader({
    title: 'Site & footer',
    description: 'Navigation links and footer contact details.',
    actions: headerActions,
  })

  return (
    <div>
      {err ? <p className="mb-4 text-sm text-red-400">{err}</p> : null}

      <div className="admin-panel mb-6 overflow-x-auto p-4">
        <h2 className="mb-3 font-semibold">Navigation ({nav.length})</h2>
        <p className="admin-muted text-sm">Manage header/footer links via the dq_navigation_links table after migration.</p>
      </div>

      {footer ? (
        <div className="admin-panel space-y-4 p-4">
          <h2 className="font-semibold">Footer</h2>
          <textarea className="admin-input min-h-20" value={footer.about_text} onChange={(e) => setFooter({ ...footer, about_text: e.target.value })} />
          <input className="admin-input" value={footer.email} onChange={(e) => setFooter({ ...footer, email: e.target.value })} />
          <input className="admin-input" value={footer.phone} onChange={(e) => setFooter({ ...footer, phone: e.target.value })} />
          <textarea className="admin-input" value={footer.address} onChange={(e) => setFooter({ ...footer, address: e.target.value })} />
        </div>
      ) : null}
    </div>
  )
}
