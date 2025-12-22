import { useState, useEffect } from 'react';
import { getImageFromDB } from '../services/db';

export const useAsyncImage = (src) => {
    const [url, setUrl] = useState(src);

    useEffect(() => {
        let active = true;
        if (src && typeof src === 'string' && src.startsWith('idb_')) {
            getImageFromDB(src).then(blobData => {
                if (active && blobData) setUrl(blobData);
            }).catch(() => {
                if (active) setUrl(src); // Fallback
            });
        } else {
            setUrl(src);
        }
        return () => { active = false; };
    }, [src]);

    return url;
};
