import styles from './Settings.module.css';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    settingsWindowState,
    marginItemsState,
    sizeItemState,
    marginLeftRightState,
    titleFontSizeState,
    bgColorState,
    isDarkState
} from '@/atoms';
import ImageUploadWithLimit from "@/components/settings/ImageUploadWithLimit.jsx";

const SettingsWindow = () => {

    const [isOpen, setWindowState] = useRecoilState(settingsWindowState);
    const [margin, setMargin] = useRecoilState(marginItemsState);
    const [size, setSize] = useRecoilState(sizeItemState);
    const [marginLeftRight, setMarginLeftRight] = useRecoilState(marginLeftRightState);
    const [titleFontSize, setTitleFontSize] = useRecoilState(titleFontSizeState);
    const [bgColor, setBgColor] = useRecoilState(bgColorState);
    const isDark = useRecoilValue(isDarkState);

    const onchangeTitleFontSize = (e) => {
        setTitleFontSize(e.target.value);
        localStorage.setItem('titleFontSizeState', e.target.value);
    }

    const onchangeMarginLeftRight = (e) => {
        setMarginLeftRight(e.target.value);
        localStorage.setItem('marginLeftRight', e.target.value);
    }

    const onchangeSize = (e) => {
        setSize(e.target.value);
        localStorage.setItem('size', e.target.value);
    }

    const onchangeMargin = (e) => {
        setMargin(e.target.value);
        localStorage.setItem('margin', e.target.value);
    }

    const handleColorChange = (e) => {
        setBgColor(e.target.value);
        localStorage.setItem('bgColorState', e.target.value);
    };

    return(
        <div
            className={styles.wrap}
            style={{
                'visibility': isOpen ? 'visible' : 'hidden',
            }}
        >
            <div className={styles.overlay} onClick={() => setWindowState(false)}></div>
            <div className={styles.container} style={{
                'right': isOpen ? '0' : '-400px',
                'background-color' : isDark ? 'rgba(55, 55, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                'color' : isDark ? '#fff' : '#333',
            }}>
                <ImageUploadWithLimit />

                <h3>Цвет фона (без изображения): </h3>
                <input
                    type="color"
                    value={bgColor}
                    onChange={handleColorChange}
                />

                <h3>Размер плиток: {size} пикс</h3>
                <input
                    className={styles.inputMargin}
                    type='range'
                    min="120"
                    max="200"
                    value={size}
                    step="2"
                    onChange={onchangeSize}
                />

                <h3>Расстояние между плитками: {margin} пикс</h3>
                <input
                    className={styles.inputMargin}
                    type='range'
                    min="0"
                    max="50"
                    value={margin}
                    step="1"
                    onChange={onchangeMargin}
                />

                <h3>Расстояние по бокам: {marginLeftRight} %</h3>
                <input
                    className={styles.inputMargin}
                    type='range'
                    min="0"
                    max="30"
                    value={marginLeftRight}
                    step="1"
                    onChange={onchangeMarginLeftRight}
                />

                <h3>Размер шрифта заголовка: {titleFontSize} pt</h3>
                <input
                    className={styles.inputMargin}
                    type='range'
                    min="10"
                    max="20"
                    value={titleFontSize}
                    step="1"
                    onChange={onchangeTitleFontSize}
                />

            </div>
        </div>
    );
}

export default SettingsWindow;
