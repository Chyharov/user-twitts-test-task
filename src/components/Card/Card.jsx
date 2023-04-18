import s from '../Card/Card.module.scss';
import Header from '../Header/Header';
import User from '../User/User';

const Card = () => {
  return (
    <div className={s.card}>

      <Header />

      <User />

    </div>
  );
};

export default Card;
