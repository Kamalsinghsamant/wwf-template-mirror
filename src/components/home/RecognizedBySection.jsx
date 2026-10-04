import React, { memo } from "react";

const recognitions = [
  {
    acronym: "CBSE",
    organisation: "Central Board of Secondary Education",
    context:
      "Wild Wisdom Quiz has been recognized by CBSE as a Continuous and Comprehensive Evaluation (CCE) activity.",
    source_reference: "https://quiz.wwfindia.org",
    display_url: "quiz.wwfindia.org",
  },
  {
    acronym: "KVS",
    organisation: "Kendriya Vidyalaya Sangathan",
    context:
      "The programme has been supported by KVS, who have encouraged schools and children to join the programme.",
    source_reference: "https://academy.wwfindia.org/wildwisdom/",
    display_url: "academy.wwfindia.org",
  },
  {
    acronym: "NVS",
    organisation: "Navodaya Vidyalaya Samiti",
    context:
      "The programme has been supported by NVS, who have encouraged schools and children to join the programme.",
    source_reference: "https://academy.wwfindia.org/wildwisdom/",
    display_url: "academy.wwfindia.org",
  },
];

function RecognizedBySection() {
  return (
    <section className="bg-white py-14 sm:py-16 border-t border-gray-200" aria-labelledby="recognized-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle section label */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Institutional Accreditation
          </span>
          <h2
            id="recognized-heading"
            className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mt-1"
          >
            Recognized By
          </h2>
        </div>

        {/* Horizontal Badge / Credential Row with Subtle Dividers */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#fafafa]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {recognitions.map((item, index) => (
              <div
                key={index}
                className="p-6 sm:p-7 flex flex-col justify-between hover:bg-white transition-colors group"
              >
                <div>
                  {/* Badge & Organisation Header */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-black tracking-wider text-black bg-white rounded border border-gray-300 shadow-2xs group-hover:border-[#f89a35] group-hover:text-[#f89a35] transition-colors">
                      {item.acronym}
                    </span>
                    <span className="text-xs font-bold text-gray-900 leading-snug">
                      {item.organisation}
                    </span>
                  </div>

                  {/* Context from JSON */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.context}
                  </p>
                </div>

                {/* Source Link */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400 font-medium">Educational Partner</span>
                  <a
                    href={item.source_reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-black hover:text-[#f89a35] transition-colors inline-flex items-center gap-1"
                    aria-label={`Official reference for ${item.acronym}`}
                  >
                    <span>{item.display_url}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(RecognizedBySection);
