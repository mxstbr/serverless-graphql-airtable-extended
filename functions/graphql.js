const { ApolloServer, gql } = require('apollo-server-lambda')
const { getAllProjects, addProject, updateProject } = require('./utils/airtable')

const typeDefs = gql`
  type Project {
    id: ID
    name: String
    description: String
    date: String
  }

  input AddProjectInput {
    name: String
    description: String
    date: String
  }

  input UpdateProjectInput {
    id: ID
    name: String
    description: String
    date: String
  }

  type Mutation {
    addProject(project: AddProjectInput): Project
    updateProject(project: UpdateProjectInput): Project
  }

  type Query {
    projects: [Project]
  }
`

const resolvers = {
  Query: {
    projects: () => {
      return getAllProjects()
    },
  },
  Mutation: {
    updateProject: (_, args) => {
      return updateProject(args)
    },
    addProject: (_, args) => {
      return addProject(args)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
