import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { logEntrySchema, memorialSchema } from './content/schemas';

const memoriais = defineCollection({
  loader: glob({ base: './src/content/memoriais', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    memorialSchema
      .extend({
        cover: image().optional(),
        coverAlt: z.string().min(1).optional(),
      })
      .refine((data) => !data.cover || data.coverAlt, {
        message: 'Imagem de capa precisa de coverAlt (texto alternativo).',
        path: ['coverAlt'],
      }),
});

const registro = defineCollection({
  loader: file('./src/content/registro.json'),
  schema: logEntrySchema,
});

export const collections = { memoriais, registro };
