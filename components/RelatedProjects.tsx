import Link from 'next/link'
import Image from 'next/image'

import { ProjectInterface, UserProfile } from '@/common.types'
import { getUserProjects } from '@/lib/actions';

type Props = {
  userId: string
  projectId: string
}

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const result = await getUserProjects(userId) as { user?: UserProfile };

  const filteredProjects = result?.user?.projects?.edges?.filter(({ node }: { node: ProjectInterface }) => node?.id !== projectId);

  if(filteredProjects?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <h3 className="text-base font-bold">
          Related Projects by {result?.user?.name}
        </h3>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-blue-500 text-base hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }, index) => (
          <div key={index} className="flexCenter related_project-card drop-shadow">
            <Link href={`/project/${node?.id}`} className="flexCenter group relative w-full h-full">
              <Image src={node?.image} width={414} height={314} className="w-full h-full object-cover rounded-2xl" alt="project image" />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProjects