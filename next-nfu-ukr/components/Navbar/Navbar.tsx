import React, { useState } from "react";
import logo from "../../public/logo/NFU.svg";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { ConnectButton } from "web3uikit";
import NavbarStyle from "./navbar.module.scss";

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
        <div className={NavbarStyle.navbar}>
            <div className={NavbarStyle.navbar_links}>
                <div className={NavbarStyle.navbar_links_logo}>
                    <img src="logo/NFU_yellow.svg" alt="Logo Image" />
                </div>
                <div className={NavbarStyle.navbar_links_container}>
                    <Menu />
                </div>
            </div>
            <div className={NavbarStyle.navbar_menu}>
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
                    <div className={NavbarStyle.navbar_menu_container}>
                        <div className={NavbarStyle.navbar_menu_container_links}>
                            <Menu />
                        </div>
                    </div>
                )}
            </div>
            <div className={NavbarStyle.nav_language}>
                <img
                    src="language/Flag_of_Ukraine.svg"
                    alt="uk"
                    data-google-lang="uk"
                    className="language__img"
                    onClick={() => setLanguage("ua")}
                />
                <img
                    src="language/Flag_of_the_United_Kingdom.svg"
                    alt="en"
                    data-google-lang="en"
                    className="language__img"
                    onClick={() => setLanguage("en")}
                />
            </div>
        </div>
    );
};

export default Navbar;