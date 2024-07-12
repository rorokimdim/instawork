import PropTypes from "prop-types";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Card from "./Card";

const MemberCard = ({ member }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/edit/${member.id}`)}>
      <h3 className="text-xl font-bold">
        {member.first_name} {member.last_name}
        {member.role == "admin" && " (admin)"}
      </h3>
      <h4>
        <FaPhone className="inline mr-2" />
        <span>{member.phone}</span>
      </h4>

      <h4>
        <FaEnvelope className="inline mr-2" />
        <span>{member.email}</span>
      </h4>
    </Card>
  );
};

MemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default MemberCard;
