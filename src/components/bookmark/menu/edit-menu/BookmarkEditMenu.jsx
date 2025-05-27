import styles from './BookmarkEditMenu.module.css';
import {useState} from "react";
import {flattenBookmarks} from "@/utils/bookmarks.js";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {bookmarksState, isDarkState} from "@/atoms.js";

const BookmarkEditMenu = ({isOpenEditMenu, setIsOpenEditMenu, bookmark}) => {

    const [title, setTitle] = useState(bookmark.title);
    const setBookmarks = useSetRecoilState(bookmarksState);
    const isDark = useRecoilValue(isDarkState);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onclickCancel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpenEditMenu(false);
    }

    const onclickContainer = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const saveBookmark = () => {
        chrome.bookmarks.update(bookmark.id, {
            title: title ?? 'Без названия',
        }, function(updatedBookmark) {
            console.log('Закладка обновлена:', updatedBookmark);
            setIsOpenEditMenu(false);
            chrome.bookmarks.getTree((bookmarkTreeNodes) => {
                setBookmarks(flattenBookmarks(bookmarkTreeNodes));
            });
        });
    }

    return(
        <div className={styles.overlay} style={{
            'visibility': isOpenEditMenu ? 'visible' : 'hidden',
        }} onClick={onclickCancel}>
            <div className={styles.container} onClick={onclickContainer} style={{
                'background-color' : isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                'color' : isDark ? '#fff' : '#333',
                'opacity': isOpenEditMenu ? '1' : '0',
            }}>
                <div>Название закладки</div>
                <input
                    className={styles.inputTitle}
                    type="text"
                    value={title}
                    onChange={onChangeTitle}
                />
                <div className={styles.buttonContainer}>
                    <div className={styles.saveButton} onClick={saveBookmark}>Сохранить</div>
                    <div className={styles.closeButton} onClick={onclickCancel}>Отмена</div>
                </div>
            </div>
        </div>
    );
}

export default BookmarkEditMenu;
