import styles from './Footer.module.css';
import {emitter} from "@/emitter.js";

const Footer = () => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>Разработчик Максим А.</div>
        </div>
    );
}

export default Footer;
