import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeContext } from '../../contexts';
import Header from '../Header/index';
import Home from '../Home/index';
import styled from 'styled-components';

const Wrapper = styled.div`
    display : grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    align-items : center;
    min-height : 100vh;
`;
const HeaderLayout = styled.div(({ theme }) => `
    background-color: ${theme.p};
    color : ${theme.onP};
`);
const ContentLayout = styled.div(({ theme }) => `
    background-color: ${theme.bgcolor};
`);
const FooterLayout = styled.div(({ theme }) => `
    background-color: ${theme.p};
    color : ${theme.onP};
`);


const Presenter = ({ renderFooter }) => {
    return (
        <ThemeContext.Consumer>
            {value => (
                <Router>
                    <Wrapper>
                        <HeaderLayout theme={value}><Header /></HeaderLayout>
                        <ContentLayout theme={value}>
                            <Switch>
                                <Route path='/' exact component={Home} />
                            </Switch>
                        </ContentLayout>
                        <FooterLayout theme={value}>{renderFooter()}</FooterLayout>
                    </Wrapper>
                </Router>

            )}
        </ThemeContext.Consumer>
    )
}

export default Presenter;