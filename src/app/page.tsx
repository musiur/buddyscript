import { HomeIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-background">
      <div className="mb-10">
        <h1 className="text-2xl font-bold flex items-center gap-2"><HomeIcon /> Home Page</h1>
        <p>Fox without a tail. Brown fish should fly from water sky.</p>
      </div>
    </div>
  )
}

export default Home;