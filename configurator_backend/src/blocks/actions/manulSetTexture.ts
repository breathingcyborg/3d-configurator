import { Block } from "payload/types";
import { wrapOptions } from "./options/wrapOptions";


export const ManualSetTextureAction : Block = {
    slug: 'manualSetTextureAction',
    interfaceName: 'ManualSetTextureAction',
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
                    name: 'colorMap',
                    type: 'upload',
                    relationTo: 'medias',
                    required: true,
                },
                {
                    name: 'color',
                    type: 'text',
                    required: false,
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'aoMap',
                    type: 'upload',
                    relationTo: 'medias',
                    required: false,
                },
                {
                    name: 'aoIntensity',
                    type: 'number',
                    required: false,
                }
            ]
        },
        {
            type: 'row', 
            fields: [
                {
                    name: 'displacementMap',
                    type: 'upload',
                    relationTo: 'medias',
                    required: false,
                },
                {
                    name: 'displacementScale',
                    type: 'number',
                    required: false,
                    min: 0,
                }
            ]
        },
        {
            name: 'normalMap',
            type: 'upload',
            relationTo: 'medias',
            required: false,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'normalScaleX',
                    type: 'number',
                    required: false,
                    defaultValue: 1,
                },
                {
                    name: 'normalScaleY',
                    type: 'number',
                    required: false,
                    defaultValue: 1,
                },
            ]
        },
        {
            type: 'row', 
            fields: [
                {
                    name: 'roughnessMap',
                    type: 'upload',
                    relationTo: 'medias',
                    required: false,
                },
                {
                    name: 'roughness',
                    type: 'number',
                    required: false,
                    min: 0,
                }
            ]
        },
        {
            type: 'row', 
            fields: [
                {
                    name: 'metalnessMap',
                    type: 'upload',
                    relationTo: 'medias',
                    required: false,
                },
                {
                    name: 'metalness',
                    type: 'number',
                    required: false,
                    min: 0,
                }
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'bumpMap',
                    type: 'upload',
                    relationTo: 'medias',
                    required: false,
                },
                {
                    name: 'bumpScale',
                    type: 'number',
                    required: false,
                    defaultValue: 1,
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'emissiveMap',
                    type: 'upload',
                    relationTo: 'medias',
                    required: false,
                },
                {
                    name: 'emissiveColor',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'emissiveIntensity',
                    type: 'number',
                    required: false,
                },
            ]
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
                    defaultValue: wrapOptions[0].value,
                },
                {
                    name: 'wrapT',
                    type: 'select',
                    options: wrapOptions,
                    admin: {
                        description: 'Texture Wrap Mode in Vertical Direction',
                    },
                    required: true,
                    defaultValue: wrapOptions[0].value,
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
                    defaultValue: 1,
                },
                {
                    name: 'repeatY',
                    type: 'number',
                    min: 1,
                    required: true,
                    admin: {
                        description: 'How many time to repeat vertically',
                    },
                    defaultValue: 1,
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