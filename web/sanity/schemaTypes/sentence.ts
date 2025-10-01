export default {
  name: 'sentence',
  title: 'Sentence',
  type: 'object',
  fields: [
    {
      name: 'urdu',
      title: 'Urdu Sentence',
      type: 'string',
    },
    {
      name: 'english',
      title: 'English Translation',
      type: 'string',
    },
    {
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
    },
    {
      name: 'words',
      title: 'Words in Sentence',
      type: 'array',
      of: [{ type: 'word' }],
    },
  ],
}
