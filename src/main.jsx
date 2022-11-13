import { useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// Import Component => Default Export
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdoptedPetContext from "./contexts/AdoptedPetContext";
import Loader from "./components/Loader";

// import Search from "./pages/Search";
// import Details from "./pages/Details";
// import NotFound from "./pages/NotFound";

// Use Lazy Loaidng with Code Spliting and Suspense Component

const Search = lazy(() => import("./pages/Search"));
const Details = lazy(() => import("./pages/Details"));
const NotFound = lazy(() => import("./pages/NotFound"));

// interact with Caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <header>
              <Link to="/">React App</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
};

// Get Root Element
const container = document.getElementById("root");
// Create New Root
const root = createRoot(container);
root.render(<App />);
