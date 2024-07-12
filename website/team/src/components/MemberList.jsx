import { useState, useEffect } from "react";

import Spinner from "./Spinner";
import MemberCard from "./MemberCard";
import storage from "../storage.js";

const MemberList = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersInfo = await storage.getMembers();
        setMembers(membersInfo.items);
        setMemberCount(membersInfo.count);
      } catch (error) {
        setServerError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <section className="px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-400 mb-6 text-center">
              {serverError != null
                ? "Server is misbehaving. Please check."
                : `You have ${memberCount} team members`}
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
