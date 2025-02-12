import { type SVGProps } from "react";

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M227.32 28.68a16 16 0 0 0-15.66-4.08h-.15L19.57 82.84a16 16 0 0 0-2.49 29.8L102 154l41.3 84.87a15.86 15.86 0 0 0 14.44 9.13q.69 0 1.38-.06a15.88 15.88 0 0 0 14-11.51l58.2-191.94v-.15a16 16 0 0 0-4-15.66Zm-69.49 203.17-.05.14v-.07l-40.06-82.3 48-48a8 8 0 0 0-11.31-11.31l-48 48-82.33-40.06h-.07.14L216 40Z" />
    </svg>
  );
}

export default SendIcon;
