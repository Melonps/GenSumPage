import React, {useCallback, useEffect} from 'react';


const BlockBrowserBack = () => {
    const blockBrowserBack = useCallback(() => {
        window.history.go(1)
    }, [])

    useEffect(() => {
        // 直前の履歴に現在のページを追加
        window.history.pushState(null, '', window.location.href)

        // 直前の履歴と現在のページのループ
        window.addEventListener('popstate', blockBrowserBack)

        // クリーンアップは忘れない
        return () => {
            window.removeEventListener('popstate', blockBrowserBack)
        }
    }, [blockBrowserBack])

    return (
        <></>
    );
};
export default BlockBrowserBack