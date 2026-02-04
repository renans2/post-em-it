import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-linear-to-r from-purple-600 to-cyan-400 w-full">
      <div className="max-w-4xl mx-auto px-10 py-3 md:p-4 flex items-center justify-between">
        <h1 className="caveat-font text-4xl md:text-5xl font-bold text-white">
          Post-em-it
        </h1>
        <a
          href="https://github.com/renans2/post-em-it"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-black/10 p-2 rounded-xl"
        >
          <FaGithub size={30} className="text-white" />
        </a>
      </div>
    </header>
  );
}
