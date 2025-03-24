import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabase";
import { confetti } from "@tsparticles/confetti";
import SendIcon from "@/components/SendIcon";

const colors = [
  "#f19898",
  "#f292d8",
  "#a566ff",
  "#ff4d6d",
  "#ff6b76",
  "#ff8c3f",
  "#ffb549",
  "#5cc456",
  "#30c5f7",
  "#4a82ff",
  "#91a0ff",
];

function runSentConfetti() {
  const end = Date.now() + 3 * 1000;
  const colors = ["#800000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const messageRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [lastUsedColor, setLastUsedColor] = useState<any>(null);

  function scrollToBottom() {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function getRandomColor() {
    let uniqueColors = colors.filter((color) => color !== lastUsedColor);

    const newColor =
      uniqueColors[Math.floor(Math.random() * uniqueColors.length)];
    setLastUsedColor(newColor);
    return newColor;
  }

  useEffect(() => {
    if (isSending !== false) return;

    async function getMessages() {
      const { data, error } = await supabase
        .from("portfolio_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(69);

      if (error) {
        setIsLoading(false);
        return;
      }

      setMessages((data || []).reverse());
      setLastUsedColor(data[data.length - 1]?.color);
      setIsLoading(false);
    }

    getMessages();
  }, [isSending]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleMessageSubmit() {
    if (!messageRef.current) return;

    const message = messageRef.current?.value.trim();
    if (!message) return;

    const name = prompt("What's your name?");
    if (!name || name.trim() === "") {
      messageRef.current.value = "";
      setIsError(true);
      return;
    }

    if (name.toLowerCase().includes("aman")) {
      setIsSending(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("That's my name :|");
      messageRef.current.value = "";
      setIsSending(false);
      setIsError(true);
      return;
    }

    messageRef.current.value = "";
    setIsError(false);
    setIsSending(true);

    const { error } = await supabase.from("portfolio_messages").insert({
      name: name.trim().toLowerCase(),
      message: message.trim(),
      color: getRandomColor(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (error) {
      setIsSending(false);
      setIsError(true);
      return;
    }

    runSentConfetti();
    setIsSending(false);
    setIsError(false);
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-96 w-full overflow-hidden border-2 border-neutral-800">
        <div
          ref={messagesContainerRef}
          className="no-scrollbar h-full select-none overflow-y-auto"
        >
          {isLoading || messages.length === 0 ? (
            <div className="flex h-full items-center justify-center font-special text-4xl lg:text-5xl">
              {isLoading ? (
                <p className="animate-pulse">Loading Messages...</p>
              ) : (
                <p>No messages yet</p>
              )}
            </div>
          ) : (
            <div className="px-4 py-2 text-sm lg:text-base">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="my-1 flex items-center gap-2"
                  title={`${message.name} at ${new Date(message.created_at).toLocaleString()}`}
                >
                  <p
                    style={{
                      color: message.color || "#ffffff",
                    }}
                    className="whitespace-nowrap font-semibold"
                  >
                    {message.name.length > 20
                      ? message.name.split(" ")[0].slice(0, 20) + "..."
                      : message.name.split(" ")[0]}
                  </p>
                  <p className="whitespace-nowrap text-body">
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full items-center">
        <input
          type="text"
          placeholder={
            isError
              ? "Error sending your message"
              : isSending
                ? "Sending your message..."
                : "Type a message"
          }
          ref={messageRef}
          className={`w-full border-2 border-t-0 border-neutral-800 bg-background p-4 text-sm text-body outline-none lg:text-base ${
            isError && "bg-red-950 placeholder-red-300"
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (isSending) return;

              handleMessageSubmit();
            }
          }}
        />
        <button
          className={`self-stretch border-b-2 border-r-2 border-neutral-800 px-6 py-2 duration-500 active:opacity-80 ${
            isSending && "opacity-40"
          } ${isError ? "bg-red-700" : "bg-green-700"}`}
          onClick={handleMessageSubmit}
          disabled={isSending}
          aria-label="Send message"
        >
          <SendIcon className="size-6 lg:size-7" fill="white" />
        </button>
      </div>
    </div>
  );
}

export default Messages;
