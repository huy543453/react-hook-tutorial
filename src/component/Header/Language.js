import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = (props) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <NavDropdown
                title={i18n.language === "vi" ? "Việt Nam" : "English"}
                id="basic-nav-dropdown2"
                className="language"
            >
                <NavDropdown.Item onClick={() => i18n.changeLanguage("en")}>
                    English
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => i18n.changeLanguage("vi")}>
                    Việt Nam
                </NavDropdown.Item>
            </NavDropdown>
        </>
    );
};

export default Language;
