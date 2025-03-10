import type { CollectionConfig } from 'payload/types'

export const UserMedias: CollectionConfig = {
  slug: 'user_medias',
  upload: {
    // relative to payload.config.ts
    staticDir: '../public/useruploads',
    staticURL: '/useruploads',
    imageSizes: [{ name: 'admin_thumbnail', width: 300, position: 'center' }],
    adminThumbnail: 'admin_thumbnail',
    mimeTypes: [
      'image/png',
      'image/jpg',
      'image/jpeg',
    ]
  },
  fields: [{ name: 'alt', type: 'text', required: false }],
  access: {
    read: () => true,
    create: () => true,
  },
}
