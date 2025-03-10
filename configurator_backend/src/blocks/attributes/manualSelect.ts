import { Block } from "payload/types";
import options from "../options";

export const ManualSelectAttributeBlock : Block = {
    slug: 'manualSelectAttribute',
    interfaceName: 'ManualSelectAttribute',
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
            name: 'options',
            type: 'blocks',
            required: true,
            minRows: 1,
            blocks: options
        },
    ]
}