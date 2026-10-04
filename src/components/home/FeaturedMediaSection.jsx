import React, { memo } from "react";

function FeaturedMediaSection({
  heading = "As Featured In",
  medias = [],
}) {
  if (!medias || medias.length === 0) return null;

  return (
    <section
      className="py-12 bg-[#fafafa] border-y border-gray-200"
      aria-label="Media Coverage"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-7">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block">
            National &amp; International Recognition
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mt-1">
            {heading}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {medias.map((item, idx) => {
            const content = (
              <div
                className="h-14 px-5 py-2 rounded bg-white border border-gray-200 shadow-xs hover:border-gray-400 hover:shadow-sm transition-all duration-200 flex items-center justify-center group"
                title={item.alt_text}
              >
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.alt_text || "Media Publication"}
                    className="max-h-8 max-w-[120px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span className="text-xs font-bold text-gray-800 tracking-wider">
                    {item.alt_text}
                  </span>
                )}
              </div>
            );

            if (item.media_link) {
              return (
                <a
                  key={idx}
                  href={item.media_link.startsWith("http") ? item.media_link : `https://${item.media_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                  aria-label={`Read coverage in ${item.alt_text}`}
                >
                  {content}
                </a>
              );
            }

            return <div key={idx}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturedMediaSection);
