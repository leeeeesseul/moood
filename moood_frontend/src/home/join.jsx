import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import icon_uncheck from "./Icon-uncheck.png";
import icon_check from "./Icon-check.png";
import icon_down from "./Icon-down.png";
import icon_button from "./Icon-button.png";

import TermOfUse from "./termOfUsePolicy";
import PrivacyPolicy from "./privacyPolicy";
import MobileVerification from "../mobileVerify/mobileVerification";

import Header from './header.jsx';

function Join() {

    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');

    const [agreeAll, setAgreeAll] = useState(false);
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);
    const [agree3, setAgree3] = useState(false);
    const [showAgree1, setShowAgree1] = useState(false);
    const [showAgree2, setShowAgree2] = useState(false);
    const [mobileVerify, setMobileVerify] = useState(false);
    const [randNum, setRandNum] = useState(1);

    const handleAgree = (status) => {
        setMobileVerify(null);

        if (status === 'all') {
            setAgreeAll(!agreeAll);
            setAgree1(!agreeAll);
            setAgree2(!agreeAll);
            setAgree3(!agreeAll);
        } else if (status === 1) {
            setAgree1(!agree1);

            if (!agree1 && agree2 && agree3) {
                setAgreeAll(true);
            } else {
                setAgreeAll(false);
            }

        } else if (status === 2) {
            setAgree2(!agree2);

            if (agree1 && !agree2 && agree3) {
                setAgreeAll(true);
            } else {
                setAgreeAll(false);
            }

        } else if (status === 3) {
            setAgree3(!agree3);

            if (agree1 && agree2 && !agree3) {
                setAgreeAll(true);
            } else {
                setAgreeAll(false);
            }
        }

        if (agree1 && agree2 && agree3) {
            setAgreeAll(!agreeAll);
        }
    };

    const handleCheckOk = (e) => {
        if (!agree1) {
            e.preventDefault();
            alert("SM게임즈 이용약관에 동의해주세요.");
            return;
        }
        if (!agree2) {
            e.preventDefault();
            alert("SM게임즈 개인정보처리방침에 동의해주세요.");
            return;
        }
        if (!agree3) {
            e.preventDefault();
            alert("휴대폰인증에 동의해주세요.");
            return;
        }

        setMobileVerify(true);
        setRandNum(randNum + 1);
        console.log("pass");
    };

    const handleShowAgree = (status) => {
        if (status === 1) {
            setShowAgree1(!showAgree1);
        } else if (status === 2) {
            setShowAgree2(!showAgree2);
        }
    };

    useEffect(() => {
        const [navigationEntry] = performance.getEntriesByType('navigation');

        if(localStorage.getItem('redirect')){
            if (navigationEntry.type === "back_forward") {
                window.history.pushState(null, "", window.location.href);
                localStorage.removeItem('redirect');
                alert('인증오류. 경로가 잘못되었습니다.');
                return navigate("/");
            }
        }

        if(localStorage.getItem('token')){
            navigate('/');
        }

        if (status){
            alert('최대 5개까지 아이디를 등록할 수 있습니다.');
        }

    }, []);


    return (
        <>
            <Header/>

            <div className="wrap">
                <p> 회원가입페이지야  이거는 </p>
            </div>

            <div id="contents">
                    <div className="Centerwarp" >
                        <div className="Centerwarp_inner" style={{height: '700px'}}>

                            {/* Agreement */}
                            <div className="subMaintitleBox">
                                <div className="subMainGrayBox"></div>
                                <div className="subMaintitle"><em>약관동의</em></div>
                            </div>

                            <div className="membership_Box">
                                <div className="membership_TitleBox">
                                    <div className="membership_Title" style={{ display: "flex" }}>
                                        <div className="membership_uncheckimg">
                                            <img id="agreeAll" src={agreeAll ? icon_check : icon_uncheck}
                                                 onClick={() => handleAgree('all')}/>
                                            <em>SM게임즈 이용약관 및 개인정보 취급방침에 모두 동의합니다.</em>
                                        </div>

                                    </div>
                                </div>

                                {/* Agreement Contents */}
                                <div className="membership_contents">
                                    {/* SM게임즈 이용약관 동의 */}
                                    <div className="membership_checkimg">
                                        <img id="agree1" src={agree1 ? icon_check : icon_uncheck}
                                             onClick={() => handleAgree(1)}/>
                                        <em>SM게임즈 이용약관에 동의</em>
                                    </div>
                                    <div style={{position: 'absolute', display: 'inline-block', margin: '0 0 0 600px'}}
                                         onClick={() => handleShowAgree(1)}>
                                        <em>약관보기</em>
                                        <img src={icon_down} style={{paddingTop: '7px'}}/>
                                    </div>
                                </div>

                                {/* Show Agreement 1 */}
                                <div id="showagree1" className="agreement_Box"
                                     style={{display: showAgree1 ? 'block' : 'none', paddingBottom: '21px'}}>
                                    <div className="agreement_contents">
                                        <div className="agreement_contents_Text">
                                            {/* Membership term of use */}

                                            <TermOfUse/>

                                        </div>
                                    </div>
                                </div>


                                {/* Agreement Contents */}
                                <div className="membership_contents">
                                    {/* SM게임즈 개인정보처리방침 동의 */}
                                    <div style={{display: 'block'}}>
                                        <div className="membership_checkimg" >
                                            <img id="agree2" src={agree2 ? icon_check : icon_uncheck}
                                                 onClick={() => handleAgree(2)}/>
                                            <em>SM게임즈 개인정보처리방침에 동의</em>
                                        </div>

                                        <div style={{
                                            position: 'absolute',
                                            display: 'inline-block',
                                            margin: '0 0 0 600px'
                                        }} onClick={() => handleShowAgree(2)}>
                                            <em>처리방침보기</em>
                                            <img src={icon_down} style={{paddingTop: '7px'}}/>
                                        </div>
                                    </div>
                                </div>

                                {/* Show Agreement 2 */}
                                <div id="showagree2" className="agreement_Box"
                                     style={{display: showAgree2 ? 'block' : 'none'}}>
                                    <div className="agreement_contents">
                                        <div className="agreement_contents_Text">
                                            {/* Membership privacy policy */}

                                            <PrivacyPolicy/>

                                        </div>
                                    </div>
                                </div>


                                {/* Agreement Checkbox */}
                                <div className="membership_TitleBox"
                                     style={{borderBottom: 'none', borderTop: '1px solid #d3d3d3'}}>
                                    <div className="membership_Title">
                                        <div className="membership_uncheckimg">
                                            <img id="agree3" src={agree3 ? icon_check : icon_uncheck}
                                                 onClick={() => handleAgree(3)}/>
                                            <em>휴대폰 인증
                                                <em style={{fontSize: '14px', fontWeight: 'normal', color: '#7b7b7b'}}> 본인확인을 위한 인증절차 입니다.</em>
                                            </em>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="oknoBox_button">
                                <button className="okno_button" onClick={handleCheckOk}>동의
                                    <div className="okno_button_img"><img src={icon_button}/></div>
                                </button>
                                <button className="okno_button" type="button" onClick={() => navigate('/login')}
                                        style={{backgroundColor: '#4e4e4e', marginLeft: '3px'}}>취소
                                    <div className="okno_button_img"><img src={icon_button}/></div>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>

            {mobileVerify && (<MobileVerification requestData={{page: 'join'}} randNum={randNum}/>)}

        </>
    );
}

export default Join;