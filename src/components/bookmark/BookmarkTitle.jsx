import styles from './Bookmark.module.css';

const BookmarkTitle = ({bookmark, titleFontSize}) => {

    return(
        <>
            <div className={styles.title} style={{
                'font-size': titleFontSize + 'px'
            }}>{bookmark.title}</div>
        </>
    );
}

export default BookmarkTitle;
