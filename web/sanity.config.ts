import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'shaan-e-zaban',
  title: 'Shaan-e-Zaban',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "",
  schema: {
    types: schema,
  },
  plugins: [structureTool(), visionTool()],
  studioHost: 'shaan-e-zaban',
  releases: {
    enabled: false
  }
})
