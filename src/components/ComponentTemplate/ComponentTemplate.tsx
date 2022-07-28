import React, {useContext, useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import isMobileContext from "../../helpers/Context";
import classes from "./ComponentTemplate.module.scss";
import {Link} from "react-router-dom";
import routeNames from "../../shared/routeNames/routeNames";
import {faAngleLeft, faCaretDown, faCaretUp, faChevronRight, faGift} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '../UI/Button/Button';
import { useLocation } from 'react-router-dom'
import {IGarbage} from "../../helpers/Interfaces/Garbage/IGarbage.interface";
import {IUserInterface} from "../../helpers/Interfaces/User/IUser.interface";
import {ComponentType} from "../../helpers/Interfaces/Common/Common";
import {BalanceIcon} from "../../assets/images/Icons/IconsSvg";
import {NavLink} from "react-router-dom";
import BigNumber from "bignumber.js";
import {modalOpen} from "../../store/actions/modalActions/modal";
import {useDispatch} from "react-redux";

interface IPropsComponentTemplate {
  title: string;
  backLink?: string;
  onAttachCaseToGiftChallenge?: () => void;
  onAddRecyclingPoint?: () => void;
  unAttachCaseToGiftChallenge?: () => void;
  events?: boolean
  profilePage?: boolean
  type?: ComponentType
  tokenBalance?: string
  actionButtons?: JSX.Element | null
}

const ComponentTemplate: React.FC<IPropsComponentTemplate & ILinkStateProps> = (props) => {

  const isMobile = useContext(isMobileContext)

  const [showProfileActionMenu, setShowProfileActionMenu] = useState<boolean>(false)

    const balance = props.tokenBalance && new BigNumber(props.tokenBalance).dividedBy(`10e${18 - 1}`)
        .toNumber()
        .toFixed(0)

  const classNames = require('classnames')
  const dispatch = useDispatch()

  const handleRulesView = () => {
    dispatch(modalOpen({
        modalType: 'GiftChallengeRules',
        title: ''
    }))
  }

  useEffect(() => {
      window.scrollTo(0, 0)
  }, [])

    const profileActionLinks = [
        {
            header: 'Create Case',
            to: routeNames.profileNewCase
        },
        {
            header: 'Create Gift Challenge',
            to: routeNames.newGiftChallenge
        },
        {
            header: 'Create General Event',
            to: routeNames.profileNewGeneralEvent
        },
        {
            header: 'Create Charity Event',
            to: routeNames.profileNewCharityEvent
        }
    ]

  const setBackLink = () => {
      switch (props.type) {
          case 'General Event':
              return (
                  <Link to={routeNames.events}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
          case 'Charity Event':
              return  (
                  <Link to={{
                      pathname: routeNames.events,
                      state: { from: 'charity' },
                  }}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
          case 'Profile General Event':
              return (
                  <Link to={`${routeNames.profile}?tab=2`}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
          case 'Profile Charity Event':
              return (
                  <Link to={{
                      pathname: `${routeNames.profile}`,
                      state: { from: 'charity' }
                  }}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
          case 'New Case':
              return (
                  <Link to={`${routeNames.profile}?tab=0`}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
          case "Case details":
              return (
                  <Link to={`${routeNames.profile}?tab=3`}>
                      <FontAwesomeIcon icon={faAngleLeft}/>
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
          case "Applied Gift Challenge":
              return (
                  <div className={classes.ComponentTemplateActionMenu}>
                      <Link to={`${routeNames.profile}?tab=1`} className={classes.ComponentTemplateLink}>
                          <FontAwesomeIcon icon={faAngleLeft} />
                          <p>
                              Back to <span>{props.backLink}</span>
                          </p>
                      </Link>
                  </div>
              )
          case "Created Gift Challenge":
              return (
                  <Link to={{
                      pathname: `${routeNames.profile}`,
                      state: { from: 'created' }
                  }}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
          case "Partner's Gift Challenge":
              return (
                  <div className={classes.ComponentTemplateActionMenu}>
                      <Link to={routeNames.challenges} className={classes.ComponentTemplateLink}>
                          <FontAwesomeIcon icon={faAngleLeft} />
                          <p>
                              Back to <span>{props.backLink}</span>
                          </p>
                      </Link>
                  </div>
              )
          case "User's Gift Challenge":
              return (
                  <Link to={{
                      pathname: routeNames.challenges,
                      state: { from: 'users' }
                  }}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                      <p>
                          Back to <span>{props.backLink}</span>
                      </p>
                  </Link>
              )
      }
  }


  const location = useLocation();
  return (
    <React.Fragment>
      <Header linkProfileColor='#ff8f1d' logoColor="orange" isMobile={isMobile} />
      <div className={classes.ComponentTemplate}>
        <div className="container">
          <div className={classes.ComponentTemplateHeaderSection}>
              <h2>{props.title}</h2>
              {(location.pathname === routeNames.profileNewCase || location.pathname === routeNames.profileEditCase) && props.type !== 'Error' && (
                !!props.garbage?.case.giftChallengeId
                  ? <div className={classes.CaseNameWrap}>
                      <div
                        className={classes.CaseName}>
                        <FontAwesomeIcon icon={faGift} />
                          {props.garbage?.case.giftChallengeTitle}
                      </div>
                      <Button
                        id='noCloseClick'
                        clicked={props.unAttachCaseToGiftChallenge}
                        whiteBackground show>
                        Unattach
                      </Button>
                    </div>
                  :  <Button
                        id='noCloseClick'
                        clicked={props.onAttachCaseToGiftChallenge}
                        whiteBackground show>
                        Attach to the Gift challenge
                    </Button>
              )}
          </div>
          {props.children}
        </div>
      </div>
      <Footer isMobile={isMobile}/>
    </React.Fragment>
  );
};

interface ILinkStateProps {
    garbage?: IGarbage;
    user?: IUserInterface
}

export default ComponentTemplate;
