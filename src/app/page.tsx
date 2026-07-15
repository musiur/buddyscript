import { Container } from "@/components/layouts/container";
import { getData } from "@/features/auth/actions/login";
import { Feed } from "@/widgets/feed";

const Home = async () => {
  const version = await getData();
  return (
    <Container className="flex items-start justify-between gap-6 py-6 relative">
      <div className="fixed bottom-2 right-2 bg-background border border-primary px-2 py-1 rounded z-999">Postgress Version: {version}</div>
      <div className="min-w-[280px] xl:min-w-[300px] w-[300px] space-y-6 hidden lg:block">
        <Feed.Explore />
        <Feed.SuggestedPeople />
        <Feed.Events />
      </div>
      <div className="w-full space-y-6">
        <Feed.Stories />
        <Feed.PostForm />
        <Feed.PostList />
      </div>
      <div className="min-w-[280px] xl:min-w-[300px] w-[300px] space-y-6 hidden xl:block">
        <Feed.YouMightLike />
        <Feed.YourFriends />
      </div>
    </Container>
  )
}

export default Home;

