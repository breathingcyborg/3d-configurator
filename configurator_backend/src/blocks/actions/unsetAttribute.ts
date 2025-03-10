import { Block } from "payload/types";

export const UnsetAttributeActionBlock : Block = {
    slug: 'unsetAttributeAction',
    interfaceName: 'UnsetAttributeAction',
    fields: [
        {
            name: 'attributeCode',
            type: 'text',
            required: true,
        },
    ]
}