const Airtable = require('airtable')

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)

const table = base(AIRTABLE_TABLE_NAME)

const getAllProjects = async () => {
  const projects = await table.select({}).firstPage()
  return projects.map(({ id, fields }) => transformResponse(id, fields))
}

const getProject = async (input) => {
  const project = await table.find(input.id)
  const { id, fields } = project
  return transformResponse(id, fields)
}

const addProject = async (input) => {
  const { name, description, date } = input.project
  const project = await table.create([
    {
      fields: {
        name,
        description,
        date,
      },
    },
  ])
  const { id, fields } = project[0]
  return transformResponse(id, fields)
}

const updateProject = async (input) => {
  const project = await table.update([
    {
      fields: input.project,
    },
  ])
  const { id, fields } = project[0]
  return transformResponse(id, fields)
}

const transformResponse = (id, fields) => ({
  id,
  name: fields.name,
  description: fields.description,
  date: fields.date,
})

exports.getAllProjects = getAllProjects
exports.getProject = getProject
exports.addProject = addProject
exports.updateProject = updateProject
