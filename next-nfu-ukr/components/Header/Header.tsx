import React from "react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { ConnectButton } from "web3uikit";

import HeaderStyle from "./Header.module.scss";

// This function's behavior needs to be applied




const Header = (): JSX.Element => {
  const { t } = useTranslation("common");
  
  
    return (
      <div className={HeaderStyle.header} id="home">
        <div>
          <img
            className={`${HeaderStyle.emblem} ${HeaderStyle.left}`}
            src="/icons/flowers_corner.svg"
            alt="emblem icon left"
          />
          <img
            className={`${HeaderStyle.emblem} ${HeaderStyle.right}`}
            src="/icons/flowers_corner.svg"
            alt="emblem icon right"
          />
        </div>
        <div className={HeaderStyle.header_container}>
          <img
            className={HeaderStyle.logo_header_image}
            src="/logo/NFU-logo-300x300/NFU_yellow.svg"
            alt="logo header image"
          />
          <div className={HeaderStyle.description_item}>{t("motto")}</div>
        </div>
      </div>
    );
  };

  export default Header;
