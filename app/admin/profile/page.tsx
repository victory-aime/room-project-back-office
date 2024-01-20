'use client';
import Banner from 'components/admin/profile/Banner';
import Card from '../../../components/card';
import FormProfile from '../../../components/admin/profile/FormProfile';

const ProfileOverview = () => {
  return (
    <>
      <div className="flex w-full gap-5 lg:gap-5">
        <Banner />

        <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
          <FormProfile />
        </Card>
      </div>
    </>
  );
};

export default ProfileOverview;
