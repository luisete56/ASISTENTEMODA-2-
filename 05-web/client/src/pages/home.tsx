import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Server,
  Eye,
  Cpu,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Shirt,
  Camera,
  Wand2,
  Database,
  ChevronDown,
} from "lucide-react";
import { SiNodedotjs, SiExpress, SiOpenai } from "react-icons/si";

// Imagen del producto 3D (objeto físico) — lo primero que ve el visitante
const productoHeroImage = "/063e6e72-2cd5-4794-83b4-d3d5e2933e62.jfif?v=1";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", href: "#hero" },
    { label: "El servicio", href: "#el-servicio" },
    { label: "Sistema", href: "#sistema" },
    { label: "Arquitectura", href: "#arquitectura" },
    { label: "Tecnología", href: "#tecnologia" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Asistente Luis Rabal Pérez</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-menu-toggle"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMenuOpen(false)}
                  data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        <div className="flex-1 flex justify-center order-2 md:order-1">
          <img
            src={productoHeroImage}
            alt="Asistente de moda: objeto 3D sobre el armario con visión artificial"
            className="max-h-[50vh] md:max-h-[65vh] w-auto object-contain drop-shadow-2xl"
          />
        </div>
        <div className="flex-1 text-center md:text-left order-1 md:order-2">
          <Badge variant="secondary" className="mb-4">
            Proyecto de diseño
          </Badge>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            Asistente de Moda
            <br />
            <span className="text-primary">Inteligente</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-6">
            Objeto pensado para colocarse encima del armario e integrarse en el
            hogar. Detecta con visión artificial las prendas que entran y salen,
            genera un inventario dinámico y se conecta con una app que te
            aconseja qué ponerte y te muestra cómo te quedarían tus combinaciones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
            <Button size="lg" asChild data-testid="button-discover">
              <a href="#el-servicio">
                Ver el servicio
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-api">
              <a href="#sistema">El sistema</a>
            </Button>
          </div>
        </div>
      </div>
      <a
        href="#el-servicio"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        data-testid="link-scroll-down"
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </a>
    </section>
  );
}

function RenderSection() {
  return (
    <section className="py-0 bg-background">
      <div className="max-w-6xl mx-auto">
        <img
          src="/render.png"
          alt="El asistente de moda colocado sobre el armario, integrado en el hogar"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

const servicioImages = [
  {
    src: "/823077bc-1a6c-4565-81cb-a752b3024b7c.jfif",
    alt: "Mi Armario: el asistente sabe lo que hay en tu armario",
    title: "Un asistente que sabe lo que hay en tu armario",
    description:
      "Lleva el control de tus prendas: qué tienes, qué está en el armario o fuera. El asistente conoce tu vestuario al dedillo.",
  },
  {
    src: "/1de8e652-f5d4-42b8-89bc-1bfb9d98ae3f.jfif",
    alt: "Pregúntale sobre estilos y conjuntos",
    title: "Pregúntale sobre estilos, qué ponerte, cómo mejorar tus conjuntos",
    description:
      "Consulta combinaciones, estilos o qué ponerte hoy. Te aconseja y te ayuda a mejorar tus looks.",
  },
  {
    images: [
      {
        src: "/2f06b304-524b-4f98-8f09-ee67bc38d6c4.jfif",
        alt: "Tu foto de perfil para que el asistente genere las previsualizaciones",
      },
      {
        src: "/62950ac8-89e0-42a3-89d7-19ff33a54b4d.png",
        alt: "Resultado: cómo te quedarían las combinaciones puestas",
      },
    ],
    title: "Te genera fotos para que veas cómo te quedarían las combinaciones puestas",
    description:
      "Previsualizaciones con IA: combina tu foto con tu ropa y te muestra cómo te quedarían las combinaciones sin probártelas.",
  },
];

function ServicioSection() {
  return (
    <section id="el-servicio" className="py-12 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            El asistente en tu día a día
          </Badge>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Así es el servicio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Objeto en el armario, inventario dinámico y app que aconseja y
            previsualiza looks con IA
          </p>
        </div>
        {/* Servicios 1 y 2 en dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {servicioImages.slice(0, 2).map((item) => (
            <Card
              key={item.title}
              className="p-0 overflow-hidden hover-elevate transition-all duration-300 flex flex-col"
            >
              <div className="bg-muted/30 flex items-center justify-center min-h-[320px] md:min-h-[400px] p-3">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto max-h-[400px] md:max-h-[480px] object-contain"
                />
              </div>
              <div className="p-5 flex-1">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Servicio 3: sección grande con las dos imágenes */}
        {(() => {
          const item = servicioImages[2];
          return (
            <Card className="p-0 overflow-hidden hover-elevate transition-all duration-300">
              <div className="p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {item.description}
                </p>
              </div>
              {"images" in item && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-8 md:px-8">
                  {item.images.map((img, i) => (
                    <div key={i} className="bg-muted/30 rounded-lg flex items-center justify-center p-4">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-auto h-auto max-h-[500px] md:max-h-[600px] object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })()}
      
      </div>
    </section>
  );
}

function SystemSection() {
  const components = [
    {
      icon: Smartphone,
      number: "01",
      title: "App Móvil",
      description:
        "Asistente personal que aconseja qué ponerte según contexto o preferencias, detecta posibles carencias en el vestuario y crea imágenes con IA para previsualizar cómo te quedarían combinaciones de prendas de tu armario.",
      features: ["Chat con IA", "Looks personalizados", "Gestión de prendas"],
    },
    {
      icon: Eye,
      number: "02",
      title: "Objeto Físico",
      description:
        "Asistente de moda como objeto tridimensional sobre el armario, integrado en el entorno doméstico. Detecta mediante visión artificial las prendas que entran y salen, generando un inventario dinámico del vestuario.",
      features: ["Visión artificial", "Detección automática", "Sincronización"],
    },
    {
      icon: Server,
      number: "03",
      title: "Servidor Central",
      description:
        "Conecta la información del objeto con la aplicación móvil. Centraliza la lógica y la IA para un único estado del inventario y las decisiones del sistema.",
      features: ["API REST", "Lógica centralizada", "Procesamiento IA"],
    },
  ];

  return (
    <section id="sistema" className="py-12 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            Componentes del Sistema
          </Badge>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Un Sistema en 3 Partes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Arquitectura distribuida diseñada para una experiencia sin fricciones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {components.map((comp) => (
            <Card
              key={comp.number}
              className="p-6 md:p-8 hover-elevate transition-all duration-300"
              data-testid={`card-component-${comp.number}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <comp.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-4xl font-bold text-muted/50">
                  {comp.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3">{comp.title}</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {comp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {comp.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section id="arquitectura" className="py-12 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            Arquitectura
          </Badge>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Flujo de Comunicación
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            El servidor es el único punto de comunicación entre todos los componentes
          </p>
        </div>

        <Card className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <div className="p-4 bg-primary/10 rounded-full mb-3">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <span className="font-medium">App Móvil</span>
              <span className="text-xs text-muted-foreground mt-1">
                Solo UI
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-16 md:w-24 h-0.5 bg-primary/50" />
              <ArrowRight className="h-4 w-4 text-primary -ml-1" />
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
              <div className="p-4 bg-primary rounded-full mb-3">
                <Server className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="font-semibold text-primary">Servidor Central</span>
              <span className="text-xs text-muted-foreground mt-1">
                Lógica + Estado + IA
              </span>
            </div>

            <div className="flex items-center">
              <ArrowRight className="h-4 w-4 text-primary rotate-180 md:rotate-0 -mr-1 md:-ml-1" />
              <div className="w-16 md:w-24 h-0.5 bg-primary/50" />
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="p-4 bg-primary/10 rounded-full mb-3">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <span className="font-medium">Objeto Físico</span>
              <span className="text-xs text-muted-foreground mt-1">
                Solo sensores
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <Cpu className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Lógica Centralizada</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Toda la inteligencia reside en el servidor
                </p>
              </div>
              <div className="p-4">
                <Database className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Estado Único</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Una sola fuente de verdad para el inventario
                </p>
              </div>
              <div className="p-4">
                <MessageSquare className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">API REST</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Comunicación estandarizada JSON
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Shirt,
      title: "Inventario dinámico",
      description:
        "El objeto detecta las prendas que entran y salen del armario. La app refleja en tiempo real el estado de tu vestuario, siempre actualizado.",
    },
    {
      icon: MessageSquare,
      title: "Asesoramiento contextual",
      description:
        "El asistente te aconseja qué ponerte según la ocasión, el contexto o tus preferencias, y detecta posibles carencias en tu armario.",
    },
    {
      icon: Camera,
      title: "Visión artificial",
      description:
        "Visión artificial en el objeto físico para identificar qué prendas guardas o sacas del armario, sin que tengas que registrarlas a mano.",
    },
    {
      icon: Wand2,
      title: "Previsualización con IA",
      description:
        "Imágenes generadas por IA que permiten previsualizar cómo te quedarían distintas combinaciones de prendas que ya posees.",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            Funcionalidades
          </Badge>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Características Principales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Inventario dinámico, asesoramiento y previsualización de looks con
            tus prendas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 flex items-start gap-4 hover-elevate transition-all duration-300"
              data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  const technologies = [
    {
      icon: SiNodedotjs,
      name: "Node.js",
      description: "Runtime JavaScript",
    },
    {
      icon: SiExpress,
      name: "Express",
      description: "Framework web",
    },
    {
      icon: SiOpenai,
      name: "ChatGPT API",
      description: "Inteligencia artificial",
    },
    {
      icon: Eye,
      name: "Computer Vision",
      description: "Visión artificial",
    },
  ];

  return (
    <section id="tecnologia" className="py-12 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            Stack Tecnológico
          </Badge>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Tecnologías Utilizadas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Construido con tecnologías modernas y escalables
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="p-6 text-center hover-elevate transition-all duration-300"
              data-testid={`card-tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <tech.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-1">{tech.name}</h3>
              <p className="text-xs text-muted-foreground">{tech.description}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 md:p-8">
          <h3 className="font-semibold mb-4 text-center">Endpoints de la API</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <code className="text-sm font-mono text-primary">POST /api/chat</code>
              <p className="text-xs text-muted-foreground mt-1">
                Envía mensajes al asistente de moda
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <code className="text-sm font-mono text-primary">GET /api/wardrobe</code>
              <p className="text-xs text-muted-foreground mt-1">
                Obtiene el inventario del armario
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <code className="text-sm font-mono text-primary">POST /api/wardrobe</code>
              <p className="text-xs text-muted-foreground mt-1">
                Añade una nueva prenda al inventario
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <code className="text-sm font-mono text-primary">POST /api/wardrobe/event</code>
              <p className="text-xs text-muted-foreground mt-1">
                Recibe eventos del objeto físico
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 md:py-12 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shirt className="h-5 w-5 text-primary" />
            <span className="font-semibold">Asistente Luis Rabal Pérez</span>
          </div>

          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Trabajo Fin de Grado - Diseño de Producto
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Curso Académico 2024-2025
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Proyecto Académico
            </Badge>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Proyecto de diseño de producto: forma, integración tecnológica,
            interacción física y viabilidad constructiva. Un sistema digital
            materializado en un objeto claro y coherente con el hogar.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <RenderSection />
        <ServicioSection />
        <SystemSection />
        <ArchitectureSection />
        <FeaturesSection />
        <TechnologySection />
      </main>
      <Footer />
    </div>
  );
}
