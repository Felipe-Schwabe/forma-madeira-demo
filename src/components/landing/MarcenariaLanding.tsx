'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Instagram,
  Menu,
  Minus,
  MoveRight,
  Ruler,
  Send,
  X,
} from 'lucide-react';
import { business, isDemo } from '@/src/config/business';
import { beforeAfter, projectCategories, projects } from '@/src/data/projects';
import { services } from '@/src/data/services';
import { formatQuoteMessage, getWhatsAppUrl, QuoteValues } from '@/src/lib/whatsapp';

const initialQuote: QuoteValues = {
  name: '',
  environment: 'Cozinha',
  location: '',
  measurements: '',
  timeframe: 'Ainda estou planejando',
  description: '',
};

const navItems = [
  ['Início', 'inicio'],
  ['Projetos', 'projetos'],
  ['Ambientes', 'ambientes'],
  ['Sobre', 'sobre'],
  ['Processo', 'processo'],
  ['Contato', 'contato'],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Forma & Madeira, início">
      <span className="brand-mark">F<span>&</span>M</span>
      <span className="brand-copy">
        <strong>{business.name}</strong>
        <small>{business.descriptor}</small>
      </span>
    </a>
  );
}

function SectionIntro({ eyebrow, title, copy, light = false }: { eyebrow: string; title: React.ReactNode; copy?: string; light?: boolean }) {
  return (
    <div className={`section-intro ${light ? 'section-intro-light' : ''}`}>
      <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: (typeof projects)[number]; index: number; onOpen: () => void }) {
  return (
    <button className={`project-card project-card-${index % 3}`} onClick={onOpen} aria-label={`Ampliar projeto ${project.title}`}>
      <div className="project-image-wrap">
        <Image src={project.image} alt={project.alt} fill sizes="(max-width: 768px) 92vw, 50vw" className="project-image" />
        <span className="project-open"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
      </div>
      <span className="project-meta">{project.eyebrow}</span>
      <span className="project-title-row"><strong>{project.title}</strong><span>{project.category}</span></span>
    </button>
  );
}

export default function MarcenariaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [quote, setQuote] = useState(initialQuote);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((current) => current === null ? 0 : (current + 1) % filteredProjects.length);
      if (event.key === 'ArrowLeft') setLightboxIndex((current) => current === null ? 0 : (current - 1 + filteredProjects.length) % filteredProjects.length);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  });

  const filteredProjects = useMemo(
    () => activeCategory === 'Todos' ? projects : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  const quoteMessage = formatQuoteMessage(quote);
  const whatsappUrl = getWhatsAppUrl(quoteMessage);

  const updateQuote = (field: keyof QuoteValues, value: string) => setQuote((current) => ({ ...current, [field]: value }));

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuoteSubmitted(true);
    setCopied(false);
  };

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const scrollToQuote = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="demo-ribbon">Site demonstrativo <span>·</span> conceito para marcenarias</div>

      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <div className="site-header-inner">
          <Logo light={!scrolled} />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <button className={`header-cta ${scrolled ? '' : 'header-cta-light'}`} onClick={scrollToQuote}>Solicitar orçamento <ArrowUpRight size={15} /></button>
          <button className={`mobile-menu-button ${scrolled ? '' : 'mobile-menu-button-light'}`} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button onClick={scrollToQuote}>Solicitar orçamento <ArrowUpRight size={15} /></button>
        </div>
      </header>

      <section id="inicio" className="hero">
        <Image src="/images/hero.jpg" alt="Cozinha planejada sofisticada com madeira natural e luz quente" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content page-shell">
          <div className="hero-kicker"><span /> Design · Precisão · Personalização</div>
          <h1>Ambientes planejados<br /><em>para viver</em> cada detalhe.</h1>
          <p>Projetos sob medida que unem funcionalidade, estética e personalidade para transformar seus espaços.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#projetos">Explorar projetos <ArrowDown size={16} /></a>
            <button className="text-link text-link-light" onClick={scrollToQuote}>Solicitar orçamento <ArrowUpRight size={16} /></button>
          </div>
        </div>
        <div className="hero-bottom page-shell">
          <span>Forma & Madeira</span>
          <span className="hero-scroll"><span className="hero-scroll-line" /> role para explorar</span>
          <span>{business.city}</span>
        </div>
      </section>

      <section id="sobre" className="story section-pad page-shell">
        <div className="story-index">01 <span>/</span> 04</div>
        <div className="story-grid">
          <SectionIntro eyebrow="A marcenaria" title={<>Cada espaço tem<br />uma <em>história.</em></>} copy="Acreditamos que a marcenaria começa antes da madeira: começa na escuta, no olhar atento e na vontade de criar algo que faça sentido para a vida real." />
          <div className="story-copy"><p>Da primeira conversa à instalação, cada decisão é pensada para que o ambiente tenha a sua medida — não apenas em centímetros, mas em ritmo, hábitos e desejos.</p><p>O resultado é uma casa mais fluida, onde a beleza não compete com a rotina. Ela participa dela.</p><a className="text-link" href="#processo">Conheça nosso processo <MoveRight size={17} /></a></div>
        </div>
        <div className="story-visual-grid">
          <div className="story-image story-image-large"><Image src="/images/story.jpg" alt="Detalhe de ambiente planejado com madeira e iluminação natural" fill sizes="(max-width: 768px) 90vw, 58vw" /></div>
          <div className="story-aside"><span className="vertical-note">Matéria · escala · luz</span><div className="story-detail-image"><Image src="/images/detail.jpg" alt="Detalhe de acabamento de madeira em móvel sob medida" fill sizes="25vw" /></div><span className="story-caption">Texturas que convidam<br />ao toque.</span></div>
        </div>
      </section>

      <section id="projetos" className="portfolio section-pad section-olive">
        <div className="page-shell">
          <div className="portfolio-heading"><SectionIntro light eyebrow="Portfólio ilustrativo" title={<>Projetos pensados para<br /><em>cada maneira</em> de viver.</>} copy="Uma seleção de referências visuais para mostrar como a Forma & Madeira pode apresentar o seu trabalho com mais presença." /><div className="portfolio-side-note">Imagens ilustrativas<br />para demonstração comercial</div></div>
          <div className="filter-row" role="tablist" aria-label="Filtrar projetos">
            {projectCategories.map((category) => <button key={category} className={activeCategory === category ? 'filter-active' : ''} onClick={() => { setActiveCategory(category); setLightboxIndex(null); }} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
          </div>
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setLightboxIndex(index)} />)}
          </div>
          <div className="portfolio-footer"><span>{String(filteredProjects.length).padStart(2, '0')} projetos em destaque</span><span>Selecione uma imagem para ampliar <ArrowUpRight size={15} /></span></div>
        </div>
      </section>

      <section id="ambientes" className="services section-pad page-shell">
        <div className="services-heading"><SectionIntro eyebrow="Ambientes" title={<>Seu espaço.<br /><em>Sua identidade.</em></>} copy="Soluções desenhadas para acompanhar a maneira como você vive, trabalha e recebe." /><span className="section-index">02 <span>/</span> 04</span></div>
        <div className="services-grid">
          {services.map((service, index) => <a className="service-card" key={service.title} href="#projetos" onClick={() => setActiveCategory(service.category)}><div className="service-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 90vw, 33vw" /></div><div className="service-card-content"><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p><span className="service-link">Explorar <ArrowUpRight size={16} /></span></div></a>)}
        </div>
      </section>

      {beforeAfter && <BeforeAfter beforeAfter={beforeAfter} />}

      <section className="principles section-pad section-sand">
        <div className="page-shell"><div className="principles-heading"><SectionIntro eyebrow="O que nos guia" title={<>Não se trata apenas<br />de móveis. <em>Trata-se<br />de transformar espaços.</em></>} /><span className="section-index">03 <span>/</span> 04</span></div><div className="principles-grid">{['Projeto sob medida', 'Aproveitamento inteligente', 'Atenção aos detalhes', 'Acompanhamento próximo'].map((title, index) => <div className="principle" key={title}><span className="principle-number">0{index + 1}</span><Minus size={17} strokeWidth={1.3} /><h3>{title}</h3><p>{['Cada solução nasce das suas medidas, do seu olhar e da sua rotina.', 'O espaço é lido por inteiro para que cada centímetro tenha propósito.', 'Acabamentos, encaixes e materiais fazem parte da experiência.', 'Você acompanha as decisões e vê a ideia ganhar forma.'][index]}</p></div>)}</div></div>
      </section>

      <section id="processo" className="process section-pad page-shell"><div className="process-heading"><SectionIntro eyebrow="O processo" title={<>Da primeira ideia<br /><em>ao ambiente pronto.</em></>} copy="Um caminho claro, com espaço para conversar, ajustar e construir junto." /><span className="section-index">04 <span>/</span> 04</span></div><div className="timeline">{['Conversa inicial', 'Entendimento do espaço', 'Planejamento e proposta', 'Produção personalizada', 'Instalação e finalização'].map((step, index) => <div className="timeline-item" key={step}><span className="timeline-number">0{index + 1}</span><div className="timeline-marker">{index < 4 && <span />}</div><div className="timeline-copy"><h3>{step}</h3><p>{['Tudo começa com uma boa conversa sobre o que você imagina.', 'Medidas, referências e necessidades entram no desenho.', 'Você visualiza a solução e alinha cada escolha com calma.', 'A marcenaria ganha forma com precisão e cuidado.', 'O último detalhe é instalado para que o ambiente se torne seu.'][index]}</p></div></div>)}</div></section>

      <section id="contato" className="quote-section section-pad section-olive"><div className="page-shell quote-grid"><div className="quote-intro"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />Vamos conversar</span><h2>Vamos transformar<br /><em>seu ambiente?</em></h2><p>Conte um pouco sobre o seu projeto e prepare uma solicitação de orçamento personalizada.</p><div className="quote-signature">{business.name}<br /><span>Ambientes planejados</span></div></div><div className="quote-card">{!quoteSubmitted ? <form onSubmit={submitQuote}><div className="form-topline"><span>01</span><span>Seu projeto</span><span className="form-topline-line" /></div><label>Como podemos chamar você?<input required value={quote.name} onChange={(event) => updateQuote('name', event.target.value)} placeholder="Seu nome" /></label><div className="form-row"><label>Tipo de ambiente<select value={quote.environment} onChange={(event) => updateQuote('environment', event.target.value)}>{['Cozinha', 'Dormitório', 'Closet', 'Sala', 'Banheiro', 'Comercial', 'Outro'].map((item) => <option key={item}>{item}</option>)}</select></label><label>Cidade ou bairro<input required value={quote.location} onChange={(event) => updateQuote('location', event.target.value)} placeholder="Ex.: América, Joinville" /></label></div><div className="form-row"><label>Medidas aproximadas<small>se já souber</small><input value={quote.measurements} onChange={(event) => updateQuote('measurements', event.target.value)} placeholder="Ex.: 3 × 4 m" /></label><label>Prazo desejado<select value={quote.timeframe} onChange={(event) => updateQuote('timeframe', event.target.value)}><option>O quanto antes</option><option>Dentro de três meses</option><option>Ainda estou planejando</option></select></label></div><label>Conte um pouco mais <small>opcional</small><textarea value={quote.description} onChange={(event) => updateQuote('description', event.target.value)} placeholder="Fale sobre referências, necessidades ou o que você imagina para o ambiente." rows={3} /></label><button className="button button-sand" type="submit">Continuar <ArrowRight size={16} /></button></form> : <div className="quote-success"><div className="success-icon"><Check size={22} /></div><span className="eyebrow eyebrow-dark">Resumo preparado</span><h3>Seu projeto começa<br /><em>com uma conversa.</em></h3><div className="quote-summary">{quoteMessage.split('\n').map((line, index) => <span key={`${line}-${index}`}>{line || '\u00A0'}</span>)}</div><div className="quote-actions">{whatsappUrl ? <a className="button button-sand" href={whatsappUrl} target="_blank" rel="noreferrer">Enviar pelo WhatsApp <Send size={15} /></a> : <button className="button button-sand" onClick={copyQuote}>{copied ? <><Check size={15} /> Mensagem copiada</> : <><Copy size={15} /> Copiar mensagem</>}</button>}<button className="text-link text-link-dark" onClick={() => setQuoteSubmitted(false)}>Editar informações <ArrowLeft size={15} /></button></div>{isDemo && <p className="demo-notice">Modo demonstração: o envio pelo WhatsApp será ativado após a personalização para a empresa.</p>}</div>}</div></div></section>

      <section className="final-cta"><Image src="/images/final-cta.jpg" alt="Ambiente planejado elegante com marcenaria e luz natural" fill sizes="100vw" /><div className="final-cta-overlay" /><div className="final-cta-content"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />Um convite</span><h2>O próximo ambiente<br /><em>a transformar</em><br />pode ser o seu.</h2><button className="button button-light" onClick={scrollToQuote}>Solicitar meu orçamento <ArrowUpRight size={16} /></button></div></section>

      <footer className="footer"><div className="page-shell"><div className="footer-top"><Logo /><span className="footer-motto">Marcenaria pensada<br />para a vida real.</span><div className="footer-nav">{navItems.slice(0, 5).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-contact"><span>Fale com a gente</span>{business.instagram ? <a href={business.instagram}><Instagram size={15} /> Instagram</a> : <span className="muted">Instagram configurável</span>}{business.whatsapp ? <a href={`https://wa.me/${business.whatsapp}`}><Send size={14} /> WhatsApp</a> : <span className="muted">WhatsApp configurável</span>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>{isDemo ? 'Site demonstrativo · conteúdo ilustrativo' : business.city}</span><a href="#inicio">Voltar ao topo <ChevronUp size={14} /></a></div></div></footer>

      {lightboxIndex !== null && filteredProjects[lightboxIndex] && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria de projetos" onClick={() => setLightboxIndex(null)}><div className="lightbox-inner" onClick={(event) => event.stopPropagation()}><button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Fechar galeria"><X size={22} /></button><div className="lightbox-image"><Image src={filteredProjects[lightboxIndex].image} alt={filteredProjects[lightboxIndex].alt} fill sizes="90vw" /></div><div className="lightbox-caption"><div><span>{filteredProjects[lightboxIndex].eyebrow}</span><h3>{filteredProjects[lightboxIndex].title}</h3><p>{filteredProjects[lightboxIndex].description}</p></div><div className="lightbox-controls"><button onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length)} aria-label="Projeto anterior"><ArrowLeft size={18} /></button><span>{String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}</span><button onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredProjects.length)} aria-label="Próximo projeto"><ArrowRight size={18} /></button></div></div></div></div>}
    </main>
  );
}

function BeforeAfter({ beforeAfter }: { beforeAfter: { before: string; after: string; alt: string } }) {
  const [position, setPosition] = useState(50);
  return <section className="before-after section-pad page-shell"><SectionIntro eyebrow="Transformação" title={<>Veja a diferença<br /><em>nos detalhes.</em></>} /><div className="compare" style={{ '--position': `${position}%` } as React.CSSProperties}><Image src={beforeAfter.after} alt={beforeAfter.alt} fill sizes="90vw" /><div className="compare-before"><Image src={beforeAfter.before} alt={beforeAfter.alt} fill sizes="90vw" /></div><span className="compare-label compare-label-before">Antes</span><span className="compare-label compare-label-after">Depois</span><input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Comparar antes e depois" /></div></section>;
}
