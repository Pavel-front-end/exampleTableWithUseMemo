import React from 'react';
import ComponentTemplate from "../../components/ComponentTemplate/ComponentTemplate";
import ProfileCard from "./ProfileCard/ProfileCard";
import {ModalData} from '../../helpers/Interfaces/Modal/IModalInterface';

interface IPropsProfile {
    onModalOpen: (data: ModalData) => void;
    isDeleteAccountAction: boolean;
}

const Profile: React.FC<IPropsProfile> = (props) => {

    return (
            <ComponentTemplate title='Profile' profilePage tokenBalance={props.tokenBalance}>
                <ProfileCard onDeleteAccount={null}/>
            </ComponentTemplate>
    )
};

export default Profile
