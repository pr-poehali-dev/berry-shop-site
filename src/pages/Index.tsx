import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    {
      id: 1,
      name: 'Голубика свежая',
      price: 890,
      unit: '500г',
      image: 'https://cdn.poehali.dev/projects/5c9af21e-1e33-495f-a71b-054b082d8593/files/207cfe2d-9195-4a16-94d1-6e8db3821fc5.jpg',
      description: 'Свежая ароматная голубика высшего качества',
      category: 'Премиум'
    },
    {
      id: 2,
      name: 'Малина садовая',
      price: 690,
      unit: '500г',
      image: 'https://cdn.poehali.dev/projects/5c9af21e-1e33-495f-a71b-054b082d8593/files/c6fc518f-73c9-46d6-b858-37415f17b128.jpg',
      description: 'Сочная малина с собственных плантаций',
      category: 'Хит продаж'
    },
    {
      id: 3,
      name: 'Клубника отборная',
      price: 590,
      unit: '500г',
      image: 'https://cdn.poehali.dev/projects/5c9af21e-1e33-495f-a71b-054b082d8593/files/a4ecef21-cd77-485e-846c-3316ae7a004c.jpg',
      description: 'Крупная сладкая клубника премиум класса',
      category: 'Новинка'
    },
    {
      id: 4,
      name: 'Ежевика лесная',
      price: 790,
      unit: '500г',
      image: 'https://cdn.poehali.dev/projects/5c9af21e-1e33-495f-a71b-054b082d8593/files/207cfe2d-9195-4a16-94d1-6e8db3821fc5.jpg',
      description: 'Ароматная ежевика с насыщенным вкусом',
      category: 'Премиум'
    }
  ];

  const reviews = [
    { name: 'Анна Смирнова', text: 'Потрясающая голубика! Свежайшая, крупная и очень вкусная. Заказываем регулярно.', rating: 5 },
    { name: 'Дмитрий Ковалев', text: 'Быстрая доставка, ягоды в отличном состоянии. Цены приятные, качество супер!', rating: 5 },
    { name: 'Елена Петрова', text: 'Лучший магазин ягод! Всегда свежие, ароматные продукты. Рекомендую всем!', rating: 5 }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} добавлен в корзину`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🫐</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
              Ягодная Лавка
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className={`transition-colors ${activeSection === 'home' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>
              Главная
            </button>
            <button onClick={() => scrollToSection('catalog')} className={`transition-colors ${activeSection === 'catalog' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>
              Каталог
            </button>
            <button onClick={() => scrollToSection('about')} className={`transition-colors ${activeSection === 'about' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>
              О нас
            </button>
            <button onClick={() => scrollToSection('reviews')} className={`transition-colors ${activeSection === 'reviews' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>
              Отзывы
            </button>
            <button onClick={() => scrollToSection('contacts')} className={`transition-colors ${activeSection === 'contacts' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>
              Контакты
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-purple-600">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.unit}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="font-semibold">{item.quantity}</span>
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button size="sm" variant="ghost" className="ml-auto" onClick={() => removeFromCart(item.id)}>
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{item.price * item.quantity} ₽</p>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-primary">{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-green-50 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-purple-600 text-white hover:bg-purple-700">Свежие ягоды каждый день</Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Натуральные ягоды
              <span className="block bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                прямо с плантаций
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Выращиваем голубику, малину, клубнику и другие ягоды без химии. Доставляем свежими в день сбора.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => scrollToSection('catalog')} className="bg-purple-600 hover:bg-purple-700">
                Смотреть каталог
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наш каталог</h3>
            <p className="text-lg text-gray-600">Свежие ягоды высшего качества</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-purple-100">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-3 right-3 bg-purple-600 text-white">{product.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <span className="text-muted-foreground">/ {product.unit}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => addToCart(product)}>
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-gradient-to-b from-purple-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">О нас</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-purple-100">
                <CardHeader>
                  <div className="text-4xl mb-4">🌱</div>
                  <CardTitle>Экологично</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Выращиваем ягоды без химических удобрений и пестицидов. Только натуральные методы ухода.</p>
                </CardContent>
              </Card>
              <Card className="border-purple-100">
                <CardHeader>
                  <div className="text-4xl mb-4">🚚</div>
                  <CardTitle>Свежесть</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Доставляем ягоды в день сбора. От плантации до вашего стола за несколько часов.</p>
                </CardContent>
              </Card>
              <Card className="border-purple-100">
                <CardHeader>
                  <div className="text-4xl mb-4">⭐</div>
                  <CardTitle>Качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Каждая ягода проходит контроль качества. Отбираем только лучшие плоды для наших клиентов.</p>
                </CardContent>
              </Card>
              <Card className="border-purple-100">
                <CardHeader>
                  <div className="text-4xl mb-4">💚</div>
                  <CardTitle>С любовью</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Семейное хозяйство с 15-летним опытом. Знаем все секреты выращивания вкусных ягод.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Отзывы клиентов</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="border-purple-100">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-gradient-to-b from-green-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Контакты</h3>
            <div className="space-y-4">
              <Card className="border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-3 text-lg">
                    <Icon name="Phone" size={24} className="text-purple-600" />
                    <a href="tel:+79001234567" className="text-gray-900 hover:text-purple-600 transition-colors">
                      +7 (900) 123-45-67
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-3 text-lg">
                    <Icon name="Mail" size={24} className="text-purple-600" />
                    <a href="mailto:info@berryshop.ru" className="text-gray-900 hover:text-purple-600 transition-colors">
                      info@berryshop.ru
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-3 text-lg">
                    <Icon name="MapPin" size={24} className="text-purple-600" />
                    <span className="text-gray-900">Московская область, Пушкинский район</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p className="text-gray-600 pt-4">Работаем ежедневно с 8:00 до 20:00</p>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-3xl">🫐</div>
            <span className="text-xl font-bold">Ягодная Лавка</span>
          </div>
          <p className="text-white/80">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
