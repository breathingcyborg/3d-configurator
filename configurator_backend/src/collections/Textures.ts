import type { CollectionConfig } from 'payload/types'

const Textures: CollectionConfig = {
  slug: 'textures',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'code',
          type: 'text',
          required: true,
          unique: true,
        },
      ]
    },
    {
      name: 'image',
      type: 'upload',
      required: true,
      relationTo: 'medias',
    },
    {
      name: 'tags',
      type: 'relationship',
      hasMany: true,
      relationTo: 'tags',
    },
  ],
}

export default Textures