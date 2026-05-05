import { Link } from 'wouter';
import { categories } from '../data/categories';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutTemplate } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
            <LayoutTemplate className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold font-sans">ستوديو القوالب</h1>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 pt-12">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">اختر فئة للبدء</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">تصاميم احترافية جاهزة بانتظار لمساتك الإبداعية.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.id}`} className="group block focus:outline-none">
              <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden bg-white">
                <div className="h-48 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center border-b p-6">
                  {cat.id === 'business-card' && (
                    <div className="w-32 h-20 bg-white shadow-md border rounded-md relative before:absolute before:w-8 before:h-full before:bg-indigo-500 before:left-0 before:top-0 before:rounded-l-md" />
                  )}
                  {cat.id === 'ads' && (
                    <div className="w-24 h-24 bg-white shadow-md border rounded-md relative flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full" />
                    </div>
                  )}
                  {cat.id === 'wedding' && (
                    <div className="w-24 h-32 bg-white shadow-md border rounded-md relative flex items-center justify-center border-amber-200">
                      <div className="w-16 h-24 border border-amber-300 rounded-sm" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{cat.name}</CardTitle>
                  <CardDescription className="text-sm">{cat.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">
                    {cat.templates.length} قوالب
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
