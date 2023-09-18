import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects, getSearchedProjects } from "@/lib/actions"

type SearchParams = {
  category?: string;
  endcursor?: string;
}

type Props = {
  searchParams: SearchParams
}

type Pagination = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

type ProjectCollection = {
  projectCollection: {
    edges: { node: ProjectInterface }[];
    pageInfo: Pagination;
  },
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: Pagination;
  },
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  let data;
  let projectsToDisplay = [];
  let pagination: Pagination;

  if(category) {
    data = await getSearchedProjects(category, endcursor) as ProjectSearch;
    projectsToDisplay = data?.projectSearch?.edges;
    pagination = data?.projectSearch.pageInfo;
  } else {
    data = await getAllProjects(endcursor) as ProjectCollection;
    projectsToDisplay = data?.projectCollection?.edges;
    pagination = data?.projectCollection.pageInfo;
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      
      {projectsToDisplay.length === 0 ? (
        <section className="flexStart flex-col paddings">
          <p className="no-result-text text-center">No projects found in this category.</p>
        </section>
      ) : (
        <section className="projects-grid">
          {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={`${node?.id}`}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy.name}
              avatarUrl={node?.createdBy.avatarUrl}
              userId={node?.createdBy.id}
              liveSiteUrl={node?.liveSiteUrl}
              githubUrl={node?.githubUrl}
            />
          ))}
        </section>
      )}
      
      <LoadMore
        startCursor={pagination?.startCursor} 
        endCursor={pagination?.endCursor} 
        hasPreviousPage={pagination?.hasPreviousPage} 
        hasNextPage={pagination?.hasNextPage}
      />
    </section>
  )
}

export default Home