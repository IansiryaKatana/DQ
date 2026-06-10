import { Link, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useCms } from '#/contexts/CmsContext'
import { useAdminPageHeader } from './AdminPageContext'

export function AdminDashboard() {
  const { data, mode } = useCms()
  const navigate = useNavigate()

  const actions = useMemo(
    () => [{ label: 'View site', variant: 'secondary' as const, onClick: () => navigate({ to: '/' }) }],
    [navigate],
  )

  useAdminPageHeader({
    title: 'Dashboard',
    description: `CMS mode: ${mode}. Changes appear on the public site after save and refetch.`,
    actions,
  })

  const stats = [
    { label: 'Products', value: data?.donationProducts.length ?? 0 },
    { label: 'Quick donations', value: data?.quickDonations.length ?? 0 },
    { label: 'Stories', value: data?.stories.length ?? 0 },
    { label: 'Blog posts', value: data?.blogPosts.length ?? 0 },
    { label: 'Wiki articles', value: data?.quranWikiArticles.length ?? 0 },
  ]

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-panel p-4">
            <p className="admin-muted text-sm">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-dq-gold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="admin-panel mt-6 p-4">
        <h2 className="font-semibold text-dq-black">Quick links</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link to="/backend/hero" className="admin-btn-primary">
            Edit hero
          </Link>
          <Link to="/backend/products" className="admin-btn-secondary">
            Manage products
          </Link>
          <Link to="/backend/articles" className="admin-btn-secondary">
            Manage articles
          </Link>
          <Link to="/backend/quran-wiki" className="admin-btn-secondary">
            Manage Qur&apos;an Wiki
          </Link>
        </div>
      </div>
    </div>
  )
}
