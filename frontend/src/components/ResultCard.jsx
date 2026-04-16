import ReactMarkdown from "react-markdown";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { selectedClass, label, pass, failures, precautions } = result;

  return (
    <div className="space-y-4">
      {/* Usage Label */}
      <h3 className="text-lg font-bold text-gray-800 text-center">
        {label}
      </h3>

      {/* Pass/Fail Banner */}
      <div
        className={`p-4 rounded-xl text-center text-xl font-bold ${
          pass
            ? "bg-green-100 text-green-800 border border-green-300"
            : "bg-red-100 text-red-800 border border-red-300"
        }`}
      >
        {pass ? "✓ PASS" : "✗ FAIL"}
      </div>

      {/* Failure Details or Pass Message */}
      {pass ? (
        <p className="text-sm text-green-700 text-center">
          This water meets the standard for {label}. No major concerns detected.
        </p>
      ) : (
        failures.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Why it failed</h4>
            <ul className="ml-4 text-sm text-red-700 list-disc space-y-1">
              {failures.map((f, i) => (
                <li key={i}>
                  <strong>{f.parameter}</strong>: {f.value} (required: {f.limit})
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      {/* Precautions Section */}
      {pass ? (
        <p className="text-sm text-gray-500 italic text-center">
          Water meets required standards for this use.
        </p>
      ) : (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <h4 className="text-base font-semibold text-amber-800 mb-2">
            Precautions & Recommendations
          </h4>
          {precautions ? (
            <div className="max-w-prose text-gray-700">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-sm font-bold text-amber-900 mt-4 mb-1 uppercase tracking-wide">
                      {children}
                    </h2>
                  ),
                  ul: ({ children }) => (
                    <ul className="ml-4 list-disc space-y-1 text-sm">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 leading-snug">{children}</li>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm text-gray-700 mb-2">{children}</p>
                  ),
                }}
              >
                {precautions}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Precaution details unavailable at this time.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
