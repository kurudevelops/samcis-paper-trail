const fields = [
    {label:"First Name", value:"<first name>"},
    {label:"Last Name", value:"<last name>"},
    {label:"Email", value:"sample@gmail.com"},
    {label:"Unit", value:"SMI"},
    {label:"Cluster", value:"Academic"},

];

export default function UserManual() {
  return (
    <div className="flex justify-center pt-6">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md">
        <div className="flex flex-col gap-5">
          {fields.map((field) => (
            <div key={field.label}>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                {field.label}
              </p>
              <div className="bg-gray-200 border border-gray-400 rounded-md px-3 py-2 text-sm text-gray-800">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
