import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
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
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { SiNodedotjs, SiExpress, SiOpenai } from "react-icons/si";

import heroImage from "@assets/generated_images/clean_abstract_tech_background.png";
import appMockup from "@assets/generated_images/mobile_app_chat_mockup.png";
import iotDevice from "@assets/generated_images/iot_closet_sensor_device.png";
import architectureDiagram from "@assets/generated_images/system_architecture_diagram.png";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

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
            <ThemeToggle />
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tecnología de moda inteligente"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70 dark:bg-background/80" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
        <Badge variant="secondary" className="mb-6">
          Trabajo Fin de Grado - Diseño de Producto
        </Badge>

        <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
          Asistente de Moda
          <br />
          <span className="text-primary">Inteligente</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Tecnología IoT + Inteligencia Artificial para gestionar tu armario de
          forma inteligente. Un sistema distribuido que combina app móvil,
          objeto físico y servidor central.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild data-testid="button-discover">
            <a href="#sistema">
              Descubrir el Sistema
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild data-testid="button-api">
            <a href="#arquitectura">Ver Arquitectura</a>
          </Button>
        </div>

        <a
          href="#sistema"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          data-testid="link-scroll-down"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </a>
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
        "Interfaz de conversación intuitiva con ChatGPT para consultas de moda personalizadas. Recibe recomendaciones y looks generados por IA.",
      features: ["Chat con IA", "Looks personalizados", "Gestión de prendas"],
      image: appMockup,
    },
    {
      icon: Eye,
      number: "02",
      title: "Objeto Físico",
      description:
        "Sensor inteligente instalado en el armario con visión artificial. Detecta automáticamente qué prendas entran y salen.",
      features: ["Visión artificial", "Detección automática", "Sincronización"],
      image: iotDevice,
    },
    {
      icon: Server,
      number: "03",
      title: "Servidor Central",
      description:
        "Backend que coordina toda la lógica y decisiones del sistema. Único punto de comunicación entre la app y el objeto físico.",
      features: ["API REST", "Lógica centralizada", "Procesamiento IA"],
      image: null,
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

              {comp.image && (
                <div className="mb-4 rounded-lg overflow-hidden bg-muted/30">
                  <img
                    src={comp.image}
                    alt={comp.title}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}

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
          <div className="mb-8 rounded-lg overflow-hidden bg-muted/30 p-4">
            <img
              src={architectureDiagram}
              alt="Diagrama de arquitectura del sistema"
              className="w-full h-auto object-contain"
            />
          </div>

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
              <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-primary/50 to-primary" />
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
              <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-primary to-primary/50" />
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
      title: "Gestión de Inventario",
      description:
        "Almacena y organiza todas tus prendas con imágenes y estados actualizados automáticamente.",
    },
    {
      icon: MessageSquare,
      title: "Consultas con IA",
      description:
        "Pregunta al asistente qué ponerte según la ocasión, clima o preferencias personales.",
    },
    {
      icon: Camera,
      title: "Detección Automática",
      description:
        "El sensor del armario detecta qué prendas sacas o guardas mediante visión artificial.",
    },
    {
      icon: Wand2,
      title: "Generación de Looks",
      description:
        "Recibe sugerencias visuales de outfits completos generados por inteligencia artificial.",
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
            Un conjunto de funcionalidades diseñadas para revolucionar tu
            experiencia con la moda
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
            Este proyecto es parte de un Trabajo Fin de Grado y tiene fines
            exclusivamente académicos y de investigación.
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
        <SystemSection />
        <ArchitectureSection />
        <FeaturesSection />
        <TechnologySection />
      </main>
      <Footer />
    </div>
  );
}
