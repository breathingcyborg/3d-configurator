import { Block } from "payload/types";
import actions from "../actions";

export const ColorAttributeBlock : Block = {
    slug: 'colorAttribute',
    interfaceName: 'ColorAttribute',
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
            name: 'colors',
            type: 'relationship',
            hasMany: true,
            relationTo: 'colors',
            admin: {
                description: 'Color options available to users'
            }
        },
        {
            name: 'customColors',
            label: 'Allow Custom Colors',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'defaultValue',
            type: 'relationship',
            relationTo: 'colors',
            hasMany: false,
            required: false,
        },
        {
            name: 'actions',
            type: 'blocks',
            blocks: actions,
        }
    ]
}