import React, {useEffect, useState} from 'react';
import axios from "axios";

const MobileVerification = ({requestData}) => {
    const [data, setData] = useState('');
    var KMCIS_window;


    const openKMCISWindow = () => {
        const userAgent = navigator.userAgent;

        console.log('openKMCISWindow함수에 들어옴');


        // Check if the user agent is a mobile device
        const isMobile = userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) !== null || userAgent.match(/LG|SAMSUNG|Samsung/) !== null;

        if (isMobile) {
            document.getElementById('KMCISform').target = '';
        } else {
            KMCIS_window = window.open('', 'KMCISWindow', 'width=425, height=550, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250');

            if (KMCIS_window === null) {
                alert(' ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n 화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.');
            }

            document.getElementById('KMCISform').target = 'KMCISWindow';
        }

        console.log(data);

        document.getElementById('KMCISform').action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';

        if (data){
            document.getElementById('KMCISform').submit();
        }
    };


    const KMCISData = async () => {

        console.log('KMCISData 들어옴');
        try {
            const response = await axios.post(`https://www.smgames.co.kr/api/v1/mobile_verification/verify_request/`, requestData);

            console.log(response);
            if (response.status === 200) {
                setData(response.data);
            }

        } catch (error){
            alert('Internal Server Error');
        }
    };


    useEffect(() => {
        console.log('openKMCISWindow 작동');
        console.log(data);
        console.log('======================================');
        openKMCISWindow();
    }, [data]);


    useEffect(() => {
        console.log('requestData 있어서 이리옴');
        console.log(requestData);
        console.log('==============================');
        localStorage.removeItem('redirect');
        KMCISData();
        console.log(data);
    }, [requestData]);


    useEffect(() => {
        console.log('그럼 여기도 같이오나?');
        const intervalId = setInterval(() => {
          const redirect = localStorage.getItem('redirect');
          console.log(redirect);
          if (redirect) {
              window.location.href = redirect;
          }
        }, 2000);

        return () => clearInterval(intervalId);
      }, [requestData]);


    return (
        <form id="KMCISform" method="post">
            <input type="hidden" name="tr_cert" value={data.tr_cert}/>
            <input type="hidden" name="tr_url" value={data.tr_url}/>
            <input type="hidden" name="tr_ver" value="V2"/>
        </form>
    );
};

export default MobileVerification;
