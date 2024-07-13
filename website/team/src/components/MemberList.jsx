import { useState, useEffect } from "react";

import Spinner from "./Spinner";
import MemberCard from "./MemberCard";
import storage from "../storage.js";
import ServerErrorPage from "../pages/ServerErrorPage.jsx";

const MemberList = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [serverErrorStatus, setServerErrorStatus] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const [membersInfo, error, status] = await storage.getMembers();
      if (!error) {
        setMembers(membersInfo.items);
        setMemberCount(membersInfo.count);
      } else {
        setServerError(error);
        setServerErrorStatus(status);
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  if (serverError) {
    return <ServerErrorPage message={serverError} status={serverErrorStatus} />;
  }

  return (
    <section className="px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-400 mb-6 text-center">
              You have {memberCount} team members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {members.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default MemberList;
