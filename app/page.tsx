import SearchTypeahead from "./components/SearchTypeahead";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 min-h-[60vh]">
      <div className="text-center space-y-4">
        <h1
          className="text-5xl md:text-6xl font-sans font-bold text-simpsons-yellow drop-shadow-[0_4px_0_#000] tracking-wider"
          style={{ WebkitTextStroke: "2px black" }}
        >
          SIMPSONS SEARCH
        </h1>
        <p className="text-xl font-medium text-slate-700">
          The most cromulent search engine on the web.
        </p>
      </div>

      <div className="w-full max-w-lg space-y-6">
        <SearchTypeahead />
      </div>
    </div>
  );
}
