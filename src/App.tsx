import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

function App() {
  const [flowers, setFlowers] = useState<
    Array<{ id: number; left: number; delay: number; duration: number }>
  >([]);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isNoButtonRunning, setIsNoButtonRunning] = useState(false);

  useEffect(() => {
    const newFlowers = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
    setFlowers(newFlowers);
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowQuestion(true);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => setShowLetter(true), 1000);
    setTimeout(() => setShowMessage(true), 1500);
  };

  const handleSendLove = () => {
    const button = document.getElementById("love-button");
    if (button) {
      button.classList.add("clicked");
      setTimeout(() => {
        alert("");
        button.classList.remove("clicked");
      }, 300);
    }
  };

  const handleNoClick = () => {
    setIsNoButtonRunning(true);
    // Tạo animation vòng tròn xung quanh thư
    let angle = 0;
    const radius = 180;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const interval = setInterval(() => {
      if (!isNoButtonRunning) {
        clearInterval(interval);
        return;
      }
      angle += 5;
      const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
      const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
      setNoButtonPos({ x, y });
    }, 50);
  };

  const handleMouseEnter = () => {
    if (!isNoButtonRunning) return;
    // Chạy trốn khi di chuột vào
    const randomX = Math.random() * (window.innerWidth * 0.6 - 200);
    const randomY = Math.random() * (window.innerHeight * 0.6 - 100);
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setIsNoButtonRunning(false);
    alert("💝 Cảm ơn ẻm ! 💕");
    setShowQuestion(false);
  };

  if (!isEnvelopeOpen) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 flex items-center justify-center p-4">
        {flowers.slice(0, 10).map((flower) => (
          <div
            key={flower.id}
            className="flower absolute text-xl md:text-2xl"
            style={{
              left: `${flower.left}%`,
              animationDelay: `${flower.delay}s`,
              animationDuration: `${flower.duration}s`,
            }}
          >
            🌸
          </div>
        ))}

        <div className="relative z-10 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-rose-700 mb-2 animate-float">
              Còn chờ cái vì nữa nhấn vào điii
            </h1>
            <p className="text-base md:text-lg text-rose-600 italic">
              Nhấn điiiiiiiiiiiiii...
            </p>
          </div>

          <button
            onClick={handleOpenEnvelope}
            className="envelope-wrapper w-full max-w-sm mx-auto block focus:outline-none"
          >
            <div className="envelope-container relative">
              <div className="envelope-back"></div>
              <div className="envelope-front"></div>
              <div className="envelope-flap"></div>

              <div className="letter-preview">
                <div className="letter-content-preview">
                  <p className="text-rose-700 font-serif italic text-sm">
                    Happy
                  </p>
                  <p className="text-rose-700 font-serif italic text-sm">
                    Women's Day
                  </p>
                </div>
              </div>

              <div className="heart-decoration">
                <Heart className="w-5 h-5 text-rose-400" fill="currentColor" />
              </div>
            </div>
          </button>

          <div className="text-center mt-8"></div>
        </div>

        <div className="hearts-background">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="floating-heart absolute text-3xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "-50px",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 flex items-center justify-center p-4">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="flower absolute text-xl md:text-2xl"
          style={{
            left: `${flower.left}%`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
          }}
        >
          🌸
        </div>
      ))}

      <div className="sparkles-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="sparkle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div
        className={`letter-full relative z-10 max-w-2xl w-full mx-auto transition-all duration-1000 ${
          showLetter ? "letter-slide-up" : "opacity-0"
        }`}
      >
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 border-t-8 border-rose-400">
          <div className="text-center mb-8">
            <Heart
              className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse"
              fill="currentColor"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-rose-700 mb-2">
              Chúc người tí hon 20-10 vui vẻ ❤️
            </h1>
          </div>

          <div
            className={`space-y-4 text-base md:text-lg text-gray-700 leading-relaxed ${
              showMessage ? "typing-animation" : "opacity-0"
            }`}
          >
            <p
              className="text-center italic font-medium text-rose-700 typing-line"
              style={{ animationDelay: "0s" }}
            >
              "Ta đa! Bất ngờ chưa?"
            </p>

            <p className="typing-line" style={{ animationDelay: "1s" }}>
              Mai đẹt ti ni của toaii,
            </p>

            <p className="typing-line" style={{ animationDelay: "2s" }}>
              Anh không biết em có thích món quà nhỏ này không, nhưng đây là tấm
              lòng nhỏ của anh dành cho em. Anh mong là em sẽ thích nó!
            </p>

            <p className="typing-line" style={{ animationDelay: "5s" }}>
              Chúc ẻm 20-10 vui vẻ nha❤️, đừng có doạ mất kết nối nữa
              nhoo🥹!!!!!!
            </p>

            {showQuestion && (
              <div className="text-center mt-8 typing-line">
                <p className="text-lg font-bold text-rose-700 mb-6">
                  Đọc xong rồi thì thơm 1 cái đi hẹ hẹ! 💕
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleYesClick}
                    className="px-6 py-2 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition-all"
                  >
                    Có ❤️
                  </button>
                  <button
                    onClick={handleNoClick}
                    onMouseEnter={handleMouseEnter}
                    className="px-6 py-2 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600"
                    style={{
                      position: noButtonPos.x !== 0 ? "fixed" : "relative",
                      left: noButtonPos.x ? `${noButtonPos.x}px` : "auto",
                      top: noButtonPos.y ? `${noButtonPos.y}px` : "auto",
                      transition: "left 0.2s ease-out, top 0.2s ease-out",
                      zIndex: 50,
                    }}
                  >
                    Không 😂
                  </button>
                </div>
              </div>
            )}

            <div
              className="text-center mt-6 typing-line"
              style={{ animationDelay: "7s" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="hearts-background">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="floating-heart absolute text-3xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-50px",
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
