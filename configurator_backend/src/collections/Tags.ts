import type { CollectionConfig } from 'payload/types'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tag',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

export default Tags