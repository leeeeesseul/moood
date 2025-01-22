import React, {useEffect, useRef} from 'react';

const MobileVerifyRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    var redirect = params.get('redirect');
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (!hasRedirected.current) {
            hasRedirected.current = true;
            const sub_url = redirect.split("-");
            var url= `/${sub_url[0]}&${sub_url[1]}`;

            localStorage.setItem('redirect', url);
            window.close();
        }
    }, [redirect]);

    return null;

};

export default MobileVerifyRedirect;
