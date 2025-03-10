import type { CollectionConfig } from 'payload/types'

const Colors: CollectionConfig = {
  slug: 'colors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique name for this color',
      }
    },
    {
      name: 'colorCode',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

export default Colors