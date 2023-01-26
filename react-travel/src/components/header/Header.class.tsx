import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import store from "../../redux/store";
import { LanguageState } from "../../redux/language/languageReducer";
import { withTranslation, WithTranslation } from "react-i18next";
import {
    addLanguageActionCreator,
    changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/store";

const mapStateToProps = (state: RootState) => {
    return {
        language: state.language,
        languageList: state.language.languageList,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeLanguage: (code: "zh" | "en") => {
            const action = changeLanguageActionCreator(code);
            dispatch(action);
        },
        addLanguage: (name: string, code: string) => {
            const action = addLanguageActionCreator(name, code);
            dispatch(action);
        },
    };
};

type PropsType = RouteComponentProps & // react-router 路由props类型
    WithTranslation & // i18n props类型
    ReturnType<typeof mapStateToProps> & // redux store 映射类型
    ReturnType<typeof mapDispatchToProps>; // redux dispatch 映射类型

// interface State extends LanguageState {}

class HeaderComponent extends React.Component<PropsType> {
    handleStoreChange = () => {
        const storeState = store.getState();
        this.setState({
            language: storeState.language,
            languageList: storeState.language.languageList,
        });
    };

    menuClickHandler = (e) => {
        console.log(e);
        if (e.key === "new") {
            // 处理新语言添加action
            this.props.addLanguage("新语言", "new_lang");
        } else {
            this.props.changeLanguage(e.key);
        }
    };

    render(): React.ReactNode {
        const { navigate, t } = this.props;
        return (
            <div className={styles["app-header"]}>
                {/* top-header */}
                <div className={styles["top-header"]}>
                    <div className={styles.inner}>
                        <Typography.Text>{t("header.slogan")}</Typography.Text>
                        <Dropdown.Button
                            style={{ marginLeft: 15 }}
                            overlay={
                                <Menu
                                    onClick={this.menuClickHandler}
                                    items={[
                                        ...this.props.languageList.map((l) => {
                                            return { key: l.code, label: l.name };
                                        }),
                                        { key: "new", label: t("header.add_new_language") },
                                    ]}
                                />
                            }
                            icon={<GlobalOutlined />}
                        >
                            {this.props.language.language === "zh" ? "中文" : "English"}
                        </Dropdown.Button>
                        <Button.Group className={styles["button-group"]}>
                            <Button onClick={() => navigate("/register")}>
                                {t("header.register")}
                            </Button>
                            <Button onClick={() => navigate("/signin")}>
                                {t("header.signin")}
                            </Button>
                        </Button.Group>
                    </div>
                </div>
                <Layout.Header className={styles["main-header"]}>
                    <span onClick={() => navigate("/")}>
                        <img src={logo} alt="logo" className={styles["App-logo"]} />
                        <Typography.Title level={3} className={styles.title}>
                            {t("header.title")}
                        </Typography.Title>
                    </span>
                    <Input.Search
                        placeholder={"请输入旅游目的地、主题、或关键字"}
                        className={styles["search-input"]}
                    />
                </Layout.Header>
                <Menu
                    mode={"horizontal"}
                    className={styles["main-menu"]}
                    items={[
                        { key: "1", label: t("header.home_page") },
                        { key: "2", label: t("header.weekend") },
                        { key: "3", label: t("header.group") },
                        { key: "4", label: t("header.backpack") },
                        { key: "5", label: t("header.private") },
                        { key: "6", label: t("header.cruise") },
                        { key: "7", label: t("header.hotel") },
                        { key: "8", label: t("header.local") },
                        { key: "9", label: t("header.theme") },
                        { key: "10", label: t("header.custom") },
                        { key: "11", label: t("header.study") },
                        { key: "12", label: t("header.visa") },
                        { key: "13", label: t("header.enterprise") },
                        { key: "14", label: t("header.high_end") },
                        { key: "15", label: t("header.outdoor") },
                        { key: "16", label: t("header.insurance") },
                    ]}
                />
            </div>
        );
    }
}

export const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)));
