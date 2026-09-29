import { CategoryPage, categoryParams } from '@/components/category-page'
import { DefaultBrand } from '@/lib/brands'

export const dynamicParams = false

export function generateStaticParams() {
  return categoryParams()
}

export default async function Page({
  params
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return <CategoryPage brand={DefaultBrand} category={category} />
}
