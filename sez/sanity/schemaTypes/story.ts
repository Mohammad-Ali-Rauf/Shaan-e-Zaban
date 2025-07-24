

export default {
    name: 'story',
    title: 'Story',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
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
                list: ['beginner', 'intermediate', 'advanced'],
            },
        },
        {
            name: 'sentences',
            title: 'Sentences',
            type: 'array',
            of: [{ type: 'sentence' }],
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
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
    ],
}
