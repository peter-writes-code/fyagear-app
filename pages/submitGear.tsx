import AppHead from "../components/common/AppHead";

const SubmitGear = () => {
  const title = "fyagear | submit gear!";

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-yellow-100 to-white select-none">
      <AppHead title={title} />

      <main className="flex-grow p-8 container mx-auto">
        <h1 className="text-5xl font-medium text-black">submit gear!</h1>
        <div className="text-base py-6">
          Soon the stream of gear will go here. Until then please go ahead and
        </div>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          SUBMIT!
        </button>
      </main>
    </div>
  );
};

export default SubmitGear;
