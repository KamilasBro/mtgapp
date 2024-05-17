import "./cardPlaceholder.scss";

interface Props {
  index?: number;
  key?: number;
}

const CardPlaceholder: React.FC<Props> = (props) => {
  return (
    <div
      key={`card-placeholder-${props.index}`}
      className="card-placeholder flex flex-col "
    >
      <div className="card-placeholder-img" />
      <div className="card-placeholder-content flex flex-col">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default CardPlaceholder;
