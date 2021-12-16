const { ApolloServer, gql } = require('apollo-server-lambda')
const { getAllProjects, addProject, updateProject, getProject } = require('./utils/airtable')

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
    createProject(project: AddProjectInput): Project
    updateProject(project: UpdateProjectInput): Project
  }

  type Query {
    projects: [Project]
    project(id: ID): Project
  }
`

const resolvers = {
  Query: {
    projects: () => {
      return getAllProjects()
    },
    project: (_, args) => {
      return getProject(args)
    }
  },
  Mutation: {
    updateProject: (_, args) => {
      return updateProject(args)
    },
    createProject: (_, args) => {
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
