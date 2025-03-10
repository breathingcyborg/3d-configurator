import { CollectionConfig } from "payload/types";
import attributes from '../blocks/attributes';

export const Models : CollectionConfig = {
    slug: 'models',
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'file',
            type: 'upload',
            relationTo: 'medias',
            required: true,
            admin: {
                description: '3d model file in glb format'
            },
        },
        {
            name: 'steps',
            required: true,
            minRows: 1,
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'attributes',
                    type: 'blocks',
                    required: true,
                    minRows: 1,
                    blocks: attributes
                }
            ]
        }
    ],
    access: {
        read: () => true,
    }
}