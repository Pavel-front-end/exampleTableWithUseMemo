import React from "react";
import "../../../assets/styles/react-tabs-card.scss";
import CaseManagement from "../../../components/CaseManagement/CaseManagement";
interface IPropsProfileCard {
  onDeleteAccount?: () => void
}

type Props = {

}
const ProfileCard: React.FC<Props> = (props) => {

  return (
    <CaseManagement/>
  );
};


export default ProfileCard;
