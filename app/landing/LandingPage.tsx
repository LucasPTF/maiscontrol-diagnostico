"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  bonuses,
  discoveries,
  evidence,
  faqs,
  forYou,
  heroAngles,
  leaks,
  modules,
  notForYou,
  offerItems,
  siteConfig,
  timeline,
} from "./content";

type Angle = 1 | 2 | 3;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function track(event: string, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...detail });
}

function checkoutHref() {
  if (typeof window === "undefined" || siteConfig.checkoutUrl.startsWith("#")) return siteConfig.checkoutUrl;
  const target = new URL(siteConfig.checkoutUrl, window.location.origin);
  const current = new URLSearchParams(window.location.search);
  current.forEach((value, key) => {
    if (key.startsWith("utm_") && !target.searchParams.has(key)) target.searchParams.set(key, value);
  });
  return target.toString();
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " light" : ""}`}><span aria-hidden="true" />{children}</p>;
}

function CTA({ children, source, small = false }: { children: React.ReactNode; source: string; small?: boolean }) {
  return (
    <a
      className={`cta${small ? " small" : ""}`}
      href={checkoutHref()}
      onClick={() => track("cta_click", { source })}
      data-track={`cta-${source}`}
    >
      <span>{children}</span><b aria-hidden="true">→</b>
    </a>
  );
}

function PhotoPlaceholder({ kind }: { kind: "hero" | "profile" }) {
  const configuredPhoto = kind === "hero" ? siteConfig.expertPhotoHero : siteConfig.expertPhotoProfile;
  if (configuredPhoto) {
    return <img src={configuredPhoto} alt={kind === "hero" ? "Wellington Camaleão na abertura da aula" : "Wellington Camaleão, empresário e criador do MaisControl"} />;
  }
  return (
    <div className={`photo-placeholder ${kind}`} role="img" aria-label="Espaço reservado para foto real de Wellington Camaleão">
      <div className="photo-grid" aria-hidden="true" />
      <div className="photo-monogram" aria-hidden="true">WC</div>
      <p><strong>Foto do Wellington</strong><span>espaço preparado para a imagem real</span></p>
    </div>
  );
}

function DiagnosticPanel() {
  return (
    <div className="diagnostic-card" aria-label="Exemplo ilustrativo do painel de diagnóstico">
      <div className="panel-top"><span>Diagnóstico empresarial</span><b>EXEMPLO</b></div>
      <div className="panel-score">
        <div><small>Área prioritária</small><strong>CAIXA</strong></div>
        <div className="score-ring"><span>72</span><small>/100</small></div>
      </div>
      <div className="mini-bars">
        {[["Caixa", 82], ["Estoque", 61], ["Vendas", 47], ["Fiscal", 35]].map(([label, value]) => (
          <div key={label as string}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><small>{value}</small></div>
        ))}
      </div>
      <div className="panel-action"><span>Próximo passo recomendado</span><strong>Conferir entradas e saídas dos últimos 30 dias</strong></div>
      <small className="illustrative">Exemplo ilustrativo de diagnóstico.</small>
    </div>
  );
}

export function LandingPage() {
  const [angle, setAngle] = useState<Angle>(siteConfig.selectedAngle as Angle);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileCta, setMobileCta] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const hero = useMemo(() => heroAngles[angle], [angle]);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Diagnóstico dos 4 Furos do Balde",
    description: "Aula ao vivo e prática de 2h30 com Wellington Camaleão para identificar o principal vazamento da empresa e definir três ações iniciais.",
    brand: { "@type": "Brand", name: "MaisControl" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: "29.90",
      availability: "https://schema.org/InStock",
      url: siteConfig.canonicalUrl || "https://maiscontrol.com.br",
    },
  };

  useEffect(() => {
    const value = Number(new URLSearchParams(window.location.search).get("angulo"));
    if (value === 1 || value === 2 || value === 3) setAngle(value);
    track("page_view", { angle: value === 1 || value === 2 || value === 3 ? value : 3 });

    const depths = new Set<number>();
    const onScroll = () => {
      setMobileCta(window.scrollY > (heroRef.current?.offsetHeight ?? window.innerHeight) * 0.75);
      const page = document.documentElement.scrollHeight - window.innerHeight;
      const progress = page > 0 ? Math.round((window.scrollY / page) * 100) : 0;
      [25, 50, 75, 90].forEach((depth) => {
        if (progress >= depth && !depths.has(depth)) {
          depths.add(depth);
          track("scroll_depth", { depth });
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="MaisControl — início">
          <span className="brand-symbol" aria-hidden="true">M+</span>
          <span><strong>MaisControl</strong><small>gestão que começa pelo diagnóstico</small></span>
        </a>
        <a className="header-link" href="#metodo">Os 4 Furos</a>
        <CTA source="header" small>GARANTIR MINHA VAGA</CTA>
      </header>

      <section className="hero" id="inicio" ref={heroRef}>
        <div className="hero-glow one" aria-hidden="true" /><div className="hero-glow two" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="live-label"><i /> AULA AO VIVO <span>•</span> 2H30 <span>•</span> DIAGNÓSTICO PRÁTICO</p>
            <h1>{hero.headline}</h1>
            <p className="hero-subheadline">{hero.subheadline}</p>
            <ul className="hero-benefits">
              <li>Descubra seu maior vazamento.</li>
              <li>Calcule a hemorragia em reais.</li>
              <li>Saia com três ações práticas.</li>
            </ul>
            <div className="hero-action">
              <CTA source="hero">{hero.cta}</CTA>
              <div className="hero-price"><small>investimento único</small><strong>{siteConfig.price}</strong></div>
            </div>
            <p className="secure-line"><span>✓</span> Compra segura <i /> Garantia de 7 dias <i /> Próxima turma ao vivo</p>
          </div>
          <div className="hero-media">
            <div className="hero-photo-shell"><PhotoPlaceholder kind="hero" /></div>
            <div className="diagnosis-stamp"><small>DIAGNÓSTICO</small><strong>antes da solução</strong></div>
            <div className="leak-chip"><i /> maior vazamento: <b>caixa</b></div>
            <div className="photo-tag"><strong>Wellington Camaleão</strong><span>Empresário · criador do MaisControl</span></div>
          </div>
        </div>
        <div className="angle-switcher" aria-label="Variações da mensagem principal">
          <span>Ângulo do anúncio</span>{([1, 2, 3] as Angle[]).map((item) => <a key={item} className={angle === item ? "active" : ""} href={`?angulo=${item}`} aria-label={`Ver ângulo ${item}`}>{item}</a>)}
        </div>
      </section>

      <section className="trust-strip" aria-label="Resumo da aula"><div className="container">
        <p><strong>2h30</strong><span>de aula ao vivo e prática</span></p><i />
        <p><strong>4 áreas</strong><span>caixa, estoque, vendas e fiscal</span></p><i />
        <p><strong>3 ações</strong><span>para saber por onde começar</span></p><i />
        <p><strong>7 dias</strong><span>de garantia incondicional</span></p>
      </div></section>

      <section className="section pain">
        <div className="container">
          <Eyebrow>FATURA TODO MÊS. MAS O DINHEIRO SOME.</Eyebrow>
          <div className="heading-split"><h2>Sua empresa funciona. <em>Mas você continua sem enxergar o que está acontecendo.</em></h2><p>Você vende, paga equipe, fornecedores e impostos. Resolve tudo. No fim do mês, ainda falta uma resposta simples: quanto realmente sobrou?</p></div>
          <div className="before-after">
            {[
              ["Sistema antigo, caderno paralelo e caixa que nunca bate.", "Diagnóstico claro dos 4 Furos do Balde."],
              ["Você decide no chute e confere três números diferentes.", "Você sabe onde o dinheiro está vazando."],
              ["Culpa por não conseguir ‘dar conta’.", "Clareza do caminho que ainda não tentou."],
            ].map(([before, after], i) => <article key={before}><span>0{i + 1}</span><div className="before"><small>ANTES</small><p>{before}</p></div><b aria-hidden="true">→</b><div className="after"><small>DEPOIS</small><p>{after}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section mechanism" id="metodo">
        <div className="container">
          <Eyebrow light>DIAGNÓSTICO DOS 4 FUROS DO BALDE</Eyebrow>
          <div className="heading-split light"><h2>Vender mais não resolve um balde que <em>continua furado.</em></h2><p>Sua empresa coloca dinheiro para dentro todos os dias. O diagnóstico mostra onde parte dele pode estar escapando — e onde olhar primeiro.</p></div>
          <div className="leak-grid">{leaks.map((leak) => <article key={leak.title} className={leak.title === "Caixa" ? "priority" : ""}><div className="leak-top"><span>{leak.icon}</span><small>{leak.key}</small></div><h3>{leak.title}</h3><p>{leak.text}</p><div className="status"><i /> {leak.status}</div></article>)}</div>
          <div className="flow"><span>Diagnóstico</span><b>→</b><span>Clareza</span><b>→</b><span>Prioridade</span><b>→</b><span>Implantação</span></div>
        </div>
      </section>

      <section className="section discover">
        <div className="container discover-layout">
          <div className="discover-copy"><Eyebrow>VOCÊ VAI SABER ONDE COMEÇAR</Eyebrow><h2>Em 2h30, pare de perguntar <em>“por onde eu começo?”</em></h2><div className="check-list">{discoveries.map((item) => <p key={item}><span>✓</span>{item}</p>)}</div></div>
          <DiagnosticPanel />
        </div>
      </section>

      <section className="section how">
        <div className="container">
          <div className="center-heading"><Eyebrow>SEM PRECISAR ENTENDER ERP</Eyebrow><h2>Você só precisa responder sobre <em>a sua empresa.</em></h2></div>
          <div className="steps">{[
            ["01", "Responda ao quiz", "Perguntas simples sobre caixa, estoque, vendas e fiscal."],
            ["02", "Enxergue os vazamentos", "O diagnóstico mostra onde você perde controle e estima a hemorragia."],
            ["03", "Descubra o primeiro passo", "Saia sabendo qual furo atender e quais ações iniciar."],
          ].map(([n, title, text]) => <article key={n}><span>{n}</span><div className="step-icon" aria-hidden="true">{n === "01" ? "?" : n === "02" ? "⌁" : "→"}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section beliefs">
        <div className="container beliefs-layout">
          <div><Eyebrow light>VOCÊ NÃO FALHOU. O CAMINHO FALHOU.</Eyebrow><h2>Talvez tenham feito você começar <em>pelo lugar errado.</em></h2><p className="belief-intro">Mais um login não conserta uma operação que ninguém ajudou a diagnosticar.</p></div>
          <div className="belief-cards">{[
            ["Você não falhou porque ‘não tem cabeça para sistema’.", "Sistema genérico sem implantação costuma virar abandono."],
            ["Ter tudo na cabeça não é controle. É risco.", "Se a empresa para quando você sai, ela ainda depende demais de você."],
            ["O caos não espera o movimento acalmar.", "Ele diminui quando você descobre o que organizar primeiro."],
          ].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
        <p className="belief-closer">Diagnóstico vem antes da solução.</p>
      </section>

      <section className="section live-class" id="aula">
        <div className="container">
          <div className="heading-split"><div><Eyebrow>A AULA</Eyebrow><h2>Não é palestra motivacional. <em>É diagnóstico aplicado à sua empresa.</em></h2></div><p>Uma aula ao vivo e prática para donos de PMEs descobrirem onde o dinheiro está vazando e qual furo precisa ser tampado primeiro. Você olha para sua realidade e responde com honestidade.</p></div>
          <div className="class-band">{["Aula ao vivo", "2h30 de duração", "Quiz aplicado", "Demonstração real", "Diagnóstico", "3 ações práticas"].map((item, i) => <span key={item}><b>{String(i + 1).padStart(2, "0")}</b>{item}</span>)}</div>
          <div className="modules"><div className="module-title"><small>CONTEÚDO DA AULA</small><h3>O que você vai aprender</h3></div>{modules.map(([n, title, text]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section mentor" id="wellington">
        <div className="container mentor-layout">
          <div className="profile-photo"><PhotoPlaceholder kind="profile" /><div className="profile-seal"><strong>2018</strong><span>gestão testada<br />na própria empresa</span></div></div>
          <div className="mentor-copy"><Eyebrow>QUEM CONDUZ</Eyebrow><h2>Wellington não fala de gestão como palestrante. <em>Ele fala como empresário.</em></h2><div className="timeline">{timeline.map(([year, title, text]) => <article key={year}><span>{year}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><a className="text-link" href="https://www.instagram.com/wellington.ltda/" target="_blank" rel="noreferrer">Conheça @wellington.ltda <span>↗</span></a></div>
        </div>
      </section>

      <section className="section proof">
        <div className="container"><Eyebrow>PROVAS DE OPERAÇÃO</Eyebrow><div className="heading-split"><h2>Antes de virar uma oferta, o MaisControl precisou <em>funcionar no mundo real.</em></h2><p>Sem estrelas inventadas. Sem personagens fictícios. Apenas fatos operacionais apresentados com transparência.</p></div><div className="proof-grid">{evidence.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><p className="evidence-note">Os primeiros depoimentos formais da nova turma ainda serão coletados. Por isso, esta página utiliza apenas fatos e provas operacionais verificáveis.</p></div>
      </section>

      <section className="section bonus">
        <div className="container"><div className="center-heading"><Eyebrow>ENTREGÁVEIS</Eyebrow><h2>Ferramentas para você <em>não voltar ao escuro.</em></h2></div><div className="bonus-grid">{bonuses.map(([title, text, tag], i) => <article key={title}><div className={`bonus-mock mock-${i}`}><span>{tag}</span><i aria-hidden="true" /></div><small>BÔNUS {String(i + 1).padStart(2, "0")}</small><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="section urgency"><div className="container urgency-layout"><div><Eyebrow light>O CUSTO DE ADIAR</Eyebrow><h2>Esperar o movimento acalmar é esperar o balde <em>parar de vazar sozinho.</em></h2></div><div className="urgency-copy"><p>Cada mês no escuro pode custar dinheiro.</p><p>Trocar de sistema sem diagnóstico pode virar mais uma tentativa abandonada.</p><p>Sua equipe não opera melhor se tudo continua preso na sua cabeça.</p><strong>Você não precisa resolver toda a empresa hoje. Precisa descobrir onde começar.</strong></div></div></section>

      <section className="section audience"><div className="container"><div className="center-heading"><Eyebrow>PARA QUEM É</Eyebrow><h2>Esta decisão faz sentido <em>para a sua empresa?</em></h2></div><div className="audience-grid"><article className="yes"><p className="audience-label"><span>✓</span> É PARA VOCÊ SE...</p><ul>{forYou.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="no"><p className="audience-label"><span>×</span> NÃO É PARA VOCÊ SE...</p><ul>{notForYou.map((item) => <li key={item}>{item}</li>)}</ul></article></div></div></section>

      <section className="section comparison"><div className="container"><Eyebrow light>O DIFERENCIAL</Eyebrow><div className="heading-split light"><h2>A maioria começa vendendo sistema. <em>O MaisControl começa mostrando o problema.</em></h2><p>Você não começa trocando tudo. Começa descobrindo o que precisa mudar primeiro.</p></div><div className="comparison-grid"><article><small>CAMINHO COMUM</small>{["Compra um sistema", "Recebe um login", "Tenta configurar sozinho", "Mantém a planilha paralela", "A equipe não adere", "Abandona"].map((item) => <p key={item}><span>×</span>{item}</p>)}</article><article className="mc-path"><small>CAMINHO MAISCONTROL</small>{["Diagnóstico", "Clareza", "Maior furo", "Ordem de prioridade", "Decisão consciente", "Implantação acompanhada, se fizer sentido"].map((item) => <p key={item}><span>✓</span>{item}</p>)}</article></div></div></section>

      <section className="section offer" id="checkout"><div className="container offer-layout"><div className="offer-copy"><Eyebrow light>A PRÓXIMA TURMA AO VIVO</Eyebrow><h2>Por R$29,90, você compra clareza antes de investir em <em>qualquer implantação.</em></h2><p>Como Ter Controle Total da Sua Empresa em 7 Dias — descubra onde o dinheiro está vazando e tampe os furos antes que o balde esvazie.</p><div className="offer-list">{offerItems.map((item) => <span key={item}><i>✓</i>{item}</span>)}</div></div><article className="price-card"><p className="availability"><i /> Próxima turma ao vivo</p><small>INVESTIMENTO ÚNICO</small><div className="big-price"><span>R$</span><strong>29</strong><b>,90</b></div><p className="date-note">{siteConfig.eventTime}.</p><CTA source="offer">GARANTIR MINHA VAGA POR R$29,90</CTA><p className="secure-line dark"><span>✓</span> Aula ao vivo <i /> Compra segura <i /> Garantia de 7 dias</p><div className="checkout-placeholder"><span>Checkout será conectado aqui</span><small>Todos os botões já usam a mesma configuração.</small></div></article></div></section>

      <section className="section guarantee"><div className="container guarantee-layout"><div className="guarantee-badge"><span>7</span><strong>DIAS</strong><small>GARANTIA<br />INCONDICIONAL</small></div><div><Eyebrow>DECIDA COM TRANQUILIDADE</Eyebrow><h2>Você tem 7 dias para ver se <em>a entrega faz sentido.</em></h2><p>Assista à aula. Conheça o diagnóstico. Se entender que não foi para você, solicite o reembolso dentro de 7 dias e receba de volta o valor pago.</p><strong>Sem pegadinha. Sem precisar provar nada.</strong></div></div></section>

      <section className="section faq" id="faq"><div className="container faq-layout"><div className="faq-heading"><Eyebrow>PERGUNTAS FREQUENTES</Eyebrow><h2>Clareza antes de <em>dar o primeiro passo.</em></h2><p>O que a aula entrega, como funciona e o que não está incluído.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => { const isOpen = openFaq === index; return <article key={question} className={isOpen ? "open" : ""}><h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-${index}`} onClick={() => { setOpenFaq(isOpen ? null : index); track("faq_open", { question, open: !isOpen }); }}><span>{question}</span><b aria-hidden="true">+</b></button></h3><div className="faq-answer" id={`faq-${index}`}><p>{answer}</p></div></article>; })}</div></div></section>

      <section className="final-cta"><div className="final-lines" aria-hidden="true" /><div className="container"><Eyebrow light>COMECE PELO FURO</Eyebrow><h2>Você já tentou organizar sozinho. <em>Agora comece pelo diagnóstico.</em></h2><p>Entre na aula, descubra onde o dinheiro está vazando e saia com clareza sobre o primeiro furo que precisa ser tampado.</p><CTA source="final">GARANTIR MINHA VAGA POR R$29,90</CTA><small>Compra segura • Garantia incondicional de 7 dias</small></div></section>

      <footer><div className="container footer-top"><a className="brand" href="#inicio"><span className="brand-symbol">M+</span><span><strong>MaisControl</strong><small>gestão que começa pelo diagnóstico</small></span></a><div className="footer-links"><a href="https://maiscontrol.com.br" target="_blank" rel="noreferrer">Site oficial</a><a href="https://www.instagram.com/wellington.ltda/" target="_blank" rel="noreferrer">@wellington.ltda</a><a href="#legal">Termos de Uso</a><a href="#legal">Política de Privacidade</a></div></div><div className="container footer-bottom" id="legal"><p>Os resultados dependem da realidade, das decisões e da execução de cada empresa. Esta aula entrega diagnóstico e direção; não promete resultado financeiro garantido. Os links legais estão preparados para receber as páginas oficiais.</p><span>© 2026 MaisControl</span></div></footer>

      <div className={`mobile-sticky${mobileCta ? " visible" : ""}`}><span>Aula ao vivo<strong>R$29,90</strong></span><CTA source="mobile" small>GARANTIR VAGA</CTA></div>
    </main>
  );
}
