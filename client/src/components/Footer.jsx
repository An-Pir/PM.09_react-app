export default function Footer() {
  return (
    <footer className="bg-amber-600 text-white p-4 mt-auto mb-6">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Кофейня “Кофе и Книги”.
          Все права защищены.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a
            href="#"
            target="_blank"
            className="hover:underline hover:text-amber-200 transition-colors"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            className="hover:underline hover:text-amber-200 transition-colors"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="#"
            target="_blank"
            className="hover:underline hover:text-amber-200 transition-colors"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}