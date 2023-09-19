export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email}) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedInUrl
    }
  }
`;

export const createUserMutation = `
  mutation CreateUser($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl
        id
      }
    }
  }
`;

export const createProjectMutation = `
  mutation CreateProject($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
      project {
        id
        title
        description
        createdBy {
          email
          name
        }
      }
    }
  }
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const projectCollectionQuery = `
query Project($endcursor: String) {
  projectCollection(last: 15, after: $endcursor, orderBy: { createdAt: DESC }) {
    edges {
      node {
        title
        category
        description
        image
        liveSiteUrl
        githubUrl
        createdBy {
          id
          name
          email
          avatarUrl
        }
        id
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
`;

export const projectsSearchQuery = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 15, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedInUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
            liveSiteUrl
            githubUrl
          }
        }
      }
    }
  }
`;

export const getProjectsTotalQuery = `
query ProjectCollection {
  projectCollection(last: 100) {
    edges {
      node {
        id
      }
    }
  }
}
`;