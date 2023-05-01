import React, { useState } from "react";
import logo from "../../public/logo/NFU.svg";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { ConnectButton } from "web3uikit";
import "./navbar.scss";

const { t } = useTranslation('common');

const Menu = () => (

        <>
        <p>
            <a href="#home">{t('main')}</a>
        </p>
        <p>
            <a href="#gallery">{t('gallery')}</a>
        </p>
        <p>
            <a href="#about">{t("aboutProject")}</a>
        </p>
        <p>
            <a href="#team">{t("ourTeam")}</a>
        </p>
        <p>
            <a href="#contacts">{t("contacts")}</a>
        </p>
        <p>
            <ConnectButton moralisAuth={false} />
        </p>
    </>
);

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    
    return (
        <div className="navbar">
            <div className="navbar-links">
                <div className="navbar-links_logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="navbar-menu">
                {toggleMenu ? (
                    <RiCloseLine
                        color="#fff"
                        size={27}
                        onClick={() => setToggleMenu(false)}
                    />
                ) : (
                    <RiMenu3Line
                        color="#fff"
                        size={27}
                        onClick={() => setToggleMenu(true)}
                    />
                )}
                {toggleMenu && (
                    <div className="navbar-menu_container scale-up-center">
                        <div className="navbar-menu_container-links">
                            <Menu />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;