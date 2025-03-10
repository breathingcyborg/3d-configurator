import { Block } from "payload/types";
import { wrapOptions } from "./options/wrapOptions";

export const SetTexture : Block = {
    slug: 'setTexture',
    interfaceName: 'SetTextureAction',
    fields: [
        {
            name: 'materials',
            type: 'array',
            fields: [
                { name: 'name', type: 'text', required: true }
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'wrapS',
                    type: 'select',
                    options: wrapOptions,
                    admin: {
                        description: 'Texture Wrap Mode in Horizontal Direction',
                    },
                    required: true,
                },
                {
                    name: 'wrapT',
                    type: 'select',
                    options: wrapOptions,
                    admin: {
                        description: 'Texture Wrap Mode in Vertical Direction',
                    },
                    required: true,
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'repeatX',
                    type: 'number',
                    admin: {
                        description: 'How many time to repeat horizontally',
                    },
                    min: 1,
                    required: true,
                },
                {
                    name: 'repeatY',
                    type: 'number',
                    min: 1,
                    required: true,
                    admin: {
                        description: 'How many time to repeat vertically',
                    },
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'offsetX',
                    type: 'number',
                    admin: {
                        description: 'horizontal offset (between 0-1)',
                    },
                    min: 0,
                    max: 1,
                    defaultValue: 0,
                    required: true,
                },
                {
                    name: 'offsetY',
                    type: 'number',
                    min: 0,
                    max: 1,
                    defaultValue: 0,
                    required: true,
                    admin: {
                        description: 'vertical offset (between 0-1)',
                    },
                },
            ]
        },
    ]
}