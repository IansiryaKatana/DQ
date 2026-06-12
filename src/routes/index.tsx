import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '#/components/home/HomePage'
import { loadAllBooks } from '#/lib/cms/loadBooks'
import { loadCmsSnapshot } from '#/lib/cms/loadCmsSnapshot'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [data, books] = await Promise.all([loadCmsSnapshot(), loadAllBooks()])
    return { data, books }
  },
  component: IndexPage,
})

function IndexPage() {
  const { data, books } = Route.useLoaderData()
  return <HomePage data={data} books={books} />
}
