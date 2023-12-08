import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';


export const client = sanityClient({
    projectId:'koen16s4',
    dataset:'production',
    apiVersion: '2023-12-05',
    useCdn: true,
    token:'skRW2xNgbo43VeCJYiM8Rj0h06BC0m6eqvfIpqnO5OHmp7Zq5xhcCScPYTgDPab4YYO20qaT2fVQfzVek5QsMnygnGBHyuMLN7mmT3AlHPn61jyPyKi0Ue7IvkPUlhvrqoW5fatJ1uD5Rji7c5gwS6u47j1xDXcEwBzEbiHXPq3z3oM3NQhd'

})
  const builder = imageUrlBuilder(client);

  export const urlFor = (source) => builder.image(source);