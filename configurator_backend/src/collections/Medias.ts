import type { CollectionConfig } from 'payload/types'

export const Medias: CollectionConfig = {
  slug: 'medias',
  upload: {
    // relative to payload.config.ts
    staticDir: '../public/uploads',
    staticURL: '/uploads',
    imageSizes: [{ name: 'admin_thumbnail', width: 300, position: 'center' }],
    adminThumbnail: 'admin_thumbnail',
  },
  fields: [{ name: 'alt', type: 'text', required: false }],
  access: {
    read: () => true,
  },
}
