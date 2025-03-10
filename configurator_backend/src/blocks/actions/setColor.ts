import { Block } from "payload/types";

export const SetColorAction : Block = {
    slug: 'setColorAction',
    interfaceName: 'SetColorAction',
    fields: [
        {
            name: 'materials',
            type: 'array',
            fields: [
                { name: 'name', type: 'text', required: true }
            ],
        },
    ]
}