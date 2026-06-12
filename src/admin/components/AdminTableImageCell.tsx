type AdminTableImageCellProps = {
  src?: string | null
  label: string
  onClick: () => void
}

export function AdminTableImageCell({ src, label, onClick }: AdminTableImageCellProps) {
  return (
    <button
      type="button"
      className="block overflow-hidden rounded-lg border border-[#e5e5e5] bg-[#fafafa]"
      onClick={onClick}
      title={label}
    >
      {src ? (
        <img src={src} alt="" className="h-12 w-12 object-cover" />
      ) : (
        <div className="admin-muted flex h-12 w-12 items-center justify-center text-[10px]">No image</div>
      )}
    </button>
  )
}
