import { Block } from "payload/types";
import actions from "../actions";

export const TextOptionBlock : Block = {
    slug: 'text',
    interfaceName: 'TextOption',
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
            name: 'image',
            type: 'upload',
            relationTo: 'medias',
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
            name: 'actions',
            type: 'blocks',
            required: true,
            blocks: actions,
        }
    ]
}
