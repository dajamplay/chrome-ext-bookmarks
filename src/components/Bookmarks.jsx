import Bookmark from "./bookmark/Bookmark";
import styles from './Bookmarks.module.css';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { bookmarksState, marginLeftRightState, settingsWindowState } from '../atoms';

const Bookmarks = ()  => {
    const bookmarks = useRecoilValue(bookmarksState);
    const marginLeftRight = useRecoilValue(marginLeftRightState);

    return(
        <div className={styles.container} style={{
            'padding-left': marginLeftRight + '%',
            'padding-right': marginLeftRight + '%',
        }}>
            {bookmarks.map(bookmark => (
                <Bookmark bookmark={bookmark} key={bookmark.id}/>
            ))}
        </div>
    );
}

export default Bookmarks;
