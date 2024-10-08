// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
  file,
} from "@keystone-6/core/fields";

// the document field is a more complicated field, so it has it's own package
import { document } from "@keystone-6/fields-document";
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from ".keystone/types";

export const lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: "unique",
      }),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" },
      }),
    },
  }),

  Artist: list({
    access: allowAll,
    fields: {
      legacyId: text(),
      name: text(),
    },
  }),

  Genre: list({
    access: allowAll,
    fields: {
      legacyId: text(),
      name: text(),
    },
  }),

  Release: list({
    access: allowAll,
    fields: {
      legacyId: text(),
      title: text(),
      slug: text({ isIndexed: "unique", isFilterable: true }),
      publishedDate: timestamp({
        defaultValue: { kind: "now" },
      }),
      image: image({
        storage: "release_image",
      }),
      description: text(),
      artist: relationship({ ref: "Artist" }),
      tracks: relationship({ ref: "Track", many: true }),
      genres: relationship({ ref: "Genre", many: true }),
    },
  }),

  Track: list({
    access: allowAll,
    fields: {
      legacyId: text(),
      title: text(),
      artist: relationship({ ref: "Artist" }),
      mp3: file({ storage: "track_mp3" }),
    },
  }),
} satisfies Lists;
