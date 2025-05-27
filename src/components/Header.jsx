import styles from './Header.module.css';
import Switch from "@/components/ui/Switch.jsx";
import {isDarkState} from '@/atoms';
import {useRecoilState} from 'recoil';

const Header = () => {
    const [isDark, setIsDark] = useRecoilState(isDarkState);

    const handleToggle = () => {
        const isDarkTemp = isDark;
        setIsDark(!isDarkTemp);
        localStorage.setItem('isDarkState', !isDarkTemp)
    }

    return(
        <>
            <div></div>
            <div className={styles.switchContainer}>
                <div className={styles.switchTitle}>Тема</div>
                <Switch
                    isOn={isDark}
                    handleToggle={handleToggle}
                />
            </div>
        </>
    );
}

export default Header;
