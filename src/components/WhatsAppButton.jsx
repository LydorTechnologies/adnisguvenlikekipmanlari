import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/905356482213?text=Merhaba%2C%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <MessageCircle size={26} className="group-hover:rotate-12 transition-transform" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        WhatsApp ile yazın
      </span>
    </a>
  );
};

export default WhatsAppButton;
