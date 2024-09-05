import { defineField, defineType, SanityDocument } from 'sanity';

export const newsType = defineType({
    name: 'news',
    title: 'Nyheter',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Rubrik',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            // hidden: ({document}) => !document?.name,
            validation: (rule) => rule
                .required()
                .error("required to generate a page on the website"),
            options: {
                source: 'title',
                slugify: input => input 
                    .slice(0, 200)
                    .toLowerCase()
                    .replaceAll(/\s+/g, '-')
                    .replaceAll(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g, '')
                    .replaceAll(/-{2,}/g, '')
                    .replaceAll(/[æÆ]/g, 'ae')
                    .replaceAll(/[åÅäÄ]/g, 'a')
                    .replaceAll(/[öÖøØ]/g, 'o')
            },
        }),
        {
            name: 'images',
            type: 'array',
            of: [
                defineField({
                    name: 'image',
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternativ text för skärmläsare',
                        },
                        {
                            name: 'position',
                            title: 'Bildens position',
                            type: 'array',
                            of: [{type: "string"}],
                            options: {
                                list: [
                                    {title: "Högst upp", value: "top"},
                                    {title: "Mitten", value: "middle"},
                                    {title: "Längst ner", value: "bottom"},
                                    {title: "Till höger", value: "right"},
                                    {title: "Till vänster", value: "left"},
                                    {title: "Centrerad", value: "center"}
                                ]
                            }
                        },
                    ],
                }),
            ],
            options: {
                layout: 'grid',
            },
        },
        defineField({
            name: 'content',
            title: 'Innehåll', 
            type: 'array', 
            of: [{type: 'block'}],
            description: 'Sidans innehåll. Obs, det är för närvarande en bug (aug 2024) som gör att det inte går att copy-pastea i firefox.',
            validation: (rule) => rule.required(),
        }),
    ],
   
})

function get(doc: SanityDocument, arg1: string) {
    throw new Error('Function not implemented.')
}
