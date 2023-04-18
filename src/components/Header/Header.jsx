import s from '../Header/Header.module.scss';
import logo from '../../images/logo.png';
// import logo2x from '../../images/logo(x2).png';
import backgroundIMG from '../../images/cardBackground.png';
// import backgroundIMG2x from '../../images/cardBackground(x2).png';

const Header = () => {
  return (
    <div className={s.header}>

        <div className={s.logo}>
            <img src={logo} alt="logo" />
        </div>

        <div className={s.background}>
            <img src={backgroundIMG} alt="background" />
        </div>
        
    </div>
  );
};

export default Header;
