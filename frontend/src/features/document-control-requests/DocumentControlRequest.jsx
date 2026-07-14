import { useState } from "react";

const requestTypes = [
  { value: "creation", label: "Creation" },
  { value: "revision", label: "Revision" },
  { value: "deletion", label: "Deletion" },
];

export default function DocumentControlRequest({ onSubmit }) {
  const [requestType, setRequestType] = useState("creation");
  const [file, setFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.({ requestType, file });
  }

  return (
    <div className="flex justify-center pt-10">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-lg">
        <h1 className="text-lg font-bold text-gray-800 text-center mb-6">
          Document Control Form Request
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Type of request */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Type of Request:
            </p>
            <div className="flex gap-8">
              {requestTypes.map((type) => (
                <label
                  key={type.value}
                  className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="requestType"
                    value={type.value}
                    checked={requestType === type.value}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="accent-blue-900"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* File attach */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Attach PDF Document:
            </p>
            <div className="border border-gray-300 rounded-md px-3 py-2">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="text-sm text-gray-600 w-full"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-900 text-white text-sm font-semibold rounded-md py-2.5 mt-2 hover:bg-blue-800 transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}