
import { useState } from "react";
import { Button } from "@/components/ui/button";

const roles = ["Manager", "Staff", "Viewer"];

export default function StepTeam({
  onNext,
  onBack,
  isFirstStep,
  isLastStep
}: {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}) {
  const [rows, setRows] = useState([
    { name: "", email: "", role: "", welcome: false },
  ]);

  return (
    <div className="flex flex-col gap-7">
      <div className="font-semibold text-[#0D1A2B]">
        Invite Team Members (optional)
      </div>
      <div className="mb-2">
        <table className="w-full text-sm bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Send Welcome Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none"
                    placeholder="Full Name"
                    value={r.name}
                    onChange={e =>
                      setRows(arr =>
                        arr.map((row, i) =>
                          i === idx ? { ...row, name: e.target.value } : row
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none"
                    placeholder="Email"
                    value={r.email}
                    onChange={e =>
                      setRows(arr =>
                        arr.map((row, i) =>
                          i === idx ? { ...row, email: e.target.value } : row
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <select
                    className="bg-gray-50 border-b-2 focus:border-b-[#3CE8B3] py-1 px-2 rounded outline-none"
                    value={r.role}
                    onChange={e =>
                      setRows(arr =>
                        arr.map((row, i) =>
                          i === idx ? { ...row, role: e.target.value } : row
                        )
                      )
                    }
                  >
                    <option value="">–</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={r.welcome}
                    className="accent-[#3CE8B3] scale-125"
                    onChange={e =>
                      setRows(arr =>
                        arr.map((row, i) =>
                          i === idx ? { ...row, welcome: !row.welcome } : row
                        )
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          type="button"
          className="mt-3 rounded-full bg-[#3CE8B3] text-white font-bold px-6 hover:bg-[#36cfa0]"
          onClick={() =>
            setRows(r => [...r, { name: "", email: "", role: "", welcome: false }])
          }
        >
          + Add Another Member
        </Button>
      </div>
      <div className="flex justify-between mt-2">
        <Button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className="rounded-full px-6 py-2 bg-gray-200 text-gray-900 font-bold hover:bg-gray-300"
        >
          Back
        </Button>
        <Button
          type="button"
          className="rounded-full px-8 py-2 bg-[#3CE8B3] text-white font-bold hover:bg-[#36cfa0]"
          onClick={onNext}
        >
          Launch Dashboard
        </Button>
      </div>
    </div>
  );
}
