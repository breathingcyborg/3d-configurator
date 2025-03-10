import { Block } from "payload/types";

export const SetUserImage : Block = {
    slug: 'setUserImage',
    interfaceName: 'SetUserImageAction',
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'width',
                    type: 'number',
                    admin: {
                        description: 'Width of texture image',
                    },
                    min: 1,
                    required: true,
                },
                {
                    name: 'height',
                    type: 'number',
                    min: 1,
                    required: true,
                    admin: {
                        description: 'Height of texture image',
                    },
                },
            ]
        },
        {
            name: 'material',
            type: 'text',
            required: true,
            admin: {
                description: 'Material whose image we need to set',
            },
        },
    ]
}