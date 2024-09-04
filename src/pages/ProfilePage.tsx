import { Image } from 'primereact/image';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import ProfileView from '../components/Users/ProfileView';
import { useAuth } from '../hooks/useAuth';
import NewFlatImg from './../images/new-flat-img.png';
const Profilepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    // Optionally, you can return null or a loading spinner while redirecting
    return null;
  }

  return (
    <>
      <div className="w-full h-full flex gap-0">
        <div className="w-6 hidden md:block">
          <Image
            id="newFlatImg"
            className="w-full h-full"
            src={NewFlatImg}
            alt="New Flat Background"
          />
        </div>
        <div className="w-full md:w-6">
          <h1 className="font-normal">User Profile</h1>
          <ProfileView user={user} />
        </div>
      </div>
    </>
  );
};

export default Profilepage;
