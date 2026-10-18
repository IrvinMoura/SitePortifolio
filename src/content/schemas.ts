import { z } from 'astro/zod';

// Regras de honestidade (docs/PROJECT_BRIEF.md) impostas pelo schema:
// natureza obrigatória e métrica sem fonte verificável não passa no build.

export const NATURES = ['cliente', 'academico', 'demonstrativo', 'proprio', 'open-source'] as const;
export const STATUSES = ['em-producao', 'em-andamento', 'prototipo', 'arquivado'] as const;
export const AREAS = ['site', 'sistema', 'dashboard', 'automacao', 'integracao', 'ia'] as const;
export const LOG_TYPES = ['site', 'projeto', 'estudo'] as const;

export const metricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  source: z.url(),
});

export const memorialSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  summary: z.string().min(1).max(200),
  nature: z.enum(NATURES),
  status: z.enum(STATUSES),
  role: z.string().min(1),
  period: z.object({
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
  }),
  areas: z.array(z.enum(AREAS)).min(1),
  stack: z.array(z.string().min(1)).min(1),
  links: z
    .object({
      demo: z.url().optional(),
      repo: z.url().optional(),
    })
    .default({}),
  metrics: z.array(metricSchema).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  updated: z.coerce.date(),
});

export const logEntrySchema = z.object({
  date: z.coerce.date(),
  type: z.enum(LOG_TYPES),
  title: z.string().min(1),
  link: z.string().optional(),
});

export type MemorialData = z.infer<typeof memorialSchema>;
export type LogEntryData = z.infer<typeof logEntrySchema>;
