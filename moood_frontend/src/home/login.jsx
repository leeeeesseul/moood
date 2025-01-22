import React, {useState} from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";


function Login() {
    const navigate = useNavigate();
//     const location = useLocation();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [showIdPopup, setShowIdPopup] = useState(false);
    const [showPwPopup, setShowPwPopup] = useState(false);

    const handleIdChange = (e) => setId(e.target.value);
    const handlePwChange = (e) => setPw(e.target.value);

    const handleFindId = () => {
        setShowIdPopup(true);
    };

    const handleFindPw = () => {
        setShowPwPopup(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        var inputs = document.querySelectorAll('.input_form input');
        inputs.forEach(function (input) {
            input.value = '';
        });

        console.log(inputs);


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/login/', data);

            const responseData = response.data;

            console.log(responseData);

            if (response.status === 200) {
                sessionStorage.setItem('token', responseData.access);
                localStorage.setItem('user_nickname', responseData.user_nickname);
                localStorage.setItem('token', responseData.access);
                localStorage.setItem('is_user_restricted', responseData.is_user_restricted);
                localStorage.setItem('restricted_date_upto', responseData.restricted_date_upto);
                localStorage.setItem('gender', responseData.gender);

//                 if (redirect) {
//                     navigate(redirect);
//                 } else {
                    navigate('/');
//                 }

            }
            else if (response.status === 203) {
                navigate('/membership_verify?user_id=' + responseData.user_id);
            }
            else {
                alert("아이디와 비밀번호를 확인해주세요.");
            }


        } catch (error) {
            alert("아이디와 비밀번호를 확인해주세요.");
        }

    };

    return (
        <>
            <div className="memberd">
                <div className="login_form">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="login_form">
                            <div id="input_form">
                                <div id="input_id">
                                    <input type="text" id="id" name="id" value={id} onChange={handleIdChange}
                                    placeholder="아이디" required={true}/>
                                </div>
                                <div id="input_pw">
                                    <input type="password" id="password" name="password" value={pw} onChange={handlePwChange}
                                    placeholder="비밀번호" required={true} />
                                </div>
                            </div>
                            <button id="btnLogin" type="submit" title="로그인"
                                    className="login_btn"
                                    style={{cursor: 'pointer'}}>
                                    <span className="login_btn_txt">로그인</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="login_sub">
                    <span className="mem_id_search">
                        <button className="login_sub_link" onClick={handleFindId}>아이디 찾기</button>
                    </span>
                    <span className="mem_pw_search">
                        <button className="login_sub_link" onClick={handleFindPw}>비밀번호 찾기</button>
                    </span>
                    <span className="mem_join">
                        <button className="login_sub_link" onClick={() => navigate('/join')}>회원가입</button>
                    </span>

                </div>
            </div>
        </>
    );
}

export default Login;
