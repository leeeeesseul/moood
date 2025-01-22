import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import ch1 from './ch1.png';
import './header.css';

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const nickname = localStorage.getItem('nickname');


    function logout() {
        document.cookie = 'tokenTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear();
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
        alert("로그아웃되었습니다.");
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 변경
        } else {
            setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 변경
        }
    }, []); // 의존성 배열에서 변경될 값이 없으므로 빈 배열

    return (
        <>
            <div className="wrap">
                <div className="logo"> <img src={ch1} alt="Logo" /> </div>
                <div className="nav">
                        <Link className="navMenu" to={'/'}>게임설명</Link>
                        <Link className="navMenu" to={'/login'}>FAQ</Link>
                        <Link className="navMenu" to={'/join'}>공지사항</Link>
                        <Link className="navMenu" to={'/'}>1:1문의</Link>
                </div>
                <div className="User_menu">
                    {isLoggedIn ? (
                        <>
                        <span className="myInfo" onClick={() => navigate("/myInfo")} style={{ cursor: "pointer" }}>
                        {nickname}
                        </span>
                        <span className="login" onClick={logout} style={{ cursor: "pointer" }}>
                            로그아웃
                        </span>
                        </>
                    ) : (
                        <>
                        <span className="join" onClick={() => navigate("/join")} style={{ cursor: "pointer" }}>
                        회원가입
                        </span>
                        <span className="login" onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                            로그인
                        </span>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}

export default Header;
