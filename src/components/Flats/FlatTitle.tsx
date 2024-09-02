import FlatFilter from '../Commons/FlatFilter';
import FlatOrder from '../Commons/FlatOrder';

interface FlatTitleProps {
  title: string;
  showOrder?: boolean;
  showFilter?: boolean;
}
const FlatTitle: React.FC<FlatTitleProps> = ({
  title,
  showOrder = true,
  showFilter = true,
}) => {
  return (
    <div className="flex justify-content-between w-full align-items-center mb-3">
      <h1 className="font-normal">{title}</h1>
      <div className="flex gap-3">
        {showOrder && <FlatOrder />}
        {showFilter && <FlatFilter />}
      </div>
    </div>
  );
};

export default FlatTitle;
