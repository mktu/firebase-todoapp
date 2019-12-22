import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeContext, AuthContext } from '../../contexts';
import Header from '../Header/index';
import VisitorPage from '../VisitorPage';
import TodoPage from '../TodoPage';
import styled from 'styled-components';

const Wrapper = styled.div(({ theme }) => `
    background-color: ${theme.bgcolor};
    display : grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    min-height : 100vh;
`);

const FooterLayout = styled.div(({ theme }) => `
    background-color: ${theme.p};
    color : ${theme.onP};
`);


const MainPage = () => {
    const { userState } = useContext(AuthContext);
    const theme = useContext(ThemeContext);
    return (
        <Router>
            <Wrapper theme={theme}>
                <Header />
                {userState.user ? (
                    <Switch>
                        <Route path='/' exact component={TodoPage} />
                        <Route path="/:todoId"><TodoPage /></Route>
                    </Switch>
                ):(
                    <VisitorPage/>
                )}
                <FooterLayout theme={theme}>footer</FooterLayout>
            </Wrapper>
        </Router>
    )
}

export default MainPage;