export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-adobe/95 backdrop-blur-sm border-t border-white/10 p-3 flex gap-2">
      <a
        href="/contact"
        className="flex-1 bg-terra text-white text-center py-3 rounded-md font-bold text-sm"
      >
        Get Cash Offer
      </a>
      <a
        href="tel:+18305901105"
        className="bg-white/10 text-white px-4 py-3 rounded-md font-bold text-sm flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Call
      </a>
    </div>
  );
}
