import styles from "./Bookmark.module.css";
import { useRecoilValue } from 'recoil';
import {sizeItemState} from '@/atoms';
import {checkImageUrl} from "@/utils/image.js";
import {useState} from "react";

const BookmarkImage = ({bookmark}) => {

    const [isValidImg, setIsValidImg] = useState(false);
    const sizeItems = useRecoilValue(sizeItemState);
    let siteIcon = new URL(bookmark.url).hostname;
    let src = `https://www.google.com/s2/favicons?sz=128&domain_url=${siteIcon}`;

    checkImageUrl(src, 64, (isValid) => setIsValidImg(isValid));

    const getImage = () => {
        if (isValidImg) {
            return(
                <div className={styles.imageContainer} style={{
                    'height': (sizeItems - 20) + 'px',
                    'width': sizeItems + 'px',
                }}>
                    <img src={src} className={styles.image} alt={bookmark.title} style={{
                        'height': (sizeItems - 40) + 'px',
                        'width': (sizeItems - 40) + 'px',
                        'border-radius': (sizeItems - 40) + 'px',
                    }}/>
                </div>
            );
        } else {
            const first = bookmark.title[0].toUpperCase()
            return(
                <div className={styles.imageContainer} style={{
                    'height': (sizeItems - 20) + 'px',
                    'width': sizeItems + 'px',
                }}>
                    <div className={styles.noImage} style={{
                        'font-size': (sizeItems / 2) + 'px',
                    }}>{first}</div>
                </div>
            );
        }
    }

    return(
        <>
            {getImage()}
        </>
    );
}

export default BookmarkImage;
