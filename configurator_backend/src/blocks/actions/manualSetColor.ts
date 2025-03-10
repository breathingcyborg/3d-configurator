import { Block } from "payload/types";

export const ManualSetColorAction : Block = {
    slug: 'manualSetColor',
    interfaceName: 'ManualSetColorAction',
    fields: [
        {
            name: 'materials',
            type: 'array',
            fields: [
                { name: 'name', type: 'text', required: true }
            ],
        },
        {
            name: 'colorCode',
            type: 'text',
            required: true,
        },
    ]
}