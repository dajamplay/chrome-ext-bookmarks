import BookmarkImage from "./BookmarkImage.jsx";
import BookmarkTitle from "./BookmarkTitle.jsx";
import styles from './Bookmark.module.css';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {marginItemsState, sizeItemState, dragItemId, bookmarksState, titleFontSizeState, isDarkState} from '@/atoms';
import {useState} from "react";
import BookmarkMenuButton from "@/components/bookmark/menu/BookmarkMenuButton.jsx";
import BookmarkMenu from "@/components/bookmark/menu/BookmarkMenu.jsx";
import {flattenBookmarks} from "@/utils/bookmarks.js";
import BookmarkEditMenu from "@/components/bookmark/menu/edit-menu/BookmarkEditMenu.jsx";


const Bookmark = ({bookmark}) => {

    const marginItems = useRecoilValue(marginItemsState);
    const isDark = useRecoilValue(isDarkState);
    const titleFontSize = useRecoilValue(titleFontSizeState);
    const sizeItems = useRecoilValue(sizeItemState);
    const [draggedItem, setDraggedItem] = useRecoilState(dragItemId);
    const setBookmarks = useSetRecoilState(bookmarksState);

    const [isTarget, setIsTarget] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isOpenEditMenu, setIsOpenEditMenu] = useState(false);

    const handleDragStart = (index) => {
        setDraggedItem(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (index) => {
        chrome.bookmarks.move(draggedItem, { index: index }, () => {
            chrome.bookmarks.getTree((bookmarkTreeNodes) => {
                setBookmarks(flattenBookmarks(bookmarkTreeNodes));
            });
        });
        setIsTarget(false);
    };

    const handleDragEnter = () => {
        setIsTarget(true);
    }

    const handleDragLeave = () => {
        setIsTarget(false);
    }

    return(
        <>
            <a href={bookmark.url} className={styles.container} style={{
                'margin': marginItems + 'px',
                'width': sizeItems + 'px',
                'height': sizeItems + 'px',
                'border-left': isTarget ? '20px solid lightgreen' : 'none',
                'background-color' : isDark ? '#333' : '#fff',
                'color' : isDark ? '#fff' : '#333',
            }}
               draggable
               onDragStart={() => handleDragStart(bookmark.id)}
               onDragOver={handleDragOver}
               onDragEnter={handleDragEnter}
               onDragLeave={handleDragLeave}
               onDrop={() => handleDrop(bookmark.index)}
            >
                <BookmarkImage bookmark={bookmark} />
                <BookmarkTitle bookmark={bookmark} titleFontSize={titleFontSize}/>
                <BookmarkMenuButton
                    setMenuIsOpen={setMenuIsOpen}
                    bookmark={bookmark}
                />
                <BookmarkMenu
                    setMenuIsOpen={setMenuIsOpen}
                    bookmark={bookmark}
                    menuIsOpen={menuIsOpen}
                    isOpenEditMenu={isOpenEditMenu}
                    setIsOpenEditMenu={setIsOpenEditMenu}
                    isDark={isDark}
                />
            </a>
            <BookmarkEditMenu
                draggable={false}
                bookmark={bookmark}
                isOpenEditMenu={isOpenEditMenu}
                setIsOpenEditMenu={setIsOpenEditMenu}
            />
        </>
    );
}

export default Bookmark;
