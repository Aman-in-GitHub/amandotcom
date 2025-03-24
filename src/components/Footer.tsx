import CanvasCursor from "@/utils/CanvasCursor";

function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 w-full select-none border-t-2 border-neutral-800 bg-background py-4 text-xs text-neutral-400 lg:text-sm">
      <CanvasCursor />

      <div className="mx-auto flex max-w-[500px] items-center justify-between lg:max-w-[750px]">
        <p>Aman Chand © {new Date().getFullYear()}</p>
        <p>
          {new Date().getHours() >= 5 && new Date().getHours() < 12
            ? "Good Morning"
            : new Date().getHours() >= 12 && new Date().getHours() < 18
              ? "Good Afternoon"
              : "Good Evening"}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
