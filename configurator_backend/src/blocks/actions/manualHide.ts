import { Block } from "payload/types";

export const ManualHideAction : Block = {
    slug: 'manualHide',
    interfaceName: 'ManualHideAction',
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