import AppHead from "../components/common/AppHead";

const Home = () => {
  const title = "fyagear";

  return (
    <div>
      <AppHead title={title} />

      <main>
        <div className="p-8text-2xl font-medium text-black">placeholder 2</div>
      </main>
    </div>
  );
};

export default Home;
