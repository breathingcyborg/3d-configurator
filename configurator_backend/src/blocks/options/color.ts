import { Block } from "payload/types";
import actions from "../actions";

export const ColorOptionBlock : Block = {
    slug: 'color',
    interfaceName: 'ColorOption',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'default',
            type: 'checkbox',
            required: false,
        },
        {
            name: 'code',
            type: 'text',
            required: true,
            admin: {
                description: 'The code of this shade of color',
            }
        },
        {
            name: 'colorCode',
            type: 'text',
            required: true,
            admin: {
                description: 'the color code in hex format'
            }
        },
        {
            name: 'actions',
            type: 'blocks',
            required: true,
            blocks: actions,
        }
    ]
}
