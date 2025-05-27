import styles from './BookmarkMenu.module.css';
import {emitter} from "@/emitter.js";

const BookmarkMenuButton = ({setMenuIsOpen, bookmark}) => {

    const onClickMenuButton = (e) => {
        e.preventDefault();
        setMenuIsOpen(value => !value);
        let noCloseBookmarkId = bookmark.id;
        emitter.emit('closeBookmarkMenu', {noCloseBookmarkId});
    }

    return(
        <>
            <div className={[styles.containerButton, 'bookmarkMenuButton'].join(' ')} onClick={onClickMenuButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-three-dots-vertical bookmarkMenuButton" viewBox="0 0 16 16">
                    <path className={'bookmarkMenuButton'}
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
            </div>
        </>
    );
}

export default BookmarkMenuButton;
