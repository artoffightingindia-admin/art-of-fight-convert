import { useCms } from "@/context/CmsContext";

const Footer = () => {
  const { content } = useCms();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-8 text-zinc-400 text-xs">
      <div className="container max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-bold text-white uppercase text-sm">Art of Fighting</p>
          <p className="mt-1">{content.footerTagline}</p>
        </div>
        <div className="text-center md:text-right">
          <p>{content.contactAddress}</p>
          <p className="text-zinc-500 mt-1">© {new Date().getFullYear()} Art of Fighting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
