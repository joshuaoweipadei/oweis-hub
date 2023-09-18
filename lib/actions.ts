import { GraphQLClient } from "graphql-request";
import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectCollectionQuery, projectsSearchQuery, updateProjectMutation } from "@/graphql";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

// get login user token
export const fetchToken = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/auth/token`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

const makeGraphQLRequest = async (query: string, variables: {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
}

// get user
export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
}

// create new user
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey);
  const variables = {
    input: {
      name, email, avatarUrl
    }
  }
  return makeGraphQLRequest(createUserMutation, variables);
}

// upload image to cloudinary
export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/cloudinary/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath })
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}

// upload image to cloudinary
export const removeImage = async (public_id: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/cloudinary/remove`, {
      method: 'POST',
      body: JSON.stringify({ public_id: public_id })
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}

// create new project
export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);
  if(imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId
        }
      }
    }
    return makeGraphQLRequest(createProjectMutation, variables);
  }
}

// update project
export const updateProject = async (form: ProjectForm, previousImage: string, projectId: string, token: string) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if(isUploadingNewImage) {
    const match = previousImage.match(/\/([^/]+\/[^/]+)\.jpg$/);
    if(match) {
      const extractedImagePublicId = match[1];
      // remove previous image from cloudinary
      await removeImage(extractedImagePublicId);
    }

    // add new uploaded image to cloudinary
    const imageUrl = await uploadImage(form.image);
    if(imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};

// delete project
export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};

// get all projects
export const getAllProjects = (endcursor?: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(projectCollectionQuery, { endcursor });
}

// get searched projects
export const getSearchedProjects = (category?: string, endcursor?: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(projectsSearchQuery, { category, endcursor });
}

// get project details
export const getProjectDetails = (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
}

// get user projects
export const getUserProjects = (userId: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id: userId, last });
};