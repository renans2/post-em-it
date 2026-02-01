import PostItsProvider from "./components/context/postits-context-provider";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

function App() {
  return (
    <div className="h-screen bg-gray-300 overflow-y-auto">
      <Header />
      <PostItsProvider>
        <Main />
      </PostItsProvider>
    </div>
  );
}

export default App;
