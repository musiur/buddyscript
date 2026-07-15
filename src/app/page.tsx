import { Container } from "@/components/layouts/container"
import { Feed } from "@/widgets/feed"

const Home = async () => {
  return (
    <Container className="relative flex items-start justify-between gap-6 py-6">
      <div className="hidden w-[300px] min-w-[280px] space-y-6 lg:block xl:min-w-[300px]">
        <Feed.Explore />
        <Feed.SuggestedPeople />
        <Feed.Events />
      </div>
      <div className="w-full space-y-6">
        <Feed.Stories />
        <Feed.PostForm />
        <Feed.PostList />
      </div>
      <div className="hidden w-[300px] min-w-[280px] space-y-6 xl:block xl:min-w-[300px]">
        <Feed.YouMightLike />
        <Feed.YourFriends />
      </div>
    </Container>
  )
}

export default Home
