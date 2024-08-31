import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
interface UserCardProps {
  image: string;
  name: string;
  lastname: string;
  age: number;
  email: string;
  birthday: string;
  flatsNumber: number;
  isAdmin: boolean;
}
const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  lastname,
  age,
  email,
  birthday,
  flatsNumber,
  isAdmin,
}) => {
  const header = (
    <div className="flex gap-3 align-items-center md:w-25rem mb-0">
      <Avatar
        image={image}
        size="xlarge"
        shape="circle"
        className="my-3 ml-3"
      />
      <p>
        {name} {lastname}
      </p>
    </div>
  );
  const footer = (
    <>
      <div className="flex flex-column md:flex-row gap-3">
        <Button
          label="Toggle Admin"
          icon="pi pi-user-edit"
          className="w-full md:w-6 bg-indigo-400"
        />
        <Button
          label="Remove User"
          severity="secondary"
          icon="pi pi-trash"
          className="w-full md:w-6 bg-indigo-200 text-indigo-800"
        />
      </div>
    </>
  );

  return (
    <Card
      footer={footer}
      header={header}
      className="border-1 border-round-xl border-indigo-300 bg-indigo-50"
    >
      <p className="mt-0">
        <i className="pi pi-user"></i>
        <span className="font-semibold"> Age:</span>
        {age}
      </p>
      <p>
        <i className="pi pi-at"></i>
        <span className="font-semibold"> Email:</span>
        {email}
      </p>
      <p>
        <i className="pi pi-calendar-clock"></i>
        <span className="font-semibold"> Date Of Bith:</span>
        {birthday}
      </p>
      <p>
        <i className="pi pi-user"></i>
        <span className="font-semibold"> #Flats:</span>
        {flatsNumber}
      </p>
      <p>
        <span
          className={`border-1 border-round-xl border-300 border-indigo-300 p-2 ${isAdmin ? 'bg-indigo-100' : 'bg-indigo-50'}`}
        >
          {isAdmin ? 'Is Admin' : 'Not Admin'}
        </span>
      </p>
    </Card>
  );
};
export default UserCard;
