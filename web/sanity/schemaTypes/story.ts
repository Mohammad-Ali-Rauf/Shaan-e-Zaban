import {Rule as ValidationRule} from '@sanity/types'

export default {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (Urdu - Nastaliq)',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.custom((text) => {
  const urduRegex = /^[\u0600-\u06FF\s]+$/;
  return urduRegex.test(text as string)
    ? true
    : 'Only Urdu script (Nastaliq) characters are allowed!';
})

    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio' // Optional: makes it look neat
      },
    },
    {
      name: 'sentences',
      title: 'Sentences',
      type: 'array',
      of: [{ type: 'sentence' }],
      validation: (Rule: ValidationRule) => Rule.min(1).error('At least one sentence is required.')
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags' // Optional UI improvement
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      readOnly: true,
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
      ]
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }
  ]
}
