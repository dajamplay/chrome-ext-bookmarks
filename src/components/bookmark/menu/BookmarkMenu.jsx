import styles from './BookmarkMenu.module.css';
import {useRecoilValue} from 'recoil';
import {sizeItemState} from '@/atoms';
import BookmarkDeleteButton from "@/components/bookmark/menu/BookmarkDeleteButton.jsx";
import BookmarkEditButton from "@/components/bookmark/menu/BookmarkEditButton.jsx";
import {emitter} from "@/emitter.js";

const BookmarkMenu = ({bookmark, menuIsOpen, setMenuIsOpen, setIsOpenEditMenu, isDark}) => {

    const sizeItems = useRecoilValue(sizeItemState);

    const onClickHandle = (e) => {
        e.preventDefault();
    }

    emitter.on('closeBookmarkMenu', ({noCloseBookmarkId}) => {
        if (noCloseBookmarkId !== bookmark.id ) {
            setMenuIsOpen(false);
        }
    });

    return(
        <div className={styles.menuContainer} style={{
            'top' : menuIsOpen ? '0' : (-sizeItems - 30) + 'px',
            'display' : menuIsOpen ? 'flex' : 'none',
            'width': sizeItems + 'px',
            'height': sizeItems + 'px',
            'background-color' : isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.97)',
            'color' : isDark ? '#fff' : '#333',
        }} onClick={onClickHandle}>
            <BookmarkEditButton
                setMenuIsOpen={setMenuIsOpen}
                setIsOpenEditMenu={setIsOpenEditMenu}
            />
            <BookmarkDeleteButton bookmark={bookmark}/>
        </div>
    );
}

export default BookmarkMenu;
