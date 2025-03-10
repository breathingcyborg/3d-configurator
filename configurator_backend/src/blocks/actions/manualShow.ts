import { Block } from "payload/types";

export const ManualShowAction : Block = {
    slug: 'manualShow',
    interfaceName: 'ManualShowAction',
    fields: [
        {
            name: 'nodes',
            type: 'array',
            fields: [
                { name: 'name', type: 'text', required: true }
            ]
        },
    ]
}