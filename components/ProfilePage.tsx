import { ProjectInterface, UserProfile } from '@/common.types'
import Image from 'next/image'

import Link from 'next/link'
import Button from "./Button";
import ProjectCard from './ProjectCard';

type Props = {
  user: UserProfile;
}

const ProfilePage = ({ user }: Props) => {
  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className='flex items-start flex-col w-full'>
          <Image src={user?.avatarUrl} width={150} height={150} className="rounded-full" alt="user image" />
          <p className="text-3xl font-bold mt-8">{user?.name}</p>
          <p className="text-md font-light text-gray-100 mt-2">{user?.email}</p>
          {user?.id === "user_01H9PQ125RRDA50BS8TZH4GXBD" && (
            <p className="md:text-5xl text-3xl font-extrabold md:mt-8 mt-5 max-w-lg"><span className='text-primary'>Software Engineer</span> with almost 6 years of experience</p>
          )}
          
          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Link href={`mailto:${user?.email}`}>
              <Button 
                title="Hire Me" 
                leftIcon="/email.svg"
                bgColor="bg-primary !w-max" 
                textColor="text-white"
                borderColor="transparent" 
              />
            </Link>
            <Link href={`${user?.githubUrl || "https://github.com/joshuaoweipadei"}`} target="_blank" rel="noopener noreferrer">
              <Button 
                title="GitHub" 
                bgColor="bg-light-white-400 !w-max" 
                textColor="text-black-100" 
                borderColor="transparent" 
                leftIcon={"/github.svg"}
              />
            </Link>
          </div>
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={user?.projects?.edges[0]?.node?.image}
            alt="project image"
            width={739}
            height={554}
            className='rounded-xl object-contain'
          />
        ) : (
          <Image
            src="/ppp.png"
            width={739}
            height={554}
            alt="project image"
            className='rounded-xl'
          />
        )}
       </section>

       <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Works</p>
        
        <div className="profile_projects">
          {user?.projects?.edges?.map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={`${node?.id}`}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={user.name}
              avatarUrl={user.avatarUrl}
              userId={user.id}
              liveSiteUrl={node.liveSiteUrl}
              githubUrl={node.githubUrl}
            />
          ))}
        </div>
      </section>
    </section>
  )
}

export default ProfilePage