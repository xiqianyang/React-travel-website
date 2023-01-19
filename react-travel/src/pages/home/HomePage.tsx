import React from "react";
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import styles from "./HomePage.module.css"
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";

interface State {
    loading: boolean,
    error: string | null,
    productList: any[]
}

class HomePageComponent extends React.Component<WithTranslation, State> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            productList: [],
        };
    }
    async componentDidMount() {
        try {
            const { data } = await axios.get(
                "http://123.56.149.216:8080/api/productCollections",
            );
            this.setState({
                loading: false,
                error: null,
                productList: data,
            });
        } catch (error) {
            if (error instanceof Error) {
                this.setState({ error: error.message, loading: false })
            }

        }


    }

    render() {
        // console.log(this.props.navigate)
        const { t } = this.props;
        const { productList, loading, error } = this.state
        if (loading) {
            return (
                <Spin
                    size="large"
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                    }}
                />
            );

        }
        if (error) {
            return <div>网站出错：{error}</div>;
        }
        return (
            <>
                <Header />
                {/* 页面内容 content */}
                <div className={styles["page-content"]}>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <SideMenu />
                        </Col>
                        <Col span={18}>
                            <Carousel />
                        </Col>
                    </Row>
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="warning">
                                {t("home_page.hot_recommended")}
                            </Typography.Title>
                        }
                        sideImage={sideImage}
                        products={productList[0].touristRoutes}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="danger">
                                新品上市
                            </Typography.Title>
                        }
                        sideImage={sideImage2}
                        products={productList[1].touristRoutes}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="success">
                                国内游推荐
                            </Typography.Title>
                        }
                        sideImage={sideImage3}
                        products={productList[2].touristRoutes}
                    />
                    <BusinessPartners />
                </div>
                <Footer />
            </>
        );
    }
}

export const HomePage = withTranslation()(HomePageComponent);