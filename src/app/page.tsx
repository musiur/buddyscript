import { Container } from "@/components/layouts/container";
import { Feed } from "@/widgets/feed";

const Home = () => {

  return (
    <Container className="flex items-start justify-between gap-6 py-6">
      <div className={SideBlocksPanelStyle}>
        <Feed.Explore />
        <Feed.SuggestedPeople />
        <Feed.Events />
      </div>
      <div className="w-full space-y-6">
        <Feed.Stories />
        <Feed.PostForm />
        <Feed.PostList />
      </div>
      <div className={SideBlocksPanelStyle}>
        <Feed.YouMightLike />
        <Feed.YourFriends />
      </div>
    </Container>
  )
}

export default Home;

const SideBlocksPanelStyle = "min-w-[300px] w-[300px] space-y-6 hidden lg:block"; 

