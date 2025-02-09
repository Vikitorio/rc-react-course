import style from './style.module.scss';
interface ObjectData {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: {
    uid: string;
    name: string;
    astronomicalObjectType: string;
    location: {
      uid: string;
      name: string;
    };
  };
}

interface ObjectCardProps {
  data: ObjectData;
}
const ObjectCard = (props: ObjectCardProps) => {
  const { data } = props;
  return (
    <div className={style['item-detailed__card']}>
      <h2 className={style['item-detailed__title']}>{data.name}</h2>
      <p className={style['item-detailed__type']}>
        {data.astronomicalObjectType}
      </p>
      <div className={style['item-detailed__location']}>
        <span className={style['item-detailed__location--name']}>
          Location:{' '}
        </span>
        {data.location.name}
      </div>
    </div>
  );
};

export default ObjectCard;
