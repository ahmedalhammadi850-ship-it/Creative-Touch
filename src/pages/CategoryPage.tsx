import { Link, useRoute } from 'wouter';
import { categories } from '../data/categories';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { TemplateRenderer } from '../components/TemplateRenderer';

export default function CategoryPage() {
  const [, params] = useRoute('/category/:id');
  const categoryId = params?.id;
  
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    return <div className="p-20 text-center text-xl">الفئة غير موجودة</div>;
  }

  const getScale = () => {
    if (categoryId === 'business-card') return 'scale-[0.5] origin-center';
    if (categoryId === 'ads') return 'scale-[0.5] origin-center';
    return 'scale-[0.5] origin-center';
  };

  const getContainerHeight = () => {
    if (categoryId === 'business-card') return 'h-40';
    if (categoryId === 'ads') return 'h-64';
    return 'h-64';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronRight className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-xl font-bold font-sans">{category.name}</h1>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.templates.map(template => (
            <Link key={template.id} href={`/editor/${category.id}/${template.id}`} className="group block focus:outline-none">
              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 bg-white h-full flex flex-col">
                <div className={`bg-gray-100 flex items-center justify-center border-b relative overflow-hidden ${getContainerHeight()}`}>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">استخدام القالب</span>
                  </div>
                  <div className={getScale()}>
                    <div className="pointer-events-none select-none">
                      <TemplateRenderer 
                        categoryId={category.id} 
                        templateId={template.id} 
                        data={template.defaultData} 
                      />
                    </div>
                  </div>
                </div>
                <CardHeader className="py-4 px-5">
                  <CardTitle className="text-lg text-center group-hover:text-primary transition-colors">{template.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
