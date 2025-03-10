import { Block } from "payload/types";
import actions from "../actions";

export const TextureAttributeBlock : Block = {
    slug: 'textureAttribute',
    interfaceName: 'TextureAttribute',
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'code',
                    type: 'text',
                    required: true,
                },
            ]
        },
        {
            name: 'tags',
            type: 'relationship',
            hasMany: true,
            relationTo: 'tags',
            admin: {
                description: 'Textures with this tags would be shown to the user'
            }
        },
        {
            name: 'defaultValue',
            type: 'relationship',
            required: false,
            relationTo: 'textures',
        },
        {
            name: 'actions',
            type: 'blocks',
            blocks: actions,
        }
    ]
}