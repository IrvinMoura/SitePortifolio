export const SITE = {
  name: 'Irvin Marques',
  jobTitle: 'Desenvolvedor',
  description:
    'Irvin Marques, desenvolvedor: sites sob medida, automação de processos e sistemas para pequenos e médios negócios.',
  locale: 'pt-BR',
  // Provisório: trocar por e-mail profissional quando houver domínio (docs/PROJECT_BRIEF.md).
  email: 'irvinmoura27@gmail.com',
  // Só perfis que existem. O ícone de cada um fica em SiteFooter.astro.
  profiles: [
    { label: 'Instagram', href: 'https://www.instagram.com/irvin_marques/' },
    { label: 'GitHub', href: 'https://github.com/IrvinMoura' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/irvinmarques/' },
  ],
} as const;
