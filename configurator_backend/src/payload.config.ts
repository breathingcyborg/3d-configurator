import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import { Medias } from './collections/Medias'
import { Models } from './collections/Models'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import { UserMedias } from './collections/UserMedia'
import Tags from './collections/Tags'
import Textures from './collections/Textures'
import Colors from './collections/Colors'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Medias,
    Models,
    UserMedias,
    Tags,
    Textures,
    Colors,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    nestedDocs({
      collections: ['categories'],
      generateLabel: (_, doc) => (doc.title || doc.name) as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
