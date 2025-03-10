import { Block } from "payload/types";
import actions from "../actions";

export const PartsAttributeBlock : Block = {
    slug: 'partsAttribute',
    interfaceName: 'PartsAttribute',
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
            name: 'parts',
            type: 'array',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                            admin: {
                                description: 'Name of this part'
                            }
                        },
                        {
                            name: 'code',
                            type: 'text',
                            required: true,
                            admin: {
                                description: 'code for this parts. All parts in this group should have unique code'
                            }
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'medias',
                        }
                    ]
                },
                {
                    name: 'nodes',
                    type: 'array',
                    fields: [
                        { 
                            name: 'name', 
                            type: 'text', 
                            required: true, 
                            admin: { description: 'complete name or pattern. Pattern supports * wildcard' } 
                        }
                    ]
                },
                {
                    name: 'default',
                    type: 'checkbox',
                    required: true,
                    defaultValue: false,
                }
            ],
        },
        {
            name: 'actions',
            type: 'blocks',
            blocks: actions,
        }
    ]
}