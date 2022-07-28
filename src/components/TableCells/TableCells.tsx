import React from "react";
import {Cell} from 'react-table';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCogs,
    faCopy,
    faLayerGroup,
    faPen,
    faShoppingBag,
    faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./TableCells.module.scss";
import {Link, NavLink} from "react-router-dom";
import routeNames from "../../shared/routeNames/routeNames";
import {useDispatch} from "react-redux";
import {deleteCase, fetchCaseById} from "../../store/actions/garbageActions/garbage";
import {CaseStatusEnum, GarbageCase, PackageType} from "../../helpers/Types";
import {WasteTypesEnum} from "../../helpers/Enums/WasteTypesEnum";
import {convertDate, getEventStatusBullet} from "../../shared/utility";
import {DeleteBasketIcon, LocationIcon} from "../../assets/images/Icons/IconsSvg";
import {IGiftChallengeUserStatusEnum} from "../../helpers/Interfaces/GiftChallenges/IGiftChallenge";
import winnerBadge from '../../assets/images/Icons/winnerBadge.svg'
import Avatar from "../Avatar/Avatar";
import {modalOpen} from "../../store/actions/modalActions/modal";
import moment from "moment";
import appConst from "../../config/consts";

const { STATUSES: { FINISHED, GIFT_SENT, COMPLETED } } = appConst

export const DateCell = (dateValue: any) => {
  let date = dateValue.value ? dateValue.value : dateValue;

  return <span className={classes.LocationCell}>{convertDate(date)}</span>;
};
export const TotalPacksAmount = (value: any) => {
  const smallPackages = value.row.original.packages?.filter(
    (item: PackageType) => item.packageName === "small"
  ).length;
  const mediumPackages = value.row.original.packages?.filter(
    (item: PackageType) => item.packageName === "medium"
  ).length;
  const largePackages = value.row.original.packages?.filter(
    (item: PackageType) => item.packageName === "large"
  ).length;

  return (
    <span>
      {value.row.original.packages?.length
        ? `(
      ${smallPackages ? smallPackages + " small " : ""}
      ${mediumPackages ? mediumPackages + " medium " : ""}
      ${largePackages ? largePackages + " large" : ""})
      `
        : "No packages yet"}
    </span>
  );
};

export const DefaultCell = ({ value }: any) => {

  if (String(value).length > 19) {
    return (
      <span className={classes.DefaultCell}>
        <span>{value.substr(0, 20)}...</span>
        <p>{value}</p>
      </span>
    );
  }
  return (
    <span>
      <span>{value}</span>
    </span>
  );
};

export const AddressCell = ({value}: Cell) => {
    return <span>{value}</span>
}

export const WasteTypesCell = ({ value }: any) => {
  let paper = null;
  let glass = null;
  let metal = null;
  let plastic = null;
  let group = null;
  if (value) {
    value?.forEach((item: any) => {
      switch (item.wasteTypeId) {
        case WasteTypesEnum.mixed:
          group = <FontAwesomeIcon icon={faLayerGroup} />;
          break;
        case WasteTypesEnum.paper:
          paper = <FontAwesomeIcon icon={faCopy} />;
          break;
        case WasteTypesEnum.plastic:
          plastic = <FontAwesomeIcon icon={faShoppingBag} />;
          break;
        case WasteTypesEnum.glass:
          glass = <FontAwesomeIcon icon={faWineBottle} />;
          break;
        case WasteTypesEnum.metal:
          metal = <FontAwesomeIcon icon={faCogs} />;
          break;
      }
    });
  }

  return (
    <span className={classes.WasteTypes}>
      {paper}
      {glass}
      {metal}
      {plastic}
      {group}
    </span>
  );
};

export const WasteLocationCell = (value: any) => {
  return (
      <div className={classes.UserInfo}>
        {value.cell.row?.original?.address?.substr(0, 30)}
        {value.cell.value?.address?.substr(0, 30)}
      </div>
  );
};

export const UserFirstLastNameCell = (value: any) => {
  return (
    <div className={classes.UserInfo}>
      {value.cell.row?.original.firstName} {value.cell.row?.original.lastName}
      {value.cell.value?.firstName} {value.cell.value?.lastName}
    </div>
  );
};


export const StatusCell = () => {
  return (
    <div className={classes.OrangeText }>Current</div>
  )
}

export const StatusCellWithBullet = (value: any) => {

    return (
        <div className={classes.StatusWithBulletCell}>
            <div style={{ backgroundColor: getEventStatusBullet(value.row.original.status) }} className={classes.StatusBullet}/>
            <span>{value.row.original.status.slice(0, 1).toUpperCase()}{value.row.original.status.slice(1)}</span>
        </div>
    )
}

export const EditCaseCell = (cell: Cell<GarbageCase>) => {
  const dispatch = useDispatch();
  return (
      cell.row.original.status === CaseStatusEnum.current && (
          <div
              className={classes.EditCell}
              onClick={() => {
                dispatch(fetchCaseById(cell.value));
              }}
          >
      <FontAwesomeIcon icon={faPen}/>
      <span>
        <Link to={`${routeNames.profileEditCase}#${cell.value}`}>Edit case</Link>
      </span>
    </div>
      )
  );
};

export const CaseDetailsCell = (value: any) => {
  return (
    <span className={classes.CaseDetails}>
      <NavLink to={`${routeNames.caseDetails}/${value.cell.row.original.id}`}>
        Case details
      </NavLink>
    </span>
  );
};

export const TransactionIdCell = (transactionNumber: any) => {
  return (
      <div className={classes.UserInfo}>
        {transactionNumber.value}
      </div>
  )
}

export const AdminIdCell = (adminId: any) => {
  return (
      <div className={classes.UserInfo}>
        {adminId.value}
      </div>
  )
}

export const TransferredTokens = (transferredTokens: any) => {
  return (
      <div className={classes.UserInfo}>
        {transferredTokens.value}
      </div>
  )
}

export const RestTokens = (restTokens: any) => {
  return (
      <div className={classes.UserInfo}>
        {restTokens.value}
      </div>
  )
}

interface ILocationAddressCell {
  value: string
}

export const LocationAddressCell = ({value}: ILocationAddressCell) => {
  if (value.length > 25) {
    return (
        <div className={classes.LocationAddressCell}>
          <LocationIcon/>
          <span className={classes.DefaultCell}>
            <span>{value.substr(0, 26)}...</span>
            <p>{value}</p>
          </span>
        </div>
    );
  }
  return (
      <div className={classes.LocationAddressCell}>
        <LocationIcon/>
        <span>
          <span>{value}</span>
            {value ? <p>{value}</p> : ""}
          </span>
      </div>
  );
}

interface IDeleteCaseCell {
  value: string
}

export const DeleteCaseCell = ({value}: IDeleteCaseCell) => {

  const dispatch = useDispatch()

  return (
      <button className={classes.DeleteCaseCell} onClick={() => dispatch(deleteCase(+value))}>
        <DeleteBasketIcon/>
        <span>
          <span>Delete</span>
        </span>
      </button>
  )
}

interface IGiftChallengeParticipant {
    value: { avatar: string, name: string, status: IGiftChallengeUserStatusEnum | null, giftChallengeStatus: string, show?: boolean, contact: boolean  }
}

export const GiftChallengeParticipantCell = ({value}: IGiftChallengeParticipant) => {
    return (
        <div className={classes.GCParticipantCell}>
            {[FINISHED, COMPLETED, GIFT_SENT].includes(value.giftChallengeStatus) && value.status === IGiftChallengeUserStatusEnum.winner
                ? <img src={winnerBadge} className={classes.GiftChallengeWinnerBadge} alt='winner'/>
                : <div className={classes.GiftChallengeWinnerBadge}/>
            }
            <Avatar avatarLink={value.avatar} className={classes.ParticipantAvatar}/>
            <span>{value.name}</span>
        </div>
    )
}

export const ContactDetailsCell = ({value}: IGiftChallengeParticipant) => {
    const dispatch = useDispatch()

    const onDetailsOpen = () => {
        dispatch(modalOpen({
            title: '',
            modalType: 'ContactDetails'
        }))
    }

    return [FINISHED, COMPLETED, GIFT_SENT].includes(value.giftChallengeStatus) && value.contact && value.status === IGiftChallengeUserStatusEnum.winner &&
           <div className={classes.GiftChallengeContactInfo} onClick={onDetailsOpen}>
        <span>Contact details</span>
    </div>
}

export const DateTimeCell = (value: string) => {
    return <span>{moment(value).utc(false).format('DD/MM/YYYY')}</span>
}


