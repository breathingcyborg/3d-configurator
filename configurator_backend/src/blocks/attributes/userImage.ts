import { Block } from "payload/types";
import actions from "../actions";

export const UserImageAttributeBlock : Block = {
    slug: 'userImage',
    interfaceName: 'UserImageAttribute',
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
            name: 'actions',
            type: 'blocks',
            blocks: actions,
        }
    ]
}