import * as _ from 'lodash';

const slugify = (text) => _.kebabCase(text);

async function createUniqueSlug(Model, slug, count, filter) {
  const obj = await Model.findOne({ slug: `${slug}-${count}`, ...filter })
    .select('_id')
    .setOptions({ lean: true });

  if (!obj) {
    return `${slug}-${count}`;
  }

  return createUniqueSlug(Model, slug, count + 1, filter);
}

async function generateSlug(Model, name, filter = {}) {
  // generateSlug generates a slug from a name using the slugify method; the variable's name is origSlug
  const origSlug = slugify(name);

  // generateSlug searches our database for a document with slug: origSlug
  const obj = await Model.findOne({ slug: origSlug, ...filter })
    .select('_id')
    .setOptions({ lean: true });

  // if such document does not exist, then the method will deem the generated origSlug as a unique slug
  if (!obj) {
    return origSlug;
  }

  // if such document exists, then generateSlug will call the createUniqueSlug method
  return createUniqueSlug(Model, origSlug, 1, filter);
}

export { generateSlug };