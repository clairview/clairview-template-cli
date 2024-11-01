import slugify from 'slugify'

export const generatePackageJsonContent = (templateName: string) => {
  const slugifiedName = slugify(templateName, {
    lower: true, // Convert to lowercase
    strict: true, // Remove special characters
  })

  const packageName = `clairview-template-${slugifiedName}`

  return JSON.stringify(
    {
      author: '',
      description: '',
      clairviewTemplate: true,
      files: ['src'],
      name: packageName,
      templateName,
      version: '1.0.0',
    },
    null,
    2,
  )
}

export const generateReadmeContent = (templateName: string) => `# ${templateName} Template

This is a template for [Clairview](https://clairview.io/) - an open-source headless CMS and API. Use the template-cli to load / apply this template to a blank instance.

## Why

## What

## License

`
