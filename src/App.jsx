import Bookmarks from "./components/Bookmarks.jsx";
import {useEffect} from "react";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { bookmarksState, bgColorState, uploadedImageState } from '@/atoms';
import Footer from "@/components/Footer.jsx";
import Header from "@/components/Header.jsx";
import SettingsButton from "@/components/settings/SettingsButton.jsx";
import SettingsWindow from "@/components/settings/SettingsWindow.jsx";
import {flattenBookmarks} from "@/utils/bookmarks.js";
import {emitter} from "@/emitter.js";

function App() {
    const setBookmarks = useSetRecoilState(bookmarksState);
    const bgColor = useRecoilValue(bgColorState);
    const bgImage = useRecoilValue(uploadedImageState);

    useEffect( () => {
        if (chrome && chrome.bookmarks) {
            chrome.bookmarks.getTree((bookmarkTreeNodes) => {
                setBookmarks(flattenBookmarks(bookmarkTreeNodes));
            });
        }

        const handleClick = (e) => {
            if (!e.target.classList.contains("bookmarkMenuButton")) {
                emitter.emit('closeBookmarkMenu', {e});
            }
        };

        document.body.addEventListener("click", handleClick);

        return () => {
            document.body.removeEventListener("click", handleClick);
        };

    }, [])

    useEffect(() => {
        document.body.style.backgroundColor = bgColor;

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [bgColor]);

    useEffect(() => {
        if(bgImage) {
            document.body.style.backgroundImage = `url(${bgImage})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
        }

        return () => {
            document.body.style.backgroundImage = '';
        };
    }, [bgImage]);

    return (
        <>
            <Header />
            <Bookmarks />
            <Footer />
            <SettingsButton />
            <SettingsWindow />
        </>
    )
}

export default App;
